/**
 * Evaluate complete HE_HAS_MORE_EDITORIAL GPT results (218 cases, parts 01–46).
 *
 *   node _eval_he_has_more_editorial_gpt_all.mjs
 *   GPT_SRC=... node _eval_he_has_more_editorial_gpt_all.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const GPT_SRC =
  process.env.GPT_SRC ||
  "C:/Users/binya/Downloads/HE_HAS_MORE_EDITORIAL_ALL_218_FINAL.json";
const GPT_OUT = path.join(AUDIT, "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL.json");
const EVAL_JSON = path.join(AUDIT, "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json");
const EVAL_MD = path.join(AUDIT, "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.md");
const APPROVE_IDS = path.join(
  AUDIT,
  "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_APPROVE_IDS.txt"
);
const KIT_FULL = path.join(AUDIT, "HE_HAS_MORE_EDITORIAL_KIT.json");

const PART_FILES = Array.from({ length: 46 }, (_, i) =>
  path.join(AUDIT, `HE_HAS_MORE_EDITORIAL_KIT_part${String(i + 1).padStart(2, "0")}.json`)
);

const ALLOWED_ACTIONS = new Set([
  "split_en",
  "merge_groups",
  "mixed_resegment_translate",
  "needs_human",
  "resegment",
]);

const FAILURE_PATTERNS = [
  /hand recoils/i,
  /Saturday\b/i,
  /\ballocated\b/i,
  /Shield of Abraham/i,
  /Golden Rows/i,
  /House of Joseph/i,
  /first dish/i,
  /second dish/i,
  /the craft/i,
  /Lord's Prayer/i,
  /her age/i,
  /Darbanan/i,
  /disgusted hand/i,
];

const EDITORIAL_NOTE = /(?:^|\s)(?:Note:|Meaning:|Translation:|TBD|translation pending)/i;
const RAW_HE_ABBREV = /[א-ת][״\"'][א-ת]/;

function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function norm(s) {
  return stripHtml(s)
    .replace(/[""„]/g, '"')
    .replace(/[''‚]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function sig(s) {
  return norm(s).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function preview(s, n = 72) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function hebrewCharRatio(s) {
  const t = stripHtml(s);
  if (!t.length) return 0;
  const he = (t.match(/[\u0590-\u05FF]/g) || []).length;
  return he / t.length;
}

function loadKitCases() {
  if (fs.existsSync(KIT_FULL)) {
    const kit = JSON.parse(fs.readFileSync(KIT_FULL, "utf8"));
    const partById = new Map();
    for (let i = 0; i < PART_FILES.length; i++) {
      const pf = PART_FILES[i];
      if (!fs.existsSync(pf)) continue;
      const part = JSON.parse(fs.readFileSync(pf, "utf8"));
      for (const c of part.cases) partById.set(c.id, i + 1);
    }
    return kit.cases.map((c) => ({
      ...c,
      kit_part: partById.get(c.id) ?? null,
    }));
  }
  const cases = [];
  for (let i = 0; i < PART_FILES.length; i++) {
    const kit = JSON.parse(fs.readFileSync(PART_FILES[i], "utf8"));
    for (const c of kit.cases) cases.push({ ...c, kit_part: i + 1 });
  }
  return cases;
}

function kitCorpusEn(kitCase) {
  return (kitCase.en_segments || []).join(" ");
}

function getProposedEn(gptCase) {
  if (gptCase?.segments?.length)
    return gptCase.segments.map((s) => s.en ?? "");
  if (gptCase?.segments_en?.length) return gptCase.segments_en;
  return gptCase?.en_segments || [];
}

function getSources(gptCase) {
  if (gptCase?.segments?.length)
    return gptCase.segments.map((s) => s.source || "unknown");
  return gptCase?.sources || [];
}

function isLikut(heSeg) {
  const t = stripHtml(heSeg);
  return /^\(ליקוט\)|^\(Likkut\)/i.test(t);
}

function isBeerHagolahDegree(heSeg) {
  return /^\(°\)/.test(stripHtml(heSeg)) || stripHtml(heSeg).startsWith("(°)");
}

function enStartsWithMarker(en, marker) {
  const t = stripHtml(en);
  if (marker === "°") return /^\(?°\)?/i.test(t) || /^meaning:/i.test(t);
  if (marker === "likut")
    return /^\(Likkut\)|^\(Extract\)|^\(Anthology\)/i.test(t);
  return false;
}

function validateMergeGroups(mg, heSegs, enSegs) {
  const errs = [];
  if (!Array.isArray(mg)) return ["merge_groups_not_array"];
  if (mg.length !== enSegs) errs.push(`mg_len=${mg.length}!=enSegs=${enSegs}`);
  const flat = [];
  for (let g = 0; g < mg.length; g++) {
    const group = mg[g];
    if (!Array.isArray(group) || group.length === 0) {
      errs.push(`empty_group@${g}`);
      continue;
    }
    for (let i = 0; i < group.length; i++) flat.push(group[i]);
    for (let i = 1; i < group.length; i++) {
      if (group[i] !== group[i - 1] + 1)
        errs.push(`noncontig_within@g${g}:${JSON.stringify(group)}`);
    }
  }
  if (flat.length !== heSegs) errs.push(`flat_len=${flat.length}!=heSegs=${heSegs}`);
  for (let i = 0; i < flat.length; i++) {
    if (flat[i] !== i) {
      errs.push(`partition_not_0..n-1`);
      break;
    }
  }
  return errs;
}

function detectQuoteBreak(gptCase, proposed, enLegacy) {
  const segEn = gptCase?.segments?.map((s) => s.en ?? "") || [];
  const flags = [];
  if (!segEn.length || !enLegacy.length) return { quote_break: false, flags };

  if (segEn.length !== enLegacy.length)
    flags.push(`SEG_EN_LEN_${segEn.length}_vs_EN_SEG_${enLegacy.length}`);

  for (let i = 0; i < Math.min(segEn.length, enLegacy.length); i++) {
    const a = norm(segEn[i]);
    const b = norm(enLegacy[i]);
    if (!a || !b) continue;
    if (a !== b) {
      const shorter = a.length < b.length ? "segments_en" : "en_segments";
      const longer = a.length >= b.length ? segEn[i] : enLegacy[i];
      const shorterText = a.length < b.length ? segEn[i] : enLegacy[i];
      if (
        norm(longer).startsWith(
          norm(shorterText).slice(0, Math.min(20, shorterText.length))
        ) &&
        norm(longer).length > norm(shorterText).length * 1.15
      ) {
        flags.push(`QUOTE_BREAK_${i}:${shorter}_truncated`);
      } else {
        flags.push(`MIRROR_MISMATCH_${i}`);
      }
    }
  }

  const joinedSeg = norm(segEn.join(""));
  const joinedLegacy = norm(enLegacy.join(""));
  if (
    joinedSeg !== joinedLegacy &&
    (joinedSeg.length > joinedLegacy.length * 1.05 ||
      joinedLegacy.length > joinedSeg.length * 1.05)
  ) {
    if (joinedSeg.length >= joinedLegacy.length * 1.05)
      flags.push("QUOTE_BREAK_en_segments_truncated");
    else if (joinedLegacy.length >= joinedSeg.length * 1.05)
      flags.push("QUOTE_BREAK_segments_en_truncated");
  }
  return { quote_break: flags.some((f) => f.startsWith("QUOTE_BREAK")), flags };
}

function checkFreshTranslateSlot(he, en, i) {
  const flags = [];
  const heT = stripHtml(he);
  const enT = stripHtml(en);
  if (!enT || enT.length < 6) flags.push(`EMPTY_FRESH_EN_${i}`);
  if (heT.length > 40 && enT.length < heT.length * 0.12)
    flags.push(`SHORT_FRESH_EN_${i}`);
  if (hebrewCharRatio(enT) > 0.05) flags.push(`HEBREW_IN_FRESH_EN_${i}`);
  if (RAW_HE_ABBREV.test(enT)) flags.push(`RAW_HE_ABBREV_FRESH_${i}`);
  if (EDITORIAL_NOTE.test(enT)) flags.push(`EDITORIAL_NOTE_FRESH_${i}`);
  for (const p of FAILURE_PATTERNS) {
    if (p.test(enT)) flags.push(`FAILURE_FRESH_${i}:${p.source}`);
  }
  return flags;
}

function checkLikutMergeRisk(kitCase, gptCase) {
  const flags = [];
  if (gptCase.action !== "merge_groups" || !gptCase.merge_groups) return flags;
  const heSegs = kitCase.he_segments || [];
  const mg = gptCase.merge_groups;
  for (let g = 0; g < mg.length; g++) {
    const group = mg[g];
    if (!Array.isArray(group) || group.length < 2) continue;
    const hasLikut = group.some((idx) => isLikut(heSegs[idx]));
    const hasNonLikut = group.some((idx) => !isLikut(heSegs[idx]));
    if (hasLikut && hasNonLikut) flags.push(`LIKUT_MERGE_RISK_g${g}`);
    if (group.length >= 2) {
      const texts = group.map((idx) => stripHtml(heSegs[idx]).slice(0, 24));
      if (texts.some((t) => /^\(ליקוט\)/.test(t)) && texts.some((t) => !/^\(ליקוט\)/.test(t)))
        flags.push(`LIKUT_BOUNDARY_g${g}`);
    }
  }
  return flags;
}

function evaluateCase(kitCase, gptCase) {
  const id = kitCase.id;
  const slug = kitCase.slug;
  const heSegs = kitCase.heSegs;
  const enSegs = kitCase.enSegs;
  const kitPart = kitCase.kit_part;
  const flags = [];

  if (!gptCase) {
    return {
      id,
      slug,
      kit_part: kitPart,
      heSegs,
      enSegs,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  const action = gptCase.action;
  if (!ALLOWED_ACTIONS.has(action)) flags.push(`BAD_ACTION:${action}`);

  if (action === "needs_human") {
    if (gptCase.en_segments != null) flags.push("NEEDS_HUMAN_HAS_EN_SEGMENTS");
    if (gptCase.segments != null) flags.push("NEEDS_HUMAN_HAS_SEGMENTS");
    return {
      id,
      slug,
      kit_part: kitPart,
      heSegs,
      enSegs,
      action,
      confidence: gptCase.confidence,
      verdict: flags.length ? "HOLD" : "HOLD",
      reason: "gpt_needs_human",
      flags,
      gpt_notes: gptCase.notes,
    };
  }

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || [];
  const sources = getSources(gptCase);
  const corpusKit = kitCorpusEn(kitCase);

  // JSON integrity
  if (!proposed.length && !enLegacy.length) flags.push("JSON_MISSING_SEGMENTS");
  if (!gptCase.segments?.length && !gptCase.en_segments?.length)
    flags.push("JSON_NO_SEGMENTS_OR_EN_SEGMENTS");

  if (proposed.length !== heSegs)
    flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);
  if (enLegacy.length && enLegacy.length !== heSegs)
    flags.push(`EN_SEG_COUNT_${enLegacy.length}_vs_${heSegs}`);

  const qb = detectQuoteBreak(gptCase, proposed, enLegacy);
  flags.push(...qb.flags);

  // merge_groups validation
  if (action === "merge_groups" || gptCase.merge_groups) {
    flags.push(...validateMergeGroups(gptCase.merge_groups, heSegs, enSegs).map((e) => `MG:${e}`));
    flags.push(...checkLikutMergeRisk(kitCase, gptCase));
  }

  const freshIdx = [];
  const splitIdx = [];
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (!s) continue;
    if (!["split_existing_en", "fresh_translate", "partial", "unknown"].includes(s))
      flags.push(`BAD_SOURCE_${i}:${s}`);
    if (s === "fresh_translate") {
      freshIdx.push(i);
      flags.push(`FRESH_TRANSLATE_${i}`);
    }
    if (s === "split_existing_en") splitIdx.push(i);
  }

  if (action === "split_en" && freshIdx.length)
    flags.push("SPLIT_EN_HAS_FRESH_TRANSLATE");
  if (action === "split_en" && sources.length && !sources.every((s) => s === "split_existing_en"))
    flags.push("SPLIT_EN_NON_VERBATIM_SOURCE");

  // fresh_translate slot checks
  for (const i of freshIdx) {
    flags.push(
      ...checkFreshTranslateSlot(
        kitCase.he_segments[i],
        proposed[i] || "",
        i
      )
    );
  }

  // Verbatim preservation for split_existing_en slots
  const joinedProposed = proposed.join("");
  const joinedNorm = norm(joinedProposed);
  const corpusNorm = norm(corpusKit);
  const exactMatch = joinedNorm === corpusNorm;
  const sigMatch = sig(joinedProposed) === sig(corpusKit);
  const enLengthRatio = Number(
    (joinedNorm.length / Math.max(corpusNorm.length, 1)).toFixed(3)
  );

  if (splitIdx.length && freshIdx.length === 0) {
    if (!exactMatch && !sigMatch) flags.push("CONTENT_DRIFT");
    if (enLengthRatio < 0.92) flags.push(`TRUNCATED_${enLengthRatio}`);
    if (enLengthRatio > 1.08) flags.push(`INFLATED_${enLengthRatio}`);
  } else if (splitIdx.length && freshIdx.length > 0) {
    // mixed: only check split slots contribute to corpus
    if (enLengthRatio < 0.85 && freshIdx.length < heSegs - enSegs)
      flags.push(`MIXED_TRUNCATED_${enLengthRatio}`);
    if (enLengthRatio > 1.25) flags.push(`MIXED_INFLATED_${enLengthRatio}`);
  }

  // Pattern checks
  if (slug === "beer-hagolah") {
    for (let i = 0; i < heSegs; i++) {
      if (isBeerHagolahDegree(kitCase.he_segments[i])) {
        if (!enStartsWithMarker(proposed[i] || "", "°"))
          flags.push(`BEER_DEGREE_MARKER_MISS_${i}`);
      }
    }
  }
  if (slug === "beur-hagra") {
    for (let i = 0; i < heSegs; i++) {
      if (isLikut(kitCase.he_segments[i])) {
        if (!enStartsWithMarker(proposed[i] || "", "likut"))
          flags.push(`LIKUT_MARKER_MISS_${i}`);
      }
    }
  }

  // Empty segment check
  for (let i = 0; i < heSegs; i++) {
    const en = stripHtml(proposed[i] || "");
    if (!en) flags.push(`EMPTY_EN_${i}`);
  }

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const segEnJoined = segEnArr.join("");
  const segEnSigMatch = sig(segEnJoined) === sig(corpusKit);
  const segEnExact = norm(segEnJoined) === corpusNorm;
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    (segEnExact || segEnSigMatch) &&
    !flags.some((f) => f.startsWith("SEG_COUNT"));

  const segCountFail = flags.some((f) => f.startsWith("SEG_COUNT"));
  const emptyFail = flags.some((f) => f.startsWith("EMPTY_EN"));
  const truncFail = flags.some((f) => /TRUNCATED_|MIXED_TRUNCATED/.test(f));
  const freshFail = flags.some((f) =>
    /EMPTY_FRESH|SHORT_FRESH|HEBREW_IN_FRESH|RAW_HE_ABBREV_FRESH|EDITORIAL_NOTE_FRESH|FAILURE_FRESH/.test(
      f
    )
  );
  const patternFail = flags.some((f) =>
    /BEER_DEGREE|LIKUT_MARKER|LIKUT_MERGE|LIKUT_BOUNDARY/.test(f)
  );
  const driftFail =
    flags.includes("CONTENT_DRIFT") && !sigMatch && freshIdx.length === 0;
  const minorDrift =
    flags.includes("CONTENT_DRIFT") && sigMatch && !exactMatch && freshIdx.length === 0;
  const mirrorFail = flags.some((f) => f.startsWith("MIRROR_MISMATCH"));
  const mgFail = flags.some((f) => f.startsWith("MG:") || f.startsWith("LIKUT_MERGE"));

  let verdict = "APPROVE";
  let reason = "segment count OK; structure valid";

  if (segCountFail || emptyFail || mgFail) {
    verdict = "REJECT";
    reason =
      flags.find((f) => f.startsWith("SEG_COUNT")) ||
      flags.find((f) => f.startsWith("EMPTY_EN")) ||
      flags.find((f) => f.startsWith("MG:")) ||
      "structural_fail";
  } else if (repairCandidate) {
    verdict = "REPAIR_CANDIDATE";
    reason = "quote_break in en_segments; segments[].en complete";
  } else if (truncFail || (qb.quote_break && !repairCandidate)) {
    verdict = "REJECT";
    reason =
      flags.find((f) => /TRUNCATED|QUOTE_BREAK/.test(f)) || "truncated_or_quote_break";
  } else if (flags.includes("SPLIT_EN_HAS_FRESH_TRANSLATE")) {
    verdict = "REJECT";
    reason = "split_en action with fresh_translate slots";
  } else if (freshFail) {
    verdict = "HOLD";
    reason = flags.find((f) => /FRESH|EDITORIAL|FAILURE_FRESH/.test(f)) || "fresh_translate_quality";
  } else if (driftFail) {
    verdict = "HOLD";
    reason = "content_drift_vs_corpus_en";
  } else if (patternFail) {
    verdict = sigMatch || freshIdx.length ? "HOLD" : "REJECT";
    reason = flags.find((f) => patternFail) || "pattern_fail";
  } else if (minorDrift || mirrorFail) {
    verdict = "HOLD";
    reason = minorDrift
      ? "minor_editorial_drift_vs_corpus"
      : "en_segments_mirror_mismatch";
  } else if (action === "mixed_resegment_translate" && freshIdx.length) {
    verdict = freshFail ? "HOLD" : "APPROVE";
    reason = freshFail
      ? "mixed with fresh_translate quality flags"
      : "mixed resegment + fresh_translate OK";
  } else if (action === "split_en") {
    verdict = driftFail ? "HOLD" : "APPROVE";
    reason = exactMatch
      ? "split_existing_en verbatim"
      : sigMatch
        ? "split_existing_en sig match"
        : "split_en structural OK";
  } else if (gptCase.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
  }

  return {
    id,
    slug,
    kit_part: kitPart,
    heSegs,
    enSegs,
    action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    repair_candidate: repairCandidate,
    flags,
    fresh_slots: freshIdx.length,
    split_slots: splitIdx.length,
    en_length_ratio: enLengthRatio,
    exact_match: exactMatch,
    sig_match: sigMatch,
    quote_break: qb.quote_break,
    sources_summary: {
      split_existing_en: splitIdx.length,
      fresh_translate: freshIdx.length,
    },
    seg_previews: proposed.slice(0, 3).map((s, i) => ({ i, text: preview(s) })),
    gpt_notes: gptCase.notes,
  };
}

function countBy(results, keyFn) {
  const out = {};
  for (const r of results) {
    const k = keyFn(r);
    if (!out[k]) out[k] = { APPROVE: 0, HOLD: 0, REJECT: 0, REPAIR_CANDIDATE: 0, total: 0 };
    out[k][r.verdict] = (out[k][r.verdict] || 0) + 1;
    out[k].total++;
  }
  return out;
}

function topFailurePatterns(results) {
  const freq = {};
  for (const r of results) {
    if (r.verdict === "APPROVE") continue;
    for (const f of r.flags) {
      const key = f.replace(/_\d+$/, "").replace(/:\d+(\.\d+)?$/, "");
      freq[key] = (freq[key] || 0) + 1;
    }
    const bucket = `${r.verdict}:${r.reason}`;
    freq[bucket] = (freq[bucket] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
}

// --- main ---
if (!fs.existsSync(GPT_SRC)) {
  console.error("GPT source not found:", GPT_SRC);
  process.exit(1);
}

fs.copyFileSync(GPT_SRC, GPT_OUT);
const gptCases = JSON.parse(fs.readFileSync(GPT_OUT, "utf8"));
const kitCases = loadKitCases();
const kitIds = kitCases.map((c) => c.id);
const gptById = new Map(gptCases.map((c) => [c.id, c]));

const results = kitCases.map((kc) => evaluateCase(kc, gptById.get(kc.id)));

const counts = { APPROVE: 0, HOLD: 0, REJECT: 0, REPAIR_CANDIDATE: 0 };
for (const r of results) counts[r.verdict] = (counts[r.verdict] || 0) + 1;

const byPart = countBy(results, (r) => `part${String(r.kit_part).padStart(2, "0")}`);
const byAction = countBy(results, (r) => r.action || "missing");

const missingGpt = kitIds.filter((id) => !gptById.has(id));
const extraGpt = gptCases.filter((g) => !kitIds.includes(g.id)).map((g) => g.id);
const approved = results.filter((r) => r.verdict === "APPROVE");
const repairCandidates = results.filter((r) => r.verdict === "REPAIR_CANDIDATE");
const hold = results.filter((r) => r.verdict === "HOLD");
const reject = results.filter((r) => r.verdict === "REJECT");
const topFailures = topFailurePatterns(results);

const meta = {
  created: new Date().toISOString(),
  kit: path.basename(KIT_FULL),
  kit_parts: 46,
  gpt_result: path.basename(GPT_OUT),
  gpt_source: GPT_SRC,
  kit_case_count: kitCases.length,
  gpt_case_count: gptCases.length,
  id_order_match: gptCases.map((g) => g.id).join("|") === kitIds.join("|"),
  missing_from_gpt: missingGpt,
  extra_in_gpt: extraGpt,
  counts,
  by_part: byPart,
  by_action: byAction,
  top_failure_patterns: topFailures,
  repair_candidate_count: repairCandidates.length,
  repair_candidate_ids: repairCandidates.map((r) => r.id),
  recommendation: {
    approve_ready: approved.length,
    repair_candidate: repairCandidates.length,
    hold: hold.length,
    reject: reject.length,
    needs_human: results.filter((r) => r.action === "needs_human").length,
    do_not_apply_yet: true,
    note: "Evaluation only — no corpus apply. Apply APPROVE rows after parent sign-off; repair REPAIR_CANDIDATE by copying segments[].en → en_segments.",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(EVAL_JSON, JSON.stringify(evalDoc, null, 2));
fs.writeFileSync(APPROVE_IDS, approved.map((r) => r.id).join("\n") + "\n");

const nonApprove = results.filter((r) => r.verdict !== "APPROVE");

const md = `# HE_HAS_MORE editorial GPT — full evaluation (218 cases)

**Created:** ${meta.created}  
**Kit:** \`HE_HAS_MORE_EDITORIAL_KIT.json\` + parts 01–46 (\`${kitCases.length}\` cases)  
**GPT result:** \`HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL.json\` (\`${gptCases.length}\` cases)  
**Source:** \`${GPT_SRC}\`  
**ID order match:** ${meta.id_order_match ? "yes" : "no"}  
**Status:** evaluation only — **no corpus apply**

## Summary counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | ${counts.APPROVE} |
| **HOLD** | ${counts.HOLD} |
| **REJECT** | ${counts.REJECT} |
| **REPAIR_CANDIDATE** | ${counts.REPAIR_CANDIDATE} |

| GPT action | Count |
|------------|------:|
${Object.entries(
  gptCases.reduce((a, c) => {
    a[c.action] = (a[c.action] || 0) + 1;
    return a;
  }, {})
)
  .map(([k, v]) => `| ${k} | ${v} |`)
  .join("\n")}

## Cross-check

- Kit cases: **${kitCases.length}**
- GPT cases: **${gptCases.length}**
- Missing from GPT: ${missingGpt.length ? missingGpt.join(", ") : "none"}
- Extra in GPT: ${extraGpt.length ? extraGpt.join(", ") : "none"}

## Counts by kit part

| Part | Total | APPROVE | HOLD | REJECT | REPAIR |
|------|------:|--------:|-----:|-------:|-------:|
${Object.keys(byPart)
  .sort()
  .map((p) => {
    const b = byPart[p];
    return `| ${p} | ${b.total} | ${b.APPROVE || 0} | ${b.HOLD || 0} | ${b.REJECT || 0} | ${b.REPAIR_CANDIDATE || 0} |`;
  })
  .join("\n")}

## Counts by action (eval verdict)

| Action | Total | APPROVE | HOLD | REJECT | REPAIR |
|--------|------:|--------:|-----:|-------:|-------:|
${Object.keys(byAction)
  .sort()
  .map((a) => {
    const b = byAction[a];
    return `| ${a} | ${b.total} | ${b.APPROVE || 0} | ${b.HOLD || 0} | ${b.REJECT || 0} | ${b.REPAIR_CANDIDATE || 0} |`;
  })
  .join("\n")}

## Top failure patterns

| Pattern / reason | Count |
|------------------|------:|
${topFailures.map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## Recommendation

- **${approved.length} APPROVE** — ready to apply after parent sign-off
- **${repairCandidates.length} REPAIR_CANDIDATE** — copy \`segments[].en\` → \`en_segments\`, re-run eval
- **${hold.length} HOLD** — includes ${results.filter((r) => r.action === "needs_human").length} \`needs_human\` escalations + quality/confidence review
- **${reject.length} REJECT** — structural failure; re-prompt or manual fix
- **Do not apply yet** — await parent sign-off

## APPROVE (${approved.length})

See \`HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_APPROVE_IDS.txt\` for full list.

${approved.map((r) => `- \`${r.id}\` (part${String(r.kit_part).padStart(2, "0")}) — ${r.reason}`).join("\n") || "(none)"}

## REPAIR_CANDIDATE (${repairCandidates.length})

${repairCandidates.map((r) => `- \`${r.id}\` — ${r.reason}`).join("\n") || "(none)"}

## HOLD / REJECT (${nonApprove.filter((r) => r.verdict !== "REPAIR_CANDIDATE").length})

${nonApprove
  .filter((r) => r.verdict !== "REPAIR_CANDIDATE")
  .map(
    (r) =>
      `- \`${r.id}\` — **${r.verdict}** (${r.action || "?"}) — ${r.reason}${r.flags.length ? ` [${r.flags.slice(0, 5).join(", ")}${r.flags.length > 5 ? ", …" : ""}]` : ""}`
  )
  .join("\n") || "(none)"}

---
Machine eval: \`HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json\`  
Re-run: \`node _eval_he_has_more_editorial_gpt_all.mjs\`
`;

fs.writeFileSync(EVAL_MD, md);

console.log(
  JSON.stringify(
    {
      meta: {
        counts,
        by_action_verdict: byAction,
        top_failures: topFailures.slice(0, 10),
        approve: approved.length,
        hold: hold.length,
        reject: reject.length,
        repair: repairCandidates.length,
      },
    },
    null,
    2
  )
);
console.log("Wrote", GPT_OUT);
console.log("Wrote", EVAL_JSON);
console.log("Wrote", EVAL_MD);
console.log("Wrote", APPROVE_IDS);
