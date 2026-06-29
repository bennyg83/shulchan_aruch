/**
 * apply_beur_hagra_he2_b2.mjs — Batch 2: beur-hagra he=2 cases, h2len 87–200
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function join(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function he(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }

const TRANS = [

  // h2len=94 — existing EN[1] is correct; split into 2
  ['siman57','seif-017',[
    '<b>An animal, etc.</b> Mishnah 43 — unlike Rashi.',
    '<b>(Supplement) An animal, etc.</b> And Rashi disagrees there, 43b; and as stated above in siman 33; and Rashba agreed [with the ruling], unlike Rashi in this matter. (End.)',
  ]],

  // h2len=96
  ['siman344','seif-008',[
    '<b>One who is cut, etc.</b> Eliyah Rabbah, chapter 1. (End.)',
    '(Supplement) Seif 4, seif 5, seif 6, and seif 7: see Rosh, chapter 3 of Mo\'ed Katan, siman 135. Seif 8: see there, siman 141. (End.)',
  ]],

  // h2len=99 — HE[2] has 2 sub-entries (joined with \n in one segment)
  ['siman160','seif-017',[
    '<b>Things of, etc. up to a fifth.</b> There: "lend me a hundred peppercorns, etc." — and he explains that [the borrower] had not stipulated at the outset; and what it says "a hundred and twenty" are the words of the Gemara, but that is not what is implied [from the text]. And that is the meaning of "in the gloss, some explain, etc." And Rambam\'s inference is that [the case is] specifically without a fixed [price] — from what it says "to borrow" (llvt) and not "to lend" (l\'halvot). Kesef Mishneh.\n<b>Provided, etc.</b> Tosafot there, s.v. "a gift, etc."; and so holds Ramban, who supports the first reasoning — and as Kesef Mishneh wrote in his name: "from Rambam\'s words [it follows] specifically when he borrowed without qualification; and Ramban added that [it is] specifically in meal-related transactions and a small amount — and the same applies to members of a group who are not particular with one another; and specifically when no fixed [price] was set." And Shmuel\'s intent was: "it is possible that at repayment I will repay you one hundred and twenty, since I am not particular about counting them precisely — and it is appropriate, for this is my honor, even if I added up to a fifth." But Rambam\'s words, where he made no mention [of anything] at the time of the loan, must be as I said above — and this is forced. And it appears that Rambam explains that what it says "one hundred and twenty" teaches the law: that even if I return one hundred and twenty to you, it is permitted; and that is the meaning of "and it is appropriate."',
    '<b>(Supplement) Provided, etc.</b> From the incident of Rav Mari; and see Tosafot, 73b, s.v. "for an unspecified [loan], etc."; and see Sefer HaTeruah. (End.)\n<b>Nevertheless, etc.</b> SeMaG and Hagahot Maimoniyot there.',
  ]],

  // h2len=100 — HE[1] has 6 sub-entries (garbage MT currently)
  ['siman160','seif-018',[
    '<b>All usury, etc.</b> The Rosh in the name of the Geonim; and see Rashi there, s.v. "close [to profit], etc."; and what is stated there: "even with dandled [children], etc." — this is stated as a stringency: that even [in the case of dandled children] it is permitted. But without that, [orphans are] permitted in any case — the Rosh.\n<b>Or [money] of, etc.</b> For their law is like that of orphans, as written at the beginning of chapter 4 of Bava Kamma: "we are [considered] like, etc. — orphans do not need, etc." And he says "hekdesh of the poor" — for if it were genuine hekdesh, it would be permitted even for fixed usury, as stated there, 57b [whereas hekdesh of the poor is not genuine hekdesh, as stated there: "usury of hekdesh — what are the circumstances, etc.?" — and it was not established as [hekdesh] of the poor; and at the end of chapter 8 of Bava Kamma: "to guard and not to distribute to the poor — and if so, let the verse exclude it as \'your fellow,\' not hekdesh" — see Mordechai].\n<b>Or a Torah study institution, etc.</b> As written in the Jerusalem Talmud (chapter 2 of Mo\'ed Katan and chapter 8 of Sanhedrin): "one may borrow at interest for a mitzvah fellowship and for the sanctification of the new month, etc."\n<b>Even though there is, etc.</b> As Rashi wrote there, s.v. "in court, etc."; and so wrote Mordechai. But the Rosh wrote there that it is given [to them] in court so that the fear of court is upon them; and Rashba and Nimmukei Yosef wrote [it is] because a guardian is not permitted to act without court authorization, etc.\n<b>(Supplement) An erroneous custom, etc.</b> As written, 70a: "is it then because of a custom, etc.?" (End.)\n<b>All the while [he] has not, etc.</b> From what is stated there: "even with dandled [children], etc." — and the difficulty is not [only] with adults, but because once his beard has filled in he has certainly reached the age of reason, so [the Gemara] took the clearest case. But Maharil wrote in the name of R. Yom Tov that after thirteen [years old] one has no orphan status, for then he is an adult; and see the Gemara there, 67: "Rav Elazar did, etc."\n<b>One who owes, etc.</b> His words are puzzling — see Taz and Shach.',
    '<b>(Supplement) One who owes, etc.</b> This is puzzling, for the same law applies to any person, as written in siman 169, seif 25 — and the later authorities have already challenged this. (End.)',
  ]],

  // h2len=102
  ['siman363','seif-002',[
    '<b>And likewise as much as, etc.</b> Also for the reason mentioned above — that it is beneficial to him.',
    '<b>(Supplement) And likewise as much as, etc.</b> For anything done for atonement is permitted, as written in the Jerusalem Talmud: "originally they would bury in pits, etc." — and as written in seif 4. (End.)',
  ]],

  // h2len=103 — existing EN[1] is good; add EN[2]
  ['siman61','seif-021',[
    '<b>And there are those who say, etc.</b> Rashi and Tosafot 136b, and Rashi in chapter 1 of Shabbat (10b) — one reason for reishit hagaz and gifts: we derive giving from terumah, as [stated] 131a. The first view holds it is custom — in this they practiced, in this not; see the reason in Ran, and the proof that R. Nehorai himself wove a cloak, and all the Amoraim practiced gifts, as written; see Rashi and Tosafot 138b, s.v. "only, etc." But Rambam challenged: why does reishit hagaz need a verse from [analogy to] gifts? — they are not analogous; therefore he must hold the law follows R. Elai; and so is the primary [view].',
    '(Supplement) See Mordechai, chapter HaZero\'a, and Hagahot Semak there, seif 66, s.v. "they asked Rashi, etc. — and he answered, etc. — and whoever gives, may blessing come upon him, etc." (End.)',
  ]],

  // h2len=105
  ['siman362','seif-005',[
    '<b>But they bury, etc.</b> See at the end of chapter 5 of Berakhot.',
    '<b>(Supplement) But they bury, etc.</b> From what is written at the beginning of chapter 3 (of Mo\'ed Katan, 17a): "they brought him into the cave of the judges, etc. — he acted like Rabbi Elai, etc." and see the Shach. (End.)',
  ]],

  // h2len=108
  ['siman160','seif-002',[
    '<b>And it is as though, etc.</b> Torat Kohanim, Parashat Behar: "\'I am the Lord your God who brought you out of the land of Egypt\' — on this condition I brought you out of the land of Egypt, that you accept upon yourselves the commandments of [the prohibition of] interest; for whoever acknowledges the commandments of interest acknowledges the Exodus from Egypt, and whoever denies the commandments of interest denies the Exodus from Egypt."',
    '<b>(Supplement) And [denies] my God, etc.</b> Gemara there; and in the Tosefta, end of chapter 6; and in the Jerusalem Talmud, chapter 5, [it] concludes: "from this you learn that usurers deny the fundamental principle" — see there and there. (End.)',
  ]],

  // h2len=112
  ['siman153','seif-001',[
    '<b>And in places, etc.</b> See Tosafot there, s.v. "one may not entrust — and one might say, etc."; but Rashba and Ran wrote [the reason is] because they are not suspected nowadays — and on the contrary, etc.\n<b>One may not hand over, etc.</b> Folio 15b.',
    '<b>(Supplement) That they pull [close], etc.</b> Rashi there; and he also wrote there another reason — on account of male sexual intercourse; and the Maran did not write [the reason] "because they are not suspected nowadays," as above in the Shulchan Aruch. (End.)',
  ]],

  // h2len=113
  ['siman290','seif-001',[
    '<b>But it is permitted, etc.</b> And even though the remaining pieces must be buried, since they [the scroll] must be buried regardless — as stated above, siman 282, seif 13: "a chest, etc."\n<b>But if, etc.</b> From what is written in the first chapter of Bava Batra (14a): "Rav Huna wrote seven, etc." — and if so, one enlarges the script, and then certainly the circumference will be large and the margins will extend greatly, and afterwards he cuts [it] until it equals its circumference. But it is forbidden to cut and bury [scrolls] when it is possible otherwise.',
    '<b>For there is no prohibition, etc.</b> Meaning: it is not comparable to what was written in siman 271, seif 4: "he wrote part of it, etc." — for there the reason is because it appears spotted; not so on the outside, which does not appear spotted. Ibid.',
  ]],

  // h2len=115 — HE[2] has 2 sub-entries in one segment
  ['siman124','seif-009',[
    '<b>The coerced, etc., but, etc.</b> Following Rabban Shimon ben Gamliel in Bekhorot 35a, whose view was accepted in the last chapter of Yoma. And even though the unattributed mishnah at the end of chapter 4 of Bekhorot follows Rabbi Meir, who teaches "this is the rule, etc." — there it is unattributed and followed by a dispute. And so ruled Rambam and other later authorities; as stated above, siman 314, seif 3. Ibid. (And see above, siman 119, seif katan 18.)\n<b>And they do not forbid, etc. — and specifically, etc.</b> Even though they worship idols publicly, since they do so out of fear they are [still considered] Jews; and see what was written above, siman 119, seif 12.',
    '<b>But if, etc.</b> As stated above, seif 8 — "and an apostate, etc."\n<b>Even though they acted, etc.</b> As written in Ketubot 51b: R. Yochanan said, "These women, etc." — the Sages said to him, "They certainly acquiesced, etc."',
  ]],

  // h2len=115
  ['siman279','seif-005',[
    '<b>If he skipped, etc.</b> As stated there: "one should not reduce, etc." — and therefore they said: [if he left it] open, it must be buried; and as above at the beginning of siman 275.',
    '<b>(Supplement) Nevertheless, etc.</b> Masekhet Soferim, chapter 5, halacha 5: "one may scrape one letter and write two, or two and write three — provided he does not scrape one and write three." Thus is the correct reading. (End.)',
  ]],

  // h2len=119
  ['siman129','seif-018',[
    '<b>A barrel, etc.</b> From what is stated there, 24a: "that certain [case], etc. — let it say, etc." and we rule like R. Chiyya, even in a [case of] proximity to detection, as above.\n<b>And the same applies to leniency, etc.</b> For there it said [the law is] for leniency.',
    '<b>(Supplement) And that [the vine] is sitting, etc.</b> As stated there, 23b; and see Rashi, 24a, s.v. "bei kofai, etc." — hence even within the vineyard itself, and there we are concerned about passersby. (End.)',
  ]],

  // h2len=122 — existing EN[1] is reasonable; add EN[2]
  ['siman237','seif-001',[
    '<b>One who says, etc.</b> Even though we say there, 35b, that a Name is required, and the Sages disagree only in that a Name is not required — but a cognomen is required, as stated in the mishnah there; and there, 38b: even if you say the Sages [disagree] — that is to obligate a sacrifice, but the prohibition of the Name always applies. Rambam, chapter 2. Proof from the beginning of Nedarim: cognomens for oaths, etc. — there, 10a: "shvuta, shpika, etc." and there, hence without a Name; as stated there: cognomens, etc. — "language, etc." — perhaps he said "korban to the Lord"; and in Shevuot 36a: "not, not" is an oath; and if with a Name, even once, as written at the end of Yoma (84a): "to the God of Israel I will not reveal"; and at the beginning of chapter 3 of Nedarim: "Mari kola lo ta\'amna"; see Ran there, s.v. "and if you vowed, etc." — it follows that the Name and cognomen are mentioned only for sacrifice and lashing. Ran, Nedarim 2a, s.v. "and oaths"; Rosh, chapter Shevuat HaEidut, seif 24. The clearest approach of all is Rambam\'s; and so wrote Ran in Shevuot there.',
    '<b>And there is no distinction, etc.</b> As written in Nedarim there: "shvuta, etc."; "he vowed by mohi, etc." — and we say there: R. Yishmael said, "These are foreign [non-oath] expressions." And see above at the end of siman 207; and there: "Mari kola lo ta\'amna."',
  ]],

  // h2len=123
  ['siman362','seif-003',[
    '<b>(Supplement) There is no, etc. but, etc.</b> Eliyah Rabbah, chapter 13. (End.)',
    '<b>(Supplement) There is no, etc.</b> As written in Bava Batra 100b: "one who sells, etc."; and there, 101b: "but these are planks, etc."; and in the mishnah there: "Rabban Shimon ben Gamliel says: everything, etc." — and that is the meaning of "unless, etc." — and he ruled like Rabban Shimon ben Gamliel. (End.)',
  ]],

  // h2len=124
  ['siman177','seif-013',[
    '<b>The lender, etc.</b> Like [the case of] one who lent to his fellow and dwells in his courtyard — even though it [the courtyard] is not normally rented out and [the borrower] did not intend to rent it, it is forbidden; as stated above, siman 166, seif 3 in the gloss.',
    '<b>Unless he gives, etc.</b> But Rashba forbids it, for it is a ruse of usury — since he knows he will not be detained; and as stated there, 62b: "there are things, etc." — and certainly in such a case. Therefore the Maran omitted it in the gloss there.',
  ]],

  // h2len=126
  ['siman148','seif-002',[
    '<b>He transgressed, etc.</b> There, 4a.',
    '<b>And if he married, etc.</b> See the Baer Heitev; unlike Tosafot there, s.v. "Torat Kohanim," and see Ran who resolved their question. And it appears to me that that particular Torat Kohanim is from Ravina and R. Ashi (and see what the Maran wrote in Choshen Mishpat, siman 78, end of seif katan 3).',
  ]],

  // h2len=126
  ['siman381','seif-002',[
    '<b>And needless to say, etc.</b> For even on Yom Kippur, where anointing not for pleasure is forbidden, as written in the Jerusalem Talmud (last chapter of Yoma and other sources), even so it is permitted in such a case, as written in the Gemara in Yoma there.',
    '<b>(Supplement) And needless to say, etc.</b> Jerusalem Talmud (chapter 2 of Berakhot and chapter 3 of Mo\'ed Katan): "this statement applies to bathing for pleasure, but bathing not for pleasure — if sores broke out on him, it is permitted." (End.)',
  ]],

  // h2len=137 — HE[2] has 2 sub-entries in one segment
  ['siman234','seif-022',[
    '<b>She vowed, etc.</b> For confirmation in error constitutes confirmation. Ibid.; and this requires investigation.',
    '<b>And the same applies, etc.</b> As above in seif 21, for the Sages disagreed only because they hold it is not the day of hearing — unlike here.\n<b>And if an inquiry was made, etc.</b> See Baer Heitev; and as written in the chapter HaMadir (74b); and other sources; and see above, seif 50.',
  ]],

  // h2len=145
  ['siman135','seif-007',[
    '<b>Vessels, etc., even, etc.</b> In Tosafot, 33a, and in another baraita it is taught, etc.: "old ones — even if he did not put, etc." And as stated there, 74b: "Rava — when, etc." and there in the name of Behag: the distinction between flasks and jugs is that in [the jug] one inserts [the wine], etc.',
    '<b>However, etc.</b> There in the baraita: "a Jew puts water into it"; see Rashi there and Tosafot, s.v. the above-mentioned, at the end of the baraita, etc. And likewise from what is stated there: "there is no difference — flasks, etc." — and flasks means [those that are] pitched, as written in seif 1.',
  ]],

  // h2len=145
  ['siman297','seif-005',[
    '<b>Or he will add, etc.</b> Jerusalem Talmud there, cited by Rosh there.',
    '<b>And if he sowed, he is flogged.</b> This requires investigation — for in the Jerusalem Talmud there we say: "is this not what Rabbi Elazar said in the name of Rabbi Yochanan, etc.? — but, etc. — on account of appearances." Furthermore, it says there that the case concerns one who had no intention to mix [species] and to sow; and as written in seif 7.',
  ]],

];

let ok = 0, skip = 0, fail = 0;
for (const [siman, seif, segs] of TRANS) {
  const enPath = loc(siman, seif);
  const hePath = he(siman, seif);
  if (!fs.existsSync(hePath)) { console.log('NO HE:', siman, seif); fail++; continue; }
  const heContent = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
  const heSegs = brSegs(heContent);
  if (heSegs !== segs.length) {
    console.log('SEG MISMATCH', siman, seif, 'he=' + heSegs, 'trans=' + segs.length);
    skip++; continue;
  }
  const newEn = join(segs);
  if (DRY) { console.log('DRY OK', siman, seif); ok++; continue; }
  try { fs.writeFileSync(enPath, newEn, { encoding: 'utf8', flag: 'w' }); ok++; }
  catch (e) { console.log('WRITE FAIL', siman, seif, e.message); fail++; }
}
console.log(`\nDone: ${ok} written, ${skip} skipped (seg mismatch), ${fail} failed.`);
