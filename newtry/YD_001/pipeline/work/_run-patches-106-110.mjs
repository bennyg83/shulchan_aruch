#!/usr/bin/env node
/** Extract Hebrew, generate translations, patch simanim 106–110 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['106', '107', '108', '109', '110'];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// Merge mechaber overrides 106–110 into main file once
const mainPath = path.join(WORK, '_mechaber-overrides.json');
const extraPath = path.join(WORK, '_mechaber-overrides-106-110.json');
if (fs.existsSync(extraPath)) {
  const main = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
  const extra = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
  Object.assign(main, extra);
  fs.writeFileSync(mainPath, JSON.stringify(main, null, 2) + '\n', 'utf8');
  console.log('Merged _mechaber-overrides-106-110.json into _mechaber-overrides.json');
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

console.log('\n[COMPLETE] Session done — simanim: 106, 107, 108, 109, 110');
