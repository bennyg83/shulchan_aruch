#!/usr/bin/env node
/** Merge _chunks-SIM/*.json → _overrides-SIM.json for _gen-siman-translations.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _build-overrides-from-chunks.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const chunkDir = path.join(WORK, `_chunks-${sim}`);
const out = {};

if (fs.existsSync(chunkDir)) {
  for (const f of fs.readdirSync(chunkDir).filter((x) => x.endsWith('.json'))) {
    const slug = f.replace(/\.json$/, '');
    const part = JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8'));
    out[slug] = { ...(out[slug] || {}), ...part };
  }
}

const outPath = path.join(WORK, `_overrides-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');

const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
let total = 0;
let missing = 0;
let hebLeft = 0;
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    total++;
    const v = out[slug]?.[key];
    if (!v) missing++;
    else if (/[\u0590-\u05FF]{3,}/.test(v)) hebLeft++;
  }
}
console.log(`Wrote ${outPath}: ${total} expected, ${missing} missing keys, ${hebLeft} with Hebrew`);
