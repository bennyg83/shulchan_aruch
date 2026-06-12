#!/usr/bin/env node
/** Full translations from _tr-NNN.json → patch output for simanim 117–119 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['117', '118', '119'];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of simanim) {
  const trPath = path.join(WORK, `_tr-${sim}.json`);
  if (!fs.existsSync(trPath)) {
    console.error(`Missing ${trPath} — run translation build first`);
    process.exit(1);
  }

  console.log(`\n=== siman ${sim}: extract Hebrew ===`);
  run('node', ['_extract-hebrew-siman.mjs', sim]);

  console.log(`=== siman ${sim}: emit translations module ===`);
  run('node', ['_emit-tr-to-patch.mjs', sim]);

  console.log(`=== siman ${sim}: write patch runner ===`);
  run('node', ['_mk-patch-runner.mjs', sim, `./_patch-siman-${sim}-translations.mjs`]);

  console.log(`=== siman ${sim}: apply patch ===`);
  run('node', [`_patch-siman-${sim}.mjs`]);
}

console.log('\n[COMPLETE] Session done — simanim: 117, 118, 119');
