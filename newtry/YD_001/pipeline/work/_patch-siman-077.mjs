#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync(process.execPath, [path.join(WORK, '_assemble-patch.mjs'), '077'], {
  stdio: 'inherit',
  cwd: WORK,
});
process.exit(r.status ?? 1);
