#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const fp = path.join(ROOT, "output/siman_158/beer-hagolah/part-001.txt");

const patches = [
  [1, "א", "Chullin 105."],
  [1, "ב", "Rambam in ch. 10 of Hilchot Berachot."],
  [1, "ג", "From the implication of the Rambam and the Rosh in ch. 1 of Chalah."],
  [2, "_", "Rokeach."],
  [3, "_", "See there."],
  [4, "א", "Pesachim 115."],
  [4, "ב", "Beit Yosef."],
  [5, "א", "Chullin 106."],
  [5, "ב", "From the words of the Rashba there."],
  [5, "ג", "Mordechai ch. 8 of Berachot."],
  [6, "_", "Semak in siman 149."],
  [7, "_", "Tosafot in Pesachim 115, end of siman 156."],
  [8, "_", "Mishnah end ch. 1 of Eruvin."],
  [9, "א", "Eduyot ch. 5."],
  [9, "ב", "Shabbat 62."],
  [9, "ג", "Sotah 4."],
  [10, "_", "Shabbat 62."],
  [11, "א", "Beit Yosef in explanation of the words of the Tur."],
  [11, "ב", "Tosafot in Berachot 58 and in Pesachim 7, and the Rosh there."],
  [11, "ג", "Rabbeinu Yerucham."],
  [12, "_", "Sotah 4."],
  [13, "א", "Mordechai ch. 8 of Berachot."],
  [13, "ב", "Beit Yosef."],
];

function setEnglish(s, slug, seif, marker, newEn) {
  const parts = s.split("**** OC001 SOURCE BLOCK ****");
  let found = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const head = "**** OC001 SOURCE BLOCK ****";
    if (
      !slugM ||
      slugM[1].trim() !== slug ||
      !seifM ||
      String(seifM[1].trim()) !== String(seif) ||
      !markerM ||
      markerM[1].trim() !== marker
    ) {
      return head + block;
    }
    found = true;
    const enTag = "**** ENGLISH ****";
    const endTag = "**** END BLOCK ****";
    const enStart = block.indexOf(enTag);
    const enEnd = block.indexOf(endTag);
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn + nl + after;
  });
  if (!found) throw new Error(`not found ${seif} ${marker}`);
  return out.join("");
}

let s = fs.readFileSync(fp, "utf8");
for (const [seif, marker, en] of patches) {
  s = setEnglish(s, "beer-hagolah", seif, marker, en);
}
fs.writeFileSync(fp, s, "utf8");
console.log("beer-hagolah 158: all blocks patched");
