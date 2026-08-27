/**
 * For YD paths where HE was restored from C2 but EN was reverted to live
 * and still mismatches, restore EN from C2 so segment counts align.
 */
import fs from "fs";
import path from "path";

const REPO = "C:/Users/binya/Documents/shulchan-aruch-clean";
const C2 =
  "C:/Users/binya/Documents/shulchan-aruch-clean - Copy (2)";
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

let restored = 0;
let skipped = 0;
for (const rel of list) {
  const heRel = rel.replace(/en\.html$/i, "he.html");
  const liveHe = path.join(REPO, heRel);
  const liveEn = path.join(REPO, rel);
  const c2En = path.join(C2, rel);
  if (!fs.existsSync(liveHe) || !fs.existsSync(liveEn) || !fs.existsSync(c2En)) {
    skipped++;
    continue;
  }
  const he = fs.readFileSync(liveHe, "utf8");
  const en = fs.readFileSync(liveEn, "utf8");
  if (split(he).length === split(en).length) {
    skipped++;
    continue;
  }
  const text = fs.readFileSync(c2En, "utf8").replace(/\r\n/g, "\n");
  fs.writeFileSync(liveEn, text, "utf8");
  restored++;
}
console.log(JSON.stringify({ restored, skipped, total: list.length }));
