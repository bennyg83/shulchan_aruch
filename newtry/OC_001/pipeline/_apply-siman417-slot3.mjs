#!/usr/bin/env node
/** worker slot 3 — siman 417 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_417/mechaber/part-001.txt": {
    "1:main":
      "Contains 1 seif. Rosh Chodesh is permitted for melacha. And the women who have the custom not to do melacha on it — it is a good custom. {Rama: And if the custom is to do some melachot and not do some of them, we follow the custom. (Beit Yosef)}",
  },
  "output/siman_417/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Rosh Chodesh, etc. — the custom of our ancestors is to bless the month on the Shabbat before Rosh Chodesh, except before Rosh Chodesh Tishrei, and there is a hint to this in \"b'chasah l'yom chagenu.\" And there are places that do not have the custom to bless Rosh Chodesh Av because it is a month of punishment. And the blessing of Rosh Chodesh is not like kiddush hachodesh that was in old times, but rather they inform the world when Rosh Chodesh will fall and they should be careful regarding all the laws of the month. Nevertheless they have the custom to stand at the time of saying \"Rosh Chodesh so-and-so on such-and-such day\" like kiddush hachodesh which was while standing [Magen Avraham]:",
    "1:ב":
      "(2) And the women who practice — but if men practice it, it is not a custom at all:",
    "1:ג":
      "(3) It is a good custom — because they did not remove their earrings for the calf, Rosh Chodesh was given them as a yom tov [Tur and there are other reasons, see Eliyahu Rabbah] and see in Biur Halacha:",
    "1:ד":
      "(4) We follow the custom — for certainly initially they accepted upon themselves to practice thus; and where we know they practiced without specification, they may not be lenient in any melacha, and see Biur Halacha. If Rosh Chodesh was two days, there are opinions among poskim: there are those who wrote that they must refrain from melacha two days, and there are those who wrote that this depends on the local custom [and so Peri Megadim in any case]; nevertheless even per this view they may not be lenient except on the one day of Rosh Chodesh which is the completion of the past month, but not on the second day which is the essence of Rosh Chodesh. There are those who practice fasting on erev Rosh Chodesh [and it is good that one stipulate the first time he fasts that he does not accept it upon himself to do this forever, lest some accident befall him and he cannot fast — it should not be upon him as a vow]. And it is good that one who fasts should conduct himself to complete the fast until nightfall, as Magen Avraham, and places differ on this matter and everything is according to a person's strength, and so is implied in Magen Avraham. However, in a place where they make from it a minyan for Torah reading and read Vayechal and he is counted among them, certainly he must complete, even if it falls on erev Shabbat, and see below siman 566 seif 2 in Mishna Berurah there. And there are those who practice making for mincha the order of Yom Kippur Katan [and the reason for this is according to what is brought in Peri Chadash that Maharam of Cordova, may his memory be blessed, called it a small kippur because on it are atoned the sins of the entire month, similar to the goat of Rosh Chodesh; and as we say in the Musaf \"a time of atonement for all their offspring,\" and as Beit Yosef wrote in siman 423 in the name of Orchot Chaim: for the designation \"their offspring\" refers to the months, meaning the burnt offering of Rosh Chodesh came for the offspring of the days of the month — end Peri Chadash]. And Magen Avraham wrote it is a good custom to say selichot [that is, Yom Kippur Katan] before mincha prayer; and in a place where they say dibrei kevushin they should also say before mincha prayer, and in our time the custom is to say selichot after mincha prayer. If erev Rosh Chodesh falls on Shabbat they advance to fast on Thursday; and if it falls on Friday, those who say selichot fast on Thursday and those who do not say selichot fast on Friday. And regarding completion see above in siman 249 in Mishna Berurah s.k. 21 and s.k. 22. In responsa Minach Emaryah: one who fasts on erev Rosh Chodesh must hurry with the night meal so he does not enter it while he is distressed — that is, not to delay after nightfall; but in any case one who practices thus must complete, and see Magen Avraham who brought other customs regarding this in the name of responsa Minach Emaryah and his supporters; and he concludes that each one according to his custom regarding the fast — one may not change to be lenient until his vow is released. The books wrote that even one who does not fast, nevertheless should appear to do teshuvah on this day and correct what was corrupted throughout the month, since it is the last day of the entire month like erev Rosh Hashanah of the entire year — and then certainly the day of the month will be for him a time of atonement for all his offspring:",
  },
  "output/siman_417/baer-heitev/part-001.txt": {
    "1:א":
      "Rosh Chodesh. On Shabbat before Rosh Chodesh they bless the month except before Rosh Chodesh Tishrei, as written \"b'chasah l'yom chagenu,\" and see siman 424 [484]. And in Beer HaGolah he wrote that there are places that do not have the custom to bless Rosh Chodesh Av. And he wrote in Sefer Yereim that this is not kiddush beit din but rather they inform the world when Rosh Chodesh is — end of his words — and nevertheless they have the custom to stand at the time of saying Rosh Chodesh on such-and-such day like kiddush hachodesh which was while standing. And in Minhagim he wrote that when they bless the month one should not interrupt soon so there shall not be only twenty-one words like the number of the name Eheyeh and the gematria \"ach\" (brother) — good:",
    "1:ב":
      "And the women. Because they did not remove their earrings for the calf, Rosh Chodesh was given them as a yom tov. Tur:",
    "1:ג":
      "The custom that initially thus they accepted upon themselves (Beit Yosef). And specifically when they stipulate explicitly, but when unspecified they may not be lenient for them at all, as Beer HaGolah. And even in a place where they practice doing melacha, the husband cannot force her, and his Hebrew manservant and maidservant he cannot force to melacha; and for himself it is permitted even heavy melacha (Bach on erev Shabbat). They practiced somewhat to fast on erev Rosh Chodesh, and if Rosh Chodesh falls on Sunday they fast on Thursday (Bach siman 581 and Minhagim). And if Rosh Chodesh falls on Shabbat they fast on Friday, and so in siman 570. But Rama of Panu wrote in responsa that always one should fast on the day of entry before the molad. And I heard that the kabbalist R' Yosef Saruk zatzal fasted on the day of the molad until the molad arrived and then ate even if the molad falls at midday, and in any case one who has a custom must practice thus and it is forbidden to change it until his vow is released. And it is obvious that even on erev Shabbat he must complete, as written in Yoreh Deah regarding the day his father died on — that even if the first time it falls on a weekday he must complete even if afterward it falls on erev Shabbat; so too here, if he completed the first time he must practice thus forever, and if the first time he did not complete even on a weekday he need not complete; however in a place where they make from it a minyan and read Vayechal and he is counted among them he must complete, see siman 249 and siman 572 seif 2. And it appears to me it is a good custom to say selichot before mincha prayer, for from mincha and upward Rosh Chodesh begins (Magen Avraham). And Magen Avraham also wrote in siman 579 s.k. 6 that on erev Rosh Chodesh in a place where they say dibrei kevushin they should say before prayer on erev Shabbat. And Minach Emaryah wrote they should hurry with the night meal so as not to enter it while distressed (Magen Avraham). And on erev Shabbat one does not say Yom Kippur Katan except on Thursday, see siman 550. And regarding whether there is any concern about fasting on erev Chanukah because of Tevet Rosh Chodesh, see Devar Shmuel siman 339 and siman 472 s.k. 2 what he wrote there:",
  },
  "output/siman_417/beer-hagolah/part-001.txt": {
    "1:א": "Eruvin 10 and Chagigah 18, and in Tosafot there Rif and Raosh in chapter 1 of Moed Katan.",
    "1:ב": "Yerushalmi chapter 1 of Taanit and in the chapter of four perakim of R' Elazar:",
  },
  "output/siman_417/beur-hagra/part-001.txt": {
    "1:_":
      "Seif 1 and the women. Megillah 22 and see Rashi and Tosafot in the name of R' Elazar and Raosh in the name of Yerushalmi, and Chagigah 18a \"Rosh Chodesh shall prove,\" etc., and Tosafot there s.v. Rosh Chodesh, etc., or alternatively, etc.:",
  },
  "output/siman_417/biur-halacha/part-001.txt": {
    "1:א":
      "And the women who practice — it is uncertain regarding the Mechaber's intention whether in his view in any event from the side of custom all women are obligated to practice thus because it is an ancient custom that their mothers upheld already, and like other permitted matters that Jewish women accepted upon themselves from ancient times that certainly all generations are obligated to practice thus; or his intention is only to say that a woman who practices thus — it is a good custom [and also she may not retract from this custom, like every custom of a mitzvah that one may not release, as is proved in Beit Yosef in the name of Shibolei HaLeket]; but l'chatchila not every woman is obligated to practice thus even from the side of custom. And from the words of R' Yerucham (and brought in Beit Yosef) who wrote \"for those who practiced,\" etc., and similarly from what he concludes there: \"and it would be for them to forbid all melacha,\" etc., \"or to permit,\" etc. — see there — it implies that even from the side of custom not every woman is obligated to practice thus, only one who already practiced this custom; but not that it is a custom for all Israel that every woman in every generation is obligated to practice thus from \"do not forsake your mother's Torah.\" And so it appears from Magen Avraham s.k. 3 in the name of Beit Yosef and other poskim that among our women the matter depends — see there. However in truth even if we say that R' Yerucham's view is to be lenient in this, nevertheless one may not be lenient, for from many of the early poskim it appears the matter is not at all dependent on our women but rather mitzvot upon which they stand from ancient generations — see in Shibolei HaLeket who wrote that they established it as a statute from the days of Moshe Rabbeinu, and so is the view of Rokeach and Or Zarua who wrote in general women are forbidden melacha; and so is implied in Eshkol, and so is the view of Avudraham, and so is implied in Sefer HaMinhag, and so is proved the view of Rashi and Tosafot in Megillah and in other places, and not like the implication of R' Yerucham who considered the custom new in his eyes and they practiced not according to our Talmud but according to Yerushalmi — see there. And also from Magen Avraham s.k. 3 there is no contradiction — for even according to our words that every woman must accept this custom upon herself, meaning she is not permitted in any event to treat this day as an ordinary weekday to engage in all melachot; for regarding this, mitzvot stand from ancient days; but regarding not engaging in any melacha the matter depends on her custom — and if from the time she grew up she practiced to do some melachot, one may not forbid her regarding this, for on this she is not commanded at all, for on this there was never an equal custom for all Israel; and also in ancient days there were those who practiced to do some melachot and there were those who sanctified themselves and did no melacha at all. However if she herself initially practiced not to do any melacha, or when unspecified it is as if she accepted upon herself to abstain from all melacha — and in this manner are said the words of Magen Avraham, and there is no contradiction at all in his words, for he too admits that in any event every Jewish daughter is obligated to practice abstaining at least from some melachot and that there be a distinction between this day and the rest of the weekdays:",
    "1:ב":
      "Good custom — Bach wrote a different approach in this, and per his words this custom does not come to be stringent on women and prevent them from melacha on this day, but only to be lenient — meaning they themselves, if they wish to do melacha even heavy melacha, are certainly permitted; only the husband is not permitted to force them to do melacha (except housework like cooking and baking and the like). And he added further that not specifically his wife — the husband cannot force her — but even his servants too he cannot force [and for this reason Scripture called erev Rosh Chodesh \"the day of action\" and not \"Rosh Chodesh on erev Shabbat\"]. Only there is a distinction in the matter — for his servants he cannot force to heavy melacha, and for his wife he cannot force to engage in any melacha even light — see there. However from all the poskim I brought above it is not implied like his words, but rather there is a mitzvah upon women to refrain on Rosh Chodesh from melacha [and automatically certainly he cannot force her to melacha]. Also what is implied from his words that the final answer in Tosafot is only regarding that he cannot force his servants on Rosh Chodesh to do heavy melacha [meaning even though he hired them for this work and they engage in it constantly] — from the plain language of Tosafot for this answer it implies heavy melachot are forbidden by law for everyone; however either way this is a new matter not mentioned in poskim, being only one answer in Tosafot that heavy melachot are forbidden by law, and Shulchan Pesach does not hold thus; and as Peri Chadash wrote that men who practice not to do melacha on Rosh Chodesh — it is a mistaken custom, and so Birkei Yosef, and they cited in responsa. And Rabbeinu Yaakov Emden in Mor U'Ktziah wrote it is reasonable that at night melacha is permitted since it is in private and it was not forbidden on Rosh Chodesh except public melacha, and it is not more stringent than tefillin either, and see there further regarding what he wrote to be lenient regarding light melachot; and I do not know if they practiced according to his words — in all this:",
  },
  "output/siman_417/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] Because it is a safe yom tov, etc. Ohr Zarua — the reason is because each month a woman renews herself and immerses for her husband and desires to be beloved to him as if she were new, like the moon which renews itself, and they desire to see it — therefore Rosh Chodesh is a yom tov for women:",
  },
  "output/siman_417/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Rosh Chodesh, etc. — on Shabbat before Rosh Chodesh, after reading the haftarah, before Ashrei, the shaliach tzibbur announces and informs the congregation on which day Rosh Chodesh will fall, or if it will be one day or two days. Avudraham. As Beer HaGolah siman 484 in the back. Magen Avraham s.k. 1.",
  },
  "output/siman_417/machatzit-hashekel/part-001.txt": {
    "1:א":
      "(s.k. 1) Rosh Chodesh, etc. — it appears to me one need not bless Rosh Chodesh Av. It seems I saw in one book — afterward I found it in Hagahot Mordekhai chapter Elu Megalechim in the name of Tosefta, and he rejected there this reason, and this law was brought below in Taz siman 549 — see there. The reason is that Iyov cursed his day and said \"let it not come among the months\" — and it is by way of asmakhta, since this month is one of punishment, therefore they do not bless it. Same as other months:",
    "1:ב":
      "For this is not kiddush beit din — for if so one would have to stand as is the law of kiddush beit din:",
    "1:ג":
      "But in truth we cannot sanctify, for we are not semuchim. And also kiddush is not needed, for Hillel already sanctified when he saw semicha would cease — all months and festivals until the end of the world:",
    "1:ד":
      "Like kiddush hachodesh — that is, for remembrance in the world:",
  },
  "output/siman_417/magen-avraham/part-001.txt": {
    "1:א":
      "Rosh Chodesh, etc. On Shabbat before Rosh Chodesh they bless the month except before Rosh Chodesh Tishrei, as written \"b'chasah l'yom chagenu,\" and see siman 484. And in Beer HaGolah he wrote that there are places that do not have the custom to bless Rosh Chodesh Av, and see in Sefer Tikkun Dati siman 181. And it is written in Sefer Yereim that this is not kiddush beit din but rather they inform the world when Rosh Chodesh is — end of his words — and nevertheless they have the custom to stand at the time of saying Rosh Chodesh on such-and-such day like kiddush hachodesh which was while standing:",
    "1:ב":
      "And women who practice. Because they did not remove their earrings for the calf, Rosh Chodesh was given them as a yom tov (Tur):",
    "1:ג":
      "We follow the custom. For initially thus they accepted upon themselves (Beit Yosef). And specifically when they stipulate explicitly, but when unspecified they may not be lenient for them at all (so is implied in Eshel Avraham part 7). They practiced somewhat to fast on erev Rosh Chodesh, and if Rosh Chodesh falls on Sunday they fast on Thursday (Bach siman 581 Minhagim). And if Rosh Chodesh falls on Shabbat they fast on Friday, and so in siman 570 and in Megillah daf 4b. But Rama of Panu wrote in responsa that always one should fast on the day of entry before the molad, for the reason is because of the diminution of the moon. And I heard that the kabbalist R' Yosef Saruk zatzal fasted on the day of the molad until the molad arrived and then ate even if the molad falls at midday, and in any case one who has a custom must practice thus and it is forbidden to change it until his vow is released. And it is obvious that even on erev Shabbat he must complete, as written in Yoreh Deah regarding the day his father died on — that if the first time it falls on a weekday he must complete even if afterward it falls on erev Shabbat; so too here, if he completed the first time he must practice thus forever, and if the first time he did not complete even on a weekday he need not complete; however in a place where they make from it a minyan and read Vayechal and he is counted among them he must complete, see siman 249 and siman 572 seif 2 and chapter 3 of Eruvin. And it appears to me it is a good custom to say selichot before mincha prayer, for from mincha and upward Rosh Chodesh begins, and see siman 550. And in Tanhuma parashat Bereishit it is found that even if Purim falls on Shabbat one does not fast on Friday, for the essence of the fast is selichot and mercy and they cannot fulfill oneg Shabbat. And Minach Emaryah wrote they should hurry with the night meal so as not to enter it while distressed. And in some places if it falls on erev Shabbat they do not say selichot at mincha. Bach wrote one may not force his manservant and maidservant to melacha, and if he wishes to do so himself even heavy melacha he may:",
  },
  "output/siman_417/peri-megadim/part-001.txt": {
    "1:_":
      "It — Taz, see Perishah in the name of Rashal and Avodat HaKodesh that righteous women in old age in the world to come will return to the days of their youth like the moon — see there. And two days of Rosh Chodesh — Avodat HaKodesh, Levush, and Peri Chadash wrote that the thirtieth day is the past month — one need not be concerned, see there; and nevertheless everything is according to what they practiced. And Avodat HaKodesh: there is no prohibition, only a custom, and a husband is not permitted to force his wife to do melacha on Rosh Chodesh, and he commits a prohibition when he forces — so too his Hebrew manservants to heavy melacha like plowing and sowing; if he forces them he commits a prohibition; but if they wish they are permitted, see there, from the verse \"tomorrow is the new moon and I will be hidden on the day of action,\" see there; and nevertheless if they practiced it is as a vow. And see Even HaEzer chapter 1 on Rosh Chodesh: if she consecrated the work of her hands, one may say it is voided because she is not subjugated — and this is obvious; and Peri Chadash appears to imply that men who practiced — it is a mistaken custom and release is not needed, see there:",
  },
  "output/siman_417/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Magen Avraham s.k. 1: like kiddush hachodesh which was while standing. I am perplexed and I did not know where we find that kiddush hachodesh was while standing; and on the contrary in daf 25 of Rosh Hashanah it implies that it was while seated:",
  },
  "output/siman_417/turei-zahav/part-001.txt": {
    "1:_":
      "It is a good custom. In Tur from Perek R' Elazar: because the women did not wish to give their earrings to their husbands in the matter of the calf, therefore the Holy One blessed be He gave them that they should observe Rosh Chodesh more than men. And afterward he brings in the name of his brother the Raavad: because the festivals were established corresponding to the patriarchs and the twelve Rosh Chodesh days of the year correspond to the twelve tribes, and when they sinned with the calf they were taken from them and given to their wives as a remembrance that they were not in that sin. And Beit Yosef challenged: how did R' Elazar say to this that He gave them their reward — for since He already gave Rosh Chodesh to Israel, even though when the men sinned it was taken from them, the women who did not sin — it is proper that it not be taken from them, and it is not called giving reward for what was not taken from them. And he answered two answers, and in my humble opinion the reward that was relevant and ready for the men — for this purpose the observance of Rosh Chodesh was taken from them and given to the women more than what is due them on their own account, in the manner that we find the righteous one takes his portion and the portion of the wicked one in Gan Eden:",
  },
  "output/siman_417/yad-ephraim/part-001.txt": {
    "1:_":
      "In Magen Avraham s.k. 3: because of the diminution of the moon. N.B. And if they fast on erev Rosh Chodesh and sometimes the molad falls on that day and it turns out they fast on its renewal — and in order to complete the intent of the orderers of Yom Kippur Katan at the descent of the moon, it is straight to fast on the day of entry before it — see siman 79 and he concludes there that the pious ones in Israel did not practice thus:",
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
