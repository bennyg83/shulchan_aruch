#!/usr/bin/env node
/** apply:dictionary + validate + _log-siman for one siman after mechaber patch */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = parseInt(process.argv[2], 10);
const tag = String(sim).padStart(3, '0');
const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log(`\n=== siman ${tag}: patch mechaber ===`);
run('node', [path.join('pipeline', 'work', '_patch-mechaber-siman.mjs'), tag]);

console.log(`=== siman ${tag}: apply:dictionary ===`);
run('npm', ['run', 'apply:dictionary', '--', `--root`, `output/siman_${tag}`]);

console.log(`=== siman ${tag}: pipeline:validate ===`);
run('npm', ['run', 'pipeline:validate', '--', `--root`, `output/siman_${tag}`]);

console.log(`=== siman ${tag}: _log-siman ===`);
run('node', [path.join('pipeline', 'work', '_log-siman.mjs'), String(sim)]);

console.log(`[DONE] siman ${tag} mechaber quality pass`);
