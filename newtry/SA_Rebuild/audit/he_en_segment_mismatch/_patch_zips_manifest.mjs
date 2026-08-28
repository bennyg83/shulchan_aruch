import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const manifestPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "zips/ZIPS_MANIFEST.md"
);
let t = fs.readFileSync(manifestPath, "utf8").replace(/\u0000/g, "");
const row =
  "| `08_HE_HAS_MORE_OFFSET_REMAINING.zip` | 444291 | HE_HAS_MORE_OFFSET_REMAINING.md, HE_HAS_MORE_OFFSET_REMAINING.json, HE_HAS_MORE_OFFSET_REMAINING_part01.json, HE_HAS_MORE_OFFSET_REMAINING_part02.json, HE_HAS_MORE_OFFSET_REMAINING_part03.json, HE_HAS_MORE_OFFSET_REMAINING_part04.json, HE_HAS_MORE_OFFSET_REMAINING_part05.json, HE_HAS_MORE_OFFSET_REMAINING_part06.json, full_dictionary.md |";

if (!t.includes("08_HE_HAS_MORE_OFFSET_REMAINING.zip")) {
  const idx = t.indexOf("| Zip | Size");
  const lineEnd = t.indexOf("\n", idx);
  t = `${t.slice(0, lineEnd + 1)}${row}\n${t.slice(lineEnd + 1)}`;
} else {
  t = t.replace(/\| `08_HE_HAS_MORE_OFFSET_REMAINING\.zip` \|[^\n]+\n/, `${row}\n`);
}
t = t.replace(/Generated: [^\n]+/, `Generated: ${new Date().toISOString()}`);
t = t.replace(
  /Note: [^\n]+/,
  "Note: HE_HAS_MORE_OFFSET_REMAINING fix 2026-08-28 — no segment truncation; parent JSON in zip"
);
fs.writeFileSync(manifestPath, t);
console.log("updated ZIPS_MANIFEST.md");
