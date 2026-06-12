#!/usr/bin/env node
/** Generate translations + patch simanim 096–100; finish slot1 on 100 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['096', '097', '098', '099', '100'];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of simanim) {
  const ov = path.join(WORK, `_overrides-${sim}.json`);
  const manual = path.join(WORK, `_manual-${sim}.json`);
  const chunks = path.join(WORK, `_chunks-${sim}`);
  if (!fs.existsSync(ov) && !fs.existsSync(manual) && !fs.existsSync(chunks)) {
    console.error(`siman ${sim}: need _overrides-${sim}.json, _manual-${sim}.json, or _chunks-${sim}/`);
    process.exit(1);
  }
  if (sim === '097' && !fs.existsSync(ov) && fs.existsSync(manual)) {
    fs.copyFileSync(manual, ov);
  }
  if (sim === '100' && fs.existsSync(manual)) {
    fs.copyFileSync(manual, ov);
  }

  console.log(`\n=== siman ${sim}: generate ===`);
  run('node', [`_gen-patch-from-hebrew.mjs`, sim]);

  console.log(`=== siman ${sim}: patch ===`);
  run('node', [`_patch-siman-${sim}.mjs`]);

  if (sim === '100') {
    console.log('=== siman 100: slot1 finish ===');
    run('node', ['_finish-slot1-siman-100.mjs']);
  } else {
    run('node', ['_log-siman.mjs', String(parseInt(sim, 10))]);
  }
}

console.log('\n[COMPLETE] Session done — simanim: 096, 097, 098, 099, 100');
