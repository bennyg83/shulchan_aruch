#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..', 'output');
const B = '**** YD001 SOURCE BLOCK ****';
const from = Number(process.argv[2] ?? 326);
const to = Number(process.argv[3] ?? 350);

let total = 0;
for (let s = from; s <= to; s++) {
  const tag = String(s).padStart(3, '0');
  const dir = path.join(ROOT, `siman_${tag}`, 'mechaber');
  if (!fs.existsSync(dir)) {
    console.log(`${tag}\t0\tMISSING`);
    continue;
  }
  let n = 0;
  for (const f of fs.readdirSync(dir).filter((x) => /^part-.*\.txt$/i.test(x))) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    n += (t.match(/\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*/g) || []).length;
  }
  total += n;
  console.log(`${tag}\t${n}`);
}
console.log(`TOTAL\t${total}`);
