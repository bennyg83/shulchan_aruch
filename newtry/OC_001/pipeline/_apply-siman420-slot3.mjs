#!/usr/bin/env node
/** worker slot 3 — siman 420 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_420/mechaber/part-001.txt": {
    "1:main":
      "Whether women are permitted to keen on Rosh Chodesh. Contains 2 seifim. Over the dead, women may chant dirges where all say together and clap — meaning striking palm against palm; but they may not keen, where one leads and the others respond after her. After the dead is buried they may neither chant dirges nor clap.",
    "2:main":
      "One recites Tziduk HaDin and Kaddish. {Rama: And this is not the custom — see Yoreh Deah siman 401 seif 6 in the gloss. Similarly on all days when Tachanun is not recited, and similarly on Shabbat eve after midday. Some say that if one is buried at night, Kaddish and Tziduk HaDin are not recited. (Kol Bo)}",
  },
  "output/siman_420/mishnah-berurah/part-001.txt": {
    "1:_":
      "(1) But they may not keen — for this is the essence of eulogy, and it is forbidden on Rosh Chodesh since it is like a Yom Tov; and see in Yoreh Deah siman 401 s.k. 5 that all this is for an ordinary person, but for a Torah scholar they keen in their usual manner on a weekday.",
    "2:א":
      "(2) One recites Tziduk HaDin, etc. — for it is not eulogy but acknowledgment and acceptance of Heaven's judgment.",
    "2:ב":
      "(3) And this is not the custom — for it accustoms to eulogy. And the later authorities wrote that even for a Torah scholar in his presence they do not practice on Rosh Chodesh to say Tziduk HaDin, for it is supplication; rather they deliver a derashah upon him if he is worthy, and recite Kaddish after the derashah.",
    "2:ג":
      "(4) And so on Shabbat eve after midday — for likewise Tachanun is not recited, and the same on erev Yom Tov; therefore one does not say Tziduk HaDin. And see further details of laws on this in Yoreh Deah siman 401 s.k. 6 and in the later authorities there. Taz wrote it is permitted to say Tziduk HaDin on a great man who died even on days when Tachanun is not said, such as Lag BaOmer or the 15th of Av and on the 15th of Shevat and the like, which are not moed; but not on Rosh Chodesh, Chanukah, and Purim, for these are mentioned in the Talmud.",
    "2:ד":
      "(5) At night — but during bein hashemashot one may say Tziduk HaDin and Kaddish.",
  },
  "output/siman_420/magen-avraham/part-001.txt": {
    "2:_":
      "Tziduk HaDin. Levush siman 470 wrote that even for a Torah scholar in his presence one does not say Tziduk HaDin, for it is supplication; rather they deliver a derashah upon him if he is worthy, and recite Kaddish after the derashah.",
  },
  "output/siman_420/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) Tziduk HaDin, etc. — they deliver a derashah upon him if he is worthy. He was uncertain in Sefer Imrei Baruch — according to what Magen Avraham wrote below siman 547 s.k. 8 that on Chol HaMoed one may not deliver a derashah except on a Torah scholar in his presence — and he concluded: and it appears to me that in our time there is no law of Torah scholar who knows halacha in every matter, etc. — end. Whether he was stringent specifically on Chol HaMoed or also on Rosh Chodesh — we say we have no law of Torah scholar; and see Taz here.",
  },
  "output/siman_420/baer-heitev/part-001.txt": {
    "2:_":
      "Tachanun. Levush wrote that even for a Torah scholar in his presence one does not say Tziduk HaDin, for it is supplication; rather they deliver a derashah upon him if he is worthy, and recite Kaddish after the derashah — see siman 470. And in Tur he wrote that the sages of Mainz said Tziduk HaDin on Rosh Chodesh, Chanukah, and Purim for a great man. And Taz wrote: I heard from one elder who testified that he was in the community of Krakow in the year 533 when Rama zatzal passed away on Lag BaOmer day, and they were uncertain whether to say Tziduk HaDin; one important man stood and testified that he heard from Rama's mouth that one says Tziduk HaDin on a great man, and immediately they said it on Rama in a loud voice. And it appears to rely on this on days when there is no Tachanun, such as Lag BaOmer or the 15th of Av and on the 15th of Shevat which are not moed; but not on Rosh Chodesh and Chanukah and Purim and the month of Nisan, for these have prohibition by Talmudic law — end.",
  },
  "output/siman_420/beer-hagolah/part-001.txt": {
    "1:_": "Mishnah Moed Katan 28.",
    "2:_":
      "Tur in the name of the disciples of Rashi in the name of Rashi; and in Yoreh Deah siman 401 in the name of Rambam and in the name of responsa of the Geonim.",
  },
  "output/siman_420/beur-hagra/part-001.txt": {
    "2:א": "Seif 2 — one recites Tziduk HaDin — for it is no less than chanting dirges and clapping.",
    "2:ב":
      "And this is not the custom — for we say in chapter 3 of Moed Katan: one does not leave, etc. — so as not to accustom, for everything one accustoms to eulogy is forbidden.",
    "2:ג": "And so on all — see siman 263 s.k. 2; and see Tur here.",
    "2:ד": "And so on erev Shabbat — see siman 267 s.k. 1.",
    "2:ה": "Some say that if — see siman 131 s.k. 3.",
  },
  "output/siman_420/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] But they may not keen, etc. — and for a Torah scholar in his presence they keen (Yoreh Deah siman 401). Malbushei Yom Tov wrote: it appears to me that if he was buried it is forbidden like chanting dirges and clapping — until here. The day of the report — even if far — is considered as in his presence (Yoreh Deah there).",
    "2:_":
      "[2] This is not the custom, etc. — even for a Torah scholar in his presence, for it is supplication; rather they deliver a derashah upon him if he is worthy, and recite Kaddish after the derashah (Levush siman 470 and 696 brought there from Magen Avraham). And on one who is not a Torah scholar it is forbidden to deliver a derashah upon him. And greater than this Magen Avraham wrote end of siman 547 that in our time there is no law of Torah scholar; and the view of Levush appears to me that for this matter even in our time there is a Torah scholar, as he wrote in Yoreh Deah siman 243 at the conclusion and in Sema end of siman 262; and it is possible that Magen Avraham was not stringent except on Chol HaMoed since he did not write thus anywhere except on Chol HaMoed — and requires study. Levush and Shach Yoreh Deah siman 401 wrote: on erev Shabbat and erev Yom Tov after midday they do not say; but on erev Rosh Chodesh and erev Chanukah they say; and it appears the same law applies on erev Purim. Here in Prague they practice that they do not say even on erev Rosh Chodesh after midday; and the first [day] is primary, for there are poskim who say even on Yom Tov — and see Yoreh Deah siman 401. And Taz wrote that Rama died on Lag BaOmer and they said Tziduk HaDin on him; and the same applies on the 15th of Av and the 15th of Shevat; but not on Rosh Chodesh and Chanukah and Purim and the month of Nisan, for these have prohibition by Talmudic law — until here. And it is not so regarding Nisan — it is only custom; and so between Yom Kippur and Sukkot and from Rosh Chodesh Sivan until Shavuot. But they forbade the festival and the 15th of Av and the 15th of Shevat — mentioned in the Talmud — and see siman 573. And even on Lag BaOmer it appears to me one should not rely except on the greatest of the generation, Heaven forbid, like Rama. And on Magen Avraham there is wonder — in siman 573 he wrote that forbidding the festival is by Talmudic law, and in siman 488 s.k. 3 he wrote it is only custom; and it is possible to distinguish between forbidding the festival of Shavuot which is by law and forbidding the festival of Passover and Sukkot from custom; but from his words it implies he means every \"forbidding the festival.\"",
  },
  "output/siman_420/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] But they may not keen, etc. — and this is for an ordinary person; but for a Torah scholar, whether on Chol HaMoed or on Rosh Chodesh, Chanukah, and Purim, they chant dirges and keen in their usual manner on a weekday. And this is in his presence; but not in his absence. And the day of the report — even if far — is considered as in his presence — Shulchan Aruch Yoreh Deah siman 401 seif 5; and in Chakham Tzvi klal 169 ot 25; and what Chayei Adam wrote klal 118 ot 7 that one should not say kinot and eulogies even on a Torah scholar in his presence because we have no Torah scholar in this era — see there; it is possible that in Chakham Tzvi he retracted; and this will be explained further from this below in siman 547, with Heaven's help.",
    "2:_":
      "(2) [Seif 2] One recites Tziduk, etc. — Tur brought a dispute: the sages of Vermeiza say it in the manner of a dirge, and the sages of Mainz do not say it except on a great man. And R' Yitzchak Giat wrote: they practiced from the days of the early elders not to say Tziduk HaDin on Rosh Chodesh, Chanukah, and Purim; and the disciples of Rashi wrote in his name that they say Tziduk HaDin and Kaddish even on Chol HaMoed — see there. And Shulchan Aruch ruled like the disciples of Rashi because thus is Rambam's view, as Beit Yosef wrote; and Raosh wrote the reason of the disciples of Rashi — because Tziduk HaDin and Kaddish are not eulogy but acknowledgment and acceptance of Heaven's judgment — see there. And Beit Yosef and Bach brought it. And therefore, since there is a dispute on this, each river and its channel; and in a place where there is no known custom, one returns and asks which is preferable.",
  },
  "output/siman_420/chatam-sofer/part-001.txt": {
    "1:_":
      "In Magen Avraham Tziduk HaDin — see note; see in Magen Avraham s.k. 8; and see Eliyah Rabbah here s.k. 2 s.k. 47 regarding the law of Torah scholar to distinguish between Rosh Chodesh and Chol HaMoed [from the Gaon, may he be safe].",
  },
  "output/siman_420/peri-megadim/part-001.txt": {
    "1:_":
      "And so — Taz; and see Levush 470 — Magen Avraham brought here regarding a Torah scholar in his presence they deliver a derashah upon him; nevertheless one does not say Tziduk HaDin; and nevertheless one may say on the 15th of Av and Shevat and Lag BaOmer they say on a great man. And Eliyah Rabbah ot 2 — the days of Nisan are only custom, and between Yom Kippur and Sukkot and Sivan until Shavuot. And Chayei Adam — Shavuot one may say by law, and Chayei Adam that Passover and Sukkot are from custom; and see siman 429 in Magen Avraham s.k. 8 and 694 — see there. On erev Shabbat and erev Yom Tov after midday one does not say Tziduk HaDin; and on erev Rosh Chodesh and erev Chanukah after midday they say — see there; and it appears all the more so erev the 15th of Shevat and Lag BaOmer, etc. However if they prayed Maariv from erev, one may say one does not [say it]. One who comforts the mourner on Rosh Chodesh — see Levush; and see Yoreh Deah 401 on this.",
  },
  "output/siman_420/turei-zahav/part-001.txt": {
    "2:_":
      "And so on every day when Tachanun is not said in them. In Tur it is written that the sages of Mainz said Tziduk HaDin on Rosh Chodesh, Chanukah, and Purim for a great man. And I heard from one elder who testified that he was in the community of Krakow in the year 533 when Rama zatzal passed away on Lag BaOmer day, and they were uncertain whether to say Tziduk HaDin; one important man stood and testified that he heard from Rama's mouth that one says Tziduk HaDin on a great man, and immediately they said it on Rama in a loud voice. And it appears to rely on this on days when there is no Tachanun, such as Lag BaOmer or the 15th of Av and on Shevat, which are not moed. And in particular that Raosh wrote in the name of Rashi that Tziduk HaDin and Kaddish are not eulogy but acknowledgment and acceptance of Heaven's judgment; but not on Rosh Chodesh, Chanukah, and Purim, and the month of Nisan, for these have prohibition by Talmudic law, as is correct in my humble opinion.",
  },
};

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
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

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) {
            risks.push({ file, key, pattern: re.source });
          }
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}

console.log("TOTAL", total);
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
