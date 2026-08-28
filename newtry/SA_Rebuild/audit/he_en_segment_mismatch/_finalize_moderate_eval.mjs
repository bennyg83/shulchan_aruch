/**
 * Final manual+automated eval for EN_TRUNC moderate GPT part01.
 * Run after _eval_en_trunc_moderate_gpt.mjs generates base parse.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KIT = path.join(__dirname, "EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json");
const GPT = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01.json");
const OUT_JSON = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json");
const OUT_MD = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.md");

const kit = JSON.parse(fs.readFileSync(KIT, "utf8"));
const gpt = JSON.parse(fs.readFileSync(GPT, "utf8"));
const gptById = new Map(gpt.map((g) => [g.id, g]));
const kitIds = kit.cases.map((c) => c.id);

const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const sig = (s) => norm(s).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

/** @type {Record<string, {verdict:'APPROVE'|'HOLD'|'REJECT', reason:string}>} */
const MANUAL = {
  "oc1/siman1/seif-009/yad-ephraim": {
    verdict: "REJECT",
    reason: "Truncated parse — seg0 only 44 chars; ~88% EN lost (quote-break in pasted JSON)",
  },
  "oc1/siman51/seif-009/ateret-zekenim": {
    verdict: "APPROVE",
    reason: "Exact EN preserved; clean split after Zohar/Beit Yosef siman 50 vs Erev Yom Kippur block",
  },
  "oc1/siman55/seif-003/ateret-zekenim": {
    verdict: "APPROVE",
    reason: "Exact EN preserved; split Kedushah/U'va LeTzion vs Maariv paragraph",
  },
  "oc1/siman128/seif-043/ateret-zekenim": {
    verdict: "REJECT",
    reason: "Truncated — seg1 only 'The prayer beginning'; quote-break destroyed EN",
  },
  "oc1/siman440/seif-001/ateret-zekenim": {
    verdict: "REJECT",
    reason: "Truncated — seg0 ends mid-quote; ~64% EN missing",
  },
  "yd1/siman114/seif-010/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split boundary but editorial rewording (32a→daf 32, etc.) — not split_existing_en",
  },
  "yd1/siman116/seif-004/beer-hagolah": {
    verdict: "HOLD",
    reason: "Correct Tur/(°) Taz split but minor editorial (Orach Chaim spelling)",
  },
  "yd1/siman134/seif-003/beer-hagolah": {
    verdict: "REJECT",
    reason: "Truncated — seg0='From the passage,' seg1 gloss only; ~72% lost",
  },
  "yd1/siman134/seif-013/beer-hagolah": {
    verdict: "HOLD",
    reason: "Correct split but editorial ('poskim' for 'halachic authorities')",
  },
  "yd1/siman139/seif-004/beur-hagra": {
    verdict: "REJECT",
    reason: "Truncated + rewritten seg0; seg1 Likut block incomplete",
  },
  "yd1/siman139/seif-012/beur-hagra": {
    verdict: "REJECT",
    reason: "Rewrote seg0 (Be'er HaGadol, new wording); seg1 Likut truncated mid-s.v.",
  },
  "yd1/siman168/seif-017/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split; minor editorial ('money upon it' vs 'upon the collateral')",
  },
  "yd1/siman168/seif-022/beer-hagolah": {
    verdict: "HOLD",
    reason: "Split OK but editorial ('Ri'→'R' Yitzchak') — violates preserve wording",
  },
  "yd1/siman173/seif-019/beer-hagolah": {
    verdict: "HOLD",
    reason: "(°) gloss over-compressed to 'This is stated there in the Gemara' — semantic loss",
  },
  "yd1/siman175/seif-002/beur-hagra": {
    verdict: "REJECT",
    reason: "Both Likut blocks truncated/paraphrased (~30% missing; Mishneh LaMelech→Maggid Mishneh)",
  },
  "yd1/siman177/seif-004/beer-hagolah": {
    verdict: "REJECT",
    reason: "Truncated — Rashi gloss seg1 cut mid-sentence (~49% lost)",
  },
  "yd1/siman177/seif-012/beer-hagolah": {
    verdict: "HOLD",
    reason: "Correct (°) split; added 'Meaning:' prefix (minor editorial)",
  },
  "yd1/siman177/seif-016/beur-hagra": {
    verdict: "REJECT",
    reason: "Truncated Likut block — seg1 ends abruptly (~47% lost)",
  },
  "yd1/siman177/seif-018/beer-hagolah": {
    verdict: "REJECT",
    reason: "Seg1 truncated before Rama/Darkei Moshe ending",
  },
  "yd1/siman177/seif-020/beer-hagolah": {
    verdict: "HOLD",
    reason: "Correct (°) split; editorial ('householder' for 'borrower')",
  },
  "yd1/siman177/seif-021/beur-hagra": {
    verdict: "REJECT",
    reason: "Truncated — seg0/seg1 fragments only (~92% lost)",
  },
  "yd1/siman177/seif-027/beur-hagra": {
    verdict: "REJECT",
    reason: "Truncated — seg0 tiny; bulk in seg1 but ~62% missing overall",
  },
  "yd1/siman177/seif-036/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split; minor spelling (halachah→halacha)",
  },
  "yd1/siman177/seif-040/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split; minor editorial ('the Ramban', hyphenation)",
  },
  "yd1/siman178/seif-003/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split; minor article insertions ('the Rambam')",
  },
  "yd1/siman198/seif-015/beer-hagolah": {
    verdict: "APPROVE",
    reason: "Exact EN preserved; Tosefta vs (°) marelakin/kaltines gloss",
  },
  "yd1/siman198/seif-043/beer-hagolah": {
    verdict: "HOLD",
    reason: "Good (°) split; minor typo-level drift (Raavyah)",
  },
  "yd1/siman198/seif-045/baer-heitev": {
    verdict: "HOLD",
    reason: "Correct Shach vs (מה*) immersion-note split; editorial (chatzitzah, b'dieved)",
  },
  "yd1/siman206/seif-005/beer-hagolah": {
    verdict: "REJECT",
    reason: "Seg1 truncated at 'The Ran explains that' — quote-break",
  },
};

const results = kit.cases.map((kc) => {
  const g = gptById.get(kc.id);
  const orig = norm(kc.en_segments[0]);
  const proposed = norm((g?.segments_en || []).join(" "));
  const ratio = proposed.length / Math.max(orig.length, 1);
  const m = MANUAL[kc.id];
  return {
    id: kc.id,
    slug: kc.slug,
    heSegs: kc.heSegs,
    action: g?.action,
    confidence: g?.confidence,
    verdict: m.verdict,
    reason: m.reason,
    en_length_ratio: Number(ratio.toFixed(3)),
    exact_match: orig === proposed,
    sig_match: sig(orig) === sig(proposed),
    sources: g?.sources || [],
    seg0_preview: (g?.segments_en?.[0] || "").slice(0, 80),
    seg1_preview: (g?.segments_en?.[1] || "").slice(0, 80),
  };
});

const counts = { APPROVE: 0, HOLD: 0, REJECT: 0 };
for (const r of results) counts[r.verdict]++;

const meta = {
  created: new Date().toISOString(),
  kit: "EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json",
  gpt_result: "EN_TRUNC_MODERATE_GPT_RESULT_part01.json",
  part01_case_count: 29,
  gpt_case_count: gpt.length,
  id_order_match: gpt.map((g) => g.id).join("|") === kitIds.join("|"),
  counts,
  parse_note:
    "GPT paste had unescaped quotes in he/en JSON strings; parser uses brace-matched segment objects. Truncation artifacts correlate with embedded ASCII quotes in EN.",
  recommendation: {
    apply_approved_only: true,
    approved_count: counts.APPROVE,
    do_not_apply_hold_or_reject: true,
    re_prompt_guidance:
      "Re-run GPT with instruction to escape quotes in JSON output, or return en_segments only without he fields; must preserve exact EN wording (split_existing_en only).",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(OUT_JSON, JSON.stringify(evalDoc, null, 2));

const nonApprove = results.filter((r) => r.verdict !== "APPROVE");
const approved = results.filter((r) => r.verdict === "APPROVE");

const md = `# EN_TRUNC moderate GPT resegment — part01 evaluation

**Created:** ${meta.created}  
**Kit:** \`EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json\` (29 cases)  
**GPT result:** \`EN_TRUNC_MODERATE_GPT_RESULT_part01.json\` (29 cases)  
**Matches part01 exactly:** yes — 29 ids, same order (\`oc1/siman1/seif-009/yad-ephraim\` … \`yd1/siman206/seif-005/beer-hagolah\`)  
**Status:** evaluation only — **no corpus apply**

## Counts

| Verdict | Count |
|---------|------:|
| **APPROVE** | ${counts.APPROVE} |
| **HOLD** | ${counts.HOLD} |
| **REJECT** | ${counts.REJECT} |

## Recommendation

**Apply ${counts.APPROVE} APPROVE rows only** (\`oc1/siman51\`, \`oc1/siman55\`, \`yd1/siman198/seif-015\`). Do **not** blanket-apply part01.

${counts.HOLD} HOLD rows have structurally plausible splits but editorial rewording or minor semantic drift — fix wording then re-evaluate.  
${counts.REJECT} REJECT rows are truncated/over-merged (mostly JSON quote-break in pasted output).

**Re-prompt note:** GPT returned \`he\` fields with unescaped geresh quotes, corrupting many \`en\` extractions. For parts 02–04, ask for \`en_segments\` + \`source\` only, or valid JSON with escaped strings.

## APPROVE (${approved.length})

${approved.map((r) => `- \`${r.id}\` — ${r.reason}`).join("\n")}

## Non-APPROVE (${nonApprove.length})

${nonApprove.map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}`).join("\n")}

---
Machine eval: \`EN_TRUNC_MODERATE_GPT_RESULT_part01_EVAL.json\`
`;

fs.writeFileSync(OUT_MD, md);
console.log(JSON.stringify({ counts, approved: approved.map((r) => r.id) }, null, 2));
