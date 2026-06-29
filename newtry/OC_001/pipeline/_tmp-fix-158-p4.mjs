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
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn.trimEnd() + nl + after;
  });
  if (!found) throw new Error(`not found ${rel} ${slug} ${seif} ${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${slug} ${seif} ${marker}`);
}

function parseSections(text) {
  const map = {};
  const parts = text.split(/---([א-ת]+)---/);
  for (let i = 1; i < parts.length; i += 2) {
    map[parts[i]] = parts[i + 1].trim();
  }
  return map;
}

const mb = parseSections(fs.readFileSync(path.join(WORK, "en-158-p4-mb.txt"), "utf8"));
const ma = parseSections(fs.readFileSync(path.join(WORK, "en-158-p4-ma.txt"), "utf8"));

const mbRel = "siman_158/mishnah-berurah/part-001.txt";
for (const m of ["א", "ב", "ג", "ד", "ה", "ו"]) {
  setEnglish(mbRel, "mishnah-berurah", 1, m, mb[m]);
}

const maRel = "siman_158/magen-avraham/part-001.txt";
const maText = fs.readFileSync(path.join(WORK, "en-158-p4-ma.txt"), "utf8");
const ma6 = maText.match(/---6---\n([\s\S]*?)(?=---7|$)/)[1].trim();
const ma7a = maText.match(/---7א---\n([\s\S]*?)(?=---7ב|$)/)[1].trim();
const ma7b = maText.match(/---7ב---\n([\s\S]*?)(?=---8|$)/)[1].trim();
const ma8 = maText.match(/---8---\n([\s\S]*?)$/)[1].trim();
setEnglish(maRel, "magen-avraham", 6, "_", ma6);
setEnglish(maRel, "magen-avraham", 7, "א", ma7a);
setEnglish(maRel, "magen-avraham", 7, "ב", ma7b);
setEnglish(maRel, "magen-avraham", 8, "_", ma8);
