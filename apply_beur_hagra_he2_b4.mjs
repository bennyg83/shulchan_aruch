/**
 * apply_beur_hagra_he2_b4.mjs — Batch 4: remaining he=2 cases, 20 entries
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

  ['siman234','seif-030',[
    '<b>There is no, etc.</b> See Baer Heitev; and as written in the first chapter of Avodah Zarah (7a): in matters of Torah law one follows the stringent view — the Rosh there and other later authorities.',
    '<b>(Supplement) There is no, etc.</b> He did not write it in the language of the Gemara: "one who says to an agent: all vows, etc." — because in such a case all agree he cannot dissolve [the vow], for their dispute is only according to Rabbi Elazar\'s position, as written in Nazir 12b — and we rule like the Sages. See the Rosh in Nedarim there. (End.)\n<b>Not for confirmation.</b> As stated there: "her husband shall confirm it, etc."',
  ]],

  ['siman232','seif-017',[
    '<b>A woman, etc.</b> See Orach Chaim, siman 339, seif 4; and Choshen Mishpat, siman 254, seif 1.',
    '<b>(Supplement) A woman who vowed, etc. if they did, etc.</b> Even though the mishnah does not discuss vows made under duress specifically — only where duress occurred afterwards — the mishnah speaks to a stringency; and certainly [the same applies] at the time of the vow. And as written in Nazir 11b: "and alternatively, in vows, etc." And he wrote: as for [the case of] Zedekiah — it was not on account of duress that he acted, but rather to honor him more. See siman 14. (End.)',
  ]],

  ['siman123','seif-004',[
    '<b>Wine that is mixed, etc.</b> Jerusalem Talmud: R. Yitzchak bar Nachman in the name of R. Yehoshua ben Levi says: sweet, bitter, sharp — none of them is subject to [the prohibition of] uncovered [liquids]. R. Simon in the name of R. Yehoshua ben Levi: bitter, sharp, and sweet — none of them is subject to [the prohibition of] uncovered liquids or yayin nesech. R. Simon explains: "sharp" means kondatin, etc. And it is stated in the Pesikta, Parashat Yitro: R. Abba said, "The words of Torah are compared to kondatin — just as kondatin contains wine, honey, and pepper, etc." — and this is what is called anumelin in the Gemara there. And Ramban wrote [it must have] specifically a third part honey and a third part pepper; and as stated there in the Jerusalem Talmud: "Bar Yudna had kondatin that was uncovered; he asked the Sages and they forbade it. But is that not what R. Yehoshua ben Levi said: bitter, sharp, and sweet are not subject [to the prohibition]? The Sages of Caesarea in the name of R. Yehuda bar Tit: in [a vessel] where the sharp [ingredient constituted] one part in three." But Rashba wrote [the criterion] is not exact — rather, any [mixture] whose taste has been altered; and he wrote there: one who is stringent comes laudably.\n<b>(Supplement) If it has been altered, etc.</b> Unlike Rambam who wrote [it applies] even with a little honey — on the grounds that it is not fit for libation. But this is not so, for it is nonetheless fit for them, seeing that they offer even good date-palm fruits which are forbidden on the altar; and besides, they said diluted wine is subject to the prohibition of yayin nesech even though it is not fit for the altar, as written (in Sifri): "undiluted shall you drink it, etc." and in chapter 6 of Bava Batra (97b): "to exclude diluted, etc." Ran and Rosh. (End.)',
    '<b>And the same applies, etc.</b> From what is stated in the Gemara: "sharp [made with] wine and pepper" — implying that pepper alone suffices; and [the fact that] the Jerusalem Talmud mentions honey and pepper is only because that is the usual [manner]. There in Torat HaDeshen; and from our own Gemara, which gives no precise measure, the implication is as Rashba said above. See Rashi there, s.v. "sharp, etc." And Beit Yosef wrote the same applies to honey alone; and so wrote in a responsum of Rashba.',
  ]],

  ['siman228','seif-001',[
    '<b>(Supplement) One who vowed and regretted, etc. — how so, etc.</b> For [a vow] is only dissolved through regret, as written in Gittin 83b: "this is what R. Yochanan said: a sage [may not dissolve a vow] without, etc." — and so it is implied in many places. (End.)',
    '<b>That he has learned, etc. and it is, etc.</b> This is the view of the Rosh in chapter 3, seif 3; and see Ran, 8b, s.v. "and excommunication, etc."; 23a, s.v. "and the dissolution, etc."; 78a, s.v. "he said, etc." — unlike Ramban who requires [the petitioner to appear] specifically before [the sage who declared the ruling]. And Rambam\'s view is that laypeople do not need [a sage] since they explain [the reason] through reasoning, etc. See Beit Yosef.\n<b>And they also know, etc.</b> The Rosh there, and Ran, 78a, in the name of the Jerusalem Talmud.',
  ]],

  ['siman123','seif-020',[
    '<b>A winepress, etc. — and if they returned, etc.</b> Statement of R. Huna, 56b; and per the second interpretation there in the Rosh, that it refers to the latter mishnah.',
    '<b>And if there is, etc.</b> Sefer HaTeruah, Ran, Hagahot Maimoniyot, and other later authorities; and see Tosafot there, s.v. "but — and one might ask: but when we return, etc." According to what is written in siman 134, seif 2 in the gloss, following Rabbeinu Tam — even wine is combined [in the sixty]; and as stated there in the above-mentioned entry: "and one might ask, according to R. Tam, etc." — and so wrote Hagahot Maimoniyot, Sefer HaTeruah, and other later authorities. And the Maran follows his own view, which he explained there, unlike R. Tam; see the rulings there.',
  ]],

  ['siman234','seif-039',[
    '<b>All [of this], etc.</b> Mishnah at the beginning of the last chapter of Nazir, cited by the Rosh there in Nedarim.\n<b>Unless, etc.</b> As above — and to exclude the view of Rambam.',
    '<b>And according to Rambam, etc.</b> To resolve the above difficulty of Ran and Rosh; and what is stated there — that even [if] she reclines and eats, he must nullify [the vow] in his heart — applies to [a case where] she is not eating. But when she is eating he need not say [anything]; and that is the meaning of what the baraita says there: "Beit Hillel says: one, etc." And see Rambam in his commentary to Nedarim there: "but they said — a man should not say to his wife, etc." — and that is the meaning of "she is [thereby] eating, etc." And so wrote Lechem Mishneh.',
  ]],

  ['siman358','seif-002',[
    '<b>(Supplement) Whoever has no, etc.</b> Eliyah Rabbah, chapter 10: "unless they preceded [the burial] by one hour, etc." (End.)',
    '<b>(Supplement) Whoever has no, etc.</b> As written in the Jerusalem Talmud (chapter 3 of Berakhot and chapter 2 of Sanhedrin): "it was taught: one does not take out the dead near the time of Shema, unless they preceded [it] by one hour so that they could recite [Shema] and pray. But we learned: if they buried the dead and returned — if they are able to begin, etc." — explain it as referring to those who thought there was [enough time for a period] and there was not. (End.)',
  ]],

  ['siman135','seif-004',[
    '<b>Earthenware vessels, etc.</b> There, 2 — and per Rashi, Rashba, and Tur, who explain "one time, etc." as referring to the drinking of the non-Jew\'s wine; but in Sefer HaTeruah, siman 166, it is explained as referring to the initial placing of an Israelite\'s water — if he put water twice and then wine, and a non-Jew touched it, it is forbidden; but if he put water three times and then wine, it is permitted. And that is the meaning of "and if, etc." And the Maran holds there is reason to distinguish between water and wine, which is why he wrote both.',
    '<b>Requires filling and pouring.</b> Rashi there; and as stated there: "a single [filling] is effective — when [R. Ashi] came, etc. — he said to him: there is another explanation, etc."\n<b>And if he put, etc. and they remained, etc.</b> Tosafot there, s.v. "kasi, etc." — "and according to this the practice was, etc." And Sefer HaTeruah wrote that [the required time] is a quarter of the day.\n<b>And if they are pitched, etc.</b> As stated above in seif 1; and the same applies to vessels, etc.\n<b>And after the fact, in this, etc.</b> Meaning: in our [vessels]; and as stated there in the gloss: "some say, etc."',
  ]],

  ['siman200','seif-001',[
    '<b>When she extends [her arms], etc.</b> See Tosafot, Pesachim 7b, s.v. "al hatevilah — [the prayer of] Orach Chaim, etc." And so wrote Rif and Rambam; and specifically after extending [her arms], for we require [the blessing to be] immediately before immersion, as written at the end of chapter 3 of Menachot (35b): "from the time of placing them, etc."\n<b>When she is standing in her undergarment.</b> For otherwise it is forbidden even for a woman, as written in chapter 3 of Berakhot (24a) — specifically when her face is [pressed] against the ground (see above, siman 328, seif katan 3); but even so, in an undergarment it is fine, as written in Orach Chaim, siman 74, seif 4; and see there in the gloss.',
    '<b>She recites [the blessing] after, etc. and if they are, etc.</b> See Baer Heitev; and in what is written in Orach Chaim there, following Rav; and see Taz and Shach.\n<b>And some say, etc.</b> Tosafot there: "nevertheless, R. Yitzchak says, etc." But the Tur wrote in the name of R. Yitzchak that ab initio [the blessing should be recited] thus; and Beit Yosef was puzzled by him. It appears that the Tur\'s reasoning comes from what Tosafot wrote: "and likewise in [the case of] washing [hands], etc." — and for washing hands, the blessing is recited ab initio after washing — the same applies to immersion. See the Remezim there.',
  ]],

  ['siman331','seif-062',[
    '<b>One may not separate sheaves, etc.</b> Jerusalem Talmud, end of chapter 1: "R. Elazar in the name of Reish Lakish: \'and it shall be counted for you as your offering, like grain from the threshing floor\' — from what [the verse] commands the Levite to separate from the finished [produce], this teaches that it is forbidden to give him sheaves. And it is implied that even one\'s own produce it is forbidden to separate [before completion]"; and as written in the mishnah at the end of chapter 1 of Challah: "they are not taken, etc." See seif 54 (and what was omitted in Tur and Shulchan Aruch there is another clause — not speaking about something whose processing has not been completed, concerning something whose processing has not been completed — and as written in the mishnah at the end of chapter 1 of Terumot, which Rambam transcribed).',
    '<b>(Supplement) One may not separate sheaves, etc.</b> Sifri, Parashat Korach: "\'like grain from the threshing floor and like the fullness of the winepress\' — why is this stated? Because when it says \'and you shall raise up from it,\' I might think one may separate sheaves for wheat, or grapes for wine, or olives for oil. Scripture therefore states: \'like grain from the threshing floor\' — from the finished [produce]. From here they said: grain [becomes liable] once it is smoothed over, wine once it rises [to the top], and oil once it descends to the pit." (End.)',
  ]],

  ['siman153','seif-004',[
    '<b>Even though they are many.</b> Gemara there, 25b.',
    '<b>And their wives with them.</b> Ibid.; and Rif and Rambam ruled without stating the dispute between R. Yochanan and R. Elazar, because they hold like Rashi that according to Rav Idi it is forbidden in any case, and the baraita was taught in accordance with R. Elazar. But according to Tosafot there, s.v. "even if," and the Rosh there — a non-Jewish woman is always permitted to be secluded [with Jewish men], and an important woman is permitted even with non-Jewish men — because we rule like Rav Idi, as above.',
  ]],

  ['siman203','seif-003',[
    '<b>And this applies, etc.</b> Nedarim 49a; and see Ran, s.v. "terumah, etc."',
    '<b>And likewise if, etc.</b> See Rosh, chapter 3, seif 2; and he also wrote that the Sages do not administer oaths, etc. — and likewise he would be stringent, etc. — and even though this is not required by law, as the Rosh wrote there: "and all these are stringencies, etc." — and so wrote Mordechai. Nonetheless, he wrote that one should be stringent, as written at the end of the chapter HaMadir: "go and see if he sought dissolution, etc." And as written: "he swore to do harm and did not alter it"; and in the chapter HaShole\'ach (34–35), they refrained from administering oaths — and similarly.',
  ]],

  ['siman300','seif-002',[
    '<b>He gathered, etc.</b> Mishnah there: "he did, etc." — and he explains [this means] even with a single stitch, that is, one on the side of the garment; and certainly with two stitches. But in his commentary he wrote "he did, etc." [meaning] two stitches; and so explained Rosh and Ran, who further wrote that [it requires] that he tie them — as written in chapter 7 of Shabbat (74b); and that is the meaning of "in the gloss, some say, etc." And Rambam holds this [applies] specifically regarding Shabbat.',
    '<b>(Supplement) And some say, etc.</b> In the Jerusalem Talmud there: "R. Yona and R. Yosi both say: [the law applies] when he ties from here and from there." Their words — those of the Sages — conflict: for R. Abba said, R. Yirmiyah in the name of Rav: "one who stretches [fabric] on the sides on Shabbat is liable for sewing" — so he says: for sewing and for tying. And since we rule that even on Shabbat [a stitch is forbidden only] when he ties it — as stated in the Gemara — the same applies here. And there is no difficulty from the case of stretching, for there [it involves] many stitches and it stays without tying. (End.)',
  ]],

  ['siman145','seif-003',[
    '<b>That the house should be, etc.</b> See Tosafot there, s.v. "bayit, etc."',
    '<b>And specifically, etc.</b> Rashi there, s.v. "he brought in, etc." and as stated there, 53b: "pedestals, etc. — a pedestal that was chipped, etc."\n<b>And regarding an Israelite, etc.</b> Rashi there in the mishnah, 47b. And it appears that "by an Israelite" means that the Israelite removed it; but if it belongs to an Israelite, see siman 146, where Ramban was uncertain regarding the accessories (and see there in siman 146, seif katan 2, which writes: "even though Ramban, etc." But the language of the Maran who wrote plainly as above in siman 139 — it must be as I said above).',
  ]],

  ['siman177','seif-005',[
    '<b>When he takes, etc.</b> Raavad — unlike Rambam; and as written in chapter 3 of Bava Batra (42b): "partners are mutual trustees to one another" — and certainly in an iska [investment arrangement], where he gives him a wage; and even though he receives payment for his labor, this is no worse than a paid worker.\n<b>And it is permitted, etc. and not, etc.</b> And the proof is that if he were like a robber, the wage would not go to the middle [to be shared]; see Taz.',
    '<b>However, if he changed, etc.</b> See Choshen Mishpat, siman 183, seif 3: "however, etc." — and the primary view is the first opinion there; and so he ruled unambiguously at the end of this siman; and even the latter opinion agrees that if he changed and said [otherwise] — like any robber who gives no wage at all — as written in Bava Kamma 97a: "and alternatively, this and that, etc."; and there, 96b: "at the end of robbery, etc." — and if he said he is retracting, as stated there, 116b.\n<b>That it should not be, etc. — for then, etc.</b> As written in Bava Metzia 41a.\n<b>And if the custom was, etc.</b> See above at the beginning of siman 174 in the gloss.',
  ]],

  ['siman173','seif-007',[
    '<b>And he is trusted, etc.</b> As above, siman 162, seif 2.',
    '<b>And all this, etc.</b> Tur in the name of R. Yeshaya — unlike "some say"; and "some say" is from the words of Sefer HaTeruah, which resolved the difficulty of Tosafot there, s.v. "since he said to him, etc. — and one might ask" — and resolved it by saying the case concerns one who explicitly states that [the arrangement] is forbidden in tarsha, as stated there. And the second resolution resolved [the difficulty] like Tosafot there. But the words of R. Yeshaya are correct — for if so, what is the question raised there, 65a, from the mishnah against Rav Nachman: "but he has land"? (His words require investigation.)\n<b>And all this, etc.</b> The aforementioned Tosafot; and likewise the second resolution of Sefer HaTeruah; and so hold other later authorities — and as above, seif 1.',
  ]],

  ['siman175','seif-001',[
    '<b>Even if, etc.</b> As stated there, 60b, in the mishnah: "they rose, etc."; and see Rashi there, s.v. "he said to him, etc."\n<b>And even, etc.</b> As stated there, 62b: "but if he has no, etc."',
    '<b>And some say, etc.</b> Per the interpretation of Tosafot, 63b, s.v. "and they fix a price, etc."; and we rule like Rava, who is the latter [authority]. But the first view holds like Rashi there; and Rashba explained that what is stated there: "we say — whether in their value, etc. — and they fix a price, etc." means: just as if he has money, they fix a price at the current market rate, so too if he brings other produce, they likewise fix a price in the same way they may fix a price at its monetary value; and that is the meaning of "whether in their value — whether they themselves" — and accordingly, Rava\'s ruling does not relate to R. Yochanan\'s ruling, and he does not disagree with it at all.',
  ]],

  ['siman174','seif-008',[
    '<b>The renter, etc.</b> Beit Yosef.',
    '<b>And he advanced, etc.</b> Meaning: even though he rents for the purpose of early [payment] at a reduced [rate], it is permitted — as written in the mishnah, 65a; and the condition is also permitted, for even in a pledge-loan [such an arrangement] is permitted, as stated above, siman 172, seif 1. And it is not analogous to the case in seif 1, where he returns all the money — unlike here, where he deducts [the amount] corresponding to the years [the borrower] dwelt [in the property]. And it wrote "and in this manner, etc." — meaning: the practical difference is that in a pledge-loan such a case is forbidden, as written in siman 172, seif 3; unlike rental, where the law of rental is that responsibility rests with the landlord, as written in the chapter HaSho\'el — and "close to profit, etc." does not apply here.',
  ]],

  ['siman124','seif-010',[
    '<b>For he is not [eligible], etc.</b> As stated there: "but it is he who said, etc."',
    '<b>A second [person] who knew, etc.</b> From what is stated there, 58a: "excommunication, etc." and as written in seif 12.\n<b>And a third, etc.</b> From what is stated there, 57a: "they measured by [placing the hand] between, etc." — following the view of the Tur; and in the gloss below, seif 19, which writes: "and some say, etc." But according to what the Shulchan Aruch writes there, [measuring] by hand is forbidden — and even though patting [wine] by hand is permitted, as stated there, that is for a different reason. See Beit Yosef there, 95a, s.v. "and what is written: \'they measured by [placing the hand] between, etc.\'" and s.v. "and know that the mishnah states, etc." And there is further support for the Tur\'s position from the incident of the etrog in seif 13; and as written in Beit Yosef here, s.v. "how so?" — and the Maran\'s ruling is likewise not consistent, as stated there in seif 13 and in Beit Yosef there.',
  ]],

  ['siman173','seif-006',[
    '<b>Unstruck coins.</b> Specifically — as written in Sefer HaTeruah in the name of Raavad at the end of part 5; and as stated there: "Rav Ashi said: always [the reference is to] coin value, and to pruta coins" — implying specifically perutot; and unlike Rashi there, s.v. "Rav Ashi, etc." Ibid.\n<b>And it, etc.</b> Tur in the name of Rosh.',
    '<b>And it appears to me, etc.</b> Meaning: from what Tosafot wrote there, s.v. "it becomes, etc." — that it is analogous to se\'ah for se\'ah. But according to their view, there is no need to bring proof from Tosafot — for is not the Gemara itself explicit there: "it becomes, etc."? But it is not analogous to there, since he is giving more [than what he borrowed], and it is required that it all be in his possession; as stated there, 63b: "and Rav Nachman said, etc. — they are all there, etc." — implying all of them. And see Tosafot there, s.v. "who says, etc." And see above at the end of siman 162 — that se\'ah for se\'ah is forbidden with a different species.\n<b>And all this, etc.</b> Meaning: even if both [coins] are unstruck, it is forbidden; and as written in Tosafot, s.v. "it becomes, etc. — and one might ask, etc. — and one might answer, etc."',
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
