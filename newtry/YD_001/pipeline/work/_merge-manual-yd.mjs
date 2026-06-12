#!/usr/bin/env node
/** Merge _chunks-SIM/*.json + _manual-SIM.mjs → _manual-SIM.json (manual wins) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _merge-manual-yd.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const out = {};

const chunkDir = path.join(WORK, `_chunks-${sim}`);
if (fs.existsSync(chunkDir)) {
  for (const f of fs.readdirSync(chunkDir).filter((x) => x.endsWith('.json'))) {
    const slug = f.replace(/\.json$/, '');
    const part = JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8'));
    out[slug] = { ...(out[slug] || {}), ...part };
  }
}

const mjsPath = path.join(WORK, `_manual-${sim}.mjs`);
if (fs.existsSync(mjsPath)) {
  const { MANUAL } = await import(`./_manual-${sim}.mjs`);
  for (const [slug, keys] of Object.entries(MANUAL)) {
    out[slug] = { ...(out[slug] || {}), ...keys };
  }
}

const outPath = path.join(WORK, `_manual-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
let total = 0;
let missing = 0;
let hebLeft = 0;
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    total++;
    if (!out[slug]?.[key]) missing++;
    else if (/[\u0590-\u05FF]{3,}/.test(out[slug][key])) hebLeft++;
  }
}
console.log(`Wrote ${outPath}: ${total} expected, ${missing} missing, ${hebLeft} with Hebrew`);
