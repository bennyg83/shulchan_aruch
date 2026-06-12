#!/usr/bin/env node
/**
 * Generates _patch-siman-048-translations.mjs from embedded TRANSLATION_DATA.
 * Run: node pipeline/work/_gen-siman-048-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, '_patch-siman-048-translations.mjs');

/** @type {Record<string, Record<string, string>>} */
const TRANSLATION_DATA = {
  mechaber: {
    '1#main': `The laws of treifot in the kivah and kereis. In it are 12 seifim. Kivah (kivah is the pouch in the animal's innards into which food enters the kereis; at the end of the kereis called paunch it is shaped like a hat and is called beit hakosot, and food enters from beit hakosot to the meses and from the meses to the kivah and from the kivah to the dekin) — if punctured, treifah. And if the chelev on the yeter seals the puncture — kosher; but that on the arch does not seal:`,
    '2#main': `Kereis — if punctured, treifah; and it has nothing to seal it, for the chelev on it is forbidden: {Rama: Worms found in the kereis — kosher, for they grew from the secretion or the animal ate them. (Shaarei Dura siman 47):}`,
    '3#main': `Flesh covering most of the kereis — and this is the place from the belly — if when torn the kereis would emerge — if this flesh was torn, treifah even though this tear did not reach the kereis until it is visible; rather, since most of the thickness of this flesh was torn or removed — treifah. And how much is the measure of this tear in its length — a length of a tefach; and if it was a small animal and most of the length of the flesh covering the kereis was torn — even though the length of the tear is not a tefach — treifah, since most of it was torn:`,
    '4#main': `If this flesh was bored circularly or in length — if there was missing more than a sela — and it is so that three date pits can enter one next to the other with difficulty if food remains around it when they eat it, or loosely when there is no food at all — behold this is treifah, for if this tear is stretched it will stand at a tefach:`,
    '5#main': `If this flesh dissolved until the doctor scrapes it — it is considered as removed: {Rama: And we are not expert in flesh that the doctor scrapes; therefore wherever the appearance of the flesh changed — its law is as removed (Mordechai and Beit Yosef in name of Hagahot Maimoniyot):}`,
    '6#main': `A needle found in the cavity of the kivah or kereis — its law is like a needle found in beit hakosot:`,
    '7#main': `The meses and beit hakosot are attached to one another; and if they were punctured in the place of their attachment — even if the puncture is mafpolash from one to the other — kosher; and if the puncture is on other sides that are not attached together — if the puncture is mafpolash from side to side — treifah; and if not — kosher, whether in the meses or in beit hakosot: {Rama: And some forbid in the meses even without a mafpolash puncture (Tur in name of Rashi and Orach Chaim kelal 165 and Tur haArukh siman 165); and so is the practice unless in a place of great loss, for then one may rely on those who permit:}`,
    '8#main': `If in one of them a needle or thorn is stuck and it did not puncture from side to side — they turn it over and examine it from outside; if korat dam is found on it — it is known that it was entirely punctured before slaughter and is treifah; and if not — kosher (Tosafot and Hagahot Maimoniyot chapter 6 in name of Semag and all poskim) (even if only a bit of the outer skin did not puncture) (see s.k. 21). And this is when they did not salt it or rinse it — even if its point is toward the outside: {Rama: And some are lenient to permit if it did not puncture from side to side and was rinsed and salted, or was lost and not examined from outside whether korat dam was on it (so is implied in Hagahot Semak and Rambam and Ra'ash below, and several poskim) — and one may rely on them in a place of great loss.} And if the needle went from side to side while still stuck in it — they examine it whether korat dam is found around the needle (and all the more on it) (Mordechai and poskim — and this is Shulchan Aruch Orach Chaim laws of forbidden foods daf 51 and Ketuvot daf 76) — it is known that before slaughter it was entirely punctured and is treifah; and if not — after slaughter it was forced through and is kosher, if they did not salt or rinse it; for since the needle is still there, if it had passed while alive there would be blood around it. But when the needle is not before us — we forbid as if it was entirely punctured even if there is no korat dam: {Rama: Wherever examination is required — if they did not examine, such as if it was lost or they took the needle from there — treifah, for it is as if they rinsed and salted it (Rashba siman 360). Some say that in our time, since we are not expert in examinations — one should declare treifah if the needle punctured from both sides even if no korat dam or rust was found, for we do not rely on our examination once it punctured from both sides (R' Yehudah Zahav and Orach Chaim haArukh); and so is the practice. A needle or thorn found in the meses and beit hakosot in their cavity and not stuck in them at all — kosher in every case, and no examination is required (Hagahot Maimoniyot). And some are lenient that even if the needle punctured from one side — one need not examine from outside if there is korat dam on it (Rambam and Ra'ash) — and one may rely on them if the loss is great and examination is impossible, such as if it was salted or rinsed or lost:}`,
    '9#main': `If rust is found on it — its law is like korat dam found on it: {Rama: And likewise if rust is found from outside opposite the needle — if it punctured from one side it is treifah as if korat dam were found there (Beit Yosef):}`,
    '10#main': `That which we said "from one side — kosher" means from inside toward the stomach; but if the side outside faces the cavity of the body — even if it did not puncture at all, but a needle is found in the cavity of the body — treifah:`,
    '11#main': `A needle found in the kurkavan and all of it is swallowed in the thickness of its flesh and half a finger-width remains on the side of the pouch — also on the outside side, so that the needle was not eating and no puncture was recognizable neither toward inside nor toward outside — we suspend to be lenient: {Rama: For the needle comes from inside and it is like punctured from one side; and if there is no korat dam from outside — kosher (Rashba). And some are stringent and forbid even in such a case (Hagahot Shaarei Dura in name of Maharam and Orach Chaim haArukh). And one should be concerned for their words if not in great loss:}`,
    '12#main': `A minor who found a needle stuck in the kereis — one should be stringent and forbid on his word if he is sharp to know and to aim in these matters:`,
  },
  'beer-hagolah': {
    '1#_': `Mishnah Chullin daf 42.`,
    '2#_': `There daf 49 and 50, and the first version stringently — Rif; and so is implied from Rambam's words in chapter 6. (°) Explanation: the kivah is shaped like an arch; outside is called the arch and inside the circle is called yeter.`,
    '3#_': `There in the mishnah.`,
    '4#_': `Rambam's language in chapter 6 of Hilchot Shechitah law 11.`,
    '5#_': `Rambam's language in chapter 9 of Hilchot Shechitah (law 5 and 6) from the mishnah there daf 42, and as R' Yosei bar Chanina explains stringently daf 52; and so Rashba in Tur haArukh and Ra'ash and Semak and Mordechai.`,
    '6#_': `Like R' Yehudah in the mishnah there, and as R' Binyamin bar Yefet explains there, etc. — Rif and Rambam there and Semak.`,
    '7#_': `And Beit Yosef wrote: and it appears to me that the same applies to most of its width, for we taught anonymously.`,
    '8#_': `Rambam's language there — the statement of Rav Geviha, etc., and of Rav Yosef there.`,
    '9#_': `The statement of Rav Yehudah, etc., there daf 43, and as Rabbenu Efrayim, Ra'ash, and Rashba in Tur haArukh.`,
    '10#_': `Beit Yosef according to his view, and so Rashba in his responsum.`,
    '11#_': `Mishnah there daf 42, and as Rashi explains there.`,
    '12#_': `Tosafot in name of Rabbenu Tam there in Shabbat daf 36; and so agreed Rashba, Ran, and Mordechai in name of Ra'aviah in name of his father, and Tur.`,
  },
};

// Import remaining slugs from part files if present
const parts = ['part2', 'part3', 'part4', 'part5'];
for (const p of parts) {
  const fp = path.join(DIR, `_siman-048-translations-${p}.mjs`);
  if (fs.existsSync(fp)) {
    const mod = await import(`./_siman-048-translations-${p}.mjs`);
    Object.assign(TRANSLATION_DATA, mod.default);
  }
}

const EXPECTED = {
  mechaber: 12,
  'turei-zahav': 19,
  'siftei-kohen': 42,
  'baer-heitev': 29,
  'beer-hagolah': 12,
  'beur-hagra': 27,
  kereti: 27,
  peleti: 13,
  'pitchei-teshuva': 12,
  'nekudot-hakesef': 7,
  'kaf-hachayim': 12,
  'mateh-yehonatan': 8,
  'yad-avraham': 3,
  'yad-ephraim': 5,
  'rabbi-akiva-eiger-yd': 3,
};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = '/** Translation maps for siman 048 */\nexport const TRANSLATIONS = {\n';
for (const [slug, count] of Object.entries(EXPECTED)) {
  const T = TRANSLATION_DATA[slug] || {};
  const keys = Object.keys(T);
  if (keys.length !== count) {
    console.error(`WARN ${slug}: have ${keys.length}, expected ${count}`);
  }
  body += `  ${JSON.stringify(slug)}: {\n`;
  for (const k of keys.sort()) {
    body += `    ${JSON.stringify(k)}: \`${esc(T[k])}\`,\n`;
  }
  body += '  },\n';
}
body += '};\n';

fs.writeFileSync(OUT, body, 'utf8');
console.log('Wrote', OUT);
for (const [slug, count] of Object.entries(EXPECTED)) {
  const n = Object.keys(TRANSLATION_DATA[slug] || {}).length;
  console.log(`${slug}:${n}${n === count ? '' : ` (expected ${count})`}`);
}
