#!/usr/bin/env node
/** Editorial cleanup — siman 099 peleti */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-099-peleti.mjs';

const n = patchFile('siman_099/peleti/part-001.txt', 'peleti', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_099/peleti ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_099/peleti — ${n} blocks`);
