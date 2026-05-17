/**
 * Merge modular BH English into translation_layers/beur-halakhah_en.json
 * Keys must stay "_" per seif (matches extractSectionsFromColumn / englishForExtracted).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import partA from "./bh_en_part_a.mjs";
import partB from "./bh_en_part_b.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "translation_layers", "beur-halakhah_en.json");
const base = JSON.parse(fs.readFileSync(target, "utf8"));

for (const chunk of [partA, partB]) {
  for (const [seif, markers] of Object.entries(chunk)) {
    if (!base[seif]) base[seif] = {};
    Object.assign(base[seif], markers);
  }
}

fs.writeFileSync(target, JSON.stringify(base, null, 2), "utf8");
console.log("Merged into", target);
