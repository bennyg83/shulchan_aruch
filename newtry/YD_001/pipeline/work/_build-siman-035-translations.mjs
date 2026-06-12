#!/usr/bin/env node
/**
 * Builds _siman-035-translations.json from embedded slug maps.
 * Run: node _build-siman-035-translations.mjs && node _gen-patch-siman-035.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(fs.readFileSync(path.join(dir, '_siman-035-blocks.json'), 'utf8'));

// Import slug translation modules (split for maintainability)
const parts = await Promise.all([
  import('./_s035-trans-part1.mjs'),
  import('./_s035-trans-part2.mjs'),
  import('./_s035-trans-part3a.mjs'),
  import('./_s035-trans-part3b.mjs'),
  import('./_s035-trans-part3c.mjs'),
  import('./_s035-trans-kol.mjs'),
]);

const merged = {};
for (const p of parts) Object.assign(merged, p.default);

// Validate coverage
let missing = 0;
for (const [slug, arr] of Object.entries(blocks)) {
  if (!merged[slug]) {
    console.error(`MISSING SLUG: ${slug}`);
    missing += arr.length;
    continue;
  }
  for (const { key } of arr) {
    if (!(key in merged[slug])) {
      console.error(`MISSING KEY: ${slug} ${key}`);
      missing++;
    }
  }
}
if (missing) {
  console.error(`Total missing: ${missing}`);
  process.exit(1);
}
fs.writeFileSync(path.join(dir, '_siman-035-translations.json'), JSON.stringify(merged, null, 2));
console.log('OK translations', Object.values(merged).reduce((n, o) => n + Object.keys(o).length, 0), 'blocks');
