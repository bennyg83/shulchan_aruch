#!/usr/bin/env node
/** Build _hand-en-471-slot12.mjs from embedded translations */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "hand-slot12-siman-471.json"), "utf8")
);

const T = {
  "ateret-zekenim/part-001.txt|1:_":
    "And he should not drink a little wine; and some say it is permitted to drink on erev Pesach whether a little or much wine, for whatever he drinks — even a little — is called \"much\" when combined with the two cups before the meal (Maharshal); and therefore for the first two cups he should drink much so that it stimulates appetite, and one need not be concerned about intoxication, for wine within the meal does not intoxicate; but for the last two cups he should not drink much because of intoxication — see Gevurat Hashem daf 52b; and he should drink the cup entirely or most of it — that is, for the first three cups; but the fourth cup he must drink the entire cup that holds a revi'it because of Birkat HaMazon.",

  "baer-heitev/part-001.txt|1:א":
    "<b>Rich matzah.</b> That is, immediately after 9 hours — that is, the fourth part of the day — for at 9 and a half hours is the time of Minchah ketanah; and at the beginning of Arvei Pesachim it says near Minchah one may not eat, and that means near Minchah ketanah. And Ran wrote that one should be stringent from the time of Minchah gedolah — that is, from six hours and upward — and so too Maharil; and Rama so ruled below in siman 439 seif 3 in the gloss — see Kaf HaChayyim.",

  "baer-heitev/part-001.txt|1:ב":
    "<b>Vegetables.</b> And the same applies to meat and fish — they too are permitted; and Tosafot in Eruvin daf 25 wrote that raw vegetable stimulates appetite, but cooked vegetable satiates with a light matter — Magen Avraham. And Kaf HaChayyim wrote that there it refers to a fixed manner of eating — that is, when one wraps bread in it; but vegetable alone is permitted to eat whether raw or cooked.",

  "baer-heitev/part-001.txt|1:ג":
    "<b>Much.</b> And he should not drink so much that he becomes satiated, for he certainly spoils appetite for food — and common sense testifies to this. Taz.",

  "baer-heitev/part-001.txt|2:א":
    "<b>Rich.</b> And if it was kneaded in fruit juice with water as well, it is still rich matzah and one does not fulfill the obligation with it — Chayei Adam and Magen Avraham — see there; and see above siman 462 seif katan 3.",

  "baer-heitev/part-001.txt|2:ב":
    "<b>Day 14.</b> But on the night of the 14th it is permitted — Ran, Bach, and Kaf HaChayyim and Or Zaru'a. And in Shachnahag he wrote that many are accustomed not to eat from Rosh Chodesh erev Pesach. And Magen Avraham wrote that doubled and puffed matzah one may not eat on erev Pesach all day, lest it be matzah — see siman 461.",

  "baer-heitev/part-001.txt|2:ג":
    "<b>And a minor.</b> And the same law applies to a minor girl. Magen Avraham.",

  "baer-heitev/part-001.txt|2:ד":
    "<b>For appetite.</b> And this custom has no reason. Eshel Avraham.",

  "baer-heitev/part-001.txt|2:ה":
    "<b>And kneaded.</b> But crumbled and cooked it is permitted to eat and one blesses haMotzi — nevertheless, for it is a pot-cooked dish and dissolved — Maharil, Magen Avraham, and Kaf HaChayyim.",

  "baer-heitev/part-001.txt|3:_":
    "<b>To wash.</b> After chatzot he should go to the bathhouse and immerse; and after Minchah prayer he should occupy himself with laws of the Pesach offering; and in Shelah he copied from Seder Hayom what every person should study. Rashal wrote one does not comfort a mourner on erev Pesach.",

  "beer-hagolah/part-001.txt|1:א": "Mishnah Pesachim 99.",
  "beer-hagolah/part-001.txt|1:ב": "Rosh there.",
  "beer-hagolah/part-001.txt|1:ג": "Rambam chapter 7 and from the words of Rif.",
  "beer-hagolah/part-001.txt|1:ד": "From this [statement] of Rava, Berachot 35 — and so Tosafot there.",
  "beer-hagolah/part-001.txt|2:_": "Rosh on erev Pesach, first chapter.",
  "beer-hagolah/part-001.txt|3:_":
    "Tur in the name of Rif; and to this Rosh agreed in the statement of Shmuel there 100.",

  "beur-hagra/part-001.txt|1:א": "<b>Seif 1 — bread.</b> Tosafot there — and as explained.",
  "beur-hagra/part-001.txt|1:ב":
    "<b>From the hour, etc. enough, etc.</b> From nine, etc., and there 100b; here earlier, etc., and there 107 — the question was posed to them, etc.; and Ran's view is from chatzot the question is for stringency; and see Tosafot there s.v. perhaps, etc., and what Rashbam wrote, etc., and further there because of the obligation of matzah he agrees; and so Maharil in laws of Sukkah; and as explained above siman 439 seif 3 in the gloss; and here the rabbi wrote nothing because there is no practical difference, as written in siman 462 seif 4 in the gloss and in countries, etc., and in siman 464 seif 1; but Ran's words require study, for the sugya in the first chapter of erev Pesach speaks of Minchah ketanah, as Rav Papa said there — even if you say, etc., and in Arvei Pesachim near, etc., and it was taught, etc.",
  "beur-hagra/part-001.txt|1:ג":
    "<b>But one may eat a little, etc.</b> Rambam; and per Rashi's explanation there — kinds of side dishes are fruits; and see there Tosafot s.v. kinds. However, etc.",
  "beur-hagra/part-001.txt|1:ד": "<b>Or vegetables.</b> There R' Yitzchak would dip in vegetables.",
  "beur-hagra/part-001.txt|1:ה":
    "<b>But he should not fill.</b> Meaning — this is what it means by \"dips\" — a small amount; and this is what it means by \"a little fruit,\" etc.; and so it appears from Rif; and meaning — this is Tosafot's question 99b s.v. one may not eat, etc., and you might ask, etc. — see there; and this is Rambam's language in his commentary there: that which prevented him from eating is not eating bread alone, for he had no intention to eat bread at that hour, and we are forbidden to eat matzah on day 14 until he eats it at the time of the mitzvah; but they prevented him from eating much of other foods.",
  "beur-hagra/part-001.txt|1:ו":
    "<b>And if he is.</b> As above in siman 170 seif 3 — only that here it is not like istenis there.",
  "beur-hagra/part-001.txt|1:ז":
    "<b>And wine a little, etc.</b> Tosafot — not like Tur who wrote that whether much or little is permitted; and Tur's view is like the Gemara there in siman 467 on what is written there 108a — R' Mana said to her, etc., even though we say that a little satiates — here it states plainly if he wishes, etc., with the first and second cup it is \"much\"; and this is what Tosafot wrote there s.v. rather, etc., and this, etc.",
  "beur-hagra/part-001.txt|2:א":
    "<b>Seif 2 — and before.</b> Tosafot in the first chapter of erev Pesach s.v. one may not eat, etc.",
  "beur-hagra/part-001.txt|2:ב":
    "<b>But matzah, etc.</b> See in Milchamot end of chapter 3 of Pesachim; and see Ran chapter 3 of Pesachim who challenged him and wrote that from Yerushalmi there is no necessity that all day is forbidden on erev Pesach; but his words are not compelling — and this is Yerushalmi chapter erev Pesach halachah 1: R' Eliezer — one who eats matzah on erev Pesach, etc.; it was taught — R' Yehudah ben Bava says both chametz and matzah are forbidden; R' Shimon in the name of R' Yehudah — R' [Yehudah] would not eat neither chametz nor matzah — not matzah from this [statement] of R' Eliezer and not chametz from this of R' Yehudah ben Bava; and R' was a student of R' Yehudah ben Bava, not a student of R' Yaakov ben Kurshai — rather because he was a firstborn; R' Mana — R' Yonah: my father was a firstborn and would eat; R' Tanchuma: not from this but from this — R' was istenis: when he ate by day he would not eat at night, etc.",
  "beur-hagra/part-001.txt|2:ג":
    "<b>And a minor, etc.</b> Magen Avraham — but a minor, etc., and the Torah said \"and you shall tell your son.\"",
  "beur-hagra/part-001.txt|2:ד": "<b>And some practice.</b> As with matzah, etc.",
  "beur-hagra/part-001.txt|2:ה":
    "<b>And some are stringent.</b> For we hold like R' Eliezer who said it is a mitzvah.",
  "beur-hagra/part-001.txt|2:ו":
    "<b>And some, etc.</b> As written in chapter 1 of Pesachim — perhaps it will come, etc.",
  "beur-hagra/part-001.txt|2:ז":
    "<b>Matzah that was baked, etc.</b> See Tosafot Pesachim 41a, Rosh Hashanah — but not; and R' Yitzchak explained, etc.",
  "beur-hagra/part-001.txt|3:א":
    "<b>Seif 3 — if he began.</b> Per Rif's approach who explains that which is said there \"but he spreads,\" etc. — it refers even though it is a third opinion, not like R' Yehudah and not like R' Yosi; and as written there in Yerushalmi — R' Yehudah in the name of Shmuel: these are the words of R' Yehudah and R' Yosi, but the words of the Sages: he spreads a cloth and recites kiddush — and he argues with R' Yosi bar R' Chanina who said the halachah, etc.; and he said before the tenth hour — for even if he began in permissibility he must stop; but it is not so that even if he began in prohibition he need only spread cloth and kiddush; and even if he began at bein hashemashot, as written in Milchamot what is written there; and they agree one does not bring, etc. — meaning: even though they argue whether from bein hashemashot he agrees — nevertheless if he brought, he spreads, etc.; and see Rashi there s.v. and if he brought — if not, there is not, etc.; and so ruled Razah; and per all opinions, even if he began in prohibition.",
  "beur-hagra/part-001.txt|3:ב":
    "<b>And it is a mitzvah to wash.</b> As written in chapter 3 law 19.",
  "beur-hagra/part-001.txt|3:ג":
    "<b>And to shave.</b> As written in chapter 3 of Moed Katan 14a.",
  "beur-hagra/part-001.txt|3:ד":
    "<b>And to wear, etc.</b> As written in Yerushalmi chapter 1 of Kiddushin end of halachah 4: for weekday use — but for festival use they bring to the middle and divide; R' Mana said: festival vessels — they divide; Shabbat vessels — require, etc. — meaning: it is in doubt; R' Avin explained it: whether festival vessels or Shabbat vessels — they divide; see siman 529 seif 1.",
};

// Part 2 appended below in same file - run merge script
const part2 = {
  "biur-halacha/part-001.txt|1:_":
    "And wine a little, etc. — In Tur he wrote that whether little or much is permitted, but Beit Yosef challenged him from the sugya in Berachot 35; therefore he ruled plainly not like his words but like Tosafot and Mordechai; and so Rokeach; and see Beit Meir who wrote that from the rulings of Rif, Rambam, and Rosh it appears they hold like Tur; and so I found Maharam Chalavah who wrote: drinking is permitted, even much as well, for all the more so it stimulates the heart and one eats matzah with appetite — end of his words; and so it appears from Rashbatz's conclusion in his book Yavin Shemu'ah: and drinking wine draws eating, as we say Rava would drink wine that stimulates the heart — end of his words. However, in R' Chananel's explicit [commentary] in Pesachim it is proven his view is to forbid a little, for he wrote: Rava would drink much wine, etc. — see there; and it is proven he intended this for the sugya in Berachot mentioned; and it requires study. And in Halachot R' Yitzchak Giatos — after he brought that of Rav Sheshet who fasted, and that of eating vegetable, and that of Rava who would drink wine — he concludes on it: therefore let each matter be held per its own view, whether in drinking, fasting, or other matters — end of his words; and so it is reasonable that everything depends on that person's nature, per what he feels in himself — a matter that stimulates his heart toward appetite for food or the reverse.",

  "chatam-sofer/part-001.txt|1:_":
    "In Mechaber seif 2 in the gloss \"and some say\" not to crumble — NB: and to crumble them on Yom Tov see marker in Magen Avraham siman 504.",

  "chatam-sofer/part-001.txt|2:_":
    "(There in Magen Avraham seif katan 8) and see Beit Yosef siman 462, etc. NB: it is simple that just as flour must be of a type that can become leavened, so too liquid must be of a type that can become leavened; if so, \"bread of affliction\" is unnecessary — and not like Dagul MeRevavah — see there.",

  "dagul-merevavah/part-001.txt|1:_":
    "And see what Magen Avraham wrote siman 464 seif katan 1 — and this proof is hidden.",

  "eliyah-rabbah/part-001.txt|1:_":
    "[1] From the tenth hour, etc. — that is, the fourth part of the day immediately after the ninth hour; and that which below siman 439 forbids from chatzot — I explained in Eliyah Zuta there that on erev Pesach there is no permission except in rich matzah, which is different; and the rabbi's brother-in-law answered that Rama per his reason — in these countries we do not practice rich matzah at all and plain bread is obviously forbidden — therefore he did not emend (Magen Avraham) [Rama] anything — see there; and nevertheless on Levush it remains difficult — see siman 529 seif katan (5) [2].",

  "eliyah-rabbah/part-001.txt|2:_":
    "[2] Fruits, etc. — and the same law applies to meat, fish, and eggs (Kol Bo).",

  "eliyah-rabbah/part-001.txt|3:_":
    "[3] Vegetables, etc. — and Tosafot in Eruvin daf 55 wrote that raw vegetable stimulates appetite but cooked satiates with a light matter (Magen Avraham); and Chak Yaakov challenged that there it refers when one wraps bread in it, but vegetable alone is permitted even cooked — up to here; and it appears to me that if so, what do Tosafot challenge there from the chapter Tolim — perhaps it deals without bread, as they explained there regarding raw vegetable.",

  "kaf-hachayyim/part-001.txt|1:_":
    "(1) [Seif 1] Forbidden to eat bread, etc. — that is, even rich matzah, as below seif 2: leavened bread is forbidden from the beginning of the fifth hour, as written above siman 443; and matzah with which one fulfills at night — forbidden all day 14, as below seif 2 — see there.",

  "kaf-hachayyim/part-001.txt|2:_":
    "(2) There: forbidden to eat bread, etc. — even less than a kezayit. Shulchan Aruch HaRav siman 1 paragraph bread.",

  "kaf-hachayyim/part-001.txt|3:_":
    "(3) There — from the tenth hour, etc. — meaning the tenth hour is included in the prohibition — that is, after 9 hours bread-eating on erev Pesach is forbidden — Shulchan Aruch HaRav 1, paragraph 1; and so Magen Avraham seif katan 1; Chayei Adam 1, paragraph 1; Pri Chadash 1; Eshel Avraham or 1; Maamar Mordechai 1; R' Zalman 1; and these hours are seasonal hours, as Rambam wrote in explanation of the Mishnah — Pri Chadash; and so Machatzit HaShekel seif katan 1; Ateret Zekeinim 1; and so R' Zalman there — whether the day is long or short, forever forbidden to eat from the beginning of the last fourth of the day until night — end of his words; and see above siman 443 seif 1 in the gloss and in our words there paragraph 21.",

  "machatzit-hashekel/part-001.txt|1:_":
    "(Seif katan 1) From the tenth hour — that is, the fourth part of the day — meaning from when the last fourth of the day began; for \"hours\" means seasonal hours.",

  "machatzit-hashekel/part-001.txt|2:_":
    "(Seif katan 2) A little, etc. — and see there in Rashbam's and Rif's explanation: Rashbam wrote why it teaches \"dips\" — all their eating was by dipping; and Rif wrote \"dips\" like \"attends to\" — meaning he substitutes the bread he would be fit to eat and is not permitted — he eats substitutes, the innards (of the Pesach he is occupied with); in any case we see he is permitted to eat innards — that is, meat; and the same applies to fish.",

  "machatzit-hashekel/part-001.txt|3:_":
    "(Seif katan 3) Or, etc. — raw vegetable, etc., for it says there: a city without vegetables — a Torah scholar may not dwell in it, for a Torah scholar must be more careful and warm himself with his money; and vegetables, being light and cheap — Tosafot challenged: on the contrary, we say in Shabbat a Torah scholar should not eat vegetable because it stimulates appetite; and they answered: in Shabbat it deals with raw vegetable, and in Eruvin it means where vegetable is cheap a Torah scholar may dwell there, since it is cheap he can buy vegetable and cook them; and cooked satiates with a light matter — if so, one may not eat on erev Pesach (and perhaps erev Rosh Chodesh too, its law is like vegetable); but Kaf HaChayyim disagrees — Tosafot deals when one wraps bread in it, but vegetable alone, even cooked, does not satiate; and per his view one must say: that which Tosafot did not distinguish — in Shabbat it deals when they ate without bread — Tosafot prefer to establish it per the manner of eating, which is with bread.",

  "magen-avraham/part-001.txt|1:א":
    "<b>From the tenth hour</b> — that is, the fourth part of the day; and if he knows his meal will extend past 9 hours he should not begin even before 9 (Rashi and Rashbam 107, Hagahot Maimoniyot, and Beit Yosef siman 263 in the name of Terumat HaDeshen).",

  "magen-avraham/part-001.txt|1:ב":
    "<b>A little fruit.</b> It appears to me meat and fish are also permitted, for we say in the Gemara: the sun dips in innards — see there in Rashbam's and Rif's explanation.",

  "magen-avraham/part-001.txt|1:ג":
    "<b>Or vegetables.</b> And Tosafot in Eruvin 55b wrote: raw vegetable stimulates appetite, but cooked satiates with a light matter — see there.",

  "magen-avraham/part-001.txt|1:ד":
    "<b>A little he should not drink.</b> And even though it is permitted to drink between cups, as written siman 473 seif 3 — that is because he drinks two cups and whatever he drinks is called \"much\" (Mordechai); but what he drinks before that — since there is an interruption between — is not called \"much\" (Bach — see there); and one must say that two cups drunk before the meal are also called \"much\" and do not [merely] satiate — satiate; and it appears to me originally there is no difficulty, for since it is close to the meal everything is like one eating; but when he interrupts between, the stimulation is sealed — as written siman 291 in the name of Rosh; however it is difficult: why bring proof in the Gemara from permission to drink between cups, etc. — perhaps that case is different, for everything is like one eating; and one may say: in any case when he drinks much it is like one who ate much, who cannot eat more — rather \"much\" stimulates appetite; and it is difficult what proof is brought in the Gemara from permission between cups — perhaps specifically two cups do not satiate; but certainly as I explained in Tur's words, so in the Gemara's words — Rava teaches it is not forbidden to drink from Minchah and upward so as not to lose appetite for matzah; therefore he brings proofs from permission to drink between the first cups, which is before eating matzah; but certainly the more he adds to drink, it is fine as explained; and if so there is no difference in explaining the Gemara between Tosafot and Tur — except Tosafot do not combine the drinking of the cups for one who drinks from Minchah and upward; and for Tur it combines well — and so it is reasonable in my humble opinion; and it is simple this is not included that he should drink so much until he is satiated, for he certainly spoils appetite for food — and common sense testifies to this.",

  "magen-avraham/part-001.txt|2:א":
    "<b>Rich matzah.</b> Meaning kneaded in fruit juice alone; but kneaded in fruit juice with water — one fulfills with it b'dieved; proof from Menachot — if so forbidden to eat it on erev Pesach (Maharal in Gevurat Hashem and Bach); and in the Gemara 38 challenges on this that we say loaves of thanksgiving and nazir wafers one fulfills with them and it is rich matzah; and answers: it is a revi'it and divides into ten large loaves made from seven esronim — and there is no richness; thus it implies if there is much oil even though mixed with water it is rich matzah and even b'dieved one does not fulfill — for otherwise what is the challenge — perhaps the mishnah deals b'dieved one fulfills; rather even b'dieved he does not fulfill; and so appears — for in siman 168 he ruled one does not bless haMotzi on something kneaded in fruit juice; and end of siman 188 there is obligation to eat on Yom Tov a kezayit of bread on which one blesses haMotzi — if so what novelty of the first night of Pesach; rather as Ran wrote chapter 2 of Sukkah: on the day one may eat rich matzah — meaning there is a little oil; if much oil, no; if so at night even if there is a little oil one does not fulfill unless it is a little — little like regarding thanksgiving as explained; and further fruit juice alone does not leaven — if so \"bread of affliction\" is unnecessary — it is simple one does not fulfill with them as siman 453; rather certainly even with water one does not fulfill because of rich matzah — and see Beit Yosef siman 462 in the name of Maggid Mishnah.",

  "magen-avraham/part-001.txt|2:ב":
    "<b>Matzah with which one fulfills.</b> It appears to me doubled and puffed matzah one may not eat on erev Pesach all day, lest it be matzah — see siman 461; and it implies on day 13 matzah is permitted.",

  "magen-avraham/part-001.txt|2:ג":
    "<b>Permitted to feed him.</b> Even though forbidden to feed a minor by hand a prohibited item, as siman 343 — nevertheless something that is only nullification of a positive commandment — permitted to feed by hand, as siman 269; but a minor who knows — forbidden to feed, for \"because of this\" does not apply since he already filled his stomach from it (Terumat HaDeshen); and no difference between male and female minor.",

  "magen-avraham/part-001.txt|2:ד":
    "<b>And kneaded in wine and oil.</b> Even if baked again afterward; but crumbled and cooked — permitted to eat and bless (nevertheless) for it is a pot dish and dissolved (Maharil) — see siman 168 seif 10 and 461 seif 4.",

  "mechaber/part-001.txt|1:main":
    "On erev Pesach, after the tenth hour, it is forbidden to eat bread. And it has 3 seifim: It is forbidden to eat bread from the tenth hour and upward so that one will eat matzah with appetite; however one may eat a little fruit or vegetables, but he should not fill his stomach from them (and if he is istenis such that even eating a little harms his appetite for eating — everything is forbidden) (Rabbeinu Yerucham); and he should not drink a little wine because it satiates; but if he wishes to drink much wine he may drink, because when he drinks much it stimulates appetite for food.",

  "mechaber/part-001.txt|2:main":
    "And before the tenth hour it is permitted to eat rich matzah: {Rama: But matzot with which one fulfills at night are forbidden to eat all day on the fourteenth (Ran chapter Elu Ovrin in the name of Rambam and Maggid chapter 6); and a minor who does not know what is told at night about the Exodus from Egypt — permitted to feed him (Terumat HaDeshen siman 7); and some practice not to eat lettuce on erev Pesach in order to eat maror with appetite (Tashbetz 455 section 3); and similarly on the first day of Pesach in order to eat it on the second night with appetite; and similarly some practice to minimize eating matzah on the first day for this reason (Kol Bo); and some are further stringent not to eat fruits in order to eat charoset with appetite — one need not be concerned with that custom; and some are stringent not to crumble or break matzot on erev Pesach so as not to come to eat from them (Mahariv); and one need not be concerned with this either. Matzah that was baked properly and afterward was crumbled and kneaded in wine and oil is not called rich matzah and is forbidden to eat it on erev Pesach (Mahariv)}.",

  "mechaber/part-001.txt|3:main":
    "If he began eating before the tenth hour and his meal extended until night — his law is like on Shabbatot and other festivals as explained siman 271 seif 6: (and it is a mitzvah to wash and shave on erev Yom Tov and to wear nice garments like Shabbat — see above siman 260 and 262).",
};

Object.assign(T, part2);

// Part 3 - mishnah berurah through end
const part3 = {
  "mishnah-berurah/part-001.txt|1:א":
    "(1) To eat bread — that is, even rich matzah, as below seif 2.",

  "mishnah-berurah/part-001.txt|1:ב":
    "(2) From the tenth hour, etc. — that is, from the beginning of the fourth hour after chatzot; and even if he began eating he stops once the prohibition time began.",

  "mishnah-berurah/part-001.txt|1:ג":
    "(3) A little fruit — and the same applies to meat, fish, eggs, and the like; but from the five species cooked in fruit juice — forbidden, for it satiates.",

  "mishnah-berurah/part-001.txt|1:ד": "(4) Or vegetables — whether raw or cooked.",

  "mishnah-berurah/part-001.txt|1:ה":
    "(5) Istinis who even if he eats a little, etc. — and as above siman 170 seif 3; except istinis there is even if he eats in the morning he cannot eat at night with appetite — here it deals with istenis who if he eats from the third hour onward he again cannot eat at night with appetite.",

  "mishnah-berurah/part-001.txt|1:ו":
    "(6) Because it satiates — and it is reasonable that less than a cup, or at least more than a cup, does not satiate and is permitted.",

  "mishnah-berurah/part-001.txt|1:ז":
    "(7) Much wine, etc. — and two cups of a revi'it or most of it should be considered \"much\" and permitted.",

  "mishnah-berurah/part-001.txt|1:ח":
    "(8) Stimulates, etc. — nevertheless he should not drink so much that he becomes satiated, for he certainly spoils appetite for food and also may become intoxicated and nullify the night's mitzvot.",

  "mishnah-berurah/part-001.txt|2:א":
    "(9) And before the tenth hour, etc. — however if he knows his meal will extend into the tenth hour he should not begin eating even before 9.",

  "mishnah-berurah/part-001.txt|2:ב":
    "(10) Rich matzah — that is, kneaded in fruit juice; therefore permitted to eat since one does not fulfill with this at night, as explained siman 462; and see there in Mishna Berurah that even if kneaded in water and mixed in some fruit juice — also one does not fulfill because of matzah whenever taste of fruit juice is detectable; if so for erev Pesach eating is permitted since it is also rich matzah; and see there in Biur Halacha in the gloss that in these countries we do not knead in fruit juice.",

  "mishnah-berurah/part-001.txt|2:ג":
    "(11) Forbidden to eat — rabbinically so there will be recognition of its eating in the evening (Rambam).",

  "mishnah-berurah/part-001.txt|2:ד":
    "(12) All day 14 — from dawn; and some practice not to eat matzah from Rosh Chodesh. Acharonim wrote puffed or doubled matzah — even though they are stringent to consider it like chametz as siman 461 — nevertheless forbidden to eat from dawn onward, for by essential law it is included in matzah.",

  "mishnah-berurah/part-001.txt|2:ה":
    "(13) Who does not know — but if he has understanding — one may not feed him matzah, for we expound \"and you shall tell your son,\" etc. — \"because of this\" I said only when matzah and maror are placed before you; and if the son already filled his stomach with matzah — \"because of this\" does not apply, for it is not novel for a minor; and no difference between male and female minor.",

  "mishnah-berurah/part-001.txt|2:ו": "(14) Permitted to feed him — all day.",

  "mishnah-berurah/part-001.txt|2:ז":
    "(15) Maror with appetite — and this custom has no reason [Acharonim].",

  "mishnah-berurah/part-001.txt|2:ח":
    "(16) And similarly they practice, etc. on the first day — and from Minchah and upward by law one must be careful all first Yom Tov because it is a doubt of second day Yom Tov Sheni, as Magen Avraham wrote siman 529 seif katan 1.",

  "mishnah-berurah/part-001.txt|2:ט":
    "(17) And one need not be concerned with this either — since one is not accustomed to eat matzah all year.",

  "mishnah-berurah/part-001.txt|2:י":
    "(18) And kneaded, etc. — for without kneading it is obvious it is forbidden, for one fulfills with crumbs at night the obligation of matzah, as we wrote siman 461 seif 4 in Mishna Berurah.",

  "mishnah-berurah/part-001.txt|2:כ":
    "(19) In wine and oil, etc. — whether baked again afterward or not baked and he wishes to eat as it is.",

  "mishnah-berurah/part-001.txt|2:ל":
    "(20) It is not called, etc. — for the name matzah was not nullified by this; nevertheless to fulfill with it at night is not worthwhile per what was explained above siman 168 in Mishna Berurah seif katan 59 — see there; and also concern lest some say this too is included in rich matzah — all this when not cooked; but if cooked, as practiced in our countries to make balls from matzah called knaidelach, or matzah cooked in kli rishon — permitted to eat before the tenth hour, for this certainly is not called matzah, as explained siman 461.",

  "mishnah-berurah/part-001.txt|3:א":
    "(21) If he began eating, etc. — that is, rich matzah; meaning: even though he began in permissibility, nevertheless he must stop and is not permitted to eat except until bein hashemashot; afterward he must wait until it is certainly night, as explained siman 472; and he spreads a cloth on the table and recites kiddush — this is what Mechaber wrote: his law is like Shabbatot, etc.; and per poskim' conclusion there — if he drank wine at the beginning within the meal he need not return to bless on wine, only kiddush alone; afterward he says Haggadah as customary; when he reaches eating he blesses only on eating matzah and not haMotzi, since he is within the meal. [However per our custom that we bless on every cup and cup because each cup is a mitzvah by itself and Chazal enacted a blessing on them — it appears even here one must bless on every cup and cup and is not exempt by what he blessed initially on wine in the meal.] Acharonim wrote: per Rama's custom above siman 443 that we do not practice eating rich matzah even on erev Pesach — the entire core law of Mechaber does not apply at all, for he did not eat bread from the start and one cannot say he began a meal.",

  "mishnah-berurah/part-001.txt|3:ב":
    "(22) To wash — after chatzot he should go to the bathhouse and immerse in honor of the festival; and after Minchah prayer it is proper he occupy himself with laws of the Pesach offering and Hashem considers him as if he fulfilled in practice; and in Shelah he copied from Seder Hayom what every person should study; and one does not comfort a mourner on erev Pesach.",

  "netiv-chayim/part-001.txt|1:_":
    "(Magen Avraham seif katan 4) However it is difficult — NB I omitted it: Tosafot in chapter Arvei Pesachim daf 34 s.v. near — see there.",

  "peri-megadim/part-001.txt|1:_":
    "From the hour — beginning of Arvei Pesachim — see there. Magen Avraham 439 letter 12 in Sukkah — rich matzah does not satiate so much; therefore from the tenth hour specifically, and before permitted — and I answered here. Kaf HaChayyim letter 1 — on this; and I say: for Mechaber a little fruit is permitted but to fill stomach forbidden so he will not eat with appetite — if so he should have emended from chatzot forbidden per those there 107 who were not resolved; Minchah ketanah forbidden — all the more per those [who forbid] five kinds of cooked dish forbidden because they satiate; if so crumbled and cooked matzah permitted all day and from Minchah forbidden — Magen Avraham letter 8 should have emended from chatzot forbidden; and Pri Chadash here — a little fruit and vegetables yes, cooked dish of five species no — and that is for those who practice fruit juice; and for us nevertheless practical difference for sick and elderly in 462, or ground matzah knaidelach forbidden from Minchah and upward — and not so in Magen Avraham letter 8 will be explained. And behold bread forbidden implies even less than kezayit; Pri Chadash in Rokeach siman 280: bread forbidden all day, matzah \"in the evening you shall eat matzot\" and not from erev Pesach like Pesach — and it implies rabbinically; Pri Chadash concluded it is only rabbinically from Yerushalmi reason: like one who comes upon his betrothed in his father-in-law's house without seven blessings; Mahariv siman 193 68a counts: kiddush, asher ga'alanu, wine, second cup, haMotzi, matzah eating — seven; shehecheyanu not counted since said even in market; blessing of dipping one — obligation for children; per Rosh who does not bless second cup — perhaps counts asher ga'alanu as two blessings beginning and end — see there; and see Perishah and similar. Levush counts: and 107, wine, first, haMotzi, matzah; see Olat Shabbat; and I say: then extra asher ga'alanu and second cup for us; and one may say included in two hundred maneh — and I answered; and Peri Megadim z\"l chapter 6 Choshen Mishpat 12 lashes rabbinical stripes. And apparently on night 15 without blessing too like bride without blessing; however per Bach Even HaEzer 55 letter 1 to R' Moshe z\"l — bride without blessing means chuppah — if so at night one may say no rabbinical stripes per Mordechai there — appears from blessing reason — see there. And if he ate half a kezayit matzah on erev Pesach whether rabbinical stripes — I explained in Sefer Shoshanat HaAmakim in the chapter on rabbinical stripes; and practical difference for disqualification of testimony rabbinically as written at length. Peri Megadim chapter 6 law 12 that there be recognition of its eating — implies even less than kezayit apparently — and requires study.",

  "peri-megadim/part-001.txt|2:א":
    "And wine — Tosafot Berachot 35b s.v. much wrote forbidden to drink before night a little wine, only much; and Tur holds Gemara explanation: porta satiates — little wine per Tosafot; but holds before night one may drink little wine since he will drink two cups before matzah — they combine and it is much wine and stimulates; Tosafot hold what he drinks little before night does not combine with two cups at night and satiates and is forbidden; but between cups even little permitted, for it combines with two cups and is much and stimulates. On this he brings proof from Rava who brings proof between cups one drinks — thus stimulates; perhaps the reverse — specifically little stimulates and much satiates — how drink much on erev Pesach all the days of Pesach; and if you know this reasoning and sense that much stimulates and little satiates — between cups even little is much — no need for proof; see Magen Avraham 4 — rather we learn Rava teaches: proof — wine, whatever he drinks much stimulates — for otherwise why permit drinking between cups — better to minimize wine drinking to eat matzah with appetite — we learn much stimulates; and between cups little is also much; two cups likewise — from Minchah and upward little with two cups combine and become much; and he does not find reasonable Tosafot's distinction between near or far; and I answered 4; and one may say there he challenges similar to bread that little satiates — wine is not so; and one may say on erev Pesach.",

  "peri-megadim/part-001.txt|2:ב":
    "What Mishna Berurah wrote in gloss \"and some say\" not to eat lettuce, etc. — certainly eating maror we require it be fit for eating, even though we mention \"they embittered their lives\" — see Olat Shabbat; and from it vegetables not fit for eating at all — obviously no blessing; and I say 18; and not so siman 473 will be explained. Charoset — for appetite, for mitzvah to dip and shake. Permitted to crumble matzah on erev Pesach — siman 462 in Magen Avraham 6 and Pri Chadash there: matzah rabbinically — we do not decree specifically on Torah prohibition; Mahariv implies there forbids even rabbinically; but one who fasted on erev Pesach such — they did not decree; and not so will be further explained.",

  "rabbi-akiva-eiger/part-001.txt|1:_":
    "(Magen Avraham seif katan 5) that they are obligated haMotzi on it — if so. Afterward the Gaon z\"l wrote in his book Mishnat Derech Eretz to reject: practical difference — if he filled his stomach with non-Jewish pastries he fulfills a meal but not matzah.",

  "rabbi-akiva-eiger/part-001.txt|2:_":
    "There in one opinion: much oil — no blessing — this is not necessary; one may say eating established measure for which we bless haMotzi.",

  "rabbi-akiva-eiger/part-001.txt|3:_":
    "(Magen Avraham seif katan 8) but crumbled — apparently even not crumbled: though not called cooking and we bless haMotzi — nevertheless one does not fulfill matzah with this, for taste of matzah is required; if so one may say permitted to eat on erev Pesach.",

  "shaarei-teshuvah/part-001.txt|1:_":
    "And wine a little, etc. — see Tur, Beit Yosef, and Taz; and see in Rav Meshulam page 4d from the Gaon Chafetz Tzaddik z\"l to settle Tur: since in the end he will drink two full cups beforehand, it is \"much\" — see there.",

  "shaarei-teshuvah/part-001.txt|2:_":
    "Seif 2 in gloss to minimize eating matzah on the first day, etc. — and he wrote in Igrot HaRemez regarding third meal on Pesach when first day falls on Shabbat — and you might ask: for us better it is like erev Pesach because of doubt of second day Yom Tov Sheni; nevertheless he should eat some little fruit for measure of blessing and not much, because of mitzvah of eating matzah with appetite on second festival night — see there; and it appears one who never nullifies making third meal with bread — permitted and should eat a little; also should see to precede himself — see above siman 443.",

  "turei-zahav/part-001.txt|1:א":
    "<b>From the tenth hour.</b> In the mishnah it says near Minchah — meaning Minchah ketanah is from 9 and a half hours; and near it means half an hour before it.",

  "turei-zahav/part-001.txt|1:ב":
    "<b>And wine — a little he should not drink.</b> In the Gemara: a little satiates — satiates; much stimulates appetite; and so Beit Yosef and Tosafot; but Tur wrote wine is permitted to drink whether much or little because it stimulates appetite for food; and Beit Yosef challenged Tur from the Gemara and many strain to answer that Tur explains the Gemara thus: it teaches little satiates — meaning what satiates is little; but what stimulates is much — meaning two measures in wine: one that satiates little, two that stimulates much for food; but we do not find this explanation acceptable, for impossible to say these two measures together, for satiating and stimulating are opposites; rather we find Tur's view also like Tosafot — certainly when he drinks little he satiates and fills and does not stimulate; and much stimulates and does not [merely] satiate; but Tur's view on Pesach night he will necessarily drink much, for he drinks two cups before eating; and from each a revi'it or at least most — therefore he may drink before night what he wishes; and Tur did not come to inform except that one should not err to think one must beware not to drink more than two cups, for whatever he adds harms appetite for food — therefore he informs us: on the contrary, whatever he adds beyond the cups there is no loss of appetite; rather he stimulates more in what he adds; therefore he may drink from Minchah and upward what he wishes; and whatever he adds adds appetite for matzah; and this is very intended in the sugya of erev Pesach — Rava drinks wine all the days of Pesach; and he learns from what is said between these two cups one drinks; and if you say it satiates — satiates — behold he eats matzah coarsely; and it is difficult how he learns all day from between cups — perhaps specifically two cups do not satiate; but certainly as I explained in Tur's words, so in Gemara's words — Rava teaches it is not forbidden to drink from Minchah and upward so as not to lose appetite for matzah; therefore he brings proofs from permission to drink between the first cups, which is before eating matzah; but certainly the more he adds to drink it is fine as explained; and if so there is no difference in Gemara explanation between Tosafot and Tur — except Tosafot do not combine cup-drinking for one who drinks from Minchah and upward; and for Tur it combines well — and so is reasonable in my humble opinion; and it is simple this is not included that he drink so much until satiated, for he certainly spoils appetite for food — and common sense testifies to this.",

  "yad-ephraim/part-001.txt|1:_":
    "<b>In Taz seif katan 2</b> he may drink before night what he wishes, etc. — it appears his intent: in truth that which Rava needed in the Talmud and so poskim to inform us it is permitted to drink wine on erev Pesach — apparently an obvious matter, for Chazal enacted to drink two cups before eating matzah; and therefore wine does not harm appetite for food; and therefore one might have thought it is forbidden; and that they permitted two cups — two views to distinguish: either we say specifically near the meal they permitted because it is considered one eating, as Magen Avraham seif katan 4; but before night where there is interruption between drinking and eating — forbidden, and he informs nevertheless permitted; or we say certainly no difference between near eating or not — only initial thought that specifically two cups do not spoil food appetite but more than that which spoils food appetite is forbidden, and he informs not so. And behold if we say initial thought to distinguish near eating or not and he informs no difference — it is difficult: whence in truth no difference — perhaps well to distinguish between them; and that Rava drinks on the days of Pesach — that is much specifically; but porta forbidden on erev Pesach, for drinking of two cups near eating does not combine with drinking not near eating; if so how did Tur rule to permit porta — therefore Taz wrote Tur did not come to inform except all mean: certainly simple reasoning for Tur there is no difference between near eating or not — only came to inform us also more than two cups there is no loss of appetite; and if so no distinction between much and little even on erev Pesach; therefore he wrote this is intended in the sugya; and difficult how he learns, etc. — perhaps specifically between cups does not satiate, etc. — as should be; and meaning: if you say drinking before eating does not combine with drinking near eating — then he does not challenge at all; one may say specifically between cups does not satiate, unlike all day which is far from eating — and this is also Magen Avraham seif katan 4's difficulty; but certainly as I explained all mean: on this no proof is needed — certainly not reasonable for the Talmud to distinguish thus; only core proof is even if he adds to drinking it is fine; and if so no distinction between near eating or not; and if so no distinction in this — Tur ruled well that even porta is permitted, as we find.",

  "yad-ephraim/part-001.txt|2:_":
    "<b>There in Magen Avraham seif katan 5</b> as regarding thanksgiving as explained; and if there is much oil — otherwise proven one does not fulfill — we minimize from \"bread of affliction\" except dough kneaded in oil and honey; and Tosafot wrote on fruit juice — and this is Rabbenu Tam's explanation: fruit juice alone, etc.",
};

Object.assign(T, part3);

// chok-yaakov long blocks - part 2 extension
const chok = {
  "chok-yaakov/part-001.txt|1:א":
    "<b>From the tenth hour and upward.</b> That is, immediately after 9 hours — the fourth part of the day — for at 9 and a half hours is Minchah ketanah time; and at the beginning of Arvei Pesachim it says near Minchah one may not eat — meaning near Minchah ketanah, as the Talmud concludes there 107b; and so is agreement of Rif, Rambam, Rosh, Tur, and all other poskim; however Ran — even though at the beginning of the mishnah he also explains thus — nevertheless at the end wrote one should be stringent from Minchah gedolah time — from six and upward; and so Maharil laws of Shabbat HaGadol; and see Shachnahag who extended to reject and settle the sugya per Ran; and see above siman 439; and the rabbi's brother-in-law in Sa'az siman 111 also extended to be stringent — see there. <b>And regarding</b> practical law — the rabbi ruled below siman 439 seif 3 in gloss on erev Sukkot: one may not eat from chatzot onward so he eats in the sukkah with appetite — similar to eating matzah — Maharil — end of his words; and here he ruled plainly per Mechaber on erev Pesach from the tenth hour itself; and Acharonim already wondered on this and wish to reject and distinguish: this case is different, since one can eat only rich matzah which does not satiate so much — and this is only prophetic words — whence this distinction, for Maharil said similar to eating matzah; and on the contrary Maharil in responsum 99 wrote: more must be stringent on erev Pesach because one must hurry for the children and afikoman to eat before chatzot — therefore one may not eat rich matzah for third meal after Minchah, unlike other Yom Tov and Shabbat where they wait much until dark — end of his words; and further per this — what does the Talmud challenge at the beginning of erev Pesach: a person may not eat from Minchah and upward — what relevance to erev Pesach, even erev Shabbat and Yom Tov too, lest for inclusiveness he mentioned erev Pesach, even though he eats rich matzah that does not satiate so much; and in truth per Tosafot there s.v. what relevance — possible to settle this difficulty — see there; however regarding the core wonder that Acharonim wonder on the rabbi who omitted Maharil's words here — it appears simple: for practical difference, and the rabbi did well, for kinds of side dishes are permitted to eat as plain in Talmud and all poskim — only bread is forbidden — rich matzah; chametz in any case forbidden all day — and so Maharil explicitly in laws Shabbat HaGadol; and since the rabbi already ruled above siman 443 and 462 that we do not practice eating rich matzah at all — if so to what need would the rabbi rule here like Maharil not to eat from chatzot, for chametz and matzah in any case forbidden all day and rich matzah we do not practice eating at all; only on erev Sukkot where bread may be eaten he needed to write it. <b>And kinds of</b> side dishes in every case permitted whether on erev Pesach or on erev Shabbat, as plain in Talmud and all poskim — and so Maharil himself intended this answer; also the excellent R' Wolf Segal Horowitz dayan n\"r\"w intended this — clear and correct without any doubt; however in Kol Bo siman 49 he wrote kinds of side dishes forbidden from Minchah ketanah — from tenth hour upward — and it is astounding against Talmud and all poskim; possible to reject and settle sugya per Talmud and answer what Acharonim challenged on Ran and Maharil; also possible to settle several difficulties Tosafot challenged in first chapter erev Pesach — see there; but meaning of all poskim is not so — requires study.",

  "chok-yaakov/part-001.txt|1:ב":
    "<b>A little fruit or vegetables.</b> Tur wrote kinds of cooked dish — his intent is per Rosh's explanation of targum language in Talmud — kinds of cooked dishes; not like Rashbam's explanation — fruits; but nevertheless for law they do not argue — permitted to eat everything except bread — rich matzah; and so Tur's language implies; and not like Beit Yosef who wrote Tur argues with Rosh — in truth there is no dispute at all; and so explicit in Rosh's abbreviated rulings — see there; and so most poskim — only bread forbidden; and explicit from Tosafot and Rosh beginning chapter erev Pesach on what they challenged: why not eat on erev Pesach — and this is Kol Bo siman 49: kinds of targum — such as fruits, vegetables, legumes, meat, cheese, eggs, and similar — end of his words; and already explained above we practice prohibition on legumes; also cooked dish of five species that Beit Yosef wrote in Rosh's name must be with fruit juice — and we practice prohibition on all this as explained above siman 443.",

  "chok-yaakov/part-001.txt|1:ג":
    "<b>Or vegetables.</b> Magen Avraham wrote: and Tosafot in Eruvin 55b wrote raw vegetable stimulates but cooked satiates with light matter — end of his words; but in truth no proof from there at all; one who examines there — it refers to fixed manner of eating — wrapping bread in it; but vegetable alone permitted whether raw or cooked, as plain meaning of poskim' sealed language.",

  "chok-yaakov/part-001.txt|1:ד":
    "<b>Much wine he drinks.</b> Tur permits drinking even a little wine; and see Beit Yosef how he labored to settle Talmud per him; and see Bach and Taz who explained another matter; nevertheless core is to be stringent per Shulchan Aruch; and so Bach; and in any case he should not drink excessively, for thereby appetite for eating is blunted — and so Taz; and see above siman 477.",

  "chok-yaakov/part-001.txt|2:א":
    "<b>Rich matzah.</b> And if kneaded in fruit juice with water — also rich matzah and one does not fulfill; and so Magen Avraham raised; and I made support for his words in siman 462 seif katan 2 — see there — in what matter fruit juice is nullified within water. <b>And he wrote</b> further in Magen Avraham: puffed and doubled matzah one may not eat on erev Pesach all day, lest it be matzah — end of his words; and see above siman 461.",

  "chok-yaakov/part-001.txt|2:ב":
    "<b>Forbidden to eat.</b> Yerushalmi: whoever eats matzah on erev Pesach is like one who comes upon his betrothed, etc. <b>And the reason</b> Levush wrote: he compares to betrothed — as one who lies with betrothed shows greatness of his desire that he is ardent and flooded with passion, unable to restrain until entering chuppah where they bless seven blessings; so one who eats matzah on erev Pesach shows gluttony, unable to wait for matzah eating until night when they bless seven blessings; and so Kol Bo; Mahariv: <b>And he wrote</b> Mahariv siman 193: seven blessings of matzah are these — wine, kiddush, asher ga'alanu, wine, second cup, haMotzi, matzah eating — behold seven blessings; shehecheyanu not counted since said even in market; blessing of dipping also not counted — its obligation is for children; per Eshel Avraham who does not bless second cup — perhaps counts asher ga'alanu as two blessings; Hallel blessing not counted even for those who bless, since some places do not say on the table — end of his words; in Shlah siman 59 and in Tosefta: time enters, dipping, and asher ga'alanu and second cup removed — because impossible he did not wash hands in his daytime eating — end; even though haMotzi blessing counted — also impossible they did not bless haMotzi in daytime when he ate — it appears because he does not bless when eating matzah by day when forbidden, and forbidden to bless on eating prohibition, as explained above siman 496 — see there; asher ga'alanu not counted because not in topic of eating and drinking; Levush also omitted asher ga'alanu and wine blessing of second cup; and one must say there wine blessing is one matter; and in my humble opinion all these strains are unnecessary, even though here are more than seven blessings — nevertheless he says seven blessings to compare and equate to seven blessings of betrothed — even though here more, nevertheless seven blessings are included, as two hundred maneh are included — and understand.",

  "chok-yaakov/part-001.txt|2:ג":
    "<b>Day 14.</b> But on night 14 permitted — and so explicit in Ran chapter Aleph Ovrin; and so Yerushalmi and poskim imply; and Bach; and not like Magen Avraham implies; and so rabbi's brother-in-law in Sa'az; and in Shachnahag wrote many in Konstantina practice not to eat matzah from Rosh Chodesh (from Rosh Chodesh).",

  "chok-yaakov/part-001.txt|2:ד":
    "<b>That he not come to eat from them.</b> Since one occupies himself with it — as R' Yehudah was concerned regarding chametz and Rabbanan regarding new grain — end of his words Maharil; and nevertheless the rabbi ruled one need not be concerned, for we do not compare to new grain and chametz where we are concerned for Torah prohibition, unlike eating matzah on erev Pesach which is only rabbinic prohibition (see Maharil siman 99); also not accustomed all year — we are not concerned he will come to eat from it — and understand.",

  "chok-yaakov/part-001.txt|2:ה":
    "<b>And afterward it was crumbled and kneaded in wine and oil.</b> But if not kneaded in wine and oil — even if he did not return to knead and bake, only ate thus — he fulfills at night if he eats a kezayit from it, as in Talmud Berachot 37b — see there; and not comparable to soaked and dissolved matzah that he ruled above siman 461 one does not fulfill — that case is different, since soaked so much until dissolved it is as if the substance of the piece departed — unlike crumbled by hand; and such is explained above siman 169 regarding blessing — see there.",

  "chok-yaakov/part-001.txt|2:ו":
    "<b>It is not called rich matzah and forbidden to eat on erev Pesach.</b> And if so it implies one fulfills with it at night, since it is not called rich matzah; and per rabbi's language at the head of this gloss — specifically matzah with which one fulfills is forbidden to eat; however Maharil laws Shabbat HaGadol left the matter in doubt — rich matzah on erev Pesach; and if cooked — explained above siman 461 one does not fulfill and permitted to eat on erev Pesach; and so Acharonim agree.",

  "chok-yaakov/part-001.txt|3:א":
    "<b>Like on Shabbatot.</b> Meaning he spreads cloth and recites kiddush and does not bless wine blessing; also haMotzi per Taz's conclusion above siman 271 seif katan 4; and it deals when he already ate bread and blessed haMotzi — this does not apply to us who practice prohibition to eat bread even in rich matzah; if so this law does not apply unless he ate from permissibility time chametz until the day was sanctified.",

  "chok-yaakov/part-001.txt|3:ב":
    "<b>And to shave on erev Yom Tov.</b> See above siman 468.",

  "chokhmat-shlomo/part-001.txt|1:_":
    "<b>Seif 1 — forbidden to eat bread from the tenth hour, etc.</b> NB: it appears what Rama permits to eat cooked matzah is if less than kezayit — then since cooking nullifies from bread category and there is also no kezayit — therefore all agree one does not fulfill; unless they are large that each has kezayit alone — then we do not require bread character; if so perhaps one fulfills — therefore not permitted to eat all day; and understand; so it appears correct to me.",
};

Object.assign(T, chok);

const keys = hand.items.map((it) => `${it.rel}|${it.key}`);
const miss = keys.filter((k) => !T[k]);
if (miss.length) {
  console.error("Missing translations:", miss);
  process.exit(1);
}

const lines = [
  "/** worker-slot-12 — siman 471 editorial EN (106 blocks) */",
  "export const EN = {",
];
for (const k of keys) {
  lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(T[k])},`);
}
lines.push("};", "");
const out = path.join(__dirname, "_hand-en-471-slot12.mjs");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log("wrote", out, keys.length, "keys");
