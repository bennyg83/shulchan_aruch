#!/usr/bin/env node
/** Merge baer manual JSON + HANDLERS modules into _manual-089.json / _manual-090.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HANDLERS_089 } from './_handlers-089.mjs';
import { HANDLERS_090 } from './_handlers-090.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));

function merge(sim, HANDLERS) {
  const basePath = path.join(WORK, `_manual-${sim}.json`);
  const base = fs.existsSync(basePath) ? JSON.parse(fs.readFileSync(basePath, 'utf8')) : {};
  for (const [slug, blocks] of Object.entries(HANDLERS)) {
    base[slug] = { ...(base[slug] || {}), ...blocks };
  }
  fs.writeFileSync(basePath, JSON.stringify(base, null, 2) + '\n');
  const n = Object.values(base).reduce((a, m) => a + Object.keys(m).length, 0);
  console.log(`Wrote ${basePath} — ${n} total keys`);
}

merge('089', HANDLERS_089);
merge('090', HANDLERS_090);
