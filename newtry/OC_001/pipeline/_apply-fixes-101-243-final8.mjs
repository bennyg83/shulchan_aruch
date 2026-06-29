#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const FIXES = {
  124: {
    "chokhmat-shlomo/part-001.txt": {
      "4:_":
        "Seif 4. When the shatz repeats the prayer, the congregation should be silent and concentrate on the blessings the shatz recites and answer amen. NB: We learn in the end of chapter 16 of Shabbos daf 119: R. Elazar said: whoever answers amen with all his might — they open for him the gates of Gan Eden, as it says \"Open the gates and let the righteous nation enter, keeper of faithfulness\" — do not read \"shomer emunim\" but \"she'omrim amen.\" What is amen? R. Chanina said: El melekh ne'eman. In Yalkut Yeshaya siman 26 on the verse \"Open the gates\" he brought this statement and brought the version of one who said: what is amen — Atah melekh ne'eman, end of his words. To understand what they dispute: it appears they dispute what I saw in one book, as I recall Peri Megadim, who was uncertain whether one should answer amen after one praying in a whisper from whom he hears the blessing — for during Shemoneh Esreh it is as if the Holy One blessed be He stands before the person as explained in the poskim; therefore the one who holds amen is El melekh ne'eman holds one does not answer amen except on blessings aloud, not on blessings in a whisper; and if so aloud, then it is not considered as if the Holy One stands before him, therefore he says in hidden language El melekh ne'eman; but the other holds that even on blessings in a whisper one answers amen, and then the Holy One is before him, therefore it is fit to say in direct language Atah melekh ne'eman. Or one may say the difference is if one hears one blessing outside the bathhouse while he stands in the bathhouse — then if it is permitted to answer amen since it is explicit in Shulchan Aruch siman 87 that mundane matters may be said in the holy tongue, then it would be permitted to answer amen in the bathhouse — then however since amen is roshei teivos of El melekh ne'eman and Tosafos wrote there it must be written thus, then it is a name and forbidden to say in the bathhouse; but if amen is roshei teivos of Atah melekh ne'eman it is permitted to say in the bathhouse. But behold it is explicit in the poskim that one does not answer amen in a place that interrupts excrement or idolatry, all the more if the response is in the place of his body it is forbidden to bless there — therefore it is impossible to say this difference except per force the first difference as I wrote initially, and understand well.",
    },
  },
  148: {
    "machatzit-hashekel/part-001.txt": {
      "1:_":
        "(1) To delay — Rama shortened the words of the Tur. He wrote that the sefer Torah was in another preserved place and not in the synagogue; and before they brought the sefer Torah to read from it, the shatz would uncover the ark where their custom was to place the sefer Torah to read in fine beautiful garments; and after the reading he would again remove those garments from the ark and conceal them until another reading time; and because the congregation must wait in the synagogue until they bring out the sefer Torah to the place where they conceal it and the entire congregation accompanies the sefer Torah as written in siman 141 afterward — therefore if the shatz uncovers the ark first and afterward conceals the sefer Torah, there is trouble for the congregation who must wait until after uncovering the ark and taking out the sefer Torah to the place of concealment; therefore they conceal the sefer Torah first and afterward uncover the ark.",
    },
  },
  160: {
    "mishnah-berurah/part-001.txt": {
      "6:ב":
        "(2) In them — and there are those who are strict regarding yad soledes bo in them, and the Acharonim wrote that when he has no other water he should not be strict about this, for the essential law is per the Shulchan Aruch; and in lukewarm water there is no prohibition at all per all opinions, even if they were hot initially and cooled and became lukewarm, it is also permitted; and therefore even when he has no other water except hot water in which yad soledes bo applies, he should wait a little until it cools partially so that yad soledes bo does not apply in it, and it will be permitted per all opinions.",
    },
  },
  223: {
    "biur-halacha/part-001.txt": {
      "2:א":
        "(1) He has no brothers — he also blesses shehecheyanu — see in Moed Katan that it deals with one who has no wife and sons; if not so he blesses hatov vehametiv as below in this seif; and here per the view of Magen Avraham above in siman 221 letter 1, even if he has wife and sons he also does not bless except shehecheyanu and not hatov vehametiv, for they have no share in this, and lest he not give them this money — he answered that utensils remained in the inheritance and everyone has benefit using them immediately.",
    },
  },
  142: {
    "kaf-hachayyim/part-001.txt": {
      "1:_":
        "(1) [Seif 1] He read and erred even in grammar, etc. — so wrote Rambam in chapter 12 of Hilchot Tefillah; and the commentators wrote it seems to bring proof from what we learn in Yerushalmi: whence translation? as written \"they read in the book,\" etc., \"they read in the book — this is scripture, this is translation, and shum sekhel are the tropes, and they understood is the mesorah\"; and R. Yona: although it was stated translation does not impede, if he erred they return him — all the more for grammar we derive from this verse; and R' Menachem brought proof from what we say in perek Chelek (Sanhedrin 99a): whoever says the whole Torah is from Heaven except one grammatical point — he is included in \"devar the Omnipresent bazah,\" etc., end of his words — brought in Beit Yosef and Ohr Torah letter 1; likewise in Zohar parashat Vayakhel 205b: we learned it is written \"they read in the book of the Torah of God mefurash vesum sekhel vayavinu bamikra\" — we established the secret that these are verses of tropes and mesorah and all the fine points and supernal secrets were all transmitted to Moses at Sinai, end of his words; likewise in Mevo HaShe'arim vol. 2 ch. 7 and in Nefesh David page 9:3 — the sefer Torah without vowels and tropes indicates the kings who died that are the letters and the crowns upon them, corrected through yesod of Abba that in thought everything is clarified, and through reading that a person reads he draws into Zeir Anpin which is Torah shebichtav the tropes and vowels through his reading; therefore you see tropes and vowels have feeling and movement in their reading because they indicate resurrection of the kings who returned to life through the new tropes and vowels that came and also through the vowels that flow into them; but the crowns have no movement at all because they are in the aspect of lights hovering on the bodies, etc., end of his words; also see Etz Chaim shaar 8 perek 6. And now you have shown that vowels and tropes contain supernal secrets; therefore how much must the shatz strive to learn the parasha well to read vowels and tropes properly; and likewise the oleh who reads with the shatz in a whisper must be careful to read properly; see our words above siman 139 note 1 and below note 4.",
    },
  },
  158: {
    "peri-megadim/part-001.txt": {
      "12:_":
        "Also, Taz and Magen Avraham in letter 15 note 10 that there is no distinction, see there. And Taz was not satisfied with this: for indeed that which they practiced per Netiv Chayyim before the second waters is fine to proceed to their performance; but not so for taste 2 after second waters before drying in the immersion kettle and pouring a revi'it in a vessel — one does not bless immediately after the act because of no distinction; and although if one forgot he blesses afterward, nevertheless because of no distinction one should not do so. And that which he wrote after drying from the Tur, etc., one may say the Tur speaks l'chatchila that it is proceeding to their performance and b'dieved afterward it is permitted as Magen Avraham wrote. Taz: no difficulty from siman 168 that appears and is rejected, etc., and so explicitly in the first chapter of Berachos they brought Darkei Moshe here that he distinguishes between mitzvot where one blesses afterward and pleasures where it is forbidden, etc., that one does not bless afterward — they brought Shach in Yoreh De'ah 19:3; if so there is no difficulty from siman 168 except Magen Avraham here and Shach there raised that even in mitzvot one does not bless afterward — doubtful blessings to be lenient. And behold there is a remedy to attend to one's needs and touch his body and wash and bless — siman 164 in Taz, Magen Avraham 5 and 7, and it is a doubt and one blesses also before eating; one may say Rashi there also agrees to this. And that which he wrote with clean hands without touching I did not understand, for there it deals with the morning gift and placing between the fingers it is as without distraction; nevertheless for us by mouth it is forbidden as in siman 163 — if so one blesses afterward before eating. And on Netiv Chayyim — sometimes proceeding is also borne, and it requires study.",
    },
  },
  242: {
    "machatzit-hashekel/part-001.txt": {
      "1:ב":
        "(2) If fish are expensive, etc. — and proof from the mishnah at the end of Kerisos: we learned a woman who has upon her five births and she must bring a sacrifice for each birth — a rich woman: a sheep for olah and a dove or turtledove for chatat; a poor woman: two turtledoves or two young doves, one for olah and one for chatat. And all this when she did not bring her sacrifice although she immersed — end of forty days for a male and end of eighty days for a female and she is permitted to her husband — nevertheless she is called lacking atonement and forbidden to eat kodshim until she brings her sacrifice; the same law for impure kodshim. And if she owes five births she brings one sacrifice and eats kodshim, for the sacrifice with her is for purification for kodshim like the mikveh to purify the impure — for even if he became impure many times with one immersion he is pure; so she is pure for kodshim through one sacrifice; nevertheless the other sacrifices are still upon her as obligation to bring afterward. And we learned there an incident: nests stood in Jerusalem at a gold dinar; Rabbenu Shimon ben Gamliel said: this innkeeper (meaning he swore in the Temple) will not sleep tonight until they are at a silver dinar. He entered the beit midrash and taught: a woman who has upon her five births brings one sacrifice and eats kodshim and the rest are not upon her as obligation — and nests stood that day at a quarter silver dinar. Rashi wrote: although he was lenient on Torah law, \"it is a time to act for the Omnipresent\" — for if they would not find they would cease to bring even one, and they would eat kodshim in bodily impurity; see in Bava Batra 166a in Tosafos s.v. Hag. If so, the same should apply to fish; and although one may distinguish that for buying fish they would not cease to buy even if expensive, for all his sustenance is fixed for him from Rosh Hashana except Shabbat and Yom Tov expenses and what he adds they add for him, etc. — nevertheless Tosafos wrote in Beitzah 15b and likewise in Pesachim 113 that which we say \"borrow on my account and I will repay\" deals only when he has what to repay; but if he has nothing to repay — R. Akiva said make your Shabbat ordinary, etc.; if so one whose time is pressed should refrain from buying fish when they are expensive, end of his words, Tzemach Tzedek. And in Avodat HaKodesh and Tashbetz they brought in the name of Beit Hillel that nevertheless if they are expensive up to a third one must buy, for we rule hiddur mitzvah up to a third and they disagree what of it — nevertheless one should be concerned they will refrain entirely from buying, and it is preferable to reduce one Shabbat honor by one or two items in order to honor many Shabbats. It is written in the book Ayin Shmuel: it appears in the sugya Pesachim 68b: one verse says \"Atzeret for the Omnipresent your God\" and one verse says \"Atzeret shall be for you\" — how so? R. Eliezer says either entirely for the Omnipresent or entirely for you; R. Yehoshua says half for the Omnipresent and half for you. Rava said: on Shabbat all agree it requires \"for you\" (so Magen Avraham — this was the version of Ayin Shmuel) as written \"and you shall call Shabbat a delight\"; and perhaps there is a difficulty for the author of Ayin Shmuel since we rule like R. Yehoshua — if so Rava's intent on Shabbat all hold it also requires \"for you,\" meaning half for the Omnipresent and half for you — if so the main statement of Rava comes to teach according to R. Eliezer who is not the halacha (see Bach); therefore he would explain that on Shabbat R. Yehoshua agrees it is entirely for you.",
    },
  },
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const stillBad = [];
let total = 0;

for (const [siman, files] of Object.entries(FIXES)) {
  const base = path.join(ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);
  for (const [rel, blockFixes] of Object.entries(files)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key].trim() };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    for (const [key, en] of Object.entries(blockFixes)) {
      total++;
      if (isBadMt447(en)) stillBad.push(`siman_${siman} ${rel} ${key}`);
    }
  }
}

console.log(`applied ${total}`);
if (stillBad.length) {
  console.error("STILL bad_mt:", stillBad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0");
