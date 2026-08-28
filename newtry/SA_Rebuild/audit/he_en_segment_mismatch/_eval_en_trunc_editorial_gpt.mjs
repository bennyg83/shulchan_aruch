/**
 * Evaluate EN_TRUNC_EDITORIAL GPT fresh_translate results (part01).
 * Extracts GPT JSON from parent transcript if result file missing.
 *
 *   node _eval_en_trunc_editorial_gpt.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseGptCases } from "./_parse_gpt_moderate.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const KIT = path.join(AUDIT, "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json");
const GPT_OUT = path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json");
const EVAL_JSON = path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json");
const EVAL_MD = path.join(AUDIT, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.md");
const TRANSCRIPT =
  "C:/Users/binya/.cursor/projects/c-Users-binya-Documents-shulchan-aruch-clean-Copy-2/agent-transcripts/def433f8-6547-455d-88af-6219f3e689f2/def433f8-6547-455d-88af-6219f3e689f2.jsonl";
const CORPUS = path.join(
  path.resolve(AUDIT, "../../../.."),
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

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

const ANGLICIZED = [
  /Shield of Abraham/i,
  /Golden Rows/i,
  /House of Joseph/i,
  /Maimonides/i,
  /Nachmanides/i,
];

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

function preview(s, n = 72) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function extractGptBlobEditorial(transcriptPath) {
  const lines = fs.readFileSync(transcriptPath, "utf8").split(/\n/).filter(Boolean);
  for (const line of lines) {
    if (!line.includes("oc1/siman162/seif-007/peri-megadim")) continue;
    if (!line.includes("gpt response")) continue;
    const obj = JSON.parse(line);
    const text = obj.message?.content?.[0]?.text || "";
    const marker = text.indexOf("gpt response");
    const start = text.indexOf("[", marker);
    const end = text.lastIndexOf("]");
    return text.slice(start, end + 1);
  }
  throw new Error("GPT editorial blob not found in transcript");
}

function extractGptData() {
  if (fs.existsSync(GPT_OUT)) {
    try {
      const d = JSON.parse(fs.readFileSync(GPT_OUT, "utf8"));
      if (Array.isArray(d) && d.length) return d;
    } catch {
      /* reparse */
    }
  }
  const blob = extractGptBlobEditorial(TRANSCRIPT);
  const cases = parseGptCases(blob);
  fs.writeFileSync(GPT_OUT, JSON.stringify(cases, null, 2));
  return cases;
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

function hebrewCharRatio(s) {
  const t = stripHtml(s);
  if (!t.length) return 0;
  const he = (t.match(/[\u0590-\u05FF]/g) || []).length;
  return he / t.length;
}

function countHebrewAbbrevs(he) {
  const t = stripHtml(he);
  const matches = t.match(/[א-ת][״\"'][א-ת״\"']+/g) || [];
  return matches.length;
}

function checkDictionaryTerms(en, slug) {
  const flags = [];
  const t = stripHtml(en);
  // commentator names should appear properly
  if (/מ״א|מגן אברהם/.test(en) === false) {
    if (/\bMA\b/.test(t)) flags.push("ABBREV_MA");
    if (/Magen Avraham/i.test(t) === false && /מ״א/.test(en)) flags.push("MISSING_MAGEN_AVRAHAM");
  }
  for (const p of ANGLICIZED) {
    if (p.test(t)) flags.push(`ANGLICIZED_${p.source}`);
  }
  return flags;
}

function checkCompleteness(heSegs, enSegs) {
  const flags = [];
  for (let i = 0; i < heSegs.length; i++) {
    const he = stripHtml(heSegs[i]);
    const en = stripHtml(enSegs[i] || "");
    if (!en || en.length < 8) {
      flags.push(`EMPTY_EN_${i}`);
      continue;
    }
  }
  return flags;
}

function checkTruncation(enSegs) {
  const flags = [];
  for (let i = 0; i < enSegs.length; i++) {
    const en = stripHtml(enSegs[i] || "");
    if (!en) continue;
    // ends mid-word or mid-clause heuristics
    if (/[,;:]\s*$/.test(en) && en.length < 30) flags.push(`TRUNC_END_PUNCT_${i}`);
    if (/\b(and|or|that|the|in|of|to|for|with|from|as|if|but|see|cf\.?)\s*$/i.test(en))
      flags.push(`TRUNC_MID_CLAUSE_${i}`);
    if (en.endsWith("...") || en.endsWith("…")) flags.push(`ELLIPSIS_${i}`);
    // very short segment when HE is long
  }
  return flags;
}

function checkFailurePatterns(enSegs) {
  const flags = [];
  const joined = enSegs.join(" ");
  for (const p of FAILURE_PATTERNS) {
    if (p.test(joined)) flags.push(`FAILURE_${p.source}`);
  }
  return flags;
}

function checkRawHebrewInEn(enSegs) {
  const flags = [];
  for (let i = 0; i < enSegs.length; i++) {
    const en = stripHtml(enSegs[i] || "");
    if (hebrewCharRatio(en) > 0.05) flags.push(`HEBREW_IN_EN_${i}`);
    if (RAW_HE_ABBREV.test(en)) flags.push(`RAW_HE_ABBREV_${i}`);
  }
  return flags;
}

function checkEnSegmentsMirror(segments_en, en_segments) {
  if (!en_segments?.length) return [];
  if (segments_en.length !== en_segments.length) return ["EN_SEGMENTS_LEN_MISMATCH"];
  for (let i = 0; i < segments_en.length; i++) {
    if (norm(segments_en[i]) !== norm(en_segments[i])) return ["EN_SEGMENTS_MIRROR_MISMATCH"];
  }
  return [];
}

function loadCorpusSegments(id) {
  const hePath = path.join(CORPUS, id, "he.json");
  const enPath = path.join(CORPUS, id, "en.json");
  const out = { he: null, en: null };
  for (const [kind, p] of [
    ["he", hePath],
    ["en", enPath],
  ]) {
    if (!fs.existsSync(p)) continue;
    try {
      const j = JSON.parse(fs.readFileSync(p, "utf8"));
      out[kind] = Array.isArray(j.segments) ? j.segments.length : null;
    } catch {
      /* */
    }
  }
  return out;
}

function evaluateCase(kitCase, gptCase) {
  const flags = [];
  const heSegs = kitCase.heSegs;
  const id = kitCase.id;
  const slug = kitCase.slug;

  if (!gptCase) {
    return {
      id,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  const proposed =
    (gptCase.segments_en?.length === heSegs ? gptCase.segments_en : gptCase.en_segments) || [];
  const en_segments = gptCase.en_segments || [];
  const sources = gptCase.sources || [];

  if (gptCase.action === "needs_human") flags.push("ACTION_NEEDS_HUMAN");
  if (gptCase.action && gptCase.action !== "fresh_translate")
    flags.push(`ACTION_${gptCase.action}`);

  if (proposed.length !== heSegs)
    flags.push(`SEG_COUNT_${proposed.length}_vs_${heSegs}`);

  flags.push(...checkEnSegmentsMirror(proposed, en_segments));
  flags.push(...checkCompleteness(kitCase.he_segments, proposed));
  flags.push(...checkTruncation(proposed));
  flags.push(...checkFailurePatterns(proposed));
  flags.push(...checkRawHebrewInEn(proposed));
  flags.push(...checkDictionaryTerms(proposed.join(" "), slug));

  // length ratio per segment — EN should not be tiny vs HE for fresh translate
  for (let i = 0; i < heSegs; i++) {
    const heLen = stripHtml(kitCase.he_segments[i]).length;
    const enLen = stripHtml(proposed[i] || "").length;
    if (heLen > 80 && enLen < heLen * 0.15) flags.push(`SHORT_EN_${i}:${enLen}_vs_he_${heLen}`);
  }

  // pattern checks by slug
  if (slug === "beer-hagolah" && heSegs >= 2) {
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

  // special: truncated HE in kit
  if (id === "yd1/siman129/seif-009/siftei-kohen") {
    flags.push("KIT_HE_TRUNCATED_FLAG");
    if (gptCase.notes?.toLowerCase().includes("truncat")) flags.push("GPT_NOTED_KIT_TRUNCATION");
  }

  // sources check
  if (sources.length && !sources.every((s) => s === "fresh_translate" || s === "partial"))
    flags.push("BAD_SOURCE_VALUES");

  const segCountFail = flags.some((f) => f.startsWith("SEG_COUNT"));
  const emptyFail = flags.some((f) => f.startsWith("EMPTY_EN"));
  const truncFail = flags.some((f) =>
    /TRUNC_|ELLIPSIS_|SHORT_EN_/.test(f)
  );
  const patternFail = flags.some((f) =>
    /BEER_DEGREE|LIKUT_MARKER|FAILURE_|HEBREW_IN_EN|RAW_HE_ABBREV|ANGLICIZED/.test(f)
  );
  const mirrorFail = flags.includes("EN_SEGMENTS_MIRROR_MISMATCH");
  const needsHuman = flags.includes("ACTION_NEEDS_HUMAN");

  let verdict = "APPROVE";
  let reason = "segment count OK; fresh translate complete";

  if (segCountFail || emptyFail || mirrorFail) {
    verdict = "REJECT";
    reason =
      flags.find((f) => f.startsWith("SEG_COUNT")) ||
      flags.find((f) => f.startsWith("EMPTY_EN")) ||
      "structural_fail";
  } else if (needsHuman || id === "yd1/siman129/seif-009/siftei-kohen") {
    verdict = "HOLD";
    reason = needsHuman ? "gpt_needs_human" : "kit_he_truncated";
  } else if (truncFail || patternFail) {
    verdict = "HOLD";
    reason =
      flags.find((f) => /TRUNC_|ELLIPSIS_|SHORT_EN_/.test(f)) ||
      flags.find((f) => patternFail) ||
      "quality_review";
  } else if (gptCase.confidence === "low") {
    verdict = "HOLD";
    reason = "low_confidence";
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

// corpus spot-check for APPROVE sample (up to 5)
const approved = results.filter((r) => r.verdict === "APPROVE");
const spotIds = approved.slice(0, 5).map((r) => r.id);
const spotChecks = spotIds.map((id) => {
  const kc = kitCases.find((c) => c.id === id);
  const gc = gptById.get(id);
  const corpus = loadCorpusSegments(id);
  const proposed =
    (gc?.segments_en?.length === kc.heSegs ? gc.segments_en : gc?.en_segments) || [];
  return {
    id,
    kit_heSegs: kc.heSegs,
    gpt_enSegs: proposed.length,
    corpus_heSegs: corpus.he,
    corpus_enSegs: corpus.en,
    corpus_match_kit: corpus.he === kc.heSegs,
    proposed_would_fix_trunc: corpus.en === 1 && proposed.length === kc.heSegs,
  };
});

const meta = {
  created: new Date().toISOString(),
  kit: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json",
  kit_part: 1,
  kit_case_count: kitCases.length,
  gpt_result: "EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json",
  gpt_case_count: gptCases.length,
  id_order_match: gptCases.map((g) => g.id).join("|") === kitIds.join("|"),
  missing_from_gpt: missingGpt,
  extra_in_gpt: extraGpt,
  counts,
  spot_checks: spotChecks,
  recommendation: {
    apply_approved_only: counts.APPROVE > 0,
    do_not_blanket_apply: counts.HOLD + counts.REJECT > 0,
    note: "Evaluation only — no corpus apply",
  },
};

const evalDoc = { meta, results };
fs.writeFileSync(EVAL_JSON, JSON.stringify(evalDoc, null, 2));

const nonApprove = results.filter((r) => r.verdict !== "APPROVE");

const md = `# EN_TRUNC editorial GPT fresh_translate — part01 evaluation

**Created:** ${meta.created}  
**Kit:** \`EN_TRUNC_EDITORIAL_RETRANSLATE_KIT_part01.json\` (${kitCases.length} cases)  
**GPT result:** \`EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json\` (${gptCases.length} cases)  
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

## Corpus spot-check (APPROVE sample)

| ID | kit heSegs | GPT enSegs | corpus he | corpus en | would fix trunc |
|----|----------:|-----------:|----------:|----------:|:---------------:|
${spotChecks.map((s) => `| \`${s.id}\` | ${s.kit_heSegs} | ${s.gpt_enSegs} | ${s.corpus_heSegs ?? "?"} | ${s.corpus_enSegs ?? "?"} | ${s.proposed_would_fix_trunc ? "yes" : "no"} |`).join("\n")}

## Flag: kit HE truncated

- \`yd1/siman129/seif-009/siftei-kohen\` — kit Hebrew slot appears truncated; GPT flagged in notes. **HOLD** regardless.

## APPROVE (${approved.length})

${approved.map((r) => `- \`${r.id}\` — ${r.reason}`).join("\n") || "(none)"}

## HOLD / REJECT (${nonApprove.length})

${nonApprove.map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}${r.flags.length ? ` [${r.flags.slice(0, 6).join(", ")}${r.flags.length > 6 ? ", …" : ""}]` : ""}`).join("\n") || "(none)"}

---
Machine eval: \`EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json\`
`;

fs.writeFileSync(EVAL_MD, md);

console.log(
  JSON.stringify(
    {
      meta: {
        kit_part: 1,
        kit_n: kitCases.length,
        gpt_n: gptCases.length,
        counts,
        id_order_match: meta.id_order_match,
        approved_ids: approved.map((r) => r.id),
        non_approve: nonApprove.map((r) => ({
          id: r.id,
          verdict: r.verdict,
          reason: r.reason,
        })),
      },
    },
    null,
    2
  )
);
console.log("Wrote", EVAL_JSON);
console.log("Wrote", EVAL_MD);
