import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sections = JSON.parse(
  fs.readFileSync(path.join(__dirname, "beit_yosef_sections.json"), "utf8")
);
const partsDir = path.join(__dirname, "beit_yosef_en_parts");

function loadEnglish(index1based) {
  const fn = path.join(partsDir, `${String(index1based).padStart(2, "0")}.txt`);
  if (!fs.existsSync(fn)) {
    throw new Error(`Missing English part: ${fn}`);
  }
  return fs.readFileSync(fn, "utf8").trim();
}

const blocks = [];
blocks.push(`OC 318 — Beit Yosef (Tur layer)`);
blocks.push(`Format: each subsection is headed by (Hebrew letter). Hebrew text appears first; English translation follows immediately below.`);
blocks.push(``);

sections.forEach((s, i) => {
  const n = i + 1;
  blocks.push(`================================================================================`);
  blocks.push(`(${s.letter})`);
  blocks.push(``);
  blocks.push(s.he.trim());
  blocks.push(``);
  blocks.push(loadEnglish(n));
  blocks.push(``);
});

const out = path.join(__dirname, "318_beit_yosef_he_en.txt");
fs.writeFileSync(out, blocks.join("\n") + "\n", "utf8");
console.log("Wrote", out);
