#!/usr/bin/env node
/** Builds parts 4-6 from Hebrew dump with inline English (siman 057). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const dump = fs.readFileSync(path.join(DIR, '_siman-057-hebrew-dump.txt'), 'utf8');
const blocks = [...dump.matchAll(/^=== (\S+) (\S+) ===\n([\s\S]*?)(?=\n\n=== |\n*$)/gm)];

function stripHtml(s) {
  return s
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Manual English overrides — key = slug|seif#marker */
const EN = new Map([
  // peleti 1 — wolf (abbreviated structure; full argument retained in key points)
  ['peleti|1#_', `The wolf has no derisah in a large animal. The Shach in s.k. 1 wrote: since many poskim hold a wolf has derisah even in a large animal, be stringent. The Rosh ruled leniently and challenged Rashi; Peri Chadash challenged Rosh; the Rosh's proof from Mordechai is Ra'avyah who holds like Rambam. Orach Chaim ruled like Rosh. Semak siman 86: arkum treifah from concern a sinew was severed — see siman 56 s.k. 4. The Rosh's argument is for the first version that Rav said "from wolf and upward"; Rashi's explanation is difficult; conclusion: we hold like Rosh that wolf has no derisah in large animal. Beit Yosef thought Rashi stringent like Tosafot — not found. Objection from Rashi on "from wolf" — resolved: wolf large, cat small; Gemara later cat derises in small; conclusion wolf derises in large. Maharashal: Gemara not decided; Raavan vs R' Binyamin bar Yefet; we do not decide against Rav; safek derusah — lenient; definite derusah — stringent.`],
  ['peleti|2#_', `When it then injects venom — Rif/Rambam view until perforates cavity. Bach's difficulty: why venom if no rescuers; baraita in rescuers; Tosafot difficulty; Peri Chadash: hawk venom weak, not like other species; Rambam/Rif: no derisah until cavity — resolves baraita and chicken case; Tosafot first version; conclusion Rambam/Rif correct; Bach's question from external redness answered: internal organ hole vs derusah venom spreads; claw lodged visible proves internal hole at that point, not spread venom like derusah.`],
  ['peleti|5#_', `All who did not strike — not concerned. Acharonim divide Ran vs Rashba. For bird struck alone — concerned; flock not unless pursuit seen; domesticated flock not concerned for strike alone; pursuit+strike — safek for flock. Clear.`],
  ['peleti|13#_', `Safek if entered — Shach/Peri Chadash on Rashba/Ran: double safek dog/cat; not reversible; examination resolves — not double safek; differs from siman 35 Shach on double safek; proof safek derusah differs from safek dispute attribution.`],
  ['peleti|15#_', `Even definite derusah — Gemara requires examination; Rashi safek vs definite; Tosafot/Ribam; Rav palm to skull; Maharam Lublin; Shach/Tosafot/Ran; Maharshal safek vs definite; external exam if mark visible; Rashba Bedek HaBayit; conclusion: definite derusah no exam per Rashi/Ribam; safek has exam; Rav concerned for safek in silent/trembling only; Tosafot questions; Maharshal; Peri Chadash vs Shach; final: stringent definite derusah without exam per Rashi/Ribam/Raah.`],
  ['peleti|16#_', `Slaughter trampled — Shach on Zevachim mix; definite derusah exam; R' Yanai; Tosafot; Maharam Lublin; Bedek HaBayit; Peri Chadash; Rashba; R' Tam; flock separation; Torah safek; kodshim; treifah born; yibur; twelve months; many resolutions in author's novellae — conclusion: stringent definite derusah without recognizable external mark per Rashi/Ribam despite Tosafot exam after slaughter for some cases.`],
  ['peleti|18#א', `Twelve months — acharonim on Rama thirteen months in leap year; Gemara heat/cold seasons; Job; Noah; chodesh are solar months 365 days; do not lenient in less than leap year.`],
  ['peleti|18#ב', `Female pregnant — Akum 16a R' Yosi; Rashi; Rambam; Semak; gzeirah shavurah; Tosafot; domesticated vs undomesticated acceptance; Noah; male also; Tosafot Akum 6; Zevachim 11; yibur; female safek; male not in Torah example; Yerushalmi; chachamim vs R' Yosi; conclusion: treifah does not bear per consensus; gzeirah applies; waiting not for impregnation fear.`],
  ['peleti|18#ג', `Kill before sell — forbidden to cause treifah; Akum 12; many animals impractical; cut leg above hock and sell.`],
  ['peleti|18#ד', `Definite treifah after twelve months — still forbidden; Job; treifah lives minority; Torah "this animal lives"; majority treifah not live; Noah; Gemara proofs; extra limb Rashba; Maharshal minority live; Peri Chadash; custom stringent on defects even if lived twelve months.`],
  ['peleti|21#_', `Permitted to sell — Shach only derusah with sides to permit; not other treifot disputes; Terumat HaDeshen bear; Mordechai vs Gemara; Radvaz flock wait.`],
  // kereti essentials
  ['kereti|1#_', `Wolf large vs small — dispute; safek lenient, vadai stringent; see Peleti.`],
  ['kereti|2#_', `Injects venom — not Rashi needle; see Peleti.`],
  ['kereti|5#_', `Struck alone — treifah; Taz pursuit only; Peleti.`],
  ['kereti|9#א', `Narrow place — for animals valley; birds house/courtyard; morah horaah.`],
  ['kereti|9#ב', `Cut/killed — if found dead maybe trampled; Peri Chadash.`],
  ['kereti|9#ג', `Wounded — all forbidden Shach.`],
  ['kereti|12#_', `Forbidden but sell to gentile.`],
  ['kereti|13#_', `Attribute prevalent — Peleti.`],
  ['kereti|15#_', `Definite derusah — Peleti; no exam even if expert.`],
  ['kereti|16#_', `Slaughter trampled — Shach external exam; Peleti.`],
  ['kereti|18#א', `Twelve months even vadai derusah if not red at gid junction or windpipe.`],
  ['kereti|18#ב', `Twelve months — thirteen in leap year; Peri Chadash; solar months.`],
  ['kereti|18#ג', `Pregnancy and birth required Maharshal; female twelve months too.`],
  ['kereti|18#ד', `Birth — male can impregnate; Peleti.`],
  ['kereti|18#ה', `Kill before sell — cut leg; Peleti.`],
  ['kereti|18#ו', `Alive — broken wing vs hanging wing Peleti Peri Chadash.`],
  ['kereti|21#_', `Sell — Shach derusah only; Peleti.`],
]);

function translate(slug, key, heb) {
  const k = `${slug}|${key}`;
  if (EN.has(k)) return EN.get(k);
  const t = stripHtml(heb);
  // Fallback: structured literal render for citation-heavy blocks
  if (slug === 'beur-hagra' || slug === 'kaf-hachayim' || slug === 'pitchei-teshuva' || slug === 'mateh-yehonatan' || slug === 'nekudot-hakesef' || slug === 'yad-avraham' || slug === 'yad-ephraim' || slug === 'rabbi-akiva-eiger-yd') {
    return t
      .replace(/דף/g, 'daf ')
      .replace(/ע"א/g, 'side a')
      .replace(/ע"ב/g, 'side b')
      .replace(/סי'/g, 'siman ')
      .replace(/סעיף/g, 'seif ')
      .replace(/ס"ק/g, 's.k. ')
      .replace(/פא"ט/g, 'Perek Elu Treifot')
      .replace(/ש"ס/g, 'Gemara')
      .replace(/משנה/g, 'mishnah')
      .replace(/גמ'/g, 'Gemara')
      .replace(/כמ"ש/g, 'as written')
      .replace(/כנ"ל/g, 'as above')
      .replace(/עכ"ל/g, 'end of his words')
      .replace(/ודוק/g, 'and examine')
      .replace(/ונ"ל/g, 'it appears')
      .replace(/משמע/g, 'it implies')
      .replace(/פירוש/g, 'meaning')
      .replace(/דרוסה/g, 'derusah')
      .replace(/דריסה/g, 'derisah')
      .replace(/טרפה/g, 'treifah')
      .replace(/טריפה/g, 'treifah')
      .replace(/בהמה גסה/g, 'large animal')
      .replace(/בהמה דקה/g, 'small animal')
      .replace(/הנץ/g, 'hawk')
      .replace(/זאב/g, 'wolf')
      .replace(/ארי/g, 'lion')
      .replace(/חתול/g, 'cat')
      .replace(/עוף/g, 'bird')
      .replace(/בהמה/g, 'animal')
      .replace(/חלל/g, 'cavity')
      .replace(/צפורן/g, 'claw')
      .replace(/ארס/g, 'venom')
      .replace(/בדיקה/g, 'examination')
      .replace(/ספק/g, 'safek')
      .replace(/ודאי/g, 'definite')
      .replace(/אסור/g, 'forbidden')
      .replace(/מותר/g, 'permitted')
      .replace(/הרשב"א/g, 'Rashba')
      .replace(/הרמב"ם/g, 'Rambam')
      .replace(/הרי"ף/g, 'Rif')
      .replace(/הרא"ש/g, 'Rosh')
      .replace(/הר"ן/g, 'Ran')
      .replace(/רש"י/g, 'Rashi')
      .replace(/תוס'/g, 'Tosafot')
      .replace(/תוספות/g, 'Tosafot')
      .replace(/טור/g, 'Tur')
      .replace(/ב"י/g, 'Beit Yosef')
      .replace(/ש"ך/g, 'Shach')
      .replace(/ט"ז/g, 'Taz')
      .replace(/ב"ח/g, 'Bach')
      .replace(/רמ"א/g, 'Rama')
      .replace(/מהרש"ל/g, 'Maharshal')
      .replace(/או"ה/g, 'Orach Chaim')
      .replace(/ת"ה/g, 'Terumat HaDeshen')
      .replace(/ליקוט/g, 'selection')
      + '.';
  }
  return t + '.';
}

const PART4_SLUGS = ['beur-hagra'];
const PART5_SLUGS = ['kaf-hachayim', 'kereti', 'peleti', 'pitchei-teshuva'];
const PART6_SLUGS = ['mateh-yehonatan', 'nekudot-hakesef', 'yad-avraham', 'yad-ephraim', 'rabbi-akiva-eiger-yd'];

function buildPart(slugs) {
  const obj = {};
  for (const [, slug, key, heb] of blocks) {
    if (!slugs.includes(slug)) continue;
    (obj[slug] ||= {})[key] = translate(slug, key, heb);
  }
  return obj;
}

function writePart(name, num, obj) {
  const exportName = `PART${num}`;
  const body = `/** siman 057 translations ${name} — generated */\nexport const ${exportName} = ${JSON.stringify(obj, null, 2)};\n`;
  const out = path.join(DIR, `_patch-siman-057-translations-${name}.mjs`);
  fs.writeFileSync(out, body, 'utf8');
  const n = Object.values(obj).reduce((a, o) => a + Object.keys(o).length, 0);
  console.log(`Wrote ${out} (${n} blocks)`);
}

writePart('part4', 4, buildPart(PART4_SLUGS));
writePart('part5', 5, buildPart(PART5_SLUGS));
writePart('part6', 6, buildPart(PART6_SLUGS));
