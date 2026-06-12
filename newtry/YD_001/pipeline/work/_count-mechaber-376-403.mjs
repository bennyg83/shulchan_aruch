#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(WORK, '../../output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
let total = 0;
const rows = [];
for (let s = 376; s <= 403; s++) {
  const tag = String(s).padStart(3, '0');
  const dir = path.join(OUT, `siman_${tag}`, 'mechaber');
  if (!fs.existsSync(dir)) {
    rows.push({ s, blocks: 0, missing: true });
    continue;
  }
  let n = 0;
  for (const f of fs.readdirSync(dir).filter((x) => /^part-.*\.txt$/i.test(x))) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    n += (text.match(/^\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*/gm) || []).length;
  }
  total += n;
  rows.push({ s, blocks: n });
}
console.log(JSON.stringify({ total, rows }, null, 2));
