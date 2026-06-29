#!/usr/bin/env node
/** FULL REDO apply — simanim 300-325 (existing output folders only) */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const SIMANIM = [];

for (let n = 300; n <= 325; n++) {
  const pad = String(n).padStart(3, '0');
  if (fs.existsSync(path.join(ROOT, 'output', `siman_${pad}`))) SIMANIM.push(n);
}

const TR_MODULES = SIMANIM.map((n) => `_tr-${String(n).padStart(3, '0')}-siftei-kohen.mjs`);

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error(`[FAIL] ${label}`);
    process.exit(r.status ?? 1);
  }
}

const bySiman = {};
let total = 0;

for (const modName of TR_MODULES) {
  const modPath = path.join(WORK, modName);
  if (!fs.existsSync(modPath)) {
    console.error(`Missing module: ${modName}`);
    process.exit(1);
  }
  const mod = await import(pathToFileURL(modPath).href);
  const m = modName.match(/_tr-(\d+)-/);
  const siman = Number(m[1]);
  let n = 0;
  for (const [rel, slug] of mod.FILES) {
    n += patchFile(rel, slug, mod.TRANSLATIONS);
  }
  bySiman[siman] = n;
  total += n;
  console.log(`[PATCH] siman_${String(siman).padStart(3, '0')}: ${n} blocks`);
}

const dictScript = path.join(ROOT, 'apply_dictionary_yd001.mjs');
if (fs.existsSync(dictScript)) {
  console.log('\n=== apply:dictionary ===');
  for (const siman of SIMANIM) {
    const pad = String(siman).padStart(3, '0');
    run('npm', ['run', 'apply:dictionary', '--', '--root', `output/siman_${pad}`], `dict ${pad}`);
  }
} else {
  console.log('\n[SKIP] apply:dictionary — apply_dictionary_yd001.mjs not found');
}

console.log('\n=== validate ===');
const results = {};
for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, '0');
  console.log(`\n--- validate siman ${siman} ---`);
  const q = spawnSync(
    'node',
    ['pipeline/validate-quality-yd001.mjs', '--root', `output/siman_${pad}`, '--min-severity', 'error', '--fail-on', 'error'],
    { cwd: ROOT, stdio: 'pipe', encoding: 'utf8', shell: process.platform === 'win32' },
  );
  const c = spawnSync('node', ['pipeline/validate-siman-claude-aligned.mjs', '--siman', String(siman), '--fail-on', 'error'], {
    cwd: ROOT,
    stdio: 'pipe',
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  const qOut = (q.stdout || '') + (q.stderr || '');
  const cOut = (c.stdout || '') + (c.stderr || '');
  if (qOut.trim()) process.stdout.write(qOut);
  if (cOut.trim()) process.stdout.write(cOut);
  const ok = q.status === 0 && c.status === 0;
  results[siman] = { ok, q: q.status, c: c.status };
  console.log(ok ? `[CLEAN] siman_${pad}` : `[REMAINING] siman_${pad} quality=${q.status} claude=${c.status}`);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, '0');
  const n = bySiman[siman] || 0;
  const tag = results[siman]?.ok ? 'editorial CLEAN (quality-gate)' : 'editorial REDO applied';
  fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_${pad}/${n} blocks siftei-kohen ${tag}\n`);
}

console.log('\n=== BLOCKS PATCHED PER SIMAN ===');
for (const siman of SIMANIM) {
  console.log(`siman_${String(siman).padStart(3, '0')}: ${bySiman[siman]} blocks`);
}
console.log(`TOTAL: ${total} blocks across ${SIMANIM.length} simanim`);
console.log('[DONE] _patch-siman-300-325-apply.mjs');
