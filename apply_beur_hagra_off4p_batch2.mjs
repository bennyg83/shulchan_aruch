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
function safeWrite(p, content){
  const tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, { encoding:'utf8' });
  fs.renameSync(tmp, p);
}

// Off-by-4+ batch 2: two diff=4 cases.
const CASES = [

  // siman155/seif-003 (he=8, en=4, append 4)
  // Note: HE[5] and HE[6] have garbled MT embedded in the he.html source; translate from Hebrew.
  { siman:'siman155', seif:'seif-003', segs: [
    // HE[5]
    `(Supplement) It is permitted to burn a sheretz or, etc. This is not precise — for the same applies to meat and milk which is forbidden, since it is among the "buried" items whose ashes are forbidden, as written at the end of Temurah; granted, other "buried" items — one is nonetheless not lashed for [benefit from] them not in the usual manner, and it is permitted for healing, as written in chapter 2 of Pesachim and above in Shulchan Arukh; unlike meat and milk, as above in Shulchan Arukh.`,
    // HE[6]
    `Except for idolatry wood. Not because one is lashed for it not in the usual manner of benefit — for in Tosafot in Avodah Zarah they were uncertain about this, and see above siman 142 seif 10 regarding the dispute on this — rather because of the seed [prohibition] of idolatry, even something rabbinic is forbidden (end).`,
    // HE[7]
    `And every sick person, etc. As written in the last chapter of Yoma (in the mishnah 83a-b) — according to experts; and likewise with a known remedy, as written there (83-84) regarding one bitten by a mad dog, etc.; and we likewise learn [from there].`,
    // HE[8]
    `And one does not permit, etc. For we rule that Shabbat is "suspended" [not "permitted"] regarding saving a life — as Rambam wrote at the beginning of chapter 3 of Shabbat; and as written in Menachot 64a: "Rava asked: a sick person," etc. — "obviously," etc.; and therefore there is no difficulty from Yoma 84b: "not this Shabbat is in doubt," etc. — "why?," etc. — because he is in danger from the delay; and this is what is written "since there is no danger in the matter" — meaning from the delay — even though he is a dangerously ill patient; and the same applies to all prohibitions; and as written there 83a: "one feeds him the lightest," etc.; and there it was stated: "where it is possible with non-sacred [food]," etc. — "where it is possible with non-sacred [food] — obviously, there is no need," etc. [And at the end of chapter 2 of Pesachim: "a person should not chew wheat," etc. — even though it is not in the usual manner of benefit and it is permitted, as Rambam wrote in chapter 5 of the laws of Foundations of the Torah: "in what case," etc. — "but not in the usual manner of benefit, such as when one makes a poultice or plaster from leavened bread," etc.; rather the mishnah is because he can soften the wheat with fruit juice and the like, but they chew because it is more effective — unlike Magen Avraham at the beginning of siman 466].`,
  ]},

  // siman99/seif-006 (he=8, en=4, append 4)
  { siman:'siman99', seif:'seif-006', segs: [
    // HE[5]
    `[And certainly it is no less than other rabbinic prohibitions.] And he says there: if to mix — even the smallest amount is forbidden; hence: to mix — even in rabbinic [prohibitions] it is forbidden, even though he does not intend to sow; and see siman 296 seif 5 and seif 7 (end).`,
    // HE[6]
    `And some say there is no, etc. For what is written there "but in rabbinic [prohibitions] they do nullify" — that is according to the final conclusion there: where the prohibition weakens, the prohibition weakens; for otherwise regarding the circles of pressed figs mentioned there — he would add to them; and likewise regarding a half-olive of fat in chapter Gid HaNashe; and see Tosafot there s.v. "and the mishnah teaches," etc.`,
    // HE[7] — very long GRA discussion on "a prohibition that was nullified revives"
    `A prohibition that was nullified, etc. As written in Zevachim 31a: "and piggul woke up like one sleeping" — and even the one who permits there does so on account of a mixture of intentions; and in Bekhorot 22a: R' Yochanan said: "this applies only," etc.; and even Abaye who disagrees concedes that impurity awakens impurity — as written there from the mishnah of chapter 5 of Terumot; and we say (in Kil'ayim 67 and elsewhere): "one who passes an attached planter," etc.; and we say (in Bava Kamma 100 and elsewhere): "a wall was breached — he said to him: fence it," etc.; and we do not say "each first portion is nullified"; and in chapter 6 of Shabbat (65b): "lest the dripping ones multiply," etc.; and even for leniency we say it revives — as written at the end of chapter 7 of Nedarim: "the growth of permitted [produce] removes the prohibition"; and the entire sugya there; and all the more so for stringency — as written there: "and perhaps for stringency it is different"; and at the end of chapter 5 of Terumot: "and if it is known that the wheat belongs to non-sacred [produce]," etc.; and there: "a se'ah," etc.; "and afterward, some fell there," etc.; and in the Yerushalmi there: "all prohibitions upon which one added," etc.; and in chapter 5 of Avodah Zarah (73b): "two cups," etc.; and in the Yerushalmi chapter 2 of Orlah: "lentils of terumah that were cooked with common lentils, and there is not a sixtieth of them — if he added more terumah lentils, the same species awakens its own species to prohibit; let it not be greater than wine libation: just as with wine libation you regard the permitted as if it were not there, and if the prohibition has a sixtieth it is forbidden, and if not it is permitted — [so] what is stated 'he added more terumah lentils is forbidden'"; and what we say in chapter 5 of Avodah Zarah (73a) that "each first portion is nullified" — Tosafot explained there and in Bekhorot there and in chapter HaArel (82b) and other places: this is specifically with a "drop" amount; but with a taste [measurement], it revives — for the taste is noticeable in them; and similarly what we say in chapter 2 of Orlah: "terumah raises up," etc.; and there: "orlah raises up," etc.; and "orlah raises up orlah" — when there is not a sixtieth; and as written there: R' Eliezer says: they combine [to count] toward a sixtieth but not to prohibit; and in chapter 5 of Terumot: "and he did not manage to lift," etc.; and in the Yerushalmi there: R' Shimon says: his knowing it sanctifies it; and the Rabbis say: his lifting it sanctifies it; and this is what is written "this applies only," etc. — investigate and you will find [this] in all of the above; but Rambam in chapter 13 of [the laws of] Terumah ruled: his knowing it sanctifies it — and as written in the Tosefta chapter 6 of Terumot on the aforementioned mishnah: "Rabban Shimon ben Gamliel said: in what case? When he did not know about it and afterward it fell; but if he knew about it and afterward another fell — it is permitted, since he had already [been obligated] to lift it"; and Rambam explains that Rabban Shimon ben Gamliel explains the words of the first tanna. And even though the essential ruling follows Raavad, and Rabban Shimon ben Gamliel holds like his father [R' Gamliel], as written in the Yerushalmi above — and this is what is written "since he had already been obligated to lift it" — and as written in Pesachim 13b: "Rabban Shimon ben Gamliel holds like his father," etc. — nevertheless even the Rabbis only dispute regarding terumah which needs to be lifted and is not like the already-lifted; but regarding other prohibitions they concede, as written in the Tosefta there: "a se'ah of orlah that fell among two hundred — he knew about it and then another fell — it is permitted," etc., "until the prohibition exceeds the permitted"; and likewise in [the case of] lifted terumah — as written in the mishnah there: "he lifted it and another fell," etc. — hence specifically in terumah lifting is required, and in other prohibitions knowledge [suffices]; and likewise we say in the Tosefta chapter 8: "leavening of terumah that fell into dough and he lifted it, and afterward it leavened — it is permitted; leavening of the Sabbatical year that fell into dough — he knew about it and afterward it leavened — it is permitted"; and in the Yerushalmi chapter 2 of Orlah halachah 2: "obviously his knowing it releases it — does another's knowing release it? What will it release?... Does uncertain knowledge," etc.; and in Zevachim 104a: "and there is [the problem of] 'and it was found a treifah,'" etc. — as above; and likewise the Mordechai in chapter 9 of Bava Kamma on what is written there: "a wall was breached — fence it," etc.; and "one who passes an attached planter," etc. — that these deal with when [the problem] was not known, for otherwise it would be difficult from chapter 8 of Avodah Zarah where we say "each first portion is nullified" — and one cannot say as Tosafot wrote there that [it is] when there is more than sixty, for those too are among the two hundred. And nevertheless with a majority [nullification] does not help — as written in the Tosefta above: "until the prohibition exceeds the permitted"; and likewise "lifting" in terumah — as written in the mishnah above: "until terumah exceeds," etc.; and likewise they said in chapter HaArel (82b): "he put a se'ah," etc. — "until a majority"; and see Tosafot there s.v. "R' Yochanan said," etc. And the general principle is: biblically we say it revives — even with knowledge, in other prohibitions; and "lifting" in terumah — as above; and as written in the Yerushalmi chapter 5 of Terumot on the aforementioned mishnah: "until he increases," etc. — R' Yosi said: this says that something which is biblically nullified awakens its own species to prohibit; and likewise dry with dry; and likewise liquid with liquid; a species mixed with a different species — up to sixty [which is the measure for] taste, [since] taste [has the same force] as the substance biblically; and a species with its own species — with a majority; but with sixty — which is rabbinic — it does not revive if he knew; and likewise everything that requires one hundred, two hundred, or a drop amount — all of these do not revive, since it is rabbinic; and as written in Gittin 54b (and see above siman 101 paragraph 6); and likewise terumah and orlah — even though we derive them from verses, it is only an asmakhta, as Tosafot wrote in Bava Metzia 53a s.v. "and it goes up," etc.; and proof: in chapter [Kol] Sha'ah it derives [the prohibition of] meat and milk from a kal va-chomer from orlah, and does not object "but it requires one [part in] two hundred" — and likewise in chapter HaArel which lists the grouping of the "four" and does not list that it goes up in one hundred (and see Tosafot there with two more proofs, which are not compelling); and this is what is written: "terumah raises up," etc.; "orlah raises up," etc.; and in chapter 5 of Avodah Zarah: "each first portion is nullified" — even when less than sixty, since it is a species with its own species; and as written in the Tosefta above: "until it exceeds," etc.; and all of this when he knew — for when he did not know it prohibits everything according to the law of one hundred, two hundred, drops, and sixty; and with this everything comes out correctly; and those [cases of] "the growth of permitted [produce]," etc.; "a wall was breached — fence it," etc.; and "one who passes [an attached planter]," etc. — Mordechai did not write regarding "when not known" — for all those mishnayot are stated [in the context of] when known; but growth is different since it grows on its own, it is like [arriving] all at once, and therefore we find the prohibition only with growth; and Tosafot explain: since it is without interruption it is like all at once.`,
    // HE[8]
    `A ke-zayit of fat, etc. As written in chapter 5 of Terumot: "he lifted it and it fell in another place," etc.; and the Sages say: "it only causes mixture [when it renders] forbidden" — except, etc. — meaning, and it is entirely permitted; unlike the Rambam's explanation there which is astonishing, and [scholars] have already challenged him; and even ab initio it is permitted — as written in chapter 9 of Kil'ayim: "camel wool and sheep wool that were mixed together," etc.`,
  ]},

];

let ok = 0, fail = 0;
for (const { siman, seif, segs } of CASES) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== segs.length) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} expected=${segs.length} he=${heS.length} en=${enS.length}`);
      fail++; continue;
    }
    const newSegs = [...enS, ...segs];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} append=${segs.length} → ${newSegs.length}`);
    } else {
      try {
        fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      } catch(e2) {
        safeWrite(ep, join(newSegs));
      }
      const verify = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${siman}/${seif}: ${enS.length}+${segs.length} → ${verify.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
