#!/usr/bin/env node
/** Re-apply all clean editorial patches for siman 099 (never _patch-siman-099-translations.mjs). */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');

const PATCHES = [
  '_patch-siman-099-baer-heitev.mjs',
  '_patch-siman-099-beer-hagolah.mjs',
  '_patch-siman-099-turei-zahav.mjs',
  '_patch-siman-099-siftei-kohen.mjs',
  '_patch-siman-099-beur-hagra.mjs',
  '_patch-siman-099-kereti.mjs',
  '_patch-siman-099-peleti.mjs',
  '_patch-siman-099-pitchei-teshuva.mjs',
  '_patch-siman-099-yad-avraham.mjs',
  '_patch-siman-099-editorial.mjs',
];

function run(cmd, args = []) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const p of PATCHES) {
  console.log(`\n=== ${p} ===`);
  run('node', [path.join('pipeline/work', p)]);
}

console.log('\n=== apply:dictionary ===');
run('npm', ['run', 'apply:dictionary', '--', '--root', 'output/siman_099']);

console.log('\n=== validate ===');
run('node', ['pipeline/validate-siman-claude-aligned.mjs', '--siman', '99', '--fail-on', 'error']);
run('node', [
  'pipeline/validate-quality-yd001.mjs',
  '--root',
  'output/siman_099',
  '--min-severity',
  'error',
  '--fail-on',
  'error',
]);

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_099 editorial CLEAN (quality-gate reapply)\n`);
console.log('\n[DONE] siman_099 editorial reapply + quality gate');
