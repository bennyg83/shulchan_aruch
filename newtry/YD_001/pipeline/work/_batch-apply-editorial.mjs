#!/usr/bin/env node
/** Build modules, patch, dictionary, validate one siman. Usage: node _batch-apply-editorial.mjs NNN */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const siman = Number(process.argv[2]);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const WORK = path.dirname(fileURLToPath(import.meta.url));
const pad = String(siman).padStart(3, '0');

if (!siman) {
  console.error('Usage: node _batch-apply-editorial.mjs NNN');
  process.exit(1);
}

const dataFile = path.join(WORK, `_tr-data-${siman}.mjs`);
if (!fs.existsSync(dataFile)) {
  console.error(`Missing ${dataFile}`);
  process.exit(1);
}

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error(`[FAIL] ${label}`);
    return false;
  }
  return true;
}

if (!run('node', ['pipeline/work/_build-editorial-modules.mjs', String(siman), `./_tr-data-${siman}.mjs`], 'build')) process.exit(1);

const mods = fs.readdirSync(WORK).filter((f) => f.startsWith(`_tr-${siman}-`) && f.endsWith('.mjs') && !f.includes('data')).sort();
if (!run('node', [`pipeline/work/_patch-siman-${siman}-editorial.mjs`, ...mods], 'patch')) process.exit(1);
run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${pad}`], 'dict');

const q = spawnSync('node', ['pipeline/validate-quality-yd001.mjs', '--root', `output/siman_${pad}`, '--min-severity', 'error', '--fail-on', 'error'], { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' });
const c = spawnSync('node', ['pipeline/validate-siman-claude-aligned.mjs', '--siman', String(siman), '--fail-on', 'error'], { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' });
process.stdout.write(q.stdout || q.stderr || '');
process.stdout.write(c.stdout || c.stderr || '');

if (q.status === 0 && c.status === 0) {
  const ts = new Date().toISOString().slice(0, 19);
  fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_${pad} editorial CLEAN (quality-gate)\n`);
  const failing = JSON.parse(fs.readFileSync(path.join(WORK, `_failing-siman-${pad}.json`), 'utf8'));
  console.log(`[PASS] siman_${pad} — ${failing.length} blocks patched`);
  process.exit(0);
}
console.log(`[FAIL] siman_${pad}`);
process.exit(1);
