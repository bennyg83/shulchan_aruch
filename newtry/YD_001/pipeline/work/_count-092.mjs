import fs from 'fs';
import { TRANSLATIONS_P1 } from './_patch-siman-092-translations-p1.mjs';
const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
let n = 0,
  m = 0;
const miss = [];
for (const s of Object.keys(heb)) {
  for (const k of Object.keys(heb[s])) {
    n++;
    if (!TRANSLATIONS_P1[s]?.[k]) {
      m++;
      miss.push(`${s} ${k}`);
    }
  }
}
console.log({ total: n, p1: n - m, missing: m, slugs: [...new Set(miss.map((x) => x.split(' ')[0]))] });
