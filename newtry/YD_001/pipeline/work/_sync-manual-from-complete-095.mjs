#!/usr/bin/env node
/** Copy COMPLETE_095_STUBS into _manual-095.json for stable regen */
import fs from 'fs';
import { COMPLETE_095_STUBS } from './_complete-095-stubs.mjs';

const manualPath = '_manual-095.json';
const manual = JSON.parse(fs.readFileSync(manualPath, 'utf8'));
let n = 0;
for (const [slug, keys] of Object.entries(COMPLETE_095_STUBS)) {
  if (!manual[slug]) manual[slug] = {};
  for (const [key, val] of Object.entries(keys)) {
    manual[slug][key] = val;
    n++;
  }
}
fs.writeFileSync(manualPath, JSON.stringify(manual, null, 2) + '\n');
console.log(`Synced ${n} entries to _manual-095.json`);
