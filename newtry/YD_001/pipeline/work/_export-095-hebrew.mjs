#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-095.json'), 'utf8'));
const slugs = [
  'siftei-kohen',
  'turei-zahav',
  'beur-hagra',
  'kaf-hachayim',
  'kereti',
  'pitchei-teshuva',
  'mateh-yehonatan',
  'yad-avraham',
  'rabbi-akiva-eiger-yd',
  'peleti',
  'nekudot-hakesef',
  'yad-ephraim',
];
const out = [];
for (const slug of slugs) {
  for (const [key, e] of Object.entries(h[slug])) {
    out.push({ slug, key, heb: e.heb, raw: e.raw || e.heb });
  }
}
fs.writeFileSync(path.join(WORK, '_export-095-hebrew.json'), JSON.stringify(out, null, 2));
console.log(out.length, 'blocks');
