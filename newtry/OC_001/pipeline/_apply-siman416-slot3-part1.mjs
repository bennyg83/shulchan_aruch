#!/usr/bin/env node
/** worker slot 3 — siman 416 part 1 (eruv techumin: Yom Tov adjacent to Shabbat, two-day Yom Tov) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_416/mechaber/part-001.txt": {
    "1:main":
      "Laws of eruv techumin when Yom Tov falls adjacent to Shabbat. Contains 5 seifim. When Yom Tov falls adjacent to Shabbat — whether before or after it — or for two days of Yom Tov in the diaspora, one may make two eruvin in two directions and rely on whichever he wishes for the first day and on the eruv in the other direction for the second day. Or he may make one eruv in one direction and rely on it for one of the two days, and on the second day he is like the townspeople as if he made no eruv, having two thousand amot in each direction. This applies to the two days of Yom Tov in the diaspora; but the two days of Rosh Hashana are considered as one day, and one may only make an eruv for both days in one direction. Similarly, one may make a condition on his eruv and say: \"this eruv is for this Shabbat but not for another Shabbat,\" \"for another Shabbat but not for this one,\" \"for Shabbatot but not for Yom Tov,\" \"for Yom Tov but not for Shabbatot.\"",
    "2:main":
      "One who makes eruv for two days of Yom Tov in the diaspora, or for Shabbat and Yom Tov — even if it is one eruv in one direction for both days — the eruv must be present in its place during bein hashemashot of the first night and during all of bein hashemashot of the second night. How does he do this? He brings it to that place on Yom Tov eve or on erev Shabbat and lets nightfall find him there, then takes it in his hand and returns. If the first night is Yom Tov, the next day he brings it to that place and leaves it there until nightfall and eats it if the second night is Shabbat; or he brings it back if the second night is Yom Tov — since they are two separate sanctities and not one day, so that we cannot say that from the first night he acquired the eruv for both days. If the eruv was eaten on the first day, he acquired the eruv for the first day and it is not an eruv for the second. If he acquired shevitah with his feet on the first day, he must acquire shevitah with his feet on the second day — by going and standing at that place and resolving in his mind to acquire shevitah there, saying nothing, since it is forbidden to make any preparation from Yom Tov for Shabbat or from Shabbat for Yom Tov even by speech. All the more so he cannot make eruv with bread that was not already designated as eruv on the first day, since he would need to declare it an eruv and would thereby be making a preparation. If he made the eruv on the first day with food and wishes to acquire shevitah with his feet on the second day, it is valid. If he wishes to make eruv with bread on the second day, he must use the same bread with which he made eruv on the first day, needing to say nothing since he already declared it an eruv — and thus he makes no preparation at all.",
    "3:main":
      "What we said about making two eruvin in two directions for two days applies only when it is possible for him to reach each of the two eruvin on the first day. But if it is impossible to reach the second day's eruv on the first day, the second eruv is not valid — since the mitzva of eruv requires it to be accessible as a meal while it is still day, and since he cannot reach this eruv on the first day it is not accessible while it is still day. How so? If he placed his eruv two thousand amot east of his home and relied on it for the first day, and placed a second eruv one amah, one hundred amot, or one thousand amot west and relied on it for the second day — the second eruv is not valid, since on the first day the second eruv is not accessible to him while it is still day, as nothing remains for him to the west. But if he placed his eruv one thousand five hundred amot east of his home and relied on it for the first day, and placed a second eruv within five hundred amot west of his home and relied on it for the second day — it is valid, since he can reach it on the first day.",
    "4:main":
      "Yom Kippur is like Shabbat regarding both eruv chatzerot and eruv techumin.",
    "5:main":
      "Yom Tov observes eruv techumin but not eruv chatzerot.",
  },
  "output/siman_416/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 38, and like R' Eliezer as in the Gemara.",
    "1:ב":
      "Mishnah there (29)[39], and like R' Yossi in the baraita, and R' stated it in the Mishnah in the language of the Sages.",
    "1:ג": "I cited above in siman 413.",
    "2:א": "Wording of Rambam in chapter 8 of Hilchot Eruvin.",
    "2:ב": "Mishnah there 38.",
    "2:ג": "In the Mishnah, as cited.",
    "2:ד": "Baraita there and in the Gemara 39.",
    "2:ה": "There 39.",
    "3:_": "Gemara 38, and Rambam in chapter 8 of Hilchot Eruvin.",
    "4:א": "Rambam there and Semak.",
    "4:ב": "Like Keritot siman 13.",
    "4:ג": "As cited there.",
    "5:_":
      "Rif and Raosh in chapter 1 of Yom Tov, and so ruled Rambam in the chapter mentioned.",
  },
  "output/siman_416/baer-heitev/part-001.txt": {
    "1:_":
      "As one day. And even if it was eaten on the first day he fulfills on the second, for they are one sanctity — even to be lenient (Rashbam); see siman 503 seif 1 end of his words. And see Magen Avraham.",
    "2:_":
      "And he shall not say. And if he said, it is eruv chatzerot. And if he made eruv with bread on which he did not declare eruv name yesterday, it is not an eruv (Rashba, Beit Yosef). And see Taz.",
  },
  "output/siman_416/beur-hagra/part-001.txt": {
    "1:א": "Seif 1: or two days of Yom Tov in the diaspora. 39b — R' Yossi concedes regarding two..., etc.",
    "1:ב": "And similarly. Tosefta chapter 3.",
    "2:א": "Seif 2: one who makes eruv for two. Mishnah there and as he wrote.",
    "2:ב": "And all the more so. And if. There.",
    "4:_":
      "Seif 4: the same law, etc. Thus we conclude in Keritot 14, and so Tosafot in Yevamot 34a s.v. if she was..., etc.; but Rashi there s.v. if she was... wrote that the conclusion there is there is no eruv and carrying, and holds the Gemara's difficulties there are mere dismissals; and what is written regarding eruv is i.e. that is to say it is not proved from there — but the sugya in Yevamot there proves like the sugya there, since it says: and who..., R' Meir..., therefore because of carrying on Shabbat and Yom Kippur he is liable twice — only Rashi strained himself and wrote because of eating and carrying; but Tosafot there s.v. and he carried... already challenged him and R' Yossi said..., and so explained Rif there at length, and so Ramban and Rashba see there; and since the sugya in Yevamot proves there is eruv and carrying for Yom Kippur — proof with no rejoinder.",
    "5:_": "Seif 5: Yom Tov. Chapter 2 of Yom Tov 16b — because you..., etc.",
  },
  "output/siman_416/turei-zahav/part-001.txt": {
    "2:א":
      "Must make eruv with his feet on the second day. And even though one may not make eruv techumin on Yom Tov even through condition, as permitted in siman 393 regarding courtyards — nevertheless regarding techumin it is forbidden, as written at end of chapter 5 of Yom Tov; however it is permitted here since he already made eruv on Yom Tov for the first Yom Tov.",
    "2:ב":
      "And all the more so he cannot make eruv with bread, etc. — it should read thus wrote Moharach z\"l: these two prohibitions are not equal — regarding the prohibition of speech that he mentioned first, if one transgressed b'dieved it is an eruv since even without speech it would be eruv; but regarding the prohibition of new bread it is not eruv even b'dieved, as Beit Yosef wrote in the name of Maharam that it is not eruv, and so in the Gemara daf 38 we challenge: one who made eruv on the first with his feet — make eruv on the second with his feet — but he prepares from Yom Tov to Shabbat — explanation: granted if he made eruv with bread on the second you resolved that eruv acquires at the beginning of Shabbat day, and eruv of bread is acquired from itself silently; but if he made eruv with his feet it enters the mind that he must say \"my shevitah is in my place\" and cannot intend at the beginning of the day, and must say while it is still day, and he prepares from Yom Tov to Shabbat — and it answers: do you think he goes and says anything? He goes, is silent, and sits — thus it implies per the resolver he need not say \"my shevitah is in my place,\" and in this he disagrees with the challenger; and we already ruled thus in siman 409 seif 7 — a fortiori \"my shevitah is in my place\"; if so, since there is prohibition to say \"my shevitah is in my place\" even though he need not, all the more if he makes eruv on the second with the bread of the first it is forbidden to say — this would be eruv even though he need not; if so, why did they not also mention here prohibition of speech? It appears that speech is stricter, for there the Gemara says that what is permitted to acquire with his feet on the second without speech is because his going is not evident that he goes for eruv — if so, one who makes eruv with bread even though he need not declare eruv name, nevertheless whenever he says thus this shall be eruv also for tomorrow — certainly forbidden.",
    "2:ג":
      "And if he wishes to make eruv with bread — meaning he wishes to go tomorrow to another direction, and cannot with that same bread he placed yesterday for this direction.",
    "2:ד":
      "With that same bread with which he made eruv. The reason is explained explicitly that other bread is forbidden because of preparation from Yom Tov to Shabbat; and in the Gemara they say: one who does not hold preparation — nevertheless correct to take that bread of yesterday as good advice; Rashi explained lest it spoil and he lose his bread and trouble with another — end; and based on this it appears to me to resolve what Tur wrote in siman 393 regarding eruv chatzerot on condition that one take that bread of yesterday — there the reason mentioned does not apply because of preparation, for there one says on Yom Tov \"if today is holy, behold I made eruv yesterday,\" etc., and thus he does not need that bread; rather it appears in any event good advice — as here it teaches us there not to trouble with another; nevertheless he did not mention this at end of Hilchot Yom Tov since it is not from the law as explained — correct.",
  },
  "output/siman_416/magen-avraham/part-001.txt": {
    "2:א":
      "For two days of Yom Tov in the diaspora. But on Rosh Hashana, even if eaten on the first he fulfills on the second, for they are one sanctity — even to be lenient (Maharam and Rashbam); and it requires study, for in siman 503 he ruled it is forbidden to cook from the first day for one's fellow even on Rosh Hashana — for leniency we do not say they are one sanctity; and it must be said we hold the first day is primary, and if so it is forbidden to cook on it for day two; but regarding techumin, since the first is primary, the second day is like weekday and permitted to go outside the techum.",
    "2:ב":
      "And he shall not say anything. And if he said, it is eruv chatzerot (Bach). And if he made eruv with bread on which he did not declare eruv yesterday, it is not an eruv (Maharam Rashba).",
    "3:_":
      "That it be in a fitting meal — and even though for two diaspora Yom Tov days one could say in any event if the first is weekday he can go to his eruv, and if the second is weekday he need not eruv — nevertheless since he cannot reach his eruv on the first day, even though it is doubtful, it is not fit for him; and so Maharam chapter 6.",
  },
  "output/siman_416/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] they are one sanctity, etc. Even to be lenient — if his eruv was eaten on the first he fulfills on the second — unlike Bach who ruled to be stringent like Raavad, for it is not clear as he is alone against all the great ones as Maggid wrote chapter 8. It appears to me thus is Tur's view, and so explained in Levush seif 2 that they are two sanctities — examine; and so implied in Magen Avraham.",
    "2:_":
      "[2] for Yom Tov, etc. for Shabbat and not for Yom Kippur; for Yom Kippur and not for Shabbat (Tosefta Pesikta \"one may condition\" chapter 3).",
    "3:_":
      "[3] [Levush] if the first night is Yom Tov, etc. And if it is Shabbat, he leaves it there and the next day goes to that place and sees it stands and eats it there, or brings it to his house.",
    "4:_":
      "[4] And the next day he brings it, etc. Or sends it (Avodat HaKodesh page 34).",
    "5:_":
      "[5] [Levush] on Shabbat with bread, etc. One could ask: since he did not make eruv yesterday with bread and Shulchan Aruch wrote only with his feet, and Malbushei Yom Tov wrote thus, and so Avodat HaKodesh.",
  },
  "output/siman_416/biur-halacha/part-001.txt": {
    "2:א": "And on the second night all of bein hashemashot — see siman 415 seif 3.",
    "2:ב":
      "And the next day he brings it — seemingly since he goes himself and sits until nightfall, why does he need the bread? Is not shevitah acquired by his sitting there, as we say if he made eruv with bread on the first he can make eruv with his feet on the second as written at end of seif, and in R' Yonatan we find he challenged the Mishnah and wanted to say in one resolution that until here we do not say he can make eruv with feet on the second except when the bread was eaten — but the poskim did not bring this; on the contrary from Mechaber's wording \"if he wishes to make eruv on the second with his feet\" it implies it depends on his will; and it appears it discusses through an agent, and also initially \"how does he do, he brings it\" the intent is also through agent — for by himself, since he sits until nightfall, he does not need bread; but on the first day possibly because he fears tomorrow it may be burdensome to go himself to make eruv with his feet [for with his feet according to all it does not work for two days where there are two sanctities], therefore he takes bread lest he find a guarded place to leave it and can leave it there explicitly as eruv for both days.",
    "2:ג":
      "Because it is forbidden to make any preparation from Yom Tov to Shabbat, etc. — see in Mishna Berurah that the same applies for two diaspora Yom Tov days; and all this is l'chatchila — but b'dieved even when he made eruv with bread and declared eruv name on the first diaspora Yom Tov for tomorrow's need [i.e. he left it conditionally: if today is holy and tomorrow weekday the eruv is nothing; if today is weekday and tomorrow holy I leave it for eruv need] — b'dieved it helps; specifically from Shabbat to Yom Tov or Yom Tov to Shabbat we are stringent even b'dieved when he made eruv with bread on which he did not declare eruv yesterday; but not regarding diaspora Yom Tov (Raavad siman 528 seif 2 see his reason, brought by Peri Megadim).",
    "2:ד":
      "That he need not say anything since he already declared, etc. — see Bach and Taz that l'chatchila it is forbidden to say it is for eruv tomorrow, for thereby his intent is evident that he left it for eruv, and appears as preparation — and even though he need not say, through his speech it is inferior, analogous to the beginning regarding making eruv with feet where also he need not say yet Shulchan Aruch ruled forbidden to say \"my shevitah\"; and so Raavad; nevertheless b'dieved when he said it is for eruv it is not invalidated, since by law he need not say — his speech does not nullify, so Bach and Raavad; and in Taz it is unclear; per Yad Ephraim's emendation it appears he also holds thus.",
  },
  "output/siman_416/peri-megadim/part-001.txt": {
    "1:_":
      "Needs — Taz, and it implies even with his feet where one says nothing — forbidden on two diaspora Yom Tov days, for he acquires a \"house\" on Yom Tov; and specifically when he made eruv on day one with his feet he does so on day two; per this for two directions, even with feet, impossible on two diaspora Yom Tov days except with one bread east and one bread west, and he leaves both on one day and they remain, etc.; and above see letter 2 — requires study.",
    "2:_":
      "And all the more so — Taz, whenever speech prevents, even b'dieved no eruv. And Raavad 528: on two diaspora Yom Tov days b'dieved if he made eruv with bread on Yom Tov two and said it was his eruv — see; and blessing on Yom Tov two — it appears one does not bless, and his reason see — requires study.",
    "3:_":
      "And if — Taz, seemingly astonishing; and Raavad 7 — one could say it is superfluous since he already wrote new bread; rather here it discusses two directions and cannot with that same bread that he eruvs one east take today for west, for then he must also say orally, and carrying appears intentional for this — needs two loaves, one for day one and two he leaves day one west; and this is \"with that same bread itself\" — meaning he already left west on Yom Tov eve and said this shall be eruv for day two; and on day one before bein hashemashot he goes west, is silent — still requires study.",
    "4:_": "In that — Taz, and so siman 393 letter 3; and Magen Avraham there letter 1 see.",
  },
};

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bHashem\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
];

let total = 0;
const risks = [];
const missing = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!blockFixes[key]) missing.push({ file, key });
  }
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        if (en.length < 8 && !/^[\(\)\d\s\-–—.:,'"]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_en" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("PART1 TOTAL", total);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
