#!/usr/bin/env node
/** worker slot 3 — siman 427 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

const fixes = {
  "output/siman_427/mechaber/part-001.txt": {
    "1:main":
      "How documents are dated when Rosh Chodesh is two days. Contains 1 seif. When Rosh Chodesh is two days, they write in documents on the first day \"on Rosh Chodesh,\" which is the thirtieth day of the previous month (and they count the month from the second day, and on it they write on the first of the month) (Tur). {Rama: When they intercalate the year they write in the first Adar simply \"Adar,\" and in the second \"Adar the Second.\"} (Tur)",
  },
  "output/siman_427/baer-heitev/part-001.txt": {
    "1:_":
      "Plainly. The same applies when they bless the month in the synagogue [Magen Tzvi]. And Shach in Yoreh Deah siman 220 s.k. 17 wrote in the name of Maharil: in the first [Adar they write] Adar Rishon, and in the second Adar Sheni; and similarly in Even HaEzer siman 127 seif 4 regarding a get. And similarly Taz in the name of Bach: it is proper to explain in both — in the first Adar one says Rishon, and in the second one says Sheni — see there.",
  },
  "output/siman_427/beer-hagolah/part-001.txt": {
    "1:_": "Tur; and similarly he wrote in Avodat HaGan siman 127 in the name of Rabbeinu Peretz.",
  },
  "output/siman_427/beur-hagra/part-001.txt": {
    "1:א":
      "Seif 1 — when Rosh Chodesh. Nedarim 62, and see there in Tosafot and Ran, and see Hagahot Alfasi in the chapter Hayu Bodkin; and proof that they write on Rosh Chodesh from what is taught \"I am on the 29th of Nisan\" and he did not say \"on the thirtieth day.\" Maharam Padua in Seder HaGet siman 49.",
    "1:ב":
      "And the counting — since it calls it \"lacking a name\" in the gemara, and as he wrote that one knows in its intercalation, etc.; and see the aforementioned Hagahot Alfasi that for mo'adim, etc. — meaning in the time of sight, which is now impossible.",
    "1:ג": "When they intercalate — there 63a, and Rabbi Yosi.",
  },
  "output/siman_427/biur-halacha/part-001.txt": {
    "1:_":
      "When Rosh Chodesh, etc. — and see the order of fixation in Tur; behold in Tur he arranged fixation that all thirteen cycles have equal fixation, and this is what Levush called the circle of Rav Nachshon Gaon. But Levush wrote on this: many intercalators think the thirteen cycles are equal, but when you examine carefully you will find it is not so — end; and similarly Hagahat Baal HaItur copied from Yesod Olam maamar 4 chapter 10 at its end: that which they suppose that all thirteen cycles are equal is only in most years but not in all of them; therefore one may not rely on this circle of thirteen cycles — end, at length there. And similarly Pri Chadash challenged Tur and explained the years how they come out per the calculation, as is written in Sefer Teḥunat Yissachar; and he warned very greatly not to heed the order of fixation of Tur on known years — see there. And similarly I found more in other books; but for our matter there is no practical difference from this, for regarding years that have already passed, what was was; and also in truth it has already been corrected in some places in the calendar of Tur itself as Pri Chadash emended. And for the years 5662, 5663, 5667, 5668 I wrote below how fixation is in truth — see there; and the rest of the years for almost Rav until year 5687 are written in the Tur calendar properly as appears from Pri Chadash that he did not emend them [unless some further printing error is found, as I saw in Pri Chadash written there on year 5653 sign bet-ḥet-gimmel and it is an error and should be zayin-ḥet-gimmel; and similarly on year 5743 written in the Lemberg printing shin-zayin and it is an error and should be zayin-shin, as in Tur, and it is 5733 — afterward I found thus in an old printing]. And we need not worry so much more, for certainly at that time and also long before will be the redemption and we will sanctify by sight.",
  },
  "output/siman_427/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] \"Rather my intention is to say,\" etc. Levush Yom Tov wrote: all this came out for him from Rambam chapter 7 of Hilchot Kiddush HaChodesh, and they did not heed Raavad's attainment — that if it is in the middle, why was it not deferred to the true one; and did the six [extra hours] sin that the true one should not be among them, and this is \"among them\" that the true one should be among them — until here; and his words are correct. And the author of Yesod Olam further added in maamar 8 to complete Raavad's words, saying: behold the true one is with the middle on day 1 and hour 1, and many times the true one precedes the middle; and even so, when deferrals come at that time they defer; and all this is true and clear. But Levush saw and proved to his colleague that both together — that the essence of the deferrals was because of the inversion of the moladot of the two years together; for the reasons in Shas are light ones, but they combined and established these days because of those reasons; but it is still difficult what Yesod Olam wrote that sometimes it precedes or is equal; and it appears to me that the Sages needed to make a corrected and equal calculation for all years, for behold this is included in \"even if you err intentionally.\"",
  },
  "output/siman_427/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] When Rosh Chodesh is two days, etc. — and the reason is that they make the months one full of thirty days and one lacking of twenty-nine days: because from the molad of the moon of this month until the molad of the next month there are twenty-nine days, twelve hours, seven hundred ninety-three parts of an hour (and the hour is one thousand eighty parts); and since we count months only by days, as it is written \"until a month of days,\" therefore they make one month lacking twenty-nine days and one month full thirty days so that they be equal and the molad be on Rosh Chodesh; and what remains — seven hundred ninety-three parts from each month afterward — gather until there is one day and that year is complete, meaning they make seven months full; and because day thirty is partly of the coming month and most times the moon was born in it, therefore they make it Rosh Chodesh; and they make Rosh Chodesh two days — day thirty to complete the past month, and day thirty-one the beginning of the coming month — as is explained at length in Tur and Levush and in Rambam Hilchot Kiddush HaChodesh chapter 8 — see there. And also in the time when they would sanctify by sight, sometimes they would make two days, as Jonathan: \"and it was on the morrow of the new moon, the second day.\" Pri Chadash at the end of this siman. And know that the moon is concealed twenty-four hours in Eretz Yisrael — eighteen hours before the molad and six hours after the molad; and for the people of Bavel six before the molad and eighteen after the molad — Rosh Hashanah 20b; and see in Rashi there.",
  },
  "output/siman_427/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) Adar, etc. — and Shach, etc.; since in tractate Nedarim there is a dispute of tannaim: R. Meir holds plainly Adar is Adar Sheni, and R. Yehuda holds plainly Adar is Rishon; and there is dispute among the poskim whom we follow; therefore one should explain in both — whether in Adar Rishon or in the second — to satisfy all opinions.",
  },
  "output/siman_427/magen-avraham/part-001.txt": {
    "1:_":
      "Adar plainly. The same applies when they bless the month in the synagogue [Magen Tzvi]. And Shach in Yoreh Deah siman 220 s.k. 17 wrote in the name of Maharil: in the first Adar Rishon, and in the second Adar Sheni; and similarly in Even HaEzer regarding a get — see there.",
  },
  "output/siman_427/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) That it is day thirty, etc. — meaning that thus they write; and know Bach's view that they write the opposite: on day thirty of such-and-such month, which is Rosh Chodesh of such-and-such month; and similarly it appears from Peri Megadim.",
    "1:ב":
      "(2) For the month from the second day — meaning that from it they begin to count the days of the coming month, for it is the essence of the fixation; and day thirty is only completion of the month that passed.",
    "1:ג":
      "(3) Adar plainly — and the same when they bless the month in the synagogue; and the conclusion of the later authorities is that the proper way to explain in both is: in Adar Rishon one writes Adar Rishon, and in the second Adar Sheni.",
  },
  "output/siman_427/peri-megadim/part-001.txt": {
    "1:_":
      "Adar plainly — Taz and Magen Avraham in Shach Yoreh Deah — see there; and it is possible there is no strictness if they write Adar Rishon or Beit HaKnesset HaRishon; and similarly in gittin Even HaEzer siman 126 seifim 6 and 7; and in Choshen Mishpat sign 21 from this; and they also write in documents on day thirty of Nisan that is Rosh Chodesh Iyyar per Av Beit Din from this. And it appears that when one writes in second Adar on the first of the month, even though l'chatchila one should explain on day thirty of Adar Rishon that is Rosh Chodesh Adar Sheni as Bach wrote, nevertheless b'dieved in a get there is no concern at all, for there is nothing to err in such a case; and in my Seder Get I wrote some of this.",
  },
  "output/siman_427/turei-zahav/part-001.txt": {
    "1:_":
      "Adar plainly — for thus holds R. Yehuda, and not like R. Meir who holds plainly Adar is Adar Sheni; and Maharach z\"l wrote; but from Rambam's words in chapter 10 of Nedarim it appears he ruled like R. Meir; therefore it is proper to explain in both: in Adar Rishon one says Rishon, and in the second one says Sheni.",
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
