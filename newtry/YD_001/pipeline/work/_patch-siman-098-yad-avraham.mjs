#!/usr/bin/env node
/** Editorial cleanup — siman 098 yad-avraham */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-yad-avraham.mjs';

const n = patchFile('siman_098/yad-avraham/part-001.txt', 'yad-avraham', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/yad-avraham ${n} blocks editorial CLEAN\n`);
