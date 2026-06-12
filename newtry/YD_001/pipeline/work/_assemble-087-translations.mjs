#!/usr/bin/env node
/**
 * Assemble _patch-siman-087-translations.mjs from hand sources + mechaber overrides.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SIFTEI_087 } from './_hand-siftei-087.mjs';
import { BEER_087 } from './_data-siman-087.mjs';
import { PELETI_087 as PELETI_BASE } from './_hand-peleti-087.mjs';
import {
  KERETI_087,
  TAZ_087,
  BEUR_GRA_087,
  KAF_087,
  NEKUDOT_087,
  MATEH_087,
  YAD_087,
  YAD_EPH_087,
  RAE_087,
  PITCHEI_087,
} from './_hand-commentary-087.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);
function loadManual(file) {
  const p = path.join(WORK, file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}

const manualBaer = loadManual('_manual-087-baer.json');
const manualMateh = loadManual('_manual-087-mateh.json');
const manualYad = loadManual('_manual-087-yad.json');
const manualYadEph = loadManual('_manual-087-yad-eph.json');
const manualRae = loadManual('_manual-087-rae.json');
const manualPitchei = loadManual('_manual-087-pitchei.json');
const manualPeleti = loadManual('_manual-087-peleti.json');

function mergeHand(base, manual) {
  if (!manual || !Object.keys(manual).length) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(manual)) {
    if (!v || /[\u0590-\u05FF]/.test(v)) continue;
    if (v.length < 120 && /see Mechaber|see Peleti|Tur and poskim/i.test(v)) continue;
    out[k] = v;
  }
  return out;
}

const HAND = {
  'siftei-kohen': SIFTEI_087,
  'beer-hagolah': BEER_087,
  'baer-heitev': manualBaer,
  kereti: KERETI_087,
  peleti: mergeHand(PELETI_BASE, manualPeleti),
  'turei-zahav': TAZ_087,
  'beur-hagra': BEUR_GRA_087,
  'kaf-hachayim': KAF_087,
  'nekudot-hakesef': NEKUDOT_087,
  'mateh-yehonatan': mergeHand(MATEH_087, manualMateh),
  'yad-avraham': mergeHand(YAD_087, manualYad),
  'yad-ephraim': mergeHand(YAD_EPH_087, manualYadEph),
  'rabbi-akiva-eiger-yd': mergeHand(RAE_087, manualRae),
  'pitchei-teshuva': mergeHand(PITCHEI_087, manualPitchei),
};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const TRANSLATIONS = { mechaber: { ...mechaberAll['087'].mechaber } };
let hebLeft = 0;
let total = 0;

for (const [slug, map] of Object.entries(HAND)) {
  TRANSLATIONS[slug] = map;
  for (const v of Object.values(map)) {
    total++;
    if (/[\u0590-\u05FF]/.test(v)) hebLeft++;
  }
}

let out = `/** Full translations for siman 087 — YD001 quality pass */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS).sort()) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync(path.join(WORK, '_patch-siman-087-translations.mjs'), out);
console.log(`assembled siman 087: ${total} blocks, ${hebLeft} with Hebrew`);
