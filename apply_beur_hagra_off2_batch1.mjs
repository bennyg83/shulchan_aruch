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

// Off-by-2 batch 1 (cases 1–10).
// Strategy: keep existing EN[1..N-2], append translation of HE[N-1] then HE[N].
const APPEND_2 = [

  // siman103/seif-004
  { siman:'siman103', seif:'seif-004',
    prev:`(Supplement) And some say, etc. See what is written there: honey in its visible form improves flavor but absorbed honey worsens it; and likewise wine that is in water and other beverages improve in visible form but worsen when absorbed — as written in Avodah Zarah 33b; and see what I wrote above in siman 122 seif 5 (end).`,
    last:`(Supplement) Meat or, etc. Hagahot Ashiri there, chapter 11 s.v. "and likewise," etc. (end).` },

  // siman128/seif-003
  { siman:'siman128', seif:'seif-003',
    prev:`Even sealed barrels. As written there 61a: a baraita — one who buys, etc., in another courtyard it is permitted; and it is, etc. Terumat HaDeshen.`,
    last:`If he tarried, etc. As written there in the mishnah, 69a.
And even if he was, etc. The view of Rashba is to permit in such a case — as written there 61a: in the same courtyard it is permitted, etc.; but in the name of Raavad he wrote that he forbids; and he wrote that according to his view one must say that the discussion there concerns one who never locked at all — or alternatively one can say that there it is different, since he has no real connection to the house, etc.` },

  // siman129/seif-005
  { siman:'siman129', seif:'seif-005',
    prev:`And even if he said to him, etc. As above, seif 1.`,
    last:`And if the gentile, etc. As written above, siman 128 seif 5; and see Tosafot there s.v. "he did not deliver," etc.` },

  // siman129/seif-011
  { siman:'siman129', seif:'seif-011',
    prev:`(Supplement) And if it was in some of them, etc. As written in Piskei HaGra (95a): "and because of this fool should all the market stalls be forbidden? We are not concerned — just as he sold to this one he sold to that one" — hence any matter where we would not have found a defect would be permitted; when we find a defect in one of them, we do not establish a presumption of prohibition in the others, etc. Mordechai siman 1338; see there where he elaborated on this (end). And some say, etc. See there.`,
    last:`(Supplement) And some say, etc. See above, siman 114 seif 10; and Turei Zahav here (end).` },

  // siman130/seif-001
  { siman:'siman130', seif:'seif-001',
    prev:`And some permit, etc. As written there 9b: "and now that we rule like Rabban Shimon ben Gamliel," etc. There.`,
    last:`(Supplement) And some permit, etc. In Tosafot 9b s.v. "what is the reason." However, it appears to R' Yitzchak that one cannot distinguish, etc.; and so other authorities (end). Provided, etc. In the aforementioned Tosafot s.v. "the one who sent" and there 70a s.v. "what is the reason." And if, etc. — see above siman 124. There, seif 24 in the gloss.` },

  // siman131/seif-001
  { siman:'siman131', seif:'seif-001',
    prev:`And there are those who, etc. For he explains the mishnah and the baraita as all referring to a key or seal; but with a double lock it is permitted according to all, as it is like sitting and watching; and proof from what is written there 31a: R' [X] said, etc., and R' [Y] said, etc., so-and-so in many places, etc. — and if that were so, behold the Rabbis here forbid even with a double lock even regarding a Jew's own wine, as written here: "and the Sages forbid," etc. — regarding what, etc. There.`,
    last:`(Supplement) And there are those who, etc. For the Rabbis here who refer to the first clause and say "until," etc. are the same Rabbis there, 31a, as above; and we say there according to R' Yitzchak that the Rabbis rule leniently with a double lock — and accordingly "until there is a watchman," etc. is not exact, for even a double lock suffices; and likewise in the latter clause, and likewise in the mishnah which says "until he sat and watched" — not exact, for a double lock suffices; and likewise according to the Rif's approach which speaks of a key or seal — the Rabbis there also dispute in this manner, but regarding a double lock they concede, and the same applies in the latter clause regarding "the purifier"; but Tosafot s.v. "the purifier" wrote that according to R' Eliezer there is no difference between a single seal and a double lock, and since he forbids in the latter clause with a single seal, the same applies to two seals; and so wrote the Rosh there; and as above, that the baraita is entirely R' Eliezer's, whether according to Rif or according to Tosafot, and only the Rabbis make the distinction (end). And one may rely, etc. See above, siman 130 seif 2.` },

  // siman132/seif-001
  { siman:'siman132', seif:'seif-001',
    prev:`And if, etc. there are, etc. Tosafot there [b] s.v. "it is fitting," etc.; and he further added, etc.; and the Rosh and Mordechai there.`,
    last:`(Supplement) There are those who, etc. And Ramban disagrees with this; his words appear correct; and Ran strained to rebut his words — see there at length; and Ramban's words are the essential ruling (end). (Supplement) Even though regarding the husband, etc. The Rosh there — and even if the money is permitted, that is only for another Jew, etc.; and according to the approach of Tosafot and Rashi there 54b, and there 62a Tosafot s.v. "we learned in the mishnah," etc., and in Chullin regarding leavened bread, etc.; and see what I wrote in Orach Chaim siman 443 and siman 450, that Ran and other authorities permit even for oneself after the fact (end). And all this, etc. In the aforementioned Tosafot s.v. "to exclude," etc.; and as above at the beginning of siman 123.` },

  // siman134/seif-003
  { siman:'siman134', seif:'seif-003',
    prev:`His words, etc. See Tosafot there s.v. "come and hear," etc.`,
    last:`And this is a dispute, etc. For what was written initially "in what case," etc. is the language of the Rambam, and he does not hold according to the view of Tosafot.` },

  // siman137/seif-001
  { siman:'siman137', seif:'seif-001',
    prev:`And there is no distinction, etc. See Rashi 74b s.v. "that it is not," etc.: "and from the wine press, approximately a year during which he did not press in it"; and from the fact that it is forbidden to make a mat, as above. Responsum of the Rosh there; and see what I wrote in siman 122 seif 3 (in paragraph 11).`,
    last:`(Supplement) And there is no distinction, etc. Ran at the end of tractate Avodah Zarah — unlike Ramban — from what is written there 75b: "and all those which he used," etc.; and Ran explained in the name of others: that he did not immerse them, did not rinse them, and their use as cups was with wine; but Ran refuted this, saying that even according to his view, only the coating on the surface of the vessel is worsened, but not the absorbed [taste], since whatever has aged longer only improves (end).` },

  // siman141/seif-004
  { siman:'siman141', seif:'seif-004',
    prev:`Or if there is, etc. As written in seif 1.`,
    last:`It is permitted to make them. Meaning even to make them — from the rule that a ring whose seal protrudes is permitted to seal with it, and according to his approach as above; but according to Rambam it is forbidden to make them, and all the more so according to Ramban and Rambam [of Rothenburg] for whom even to keep them is forbidden according to all.
And the form of the sun and the moon, etc. Tosafot there s.v. "but R' Gamliel," etc.; and according to their words one must say that when he answered there "its seal protrudes," etc. — he did not raise the answer that it belongs to many; and the questioner entered within his words until he raised the answer that R' Gamliel's belonged to many.
And if they are, etc., even if they protrude. As above, that regarding the sun and moon there is no distinction, and nevertheless he answered "alternatively," etc.
And some permit, etc. The Gemara there; and so wrote the Rosh and the Tur; but the Rif omitted it — and as written above, that he did not have it in his text; and likewise it seems that as for what he answered "for the purpose of learning" — nevertheless we are concerned about suspicion; but according to the aforementioned reading there is no concern about suspicion at all, and he answers only that even if he himself made it, it is permitted — and as above.` },

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
