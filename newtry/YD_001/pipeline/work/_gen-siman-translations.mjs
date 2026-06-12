#!/usr/bin/env node
/**
 * Generate _patch-siman-NNN-translations.mjs from _hebrew-NNN.json
 * Optional full overrides in _overrides-NNN.json; mechaber from _mechaber-overrides.json if present.
 * Usage: node _gen-siman-translations.mjs 096
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases, translateBaer095 } from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _gen-siman-translations.mjs SIMAN (e.g. 096)');
  process.exit(1);
}

const mechaberAll = fs.existsSync(path.join(WORK, '_mechaber-overrides.json'))
  ? JSON.parse(fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'))
  : {};
const ovPath = path.join(WORK, `_overrides-${sim}.json`);
const overrides = fs.existsSync(ovPath) ? JSON.parse(fs.readFileSync(ovPath, 'utf8')) : {};
const manualJsonPath = path.join(WORK, `_manual-${sim}.json`);
const manualPath = path.join(WORK, `_manual-${sim}.mjs`);
let MANUAL = {};
if (fs.existsSync(manualJsonPath)) {
  MANUAL = JSON.parse(fs.readFileSync(manualJsonPath, 'utf8'));
} else if (fs.existsSync(manualPath)) {
  MANUAL = (await import(`./_manual-${sim}.mjs`)).MANUAL;
}

const SIM_GEM = {
  '096': 'צ"ו',
  '097': 'צ"ז',
  '098': 'צ"ח',
  '099': 'צ"ט',
  '100': "ק'",
  '101': "ק\"א",
  '102': "ק\"ב",
  '103': "ק\"ג",
  '104': "ק\"ד",
  '105': "ק\"ה",
  '106': "ק\"ו",
  '107': "ק\"ז",
  '108': "ק\"ח",
  '109': "ק\"ט",
  '110': "ק\"י",
  '111': "קי\"א",
  '112': "קי\"ב",
  '113': "קי\"ג",
  '114': "קי\"ד",
  '115': "קט\"ו",
  '116': "קט\"ז",
  '119': "קי\"ט",
  '120': "ק\"ך",
};
const simNum = parseInt(sim, 10);
const simRef = `siman ${simNum}`;

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function translateMechaber(raw) {
  let s = String(raw || '');
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => `{Rama: ${applyPhrases(stripHtml(g))}}`);
  s = s.replace(/<small>([\s\S]*?)<\/small>/gi, (_, g) => {
    const t = stripHtml(g).replace(/^הגה\s*/, '');
    return `{Rama: ${applyPhrases(t)}}`;
  });
  return applyPhrases(stripHtml(s));
}

function translateBeer(heb) {
  const h = stripHtml(heb);
  if (/^משנ' ובריית' עבודת כוכבי'/.test(h)) return 'Mishnah and baraita — Avodah Zarah daf 75.';
  if (/^כדמפרש רב נחמן/.test(h)) return 'As Rav Nachman explains there.';
  if (/^כדמפרש רב יוחנן/.test(h)) return 'As Rav Yochanan explains there.';
  if (/^מימרא דרב אשי/.test(h)) return "Rav Ashi's statement there.";
  if (/^מימר' דרב נחמן/.test(h)) return "Rav Nachman's statement there, daf 75.";
  if (/^ממימרא דמר בר רב אשי/.test(h)) return "Mar bar Rav Ashi's statement there, daf 75.";
  if (/^שם כדתני בר קפרא במי נדה/.test(h))
    return 'There, as bar Kappara taught regarding mei niddah — meaning that the niddah immerses in them; and even though a revi\'it suffices d\'oraisa for immersing needles and tubes, that is immersion of tumah, but tevilat kelim is a novel decree and requires forty se\'ah — Tosafot there.';
  if (/^משנ' מקואות סוף פ"ח/.test(h)) return 'Mishnah Mikvaot end of chapter 8, and according to the first Tanna.';
  if (/^טור וכ"כ המרדכי בשם רשב"ם/.test(h)) return 'Tur, and likewise Mordechai in the name of Rashbam.';
  if (/^סמ"ק/.test(h) && h.length < 10) return 'Semak.';
  if (/^מרדכי פ"ק דחולין/.test(h)) return 'Mordechai, first chapter of Chullin.';
  if (/^תו' שם בעבודת כוכבים/.test(h)) return 'Tosafot there in Avodah Zarah daf 75, and Rosh there.';
  if (/^טור בשם ספר המצות בכאן/.test(h))
    return 'Tur in the name of Sefer HaMitzvot — here the Mechaber rules plainly that immersion and a blessing are required, unlike the view of those who are stringent to immerse without a blessing that the Tur brought, and unlike what he wrote in his book that Beit Yosef ruled to immerse this and what is mentioned in seif 6 without a blessing.';
  if (/^תוס' שם וכ"כ הרא"ש/.test(h)) return 'Tosafot there, and likewise Rosh there in the name of Rashbam.';
  if (/^הגהות אשיר"י שם/.test(h)) return 'Hagahot Ashiri there.';
  if (/^מסקנת/.test(h)) return 'Conclusion of the Gemara there, as Rashi explains there.';
  if (/^ברייתא פסחים/.test(h)) return 'Baraita Pesachim daf 30; and Rif and Rosh brought it in chapter 8 of Chullin.';
  if (/^ברייתא/.test(h) && /חולין/.test(h)) return 'Baraita; and Rif and Rosh in chapter 8 of Chullin.';
  if (/^כפירוש הרמב"ם/.test(h))
    return 'As Rambam explains in chapter 8 of Forbidden Foods, and Rashba in Teshuvot HaRosh, and Rif.';
  if (/^שם בברייתא/.test(h) && /גמרא/.test(h)) return 'There in the baraita, as explained there in the Gemara.';
  if (/^שם בברייתא/.test(h)) return 'There in the baraita.';
  if (/^טור בשם/.test(h) && /סה"ת/.test(h))
    return 'Tur in the name of Sefer HaTerumah (and most poskim).';
  if (/^טור בשם/.test(h)) return 'Tur in the name of Rashba in Teshuvot HaRosh in the name of the Geonim and in the name of Rabbeinu Tam as Rav.';
  if (/^כ"כ התוס/.test(h))
    return 'Likewise Tosafot there, and Hagahot Ashiri in the last chapter of Avodah Zarah, and Mordechai, and Hagahot Maimoniyot chapter 15 of Forbidden Foods.';
  if (/^מימרא/.test(h)) return "Chizkiyah's statement — Chullin daf 111.";
  if (/^שם בפי' רש"י/.test(h))
    return "There in Rashi's explanation — and even though we hold that taste of permitted in permitted is permitted, because of its sharpness it absorbs more than hot fish, and through pressure of the knife the knife emits and the radish absorbs.";
  if (/^סה"ת/.test(h)) return 'Sefer HaTerumah; and Rashba in the name of Raavad; and Semag; and Raah.';
  if (/^התוס' שם/.test(h))
    return 'Tosafot there left it requiring study; and likewise Tur in the name of Sefer HaTerumah (and Semag and Or Zarua and all other Acharonim).';
  if (/^הרמב"ם/.test(h)) return 'Rambam and Rashba in Torat HaBayit.';
  if (/^תשובות/.test(h)) return 'Responsa of Rashba.';
  if (/^שם/.test(h) && h.length < 50) return 'There.';
  return translateBaer095(heb);
}

function translateGra(heb, raw) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]+)<\/b>\s*([\s\S]*)/);
  if (m) {
    const title = applyPhrases(stripHtml(m[1]));
    const body = applyPhrases(stripHtml(m[2]));
    if (body.length < 3 && /ע"כ|עכ"ל/.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  const plain = stripHtml(heb);
  if (/^\(ליקוט\)/.test(plain)) {
    return applyPhrases(plain.replace(/^\(ליקוט\)\s*/, '(Lekut) '));
  }
  return applyPhrases(plain);
}

function translateBaer(heb, raw) {
  return translateBaer095(stripHtml(raw || heb));
}

function translateTaz(heb, raw) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]*)<\/b>\s*([\s\S]*)/);
  if (m) {
    const title = applyPhrases(stripHtml(m[1]));
    let body = applyPhrases(stripHtml(m[2]));
    body = body.replace(/\{Rama:\s*/g, '{Rama: ').replace(/<small>\s*הגה\s*/g, '{Rama: ');
    if (body.length < 5 && /עכ"ל|ע"ש/.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  return applyPhrases(stripHtml(heb));
}

function translateSiftei(heb, raw) {
  let h = stripHtml(raw || heb);
  if (h.startsWith('["')) h = h.slice(2, -2);
  const titleM = h.match(/^([^.]+\.)\s*/);
  let title = '';
  let body = h;
  if (titleM) {
    title = applyPhrases(titleM[1].trim());
    body = h.slice(titleM[0].length);
  }
  body = applyPhrases(body);
  if ((raw || heb).trim().startsWith('["')) return `["${title} ${body}"]`;
  return `${title} ${body}`.trim();
}

function translateKaf(heb) {
  const h = stripHtml(heb);
  const ordM = h.match(/^\(([א-ת])\)/);
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10' }[ordM?.[1]];
  const prefix = ord ? `(${ord}) ` : '';
  return prefix + applyPhrases(h.replace(/^\([א-ת]\)\s*/, ''));
}

function translateNekudot(heb) {
  let s = stripHtml(heb);
  const gem = SIM_GEM[sim];
  if (gem) s = s.replace(new RegExp(`סימן ${gem.replace(/"/g, '\\"')}`), simRef);
  s = s.replace(/סק"(\d+)/g, 's.k. $1');
  s = s.replace(/ס"ק (\d+)/g, 's.k. $1');
  s = s.replace(/עיין/g, 'see');
  s = s.replace(/בש"ך/g, 'in Shach');
  s = s.replace(/בט"ז/g, 'in Taz');
  s = s.replace(/צ"ע/g, 'requires study');
  s = s.replace(/ק"ל/g, 'investigate');
  return applyPhrases(s);
}

function translateMateh(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*([\s\S]*)/);
  if (m) {
    const head = applyPhrases(m[1].replace(/סימן [^,)]+/, simRef));
    const body = applyPhrases(m[2]);
    return `(${head}) ${body}`;
  }
  return applyPhrases(h);
}

function translateRae(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*([\s\S]*)/);
  if (m) return `(${applyPhrases(m[1])}) ${applyPhrases(m[2])}`;
  return applyPhrases(h);
}

function translateBlock(slug, entry) {
  const heb = entry.heb;
  const raw = entry.raw || heb;
  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(heb);
    case 'beur-hagra':
      return translateGra(heb, raw);
    case 'baer-heitev':
      return translateBaer(heb, raw);
    case 'siftei-kohen':
      return translateSiftei(heb, raw);
    case 'kaf-hachayim':
      return translateKaf(heb);
    case 'nekudot-hakesef':
      return translateNekudot(heb);
    case 'mateh-yehonatan':
      return translateMateh(heb);
    case 'rabbi-akiva-eiger-yd':
      return translateRae(heb);
    case 'pitchei-teshuva':
    case 'turei-zahav':
      return translateTaz(heb, raw);
    case 'yad-avraham':
    case 'yad-ephraim':
      return translateMateh(heb);
    case 'kereti':
    case 'peleti':
      return applyPhrases(stripHtml(heb));
    case 'mechaber':
      return translateMechaber(raw);
    default:
      return applyPhrases(stripHtml(heb));
  }
}

const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const TRANSLATIONS = {};

for (const slug of Object.keys(heb).sort()) {
  TRANSLATIONS[slug] = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    TRANSLATIONS[slug][key] =
      MANUAL[slug]?.[key] ??
      overrides[slug]?.[key] ??
      mechaberAll[sim]?.[slug]?.[key] ??
      translateBlock(slug, entry);
  }
}

let out = `/** YD001 quality-pass translations siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

export { translateBlock, stripHtml, esc, simRef, translateBeer, translateGra, translateBaer, translateSiftei };

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
  fs.writeFileSync(outPath, out);
  const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
  const hebLeft = Object.values(TRANSLATIONS)
    .flatMap((m) => Object.values(m))
    .filter((v) => /[\u0590-\u05FF]{3,}/.test(v)).length;
  console.log(`Wrote ${outPath} — ${n} blocks, ${hebLeft} with substantial Hebrew remaining`);
}
