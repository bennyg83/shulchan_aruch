#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const sims = process.argv.slice(2).map(Number);
const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of sims) {
  const tag = String(sim).padStart(3, '0');
  const trans = `_mechaber-trans-${tag}.mjs`;
  console.log(`\n======== siman ${tag} ========`);
  run('node', ['pipeline/work/_apply-mechaber-siman.mjs', tag, trans]);
  run('npm', ['run', 'apply:dictionary', '--', `--root`, `output/siman_${tag}`]);
  run('npm', ['run', 'pipeline:validate', '--', `--root`, `output/siman_${tag}`]);
  run('node', [path.join('pipeline', 'work', '_log-siman.mjs'), String(sim)]);
}
console.log('\n[DONE] post list complete');
