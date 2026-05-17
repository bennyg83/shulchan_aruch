/**
 * Build 318_kaf_hachayyim_he_en.txt from Hebrew extract + English JSON.
 * English: translation_layers/kaf-hachayyim_en_filled.json (or kaf-hachayyim_en.json).
 *
 * Usage: node emit_kaf_hachayyim_he_en.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEP = "=".repeat(80);

const hePath = path.join(__dirname, "translation_layers", "kaf-hachayyim_he_extracted.json");
const enCandidates = [
  path.join(__dirname, "translation_layers", "kaf-hachayyim_en_filled.json"),
  path.join(__dirname, "translation_layers", "kaf-hachayyim_en.json"),
];

function loadEn() {
  for (const p of enCandidates) {
    if (fs.existsSync(p)) {
      const j = JSON.parse(fs.readFileSync(p, "utf8"));
      const nonempty = Object.values(j).some((o) =>
        Object.values(o || {}).some((v) => String(v || "").trim())
      );
      if (nonempty) return j;
    }
  }
  throw new Error("No non-empty kaf-hachayyim English JSON found");
}

const he = JSON.parse(fs.readFileSync(hePath, "utf8"));
const en = loadEn();

const lines = [
  "OC 318 — Kaf HaChayim",
  "Format: each subsection is headed by (marker). Hebrew text appears first; English translation follows after a blank line.",
  "",
  SEP,
  "",
];

for (const seif of Object.keys(he).sort((a, b) => +a - +b)) {
  const markers = Object.keys(he[seif]);
  for (const marker of markers) {
    const heText = he[seif][marker] ?? "";
    const enText = en[seif]?.[marker] ?? "";
    lines.push(`(${marker})`, "", heText, "", enText.trimEnd(), "", SEP, "");
  }
}

const outPath = path.join(__dirname, "318_kaf_hachayyim_he_en.txt");
fs.writeFileSync(outPath, lines.join("\n").trim() + "\n", "utf8");
console.log("Wrote", outPath);
