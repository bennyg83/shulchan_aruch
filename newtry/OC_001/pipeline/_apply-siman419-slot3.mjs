#!/usr/bin/env node
/** worker slot 3 — siman 419 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_419/mechaber/part-001.txt": {
    "1:main":
      "Contains 1 seif. It is a mitzvah to increase in the Rosh Chodesh feast.",
  },
  "output/siman_419/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) It is a mitzvah to increase, etc. — and although fundamentally one is not obligated to eat things requiring Birkat Hamazon and may fulfill with other foods, as above in siman 288; nevertheless one who expends on a Rosh Chodesh feast and eats and drinks well in it is praiseworthy. And the poskim wrote in the name of Pesikta: all a person's sustenance is allotted to him from Rosh Hashanah to Rosh Hashanah except what he expends on Shabbatot and Yamim Tovim and Rosh Chodesh and Chol HaMoed and what the children bring to the schoolhouse — if he adds, they add for him from Heaven, and if he decreases, they decrease for him. And Beit Yosef wrote that what it said \"what the children bring,\" etc. refers to tuition fees; and Bach explained it refers to Rosh Chodesh — the intention is what we are accustomed to send through the children Rosh Chodesh money to the rabbi, and one may not abolish this custom — end.",
    "1:ב":
      "(2) In the Rosh Chodesh feast — it appears that increasing in the daytime feast in honor of Rosh Chodesh suffices, and one need not increase also at night. The later authorities wrote that those who are scrupulous — when Rosh Chodesh falls on a weekday they make one food more than on all other days in honor of Rosh Chodesh; and when it falls on Shabbat they make one food more than what they are accustomed on all Shabbatot, so that the honor of Rosh Chodesh be recognizable. And see in Magen Avraham who elaborated on the laws of Birkat Hamazon of Rosh Chodesh; and I already brought some of his words above at the end of siman 288 in Mishna Berurah, and I copied some of his words below in siman 424 in Mishna Berurah, for that is its place.",
  },
  "output/siman_419/machatzit-hashekel/part-001.txt": {
    "1:א":
      "(s.k. 1) It is a mitzvah, etc. And Bach wrote \"and we did not practice thus,\" etc. — regarding the law to make the Purim feast on Shabbat — meaning, if the 15th of Adar (or for us the 14th, which cannot fall on Shabbat) falls on Shabbat in a walled city, even though they read the Megillah on erev Shabbat. Regarding the law to make, etc. — if so Bach's words contradict each other, for here he wrote \"and we did not practice thus,\" implying that by law one should make the feast on Sunday; and below he wrote regarding the Purim feast that even by law one should not [do so] on Shabbat except due to custom alone.",
    "1:ב":
      "And it appears to me one should draw the meaning that one should not change the custom; nevertheless to fulfill also per the Yerushalmi's view.",
    "1:ג":
      "And in Shelah (in Shaar HaOtiyot, letter kuf, beginning of laws of Birkat Hamazon in gloss) he adopted a different approach — that one does not [mention] after the beginning of the meal.",
    "1:ד":
      "And he wrote \"on Shabbat\" — meaning, if Rosh Chodesh falls on Shabbat.",
    "1:ה":
      "He mentions Retzei not because we follow the beginning of the meal, but because at the end of the meal it is still Shabbat, for there is a mitzvah to add [on Shabbat]; and since he mentions Retzei, by pulling along he also mentions Yaaleh Veyavo, even though on Rosh Chodesh there is no mitzvah in the addition; nevertheless as long as it is Shabbat, automatically it is also Rosh Chodesh — so it is there.",
    "1:ו":
      "Since truly now it is Rosh Chodesh — meaning Rosh Chodesh is from the side of law, and Shabbat has already passed but he adds upon it; even though there is a mitzvah in the addition, nevertheless the essence of the day which is Rosh Chodesh takes precedence.",
    "1:ז":
      "A fortiori when Rosh Chodesh falls on motzaei Shabbat, etc. — for there is at least a mitzvah in the addition of Shabbat, even though truly now it is Rosh Chodesh; one should follow the beginning of the meal.",
    "1:ח":
      "According to what he wrote, etc. — if he prayed Maariv — meaning within the meal.",
    "1:ט":
      "And therefore it appears to me, etc. — he should mention that of Rosh Chodesh, for in any case he must defer either Retzei or Yaaleh Veyavo; therefore it is preferable to mention Yaaleh Veyavo and say Retzei.",
    "1:י":
      "Since without this Shelah's opinion is so — even if he did not eat bread at night. Even if he prayed Maariv from erev [within the meal], meaning within the meal, nevertheless he has already made it night. And if he mentioned Rosh Chodesh or Shabbat it would be two contradictory matters, as Maharil wrote.",
    "1:כ":
      "What we hold — meaning what we hold in siman 288 that we follow the beginning of the meal; and if the Shabbat meal extends until night he mentions Retzei even though certainly the congregation already prayed Maariv — for we do not say he extended his meal; the plain congregation did not extend.",
    "1:ל":
      "And so too siman 263 regarding Mincha on erev Shabbat — for even though the congregation already accepted Shabbat, if the individual did not accept Shabbat with them and has not yet prayed Mincha, he prays Mincha; behold if he has not yet prayed Mincha he is not drawn after the congregation who prayed Maariv.",
    "1:מ":
      "And see in Tur siman 117 — he wrote in the name of Ravyah that the matter of asking for dew and rain 60 days after the tekufah requires hour for hour (but we do not hold thus); therefore if the tekufah for example falls 3 hours into the day and when the congregation prayed in the day at Shacharit before 3 hours they still had not asked for rain since 60 days hour for hour had not been completed, even an individual praying after 3 hours should not ask for rain, lest there be two Torahs, and he is drawn after the congregation (but this is not a complete proof).",
  },
  "output/siman_419/magen-avraham/part-001.txt": {
    "1:_":
      "It is a mitzvah, etc. Rif and Raosh wrote in the name of Yerushalmi that if Rosh Chodesh falls on Shabbat one should make the Rosh Chodesh feast on Sunday of Shabbat, for on Shabbat it is not recognizable that one does so for Rosh Chodesh. Bach wrote and we did not practice thus. And in siman 488 s.k. 6 Bach ruled regarding the law to make the Purim feast on Shabbat erev; and it appears to me one should extend the third meal until night and then fulfill the obligation of Rosh Chodesh as well. And see siman 288 regarding mentioning Retzei and Yaaleh Veyavo — we follow the beginning of the meal. And in Shelah he adopted a different approach and wrote that on Shabbat when there is a mitzvah in its addition he mentions Retzei, but on Rosh Chodesh when it falls on a weekday there is no mitzvah in its addition; therefore if the Rosh Chodesh meal extended until night he does not mention that of Rosh Chodesh. And if Rosh Chodesh falls on motzaei Shabbat and the Shabbat meal extended until night he mentions that of Rosh Chodesh and not that of Shabbat, since truly now it is Rosh Chodesh erev; and all this is according to his view. But according to what Rabbeinu Yosef wrote in siman 288 that we follow the beginning of the meal — and the same when eating on erev — Rama ruled in siman 271 s.k. 6 that if the meal extended until night he does not mention that of Shabbat, for we follow the beginning of the meal even though truly now it is Shabbat; a fortiori when Rosh Chodesh falls on motzaei Shabbat we follow the beginning of the meal and mention that of Shabbat and he does not mention that of Rosh Chodesh. However in Raosh and Rivan there they wrote explicitly in the name of Tosafot that if they ate bread on Shabbat he must mention that of Shabbat even though the beginning of the meal was on erev — so too in responsa Maharil siman 56. And if so, if Rosh Chodesh falls on motzaei Shabbat and he ate bread from erev and also at night he must mention both. However according to what is written in responsa Maharil siman 56 that if he prayed Maariv he again does not mention that of Shabbat — the reason is because it is contradictory to each other; if so here too they are contradictory if he mentions both. And therefore it appears to me that if he ate bread also at night he mentions that of Rosh Chodesh and not that of Shabbat; but if he did not eat bread at night he mentions that of Shabbat and not Rosh Chodesh. And it is written in Hilchot Simchot to Maharam that even if he prayed Maariv from erev he again does not mention that of Rosh Chodesh or Shabbat — see siman 375 and in Orach Chaim end of siman 123. But if he did not pray, even though the congregation prayed, he mentions that of Rosh Chodesh — what we hold that even though the congregation prayed, if he did not pray he mentions Retzei; and so too siman 263 regarding Mincha. However if he prayed Mincha and began to eat after the congregation prayed Maariv on Rosh Chodesh from erev he does not mention that of Rosh Chodesh; and the same conversely — if the congregation prayed on erev Rosh Chodesh from erev and he began to eat after Maariv even though he did not pray Maariv he mentions that of Rosh Chodesh. And see in Tur siman 117. However if he did not pray Mincha he still does not mention that of Rosh Chodesh since he is destined to pray weekday Mincha; and the same on motzaei Rosh Chodesh he mentions that of Rosh Chodesh in Birkat Hamazon if he did not pray Mincha even though the congregation prayed Maariv. And it appears to me that if Chanukah falls on motzaei Shabbat and he began to eat on Shabbat and his meal extended until night he mentions that of Shabbat and not that of Chanukah even if he ate bread also at night, since it is only optional to mention that of Chanukah in Birkat Hamazon as is found in chapter 2 of Bava Metzia. Tur wrote in the name of Pesikta: all a person's sustenance is allotted to him from Rosh Hashanah except what the children bring to the schoolhouse on Rosh Chodesh. And Rabbeinu Yosef explained specifically tuition fees; and Bach explained this is what they are accustomed to give Rosh Chodesh money to the rabbi, and one may not abolish the custom — end.",
  },
  "output/siman_419/baer-heitev/part-001.txt": {
    "1:_":
      "In the feast. Raosh wrote in the name of Yerushalmi that if Rosh Chodesh falls on Shabbat one should make the Rosh Chodesh feast on Sunday of Shabbat, for on Shabbat it is not recognizable that one does so for Rosh Chodesh. And Bach wrote and we did not practice thus. And Magen Avraham wrote and it appears to me one should extend the third meal until night and then fulfill the obligation of Rosh Chodesh as well. And see siman 288 how to conduct with Retzei and Yaaleh Veyavo. And it is written in Hilchot Simchot to Maharam that even if he prayed Maariv from erev he again does not mention that of Rosh Chodesh or Shabbat — see in Yoreh Deah siman 375. But if he did not pray, even though the congregation prayed, he mentions that of Rosh Chodesh — as is the case with what we hold that even though the congregation prayed, if he did not pray he mentions Retzei; and so ruled siman 263 regarding Mincha. However if he prayed Mincha and began to eat after the congregation prayed Maariv on Rosh Chodesh from erev he does not mention that of Rosh Chodesh; and the same conversely — if the congregation prayed on erev Rosh Chodesh from erev and he began to eat after Maariv even though he did not pray Maariv he mentions that of Rosh Chodesh. And see in Tur siman 117. However if he did not pray Mincha he still does not mention that of Rosh Chodesh since he is destined to pray weekday Mincha; and the same on motzaei Rosh Chodesh he mentions that of Rosh Chodesh in Birkat Hamazon if he did not pray Mincha even though the congregation prayed Maariv — Magen Avraham and what we hold siman 288. He wrote in Shulchan Gavoah: I saw scrupulous people — when Rosh Chodesh falls on a weekday they make one food more in honor of Rosh Chodesh; and when it falls on Shabbat they make one food more than what they do in honor of Shabbat; and it is implied from Yerushalmi that it is a mitzvah feast like Purim — see Taz. And so too Bach: what the children bring — Rosh Chodesh money to the rabbi — one may not abolish it — Magen Avraham and what we hold siman 242.",
  },
  "output/siman_419/beer-hagolah/part-001.txt": {
    "1:_":
      "Tur — from Yerushalmi Megillah on \"in these they said\" we advance, etc. — from Torah and from Prophets and from Pesikta; and so too Rokeach.",
  },
  "output/siman_419/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] To increase, etc. — because of the honor of the day which is atonement for Israel, as the Sages said \"and brought atonement upon me that I diminished the moon\" — meaning on my account, because I diminished the moon from its light, and I wish to make honor for it that all Israel be atoned in it whenever it renews. Another reason — remembrance of the feast they make for the witnesses of the moon when the Temple stood, when they would sanctify based on sight (Kol Bo daf 43). And all who add, they add for him from Heaven, and if he decreases, they decrease for him. And see in Rif who emends in the Gemara that one must say \"bring atonement to me\" with alef and not with ayin \"upon me.\" Shiyurei Kenesset HaGedolah wrote: I saw they are scrupulous — when Rosh Chodesh falls on a weekday they make one food more; and when it falls on Shabbat they make one food more than what they do in honor of Shabbat — until here. And Magen Avraham wrote one should extend the third meal until night, for in Yerushalmi one should make the Rosh Chodesh feast on Sunday of Shabbat, for on Shabbat it is not recognizable that one does so for Rosh Chodesh. What the children bring money to the rabbi every Rosh Chodesh and call it Rosh Chodesh money — one may not abolish it. One who increases and one who decreases (Bach).",
  },
  "output/siman_419/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] It is a mitzvah to increase, etc. — for it is equated to a moed, as it is written \"and on the day of your rejoicing and on your moedim and on your Rosh Chodesh days.\" And it is also in Pesikta: all a person's sustenance is allotted to him from Rosh Hashanah until Rosh Hashanah except what he expends on Shabbatot and Yamim Tovim and Rosh Chodesh and Chol HaMoed and what the children bring to the schoolhouse — if he adds, they add for him, and if he decreases, they decrease for him. Tur. And what it said \"and what the children,\" etc. — Beit Yosef explained this is the teacher's wages; and Bach explained this is what they are accustomed to give Rosh Chodesh money to the rabbi, and he wrote one may not abolish it — one who increases, etc.",
  },
  "output/siman_419/peri-megadim/part-001.txt": {
    "1:_":
      "It is a mitzvah — Taz, and see siman 488 s.k. 8 in Taz and Magen Avraham here; and what Tur wrote is similar to the chapter of Acharonim, and one may say it is like intercalating the month per Ran; but similar to the chapter of Ma'acharin that the rejoicing be recognizable for Purim — the same applies to Rosh Chodesh, as it is implied every Rosh Chodesh, as written \"and on the day of your rejoicing and on your moedim and Rosh Chodesh,\" etc. Eshel Avraham — proof from Shmuel 1:20 \"tomorrow is the new moon\" — Rashi zatzal explained to come to the king's table on the day of the moed — see there. And see siman 288 in Magen Avraham s.k. 4 that one is not obligated to eat bread; and siman 695 in Magen Avraham s.k. 9 that on Purim too one is not obligated in bread but only other foods. But Peri Chadash here wrote that a feast of mitzvah implies bread, but there is no obligation — requires study. Some light special candles in honor of Rosh Chodesh — Peri Chadash — and this is at night in his house like Shabbat, and possibly in the synagogue as well.",
  },
  "output/siman_419/turei-zahav/part-001.txt": {
    "1:_":
      "It is a mitzvah to increase, etc. And it is explained in Pesikta that Tur brings — that also in the Rosh Chodesh feast it is said: if he adds, they add for him from Heaven, and so if he decreases, they decrease for him. Beit Yosef brought Yerushalmi chapter 1 of Megillah: \"in these they said\" — we advance and do not delay Megillah reading and terumat shekalim — meaning, if it comes on Shabbat we advance them; but the Rosh Chodesh feast and Purim feast we delay and do not advance. And it concludes there \"and they shall do on Shabbat\" and answers: to make them days of feasting and joy — that joy depending on beit din is excluded; this one whose joy depends on Heaven. And since he equated the Rosh Chodesh feast to the Purim feast, it is implied that also the Rosh Chodesh feast that comes on Shabbat we delay it after Shabbat like Purim. And Maharach wrote zatzal: however we did not practice thus.",
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
