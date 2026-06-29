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

// Off-by-2 batch 2 (cases 11–20).
const APPEND_2 = [

  // siman142/seif-010
  // HE[N-1]: (ליקוט) אם גוזל כו' ... ויש אוסרין כו'. כתי' שני של תוס'...
  // HE[N]:   (ליקוט) ויש אוסרין כו'. קאי ארישא...
  { siman:'siman142', seif:'seif-010',
    prev:`(Supplement) If one robs, etc. Specifically when there is no other path — as written there; and as written in seif 9; and it requires study why they omitted this (end). And some forbid, etc. The second explanation of the aforementioned Tosafot (and likewise implied in the Yerushalmi — see there); and see the Remez in tractate Avodah Zarah there seif 5.`,
    last:`(Supplement) And some forbid, etc. It refers to the first clause regarding what follows; and see what is written there; and Tosafot in Pesachim 26a s.v. "it is different," etc. — and it appears that from this Mordechai there learned that something not [used] in its normal manner is permitted ab initio; but the Rosh there wrote that it is nonetheless rabbinically forbidden; and so wrote other authorities; and so Tosafot in Avodah Zarah 12b (s.v. "rather," etc.) wrote; and one must say that onion was not subject to the rabbinic decree; and these two views depend on the reasoning that Tosafot wrote in Avodah Zarah there 12b — and see Tosafot 43b s.v. "he said to him," etc. (end).` },

  // siman149/seif-002
  // HE[N-1]: ומ"מ מדת כו'. עבס' חסידים:
  // HE[N]:   וע"ל סי' קמ"ב. ס"ט:
  { siman:'siman149', seif:'seif-002',
    prev:`And nonetheless, the attribute of, etc. See Sefer Chasidim.`,
    last:`And see above, siman 142. Seif 9.` },

  // siman157/seif-001
  // HE[N-1]: כ"מ כו'. סנהדרין ס"א וכרבא:
  // HE[N]:   (ליקוט) כ"מ שנא' יהרג כו' ופטור...
  { siman:'siman157', seif:'seif-001',
    prev:`Wherever it is said, etc. Sanhedrin 61 — and like Rava.`,
    last:`(Supplement) Wherever it is said "let him be killed," etc., and he is exempt. Like Rava in Sanhedrin who says he is exempt; and the first explanation in Tosafot there; but the Raem explained the second explanation — that it was never done for the sake of idolatry but only out of love or fear of a person, such as the statue of Andarta and of Haman — for according to the first explanation it is difficult: the mishnah teaches "one who bows [prostrating himself] etc." even though he intends to shame it, and "one who throws [a stone]," etc. even though he intends to stone it. Hagahot Maimoniyot chapter 3, paragraph 2 — see there; and the Rivash resolved the difficulty and Kesseph Mishneh cited him — see there (end). And specifically when he cannot escape, etc. — even if it began under compulsion, as written at the end of chapter 4 of Ketubot (51b): "these women who were seized," etc. — certainly they let themselves go eventually, etc. The Rivash (end).` },

  // siman162/seif-001
  // HE[N-1]: יש מי כו'. שם ע"ה א' אר"י א"ש זו כו' ...
  // HE[N]:   (ליקוט) יש מי כו'. כפירש"י וש"פ ...
  { siman:'siman162', seif:'seif-001',
    prev:`There are those who, etc. There 75a: R' Yitzchak said in the name of R' Shmuel: this, etc.; and see Rashi there s.v. "they borrow," etc., and Tosafot s.v. "and according to the words," etc.; and so the view of other authorities; but the Rif wrote specifically regarding the price, etc., as in a se'ah-for-se'ah [exchange], and likewise the view of Rambam.`,
    last:`(Supplement) There are those who, etc. According to Rashi's explanation and other authorities; and Hagahot Ashiri there s.v. "without," etc. wrote that according to Rif it is forbidden; and likewise implied from the words of Rambam and Shulchan Arukh who omitted it; and so Beit Yosef wrote; but in Milchamot he wrote that even the Rif concedes in this case — as written there; and "according to the words of Hillel — even, etc." — implied that the Rabbis disagree with him; and Beit Yosef explained that it means when he has [the money] or the market price has been established; and in Milchamot he wrote that the Geonim explained like the Rif's explanation — this view, etc.; but another sage, etc. — not only when he has it is it permitted, but even if he does not have it, it is permitted if the market price has been established; and to exclude the view of the Baal Halakhot who wrote even if the price had not been established; and from the language of R' Chananel which Milchamot cited it is implied like Hagahot Ashiri and Beit Yosef aforementioned, who wrote: "this [is] the words of Hillel who forbids even lending a loaf when he has [the means]"; and the other sages say: "not only until my son comes is it permitted, but even on the market price [it is permitted]" (end).` },

  // siman178/seif-001
  // HE[N-1]: וכ"ז כו'. כמו בערקתא דמסאנא הנ"ל... [very long]
  // HE[N]:   (ליקוט) וכ"ז כו' ולכן אמרו כו'. כבר כתבתי... [long]
  { siman:'siman178', seif:'seif-001',
    prev:`And all this, etc. Like the aforementioned case of the shoelace; and see Shach paragraph 3; and as Rashi wrote in Sanhedrin there s.v. "shoelace," etc. — such as when there is, etc.; and likewise one can explain the Rif's aforementioned words; and likewise the case of the turban — as the Arukh wrote: a meaning of "red garment, like a rooster's crest," since the daughters of Israel were not accustomed to cover themselves with it as it is licentiousness, etc.; and proof that in Me'ilah 17 [a] it says "and he went and had his hair cut in the manner of the gentiles" and it does not say he wore their garments. Or in a matter, etc. As written in Torat Kohanim there: "the statutes which are engraved for them" — meaning a statute is a matter without reason, as written in chapter 6 of Yoma (67b): "and My statutes," etc.; and as Rashi wrote in the portion of Kedoshim: "statutes — these are royal decrees that have no reason"; and Ramban wrote: certainly there is reason for them but their reason is not revealed, like a royal decree which the king enacts in his kingdom without revealing their benefit to them; and likewise all those listed at the end of chapter 6 of Shabbat and chapter 7 in the Tosefta are of this kind; and as stated in the Gemara there — "granted, loading with stones," etc.; and there 24 it is stated that something for which there is a medicinal purpose is not, etc.; and this is what is written "but," etc.; and likewise that they do, etc.; and as written in the Tosefta there: "one who says 'do not separate between us lest you separate our love' — there is in it [the practice] of the ways of the Amorites; but if it is for the sake of honor, it is permitted"; and even though the Amorites became accustomed to them, nevertheless it is permitted. Maharik; and so wrote Ran in chapter 1 of Avodah Zarah from what is written there: "they burn for kings," etc. — because the Torah forbade only the statutes of idol-worship and matters of vanity, all of which have a connection to idol-worship; but matters with reason are permitted; and in burning for kings there is reason to burn in their honor so another should not use their things, etc.; and this is what is written "therefore they said," etc.; and likewise in the Gemara there 11a: "and if it is a statute," etc. — "but everyone, etc." — "rather, it is honor," etc.; but in Sanhedrin 52b it implies the opposite, as it says there: a baraita — R' Yishmael said to him, etc.; and the Rabbis, etc. — is it not so that even though there is a great reason — the manner of death — it is nevertheless forbidden; and it says there "if not for that," etc. — "rather," etc. — implying that otherwise it is forbidden; and see Tosafot there s.v. "rather," etc., and in Avodah Zarah there s.v. "and if," etc.; and the substance of their words is that there are two types of statute — one for the sake of idol-worship and this is forbidden even if written in the Torah; and one in matters of vanity and nonsense, and this is permitted only if written in the Torah; and according to this, what is said there "rather, it is honor" — it is not because there is reason in the matter, as Ran says, therefore it is permitted — rather, it means a statute of theirs imposed upon an important person to burn for them; and not because of idol-worship; and therefore it is stated correctly in Sanhedrin that "if not for that," etc., and one must say to explain the words of Maharik that on the contrary, what has no reason — but nevertheless since it has no taste of idol-worship it is permitted when written in the Torah; and from the words of Ran it is very difficult; and likewise the Rav's words are difficult.`,
    last:`(Supplement) And all this, etc. "therefore they said," etc. I have already written that the words of Ran are difficult, and also the words of Maharik do not appear [correct] from what is written in Sanhedrin 52: a baraita — R' Yishmael said to him, etc. — and that a sword has reason; and even though I strained to reconcile their words, it does not appear correct in terms of practical ruling; and likewise "they burn for kings" — certainly there is reason, as Ran wrote, and yet it raises the difficulty "if not for that," etc. — rather, it is established that all of it is forbidden except specifically learning from them — as written there "since it is written 'do not follow their statutes' — we do not derive from them"; and it is not specifically because it is written in the Torah, rather [the meaning of] "since it is written" — we do not derive [anything] from them at all; but regarding garments it is fine — for we would wear that garment even without them, it is permitted; and likewise with any garment; but any garment that is specific to them is forbidden, as the Rif aforementioned plainly stated — even a shoelace, etc.; and certainly because of one lace it is not for licentiousness; and this is what is written in the Sifrei aforementioned "since they go out," etc.; but a garment we would wear regardless is permitted; and therefore none of Maharik's aforementioned proofs are difficult, since [those garments] were not specific to them alone; and likewise the Rambam [wrote]: "specific to them"; and likewise in all cases; and the words of Maharik do not appear [correct] at all (end).` },

  // siman199/seif-001
  // HE[N-1]: (ליקוט) ולסרוק כו' וכן כו'. דחפיפה אינה אלא בראש...
  // HE[N]:   וכן צריכה כו'. שם דאורייתא עיוני כו' א"נ כו'...
  { siman:'siman199', seif:'seif-001',
    prev:`(Supplement) And to comb, etc. — and likewise, etc. For combing applies only to the head — as written [in Nazir 42a and elsewhere]: "a Nazirite combs and separates," etc.; and in chapter 2 of Beitzah (27b) and elsewhere: "Hillel combed his head"; and in chapter 3 of Yom Tov (27b) and elsewhere; and likewise implied in Bava Kamma there that it is biblical, etc. — "and what is it? Hair." Ran (end). That she not, etc. The Gemara there.`,
    last:`And likewise she must, etc. There — it is biblical: "inspection," etc. — or alternatively, etc.; and this reason applies throughout the body; but combing — which is a rabbinic enactment of Ezra — Tosafot explained in the name of R' Tam that it applies only to the hair, and they brought several proofs; and see Tosafot there s.v. "and that she be," etc., and in Niddah 66b s.v. "if," etc., and in Chullin 10a s.v. "until," etc.; and the Rosh at the end [of the tractate]; and so wrote Rashba and other authorities; and they wrote: but inspection is required biblically; but Rashi wrote that the whole body requires combing; and Tosafot and Ran wrote that nevertheless even according to Tosafot's explanation they were accustomed to combing and washing the whole body — from what is written "and if found upon her" — implying throughout the body, and it depends on combing if close [to the immersion], etc.; and likewise there 68a: "my beloved has lacked," etc.; and see Tosafot in Bava Kamma s.v. the aforementioned, and in Niddah s.v. the aforementioned, who wrote "and even though we compare," etc.; and this is what is written "and she should comb her entire body and wash," etc. — and first he wrote the law: "a woman must inspect," etc.; and afterward he wrote stringently: "and she should comb," etc.; and see Taz. Close to immersion. The Gemara there: "and R' said: one who immersed and came up," etc.; and the reading of the Rif is the reverse — version [aleph-bet] first: what is the difference between them? [Version] aleph: close to the combing — immerse; and Ran explained that according to the latter version one must immerse close [to combing]; and we rule like the latter version; and so it was ruled in the Gemara 65a: "and the ruling is: she combs [etc.]"; and according to the interpretation of the She'iltot with which all the decisors agreed; and see above seif 3.` },

  // siman201/seif-001
  // HE[N-1]: ואם רחב כו'. עי' ביומא ע"ח א' ובזה מתורץ קושית תוספות...
  // HE[N]:   וצריך (שיהיה) כו'. תוס' שם ד"ה ברום כו':
  { siman:'siman201', seif:'seif-001',
    prev:`And if it is wide, etc. See in Yoma 78a; and with this the difficulty of Tosafot in Pesachim 109b s.v. "an amah" is resolved; and likewise implied in Rivash siman 292 in the words of the questioner in the name of Tosafot.`,
    last:`And it must (be), etc. Tosafot there s.v. "at the height," etc.` },

  // siman239/seif-001
  // HE[N-1]: יהודי כו' הואיל כו'. ע"ל סי' רל"ב סי"ד בהג"ה וכ"ז לא כו' ולכן כו':
  // HE[N]:   (ליקוט) יהודי כו' כמ"ש בגטין מ"ו א' ורבנן התם כו' ... (English already mixed in from garbled MT)
  { siman:'siman239', seif:'seif-001',
    prev:`A Jew, etc. since, etc. See above siman 232 seif 14 in the gloss; and all this not, etc.; and therefore, etc.`,
    last:`(Supplement) A Jew, etc. As written in Gittin 46a, and the Rabbis there, etc.; and see above siman 232 seif 14 in the gloss; and likewise seven royal sons were hanged for this (see Yevamot 79a) (end).` },

  // siman240/seif-024
  // HE[N-1]: (ליקוט) י"א כו'. מכות י"ב א' ל"ק הא בבנו כו' וערש"י שם (ע"כ):
  // HE[N]:   ואינו נ"ל. ומגמ' דסוטה מ"ט א' ראיה למהרי"ק...
  { siman:'siman240', seif:'seif-024',
    prev:`(Supplement) Some say, etc. Makkot 12a: "there is no difficulty — this [refers to] his son," etc.; and see Rashi there (end).`,
    last:`And it does not appear correct to me. And from the Gemara in Sotah 49a there is proof for Maharik; and it appears to me that regarding a maternal grandfather one is exempt — and as written in Bereishit Rabbah chapter 94: "sons of daughters," etc.` },

  // siman259/seif-001
  // HE[N-1]: שמא כו'. רפי"ג רכתובות (ק"ו ב') וז"ש אבל כו':
  // HE[N]:   (ליקוט) ואין נושאין כו' אבל כו'. דאמרינן בב"מ ע' א' א"ל רבה לרב יוסף... (English already mixed in)
  { siman:'siman259', seif:'seif-001',
    prev:`Lest, etc. Beginning of chapter 13 of Ketubot (106b); and this is what is written "but," etc.`,
    last:`(Supplement) And one does not marry, etc. "but," etc. For we say in Bava Metzia 70a: Rabbah said to R' Yosef, etc. — he said to him "I will challenge," etc. — meaning: orphans' money and consecrated property follow one law, as written in chapter 8 of Bava Kamma "we have the hand," etc. — R' Yitzchak said to R' Ashi: orphans, etc. — and just as they do not profit from the property of the poor, likewise from orphans; he said to him: "we examined," etc. — it is money for money; but R' Elazar said: "we see," etc. — meaning we give him [the funds] so that the principal remains and he eats from the profit; and likewise regarding the poor; and see Etz Chaim siman 46 (end).` },

];

let ok = 0, fail = 0;
for (const { siman, seif, prev, last } of APPEND_2) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== 2) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} (expected 2, he=${heS.length} en=${enS.length})`);
      fail++; continue;
    }
    const newSegs = [...enS, prev, last];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+2 → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
