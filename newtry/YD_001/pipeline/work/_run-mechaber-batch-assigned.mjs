#!/usr/bin/env node
/** Apply mechaber quality pass for assigned simanim list */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');

const simanim = (process.argv[2] || '333,334,335,338,339,340,344,345,376,377,379,392,393,394,399')
  .split(/[,\s]+/)
  .map((x) => parseInt(x, 10))
  .filter((n) => n > 0);

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: opts.cwd ?? ROOT,
    stdio: opts.stdio ?? 'inherit',
    shell: process.platform === 'win32',
    encoding: opts.encoding,
  });
  if ((r.status ?? 1) !== 0 && !opts.allowFail) process.exit(r.status ?? 1);
  return r;
}

function blockCount(sim) {
  const dir = path.join(ROOT, 'output', `siman_${String(sim).padStart(3, '0')}`, 'mechaber');
  let n = 0;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.txt'))) {
    n += fs.readFileSync(path.join(dir, f), 'utf8').split('**** YD001 SOURCE BLOCK ****').length - 1;
  }
  return n;
}

const summary = [];
for (const sim of simanim) {
  const tag = String(sim).padStart(3, '0');
  console.log(`\n========== siman ${tag} ==========`);
  const transPath = path.join(WORK, `_mechaber-trans-${tag}.mjs`);
  const hebPath = path.join(WORK, `_hebrew-${tag}.json`);
  const ovPath = path.join(WORK, `_overrides-mechaber-${tag}.json`);

  if (!fs.existsSync(transPath) && fs.existsSync(hebPath)) {
    run('node', [path.join('pipeline', 'work', '_gen-mechaber-trans.mjs'), tag]);
  } else if (!fs.existsSync(transPath) && fs.existsSync(ovPath)) {
    run('node', [path.join('pipeline', 'work', '_extract-siman-hebrew.mjs'), String(sim)]);
    run('node', [path.join('pipeline', 'work', '_gen-mechaber-trans.mjs'), tag]);
  }

  if (!fs.existsSync(transPath)) {
    summary.push({ siman: sim, error: `missing ${path.basename(transPath)}` });
    continue;
  }

  run('node', [
    path.join('pipeline', 'work', '_apply-mechaber-siman.mjs'),
    tag,
    `_mechaber-trans-${tag}.mjs`,
  ]);
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
  const n = blockCount(sim);
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} siman_${tag} mechaber quality-pass ${n} blocks DONE\n`
  );
  summary.push({ siman: sim, blocks: n, qualityOk: qOk });
}

console.log('\n=== BATCH SUMMARY ===');
let total = 0;
for (const row of summary) {
  if (row.error) {
    console.log(`siman ${row.siman}: ERROR ${row.error}`);
    continue;
  }
  total += row.blocks;
  console.log(`siman ${row.siman}: ${row.blocks} blocks, quality=${row.qualityOk ? 'OK' : 'FLAGS'}`);
}
console.log(`Total: ${summary.filter((r) => !r.error).length} simanim, ${total} blocks`);
process.exit(summary.some((r) => r.error || r.qualityOk === false) ? 1 : 0);
