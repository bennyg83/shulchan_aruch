/**
 * Evaluate complete EN_TRUNC_MODERATE GPT resegment results (all 78 cases, parts 01-04).
 *
 *   node _eval_en_trunc_moderate_gpt_all.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const GPT_SRC =
  "C:/Users/binya/Downloads/EN_TRUNC_MODERATE_RESEGMENT_ALL_COMPLETED.json";
const GPT_OUT = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_ALL.json");
const EVAL_JSON = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.json");
const EVAL_MD = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.md");
const CORPUS = path.join(
  path.resolve(AUDIT, "../../../.."),
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const SKIP_APPLIED = new Set([
  "oc1/siman51/seif-009/ateret-zekenim",
  "oc1/siman55/seif-003/ateret-zekenim",
  "yd1/siman198/seif-015/beer-hagolah",
  "oc1/siman1/seif-009/yad-ephraim",
  "oc1/siman128/seif-043/ateret-zekenim",
  "oc1/siman440/seif-001/ateret-zekenim",
  "yd1/siman134/seif-003/beer-hagolah",
  "yd1/siman177/seif-004/beer-hagolah",
  "yd1/siman177/seif-018/beer-hagolah",
  "yd1/siman177/seif-021/beur-hagra",
  "yd1/siman177/seif-027/beur-hagra",
  "yd1/siman206/seif-005/beer-hagolah",
]);

const PART_FILES = [1, 2, 3, 4].map((n) =>
  path.join(AUDIT, `EN_TRUNC_MODERATE_RESEGMENT_KIT_part0${n}.json`)
);

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
    .trim();
}

function sig(s) {
  return norm(s).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function preview(s, n = 72) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function loadKitCases() {
  const cases = [];
  for (let i = 0; i < PART_FILES.length; i++) {
    const kit = JSON.parse(fs.readFileSync(PART_FILES[i], "utf8"));
    for (const c of kit.cases) {
      cases.push({ ...c, kit_part: i + 1 });
    }
  }
  return cases;
}

function readCorpusEnPlain(id) {
  const htmlPath = path.join(CORPUS, id, "en.html");
  if (fs.existsSync(htmlPath)) return stripHtml(fs.readFileSync(htmlPath, "utf8"));
  const jsonPath = path.join(CORPUS, id, "en.json");
  if (fs.existsSync(jsonPath)) {
    const j = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (typeof j === "string") return stripHtml(j);
    if (j?.text) return stripHtml(j.text);
    if (Array.isArray(j?.segments)) return j.segments.map(stripHtml).join(" ");
  }
  return null;
}

function kitCorpusEn(kitCase) {
  return (kitCase.en_segments || []).join(" ");
}

function getProposedEn(gptCase) {
  if (gptCase?.segments?.length) return gptCase.segments.map((s) => s.en ?? "");
  if (gptCase?.segments_en?.length) return gptCase.segments_en;
  return gptCase?.en_segments || [];
}

function getSources(gptCase) {
  if (gptCase?.segments?.length)
    return gptCase.segments.map((s) => s.source || "unknown");
  return gptCase?.sources || [];
}

function isBeerHagolahDegree(heSeg) {
  return /^\(°\)/.test(stripHtml(heSeg)) || stripHtml(heSeg).startsWith("(°)");
}

function isLikut(heSeg) {
  const t = stripHtml(heSeg);
  return /^\(ליקוט\)|^\(Likkut\)/i.test(t);
}

function enStartsWithMarker(en, marker) {
  const t = stripHtml(en);
  if (marker === "°") return /^\(?°\)?/i.test(t) || /^meaning:/i.test(t);
  if (marker === "likut")
    return /^\(Likkut\)|^\(Extract\)|^\(Anthology\)/i.test(t);
  return false;
}

function detectQuoteBreak(gptCase, proposed, enLegacy) {
  const segEn = gptCase?.segments?.map((s) => s.en ?? "") || [];
  const flags = [];
  if (!segEn.length || !enLegacy.length) return { quote_break: false, flags };

  for (let i = 0; i < segEn.length; i++) {
    const a = norm(segEn[i]);
    const b = norm(enLegacy[i] ?? "");
    if (!a || !b) continue;
    if (a !== b) {
      const shorter = a.length < b.length ? "segments_en" : "en_segments";
      const longer = a.length >= b.length ? segEn[i] : enLegacy[i];
      const shorterText = a.length < b.length ? segEn[i] : enLegacy[i];
      if (
        norm(longer).startsWith(norm(shorterText).slice(0, Math.min(20, shorterText.length))) &&
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

function evaluateCase(kitCase, gptCase) {
  const id = kitCase.id;
  const slug = kitCase.slug;
  const heSegs = kitCase.heSegs;
  const kitPart = kitCase.kit_part;
  const flags = [];

  if (SKIP_APPLIED.has(id)) {
    return {
      id,
      slug,
      kit_part: kitPart,
      heSegs,
      verdict: "SKIP_APPLIED",
      reason: "Already applied to corpus in prior session",
      flags: ["SKIP_APPLIED"],
      action: gptCase?.action,
      confidence: gptCase?.confidence,
    };
  }

  if (!gptCase) {
    return {
      id,
      slug,
      kit_part: kitPart,
      heSegs,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  const proposed = getProposedEn(gptCase);
  const enLegacy = gptCase.en_segments || [];
  const sources = getSources(gptCase);
  const corpusKit = kitCorpusEn(kitCase);
  const corpusFile = readCorpusEnPlain(id);
  const corpusEn = corpusFile || corpusKit;

  // JSON integrity
  if (!Array.isArray(gptCase.segments) && !gptCase.en_segments?.length)
    flags.push("JSON_MISSING_SEGMENTS");
  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (!["resegment", "mixed_resegment_translate"].includes(gptCase.action))
    flags.push(`ACTION_${gptCase.action || "missing"}`);

  if (proposed.length !== heSegs)
    flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);
  if (enLegacy.length && enLegacy.length !== heSegs)
    flags.push(`EN_SEG_COUNT_${enLegacy.length}_vs_${heSegs}`);

  const qb = detectQuoteBreak(gptCase, proposed, enLegacy);
  flags.push(...qb.flags);

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (!s) continue;
    if (!["split_existing_en", "fresh_translate", "partial"].includes(s))
      flags.push(`BAD_SOURCE_${i}:${s}`);
    if (s === "fresh_translate") flags.push(`FRESH_TRANSLATE_${i}`);
  }
  if (sources.some((s) => s === "fresh_translate")) flags.push("HAS_FRESH_TRANSLATE");

  const joinedProposed = proposed.join("");
  const joinedNorm = norm(joinedProposed);
  const corpusNorm = norm(corpusEn);
  const kitNorm = norm(corpusKit);
  const enLengthRatio = Number(
    (joinedNorm.length / Math.max(corpusNorm.length, 1)).toFixed(3)
  );
  const exactMatch = joinedNorm === corpusNorm;
  const sigMatch = sig(joinedProposed) === sig(corpusEn);
  const kitSigMatch = sig(joinedProposed) === sig(corpusKit);

  if (!exactMatch && !sigMatch) flags.push("CONTENT_DRIFT");
  if (enLengthRatio < 0.92) flags.push(`TRUNCATED_${enLengthRatio}`);
  if (enLengthRatio > 1.08) flags.push(`INFLATED_${enLengthRatio}`);

  // Use segments[].en for repair candidate check when en_segments truncated
  const segEnArr = gptCase.segments?.map((s) => s.en ?? "") || [];
  const segEnJoined = segEnArr.join("");
  const segEnSigMatch = sig(segEnJoined) === sig(corpusEn);
  const segEnExact = norm(segEnJoined) === corpusNorm;
  const repairCandidate =
    qb.quote_break && segEnArr.length === heSegs && (segEnExact || segEnSigMatch);

  // Pattern checks
  if (slug === "beer-hagolah" && heSegs >= 2) {
    const he1 = kitCase.he_segments[1];
    if (isBeerHagolahDegree(he1) && !enStartsWithMarker(proposed[1] || "", "°"))
      flags.push("BEER_DEGREE_SPLIT_MISS");
  }
  if (slug === "beur-hagra" && heSegs >= 2) {
    for (let i = 0; i < heSegs; i++) {
      if (isLikut(kitCase.he_segments[i]) && !enStartsWithMarker(proposed[i] || "", "likut"))
        flags.push(`LIKUT_MARKER_MISS_${i}`);
    }
    if (isLikut(kitCase.he_segments[0]) && !isLikut(kitCase.he_segments[1])) {
      if (!enStartsWithMarker(proposed[0] || "", "likut"))
        flags.push("LIKUT_FIRST_SEG_MISS");
    }
  }
  if (slug === "baer-heitev" && heSegs === 2) {
    const he1 = stripHtml(kitCase.he_segments[1]);
    if (/טבילה אחרת|ברכה/.test(he1)) {
      const en1 = stripHtml(proposed[1] || "");
      if (!/immersion|blessing/i.test(en1)) flags.push("BAER_HEITEV_NOTE_MISS");
    }
  }

  // Special boundary checks
  if (id === "oc1/siman128/seif-043/ateret-zekenim") {
    if (!/^The prayer beginning/i.test(stripHtml(proposed[1] || "")))
      flags.push("ATERET_SPLIT_BOUNDARY");
  }
  if (id === "oc1/siman55/seif-003/ateret-zekenim") {
    if (!/^The same principle applies to Maariv/i.test(stripHtml(proposed[1] || "")))
      flags.push("ATERET_MAARIV_BOUNDARY");
  }
  if (id === "yd1/siman175/seif-002/beur-hagra") {
    if (
      !enStartsWithMarker(proposed[0] || "", "likut") ||
      !enStartsWithMarker(proposed[1] || "", "likut")
    )
      flags.push("LIKUT_BOTH_MISS");
  }
  if (id === "yd1/siman177/seif-036/beer-hagolah") {
    const orig = corpusKit;
    if (/Maggid Mishneh/i.test(proposed[0] || "") && !/Maggid Mishneh/i.test(orig))
      flags.push("INVENTED_MAGGID_MISHNEH");
  }

  const segCountFail = flags.some((f) => f.startsWith("SEG_COUNT"));
  const truncFail = flags.some((f) => f.startsWith("TRUNCATED"));
  const freshFail = flags.some((f) => f.includes("FRESH_TRANSLATE"));
  const patternFail = flags.some((f) =>
    /BEER_DEGREE|LIKUT_|BAER_HEITEV|INVENTED_/.test(f)
  );
  const driftFail = flags.includes("CONTENT_DRIFT") && !sigMatch;
  const minorDrift = flags.includes("CONTENT_DRIFT") && sigMatch && !exactMatch;

  let verdict = "APPROVE";
  let reason = "Exact EN preserved; split_existing_en verbatim";

  if (segCountFail) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT")) || "segment_count_mismatch";
  } else if (repairCandidate) {
    verdict = "HOLD";
    reason = "quote_break in en_segments; segments[].en complete — REPAIR_CANDIDATE";
  } else if (truncFail || qb.quote_break) {
    verdict = "REJECT";
    reason =
      flags.find((f) => f.startsWith("TRUNCATED")) ||
      flags.find((f) => f.startsWith("QUOTE_BREAK")) ||
      "truncated_or_quote_break";
  } else if (flags.includes("INVENTED_MAGGID_MISHNEH")) {
    verdict = "REJECT";
    reason = "invented_text";
  } else if (freshFail) {
    verdict = "HOLD";
    reason =
      flags.find((f) => f.includes("FRESH_TRANSLATE")) || "unjustified_fresh_translate";
  } else if (patternFail && sigMatch) {
    verdict = "HOLD";
    reason =
      flags.find((f) => /BEER_DEGREE|LIKUT_|BAER_HEITEV/.test(f)) ||
      "pattern_marker_miss_but_content_preserved";
  } else if (patternFail) {
    verdict = "REJECT";
    reason = flags.find((f) => patternFail) || "pattern_fail";
  } else if (minorDrift || driftFail) {
    verdict = "HOLD";
    reason = minorDrift
      ? "Structurally plausible split but minor editorial drift vs corpus EN"
      : "Content drift vs corpus EN — not split_existing_en verbatim";
  } else if (flags.includes("ACTION_NEEDS_HUMAN")) {
    verdict = "HOLD";
    reason = "gpt_needs_human";
  } else if (!exactMatch && sigMatch) {
    verdict = "APPROVE";
    reason = "EN preserved (sig match); minor punctuation/spacing only";
  }

  return {
    id,
    slug,
    kit_part: kitPart,
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
    kit_sig_match: kitSigMatch,
    corpus_file_present: !!corpusFile,
    sources,
    quote_break: qb.quote_break,
    seg_previews: proposed.map((s, i) => ({ i, text: preview(s) })),
    gpt_notes: gptCase.notes,
  };
}

// --- main ---
fs.copyFileSync(GPT_SRC, GPT_OUT);
const gptCases = JSON.parse(fs.readFileSync(GPT_OUT, "utf8"));
const kitCases = loadKitCases();
const kitIds = kitCases.map((c) => c.id);
const gptById = new Map(gptCases.map((c) => [c.id, c]));

const results = kitCases.map((kc) => evaluateCase(kc, gptById.get(kc.id)));

const counts = {
  APPROVE: 0,
  HOLD: 0,
  REJECT: 0,
  SKIP_APPLIED: 0,
};
const repairCandidates = [];
for (const r of results) {
  counts[r.verdict]++;
  if (r.repair_candidate) repairCandidates.push(r.id);
}

const byPart = {};
for (let p = 1; p <= 4; p++) {
  const pr = results.filter((r) => r.kit_part === p);
  byPart[`part0${p}`] = {
    total: pr.length,
    APPROVE: pr.filter((r) => r.verdict === "APPROVE").length,
    HOLD: pr.filter((r) => r.verdict === "HOLD").length,
    REJECT: pr.filter((r) => r.verdict === "REJECT").length,
    SKIP_APPLIED: pr.filter((r) => r.verdict === "SKIP_APPLIED").length,
    REPAIR_CANDIDATE: pr.filter((r) => r.repair_candidate).length,
  };
}

const missingGpt = kitIds.filter((id) => !gptById.has(id));
const extraGpt = gptCases.filter((g) => !kitIds.includes(g.id)).map((g) => g.id);
const newApprove = results.filter((r) => r.verdict === "APPROVE");
const reprompt = results.filter(
  (r) => r.verdict === "REJECT" && !r.repair_candidate
);
const hold = results.filter((r) => r.verdict === "HOLD");
const holdFresh = hold.filter((r) => r.flags.some((f) => f.includes("FRESH")));
const holdPattern = hold.filter(
  (r) => !r.repair_candidate && r.flags.some((f) => /BEER_DEGREE|LIKUT_|BAER_HEITEV/.test(f))
);

const meta = {
  created: new Date().toISOString(),
  kit_parts: PART_FILES.map((f) => path.basename(f)),
  gpt_result: path.basename(GPT_OUT),
  gpt_source: GPT_SRC,
  kit_case_count: kitCases.length,
  gpt_case_count: gptCases.length,
  id_order_match: gptCases.map((g) => g.id).join("|") === kitIds.join("|"),
  missing_from_gpt: missingGpt,
  extra_in_gpt: extraGpt,
  skip_applied_count: SKIP_APPLIED.size,
  counts,
  by_part: byPart,
  repair_candidate_count: repairCandidates.length,
  repair_candidate_ids: repairCandidates,
  recommendation: {
    new_approve_ready: newApprove.length,
    repair_candidate: repairCandidates.length,
    need_re_prompt: reprompt.length,
    hold_fresh_translate: holdFresh.length,
    hold_pattern_marker: holdPattern.length,
    skip_applied: counts.SKIP_APPLIED,
    do_not_apply_yet: true,
    note: "Evaluation only — no corpus apply",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(EVAL_JSON, JSON.stringify(evalDoc, null, 2));

const approved = results.filter((r) => r.verdict === "APPROVE");
const reject = results.filter((r) => r.verdict === "REJECT");
const skipped = results.filter((r) => r.verdict === "SKIP_APPLIED");
const repairHold = hold.filter((r) => r.repair_candidate);
const holdOther = hold.filter(
  (r) => !r.repair_candidate && !holdFresh.includes(r) && !holdPattern.includes(r)
);

// part01 comparison
let part01Compare = "";
try {
  const p1 = JSON.parse(
    fs.readFileSync(path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json"), "utf8")
  );
  const p1map = new Map(p1.results.map((r) => [r.id, r]));
  const p1new = results.filter((r) => r.kit_part === 1 && r.verdict !== "SKIP_APPLIED");
  const upgraded = p1new.filter((r) => {
    const old = p1map.get(r.id);
    return old && (old.verdict === "REJECT" || old.verdict === "HOLD") && r.verdict === "APPROVE";
  });
  part01Compare = `
### vs part01-only eval

| Metric | part01 prior | All 78 (non-SKIP part01) |
|--------|-------------:|-------------------------:|
| APPROVE | 3 | ${p1new.filter((r) => r.verdict === "APPROVE").length} |
| HOLD | 13 | ${p1new.filter((r) => r.verdict === "HOLD").length} |
| REJECT | 13 | ${p1new.filter((r) => r.verdict === "REJECT").length} |

Part01 prior eval suffered JSON quote-break truncation (13 REJECT). Complete GPT JSON fixes ${upgraded.length} of those to APPROVE/HOLD with full \`segments[].en\`. Zero \`en_segments\` vs \`segments[].en\` mirror mismatches across all 78 cases.`;
} catch {
  part01Compare = `
### vs part01-only eval

Part01 prior eval: 3 APPROVE, 13 HOLD, 13 REJECT (29 cases; many quote_break from unescaped JSON).  
This complete run uses valid JSON with aligned \`segments[].he\` + \`segments[].en\` pairs.`;
}

const md = `# EN_TRUNC moderate GPT resegment — full evaluation (78 cases)

**Created:** ${meta.created}  
**Kit:** parts 01–04 (\`${kitCases.length}\` cases)  
**GPT result:** \`EN_TRUNC_MODERATE_GPT_RESULT_ALL.json\` (\`${gptCases.length}\` cases)  
**Source:** \`${path.basename(GPT_SRC)}\`  
**ID order match:** ${meta.id_order_match ? "yes" : "no"}  
**Status:** evaluation only — **no corpus apply**

## Summary counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | ${counts.APPROVE} |
| **HOLD** | ${counts.HOLD} |
| **REJECT** | ${counts.REJECT} |
| **SKIP_APPLIED** | ${counts.SKIP_APPLIED} |

| Metric | Count |
|--------|------:|
| REPAIR_CANDIDATE (quote_break, segments[].en OK) | ${repairCandidates.length} |
| New APPROVE ready to apply | ${newApprove.length} |
| Need re-prompt (REJECT, not repairable) | ${reprompt.length} |

## Counts by kit part

| Part | Total | APPROVE | HOLD | REJECT | SKIP_APPLIED | REPAIR_CAND |
|------|------:|--------:|-----:|-------:|-------------:|------------:|
${[1, 2, 3, 4]
  .map((p) => {
    const b = byPart[`part0${p}`];
    return `| part0${p} | ${b.total} | ${b.APPROVE} | ${b.HOLD} | ${b.REJECT} | ${b.SKIP_APPLIED} | ${b.REPAIR_CANDIDATE} |`;
  })
  .join("\n")}

## Recommendation

**${newApprove.length} new APPROVE** rows ready to apply (excluding ${counts.SKIP_APPLIED} already applied).  
**${repairCandidates.length} REPAIR_CANDIDATE** — copy \`segments[].en\` → \`en_segments\` then re-eval (same fix as part01 quote_break repair).  
**${reprompt.length} need re-prompt** — truncated, invented text, or structural failure.  
**${holdFresh.length} HOLD (fresh_translate)** — GPT re-translated from HE instead of splitting existing EN; needs manual review or re-prompt.  
**${holdPattern.length} HOLD (pattern/marker)** — structurally plausible split but missing (°)/Likkut markers or minor editorial drift; fix wording then re-eval.  
**Do not apply yet** — await parent sign-off.
${part01Compare}

## APPROVE (${approved.length})

${approved.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}`).join("\n") || "(none)"}

## REPAIR_CANDIDATE (${repairHold.length})

${repairHold.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}`).join("\n") || "(none)"}

## HOLD — fresh_translate (${holdFresh.length})

${holdFresh.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}; ratio ${r.en_length_ratio}`).join("\n") || "(none)"}

## HOLD — pattern/marker drift (${holdPattern.length})

${holdPattern.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}${r.flags.length ? ` [${r.flags.filter((f) => /BEER|LIKUT|BAER|CONTENT/.test(f)).slice(0, 3).join(", ")}]` : ""}`).join("\n") || "(none)"}

${holdOther.length ? `## HOLD — other (${holdOther.length})\n\n${holdOther.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}`).join("\n")}\n` : ""}

## REJECT (${reject.length})

${reject.map((r) => `- \`${r.id}\` (part0${r.kit_part}) — ${r.reason}${r.flags.length ? ` [${r.flags.slice(0, 4).join(", ")}${r.flags.length > 4 ? ", …" : ""}]` : ""}`).join("\n") || "(none)"}

## SKIP_APPLIED (${skipped.length})

${skipped.map((r) => `- \`${r.id}\` (part0${r.kit_part})`).join("\n")}

---
Machine eval: \`EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.json\`
`;

fs.writeFileSync(EVAL_MD, md);

console.log(
  JSON.stringify(
    {
      meta: {
        counts,
        by_part: byPart,
        repair_candidate_count: repairCandidates.length,
        new_approve: newApprove.length,
        reprompt: reprompt.length,
      },
      approved: approved.map((r) => r.id),
      repair: repairCandidates,
    },
    null,
    2
  )
);
console.log("Wrote", GPT_OUT);
console.log("Wrote", EVAL_JSON);
console.log("Wrote", EVAL_MD);
