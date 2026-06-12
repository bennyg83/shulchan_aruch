#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
for (let s = 376; s <= 403; s++) {
  const r = spawnSync('node', ['_extract-siman-hebrew.mjs', String(s)], {
    cwd: WORK,
    stdio: 'inherit',
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log('Extracted simanim 376-403');
