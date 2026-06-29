/**
 * apply_beur_hagra_he2_b3.mjs — Batch 3: remaining he=2 short cases, h2len 148–200
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

  // h2len=148
  ['siman164','seif-004',[
    '<b>And if he ate them, etc.</b> See the Baer Heitev; and per their interpretation of what is stated there, 67a: "Ravina did, etc. — it is on account of fixed usury."',
    '<b>And some say, etc.</b> The Rosh there, regarding the ruling of Rav Nachman; and likewise Rashi there, s.v. "and the fruit returns, etc." — following the approach of Tosafot, 67a, s.v. "fruit, etc." — that it is on account of mistaken waiver; see there. And so holds the Rosh there; see also end of siman 172.',
  ]],

  // h2len=149
  ['siman177','seif-019',[
    '<b>If he deposited, etc.</b> For since he misappropriated it and lent it out without the depositor\'s knowledge, he is like a robber — and if [the money] generated profit, the profit belongs to [the depositor]; and as stated above, seif 5 in the gloss; see there.',
    '<b>And if the bailee, etc.</b> And there is no [issue of] belated usury here, since it did not come into his possession as a loan; and likewise [no issue of] "close to profit and distant from loss," since he did not stipulate [anything] at the outset. Ibid.; and see Darkei Moshe in the name of a responsum of Rashba.',
  ]],

  // h2len=149 — HE[1] has 3 sub-entries
  ['siman234','seif-021',[
    '<b>There is no, etc. and not, etc.</b> This is explicit there, 72a; and other sources; and its primary source is in Sifri: "and if on the day her husband heard, he shall restrain her, etc." — [Scripture] teaches, etc.; and there, prior to this: "and if her father restrained her, etc. — from where [do we derive the law] for a father? etc. — Scripture states: \'these are the statutes which the Lord commanded Moses\' — hence you compare the father to the husband, etc."\n<b>And specifically, etc.</b> See Tosafot, Shabbat 157a, s.v. "and the law is, etc."; and so concluded the Rosh in Nedarim there in his rulings; and so ruled Rambam and other later authorities.\n<b>For if, etc.</b> Mishnah in Nedarim there.',
    '<b>And the time of his knowledge, etc.</b> Ran there, s.v. "fine, etc." and s.v. "Rabbi Meir" — following the latter view; and likewise Ran explained at the end of chapter 10, 79a, s.v. "and the Sages, etc."; and 72b: "the Sages disagree only, etc." And so wrote the Rosh there in his commentary, s.v. "Rabbi Meir, etc."',
  ]],

  // h2len=150
  ['siman179','seif-012',[
    '<b>It is permitted, etc. and likewise, etc.</b> As written in chapter 6 of Shabbat (60a in the mishnah): "and not an amulet, etc."; and there (61) in the Gemara: "the Sages taught, etc. — one: an amulet in writing, etc."; and there it was asked: "amulets, etc. — come and hear: blessings and amulets, even though, etc. — that are in the Torah, etc. — only to enter, etc."\n<b>And specifically, etc.</b> As above in the preceding seifim.',
    '<b>But to write, etc.</b> As stated there, 115b: "from here they said: scribes [who write], etc." And even though nowadays blessings are written because of "it is a time to act for the Lord" — nonetheless, amulets remain in their prohibition; and see Orach Chaim, siman 334, seif 14; and see Rashi there.',
  ]],

  // h2len=151 — existing EN[1] is good (Rosh, Ran explanation); keep and add EN[2]
  ['siman295','seif-005',[
    '<b>And specifically, etc.</b> The Rosh; and he brought proof from a single vine whose [surrounding] work is six tefachim, even though the roots spread outside six; and we say: if there was a fence between them, this one leans on the fence from here and that one from here. But Ran in the first chapter of Kiddushin, cited in Beit Yosef and Baer Heitev, wrote that vine roots spread downward from three tefachim; therefore it is permitted from the side; and so wrote Rosh there — and from the side, even for a vine it is permitted, for they do not walk from the side. And see Tosafot, Kiddushin 39a, s.v. "not, etc." — and it appears, etc.; and Tosafot\'s words require study.',
    '<b>And even when layering, etc.</b> In the Jerusalem Talmud, per the Rosh\'s interpretation there: "what are we dealing with, etc.?" — and this concerns seeds on top of a vine; meaning: specifically on top of a vine; and as the Rosh wrote there in his conclusion; and so wrote Tosafot in Bava Batra there, s.v. "one who layers, etc."',
  ]],

  // h2len=152 — HE[1] has 4 sub-entries; HE[2] has 3 sub-entries
  ['siman282','seif-001',[
    '<b>One is obligated, etc.</b> Chapter 4 of Avot; chapter 3 of Masekhet Soferim; chapter 3 of Berakhot (18a, 24a, 26a); chapter 10 of Eruvin (98a); chapter 1 of Kiddushin (33b); chapter 3 of Menachot (32b); and other sources. And [see] Midrash Rabbah, Parashat Bamidbar, section 4. And Rambam wrote that this is because the words of the [Tablets] are in the Torah scroll — and that is the meaning of "and [it is] a mitzvah, etc. — and to honor it, etc." — like [the honor shown to] the Ark.\n<b>And one may not spit, etc.</b> For even in the presence of one\'s teacher it is forbidden, as written in chapter 10 of Eruvin (99a); and certainly in its [the Torah scroll\'s] presence; and as written in chapter 1 of Kiddushin (33b): a fortiori from [showing reverence] in the presence of [a teacher], etc.\n<b>And one may not expose, etc.</b> As is stated regarding the altar; and as written in the Mekhilta there: "is this not a kal va-chomer? — if stones, which have no intelligence for good or ill, the Omnipresent said: do not treat them with disrespect — your fellow, etc." — and certainly [this applies to] a Torah scroll, as above. And even though there it excludes the sanctuary and the holy of holies from [the prohibition of] striding with large steps — [that is] specifically.\n<b>And one may not stretch out, etc.</b> See Rashi in Ketubot 108b.',
    '<b>And one may not turn [one\'s back], etc.</b> As written in chapter 5 of Yoma (53a).\n<b>Unless [he is] elevated, etc.</b> For it is considered a different domain; as written at the end of chapter 3 of Berakhot [and see seif 8 and what is stated there].\n<b>But [rather] he should sit, etc.</b> As written in chapter 2 of Shabbat (30b), regarding one\'s teacher.',
  ]],

  // h2len=156 — HE[2] has 2 sub-entries in one segment
  ['siman177','seif-034',[
    '<b>And specifically that not, etc.</b> From what is stated: "and he did not inform him, etc."',
    '<b>(Supplement) For he can, etc.</b> As written in seif 36; unlike Hagahot Asheri there, s.v. "it is implied, etc." — and this requires investigation, etc. (End.)\n<b>One who receives an investment, etc.</b> From the above in the Shulchan Aruch — that he filled it [the loss] and afterwards they divide; and that is the meaning of "unless, etc. or, etc." — as above.',
  ]],

  // h2len=166
  ['siman181','seif-003',[
    '<b>He is not obligated, etc.</b> Tosefta there.',
    '<b>And some [say], etc.</b> For the mishnah implies [it applies] specifically to a beard; and as the Gemara marks there: "he is not obligated, etc." — the Sages taught: "and the corners of their beard, etc." And likewise it is implied in chapter 6 of Nazir; and see Tosafot, Shevuot 2b, s.v. "he is obligated, etc."; and Tosafot, Nazir 41b, s.v. "now, etc."',
  ]],

  // h2len=169 — HE[1] has 2 sub-entries; HE[2] has 2 sub-entries
  ['siman124','seif-018',[
    '<b>He took, etc.</b> There: "a non-Jew at a jug, etc." and there, 72b: "a non-Jew who poured, etc." — and he holds that all of it becomes forbidden; and that is the meaning of "the wine became forbidden." As stated above at the beginning of siman 125. And specifically if he lifted it; otherwise he holds it does not become forbidden. Beit Yosef wrote that this is implied by the Rif and Rosh. But Mordechai, Hagahot Asheri, Rashba, Tur, and Shulchan Aruch above, seif 14, wrote "but if it is not, etc." — and this requires examination (see above, siman 125, seif katan 5).\n<b>He lifted, etc.</b> From what is stated there regarding a wineskin and a vat; and likewise from what is stated there about one who poured, etc. — that what was inside is permitted, and only what came out is forbidden because it was [the result of] his force.',
    '<b>(Supplement) He lifted and not, etc.</b> From what is stated there, 71b: "Since the non-Jew grabbed it, it would acquire the status of yayin nesech — no, etc." See above, siman 132, seif 2. (End.)\n<b>And certainly in, etc.</b> From what is stated there: "a non-Jew at a vat — the wine is permitted"; and there: "but lengthwise, etc."',
  ]],

  // h2len=172 — HE[1] has 3 sub-entries
  ['siman166','seif-003',[
    '<b>Some say, etc.</b> As stated there, 67a: "why — remove, etc."\n<b>And some say, etc.</b> This is not analogous to there, for there he was not lending to him because of that house and would have to remove him in any case; and so we say in the Jerusalem Talmud: "a certain person lent, etc." — the Rosh cited it there. But Ramban rejected it, saying perhaps the Jerusalem Talmud holds like Rava in the Gemara there, and we rule like Rav Ashi.\n<b>Who, etc.</b> As stated above — for it is like, etc.',
    '<b>One who has no need, etc.</b> From what is written in Bava Kamma 20b: "come and hear — R. Yishmael says: even, etc." and it answers "it is different, etc." — otherwise it is permitted. See Rashi in the mishnah, Bava Metzia 117a, s.v. "if so, etc." — and specifically because of blackening [the walls]; and it says there "but the homeowner, etc." — and certainly here [the ruling is] for the benefit of the lender.',
  ]],

  // h2len=179
  ['siman378','seif-010',[
    '<b>One may not eat, etc.</b> Jerusalem Talmud, chapter 3 of Mo\'ed Katan, cited by Hagahot Maimoniyot, chapter 12: "her storehouse was small and her relatives wanted to eat with her — what is the law? Let them come in half [of the time] and [stay] separately." He said to him: "let half come today and half tomorrow."',
    '<b>(Supplement) One may not eat, etc.</b> For all family members and those engaged in the eulogy have the law of [eating the] mourner\'s meal with him — from what is written in [the laws of] Chol HaMo\'ed: "one may only provide the mourner\'s meal to his relatives" (mishnah, 24b); and regarding a Sage (25a and Shabbat 105b): "all provide him the mourner\'s meal, etc." Torat HaAdam. (End.)',
  ]],

  // h2len=186 — HE[2] has 2 sub-entries
  ['siman136','seif-001',[
    '<b>With one seal.</b> That is, [what is meant by] "covered," etc. — one that is pressed tightly over their mouths; and that is a single seal. And what is meant by "and sealed, etc." is a small hole on the other side through which wine is extracted; and since there are two holes, both must be sealed — yet he demonstrated that only one seal is needed, from what is stated there, 29b: "our vinegar, etc." — implying that wherever there is no concern about libation but only about forgery, one seal suffices. Ran in the name of Ramban; Terumat HaDeshen, 154a; and likewise implied by Tosafot there, s.v. "Rava, etc."\n<b>And some [say], etc.</b> Rashi there, s.v. "covered, etc." And the above difficulty is resolved by Ran: there [in that case] there is no great reward [that would motivate forgery]; and as stated there, 39b, regarding bread: "what should we suspect, etc. — if that they would return, etc." — unlike here, where on account of frequent use [the non-Jew] takes the trouble and forges; and therefore even temporarily the Sages decreed, etc. And see Tosafot, 39a, s.v. "Rav said, etc. — Rashi explained, etc. — and R., etc."\n<b>And if he did, etc.</b> And the Ra\'ah in Bedek HaBayit, 155a, permits in the name of Ramban; and this was also cited by Ran, but in Meromei Sadeh there he disagreed with it [and so did Terumat HaDeshen].\n<b>But, etc.</b> As written in siman 122, seif 9, in the gloss: "and in a place, etc."; and see Taz and Shach there.',
    '<b>(Supplement) But if, etc.</b> See Ran in the name of Ramban and Ra\'ah — that even otherwise it is permitted, since it is only [a rabbinic] decree; as written: "he holds that twenty-four [hours of soaking] seals it, etc." — and certainly since it is only a doubt. (End.)\n<b>And if they are, etc.</b> Tosafot there, s.v. the above-mentioned; and Sefer HaTeruah, Mordechai, and Tur.',
  ]],

  // h2len=186 — HE[1] is short
  ['siman344','seif-001',[
    '<b>And it is forbidden, etc. and they increase, etc. and a Sage, etc.</b> All of this in what is written [in the Gemara].',
    '<b>(Supplement) And a Sage and a pious person, etc.</b> End of chapter 23 of Shabbat; and chapter 3 of Eliyah Rabbah, halacha 6: "in Jerusalem, etc. — and in Judah, etc."; and in the first chapter of Sanhedrin (11a): "and when Hillel died, etc."; and in the last chapter of Megillah (28b): "woe, the land lacks, etc."; and in the last chapter of Mo\'ed Katan: "how many incidents…"',
  ]],

  // h2len=187
  ['siman137','seif-003',[
    '<b>If there is, etc.</b> As stated above, siman 134, seif 2: "wine that is not forbidden, etc." Ibid.',
    '<b>And if there is, etc.</b> As stated there, 73a, following the latter version, which does not require the initial [treatment], as Rashba and other later authorities wrote. See above, siman 134, seif 4. But without water it is impossible to neutralize [the absorbed wine] against sixty [times its volume] — against the wine absorbed in the peel — for that wine is intrinsically forbidden for benefit and forbids even the smallest amount, according to the Shulchan Aruch\'s ruling there, seif 2.',
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
