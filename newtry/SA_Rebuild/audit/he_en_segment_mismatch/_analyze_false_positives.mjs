/**
 * Full-corpus false-positive pattern analysis on segment mismatches.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../../OC_Mobile/oc318-mobile-reader/public/corpus"
);
const VOLS = ["oc1", "yd1", "eh1", "cm1"];

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function visuallyEmpty(html) {
  const t = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length === 0;
}

function classify(heParts, enParts, heRaw, enRaw) {
  const heN = heParts.length;
  const enN = enParts.length;
  const heEmpty = visuallyEmpty(heRaw);
  const enEmpty = visuallyEmpty(enRaw);
  if (heEmpty && enEmpty) return null;
  if (heEmpty && !enEmpty) return { kind: "he_missing", heN: 0, enN };
  if (!heEmpty && enEmpty) return { kind: "en_missing", heN, enN: 0 };
  if (heN === enN) return null;
  if (heN === 1 && enN > 1) return { kind: "he_truncated_vs_multi_en", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

function strip(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fpPattern(kind, slug, heS, enS, heRaw, enRaw) {
  if (kind === "he_missing") return "fp_zero_he_by_design";
  if (kind === "en_missing") return "true_en_missing";
  if (kind === "en_truncated_vs_multi_he") {
    const likut = heS.filter((x) => /^\(ליקוט\)/.test(strip(x))).length;
    if (likut > 0) return "true_likut_en_merged";
    if (slug === "beer-hagolah") return "true_beer_degree_split";
    return "true_en_truncated";
  }
  if (kind === "he_has_more_segments") {
    const likut = heS.filter((x) => /^\(ליקוט\)/.test(strip(x))).length;
    if (likut > 0 && enS.length < heS.length) return "true_likut_en_merged";
    if (slug === "beer-hagolah") return "true_beer_degree_split";
    if (/<p\b|<div\b/i.test(heRaw) || /<p\b|<div\b/i.test(enRaw))
      return "fp_html_block_vs_br";
    if (enS.some((s) => /<br/i.test(s))) return "fp_inline_br_in_en";
    return "true_offset_editorial";
  }
  if (kind === "en_has_more_segments") {
    if (enS.some((s) => /<br/i.test(s))) return "fp_inline_br_in_en";
    return "true_en_oversplit";
  }
  return "other";
}

function* walk(vol) {
  const volRoot = path.join(CORPUS, vol);
  for (const simanEnt of fs.readdirSync(volRoot, { withFileTypes: true })) {
    if (!simanEnt.isDirectory() || !/^siman\d+$/i.test(simanEnt.name)) continue;
    const simanDir = path.join(volRoot, simanEnt.name);
    for (const seifEnt of fs.readdirSync(simanDir, { withFileTypes: true })) {
      if (!seifEnt.isDirectory() || !seifEnt.name.startsWith("seif-")) continue;
      const seifDir = path.join(simanDir, seifEnt.name);
      for (const slugEnt of fs.readdirSync(seifDir, { withFileTypes: true })) {
        if (!slugEnt.isDirectory()) continue;
        yield {
          vol,
          siman: simanEnt.name,
          seif: seifEnt.name,
          slug: slugEnt.name,
          slugDir: path.join(seifDir, slugEnt.name),
        };
      }
    }
  }
}

const byKind = {};
const byFp = {};
const fpExamples = {};

for (const vol of VOLS) {
  for (const { vol: v, siman, seif, slug, slugDir } of walk(vol)) {
    const hePath = path.join(slugDir, "he.html");
    const enPath = path.join(slugDir, "en.html");
    if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;
    const heRaw = fs.existsSync(hePath)
      ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "")
      : "";
    const enRaw = fs.existsSync(enPath)
      ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "")
      : "";
    const heS = splitHtmlByBrSegments(heRaw);
    const enS = splitHtmlByBrSegments(enRaw);
    const cls = classify(heS, enS, heRaw, enRaw);
    if (!cls) continue;
    byKind[cls.kind] = (byKind[cls.kind] || 0) + 1;
    const id = `${v}/${siman}/${seif}/${slug}`;
    const fp = fpPattern(cls.kind, slug, heS, enS, heRaw, enRaw);
    byFp[fp] = (byFp[fp] || 0) + 1;
    if (!fpExamples[fp]) fpExamples[fp] = [];
    if (fpExamples[fp].length < 2) {
      fpExamples[fp].push({
        id,
        kind: cls.kind,
        heSegs: cls.heN,
        enSegs: cls.enN,
      });
    }
  }
}

const fpSorted = Object.entries(byFp).sort((a, b) => b[1] - a[1]);
const likelyFp = fpSorted.filter(([k]) => k.startsWith("fp_"));
const likelyTrue = fpSorted.filter(([k]) => k.startsWith("true_"));

const out = {
  analyzedAt: new Date().toISOString(),
  byKind,
  byFpPattern: Object.fromEntries(fpSorted),
  likelyFalsePositive: likelyFp.reduce((n, [, c]) => n + c, 0),
  likelyTrueMismatch: likelyTrue.reduce((n, [, c]) => n + c, 0),
  topFpPatterns: likelyFp.slice(0, 5).map(([pat, n]) => ({
    pattern: pat,
    count: n,
    examples: fpExamples[pat],
  })),
  topTruePatterns: likelyTrue.slice(0, 5).map(([pat, n]) => ({
    pattern: pat,
    count: n,
    examples: fpExamples[pat],
  })),
};

const outPath = path.join(__dirname, "SEGMENT_RESCAN_FP_ANALYSIS.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
