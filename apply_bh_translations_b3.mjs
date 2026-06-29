/**
 * apply_bh_translations_b3.mjs — Batch 3: remaining he=3–7 beer-hagolah files (19 total)
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function en(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beer-hagolah', 'en.html'); }

const TRANS = [
  // ── he=3 cases ──
  ['siman109','seif-001',[
    'From the implication of the Gemara, Chullin daf 99–100 and Zevachim daf 72 and Beitzah daf 7 — Tosafot, Rosh there, Rashba in Torat HaBayit, and other later authorities wrote that there is not even a rabbinic prohibition. Tur in the name of Sefer HaTeruah.',
    'Rashba.',
    'Semag, from the words of Tosafot there in Chullin.',
  ]],
  ['siman139','seif-001',[
    'Mishnah, Avodah Zarah daf 40, daf 49, and daf 51; and the Gemara there.',
    'Mishnah there, daf 51; and in the Gemara, daf 52, it is derived from scriptural verses. Clear there in the Gemara.',
    'Statement of Rav Ashi bar Chiyya there, daf 51.',
  ]],
  ['siman139','seif-012',[
    'This too is there, in Tosafot, daf 50.',
    'Tur in the name of Ramban.',
    'There, in the name of Rabbenu Yona; and so wrote Tosafot there, as did Rashbam in the name of Rashi — because we rule like the Sages who disagree with Rabbi in the mishnah of daf 53, that in the case of one who sold or pledged it, there is no nullification; and the same applies to the accessories of idolatry.',
  ]],
  ['siman145','seif-009',[
    'Statement of Rabbi Yochanan, Avodah Zarah daf 54.',
    'Dispute of the tannaim there; and the Tur ruled like the one who permits.',
    'Rambam in chapter 8 [ruled] like the one who forbids (as do Ran and Rabbenu Yeruham).',
  ]],
  ['siman165','seif-001',[
    'Query of Rava to Rav Chisda, resolved in Bava Kamma daf 96; Rashi explained: one who lends his fellow a certain quantity of merchandise based on a coin value specified to him. The Tur quoted: one who lends his fellow a sum of coin.',
    'Statement of Rav Ashi there.',
    'There, following the incident of Rav Papa and Rav Huna son of Rabbi Yehoshua, etc. — and it is upon this that Rav Chisda resolved: he gives him the coin currently in circulation, since when they added a fifth, any appreciation in terms of bullion is calculated against the loss of melting and the goldsmith\'s fee — the Rosh. Rif and Rosh; and so wrote Rambam in chapter 4 of Laws of Loans; and so wrote Sefer HaTeruah in part 8.',
  ]],
  ['siman189','seif-022',[
    'There — because the guest came at his usual time.',
    '(°) And Rashi explained: because this guest who returned came on the twentieth at the first [scheduled] time.',
    '[As to] the one expected to come: since it has already been uprooted from her — even though it had been established for two times, it is uprooted by one time — as Rav Papa resolved the mishnah, and a baraita is taught in accordance with his view, there.',
  ]],
  ['siman231','seif-001',[
    'The Tur\'s language, from the responsum of his father the Rosh, principle 10; Beit Yosef cited it at the end of siman 228 together with other responsa on this matter.',
    'I cited this above at the beginning of siman 228; see there.',
    'There and there in a responsum; and so wrote Tosafot in Beitzah daf 5a; and in the responsa attributed to Ramban, siman 277.',
  ]],
  ['siman294','seif-026',[
    'From Rambam\'s words in chapter 10 of Laws of Forbidden Foods, from the mishnah at the end of tractate Orlah; and as Kesef Mishneh and Beit Yosef wrote.',
    '(°) Because it is evident that they are garden fruits and there is only one doubt — Ran.',
    '(°) Meaning: even to gather by hand; and as Kesef Mishneh and Beit Yosef wrote, per Rambam\'s view in the next seif.',
  ]],

  // ── he=3, en=1 (all content merged, need split) ──
  ['siman142','seif-011',[
    'Rambam\'s language in chapter 16 of Laws of Forbidden Foods, regarding orlah wood and kilayim of the vineyard.',
    '(°) Meaning: even ab initio; not so on coals — ab initio it is forbidden, as above seif 1, and after the fact permitted, as below seif 6.',
    'It does not appear so from Beit Yosef — rather this too is permitted only after the fact; investigate.',
  ]],

  // ── he=4 cases ──
  ['siman140','seif-001',[
    'Mishnah, Avodah Zarah daf 44.',
    'From the ruling in Zevachim, cited below.',
    'Following the statement of Rav: a ring used for idolatry that became mixed among a hundred, etc. — Zevachim daf 74.',
    'Statement of Rabbah bar Avuha in the name of Rav Nachman, etc. — there. I cited this above in siman 110, seif 7; see there.',
    'Rambam in chapter 7 of Laws of Forbidden Foods; explaining what Rav Nachman said: \'one fell, etc.\' — meaning: one of the pair.',
  ]],
  ['siman152','seif-001',[
    'Baraita of Rabbi Yishmael, Avodah Zarah daf 8, derived from the verse \'and he will call you and you will eat of his sacrifice\' — Scripture treats his eating as if he had eaten sacrifices of the dead from the moment of the invitation. Statement of Rav Papa there.',
    'Conclusion of the Gemara there.',
    'Statement of Rav Papa there.',
    'From the incident of Rav Yitzchak, etc. — there.',
  ]],
  ['siman171','seif-001',[
    'Baraita, Bava Metzia daf 72.',
    'There in the baraita, following Rabbi Yose.',
    'Statement of Rava there.',
    'Tur in the name of Ramah; and this is also the view of Rambam in chapter 5 of Laws of Loans; and it appears to be the view of the students of Rashba.',
  ]],
  ['siman175','seif-007',[
    'There in the mishnah, daf 72b (and Rambam\'s language, chapter 9, halacha 4). There in the mishnah, following the first opinion.',
    'Following Rav Papa there.',
    'There.',
    'From what Rav Acha son of Rava said to Rav Ashi, etc. — following Rashi\'s interpretation there.',
  ]],
  ['siman228','seif-001',[
    'Statement of Rava in the name of Rav Nachman: \'the law is that we open [the way for annulment] through remorse, etc.\' — Nedarim daf 22b; and so ruled the Rosh there and Rambam in chapter 6. Statement of Rabbi Chiyya bar Abba in the name of Rav Amram, Bekhorot daf 36–37; cited by the Rosh in chapter 4 of Nedarim.',
    'Tur, from the statement of Ravina there; and so ruled the Rosh in his rulings and Rabbenu Yeruham in the name of Ramah.',
    'There, from the Jerusalem Talmud.',
    'There; and the Rosh in his rulings — from what we say in Bekhorot daf 37a: \'like whom?\' — Rav Nachman said: \'like me.\' And who in these generations has learned and understood like Rav Nachman?',
  ]],
  ['siman280','seif-001',[
    'Rambam\'s language, end of chapter 9 of Laws of a Torah Scroll, from the statement of Rav Ze\'iri, etc. — Rav said, Menachot daf 31a. There, in the name of Rava, following Rambam\'s interpretation in chapter 9 of Laws of a Torah Scroll.',
    'It was a query there and was not resolved; he understands from this that it is forbidden only rabbinically, and a doubt is treated leniently. Alternatively, he interpreted the query as whether one may read from it without sewing — and since it was not resolved, he ruled stringently that it must be sewn. So is the reading of Rambam and the Rosh.',
    'There in the Gemara.',
    'Rambam\'s language there; and likewise the Rosh, Tur, and Maharik in root 123.',
  ]],

  // ── he=5 cases ──
  ['siman140','seif-001', null], // duplicate entry removed — it's already above with 5 segs
  ['siman283','seif-001',[
    'Baraita, Bava Batra daf 13–14.',
    'There in the baraita.',
    'There; and per Rambam\'s textual reading in chapter 7 of Laws of Torah Scrolls; and so wrote the Tur. There and there, Rambam concluded: the law of surplus is like the law of a deficiency — that is, any surplus is as if removed, and another [letter] is beside it — and therefore the Torah scroll is deficient and invalid.',
    'There and there, from the implication of the Gemara: \'the people of Galilee sent to him, etc.\' — Gittin daf 60a.',
    'Rashba in a responsum: [addressing the case] if they were made as a scroll and then repaired.',
  ]],

  // ── he=6 case ──
  ['siman224','seif-001',[
    'Mishnah, Nedarim daf 47b.',
    'There.',
    'There.',
    'There in the mishnah: that the returning exiles of Babylonia declared them ownerless for all Israel.',
    'There in the mishnah; and so ruled Rambam in chapter 7 of Laws of Vows. There in the mishnah, as Rav Sheshet interpreted it in the Gemara there.',
    'Ran there, following Rabbi Elazar ben Yaakov, whose view we rule — and he questioned Rambam: in the said chapter, regarding partners who vowed from one another, Rambam ruled like Rabbi Elazar ben Yaakov, but in the preceding law he ruled like the Sages. Ramban already challenged this, and so wrote Rabbenu Yeruham in the name of some authorities. See the next siman and what I cited there; and see Taz for what he wrote to reconcile Rambam\'s words.',
  ]],

  // ── he=7 cases ──
  ['siman138','seif-001',[
    'Mishnah, Avodah Zarah daf 74 — Rashi explained: it is customary to put a little wine into it to dispel the pitch fumes. There in the Gemara and in the baraita, as explained there.',
    'Following the latter version of Rava and the incident of Rav there. Rambam, chapter 11 of Laws of Forbidden Foods, explained there: through soaking for three days, as explained above in siman 135, seif 12; and so wrote Rashba. There in Rambam.',
    'There in the mishnah, following the Sages.',
    'Tur; and so wrote in Sefer HaTeruah.',
    'There in Sefer HaTeruah.',
    'Mishnah there, as the Rosh explained in his rulings and the Rashba in Torat HaBayit. Rambam there; and other later authorities.',
    'Tur in the name of Rabbeinu Tam; and his father the Rosh also agreed.',
  ]],
  ['siman213','seif-001',[
    'Baraita, Shevuot daf 25a and Nedarim daf 14b.',
    'Mishnah, Nedarim daf 14b, following the resolution of Ravina there, daf 15a. The Tur\'s language.',
    'Following the resolution of Ravina; and I cited this above.',
    'Rashba in a responsum.',
    'Mishnah, Nedarim daf 13b.',
    'There in the Gemara, daf 14 and daf 15.',
    'Resolution of Rav Yehuda there, daf 14b; and the Rosh and Ran explained that it is as if he said \'my mouth shall be forbidden to my speech, etc.\' — and if so, all the more so when he said so explicitly.',
  ]],
];

let ok=0, skip=0, fail=0;
for (const entry of TRANS) {
  if (!entry || entry[2] === null) continue;
  const [siman, seif, segs] = entry;
  const enPath = loc(siman, seif);
  const hePath = enPath.replace('en.html','he.html');
  if (!fs.existsSync(hePath)) { console.log('NO HE:', siman, seif); fail++; continue; }
  const he = fs.readFileSync(hePath,'utf8').replace(/^﻿/,'').trim();
  const heSegs = brSegs(he);
  if (heSegs !== segs.length) {
    console.log('SEG MISMATCH', siman, seif, 'he='+heSegs, 'trans='+segs.length);
    skip++; continue;
  }
  const newEn = en(segs);
  if (DRY) { console.log('DRY OK', siman, seif, segs.length+'segs'); ok++; continue; }
  try { fs.writeFileSync(enPath, newEn, 'utf8'); ok++; }
  catch(e) { console.log('WRITE FAIL', siman, seif, e.message); fail++; }
}
console.log(`\nDone: ${ok} written, ${skip} skipped (seg mismatch), ${fail} failed.`);
