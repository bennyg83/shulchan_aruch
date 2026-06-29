#!/usr/bin/env node
/** Editorial cleanup — siman 098 rabbi-akiva-eiger-yd */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-rabbi-akiva-eiger-yd.mjs';

const n = patchFile('siman_098/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/rabbi-akiva-eiger-yd ${n} blocks editorial CLEAN\n`);
