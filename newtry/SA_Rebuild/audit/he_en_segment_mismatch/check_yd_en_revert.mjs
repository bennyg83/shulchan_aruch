import fs from "fs";
import path from "path";

const REPO = "C:/Users/binya/Documents/shulchan-aruch-clean";
const listPath =
  "C:/Users/binya/Documents/shulchan-aruch-clean/newtry/SA_Rebuild/audit/he_en_segment_mismatch/yd1_en_to_revert.txt";

function split(html) {
  if (!html) return [];
  const parts = String(html)
    .replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>")
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(html).trim()].filter(Boolean);
}

const list = fs
  .readFileSync(listPath, "utf8")
  .replace(/^\uFEFF/, "")
  .split(/\r?\n/)
  .map((s) => s.replace(/^\uFEFF/, "").trim())
  .filter(Boolean);
let still = 0;
let ok = 0;
const samples = [];
for (const rel of list) {
  const heRel = rel.replace(/en\.html$/i, "he.html");
  const hePath = path.join(REPO, heRel);
  const enPath = path.join(REPO, rel);
  if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) {
    still++;
    if (samples.length < 5) samples.push({ rel, err: "missing" });
    continue;
  }
  const he = fs.readFileSync(hePath, "utf8");
  const en = fs.readFileSync(enPath, "utf8");
  const hn = split(he).length;
  const enN = split(en).length;
  if (hn !== enN) {
    still++;
    if (samples.length < 5) samples.push({ rel, hn, enN });
  } else ok++;
}
console.log(JSON.stringify({ total: list.length, ok, still, samples }, null, 2));
