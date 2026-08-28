/**
 * Evaluate EN_TRUNC_MODERATE GPT resegment results (part01).
 * Extracts GPT JSON from parent transcript (he fields may have unescaped quotes).
 *
 *   node _eval_en_trunc_moderate_gpt.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractGptBlob, parseGptCases } from "./_parse_gpt_moderate.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const KIT = path.join(AUDIT, "EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json");
const GPT_OUT = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_part01.json");
const EVAL_JSON = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json");
const EVAL_MD = path.join(AUDIT, "EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.md");
const TRANSCRIPT =
  "C:/Users/binya/.cursor/projects/c-Users-binya-Documents-shulchan-aruch-clean-Copy-2/agent-transcripts/def433f8-6547-455d-88af-6219f3e689f2/def433f8-6547-455d-88af-6219f3e689f2.jsonl";
const CORPUS = path.join(
  path.resolve(AUDIT, "../../../.."),
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
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
    .trim()
    .toLowerCase();
}

function preview(s, n = 72) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function extractGptData() {
  if (fs.existsSync(GPT_OUT)) {
    try {
      const d = JSON.parse(fs.readFileSync(GPT_OUT, "utf8"));
      if (Array.isArray(d) && d.length && d[0].segments_en?.length) return d;
    } catch {
      /* reparse */
    }
  }
  const blob = extractGptBlob(TRANSCRIPT);
  const cases = parseGptCases(blob);
  fs.writeFileSync(GPT_OUT, JSON.stringify(cases, null, 2));
  return cases;
}

function heLemmaOpen(heSeg) {
  const t = stripHtml(heSeg);
  const m = t.match(/^\(([^)]+)\)/);
  return m ? m[1] : null;
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

function semanticOverlap(he, en) {
  const h = norm(he);
  const e = norm(en);
  if (!h || !e) return 0;
  const hWords = [...new Set(h.split(/\s+/).filter((w) => w.length >= 4))];
  if (!hWords.length) return 0.5;
  let hit = 0;
  for (const w of hWords.slice(0, 12)) {
    if (e.includes(w)) hit++;
  }
  return hit / Math.min(hWords.length, 12);
}

function joinOriginalEn(c) {
  return (c.en_segments || []).join(" ");
}

function enReconstructable(originalEn, proposedSegs) {
  const o = norm(originalEn);
  const p = norm(proposedSegs.join(" "));
  if (!o || !p) return { ok: false, reason: "empty" };
  const ratio = p.length / o.length;
  if (ratio < 0.92 || ratio > 1.08)
    return { ok: false, reason: `length_ratio_${ratio.toFixed(2)}` };
  // char multiset rough check
  const sig = (s) => s.replace(/[^a-z0-9]/g, "");
  if (sig(o) !== sig(p)) return { ok: false, reason: "content_drift" };
  return { ok: true, ratio };
}

function loadCorpusEn(id) {
  const p = path.join(CORPUS, id, "en.json");
  if (!fs.existsSync(p)) return null;
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return j;
  } catch {
    return null;
  }
}

function evaluateCase(kitCase, gptCase) {
  const flags = [];
  const heSegs = kitCase.heSegs;
  const id = kitCase.id;
  const slug = kitCase.slug;
  const proposed = (gptCase?.segments_en?.length === heSegs
    ? gptCase.segments_en
    : gptCase?.en_segments) || [];
  const sources = gptCase?.sources || [];

  if (!gptCase) {
    return {
      id,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  // structural
  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (!["resegment", "mixed_resegment_translate"].includes(gptCase.action))
    flags.push(`ACTION_${gptCase.action || "missing"}`);

  if (proposed.length !== heSegs)
    flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);

  const legacy = gptCase.en_segments || [];
  const segEn = gptCase.segments_en || [];
  if (
    legacy.length === heSegs &&
    segEn.length === heSegs &&
    legacy.map(norm).join("|") !== segEn.map(norm).join("|")
  )
    flags.push("EN_SEGMENTS_MIRROR_MISMATCH");

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (!s) continue;
    if (!["split_existing_en", "fresh_translate", "partial"].includes(s))
      flags.push(`BAD_SOURCE_${i}:${s}`);
    if (s === "fresh_translate") flags.push(`FRESH_TRANSLATE_${i}`);
  }
  if (sources.length && sources.every((s) => s === "split_existing_en")) {
    /* good */
  } else if (sources.some((s) => s === "fresh_translate")) {
    flags.push("HAS_FRESH_TRANSLATE");
  }

  const recon = enReconstructable(joinOriginalEn(kitCase), proposed);
  if (!recon.ok) flags.push(`RECON_${recon.reason}`);

  // semantic per segment
  const overlaps = [];
  for (let i = 0; i < heSegs; i++) {
    overlaps.push(semanticOverlap(kitCase.he_segments[i], proposed[i] || ""));
  }
  const avgOverlap = overlaps.reduce((a, b) => a + b, 0) / heSegs;

  // pattern checks
  if (slug === "beer-hagolah" && heSegs >= 2) {
    const he1 = kitCase.he_segments[1];
    if (isBeerHagolahDegree(he1)) {
      if (!enStartsWithMarker(proposed[1] || "", "°"))
        flags.push("BEER_DEGREE_SPLIT_MISS");
    }
  }
  if (slug === "beur-hagra" && heSegs >= 2) {
    for (let i = 0; i < heSegs; i++) {
      if (isLikut(kitCase.he_segments[i])) {
        if (!enStartsWithMarker(proposed[i] || "", "likut"))
          flags.push(`LIKUT_MARKER_MISS_${i}`);
      }
    }
    // Gra: if seg0 is likut and seg1 is main - check order
    if (isLikut(kitCase.he_segments[0]) && !isLikut(kitCase.he_segments[1])) {
      if (!enStartsWithMarker(proposed[0] || "", "likut"))
        flags.push("LIKUT_FIRST_SEG_MISS");
    }
  }

  // baer-heitev parenthetical note
  if (slug === "baer-heitev" && heSegs === 2) {
    const he1 = stripHtml(kitCase.he_segments[1]);
    if (/טבילה אחרת|ברכה/.test(he1)) {
      const en1 = stripHtml(proposed[1] || "");
      if (!/immersion|blessing/i.test(en1)) flags.push("BAER_HEITEV_NOTE_MISS");
    }
  }

  // invented text heuristic: very low overlap on any segment
  for (let i = 0; i < overlaps.length; i++) {
    if (overlaps[i] < 0.08 && proposed[i]?.length > 40)
      flags.push(`LOW_SEMANTIC_${i}:${overlaps[i].toFixed(2)}`);
  }

  // verdict
  const hardFail = flags.some((f) =>
    [
      "MISSING",
      "SEG_COUNT",
      "RECON_content_drift",
      "EN_SEGMENTS_MIRROR_MISMATCH",
      "HAS_FRESH_TRANSLATE",
      "FRESH_TRANSLATE",
      "BEER_DEGREE_SPLIT_MISS",
      "LIKUT_MARKER_MISS",
      "LIKUT_FIRST_SEG_MISS",
      "BAER_HEITEV_NOTE_MISS",
    ].some((pfx) => f.startsWith(pfx))
  );
  const segCountFail = flags.some((f) => f.startsWith("SEG_COUNT"));
  const reconFail = flags.some((f) => f.startsWith("RECON_"));
  const freshFail = flags.some((f) => f.includes("FRESH_TRANSLATE"));
  const patternFail = flags.some((f) =>
    /BEER_DEGREE|LIKUT_|BAER_HEITEV/.test(f)
  );

  let verdict = "APPROVE";
  let reason = "structural+semantic OK; split_existing_en";

  if (!gptCase || segCountFail) {
    verdict = "REJECT";
    reason = flags.find((f) => f.startsWith("SEG_COUNT")) || "structural_fail";
  } else if (reconFail || freshFail || patternFail) {
    verdict = "HOLD";
    reason =
      flags.find((f) => reconFail && f.startsWith("RECON_")) ||
      flags.find((f) => freshFail) ||
      flags.find((f) => patternFail) ||
      "needs_review";
  } else if (flags.includes("ACTION_NEEDS_HUMAN")) {
    verdict = "HOLD";
    reason = "gpt_needs_human";
  } else if (avgOverlap < 0.15 && heSegs === 2) {
    verdict = "HOLD";
    reason = "weak_semantic_overlap";
  } else if (flags.some((f) => f.startsWith("LOW_SEMANTIC"))) {
    verdict = "HOLD";
    reason = "low_segment_overlap";
  }

  // Special case: yad-ephraim long split - check boundary cue
  if (id === "oc1/siman1/seif-009/yad-ephraim") {
    const en0 = proposed[0] || "";
    const en1 = proposed[1] || "";
    if (!/What remains difficult|humble opinion/i.test(en1))
      flags.push("BOUNDARY_CUE_WEAK");
    if (!/Understand this carefully/i.test(en0))
      flags.push("SEG0_END_CUE_WEAK");
    if (flags.includes("BOUNDARY_CUE_WEAK")) {
      verdict = "HOLD";
      reason = "boundary_cue_weak";
    }
  }

  // oc1/siman128 - split at "The prayer beginning"
  if (id === "oc1/siman128/seif-043/ateret-zekenim") {
    if (!/^The prayer beginning/i.test(stripHtml(proposed[1] || ""))) {
      verdict = "HOLD";
      reason = "wrong_split_boundary";
      flags.push("ATERET_SPLIT_BOUNDARY");
    }
  }

  // oc1/siman55 - second seg should start with Maariv topic
  if (id === "oc1/siman55/seif-003/ateret-zekenim") {
    const en1 = stripHtml(proposed[1] || "");
    if (!/^The same principle applies to Maariv/i.test(en1)) {
      verdict = "HOLD";
      reason = "wrong_split_boundary";
      flags.push("ATERET_MAARIV_BOUNDARY");
    }
  }

  // yd1/siman175 - both segments are Likut
  if (id === "yd1/siman175/seif-002/beur-hagra") {
    if (
      !enStartsWithMarker(proposed[0] || "", "likut") ||
      !enStartsWithMarker(proposed[1] || "", "likut")
    ) {
      verdict = "HOLD";
      reason = "likut_both_segs";
      flags.push("LIKUT_BOTH_MISS");
    }
  }

  // yd1/siman177/seif-036 - invented Maggid Mishneh?
  if (id === "yd1/siman177/seif-036/beer-hagolah") {
    const orig = joinOriginalEn(kitCase);
    if (/Maggid Mishneh/i.test(proposed[0] || "") && !/Maggid Mishneh/i.test(orig)) {
      verdict = "REJECT";
      reason = "invented_text_seg0";
      flags.push("INVENTED_MAGGID_MISHNEH");
    }
  }

  return {
    id,
    slug,
    heSegs,
    action: gptCase.action,
    confidence: gptCase.confidence,
    verdict,
    reason,
    flags,
    overlaps,
    avgOverlap,
    recon,
    sources,
    proposed_preview: proposed.map((s, i) => ({ i, text: preview(s) })),
    gpt_notes: gptCase.notes,
  };
}

// --- main ---
const kit = JSON.parse(fs.readFileSync(KIT, "utf8"));
const kitCases = kit.cases;
const kitIds = kitCases.map((c) => c.id);

const gptCases = extractGptData();
const gptById = new Map(gptCases.map((c) => [c.id, c]));

const results = kitCases.map((kc) => evaluateCase(kc, gptById.get(kc.id)));

const counts = { APPROVE: 0, HOLD: 0, REJECT: 0 };
for (const r of results) counts[r.verdict]++;

const extraGpt = gptCases.filter((g) => !kitIds.includes(g.id)).map((g) => g.id);
const missingGpt = kitIds.filter((id) => !gptById.has(id));

const meta = {
  created: new Date().toISOString(),
  kit: KIT,
  gpt_result: GPT_OUT,
  part01_case_count: kitCases.length,
  gpt_case_count: gptCases.length,
  id_order_match: gptCases.map((g) => g.id).join("|") === kitIds.join("|"),
  missing_from_gpt: missingGpt,
  extra_in_gpt: extraGpt,
  counts,
  recommendation: {
    apply_approved_only: counts.APPROVE > 0,
    do_not_blanket_apply: counts.HOLD + counts.REJECT > 0,
    note: "Evaluation only — no corpus apply",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(EVAL_JSON, JSON.stringify(evalDoc, null, 2));

const nonApprove = results.filter((r) => r.verdict !== "APPROVE");
const approved = results.filter((r) => r.verdict === "APPROVE");

const md = `# EN_TRUNC moderate GPT resegment — part01 evaluation

**Created:** ${meta.created}  
**Kit:** \`EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json\` (${kitCases.length} cases)  
**GPT result:** \`EN_TRUNC_MODERATE_GPT_RESULT_part01.json\` (${gptCases.length} cases)  
**ID order match:** ${meta.id_order_match ? "yes" : "no"}  
**Status:** evaluation only — **no corpus apply**

## Counts

| Verdict | Count |
|---------|------:|
| APPROVE | ${counts.APPROVE} |
| HOLD | ${counts.HOLD} |
| REJECT | ${counts.REJECT} |

## Coverage

- Missing from GPT: ${missingGpt.length ? missingGpt.join(", ") : "none"}
- Extra in GPT: ${extraGpt.length ? extraGpt.join(", ") : "none"}

## Recommendation

${counts.APPROVE === kitCases.length ? "**Apply all APPROVE** — full part01 pass." : counts.APPROVE > 0 ? `**Apply ${counts.APPROVE} APPROVE rows only** after spot-check; hold/reject ${counts.HOLD + counts.REJECT} for manual fix.` : "**Do not apply** — no APPROVE rows."}

## Non-APPROVE (${nonApprove.length})

${nonApprove.map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}${r.flags.length ? ` [${r.flags.join(", ")}]` : ""}`).join("\n") || "(none)"}

## APPROVE (${approved.length})

${approved.map((r) => `- \`${r.id}\` — ${r.reason}`).join("\n") || "(none)"}

---
Machine eval: \`EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json\`
`;

fs.writeFileSync(EVAL_MD, md);

console.log(JSON.stringify({ meta: { counts, id_order_match: meta.id_order_match, gpt_n: gptCases.length, kit_n: kitCases.length }, nonApprove: nonApprove.map((r) => ({ id: r.id, verdict: r.verdict, reason: r.reason })) }, null, 2));
console.log("Wrote", EVAL_JSON);
console.log("Wrote", EVAL_MD);
