#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..', 'output');
const FAIL = /Lord's Prayer|Hashem's Word|Capernaum|Holy Qur'an|psalmist|her age|the craft|Saturday|cold spot|hand recoils|first dish|allocated|Darbanan|Burburn|Gomma|Phosician|LibreTranslate/i;
const SKIP_SLUGS = new Set(['mechaber', 'rama', 'manifest.json']);

const from = +process.argv[2] || 201;
const to = +process.argv[3] || 300;

let total = 0;
const bySiman = {};

for (let n = from; n <= to; n++) {
  const dir = path.join(ROOT, `siman_${String(n).padStart(3, '0')}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    if (SKIP_SLUGS.has(slug)) continue;
    const sdir = path.join(dir, slug);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const f of fs.readdirSync(sdir).filter((x) => x.endsWith('.txt'))) {
      const text = fs.readFileSync(path.join(sdir, f), 'utf8');
      for (const ch of text.split('**** END BLOCK ****')) {
        if (!ch.includes('**** ENGLISH ****')) continue;
        const eng = ch.split('**** ENGLISH ****')[1].trim();
        if (!FAIL.test(eng)) continue;
        const seif = ch.match(/seif: (\S+)/)?.[1] ?? '?';
        const marker = ch.match(/marker: (\S+)/)?.[1] ?? '?';
        const key = `siman_${n}/${slug}/${f}:${seif}#${marker}`;
        bySiman[n] = (bySiman[n] || 0) + 1;
        total++;
        if (total <= 40) console.log(key);
      }
    }
  }
}

console.log(`\n[TOTAL] ${total} blocks in simanim ${from}-${to}`);
const top = Object.entries(bySiman)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);
console.log('[TOP]', top.map(([s, c]) => `${s}:${c}`).join(', '));
