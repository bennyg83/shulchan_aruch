import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS =
  "C:/Users/binya/Documents/shulchan-aruch-clean/newtry/OC_Mobile/oc318-mobile-reader/public/corpus";
const listMd = fs.readFileSync(
  path.join(__dirname, "MISSING_HE_EN_LISTS.md"),
  "utf8"
);

const hePaths = [...listMd.matchAll(/`(oc1\/[^`]+)`/g)].map((m) => m[1]);
const enPaths = [...listMd.matchAll(/`(yd1\/[^`]+)`/g)].map((m) => m[1]);

function empty(html) {
  const t = String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length === 0;
}

function read(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

let heStill = 0;
let heFixed = 0;
for (const rel of hePaths) {
  const he = read(path.join(CORPUS, rel, "he.html"));
  const en = read(path.join(CORPUS, rel, "en.html"));
  if (empty(he) && !empty(en)) heStill++;
  else heFixed++;
}

let enStill = 0;
let enFixed = 0;
for (const rel of enPaths) {
  const he = read(path.join(CORPUS, rel, "he.html"));
  const en = read(path.join(CORPUS, rel, "en.html"));
  if (!empty(he) && empty(en)) enStill++;
  else enFixed++;
}

const out = {
  at: new Date().toISOString(),
  hePaths: hePaths.length,
  heStillMissing: heStill,
  heNoLongerMissing: heFixed,
  enPaths: enPaths.length,
  enStillMissing: enStill,
  enNoLongerMissing: enFixed,
};
fs.writeFileSync(
  path.join(__dirname, "EASY_FIX_RECOUNT.json"),
  JSON.stringify(out, null, 2) + "\n"
);
console.log(JSON.stringify(out, null, 2));
