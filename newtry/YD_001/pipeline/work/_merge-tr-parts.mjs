#!/usr/bin/env node
/** Merge _tr-parts-SIM/*.json → _tr-SIM.json (validates against _hebrew-SIM.json) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _merge-tr-parts.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const partDir = path.join(WORK, `_tr-parts-${sim}`);
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const out = {};

if (!fs.existsSync(partDir)) {
  console.error(`Missing ${partDir}`);
  process.exit(1);
}

for (const f of fs.readdirSync(partDir).filter((x) => x.endsWith('.json')).sort()) {
  const part = JSON.parse(fs.readFileSync(path.join(partDir, f), 'utf8'));
  for (const [slug, keys] of Object.entries(part)) {
    out[slug] = { ...(out[slug] || {}), ...keys };
  }
}

const missing = [];
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    if (!out[slug]?.[key]) missing.push(`${slug}:${key}`);
  }
}

const outPath = path.join(WORK, `_tr-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${outPath} — ${Object.values(out).reduce((a, m) => a + Object.keys(m).length, 0)} keys, ${missing.length} missing`);
if (missing.length) {
  console.error(missing.slice(0, 40).join('\n'));
  process.exit(1);
}
