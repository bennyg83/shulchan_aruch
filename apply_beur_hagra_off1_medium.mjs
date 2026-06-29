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

const APPEND_LAST = [

  { siman:'siman123', seif:'seif-009',
    last:`(Supplement) Water that is placed, etc. See what was written there: that these matters are perplexing; and the words of Ran in chapter 2 of Avodah Zarah regarding diluted wine are correct — where he wrote: 'grape seeds trodden by foot — everything depends on their taste and smell,' etc. — see there (end).
And if they were pressed, etc. According to the words of the av beit din, for in this case R' Yona agrees; but this is not correct, as above (and see what was written in Orach Chayyim siman 272 seif 7 in the Supplement, in a different manner — see there).
And there is who, etc. The Raavad there.` },

  { siman:'siman129', seif:'seif-001',
    last:`And some say, etc. As written there in the Gemara: 'and since,' etc. — because it belongs [to him], in any case it is permitted; and see Tosafot there s.v. 'what is the reason,' etc.; and likewise the Ra'ah in Bedek HaBayit.
The wine, etc. See above siman 130 seif 2.` },

  { siman:'siman129', seif:'seif-020',
    last:`But thieves, etc. As written there 70a: 'if she was seized,' etc.; and here she is not seized, etc. — as stated below.
However in our times, etc. As stated above siman 128 seif 4 — it should say so; and as written there in the gloss; and as written in Hagahot Or Zarua; and its language in Mordechai there: 'and that girl in whose hand a braid was found, and we attributed it to leniency' — Rashi there explained: because she was a minor; and furthermore, here there is certainly intercourse, and therefore R' Eliezer does not declare pure, etc.; however, there is room to distinguish whether we compare an adult woman of the present time, etc. — see there siman 1, 334. And see Tosafot 70b s.v. 'that,' etc.` },

  { siman:'siman139', seif:'seif-015',
    last:`And some say specifically, etc. As written there 14, regarding 'lifnei d'lifnei,' etc.; and the view of Tosafot must be that what we know will certainly be sold to them is as if they sold it from the outset [and see Rashi 8a s.v. 'Rome,' etc., 'that we should say,' etc.; and s.v. 'but is it not,' etc.].
And even, etc. — and there are [those], etc. — and one may not tie, etc. Like the view of those who forbid. And in chapter 1 (16a in the mishnah): 'it reached the vault,' etc.; and we say there (19b in the mishnah — and see Tosafot there s.v. 'it reached,' etc.): 'and they do not make ornaments,' etc.` },

  { siman:'siman145', seif:'seif-008',
    last:`Idolatrous offering of animals. In Chullin there; and we raise a contradiction: 'for a minor purgative,' etc.; and see Rashi there s.v. 'similar to,' etc.; and all the more so the accessories, which are forbidden even on the mountain; and the second version written in Tosafot of Avodah Zarah 45a in s.v. 'first tanna — alternatively one can say,' etc.; and in Tosafot of Chullin there beginning of s.v. 'for'; and in Temura there — see there and there: that the view of Tosafot is that even the overlay of the mountain is forbidden only when the overlay itself was worshipped; and see Tosafot of Avodah Zarah there s.v. 'first tanna,' etc.; and likewise the view of some commentators.` },

  { siman:'siman151', seif:'seif-004',
    last:`And nowadays, etc. Since we are like brokers who are not recognized by our voice; and furthermore, we are few in number, and if we do not sell to them we will suffer a loss; and as written there 2: 'R' said: it is impossible — so too [here].' Tosafot and Rosh; and the Rosh wrote that likewise it is stated in the Yerushalmi: R' Simon had pomegranates planted, etc.; he asked R' Yehoshua: what is the law regarding renting them to a gentile? He said to him: in a place where Israelites are not commonly found, [something] like this is permitted, etc. — see there.` },

  { siman:'siman165', seif:'seif-001',
    last:`Or the civil courts, etc. As written there in chapter 1 (10b).
And if he decreed, etc. As written in Choshen Mishpat siman 369; and even according to the first opinion there seif 5 in the gloss — nevertheless it is currency, which is like land that belongs to the government; and see Sefer HaTerumah there seif 8.` },

  { siman:'siman168', seif:'seif-003',
    last:`And if the second Israelite, etc. So wrote [the commentators] following the [Hagahot] Mordechai, and Beit Yosef cited it — but their words are astonishing, for on the contrary, there it is written the opposite: he explained 'and if they established [the arrangement] such that the first Israelite is appointed as guardian,' etc. — therefore it is permitted; and nevertheless we established in the Gemara specifically [in a case] where he placed them on the ground, etc. — as above; and already the later authorities raised a difficulty regarding this — and see Shach.` },

  { siman:'siman168', seif:'seif-011',
    last:`And if the gentile, etc. For in such a case the gentile does not have the status of a lender; and as written in Bava Kamma 97a: 'and if you wish to say,' etc.; and see Taz.
A gentile, etc. As written in Bava Metzia 34a: that he acquires the double payment for him. Mordechai; and see seif 18.` },

  { siman:'siman170', seif:'seif-002',
    last:`And if he consolidated [the debt], etc. From what is written there 72a: 'if before,' etc.; and the explanation of Maharam and Rosh there: that 'all the interest' means even what accrued after he converted — for from the time of consolidation it is considered like principal; but Rambam, Gersonides, and Rashba disagree with this; and as written in siman 171: 'all the money of interest,' etc.` },

  { siman:'siman172', seif:'seif-001',
    last:`However, etc. As stated above siman 161 seif 4; and the Mechaber omitted the entire passage there seif 7, sections a and b — because according to Rif's method, it is not halachah: only a Suran mortgage is permitted; and likewise the Rav omitted them; and see Nimukei Yosef there in the explanation of the passage, and according to his interpretation some of them are also not halachah; but the Tur wrote the entire passage following Rashi's interpretation.` },

  { siman:'siman173', seif:'seif-004',
    last:`But if, etc. Tosefta and Yerushalmi at the end of chapter 6 of Demai: 'a person may not say to his fellow: here are two hundred zuz, weigh on my behalf at the treasury'; but he may say to him: 'release me from the treasury'; and likewise: 'a person may not say to his fellow: here are two hundred zuz, weigh on my behalf for craftwork'; but he may say to him: 'release me from the craftwork.' And regarding interest, it is taught [similarly]. Sefer HaTerumah in the name of Rambam; and responsum of Rashba; and see chapter 5 of Avodah Zarah 71a; and see Sefer HaTerumah and Rashba.` },

  { siman:'siman174', seif:'seif-001',
    last:`And likewise if, etc. Gemara there 65b: R' Safra taught, etc.; and although we say there 'and the money should remain,' etc. — Nimukei Yosef wrote in the name of Rashba that this is not precise — it is said [only] because that is typically the case; and see Hagahot Or Zarua there s.v. 'and where,' etc., who brought proof: for we rule that a deposit [given as] part of the purchase price acquires against the entire amount; and likewise Hagahot Maimoniyot wrote in the name of R' Hai Gaon; and as written there 72b: 'the reason he wrote,' etc. — see Hagahot Maimoniyot there.` },

  { siman:'siman190', seif:'seif-002',
    last:`(Supplement) But after, etc. And even regarding a veset of intervals that is established only with three consecutive [occurrences] — that is because it is impossible to have three [instances of] the same interval except with three [consecutive] occurrences; but [regarding] a woman who is accustomed [to seeing], she is established with three [occurrences]; and as written in chapter 4 of Bava Kamma (37a): 'one saw an ox gore; an ox that did not gore,' etc. Terumat HaDeshen; and see siman 189 seif 9 (end).` },

  { siman:'siman190', seif:'seif-005',
    last:`(Supplement) Whether it is, etc. For he does not distinguish between round and elongated — except that elongated [blood] is blood of wiping, as written in the Tosefta, which the Rosh cited there; and as written there in the Gemara: 'no, always,' etc.; and see Rosh at the end of chapter 8, regarding a stain, etc. (end).` },

  { siman:'siman199', seif:'seif-006',
    last:`Even on Yom Tov. As written in Orach Chayyim siman 326 seif 1 in the gloss; and the same law [applies] — that she is permitted to wash her entire body in water heated before Yom Tov, according to the view of Rif and Rambam; and as written in Orach Chayyim siman 511 seif 2 — except that here [the Mechaber] followed the words of Rosh and Tur, who are among those who forbid; and as written there in the gloss.` },

  { siman:'siman205', seif:'seif-001',
    last:`However, etc. From the fact that the latter clause teaches 'they open [a different opening]' — and there is no difficulty from the beginning of the clause. Rosh; and so it is explicitly in the Gemara there; and likewise Ran; and Kesef Mishneh also raised a difficulty against Rambam; and even though Lehem Mishneh forced himself [to explain it], his words are self-contradictory — except that Rambam's text of the Gemara [reads]: Ravina, etc., who requires asking; and since the latter clause teaches 'they open a different opening,' etc. — rather it is clear, etc.` },

  { siman:'siman206', seif:'seif-004',
    last:`Upon me or, etc. Ran in the mishnah — and therefore necessarily it deals with such a case, as above.
And even if he said, etc. Rosh in the mishnah there; and Tosafot in the name of R' Eliezer in s.v. 'like the vows of the kosher ones,' etc.
But if, etc. Mishnah there: 'but from him, no' — as written in the mishnah; and as the Rosh and Ran wrote; and it requires study regarding what is written here, that 'upon me' works even without 'this loaf' — as above.` },

  { siman:'siman230', seif:'seif-001',
    last:`Some say, etc. From the case in chapter 1 of Temura (4b): 'anything that [the Sages] said,' etc.; and in the chapter 'The Woman Who Falls Before the Yavam' (Ketubot 81b): 'since the Rabbis said not to sell,' etc. — and all the more so regarding a biblical oath; and see what was written in Choshen Mishpat siman 208 and above siman 228 seif 35.` },

  { siman:'siman271', seif:'seif-006',
    last:`Or in gold. For what is written there: divine names [are counted as] thirty-four — and it is stated as an amplification. And so it is in Massekhet Soferim chapter 1 halachah 9: 'one does not write in gold — and there was an incident,' etc. — see there; and see what was written in Orach Chayyim siman 32 seif 3.
And some say that not, etc. So wrote R' Yosef in Tosafot of Shabbat 115b s.v. 'a scroll'; and in Tosafot of Menachot 31b s.v. 'one who made it,' etc. — and see there and there, where they challenged his interpretation and wrote 'and it seems,' etc.; and likewise written in Sefer HaTerumah and other poskim; and see Orach Chayyim siman 334 seif 13.` },

  { siman:'siman276', seif:'seif-002',
    last:`He wrote there 'Elohim,' etc. As written in Massekhet Soferim chapter 4 halachah 4: 'and all common names,' etc. — and necessarily [this is] when he intended to sanctify them, for otherwise even sacred names may be erased — as Hagahot Maimoniyot and other poskim wrote from the case in seif 12 below; and in Massekhet Soferim chapter 5 halachah 2: 'one who writes Yehudah and did not include the dalet — let him append it above,' etc.; and there halachah 3: 'if he needed to write the [divine] Name and intended [to do so] and wrote Yehudah but did not include the dalet — he erases it and writes the [divine] Name,' etc.` },

  { siman:'siman289', seif:'seif-006',
    last:`And those who are scrupulous, etc. For [this way] one fulfills one's obligation, as written there regarding the mezuzot of Rebbi's house; and as Tosafot there wrote: 'therefore it seems,' etc. — but regarding the practical law, we rule like Rashi; and as written in Orach Chayyim siman 32 s.k. 45; and likewise [it is done] for a Torah scroll.` },

  { siman:'siman296', seif:'seif-034',
    last:`But if, etc. So it is derived from what is written in the Yerushalmi, which is cited in seif 43; and likewise a large vineyard, etc. — learn from it that the open area of four amot has [a legal status]; but all this requires study, for we say in the Yerushalmi that a small vineyard does not have a perimeter space, so that its outside not be more stringent than its inside — if so, the same would apply here; and that [passage] in the Yerushalmi follows the first tanna who holds [the rule applies only to a distance of] sixteen amot.` },

  { siman:'siman3', seif:'seif-001',
    last:`(Supplement) And likewise if, etc. And it is not comparable to what is written there 2 regarding Rabban Gamliel's daughter who fell from the bridge; and likewise at the end of chapter 2 of Bava Kamma, in the section Nezakin: 'there was a stone lying,' etc., 'and it fell — in Nezakin one is liable' — for here we require human force, as above; and as written in siman 7. Ra'ah — not like Terumat HaDeshen (end).` },

  { siman:'siman305', seif:'seif-001',
    last:`(Supplement) See Torat Kohanim, parashat Bechukotai, end of section 11 [and in Bekhorot 50a]: 'twenty gerahs shall the shekel be' — how do we know that if one wishes to add he may add? — for it is written 'shall be'; and how do we know that if one wishes to reduce he may not reduce? — for it is written 'it' (end).` },

  { siman:'siman320', seif:'seif-005',
    last:`But if, etc. And it is not comparable to what is written in Bava Metzia 70b: 'since if not,' etc. — see Tosafot there s.v. 'and if,' etc.; and likewise the same applies to the second version — because the main lien [was established]; and as above: that the main, etc. There.` },

  { siman:'siman362', seif:'seif-001',
    last:`(Supplement) And nevertheless it is good, etc. Yerushalmi there — in Rebbi's will: 'let my coffin be perforated'; and Ramban explained: that they should remove the lower board of the coffin and lay him on the ground — for burial in the earth is a commandment; and [this applies] not only because of the special esteem of the Land of Israel, but even in the diaspora — for it is written 'and to dust you shall return.' End of quote (end).` },

  { siman:'siman387', seif:'seif-001',
    last:`(Supplement) But the entire day, etc. — and likewise, etc. Gemara 25b, which Rif and Rosh cited there: 'R' Yochanan said in the name of R': the comforters may not,' etc. — s.k. 45; and Ramban's reading (in Torat HaAdam): 'from where [do we learn] that a mourner may not sit on a bed but only on the ground? — for it is written: "and they sat with him on the ground"'; 'and R' Yochanan said in the name of R': from where [do we learn] regarding comforters, etc.' — and likewise written in Tur; but all of this is not in our Gemara — the printers omitted it (end).` },

  { siman:'siman390', seif:'seif-005',
    last:`And some forbid, etc. See Tosafot there; and in Torat HaAdam he wrote in the name of Tosafot that the haircut that is permitted is [only] on the lower lip, etc.; and likewise written in Tosafot of Moed Katan 18a s.v. 'and with scissors,' etc.` },

  { siman:'siman392', seif:'seif-001',
    last:`(Supplement) [Avot deRabbi Natan] chapter 7: thirty days for betrothal, thirty days for marriage; but there both [periods] were stated specifically regarding [the prohibition of holding] a feast (see Ramban's novellae on Yevamot there and in Torat HaAdam): 'How so for betrothal?' etc.; 'How so for marriage?' etc. (end).` },

  { siman:'siman393', seif:'seif-001',
    last:`(Supplement) And part of, etc. There (in Avot deRabbi Natan chapter 6): 'he died in that,' etc.; 'on the third day he goes out,' etc.; and likewise they said there regarding the greeting of peace: 'they greeted him in peace,' etc.; 'on the third day,' etc. (see above siman 380 s.k. 6 in the name of Ramban) (end).` },

  { siman:'siman72', seif:'seif-002',
    last:`And there is no distinction, etc. Meaning: even if it is open at the top, [the garment] requires rending — for this is not called the rending that they said [when they said] 'he rends it,' etc.; and likewise if it is closed, rending helps; and this is what is written: 'and it is customary,' etc., 'and it is not,' etc.` },

  { siman:'siman92', seif:'seif-004',
    last:`The vessel, etc. Meaning: that one must have sixty against the vessel itself — so that the pot itself is considered as if it were forbidden; and this is [specifically] for a new [vessel]; and as written in siman 95 seif 5: 'if it is known,' etc. — 'and we do not say regarding,' etc.; and proof from what is written (97, 30 and learn from it): 'a pot in which terumah was cooked,' etc. — with sixty. But for an old [vessel], we say regarding absorbed [matter] that it gives and takes [its taste back], as written there and in seif 5 of this siman; and as written 97b regarding the chest [of an animal]; and see Tosafot there s.v. 'rather,' etc.; and he stated here only regarding the pot itself — that it does not give and take [its taste back].` },

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
