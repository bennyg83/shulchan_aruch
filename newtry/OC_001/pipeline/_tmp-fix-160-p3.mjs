#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const t = fs.readFileSync(path.join(WORK, "en-160-p3.txt"), "utf8");

const files = {
  "siman_160/chatam-sofer/part-001.txt": [
    ["chatam-sofer", 1, "_", "cs1"],
    ["chatam-sofer", 2, "_", "cs2"],
    ["chatam-sofer", 3, "_", "cs3"],
  ],
  "siman_160/eliyah-rabbah/part-001.txt": [["eliyah-rabbah", 15, "_", "er15"]],
  "siman_160/kaf-hachayyim/part-001.txt": [
    ["kaf-hachayyim", 2, "_", "kh2"],
    ["kaf-hachayyim", 5, "_", "kh5"],
    ["kaf-hachayyim", 10, "_", "kh10"],
    ["kaf-hachayyim", 11, "_", "kh11"],
  ],
};

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
  if (!found) throw new Error(`not found ${rel} ${slug} ${seif} ${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${slug} ${seif} ${marker}`);
}

for (const [rel, blocks] of Object.entries(files)) {
  for (const [slug, seif, marker, key] of blocks) {
    setEnglish(rel, slug, seif, marker, key);
  }
}
