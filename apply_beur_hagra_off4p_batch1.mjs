import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(siman, seif){
  return brSegs(fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim());
}

// Off-by-4+ batch 1: three diff=4 cases.
// Each entry has `segs` = array of NEW translations to append.
const CASES = [

  // siman110/seif-001 (he=8, en=4, append 4)
  { siman:'siman110', seif:'seif-001', segs: [
    // HE[5]
    `And these, etc. He rules like the Rabbis against R' Meir; and in the dispute between the Sages and R' Akiva, he rules like R' Akiva — because it is a case of dispute-and-then-unattributed, as written there: "how so," etc.; and as written in the Yerushalmi there: "the loaves became known" — the mishnah of R' Akiva, [meaning] that R' Akiva [holds even] householder loaves; and the ruling follows the unattributed mishnah — as written in chapter HaCholetz (42b).`,
    // HE[6]
    `And some say, etc. Like R' Meir — since R' Yochanan and Resh Lakish dispute according to his view; and the Gemara sugya at the beginning of chapter Yom Tov and at the beginning of chapter 8 of Zevachim and in chapter Gid HaNashe and chapter HaArel follows his view and that of R' Yochanan. And Sefer HaTerumah ruled like Resh Lakish and the tanna of the litrot of dried figs in Zevachim and at the beginning of chapter Yom Tov there — that R' Yochanan and Resh Lakish dispute only according to R' Meir: R' Yochanan holds "that which is usually counted" — as R' Meir stated according to R' Yehoshua regarding the litrot of dried figs, that it is nullified; and Resh Lakish holds that terumah nowadays is different since it is rabbinic, as written in chapter HaArel (Yevamot 81a); and R' Yochanan holds according to his own view that terumah nowadays is biblical; and this is what is written there: "he said to him: no — I am teaching the case of the circle," etc. — which is the aforementioned baraita of litrot of dried figs pressed upon the circle, etc.; and there "he said to him: is it not so" — "do you think," etc.; and with this the difficulty of Tosafot there s.v. "it is different" — "and if you ask," etc. is resolved (Tosafot did not want to explain it so since they go according to their own approach, as written there s.v. "he said," etc.; and Rabbenu was careful about this in the supplement below, as written there: "at first glance it is difficult since," etc.); but according to R' Yehudah according to R' Yehoshua they do not dispute; and the ruling follows R' Yehudah against R' Meir; and Rav Pappa established the mishnah of Zevachim there according to him, and likewise the baraita at the beginning of Yom Tov; and Semag who ruled like R' Yochanan holds that since R' Ashi established it in a different manner, it implies he does not hold like him — and this is not compelling, since he wants to establish it even according to the Rabbis; and in chapter Gid HaNashe 97b: "to say that he gives the reason," etc. — and he did not establish it as "it was itself mixed in" (see Ramban and Rashba there; and our Rabbi requires study) — implies that it was not nullified; and likewise it is ruled in Tur and Shulchan Arukh siman 86 seif 3.`,
    // HE[7]
    `(Supplement) See what I wrote there — that what Sefer HaTerumah wrote, to rule [regarding] anything usually counted even in rabbinic [prohibitions]: from the sugya at the end of chapter HaArel — what is written there "he said to him: no, I am teaching the case of the circle," etc. — meaning: the mishnah of chapter 4 of Terumot, where R' Eliezer and R' Yehoshua do not dispute, that a circle upon circles goes up — and that [mishnah] follows R' Meir, as written at the beginning of chapter Yom Tov; and necessarily one must say it is because terumah nowadays is rabbinic; "he said to him: is it not so," etc., "do you think," etc. — therefore there it goes up according to R' Meir; and R' Yehudah who disputes there at the beginning of Yom Tov according to R' Yehoshua holds it does not go up, because he holds "that which is usually counted"; and likewise their dispute regarding a piece — and as Tosafot wrote (in Yevamot) there s.v. "R' Yehudah," etc.; and this is what is written "is it not so that I am teaching," etc.; and there it is definitely not because of the rabbinic [prohibition] but because of "et" and "all" — and likewise with circles; and he ruled like R' Yehudah because between R' Meir and R' Yehudah the ruling follows R' Yehudah; but this is not sufficient, since where an unattributed mishnah is like R' Meir, the ruling follows R' Meir — since an unattributed mishnah, etc. (as written in Yevamot 42b) — and as the Rif wrote in chapter Kol HaKelim; and perhaps he ruled like Resh Lakish because the sugya at the beginning of Yom Tov (and at the start of chapter 8 of Zevachim) follows Resh Lakish, who says "this tanna," etc. — even in rabbinic [cases], etc. — and this follows Resh Lakish who holds the reason of R' Meir is because it is rabbinic; but according to R' Yochanan he holds it is biblical — like Rambam's explanation that all fruits are biblical except vegetables, unlike Rashi and Tosafot; nevertheless the question stands: why did he rule like R' Yehudah that even in rabbinic [cases] it is not nullified? And furthermore, in the final conclusion of Yevamot there — "whose [view] is this? The Rabbis; and I say it follows R' Yosi" — even according to R' Yochanan this seems difficult: since R' Yochanan holds like the Rabbis, why was he compelled to establish the case of the circle according to R' Yosi? Rather, in the final conclusion it certainly follows the Rabbis; and what is written "and I say," etc. is regarding the mishnah of Yevamot — which explicitly records R' Yosi; and what is written "is it not so that I am teaching" — according to Resh Lakish he says that from this mishnah there is no proof, since their dispute is about "et" and "all" as in a piece; but in truth, both in rabbinic and biblical [cases] their dispute depends on "et" and "all"; and this is what is written at the beginning of Yom Tov (and at the start of chapter 8 of Zevachim): "this tanna — even in rabbinic [cases]" — for in truth the unattributed mishnah follows the Rabbis that it is rabbinic, and even so it was not nullified according to R' Yehudah (end). (And the matter of "something important," etc. — see above siman 101 paragraph 6.)`,
    // HE[8]
    `Wherever it is, etc. And proof from the laws of chol ha-mo'ed.`,
  ]},

  // siman141/seif-003 (he=11, en=7, append 4)
  { siman:'siman141', seif:'seif-003', segs: [
    // HE[8]
    `But one may not keep them. It appears [this applies] specifically to [images of] the sun and moon — as written there: "but R' Gamliel — [his] was an individual's [property]," etc.; but regarding a dragon in our times there is no concern of suspicion at all.`,
    // HE[9]
    `And some are stringent, etc. So it is implied from Tosafot and the Tur. Beit Yosef — and his words are astonishing; and Shach already marveled at them.`,
    // HE[10]
    `(Supplement) And some are stringent, etc. So wrote Beit Yosef, saying it is implied from Tosafot and the Tur; but this is astonishing — for even according to the latter view, whenever it is known that the image is not worshipped it is permitted; and all the more so since he ruled according to the first view; and likewise in the gloss in seif 1; and see Shach (end). And the form of a dragon, etc. Gemara there: "rather, one who makes," etc.; and what is written "except that it is forbidden," etc. — that is according to the latter view, and as above — unlike Shach.`,
    // HE[11]
    `(Supplement) And the form of a dragon, etc. — "except," etc. The Rosh there and the Tur; and what is written "it is permitted to make it" — Gemara there; and what is written "except," etc. — there: "Shanena, remove," etc.; and Tosafot there s.v. "it is different" explained in the name of BaHaG: regarding the form of a dragon; and the meaning is: because of the suspicion that it was worshipped — making it is permitted; and the suspicion one might think [applies to] the images of the dwelling, etc. — which is forbidden to keep — is because of the suspicion of [having been] made [for worship]; and see Tosafot there s.v. "but" — "and it was not," etc. — meaning the questioner thought it was not a dragon, and it answers: because of the suspicion of idolatry — and regarding a dragon; and see what I wrote in seif 4 (end).`,
  ]},

  // siman341/seif-005 (he=8, en=4, append 4)
  { siman:'siman341', seif:'seif-005', segs: [
    // HE[5]
    `(Supplement) And all the more so it is forbidden, etc. For the first tanna and Rabban Shimon ben Gamliel dispute only regarding Shabbat; and even in this the decisors ruled like the first tanna, as above (end).`,
    // HE[6]
    `And some say, etc. Meaning: anything that is by way of sitting and not acting is considered any form of joy.`,
    // HE[7]
    `(Supplement) And some say it is forbidden, etc. And what is written regarding David "and he washed and anointed himself," etc. — that is different, since a king is permitted to wash, as written regarding Yom Kippur (at the beginning of chapter 8 of Yoma): "the king and the bride," etc. Torat Ha'Adam; and there are further explanations there, and in the name of Raavad — see there (end).`,
    // HE[8]
    `(Supplement) And some say, etc. And from what is written in Alfasi chapter 8 that R' Akiva removed his tefillin — the same applies to all of those which are by way of sitting and not acting; and see Rosh (end).`,
  ]},

];

let ok = 0, fail = 0;
for (const { siman, seif, segs } of CASES) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== segs.length) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} expected=${segs.length} he=${heS.length} en=${enS.length}`);
      fail++; continue;
    }
    const newSegs = [...enS, ...segs];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} append=${segs.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+${segs.length} → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
