#!/usr/bin/env node
/** Run Claude translation for all slugs in a siman (skip mechaber if in _manual-SIM.mjs) */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _run-claude-siman.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const skip = new Set(process.argv.slice(3));
if (fs.existsSync(path.join(WORK, `_manual-${sim}.mjs`))) skip.add('mechaber');

for (const slug of Object.keys(heb).sort()) {
  if (skip.has(slug)) {
    console.log(`\n--- skip ${slug} ---`);
    continue;
  }
  console.log(`\n=== ${sim} / ${slug} ===`);
  const r = spawnSync('node', ['_claude-translate-yd-siman.mjs', sim, slug], {
    cwd: WORK,
    stdio: 'inherit',
    timeout: 900000,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
