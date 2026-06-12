import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const WORK = path.dirname(fileURLToPath(import.meta.url));
for (let n = 282; n <= 291; n++) {
  const r = spawnSync('node', ['_run-slot3-mechaber-siman.mjs', String(n)], {
    cwd: WORK, stdio: 'inherit', shell: process.platform === 'win32',
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log('[COMPLETE] 282-291');
