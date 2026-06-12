#!/usr/bin/env node
/**
 * Build _manual-095.json — full English for all non-mechaber blocks needing override.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const exportPath = path.join(WORK, '_export-095-hebrew.json');
const outPath = path.join(WORK, '_manual-095.json');

function mergeManual(target, file) {
  const p = path.join(WORK, file);
  if (!fs.existsSync(p)) return;
  const extra = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const [slug, map] of Object.entries(extra)) {
    if (!target[slug]) target[slug] = {};
    Object.assign(target[slug], map);
  }
}

/** @type {Record<string, Record<string, string>>} */
const MANUAL = {
  'siftei-kohen': {
    '1#_': `Well washed, etc. This is not to say that anything cooked in it — stam we establish on it that there was clinging fat, as Rosh and Taz wrote in seif 3 regarding rinsing: even if it is not ben yomo we establish on it fat and that it was not well scraped; for only regarding rinsing do we say stam there is clinging fat on them, for behold now he is rinsing them; but when it was cooked in a pot we say stam that there was no clinging fat on them; and as Turei Chayim wrote general rule 17 din 2, and as is proven explicitly from poskim in many places; and what Mechaber wrote "well washed" is to exclude when it is known clearly that it was not well washed.`,
    '2#א': `["Egg, etc. And even a peeled egg that was cooked in water in a dairy pot, etc. — if the pot is well washed as in the end of the first section, and it is simple."]`,
    '2#ב': `["And the custom is to forbid l'chatchila to eat them with kutach, and b'dieved it is permitted if he placed them in kutach; but to cook them l'chatchila in a meat pot in order to eat them with kutach is forbidden even for Mechaber and his support; and so too Semak siman 213 and Hagahot Maimoniyot and Rivam and they bring them in Beit Yosef; and so too Issur VeHeter beginning general rule 34 in name of Mordechai."]`,
    '2#ג': `["And b'dieved it is permitted. And Maharshal in his responsa and in his book chapter 63 siman 63 forbids even b'dieved by way of roasting from the halachah, see there."]`,
    '2#ד': `["But to place them in their vessels is permitted l'chatchila. At first glance it appears that even to place them by way of pouring is permitted; and so too Issur VeHeter explicitly; and so too Bach at the end of seif 4 that the view of the Rav is that it is permitted to pour them in their vessels even l'chatchila; but it is difficult, for he wrote in seif 3 that if one pours from a kli rishon of meat onto a dairy vessel its law is like a kli rishon and it forbids if it was ben yomo; and it is a great forced explanation to say that here he speaks only of the food being permitted to pour it in their vessels but the vessel is forbidden; and one must say that here he deals only with permitting to place them without pouring. And nevertheless regarding the halachah requires study, since many poskim and Mechaber from among them permit even when they were cooked, and the Rav in the gloss itself permits b'dieved — if so it appears that if one pours from a kli rishon of meat onto a dairy vessel it is permitted since it is b'dieved; and some say regarding what we forbid meat bowls that were rinsed in a dairy cauldron — there it is different as Ran wrote and these are his words: for who will tell us that emission of meat and emission of milk will not mix in themselves without the intermediary of the water — therefore it is not noten taam bar noten taam; therefore it appears regarding fish that were cooked, etc. And further, what we permit as noten taam bar noten taam is not because they hold the first taste does not spread until the third — for if so, in other prohibitions too we would say so for one who does not hold chein nafsho, and we permit only in basar b'chalav and the like where there are two tastes of heter; therefore specifically when the second taste stood in heter without mixture of milk do we say so; but here where the second taste did not stand by itself at all but as soon as it came into existence it mixed with the taste of milk — it is reasonable and certain that it is forbidden, as Semak wrote, end of his words. And all this does not apply to pouring; and so is the view of Issur VeHeter that if one pours from a kli rishon of meat onto one of milk it is permitted; and even the Rav in Turei Chayim there din 12 wrote that all his words appear to me to be the halachah since they are matters of taste; but it appears to me they did not practice to be lenient in such a case; however in great loss or time of need one may rely on him, end of his words. I also found again that in responsum of Masat Binyamin siman 2 he ruled so and wrote that all who are stringent in this are only among those who wonder, see there; and see s.k. 17."]`,
    '2#ה': `["Only came up in a meat vessel, etc. Explanation: one of them — the vessel or the fish — is hot, as stated in Tosafot and Rosh and Tur and other poskim, and so is proven in the Gemara; but if both of them are hot, Beit Yosef brought in name of Maharach that it is like roasted; and so too Turei Chayim there din 40 in name of Issur VeHeter, see there Mordechai, see there."]`,
    '2#ו': `["Even if it is not ben yomo. For the sharpness of spice makes it as if the prohibition is visible and makes it as ben yomo, as below siman 96 and below siman 122 seif 3 it was explained that specifically the food itself that is sharp is made for improvement; but it does not make the pot for improvement, see there; and see above siman 96 and siman 103 seif 6."]`,
    '2#ז': `["Until there is sixty, etc. And we do not say regarding spices that since they are made for taste they are not nullified, since their prohibition is not because of themselves; and as below siman 98 seif 8."]`,
    '3#א': `["Both of them ben yomo — permitted. This is b'dieved; but l'chatchila one should not rinse them even for Mechaber, as Mechaber wrote in Orach Chaim siman 452 seif 2 that one must be careful not to purge a meat vessel and a dairy vessel together unless one of them is not ben yomo; and so too Tur below siman 121 — if one purges a meat vessel to eat in it milk, or the reverse, it must not be ben yomo, end of his words; and this is l'chatchila as Bach and Darchei Moshe wrote there, see there; and see in s.k. 3 in this siman and above siman 94 s.k. 15."]`,
    '3#ב': `["And if there was clinging fat on them, etc. Explanation: even if there was only clinging fat on one of them, all is forbidden, because the second taste immediately imparts taste into the substance and it is not a second noten taam in heter; and also the fat touches the second vessel and the vessel becomes forbidden and again all becomes forbidden. And accordingly, even if one of them is not ben yomo and the clinging fat is on the one that is not ben yomo, all is forbidden; but if the clinging fat is on the one that is ben yomo, that one which is ben yomo is permitted and the one that is not ben yomo is forbidden; and so too Maharai in Hagahot ShaDa and the Rav in Turei Chayim there din 10."]`,
    '3#ג': `["There must be in the water sixty corresponding to, etc. See above s.k. 1."]`,
    '3#ד': `["And there are those who forbid even if there is no clinging fat on them. And the reason is that when the second taste of meat and milk enters the water they are immediately forbidden and return and forbid the bowls and the cauldron; and see in s.k. 5 the words of Ran. But when one of them — meaning the bowls or the cauldron — is not ben yomo, all the vessels are permitted: the one that is ben yomo is obviously permitted, for it received taste only from a vessel that is not ben yomo which is nat bar lichtmile; and the one that is not ben yomo is also permitted, for it received taste from noten taam bar noten taam and it is still heter since it is not ben yomo."]`,
    '3#ה': `["From absorption of a kli rishon. And Issur VeHeter wrote that there is no difference whether one rinsed bowls with bowls or spoons with spoons or ladles with ladles, and we do not say that what is used in a kli sheni does not forbid, end of his words. And it appears to me that specifically from stam we are concerned lest he used a spoon or ladle in a kli rishon, as in such a case regarding hagalah of vessels — they all require hagalah in a kli rishon; but if it is clear to him that he did not use a spoon or ladle, only a kli sheni within twenty-four hours, certainly it does not forbid b'dieved, and so is practiced, end of his words. Turei Chayim there din 13 and Bach challenged these words of the Rav, see there; even though his words appear correct, nevertheless it appears he too agrees that if it is clear to him that he did not use a spoon or ladle in a kli rishon or in pouring within twenty-four hours, it does not forbid b'dieved — and this is plain."]`,
    '3#ו': `["And the water — they treat it with prohibition l'chatchila. Since it is not food but mere water, it is like l'chatchila and we forbid it since it absorbed from spoiled prohibition; and so too Turei Chayim there din 14 in name of Issur VeHeter; but certainly from the halachah it is permitted to eat them with the type of the vessel that is ben yomo — for example if it is of meat, it is permitted to eat them with meat; and see above siman 94 seif 5 and what he wrote there."]`,
    '3#ז': `["But if both of them are ben yomo, etc. That which he needed to write this even though he already wrote 'and there are those who forbid' unless one of them is not ben yomo, etc. — one may say it teaches us: some say that if one rinsed meat bowls in the dairy cauldron itself, all is forbidden; rather, even if one rinsed a meat vessel and a dairy vessel together in one vessel, all is forbidden, for the water in the kli rishon emits and absorbs and becomes nevelah."]`,
    '3#ח': `["And so they practice. And likewise Maharshal in his responsa and in his book chapter 64; but if they were rinsed one after the other, it is actual like fish that were cooked in a meat pot which above is permitted."]`,
    '3#ט': `["And if one pours from a kli rishon, etc. For pouring is not like one vessel, etc. And in Turei Chayim there din 12 it appears explicitly that whether one pours from a well-scraped ben yomo meat vessel onto a dairy vessel, or whether one pours water that is neither of milk nor of meat onto meat and milk vessels together that have clinging fat on them — there is room to permit in a place of great loss or need; and when not in such a case one should forbid everything; and requires study why he did not write so here in the gloss; and see above s.k. 5 and s.k. 19."]`,
    '3#י': `["He pours, etc. And it is written in Turei Chayim there in name of Issur VeHeter that even when pouring from a forbidden vessel onto a permitted vessel, one forbids only the vessel onto which the pouring came, end of his words."]`,
    '3#כ': `["That are neither of meat nor of milk. Such as from a new pot, or that he did not use in it only vegetables and the like, or that it is not ben yomo — and it is simple."]`,
    '3#ל': `["For pouring is not like one actual vessel, etc. It is difficult for me, for it appears from the words of the Rav in the gloss siman 68 seif 10 that pouring cooks the measure of a peel; and so too Turei Chayim general rule 33 din 2 — and one must say that the Rav holds that although it cooks so much that poultry emits and absorbs, nevertheless a hard vessel does not absorb, for it does not emit and absorb at once like a hard vessel; however regarding the halachah it appears as Hagahot ShaDa siman 57 in name of Maharash and he brings it in Turei Chayim there — that they are forbidden, since we establish that pouring cooks, as will be explained in siman 105 s.k. 4; if so it is considered actual cooking and absorbs even in a vessel; and so is proven from the words of Mordechai and Hagahot Ashiri end of Avodah Zarah — that even for one who holds a kli sheni absorbs and emits, there is no reason to disagree regarding a vessel, as R' Chaim Cohen wrote: poultry slaughtered by nikur in a kli sheni are forbidden, and this is his language: and according to his words they would be forbidden in all vessels in which they pluck poultry because of blood that the poultry emits and is absorbed in the vessel, end of his words; if so, all the more for what we establish that pouring cooks — it cooks even for a vessel; and so too Maharshal in his book chapter 64. And these are his words: where they pour boiling water on bowls one must be precise and ask if there were food remnants, because pouring emits and absorbs the measure of a peel, end of his words. The Rav in Turei Chayim there also wrote that they did not practice to be lenient in this and one should be stringent where there is no great loss. And Issur VeHeter who permitted even with clinging fat on them — that is because he follows his view that pouring does not cook and does not emit and absorb even the measure of a peel, but only absorbs the measure of a peel of blood that one cooled, as he explained explicitly in his words; but for what we establish that pouring cooks the measure of a peel, it appears as I wrote. However, where they are clean, certainly there is room to permit because of noten taam bar noten taam, as it appears from the words of Maharshal; but where it is a vessel of prohibition where noten taam bar noten taam does not apply, it appears that even if clean it is forbidden, and requires study in this — for perhaps even cooking does not cook so much that it emits from the vessel and absorbs into the vessel; and accordingly also in meat and milk vessels where one is clean and one is not clean — the clean is forbidden and the not clean requires study whether we say that since the clean is nat bar lichtmile it returns and forbids the second each time he pours onto it, or we say pouring does not cook so much and one should be stringent with both where there is no great loss, for it appears that since it cooks it is considered actual cooking, as it appears in Hagahot ShaDa the old editions printed in Constantinople year 5285 (siman 33) that there is no difference, see there."]`,
    '4#_': `It appears to me, etc. This law is not found in any posek, and none of the Acharonim mentioned it even regarding ben yomo; on the contrary, it appears from the words of the poskim that there is no remedy to purge a ben yomo vessel unless there is in the water sixty against the vessel; and so is also proven from what Tosafot and Rosh wrote — if so, how can they make fit a large cauldron when there is not in the water sixty against it and the water become forbidden, etc.; and for their explanation it works out nicely that the water did not all become nevelah and a small amount of prohibition fell from the cauldron and was absorbed back, etc., and they purge it again and that small prohibition is nullified in sixty in the water, end of his words; and if it were so, the Torah did not come to teach except to purge each one its measure; and if because the water would become forbidden, behold there is a remedy of ash — and requires study.`,
    '5#_': `One does not place, etc. The taste in salt: kutach that falls on it is visible and is not nullified, and we are concerned lest one salt meat in it; but in vinegar the prohibition is not visible and it is nullified in sixty.`,
    '6#א': `["Permitted to place, etc. For they are careful that nothing falls from one to the other, unlike in seif 5 where it does not occur to him that kutach might fall into the salt and he would take from it for the dish."]`,
    '6#ב': `["And there are those who are stringent l'chatchila. Specifically when uncovered, as in seif 5; and so is stated in Hagahot Ashiri explicitly."]`,
    '7#_': `Salt placed, etc. There is no taste because it is noten taam bar noten taam, for salt is a sharp thing and makes it as if visible, as the Rav wrote in the gloss seif 2 and Mechaber siman 96 seif 3 regarding spice; rather the taste is that salt has no power to emit taste from a vessel, as below siman 105 seif 13; and accordingly, even in a forbidden bowl it is permitted.`,
  },
};

// Load export and fill remaining slugs with structured English from Hebrew via phrase pass + templates
import { polish095 } from './_yd001-translate-shared.mjs';

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>[^<]*<\/small>/g, (m) => m.replace(/<\/?small>/g, ''))
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function graTitle(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^([^(]+?)(?:\.|\s*\()/);
  const title = m ? m[1].replace(/כו'/g, 'etc.').trim() : h.slice(0, 40);
  if (h.includes('ליקוט')) return `(Lekut) ${title}`;
  return title;
}

function translateGraEntry(heb, raw) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]+)<\/b>\s*(.*)/s);
  if (m) {
    const title = polish095(stripHtml(m[1]));
    let body = polish095(stripHtml(m[2]));
    if (/^כנ"ל/.test(stripHtml(m[2]))) body = 'as above.';
    if (/^ע"ל/.test(stripHtml(m[2]))) body = body.replace(/^see above\.?/, 'see above.');
    if (body.length < 4 && /עכ"ל|ע"כ/.test(stripHtml(m[2]))) return title;
    return `${title} ${body}`.trim();
  }
  return polish095(stripHtml(heb));
}

function translateBeerFromHeb(heb) {
  const h = stripHtml(heb);
  if (/^מסקנת/.test(h)) return 'Conclusion of the Gemara there according to Rav — Chullin daf 118, as Tosafot and Rosh explained there from Rashi\'s language, and so too Tur.';
  if (/^הרמב"ם והרשב"א/.test(h) && !/בת"ה/.test(h)) return 'Rambam, Rashba, Ran, Ra\'avyah, his elder, and R\' Yitzchak.';
  if (/^הרמב"ם והרשב"א בת"ה/.test(h)) return 'Rambam and Rashba in Torat HaBayit.';
  if (/^תשובות הרשב"א/.test(h)) return 'Responsa of Rashba siman 276.';
  if (/^שם שקליפת/.test(h)) return 'There — that the shell of the egg is clearly perforated, and when a person cooks it he finds the egg itself colored from that color; and see above siman 86 seif 5 in the gloss.';
  if (/^טור בשם/.test(h)) return 'Tur in name of his father the Rosh, Ramban, and Rashba.';
  if (/^בית יוסף/.test(h)) return 'Beit Yosef; and as Rashba wrote regarding fish that came up in a bowl above seif 1 — because it is not comparable to fish that came up in a bowl, for here it is different since the bowls touch the cauldron and taste is emitted from one to the other and it becomes a second taste in prohibition; and further, when the second taste of meat and milk enters the water they are immediately forbidden and return and forbid the cauldron and the pan.';
  return polish095(h);
}

function translateTaz(heb) {
  return polish095(stripHtml(heb));
}

function translateShort(slug, heb, raw) {
  const h = stripHtml(raw || heb);
  if (slug === 'mateh-yehonatan' || slug === 'yad-avraham' || slug === 'yad-ephraim' || slug === 'rabbi-akiva-eiger-yd') {
    const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
    if (m) return `(${polish095(m[1])}) ${polish095(m[2])}`;
  }
  if (slug === 'nekudot-hakesef') {
    return polish095(h.replace(/סימן צ"ה/, 'siman 95'));
  }
  if (slug === 'kaf-hachayim') {
    const ordM = h.match(/^\(([א-ת])\)/);
    const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7' }[ordM?.[1]];
    return (ord ? `(${ord}) ` : '') + polish095(h.replace(/^\([א-ת]\)\s*/, ''));
  }
  return polish095(h);
}

mergeManual(MANUAL, '_manual-095-short.json');
mergeManual(MANUAL, '_manual-095-taz.json');
mergeManual(MANUAL, '_manual-095-gra.json');

const entries = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
for (const { slug, key, heb, raw } of entries) {
  if (MANUAL[slug]?.[key]) continue;
  if (!MANUAL[slug]) MANUAL[slug] = {};
  if (slug === 'beur-hagra') MANUAL[slug][key] = translateGraEntry(heb, raw);
  else if (slug === 'turei-zahav') MANUAL[slug][key] = translateTaz(heb);
  else if (slug === 'beer-hagolah') MANUAL[slug][key] = translateBeerFromHeb(heb);
  else MANUAL[slug][key] = translateShort(slug, heb, raw);
}

fs.writeFileSync(outPath, JSON.stringify(MANUAL, null, 2));
let hebCount = 0;
for (const m of Object.values(MANUAL)) {
  for (const v of Object.values(m)) if (/[\u0590-\u05FF]/.test(v)) hebCount++;
}
console.log('wrote', outPath, 'blocks', entries.length, 'with hebrew', hebCount);
