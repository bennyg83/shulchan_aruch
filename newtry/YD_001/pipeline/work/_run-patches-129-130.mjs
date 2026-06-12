#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
 
const here = path.dirname(fileURLToPath(import.meta.url));
 
function run(script) {
  const res = spawnSync(process.execPath, [path.join(here, script)], {
    stdio: 'inherit',
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}
 
run('_patch-siman-129.mjs');
run('_patch-siman-130.mjs');

