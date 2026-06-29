#!/usr/bin/env node
/** Generate _tr-data-SIMAN.mjs from inline translations object */
import fs from 'fs';
const siman = process.argv[2];
const mod = await import(`./_tr-data-src-${siman}.mjs`);
const out = `/** Editorial translations for siman ${siman} */\nexport const TRANSLATIONS = ${JSON.stringify(mod.TRANSLATIONS, null, 2)};\n`;
fs.writeFileSync(`_tr-data-${siman}.mjs`, out);
console.log('wrote', `_tr-data-${siman}.mjs`);
