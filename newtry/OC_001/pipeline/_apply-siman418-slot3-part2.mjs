#!/usr/bin/env node
/** worker slot 3 — siman 418 part 2 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_418/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Forbidden, etc. — and the people of the community of Wirmish fast on Rosh Chodesh Sivan for the decrees that were at that time in the year 556 of the fifth millennium, and they say selichot and tachanunim; and Maharash wrote in a responsum siman 79 that we do not learn from them in general, even regarding tachanunim. And regarding hour-fasts whether permitted — see Biur Halacha.",
    "1:ב":
      "(2) For fasting — and it is explained above in siman 288 that even if he ate fruits he has fulfilled and need not specifically bread.",
    "2:א":
      "(3) One does not decree, etc. — and if they transgressed and decreed, their decree is not a decree and they need not fast (Beit Yosef, and so Acharonim agreed).",
    "2:ב":
      "(4) And if they began — such as when they decreed for lack of rain and the like to fast Monday-Thursday and Monday-Thursday, and they did not consider that on one of them Rosh Chodesh will fall; and they began to fast — their decree applies b'dieved since they did not intend to uproot and cancel the law of Rosh Chodesh.",
    "2:ג":
      "(5) And they complete — like other fasts. And the same on Chanukah and Purim they fast and complete since they already began to fast; and chol hamoed too is like Chanukah and Purim and Rosh Chodesh, as explained below siman 572. And know that in siman 572 Acharonim explain that all this was by law in Eretz Yisrael; but nowadays the congregation's law is like an individual and they interrupt on Rosh Chodesh and complete another day.",
    "3:א":
      "(6) Or, etc. on Rosh Chodesh — this and all the more so this teaches: with explicit acceptance on Rosh Chodesh, even a communal decree does not help, as we wrote; or it is possible it is mentioned because of the end that even in this if he expressed vow language it applies.",
    "3:ב":
      "(7) Does not need release — for specifically regarding the congregation, whose decree is strong, they were stringent when he accepted such-and-such days and Rosh Chodesh occurred among them — as above. Poskim wrote he need not fulfill that fast which did not apply at all; and it appears specifically when he accepted Monday-Thursday fasts for the whole year or for several months and Rosh Chodesh occurred among them — there it is fitting to say his acceptance has no force at all on this day which is forbidden for fasting, and automatically he need not fulfill another day for it; but when he accepted simply such-and-such days to fast and Shabbatot and Yamim Tovim and Rosh Chodesh occurred among them, he must skip them and complete them afterward, for he did not specify Rosh Chodesh in his statement at all.",
    "3:ג":
      "(8) Needs release by a sage — for vows apply even to a matter of mitzva; however it is proved in Yoreh De'ah siman 215 seif 1 that he is obligated to ask about his vow so that he not fast; and it is explained there further that they open for him and say to him: if those matters that were on your heart would occur within this time — these days — you would not have vowed; and they release him.",
    "4:א":
      "(9) From the reason of a general prohibition — for since his oath applies on permitted days, his oath also applies on days forbidden for fasting, for he included them in one expression.",
    "4:ב":
      "(10) It appears to me the oath applies to him — meaning that also in this the oath applies to him since it is only, etc.",
    "4:ג":
      "(11) Only d'rabbanan — and therefore the oath applies to him until he releases, as explained in Yoreh De'ah siman 239 seif 6; and therefore in our matter too he is obligated to release — as above.",
    "4:ד":
      "(12) That it is d'oraisa — meaning from what is written \"and in your appointed times and in your Rosh Chodesh\" Rosh Chodesh is equated to moed; therefore the oath does not apply to him according to him except in a general case — as above. But Shach in Yoreh De'ah siman 215 s.k. 11 wrote that even if you say Rosh Chodesh is d'oraisa it is forbidden to fast — nevertheless the oath applies to him since it is not explicit in the Torah like Shabbat and Yom Tov; and so Peri Chadash agreed.",
    "5:א":
      "(13) Dream-fast — for one may fast for it even on Shabbat and Yom Tov, as above in siman 288; and the same if he fasted because of a vow.",
    "5:ב":
      "(14) Fast-for-a-fast — in order to atone for him for nullifying the joy of Rosh Chodesh, as above in siman 288 regarding Shabbat. And Magen Avraham wrote that if one fasts a dream-fast on Rosh Chodesh Nisan or Rosh Chodesh Av he need not sit fast-for-fast, for some say it is a mitzva to fast on them, as explained below in siman 580.",
  },
  "output/siman_418/turei-zahav/part-001.txt": {
    "2:_":
      "One does not decree, etc. Beit Yosef infers from this that when they decree explicitly on Rosh Chodesh the decree does not apply; and in Yoreh De'ah siman 215 I wrote there is no proof at all, for he only said here regarding the prohibition they make in their decree on Rosh Chodesh; and if they already accepted explicitly on Rosh Chodesh, certainly the reasoning gives that it applies more than if they decreed generally — so is the reasoning of Sefer HaMitzvot there.",
    "3:_":
      "And see Yoreh De'ah siman 215. In my Beurim I wrote there the conclusion that we have no distinction except between vow language and language of accepting a fast — for with vow language it applies in all forms and needs release, and with language of accepting a fast it does not apply at all and does not need release — and this is Ramban's view.",
    "4:_":
      "Except from the words of Rambam it appears, etc. — meaning from what is written \"and in your appointed times and in your Rosh Chodesh\" Rosh Chodesh is equated to moed; and Beit Yosef wrote this is the way of asmakhta; and Tur wrote: we learn in Yerushalmi: in all they fast except Shabbatot and Yamim Tovim and Rosh Chodesh and chol hamoed — end of his words. And in Yerushalmi it writes after chol hamoed also Chanukah and Purim; and Beit Yosef wondered why our Rabbi skipped Chanukah and Purim. And further why he brought Yerushalmi after he first wrote from the Mishnah that it is forbidden to fast on Rosh Chodesh. And it appears to me to resolve properly: our Rabbi Tur brings Yerushalmi to decide that fasting on Rosh Chodesh has prohibition like Shabbat which is from the Torah, per Rambam's view, who learned thus from Yerushalmi that arranged Rosh Chodesh between Shabbat and Yom Tov which are from the Torah; and if Rosh Chodesh were only d'rabbanan it should have counted it at the end — not \"this and also this\" but certainly the tanna of Yerushalmi teaches they are equal to d'oraisa; and therefore Tur did not need to bring Chanukah and Purim which are not needed for the essence of the law since they are written in their place; and here he only intended to equate chol hamoed and this suffices — as above, very correct. Again I saw thus in Rokeach: Rosh Chodesh is called moed, as we say in Yerushalmi: in all they fast except Shabbat and Yom Tov and Rosh Chodesh and chol hamoed — end of his words; behold as I said.",
    "5:_":
      "One who fasts on Rosh Chodesh, etc. — meaning because of a vow or dream-fast — so in Hagahot Maimoniyot in Beit Yosef.",
  },
  "output/siman_418/peri-megadim/part-001.txt": {
    "1:_":
      "There is no — Taz Yoreh De'ah 215 seif 3, Taz letter 3 elaborated on this see there; and with vow language even Shabbat and Yom Tov the vow applies; and with oath language on Shabbat and Yom Tov it does not apply; and Rosh Chodesh there is a dispute as the Mechaber wrote here seif 4 and in siman 570 seif 3; and see Magen Avraham there 5 and letter 2.",
    "2:_": "And see Yoreh De'ah — Taz there letter 3 see there.",
    "3:_":
      "However — Taz, and so Perishah; and one need not mention Chanukah and Purim, for this is proved from that he arranged Rosh Chodesh among these, and it is implied chol hamoed too is d'oraisa; and in 572 the Mechaber holds chol hamoed is d'rabbanan like Rambam z\"l — Magen Avraham in 572 and 570 letter 9 see there. And behold one who swore he will eat on the four fasts requires further study per Yoreh De'ah 239 — Shach wrote one who swears on d'rabbanan matters to transgress shevut, not to kindle Chanukah lights — applies; but in a positive command it does not apply — and see siman 549 and 556; we require four fasts, and if not there it is explained. A general oath applies in shevut shevut, not in a positive command — see Yoreh De'ah.",
    "4:_":
      "One who fasts — Taz; and Magen Avraham 2: on Rosh Chodesh Nisan and Av he need not fast-for-fast.",
  },
  "output/siman_418/yad-ephraim/part-001.txt": {
    "1:_":
      "In Shulchan Aruch seif 3 — note 2 next to \"an individual who accepted upon himself\" — it should be noted in seif 5 next to \"one who fasts on Rosh Chodesh.\"",
    "2:_":
      "In Magen Avraham s.k. 2 — \"an individual who accepted,\" etc. It is an error; and one should note \"one who fasts on Rosh Chodesh,\" etc. — so it should read.",
    "3:_":
      "In Taz s.k. 3 — \"and Yom Tov and chol hamoed and Rosh Chodesh\" — end of his words, so it should read.",
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
