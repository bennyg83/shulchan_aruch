#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_151/eliyah-rabbah/part-001.txt": {
    "8:_":
      "[8] And if the road passed through, etc. — nevertheless it is not fitting to do so, for Rabbi Eliezer said: I did not make a shortcut (kapandria); and it implies that it speaks of cases where it is permitted — for if not, what is the praise; Kesef Mishneh; and so wrote Piskei Tosafot in chapter Bnei HaIr.",
    "9:_":
      "[9] Permitted, etc. — Levush wrote: some say it is a mitzvah, etc.; so Beit Yosef wrote in the name of Rosh and Tur; but Shulchan Aruch is unstated and wrote \"permitted,\" meaning because Beit Yosef wrote that Ri'f and Rambam do not have the text \"mitzvah\" but only \"permitted,\" and Shulchan Aruch follows Ri'f and Rambam, as is known. And it appears to be the reason of Levush: that we follow Rosh; and so ruled Magen Avraham; and so it appears to me as the main [view], for so ruled Ran in chapter Bnei HaIr; and so I found in Baal Halachot Gedolot, daf 12 — and it is known that his words are words of kabbalah. And I am further puzzled on Beit Yosef: behold Ri'f at the end of Berachot, and likewise Ran there, makes clear that such is the intent of Ri'f. Also what Nechalet Tzvi wrote as proof for Rambam from what Rabbi Eliezer said: from my days I did not make kapandria — he did not examine Kesef Mishneh there: Rabbi Eliezer speaks when the road passes through, or of not making kapandria; but regarding one who enters to pray, that the Gemara brings a verse — it does not speak, even for Rambam — see there; and so it appears in Piskei Tosafot; and so is the view of Maadanei Melech at the end of Berachot: that the language of Scripture is the language of command; therefore it appears to me that we hold thus.",
  },
  "output/siman_151/eshel-avraham/part-001.txt": {
    "12:_": "From using — and with the assistance that is around it, it is permitted; see responsa Mahari Ashkenaz, siman 104.",
    "3:_": "In a beit haknesset — see Taz; Rashba, siman 192.",
    "6:_":
      "With an uncovered head — as written in Eliyah Rabbah, and these are his words: so too Beit Yosef wrote on Orach Chayim that Rama protests going with a long knife, etc.; and Ri'f emended him: one need not be concerned except for bare head — until here. And this is puzzling, for nothing is mentioned in Orach Chayim about bare head; only: \"all in it\" — except uncovered — until here; and so in Tashbetz. And it is plain that it refers to a knife specifically when it is exposed; but when it is covered, it is permitted; and it does not deal at all with bare head. And this is a question on Shulchan Aruch, Levush, and acharonim who did not notice.",
  },
  "output/siman_151/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Synagogues and batei midrash — one does not behave in them with lightheadedness, etc., because they are called a small mikdash, and it is written: \"My mikdash you shall fear\" [Levush]. And see Megillah 29a; and through this synagogues are turned into a house of profanity, God forbid [Semak 41, s.k. 1].",
    "10:א":
      "(10) There — one does not eat and drink in them, etc.; and the same applies in the ezra, since they pray in it at times; but the orchard that is around the synagogue has no holiness at all [Mahari Ashkenaz, responsa siman 104; Mechaber, or 1 and 2]; and see below siman 152, oth 5; and above, oth 2.",
    "10:ב":
      "(10) There — one does not eat and drink in them, etc.; and likewise it is forbidden to smoke tobacco pipes in them, for this too is included in lightheadedness, as Peri Chadash wrote in Sefer Chaim siman 45, oth 5 — see there; and Yafeh Lalev brought it, oth 5; and see below, oth 13; and likewise one does not do melacha in them [Rashi Megillah 28a, s.v. mafshilin chavalim; Mishnah Berurah, oth 3]. And likewise it is forbidden to learn in them writing and reading of other languages; but writing of Israel, which is in holy Ashurit script that they read — Rashi [says] permitted; and all the more so writing Ashurit is permitted [Ben Ish Chai, Vayikra, oth 4].",
    "11:_":
      "(11) There — one does not enter them in heat, etc.; one who flees from fear of an enemy who pursues him in the heat of his power with his sword drawn in his hand — it is permitted for him to hide inside a synagogue, for nothing stands before pikuach nefesh. And nevertheless he can fix it by reading a little in the beit haknesset when his mind settles, as stated in this seif; and if he needs to enter them for his need, etc., he enters and reads a little, etc., and through this he is saved from doubt of prohibition [Petach HaDvir, oth 3].",
  },
  "output/siman_151/machatzit-hashekel/part-001.txt": {
    "11:_":
      "(s.k. 11) For some, etc. — even in chutz laaretz; for they expounded in Megillah on what is written: \"And I will lay your sanctuaries desolate\" — even when they are desolate, nevertheless they are in their holiness; and this is the view of Rav Hai Gaon: that even in chutz laaretz the law is thus.",
    "12:א":
      "(s.k. 12) They stipulated, etc. — specifically in Babylonia, for we say in Megillah daf 28: Rabbi Elazar said: a synagogue in Babylonia — they are made conditional; it implies that by default they are conditional.",
    "12:ב":
      "In the name of Rabbi Yosef ibn Rav, whom Magen Avraham brought in s.k. 11: that even in chutz laaretz, even in their ruin, they are in their holiness; and behold they are conditional; if so, they do not have in any case so much holiness as in their settlement; rather, perforce in chutz laaretz it requires that they stipulate explicitly; and Mahari bar Rav speaks of the default case.",
    "12:ג": "And it is puzzling, etc. — and see above, seif 1, s.k. 2.",
    "12:ד":
      "In the name of Hagahot, etc. — meaning: per the explanation of Magen Avraham on the words of Hagahot: for what reason did he permit even in their settlement to eat and drink — only because he holds that even in their settlement they are made conditional; and if he holds that in chutz laaretz it requires explicit stipulation — how did Hagahot permit in the default case; and from where do we know that they stipulated explicitly at the time of building the synagogue; or he holds that it does not require explicit stipulation.",
    "12:ה":
      "Nevertheless it is not necessary to say thus; rather, Hagahot refers to the words of the Gemara that speak of a synagogue in Babylonia; and automatically there is a practical difference for us whether we know that they stipulated explicitly.",
    "3:_":
      "(s.k. 3) For some, etc. — when a relative of the gadol died, etc. — meaning: so that you not err that the intent of Shulchan Aruch is that the gadol died, God forbid; rather, even when a relative of the gadol died — and so it is stated explicitly in Megillah daf 28b in the language of Rafram.",
    "4:_":
      "(s.k. 4) And the language \"to sleep,\" etc. — as is explained in Tamid, chapter 1: we learned: Beit HaMoked was built half in the Temple and half in chol; and we learned: in the half of chol it was surrounded with rows of stone, and the elders of the father's house who guarded in the Temple would sleep on those rows; and the Gemara challenged: and let them bring beds (meaning: why would they sleep on the stones); and Abaye answered: it is not customary to bring beds into the Temple. And Magen Avraham holds that the holiness of a beit haknesset is superior to the holiness of Beit HaMoked; at least it is not less than Beit HaMoked — for behold the half of Beit HaMoked that was built in chol did not have except the holiness of the Temple Mount; and the holiness of a beit haknesset — Mordechai and Mahariq wrote: one may say it is a kind of holiness of the Heichal; and for this reason they forbade uses upon a beit haknesset, as will be explained at the end of this seif.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
