#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "output");
const WORK = path.join(__dirname, "work");
const read = (f) => fs.readFileSync(path.join(WORK, f), "utf8");

function setEnglish(rel, slug, seif, marker, newEn) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
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
    return head + before + newEn.trimEnd() + nl + after;
  });
  if (!found) throw new Error(`not found ${rel} ${seif} ${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} ${slug} seif=${seif}`);
}

setEnglish("siman_158/eliyah-rabbah/part-001.txt", "eliyah-rabbah", 3, "_", read("en-158-er-3.txt"));
setEnglish("siman_158/eliyah-rabbah/part-001.txt", "eliyah-rabbah", 5, "_", read("en-158-er-5.txt"));
setEnglish("siman_158/kaf-hachayyim/part-001.txt", "kaf-hachayyim", 1, "_", read("en-158-kh-1.txt"));
setEnglish("siman_158/kaf-hachayyim/part-001.txt", "kaf-hachayyim", 10, "_", read("en-158-kh-10.txt"));
