#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(DIR, '_hebrew-094.json'), 'utf8'));
const SLUGS = ['siftei-kohen', 'peleti', 'mateh-yehonatan', 'yad-ephraim'];
const out = {};
for (const slug of SLUGS) {
  out[slug] = {};
  for (const [k, v] of Object.entries(h[slug])) {
    const heb = typeof v === 'string' ? v : v.heb || v.hebrew || '';
    out[slug][k] = heb;
  }
}
fs.writeFileSync(path.join(DIR, '_remaining-094-hebrew.json'), JSON.stringify(out, null, 2), 'utf8');
let n = 0;
for (const slug of SLUGS) n += Object.keys(out[slug]).length;
console.log('Wrote _remaining-094-hebrew.json', n, 'blocks');
