#!/usr/bin/env node
/** Write translations-NNN/{slug}.mjs from _hebrew-NNN.json (+ optional _overrides-NNN.json) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translateBlock } from './_gen-089-090-translations.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = (process.argv[2] || '090').padStart(3, '0');
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);
let overrides = {};
for (const name of [`_overrides-${sim}.json`, `_manual-${sim}.json`]) {
  const p = path.join(WORK, name);
  if (fs.existsSync(p)) overrides = { ...overrides, ...JSON.parse(fs.readFileSync(p, 'utf8')) };
}
const outDir = path.join(WORK, `translations-${sim}`);
fs.mkdirSync(outDir, { recursive: true });
const skip = new Set(['mechaber']);

for (const slug of Object.keys(heb).sort()) {
  if (skip.has(slug)) continue;
  const map = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    if (overrides[slug]?.[key]) map[key] = overrides[slug][key];
    else map[key] = translateBlock(slug, entry.heb, sim);
  }
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(map)) {
    lines.push(`  '${k}': ${JSON.stringify(v)},`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(outDir, `${slug}.mjs`), lines.join('\n'), 'utf8');
  const hebN = (lines.join('\n').match(/[\u0590-\u05FF]/g) || []).length;
  console.log(`${slug}.mjs — ${Object.keys(map).length} keys, ${hebN} Hebrew chars`);
}
