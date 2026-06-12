#!/usr/bin/env node
/** Emit _patch-siman-NNN-translations.mjs from _hebrew-siman-NNN.json + _tr-siman-NNN.json overrides */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _mk-translations.mjs 081|082');
  process.exit(1);
}
const dir = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(dir, `_hebrew-siman-${sim}.json`), 'utf8'));
const trPath = path.join(dir, `_tr-siman-${sim}.json`);
const tr = fs.existsSync(trPath) ? JSON.parse(fs.readFileSync(trPath, 'utf8')) : {};
const missing = [];
for (const [slug, keys] of Object.entries(heb)) {
  for (const key of Object.keys(keys)) {
    if (!tr[slug]?.[key]) missing.push(`${slug}:${key}`);
  }
}
if (missing.length) {
  console.error(`Missing ${missing.length} translations in _tr-siman-${sim}.json`);
  console.error(missing.slice(0, 20).join('\n'));
  process.exit(1);
}
const out = `/** Translation maps for siman ${sim} — auto-generated */\nexport const TRANSLATIONS = ${JSON.stringify(tr, null, 2)};\n`;
fs.writeFileSync(path.join(dir, `_patch-siman-${sim}-translations.mjs`), out);
console.log(`Wrote _patch-siman-${sim}-translations.mjs`);
