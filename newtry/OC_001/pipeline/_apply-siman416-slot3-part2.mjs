#!/usr/bin/env node
/** worker slot 3 — siman 416 part 2 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_416/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Yom Tov that falls adjacent to Shabbat, etc. — Shabbat and Yom Tov are two sanctities and do not depend on each other — Tur and Levush.",
    "2:_":
      "(2) There: he may make eruv, etc. — meaning he can make two eruvin, etc. Tur and Levush; see below seif 3 order of placing eruv in two directions see there. And regarding blessing he blesses on Yom Tov eve over both at time of placing eruv.",
    "3:_":
      "(3) There: he may make two eruvin, etc. — if he needed day one to go here and day two to go there, he can make eruv east and west on first Yom Tov eve; and say: my eruv of the east shall acquire for me today for tomorrow's need, and my eruv of the west shall acquire for me at bein hashemashot tomorrow for day two's need — Rashi Eruvin 38a.",
    "4:_":
      "(4) There: and rely on whichever, etc. — even from nightfall he may rely as written siman 413, 415 or letter 2; if so when he does not wish to clarify until after nightfall he should not say at time of placing eruv except: with this eruv I shall be permitted to walk from such place two thousand amot each direction; and so on the eruv he places on the other side; and afterward say on whichever of these eruvin he wishes tomorrow I shall go, and the other shall acquire for day two; and after nightfall or tomorrow when he chooses one he says today I go to my eruv in the east or west, and automatically at bein hashemashot of day two the other eruv acquires for him; and he may not go to the side he walked on day one based on eruv A.",
    "5:_":
      "(5) There: and rely on it for one, etc. — meaning also he conditions at time of placing eruv that it acquire for him at bein hashemashot of whichever day he wishes of these two days, and the other day he is like his townspeople.",
  },
  "output/siman_416/shaarei-teshuvah/part-001.txt": {
    "1:_":
      "(In Shulchan Aruch seif 2) One who makes eruv for two diaspora Yom Tov days; and Nachalat Tzvi wrote siman 48: if on day two he must go to a city distant from him, nearly six thousand amot, he can place on Yom Tov eve eruv two thousand amot in the direction toward his place — on first Yom Tov he goes from his place until nearly four thousand from his place and sees he can arrive there at least while it is still day before bein hashemashot, and remains there after tzeit hakochavim and intends in his heart to acquire shevitah there, and does not return to his place — since he acquired shevitah here he has from the shevitah place only two thousand toward his place; he can only go from there to wake the community he desires; but if it is Yom Tov adjacent to Shabbat one may not permit except when he needs the city for a necessary matter and great need see there; and implied from his words: in order to pray there with ten, or another mitzva matter — as the questioner mentioned, this is \"great need\" see there.",
  },
  "output/siman_416/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "And impossible with that same bread he left yesterday. And in Prisha he forbids even with this bread for another direction. Rather specifically in the same place he eruvd first on the first; but if he eruvd with feet on the first he is exempt — for he can make eruv on the second even for another direction. And Raavad wrote in name of Avodat HaKodesh for Rashba permitted see there; but Ritva in Eruvin explains to forbid. And see responsa Nachalat Tzvi vol. 1 Orach Chayim siman 48.",
  },
  "output/siman_416/yad-ephraim/part-001.txt": {
    "1:_":
      "In Taz s.k. 2 in name of Rashba it is not eruv; and l'chatchila speech is forbidden even if he makes eruv with bread he eruvd yesterday, like making eruv with feet where speech is forbidden even though he need not, as Shulchan Aruch wrote \"he shall not say anything\"; and so implied in Gemara daf 38, etc. as above.",
    "2:_":
      "There s.k. 3 — \"meaning he wishes to go\" — it is astonishing; see Raavad; and possibly need to note: if he wishes to make eruv with feet — Rashi explained when his eruv he made on day one was eaten; and Taz depicts when now he wishes to eruv another direction — if so impossible except with bread he left yesterday for the other direction, for regarding this direction it is like new bread; therefore he says if he wishes to make eruv with feet it is eruv even though on the first he made eruv with bread.",
  },
  "output/siman_416/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Yom Tov, etc. adjacent to Shabbat, etc. — Yom Tov and Shabbat, and likewise two diaspora Yom Tov days, are two sanctities; therefore one eruv for one day does not apply to the other.",
    "1:ב": "(2) He may make eruv, etc. — meaning he can make two eruvin in one case, etc.",
    "1:ג":
      "(3) For two directions — and he intends that the eruv he will choose tonight he will walk from there two thousand amot; it acquires shevitah for him at bein hashemashot of this day for tomorrow's need, and the eruv on the other side acquires shevitah for him at bein hashemashot tomorrow for day two's need.",
    "1:ד":
      "(4) On whichever he wishes — and he need not clarify his intent from Yom Tov eve, for we say there is retroactive clarification, and it is clarified retroactively that in this place he acquired shevitah today at bein hashemashot, as above siman 413; however once he chose one side on day one he may no longer walk that day to the other side.",
    "1:ה":
      "(5) For one of the two days — meaning for whichever he wishes; and it discusses also that he intends at placement that his eruv acquire for him at bein hashemashot of whichever of the two days for his tomorrow's day, and on the other day he is like his townspeople.",
    "1:ו":
      "(6) As one day, etc. — for we consider them as one long day, and on one day one cannot make eruv half here and half there.",
    "1:ז":
      "(7) For one direction — and likewise he cannot say: my eruv here shall acquire today and tomorrow I shall be like my townspeople.",
    "1:ח":
      "(8) And similarly, etc. — at the beginning of the matter, as there: that he can place one eruv on Yom Tov eve and it applies to it alone or only to the Shabbat after Yom Tov.",
    "1:ט":
      "(9) For another Shabbat — provided his eruv remains on that Shabbat at bein hashemashot. And when he places for many Shabbatot he must always watch lest it spoil or become wormy — which is common, especially in summer — or be lost entirely [Acharonim].",
    "2:א":
      "(10) One who makes eruv for two Yom Tov days, etc. — meaning he specified explicitly that the eruv apply to both days or to Shabbat and Yom Tov.",
    "2:ב":
      "(11) Of the diaspora — and excluding two days of Rosh Hashana: even if his eruv was eaten on the first day he may walk on the second too, for immediately at bein hashemashot of the first the eruv was acquired for both days, for they are one sanctity — unlike diaspora days where the second was not fixed except because of doubt of the day; and likewise one who makes eruv with his feet at bein hashemashot of the first day of Rosh Hashana acquires shevitah thereby for both days.",
    "2:ג":
      "(12) Even though it is one eruv, etc. — meaning nevertheless we do not say it suffices that the eruv remain on the first day alone, since there are two sanctities.",
    "2:ד":
      "(13) How does he do, etc. — meaning if it is a place that is not guarded and he fears it may be lost on day one, therefore he brings it there himself; and likewise through an agent — and he sits there until dark, then takes it home, and must bring it there again tomorrow.",
    "2:ה":
      "(14) If the night was Yom Tov — and on Shabbat when it is forbidden to carry it home, he must go tomorrow before bein hashemashot to see if the eruv remains and sit there until dark, as below.",
    "2:ו":
      "(15) And he eats it if, etc. — meaning he may eat it when he wishes, since the eruv already took effect.",
    "2:ז":
      "(16) With his feet on the second — for the first day's eruv with his feet, even if he intended it help for both days, does not help at all for day two; and the poskim wrote that if he did not make eruv on the first — neither with bread nor with feet — he cannot make eruv on the second even with feet, for since initially it was forbidden in this place to go outside the techum it appears as preparation.",
    "2:ח":
      "(17) At that place — but for another direction he cannot make eruv with feet on day two, for since this place was yesterday forbidden to walk to, it appears as preparation now from Yom Tov to Shabbat; and some say even for another direction he can make eruv with feet for day two, only he must be careful not to say anything, only sit until dark, as below.",
    "2:ט":
      "(18) And he shall not say anything — and if he transgressed and spoke, nevertheless he acquires shevitah [Acharonim].",
    "2:י":
      "(19) Any preparation from Yom Tov to Shabbat — and likewise regarding two diaspora Yom Tov days it is forbidden to prepare from one for the other (Chayei Adam).",
    "2:כ":
      "(20) And all the more so he cannot, etc. — and even b'dieved it does not help when he made eruv with bread, since the first time he made eruv only with feet; and likewise in what Mechaber wrote below that specifically with that same bread — if he used other bread, even b'dieved it is not eruv.",
    "2:ל":
      "(21) And if he wishes, etc. — because with his feet he need not say anything and there is no preparation as above.",
    "2:מ":
      "(22) With that bread, etc. that he need not say, etc. — meaning unlike if he takes other bread, which requires declaring eruv name and is included in preparation.",
    "2:נ":
      "(23) Itself — and in that place specifically; for in another place he cannot make eruv even with that bread, since when he removed the bread from its place not intending to leave it again in this place, the eruv name was uprooted from it and it is as making eruv with new bread.",
    "2:ס":
      "(24) That he need not say anything — and see Peri Megadim who tends to say that also the blessing on eruv he cannot then bless, for thereby preparation would be evident.",
    "3:א": "(25) What we said, etc. — meaning at the beginning of seif 1.",
    "3:ב":
      "(26) That it be possible for him — meaning they are not distant from each other more than two thousand, as explained.",
    "3:ג":
      "(27) Fit while it is still day — for even though eruv acquisition is at the beginning of day two, nevertheless it must be reachable and edible from the end of day one.",
    "3:ד":
      "(28) Distant from his home westward — meaning when his home is in the field; but if he is in a city, the whole city counts as four amot, and we measure the two thousand outside the city wall.",
    "3:ה":
      "(29) Within five hundred amot — the rule: whether he distanced the eruv on this side much or little, always the second eruv opposite him must not be more than two thousand from him.",
    "4:_":
      "(30) Regarding both, etc. — for there is prohibition of carrying like Shabbat; therefore all these matters apply.",
    "5:_":
      "(31) But not eruv chatzerot — because there is no prohibition of carrying on Yom Tov. And see siman 518 in Acharonim that nevertheless when one makes eruv chatzerot for Shabbat he includes Yom Tov too, for things not needed today are forbidden on Yom Tov too without eruv.",
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

console.log("PART2 TOTAL", total);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
