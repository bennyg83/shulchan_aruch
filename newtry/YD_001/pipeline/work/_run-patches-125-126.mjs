#!/usr/bin/env node
/** Extract Hebrew, generate translations, build patch runners, patch simanim 125–126 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['125', '126'];

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: WORK,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...opts,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of simanim) {
  console.log(`\n=== siman ${sim}: extract Hebrew ===`);
  run('node', ['_extract-hebrew-siman.mjs', sim]);

  console.log(`=== siman ${sim}: generate translations ===`);
  run('node', ['_gen-siman-translations.mjs', sim]);

  console.log(`=== siman ${sim}: write patch runner ===`);
  run('node', ['_mk-patch-runner.mjs', sim, `./_patch-siman-${sim}-translations.mjs`]);

  console.log(`=== siman ${sim}: apply patch ===`);
  run('node', [`_patch-siman-${sim}.mjs`]);
}

console.log('\n[COMPLETE] Session done — simanim: 125, 126');

