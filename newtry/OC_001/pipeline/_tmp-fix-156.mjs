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
  console.log(`OK ${rel} ${slug} seif=${seif} marker=${marker}`);
}

const read = (f) => fs.readFileSync(path.join(WORK, f), "utf8");

const ma = "siman_156/magen-avraham/part-001.txt";
const mb = "siman_156/mishnah-berurah/part-001.txt";

setEnglish(ma, "magen-avraham", 1, "א", read("en-156-ma-a.txt"));
setEnglish(ma, "magen-avraham", 1, "ב", read("en-156-ma-b.txt"));

const abc = read("en-156-mb-abc.txt").split(/\n\n+/);
setEnglish(mb, "mishnah-berurah", 1, "א", abc[0]);
setEnglish(mb, "mishnah-berurah", 1, "ב", abc[1]);
setEnglish(mb, "mishnah-berurah", 1, "ג", abc[2]);
setEnglish(mb, "mishnah-berurah", 1, "ד", read("en-156-mb-d.txt"));

console.log("siman 156 patches done");
