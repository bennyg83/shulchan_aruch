#!/usr/bin/env node
/** worker slot 3 — siman 409 part 1 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PREFLIGHT_RISK = [
  /Lord's Prayer/i,
  /Hashem's Word/i,
  /\bstrike in\b/i,
  /\bthere in the\b/i,
  /According to the/i,
  /\bthe craft\b/i,
  /\bher age\b/i,
  /\bSaturday\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\brape\b/i,
];

const fixes = {
  "output/siman_409/mechaber/part-001.txt": {
    "1:main":
      "Laws of where the eruv is placed. Contains 13 seifim. One who places his eruv in a cemetery — it is not a valid eruv, since a cemetery is forbidden in benefit, and since he wants the eruv to remain there after acquisition he is thereby benefiting from it. If he placed it in a beit hapras, it is a valid eruv, even for a priest, since he can enter there in a floating chest or by blowing the ground as he walks.",
    "2:main":
      "He and his eruv must be in one domain so that it is possible for him to eat it during bein hashemashot. Therefore if he intended to spend Shabbat in a public domain and placed his eruv in a private domain, or intended to spend Shabbat in a private domain and placed his eruv in a public domain — it is not a valid eruv, since he cannot carry from a private domain to a public domain during bein hashemashot except through a transgression. But if he intended to spend Shabbat in a private domain or public domain and placed his eruv in a karmelit, or intended to spend Shabbat in a karmelit and placed his eruv in a private domain or public domain — it is a valid eruv, since during bein hashemashot when the eruv is acquired it is permitted to carry between either of those two domains and a karmelit for a matter of mitzva, as anything d'rabbanan was not decreed upon during bein hashemashot in a case of mitzva or pressing need.",
    "3:main":
      "If he placed it on top of a reed or giant reed growing from the ground — it is not a valid eruv, since being soft and easy to snap one would be liable for a sin-offering, and they decreed regarding them even during bein hashemashot and even in a case of mitzva. If they were detached and stuck into the ground, it is a valid eruv. {Rama: (and if they are as soft as a vegetable, see above at the beginning of siman 336)}",
    "4:main":
      "If he placed it in a tower and locked it and the key was lost before Shabbat, or a rockslide fell upon it — if he can retrieve it without performing a d'oraisa prohibited melacha, it is a valid eruv.",
    "5:main":
      "Whoever places his eruv in a place has four cubits at the place of his eruv. Therefore one who places his eruv techumin at the end of his techum and it rolled within four cubits — it is a valid eruv. If it rolled beyond four cubits, it is not a valid eruv.",
    "6:main":
      "If his eruv was lost, burned, or if it was at the end of the techum and rolled beyond four cubits, or if it was terumah and became impure before nightfall — it is not a valid eruv. If it happened after nightfall — it is a valid eruv, since eruv acquisition occurs at bein hashemashot. If there is doubt, it is valid, as a doubtful eruv is valid — provided it had a presumption of validity, such as this case where he placed it there and a doubt arose. But if it had no presumption of validity — such as doubt whether it was placed there at all — no.",
    "7:main":
      "How is an eruv made? If one wishes to go to the end of the techum or within it and let nightfall find him there — this is the primary way of fulfilling the mitzva. Even if he did not say \"my Shabbat rest is in my place\" but simply let nightfall find him there and said nothing — whether one who goes out from his house to let nightfall find him at the techum, or one who was traveling and nightfall came upon him — he acquires two thousand cubits without any declaration. If he does not wish to trouble himself to be there at nightfall, he may go while it is still day and place there food for two meals — each person per his food requirement; if he is ill or a large eater, the measure is two average meals which is six eggs' worth of bread (see above siman 368 seif 3). Or any item used for partnership of alleyways. If it is a relish, enough to eat with it two meals suffices. He then says \"through this eruv I will be permitted to walk two thousand cubits tomorrow,\" and returns and sleeps in his house. Even so, his techum is measured from the place of his eruv, since we consider him as if he dwells there. But students who eat by householders whose homes are in the field and return to sleep in their teacher's house — their techum is measured from their teacher's house, which is their sleeping place and their primary location, since that is where they would want to eat as well if their food were there. {Rama: (see above siman 368 seif 3, or any food used for partnership of alleyways)}",
    "8:main":
      "If he wishes, he may send the eruv through an agent and say \"through this eruv so-and-so shall be permitted to walk\" — provided the agent is not deaf-mute, imbecile, or minor, or one who does not believe in the eruv. If he sent it through a deaf-mute, imbecile, minor, non-Jew, or one who does not believe in the eruv — it is not a valid eruv. But if he told another to receive it from the agent and sent it through one of these — even if he sent it by elephant or monkey and saw from a distance that it arrived and was given to the receiver — it is a valid eruv, even if he did not see the other person place it, since we presume an agent carries out his mission. Similarly, many who made a partnership eruv techumin and wished to send their eruv through another may do so.",
    "9:main":
      "If one person or many said to someone \"go and make an eruv for us\" and he made it for them in whichever direction he chose — it is a valid eruv and they may use it, since they did not specify a direction for him.",
    "10:main":
      "If one said to his fellow \"make an eruv for me with dates\" and he made it with dried figs; with dried figs and he made it with dates; \"place my eruv in the tower\" and he placed it in the dovecote; \"in the dovecote\" and he placed it in the tower; \"in the house\" and he placed it in the upper story; \"in the upper story\" and he placed it in the house — it is not a valid eruv. But if he said \"make an eruv for me\" without specification and he made it — whether with dried figs or dates, whether in the house or upper story — it is a valid eruv.",
    "11:main":
      "One who was traveling and recognized a tree or fence at the end of two thousand cubits and feared nightfall might come before he arrived there, and said \"my Shabbat rest is beneath it at its base\" — he acquires shevitah at its base and has two thousand cubits from there, even if he cannot reach there before nightfall at a normal walking pace unless he runs. He is permitted to go there at a normal pace even if he does not arrive before nightfall. But if he could not reach there at all before nightfall, he may not move from his place, since he uprooted his intention from here and did not acquire there either. This applies specifically when he specified four cubits that are within two thousand cubits — such as saying \"my Shabbat rest is at its base\" and the distance from here to its base is no more than two thousand. But if the entire tree is not within two thousand cubits and he did not specify a place beneath it, he has not acquired shevitah — since perhaps he had in mind four cubits that are beyond two thousand — and here too he has not acquired, since he uprooted his intention from here, and he may not move from his place. If the entire tree stands within two thousand cubits and he did not specify his shevitah location — such as saying \"my Shabbat rest is beneath it\" — he has four thousand cubits from his location toward the tree, minus the measure of the tree's spread beneath it; for example if the tree's spread is twenty cubits, he has two thousand minus twenty cubits there. Per Rambam, one who acquires shevitah at a distant place without specifying his shevitah location has not acquired shevitah there but only at the place where he was standing when nightfall came. Similarly if he said \"my Shabbat rest is in such-and-such place\" and it is more than two thousand cubits away, he acquires shevitah at his own location. One who says \"my Shabbat rest is beneath such-and-such tree\" — if the area beneath it is eight cubits or more, he has not acquired shevitah since he did not specify his shevitah location; therefore he must intend to rest at its base or within four cubits to its north or south. If the area beneath it is less than eight cubits and he intended to rest beneath it, he has acquired shevitah since his location is at least partially specified. The Rif rules similarly.",
    "12:main":
      "If there were two people, one who recognizes the place and one who does not — the one who does not recognize it entrusts his shevitah to the one who does and says \"our Shabbat rest is in such-and-such place.\"",
    "13:main":
      "This leniency was permitted only for one coming on the road, but not for one who is at home. If he said so, it does not count for him and he has only the shevitah of his home.",
  },
  "output/siman_409/turei-zahav/part-001.txt": {
    "1:_":
      "In a beit hapras. This is a field in which a grave was plowed and its impurity is d'rabbanan; on this he said it is possible to blow the dust if there is a bone the size of a barley grain and walk by blowing.",
    "2:_":
      "They did not decree upon it during bein hashemashot. See siman 394 what is astonishing about Tur from this — in what is written there, if the key was lost in a field his eruv is not valid, yet carrying in a field is forbidden only d'rabbanan since it is a karmelit; one cannot distinguish that here in eruv techumin it is for a mitzvah matter, for one makes eruv techumin only for a mitzvah — which is not so above regarding eruv chatzerot where one may make eruv even for discretionary matters; if so there is no mitzva in his eruv here, therefore they decreed even during bein hashemashot — this is not so, for in siman 395 it is written it is a mitzva to check eruv chatzerot, etc.",
    "3:_":
      "Because they are soft and easy to snap — we are concerned lest he snap them. And even though for all other shevut they did not decree during bein hashemashot, nevertheless here they were concerned since they are easy to snap.",
    "5:א":
      "Within four cubits — it is a valid eruv. Beit Yosef asked: we learned one who went out beyond the techum, even one cubit, may not enter as written siman 405 — why here even if he went out four cubits less than a hairbreadth it is permitted? One may say: per the view there, since he intended to dwell in the city it is considered for him as four cubits and he has no other four cubits; but here, since he wishes to uproot his dwelling from the city, it is fitting to give him four cubits where he places his eruv, for there is his home — end; and Tur explained well. But Maharshal answered: this case is different because it rolled unknowingly and it is as one who went out unknowingly who has four cubits, as explained siman 406 — this is not per Tur's reason here that within four cubits is valid because whoever places his eruv has four cubits and they are considered for him within the techum — end; and if per the reason of going out unknowingly, it is not within the techum at all but only four cubits alone; per this it appears that even if he transgressed intentionally and it rolled beyond the techum within four cubits he did not lose his eruv.",
    "5:ב":
      "Beyond four cubits — it is not a valid eruv. And they said: techumin are d'rabbanan and for shevut they did not decree during bein hashemashot as Tosafot answered above — since if he acquired shevitah where the eruv rolled he would now stand beyond the techum and have only four cubits, therefore the Sages enacted that it is not an eruv unless it is within the techum.",
    "6:_":
      "But if he had no presumption of validity. Yoreh Deah siman 69 writes regarding meat that was cooked and there is doubt whether it was salted first — it is permitted; seemingly one may compare to here where there is doubt whether he placed an eruv or not — forbidden since there is no presumption of validity; but I wrote there a reason because we follow the majority who salt first and majority is preferable to presumption — which is not so here where the majority does not contradict the presumption that he did not make eruv and his techum is from his house; therefore we go stringently even in doubt regarding techumin which are d'rabbanan; and see what I wrote siman 422 — another proof for this.",
    "7:א":
      "Two meals each, etc. Tur writes two meals each according to his food — for an ill person and a large eater the measure is two average meals, etc.; Beit Yosef explained thus: each according to his food for an ill person, but a large eater — the measure is two average meals. This explanation is very astonishing — shall we estimate for each per the food of the ill alone? And the reading here in Shulchan Aruch is most astonishing since it equates ill with large eater; the essence is there is a lack per the view of one authority — it should read two meals for each and each, and afterward he explains the measure how much are the two meals, and said per his food for an ill person but a large eater suffices with average — meaning like another average person; all to be lenient; so too in Hagahot and he mentioned there an elder regarding ill; so too must be read here.",
    "7:ב":
      "Which are six eggs. Tur writes eight eggs and Beit Yosef elaborated this is not per those who hold even in a leprous house the measure of a meal is four eggs; nevertheless for eruv they do not argue at all; therefore he emended that it should read five eggs and more, and ruled like Rabbi Shimon, etc.; in my humble opinion since we came to emend we should emend per Tur's words in Hagahot that they are six eggs — namely like R' Yehuda ben Bava; it appears to me he learned thus from Raosh bringing Rif's words who wrote therefore when there are eight meals to receive, etc. — this is per R' Yehuda ben Bava, for per Rabbi Shimon there would be nine; why did he rule in Hagahot the measure of six eggs? So Tur should be emended and so Rambam as brought here in Shulchan Aruch; if so those eighteen dried figs mentioned in siman 368 in Tur are the measure of six eggs.",
    "8:_":
      "And if he said to another to receive it from him and sent it through one of these. The wording is slightly imprecise — it should read: and if he sent it through one of these and said to another to receive it from one of these; and it discusses when he saw that that one of these gave it to that other — it is a valid eruv.",
  },
};

// Continued in part 2 - append remaining fixes
const fixes2 = {
  "output/siman_409/magen-avraham/part-001.txt": {
    "1:א":
      "Forbidden in benefit. It should read: it discusses a built grave; but if he placed it in ground of a cemetery it is permitted, for eternal ground is not forbidden as written Yoreh Deah siman 364.",
    "1:ב":
      "After acquisition. For at the time of acquisition he makes eruv for a mitzvah matter, and mitzvot were not given for benefit.",
    "1:ג":
      "In a beit hapras. This is a field in which a grave was plowed and we are concerned perhaps a bone the size of a barley grain lies there.",
    "1:ד":
      "Priest. And even though the eruv becomes impure and he is forbidden to eat it, nevertheless it is fit for an Israelite.",
    "1:ה":
      "In a tower. This is a large box one cubit by one cubit, three cubits high, and they carry it on animals; he can take the eruv in plain wooden vessels without a handbreadth width and bring it to himself — see Tosafot there.",
    "1:ו":
      "He blows with his mouth. And if there is a bone the size of a barley grain there, he must see it.",
    "3:א":
      "And he would be liable for a sin-offering. The same when he places his eruv in a public domain distant eight cubits from his shevitah — they do not permit him to bring it less than four cubits since it is possible to come to liability for a sin-offering (see Tosafot).",
    "3:ב":
      "It is a valid eruv. Provided the acquisition place is not four handbreadths wide.",
    "6:_":
      "Doubtful validity. One who made eruv with doubtfully terefah food — it is not an eruv, for it requires a meal fit for eating; so too in the Gemara regarding terumah.",
    "7:א":
      "To let nightfall find him there. Meaning his intent was to acquire shevitah there; but in any event he did not acquire shevitah except in his house.",
    "7:ב":
      "Per his food. If he is ill or a large eater, his measure, etc. — so it should read, and so Tur, Beit Yosef, and Bach.",
    "7:ג":
      "Any item they partner in. Nevertheless one who swore not to benefit from bread — one may make eruv, for one makes eruv only for a mitzvah and mitzvot were not given for benefit; and see siman 386 seif 8.",
    "7:ד":
      "As if he dwells there. For we are witnesses that if he had a place to dwell there he would dwell there (Gemara).",
    "7:ה":
      "Since there they would want. So too shepherds who sleep in the field follow their sleeping place since there too they would want to eat; so too harvesters and fruit guards (Gemara 73b and Raosh).",
    "8:א":
      "And a minor. Per Rashi's explanation the reason is because a minor is not capable of acquiring shevitah; and even if he stands and sees him place it there it does not help — unlike eruv chatzerot where no declaration is needed and a minor suffices, as siman 366 seif 3; so Rif regarding a non-Jew — even if he found the eruv there perhaps he did not place it there intending to make eruv with it — end.",
    "8:ב":
      "And he saw from afar. For otherwise we are concerned perhaps it did not reach him, since eruv techumin they relied on a verse and are stringent and the Sages did not trust them; and even though regarding chametz inspection they are trusted as siman 437 — that is in their own house where responsibility falls on them; but regarding agency one may say we are concerned; and in Yerushalmi too they distinguish between \"go and make eruv\" and \"go and make eruv for yourself\" (Tosafot); and from the fact Poskim are silent it implies that for agency in every matter they are not trusted — requires study.",
    "8:ג":
      "For we presume an agent carries out his mission. Even for a d'oraisa prohibition, such as when there is a stumbling block for the sender if he does not carry out his mission — as here; but one who tells his agent \"go and separate terumah\" and he found terumah — there is no presumption it is terumah, for the agent is not concerned to separate terumah unless he finds the terumah by the pile the sender will know it is not terumah; if so we are concerned the agent did not separate terumah and another person separated terumah (Tosafot, Raosh, Hagahot, responsum of Maharam siman 380, responsum of Meimoni Laws of Acquisition siman 23) — requires study, for in Yoreh Deah siman 331 s.k. 434 it is written if he found the pile terumah we say the agent separated terumah — for this is not like R' Nachman in Chullin as Tosafot wrote there — requires study; if we knew he carried out his mission only there is doubt whether the agent changed — we say certainly he did not change (R' Betzalel siman 29/27).",
    "9:_":
      "In whichever direction he wishes. For in d'rabbanan matters we hold there is retrospective clarification.",
    "10:_":
      "With dates. Even if he commanded the agent to make eruv from his own food — it is a strict requirement and not a valid eruv (Maharam).",
    "11:א":
      "The entire tree is not within the two thousand. It appears if there are three cubits beyond the two thousand it is permitted, for in any event part of his place is within two thousand — as written at the end of the seif.",
    "11:ב":
      "He uprooted his intention from here. See siman 411 and see there — not \"see there\" literally; see Magen Avraham there.",
  },
  "output/siman_409/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 36, and per the first tanna; and even for an Israelite — Rambam chapter 6 Laws of Eruvin from conclusion of Gemara there.",
    "1:ב": "Meaning: a long box like a tower suspended by ropes — Aruch.",
    "1:ג": "Meaning: he blows before his feet and does not move the ground.",
    "2:א": "Mishnah there 32, and in several places.",
    "2:ב": "There mishnah, as the Gemara establishes it there per Rabbi.",
    "3:א": "Mishnah there 34.",
    "3:ב": "In the Gemara there.",
    "4:א": "Mishnah there 34, and I cited it above siman 394.",
    "4:ב": "In the Gemara there 32, as established per Rabbi.",
    "5:_": "Mishnah there 35, as Rava explains there and per Rashi's explanation.",
    "6:א": "In the mishnah there.",
    "6:ב": "In the mishnah there, and per Rabbi Yosei and Rabbi Shimon.",
    "6:ג": "I cited it above siman 394.",
    "7:א": "Mishnah 49, and per Rabbi Yehuda.",
    "7:ב": "Raosh in the cited chapter there, and it is plain from the old law above siman 401.",
    "7:ג": "In the mishnah there.",
    "7:ד": "Mishnah there chapter 2.",
    "7:ה": "Baraita there 30.",
    "7:ו": "These four refer — for an ill person two meals per his food suffice; Beit Yosef per Tur's words.",
    "7:ז": "Rambam chapter 1 Laws of Eruvin from the Gemara's sugya there.",
    "7:ח": "Mishnah there 24 and chapter 2; and see siman 386.",
    "7:ט": "In the Gemara there 73.",
    "7:י": "There a question and resolution.",
    "8:א": "Mishnah there 31.",
    "8:ב": "In the mishnah and Gemara there, in a baraita.",
    "9:א": "Baraita there 3.",
    "9:ב": "Baraita Gittin 65, and per the Rabbis as Rabbah established.",
    "11:א": "Mishnah Eruvin 49.",
    "11:ב": "In the Gemara there 51, and as some say in the name of Rava.",
    "11:ג": "In mishnah 49 there.",
    "11:ד": "In the Gemara there, per Shmuel — consensus of Poskim.",
    "11:ה": "Chapter 7 Laws of Eruvin per his explanation from Shmuel's words as written there likewise.",
    "12:_": "Baraita there 50.",
    "13:_": "In the Gemara there 51, and per Rav Nachman — consensus of Poskim.",
  },
  "output/siman_409/baer-heitev/part-001.txt": {
    "1:א":
      "Cemetery. Meaning in a built grave; but if in ground of a cemetery it is permitted, for eternal ground is not forbidden — see Yoreh Deah siman 364.",
    "1:ב":
      "In a tower. This is a large box one cubit by one cubit, three cubits high, and they carry it on animals; he can take the eruv in plain wooden vessels without a handbreadth width and bring it to himself — Magen Avraham.",
    "3:_":
      "Sin-offering. The same when he places his eruv in a public domain distant eight cubits from his shevitah — they do not permit him to bring it less than four cubits since it is possible to come to liability for a sin-offering — Tosafot daf 54 — Magen Avraham.",
    "5:_":
      "And it rolled. And it appears that even if he transgressed intentionally and it rolled beyond the techum within four cubits he did not lose his eruv — Taz. Beit Yosef asked: we learned one who went out beyond the techum, even one cubit, may not enter as siman 405 — why here even four cubits less than a hairbreadth is permitted? One may say per the view there since he intended to dwell in the city it is considered four cubits and he has no other four cubits; but here when he wishes to uproot his dwelling from the city it is fitting to give him four cubits where he places his eruv, for there is his home — end; and see Taz and siman 405 s.k. 1 in Bach.",
    "6:_":
      "Doubt. One who made eruv with doubtfully terefah food — it is not an eruv, for it requires a meal fit for eating — Magen Avraham.",
    "7:א": "Each. See Taz and Magen Avraham what they emended.",
    "7:ב":
      "Would want. So too shepherds who sleep in the field follow their sleeping place since there too they would want to eat; so too harvesters and fruit guards — Gemara daf 73.",
    "8:_":
      "His mission. Even for a d'oraisa prohibition, such as when there is a stumbling block for the sender if he does not carry out his mission — as here; but one who tells his agent \"go and separate terumah\" and he found terumah — there is no presumption it is terumah, for the agent is not concerned to separate terumah unless he finds the terumah by the pile the sender will know it is not terumah; if so we are concerned the agent did not separate terumah and another separated terumah — Tosafot and Raosh; requires study, for in Yoreh Deah siman 331 s.k. 434 it is written if he found the pile terumah we say the agent separated terumah — requires study — Magen Avraham see there. If we knew he carried out his mission only there is doubt whether the agent changed — we say certainly he did not change — R' Betzalel siman 29.",
    "10:_":
      "With dates. Even if he commanded the agent to make eruv from his own food — it is a strict requirement and not a valid eruv — Magen Avraham.",
  },
};

Object.assign(fixes, fixes2);

const fixes3 = {
  "output/siman_409/beur-hagra/part-001.txt": {
    "1:א": "Seif 1 — and if he placed. Mishnah there.",
    "1:ב":
      "Seif 1 — in a floating chest. Even though we rule like Rabbi there 30b — that was in Syria where it imparts tent impurity; here it discusses beit hapras which does not impart tent impurity as written, or that he blows, etc.; and it is in the Gemara there and Moed Katan 5:2; and who is beit hapras, etc.",
    "1:ג": "Seif 1 — he must, etc. Mishnah there 32, and as written in the Gemara there and Shabbat 8b.",
    "1:ד": "Seif 1 — in a case of mitzva. One makes eruv only for a mitzvah or pressing need as siman 415.",
    "3:_": "Seif 3 — and he would be liable, they decreed. Tosafot there 33a s.v. veha; and it appears to me, etc.",
    "4:_": "Seif 4 — he placed in a tower. As written above siman 394 seif 3 — the sugya there per the Rabbis.",
    "7:א": "Seif 7 — how. Mishnah and in the Gemara there 51b.",
    "7:ב":
      "Seif 7 — and even. Tosafot on the mishnah there; and it says in the Gemara 38b he goes and is silent; and there 45a one who sits, etc., per the Rabbis, and one who sleeps, etc.; and above siman 411 seif 2; and this is the language of the Rama because Tosafot wrote there and one may distinguish, etc.; but, etc.",
    "7:ג": "Seif 7 — per his food. See Magen Avraham.",
    "7:ד": "Seif 7 — six. Like R' Yehuda ben Bava there.",
    "7:ה": "Seif 7 — and he says. Rif chapter 2 halachah 19.",
    "7:ו": "Seif 7 — and returns to sleep. Mishnah 38a and there 73a.",
    "8:א": "Seif 8 — if he wishes. 51b.",
    "8:ב": "Seif 8 — and so many. Mishnah 52a, and as written siman 411 seif 3.",
    "9:א": "Seif 9 — one or. 50b, or who said to his slaves, etc.",
    "9:ב": "Seif 9 — one who says to his fellow. Gittin 65 per Rabbah, and in Tosefta chapter 3 of Mekhilta.",
    "9:ג": "Seif 9 — in a house, etc. All in the Tosefta there.",
    "11:א":
      "Seif 11 — he could not reach, etc., he may not move. We learn from what is written below \"but if not,\" etc., and Rashi 51a s.v. ve'asur le'eruvo, etc.",
    "11:ב": "Seif 11 — and specifically, etc., but. There 50b.",
    "11:ג":
      "Seif 11 — and per Rambam, etc. See Magen Avraham who explains Rambam explains Shmuel's words that he acquired at his place and this is what is meant \"and it becomes beneath the tree,\" etc.; therefore he did not acquire there at all but at his place. His explanation does not appear to me: one, that \"it becomes beneath him\" is very forced in his explanation; further, if so what did they say the baraita supports Rav, etc., let us say it should be, etc. — on the contrary it supports Shmuel as written below; rather it appears to me he rules like Rav that the halacha follows him in prohibitions and not like Rif whose support Rif brought from two who asked a division in chapter 5 of Eruvin is not support for Rambam's explanation who ruled like Rav that he acquires shevitah at his place; and Rav Huna son of R' Yosei also holds like Rav only requires study that siman 412 where Rambam wrote he is like Shmuel and said there Rav taught, etc., and possibly another reading is needed there.",
    "11:ד":
      "Seif 11 — but at his place. So he explained Rav's words and as written \"permitted to his house and forbidden to his eruv,\" and as the baraita taught in support of Rav he may not move from his place; and he explained that shevitah remained for him at his place.",
    "11:ה":
      "Seif 11 — and similarly if he said. There Shmuel said so, and Rav also agrees to this and per his explanation he may not move as above.",
    "11:ו": "Seif 11 — and one who says. There R' Chiya son of R' Yosei said, etc.",
    "11:ז":
      "Seif 11 — and so the Rif's view. From the fact he brought this statement of R' Chiya it implies he explains per Magen Avraham's explanation; and there is a novelty even per Shmuel.",
    "13:_":
      "Seif 13 — and specifically for one coming on the road. Maharam there, in the name of Rashba, and as written in the Gemara there 52a \"he, since he went out,\" etc., and there to establish — all explain, etc., and as siman 411 seif 1 and seif 3; and there 51b \"but in such-and-such place,\" etc., and Rashi there \"except that he wrote and bread is not with him\"; but Rashba wrote one coming on the road even if he has bread is called poor, and at home even if he has no bread nevertheless not.",
  },
  "output/siman_409/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) Forbidden, etc. In a built grave, etc.; and what is called a built grave depends on the dispute of Tur and R' Yehuda there: per R' Yehuda even earth taken from the grave and afterward placed on it to cover the coffin has the law of a built grave — it is detached and later attached and is not called eternal ground; only one who digs a niche in rock over which the niche is called eternal ground, and certainly the sides of the grave; but per Tur even detached and later attached, since it is earth of the grave, it is eternal ground and forbidden only for an actual built grave — see there; and perhaps one may be lenient for eruv per Tur, and there too it implies the main view is like Tur.",
    "2:_": "(s.k. 2) After, etc. He makes eruv for a mitzvah as below siman 415.",
    "3:א":
      "(s.k. 3) In a beit hapras, etc., that was plowed, etc., and its measure is one hundred by one hundred cubits — the Rabbis establish one who plows does not move bones.",
    "3:ב":
      "Bone the size of a barley grain. Even though it does not impart tent impurity, nevertheless it imparts impurity by contact and carrying, and a priest may not walk there lest he move a bone with his feet — which is carrying.",
    "4:_":
      "(s.k. 4) Priest, etc., and forbidden for him to eat. Certainly a priest may also eat impure non-sacred food; but unspecified priests eat their non-sacred food in purity of terumah; therefore impure non-sacred food is called unfit for a priest — so in Sefer Tashbetz.",
    "5:א":
      "(s.k. 5) In a tower, etc., three cubits high. We derive vessels from sack — what a sack can move full and empty and receives impurity, so all vessels; but a vessel as large as Magen Avraham wrote — the Rabbis establish it is not moved when full because of its weight; therefore it does not receive impurity and interposes.",
    "5:ב":
      "And he can take, etc. Written in Sefer Tashbetz thus: it must be that what Magen Avraham wrote \"and he can take it\" is a matter by itself — it does not refer to beit hapras, for in beit hapras even a handbreadth width is not needed, since beit hapras does not impart tent impurity; rather it refers to an individual grave that is built, where it is permitted, etc., and he can go there via a box, etc. — end; see there. Here is a refutation: the Talmud in Eruvin 31a did not need plain wooden vessels except per R' Yehuda who holds one may make eruv even for a priest in a cemetery who is not pleased to be guardian of the eruv after acquisition and there is no benefit prohibition; nevertheless because of impurity for a priest it is forbidden, for a grave imparts tent impurity; and on this it answers that he can go via a box and tower; and it asks how he brings the eruv to himself — the vessel forms a tent; and it answers with plain wooden vessels — only if it were a handbreadth wide even plain wooden vessels receive impurity at least d'rabbanan; therefore it is not a handbreadth wide; but Magen Avraham discusses beit hapras where impurity is from concern for a barley-grain bone, and such a bone does not impart tent impurity — all the more in beit hapras which does not impart tent impurity; therefore Sefer Tashbetz wrote it refers to a built grave and it must be that even what Magen Avraham wrote first that the tower be one cubit by one cubit, etc., also refers specifically to a built grave because of interposition that it interpose and not form a tent — then it does not receive impurity and interposes; and it does not refer to beit hapras; his words are forced; perhaps one may say Magen Avraham wrote from his own reasoning that even in beit hapras we require taking via plain vessels not a handbreadth wide — otherwise just as a priest may not walk there from concern for contact and moving, so too it is forbidden to take an item from there via a vessel that receives impurity lest he touch via the vessel and the vessel and priest become impure; therefore we require it not be a handbreadth wide; but I still do not know why the tower must be large one by one, etc., since it does not impart tent impurity and there is only concern for contact — the box and tower on animals carry it and one need not be concerned he will touch via the tower; and one may distance extra — this too is forced.",
    "6:_":
      "(s.k. 6) He blows, etc. A barley-grain bone he may go via blowing; and if it is a large bone (which cannot go via blowing) he must see it — so it should read.",
    "7:_":
      "(s.k. 7) And he would be liable, etc. Since it is easy to come to sin-offering — meaning easily possible to transgress regarding four cubits and be liable for a sin-offering; therefore even though for other shevut they permitted during bein hashemashot, this shevut they did not permit; and this too regarding placing on top of a reed and giant reed as explained in Shulchan Aruch it is not an eruv since easily one comes to sin-offering — they did not permit during bein hashemashot.",
    "8:_":
      "(s.k. 8) It is valid, etc. Four handbreadths wide means it should not be four handbreadths wide from bottom to top — then it is a private domain; and since he intended to dwell in a public domain it is not an eruv; but if only above is four wide and not below it is not a private domain — as above end siman 405 and see there in Magen Avraham.",
    "9:_":
      "(s.k. 9) Doubt, etc. For we require a meal, etc., per Shulchan Aruch; and that he had presumption of validity — one need not say this reason, for this doubtfully terefah food had no presumption of validity for eruv; rather he came to give a general reason even per Rambam who holds presumption of validity is not required — Rav Betzalel brought Laws of Eruvin siman 415 seifim 2 and 3 (requires study on Rav Betzalel, for here he is silent like Rashba who requires presumption of validity, and Laws of Eruvin siman 415 silent like Rambam whom he brought first — so is his way in Shulchan Aruch, known that the main view he brings first silently); nevertheless doubtfully terefah is not an eruv for it requires a meal, etc. — namely it is only doubtfully terefah; in any event forbidden to eat as if certainly terefah as written above end siman 394.",
    "10:_":
      "(s.k. 10) To let nightfall find him, etc. Meaning his intent was, etc.; but in any event he did not acquire, etc.; and this is specifically in this case where he stands at home and goes out to let nightfall find him; but one who comes on the road and nightfall came upon him — even with intent he need not, for he is not worse than one who sleeps on the road in siman 401 who acquires shevitah at his place even though he has no intent at all; only specifically when he went out from his house — without intent we say presumably shevitah of his house is more pleasing to him; so too Rav Betzalel — see there.",
    "11:א":
      "(s.k. 11) Per, etc. If he is ill — meaning even though for an average person we require six eggs, nevertheless for an ill person we do not require so much; however it appears to me we require food fit for that ill person to eat; namely we establish above siman 386 seif 8 one may make eruv even with something unfit for him if fit for others; nevertheless here since it is not the measure of two meals for others but they were lenient that if it is food for two meals for that ill person it suffices — therefore we require food fit for the ill person and we do not do two contradictory things; and see Tosafot 30b s.v. targem, etc.",
    "11:ב":
      "Large eater — his measure, etc. The reason is his mind is nullified regarding each — unlike Taz.",
    "12:_":
      "(s.k. 12) Any item, etc. And see siman 387 where it is explained — some say one does not make eruv in such a case, namely partnership of alleyways which is not a full mitzva; and if he forbade himself with a konam resembling consecration — Tur's view there is that even for eruv techumin one does not make eruv — see there; and the Rav wrote in the name of Hagahot: good advice to make eruv with vinegar that each needs only a little for two meals; but bread requires a full two meals for each — end.",
  },
  "output/siman_409/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] Some say, etc. And so it is sealed in Shulchan Aruch. And specifically in a built grave; but if he placed it in ground of a cemetery it is permitted — Yoreh Deah siman 364.",
    "2:_":
      "[2] [Levush] That remains, etc. That no flesh remains in them as mentioned above; and one must say a small bone is removed by blowing (Levushei Yom Tov).",
    "3:_":
      "[3] And he would be liable, etc. The same law when he placed his eruv in a public domain distant from his shevitah — they do not permit bringing less than four cubits since it is possible to come to liability for a sin-offering — Tosafot; and see siman 336 seif 3.",
    "4:_":
      "[4] [Levush] That they forbade using, etc. That he not detach — and it is not close to certainty like cutting.",
    "5:_":
      "[5] [Levush] Only a prohibition, etc. It resembles attached (Levushei Yom Tov); and from Bertenoro chapter 3 of Eruvin it implies there is no prohibition at all to detach what is stuck in — rather it teaches us even though it is above four handbreadths wide, since below he does not have four it is not a private domain and it is an eruv; and per Tur and Raosh it appears to me it teaches we do not require eruv on top of a four-cubit place; and even though from Rashi's explanation 34a we require, and Avodat HaKodesh 35 ruled so — nevertheless they do not hold so; further one may say it teaches us for precision regarding stuck-in — forbidden.",
    "6:_": "[6] D'oraisa, etc. And see siman 354 seif 2.",
    "7:_": "[7] And it rolled, etc. The same law if he transgressed intentionally and rolled it (Taz).",
    "8:_":
      "[8] [Levush] And even though, etc. Bach and Taz thought this is what Beit Yosef asked and he answered from himself — see there; and they did not look at R' Yonatan chapter \"in all one makes eruv\" from which Beit Yosef copied.",
    "9:_":
      "[9] [Levush] And from there are not four cubits, etc. Meaning: and for this reason it is not distant four cubits from his eruv (Levushei Yom Tov).",
    "10:_":
      "[10] Doubt whether it was placed, etc. So too one who made eruv with terumah and there is doubt whether pure or impure terumah; and so fruits — doubt whether tithed or not tithed and still tevel — one should not say here establish the eruv on its presumption that it was never presumed valid; on the contrary one should say establish the man on presumption of his house (Avodat HaKodesh 35). One who made eruv with doubtfully terefah food — it is not an eruv, for we require a meal fit for eating (Gemara).",
    "11:_":
      "[11] And if he is ill, etc. So is the Talmud 30a and so implied Avodat HaKodesh 33 and Raosh; so must be explained in Tur and Shulchan Aruch — and that is the essence; and what is written \"some say\" ill, etc. — has no basis at all.",
    "12:_": "[12] Six eggs, etc. See siman 368 s.k.",
    "13:_":
      "[13] Their sleeping place, etc. So too shepherds who sleep in the field, and harvesters and fruit guards follow their sleeping place.",
  },
};

Object.assign(fixes, fixes3);

let total = 0;
const riskHits = [];

for (const [relFile, blockFixes] of Object.entries(fixes)) {
  const file = path.join(ROOT, relFile);
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const p of PREFLIGHT_RISK) {
          if (p.test(en)) riskHits.push({ file: relFile, key, pattern: String(p) });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(relFile, n, "/", blocks.length);
  total += n;
}
console.log("TOTAL", total);

if (riskHits.length) {
  console.log("PREFLIGHT-RISK phrases:");
  for (const h of riskHits) console.log(" ", h.file, h.key, h.pattern);
} else {
  console.log("PREFLIGHT-RISK: none");
}
