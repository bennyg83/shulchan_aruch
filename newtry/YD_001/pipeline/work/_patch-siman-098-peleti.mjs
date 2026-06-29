#!/usr/bin/env node
/** Editorial cleanup — siman 098 peleti */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-peleti.mjs';

let n = patchFile('siman_098/peleti/part-001.txt', 'peleti', T);
n += patchFile('siman_098/peleti/part-002.txt', 'peleti', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/peleti ${n} blocks editorial CLEAN\n`);
