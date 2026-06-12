#!/usr/bin/env node
/** Run patch scripts for simanim 091-095 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sims = ['091', '092', '093', '094', '095'];

for (const s of sims) {
  console.log(`\n=== siman ${s} ===`);
  const r = spawnSync('node', [`_patch-siman-${s}.mjs`], { cwd: WORK, stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`FAILED siman ${s} (exit ${r.status})`);
    process.exit(r.status);
  }
}
console.log('\n[COMPLETE] All patches 091-095 applied.');
