/**
 * Split OC 318 commentary source into sections headed by (marker).
 * Usage: node parse_oc318_commentary.mjs <relative-to-newtry-dir-or-abs> <output-json-name>
 * Example: node parse_oc318_commentary.mjs "../318 taz.txt" "taz_sections.json"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcArg = process.argv[2];
const outName = process.argv[3];
if (!srcArg || !outName) {
  console.error("Usage: node parse_oc318_commentary.mjs <source.txt> <output.json>");
  process.exit(1);
}

/** Source files live in newtry/ (parent of newtryoutput/). */
const src = path.isAbsolute(srcArg)
  ? srcArg
  : path.join(__dirname, "..", srcArg);
const raw = fs.readFileSync(src, "utf8");
const lines = raw.split(/\r?\n/);

/** Section starts at beginning of line: (anything) rest... */
const sectionRe = /^\(([^)]+)\)\s*(.*)$/;

const sections = [];
let current = null;

for (const line of lines) {
  const m = line.match(sectionRe);
  if (m) {
    if (current) sections.push(current);
    current = { letter: m[1].trim(), he: [m[2].trimEnd()] };
  } else if (current && line.length > 0) {
    current.he.push(line.trimEnd());
  } else if (!current && line.trim()) {
    current = { letter: "?", he: [line.trimEnd()] };
  }
}
if (current) sections.push(current);

for (const s of sections) {
  s.hebrewText = s.he.join("\n").trim();
}

const outJson = path.join(__dirname, outName);
fs.writeFileSync(
  outJson,
  JSON.stringify(sections.map((s) => ({ letter: s.letter, he: s.hebrewText })), null, 2),
  "utf8"
);
console.log("Wrote", outJson, "sections:", sections.length);
