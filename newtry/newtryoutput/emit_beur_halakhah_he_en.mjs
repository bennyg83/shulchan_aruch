/**
 * Readable bilingual export: markers show OC 318 seif numbers (1), (3), …
 * Hebrew/English keys still "_" in JSON for the full builder.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEP = "=".repeat(80);
const hePath = path.join(__dirname, "translation_layers", "beur-halakhah_he_extracted.json");
const enPath = path.join(__dirname, "translation_layers", "beur-halakhah_en.json");
const outPath = path.join(__dirname, "318_beur_halakhah_he_en.txt");

const he = JSON.parse(fs.readFileSync(hePath, "utf8"));
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

const lines = [
  "OC 318 — Beur Halakhah",
  "Format: each block is one column occurrence of Beur Halakhah for that seif. Marker is the Shulchan Aruch seif number in this siman. Hebrew first, English below.",
  "",
  SEP,
  "",
];

for (const seif of Object.keys(he).sort((a, b) => +a - +b)) {
  const heText = he[seif]._ || "";
  const enText = (en[seif] && en[seif]._) || "";
  lines.push(`(${seif})`, "", heText, "", enText, "", SEP, "");
}

fs.writeFileSync(outPath, lines.join("\n").trim() + "\n", "utf8");
console.log("Wrote", outPath);
