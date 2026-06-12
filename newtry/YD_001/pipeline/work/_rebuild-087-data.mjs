#!/usr/bin/env node
/** Rebuild _data-siman-087.mjs with EXTRA_087 phrase pass + manual overrides */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_087 } from './_draft-087.mjs';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { SIFTEI_087 as SIFTEI_HAND } from './_hand-siftei-087.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);

function loadManual(slugFile) {
  const p = path.join(WORK, slugFile);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}
const manualBySlug = {
  'baer-heitev': loadManual('_manual-087-baer.json'),
  kereti: loadManual('_manual-087-kereti.json'),
  'beur-hagra': loadManual('_manual-087-gra.json'),
  'turei-zahav': loadManual('_manual-087-taz.json'),
  peleti: loadManual('_manual-087-peleti.json'),
  'nekudot-hakesef': loadManual('_manual-087-nekudot.json'),
  'kaf-hachayim': loadManual('_manual-087-kaf.json'),
  'mateh-yehonatan': loadManual('_manual-087-mateh.json'),
  'yad-avraham': loadManual('_manual-087-yad.json'),
  'yad-ephraim': loadManual('_manual-087-yad.json'),
  'rabbi-akiva-eiger-yd': loadManual('_manual-087-rae.json'),
  'pitchei-teshuva': loadManual('_manual-087-pitchei.json'),
};

function strip(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function deepTr(h, passes = 18) {
  let s = strip(h);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA_087) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  return s;
}

function translateSiftei(h) {
  const inner = strip(h).replace(/^\[\"|\"\]$/g, '').trim();
  const m = inner.match(/^(.+?)\.\s*(.*)$/s);
  if (!m) return `["${deepTr(inner)}"]`;
  const title = deepTr(m[1].replace(/^<b>|<\/b>/g, '').trim());
  const body = deepTr(m[2].trim());
  return `["${title}. ${body}"]`;
}

function translateBeer(h) {
  const t = strip(h);
  if (/ברייתא.*חולין/.test(t)) return 'Baraita Chullin daf 115.';
  if (/טור והרשב"א/.test(t)) return 'Tur and Rashba in Torat HaBayit.';
  if (/משנה וגמ/.test(t)) return 'Mishnah and Gemara there daf 113.';
  if (/^שם במשנה/.test(t)) return 'There in the Mishnah.';
  if (/כר"ע/.test(t))
    return "There — R' Akiva; Rosh in name of Rif and Rambam chapter 9 Forbidden Foods (and so Beit HaGefen, Tur, Rashi, Bertinoro, Geonim, Ramban, Rashba, Ran, Rabbenu Yerucham, Tzeda LaDerech, Kol Bo, Raavad, Yereim 148, Hagahot Rabbi Akiva Eiger, Semag, Semak).";
  if (/אוקימתא/.test(t)) return 'As Rav Ashi establishes there daf 104.';
  if (/ב"א/.test(t)) return 'Bach in a responsum.';
  if (/ברייתא ביצה/.test(t)) return 'Baraita Beitzah daf 7 and first tanna.';
  if (/הרשב"א בת"ה/.test(t))
    return 'Rashba in Torat HaBayit; Rabbenu Yerucham path 14 end.';
  if (/א"ח בשם/.test(t)) return 'Orach Chaim in name of Mahar Yehonatan.';
  if (/טור בשם הרמב"ם/.test(t))
    return 'Tur in name of Rambam there — unresolved in Yerushalmi Nedarim.';
  return deepTr(t);
}

function translateKaf(h) {
  const n = h.match(/^\(([א-ת]+)\)/)?.[1];
  const ord = {
    א: '1',
    ב: '2',
    ג: '3',
    ד: '4',
    ה: '5',
    ו: '6',
    ז: '7',
    ח: '8',
    ט: '9',
    י: '10',
    יא: '11',
  }[n] || '';
  const body = deepTr(strip(h).replace(/^\([א-ת]+\)\s*/, '').replace(/\[seif[^\]]*\]\s*/i, ''));
  return ord ? `(${ord}) ${body} (siman 87; Kaf HaChayim).` : `${body} (siman 87; Kaf HaChayim).`;
}

function translateMateh(h) {
  const t = strip(h);
  const m = t.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) return `(${deepTr(m[1])}) ${deepTr(m[2])}`;
  return `(siman 87) ${deepTr(t.replace(/^\(סימן[^)]+\)\s*/, ''))}`;
}

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
  for (const [key, { heb: h, raw }] of Object.entries(blocks)) {
    let tr;
    if (manualBySlug[slug]?.[key]) tr = manualBySlug[slug][key];
    else if (slug === 'siftei-kohen' && SIFTEI_HAND[key]) tr = SIFTEI_HAND[key];
    else if (slug === 'beer-hagolah') tr = translateBeer(h);
    else if (slug === 'siftei-kohen') tr = translateSiftei(h);
    else if (slug === 'kaf-hachayim') tr = translateKaf(h);
    else if (slug === 'mateh-yehonatan' || slug === 'yad-avraham' || slug === 'yad-ephraim')
      tr = translateMateh(h);
    else if (slug === 'rabbi-akiva-eiger-yd') tr = translateMateh(h);
    else tr = deepTr(raw || h);
    out[name][key] = tr;
    if (/[\u0590-\u05FF]/.test(tr)) hebLeft++;
  }
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
let mjs = `/** Siman 087 — _rebuild-087-data.mjs */\n`;
for (const [name, blocks] of Object.entries(out)) {
  mjs += `export const ${name} = {\n`;
  for (const [k, v] of Object.entries(blocks)) mjs += `  '${k}': \`${esc(v)}\`,\n`;
  mjs += `};\n\n`;
}
fs.writeFileSync(path.join(WORK, '_data-siman-087.mjs'), mjs);
console.log('wrote _data-siman-087.mjs, hebrew remaining:', hebLeft);
