#!/usr/bin/env node
/** npm validate + log after mechaber patch */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _run-mechaber-post.mjs SIMAN');
  process.exit(1);
}

const YD = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: YD, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${sim}`]);
run('npm', ['run', 'pipeline:validate', '--', '--root', `output/siman_${sim}`]);
run('node', ['pipeline/work/_log-siman.mjs', String(parseInt(sim, 10))]);
console.log(`[POST] siman ${sim} done`);
