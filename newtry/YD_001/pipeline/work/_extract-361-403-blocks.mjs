#!/usr/bin/env node
/** Extract Hebrew blocks for simanim 361-403 editorial redo */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const SIMANIM = [
  361, 363, 364, 367, 368, 369, 370, 371, 372, 373,
  375, 376, 378, 379, 380, 383, 385, 389, 390, 391, 392, 393, 398, 399,
];

const all = [];
for (const n of SIMANIM) {
  const rel = `siman_${String(n).padStart(3, '0')}/siftei-kohen/part-001.txt`;
  const fp = path.join(OUT, rel);
  if (!fs.existsSync(fp)) continue;
  const s = fs.readFileSync(fp, 'utf8');
  for (const part of s.split(BLOCK).slice(1)) {
    const seif = (part.match(/^\s*seif: (.+)$/m) || [])[1]?.trim();
    const marker = (part.match(/^\s*marker: (.+)$/m) || [])[1]?.trim() || '_';
    const heStart = part.indexOf(HEB);
    const heEnd = part.indexOf(ENG);
    const enStart = part.indexOf(ENG);
    const enEnd = part.indexOf(END);
    const hebrew = part.slice(heStart + HEB.length + 1, heEnd).trim();
    const english = part.slice(enStart + ENG.length + 1, enEnd).trim();
    all.push({ siman: n, rel, seif, marker, key: `${seif}#${marker}`, hebrew, english });
  }
}

const outPath = path.join(ROOT, 'pipeline/work/_blocks-361-403.json');
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), 'utf8');
console.log(`Extracted ${all.length} blocks → ${outPath}`);
const bySiman = {};
for (const b of all) bySiman[b.siman] = (bySiman[b.siman] || 0) + 1;
console.log(JSON.stringify(bySiman, null, 2));
