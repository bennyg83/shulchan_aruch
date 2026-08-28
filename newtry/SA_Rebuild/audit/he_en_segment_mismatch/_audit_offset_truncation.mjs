import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../../OC_Mobile/oc318-mobile-reader/public/corpus"
);

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function splitHtmlByBrSegments(html) {
  if (!html) return [];
  const parts = String(html)
    .replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>")
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length ? parts : [String(html).trim()].filter(Boolean);
}

const full = JSON.parse(
  fs.readFileSync(path.join(__dirname, "HE_HAS_MORE_OFFSET_REMAINING.json"), "utf8")
);
const parts = [1, 2, 3, 4, 5, 6].map((n) =>
  JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `HE_HAS_MORE_OFFSET_REMAINING_part${String(n).padStart(2, "0")}.json`
      ),
      "utf8"
    )
  )
);
const partCases = parts.flatMap((p) => p.cases);

const report = [];
for (const c of full.cases) {
  const part = partCases.find((x) => x.id === c.id);
  const [vol, siman, seif, slug] = c.id.split("/");
  const hePath = path.join(CORPUS, vol, siman, seif, slug, "he.html");
  const enPath = path.join(CORPUS, vol, siman, seif, slug, "en.html");
  const heRaw = fs.readFileSync(hePath, "utf8");
  const enRaw = fs.readFileSync(enPath, "utf8");
  const heCorpus = splitHtmlByBrSegments(heRaw).map(stripTags);
  const enCorpus = splitHtmlByBrSegments(enRaw).map(stripTags);

  const heTrunc = c.he_segments
    .map((s, i) => ({
      i,
      full: s.length,
      part: (part.he_segments[i] || "").length,
      trunc: (part.he_segments[i] || "").includes("[truncated"),
    }))
    .filter((t) => t.trunc || t.part < t.full);
  const enTrunc = c.en_segments
    .map((s, i) => ({
      i,
      full: s.length,
      part: (part.en_segments[i] || "").length,
      trunc: (part.en_segments[i] || "").includes("[truncated"),
    }))
    .filter((t) => t.trunc || t.part < t.full);

  report.push({
    id: c.id,
    heSegs: c.heSegs,
    enSegs: c.enSegs,
    parentMatchesCorpusHe: c.he_segments.every((s, i) => s === heCorpus[i]),
    parentMatchesCorpusEn: c.en_segments.every((s, i) => s === enCorpus[i]),
    heTruncSlots: heTrunc,
    enTruncSlots: enTrunc,
    segments_truncated_in_part: part.segments_truncated_in_part,
  });
}

console.log(JSON.stringify(report, null, 2));
