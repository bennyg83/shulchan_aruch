#!/usr/bin/env node
/** Write _patch-siman-NNN-translations.mjs from a plain JS data module */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const sim = process.argv[2];
const dataPath = process.argv[3] || path.join(path.dirname(fileURLToPath(import.meta.url)), `_data-${sim}.mjs`);
const { TRANSLATIONS } = await import(pathToFileURL(dataPath).href);
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), `_patch-siman-${sim}-translations.mjs`);
fs.writeFileSync(out, `/** Siman ${sim} translations */\nexport const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS, null, 2)};\n`);
let n = 0;
for (const s of Object.values(TRANSLATIONS)) n += Object.keys(s).length;
console.log(`wrote ${out} (${n} blocks)`);
