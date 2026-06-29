#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = "siman_160/beer-hagolah/part-001.txt";

const patches = [
  [1, "א", "In first chapter of tractate Yadayim."],
  [1, "ב", "Rambam chapter 7 Hilchot Berachot."],
  [2, "א", "There, in first chapter of Yadayim."],
  [2, "ב", "Rosh in his commentary on tractate Yadayim."],
  [2, "ג", "Mishnah there, chapter 1, first chapter."],
  [2, "ד", "Rosh there in explanation of the mishnah."],
  [3, "_", "Tosafot and there in Rosh's commentary."],
  [4, "א", "Rashi and R' Azriel."],
  [4, "ב", "Beit Yosef."],
  [5, "_", "Beit Yosef, from Rambam's wording chapter 10 Hilchot Berachot."],
  [6, "_", "Chullin 107."],
  [7, "_", "See there."],
  [8, "_", "Rambam, Rashba, and R' Yonah."],
  [9, "א", "First chapter of tractate Yadayim, and Rif in chapter 8 of Berachot."],
  [9, "ב", "Zevachim 52."],
  [10, "_", "Hagahot Maimoniyot chapter 2 of Berachot."],
  [11, "א", "Chapter 2 of tractate Yadayim."],
  [11, "ב", "Rambam in chapter 6 Hilchot Berachot and Tur."],
  [11, "ג", "Raavad there."],
  [12, "א", "As Rambam there, and at end of Hilchot Mikvaot."],
  [12, "ב", "Raavad."],
  [12, "ג", "Rashba."],
  [12, "ד", "Rashi in Berachot 50."],
  [13, "א", "Beginning of first chapter of Yadayim and Chullin 106."],
  [13, "ב", "Rashba and Ramban."],
  [13, "ג", "So too Rashba."],
  [13, "ד", "There at beginning of first chapter of Yadayim, per explanation of Rosh and Rosh."],
  [13, "ה", "There, chapter 2."],
  [14, "_", "Sefer Orchot Chaim in the name of Rashba."],
  [15, "א", "Tosafot brought Rosh there."],
  [15, "ב", "Rashba in Taharat HaBayit."],
];

function setEnglish(s, seif, marker, newEn) {
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
      slugM[1].trim() !== "beer-hagolah" ||
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

const fp = path.join(ROOT, "output", rel);
let s = fs.readFileSync(fp, "utf8");
for (const [seif, marker, en] of patches) {
  s = setEnglish(s, seif, marker, en);
  console.log(`OK ${seif} ${marker}`);
}
fs.writeFileSync(fp, s, "utf8");
