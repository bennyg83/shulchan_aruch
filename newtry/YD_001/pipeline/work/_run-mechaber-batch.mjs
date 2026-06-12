#!/usr/bin/env node
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = process.argv.slice(2);
if (!simanim.length) {
  console.error('Usage: node _run-mechaber-batch.mjs 240 241 ...');
  process.exit(1);
}

const completed = [];
const failed = [];

for (const n of simanim) {
  const sim = String(n).padStart(3, '0');
  const transFile = `_mechaber-trans-${sim}.mjs`;
  const trans = path.join(WORK, transFile);
  if (!fs.existsSync(trans)) {
    failed.push({ siman: parseInt(sim, 10), error: `missing ${transFile}` });
    continue;
  }
  console.log(`\n=== siman ${sim} ===`);
  let r = spawnSync('node', ['_apply-mechaber-siman.mjs', sim, transFile], {
    cwd: WORK,
    stdio: 'inherit',
  });
  if (r.status !== 0) {
    failed.push({ siman: parseInt(sim, 10), error: 'apply failed' });
    continue;
  }
  r = spawnSync('node', ['_run-mechaber-post.mjs', sim], {
    cwd: WORK,
    stdio: 'inherit',
  });
  if (r.status !== 0) {
    failed.push({ siman: parseInt(sim, 10), error: 'post failed' });
    continue;
  }
  completed.push(parseInt(sim, 10));
}

console.log('\n=== BATCH SUMMARY ===');
console.log(JSON.stringify({ completed, failed }, null, 2));
