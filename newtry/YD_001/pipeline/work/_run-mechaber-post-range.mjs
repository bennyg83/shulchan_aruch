#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const from = parseInt(process.argv[2] ?? '326', 10);
const to = parseInt(process.argv[3] ?? '350', 10);
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

const results = [];
for (let sim = from; sim <= to; sim++) {
  const tag = String(sim).padStart(3, '0');
  const trans = path.join(WORK, `_mechaber-trans-${tag}.mjs`);
  try {
    run('node', [path.join('pipeline', 'work', '_apply-mechaber-siman.mjs'), tag, trans]);
    run('npm', ['run', 'apply:dictionary', '--', `--root`, `output/siman_${tag}`]);
    run('npm', ['run', 'pipeline:validate', '--', `--root`, `output/siman_${tag}`]);
    run('node', [path.join('pipeline', 'work', '_log-siman.mjs'), String(sim)]);
    results.push({ sim, ok: true });
  } catch (e) {
    results.push({ sim, ok: false, err: String(e) });
  }
}
console.log(JSON.stringify(results, null, 2));
