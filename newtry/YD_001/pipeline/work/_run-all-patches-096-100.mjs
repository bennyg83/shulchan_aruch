#!/usr/bin/env node
/** Generate and run patch scripts for simanim 096-100 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['096', '097', '098', '099', '100'];

for (const sim of simanim) {
  const ov = path.join(WORK, `_overrides-${sim}.json`);
  if (!fs.existsSync(ov)) {
    console.error(`Missing ${ov} — cannot patch siman ${sim}`);
    process.exit(1);
  }
  console.log(`\n=== siman ${sim}: generate ===`);
  let r = spawnSync('node', ['_gen-patch-from-hebrew.mjs', sim], { cwd: WORK, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status);

  console.log(`=== siman ${sim}: patch ===`);
  r = spawnSync('node', [`_patch-siman-${sim}.mjs`], { cwd: WORK, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status);

  if (sim === '100') {
    console.log('=== siman 100: slot1 finish + ownership ===');
    r = spawnSync('node', ['_finish-slot1-siman-100.mjs'], { cwd: WORK, stdio: 'inherit' });
    if (r.status !== 0) process.exit(r.status);
  } else {
    r = spawnSync('node', ['_log-siman.mjs', String(parseInt(sim, 10))], { cwd: WORK, stdio: 'inherit' });
    if (r.status !== 0) process.exit(r.status);
  }
}

console.log('\n[COMPLETE] Session done — simanim: 096, 097, 098, 099, 100');
