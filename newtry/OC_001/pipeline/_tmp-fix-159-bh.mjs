#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const patches = [
  [1, "א", "Chullin 107."],
  [1, "ב", "Ch. 1 of tractate Yadayim."],
  [1, "ג", "Chullin 106."],
  [1, "ד", "Niddah 49."],
  [1, "ה", "Ra'ash there in Chullin."],
  [2, "_", "Ra'ash there."],
  [3, "_", "Chullin 107, per Tosafot's explanation."],
  [4, "א", "Chullin there."],
  [4, "ב", "Semak."],
  [5, "א", "Tur."],
  [5, "ב", "Ra'ash."],
  [6, "א", "Ch. 1 of Yadayim."],
  [6, "ב", "Mordechai ch. 8 of Berachot."],
  [7, "א", "Chullin 107."],
  [7, "ב", "Ra'ah."],
  [7, "ג", "There in the Gemara."],
  [7, "ד", "Rif per his version and Rambam."],
  [8, "א", "Rashba in the name of Ramban."],
  [8, "ב", "Hagahot Maimoniyot."],
  [8, "ג", "Tur, Hagahot Maimoniyot, and Semak."],
  [8, "ד", "Beit Yosef."],
  [9, "א", "End of ch. 1 of Yadayim."],
  [9, "ב", "Ra'ash and Mordechai there."],
  [10, "_", "Ch. 1 of Yadayim."],
  [11, "_", "See there."],
  [12, "א", "Tosafot and Ra'ash."],
  [12, "ב", "Ramban and Rashba."],
  [13, "_", "Chagigah 11."],
  [14, "א", "Peirush 9 of Hilchot Mikvaot and Raavad."],
  [14, "ב", "Rabbeinu Yonah and Rashba."],
  [14, "ג", "Rashi and Mordechai ch. 8 of Berachot."],
  [15, "_", "Per Rashi and Rashba; and for Rambam the simple meaning is that one does not immerse."],
  [16, "א", "Ch. 6 of Hilchot Berachot."],
  [16, "ב", "Ch. 4 of Hilchot Mikvaot."],
  [17, "_", "Rashba and Terumat HaDeshen."],
  [18, "_", "There in Terumat HaDeshen."],
  [19, "_", "Tosafot ch. 2 of tractate Yadayim and Mordechai ch. 8 of Berachot."],
  [20, "_", "Rashba and Rabbeinu Yonah."],
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

const fp = path.join(ROOT, "output/siman_159/beer-hagolah/part-001.txt");
let s = fs.readFileSync(fp, "utf8");
for (const [seif, marker, en] of patches) s = setEnglish(s, seif, marker, en);
fs.writeFileSync(fp, s, "utf8");
console.log("beer-hagolah 159: all blocks");

const bhRel = "siman_159/baer-heitev/part-001.txt";
function setBh(seif, marker, newEn) {
  const fp2 = path.join(ROOT, "output", bhRel);
  let t = fs.readFileSync(fp2, "utf8");
  const parts = t.split("**** OC001 SOURCE BLOCK ****");
  let found = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const head = "**** OC001 SOURCE BLOCK ****";
    if (
      !slugM ||
      slugM[1].trim() !== "baer-heitev" ||
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
  if (!found) throw new Error(`bh not found ${seif}`);
  fs.writeFileSync(fp2, out.join(""), "utf8");
}

setBh(
  12,
  "_",
  "To be stringent. And b'dieved it is valid; and although Beit Yosef holds doubtful [kaf] [bet] — he disqualified slaughter of a monkey, thinking slaughter is Torah law."
);
setBh(
  18,
  "_",
  "In washing. And he blesses on netilat yadayim. Magen Avraham and Levush as implied in Shulchan Aruch; and one who disagrees — Yad Aharon."
);
