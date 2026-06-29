#!/usr/bin/env node
/** Editorial cleanup — siman 098 (orchestrates per-commentary patches; never _patch-siman-098-translations.mjs) */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');

/** Canonical order; translations live inline or in _tr-098-*.mjs per slug patch file */
const PATCHES = [
  '_patch-siman-098-baer-heitev.mjs',
  '_patch-siman-098-beer-hagolah.mjs',
  '_patch-siman-098-beur-hagra.mjs',
  '_patch-siman-098-kaf-hachayim.mjs',
  '_patch-siman-098-kereti.mjs',
  '_patch-siman-098-mateh-yehonatan.mjs',
  '_patch-siman-098-nekudot-hakesef.mjs',
  '_patch-siman-098-peleti.mjs',
  '_patch-siman-098-pitchei-teshuva.mjs',
  '_patch-siman-098-rabbi-akiva-eiger-yd.mjs',
  '_patch-siman-098-siftei-kohen.mjs',
  '_patch-siman-098-turei-zahav.mjs',
  '_patch-siman-098-yad-avraham.mjs',
  '_patch-siman-098-yad-ephraim.mjs',
];

let total = 0;
const bySlug = {};

for (const p of PATCHES) {
  const r = spawnSync('node', [path.join(WORK, p)], { cwd: ROOT, encoding: 'utf8' });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    console.error(`[FAIL] ${p} exited ${r.status}`);
    process.exit(r.status ?? 1);
  }
  const m = r.stdout.match(/\[DONE\] siman_098\/(\S+) — (\d+) blocks/);
  if (m) {
    bySlug[m[1]] = (bySlug[m[1]] || 0) + Number(m[2]);
    total += Number(m[2]);
  } else {
    const ok = [...r.stdout.matchAll(/OK siman_098\/([^/]+)\/part-\d+\.txt \((\d+) blocks\)/g)];
    for (const [, slug, n] of ok) {
      bySlug[slug] = (bySlug[slug] || 0) + Number(n);
      total += Number(n);
    }
  }
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
for (const [slug, n] of Object.entries(bySlug)) {
  if (n) fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/${slug} ${n} blocks editorial CLEAN\n`);
}
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098 editorial CLEAN (quality-gate)\n`);
console.log(`[DONE] siman_098 editorial — ${total} blocks`);
