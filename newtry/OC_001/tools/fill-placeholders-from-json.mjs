/**
 * Replaces each English placeholder with the next string from a JSON array (file order).
 * Same placeholder string as oc001_block_lib.mjs / OC_253 flow.
 *
 * Usage:
 *   node tools/fill-placeholders-from-json.mjs <target.txt> <translations.json>
 */
import fs from "fs";

const PLACEHOLDER =
  "English translation pending — replace after editing this block (keep Hebrew above intact).";

const targetPath = process.argv[2];
const jsonPath = process.argv[3];

if (!targetPath || !jsonPath) {
  console.error("Usage: node fill-placeholders-from-json.mjs <target.txt> <translations.json>");
  process.exit(1);
}

const translations = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (!Array.isArray(translations)) {
  console.error("translations.json must be a JSON array of strings.");
  process.exit(1);
}

let idx = 0;
const raw = fs.readFileSync(targetPath, "utf8");
const out = raw.replace(
  new RegExp(PLACEHOLDER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
  () => {
    if (idx >= translations.length) {
      throw new Error(`Ran out of translations at placeholder index ${idx}`);
    }
    return translations[idx++];
  }
);

if (idx !== translations.length) {
  console.warn(`Warning: used ${idx} translations but JSON has ${translations.length} entries.`);
}

const pendingLeft = (out.match(new RegExp(PLACEHOLDER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
  .length;
if (pendingLeft) {
  console.warn(`Warning: ${pendingLeft} placeholders remain.`);
}

fs.writeFileSync(targetPath, out, "utf8");
console.log(`OK: wrote ${targetPath} (${idx} replacements)`);
