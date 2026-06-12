/**
 * Replace English for one YD001 block inside a part file (headers/Hebrew untouched).
 */
import fs from "fs";

const BLOCK_HDR = /^\*\*\*\* (?:YD001|OC001|SA) SOURCE BLOCK \*\*\*\*$/m;
const HEB = "**** HEBREW ****";
const ENG = "**** ENGLISH ****";
const END = "**** END BLOCK ****";

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normMarker(marker) {
  if (marker === undefined || marker === null) return "_";
  const m = String(marker).trim();
  return m || "_";
}

/**
 * @param {string} fileText
 * @param {{ slug: string, seif: string|number, marker?: string }} target
 * @param {string} newEnglish
 */
export function replaceOneBlockEnglish(fileText, target, newEnglish) {
  const slug = String(target.slug ?? "").trim();
  const seif = String(target.seif ?? "").trim();
  const marker = normMarker(target.marker);
  const en = String(newEnglish ?? "").trimEnd();
  if (!en) throw new Error(`Empty English for ${slug} ${seif}#${marker}`);

  const blockRe = new RegExp(
    `(^\\*\\*\\*\\* (?:YD001|OC001|SA) SOURCE BLOCK \\*\\*\\*\\*\\r?\\n` +
      `slug: ${escapeRegExp(slug)}\\r?\\n` +
      `seif: ${escapeRegExp(seif)}\\r?\\n` +
      `marker: ${escapeRegExp(marker)}\\r?\\n` +
      `[\\s\\S]*?\\r?\\n\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)` +
      `([\\s\\S]*?)` +
      `(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m"
  );

  if (!blockRe.test(fileText)) {
    throw new Error(`Block not found in file: slug=${slug} seif=${seif} marker=${marker}`);
  }

  return fileText.replace(blockRe, `$1${en}\n$3`);
}

export function patchBlockFile(absPath, target, newEnglish) {
  const raw = fs.readFileSync(absPath, "utf8");
  const next = replaceOneBlockEnglish(raw, target, newEnglish);
  fs.writeFileSync(absPath, next, "utf8");
  return absPath;
}

export function splitBlockStarts(fileText) {
  return fileText.split(BLOCK_HDR);
}
