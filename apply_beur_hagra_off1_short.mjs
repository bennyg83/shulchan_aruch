import fs from 'fs';
import path from 'path';

// Strategy: for each off-by-1 case (he=N, en=N-1), preserve existing EN[1..N-1]
// and append the translation of the last HE segment as EN[N].

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(siman, seif){
  return brSegs(fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim());
}

// APPEND_LAST[i] = translation of the last HE segment only.
// The script reads existing EN, appends this, writes back.
const APPEND_LAST = [

  { siman:'siman128', seif:'seif-004',
    last:`(Supplement) And some say, etc. Hagahot [Mordechai] chapter 5 section 15 in s.v. 'and all.' Since, etc. (end).` },

  { siman:'siman130', seif:'seif-008',
    last:`And if the gentile, etc. See end of siman 129 in the gloss — from what was written there; and see what was written in Even HaEzer siman 16 seif 37 in the gloss.` },

  { siman:'siman135', seif:'seif-001',
    last:`If they are, etc. To exclude wineskins that are soft. There in Tosafot.` },

  { siman:'siman135', seif:'seif-005',
    last:`And even, etc. — and even, etc. From what is written there afterward: 'these cups,' etc.; 'these jugs,' etc.; 'basins,' etc. — implying that even here they are forbidden in such a case.` },

  { siman:'siman139', seif:'seif-002',
    last:`(Supplement) And its adornment may be nullified. There 44a: for it is written 'and he took,' etc.; and R' Nachman said, etc. (end).` },

  { siman:'siman139', seif:'seif-003',
    last:`But if, etc. Rashi; and as above: [regarding] the case of R' Yehudah who threw a stick, etc.` },

  { siman:'siman140', seif:'seif-001',
    last:`And there is who, etc. According to the explanation of what is written there: 'he did not permit,' etc.; 'I also,' etc. — meaning in a case where they fell; and see Beur HaGra and Kesef Mishneh and Lehem Mishneh (and see above siman 110 s.k. 10).` },

  { siman:'siman141', seif:'seif-001',
    last:`The form of, etc. As written there: 'if they were worshipped,' etc.
But, etc. As written there: that anything that is only for ornament and the like is permitted; and as above.` },

  { siman:'siman141', seif:'seif-005',
    last:`And the same law [applies], etc. That is the position of the Rosh, Tosafot, and Tur; and as stated above.` },

  { siman:'siman142', seif:'seif-008',
    last:`And it does not ascend, etc. There: 'he sprinkles,' etc.; and see Rashi there s.v. 'he sprinkles,' etc.` },

  { siman:'siman145', seif:'seif-009',
    last:`And there are [those], etc. According to his view, like the opinion that is stated finally; and in any case, to be stringent in biblical matters, which is derived there from a verse (unlike Beit Yosef — see there).` },

  { siman:'siman146', seif:'seif-014',
    last:`And the same law [applies], etc. — for it is written, etc. As written there 51b: for it is taught: 'destroy,' etc.` },

  { siman:'siman160', seif:'seif-014',
    last:`And there is no distinction, etc. As written there: 'give,' etc.; 'and I will betroth,' etc.` },

  { siman:'siman160', seif:'seif-020',
    last:`However, etc. See Shach.` },

  { siman:'siman162', seif:'seif-005',
    last:`They did not permit, etc. From what is written there (75a in the mishnah): 'he may not say: I will hoe and I will weed,' etc. — even though it is considered as if he has permission. Sefer HaTerumah.` },

  { siman:'siman163', seif:'seif-003',
    last:`And all this, etc. As written there 65b: 'he mortgaged to him,' etc.; 'at these prices it is forbidden' — and this is what is written: 'even if he repaid,' etc., like the field there.` },

  { siman:'siman168', seif:'seif-014',
    last:`If the agent, etc. As above seif 6 — and even if he said to him: 'I,' etc., 'because of,' etc.` },

  { siman:'siman168', seif:'seif-025',
    last:`And if there is, etc. His words are astonishing, for a promissory note is equivalent to a mortgage — and the law of pruzbul applies only without a mortgage, since a mortgage is not cancelled [by shemitah] in any case.` },

  { siman:'siman177', seif:'seif-031',
    last:`And he is able, etc. As written in the Tosefta, which the Rosh cited in chapter 9, section 37; and as written in Choshen Mishpat siman 176 seif 19.` },

  { siman:'siman194', seif:'seif-001',
    last:`Even though, etc. As written in Torat Kohanim regarding the days of purity — even though she sees; and in the mishnah and Gemara in many places.` },

  { siman:'siman201', seif:'seif-040',
    last:`For a doubtful case of three, etc. Mishnah 3, chapter 2.` },

  { siman:'siman216', seif:'seif-001',
    last:`And likewise if, etc. Ran in the abovementioned s.v. and in s.v. 'one who says to his wife' — see there.` },

  { siman:'siman218', seif:'seif-001',
    last:`He said to him, etc. As written in chapter 9 of Bava Batra (146b), regarding one whose son went overseas; and as written in Choshen Mishpat beginning of siman 246.` },

  { siman:'siman232', seif:'seif-008',
    last:`Or when he said, etc. — or, etc. See Rosh there s.v. 'had I been,' etc. and s.v. 'had been,' etc.` },

  { siman:'siman237', seif:'seif-010',
    last:`(Supplement) Those, etc. — since he swore in good faith; and see above siman 228 (end).` },

  { siman:'siman240', seif:'seif-007',
    last:`For the Rav, etc. There.` },

  { siman:'siman241', seif:'seif-001',
    last:`Like, etc. There 1a; and learn from it; and see Tosafot there s.v. 'for in his son,' etc.` },

  { siman:'siman244', seif:'seif-001',
    last:`Even, etc. — provided, etc. Tosafot 32b s.v. 'an elder,' etc.; and likewise the Ran, for indeed even regarding his father he is not obligated — as written in chapter 2 of Yevamot (22b) and in Sanhedrin; and learn from it.` },

  { siman:'siman246', seif:'seif-021',
    last:`And it is permitted, etc. In Nedarim there.` },

  { siman:'siman249', seif:'seif-001',
    last:`And one should not make, etc. As written in chapter 2 of Yom Tov (19b).` },

  { siman:'siman249', seif:'seif-003',
    last:`(Supplement) One must, etc. — and if, etc. Avot deRabbi Natan end of chapter 13: 'and receive,' etc.; 'very much,' etc. (end).` },

  { siman:'siman251', seif:'seif-003',
    last:`Support for oneself, etc. As written at the beginning of chapter 5 of Bava Metzia: Ben Petura expounded, etc.; and at the end of chapter 2 of Bava Metzia: his lost object, etc.; and in Tanna deVei Eliyahu mentioned above: if a person has food, etc. — as above.` },

  { siman:'siman258', seif:'seif-001',
    last:`And one must, etc. — and they permit, etc. For we rule that questions may be asked regarding consecrated property, as written in Arakhin 23a.` },

  { siman:'siman258', seif:'seif-007',
    last:`One who consecrates promissory notes. For the instrument itself has no monetary value, and the debt cannot be consecrated, as written in seif 8. There.` },

  { siman:'siman258', seif:'seif-013',
    last:`(Supplement) And some say that if, etc. See Choshen Mishpat siman 301 seif 1 and seif 6, that charity is not like consecrated property; and above siman 160 seif 18, that fixed interest is forbidden; and see what was written there (end).` },

  { siman:'siman275', seif:'seif-006',
    last:`And all, etc. See above siman 273 seif 5.` },

  { siman:'siman282', seif:'seif-002',
    last:`The one who hears, etc. As written in Kiddushin 31b: Rav Yosef, when, etc.` },

  { siman:'siman288', seif:'seif-015',
    last:`That it should be, etc. See Zohar there.
(Furthermore it is customary, etc. See what our teacher wrote in his commentary on Tikkunei Zohar Chadash 41b s.v. 'da yad,' etc.)` },

  { siman:'siman295', seif:'seif-003',
    last:`And even, etc. Yerushalmi; and R' Shimshon cited it in chapter 1 at the end of mishnah 7 — according to the first reading; and such is our reading; and likewise the Rosh in the laws of kilayim; and likewise in Torat Kohanim.` },

  { siman:'siman296', seif:'seif-012',
    last:`But wood, etc. Mishnah at the end of chapter 5 of Demai — and it sanctifies, as written at the end of chapter 7 of Kilayim.` },

  { siman:'siman296', seif:'seif-015',
    last:`And the caper-bush, etc. Tosefta and Yerushalmi there and there, and Gemara Berakhot 36a; and like Beit Hillel.` },

  { siman:'siman297', seif:'seif-043',
    last:`And in [such] a place, etc. — that by slaves it is forbidden, etc. The Gemara there; and the meaning is from what is written there: they ruled toward the prohibition — not in accordance with the halachah — due to the licentiousness of slaves; and as written there [section] 2 by Rav Ashi.` },

  { siman:'siman300', seif:'seif-003',
    last:`And likewise, etc. Derived from the above.` },

  { siman:'siman301', seif:'seif-001',
    last:`(Supplement) And nevertheless, etc. Because sometimes one removes what is inside them and covers oneself with them. There; and it implies that it deals with kilayim of Torah law (end).` },

  { siman:'siman301', seif:'seif-008',
    last:`Specifically, etc. — lest, etc. See Tosafot of Pesachim 40b s.v. 'not,' etc.; and learn from it; and the Rosh and other poskim.` },

  { siman:'siman308', seif:'seif-005',
    last:`(Supplement) And some say specifically, etc. The Rosh at the end of chapter 3 of Bekhorot, section 67 (end).` },

  { siman:'siman309', seif:'seif-002',
    last:`And furthermore, etc. And they are in the Rosh, chapter 6.` },

  { siman:'siman316', seif:'seif-003',
    last:`Even in [such] a place, etc. See Shach.` },

  { siman:'siman323', seif:'seif-001',
    last:`And all, etc. In Sifri, that it is in all respects like terumah; and it is derived from what is written: 'like the terumah of the threshing floor, so shall you separate,' etc. — and this is what is written in chapter 1 of Challah: challah and terumah, etc.` },

  { siman:'siman328', seif:'seif-003',
    last:`And the guest, etc. And it seems to me that nowadays their custom follows their explanation — and as written in the Tosefta chapter 1 of Terumot: 'the son from his father's [produce],' etc.` },

  { siman:'siman331', seif:'seif-081',
    last:`And even though, etc. Bava Batra 97a: he asked him, etc.` },

  { siman:'siman331', seif:'seif-086',
    last:`But, etc. Mishnah 181; and he holds that folding back does not help there.` },

  { siman:'siman331', seif:'seif-088',
    last:`And he feeds [with] bundles, etc. Tosefta chapter 2 of Ma'asrot — as above.` },

  { siman:'siman334', seif:'seif-043',
    last:`And it is not necessary regarding, etc. — as written (Moed Katan 17a): 'a Torah scholar may administer law,' etc.; and see Rosh there; and we say (Bava Kamma 112b): 'an agent of the court,' etc.` },

  { siman:'siman338', seif:'seif-001',
    last:`And if he does not know, etc. Mishnah there.` },

  { siman:'siman339', seif:'seif-001',
    last:`And some say that there is not, etc. From the above: 'they do not bring in with him,' etc.; but Beit Yosef rejected his words, for there [it is] specifically 'with him' so that his heart will not break.` },

  { siman:'siman340', seif:'seif-008',
    last:`And some say it is not required, etc. He holds that everything written there regarding Shmuel and Torah scholars in Babylonia is merely for stringency.` },

  { siman:'siman355', seif:'seif-001',
    last:`(Supplement) And there is not, etc. See Rosh chapter 3 of Moed Katan, siman 131 (end).` },

  { siman:'siman373', seif:'seif-004',
    last:`And even if, etc. For they did not distinguish; and as written there regarding a minor girl in the default case — even if she has no assets. There.` },

  { siman:'siman373', seif:'seif-005',
    last:`And some say, etc. Tosafot of Pesachim 9a beginning of s.v. 'with his maidservant'; and in Niddah 15b beginning of s.v. 'and when he comes.'` },

  { siman:'siman374', seif:'seif-003',
    last:`A found corpse, etc. In the Yerushalmi: one who was killed from Tiberias to Tzipori — the presumption is that he is an Israelite.` },

  { siman:'siman38', seif:'seif-001',
    last:`And there are [those who], etc. And so it is implied in chapter 3 of Sukkah 32a: 'say a wooden stick,' etc.` },

  { siman:'siman380', seif:'seif-005',
    last:`(Supplement) And some say, etc. However, specifically in private. There (end).` },

  { siman:'siman388', seif:'seif-002',
    last:`But at the time of, etc. As written there: for it is written 'glory'; and see Rashi there.` },

  { siman:'siman391', seif:'seif-002',
    last:`But that it is, etc. See Orach Chayyim siman 559.` },

  { siman:'siman48', seif:'seif-003',
    last:`And how much, etc. Like R' Yehudah — for all the Amoraim there hold like him.` },

  { siman:'siman90', seif:'seif-002',
    last:`But with a pan, etc. — also for the aforementioned reason; unlike without a pan.` },

  { siman:'siman92', seif:'seif-005',
    last:`As below siman 98 regarding a ladle. That is, in siman 98 seif 5, which distinguishes between old and new — see there.` },

  { siman:'siman92', seif:'seif-007',
    last:`A drop, etc. As stated above seif 2: that if he stirred or covered, it is as if all [the contents] are within the gravy.` },

];

let ok = 0, fail = 0;
for (const { siman, seif, last } of APPEND_LAST) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heRaw = fs.readFileSync(hp, 'utf8').replace(/^﻿/, '').trim();
    const heS = brSegs(heRaw);
    const enS = getENsegs(siman, seif);
    if (heS.length - enS.length !== 1) {
      console.log(`SKIP ${siman}/${seif} he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
      fail++; continue;
    }
    const newSegs = [...enS, last];
    const out = join(newSegs);
    if (DRY) {
      console.log(`DRY ${siman}/${seif} he=${heS.length} en=${enS.length}→${newSegs.length}`);
      console.log(`  appending: ${last.substring(0,80).replace(/\n/g,' ')}`);
    } else {
      fs.writeFileSync(ep, out, { encoding: 'utf8', flag: 'w' });
      console.log(`OK ${siman}/${seif} ${enS.length}→${newSegs.length}`);
    }
    ok++;
  } catch (e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
