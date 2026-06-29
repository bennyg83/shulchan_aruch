#!/usr/bin/env node
/** Editorial cleanup — siman 098 kaf-hachayim */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-kaf-hachayim.mjs';

const n = patchFile('siman_098/kaf-hachayim/part-001.txt', 'kaf-hachayim', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/kaf-hachayim ${n} blocks editorial CLEAN\n`);
