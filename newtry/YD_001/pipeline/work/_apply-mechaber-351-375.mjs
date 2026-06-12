#!/usr/bin/env node
/** Write overrides and run patch/validate/log for simanim 351-375 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { ALL } from './_mechaber-trans-351-375.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const ovDir = path.join(WORK, '_mechaber-overrides');

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const summary = [];
for (let s = 351; s <= 375; s++) {
  const tag = String(s);
  const blocks = ALL[tag];
  if (!blocks) {
    console.error(`Missing translations for siman ${tag}`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(ovDir, `${tag}.json`), JSON.stringify(blocks, null, 2) + '\n');
  const n = Object.keys(blocks).length;
  console.log(`\n========== siman ${tag} (${n} blocks) ==========`);
  run('node', [path.join('pipeline', 'work', '_patch-mechaber-siman.mjs'), tag]);
  run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${tag.padStart(3, '0')}`]);
  run('npm', ['run', 'pipeline:validate', '--', '--root', `output/siman_${tag.padStart(3, '0')}`]);
  const q = spawnSync(
    'npm',
    ['run', 'pipeline:validate:quality', '--', '--root', 'output', '--siman', String(s)],
    { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' }
  );
  process.stdout.write(q.stdout || '');
  process.stderr.write(q.stderr || '');
  const qOk = (q.status ?? 1) === 0;
  run('node', [path.join('pipeline', 'work', '_log-siman.mjs'), String(s)]);
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} siman_${tag.padStart(3, '0')} mechaber quality-pass ${n} blocks DONE\n`
  );
  summary.push({ siman: s, blocks: n, qualityOk: qOk });
}

console.log('\n=== SUMMARY 351-375 ===');
for (const row of summary) {
  console.log(
    `siman ${row.siman}: ${row.blocks} blocks, quality=${row.qualityOk ? 'OK' : 'FLAGS'}`
  );
}
const failed = summary.filter((r) => !r.qualityOk);
process.exit(failed.length ? 1 : 0);
