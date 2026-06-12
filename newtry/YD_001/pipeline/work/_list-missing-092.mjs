import fs from 'fs';
import { TRANSLATIONS_P1 } from './_patch-siman-092-translations-p1.mjs';
import { TRANSLATIONS_P2 } from './_patch-siman-092-translations-p2.mjs';

const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
const merged = {};
for (const part of [TRANSLATIONS_P1, TRANSLATIONS_P2]) {
  for (const [slug, keys] of Object.entries(part)) {
    merged[slug] = { ...merged[slug], ...keys };
  }
}

const bySlug = {};
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    if (!merged[slug]?.[key]) {
      (bySlug[slug] ||= []).push(key);
    }
  }
}
console.log(JSON.stringify(bySlug, null, 2));
console.log('total missing', Object.values(bySlug).flat().length);
