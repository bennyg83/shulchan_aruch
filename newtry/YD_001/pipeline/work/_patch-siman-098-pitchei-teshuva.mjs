#!/usr/bin/env node
/** Editorial cleanup — siman 098 pitchei-teshuva */
import fs from 'fs';
import path from 'path';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';
import { T } from './_tr-098-pitchei-teshuva.mjs';

const n = patchFile('siman_098/pitchei-teshuva/part-001.txt', 'pitchei-teshuva', T);
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/pitchei-teshuva ${n} blocks editorial CLEAN\n`);
