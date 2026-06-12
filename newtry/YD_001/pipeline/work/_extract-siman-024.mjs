#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SIMAN = path.join(ROOT, 'output', 'siman_024');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const dirs = fs.readdirSync(SIMAN).filter((d) =>
  fs.existsSync(path.join(SIMAN, d, 'part-001.txt'))
);

let total = 0;
const out = {};
for (const d of dirs.sort()) {
  const fp = path.join(SIMAN, d, 'part-001.txt');
  const s = fs.readFileSync(fp, 'utf8');
  const blocks = s.split(BLOCK).slice(1);
  out[d] = [];
  for (const b of blocks) {
    const seif = (b.match(/^\s*seif: (.+)$/m) || [])[1]?.trim();
    const marker = (b.match(/^\s*marker: (.+)$/m) || [])[1]?.trim() || 'main';
    const h0 = b.indexOf(HEB);
    const h1 = b.indexOf(ENG);
    const hebrew = b.slice(h0 + HEB.length + 1, h1).trim();
    const key = `${seif}#${marker}`;
    out[d].push({ key, hebrew: hebrew.slice(0, 200) + (hebrew.length > 200 ? '...' : '') });
    total++;
  }
  console.log(`${d}: ${blocks.length}`);
}
console.log('TOTAL', total);
fs.writeFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '_siman-024-keys.json'),
  JSON.stringify(out, null, 2),
  'utf8'
);
