#!/usr/bin/env node
/** After siman 100 patch: log progress, update slot1 ownership with scope finish line */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const WORK = path.dirname(fileURLToPath(import.meta.url));
spawnSync('node', ['_log-siman.mjs', '100'], { cwd: WORK, stdio: 'inherit' });

const ownershipPath = path.join(WORK, 'slot1-yd-simanim-1-100-OWNERSHIP.json');
const own = JSON.parse(fs.readFileSync(ownershipPath, 'utf8'));
own.scopeComplete = true;
own.finishLine = 'SLOT 1 COMPLETE — YD simanim 1–100 (12278 blocks)';
own.nextPointer = null;
own.stats.blocksCompleted = own.stats.blocksTotalInScope;
own.stats.lastUpdated = new Date().toISOString();
own.notes =
  'Scope 1–100 finished. Resume editorial English from Hebrew only for simanim 101+ in a new slot assignment.';
fs.writeFileSync(ownershipPath, JSON.stringify(own, null, 2) + '\n');
console.log(own.finishLine);
