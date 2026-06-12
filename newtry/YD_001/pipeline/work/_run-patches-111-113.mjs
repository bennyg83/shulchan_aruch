#!/usr/bin/env node
/** Extract Hebrew, Claude-translate slugs, build overrides, patch simanim 111–113 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['111', '112', '113'];

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: WORK,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...opts,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// Merge mechaber overrides once
const mainPath = path.join(WORK, '_mechaber-overrides.json');
const extraPath = path.join(WORK, '_mechaber-overrides-111-113.json');
let mechaberAll = {};
if (fs.existsSync(mainPath)) {
  mechaberAll = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
}
if (fs.existsSync(extraPath)) {
  const extra = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
  for (const [sim, slugs] of Object.entries(extra)) {
    mechaberAll[sim] = { ...(mechaberAll[sim] || {}), ...slugs };
  }
  fs.writeFileSync(mainPath, JSON.stringify(mechaberAll, null, 2) + '\n', 'utf8');
  console.log('Merged _mechaber-overrides-111-113.json into _mechaber-overrides.json');
}

for (const sim of simanim) {
  console.log(`\n=== siman ${sim}: extract Hebrew ===`);
  run('node', ['_extract-hebrew-siman.mjs', sim]);

  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  console.log(`=== siman ${sim}: generate translations ===`);
  run('node', ['_gen-siman-translations.mjs', sim]);

  console.log(`=== siman ${sim}: write patch runner ===`);
  run('node', ['_mk-patch-runner.mjs', sim, `./_patch-siman-${sim}-translations.mjs`]);

  console.log(`=== siman ${sim}: apply patch ===`);
  run('node', [`_patch-siman-${sim}.mjs`]);
}

console.log('\n[COMPLETE] Session done — simanim: 111, 112, 113');
