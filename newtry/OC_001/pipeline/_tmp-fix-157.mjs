#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "output");
const WORK = path.join(__dirname, "work");

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
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel}`);
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn.trimEnd() + nl + after;
  });
  if (!found) throw new Error(`Block not found: ${rel} ${slug} seif=${seif} marker=${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel}`);
}

const read = (f) => fs.readFileSync(path.join(WORK, f), "utf8");

setEnglish("siman_157/baer-heitev/part-001.txt", "baer-heitev", 1, "א", read("en-157-bh-a.txt"));
setEnglish("siman_157/machatzit-hashekel/part-001.txt", "machatzit-hashekel", 1, "א", read("en-157-mh-a.txt"));
console.log("siman 157 done");
