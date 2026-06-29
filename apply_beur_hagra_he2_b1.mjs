/**
 * apply_beur_hagra_he2_b1.mjs — Batch 1: beur-hagra he=2 cases, short HE[2] group
 * 30 cases, sorted by HE[2] length ascending
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function join(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function he(siman, seif) { return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }

// Each entry: [siman, seif, [seg1, seg2]]
// seg1 = translation of HE[1] (all sub-entries joined with \n)
// seg2 = translation of HE[2] (all sub-entries joined with \n)
const TRANS = [

  // h2len=26
  ['siman298','seif-002',[
    '<b>Because of what [is stated].</b> Like [the law of] rings and [the thread of] blue. But in the Gemara there it is implied that it is Biblically forbidden, only there is no flogging — and in any case:',
    '<b>And it is forbidden, etc.</b> and in a place, etc. — as above.',
  ]],

  // h2len=31
  ['siman285','seif-002',[
    '<b>Some say, etc.</b> Avodah Zarah 11a.',
    '<b>And it says, etc.</b> As stated there; and Menachot 33b.',
  ]],

  // h2len=36
  ['siman380','seif-025',[
    '<b>(Supplement) Upon every, etc.</b> Eliyah Rabbah, chapter 9. (End.)',
    '<b>(Supplement) Upon, etc.</b> See Rosh, siman 98. (End.)',
  ]],

  // h2len=37 — EN[1] already good ("But sitting. Rambam:"), keep and add EN[2]
  ['siman150','seif-002',[
    '<b>But sitting.</b> Rambam.',
    '<b>Or, etc. or, etc.</b> Rashi, s.v. "and if it is not, etc."',
  ]],

  // h2len=37 — EN[1] already good, keep and add EN[2]
  ['siman168','seif-023',[
    '<b>Or [I] disagree, etc.</b> In the latter clause: a non-Jew who said to an Israelite, etc. — the poskim dispute a case like this: some forbid, since one can say he has a share in the profit; and some permit, since the principal belongs to the non-Jew and responsibility for it does not fall upon [the Israelite] — and as written in Sifri: "your silver" — excluding the silver of others. Sefer HaTeruah and Tur. But here everyone agrees it is forbidden. And in the latter clause he omitted and did not write the view of those who forbid; but in Sefer HaTeruah he agreed with those who permit, and likewise the Tur.',
    '<b>However, etc.</b> As written in seif 24, and as stated above in seif 13; see there.',
  ]],

  // h2len=43
  ['siman282','seif-018',[
    '<b>An individual, etc.</b> See what I wrote in Orach Chaim, siman 153, seif 10.',
    '<b>And if they were, etc.</b> As Rambam wrote — that it is no more than [like] the five [books].',
  ]],

  // h2len=44
  ['siman227','seif-001',[
    '<b>If they listen to him.</b> This is the primary reading in the mishnah; see Ran and Rosh there.',
    '<b>And a sale, etc.</b> The Rosh in his rulings, and the Tur; and as stated in the Gemara there.',
  ]],

  // h2len=44
  ['siman346','seif-001',[
    '<b>And one should not delay, etc.</b> There, in what is written.',
    '(Supplement) Siman 346: see Rosh, chapter 3 of Mo\'ed Katan, siman 142. (End.)',
  ]],

  // h2len=45
  ['siman177','seif-026',[
    '<b>And where, etc.</b> But the view of Rambam is that the recipient always has the upper hand, as stated above in seif 4; and see what is stated there.',
    '<b>(Supplement) And where, etc.</b> See Tosafot there, s.v. "if, etc." (End.)',
  ]],

  // h2len=46
  ['siman350','seif-001',[
    '<b>(Supplement) If they wish, etc. and they make wedding canopies, etc.</b> Eliyah Rabbah, chapter 8. (End.)',
    '<b>(Supplement) If, etc.</b> See Rosh, chapter 3 of Mo\'ed Katan, siman 128. (End.)',
  ]],

  // h2len=48
  ['siman181','seif-004',[
    '<b>But [where there is] a prohibition, etc. — therefore, etc.</b> See Tosafot, Bava Metzia 10b, s.v. "akfi, etc."',
    '<b>Even, etc.</b> Tosafot, Shevuot 50a, s.v. "and upon, etc." — and as above.',
  ]],

  // h2len=51
  ['siman282','seif-004',[
    '<b>Until he moves away, etc.</b> Ibid.',
    '<b>Or from a bathroom.</b> As written regarding tefillin in Berakhot there — and when he leaves, he moves away, etc.',
  ]],

  // h2len=54
  ['siman286','seif-001',[
    '<b>A stable, etc.</b> Like Rav Kahana, against whom R. Yochanan\'s view was refuted. Rosh and other later authorities, unlike Rambam; and see seif 2 (and see what I wrote in Choshen Mishpat, beginning of siman 427).\n<b>And specifically, etc.</b> But Rashba ruled that one is obligated, from what is written in Chullin 136a: "but your house, etc." — and he does not say this to exclude such a case, as with all those [cases] mentioned there; see Mordechai.',
    '<b>And likewise courtyards, etc.</b> There, the Agudah wrote [the reason is] because of danger; and as written in Yoma there.',
  ]],

  // h2len=56 — EN[1] already good ("A barrel, etc., but, etc. — Gemara ibid."), keep and add
  ['siman124','seif-022',[
    '<b>A barrel, etc., but, etc.</b> Gemara ibid.',
    '<b>And in the barrels of, etc.</b> Tosafot ibid., s.v. "an incident, etc." — the explanation of Rashbam, etc.; and other later authorities.',
  ]],

  // h2len=59
  ['siman354','seif-001',[
    '<b>(Supplement) A city, etc.</b> Eliyah Rabbah, beginning of chapter 11: "they brought out, etc. and there is no, etc." Ibid. (End.)',
    '<b>(Supplement) A city, etc.</b> until the end of the siman — see Rosh, chapter 3 of Mo\'ed Katan, siman 129. (End.)',
  ]],

  // h2len=60
  ['siman123','seif-011',[
    '<b>Lees, etc.</b> For they are compared to [the threshold of] tithes, and the discussion concerns exactly the [minimum] measure, as above; they cannot be compared to terumah and hekdesh, where [the prohibition] had already taken effect — and that is the meaning of "but, etc." — following the law of hekdesh.\n<b>Forever.</b> This is not exact; as above.',
    '<b>Raisin wine, etc.</b> For it is valid even for Kiddush, as stated there, 97b; and all the more so for the purpose of reciting a blessing.',
  ]],

  // h2len=60
  ['siman159','seif-003',[
    '<b>The Karaites, etc.</b> See the Shach.',
    '<b>An infant, etc.</b> For [the stringency] applies specifically to a malicious apostate, as stated there — and certainly [it does not apply to] one who sinned entirely in error.',
  ]],

  // h2len=61
  ['siman360','seif-001',[
    '<b>And likewise, etc. but, etc.</b> In Torat HaAdam he cited a baraita: "the [burial of the] dead and circumcision — circumcision takes precedence, for this is a mitzvah for the living and that for the dead; the dead and the bride — the bride takes precedence; the mourner\'s house and the wedding house — the wedding house takes precedence; but if he has a livelihood in the mourner\'s house, the mourner\'s house takes precedence. But a groom who is a mourner — [the groom\'s duties take] precedence, because the groom eats and feeds others, while the mourner does not eat until others feed him." See Beit Yosef.',
    '<b>(Supplement) And likewise if there is no, etc.</b> Eliyah Rabbah, chapter 11. "But another mourner, etc." Ibid., chapter 12. (End.)',
  ]],

  // h2len=62
  ['siman292','seif-009',[
    '<b>Another bird.</b> Rambam; but according to Rashi\'s interpretation this is unnecessary, as he explained "wings" to mean detached feathers.',
    '<b>Or that the mother was upon a [nesting] mother.</b> See Baer Heitev; so too wrote Ran; and it appears to me that his textual reading in the Gemara was accordingly.',
  ]],

  // h2len=68
  ['siman331','seif-015',[
    '<b>And from where, etc.</b> Tosefta, chapter 2, and Jerusalem Talmud — cited by Rosh in chapter 1 of Maasrot, mishnah 3: "tithe you shall tithe, etc."',
    '<b>(Supplement) And from where, etc.</b> And so it is implied in Sanhedrin 69a; see Rashi there, s.v. "that not, etc." (End.)',
  ]],

  // h2len=71
  ['siman275','seif-004',[
    '<b>The Song at the Sea, etc.</b> Masekhet Soferim, chapter 12, halacha 11.',
    '<b>And the rest, etc. until, etc.</b> As written at the end of chapter 1 of Megillah; and in Masekhet Soferim there, halacha 10: "Rabbi Zachariah, Rabbi Yochanan in the name of Rav, etc."',
  ]],

  // h2len=73
  ['siman273','seif-003',[
    '<b>And if there is no, etc. and one should not draw [letters], etc.</b> Ibid.; and as written in seif 2: "one should not reduce, etc." — the same applies to not drawing letters out.',
    '<b>And a complete word, etc.</b> From what is stated there: "a word chanced upon him, etc." — this implies specifically the entire word; and as stated below, "but, etc."',
  ]],

  // h2len=74
  ['siman357','seif-002',[
    '<b>(Supplement) Or that there were rains, etc.</b> Eliyah Rabbah, chapter 9. (End.)',
    '<b>(Supplement) Seif 1 and seif 2: or, etc.</b> or, etc. — see there (in the Rosh, chapter 3 of Mo\'ed Katan), siman 88. (End.)',
  ]],

  // h2len=75
  ['siman147','seif-005',[
    '<b>It is permitted, etc.</b> Rambam in his commentary at the end of chapter 5 of Gittin, from what the Gemara states there, 62a: "they established it."',
    '<b>"Your God."</b> The correct reading is "God" (Elokim), and such is the text of Rambam before us there; a corrupted version chanced upon the Maran.',
  ]],

  // h2len=76
  ['siman197','seif-005',[
    '<b>If, etc. and likewise, etc.</b> For these are [prohibited] only on account of a rabbinic decree, as above.',
    '<b>However, [he] did not, etc.</b> So Beit Yosef explained the words of the Agur; but the main point is that [the restriction applies] specifically on the seventh — see there (and see Bach).',
  ]],

  // h2len=77
  ['siman334','seif-038',[
    '<b>In what case, etc.</b> This is implied in Yevamot 121a.',
    '<b>(Supplement) In what case, etc.</b> And likewise in any situation where one is liable to excommunication; and as written in Yevamot 121: "I may be erring, etc." (End.)',
  ]],

  // h2len=79
  ['siman168','seif-020',[
    '<b>And some forbid.</b> From what is written in the second chapter of Pesachim (31b): a non-Jew who received a pledge from an Israelite did not acquire it; and see what was written above in seif 10.\n<b>He acquires from now.</b> As written in Pesachim there.',
    '<b>And if the non-Jew has, etc. — if there is none, etc.</b> See Rashi, 67b, s.v. "in a place where they are dismissed, etc."; and the Gemara there.',
  ]],

  // h2len=79
  ['siman297','seif-003',[
    '<b>There is no prohibition, etc.</b> Jerusalem Talmud, beginning of Kilayim, cited by Rosh there: "wheat and rye-grass are [considered] a thing, etc." — and so Raavad explained what the mishnah states: "the betrothed woman, etc."; and in the Tosefta and Jerusalem Talmud, among the species of seeds and grasses that are not kilayim — all of these are in that same manner (see preceding siman, seif katan 7).',
    '<b>Seed-vegetables, etc.</b> Chapter 2, mishnah 2; and see Rambam there; and what it says: "and the seed of flax, etc." — also mishnah there: "flax, etc."',
  ]],

  // h2len=81
  ['siman340','seif-020',[
    '<b>A stitch that is, etc.</b> Raavad and Rosh; but Ramban disagrees and wrote that it is equal above and below; and as written in the Jerusalem Talmud: "what is considered sewn? Like a weave."',
    '<b>(Supplement) That is, etc.</b> In Eliyah Rabbah, chapter 9: "what is considered sewn, etc.?" and see Tosafot, 26b, s.v. "and in sewing, etc." (End.)',
  ]],

  // h2len=85
  ['siman249','seif-004',[
    '<b>If he asked, etc.</b> There: "for because of this matter, etc." — if he said he would give and gave, he receives reward for the saying and reward for the action, etc. He did not say he would give, nor did he tell others to give, but he spoke to him with kind words — from where [do we know] that he receives reward for this? Scripture states: "for because of this matter He will bless you, etc." And so it is in the Tosefta, end of Pe\'ah; and in Bava Batra there: "one who gives, etc." and "one who appeases him, etc."; and see Tosafot there, s.v. "and one who appeases him, etc."',
    '<b>(Supplement) If he asked, etc.</b> There (in the above-mentioned Avot D\'Rabbi Natan): "but the recipient, etc."; and in Sifri and Tosefta of Pe\'ah: "he said, etc." (End.)',
  ]],

  // h2len=87
  ['siman175','seif-008',[
    '<b>A purchase, etc.</b> See Choshen Mishpat, siman 208, and above, siman 228 (see there, seif katan 101); and what is stated there.',
    '<b>(Supplement) And it is, etc.</b> So too wrote the Rosh there in the name of the Gaon, that the purchase was confirmed through a kinyan; and so too wrote other later authorities in the name of the Gaon. (End.)',
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
