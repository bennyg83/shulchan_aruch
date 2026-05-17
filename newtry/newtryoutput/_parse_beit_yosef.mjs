import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..", "318 beit yosef.txt");
const raw = fs.readFileSync(src, "utf8");
const lines = raw.split(/\r?\n/);

/** Match main section markers: (א) through (כ), including יג, טו, etc. */
const sectionRe = /^\(([א-ת]{1,4})\)\s*(.*)$/;

const sections = [];
let current = null;

for (const line of lines) {
  const m = line.match(sectionRe);
  if (m) {
    if (current) sections.push(current);
    current = { letter: m[1], he: [m[2].trimEnd()] };
  } else if (current && line.length > 0) {
    current.he.push(line.trimEnd());
  } else if (!current && line.trim()) {
    // preamble (none expected)
    current = { letter: "?", he: [line.trimEnd()] };
  }
}
if (current) sections.push(current);

for (const s of sections) {
  s.hebrewText = s.he.join("\n").trim();
}

const outJson = path.join(__dirname, "beit_yosef_sections.json");
fs.writeFileSync(
  outJson,
  JSON.stringify(sections.map((s) => ({ letter: s.letter, he: s.hebrewText })), null, 2),
  "utf8"
);
console.log("Wrote", outJson, "sections:", sections.length);
