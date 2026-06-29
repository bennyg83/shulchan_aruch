#!/usr/bin/env node
/** Build, patch, dictionary, validate one siman. Usage: node _run-editorial-siman.mjs NNN */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const siman = Number(process.argv[2]);
const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(WORK, '..');
if (!siman) {
  console.error('Usage: node _run-editorial-siman.mjs NNN');
  process.exit(1);
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const dataFile = `_tr-data-${siman}.mjs`;
if (!fs.existsSync(path.join(WORK, dataFile))) {
  console.error(`Missing ${dataFile}`);
  process.exit(1);
}

run('node', ['pipeline/work/_build-editorial-modules.mjs', String(siman), `./${dataFile}`]);
const mods = fs.readdirSync(WORK).filter((f) => f.startsWith(`_tr-${siman}-`) && f.endsWith('.mjs') && !f.includes('data'));
run('node', [`pipeline/work/_patch-siman-${siman}-editorial.mjs`, ...mods]);
run('npm', ['run', 'apply:dictionary', '--', `--root`, `output/siman_${String(siman).padStart(3, '0')}`]);
const v = spawnSync('node', ['pipeline/validate-siman-claude-aligned.mjs', '--siman', String(siman), '--fail-on', 'error'], {
  cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32',
});
console.log(v.stdout || v.stderr);
if (v.status !== 0) process.exit(v.status);

const logLine = `${new Date().toISOString().slice(0, 19)} siman_${String(siman).padStart(3, '0')} editorial CLEAN (quality-gate)\n`;
fs.appendFileSync(path.join(ROOT, 'progress.log'), logLine);
console.log(`[LOG] ${logLine.trim()}`);
