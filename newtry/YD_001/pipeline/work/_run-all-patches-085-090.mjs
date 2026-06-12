#!/usr/bin/env node
/** Run completed patch scripts for simanim 085-090 */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const scripts = ['085', '088', '089', '090'];
for (const s of scripts) {
  const r = spawnSync('node', [`_patch-siman-${s}.mjs`], { cwd: WORK, stdio: 'inherit' });
  if (r.status) process.exit(r.status);
}
console.log('Full patches: 085, 088, 089, 090. Mechaber-only: 086, 087 — run _patch-mechaber-only.mjs');
