#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
for (const slug of ['beur-hagra', 'kereti', 'peleti', 'pitchei-teshuva', 'kaf-hachayim', 'kol-yaakov']) {
  let total = 0;
  let n = 0;
  for (const part of slug === 'kol-yaakov' ? ['part-001.txt', 'part-002.txt'] : ['part-001.txt']) {
    const s = fs.readFileSync(path.join(ROOT, 'output', `siman_036/${slug}/${part}`), 'utf8');
    for (const b of s.split(BLOCK).slice(1)) {
      const he = b.slice(b.indexOf(HEB) + HEB.length + 1, b.indexOf(ENG)).replace(/<[^>]+>/g, '').trim();
      total += he.length;
      n++;
    }
  }
  console.log(slug, n, 'avg', Math.round(total / n));
}
