import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }

// For partial-real cases, EN[1] is a correct translation of HE[1].
// We keep EN[1] as Group 1 and add the missing groups.
// getEN1(siman, seif) reads the current EN file and returns the first segment.
function getEN1(siman, seif){
  const raw = fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim();
  return brSegs(raw)[0];
}

// ── siman274/seif-007  he=3 en=1 ──────────────────────────────────────
// HE[1] already covered by EN[1]; add HE[2] and HE[3] translations.
const s274_007 = () => [
  getEN1('siman274','seif-007'),

  `Specifically, etc. Since it does not have the measure of a closed section; and in Massekhet Soferim chapter 1 halachah 10: 'continuous — if he made it ruled,' etc. — that is, [specifically when it is] the measure of a closed section.`,

  `(Supplement) Specifically, etc. — all, etc. From what is written in chapter 12 of Shabbat (103b): 'he made it valid' — and regarding [making it] in song we say in Massekhet Soferim that one must leave the measure of a closed section — as the Rosh wrote in their name in seif 14; and likewise the Rivash in siman 286 from the words of the Rambam, who said 'he made it valid' — implying specifically the measure of a closed section; and see above siman 273 seif 3: 'and if there is no,' etc., 'let him leave blank,' etc.; and there seif 4: 'it happened,' etc., 'and if not, let him leave,' etc. (end).`,
];

// ── siman293/seif-002  he=3 en=1 ──────────────────────────────────────
// HE[1] already covered by EN[1]; add HE[2] and HE[3] translations.
const s293_002 = () => [
  getEN1('siman293','seif-002'),

  `(Supplement) See in the gloss of BHG what he wrote as proof from the Yerushalmi at the beginning of Challah — but he erred, and it is in chapter 2, and the Yerushalmi there is as follows [and Tosafot cited it in Rosh Hashanah 13a s.v. 'de'akrivu,' etc.]: R' Yona asked before R' Yirmiya: when Israel entered the land and found ripe standing grain — what is the law, would it be forbidden as chadash? He said to him: why not? Not only moist but even dry, even harvested, and even wheat in an upper room — so I say! R' Yona said: from the time I left I was perplexed that I did not say to him: it is different, for a positive commandment overrides a prohibition — according to the view of R' Yona who says a positive commandment overrides a prohibition even if not written beside it; and according to the view of R' Yosi who says a positive commandment only overrides a prohibition if written beside it — [it is derived] from the fact that the merchants of the gentiles sold them; and like R' Yishmael, for R' Yishmael said: all [references to] 'coming' stated in the Torah [apply] after fourteen years — seven of conquest and seven of division; R' Bun bar Kahana challenged: but it is written 'and they ate from the produce of the land from the day after Pesach' — was it not the sixteenth? — evidently we do not say [it is derived] from the merchants of the gentiles, but only like R' Yishmael, the first tanna of Kiddushin — and the challenge holds and it is written, etc.; and likewise we say in our Gemara in Rosh Hashanah 13a; and although the Yerushalmi raises a challenge there from R' Eliezer b'Rabbi Yosi before R' Yosi: 'and it is written: ממחרת הפסח the children of Israel left — was it not on the fifteenth?' — we do not hold so, for our Gemara disagrees there; and according to our Gemara it is fine, for we hold that a positive commandment overrides a prohibition even if not written beside it, as written at the beginning of Yevamot in the sugyah of levirate marriage — and likewise in chapter 2 (20-21) there, that levirate in the diaspora overrides the diaspora prohibition biblically — and in many places; and from the Gemara in Rosh Hashanah mentioned above there is proof that we hold like R' Eliezer (end).`,

  `(Supplement) Terumat HaDeshen siman 191 wrote that if a gentile sowed it three days before the Omer it is permitted — as written in chapter 4 of Pesachim (55a); and Shach cited this; but his words are astonishing, for it says there specifically according to R' Yehudah — and we rule like R' Yehudah and R' Shimon, as written at the end of chapter HaArel (and likewise Nachalat Kehunah challenged this); but I found in the Yerushalmi chapter 2 of Kil'ayim, cited by R' Shimshon there: 'wait until it is turned over — he said there: three days'; and it is possible to distinguish between sowing and planting; and the Gemara that says 'according to R' Yehudah' — for the sake of broader discussion — but this is forced; and requires study (end).`,
];

// ── siman177/seif-014  he=8 en=1 ──────────────────────────────────────
// EN[1] is a garbage blob covering HE[1]-HE[5] in one segment.
// Replace entirely with 8 fresh groups.
const s177_014 = [
  `One who says, etc., forbidden because, etc. Meaning even though by law it is permitted — as written in Bava Batra 168a in the mishnah 'one who paid,' etc.; and some explain [this is only] regarding asmakhta, as written there; but regarding interest there is no waiting fee, since it is only for one moment — if that moment passes he will give, etc., and it is a penalty — nevertheless it is interest evasion as above; and in the mishnah there one can say he gives him the first money he paid as a gift. Rashba and Rivash siman 335.`,

  `(Supplement) One who says, etc. Rashba siman 651; and likewise R' Yitzchak Migash in Bava Batra 168a — like the mishnah there: 'one who paid,' etc. (end).`,

  `(Supplement) One who says, etc. As written: 'one who paid part of his debt,' etc.; and in Bava Metzia 65b: 'he lent him on his field,' etc. — and the Gemara says he acquired all of it and even more in proportion to his money; and even one who disagrees — it is only because of asmakhta. Rashba in Teshuvot HaRashba part 2; but afterward he wavers to forbid from the outset because of interest evasion, like the interest evasion there 2b and the Narshai tenants and deferred interest, etc.; and the mishnah 'he lent him,' etc. — a sale is different for it is like a sale; and the mishnah 'one who paid' — the first payment is retroactively a gift; and even for the one who says 'any amount of zuz, remove him' — here he admits it is worse than dust of interest and like deferred interest, though lighter than it, except it is forbidden from the outset because of interest evasion; and this is what is written in siman 161 seif 2, 'apart from,' etc. (end).`,

  `(Supplement) One who says, etc. But by law it is not interest, since he is not obligated at all until that time, and for one moment he became obligated — even though in his mind it is because he profits with his money over the course of time; proof from what is written in Ketubot 66a: 'she assessed to bring in,' etc.; and Rashi there s.v. 'he assessed,' etc., according to intent; and Mordechai wrote there: it is not interest, since if he divorces her immediately he owes her; and likewise Hagahot Ashiri there s.v. 'he explained,' etc. (end).`,

  `(Supplement) One who says, etc. As written above that they wrote it is permitted by law since it is only one moment, except that one should be stringent lest they evade thereby — and this is not clear to me, for we say in Bava Metzia 14b that for Shmuel it is interest; and they did not say 'it appears like interest' except because it is a sale, as written [there] 15; and 'and when permitted,' etc. — 'there [it is] a loan,' etc.; and furthermore, [in the sale case] he did not think of this, and because of this Rav holds it is permitted; and it is possible to say because he stipulated from the outset that he owes from now — as written there 15a, and Rashi there s.v. 'he acquired it from his hand,' etc.; and this is what is written in the gloss: 'and some permit,' etc.; and likewise as written there, and Rashi there s.v. 'if there is,' etc.; and likewise the Rosh there wrote that it does not appear like interest since he does not return money to him; but it still requires study, as written there: 'and when permitted,' etc. — 'and when permitted,' etc. — 'there [it is] a loan,' etc. — evidently it is only permitted in a sale; and there it is not because of interest evasion, certainly — for he did not sell it to him with this intention; and certainly Rav does not disagree in the case of a loan; and furthermore, according to the Rashba who proved [it] from the mishnah in chapter Get Pashut — would Shmuel disagree with the mishnah? And requires study; and even regarding 'one who recognized it was not his' — that the Rosh there in the name of Razah wrote that if he specified to him the appreciation, that it has appreciation — he yet wrote that nevertheless perhaps the language of the sale, etc.; and in this too the Rosh there disagreed (end).`,

  `(Supplement) One who says, etc. Since it is not [tied to] a time period like 'he lent him,' etc. — 65b; but requires study regarding how it differs from 'he mortgaged his house as a mortgage,' etc. — there in the Gemara; and Tosafot there s.v. 'not,' etc., 'and if you say,' etc.; and likewise the Rosh there, and Hagahot Or Zarua in seif 29 beginning of s.v. 'there' (end).`,

  `And some permit, etc. Since he gives him produce it is like a sale and there is no [issue of] interest evasion — and as written there 62b, and as stated above seif 18.`,

  `(Supplement) One who says, etc. — and there are [those who permit], etc. And by law according to all it is permitted, since it does not depend on extending the time period; and proof from what is written in the mishnah chapter 6 of Ketubot: 'she fixed for him a thousand,' etc.; and we say in the Yerushalmi — the Rif, Rosh, and others cited it: because he profits in them; and see in Mordechai and Hagahot Or Zarua there s.v. 'R' Shimshon son of R'B explained — it is not interest,' etc.; and even though Tiferet Yisrael wrote there another answer and wrote 'they said and they said,' etc. — his words are strained; why did the Rabbis need to permit here? (end).`,
];

const TRANS = [
  { siman:'siman274', seif:'seif-007', segs: s274_007() },
  { siman:'siman293', seif:'seif-002', segs: s293_002() },
  { siman:'siman177', seif:'seif-014', segs: s177_014 },
];

let ok = 0, fail = 0;
for (const { siman, seif, segs } of TRANS) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heRaw = fs.readFileSync(hp, 'utf8').replace(/^﻿/, '').trim();
    const heS = brSegs(heRaw);
    if (segs.length !== heS.length) {
      console.log(`MISMATCH ${siman}/${seif} segs=${segs.length} he=${heS.length}`);
      fail++; continue;
    }
    const out = join(segs);
    if (DRY) {
      console.log(`DRY ${siman}/${seif} → ${segs.length} segs`);
      segs.forEach((g, i) => console.log(`  G[${i+1}]: ${g.substring(0, 80).replace(/\n/g, ' ')}`));
    } else {
      fs.writeFileSync(ep, out, { encoding: 'utf8', flag: 'w' });
      console.log(`OK ${siman}/${seif} → ${segs.length} segs`);
    }
    ok++;
  } catch (e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
