#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(fs.readFileSync(path.join(WORK, '_he-242.json'), 'utf8'));

/** @type {Record<string, Record<string, string>>} */
const T = {
  'baer-heitev': {
    '3#א': `Establishes. The reason — the Bach wrote: since he establishes for himself a place to expound — is he not disputing the authority of his rabbi.`,
    '4#א': `Permission. And the opinion of Raavad, Rashba and Ribash that taking permission helps even within three parasangs. Shach.`,
    '4#ז': `Not. The language of the Levush — permission from one rabbi does not help; it implies from all his rabbis, or if only one rabbi it helps per Rashba; but some disagree within three parasangs — end quote, Shach.`,
    '13#_': `Clear. Shach: from Rambam even clear matter in poskim forbidden if not explicit in Scripture Sadducees concede; Bach agrees; astonished Rav permits; possibly scribal error poskim to verses. Rashba: on Yom Kippur or great feast forbidden to rule all day; if wine passed — permitted. Rambam: drunk may learn; sage for ruling should not teach. Distressed should not rule. Piety: avoid ruling on Yom Kippur heated, from road, house with beer — end quote.`,
    '14#_': `Semikhah. Rambam: distinguished sage fit to rule — court ordains; nowadays semikhah is only permission. See Maharal ibn Chaviv — end quote, Shach.`,
    '16#ג': `Informed. Shach: Ran from Rif eighth/twenty-fourth day — student departing must take leave; scribal error should be twenty-third; must return for permission — difficult. Taz emends Rema; Shach in Nekudot HaKesef.`,
    '16#ד': `May demolish. See above siman 241 seif 2; seif 3 gloss.`,
    '16#ז': `Obligated. Some say: equated fear to Heaven — stand even hundred times daily — end quote, Levush.`,
    '21#ב': `Specifically. She'erit Yosef: honor of rabbi's rabbi greater even without learning before him; learned somewhat — may push aside rabbi in presence. Taz on colleague's wife after death. Maharam Mintz: colleague's wife married am haaretz — not honored as before; while widow of scholar — obligated. Bach on mentioning rabbi as colleague; writing to great person — end quote.`,
    '31#ג': `Opinion. Even if permitted — not permitted; greater in wisdom — Raavad Ribash when ruling took effect; both in study hall may permit; some: greater may permit colleague's forbid — Shach.`,
    '31#ה': `Equipoise. Shach: only when erred in equipoise of two poskim/amoraim — Choshen Mishpat 25; if cannot clarify cannot permit.`,
    '31#ו': `Forbid. Shach: piece of prohibition — can forbid after colleague permitted. Taz: if action done from first ruling second cannot forbid.`,
    '34#ב': `Unload. Beit Yosef uncertain unloading vs rabbi equipoise — no danger; if not equipoise rabbi first; Rosh undecided — Shach.`,
    '36#ב': `For himself. Taz: reasoning without ordination — they do not listen unless comparison obvious to all — end quote.`,
  },
  'beer-hagolah': {
    '3#_': `Language of Rambam ch.5 Laws of Torah Study — explains disputing one's rabbi.`,
    '7#_': `Tur in name of Rambam ch.5 law 3 from baraita; Rambam: even without permission beyond three parasangs from Rav Huna; Tosafot as Rema gloss.`,
    '12#_': `Tanhum son of Rabbi Ami; Tosafot Eruvin 62b; Abbaye's tenant Ketubot 60b; within three parasangs rabbi with him; Maharik root 173.`,
    '14#_': `Root 117; Tosafot Sanhedrin 5 end 1a — Rabbi Chiyya to Rabbi nephew go to Babylonia.`,
    '15#_': `Maharik from Rabbah bar Rav Huna vs Exilarch.`,
    '27#_': `Baraita Rabbi Eliezer Berakhot 27b.`,
    '28#_': `Rambam ch.5 Laws of Torah Study as emended in Tur.`,
  },
  'beur-hagra': {
    '4#ב': `And if. Sanhedrin 5b: student should not rule; Rav and Rav Nachman needed permission; Rambam in permanence; Tanhum incidental; Tosafot challenge from Eruvin Rav Hamnuna/Rav Huna outstanding rabbi; beyond three parasangs permitted by law; within three parasangs forbidden even with permission; student-colleague exempt from death learned from Moses; Rashba 111 disagrees; Raavad Ribash siman 471; Rema gloss on permission.`,
    '4#ד': `Some say specifically regular. Tosafot difficulty from Eruvin; Sanhedrin Rav and Rav Nachman unresolved.`,
    '4#ה': `Even though. Presumably Rabbi Chanina, Rav Hamnuna, Ravina had permission.`,
    '4#ו': `He became great. Rashbam 138b student-colleague; Ravina colleague of Rav Ashi; Rabbi Yirmiyah colleague of Rav; Ribash.`,
    '6#ב': `But if. Not monetary judgments; Rabbah bar Rav Huna and authority not unlawfulness.`,
    '10#_': `Some say. Sanhedrin; Abaye; Bekhorot 3 Rav Mari.`,
    '13#ה': `Or dates. As written; Rambam like Rabbi Yehudah; Rashba; Keritot; Tosafot difficulty.`,
    '16#א': `Manner. Rambam Rashi Nazir Semak — student's question to rabbi.`,
    '16#ב': `If he gave. Rabbi Yehudah bar Rabbi Elazar portion 98.`,
    '16#ג': `Some say. Yerushalmi Berakhot 2 — Rabbi Yochanan and Rabbi Elazar; Shabbat 9; Rosh vs Yerushalmi; Tosafot Bava Kamma 73.`,
    '16#ז': `Not pray before. Kesef Mishneh behind and beside; Rabbi Yonah.`,
    '16#פ': `Some say not obligated. Kiddushin; Rif omitted; fear of rabbi like Heaven; Rambam Semak not obligated; Tosafot Chullin 54.`,
    '16#צ': `Specifically. Tosafot Kiddushin 2b from Rava.`,
    '17#_': `Place. Resolves Tosafot Shabbat — Berakhot such case.`,
    '22#א': `You taught us. Section 23; gloss.`,
    '22#ב': `If wished. Turei Zahav from Eruvin 67; Mishnah Berakhot 2; Tosafot mourning rabbinic.`,
    '27#_': `Whose rabbi. Yerushalmi Berakhot 3 — mourning meals with meat and wine.`,
    '30#א': `(Collection) All matters. End Kallah — greeting rabbi; who is rabbi; Rabbi Meir most wisdom.`,
    '30#ב': `Stands before. Babylonian student-colleague; Ramban; not outstanding rabbi even younger. (Collection) Rashi Rosh Ulla; Rabbi Yosi standing tearing; gloss 340.`,
    '31#ז': `Provided. Avodah Zarah asked sage.`,
    '31#ח': `Even if permitted. Yerushalmi Shabbat 19; Avodah Zarah 57; piece of prohibition; Tosafot may forbid; Semak; end Berakhot.`,
    '36#ב': `Student-colleague. Yevamot 37a Semak.`,
    '36#ד': `Specifically. Rashi; Nekudot Yosef Tosafot — similarity when rabbi alive.`,
  },
  'pitchei-teshuva': {
    '1#_': `Honor rabbi. Radbaz 48: rabbi third to Torah — student may not complete; honor of Torah. If for rabbi's honor like Song of Sea — permitted; rabbi's permission — must ascend.`,
    '5#_': `Household. Chavat Yair 121: rulings at home permitted even at rabbi's place per Eruvin HaDar; unlike parents; share in ruling permitted. Astonishing omitted Tur Mechaber Rosh.`,
    '6#_': `Not rule drunk. Shevut Yaakov 140 Baal HaIttur: only issur heter; monetary permitted; Bach 41 no distinction.`,
    '9#_': `Not rule. Mishnat Chachamim Avot sword delay judgment; Shelah; Rashi vs Rambam delay rulings; forbid delaying permit wife.`,
    '10#_': `Rabbi my teacher. Beit HaTalmud Shach not in presence; Regel Yesharah disagree — my lord Moses.`,
    '11#_': `Student not ask. Azriel Zalman intro Panim Meirot — no greeting is wildness; Yeshuot Yaakov 66.`,
    '12#_': `Stand before. Shulchan Aruch HaRav: not on Tisha B'Av; Orach Chayyim 554; Machatzit HaShekel custom.`,
    '13#_': `Specifically. Beit HaTalmud Maharik.`,
    '17#_': `Mishnah matter. Levushei Serad 101 two reasons permit; Shulchan Aruch HaRav 61 agent threw food — both exempt.`,
    '18#_': `Can permit. Beit HaTalmud Shach disagrees; Mishkenot Yaakov 59 Rema correct — true acceptance; Semag Avodah Zarah.`,
    '20#_': `Second not forbid. Beit HaTalmud; Radbaz 562 unless equipoise error; Radbaz 593 practice.`,
    '22#_': `Honor student. Chavat Yair 192 sharp Gemara words Yevamot 9.`,
    '23#_': `Unload burden. Radbaz 595; Yaavetz 157 majority poskim; She'elat Yaakov 88; Siftei Kohen 288.`,
  },
  'rabbi-akiva-eiger-yd': {
    '2#_': `(Seif 17) Peace rabbi. Bava Kamma 73b measure rabbi and teacher; Rambam Testimony 2:3; Rambam relied on Laws Torah Study.`,
    '6#_': `(Seif 18) Rabbi stands. Proper place siman 282; leaning not proper place must stand; Rema in place; Shach 282; Mishbetzot Zahav Orach Chayyim 142.`,
    '8#_': `(S.k. 59) Not set heart. Torat Shelaim Bass 3:3: first cannot permit; second may not forbid — not fitting.`,
    '11#_': `(B) D'oraisa. Sha'ar Efraim 68; Rema Choshen Mishpat 25 many; Raanach; Get Pashut; Beit Efraim; Maharit; Noda BiYehudah.`,
  },
  'siftei-kohen': {
    '1#_': `Father. Darkei Moshe: father-rabbi calls rabbi; chapter HaZahav; outstanding rabbi; practice differs — father name from childhood; father waives; Orach Chayyim 472; Moses to Rabbi Torah greatness one place.`,
    '4#ז': `[Beyond twelve mil permitted even without permission; Tosafot Sanhedrin 5b Eruvin HaDar Rav Hamnuna; Hagahot Maimoniyot permission needed; Maharik 170.]`,
    '4#ט': `[Outstanding rabbi most wisdom required; Maharik responsum; Rambam ch.5 counts laws; outstanding only; Ribash; multiple rabbis Scripture Mishnah Gemara; permission all outstanding rabbis — examine.]`,
    '9#_': `One wrote. Hagahot Derishah Eruvin 62 Megillat Taanit; Rashi; student-colleague; in presence only; Maharam novelty; Hagahot Maimoniyot; Mechaber permits; Maharam Megillat Taanit comparison.`,
    '10#_': `Forbidden sage. Only anonymous permit; Sanhedrin 8 blemishes; Niddah 20; Bekhorot Rav Mari; with reason and proofs permitted.`,
    '16#ד': `[Not pray equate to rabbi; Tosafot bowing; Yonah interruption; Rav Hai congregation permitted; Beit Yosef Orach Chayyim 90.]`,
    '16#ה': `[Not behind; Gemara Tefillat HaShachar student-colleague; Orach Chayyim 90; great disrespect.]`,
    '16#ו': `[Beyond four cubits; Beit Yosef Orach Chayyim 90; Tur Bach another domain.]`,
    '16#ל': `[Some say not obligated; Rambam not permitted means not obligated; Bach; Semag 13.]`,
    '17#_': `Greater right. Behind alongside; lesser left; beyond four cubits permitted. Tur; siman 282 Rashba standing for Torah scroll; Ramban Ki Tavo; Orach Chayyim 146.`,
    '21#א': `[Unless rabbi divides honor to student; Derishah Bach Rabbi Simcha Hagahot Maimoniyot Mordechai; Rav 244:8.]`,
    '22#ב': `[Protest hand; clear prohibition; Turei Zahav doubt; Eruvin 67 practical ruling vs seeing rabbi's hand; Rav not so precise.]`,
    '27#_': `No meat. See siman 341 gloss; 374:10.`,
    '28#_': `When mentions. Rashbatz my teacher Rabbi; Beit Yosef after twelve months like father 240:9.`,
    '31#ה': `[Colleague not; Ran Raavad Ribash 379; Maharik 173 greater may permit; equal only.]`,
    '31#כ': `[First permitted ruling took effect; Rosh Yerushalmi; may forbid what permitted; Raavad Rashba Ran piece prohibition; Ribash 379.]`,
  },
  'turei-zahav': {
    '16#ג': `Not behind. Rashi arrogance; Tosafot bowing; Yonah interruption three steps; side forbidden equating.`,
    '16#ה': `Departing permission. Ran Rif Moed Katan eighth day; scribal error twenty-third; lodging second permission; reconciled.`,
    '21#_': `Unless rabbi divides. Rabbi Simcha Mordechai Kiddushin honor High Priest deputy; Tosafot Shevuot 36 colleague wife; Maharam Mintz; Morenu Chacham mention rabbi as colleague; student-colleague no master.`,
    '31#ב': `First permitted took effect. Second cannot rule stringent; if not yet took effect may disagree; Rema language; action ate or mixed; equipoise Choshen Mishpat 25.`,
  },
  'yad-avraham': {
    '1#_': `(242:15) Rabbi my teacher so-and-so permitted; Berakhot 62; father permitted; Berakhot 5 48 no emend needed.`,
    '2#_': `(Shach) Conduct rulings. Disagreed Maharik root 41 many; Maharik root 52 kabbalah; Chullin 36; Tiferet Lemoshe; Sha'ar Efraim; Noda BiYehudah terumah derabbanan; Sefer HaMaor; Rashi Bava Kamma 116 two reasons; monetary many combine; Maskil LeEitan Yoma.`,
  },
};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = `/** Editorial translations — siman 242 (83 blocks) — Kavod HaRav */\nexport const TRANSLATIONS = {\n`;
let n = 0;
for (const [slug, keys] of Object.entries(T)) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
    n++;
  }
  body += `  },\n`;
}
body += `};\n`;

const missing = [];
for (const [slug, keys] of Object.entries(he)) {
  for (const key of Object.keys(keys)) {
    if (!T[slug]?.[key]) missing.push(`${slug}\t${key}`);
  }
}
if (missing.length) {
  console.error('MISSING:', missing.join('\n'));
  process.exit(1);
}

fs.writeFileSync(path.join(WORK, '_tr-data-242.mjs'), body);
console.log(`wrote _tr-data-242.mjs (${n} blocks)`);
