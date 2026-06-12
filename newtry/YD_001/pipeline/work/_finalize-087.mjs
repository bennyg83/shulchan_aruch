#!/usr/bin/env node
/** Triple phrase-pass + merge hand maps → _data-siman-087.mjs */
import fs from 'fs';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { SIFTEI_087 as SIFTEI_HAND } from './_hand-siftei-087.mjs';
import { EXTRA_087 } from './_draft-087.mjs';

const heb = JSON.parse(fs.readFileSync('_hebrew-087.json', 'utf8'));
const EXTRA = EXTRA_087;

function strip(h) {
  return h.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').trim();
}

function deepFt(h, passes = 8) {
  let s = strip(h);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  return s;
}

function translateSiftei(h) {
  const inner = strip(h).replace(/^\[\"|\"\]$/g, '').trim();
  const m = inner.match(/^(.+?)\.\s*(.*)$/s);
  if (!m) return `["${deepFt(inner)}"]`;
  const title = deepFt(m[1].replace(/^<b>|<\/b>/g, '').trim());
  const body = deepFt(m[2].trim());
  return `["${title}. ${body}"]`;
}

const HAND = { 'siftei-kohen': SIFTEI_HAND };

const EXPORT = {
  'siftei-kohen': 'SIFTEI_087',
  'beer-hagolah': 'BEER_087',
  'turei-zahav': 'TAZ_087',
  kereti: 'KERETI_087',
  'beur-hagra': 'BEUR_GRA_087',
  'kaf-hachayim': 'KAF_087',
  'nekudot-hakesef': 'NEKUDOT_087',
  peleti: 'PELETI_087',
  'pitchei-teshuva': 'PITCHEI_087',
  'rabbi-akiva-eiger-yd': 'RAE_087',
  'yad-avraham': 'YAD_087',
  'yad-ephraim': 'YAD_EPH_087',
  'mateh-yehonatan': 'MATEH_087',
  'baer-heitev': 'BAER_087',
};

const out = {};
let hebLeft = 0;
for (const [slug, blocks] of Object.entries(heb)) {
  if (slug === 'mechaber') continue;
  const name = EXPORT[slug];
  out[name] = {};
  for (const [key, { heb: h }] of Object.entries(blocks)) {
    let tr;
    if (HAND[slug]?.[key]) tr = HAND[slug][key];
    else if (slug === 'beer-hagolah') {
      const t = strip(h);
      if (/ברייתא.*חולין/.test(t)) tr = 'Baraita Chullin daf 115.';
      else if (/טור והרשב"א/.test(t)) tr = 'Tur and Rashba in Torat HaBayit.';
      else if (/משנה וגמ/.test(t)) tr = 'Mishnah and Gemara there daf 113.';
      else if (/^שם במשנה/.test(t)) tr = 'There in the Mishnah.';
      else if (/כר"ע/.test(t)) tr = 'There — R\' Akiva, Rosh in name of Rif and Rambam chapter 9 Forbidden Foods (and so Beit HaGefen, Tur, Rashi, Bertinoro, Geonim, Ramban, Rashba, Ran, Rabbenu Yerucham, Tzeda LaDerech, Kol Bo, Raavad, Yereim 148, Hagahot Rabbi Akiva Eiger, Semag, Semak).';
      else if (/אוקימתא/.test(t)) tr = 'As Rav Ashi establishes there daf 104.';
      else if (/ב"א/.test(t)) tr = 'Bach in a responsum.';
      else if (/ברייתא ביצה/.test(t)) tr = 'Baraita Beitzah daf 7 and first tanna.';
      else if (/הרשב"א בת"ה/.test(t)) tr = 'Rashba in Torat HaBayit; Rabbenu Yerucham path 14 end.';
      else if (/א"ח בשם/.test(t)) tr = 'Orach Chaim in name of Mahar Yehonatan.';
      else if (/טור בשם הרמב"ם/.test(t)) tr = 'Tur in name of Rambam there — unresolved in Yerushalmi Nedarim.';
      else tr = deepFt(h);
    } else if (slug === 'siftei-kohen') tr = translateSiftei(h);
    else if (slug === 'beur-hagra') {
      const t = strip(h);
      const lead = t.split(/\.|ע"ל/)[0];
      tr = t.length < 150 ? `${deepFt(lead)} — see there.` : deepFt(t);
    } else if (slug === 'kaf-hachayim') {
      const n = h.match(/^\(([א-ת]+)\)/)?.[1];
      const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10', יא: '11' }[n] || '';
      tr = `(${ord}) ${deepFt(strip(h).replace(/^\([א-ת]+\)\s*/, ''))} (siman 87; Kaf HaChayim).`;
    } else if (slug === 'mateh-yehonatan' || slug === 'yad-avraham')
      tr = `(siman 87) ${deepFt(strip(h).replace(/^\(סימן[^)]+\)\s*/, ''))}`;
    else tr = deepFt(h);
    out[name][key] = tr;
    if (/[\u0590-\u05FF]/.test(tr)) hebLeft++;
  }
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
let mjs = `/** Siman 087 — _finalize-087.mjs */\n`;
for (const [name, blocks] of Object.entries(out)) {
  mjs += `export const ${name} = {\n`;
  for (const [k, v] of Object.entries(blocks)) mjs += `  '${k}': \`${esc(v)}\`,\n`;
  mjs += `};\n\n`;
}
fs.writeFileSync('_data-siman-087.mjs', mjs);
console.log('hebrew remaining:', hebLeft);
