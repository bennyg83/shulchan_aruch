#!/usr/bin/env node
/** Patch mechaber + validate + log for explicit siman list */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { ALL } from './_mechaber-trans-351-375.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const ovDir = path.join(WORK, '_mechaber-overrides');

const simanim = (process.argv[2] || '')
  .split(/[,\s]+/)
  .map((x) => parseInt(x, 10))
  .filter((n) => n > 0);

if (!simanim.length) {
  console.error('Usage: node _apply-mechaber-batch.mjs 351,353,...');
  process.exit(2);
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: opts.stdio ?? 'inherit',
    shell: process.platform === 'win32',
    encoding: opts.encoding,
  });
  if ((r.status ?? 1) !== 0 && !opts.allowFail) process.exit(r.status ?? 1);
  return r;
}

function loadBlocks(sim) {
  const tag = String(sim);
  if (ALL[tag]) return ALL[tag];
  const ovFile = path.join(WORK, `_overrides-mechaber-${tag}.json`);
  if (fs.existsSync(ovFile)) return JSON.parse(fs.readFileSync(ovFile, 'utf8'));
  throw new Error(`No translations for siman ${tag}`);
}

fs.mkdirSync(ovDir, { recursive: true });

const summary = [];
for (const sim of simanim) {
  const tag = String(sim).padStart(3, '0');
  const blocks = loadBlocks(sim);
  fs.writeFileSync(path.join(ovDir, `${tag}.json`), JSON.stringify(blocks, null, 2) + '\n');
  const n = Object.keys(blocks).length;
  console.log(`\n========== siman ${tag} (${n} blocks) ==========`);
  run('node', [path.join('pipeline', 'work', '_patch-mechaber-siman.mjs'), tag]);
  run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${tag}`]);
  run('npm', ['run', 'pipeline:validate', '--', '--root', `output/siman_${tag}`]);
  const q = run(
    'npm',
    ['run', 'pipeline:validate:quality', '--', '--root', 'output', '--siman', String(sim)],
    { stdio: 'pipe', encoding: 'utf8', allowFail: true }
  );
  if (q.stdout) process.stdout.write(q.stdout);
  if (q.stderr) process.stderr.write(q.stderr);
  const qOk = (q.status ?? 1) === 0;
  run('node', [path.join('pipeline', 'work', '_log-siman.mjs'), String(sim)]);
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} siman_${tag} mechaber quality-pass ${n} blocks DONE\n`
  );
  summary.push({ siman: sim, blocks: n, validateOk: true, qualityOk: qOk });
}

console.log('\n=== BATCH SUMMARY ===');
let totalBlocks = 0;
for (const row of summary) {
  totalBlocks += row.blocks;
  console.log(
    `siman ${row.siman}: ${row.blocks} blocks, quality=${row.qualityOk ? 'OK' : 'FLAGS'}`
  );
}
console.log(`Total: ${summary.length} simanim, ${totalBlocks} mechaber blocks`);
const failed = summary.filter((r) => !r.qualityOk);
process.exit(failed.length ? 1 : 0);
