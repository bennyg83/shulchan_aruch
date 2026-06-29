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

// Off-by-2 batch 3 (cases 21–30).
const APPEND_2 = [

  // siman270/seif-001
  // HE[N-1]: שכר כו' אבל כו'. מנחות ל' א' ועתוס' שם ד"ה אם כו':
  // HE[N]:   (ליקוט) ערש"י שם ד"ה כחוטף. מצוה עבד כו' ועט"ז ודברי רש"י עיקר (ע"כ):
  { siman:'siman270', seif:'seif-001',
    prev:`Payment, etc. But, etc. Menachot 30a; and see Tosafot there s.v. "if," etc.`,
    last:`(Supplement) See Rashi there s.v. "like one who snatches." He performed a mitzvah, etc.; and see Turei Zahav; and Rashi's words are the essential ruling (end).` },

  // siman284/seif-002
  // HE[N-1]: אם הוא כו'. הרא"ש בפ"ב דמגילה בשם הרמב"ן טעם למנהגינו: ואין חילוק כו'. דכתיבה היא כמ"ש בגטין כ' א' ב':
  // HE[N]:   ואם שירטט כו'. עתוס' הנ"ל ד"ה ואמר כו' והרא"ש דמגילה שם: וי"א כו'. עבה"ג ולהרמב"ן הנ"ל משום שרטוט הוא:
  { siman:'siman284', seif:'seif-002',
    prev:`If it is, etc. The Rosh in chapter 2 of Megillah in the name of Ramban — the reason for our custom. And there is no distinction, etc. For it is writing — as written in Gittin 20a-b.`,
    last:`And if he ruled lines, etc. See the aforementioned Tosafot s.v. "and he said," etc., and the Rosh in Megillah there. And some say, etc. See Beur HaGra; and according to Ramban aforementioned it is because of ruling lines.` },

  // siman296/seif-003
  // HE[N-1]: (ליקוט) ואפי' הקש כו' והעצים כו'. וכ"כ תוס' בפסחים כ"ה א'...
  // HE[N]:   בעת שריפתן. לאפוקי אפרן שמותר לכתחלה וגחלים דיעבד...
  { siman:'siman296', seif:'seif-003',
    prev:`(Supplement) And even the straw, etc., and the wood, etc. And so Tosafot wrote in Pesachim 25a s.v. "their essence," etc.; but it appears to me clearly that the wood is permitted and likewise the straw; and this is what is written in Pesachim there: "this says that," etc. — "its essence," etc. — specifically its essence; and if so, the essence is no worse than the straw and the wood; and likewise in Ketubot 80a and in Bava Batra 36a: "she ate orlah," etc. — and unlike what Tosafot strained to explain there and there; and proof from what is written in chapter 10 of Terumot and chapter 3 of Orlah: "one who had bundles of fenugreek from kilayim in the vineyard — let them be burned"; and if so, why did it specify "bundles of fenugreek"? — rather, specifically fenugreek where the taste of its wood and fruit are the same; and what is written in Pesachim 26b "the straw of kilayim in the vineyard" — that too refers to fenugreek, similar to "shells of orlah" which applies only to the shells of nuts and pomegranates; but in the Yerushalmi end of chapter 5 of Kil'ayim, which R' Shimshon cited there in mishnah 7: R' Zeira in the name of R' Lazar: "if weeds," etc.; R' Yochanan, etc.; and furthermore there: R' Yaakov bar Idi in the name of R' Lazar: "sometimes the straw is permitted and the grain forbidden; sometimes the straw is forbidden and the grain permitted," etc.; and as I will write below in seif 66; and one must say this too refers to fenugreek — and it is forced; and it requires study; but the wood is certainly permitted, and with this the case of bundles of vine shoots aforementioned is resolved (end).`,
    last:`At the time of their burning. To exclude their ashes, which are permitted ab initio, and their coals — after the fact — as written there 26b; and see Tosafot there s.v. "she cooked," etc.; and see what I wrote in Orach Chaim siman 445 seif 2.` },

  // siman296/seif-004
  // HE[N-1]: ואין אדם כו'. עבה"ג ועתוס' שם ד"ה קידש כו' ועתוס' שם ד"ה ד' יוסי כו' ועמ"ש למטה בס"י על ההיא דמנחות:
  // HE[N]:   (ליקוט) פ' כשמואל יבמות ס"פ הערל ואע"ג דר"ה א"ר פליג...
  { siman:'siman296', seif:'seif-004',
    prev:`And a person cannot, etc. See Beur HaGra; and see Tosafot there s.v. "he consecrated," etc.; and see Tosafot there s.v. "R' Yosi," etc.; and see what I wrote below in seif 10 regarding that of Menachot.`,
    last:`(Supplement) The ruling is like Shmuel — Yevamot at the end of chapter HaArel; and even though R' Huna said in the name of R' [X] disagrees — R' Ada in the name of Rav holds like him; and the ruling does not follow one against two — unlike the Rosh in Yevamot there who ruled like R' Huna; and see the Rosh in Mo'ed Katan (chapter 1, siman 13) on the mishnah "one may not stir up," etc.; and see Bach siman 414 seif 1 in the gloss where the Rosh and his associates are explained as ruling like R' Huna; and Rambam [ruled] like R' Elazar bar Ahavah (and see there) (end). Therefore, etc. Yerushalmi there: R' Yochanan said: all concede regarding grapes that they are forbidden; R' Elazar said: the one who forbids is not forbidden; and the one who does not forbid is forbidden — what do they dispute? One who drapes his own grapevine over another's grain; but one who drapes another's grapevine over another's grain — all agree that the one who forbids is forbidden; one who drapes another's grapevine over another's grain — let us hear from this: R' Yehudah said, a case occurred where one sowed a vineyard on Shemitah, and the case came before R' Akiva and he said: a person cannot forbid that which is not his — behold, neither the grapevine is his nor the grain is his; and it was challenged; and R' Shimshon cited it and ruled like R' Yochanan.` },

  // siman297/seif-002
  // HE[N-1]: (ליקוט) ומותר לומר לעובד כוכבים כו'. עסי' רצ"ז ס"ד ובא"ח סי' ש"ז סכ"א (ע"כ): ואסור כו'. מתני' דפ"ח דכלאים...
  // HE[N]:   ואם כו'. כת"ק וכנ"ל ולמ"ש בס"א...
  { siman:'siman297', seif:'seif-002',
    prev:`(Supplement) And it is permitted to say to a gentile, etc. See siman 297 seif 4 and Orach Chaim siman 307 seif 21 (end). And it is forbidden, etc. The mishnah in chapter 8 of Kil'ayim — and even according to the first tanna, as above; and even though in Avodah Zarah 64 it implies that according to the Rabbis it is permitted — that is specifically in a gentile's field.`,
    last:`And if, etc. Like the first tanna, and as above; and according to what was written in seif 1, even according to R' Akiva he is not flogged — as written in the Yerushalmi; but in our Gemara in Makkot it does not imply so; but in any case, since we rule that a prohibition without an accompanying action carries no flogging, this ruling holds according to all.` },

  // siman331/seif-071
  // HE[N-1]: אבל כו'. בכורות נ"ד א' ובירושלמי פ"ב כמה פעמים אין תורמין ולא מעשרין מזה כו' ע"ש:
  // HE[N]:   ולא מן כו'. מנחות ל"א א'. ובהרבה מקומות דלמא אתי לעשורי מן החיוב כו'...
  { siman:'siman331', seif:'seif-071',
    prev:`But, etc. Bekhorot 54a; and in the Yerushalmi chapter 2 many times: "one may not separate terumah or tithe from this," etc. — see there.`,
    last:`And not from, etc. Menachot 31a; and in many places: "lest he come to tithe from [something that is] obligated," etc.; and this is what is written "and if he tithed," etc. — for otherwise we would not have decreed [this].` },

  // siman334/seif-013
  // HE[N-1]: אבל אם כו'. עובדא דר"א יוכיח:
  // HE[N]:   ויש כו'. ממש"ש י"ד ב' דאזיל ופייסיה כו' ובירושלמי שם...
  { siman:'siman334', seif:'seif-013',
    prev:`But if, etc. The case of R' Eliezer proves it.`,
    last:`And there are those, etc. From what is written there 14b: "he went and appeased him," etc.; and in the Yerushalmi there — and the Rosh cited it there at the beginning of the chapter — "and with the excommunicated one," etc. — "rather, in what case are we dealing," etc.; and this is what is written "and within," etc.` },

  // siman373/seif-007
  // HE[N-1]: (ליקוט) אסור לכהן כו' ודוקא כו'. א"ר פ"ד הלכה י"ג ט"ו ט"ז כהן הדיוט כו' היה עומד כו' נטמא כו' (ע"כ):
  // HE[N]:   ודוקא כו'. גמ' שם וירושלמי שם ואמר במ"ש להדיא דאפילו לכתחלה מותר בכה"ג...
  { siman:'siman373', seif:'seif-007',
    prev:`(Supplement) It is forbidden for a kohen, etc. — and specifically, etc. Alfasi chapter 4, halachah 13, 15, 16: "an ordinary kohen," etc., "he was standing," etc., "he became impure," etc. (end).`,
    last:`And specifically, etc. The Gemara there and the Yerushalmi there; and it says explicitly what I wrote — that even ab initio it is permitted in such a case; and the Rosh cited all of this in the laws of impurity, seif 6 — see there.` },

  // siman375/seif-007
  // HE[N-1]: (ליקוט) ס"ה וס"ז ע"ש (ברא"ש) ס"ס קמ"א (ע"כ):
  // HE[N]:   ואם נמצא כו'. עברא"ש שם וירושלמי א"ר מנא יש קריעה בלא איבול כו':
  { siman:'siman375', seif:'seif-007',
    prev:`(Supplement) Seif 5 and seif 7 — see there (in the Rosh) at the end of siman 141 (end).`,
    last:`And if it was found, etc. See the Rosh there; and the Yerushalmi: R' Mana said: there is tearing without mourning, etc.` },

  // siman380/seif-002
  // HE[N-1]: (ליקוט) אם הוא עני כו'. עתוס' שם ד"ה מכאן כו' ושם א' ד"ה אלו כו' (ע"ב):
  // HE[N]:   (ליקוט) מכאן כו'. ערא"ש סי' פ"ד ירושלמי וא"ר כו' (ע"כ):
  { siman:'siman380', seif:'seif-002',
    prev:`(Supplement) If he is poor, etc. See Tosafot there s.v. "from here," etc.; and there [a] s.v. "these," etc. (note: end of b).`,
    last:`(Supplement) From here, etc. See Rosh siman 84: Yerushalmi; and Alfasi, etc. (end).` },

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
