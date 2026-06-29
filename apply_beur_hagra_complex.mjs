import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }

const TRANS = [

  // ── siman130/seif-009  he=3 en=1 ─────────────────────────────────
  // EN[1] is wrong (covers only HE[2][2]). Replace all 3 groups fresh.
  { siman:'siman130', seif:'seif-009', segs: [
    `And even if there was also, etc. Terumat HaDeshen; and as written below: 'if the gentile,' etc.; and as written there.
If there was, etc. Like the first tanna who follows R' Eliezer. Rif, Rosh, Ran, and others.`,

    `(Supplement) If there was, etc. Like the first tanna who follows R' Eliezer. Rif; and from here support for Rashba's and Ran's explanation that the Rif ruled like R' Eliezer — but he explains that a key or seal is required, as above; and he explains the Rif's words: that the aforementioned baraita 'one who rents or buys [a house] from a gentile,' etc. (31a) — necessarily deals with a different courtyard, for otherwise no key or seal would be needed, as written here; and accordingly R' Meir and the Rabbis here dispute the same dispute as R' Eliezer and the Rabbis there; and what is written 'and the Sages say: always forbidden' — it means without a key or seal; but with inner partition, certainly it is permitted according to R' Yochanan there. And according to Tosafot's approach, the discussion here is regarding a key or a seal; and the halachah is also like the first tanna who follows R' Eliezer; and see Ran and siman 131 in the gloss (end).
If the gentile, etc. From what is written regarding a gentile's courtyard; and no difficulty from 'the renter or buyer of a house from the gentile.' Terumat HaDeshen.`,

    `Unless, etc. There he wrote that some permit even in such a case — as stated above siman 128 seif 2; but Raavad forbids since he rented, etc.; and see Shach.`,
  ]},

  // ── siman296/seif-045  he=3 en=1 ─────────────────────────────────
  // EN[1] is garbled fragments of all 3 segs. Replace all fresh.
  { siman:'siman296', seif:'seif-045', segs: [
    `A fence, etc. The aforementioned mishnah; and in Eruvin there: there is, etc.`,

    `(Supplement) A fence, etc. See above siman 47: 'partition,' etc.; and Rashi in Bava Kamma there and in Bava Batra there (end).`,

    `(Supplement) A fence, etc. The Rosh brought proof from what is written in Bava Batra 26a: 'there was a fence between them,' etc. — and these are the words of Rashi there (b) 1a s.v. 'he says to him,' etc.; and Tosafot 26a s.v. 'one,' etc. who challenged him: the mishnah does not [deal] with seeds; and likewise the Rosh and Hagahot Or Zarua there: regarding seeds we require more, according to estimation, etc. (end).`,
  ]},

  // ── siman155/seif-002  he=3 en=1 ─────────────────────────────────
  // EN[1] = only HE[1][3] (one sub-entry). Replace all fresh.
  { siman:'siman155', seif:'seif-002', segs: [
    `A gentile, etc. As written in chapter 2 of Pesachim (25a): 'with everything one may be healed except asherah wood'; and what distinguishes it from water — the Yerushalmi: R' Yona was ill with tzamarurin, etc.; and Tosafot in Avodah Zarah there s.v. 'it is different,' etc.
But if, etc. Tosafot in the aforementioned s.v., from the Yerushalmi chapter 14 of Shabbat (and see above siman 157 s.k. 26).
Even though, etc. The Rosh there.`,

    `And some forbid, etc. As it is in the Yerushalmi in chapter 2 of Avodah Zarah. Ran there; and see Beur HaGra; and so the Rav ruled in siman 157 seif 1 in the gloss: 'and all prohibition of idolatry and adultery,' etc.`,

    `(Supplement) And some forbid, etc. In the Yerushalmi chapter 2 of Avodah Zarah: R' Yaakov bar Idi in the name of R' Yochanan: 'with everything one may be healed except idolatry and adultery and bloodshed'; R' Pinchas asked: until when? When he said to him 'bring me wood of idolatry' and he brought him; [or when he said] 'bring me leaves' unspecified and he brought from idolatry — shall we derive from this? R' Yona was ill with tzamarurin; they brought him from the male of Chovi and he drank; [one time] they brought to R' Acha and he did not drink; R' Mana said: if R' Yona had known from where, he would not have drunk; and likewise in chapter Eight Sheratzim; but Tosafot do not read 'R' Pinchas asked,' and likewise do not read 'shall we derive from this'; and Tosafot there s.v. 'it is different,' etc. (end).`,
  ]},

  // ── siman160/seif-016  he=4 en=1 ─────────────────────────────────
  // EN[1] = only HE[2][3] snippet. Replace all 4 groups fresh.
  { siman:'siman160', seif:'seif-016', segs: [
    `And he, etc. Rosh and Tur; and the Rosh brought proof from chapter 7 (90b); and requires study, for it seems there like the one who permits; and likewise Or Zarua challenged; and according to Rambam and Shulchan Arukh there it is fine; but according to the Rosh there it is difficult; and one can say there it is only due to a penalty and they only penalized him — unlike here where it is biblically forbidden; and his proof is from the question regarding the minor son, whether they penalized him since he is like his [father's] body.
And he does not rely, etc. For otherwise it would be like there 12b; but for a minor it is different, since he is obligated to support him, as written in chapter 4 of Ketubot (49b, 50a); and as above seif 10; and see Beit Yosef and Taz.`,

    `(Supplement) Some say it is forbidden, etc. Hagahot Or Zarua there s.v. 'however,' etc. (end).
Some say it is permitted, etc. As written there that the Torah did not forbid, etc.; and note that it is not comparable to there, as Tosafot of Kiddushin mentioned wrote 'lest it be returned,' etc.; and as above; and as written in seif 13; and already Beit Yosef, Levush, and Taz wrote that it is a great error and some errant student wrote it; and even though Darkei Moshe, Bach, and Shach upheld it — it does not appear correct, and it is an outright error.
And nevertheless if, etc. Mishnah 75b: 'how did he give,' etc.`,

    `But if, etc. — that the document, etc. As written 62a that on writing the document alone one is liable. There.`,

    `(Supplement) But if a messenger, etc. See Rashi 57b s.v. 'with stones,' etc. (end).`,
  ]},

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
