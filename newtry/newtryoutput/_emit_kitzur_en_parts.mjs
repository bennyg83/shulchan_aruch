/**
 * Writes kitzur_en_parts/001.txt … 113.txt from kitzur_en_translations.json (113 strings).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(__dirname, "kitzur_en_translations.json");
const outDir = path.join(__dirname, "kitzur_en_parts");

const arr = JSON.parse(fs.readFileSync(translationsPath, "utf8"));
if (!Array.isArray(arr) || arr.length !== 113) {
  throw new Error(`Expected 113 translations, got ${arr?.length}`);
}
fs.mkdirSync(outDir, { recursive: true });
arr.forEach((text, i) => {
  const fn = path.join(outDir, `${String(i + 1).padStart(3, "0")}.txt`);
  fs.writeFileSync(fn, String(text).trim() + "\n", "utf8");
});
console.log("Wrote", arr.length, "files to", outDir);
