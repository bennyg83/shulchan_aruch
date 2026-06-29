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

// Off-by-3 batch 2 (cases 6–10). Append HE[N-2], HE[N-1], HE[N].
const APPEND_3 = [

  // siman148/seif-001 (he=6, en=3)
  { siman:'siman148', seif:'seif-001',
    n2:`Or regarding, etc. Yerushalmi; and Tosafot cited it 2a s.v. "and to repay," etc.`,
    n1:`And nowadays, etc. There in Tosafot in the name of the Yerushalmi; and our Gemara speaks of when our authority is strong.`,
    n:`And if it is, etc. There in Tosafot: "however according to all," etc. — and it refers to interest; for otherwise the case of the Yerushalmi is difficult; and see Rosh there.` },

  // siman161/seif-002 (he=5, en=2)
  { siman:'siman161', seif:'seif-002',
    n2:`(Supplement) And if he comes, etc. And so the view of Ramban in Milchamot and the Rosh in his name, seif 17; and Ramban wrote, etc.; and all the more so if he lent him, etc.; and even to fulfill one's obligation, etc. And see above, siman 166 seif 1 (end).`,
    n1:`(Supplement) Rashba disagrees with this, and wrote in Bava Kamma 75a — from what we say there: "there is nothing to your words" — like R' [X]: we deduce from the Yerushalmi in general that for a penalty, whenever there are no witnesses, he is not even obligated to fulfill the duty of Heaven; for otherwise R' Gamliel would free [a slave] in order to fulfill the duty of Heaven; and he wrote: the same applies to dust of interest; and likewise implied in chapter 5 of Bava Metzia (64–65) in the case of Rav Yosef bar Hama — who said "I retract" — meaning from here onward; and we do not find that he returned to them the wages of the servants they worked [for free] (according to the words of Ramban and Rosh seif 17 there is no proof from this) (end).`,
    n:`(Supplement) And if he comes, etc. For there is [a passage] from a Tosefta — it is not compelling, for so it is taught there at the end of chapter 5: "one who lent his fellow with interest and repented — he is obligated to return it; if he died and left [money] before his sons — his sons need not return it; regarding this it is said: 'the wicked man prepares and the righteous man wears it'"; but if his father left them a cow, field, garment, or anything with liability — they are obligated to return; and "[if] he repented" is [mentioned] because of the latter clause — as written in Bava Kamma chapter 9 and Bava Metzia there (end). (Supplement) Besides interest, etc. For it was given as a gift — as written there in the mishnah (75b): "a gift," etc. (end).` },

  // siman162/seif-002 (he=5, en=2)
  { siman:'siman162', seif:'seif-002',
    n2:`(Supplement) Or he should lend him, etc. Beit Yosef — unlike Rashba; and at first glance there is proof for his words from what is written [there] 75: "a drop of wine," etc., and he wrote the reason: "the first drop the borrower lent is considered his," etc.; and see Turei Zahav siman 163 paragraph 2, which is from the words of Rashba — and here he does not hold so; and see Turei Zahav (end).
He [the borrower] had, etc. But, etc. 63b: "there is no need," etc. — "to teach," etc. — "since," etc. — unlike a deposit; and therefore it says "credit"; and as written in the last chapter of Pesachim (113a); and see above siman 258 seif 7.`,
    n1:`And likewise if, etc. As written there 73a: "one who carries," etc. — specifically in that place.
A borrower, etc. See siman 163 seif 1 (in paragraph 5).`,
    n:`(Supplement) A borrower who said, etc. As written in chapter 4 of Gittin (37b): "in [the case of] a prozbul he is trusted," etc. — "he would not abandon," etc.; and likewise here he may take a small amount as a gift or as a loan, as above; and see above siman 169 seif 25: "Reuven who said," etc.; and likewise in other claims, etc. — see there (end). (Supplement) [The reason] it is permitted to lend, etc. As written there 64a: "Rav Shravya said to Abaye," etc.; and see Tosafot there s.v. "if she seized," etc.; and one can say that forever, etc.; and this is also what is written in seif 3: "and [but]," etc.` },

  // siman168/seif-018 (he=13, en=10)
  { siman:'siman168', seif:'seif-018',
    n2:`And it is forbidden, etc. As written 65b; and as written above at the beginning of siman 174. Rather, etc., and afterward, etc. As written there: "when you will have money," etc. — it is permitted; and according to R' Chananel's explanation which Hagahot Ashiri wrote there s.v. "R' Chananel," etc. (and see above siman 174 paragraph 8).`,
    n1:`And regarding oral debts, etc. For an oral debt cannot be transferred except by the simultaneous presence of three parties — as written in Choshen Mishpat siman 203 seif 9; and according to R' Tam, a gentile's debt cannot be transferred even by simultaneous presence of three parties — as written there in siman 126 seif 22.`,
    n:`"You are exempt," etc. As written there in the gloss — see there; and all the more so regarding interest, it is permitted; and see Tosafot 71b s.v. "granted," etc. — and even if the Jew did not renounce [ownership], etc.` },

  // siman173/seif-001 (he=5, en=2)
  { siman:'siman173', seif:'seif-001',
    n2:`And there are those who, etc. Sefer HaTerumah in the name of Ramban and the Tur — for this is like [a case where] its [market] value is known, since it is known that he does not customarily add so much.`,
    n1:`A matter, etc. As written in Sefer HaTerumah in the name of Ramban — that what is challenged there from the mishnah "and if for [payment at] the threshing floor," etc. — even though he increases greatly for him — is because in Nisan land is expensive, as written in chapter 1 of Bava Kamma (col. 7, col. 3).`,
    n:`(Supplement) A matter, etc. And this is wondrous to me — since its value is known, it is like a fixed rate; and even though it is customary in most [cases], etc., still it is close to profit and far from loss, etc. But in Hagahot Maimoniyot it wrote differently: "and what they were accustomed from ancient times — to give coats at the time of the great fair for such-and-such a price according to the expensive market — this is because they calculated it contingently: if a nobleman comes to the city and covets them, their price will exceed their value; and if the nobleman arrives at the city immediately he would double their price; and there is no waiting fee here," etc. And one must say that in most instances the noblemen would come to the city — for otherwise it appears like a waiting fee; it is implied that there, if the nobleman comes, he would double [the price] more than what [the buyer] paid — and this is what is written that they calculated it contingently; and it is also close to profit — like all merchandise which is contingent; and even so it requires that in most instances, etc. — for even though by law it is permitted, nevertheless it appears [like interest], etc. And it requires study (end).` },

];

let ok = 0, fail = 0;
for (const { siman, seif, n2, n1, n } of APPEND_3) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== 3) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} (expected 3, he=${heS.length} en=${enS.length})`);
      fail++; continue;
    }
    const newSegs = [...enS, n2, n1, n];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+3 → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
