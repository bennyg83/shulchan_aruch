/**
 * Build 318_mishna_berurah_he_en.txt from Hebrew extract + English JSON.
 * Run from newtryoutput: node emit_mishna_berurah_he_en.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEP = "=".repeat(80);

const hePath = path.join(__dirname, "translation_layers", "mishna-berurah_he_extracted.json");
const enPath = path.join(__dirname, "translation_layers", "mishna-berurah_en.json");
const outPath = path.join(__dirname, "318_mishna_berurah_he_en.txt");

const he = JSON.parse(fs.readFileSync(hePath, "utf8"));
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

let blocks = [
  "OC 318 — Mishnah Berurah",
  "Format: each subsection is headed by (marker). Hebrew text appears first; English translation follows immediately below.",
  "",
  SEP,
  "",
];

for (const s of Object.keys(he).sort((a, b) => +a - +b)) {
  for (const m of Object.keys(he[s])) {
    const heText = he[s][m];
    const enText = (en[s] && en[s][m]) || "";
    blocks.push(`(${m})`, "", heText, "", enText, "", SEP, "");
  }
}

fs.writeFileSync(outPath, blocks.join("\n").trim() + "\n", "utf8");
console.log("Wrote", outPath, "sections:", blocks.filter((l) => l === SEP).length);
