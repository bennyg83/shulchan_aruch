/**
 * Shared eval utilities for _REMAINING GPT kits (01–10).
 */
import fs from "fs";
import path from "path";

export const CORPUS_ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")),
  "../../../..",
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

export const FAILURE_PATTERNS = [
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
  /Maimonides/i,
  /Nachmanides/i,
];

export const RAW_HE_ABBREV = /[א-ת][״\"'][א-ת]/;
export const EDITORIAL_NOTE = /\b(Note:|Meaning:|TBD|translation pending)\b/i;

export function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function norm(s) {
  return stripHtml(s)
    .replace(/[""„]/g, '"')
    .replace(/[''‚]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function sig(s) {
  return norm(s).replace(/[^a-zA-Z0-9]/g, "");
}

export function preview(s, n = 72) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

export function hebrewCharRatio(s) {
  const t = stripHtml(s);
  if (!t.length) return 0;
  return (t.match(/[\u0590-\u05FF]/g) || []).length / t.length;
}

export function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

export function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

export function joinSegments(segs) {
  return segs.join("<br />\n") + (segs.length ? "\n" : "");
}

export function kitCorpusEn(kitCase) {
  return (kitCase.en_segments || []).join(" ");
}

export function readCorpusEnPlain(id) {
  const htmlPath = path.join(CORPUS_ROOT, id, "en.html");
  if (fs.existsSync(htmlPath)) return stripHtml(fs.readFileSync(htmlPath, "utf8"));
  return null;
}

export function getProposedEn(gptCase) {
  if (gptCase?.corrected_en?.length) return gptCase.corrected_en;
  if (gptCase?.segments?.length) return gptCase.segments.map((s) => s.en ?? "");
  if (gptCase?.segments_en?.length) return gptCase.segments_en;
  return gptCase?.en_segments || [];
}

export function getSources(gptCase) {
  if (gptCase?.segments?.length)
    return gptCase.segments.map((s) => s.source || "unknown");
  return gptCase?.sources || [];
}

export function isBeerHagolahDegree(heSeg) {
  return /^\(°\)/.test(stripHtml(heSeg)) || stripHtml(heSeg).startsWith("(°)");
}

export function isLikut(heSeg) {
  const t = stripHtml(heSeg);
  return /^\(ליקוט\)|^\(Likkut\)/i.test(t);
}

export function enStartsWithMarker(en, marker) {
  const t = stripHtml(en);
  if (marker === "°") return /^\(?°\)?/i.test(t) || /^meaning:/i.test(t);
  if (marker === "likut")
    return /^\(Likkut\)|^\(Extract\)|^\(Anthology\)/i.test(t);
  return false;
}

/** Strip leading Beer/Likut-style EN markers for drift comparison only. */
export function stripLeadingEnMarker(en) {
  return stripHtml(en)
    .replace(/^\(°\)\s*/i, "")
    .replace(/^\(?°\)?\s*/i, "")
    .replace(/^Meaning[:,]?\s*/i, "")
    .replace(
      /^\((?:Likkut|Likut|Extract|Anthology|Collection|Collected|Supplement|Additional note|Addition|Luke|Lycott)\)\s*/i,
      ""
    );
}

export function sigIgnoreMarkersFromSegs(segs) {
  return sig((segs || []).map((s) => stripLeadingEnMarker(s)).join(" "));
}

export function detectQuoteBreak(gptCase, proposed, enLegacy) {
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
      const shorterText = a.length < b.length ? segEn[i] : enLegacy[i];
      const longer = a.length >= b.length ? segEn[i] : enLegacy[i];
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

export function checkFreshTranslateSlot(he, en, i) {
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

export function checkFailurePatternsJoined(enSegs) {
  const flags = [];
  const joined = enSegs.join(" ");
  for (const p of FAILURE_PATTERNS) {
    if (p.test(joined)) flags.push(`FAILURE_${p.source}`);
  }
  return flags;
}

export function loadKitCases(auditDir, kitName) {
  const kitPath = path.join(auditDir, `${kitName}.json`);
  const kit = JSON.parse(fs.readFileSync(kitPath, "utf8").replace(/^\uFEFF/, ""));
  return kit.cases || [];
}

export function countVerdicts(results) {
  const counts = { APPROVE: 0, HOLD: 0, REJECT: 0, REPAIR_CANDIDATE: 0, SKIP_APPLIED: 0 };
  for (const r of results) counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  return counts;
}

export function writeEvalOutputs(auditDir, kitName, meta, results) {
  const evalJson = path.join(auditDir, `${kitName}_GPT_RESULT_EVAL.json`);
  const evalMd = path.join(auditDir, `${kitName}_GPT_RESULT_EVAL.md`);
  const doc = { meta, results };
  fs.writeFileSync(evalJson, JSON.stringify(doc, null, 2) + "\n", "utf8");

  const counts = countVerdicts(results);
  const md = `# ${kitName} — GPT evaluation

**Created:** ${meta.created}  
**Kit cases:** ${meta.kit_case_count}  
**GPT cases:** ${meta.gpt_case_count}  
**Mode:** ${meta.mode}

## Verdict counts

| Verdict | Count |
|---------|------:|
| APPROVE | ${counts.APPROVE || 0} |
| HOLD | ${counts.HOLD || 0} |
| REJECT | ${counts.REJECT || 0} |
| REPAIR_CANDIDATE | ${counts.REPAIR_CANDIDATE || 0} |
| SKIP_APPLIED | ${counts.SKIP_APPLIED || 0} |

## Summary

${meta.summary || ""}

## HOLD / REJECT sample (first 20)

${results
  .filter((r) => r.verdict !== "APPROVE" && r.verdict !== "SKIP_APPLIED")
  .slice(0, 20)
  .map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}`)
  .join("\n") || "_none_"}

Machine eval: \`${path.basename(evalJson)}\`
`;
  fs.writeFileSync(evalMd, md, "utf8");
  return { evalJson, evalMd, counts };
}
