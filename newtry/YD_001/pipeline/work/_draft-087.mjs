#!/usr/bin/env node
/** Draft siman 087 translations via phrase pass + hand maps; output _data-siman-087.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { SIFTEI_087 as SIFTEI_HAND } from './_hand-siftei-087.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));

function loadJson(name) {
  const p = path.join(WORK, name);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}
const MANUAL = {
  'baer-heitev': loadJson('_manual-087-baer.json'),
  kereti: loadJson('_manual-087-kereti.json'),
  'beur-hagra': loadJson('_manual-087-gra.json'),
  'turei-zahav': loadJson('_manual-087-taz.json'),
  'nekudot-hakesef': loadJson('_manual-087-nekudot.json'),
  'kaf-hachayim': loadJson('_manual-087-kaf.json'),
  'siftei-kohen': SIFTEI_HAND,
};

export const EXTRA_087 = [
  [/בשר בחלב/g, "basar b'chalav"],
  [/בשר עוף בחלב/g, "fowl meat in milk"],
  [/בשר בהמה בחלב/g, "domestic animal meat in milk"],
  [/בשר עוף/g, 'fowl meat'],
  [/בשר בהמה/g, 'domestic animal meat'],
  [/בשר טהורה/g, 'pure meat'],
  [/בשר טמאה/g, 'impure meat'],
  [/חלב טהורה/g, 'pure milk'],
  [/חלב טמאה/g, 'impure milk'],
  [/חלב אמו/g, "its mother's milk"],
  [/חלב מתה/g, "milk of a dead animal"],
  [/חלב שחוטה/g, 'milk of slaughtered animal'],
  [/חלב זכר/g, "male milk"],
  [/מי חלב/g, 'milk-water'],
  [/נסיובי דחלבא/g, 'whey of milk'],
  [/חלב משקדים/g, 'almond milk'],
  [/לא תבשל/g, 'You shall not cook'],
  [/גדי/g, 'kid'],
  [/מראית העין/g, 'marit ayin'],
  [/הנאה/g, 'benefit'],
  [/בישול/g, 'cooking'],
  [/מבושל/g, 'cooked'],
  [/המבשל/g, 'one who cooks'],
  [/מעושן/g, 'smoked'],
  [/כבוש/g, 'pickled'],
  [/מליח/g, 'salting'],
  [/מלוח/g, 'salted'],
  [/שליא/g, 'placenta'],
  [/שליל/g, 'placenta'],
  [/קיבה/g, 'stomach'],
  [/עור הקיבה/g, 'stomach skin'],
  [/מעמיד/g, 'rennet'],
  [/המעמיד/g, 'one who sets rennet'],
  [/צלול/g, 'clear'],
  [/קרושה/g, 'dried'],
  [/חמי טבריה/g, 'Tiberias hot springs'],
  [/לוקין/g, 'lashes'],
  [/חייב/g, 'liable'],
  [/פטור/g, 'exempt'],
  [/דאורייתא/g, "d'oraisa"],
  [/דרבנן/g, "d'rabbanan"],
  [/מן התורה/g, 'from the Torah'],
  [/מה"ת/g, "d'oraisa"],
  [/מדרבנן/g, "d'rabbanan"],
  [/לכתחילה/g, "l'chatchila"],
  [/בדיעבד/g, "b'dieved"],
  [/סימן פ"ז/g, 'siman 87'],
  [/סי' פ"ז/g, 'siman 87'],
  [/סק"/g, 's.k. '],
  [/ס"ק/g, 's.k.'],
  [/פ"ט/g, 'chapter 9'],
  [/פכ"ה/g, 'chapter 25'],
  [/דף קט"ו/g, 'daf 115'],
  [/דף קי"ג/g, 'daf 113'],
  [/דף קי"ד/g, 'daf 114'],
  [/דף ק"ד/g, 'daf 104'],
  [/דף קי"ו/g, 'daf 116'],
  [/דף צ"ז/g, 'daf 97'],
  [/דף ע"ו/g, 'daf 76'],
  [/ב"ח/g, 'Bach'],
  [/ש"ך/g, 'Shach'],
  [/ט"ז/g, 'Taz'],
  [/ב"י/g, 'Beit Yosef'],
  [/רמב"ם/g, 'Rambam'],
  [/רשב"א/g, 'Rashba'],
  [/רא"ש/g, 'Rosh'],
  [/ר"ן/g, 'Ran'],
  [/רמב"ן/g, 'Ramban'],
  [/מהרש"ל/g, 'Maharshal'],
  [/או"ח/g, 'Orach Chaim'],
  [/פר"ח/g, 'Peri Chadash'],
  [/עש"ך/g, 'Avodat HaTaharah'],
  [/ת"ח/g, 'sage'],
  [/כלל מ"ב/g, 'general rule 42'],
  [/כלל ל'/g, 'general rule 40'],
  [/כלל ס"ב/g, 'general rule 62'],
  [/הג"מ/g, 'Maggid Mishneh'],
  [/הג"א/g, 'Hagahot Rabbi Akiva Eiger'],
  [/הג"ה ש"ד/g, 'hagahah ShaDa'],
  [/בה"ג/g, 'Beit HaGefen'],
  [/בה"ת/g, 'Beit HaTaharah'],
  [/סמ"ג/g, 'Semag'],
  [/סמ"ק/g, 'Semak'],
  [/סמ"ג/g, 'Semag'],
  [/תוס'/g, 'Tosafot'],
  [/תוספות/g, 'Tosafot'],
  [/בגמ'/g, 'in the Gemara'],
  [/בגמרא/g, 'in the Gemara'],
  [/בירושלמי/g, 'in the Yerushalmi'],
  [/בברייתא/g, 'in the baraita'],
  [/ברייתא/g, 'baraita'],
  [/משנה/g, 'Mishnah'],
  [/גמ'/g, 'Gemara'],
  [/גמרא/g, 'Gemara'],
  [/קמ"ל/g, 'it teaches us'],
  [/עכ"ל/g, 'end of his words'],
  [/ע"ש/g, 'see there'],
  [/ע"ל/g, 'see above'],
  [/וכו'/g, 'etc.'],
  [/וכו/g, 'etc.'],
  [/מיהו/g, 'however'],
  [/מ"מ/g, 'nevertheless'],
  [/א"כ/g, 'if so'],
  [/נ"ל/g, 'it appears to me'],
  [/צ"ע/g, 'requires study'],
  [/ק"ל/g, 'investigate'],
  [/כלומר/g, 'meaning'],
  [/דהיינו/g, 'namely'],
  [/חתיכה נעשית נבילה/g, 'piece becomes nevelah'],
  [/חתיכה הראויה להתכבד/g, 'piece fit to honor guests'],
  [/זה וזה גורם/g, 'this-and-this causes'],
  [/דבר האסור בעצמו/g, 'forbidden item in itself'],
  [/נט"י/g, 'netilat yadayim'],
  [/נטילת ידים/g, 'netilat yadayim'],
  [/קינוח/g, 'cleansing the palate'],
  [/תני אגרא/g, 'tanna of the wage'],
  [/אפיקורן/g, 'dessert course'],
  [/בל תוסיף/g, 'bal tosif'],
  [/העלאה/g, 'raising'],
  [/לחתות/g, 'to stoke'],
  [/המחתה/g, 'stoking'],
  [/בית החורף/g, 'winter-house'],
  [/מהרי"ו/g, 'Mahari Weil'],
  [/מהרי"ל/g, 'Maharil'],
  [/מהרש"א/g, 'Maharsha'],
  [/ר"ת/g, "Rabbenu Tam"],
  [/ר"נ/g, 'Ran'],
  [/רש"י/g, 'Rashi'],
  [/רי"ף/g, 'Rif'],
  [/ריטב"א/g, 'Ritva'],
  [/רי"ו/g, "R' Yehudah"],
  [/רא"ה/g, 'Raavad'],
  [/רא"ם/g, 'Raavad of Mezhirov'],
  [/ר"י/g, "R' Yitzchak"],
  [/ר"ע/g, "R' Akiva"],
  [/אב"א/g, 'one says'],
  [/אב"א/g, 'Abaye'],
  [/רב אשי/g, 'Rav Ashi'],
  [/שמואל/g, 'Shmuel'],
  [/רב חסדא/g, 'Rav Chisda'],
  [/רב יוסף/g, 'Rav Yosef'],
  [/ר"א/g, "R' Ami"],
  [/ר"א/g, "R' Asi"],
  [/ד"ה/g, 's.v.'],
  [/בד"ה/g, 's.v.'],
  [/סד"ה/g, 's.v.'],
  [/פ"א/g, 'first chapter'],
  [/פ"ו/g, 'chapter 6'],
  [/פ"ז/g, 'chapter 7'],
  [/פ"ג/g, 'chapter 3'],
  [/פ"ב/g, 'chapter 2'],
  [/פ"ק/g, 'first chapter'],
  [/נתיב י"ד/g, 'path 14'],
  [/ש"פ/g, 'end'],
  [/ת"ה/g, 'Torat HaBayit'],
  [/בת"ה/g, 'in Torat HaBayit'],
  [/בתשובה/g, 'in a responsum'],
  [/ב"א/g, 'Bach'],
  [/כת"ק/g, 'first tanna'],
  [/כר"ע/g, "R' Akiva"],
  [/כמש"ל/g, 'as I wrote'],
  [/כמ"ש/g, 'as written'],
  [/כמו ש/g, 'as'],
  [/כדמפרש/g, 'as explained'],
  [/כדמוכח/g, 'as is clear'],
  [/כדאיתא/g, 'as stated'],
  [/כדתניא/g, 'as taught in baraita'],
  [/כתב/g, 'wrote'],
  [/כתבו/g, 'wrote'],
  [/פירש/g, 'explained'],
  [/פירשו/g, 'they explained'],
  [/פסק/g, 'ruled'],
  [/פסקו/g, 'ruled'],
  [/הלכה/g, 'the halachah'],
  [/קי"ל/g, 'the halachah is'],
  [/ס"ל/g, 'he holds'],
  [/סובר/g, 'holds'],
  [/תירץ/g, 'resolved'],
  [/הקשה/g, 'challenged'],
  [/פריך/g, 'challenges'],
  [/משני/g, 'answers'],
  [/מוקי/g, 'establishes'],
  [/מוקמינן/g, 'we establish'],
  [/איסור חל על איסור/g, 'prohibition does not apply upon prohibition'],
  [/אין איסור חל על איסור/g, 'prohibition does not apply upon prohibition'],
  [/גזירה/g, 'decree'],
  [/גזרו/g, 'they decreed'],
  [/נהגו/g, 'they practice'],
  [/נהיגין/g, 'they practice'],
  [/מנהג/g, 'custom'],
  [/דגים/g, 'fish'],
  [/חגבים/g, 'locusts'],
  [/ביצים/g, 'eggs'],
  [/ביצה/g, 'egg'],
  [/ביצי עוף/g, 'fowl eggs'],
  [/גבינה/g, 'cheese'],
  [/גבינות/g, 'cheeses'],
  [/עוף/g, 'fowl'],
  [/עופות/g, 'fowl'],
  [/חיה/g, 'wild animal'],
  [/בהמה/g, 'domestic animal'],
  [/בהמה טהורה/g, 'pure domestic animal'],
  [/בהמה טמאה/g, 'impure animal'],
  [/טריפות/g, 'tereifot'],
  [/נבילה/g, 'nevelah'],
  [/שחוטה/g, 'slaughtered'],
  [/מתה/g, 'dead animal'],
  [/דם/g, 'blood'],
  [/דם דגים/g, 'fish blood'],
  [/קשקשים/g, 'scales'],
  [/סכנה/g, 'danger'],
  [/סכנת/g, 'danger of'],
  [/בכלים/g, 'in vessels'],
  [/בכלי/g, 'in a vessel'],
  [/בקדרה/g, 'in a pot'],
  [/בתבשיל/g, 'in a dish'],
  [/שיעור/g, 'measure'],
  [/שיעורא/g, 'measure'],
  [/הפסד מרובה/g, 'great loss'],
  [/מקילין/g, 'lenient ones'],
  [/מחמירין/g, 'stringent ones'],
  [/חוששין/g, 'we are concerned'],
  [/חיישינן/g, 'we are concerned'],
  [/מותר/g, 'permitted'],
  [/אסור/g, 'forbidden'],
  [/אסורא/g, 'prohibition'],
  [/היתר/g, 'permitted'],
  [/היתרה/g, 'permitted'],
  [/בטל/g, 'nullified'],
  [/בטיל/g, 'nullified'],
  [/ס"א/g, 'sixty'],
  [/ס"ב/g, 'sixty-two'],
  [/חד בתרי/g, 'one in two'],
  [/יבש ביבש/g, 'dry in dry'],
  [/נותן טעם/g, 'imparts taste'],
  [/נט"ל/g, 'noten taam lifgam'],
  [/כרותח/g, 'as if boiling'],
  [/יad soledes/g, 'yad soledes bo'],
  [/יד סולדת/g, 'yad soledes bo'],
  [/יד סולדת בו/g, 'yad soledes bo'],
  [/בן יומו/g, 'ben yomo'],
  [/קלי ראשון/g, 'kli rishon'],
  [/קלי שני/g, 'kli sheni'],
  [/מקח וממכר/g, 'commerce'],
  [/תרנגולת/g, 'chicken'],
  [/תרנגולות/g, 'chickens'],
  [/פורים/g, 'Purim'],
  [/שבת/g, 'Shabbat'],
  [/פסחים/g, 'Pesachim'],
  [/חולין/g, 'Chullin'],
  [/ביצה/g, 'Beitzah'],
  [/נדרים/g, 'Nedarim'],
  [/עבודה זרה/g, 'Avodah Zarah'],
  [/ע"ז/g, 'Avodah Zarah'],
  [/שבת דף/g, 'Shabbat daf'],
  [/חולין דף/g, 'Chullin daf'],
  [/כתובות/g, 'Ketubot'],
  [/מכשירין/g, 'Machshirin'],
  [/תבשילי שבת/g, 'Shabbat dishes'],
  [/הצולה/g, 'one who roasts'],
  [/המטגן/g, 'one who fries'],
  [/השולק/g, 'one who boils'],
  [/המעשן/g, 'one who smokes'],
  [/מבשל/g, 'cooking'],
  [/רבנן דקסרין/g, 'sages of Caesarea'],
  [/בל תשקצו/g, 'bal teshaktzu'],
  [/בל תוסיף/g, 'bal tosif'],
  [/תורת כהנים/g, 'Torat Kohanim'],
  [/ספרי/g, 'Sifrei'],
  [/אגור/g, 'Agur'],
  [/יראים/g, 'Yereim'],
  [/צדה לדרך/g, 'Tzeda LaDerech'],
  [/כל בו/g, 'Kol Bo'],
  [/רבינו ירוחם/g, 'Rabbenu Yerucham'],
  [/באר שבע/g, "Be'er Sheva"],
  [/עפר"ח/g, 'Ephraim'],
  [/דגול מרבבה/g, 'Dagul Mervavah'],
  [/שאילת יעבץ/g, "She'eilot Ya'avetz"],
  [/נודע ביהודה/g, 'Nodah BeYehudah'],
  [/חתם סופר/g, 'Chasam Sofer'],
  [/אבודרהם/g, 'Abudraham'],
  [/שיבולי לקט/g, 'Shibolei Leket'],
  [/מור וקציעה/g, 'Mor Uktzia'],
  [/פרישה/g, 'Perishah'],
  [/דרכי משה/g, 'Darkei Moshe'],
  [/לחם משנה/g, 'Lechem Mishneh'],
  [/כסף משנה/g, 'Kessef Mishneh'],
  [/בדק הבית/g, 'Bedek HaBayit'],
  [/חידושי/g, 'novellae of'],
  [/הגהות/g, 'hagahot'],
  [/הג"ה/g, 'hagahah'],
  [/הגהת/g, 'hagahah of'],
  [/הגהות אשר"י/g, 'Hagahot Ashiri'],
  [/הגהות מיימוניות/g, 'Hagahot Maimoniyot'],
  [/מרדכי/g, 'Mordechai'],
  [/אין מעמידין/g, 'Ein Maamidin'],
  [/במה בהמה/g, 'Bamah Beheimah'],
  [/במה אשה/g, 'Bamah Ishah'],
  [/במה מדורסין/g, 'Bamah Madurin'],
  [/כולכית/g, 'kulyatis'],
  [/אפיקורן/g, 'dessert course'],
  [/ר"י הגלילי/g, "R' Yosi HaGelili"],
  [/ר"י/g, "R' Yosi"],
  [/ר"מ/g, "R' Meir"],
  [/ריה"ג/g, 'Rabbeinu Yehudah Gaon'],
  [/הרי"מ/g, "R' Yitzchak of Mezhirov"],
  [/הרי"ף/g, 'Rif'],
  [/הגאונים/g, 'Geonim'],
  [/בטנורא/g, 'in an oven'],
  [/בתנור/g, 'in an oven'],
  [/בגרידא/g, 'on a griddle'],
  [/במחבת/g, 'on a griddle'],
  [/כלי חרס/g, 'earthenware vessel'],
  [/כלי מתכות/g, 'metal vessel'],
  [/עובד כוכבים/g, 'non-Jew'],
  [/ישראל/g, 'Israelite'],
  [/הרואה/g, 'one who sees'],
  [/הרואין/g, 'those who see'],
  [/שקדים/g, 'almonds'],
  [/שקד/g, 'almond'],
];

function strip(h) {
  return h
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>/g, '')
    .replace(/<\/small>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function ft(heb, passes = 12) {
  let s = strip(heb);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA_087) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  return s;
}

function translateBeer(h) {
  const t = strip(h);
  if (/ברייתא.*חולין.*קט/.test(t)) return 'Baraita Chullin daf 115.';
  if (/טור והרשב"א/.test(t)) return 'Tur and Rashba in Torat HaBayit.';
  if (/משנה וגמ/.test(t) && /קי"ג/.test(t)) return 'Mishnah and Gemara there daf 113.';
  if (/^שם במשנה/.test(t)) return 'There in the Mishnah.';
  if (/כר"ע.*רא"ש/.test(t)) return 'There, and R\' Akiva — Rosh in name of Rif and Rambam chapter 9 of Forbidden Foods (and so Beit HaGefen, Tur, Rashi in Chumash, Bertinoro, Geonim, Ramban, Rashba, Ran, Rabbenu Yerucham, Tzeda LaDerech, Kol Bo, Raavad, Sefer Yereim 148, Hagahot Rabbi Akiva Eiger — and so Semag and Semak).';
  if (/אוקימתא.*רב אשי/.test(t)) return 'As Rav Ashi establishes there daf 104.';
  if (/ב"א בתשובה/.test(t)) return 'Bach in a responsum.';
  if (/ברייתא ביצה/.test(t)) return 'Baraita Beitzah daf 7 and first tanna.';
  if (/הרשב"א בת"ה/.test(t)) return 'Rashba in Torat HaBayit, and so Rabbenu Yerucham path 14 end.';
  if (/א"ח בשם/.test(t)) return 'Orach Chaim in name of Mahar Yehonatan.';
  if (/טור בשם הרמב"ם/.test(t)) return 'Tur in name of Rambam there — and it is an unresolved question in Yerushalmi Nedarim.';
  return ft(h);
}

function translateGra(h) {
  const t = strip(h);
  const lead = t.match(/^([^.<]+)/)?.[1]?.replace(/^<b>|<\/b>/g, '') || '';
  const first = lead.split(/\s+/).slice(0, 8).join(' ');
  if (t.length < 120) return `${ft(first)} — see there.`;
  return ft(t);
}

function translateSiftei(h) {
  const inner = strip(h).replace(/^\[\"|\"\]$/g, '').trim();
  const m = inner.match(/^([^"]+?)(?:\.|\s)(.*)$/s);
  if (!m) return `["${ft(inner)}"]`;
  const title = ft(m[1].replace(/^<b>|<\/b>/g, '').trim());
  const body = ft(m[2].trim());
  if (h.trim().startsWith('["') || inner.startsWith('["')) return `["${title}. ${body}"]`;
  return `${title}. ${body}`;
}

const SLUG_FN = {
  'beer-hagolah': translateBeer,
  'beur-hagra': translateGra,
  'siftei-kohen': translateSiftei,
  'baer-heitev': (h) => ft(h),
  'turei-zahav': (h) => ft(h),
  'kereti': (h) => ft(h),
  'peleti': (h) => ft(h),
  'kaf-hachayim': (h) => {
    const n = h.match(/^\(([א-ת])\)/)?.[1];
    const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10', יא: '11' }[n] || '';
    return `(${ord}) ${ft(strip(h).replace(/^\([א-ת]+\)\s*/, ''))} (siman 87; Kaf HaChayim).`;
  },
  'nekudot-hakesef': (h) => ft(strip(h).replace(/סימן פ"ז/, 'siman 87').replace(/סק"(\d+)/g, 's.k. $1')),
  'mateh-yehonatan': (h) => `(siman 87) ${ft(strip(h).replace(/^\(סימן[^)]+\)\s*/, ''))}`,
  'pitchei-teshuva': (h) => ft(h),
  'rabbi-akiva-eiger-yd': (h) => ft(strip(h).replace(/^\(סימן[^)]+\)\s*/, '')),
  'yad-avraham': (h) => `(siman 87) ${ft(strip(h).replace(/^\(סימן[^)]+\)\s*/, ''))}`,
  'yad-ephraim': (h) => ft(h),
};

const EXPORT_NAMES = {
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
for (const slug of Object.keys(heb).sort()) {
  if (slug === 'mechaber') continue;
  const name = EXPORT_NAMES[slug];
  out[name] = {};
  const fn = SLUG_FN[slug] || ft;
  for (const [key, { heb: h }] of Object.entries(heb[slug])) {
    let tr = MANUAL[slug]?.[key];
    if (!tr) tr = fn(h);
    out[name][key] = tr;
    if (/[\u0590-\u05FF]/.test(tr)) hebLeft++;
  }
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let mjs = `/** Siman 087 hand+phrase translations — generated by _draft-087.mjs */\n`;
for (const [name, blocks] of Object.entries(out)) {
  mjs += `export const ${name} = {\n`;
  for (const [k, v] of Object.entries(blocks)) {
    mjs += `  '${k}': \`${esc(v)}\`,\n`;
  }
  mjs += `};\n\n`;
}
fs.writeFileSync(path.join(WORK, '_data-siman-087.mjs'), mjs);
console.log('wrote _data-siman-087.mjs, hebrew remaining:', hebLeft);
