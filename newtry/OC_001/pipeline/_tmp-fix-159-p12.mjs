#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const t = fs.readFileSync(path.join(WORK, "en-159-p12.txt"), "utf8");

const patches = [
  ["siman_159/turei-zahav/part-001.txt", "turei-zahav", 3, "_", "taz3"],
  ["siman_159/turei-zahav/part-001.txt", "turei-zahav", 7, "_", "taz7"],
  ["siman_159/turei-zahav/part-001.txt", "turei-zahav", 8, "_", "taz8"],
  ["siman_159/turei-zahav/part-001.txt", "turei-zahav", 15, "_", "taz15"],
  ["siman_159/yad-ephraim/part-001.txt", "yad-ephraim", 1, "_", "ye1"],
];

function setEnglish(rel, slug, seif, marker, key) {
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
  if (!found) throw new Error(`not found ${rel} ${seif} ${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} ${seif} ${marker}`);
}

for (const [rel, slug, seif, marker, key] of patches) {
  setEnglish(rel, slug, seif, marker, key);
}
