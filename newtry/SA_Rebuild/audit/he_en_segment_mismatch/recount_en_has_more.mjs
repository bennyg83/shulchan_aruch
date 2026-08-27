/** Quick recount en_has_more / he_has_more on live corpus (br-split). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../../OC_Mobile/oc318-mobile-reader/public/corpus"
);

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function split(html) {
  if (!html) return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length ? parts : [String(html).trim()].filter(Boolean);
}

function read(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

const vols = ["oc1", "yd1", "cm1"];
let enHasMore = 0;
let heHasMore = 0;
let matched = 0;
let scanned = 0;
const enSamples = [];

for (const vol of vols) {
  const root = path.join(CORPUS, vol);
  if (!fs.existsSync(root)) continue;
  for (const sim of fs.readdirSync(root).filter((n) => /^siman\d+$/i.test(n))) {
    const simDir = path.join(root, sim);
    for (const seif of fs.readdirSync(simDir).filter((n) => n.startsWith("seif-"))) {
      const seifDir = path.join(simDir, seif);
      let slugs;
      try {
        slugs = fs
          .readdirSync(seifDir, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
      } catch {
        continue;
      }
      for (const slug of slugs) {
        const he = read(path.join(seifDir, slug, "he.html"));
        const en = read(path.join(seifDir, slug, "en.html"));
        if (he == null || en == null) continue;
        const hn = split(he).length;
        const enN = split(en).length;
        scanned++;
        if (enN > hn) {
          enHasMore++;
          if (enSamples.length < 8) {
            enSamples.push(`${vol}/${sim}/${seif}/${slug} ${hn}/${enN}`);
          }
        } else if (hn > enN) heHasMore++;
        else matched++;
      }
    }
  }
}

console.log(
  JSON.stringify(
    { corpus: CORPUS, scanned, enHasMore, heHasMore, matched, enSamples },
    null,
    2
  )
);
