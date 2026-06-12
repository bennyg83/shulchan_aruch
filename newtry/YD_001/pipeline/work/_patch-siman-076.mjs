#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));

// Ensure translations JSON exists
const gen = spawnSync(process.execPath, [path.join(WORK, '_gen-076-json.mjs')], {
  stdio: 'inherit',
  cwd: WORK,
});
if (gen.status !== 0) process.exit(gen.status ?? 1);

const r = spawnSync(process.execPath, [path.join(WORK, '_assemble-patch.mjs'), '076'], {
  stdio: 'inherit',
  cwd: WORK,
});
process.exit(r.status ?? 1);
