import fs from 'fs';
import { TRANSLATIONS } from './_patch-siman-092-translations.mjs';

const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
let total = 0;
let missing = 0;
let placeholder = 0;
const miss = [];

for (const slug of Object.keys(heb).sort()) {
  for (const key of Object.keys(heb[slug]).sort()) {
    total++;
    const t = TRANSLATIONS[slug]?.[key];
    if (!t) {
      missing++;
      miss.push(`${slug} ${key}`);
    } else if (t.includes('[Translation required')) {
      placeholder++;
      miss.push(`${slug} ${key} (placeholder)`);
    }
  }
}

console.log(JSON.stringify({ total, missing, placeholder, miss: miss.slice(0, 20) }, null, 2));
