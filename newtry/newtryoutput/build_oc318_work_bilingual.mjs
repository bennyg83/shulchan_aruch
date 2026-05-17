/**
 * Build Hebrew–English woven output from sections JSON + numbered English parts.
 * Usage: node build_oc318_work_bilingual.mjs <sections.json> <en_parts_dir> <out.txt> <title line>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sectionsPath = process.argv[2];
const partsDir = process.argv[3];
const outPath = process.argv[4];
const title = process.argv[5] || "OC 318";

if (!sectionsPath || !partsDir || !outPath) {
  console.error(
    "Usage: node build_oc318_work_bilingual.mjs <sections.json> <en_parts_dir> <out.txt> [title]"
  );
  process.exit(1);
}

const sections = JSON.parse(
  fs.readFileSync(path.isAbsolute(sectionsPath) ? sectionsPath : path.join(__dirname, sectionsPath), "utf8")
);

function pad(n, w) {
  return String(n).padStart(w, "0");
}

function loadEnglish(index1based, width) {
  const fn = path.join(partsDir, `${pad(index1based, width)}.txt`);
  if (!fs.existsSync(fn)) {
    throw new Error(`Missing English part: ${fn}`);
  }
  return fs.readFileSync(fn, "utf8").trim();
}

const width = sections.length >= 100 ? 3 : 2;

const blocks = [];
blocks.push(title);
blocks.push(
  `Format: each subsection is headed by (marker). Hebrew text appears first; English translation follows immediately below.`
);
blocks.push(``);

sections.forEach((s, i) => {
  const n = i + 1;
  blocks.push(`================================================================================`);
  blocks.push(`(${s.letter})`);
  blocks.push(``);
  blocks.push(s.he.trim());
  blocks.push(``);
  blocks.push(loadEnglish(n, width));
  blocks.push(``);
});

fs.writeFileSync(path.isAbsolute(outPath) ? outPath : path.join(__dirname, outPath), blocks.join("\n") + "\n", "utf8");
console.log("Wrote", outPath);
