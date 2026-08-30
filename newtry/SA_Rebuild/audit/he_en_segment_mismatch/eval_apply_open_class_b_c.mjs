/**
 * Evaluate + apply OPEN_CLASS_B_C GPT results on LIVE corpus.
 *
 *   node eval_apply_open_class_b_c.mjs              # eval only
 *   node eval_apply_open_class_b_c.mjs --apply       # eval + apply APPROVE
 *   node eval_apply_open_class_b_c.mjs --src PATH    # override GPT source
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CORPUS_ROOT,
  checkFailurePatternsJoined,
  checkFreshTranslateSlot,
  detectQuoteBreak,
  enStartsWithMarker,
  getProposedEn,
  getSources,
  isBeerHagolahDegree,
  isLikut,
  kitCorpusEn,
  loadKitCases,
  norm,
  readCorpusEnPlain,
  sig,
  sigIgnoreMarkersFromSegs,
  splitHtmlByBrSegments,
  stripHtml,
  joinSegments,
  writeEvalOutputs,
  countVerdicts,
} from "./_eval_remaining_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const KIT = "OPEN_CLASS_B_C_GPT_KIT";
const DEFAULT_SRC =
  "C:/Users/binya/Downloads/OPEN_CLASS_B_C_GPT_KIT_ALL_15_COMPLETED.json";

const WRONG_PAREN_PREFIX_RE = /^\([^)]+\)\s*/;
const MEANING_PREFIX_RE = /^Meaning[:,]?\s*/i;

function parseArgs(argv) {
  const out = { apply: false, src: DEFAULT_SRC, skipMarkerFix: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--apply") out.apply = true;
    else if (argv[i] === "--src") out.src = argv[++i];
    else if (argv[i] === "--skip-marker-fix") out.skipMarkerFix = true;
  }
  return out;
}

function setSlotEn(gptCase, i, text) {
  if (gptCase.segments?.[i]) gptCase.segments[i].en = text;
  if (Array.isArray(gptCase.en_segments) && gptCase.en_segments.length > i) {
    gptCase.en_segments[i] = text;
  }
}

function fixBeerMarker(enSeg) {
  const plain = stripHtml(enSeg);
  if (/^\(°\)/.test(plain)) return { text: enSeg, changed: false };
  if (enStartsWithMarker(plain, "°")) {
    if (MEANING_PREFIX_RE.test(plain)) {
      return {
        text: `(°) ${String(enSeg).replace(MEANING_PREFIX_RE, "").trimStart()}`,
        changed: true,
      };
    }
    return {
      text: `(°) ${String(enSeg).replace(/^\(?°\)?\s*/i, "").trimStart()}`,
      changed: true,
    };
  }
  if (WRONG_PAREN_PREFIX_RE.test(plain)) {
    return {
      text: `(°) ${String(enSeg).replace(WRONG_PAREN_PREFIX_RE, "").trimStart()}`,
      changed: true,
    };
  }
  return { text: `(°) ${String(enSeg).trimStart()}`, changed: true };
}

function fixLikutMarker(enSeg) {
  const plain = stripHtml(enSeg);
  if (/^\(Likkut\)/i.test(plain)) return { text: enSeg, changed: false };
  if (WRONG_PAREN_PREFIX_RE.test(plain)) {
    return {
      text: `(Likkut) ${String(enSeg).replace(WRONG_PAREN_PREFIX_RE, "").trimStart()}`,
      changed: true,
    };
  }
  return { text: `(Likkut) ${String(enSeg).trimStart()}`, changed: true };
}

function applyMarkerFixes(kitCases, gptCases) {
  const kitById = new Map(kitCases.map((c) => [c.id, c]));
  const fixes = [];
  for (const gptCase of gptCases) {
    const kitCase = kitById.get(gptCase.id);
    if (!kitCase) continue;
    const heSegs = kitCase.he_segments || [];
    for (let i = 0; i < heSegs.length; i++) {
      const he = heSegs[i];
      const before = getProposedEn(gptCase)[i] ?? "";
      if (isBeerHagolahDegree(he)) {
        const { text, changed } = fixBeerMarker(before);
        if (changed) {
          setSlotEn(gptCase, i, text);
          fixes.push({ id: gptCase.id, slot: i, kind: "beer" });
        }
      }
      const current = getProposedEn(gptCase)[i] ?? before;
      if (isLikut(he)) {
        const { text, changed } = fixLikutMarker(current);
        if (changed) {
          setSlotEn(gptCase, i, text);
          fixes.push({ id: gptCase.id, slot: i, kind: "likut" });
        }
      }
    }
  }
  return fixes;
}

function checkPatternMarkers(kitCase, proposed, flags) {
  const slug = kitCase.slug;
  if (slug === "beer-hagolah") {
    for (let i = 0; i < kitCase.heSegs; i++) {
      if (isBeerHagolahDegree(kitCase.he_segments[i])) {
        if (!enStartsWithMarker(proposed[i] || "", "°"))
          flags.push(`BEER_DEGREE_MARKER_MISS_${i}`);
      }
    }
  }
  if (slug === "beur-hagra") {
    for (let i = 0; i < kitCase.heSegs; i++) {
      if (isLikut(kitCase.he_segments[i])) {
        if (!/^\(Likkut\)/i.test(stripHtml(proposed[i] || "")))
          flags.push(`LIKUT_MARKER_MISS_${i}`);
      }
    }
  }
}

/** Hardened eval for OPEN_CLASS_B_C (mixed resegment + fresh allowed). */
function evalCase(kitCase, gptCase) {
  const flags = [];
  const id = kitCase.id;
  const heSegs = kitCase.heSegs;

  if (!gptCase)
    return { id, verdict: "REJECT", reason: "missing_from_gpt", flags: ["MISSING"] };

  const action = gptCase.action;
  if (action === "needs_human") {
    return {
      id,
      slug: kitCase.slug,
      heSegs,
      action,
      verdict: "HOLD",
      reason: "gpt_needs_human",
      flags: ["ACTION_NEEDS_HUMAN"],
      gpt_notes: gptCase.notes,
    };
  }

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || [];
  const sources = getSources(gptCase);
  const corpusKit = kitCorpusEn(kitCase);
  const corpusFile = readCorpusEnPlain(id);
  const corpusEn = corpusFile || corpusKit;

  if (proposed.length !== heSegs) flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);
  if (enLegacy.length && enLegacy.length !== heSegs)
    flags.push(`EN_SEG_COUNT_${enLegacy.length}_vs_${heSegs}`);

  const qb = detectQuoteBreak(gptCase, proposed, enLegacy);
  flags.push(...qb.flags);

  const freshIdx = [];
  const splitIdx = [];
  for (let i = 0; i < sources.length; i++) {
    if (sources[i] === "fresh_translate") {
      freshIdx.push(i);
      flags.push(`FRESH_TRANSLATE_${i}`);
    }
    if (sources[i] === "split_existing_en") splitIdx.push(i);
  }

  // Pure split_en / all-split: no fresh_translate allowed without justification
  if (
    (action === "split_en" || (splitIdx.length && !freshIdx.length)) &&
    freshIdx.length
  ) {
    flags.push("SPLIT_EN_HAS_FRESH_TRANSLATE");
  }

  for (const i of freshIdx) {
    flags.push(
      ...checkFreshTranslateSlot(kitCase.he_segments[i], proposed[i] || "", i)
    );
  }
  flags.push(...checkFailurePatternsJoined(proposed));

  const joinedProposed = proposed.join("");
  const joinedNorm = norm(joinedProposed);
  const corpusNorm = norm(corpusEn);
  const exactMatch = joinedNorm === corpusNorm;
  const sigMatch = sig(joinedProposed) === sig(corpusEn);
  const corpusSegs =
    Array.isArray(kitCase.en_segments) && kitCase.en_segments.length
      ? kitCase.en_segments
      : [corpusEn];
  const sigMatchIgnoreMarkers =
    sigIgnoreMarkersFromSegs(proposed) ===
    sigIgnoreMarkersFromSegs(corpusSegs);
  const enLengthRatio = Number(
    (joinedNorm.length / Math.max(corpusNorm.length, 1)).toFixed(3)
  );

  // Verbatim / content_drift only when ALL slots are split_existing_en
  if (splitIdx.length && freshIdx.length === 0) {
    if (!exactMatch && !sigMatch && !sigMatchIgnoreMarkers)
      flags.push("CONTENT_DRIFT");
    if (enLengthRatio < 0.92) flags.push(`TRUNCATED_${enLengthRatio}`);
    if (enLengthRatio > 1.08) flags.push(`INFLATED_${enLengthRatio}`);
  }

  checkPatternMarkers(kitCase, proposed, flags);

  for (let i = 0; i < heSegs; i++) {
    if (!stripHtml(proposed[i] || "")) flags.push(`EMPTY_EN_${i}`);
  }

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    (norm(segEnArr.join("")) === corpusNorm ||
      sig(segEnArr.join("")) === sig(corpusEn)) &&
    !flags.some((f) => f.startsWith("SEG_COUNT"));

  let verdict = "APPROVE";
  let reason =
    freshIdx.length === 0 && exactMatch
      ? "split_existing_en verbatim"
      : freshIdx.length === 0 && (sigMatch || sigMatchIgnoreMarkers)
        ? "split_existing_en sig match"
        : freshIdx.length
          ? "mixed/fresh OK"
          : "resegment OK";

  if (flags.some((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"))) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"));
  } else if (repairCandidate) {
    verdict = "REPAIR_CANDIDATE";
    reason = "quote_break; segments[].en complete";
  } else if (flags.includes("SPLIT_EN_HAS_FRESH_TRANSLATE")) {
    verdict = "REJECT";
    reason = "split_en with fresh_translate";
  } else if (
    flags.some((f) => /TRUNCATED_|QUOTE_BREAK|INFLATED_/.test(f)) &&
    !repairCandidate &&
    freshIdx.length === 0
  ) {
    verdict = "REJECT";
    reason = "truncated_or_quote_break";
  } else if (
    flags.includes("CONTENT_DRIFT") &&
    !sigMatch &&
    !sigMatchIgnoreMarkers &&
    !freshIdx.length
  ) {
    verdict = "HOLD";
    reason = "content_drift";
  } else if (
    flags.some((f) =>
      /SHORT_FRESH|HEBREW_IN_FRESH|RAW_HE_ABBREV|FAILURE_FRESH|FAILURE_/.test(f)
    )
  ) {
    verdict = "HOLD";
    reason = "fresh_translate_quality";
  } else if (flags.some((f) => /BEER_DEGREE|LIKUT_MARKER/.test(f))) {
    verdict = "HOLD";
    reason = "pattern_marker_miss";
  } else if (gptCase.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
  }

  return {
    id,
    slug: kitCase.slug,
    heSegs,
    enSegs: kitCase.enSegs,
    action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    repair_candidate: repairCandidate,
    flags,
    en_length_ratio: enLengthRatio,
    exact_match: exactMatch,
    sig_match: sigMatch,
    gpt_notes: gptCase.notes,
  };
}

function applyApproved(results, gptById, apply) {
  const approved = results.filter((r) => r.verdict === "APPROVE");
  const applied = [];
  const failed = [];

  for (const row of approved) {
    const id = row.id;
    const gptCase = gptById.get(id);
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    if (!gptCase) {
      failed.push({ id, reason: "missing_gpt_case" });
      continue;
    }
    if (!fs.existsSync(hePath)) {
      failed.push({ id, reason: "missing_he_html" });
      continue;
    }
    const heRaw = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
    const heSegs = splitHtmlByBrSegments(heRaw).length;
    const segs = getProposedEn(gptCase);
    const enBefore = fs.existsSync(enPath)
      ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "")
      : null;
    const enSegsBefore = enBefore ? splitHtmlByBrSegments(enBefore).length : 0;
    const enAfter = joinSegments(segs);
    const enSegsAfter = splitHtmlByBrSegments(enAfter).length;

    if (enSegsBefore === heSegs && heSegs > 0) {
      applied.push({
        id,
        heSegs,
        enSegsBefore,
        enSegsAfter: enSegsBefore,
        applied: false,
        skipped: true,
        reason: "already_aligned",
      });
      continue;
    }
    if (enSegsAfter !== heSegs) {
      failed.push({
        id,
        reason: `post_apply_mismatch enAfter=${enSegsAfter} he=${heSegs}`,
      });
      continue;
    }
    if (apply) {
      fs.mkdirSync(path.dirname(enPath), { recursive: true });
      fs.writeFileSync(enPath, enAfter, "utf8");
    }
    applied.push({
      id,
      heSegs,
      enSegsBefore,
      enSegsAfter,
      applied: apply,
      skipped: false,
      reason: row.reason,
    });
    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id}: en ${enSegsBefore}->${enSegsAfter} (he=${heSegs})`
    );
  }
  return { applied, failed, approvedIds: approved.map((r) => r.id) };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(args.src)) {
    console.error(`[ERROR] GPT source not found: ${args.src}`);
    process.exit(1);
  }

  const gptOut = path.join(AUDIT, "OPEN_CLASS_B_C_GPT_RESULT.json");
  fs.copyFileSync(args.src, gptOut);
  console.log(`[copy] ${args.src} -> ${gptOut}`);

  let gptCases = JSON.parse(fs.readFileSync(gptOut, "utf8").replace(/^\uFEFF/, ""));
  if (!Array.isArray(gptCases)) {
    console.error("[ERROR] GPT result must be a JSON array");
    process.exit(1);
  }

  const kitCases = loadKitCases(AUDIT, KIT);
  console.log(`[kit] ${kitCases.length} cases; GPT ${gptCases.length}`);

  let markerFixes = [];
  if (!args.skipMarkerFix) {
    markerFixes = applyMarkerFixes(kitCases, gptCases);
    if (markerFixes.length) {
      fs.writeFileSync(gptOut, JSON.stringify(gptCases, null, 2) + "\n", "utf8");
      console.log(`[marker-fix] ${markerFixes.length} slots normalized`);
    } else {
      console.log("[marker-fix] no changes");
    }
  }

  const gptById = new Map(gptCases.map((c) => [c.id, c]));
  const results = kitCases.map((kc) => {
    const r = evalCase(kc, gptById.get(kc.id));
    if (r.verdict === "APPROVE") {
      const hePath = path.join(CORPUS_ROOT, kc.id, "he.html");
      const enPath = path.join(CORPUS_ROOT, kc.id, "en.html");
      if (fs.existsSync(hePath) && fs.existsSync(enPath)) {
        const heN = splitHtmlByBrSegments(
          fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "")
        ).length;
        const enN = splitHtmlByBrSegments(
          fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "")
        ).length;
        if (heN === enN && heN === (kc.heSegs || heN)) {
          r.verdict = "SKIP_APPLIED";
          r.reason = "corpus_already_aligned";
          r.flags = [...(r.flags || []), "SKIP_APPLIED"];
        }
      }
    }
    return r;
  });

  const counts = countVerdicts(results);
  const meta = {
    created: new Date().toISOString(),
    kit: KIT,
    mode: "split_or_fresh_translate_hardened",
    gpt_source: args.src,
    gpt_result: "OPEN_CLASS_B_C_GPT_RESULT.json",
    kit_case_count: kitCases.length,
    gpt_case_count: gptCases.length,
    marker_fixes: markerFixes.length,
    summary: `${KIT}: ${counts.APPROVE || 0} APPROVE, ${counts.HOLD || 0} HOLD, ${counts.REJECT || 0} REJECT, ${counts.REPAIR_CANDIDATE || 0} REPAIR_CANDIDATE, ${counts.SKIP_APPLIED || 0} SKIP_APPLIED`,
  };
  writeEvalOutputs(AUDIT, KIT, meta, results);
  console.log(`[eval] ${meta.summary}`);

  for (const r of results) {
    console.log(`  ${r.verdict.padEnd(16)} ${r.id} — ${r.reason}`);
  }

  const applyOut = applyApproved(results, gptById, args.apply);
  const applyPath = path.join(AUDIT, "OPEN_CLASS_B_C_APPLY.json");
  const reallyApplied = applyOut.applied.filter((a) => a.applied && !a.skipped);
  fs.writeFileSync(
    applyPath,
    JSON.stringify(
      {
        scannedAt: new Date().toISOString(),
        mode: args.apply ? "APPLY" : "DRY-RUN",
        kit: KIT,
        counts,
        marker_fixes: markerFixes,
        approvedIds: applyOut.approvedIds,
        applied: applyOut.applied,
        failed: applyOut.failed,
        reallyApplied: reallyApplied.map((a) => a.id),
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log(
    `[apply] ${args.apply ? "APPLIED" : "DRY-RUN"} ${reallyApplied.length}; failed ${applyOut.failed.length}`
  );
}

main();
