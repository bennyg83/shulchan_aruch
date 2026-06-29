#!/usr/bin/env node
/** worker slot 3 — siman 418 part 1 (fasting on Rosh Chodesh) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_418/mechaber/part-001.txt": {
    "1:main":
      "The law of fasting on Rosh Chodesh. Contains 5 seifim. Rosh Chodesh is forbidden for fasting.",
    "2:main":
      "One does not decree fasts for the congregation on Rosh Chodesh, on Chanukah, or on Purim. If they already began — i.e. they decreed to fast such-and-such days and they began them before Rosh Chodesh — even one day they do not interrupt, and they fast and complete.",
    "3:main":
      'An individual who accepted upon himself to fast such-and-such days and Rosh Chodesh occurred among them, or who accepted to fast on Rosh Chodesh: if he accepted with ordinary language of accepting a fast, he does not need release; but if he accepted upon himself with language of "behold upon me," which is the language of a vow, he needs release by a sage (and see Yoreh De\'ah siman 215 seif 3).',
    "4:main":
      "If he swore to fast such-and-such days and Rosh Chodesh occurred among them, the oath applies to him from the reason of a general prohibition. But if he explicitly swore to fast on Rosh Chodesh, it appears to me the oath applies to him since it is only d'rabbanan; except from the words of Rambam it appears that it is d'oraisa (and see above siman 570).",
    "5:main":
      "One who fasts on Rosh Chodesh or on Chanukah or Purim for a dream-fast must sit a fast-for-a-fast.",
  },
  "output/siman_418/beer-hagolah/part-001.txt": {
    "1:_": "Mishnah Taanit 15",
    "2:א": "In the Mishnah there",
    "2:ב": "In the Gemara there, like R' Yossi",
    "2:ג": "The conclusion of the Gemara there",
    "3:א": "Baraita Taanit 12, and Raosh brought it in chapter 9 of Nedarim",
    "3:ב": "In the name of R' Yitzchak MeLunil there, and in the name of Ramban",
    "4:א": "Beit Yosef from the words of Rambam in chapter 5 of Hilchot Shevuot",
    "4:ב": "Chapter 5 of Hilchot Nedarim",
    "5:_": "Hagahot Maimoniyot chapter 1 of Hilchot Taanit",
  },
  "output/siman_418/baer-heitev/part-001.txt": {
    "1:_":
      "Forbidden. Beit Yosef wrote siman 579: the people of the community of Vermaisa fast on the decree on Rosh Chodesh Sivan, and Maharash wrote in a responsum that we do not learn from them in general; and see siman 288 seif 7 that it states one is not obligated to eat bread on Rosh Chodesh, for even if he ate fruits he has fulfilled.",
    "3:א": "Individual. See siman 570 what he wrote there seif 1.",
    "3:ב":
      "Yoreh De'ah. Taz wrote there: I wrote the conclusion that we have no distinction except between language of a vow and language of accepting a fast — for with vow language it applies in all cases and needs release, and with fasting language it does not apply at all and does not need release — end of his words.",
    "5:_":
      "Dream. It appears to me one who fasts a dream-fast on Rosh Chodesh Nisan or Rosh Chodesh Av does not need to sit fast-for-a-fast, since some say it is a mitzva to fast as written siman 580; and see siman 597. Magen Avraham.",
  },
  "output/siman_418/beur-hagra/part-001.txt": {
    "1:_": "Seif 1: Rosh Chodesh is forbidden. Taanit 15b, 17b, Rosh Hashanah 19a, and Yerushalmi chapter 2 of Taanit.",
    "3:_":
      "Seif 3: if he accepted, etc. and if. From what we say in chapter 9 of Nedarim we open for a person on Shabbatot and Yamim Tovim — thus even Shabbat and Yom Tov need release; and as we concluded there that vows apply to a matter of mitzva. And Ramban explains that here it deals with one who accepted with language of acceptance that is not a vow, as written there 12b; and if it is a vow, etc.; and even per the second wording he said it shall not be, etc., for forty days that it is not a vow — and see beginning of siman 570.",
    "4:א":
      "Seif 4: if he swore. For a general prohibition applies even to a d'oraisa prohibition, as Rif and Raosh wrote at the end of Pesachim in the name of Yerushalmi on an oath that is not, etc.; and Tosafot in chapter 3 of Shevuot 24a s.v. except, etc.",
    "4:ב":
      "Seif 4: it appears to me it applies. Nazir 4a and as Tosafot wrote there, and similarly one who is sworn, etc.; and Tosafot at the beginning of chapter 3 of Shevuot and in chapter 8 of Pesachim 106a, and Gemara Yoma 74a.",
    "4:ג":
      "Seif 4: since it is only. That it is from the days written in Megillat Taanit, and Tosafot in Taanit 12a s.v. and if, etc.; and Tosafot in Berakhot 49b s.v. if.",
    "4:ד":
      "Seif 4: except from the words. As explained above 17b, Rosh Hashanah 19a — Rosh Chodesh is d'oraisa, etc., as taught, etc.; and what he wrote Rosh Chodesh is d'oraisa means that they have support from the Torah.",
    "5:_": "Seif 5: one who fasts on Rosh Chodesh, etc. Rosh Hashanah 18b: go out and fast.",
  },
  "output/siman_418/biur-halacha/part-001.txt": {
    "1:_":
      "Rosh Chodesh is forbidden, etc. — see Magen Avraham who is uncertain whether hour-fasts are permitted on it, and from his words it appears this depends on whether Rosh Chodesh is forbidden for fasting d'oraisa or d'rabbanan; and it appears l'chatchila it is forbidden in any case, for they explicitly said in the Talmud Taanit 15: R' Meir said: even though R' Gamliel said one does not interrupt, he conceded that one does not complete — thus even on a fast they began many days before, it is likewise forbidden to fast except for hours; and this proves that without this it is forbidden to fast even for hours. And the proof that one does not decree a fast, etc., applies in any case; and even though R' Yossi disagrees with R' Gamliel and holds one completes in any case on this — he does not disagree that l'chatchila even without completing it is forbidden [and it is possible this case is different because most of the day is fasting, unlike a few hours — strained]. And what is said in Eruvin there that Yom Tov is different because their words are since they fast on it for hours — that case is different because Tish'a BeAv falls on it and therefore they fast hours, not that one may accept hour-fasts on Rosh Chodesh; and Peri Megadim also questions Magen Avraham's words and requires further study. For practical law, afterward I found in Gaon Yaakov on Eruvin that he also concludes for halacha that whatever is forbidden to fast on, hours are also forbidden, as we wrote.",
    "2:א":
      "And they began them before Rosh Chodesh — but when Yom Tov occurred among them they certainly interrupt and do not fast that day; and it appears even another day need not be completed, for even a communal decree has no power to push off Yom Tov which is d'oraisa; and it must be that their law is like an individual who accepted to fast on Monday and Thursday and Rosh Chodesh occurred among those days, regarding whom Beit Yosef agreed they interrupt and need not complete another day.",
    "2:ב":
      "Even one day — and it is reasonable that the same applies if they had not yet finished the fast but only fasted most of the day and then remembered that on the second fast Rosh Chodesh will fall — what they did they did, and they must finish the fast and fast afterward per their decree, for most of the day is like the whole day; however if they had not yet fasted except a few hours and remembered, it is possible their decree is void and they must interrupt immediately from fasting; and so is implied in Ritva at the end of chapter 2 there.",
  },
  "output/siman_418/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] Forbidden for fasting, etc. At the end of siman 288 that even if he ate other things he has fulfilled and need not eat bread; and regarding a dream see siman 529. Magen Avraham wrote: one who fasts on Rosh Chodesh Nisan or Rosh Chodesh Av need not sit fast-for-fast since some say it is a mitzva to fast as written siman 580 — end of his words. Men of action fast on erev Rosh Chodesh, and this is in a place where the moon of Rosh Chodesh is small; and it is implied in the remnants of Shulchan Aruch HaGadol that one should practice to complete, and for the reason mentioned above to learn merit for those who practice saying Lamnatzeach on erev Rosh Chodesh after Yom Kippur Katan, since as long as they are still fasting it is called a day of distress as he wrote in siman 581 seif 3 on erev Rosh Hashanah; and when Rosh Chodesh falls on Shabbat they fast on Thursday in a place where they say selichot; however those who do not go to selichot may be lenient to fast on Friday; and if erev Rosh Chodesh falls on Friday, everywhere they advance to Thursday — and see siman 566. Regarding yahrzeit, Malbushei Yom Tov wrote one does not fast even on Rosh Chodesh Nisan, and it is not similar to weddings siman 573, for there it is because of mistaken kiddushin; also lightened is yahrzeit fasting, for the joyful do not fast; and if because of danger it is strict — there is no such danger, for this danger is from Heaven and for the honor of Heaven she does not fast — and see siman 429.",
    "2:_": "[2] And if he swore, etc. See siman 570 from this.",
  },
  "output/siman_418/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Rosh Chodesh is forbidden for fasting — and even if he ate fruits he has fulfilled and need not eat bread. Magen Avraham s.k. 1, Eliyah Rabbah s.k. 1; and see above siman 288 s.k. 32 and below in siman 419.",
    "2:_":
      "(2) There: Rosh Chodesh is forbidden for fasting — the people of the community of Wirmish fast on a decree that was on Rosh Chodesh Sivan (year 556 of the fifth millennium) and they practiced to read in the morning on Rosh Chodesh and in the evening Vayechal and expounded. Rokeach siman 210. Beit Yosef siman 579. And Maharash wrote in a responsum that we do not learn from them in general — Magen Avraham this siman s.k. 1. And see below s.k. 7.",
    "3:_":
      "(3) There: Rosh Chodesh is forbidden for fasting — in the end of chapter 3 of Eruvin it is implied that one may fast on it hour-fasts; but for Rambam it is forbidden since it is d'oraisa — Magen Avraham there. Meaning for Rambam that the prohibition of fasting on Rosh Chodesh is d'oraisa as written in seif 4, it is forbidden to fast on it even hour-fasts; however see Eshel Avraham s.k. 1 who wrote on the words of Magen Avraham mentioned that he did not find this distinction explicit — see there. And similarly Gaon Yaakov concludes on Eruvin there for halacha that whatever is forbidden to fast on, hours are also forbidden — see there. And Acharonim brought it. And this is if he accepted them for the purpose of fasting it is forbidden; but if he delayed from eating we have no concern.",
    "4:_":
      "(4) [Seif 2] One does not decree a fast, etc. — and if they decreed, their decree is not a decree and they are not permitted to begin. Beit Yosef see there s.k. 2, Peri Chadash. And so Acharonim.",
    "5:_":
      "(5) And if they began, etc. — such as when the court decreed three fasts and they did not consider that one of them has a day forbidden for fasting, and they fasted one day — they do not interrupt. Peri Chadash. And for this Acharonim agreed even though there are other explanations.",
  },
  "output/siman_418/machatzit-hashekel/part-001.txt": {
    "1:א":
      "(s.k. 1) Forbidden, etc. on Rosh Chodesh Sivan — meaning one does not complete; and nevertheless Maharash wrote we do not learn from them; and on this Magen Avraham wrote that in Eruvin it is implied one may fast on Rosh Chodesh if he does not complete. For there the question was one who fasts on erev Shabbat whether he completes since Shabbat entered through completion while he is in distress — it is as if he fasts part of the beginning of Shabbat and he wants to be negligent from what Raavad said: I was among the sons of Sanav ben Binyamin to whom wood-offering was a Yom Tov on the tenth of Av; chapter 1, Tish'a BeAv fell on Shabbat and was pushed to Sunday and we fasted on it and did not complete because our Yom Tov was then — and he inferred: thus every year they would fast on Tish'a BeAv and complete; thus on Yom Tov one completes, and the same on erev Shabbat.",
    "1:ב":
      "And pushed off is different regarding Yom Tov, for their words are like the sons of Sanav mentioned, since they fast on it hours — meaning when he does not complete as Raavad said; therefore on d'rabbanan Yom Tov one completes even though distress entered in it and it is as if he fasts the beginning of d'rabbanan Yom Tov — it is nothing, for they fast on it hours; unlike Shabbat where it is forbidden to fast on it for the purpose of fasting even one hour. There is nothing to be negligent from completing on erev Shabbat — thus it is proved that on d'rabbanan Yom Tov one may fast on it if he does not complete; and Rosh Chodesh Beit Yosef wrote in seif 4 that it is only d'rabbanan, and therefore one may fast on it if he does not complete.",
    "1:ג":
      "That even if he ate fruits, etc. — for from this: if he forgot Yaaleh Veyavo in the afternoon prayer, even on Shabbat if he forgot Retzeh, and on Yom Tov Yaaleh Veyavo — he must return to bless in the Amidah; Shabbat and Yom Tov are different for they require eating bread, unlike Rosh Chodesh — although one may not fast on it, he is not obligated in bread and eating fruits suffices, for he is not obligated to bless on them in the Amidah.",
    "2:_":
      "(s.k. 2) One who fasts on Rosh Chodesh, etc. — so it should read, and it refers to seif 5. And see siman 597 that he wrote: if one fasted a dream-fast on Rosh Hashanah he need not sit fast-for-fast since some say it is a mitzva to fast on Rosh Hashanah — the same here.",
  },
  "output/siman_418/magen-avraham/part-001.txt": {
    "1:_":
      "Forbidden for fasting. Beit Yosef wrote siman 579: the people of the community of Vermaisa fast on the decree on Rosh Chodesh Sivan; and Maharash wrote in a responsum that we do not learn from them in general; however in the end of chapter 3 of Eruvin he wrote that one may fast on it hour-fasts; but for Rambam it is forbidden since it is d'oraisa. And in siman 288 it states that even if he ate fruits he has fulfilled and need not eat bread.",
    "3:_":
      "An individual who accepted, etc. It appears to me one who fasts a dream-fast on Rosh Chodesh Nisan or Rosh Chodesh Av need not sit fast-for-fast, since some say it is a mitzva to fast as written siman 580 and siman 597.",
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
