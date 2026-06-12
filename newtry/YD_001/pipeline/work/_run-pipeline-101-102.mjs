#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));

function run(args) {
  const r = spawnSync('node', args, { cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of ['101', '102']) {
  console.log(`\n======== siman ${sim} ========`);
  run(['_merge-manual-yd.mjs', sim]);
  run(['_gen-patch-from-hebrew.mjs', sim]);
  run([`_patch-siman-${sim}.mjs`]);
}

console.log('\n[COMPLETE] Pipeline finished for simanim 101 and 102');
