#!/usr/bin/env node
/** Generate, apply, validate, log mechaber quality pass for simanim 376-403 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const FROM = parseInt(process.argv[2] || '376', 10);
const TO = parseInt(process.argv[3] || '403', 10);
const completed = [];
const failed = [];

function runNode(args) {
  const r = spawnSync('node', args, { cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32' });
  return r.status === 0;
}

for (let n = FROM; n <= TO; n++) {
  const tag = String(n).padStart(3, '0');
  const ov = path.join(WORK, `_overrides-mechaber-${tag}.json`);
  if (!fs.existsSync(ov)) {
    failed.push({ siman: n, error: `missing ${path.basename(ov)}` });
    continue;
  }
  console.log(`\n========== siman ${tag} ==========`);
  if (!runNode(['_gen-mechaber-from-overrides.mjs', tag])) {
    failed.push({ siman: n, error: 'gen failed' });
    continue;
  }
  if (!runNode(['_apply-mechaber-siman.mjs', tag, `_mechaber-trans-${tag}.mjs`])) {
    failed.push({ siman: n, error: 'apply failed' });
    continue;
  }
  if (!runNode(['_run-mechaber-post.mjs', tag])) {
    failed.push({ siman: n, error: 'post failed' });
    continue;
  }
  completed.push(n);
}

console.log('\n=== SUMMARY ===');
console.log(JSON.stringify({ completed, failed, blocks: completed.length }, null, 2));
process.exit(failed.length ? 1 : 0);
