#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const rel = "siman_159/mishnah-berurah/part-001.txt";
const t = fs.readFileSync(path.join(WORK, "en-159-p8.txt"), "utf8");

const blocks = [
  [5, "א", "5א"],
  [5, "ב", "5ב"],
  [5, "ג", "5ג"],
  [5, "ד", "5ד"],
  [5, "ה", "5ה"],
  [5, "ו", "5ו"],
  [5, "ז", "5ז"],
  [6, "א", "6א"],
  [6, "ב", "6ב"],
  [6, "ג", "6ג"],
  [6, "ד", "6ד"],
  [6, "ה", "6ה"],
  [6, "ו", "6ו"],
  [6, "ז", "6ז"],
  [7, "א", "7א"],
  [7, "ב", "7ב"],
  [7, "ג", "7ג"],
  [7, "ד", "7ד"],
  [7, "ה", "7ה"],
  [7, "ו", "7ו"],
  [7, "ז", "7ז"],
  [7, "ח", "7ח"],
];

function setEnglish(seif, marker, key) {
  const fp = path.join(ROOT, "output", rel);
  const s = fs.readFileSync(fp, "utf8");
  const newEn = t.match(new RegExp(`---${key}---\\n([\\s\\S]*?)(?=---|$)`))[1].trim();
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
      slugM[1].trim() !== "mishnah-berurah" ||
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
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${seif} ${marker}`);
}

for (const [seif, marker, key] of blocks) {
  setEnglish(seif, marker, key);
}
