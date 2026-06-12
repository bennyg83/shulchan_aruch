#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_266/pitchei-teshuva/part-001.txt': {
    '1#_':
      'But not at its time it does not override. See responsum R\' Akiva Eiger siman 174 — asked regarding circumcision on Shabbat not at its time: do we say one who acts does not help and it is as if the skin was cut by itself or by a gentile, requiring drawing covenant blood; or since one day passed it is not in the category of "not at its time," and he expanded to reject the questioner\'s view, writing that also regarding slaughter on Shabbat there is no proof, for there the transgression does not depend on slaughter — even if he stabs, it is Shabbat labor and the prohibition is not rectified by "does not help"; but regarding circumcision on Shabbat the transgression depends on the mitzvah of milah — per what we hold one who damages on a wound is exempt, milah is "repairing a person," one could say it does not help and requires drawing covenant blood and does not repair the person, and it is damaging and not Shabbat labor. He further wrote essentially that for milah not at its time on Shabbat it helps and one need not draw covenant blood — it compares well to slaughter on Shabbat: even if we say it does not help, it is not damaging since now he lacks only covenant blood, which is repair; proof from Shabbat 133 — see there. It appears for practical law this question was not asked for ruling but for analysis (and Maharit did not include it in rulings). Shabbat 137a implies if he acted it helps regarding one who forgot and circumcised erev Shabbat on Shabbat — do not say that case is different because he was unwitting; this question was about intentional action. Noda B\'Yehudah Tinyana Choshen Mishpat 9 proved from Temurah 8 that even unwittingly "if he acted it does not help." For born mahul who needs only covenant blood and does not override Shabbat (Shabbat 135) — if he transgressed and drew blood on Shabbat, one could say it does not help and he must draw again — requires study. He also wrote mitzvah coming through sin does not apply here since the act itself is not a sin — see there ch. rulings siman 129. See also Chasam Sofer siman 198 on a fortiori.',
    '5#_':
      'That he did not circumcise. See Magen Avraham Orach Chayyim siman 331 note 10 — likewise if he circumcised but never uncovered, forbidden to uncover on Shabbat; one reason among them — see there. See Shevut Yaakov part 3 siman 25 — if no other mohel and he knows he can circumcise, it is permitted — see there. Baer Heitev there: mohel who came on Shabbat and said he already circumcised once is believed without proof — Samuel siman 19 and similar Orach Chayyim siman 331 seif 26 regarding expert — see there.',
    '6#_':
      'On Shabbat. Chiddushei HaGaon Maharar Yonatan z"l on Rambam Laws of Yom Tov chapter 2 law 4 — likewise on Yom Tov, but on second day of exile Yom Tov there is room to permit; and so he ruled practically — see there.',
    '7#_':
      'Second day of exile Yom Tov. See Eliyah Rabba in Shach\'s name; Noda B\'Yehudah Tinyana Orach Chayyim siman 50 expanded — Mechaber and Rama on second day of galut mean when certainly not at its time, e.g. born bein hashmashot erev Shabbat and the week after doubt the eighth day fell on two galut Yom Tov days, one Shabbat and one Sunday, circumcised on the 12th; but one whose doubt eighth is on second galut Yom Tov, even on Rosh Hashanah, circumcise on the second day since it is a double safek perhaps today is his time and perhaps not, perhaps today is weekday — do not say "return to prohibition" (see above siman 102 seif 4 Hagahah). He wrote on dispute Rambam versus Rosh whether definite not-at-time milah overrides second galut Yom Tov — appears essentially like Rosh it does not override; nevertheless one who wishes to rely on Shach who ruled like Rambam is not protested — see there. See Chasam Sofer siman 250 who ruled stringently like Rosh; Teshuvat Tashbetz part 3 siman 484 saw Rambam and Semag and agreed with Rosh. Shach did not see that responsum — wherever early words are hidden from later authorities, halachah follows early authorities; but in safek whether milah is today at its time, it appears per Noda B\'Yehudah above to circumcise on second galut Yom Tov at least, not only for his reasons but because safek fulfillment of positive Torah commandment overrides safek rabbinic prohibition — especially now it is only custom; he concludes be stringent on second Yom Tov and lenient on doubtful eighth day. Siman 252 also on this — there his view differs: even safek does not override second galut Yom Tov — see there; printing order may be confused — responsum 250 printed first may be later than 252 [from book cover].',
    '8#_':
      'Only his head. [Baer Heitev; Levushei Sarad in Mahari Azulai\'s name — extracting the head outside the corridor means open air only, not outer house (see above siman 262 note 6). He wrote: if a woman did not contract before bein hashmashot and pains were not seen until Shabbat entry, even at start of Shabbat night we do not concern she perhaps brought out the head before Shabbat; but if contraction continued through bein hashmashot and she gave birth at night start, we are stringent on Shabbat prohibition — likely she brought the head before Shabbat, and a safek does not override; even if the mother and mohel did not know, we say they were not aware due to preoccupation; when asked they say they knew or did not — we have only their words whether to override Shabbat or not; once the womb opens and she cannot walk, it is known the fetus brought out its head — see Bach siman 194.]',
    '14#_':
      'They do not circumcise him on Shabbat. See Tiferet Lemoshe — kosher Israelite who had a son from a converted Israelitess circumcises on Shabbat; likewise Israelitess who bore from a gentile — circumcise on Shabbat since the child is kosher — see there.',
  },
  'siman_266/siftei-kohen/part-001.txt': {
    '2#א':
      'Majority of the height of the corona. See above siman 262 seif 5 and what is written there.',
    '8#ב':
      'And even second day of galut Yom Tov. It appears for practical law essentially like Rambam that it overrides second galut Yom Tov — likewise Semag positive command 28 law 415, all in it siman 73; likewise appears Bartenuro who explained two Yom Tov of Rosh Hashanah are one sanctity; Rambam and his supporters there that all else not overriding Shabbat overrides second galut Yom Tov.',
    '14#א':
      'I did not find, etc. Taz expanded; his conclusion: though the elder Beit Yosef and Rav Simeon ruled to be stringent l\'chatchila, nevertheless one should not protest those practicing leniency even l\'chatchila; he needlessly expanded though Rav himself rejected all Beit Yosef\'s words in Darchei Moshe and responsum 76, and on the contrary expanded proofs to permit — see there except he feared that booklet perhaps hung on a great tree; custom already spread to permit — likewise Taz, Bach; Rav Beit Yosef himself wrote in Beit Hashem on his words: Orach Chayyim writes in Baer Heitev\'s name two mohalim on Shabbat — one circumcises and one uncovers, and the first has no liability for the cut since the second completes the mitzvah, as Rav Pappa said "I do half the mitzvah and you do the other half" — end of his words.',
    '14#ב':
      'In Beit Hashem — Rashbatz responsum: three days before Shabbat on a ship one may not separate less than three days — Rashaz explains lest Shabbat desecration be inevitable; appears as permitting Shabbat desecration; from here one might learn forbidden to circumcise a convert on the fifth day lest Shabbat be desecrated for milah — likewise infant healed on the fifth, wait until tomorrow — end of his words. His words are not clear, for we say Shabbat 19a regarding separating on a ship it is only for optional matters but for a mitzvah it is fine and agreed by all poskim Orach Chayyim 248; here too there is no greater mitzvah; moreover Rashbatz holds circumcising on the third for milah is specifically day three, not before — therefore permit on the sixth; but per Maggid Mishneh chapter 2 Shabbat in some commentators\' and Ramban and Rashba\'s name, even on the second day one desecrates; Rambam in mishnah commentary and Bartenuro and Rashi Rabbi Akiva — if milah not at its time on the fifth on Shabbat is deferred until after Shabbat, impossible — contradicts mishnah Rabbi Eliezer small child circumcised on the eighth, twelve neither less nor more, born bein hashmashot, second Yom Tov of Rosh Hashanah before Shabbat, circumcise on the 12th — we find it even on the 15th when second Yom Tov of RH falls on 3 and 4 making the 12th the fifth, forbidden on the fifth since Shabbat was overridden and deferred to day one; rather certainly milah not at its time is permitted on the fifth, even poskim who hold only day three overrides Shabbat may agree for milah not at its time on the fifth, as proven from majority of poskim; so appears essentially.',
  },
  'siman_266/turei-zahav/part-001.txt': {
    '2#א':
      'To store it in a joined courtyard. So Beit Yosef in Rabbeinu Yerucham\'s name; Maharil wrote Mahari Segan instructed immediately after milah remove all milah needs considered muktzeh thereafter; mohel should not return to take the knife from the sand he threw there while foreskin was on the uncovering; Rashal responsum likewise permits like Rama here — since it was fit at twilight it is permitted all day, not muktzeh for half Shabbat; I am not fit to decide between great ones; but it appears clear forbidden — clear proof from Arukh Pesachim chapter 1 (11a): tannaitic teaching if one slaughtered meat on it, forbidden to move it — there regarding a board whose work is forbidden to crush in a mortar, yet they permit Beit Hillel to slaughter on it for Yom Tov need, and after Yom Tov need was done, forbidden to move; proof from chapter Ein Tzaddikin (Beitzah 28) pot in which meat was roasted — forbidden to move on Yom Tov because repulsive and muktzeh after Yom Tov need; this knife is the same — after the mitzvah it returns to muktzeh prohibition; Rashal "no muktzeh for half Shabbat" does not apply — "no muktzeh for half Shabbat" is Beitzah 26 regarding fit at twilight then on Shabbat it becomes fit again, not here where at twilight it was not fit except for Yom Tov need and not afterward; Beit Yosef in Rabbeinu Yerucham in Ramban\'s name permits moving after milah because after moving permissibly he may return wherever he wants — his reason: if he must throw the knife afterward and it would be lost he would refrain and not circumcise, better than Ulla\'s three items (Beitzah ch. 1) permitted at end because of beginning, not considered obvious; those three have novelty; Ramban permits only storing afterward in the room where he circumcised so it is not lost, not another place; also before milah do not move needlessly when not for milah need — so it appears.',
    '12#_':
      'They circumcise him on Shabbat. Tur wrote we do not presume he went to bad culture since his mother is Israelitess; Beit Yosef in Bedek HaBayit: Israelitess convert who bore from a convert — circumcise on Shabbat though they sinned as Israelites; "convert" excludes Kutim, not implying married convert excludes gentiles; I do not read so — Tur implies we do not presume bad culture when mother is Israelitess; when mother is convert we presume bad culture and forbid, requires study. Kutim are like her — Beit Yosef in Bedek HaBayit; Israelitess who bore from gentile also circumcise on Shabbat as child is kosher; Tur from his name we do not presume bad culture when mother is Israelitess; when mother is convert we presume and do not circumcise on Shabbat; though they give him to circumcise lest they return him to their way since they remained so; perhaps they are converts for entire Torah except milah.',
  },
  'siman_266/beur-hagra/part-001.txt': {
    '3#ד':
      '(Likut) And on those that do not impede. As conclusion of Nehardean gemara — we establish like Rabbis and halachah is like Rabbis, not like Abaye who wanted to rule unlike the baraita; their reason: all these are established as individual opinions; in Nehardean it holds like Rabbi Yosi — reason from Menachot 99b: R\' Ami from his words, R\' Yosi from Rashbi, Rava — all hold like Rabbi Yosi; anonymous gemara Nedarim 8a supports; not compelled; Bach concludes (end).',
    '9#ב':
      'And if he was born, etc. His opinion is like Hagaot Maimoniyot in dispute of Rabbah and R\' Yosi — we are stringent; Rif holds not due to stringency but halachah is like Rabbah; Rosh there; no practical difference. Hagaot Maimoniyot there is wondrous — wrote for individual accepting fast that bein hashmashot permitted until bein hashmashot — R\' Yosef stringently; if we are stringent, forbidden until bein hashmashot of R\' Yehuda who completes bein hashmashot; halachah is like R\' Yosi for "like" etc.; Beit HaShem means after fast, not before; Toseftzot like last ten days etc. (and my insertion Orach Chayyim 562, Likut 261 note 11). Possible he explains both; forced Pesachim 12a fast without contraction — all fasts without contraction; end commentators mean end sunset, certainly last sunset; plain language implies sunset alone, certainly last sunset (Rabbenu Tam and Shulchan Aruch; Rav in Likut 262 note 9, Orach Chayyim 261) — but it is start of bein hashmashot; likewise Chanukah; therefore that source favors Rabbah — after sunset and R\' Yosef; poskim on fast and Chanukah write 72 minutes because we hold like R\' Yosi stringently; baraita Chanukah is R\' Yehuda; Rav Chisda on fast; we hold like R\' Yochanan who rules like R\' Yosi stringently (and though we are lenient on fast for his safek, we do not combine two leniencies to also be like R\' Yehuda).',
  },
  'siman_266/beer-hagolah/part-001.txt': {
    '1#א': 'Baraisa Shabbat 132 side b.',
    '3#_': 'Rambam chapter 1 Laws of Milah.',
    '9#ב': 'Like Rabbi Yochanan there 35 side a.',
    '10#א': 'Baraisa there 135 side a.',
    '10#ב': 'There side b — dispute of amoraim, halachah not fixed, stringently.',
    '11#א': 'Baraisa Shabbat 135 side a, as established in Yevamos 80 side a.',
  },
  'siman_266/rabbi-akiva-eiger-yd/part-001.txt': {
    '3#_':
      'And Rashba that milah overrides. That which seif 3 "puts in mouth" — Rashba holds milah overrides; Ran follows this view; Rashba in his novellae wrote: rabbinic labor without complete melacha — we do not override milah because of rabbinic labor after milah.',
  },
};

function patchFile(rel, T) {
  const fp = path.join(ROOT, 'output', rel);
  let s = fs.readFileSync(fp, 'utf8');
  const applied = [];
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
    const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.push(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.includes(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.length} blocks)`);
  return applied.length;
}

let total = 0;
for (const [rel, T] of Object.entries(PATCHES)) {
  total += patchFile(rel, T);
}
console.log(`[PATCHED] ${total} blocks total`);
