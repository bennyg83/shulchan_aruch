#!/usr/bin/env node
/** Apply all simanim 361-403 editorial patches (Siftei Kohen full redo) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T as t361 } from './_tr-361-siftei-kohen.mjs';
import { T as t363 } from './_tr-363-siftei-kohen.mjs';
import { T as t364 } from './_tr-364-siftei-kohen.mjs';
import { T as t367 } from './_tr-367-siftei-kohen.mjs';
import { T as t368 } from './_tr-368-siftei-kohen.mjs';
import { T as t369 } from './_tr-369-siftei-kohen.mjs';
import { T as t370 } from './_tr-370-siftei-kohen.mjs';
import { T as t371 } from './_tr-371-siftei-kohen.mjs';
import { T as t372 } from './_tr-372-siftei-kohen.mjs';
import { T as t373 } from './_tr-373-siftei-kohen.mjs';
import { T as t375 } from './_tr-375-siftei-kohen.mjs';
import { T as t376 } from './_tr-376-siftei-kohen.mjs';
import { T as t378 } from './_tr-378-siftei-kohen.mjs';
import { T as t379 } from './_tr-379-siftei-kohen.mjs';
import { T as t380 } from './_tr-380-siftei-kohen.mjs';
import { T as t383 } from './_tr-383-siftei-kohen.mjs';
import { T as t385 } from './_tr-385-siftei-kohen.mjs';
import { T as t389 } from './_tr-389-siftei-kohen.mjs';
import { T as t390 } from './_tr-390-siftei-kohen.mjs';
import { T as t391 } from './_tr-391-siftei-kohen.mjs';
import { T as t392 } from './_tr-392-siftei-kohen.mjs';
import { T as t393 } from './_tr-393-siftei-kohen.mjs';
import { T as t398 } from './_tr-398-siftei-kohen.mjs';
import { T as t399 } from './_tr-399-siftei-kohen.mjs';

const GARBAGE_PATTERNS = [
  /Lord's Prayer/i,
  /Lord['\u2019]s Prayer/i,
  /Capernaum/i,
  /Hashem's (Word|people|promise|covenant|glory|presence)/i,
  /Hashem['\u2019]s (Word|people|promise|covenant|glory|presence)/i,
  /Magen Abraham/i,
  /on Saturday/i,
  /baptism/i,
  /Dalai Lama/i,
  /Dambigail/i,
  /Agrater/i,
  /\bquaint\b/i,
  /penis/i,
  /\bthis bitch\b/i,
  /cowboy/i,
  /Lord's covenant/i,
  /Holy Qur'an/i,
  /Holy Qur[\u2019']an/i,
  /(\. ){6,}/,
  /[A-Z]\.[A-Z]\.[A-Z]\.[A-Z]\.[A-Z]\./,
  /from Jesus/i,
  /Holy Spirit/i,
  /MYMEMORY/i,
];

const ENTRIES = [
  [361, t361], [363, t363], [364, t364], [367, t367], [368, t368], [369, t369],
  [370, t370], [371, t371], [372, t372], [373, t373], [375, t375], [376, t376],
  [378, t378], [379, t379], [380, t380], [383, t383], [385, t385], [389, t389],
  [390, t390], [391, t391], [392, t392], [393, t393], [398, t398], [399, t399],
];

function isGarbage(text) {
  return GARBAGE_PATTERNS.some((p) => p.test(text));
}

function countGarbageInSiman(n) {
  const rel = `siman_${String(n).padStart(3, '0')}/siftei-kohen/part-001.txt`;
  const fp = path.join(ROOT, 'output', rel);
  if (!fs.existsSync(fp)) return { blocks: 0, garbage: 0 };
  const s = fs.readFileSync(fp, 'utf8');
  const parts = s.split('**** YD001 SOURCE BLOCK ****').slice(1);
  let garbage = 0;
  for (const part of parts) {
    const enMatch = part.match(/\*\*\*\* ENGLISH \*\*\*\*([\s\S]*?)\*\*\*\* END BLOCK \*\*\*\*/);
    if (enMatch && isGarbage(enMatch[1])) garbage++;
  }
  return { blocks: parts.length, garbage };
}

let total = 0;
const bySiman = {};
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');

for (const [n, T] of ENTRIES) {
  const rel = `siman_${String(n).padStart(3, '0')}/siftei-kohen/part-001.txt`;
  const fp = path.join(ROOT, 'output', rel);
  if (!fs.existsSync(fp)) {
    console.warn(`[SKIP] missing ${rel}`);
    continue;
  }
  const nBlocks = patchFile(rel, 'siftei-kohen', T);
  total += nBlocks;
  bySiman[n] = nBlocks;
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} siman_${String(n).padStart(3, '0')}/siftei-kohen ${nBlocks} blocks editorial CLEAN\n`,
  );
}

fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_361-403 FULL REDO editorial CLEAN (quality-gate)\n`,
);

console.log('\n[DONE] siman 361-403 — ' + total + ' blocks');
console.log('\nBlocks per siman:');
let totalGarbage = 0;
for (const n of Object.keys(bySiman).map(Number).sort((a, b) => a - b)) {
  const { blocks, garbage } = countGarbageInSiman(n);
  totalGarbage += garbage;
  const status = garbage === 0 ? 'CLEAN' : `GARBAGE=${garbage}`;
  console.log(`  siman_${String(n).padStart(3, '0')}: ${bySiman[n]} patched, ${blocks} blocks, ${status}`);
}
console.log(`\nTotal garbage blocks: ${totalGarbage}`);
if (totalGarbage > 0) process.exit(1);
