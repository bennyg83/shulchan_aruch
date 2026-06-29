#!/usr/bin/env node
/** Generate _siman261/263-slot6-manual.mjs from embedded translations */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function writeManual(siman, FIXES) {
  const n = Object.values(FIXES).reduce((a, o) => a + Object.keys(o).length, 0);
  const out = path.join(__dirname, `_siman${siman}-slot6-manual.mjs`);
  fs.writeFileSync(
    out,
    `/** worker-slot-6 — siman ${siman} manual fixes (${n} blocks) */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`,
    "utf8"
  );
  console.log("wrote", out, n);
}

const FIXES261 = {
  "beer-hagolah/part-001.txt": { "1:ב": "Rashi — cited source." },
  "biur-halacha/part-001.txt": {
    "1:ו":
      "Eruvei chatzerot — meaning even for a reshus harabbim matter, thus proven from Levush. And the reason is that all eruvei chatzerot are included in a mitzvah, as written siman 366 s.k. 13 that it is a mitzvah to seek eruvei chatzerot, and they did not decree during bein hashemashot; and Rambam wrote that nevertheless it is not called eruv chatzerot mitzvah per se, but they permitted because one is preoccupied and hurries for it [Tosafot Shabbat]. And it is proven from Magen Avraham's words siman 200 s.k. 3, who seeks reasons why one must hurry with eruvei chatzerot before bein hashemashot — for he holds that during bein hashemashot one can also recite the blessing when placing the eruv, and it is not like other matters where we hold safek berachot lehakel; and the reason must be that for eruv chatzerot, which is lenient, they made the matter as if it were definite day. And if he is in doubt about the time itself — whether it is bein hashemashot or already night — he should be careful not to recite a blessing; and regarding the eruv itself there is room to bring proof to be stringent, for we do not say safek derabbanan lekula from what Bach wrote and Magen Avraham brought s.k. 1: safek bein hashemashot (meaning either day or bein hashemashot) is judged like bein hashemashot; and the Acharonim wrote the reason that safek lacking knowledge is not included in safek at all — perforce it is not double safek and is judged as if definitely bein hashemashot; and likewise in our matter the reverse — study and see below in what we wrote in general rules of time measurements how to practice:",
    "2:ב": fs.readFileSync(path.join(__dirname, "work", "en-261-bh22.txt"), "utf8").trim(),
  },
  "beur-hagra/part-001.txt": {
    "2:ה": fs.readFileSync(path.join(__dirname, "work", "en-261-gra25.txt"), "utf8").trim(),
  },
  "eliyah-rabbah/part-001.txt": {
    "2:_":
      "[2] One does not immerse, etc., not for need, etc. And Taz was stringent even for need, since it is possible to give it as a gift to a non-Jew as below siman 323 seif 7; and in such a case Olat Shabbat wrote one does not separate challah even for need since it is possible to leave a little as below siman 506. They also wrote in the name of Bach to immerse via trickery such as drawing water, etc.; and below it will be explained that even on Shabbat it is permitted thus; and possibly his intent is that since it is possible via trickery, it is forbidden to immerse during bein hashemashot without trickery even in a matter where it is impossible to give to a non-Jew:",
  },
  "kaf-hachayyim/part-001.txt": {
    "4:_":
      "(4) There. One does not tithe definite produce even rabbinic tithe. Eshel Avraham or part 2 — and see below siman 307 or part 149. But one may separate challah outside Israel during bein hashemashot, which is rabbinic without scriptural support, so the law of challah not be forgotten. Beit David siman 103. Berkei Yosef or part 3 — but Pri Megadim or part 1 wrote one should not separate challah during bein hashemashot if he forgot from while it is still day, because it is possible to leave a little as we say outside Israel — food goes and he leaves and afterward separates. And likewise Magen Avraham s.k. 2. Avnei Nezer or part 2, Tosafot Shabbat or part 2 — and if so Shabbat according to Avnei Nezer is permitted during bein hashemashot. And likewise challah of Israel when he has nothing to eat on Shabbat is permitted during bein hashemashot, for shevut mitzvah they did not decree during bein hashemashot — Avnei Nezer there. And see below siman 506 seif 3 in the gloss:",
  },
  "magen-avraham/part-001.txt": {
    "1:ז":
      "To light a candle — even not in a place of mitzvah, since the day is still great, certainly there are places that have not yet accepted Shabbat upon themselves; and it is comparable to that which we say: they eat, we finish — not finished (there). And if you ask: behold otherwise it is permitted, for if he wants he need not accept Shabbat upon himself as written siman 263 — one could say that case is different, for it speaks of an individual accepting Shabbat upon himself; but a community that accepted Shabbat upon themselves, Shabbat falls upon them perforce and it is worse than bein hashemashot as written seif 4; therefore Mahariyu needed another reason; and from his words it implies that if it is half an hour close to dark, when then possibly all places of Israel accepted Shabbat, it is forbidden to tell a non-Jew; however for need of mitzvah possibly permitted, for regarding amirah we are not more stringent than bein hashemashot; and likewise Mahariyu there and likewise Rashal in responsa:",
    "2:ב":
      "Three-quarters of a mil — and this is like a quarter of an hour before tzeit hakochavim; and Bach wrote one should be stringent for himself as Sefer HaYiraim and Mordechai and Agudah wrote: from the start of sunset it is night and three-quarters of a mil before that is bein hashemashot; and likewise I saw elders and men of action refrain from melacha two hours before Shabbat — end of his words; and such is Maharil responsa siman 163 regarding prayer and accepting Shabbat: it is simple that they follow every day after his hours derived from dividing into two — evening and they count hours from midnight until evening, and from them they estimate plag hamincha and tosefet Shabbat two hours for all that precedes, per Maharach — and this settles the custom of communities — end of his words; and it implies they count until tzeit hakochavim literally; and likewise Minchat Kohen; and see siman 233:",
  },
  "mishnah-berurah/part-001.txt": {
    "1:נ":
      "(14) Bein hashemashot — the Mechaber follows his view that he holds below siman 307 seif 5 that on Shabbat itself it is forbidden via a non-Jew in Torah melacha even if for Shabbat need; and see below siman 276 seif 2 in Hagahah:",
    "1:פ":
      "(17) An hour or two — specifically an hour or two; but half an hour close to dark, when then possibly in all places of Israel they accepted Shabbat upon themselves, is more stringent and forbidden even to tell a non-Jew to do melacha; however for need of mitzvah it is permitted. And even according to what the Mechaber rules below seif 4 that after accepting Shabbat it is forbidden to transgress even shevut in a place of mitzvah — nevertheless regarding amirah to a non-Jew we are not more stringent than bein hashemashot:",
    "1:צ":
      "(18) To tell a non-Jew to kindle — even not in a place of mitzvah, since the day is still great, certainly there are places that have not yet accepted Shabbat upon themselves and do melacha themselves; it suffices for us that via acceptance we rest ourselves from melacha. And know that in our matter we speak where the community in his city accepted Shabbat upon themselves and kedushat Shabbat falls perforce even if one does not wish to accept; therefore he wrote to tell a non-Jew, etc., for the above reason; but an individual who accepted Shabbat upon himself is permitted even to tell his fellow Israelite to do melacha for him, as below siman 263 seif 17 — see there the reason in Mishna Berurah:",
    "2:א":
      "(19) That one must add — both at entry and at exit, as stated below siman 293 seif 2 — see there. And upon this time there is neither lav nor karet, only a positive mitzvah from the Torah; and we derive [Gemara Rosh Hashanah 9] from what is written on Yom Kippur: \"and you shall afflict your souls on the ninth of the month in the evening from evening until evening you shall rest your Shabbat\" — and we say: perhaps on the ninth they fast? Scripture says \"in the evening\"; if in the evening, perhaps from when it darkens? Scripture says \"on the ninth\" — how so? He begins and fasts from while it is still day in order to add from profane to holy; and also at exit he adds, from \"from evening to evening\" and from \"you shall rest your Shabbat\" we derive that wherever \"shevut\" is stated like Shabbat and Yom Tov, one must also add and rest from melacha. And the time of addition is perforce before bein hashemashot, for during bein hashemashot it is safek perhaps night and one is liable an asham talui, and no verse is needed to add:",
  },
  "peri-megadim/part-001.txt": {
    "1:_":
      "One does not — Taz, Rashi Shabbat 34a, and tevilat kelim in letter 2 to immerse via trickery; and it is not the place — see there; and siman 302 and siman 323 explain these two enactments in Shulchan Aruch and Mishna Berurah. And Taz 14, 120 letter 17 and Shach 28 — if the non-Jew does not wish to take as a gift, one could say the vessel is immersed via a non-Jew and it is shevut, and shevut in a place of mitzvah — see siman 307 seif 5 Magen Avraham and Taz 8; and one could say during bein hashemashot all agree that in such a case it is certainly permitted, only one could say because of blessing it is better that an Israelite immerse and recite a blessing with shevut in a place of mitzvah in such a case, unlike via trickery where one does not recite a blessing as Magen Avraham wrote siman 323 s.k. 13 — if so it is better that a non-Jew immerse; except on Shabbat itself trickery is better, and during bein hashemashot it is better he immerse himself for Shabbat need, which is a mitzvah, and he recites a blessing — it appears to me. And in letter 2 it speaks of Shabbat:",
    "2:א": fs.readFileSync(path.join(__dirname, "work", "en-261-pm21.txt"), "utf8").trim(),
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Seif 1 — bein hashemashot to kindle the candle for Shabbat need; and nevertheless one candle suffices and no more — Magen Avraham siman 263 s.k. 11; and after examination it appears to me Magen Avraham's words there refer to what he wrote earlier: and if she forgot to bless until it darkened (meaning she did not kindle) she may rely on Maharam (namely tell a non-Jew to kindle and she blesses); and see siman 276 seif 3 (meaning rely on poskim that amirah to a non-Jew on Shabbat even full melacha is permitted for mitzvah need); and on this he wrote: and nevertheless one candle suffices — if so one could say this is in darkness where there is no permission when there is one candle; but during bein hashemashot one could say it is permitted even to increase candles, for the core need is Shabbat, especially to kindle two candles that the world is careful not to have fewer than two candles, one for zachor and one for shamor as below siman 263 — one could say it is like ner yaatz in Magen Avraham s.k. 6; and one can infer somewhat that in Magen Avraham's words there siman 261 s.k. 1 on Maharash's words; however during bein hashemashot do not say shevut — he did not write regarding if there is one candle it suffices:",
  },
};

writeManual(261, FIXES261);

const FIXES263 = {
  "baer-heitev/part-001.txt": {
    "5:א":
      "When she kindles she blesses, etc. It is good that she have a special candle to kindle with each Shabbat on its Shabbat — Ateret Zekenim in the name of Panach Raza. It is fit that the woman pray at the time of kindling that Hashem give her sons, males, illuminating in Torah — Magen Tzion. Maharash wrote: when there is a chuppah on Erev Shabbat and they delay it until after sunset and the woman does not wish to accept Shabbat before the chuppah — then she kindles the candle without a blessing before the chuppah, and afterward in darkness she spreads her hands over the candles and blesses; or she tells a non-Jew to kindle after the chuppah and she blesses on Erev Shabbat. And Magen Avraham wrote his words are puzzling; however b'dieved if she forgot to bless until it darkened she may rely on Maharash — see s.k. 3 as written there; and nevertheless one candle suffices — Magen Avraham there:",
  },
  "beer-hagolah/part-001.txt": {
    "4:ב": "Tosafot and Rosh and Mordechai from that which Rav roasted the Shabbat dish on Erev Shabbat — Berachot 27.",
    "5:א": "Tosafot in Shabbat 25 and Rosh there and Rambam chapter 5 and end of chapter and Ran and Mordechai and Rav Amram and Semak and Rabbeinu Yerucham.",
    "8:ב": "Agudah — cited source.",
    "9:_": "Agudah — source.",
    "15:א": "Terumat HaDeshen siman 10 and in his writings siman 153 that he found in a responsum, and likewise several great ones ruled.",
  },
  "biur-halacha/part-001.txt": {
    "5:ב":
      "And see siman 611 — see in Mishna Berurah and see there that the Mechaber's intent is to give a reason for why he holds one should not bless, for below siman 611 seif 1 the Mechaber wrote: in a place where they practiced to kindle they kindle, and in a place where they did not practice to kindle they do not kindle — perforce even though our custom is to kindle, nevertheless one does not bless, for by custom one does not bless; and this reason is in the Gra's explanation:",
  },
  "dagul-merevavah/part-001.txt": {
    "1:_":
      "And in my humble opinion the law is with the mother of the Gra's teacher, that on Yom Tov she blesses and afterward kindles; and what Magen Avraham brought as proof from siman 618 and from Tosafot in Pesachim daf 7b — in my humble opinion the case is not comparable, for there in siman 618 they bless immediately after netilat yadayim because of netilat yadayim after leaving the bathroom — there the text of the netilat yadayim blessing is the same; and likewise Tosafot in Pesachim that they bless in all immersions after immersing because of ger immersion — there too the blessing text is the same, and ger immersion is on the immersion like all other obligated immersions — therefore because of lo plug they did not distinguish; but the candle blessing — the text of the Shabbat candle blessing is not the same as the Yom Tov candle text: on a Shabbat candle one blesses to kindle a Shabbat candle as explained here in Shulchan Aruch seif 5, and on a Yom Tov candle the blessing text is to kindle a Yom Tov candle as explained here at the end of siman 514; and lo plug does not apply; and per Magen Avraham's words one would need to say lo plug in every candle blessing — if so there is also difficulty on Chanukah candle kindling, to bless after kindling because of lo plug — but certainly this is not so, as explained siman 676 seif 2 in Hagahah; rather certainly since the text is to kindle a Chanukah candle and for Shabbat to kindle a Shabbat candle, lo plug does not apply; and likewise it appears to me to rule like the Gra's teacher's wife, and she is a woman wise in her own right:",
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_":
      "(3) There. And some intend to make two wicks, etc. — meaning in a candle called a kandila one kindles two wicks and blesses on both of them to kindle a Shabbat candle; and likewise with a wax candle; and with fat one takes two candles. Bach:",
    "8:_":
      "(8) One does not kindle with an old earthenware lamp on the table. Responsa Rashal siman 86. Avnei Rozal or part 1 — and for a poor person who has no certainty it is permitted. Mishnat Zkeinim end of the siman; and if he kindled it with a flame, or if it is of glass or coated earthenware, it is permitted as written below siman 673 seif 3; and it is good for a God-fearing woman not to kindle in a kansa, only she should have a special wax candle to kindle each Shabbat on Shabbat — Panach Raza. Taz, Avnei Rozal there. And see below or part 14:",
  },
  "machatzit-hashekel/part-001.txt": {
    "3:א":
      "(s.k. 3) Chapter 1, etc. — because of recognition, etc.; and what is the reason — it appears to me that if one was compelled, etc. — meaning that without Bach's words it would occur that the reason one needs to add a candle is for atonement — if so, also when compelled one needs some atonement; or it is a mistaken view that the extra candle is for compensation for what she forgot; if so, likewise when compelled; unlike Bach's reason that she be careful henceforth — when compelled she need not add, for otherwise she was careful, only the compulsion caused her not to kindle:",
    "11:א":
      "(s.k. 11) When she kindles — it is fit to pray, etc., for we say chapter Bameh Madlikin: R' Huna said — whoever is careful with the candle will have sons who are Torah scholars; for candle is mitzvah and Torah is light — through the candle of mitzvah one merits Torah light; therefore it is fit that she pray at kindling that she have sons who are Torah scholars, for at the time of fulfilling the mitzvah prayer for the special reward of that mitzvah is more desired before Him, may He be blessed:",
    "15:א":
      "(s.k. 15) That every, etc. — and likewise, etc., when it is a night of immersion, etc. — meaning on Shabbat night it is a night of immersion and she must wash her whole body before immersion so nothing interposes; and washing must be from while it is still day, especially on Erev Shabbat when she cannot wash at night which is Shabbat; and the custom is to wash in the mikveh close to immersion as Shach wrote Yoreh Deah siman 199 s.k. 7; and immersion must be at night literally — and how does she manage with candle lighting: if she kindles before washing, in any case she must kindle after plag hamincha, which is an hour and a quarter before tzeit hakochavim; and if she blesses immediately, behold she accepted Shabbat and cannot wash again; and even if she stipulates that she does not accept Shabbat via kindling — where there is need one may rely on the stipulation as Rama wrote — nevertheless the matter is difficult, for she must narrow the time, for kindling must be after plag hamincha and washing takes time and must be while still day before Shabbat enters; and if she waits to kindle until after immersion, behold it is already Shabbat and she may not kindle; and to go home between washing and immersion while still day and kindle — she fears she will soil herself and there will be an interposing substance on her at immersion:",
  },
  "magen-avraham/part-001.txt": {
    "3:ד":
      "Because of shalom bayit — therefore if he has one candle it suffices, and afterward he buys for kiddush or Chanukah candle; and nevertheless also for Chanukah one candle suffices — it appears to me the wife also blesses, for she also benefits from the lights, as written siman 69; and a fortiori from Chanukah candle as written siman 675 — see there; and nevertheless if she has a sensible husband the husband should bless; however if she eats at one table with others she does not bless, for there is no joy for her:",
    "5:א":
      "When she kindles — it is fit that the woman pray at kindling that Hashem give her sons, males, illuminating in Torah (Magen Tzion in the name of Bach on Parashat Yitro). There are siddurim that wrote a blessing for candles after leaving the bathhouse — one should not say it (Rambam chapter 7). Maharash wrote in the name of Maharam z\"l: when there is a chuppah on Erev Shabbat and they delay it until after sunset and the woman does not wish to accept Shabbat before the chuppah — then she kindles the candle without a blessing before the chuppah, and afterward in darkness she spreads her hands over the candles and blesses; or she tells a non-Jew to kindle after the chuppah and she blesses — until here; and it is puzzling, for there is no blessing on an already lit candle; and further amirah to a non-Jew is shevut; however Beit Hillel did not decree shevut (see siman 261); and see Mahariyu who permitted to kindle while the day is still great and afterward spread hands and bless, etc.; and what is found in a collection that they bless on candles on Shabbat after leaving the bathhouse — he does not hold it, and Ravina did not sign on it (Maharam Hagahot Maimoniyot); however b'dieved if she forgot to bless until dark she may rely on Maharash — see siman 276 seif 2 in Hagahah; and nevertheless one candle suffices:",
  },
  "peri-megadim/part-001.txt": {
    "3:א": fs.readFileSync(path.join(__dirname, "work", "en-263-pm31.txt"), "utf8").trim(),
    "3:ג":
      "And know that Levush in Hagahah wrote that on Erev Shabbat because of a vow it is forbidden per Tosafot; and if he wishes he can annul his vow and it is comparable to a watchman where there is now permission; unlike what Avnei Rozal brought and Magen Avraham wrote on this. And see siman 261 in Magen Avraham letters 8 and 10; and it appears at first glance that from the beginning of sunset if they accepted for addition it is Torah law, and from plag hamincha until the beginning of sunset it is rabbinic if they accepted with a vow — requires study; and it is not the place elsewhere will be explained on vows such as this — one should not expand. See siman 562:",
  },
  "shaarei-teshuvah/part-001.txt": {
    "3:_":
      "That she forgot — Ba'er Heitev. And Shiyurei Berachah wrote in the name of Mohar Shmuel Shar Aryeh in the gloss on a manuscript that he wrote on this: it is better that one who forgot prepare for a poor person one measure of oil for kindling on Erev Shabbat; but the custom is to add a candle per Maharil's words; and what he wrote regarding a birthing woman — Shiyurei Berachah on Kenah Haggadah in the name of a certain sage questioned this, for kindling in its place we require as below seif 10 — see there; and see above s.k. 1 in the name of Beit Yaakov; and responsa NachalatGavoa siman 8: a woman who kindled two candles intending to make a blessing and through Shabbat preoccupation was unsure if she made a blessing — he wrote to distinguish whether she kindled at her time on Erev Shabbat, and it does not appear to me; and the proof he brought from the reason in your writings is not comparable at all; and the essence in this: whoever kindled from plag hamincha and above, presumably for the mitzvah of Shabbat she kindled and blessed; and even if she is in doubt she need not kindle a candle with a blessing; and if she is unsure whether she kindled before plag hamincha or after, she should return and kindle for the sake of the mitzvah without a blessing — see Avnei Rozal what he wrote on this:",
  },
  "turei-zahav/part-001.txt": {
    "17:_": fs.readFileSync(path.join(__dirname, "work", "en-263-tz17.txt"), "utf8").trim(),
  },
};

writeManual(263, FIXES263);
console.log("263 done");
