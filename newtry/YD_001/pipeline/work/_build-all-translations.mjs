#!/usr/bin/env node
/**
 * Build _data-SIM.mjs from _hebrew-SIM.json + _manual-SIM.json (optional).
 * Manual file: { slug: { key: english } } — must cover every block.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const manPath = path.join(WORK, `_manual-${sim}.json`);
const manual = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};
const T = {};
let miss = 0;
for (const slug of Object.keys(heb).sort()) {
  T[slug] = {};
  for (const [key, { heb: h }] of Object.entries(heb[slug])) {
    const t = manual[slug]?.[key];
    if (!t) {
      miss++;
      console.error(`missing ${slug} ${key}`);
    } else T[slug][key] = t;
  }
}
if (miss) {
  console.error(`${miss} missing in _manual-${sim}.json`);
  process.exit(1);
}
const out = path.join(WORK, `_data-${sim}.mjs`);
fs.writeFileSync(out, `export const TRANSLATIONS = ${JSON.stringify(T, null, 2)};\n`);
console.log(`wrote ${out}`);
