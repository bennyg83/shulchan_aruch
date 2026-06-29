#!/usr/bin/env node
/** gen → patch → validate → log for one siman */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const WORK = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
if (!siman) {
  console.error('Usage: node _apply-siman-editorial.mjs SIMAN');
  process.exit(1);
}

const pad = String(siman).padStart(3, '0');

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', shell: true });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    console.error(`[FAIL] ${label} exit ${r.status}`);
    return false;
  }
  return true;
}

// Step 1: generate modules
if (!run('node', [`pipeline/work/_gen-ribbit-editorial.mjs`, String(siman)], 'gen')) process.exit(1);

// Step 2: find modules
const mods = fs
  .readdirSync(WORK)
  .filter((f) => f.startsWith(`_tr-${siman}-`) && f.endsWith('.mjs'))
  .sort();
if (!mods.length) {
  console.error('No translation modules found');
  process.exit(1);
}

// Step 3: patch
const patchArgs = [`pipeline/work/_patch-siman-${siman}-editorial.mjs`, ...mods.map((m) => `pipeline/work/${m}`)];
if (!run('node', patchArgs, 'patch')) process.exit(1);

// Step 4: dictionary pass
run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${pad}`], 'dict');

// Step 5: validate
const q = spawnSync(
  'node',
  [`pipeline/validate-quality-yd001.mjs`, '--root', `output/siman_${pad}`, '--min-severity', 'error', '--fail-on', 'error'],
  { cwd: ROOT, encoding: 'utf8', shell: true },
);
const c = spawnSync('node', [`pipeline/validate-siman-claude-aligned.mjs`, '--siman', String(siman), '--fail-on', 'error'], {
  cwd: ROOT,
  encoding: 'utf8',
  shell: true,
});

const qOut = (q.stdout || '') + (q.stderr || '');
const cOut = (c.stdout || '') + (c.stderr || '');
process.stdout.write(qOut);
process.stdout.write(cOut);

const qFail = q.status !== 0;
const cFail = c.status !== 0;
const qMatch = qOut.match(/Fail-on error:\s*(\d+)/);
const errCount = qMatch ? Number(qMatch[1]) : qFail ? -1 : 0;

if (!qFail && !cFail) {
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_${pad} editorial CLEAN (quality-gate)\n`);
  console.log(`[CLEAN] siman_${pad} — ${mods.length} modules, ${failingCount()} blocks patched`);
  process.exit(0);
}

console.log(`[REMAINING] siman_${pad} quality errors: ${errCount >= 0 ? errCount : '?'}`);
process.exit(1);

function failingCount() {
  const p = path.join(WORK, `_failing-siman-${pad}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')).length : 0;
}
