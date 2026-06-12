#!/usr/bin/env node
import fs from 'fs';
const patch = await import('./_patch-siman-095-translations.mjs');
const heb = JSON.parse(fs.readFileSync('_hebrew-095.json', 'utf8'));
const hebrew = /[\u0590-\u05FF]{2,}/;
const out = {};
for (const [slug, keys] of Object.entries(patch.TRANSLATIONS)) {
  for (const [key, val] of Object.entries(keys)) {
    if (hebrew.test(val)) {
      out[`${slug}|${key}`] = heb[slug][key].heb
        .replace(/<[^>]+>/g, '')
        .replace(/&quot;/g, '"');
    }
  }
}
fs.writeFileSync(
  '_hebrew-stubs-095.json',
  JSON.stringify(out, null, 2),
);
console.log(Object.keys(out).length);
