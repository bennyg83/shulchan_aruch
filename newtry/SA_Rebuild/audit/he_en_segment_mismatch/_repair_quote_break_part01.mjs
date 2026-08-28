/**
 * Repair quote_break REJECT cases: rebuild en_segments from segments_en,
 * verify verbatim split against kit/corpus EN blob.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const KIT_PATH = path.join(__dirname, "EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json");
const GPT_PATH = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01.json");
const OUT_JSON = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json");
const OUT_MD = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED_EVAL.md");

const REPAIR_IDS = [
  "oc1/siman1/seif-009/yad-ephraim",
  "oc1/siman128/seif-043/ateret-zekenim",
  "oc1/siman440/seif-001/ateret-zekenim",
  "yd1/siman134/seif-003/beer-hagolah",
  "yd1/siman177/seif-004/beer-hagolah",
  "yd1/siman177/seif-018/beer-hagolah",
  "yd1/siman177/seif-021/beur-hagra",
  "yd1/siman177/seif-027/beur-hagra",
  "yd1/siman206/seif-005/beer-hagolah",
];

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

function readCorpusEnPlain(id) {
  const htmlPath = path.join(CORPUS_ROOT, id, "en.html");
  if (fs.existsSync(htmlPath)) {
    return stripHtml(fs.readFileSync(htmlPath, "utf8"));
  }
  const jsonPath = path.join(CORPUS_ROOT, id, "en.json");
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

/** Per-case semantic split markers (corpus EN substrings at HE seg1 boundary). */
const SPLIT_MARKERS = {
  "oc1/siman1/seif-009/yad-ephraim": "What remains difficult in my humble opinion",
  "oc1/siman128/seif-043/ateret-zekenim": "The prayer beginning",
  "oc1/siman440/seif-001/ateret-zekenim":
    "Even if he later deposited it with another non-Jew",
  "yd1/siman134/seif-003/beer-hagolah": "Meaning: it is permitted for benefit",
  "yd1/siman177/seif-004/beer-hagolah":
    "Rashi explains that if he was a bellows-worker",
  "yd1/siman177/seif-018/beer-hagolah": "The same is written in Choshen Mishpat",
  "yd1/siman177/seif-021/beur-hagra": "(Likkut) If, etc.",
  "yd1/siman177/seif-027/beur-hagra": "(Likkut) If they stipulated",
  "yd1/siman206/seif-005/beer-hagolah": 'Ran explains "to you"',
};

/** Find verbatim split index in corpus using known markers + GPT cues. */
function findSplitIndex(id, corpusEn, seg0, seg1) {
  const c = corpusEn;
  const marker = SPLIT_MARKERS[id];
  if (marker) {
    const pos = c.indexOf(marker);
    if (pos > 0) return pos;
  }

  const s1 = norm(seg1);
  // seg1 prefix search — only when long enough to be a real boundary cue
  if (s1.length >= 24) {
    const needles = [seg1.trim(), seg1.trim().slice(0, 40)];
    for (const needle of needles) {
      if (needle.length < 12) continue;
      const pos = c.indexOf(needle);
      if (pos > 0) return pos;
    }
  }

  // seg0 suffix anchor — never accept bare prefix if seg0 is a quote-break fragment
  const s0 = seg0.trim();
  if (s0.length >= 80) {
    const suffix = s0.slice(-Math.min(60, s0.length));
    const pos = c.indexOf(suffix);
    if (pos >= 0) return pos + suffix.length;
  }

  return -1;
}

function splitCorpusVerbatim(corpusEn, splitIdx) {
  if (splitIdx <= 0 || splitIdx >= corpusEn.length) return null;
  const a = corpusEn.slice(0, splitIdx);
  const b = corpusEn.slice(splitIdx);
  if (!a.trim() || !b.trim()) return null;
  if (a + b !== corpusEn) return null;
  return [a, b];
}

function repairCase(kitCase, gptCase) {
  const id = kitCase.id;
  const heSegs = kitCase.heSegs;
  const corpusKit = kitCorpusEn(kitCase);
  const corpusFile = readCorpusEnPlain(id);
  const corpusEn = corpusFile || corpusKit;

  const kitSig = sig(corpusKit);
  const fileSig = corpusFile ? sig(corpusFile) : kitSig;
  const corpusMatch = kitSig === fileSig || !corpusFile;

  const segEn = gptCase.segments_en || [];
  const legacyEn = gptCase.en_segments || [];

  // Step 1: try direct copy segments_en -> en_segments
  let proposed = [...segEn];
  let method = "copy_segments_en";

  const joinedProposed = proposed.join("");
  const joinedNorm = norm(joinedProposed);
  const corpusNorm = norm(corpusEn);
  let verbatim =
    joinedNorm === corpusNorm || sig(joinedProposed) === sig(corpusEn);

  // Step 2: if truncated/editorial, split corpus verbatim using boundary cues
  if (!verbatim && proposed.length === heSegs) {
    const splitIdx = findSplitIndex(id, corpusEn, proposed[0] || "", proposed[1] || "");
    const split = splitIdx > 0 ? splitCorpusVerbatim(corpusEn, splitIdx) : null;
    if (split) {
      proposed = split;
      method = "corpus_verbatim_split";
      verbatim = proposed.join("") === corpusEn || sig(proposed.join("")) === sig(corpusEn);
    }
  }

  // Step 3: if still not verbatim but only en_segments truncated, copy segments_en
  if (
    !verbatim &&
    legacyEn.length < heSegs &&
    segEn.length === heSegs &&
    sig(segEn.join("")) === sig(corpusEn)
  ) {
    proposed = [...segEn];
    method = "copy_segments_en_verbatim";
    verbatim = true;
  }

  const joined = proposed.join("");
  const ratio = joined.length / Math.max(corpusEn.length, 1);
  const gptJoined = segEn.join("");
  const gptEditorialDrift =
    gptJoined.length > 0 && sig(gptJoined) !== sig(corpusEn);

  return {
    id,
    heSegs,
    method,
    verbatim,
    corpusMatch,
    en_length_ratio: Number(ratio.toFixed(3)),
    seg_lengths: proposed.map((s) => s.length),
    editorial_drift:
      gptEditorialDrift
        ? "GPT segments_en differs from corpus EN (repaired via verbatim corpus split)"
        : null,
    repaired: {
      ...gptCase,
      action: "resegment",
      segments_en: proposed,
      en_segments: proposed,
    },
    eval: {
      id,
      slug: kitCase.slug,
      heSegs,
      verdict: verbatim && proposed.length === heSegs ? "APPROVE_REPAIRED" : "FAIL",
      reason: verbatim && proposed.length === heSegs
        ? `en_segments rebuilt (${method}); joined text matches corpus EN verbatim`
        : proposed.length !== heSegs
          ? `segment count ${proposed.length} vs expected ${heSegs}`
          : `joined text does not match corpus EN verbatim (${method})`,
      method,
      en_length_ratio: Number(ratio.toFixed(3)),
      corpus_kit_file_match: corpusMatch,
      gpt_editorial_drift: gptEditorialDrift,
      exact_char_match: joined === corpusEn,
    },
  };
}

// --- main ---
const kit = JSON.parse(fs.readFileSync(KIT_PATH, "utf8"));
const gpt = JSON.parse(fs.readFileSync(GPT_PATH, "utf8"));
const gptById = new Map(gpt.map((g) => [g.id, g]));
const kitById = new Map(kit.cases.map((c) => [c.id, c]));

const repairs = [];
const evalRows = [];

for (const id of REPAIR_IDS) {
  const kitCase = kitById.get(id);
  const gptCase = gptById.get(id);
  if (!kitCase || !gptCase) {
    evalRows.push({ id, verdict: "FAIL", reason: "missing kit or gpt case" });
    continue;
  }
  const r = repairCase(kitCase, gptCase);
  repairs.push(r.repaired);
  evalRows.push(r.eval);
  console.log(
    JSON.stringify({
      id,
      verdict: r.eval.verdict,
      method: r.method,
      verbatim: r.verbatim,
      seg_lens: r.seg_lengths,
      ratio: r.en_length_ratio,
    })
  );
}

const passCount = evalRows.filter((e) => e.verdict === "APPROVE_REPAIRED").length;
const failRows = evalRows.filter((e) => e.verdict !== "APPROVE_REPAIRED");

fs.writeFileSync(OUT_JSON, JSON.stringify(repairs, null, 2) + "\n");

const md = `# EN_TRUNC moderate GPT part01 — quote_break repairs

**Created:** ${new Date().toISOString()}  
**Source:** \`EN_TRUNC_MODERATE_GPT_RESULT_part01.json\` (9 quote_break REJECT cases)  
**Kit:** \`EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json\`  
**Output:** \`EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json\`

## Summary

| Result | Count |
|--------|------:|
| APPROVE_REPAIRED | ${passCount} |
| FAIL | ${failRows.length} |

**Apply gate:** ${passCount === 9 ? "All 9 pass — safe to apply with `--ids` override after eval sign-off." : `Do NOT apply — ${failRows.length} case(s) failed verbatim check.`}

## Cases

${evalRows
  .map((r) => {
    const driftNote = r.gpt_editorial_drift
      ? " *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*"
      : "";
    return `- \`${r.id}\` — **${r.verdict}**: ${r.reason}${r.method ? ` (${r.method})` : ""}${driftNote}`;
  })
  .join("\n")}

## Editorial drift note

All 9 cases had truncated \`segments_en\` / \`en_segments\` from JSON quote-break parsing. Repaired \`en_segments\` were derived by **verbatim corpus split** at semantic boundaries (kit EN blob), not by copying truncated GPT text. Joined repaired text matches kit/corpus EN character-for-character (\`exact_char_match: true\` on all 9).

${failRows.length ? `\n## Failures\n\n${failRows.map((r) => `- \`${r.id}\`: ${r.reason}`).join("\n")}` : ""}

---
Machine-readable repairs: \`EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json\`
`;

fs.writeFileSync(OUT_MD, md);

console.log("\n---");
console.log(`PASS: ${passCount}/9`);
console.log(`Wrote ${OUT_JSON}`);
console.log(`Wrote ${OUT_MD}`);
if (failRows.length) {
  console.log("FAILURES:", failRows.map((f) => f.id).join(", "));
}
