#!/usr/bin/env node
/** Editorial cleanup — siman 098 nekudot-hakesef */
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-nekudot-hakesef.mjs';
import fs from 'fs';
import path from 'path';

const n = patchFile('siman_098/nekudot-hakesef/part-001.txt', 'nekudot-hakesef', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/nekudot-hakesef ${n} blocks editorial CLEAN\n`);
