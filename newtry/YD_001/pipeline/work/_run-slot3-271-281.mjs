import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
for (let n = 271; n <= 281; n++) {
  const r = spawnSync('node', ['_run-slot3-mechaber-siman.mjs', String(n)], {
    cwd: WORK,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log('[COMPLETE] simanim 271-281 mechaber');
