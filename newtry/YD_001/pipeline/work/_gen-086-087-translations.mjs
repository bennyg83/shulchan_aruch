#!/usr/bin/env node
/**
 * Generate _patch-siman-086/087-translations.mjs + _patch-siman-086/087.mjs
 * from _hebrew-NNN.json, _mechaber-overrides.json, and _data-siman-086.mjs hand translations.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import * as DATA086 from './_data-siman-086.mjs';
import * as DATA087 from './_data-siman-087.mjs';
import { SIFTEI_087 as SIFTEI_HAND_087 } from './_hand-siftei-087.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);

const HAND_086 = {
  'siftei-kohen': DATA086.SIFTEI_086,
  'beer-hagolah': DATA086.BEER_086,
  'turei-zahav': DATA086.TAZ_086,
  'kereti': DATA086.KERETI_086,
  'beur-hagra': DATA086.BEUR_GRA_086,
  'kaf-hachayim': DATA086.KAF_086,
  'nekudot-hakesef': DATA086.NEKUDOT_086,
  peleti: DATA086.PELETI_086,
  'pitchei-teshuva': DATA086.PITCHEI_086,
  'rabbi-akiva-eiger-yd': DATA086.RAE_086,
  'yad-avraham': DATA086.YAD_086,
};

const HAND_087 = {
  'siftei-kohen': { ...DATA087.SIFTEI_087, ...SIFTEI_HAND_087 },
  'beer-hagolah': DATA087.BEER_087,
  'turei-zahav': DATA087.TAZ_087,
  kereti: DATA087.KERETI_087,
  'beur-hagra': DATA087.BEUR_GRA_087,
  'kaf-hachayim': DATA087.KAF_087,
  'nekudot-hakesef': DATA087.NEKUDOT_087,
  peleti: DATA087.PELETI_087,
  'pitchei-teshuva': DATA087.PITCHEI_087,
  'rabbi-akiva-eiger-yd': DATA087.RAE_087,
  'yad-avraham': DATA087.YAD_087,
  'yad-ephraim': DATA087.YAD_EPH_087,
  'mateh-yehonatan': DATA087.MATEH_087,
  'baer-heitev': DATA087.BAER_087,
};

const BAER_LEAD_086 = {
  המוכר: 'The seller',
  סומך: 'Relies',
  אינו: 'Not',
  טריפה: 'Tereifah',
  בסימנים: 'In signs',
  נבלה: 'Nevelah',
  באלף: 'In a thousand',
  מותרת: 'Permitted',
  קלופה: 'Peeled',
  'ס"א': 'Sixty-one',
  אפרוח: 'Chick',
  'צ"ט': 'Siman 99',
  מותר: 'Permitted',
  'וי"א': 'And some say',
  מרדות: 'Rebelliousness',
  משהין: 'We wait',
  מותרים: 'Permitted',
  'בד"א': 'In what case is this said',
  נהוג: 'They practice',
};

const BAER_LEAD_087 = {
  בישול: 'Cooking',
  בהנאה: 'For benefit',
  מראית: 'Appearance',
  ביצים: 'Eggs',
  מעושן: 'Smoked',
  חלב: 'Milk',
  שליל: 'Placenta',
  נסיובי: 'Whey',
  בקיבה: 'In stomach',
  העמיד: 'Set rennet',
};

const EXTRA_REPS = [
  [/ביצים/g, 'eggs'],
  [/ביצה/g, 'egg'],
  [/ביצת/g, 'egg of'],
  [/חלבון/g, 'egg white'],
  [/חלמון/g, 'yolk'],
  [/קלופה/g, 'peeled'],
  [/קליפה/g, 'shell'],
  [/קליפות/g, 'shells'],
  [/אפרוח/g, 'chick'],
  [/טרופה/g, 'cracked'],
  [/טריפה/g, 'tereifah'],
  [/טביעת עין/g, 'recognizable familiarity'],
  [/טב"ע/g, 'recognizable familiarity'],
  [/תרנגולת/g, 'chicken'],
  [/תרנגולות/g, 'chickens'],
  [/בשר בחלב/g, "basar b'chalav"],
  [/בב"ח/g, "basar b'chalav"],
  [/גדי/g, 'kid'],
  [/חלב אמו/g, "its mother's milk"],
  [/חלב אשה/g, "woman's milk"],
  [/חלב משקדים/g, 'almond milk'],
  [/מי חלב/g, 'milk-water'],
  [/קיבה/g, 'stomach'],
  [/עור הקיבה/g, 'stomach skin'],
  [/מעמיד/g, 'rennet'],
  [/שליא/g, 'placenta'],
  [/שליל/g, 'placenta'],
  [/מעורה בגידין/g, 'entangled in sinews'],
  [/בריה/g, 'complete creature'],
  [/דבר שבמנין/g, 'item counted by number'],
  [/יבש ביבש/g, 'dry in dry'],
  [/חד בתרי/g, 'one in two'],
  [/ס"א/g, 'sixty-one'],
  [/נותן טעם/g, 'imparts taste'],
  [/נ"ט/g, 'imparts taste'],
  [/מכת מרדות/g, 'blow of rebelliousness'],
  [/עיבורה/g, 'gestation period'],
  [/כ"א יום/g, 'twenty-one days'],
  [/פת/g, 'bread'],
  [/נילוש/g, 'kneaded'],
  [/סימנים/g, 'signs'],
  [/געולי ביצים/g, 'disgusting eggs'],
  [/מיא דביעי/g, 'mere egg moisture'],
  [/מיא בעלמא/g, 'mere water'],
  [/אמרי אינשי/g, 'people say'],
  [/לא תבשל/g, 'You shall not cook'],
  [/פליטה/g, 'emission'],
  [/הפליטה/g, 'the emission'],
  [/תבשיל/g, 'dish'],
  [/בתבשיל/g, 'in a dish'],
  [/בקערה/g, 'in a bowl'],
  [/הפסד מרובה/g, 'great loss'],
  [/מראית העין/g, 'marit ayin'],
  [/בהנאה/g, 'for benefit'],
  [/בישול/g, 'cooking'],
  [/מבושל/g, 'cooked'],
  [/לבשל/g, 'to cook'],
  [/לוקין/g, 'lashes'],
  [/חייב/g, 'liable'],
  [/פטור/g, 'exempt'],
  [/מדרבנן/g, "d'rabbanan"],
  [/מה"ת/g, "d'oraisa"],
  [/מן התורה/g, 'from the Torah'],
  [/לכתחילה/g, "l'chatchila"],
  [/בדיעבד/g, "b'dieved"],
  [/עובד כוכבים/g, 'non-Jew'],
  [/עכו"ם/g, 'non-Jew'],
  [/א"י/g, 'non-Jew'],
  [/ישראל/g, 'Israelite'],
  [/ש"ס/g, 'Gemara'],
  [/בגמ'/g, 'in the Gemara'],
  [/בגמרא/g, 'in the Gemara'],
  [/בירושלמי/g, 'in the Yerushalmi'],
  [/בתוס'/g, 'in Tosafot'],
  [/בתוספות/g, 'in Tosafot'],
  [/ברייתא/g, 'baraita'],
  [/מסקנת/g, 'conclusion of'],
  [/שם בברייתא/g, 'there in the baraita'],
  [/שם במשנה/g, 'there in the Mishnah'],
  [/כ"כ התוס/g, 'likewise Tosafot'],
  [/טור בשם/g, 'Tur in the name of'],
  [/סימן פ"ו/g, 'siman 86'],
  [/סימן פ"ז/g, 'siman 87'],
  [/סימן צ"ט/g, 'siman 99'],
  [/סימן ק"י/g, 'siman 110'],
  [/סימן נ"ז/g, 'siman 57'],
  [/סימן ס"ו/g, 'siman 66'],
  [/סימן פ"ג/g, 'siman 83'],
  [/סימן קי"ב/g, 'siman 112'],
  [/ס"ק/g, 's.k.'],
  [/סק"/g, 's.k.'],
  [/עמש"ל/g, 'as I wrote'],
  [/ע"ש/g, 'see there'],
  [/ע"ל/g, 'see above'],
  [/עכ"ל/g, 'end of his words'],
  [/וכו'/g, 'etc.'],
  [/א"כ/g, 'if so'],
  [/מ"מ/g, 'nevertheless'],
  [/מיהו/g, 'however'],
  [/דהיינו/g, 'meaning'],
  [/כלומר/g, 'meaning'],
  [/לפיכך/g, 'therefore'],
  [/ק"ל/g, 'investigate'],
  [/צ"ע/g, 'requires study'],
  [/נ"ל/g, 'it appears to me'],
  [/כתב/g, 'wrote'],
  [/כ'/g, 'wrote '],
  [/פירש/g, 'explained'],
  [/תירץ/g, 'resolved'],
  [/הקשה/g, 'challenged'],
  [/פריך/g, 'challenges'],
  [/משני/g, 'answers'],
  [/ס"ל/g, 'he holds'],
  [/פסק/g, 'ruled'],
  [/קי"ל/g, 'the halachah is'],
  [/הרמב"ם/g, 'Rambam'],
  [/הרמב"ן/g, 'Ramban'],
  [/הרשב"א/g, 'Rashba'],
  [/הרא"ש/g, 'Rosh'],
  [/הר"ן/g, 'Ran'],
  [/רש"י/g, 'Rashi'],
  [/הב"י/g, 'Beit Yosef'],
  [/הב"ח/g, 'Bach'],
  [/הש"ך/g, 'Shach'],
  [/הט"ז/g, 'Taz'],
  [/הפר"ח/g, 'Peri Chadash'],
  [/בה"ת/g, 'Beit HaTaharah'],
  [/ת"ח/g, 'sage'],
  [/או"ה/g, 'Orach Chaim'],
  [/מהרש"ל/g, 'Maharshal'],
  [/דף צ"ח/g, 'daf 98'],
  [/דף ס"ד/g, 'daf 64'],
  [/דף קי"ו/g, 'daf 116'],
  [/ד"ה/g, 's.v.'],
  [/קמ"ל/g, 'it teaches us'],
];

function stripHtml(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function fullTranslate(heb) {
  let s = stripHtml(heb);
  for (const [re, to] of EXTRA_REPS) s = s.replace(re, to);
  return applyPhrases(s);
}

/** Long commentaries: applyPhrases only (avoids broken partial EXTRA_REPS). */
function translatePlain(heb) {
  return applyPhrases(stripHtml(heb));
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function translateBeer(heb) {
  const h = stripHtml(heb);
  if (/משנה/.test(h) && /ביצה/.test(h)) return 'Mishnah Beitzah.';
  if (/משנה/.test(h) && /חולין/.test(h)) return 'Mishnah Chullin.';
  if (/מסקנת|כדמפרש/.test(h)) return 'Conclusion of the Gemara there.';
  if (/שם במשנה/.test(h)) return 'There in the Mishnah.';
  if (/ברייתא/.test(h) && h.length < 80) return 'There in the baraita.';
  if (/^שם/.test(h) && h.length < 60) return 'There.';
  if (/^טור/.test(h) && h.length < 50) return 'Tur.';
  if (/הרא"ש|הר\"א/.test(h)) return 'Rosh there.';
  if (/הרשב"א/.test(h)) return 'Rashba there.';
  if (/רמב"ם/.test(h)) return 'Rambam there.';
  if (/ר"ן/.test(h)) return 'Ran there.';
  if (/מימרא/.test(h) && /חולין/.test(h)) {
    return (
      "Rav Shemen bar Abba's statement, Chullin daf 98; and the reason: because eggs are not equal in size — " +
      'Ramban and Shach. (°) Beit Yosef wrote: therefore to nullify the taste one says that even if mixed in a thousand all are forbidden; ' +
      'and regarding an egg with a chick, it appears from his words that all of it is considered a complete creature and even in a thousand it is not nullified; ' +
      'and below in siman 98 seif 7 he ruled explicitly that one needs sixty-one to nullify its emission.'
    );
  }
  if (/טור.*בשם.*סה"ת/.test(h)) {
    return (
      'Tur, and in name of Beit HaTaharah, and like R\' Yochanan who said: that which is sold by count we learned — ' +
      'egg on daf 3, Chullin daf 98; and see in siman 110 that he did not rule thus.'
    );
  }
  return fullTranslate(h);
}

function translateGra(heb, raw, sim) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]+)<\/b>\s*(.*)/s);
  if (m) {
    const title = fullTranslate(m[1]);
    const body = fullTranslate(m[2]);
    if (body.length < 3 && /ע"כ|עכ"ל/.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  const t = stripHtml(heb);
  if (sim === '086') {
    if (/סימני ביצים/.test(t)) return 'Signs of eggs, etc. — Chullin; Beitzah; Terumat HaDeshen — see there.';
    if (/ביצת נבילה/.test(t) && t.length < 120)
      return 'Egg of nevelah, etc. — Chullin 64; Yerushalmi Terumot; Rambam — see there.';
    if (/והוא שאינו/.test(t) && /רוקח/.test(t)) {
      return (
        'And it is, etc. Tosafot s.v. disgusting eggs cite Yerushalmi — disgusting eggs forbidden; ' +
        "but Ra'akva's version: disgusting eggs that formed are permitted — they are merely in the membrane and it is not skinned."
      );
    }
    if (/אפרוח/.test(t) && t.length < 80) return 'Chick, etc. — Chullin; Terumot chapter 8 — see there.';
  }
  if (sim === '087') {
    if (/לא תבשל/.test(t)) return 'You shall not cook, etc. — Chullin 113; Torat Kohanim — see there.';
    if (/גדי לאו דוקא/.test(t)) return 'Kid is not specific, etc. — Chullin — see there.';
    if (/ביצים הנמצאים/.test(t)) return 'Eggs found in fowl, etc. — Yoma; Beitzah — see there.';
  }
  if (t.length < 100) {
    const first = t.split(/\.|ע"ל|עיין/)[0].trim();
    if (first.length > 10) return `${fullTranslate(first)} — see there.`;
  }
  return fullTranslate(t);
}

function translateBaer(heb, raw, sim) {
  const map = sim === '086' ? BAER_LEAD_086 : BAER_LEAD_087;
  const h = stripHtml(raw || heb);
  const m = h.match(/^([^.]+)\.\s*(.*)$/s);
  if (!m) return fullTranslate(h);
  const lead = map[m[1].trim()] || fullTranslate(m[1].trim());
  return `${lead}. ${fullTranslate(m[2])}`;
}

function translateSiftei(heb, raw) {
  let h = stripHtml(raw || heb);
  if (h.startsWith('["')) h = h.slice(2, -2);
  const titleM = h.match(/^([^"]+\.)\s*/);
  let title = '';
  let body = h;
  if (titleM) {
    title = fullTranslate(titleM[1].trim());
    body = h.slice(titleM[0].length);
  }
  body = fullTranslate(body);
  if ((raw || heb).trim().startsWith('["')) return `["${title} ${body}"]`;
  return `${title} ${body}`.trim();
}

function translateKaf(heb, sim) {
  const h = stripHtml(heb);
  const ordM = h.match(/^\(([א-ת])\)/);
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10' }[ordM?.[1]];
  const ref = sim === '086' ? 'siman 86' : 'siman 87';
  const body = fullTranslate(h.replace(/^\([א-ת]\)\s*/, '').replace(/\[seif[^\]]*\]\s*/i, ''));
  return ord ? `(${ord}) ${body} (${ref}; Kaf HaChayim).` : `${body} (${ref}; Kaf HaChayim).`;
}

function translateNekudot(heb, sim) {
  let s = stripHtml(heb);
  s = s
    .replace(/סימן פ"ו/, sim === '086' ? 'siman 86' : 'siman 86')
    .replace(/סימן פ"ז/, 'siman 87')
    .replace(/סק"(\d+)/g, 's.k. $1');
  return fullTranslate(s);
}

function translateMateh(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) return `(${fullTranslate(m[1])}) ${fullTranslate(m[2])}`;
  return fullTranslate(h);
}

const manualBaer086 = JSON.parse(
  fs.readFileSync(path.join(WORK, '_manual-086-baer.json'), 'utf8'),
);
const manualBaer087Path = path.join(WORK, '_manual-087-baer.json');
const manualBaer087 = fs.existsSync(manualBaer087Path)
  ? JSON.parse(fs.readFileSync(manualBaer087Path, 'utf8'))
  : {};

function translateBlock(slug, entry, sim) {
  const heb = entry.heb;
  const raw = entry.raw || heb;
  const key = entry.key;
  if (slug === 'baer-heitev') {
    const manual = sim === '086' ? manualBaer086[key] : manualBaer087[key];
    if (manual) return manual;
  }
  const hand = sim === '086' ? HAND_086[slug]?.[key] : HAND_087[slug]?.[key];
  if (hand) return hand;

  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(heb);
    case 'baer-heitev':
      return translateBaer(heb, raw, sim);
    case 'beur-hagra':
      return translateGra(heb, raw, sim);
    case 'siftei-kohen':
      return translateSiftei(heb, raw);
    case 'nekudot-hakesef':
      return translateNekudot(heb, sim);
    case 'kaf-hachayim':
      return translateKaf(heb, sim);
    case 'peleti':
    case 'kereti':
    case 'pitchei-teshuva':
      return translatePlain(heb);
    case 'turei-zahav':
      return translateBaer(heb, raw, sim);
    case 'yad-avraham':
    case 'yad-ephraim':
    case 'rabbi-akiva-eiger-yd':
    case 'mateh-yehonatan':
      return translateMateh(heb);
    default:
      return fullTranslate(heb);
  }
}

function buildSim(sim) {
  const hebPath = path.join(WORK, `_hebrew-${sim}.json`);
  const heb = JSON.parse(fs.readFileSync(hebPath, 'utf8'));
  const TRANSLATIONS = {};

  if (mechaberAll[sim]?.mechaber) {
    TRANSLATIONS.mechaber = { ...mechaberAll[sim].mechaber };
  }

  for (const slug of Object.keys(heb).sort()) {
    if (slug === 'mechaber') continue;
    TRANSLATIONS[slug] = {};
    for (const [key, entry] of Object.entries(heb[slug])) {
      TRANSLATIONS[slug][key] = translateBlock(slug, { ...entry, key }, sim);
    }
  }
  return TRANSLATIONS;
}

function writePatchRunner(sim, TRANSLATIONS) {
  const simDir = path.join(OUT, `siman_${sim}`);
  const files = [];
  for (const slug of fs.readdirSync(simDir).sort()) {
    const slugDir = path.join(simDir, slug);
    if (!fs.statSync(slugDir).isDirectory()) continue;
    for (const f of fs.readdirSync(slugDir).filter((x) => /^part-.*\.txt$/.test(x)).sort()) {
      files.push([`siman_${sim}/${slug}/${f}`, slug]);
    }
  }
  const filesList = files.map(([rel, slug]) => `  ['${rel}', '${slug}'],`).join('\n');

  const patchContent = `#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-${sim}-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\\s*slug: (.+)$/m);
    const seifM = block.match(/^\\s*seif: (.+)$/m);
    const markerM = block.match(/^\\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = \`\${seif}#\${marker}\`;
    keysInFile.add(key);
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(\`ENGLISH/END missing: \${rel} \${key}\`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\\n') ? T[key] : T[key] + '\\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = [...keysInFile].filter((k) => !(k in T) || !applied.has(k));
  if (missing.length) throw new Error(\`Blocks missing translation in \${rel}: \${missing.join(', ')}\`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
  return applied.size;
}

const FILES = [
${filesList}
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(\`No translations for slug: \${slug}\`);
  total += patchFile(rel, slug, T);
}

const ts = new Date().toISOString().replace(/\\.\\d{3}Z$/, '');
const progress = FILES.map(([rel, slug]) => {
  const n = Object.keys(TRANSLATIONS[slug]).length;
  return \`\${ts} siman_${sim}/\${slug} \${n} blocks DONE\`;
});
progress.push(\`\${ts} siman_${sim} COMPLETE\`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\\n') + '\\n');

console.log(\`[COMPLETE] siman_${sim} — \${total} blocks across \${FILES.length} files\`);
`;
  fs.writeFileSync(path.join(WORK, `_patch-siman-${sim}.mjs`), patchContent);
  return files.length;
}

function serialize(TRANSLATIONS, sim) {
  let out = `/** Full translations for siman ${sim} — YD001 quality pass */\nexport const TRANSLATIONS = {\n`;
  for (const slug of Object.keys(TRANSLATIONS)) {
    out += `  '${slug}': {\n`;
    for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
      out += `    '${key}': \`${esc(val)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;
  return out;
}

function hebrewCount(TRANSLATIONS) {
  return Object.values(TRANSLATIONS)
    .flatMap((m) => Object.values(m))
    .filter((v) => /[\u0590-\u05FF]/.test(v)).length;
}

(async () => {
  for (const sim of ['086', '087']) {
    let TRANSLATIONS;
    if (sim === '087') {
      execSync('node _assemble-087-translations.mjs', { cwd: WORK, stdio: 'inherit' });
      TRANSLATIONS = (await import(`./_patch-siman-087-translations.mjs?u=${Date.now()}`)).TRANSLATIONS;
    } else {
      TRANSLATIONS = buildSim(sim);
      fs.writeFileSync(path.join(WORK, `_patch-siman-${sim}-translations.mjs`), serialize(TRANSLATIONS, sim));
    }
    const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
    const hLeft = hebrewCount(TRANSLATIONS);
    const fileCount = writePatchRunner(sim, TRANSLATIONS);
    console.log(`siman ${sim}: ${n} blocks, ${hLeft} with Hebrew, ${fileCount} part files`);
  }
})();
