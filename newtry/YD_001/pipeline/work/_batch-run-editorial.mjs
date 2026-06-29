#!/usr/bin/env node
/** Run build+patch+dictionary+validate for simanim with _tr-data-NNN.mjs */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(WORK, '..');
const simanim = process.argv.slice(2).map(Number).filter(Boolean);

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8', shell: process.platform === 'win32' });
  return { status: r.status ?? 1, out: (r.stdout || '') + (r.stderr || '') };
}

const results = [];
for (const n of simanim) {
  const data = `_tr-data-${n}.mjs`;
  if (!fs.existsSync(path.join(WORK, data))) {
    results.push({ n, blocks: 0, status: 'NO_DATA' });
    continue;
  }
  let r = run('node', ['pipeline/work/_build-editorial-modules.mjs', String(n), `./${data}`]);
  if (r.status !== 0) {
    results.push({ n, blocks: 0, status: 'BUILD_FAIL', detail: r.out.slice(-200) });
    continue;
  }
  const mods = fs.readdirSync(WORK).filter((f) => f.startsWith(`_tr-${n}-`) && f.endsWith('.mjs') && !f.includes('data'));
  r = run('node', [`pipeline/work/_patch-siman-${n}-editorial.mjs`, ...mods]);
  const m = r.out.match(/\[DONE\] (\d+) blocks/);
  const blocks = m ? Number(m[1]) : 0;
  if (r.status !== 0) {
    results.push({ n, blocks, status: 'PATCH_FAIL' });
    continue;
  }
  run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${String(n).padStart(3, '0')}`]);
  r = run('node', ['pipeline/validate-quality-yd001.mjs', '--root', `output/siman_${String(n).padStart(3, '0')}`, '--min-severity', 'error', '--fail-on', 'error']);
  const q = r.status === 0 ? 'PASS' : 'QUAL_FAIL';
  r = run('node', ['pipeline/validate-siman-claude-aligned.mjs', '--siman', String(n), '--fail-on', 'error']);
  const first = (r.out || '').split('\n')[0] || '';
  const pass = r.status === 0;
  if (pass) {
    const logLine = `${new Date().toISOString().slice(0, 19)} siman_${String(n).padStart(3, '0')} editorial CLEAN (quality-gate)\n`;
    fs.appendFileSync(path.join(ROOT, 'progress.log'), logLine);
  }
  results.push({ n, blocks, status: pass ? 'PASS' : 'FAIL', detail: first });
}

console.log('| siman | blocks | status |');
console.log('|-------|--------|--------|');
for (const { n, blocks, status, detail } of results) {
  console.log(`| ${n} | ${blocks} | ${status}${detail && status !== 'PASS' ? ' — ' + detail.slice(0, 60) : ''} |`);
}
