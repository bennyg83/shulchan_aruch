#!/usr/bin/env node
/** worker slot 3 — siman 426 part 1 (Kiddush Levanah) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_426/mechaber/part-001.txt": {
    "1:main":
      'The blessing on the moon and its time. Contains 4 seifim. One who sees the moon in its renewal blesses: Who at His word created the heavens, and at the breath of His mouth all their hosts; He gave them a law and a time that they should not change their duty, etc. {Rama: And one may only sanctify the month at night, at the time when the moon shines and we benefit from its light (Agur)}',
    "2:main":
      'We do not bless on the moon except on motza\'ei Shabbat, when one is perfumed and one\'s clothes are nice. {Rama: And specifically if motza\'ei Shabbat is before the 10th of the month — then we wait until motza\'ei Shabbat; but if it is afterward we do not wait until motza\'ei Shabbat, lest there be two or three or four cloudy nights and they not see the moon and the time pass. And when they sanctify it on a weekday, one should wear nice clothes (Terumat HaDeshen siman 35). We do not sanctify the moon before the 9th of Av, nor before Yom Kippur (Maharil), and on motza\'ei Yom Kippur we sanctify it, for then we are in a state of joy; but not on motza\'ei the 9th of Av or another fast (my own opinion). And we do not sanctify it on motza\'ei Shabbat that falls on Yom Tov (Maharil, laws of Yom Tov).} And one lifts one\'s eyes and straightens one\'s legs and blesses (while standing) (Tur) and says three times: "A good sign shall it be for all Israel, Blessed is your Creator," etc. {Rama: And one dances three times toward it and says "Just as I dance, etc.," and says "Fear and terror shall fall upon them," etc., and backward "They shall be as a stone," etc., three times; and one says to one\'s fellow three times "Peace be upon you" (Hagahot haChadashot), and the response is like one who asks (Tur). And we are accustomed to say "David, King of Israel, lives and endures," for his kingdom is compared to the moon and is destined to be renewed like it; and Knesset Yisrael will return to cleave to her Husband, who is the Holy Blessed One — an image of the moon that is renewed with the sun, as it is said, "For the Lord God is a sun and a shield" — and therefore we make rejoicing and dancing at Kiddush Levanah, an image of the joy of a wedding (Bachya, parshat Vayeishev, and my own opinion).}',
    "3:main":
      'Until when do we bless on it? Until the 16th day from the day of the molad — the 16th is not included. {Rama: And one may not sanctify except until half of 29 days, 12 hours, and 793 chalakim from the molad (Teshuvot Maharil)}',
    "4:main":
      'We do not bless on it until seven days have passed over it. {Rama: And we do not sanctify the moon under a roof (Hagahot Alfasi haChadashot)}',
  },
  "output/siman_426/mishnah-berurah/part-001.txt": {
    "1:א":
      '(1) One who sees, etc. — and women are exempt from Kiddush Levanah, for it is a positive time-bound commandment; and even though on every positive time-bound commandment women are accustomed to fulfill and bless, nevertheless this mitzvah they need not fulfill, because they caused the flaw of the moon. And a blind person is obligated in Kiddush Levanah, for this blessing was enacted on the renewal of the world, and he too benefits when others see and lead him on the way — similar to one who blesses "Who forms the lights," as the Acharonim wrote; and see Biur Halacha. And a minor — once he reaches the age of education we educate him in it [so in the name of R\' Yitzchak; and it appears this is only per Rabbeinu Tam in siman 70, but per Rashi there it is not clear; and it is similar to Keriat Shema — see there; and perhaps his intent is also that it is good to practice thus l\'chatchila, as ruled there in Shulchan Aruch regarding Keriat Shema — see there].',
    "1:ב":
      "(2) But at night — to exclude daytime, when the moon is somewhat visible and it is still day.",
    "1:ג":
      '(3) And we benefit from its light — meaning at the time its radiance is recognizable on the ground. If the moon became covered in clouds — if the cloud is thin and light so that the moon is seen through it and one benefits from it, one blesses; but if the cloud is thick one does not bless. And if he began to bless and afterward it became covered in clouds, he completes the blessing — unless he estimates the moon will become covered in the middle of his blessing, in which case he should not begin his blessing; and see Biur Halacha. The same law applies if there is a screen separating between him and the moon: if the screen is thin and light so that the moon\'s light passes through until he benefits from it and can recognize things discernible by the moon\'s light, he may bless; but if the screen is thick and he does not benefit from the moon\'s light, he should not bless, for it is a blessing in vain; and see what we wrote at the end of the siman.',
    "2:א":
      '(4) We do not bless, etc. — for the mitzvah, l\'chatchila it is preferable as concluded in the gloss; and it is written in Sefer Maggid Meisharim: "This siman shall be in your hand — in the month you bless Birkat HaLevanah on motza\'ei Shabbat you will find success; and when it becomes covered and hidden and they cannot bless that month, you will not be successful, God forbid."',
    "2:ב":
      '(5) Except on motza\'ei Shabbat — and the same on motza\'ei Yom Tov.',
    "2:ג":
      '(6) But if it is afterward — meaning the night of motza\'ei Shabbat is the night of the 11th — we do not wait, lest it become covered in clouds then, and likewise in the four nights afterward; and per what is written in seif 3 in the gloss, one must consider whether five nights will remain until half of 29 days, 12 hours, 793 chalakim from the molad.',
    "2:ד":
      "(7) Nice clothes — and nowadays we are not meticulous about this.",
    "2:ה":
      "(8) Before the 9th — for we are in mourning.",
    "2:ו":
      '(9) Before Yom Kippur — for we are also in dread from the power of judgment and are not in joy; and see Biur Halacha.',
    "2:ז":
      '(10) But not on motza\'ei, etc. — for we are not in joy; and they bless on the days after it. And it is explained in Darkei Moshe: if the 9th of Av falls on Thursday, one may wait until motza\'ei Shabbat, which is the 12th of the month.',
    "2:ח":
      '(11) Or another fast — such as if he did not sanctify in the month of Tevet until the fast, he should not sanctify after the fast but wait until the night after it, which is the 12th of the month; nevertheless if this occurred in Adar that they did not sanctify until the Fast of Esther, Taz wrote one should sanctify after the fast since the time is passing. All this is Rama\'s view; but the Acharonim in all this hold one sanctifies even on motza\'ei the 9th of Av, and certainly on other fasts — only they wrote one must taste something beforehand; and on motza\'ei Yom Kippur, since they rejoice that they emerged in peace, they sanctify even before tasting. However on motza\'ei the 9th of Av one must be careful not to sanctify without shoes. Regarding a mourner — when does he sanctify? Magen Avraham holds: if he will complete his mourning before the 10th of the month, he waits and sanctifies on the night of the 10th; but if his mourning ends on the 10th of the month, he should not wait for the night of the 11th — better he sanctify the moon within his mourning days. And Shaarei Ephraim holds: if there is time to sanctify after his mourning days end, he waits; but if when he waits the time will pass, he may sanctify within his mourning days and may go outside to sanctify; and see Biur Halacha.',
    "2:ט":
      '(12) That falls on Yom Tov — and all the more one does not sanctify it on Shabbat night; and many reasons were said on this according to Kabbalah; nevertheless if they did not sanctify until Shabbat and Yom Tov and the time will pass, certainly it is permitted to sanctify even on Shabbat and Yom Tov, even individually — and such is the conclusion of the poskim.',
    "2:י":
      '(13) And one lifts, etc., and says, etc. — Shiyurei Kenesset HaGedolah wrote: it seems at first glance that until one finishes the entire order one lifts one\'s eyes toward it — and so is widespread custom; but he heard from Sefer Charedim that he was very stringent not to look at the moon and did not permit looking except until he finished the blessing; and Magen Avraham in the name of Shlah was even more stringent: even at the time of the blessing one should not look at it, but see it once when he wishes to bless and afterward not look.',
    "2:כ":
      "(14) And dances, etc. — and the Acharonim wrote one must be very careful not to bend one's knees to dance, lest it appear as bowing to the moon; rather one should lean on one's toes and dance.",
    "2:ל":
      '(15) And backward "like a stone" — and Magen Avraham wrote in the name of Matteh Moshe: one says the entire verse until "You acquired," and afterward backward.',
    "2:מ":
      '(16) And one says to one\'s fellow, etc. — meaning because at the beginning he said "they shall fall," etc., he says to his fellow "Peace be upon you" [Magen Avraham]; and see Magen Avraham who mentioned several more verses that have Kabbalistic basis to say and we did not copy them, for they are already written in the Kiddush Levanah order and all are accustomed to say them.',
    "3:א":
      '(17) From the day of the molad — meaning not from the day but from the hour of the molad we count, for from that hour we count fifteen days me\'alav; and therefore when the molad was in the middle of the first day, it is permitted to sanctify on the night of the second day, for there are not yet fifteen me\'alav.',
    "3:ב":
      "(18) And the 16th is not included — for once fifteen days have passed, it goes on diminishing and there is no renewal here.",
    "3:ג":
      '(19) Except until half, etc. — for we hold the moon\'s renewal is not less than 29 days, 12 hours, and 793 chalakim [for an hour is divided into 1080 parts]; and therefore if the molad was on motza\'ei Shabbat two or three hours into the night, it is forbidden to sanctify it for another two weeks at the beginning of the second night per Rama, even though fifteen full days have not yet passed.',
    "4:א":
      '(20) Until seven pass — and most Acharonim disagree on this; per their view, in any case after three days me\'alav from the time of the molad, when they already benefit from its light, one should bless on it and not miss the mitzvah; however if the 3rd of the month falls on a weekday, it is proper to wait until the coming motza\'ei Shabbat, as explained in seif 2 in the gloss; and many Acharonim including the Gra are lenient even in this way and hold it is not worthwhile to delay the mitzvah in any case; therefore one who practices thus certainly has whom to rely upon — especially in winter days and rain, certainly one who is zealous to sanctify is praiseworthy.',
    "4:ב":
      '(21) Under a roof — rather under the dome of the heavens; and the reason is that Kiddush Levanah is like receiving the Divine Presence, and it is not proper honor to stand under a roof; therefore they go out from under the roof to the street as one goes out to greet kings. Nevertheless all this is only l\'chatchila; but one who is concerned about some ailment that he cannot go outside, or the place is not clean, or he dwells among gentiles — he may sanctify in his house through a window or door open toward the moon.',
  },
  "output/siman_426/magen-avraham/part-001.txt": {
    "1:_":
      'Women are exempt — for it is a positive time-bound commandment; and even though they fulfill every positive time-bound commandment such as sukkah, nevertheless this mitzvah they do not fulfill because they caused the flaw of the moon (Shlah); see siman 296 and in Sanhedrin chapter 5 they say regarding Birkat HaLevanah "our women too bless" — it seems somewhat that women bless; and it is possible he does not mean women but used ordinary language. A blind person is obligated in Kiddush Levanah (Rashal in teshuvah). Shining — that its radiance be recognizable on the ground (Matteh Moshe part 3); siman 562 — there must not be a screen separating between him and the moon unless it is a thin thing through which the moon is seen so he can recognize things discernible by the moon\'s light (siman 7 there); and the same if covered in clouds — but if covered in a thin, light cloud he blesses; and if he began to bless and it became covered he completes the blessing (Radbaz part 1, 157, 25) — it implies when he knows it will become covered immediately he should not begin to bless.',
    "2:א":
      'On motza\'ei Shabbat. The Maggid wrote: when they sanctify the moon on motza\'ei Shabbat there will be success; and when it becomes covered and you cannot bless that month, you will not be successful — examine and forget.',
    "2:ב":
      'Before the 10th of the month. It implies that if motza\'ei Shabbat is the night of the 10th we do not wait; but per the reason he wrote, it implies even on motza\'ei Shabbat it is the night of the 11th we wait — for even if there will be four cloudy nights, i.e., 11, 12, 13, 14, they can still sanctify on the night of the 15th; and it must be said "four clouds" means besides motza\'ei Shabbat; and motza\'ei Shabbat before the 10th of the month means the night is before day 10, i.e., day 1 is the 10th — and that is what he concluded "but if afterward," etc., meaning on Shabbat it is day 10 we do not wait until motza\'ei Shabbat; and per what is written in seif 3 in the gloss, one must consider whether five nights will remain until half of 29, 12, 793 from the day of the molad.',
    "2:ג":
      'Before the 9th. For we are in mourning; and if so, likewise during the seven days of mourning he should not sanctify; but if he will not complete his mourning until the 10th of the month, he should not wait until the night of the 11th and should sanctify during his mourning days.',
    "2:ד":
      'Before Yom Kippur. For then we are in distress over atonement of sins.',
    "2:ה":
      'Or another fast. And so he wrote that in his place they practice to sanctify on the night of the fast; therefore it appears to me an individual who is fasting should sanctify with the congregation because of "in the multitude of people is the king\'s glory" (see siman 64) — for even Torah study they cancel for this, as written siman 288 seif 14; and even a fasting congregation, if they see the time will pass, they sanctify on the night of the fast.',
    "2:ו":
      'That falls on Yom Tov. And all the more they should not sanctify on Shabbat night; and in siman 78 many reasons were written on this, and so Rekanati siman 86; and in Maharil it is written that Maharash permitted; and so Hagahot Maimoniyot; and Bach wrote that once the moon was not seen until the first night of Sukkot and they acted in Krakow and sanctified it afterward since it was impossible to sanctify later — end quote; but in another matter one should not be lenient, since there are many reasons per Kabbalistic tradition; and see Radbaz part 1 siman 133.',
    "2:ז":
      'And one lifts one\'s eyes. And in Shlah and Hagahot Yesh Nochlin one should not look at it except the first time one sees its standing, and afterward it is forbidden to look at it.',
    "2:ח":
      'And dances three times. And beware not to bend, lest it appear as bowing to the moon — only stand on one\'s toes (Shlah).',
    "2:ט":
      'And backward "like a stone," etc. And Matteh Moshe wrote in the name of Rashal and Rokeach that one says the entire verse until "You acquired" and afterward backward; and also a Kabbalistic tradition from R\' Yehuda heChasid to say "The voice of my beloved, behold he comes," etc., "My beloved is like," etc., until "from the windows"; and in Shlah it is written that one says Shir haMa\'alot "I will lift my eyes," etc., and also "Hallelu El b\'kodsho," etc.',
    "2:י":
      'Peace be upon you. Meaning because he said "they shall fall upon them," when does he say to his fellow "Peace be upon you"? It is written in writings that he shakes the hems of his garments.',
    "3:_":
      'From the day of the molad. From this wording it implies we do not count hour for hour — such as if the molad was 20 hours into day 1, it is forbidden to sanctify on day 2; but per Rama\'s words it is permitted to sanctify, for we count half of 29, 12, 793 from the hour of the molad; and therefore one must calculate 14 days, 18 hours, 396 parts and a half; and thus Rama comes to add — and his wording implies he comes to be lenient, as he wrote "and one may not sanctify," etc.; but in truth in Tur it is written: "and these sixteen from the hour of the molad we count for them" — it implies we count hour for hour; and if it fell on motza\'ei Shabbat two or three hours into the night, it is permitted to sanctify at the beginning of the second night — and per Rama it is forbidden.',
    "4:א":
      'Seven days. Thus wrote Rambam and Semag: if he did not bless on night 1, he blesses until day 16; and Rashal wrote in his explanation: from here it implies one need not wait three days as written in Lekutei Sefarim — end quote; and in Sefer HaKaneh it is also written that it is preferable l\'chatchila to sanctify on the first day; but in Hagahot Maimoniyot it is also written to wait seven days, and so in Yad Malachi part 8, 139; and in Levush: if motza\'ei Shabbat falls before seven days, we rely on Rabbeinu Yonah and sanctify after three because it is motza\'ei Shabbat and also because the congregation is gathered and "in the multitude of people is the king\'s glory"; and so Bach — not to miss the mitzvah; but if motza\'ei Shabbat is before three days, we do not sanctify, for they can wait until the coming motza\'ei Shabbat, as written in seif 2.',
    "4:ב":
      'Under a roof. And we do not know the reason for the custom (there in Hagahot Alfasi); and Maharil wrote the reason is lest some impurity hover over him; and Bach wrote the reason is that they go out to the street as a person goes out to greet the king; and so in Hagahot Maimoniyot; nevertheless if he has some ailment or dwells among gentiles, he sanctifies under the roof — end quote; and thus Matteh Moshe: I saw Rashal when he was in a joyous company and did not wish to go outside — he opened the window toward the moon and sanctified it — end quote (and see there seif 1); and all the more when there are filthy alleyways, better to sanctify in the house.',
  },
  "output/siman_426/machatzit-hashekel/part-001.txt": {
    "1:א":
      'Women, etc. — see siman 296 where he wrote to distinguish: specifically a mitzvah that has an action, such as sitting in a sukkah — women fulfill and also bless; but a mitzvah that has no action, only a blessing, such as Birkat HaLevanah — women do not bless.',
    "1:ב":
      'And in Sanhedrin daf 42a: Rav Acha said to Rav Ashi — in the West they bless "Who renews the months." He said to him: these women of ours also bless. Rather, like R\' Yehuda, etc., "Blessed is He Who at His word created," etc. — it implies women also bless, only they shorten the wording of the blessing; and it is possible he does not mean women but amei ha\'aretz.',
    "1:ג":
      'A blind person is obligated, etc. — even though we require benefiting from its light, the intent is not that the one blessing must benefit, but for the good of the world; and further, as written above siman 59 regarding a blind person who blesses "Who forms the lights" — see there; and the same here.',
    "3:א":
      '(s.k. 3) Before, etc. — it implies, etc., night of the 10th — not so; rather it must say night of the 9th.',
    "3:ב":
      'Night of the 11th we wait, for he wrote the reason lest there be four cloudy nights; and when he wrote "11," there are still five nights; if so the wording contradicts the reason in two places; and it must be said "four clouds" means besides motza\'ei Shabbat; and if so we are concerned for five cloudy nights; and therefore per the reason too, if motza\'ei Shabbat is the 11th we do not wait; but if motza\'ei Shabbat is the 10th we wait; and that which he wrote "before the 10th" — on this Magen Avraham wrote it means before day 10, and in truth the night is the night of the 10th.',
  },
  "output/siman_426/turei-zahav/part-001.txt": {
    "1:_":
      'We do not bless on the moon, etc. In Maharil end of Laws of Shavuot he wrote: Maharil did not sanctify the moon on any Yom Tov that fell on motza\'ei Shabbat, such as Shavuot that fell on Sunday; and he gave a reason: just as there are boundaries below, so there are boundaries above, and one may not receive the Divine Presence on Yom Tov outside the boundary; however he testified about his renowned teacher that he was not strict and would sanctify also on Yom Tov on motza\'ei Shabbat — and such is the essence; therefore Rama did not bring it.',
    "2:_":
      'Or another fast. It appears that if they did not sanctify until the Fast of Esther, one should bless then and we do not heed the fast since the time is passing.',
    "3:_":
      'Until seven days pass. Maharach wrote: it is astonishing, for we say in the Gemara: until when do we bless on the new moon? Until its flaw is filled; and R\' Yochanan: until seven; Nehardeans say until sixteen; and Rashi: until seven — if he did not bless today he blesses tomorrow, until seven — thus l\'chatchila one blesses before seven days have passed; and Nehardeans do not explain thus but add until sixteen. Further difficulty: R\' Yonah wrote on "we do not bless on the moon until it is perfumed" — until its light is sweetened that a person benefits from its light, i.e., after three days; and so we received from our teachers that all the ancients practiced not to miss the mitzvah and to sanctify it on motza\'ei Shabbat after three days passed over it — end quote. And in Levush: if the first motza\'ei Shabbat is even five days into the month and they see the moon whose light is great and sweet, one may rely on R\' Yonah and bless on it and not wait until after seven to bless on a weekday, and not wait for motza\'ei Shabbat lest it be more than eleven days; and so it appears to me for practice — and the matter does not depend on days but from the time they benefit from its light in goodness; in any case after three days.',
    "4:_":
      'Under a roof. Maharach wrote: the reason is it is not proper honor; rather they go out from under the roof into the street as one goes out to receive the face of the king who goes out toward him; however all this where possible; but one concerned about some ailment that he cannot go outside, or when dwelling among gentiles, may sanctify in his house through a window and door — end quote. In Tur it is written: after one says "they shall fall upon them," etc., one says three times Amen, Amen, Halleluyah, and goes home in good heart. Rashal wrote in teshuvah siman 70 that a blind person may bless on the moon even though he cannot bless on fire lights, for this was enacted on the renewal of the world — similar to "Who forms the lights." From here in the name of Sefer Shoshan Sodot: one begins by looking at the moon and afterward looks downward and completes the blessing.',
  },
  "output/siman_426/beer-hagolah/part-001.txt": {
    "1:_": "Statement of Rav Yehuda, Sanhedrin 42",
    "2:א": "Tur in the name of Mesechet Sofrim",
    "2:ב": "Gemara Sanhedrin there on the matter of blind persons.",
    "3:_": "There in Sanhedrin, and like Nehardeans",
    "4:_": "R' Yitzchak Gitliah, Shaarei Orah in teshuvah",
  },
  "output/siman_426/baer-heitev/part-001.txt": {
    "1:_":
      'Benefiting. That its radiance be recognizable on the ground; and there should not be a screen separating between him and the moon unless it is a thin thing through which the moon is seen so he can recognize things discernible by the moon\'s light — siman 7 there; and the same if covered in clouds — but if covered in a thin, light cloud he blesses; and if he began to bless and it became covered he completes the blessing (Radbaz part 1 siman 156; and Kenesset HaGedolah — it implies when he knows it will become covered immediately he should not begin to bless — Magen Avraham); and see in Turei David Beit Shmuel siman 242 that one who sees the moon through a lens or glass mirror should not bless on it — see there at length. That women do not practice Kiddush Levanah — even though they fulfill many positive time-bound commandments — because they caused the flaw of the moon (Magen Avraham in the name of Shlah — see there); and see another reason in Shevut Yaakov part 2 siman 11. A blind person is obligated in Kiddush Levanah (Rashal in teshuvah — Magen Avraham). In month 1 it happened that the moon was not seen and they did not sanctify the moon that month, and a certain rav decreed a fast on this — and he has nothing to rely on (Shevut Yaakov part 2 siman 10; and siman 570 s.k. 9).',
    "2:א":
      'On motza\'ei Shabbat. The Maggid wrote: when they sanctify the moon on motza\'ei Shabbat there will be success; and when it becomes covered and you cannot bless that month, you will not be successful — examine and forget (Magen Avraham); and see Olat Shabbat, Bach siman 80.',
    "2:ב":
      'The 10th of the month. Meaning five nights will remain until half of 29, 12, 793 from the day of the molad (Magen Avraham).',
    "2:ג":
      'No. And the Ari wrote to sanctify on motza\'ei the 9th of Av; and so Sefer HaKaneh — such is practiced in Jerusalem and Constantinople; and Shevut Yaakov part 2 siman 11 wrote such is their custom, but they taste something beforehand — see there. And Magen Avraham wrote: therefore it appears to me an individual who is fasting should sanctify with the congregation because of "in the multitude of people is the king\'s glory," and even Torah study they cancel for this; and even a fasting congregation, if they see the time will pass, they sanctify on the night of the fast — end quote. And so Taz: if they did not sanctify the moon on the Fast of Esther, one should bless then and we do not heed the fast since the time is passing. But during the seven days of mourning he should not sanctify; but if he did not complete his mourning until the 10th of the month, he should not wait until the night of the 11th and should sanctify during his mourning days (Magen Avraham). And Shevut Yaakov part 2 siman 11 wrote a mourner should not sanctify the moon until after three days of weeping — see there; and in Sefer Shnei Luchot HaBrit part 4 siman 95 he wrote: specifically when the time passes that he cannot sanctify the moon he may sanctify during his mourning days; but when there is still time to sanctify he cannot sanctify during his mourning days — see there.',
    "2:ד":
      'That falls on Yom Tov. And all the more they should not sanctify on Shabbat night; and the reason is there are boundaries above and one may not receive the Divine Presence on Yom Tov or Shabbat outside the boundary; and in siman 78 many reasons were written on this; and in Maharil it is written that Maharash permitted; and so Hagahot Maimoniyot; and Bach wrote that once the moon was not seen until the first night of Sukkot and they acted in Krakow and sanctified it afterward since it was impossible afterward — end quote. (And in the book of the author of Kenesset HaGedolah he concludes: if the 16th fell on Shabbat, they do not sanctify it; and after Shabbat they sanctify it without Shem uMalchut; and on a weekday he permits sanctifying on the night of the 16th.) But in another matter one should not be lenient, since there are many reasons per Kabbalistic tradition; and see Radbaz part 1 siman 133; and see Chayei Adam siman 494 s.k. 2 from what is written there.',
    "2:ה":
      'And one lifts. In Shlah and Hagahot Yesh Nochlin one should not look at it except the first time one sees its standing, and afterward it is forbidden to look at it.',
    "2:ו":
      'Three times. And beware not to bend, lest it appear as bowing to the moon — only stand on one\'s toes (Shlah).',
    "2:ז":
      'They shall fall, etc. And Matteh Moshe wrote in the name of Rashal and Rokeach that one says the entire verse until "You acquired" and afterward backward. And the Ari wrote that before Birkat HaLevanah one should say "Hallelu et Hashem min haShamayim" until "His ordinance they shall not pass," and shake the hems of one\'s garments; and also a Kabbalistic tradition from R\' Yehuda heChasid to say "The voice of my beloved" until "from the windows"; and in Shlah it is written that one says Shir haMa\'alot "I will lift my eyes," etc., and also "Hallelu El b\'kodsho," etc.',
    "3:_":
      'The molad. Magen Avraham raised that these sixteen we count from the hour of the molad me\'alav; and if it fell on motza\'ei Shabbat two or three hours into the night, it is permitted to sanctify at the beginning of the second night — and per Rama it is forbidden — see there; and see Turei David Beit Shmuel siman 256.',
    "4:א":
      'Seven. And the agreement of the Acharonim: if motza\'ei Shabbat falls after the 3rd of the month from the molad, they sanctify then because the congregation is gathered then and "in the multitude of people is the king\'s glory," and also not to miss the mitzvah; but if motza\'ei Shabbat is before three days, we do not sanctify, for they can wait until the coming motza\'ei Shabbat, as written in seif 2 — see there.',
    "4:ב":
      'And we do not. Bach wrote the reason is that they go out to the street as a person goes out to greet the king; and so in Hagahot Maimoniyot; nevertheless if he has some ailment or dwells among gentiles, he sanctifies under the roof or in his house through a window and door — end quote; and all the more when there are filthy alleyways, better to sanctify in the house; and so Matteh Moshe: I saw Rashal when he was in a joyous company and did not wish to go outside — he opened the window toward the moon and sanctified — see there; and siman 1 from what is written there.',
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
  /\bWhite Temple\b/i,
  /\bChristmas\b/i,
  /\bYom haDin\b/i,
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
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      risks.push({ file, key, pattern: "missing_translation" });
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("TOTAL", total);
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
