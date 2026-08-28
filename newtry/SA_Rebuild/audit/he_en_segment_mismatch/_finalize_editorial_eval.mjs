/**
 * Finalize EN_TRUNC editorial GPT eval with stricter truncation checks.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const CORPUS = path.join(
  path.resolve(AUDIT, "../../../.."),
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

function countHeSegs(html) {
  const b = (html.match(/<b>/gi) || []).length;
  if (b > 0) return b;
  const br = (html.match(/<br\s*\/?>/gi) || []).length;
  return Math.max(1, br + 1);
}

function countEnSegs(html) {
  const paras = html.split(/<br\s*\/?>/i).filter((s) => s.trim());
  if (paras.length > 1) return paras.length;
  return 1;
}

function strip(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const FAILURE = [
  /hand recoils/i,
  /Saturday\b/i,
  /\ballocated\b/i,
  /Shield of Abraham/i,
  /Golden Rows/i,
  /first dish/i,
];

const gpt = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json"), "utf8")
);
const kit = JSON.parse(
  fs.readFileSync(
    path.join(AUDIT, "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json"),
    "utf8"
  )
);

function evalCase(k, g) {
  const flags = [];
  const se = g?.segments_en || [];
  const ens = g?.en_segments || [];
  const id = k.id;

  if (!g) {
    return {
      id,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  if (se.length !== k.heSegs) flags.push(`SEG_COUNT_${se.length}_vs_${k.heSegs}`);
  if (ens.length && ens.length !== se.length) flags.push("EN_SEGMENTS_MIRROR_LEN");
  if (g.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (id === "yd1/siman129/seif-009/siftei-kohen") flags.push("KIT_HE_TRUNCATED");

  for (let i = 0; i < k.heSegs; i++) {
    const en = strip(se[i]);
    const he = strip(k.he_segments[i]);
    if (!en) flags.push(`EMPTY_EN_${i}`);
    if (
      en &&
      (/\b(as it is stated|from the verse|states|writes|concern|where it states)\s*,?\s*$/i.test(
        en
      ) ||
        (/,(\s*)$/.test(en) && en.length < 200))
    )
      flags.push(`TRUNC_END_${i}`);
    if (en && (en.endsWith("s.v.") || en.endsWith("s.v. "))) flags.push(`TRUNC_SV_${i}`);
    if (en && /\b(and|or|that|the|in|of|to|for|with|from|as|if|but|see)\s*$/i.test(en))
      flags.push(`TRUNC_MID_${i}`);
    if (he.length > 120 && en.length < he.length * 0.12) flags.push(`SHORT_EN_${i}`);
    if (he.length > 40 && en.length < he.length * 0.25 && !en.includes("etc"))
      flags.push(`LOW_COVERAGE_${i}`);
  }

  const joined = se.join(" ");
  for (const p of FAILURE) {
    if (p.test(joined)) flags.push(`FAILURE_${p.source}`);
  }
  if (/[א-ת][״"'][א-ת]/.test(joined)) flags.push("RAW_HE_ABBREV");

  let verdict = "APPROVE";
  let reason = "segment count OK; fresh translate complete";

  const hard = flags.some(
    (f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN") || f.startsWith("MISSING")
  );
  const trunc = flags.some(
    (f) =>
      f.startsWith("TRUNC_") || f.startsWith("SHORT_EN") || f.startsWith("LOW_COVERAGE")
  );
  const kitTrunc = flags.includes("KIT_HE_TRUNCATED");
  const needsHuman = flags.includes("ACTION_NEEDS_HUMAN");

  if (hard) {
    verdict = "REJECT";
    reason =
      flags.find((f) => f.startsWith("SEG_COUNT") || f.startsWith("EMPTY_EN")) ||
      "structural_fail";
  } else if (kitTrunc || needsHuman) {
    verdict = "HOLD";
    reason = kitTrunc ? "kit_he_truncated" : "gpt_needs_human";
  } else if (trunc) {
    verdict = "HOLD";
    reason =
      flags.find(
        (f) =>
          f.startsWith("TRUNC_") || f.startsWith("SHORT_EN") || f.startsWith("LOW_COVERAGE")
      ) || "truncation";
  } else if (flags.includes("EN_SEGMENTS_MIRROR_LEN")) {
    verdict = "HOLD";
    reason = "en_segments_mirror_incomplete";
  } else if (g.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
  }

  return {
    id,
    slug: k.slug,
    heSegs: k.heSegs,
    action: g.action,
    confidence: g.confidence,
    verdict,
    reason,
    flags,
    gpt_notes: g.notes,
    proposed_preview: se.map((s, i) => ({
      i,
      text: strip(s).slice(0, 72) + (strip(s).length > 72 ? "…" : ""),
    })),
  };
}

const results = kit.cases.map((k) => evalCase(k, gpt.find((g) => g.id === k.id)));
const counts = { APPROVE: 0, HOLD: 0, REJECT: 0 };
for (const r of results) counts[r.verdict]++;

const approved = results.filter((r) => r.verdict === "APPROVE");
const spot = approved.slice(0, 6).map((r) => {
  const parts = r.id.split("/");
  const [vol, siman, seif, slug] = parts;
  const base = path.join(CORPUS, vol, siman, seif, slug);
  let corpusHe = null;
  let corpusEn = null;
  try {
    corpusHe = countHeSegs(fs.readFileSync(path.join(base, "he.html"), "utf8"));
  } catch {
    /* */
  }
  try {
    corpusEn = countEnSegs(fs.readFileSync(path.join(base, "en.html"), "utf8"));
  } catch {
    /* */
  }
  return {
    id: r.id,
    kit_heSegs: r.heSegs,
    gpt_enSegs: r.heSegs,
    corpus_heSegs: corpusHe,
    corpus_enSegs: corpusEn,
    would_fix_trunc: corpusEn === 1 && r.heSegs > 1,
  };
});

const meta = {
  created: new Date().toISOString(),
  kit: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json",
  kit_part: 1,
  kit_case_count: kit.cases.length,
  gpt_result: "EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json",
  gpt_case_count: gpt.length,
  id_order_match:
    gpt.map((g) => g.id).join("|") === kit.cases.map((c) => c.id).join("|"),
  missing_from_gpt: kit.cases.filter((c) => !gpt.find((g) => g.id === c.id)).map((c) => c.id),
  extra_in_gpt: gpt.filter((g) => !kit.cases.find((c) => c.id === g.id)).map((g) => g.id),
  counts,
  spot_checks: spot,
  recommendation: {
    apply_approved_only: counts.APPROVE > 0,
    do_not_blanket_apply: counts.HOLD + counts.REJECT > 0,
    note: "Evaluation only — no corpus apply",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(
  path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json"),
  JSON.stringify(evalDoc, null, 2)
);

const non = results.filter((r) => r.verdict !== "APPROVE");
const md = `# EN_TRUNC editorial GPT fresh_translate — part01 evaluation

**Created:** ${meta.created}  
**Kit:** \`EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json\` (${kit.cases.length} cases)  
**GPT result:** \`EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json\` (${gpt.length} cases)  
**Kit part matched:** part01 (30 ids)  
**ID order match:** ${meta.id_order_match ? "yes" : "no"}  
**Status:** evaluation only — **no corpus apply**

## Counts

| Verdict | Count |
|---------|------:|
| APPROVE | ${counts.APPROVE} |
| HOLD | ${counts.HOLD} |
| REJECT | ${counts.REJECT} |

## Corpus spot-check (APPROVE sample)

| ID | kit heSegs | GPT enSegs | corpus he | corpus en | would fix trunc |
|----|----------:|-----------:|----------:|----------:|:---------------:|
${spot.map((s) => `| \`${s.id}\` | ${s.kit_heSegs} | ${s.gpt_enSegs} | ${s.corpus_heSegs ?? "?"} | ${s.corpus_enSegs ?? "?"} | ${s.would_fix_trunc ? "yes" : "no"} |`).join("\n")}

## Flag: kit HE truncated

- \`yd1/siman129/seif-009/siftei-kohen\` — kit Hebrew slot 2 truncated; GPT noted in notes. **HOLD**.

## APPROVE (${approved.length})

${approved.map((r) => `- \`${r.id}\` — ${r.reason}`).join("\n") || "(none)"}

## HOLD / REJECT (${non.length})

${non.map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}${r.flags.length ? ` [${r.flags.join(", ")}]` : ""}`).join("\n")}

---
Machine eval: \`EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json\`
`;

fs.writeFileSync(path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.md"), md);

console.log(
  JSON.stringify(
    {
      counts,
      approved: approved.map((r) => r.id),
      non_approve: non.map((r) => ({ id: r.id, verdict: r.verdict, reason: r.reason })),
    },
    null,
    2
  )
);
