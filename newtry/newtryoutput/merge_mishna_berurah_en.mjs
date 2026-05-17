/**
 * Merge modular MB English into translation_layers/mishna-berurah_en.json
 * Run: node merge_mishna_berurah_en.mjs && node emit_mishna_berurah_he_en.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import s14 from "./mb_en_s1_4.mjs";
import s510 from "./mb_en_s5_10.mjs";
import s1119 from "./mb_en_s11_19.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "translation_layers", "mishna-berurah_en.json");
const base = JSON.parse(fs.readFileSync(target, "utf8"));

const bundle = { ...s14, ...s510, ...s1119 };

for (const [seif, markers] of Object.entries(bundle)) {
  if (!base[seif]) base[seif] = {};
  Object.assign(base[seif], markers);
}

fs.writeFileSync(target, JSON.stringify(base, null, 2), "utf8");
console.log("Merged EN into", target);
