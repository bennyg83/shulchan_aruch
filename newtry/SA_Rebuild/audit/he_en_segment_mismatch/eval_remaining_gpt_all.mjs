/**
 * Evaluate all 10 _REMAINING GPT result batches (kits 01–10).
 *
 *   node eval_remaining_gpt_all.mjs
 *   node eval_remaining_gpt_all.mjs --kit EN_TRUNC_MODERATE_REMAINING
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CORPUS_ROOT,
  RAW_HE_ABBREV,
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
  preview,
  readCorpusEnPlain,
  sig,
  sigIgnoreMarkersFromSegs,
  splitHtmlByBrSegments,
  stripHtml,
  stripLeadingEnMarker,
  writeEvalOutputs,
} from "./_eval_remaining_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;

const REUPLOAD_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "FULL_REUPLOAD_2026-08-30"
);

/** Full reupload 2026-08-30 — 39 open cases across kits 03/04/06/07/10; empty kits = []. */
export const REMAINING_KITS = [
  {
    num: "01",
    kit: "EN_MISSING_2_REMAINING",
    src: path.join(REUPLOAD_DIR, "01_EN_MISSING_2_REMAINING_COMPLETED.json"),
    mode: "fresh_translate",
    expected: 0,
  },
  {
    num: "02",
    kit: "EN_HAS_MORE_REMAINING",
    src: path.join(REUPLOAD_DIR, "02_EN_HAS_MORE_REMAINING_COMPLETED.json"),
    mode: "rewrite_en_by_he_slot",
    expected: 0,
  },
  {
    num: "03",
    kit: "EN_TRUNC_MODERATE_REMAINING",
    src: path.join(REUPLOAD_DIR, "03_EN_TRUNC_MODERATE_REMAINING_COMPLETED.json"),
    // Reupload used mixed_resegment_translate / fresh_translate for trunc gaps
    mode: "resegment_mixed",
    expected: 11,
  },
  {
    num: "04",
    kit: "BEER_DEGREE_SPLIT_REMAINING",
    src: path.join(REUPLOAD_DIR, "04_BEER_DEGREE_SPLIT_REMAINING_COMPLETED.json"),
    mode: "resegment_mixed",
    expected: 2,
  },
  {
    num: "05",
    kit: "EN_TRUNC_REMAINING",
    src: path.join(REUPLOAD_DIR, "05_EN_TRUNC_REMAINING_COMPLETED.json"),
    mode: "resegment_mixed",
    expected: 0,
  },
  {
    num: "06",
    kit: "HE_HAS_MORE_LIKUT_REMAINING",
    src: path.join(REUPLOAD_DIR, "06_HE_HAS_MORE_LIKUT_REMAINING_COMPLETED.json"),
    mode: "likut_split",
    expected: 9,
  },
  {
    num: "07",
    kit: "HE_HAS_MORE_LIKUT_MERGED_REMAINING",
    src: path.join(REUPLOAD_DIR, "07_HE_HAS_MORE_LIKUT_MERGED_REMAINING_COMPLETED.json"),
    mode: "likut_merged",
    expected: 1,
  },
  {
    num: "08",
    kit: "HE_HAS_MORE_OFFSET_REMAINING",
    src: path.join(REUPLOAD_DIR, "08_HE_HAS_MORE_OFFSET_REMAINING_COMPLETED.json"),
    mode: "editorial",
    expected: 0,
  },
  {
    num: "09",
    kit: "EN_TRUNC_EDITORIAL_REMAINING",
    src: path.join(REUPLOAD_DIR, "09_EN_TRUNC_EDITORIAL_REMAINING_COMPLETED.json"),
    mode: "fresh_translate_editorial",
    expected: 0,
  },
  {
    num: "10",
    kit: "HE_HAS_MORE_EDITORIAL_REMAINING",
    src: path.join(REUPLOAD_DIR, "10_HE_HAS_MORE_EDITORIAL_REMAINING_COMPLETED.json"),
    mode: "editorial",
    expected: 16,
  },
];

function checkPatternMarkers(kitCase, proposed, flags) {
  const slug = kitCase.slug;
  const heSegs = kitCase.heSegs;
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
}

function evalFreshTranslate(kitCase, gptCase) {
  const flags = [];
  const heSegs = kitCase.heSegs;
  const id = kitCase.id;

  if (!gptCase)
    return { id, verdict: "REJECT", reason: "missing_from_gpt", flags: ["MISSING"] };

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || [];

  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (proposed.length !== heSegs) flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);
  if (enLegacy.length && enLegacy.length !== heSegs)
    flags.push(`EN_SEG_COUNT_${enLegacy.length}_vs_${heSegs}`);

  for (let i = 0; i < heSegs; i++) {
    const en = stripHtml(proposed[i] || "");
    if (!en || en.length < 8) flags.push(`EMPTY_EN_${i}`);
    flags.push(...checkFreshTranslateSlot(kitCase.he_segments[i], proposed[i] || "", i));
  }
  flags.push(...checkFailurePatternsJoined(proposed));
  checkPatternMarkers(kitCase, proposed, flags);

  const qb = detectQuoteBreak(gptCase, proposed, enLegacy);
  flags.push(...qb.flags);

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    (norm(segEnArr.join("")) === norm(proposed.join("")) ||
      sig(segEnArr.join("")) === sig(proposed.join("")));

  let verdict = "APPROVE";
  let reason = "fresh_translate complete";

  if (flags.some((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"))) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"));
  } else if (repairCandidate) {
    verdict = "REPAIR_CANDIDATE";
    reason = "quote_break; segments[].en complete";
  } else if (flags.includes("ACTION_NEEDS_HUMAN")) {
    verdict = "HOLD";
    reason = "gpt_needs_human";
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
    action: gptCase.action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    repair_candidate: repairCandidate,
    flags,
    gpt_notes: gptCase.notes,
  };
}

function evalRewriteEnByHeSlot(kitCase, gptCase) {
  const flags = [];
  const heSegs = kitCase.heSegs;
  const id = kitCase.id;

  if (!gptCase)
    return { id, verdict: "REJECT", reason: "missing_from_gpt", flags: ["MISSING"] };

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || gptCase.corrected_en || [];

  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (proposed.length !== heSegs) flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);

  for (let i = 0; i < heSegs; i++) {
    flags.push(...checkFreshTranslateSlot(kitCase.he_segments[i], proposed[i] || "", i));
  }
  flags.push(...checkFailurePatternsJoined(proposed));
  checkPatternMarkers(kitCase, proposed, flags);

  const qb = detectQuoteBreak(gptCase, proposed, enLegacy);
  flags.push(...qb.flags);

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    sig(segEnArr.join("")) === sig(proposed.join(""));

  let verdict = "APPROVE";
  let reason = "rewrite_en_by_he_slot OK";

  if (flags.some((f) => f.startsWith("SEG_COUNT"))) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT"));
  } else if (repairCandidate) {
    verdict = "REPAIR_CANDIDATE";
    reason = "quote_break; segments[].en complete";
  } else if (flags.includes("ACTION_NEEDS_HUMAN")) {
    verdict = "HOLD";
    reason = "gpt_needs_human";
  } else if (
    flags.some((f) =>
      /SHORT_FRESH|HEBREW_IN_FRESH|RAW_HE_ABBREV|FAILURE/.test(f)
    )
  ) {
    verdict = "HOLD";
    reason = "rewrite_quality";
  } else if (gptCase.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
  }

  return {
    id,
    slug: kitCase.slug,
    heSegs,
    enSegs: kitCase.enSegs,
    action: gptCase.action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    repair_candidate: repairCandidate,
    flags,
    gpt_notes: gptCase.notes,
  };
}

function evalResegment(kitCase, gptCase, { allowFresh = false } = {}) {
  const flags = [];
  const id = kitCase.id;
  const heSegs = kitCase.heSegs;
  const slug = kitCase.slug;

  if (!gptCase)
    return { id, verdict: "REJECT", reason: "missing_from_gpt", flags: ["MISSING"] };

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || [];
  const sources = getSources(gptCase);
  const corpusKit = kitCorpusEn(kitCase);
  const corpusFile = readCorpusEnPlain(id);
  const corpusEn = corpusFile || corpusKit;

  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
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

  if (!allowFresh && freshIdx.length) flags.push("HAS_FRESH_TRANSLATE");

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

  if (splitIdx.length && freshIdx.length === 0) {
    if (!exactMatch && !sigMatch && !sigMatchIgnoreMarkers)
      flags.push("CONTENT_DRIFT");
    if (enLengthRatio < 0.92) flags.push(`TRUNCATED_${enLengthRatio}`);
    if (enLengthRatio > 1.08) flags.push(`INFLATED_${enLengthRatio}`);
  } else if (freshIdx.length) {
    for (const i of freshIdx) {
      flags.push(
        ...checkFreshTranslateSlot(kitCase.he_segments[i], proposed[i] || "", i)
      );
    }
    if (enLengthRatio < 0.85) flags.push(`MIXED_TRUNCATED_${enLengthRatio}`);
  }

  checkPatternMarkers(kitCase, proposed, flags);

  for (let i = 0; i < heSegs; i++) {
    if (!stripHtml(proposed[i] || "")) flags.push(`EMPTY_EN_${i}`);
  }

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    (norm(segEnArr.join("")) === corpusNorm || sig(segEnArr.join("")) === sig(corpusEn)) &&
    !flags.some((f) => f.startsWith("SEG_COUNT"));

  let verdict = "APPROVE";
  let reason = exactMatch
    ? "split_existing_en verbatim"
    : sigMatch
      ? "split_existing_en sig match"
      : "resegment OK";

  if (flags.some((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"))) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN"));
  } else if (repairCandidate) {
    verdict = "REPAIR_CANDIDATE";
    reason = "quote_break; segments[].en complete";
  } else if (
    flags.some((f) => /TRUNCATED_|QUOTE_BREAK|INFLATED_/.test(f)) &&
    !repairCandidate
  ) {
    verdict = "REJECT";
    reason = "truncated_or_quote_break";
  } else if (flags.includes("HAS_FRESH_TRANSLATE") && !allowFresh) {
    verdict = "HOLD";
    reason = "unjustified_fresh_translate";
  } else if (flags.includes("CONTENT_DRIFT") && !sigMatch && !sigMatchIgnoreMarkers && !freshIdx.length) {
    verdict = "HOLD";
    reason = "content_drift_vs_corpus_en";
  } else if (flags.some((f) => /BEER_DEGREE|LIKUT_MARKER/.test(f))) {
    verdict = sigMatch || sigMatchIgnoreMarkers || freshIdx.length ? "HOLD" : "REJECT";
    reason = "pattern_marker_miss";
  } else if (
    freshIdx.length &&
    flags.some((f) => /SHORT_FRESH|HEBREW_IN_FRESH|FAILURE_FRESH/.test(f))
  ) {
    verdict = "HOLD";
    reason = "fresh_translate_quality";
  } else if (flags.includes("ACTION_NEEDS_HUMAN")) {
    verdict = "HOLD";
    reason = "gpt_needs_human";
  }

  return {
    id,
    slug,
    heSegs,
    action: gptCase.action,
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

function evalEditorial(kitCase, gptCase) {
  const flags = [];
  const id = kitCase.id;
  const heSegs = kitCase.heSegs;
  const enSegs = kitCase.enSegs;

  if (!gptCase)
    return { id, verdict: "REJECT", reason: "missing_from_gpt", flags: ["MISSING"] };

  const action = gptCase.action;
  if (action === "needs_human") {
    return {
      id,
      slug: kitCase.slug,
      heSegs,
      enSegs,
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

  if (action === "split_en" && freshIdx.length)
    flags.push("SPLIT_EN_HAS_FRESH_TRANSLATE");

  for (const i of freshIdx) {
    flags.push(
      ...checkFreshTranslateSlot(kitCase.he_segments[i], proposed[i] || "", i)
    );
  }

  const joinedProposed = proposed.join("");
  const joinedNorm = norm(joinedProposed);
  const corpusNorm = norm(corpusKit);
  const exactMatch = joinedNorm === corpusNorm;
  const sigMatch = sig(joinedProposed) === sig(corpusKit);
  const corpusSegs =
    Array.isArray(kitCase.en_segments) && kitCase.en_segments.length
      ? kitCase.en_segments
      : [corpusKit];
  const sigMatchIgnoreMarkers =
    sigIgnoreMarkersFromSegs(proposed) ===
    sigIgnoreMarkersFromSegs(corpusSegs);

  if (splitIdx.length && freshIdx.length === 0) {
    if (!exactMatch && !sigMatch && !sigMatchIgnoreMarkers)
      flags.push("CONTENT_DRIFT");
  }

  for (let i = 0; i < heSegs; i++) {
    if (isLikut(kitCase.he_segments[i])) {
      if (!/^\(Likkut\)/i.test(stripHtml(proposed[i] || "")))
        flags.push(`LIKUT_MARKER_MISS_${i}`);
    }
    if (!stripHtml(proposed[i] || "")) flags.push(`EMPTY_EN_${i}`);
  }

  checkPatternMarkers(kitCase, proposed, flags);

  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const repairCandidate =
    qb.quote_break &&
    segEnArr.length === heSegs &&
    (norm(segEnArr.join("")) === corpusNorm || sig(segEnArr.join("")) === sig(corpusKit)) &&
    !flags.some((f) => f.startsWith("SEG_COUNT"));

  let verdict = "APPROVE";
  let reason = "editorial resegment OK";

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
    flags.some((f) => /QUOTE_BREAK|TRUNCATED_/.test(f)) &&
    !repairCandidate
  ) {
    verdict = "REJECT";
    reason = "truncated_or_quote_break";
  } else if (flags.includes("CONTENT_DRIFT") && !sigMatch && !sigMatchIgnoreMarkers && !freshIdx.length) {
    verdict = "HOLD";
    reason = "content_drift";
  } else if (
    freshIdx.length &&
    flags.some((f) => /SHORT_FRESH|HEBREW_IN_FRESH|FAILURE_FRESH/.test(f))
  ) {
    verdict = "HOLD";
    reason = "fresh_translate_quality";
  } else if (flags.some((f) => /LIKUT_MARKER_MISS/.test(f))) {
    verdict = sigMatch || sigMatchIgnoreMarkers || freshIdx.length ? "HOLD" : "REJECT";
    reason = "likut_marker_miss";
  } else if (gptCase.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
  }

  return {
    id,
    slug: kitCase.slug,
    heSegs,
    enSegs,
    action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    repair_candidate: repairCandidate,
    flags,
    exact_match: exactMatch,
    sig_match: sigMatch,
    gpt_notes: gptCase.notes,
  };
}

function evalLikutSplit(kitCase, gptCase) {
  const r = evalEditorial(kitCase, gptCase);
  if (gptCase?.merge_groups) {
    r.flags = [...(r.flags || []), "FORBIDDEN_MERGE_GROUPS"];
    if (r.verdict === "APPROVE") {
      r.verdict = "REJECT";
      r.reason = "forbidden_merge_groups";
    }
  }
  return r;
}

const EVAL_FN = {
  fresh_translate: evalFreshTranslate,
  rewrite_en_by_he_slot: evalRewriteEnByHeSlot,
  resegment: (kc, gc) => evalResegment(kc, gc, { allowFresh: false }),
  split_en: (kc, gc) => evalResegment(kc, gc, { allowFresh: false }),
  resegment_mixed: (kc, gc) => evalResegment(kc, gc, { allowFresh: true }),
  likut_split: evalLikutSplit,
  likut_merged: evalLikutSplit,
  editorial: evalEditorial,
  fresh_translate_editorial: evalFreshTranslate,
};

function evaluateKit(cfg) {
  const gptOut = path.join(AUDIT, `${cfg.kit}_GPT_RESULT.json`);
  const reuploadOut = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_REUPLOAD.json`);
  const reuseLocal = process.argv.includes("--reuse-local");
  if (!reuseLocal) {
    if (!fs.existsSync(cfg.src)) {
      throw new Error(`Missing GPT source: ${cfg.src}`);
    }
    fs.copyFileSync(cfg.src, gptOut);
    fs.copyFileSync(cfg.src, reuploadOut);
  } else if (!fs.existsSync(gptOut)) {
    throw new Error(`--reuse-local but missing ${gptOut}`);
  }
  const gptCases = JSON.parse(fs.readFileSync(gptOut, "utf8").replace(/^\uFEFF/, ""));
  const kitCases = loadKitCases(AUDIT, cfg.kit);
  const gptById = new Map(gptCases.map((c) => [c.id, c]));
  const evalFn = EVAL_FN[cfg.mode];
  if (!evalFn) throw new Error(`No eval fn for mode ${cfg.mode}`);

  const results = kitCases.map((kc) => {
    const r = evalFn(kc, gptById.get(kc.id));
    // Corpus already he/en segment-aligned → SKIP_APPLIED (do not re-apply)
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
  const kitIds = kitCases.map((c) => c.id);
  const missingGpt = kitIds.filter((id) => !gptById.has(id));
  const extraGpt = gptCases.filter((g) => !kitIds.includes(g.id)).map((g) => g.id);

  const meta = {
    created: new Date().toISOString(),
    kit: cfg.kit,
    kit_num: cfg.num,
    mode: cfg.mode,
    gpt_source: reuseLocal ? gptOut : cfg.src,
    gpt_result: path.basename(gptOut),
    gpt_result_reupload: path.basename(reuploadOut),
    batch: "full_reupload_all_10_2026-08-30",
    reuse_local: reuseLocal,
    kit_case_count: kitCases.length,
    gpt_case_count: gptCases.length,
    expected: cfg.expected,
    id_order_match: gptCases.map((g) => g.id).join("|") === kitIds.join("|"),
    missing_from_gpt: missingGpt,
    extra_in_gpt: extraGpt,
    summary: `${cfg.kit}: ${results.filter((r) => r.verdict === "APPROVE").length} APPROVE, ${results.filter((r) => r.verdict === "HOLD").length} HOLD, ${results.filter((r) => r.verdict === "REJECT").length} REJECT, ${results.filter((r) => r.verdict === "REPAIR_CANDIDATE").length} REPAIR_CANDIDATE, ${results.filter((r) => r.verdict === "SKIP_APPLIED").length} SKIP_APPLIED`,
  };

  const { counts } = writeEvalOutputs(AUDIT, cfg.kit, meta, results);
  console.log(
    `[eval] ${cfg.kit}: APPROVE=${counts.APPROVE || 0} HOLD=${counts.HOLD || 0} REJECT=${counts.REJECT || 0} REPAIR=${counts.REPAIR_CANDIDATE || 0}`
  );
  return { cfg, meta, results, counts, gptCases };
}

function main() {
  const kitArg = process.argv.find((a, i) => process.argv[i - 1] === "--kit");
  const kits = kitArg
    ? REMAINING_KITS.filter((k) => k.kit === kitArg)
    : REMAINING_KITS;

  if (!kits.length) {
    console.error(`Unknown kit: ${kitArg}`);
    process.exit(1);
  }

  const summary = [];
  for (const cfg of kits) {
    const out = evaluateKit(cfg);
    summary.push({
      kit: cfg.kit,
      num: cfg.num,
      ...out.counts,
      applied_ready:
        (out.counts.APPROVE || 0) + (out.counts.REPAIR_CANDIDATE || 0),
    });
  }

  const summaryPath = path.join(AUDIT, "REMAINING_GPT_EVAL_SUMMARY.json");
  fs.writeFileSync(
    summaryPath,
    JSON.stringify({ created: new Date().toISOString(), kits: summary }, null, 2) + "\n",
    "utf8"
  );
  console.log(`\n[eval] summary → ${summaryPath}`);
}

import { pathToFileURL } from "url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
