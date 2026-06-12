#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const from = parseInt(process.argv[2], 10);
const to = parseInt(process.argv[3], 10);
for (let s = from; s <= to; s++) {
  const tag = String(s).padStart(3, '0');
  const p = path.join(WORK, `_hebrew-${tag}.json`);
  if (!fs.existsSync(p)) continue;
  const h = JSON.parse(fs.readFileSync(p, 'utf8'));
  const m = h.hebrewBySlug?.mechaber || {};
  console.log(`\n######## SIMAN ${tag} (${Object.keys(m).length} blocks) ########\n`);
  for (const [k, v] of Object.entries(m)) {
    const clean = v.split('\n**** ENGLISH ****')[0].trim();
    console.log(`--- ${k} ---\n${clean}\n`);
  }
}
