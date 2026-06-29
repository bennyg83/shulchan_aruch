#!/usr/bin/env node
/** worker slot 3 — siman 422 part 1 (prayer and Hallel on Rosh Chodesh) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_422/mechaber/part-001.txt": {
    "1:main":
      'The order of prayer and Hallel on Rosh Chodesh. Contains 7 seifim. At Arvit, Shacharit, and Mincha one prays the 18 blessings and says Yaaleh v\'yavo in Retzeh. If one did not say it at Arvit, we do not make him go back — (2) and at whatever point he remembers, he does not go back — see siman 294 seif 4 and 5 — whether Rosh Chodesh is one day or two days, because we do not sanctify the month at night. (3) But if one did not say it at Shacharit, we make him go back at Mincha. (4) And if he remembered before he began Modim, he says it at the place he remembered. (5) And if he did not remember until after he began Modim — if he remembered before he finished his prayer, he returns to Retzeh. (6) And if he did not remember until he finished his prayer, he returns to the beginning. (7) And if he is accustomed to say supplications after his prayer and remembered after he finished his prayer but before he uprooted his feet, he returns to Retzeh. {Rama: (8) And if it is doubtful whether he mentioned it or not, he need not go back — Kol Bo, Laws of Prayer. (9) And a prayer leader who forgot to mention it at Shacharit — see siman 126.}',
    "2:main":
      'And we recite Hallel skipping (בדילוג), whether as an individual or as a congregation. And some say the congregation blesses on it at the beginning "to read the Hallel" {Rama: and if he blessed to finish, he need not go back (Mordechai, chapter Bameh Madlikin, and Shibulei Leket)} and at the end Yehalelucha. And an individual does not bless on it. And some say even the congregation does not bless on it, neither at the beginning nor at the end — this is Rambam\'s view, and so is practiced in all the kingdoms of Eretz Yisrael and its surroundings. {Rama: And some say also an individual blesses (Tur in the name of Rosh and Rabbeinu Tam), and so is practiced in these countries. Nevertheless a person should be careful to read with the congregation in order to bless on it with the congregation. And some say when an individual reads, he should say to two that they say with him the chapter headings (ראשי פרקים), for then it is like many (Mordechai, chapter Bameh Madlikin, and Agur in the name of Shocher Tov). And they practice thus with Hodu and not with Ana.}',
    "3:main":
      "Regarding the verses that are doubled in it, and likewise regarding verses that the prayer leader says and the congregation answers after him — each place according to its custom.",
    "4:main":
      'Regarding interruption — even in the middle one may greet one who must be honored with Shalom, and respond Shalom to everyone; but for another matter one may not interrupt. {Rama: And specifically on Rosh Chodesh and Passover on days when we do not complete Hallel; but when we complete it, regarding interruption its law is like Shema — see siman 488 seif 1.}',
    "5:main":
      "If he interrupted in it and waited, even if he waited long enough to finish all of it, he need not return to the beginning.",
    "6:main":
      "One who reads Hallel out of order has not fulfilled. {Rama: If he erred, he returns to the place he erred (Rabbeinu Yerucham).}",
    "7:main":
      "The mitzvah of reading Hallel is while standing.",
  },
  "output/siman_422/turei-zahav/part-001.txt": {
    "1:_":
      'And if it is doubtful, etc. Beit Yosef brought on this that one must go back, for we say in Yerushalmi: all thirty days — presumption that what he is accustomed to he mentions; and so too in the name of Kol Bo in the name of Maharam. And one may question Rama who ruled he need not go back — on what did he rely in this? And further, what is different from siman 114 seif 8 where Rama himself ruled: if he was in doubt whether he said Morid HaGeshem — all thirty days he goes back, for certainly he said as he is accustomed; and that is like Yerushalmi here — so why did he rule he need not go back? And further, why did Rama not write divided opinions on this at least; and it seems there is a printing error here and it must read "he must go back." And one may answer according to correct reasoning — namely, that here there is no place for doubt at all: from where would it come to say that he mentioned, since Rosh Chodesh was not clear to him — certainly he did not mention; rather certainly the case deals with one who knew at the time of prayer, before he reached the place of mention, that it is now Rosh Chodesh and he must mention, only that afterward he forgot whether he had that in mind at the time he said the blessing in which the mention belongs — in this we say presumption that he did not forget from his thought at the time of prayer that it is now Rosh Chodesh, and certainly he mentioned; not so in that case in siman 114 regarding Morid HaGeshem, where the place of doubt is that perhaps he did not remember throughout the prayer that he must mention, as he is accustomed — the doubt is for that reason, as it appears to me to resolve; and it is correct, son, for halacha. And in Levush he wrote the reason he need not go back: since he is accustomed to it every Rosh Chodesh and thirty days have not yet passed — we say that since he knew it is Rosh Chodesh, only he is in doubt whether he said it, we suspend to say he said as he is accustomed every Rosh Chodesh — therefore what he wrote "thirty days have not passed" is not the point; for if he were accustomed to say it often, his habit is not uprooted except until thirty days; not so here where he said it only on Rosh Chodesh — no great uprooting of thirty days is needed. An example: a woman\'s fixed period — if she established it three times, uprooting likewise requires three times; not so if she did not establish it, only twice — uprooted on the first time. In any case I have from here proof for what I wrote in Yoreh De\'ah siman 69 in doubt whether the meat was salted — I brought it above siman 99 — that it is permitted; for here too we say what he is accustomed to he mentions, and we follow the habit; so too there regarding salting meat — and if so there is presumption it was salted, even though there is presumption on this meat that it was not salted from the outset when brought from the butcher; and when presumption opposes presumption we go leniently in a d\'rabbanan matter, apart from the reason we mentioned there from the majority.',
    "2:א":
      'And we recite Hallel. Mahari wrote in the name of Sefer Rokeach that one does not recite Hallel in a house of mourning, for it is written there "the dead do not praise God" — it is like mocking the poor.',
    "2:ב":
      'To read the Hallel. Meaning — and not to finish; even in a place where they complete Hallel, lest a word be missing and it be a blessing in vain. And Rosh holds "to finish" means like "to read," as written "they would complete it" — like our elders who read Shema — meaning, after the fact one fulfills by completing.',
    "7:_":
      'Hallel while standing. As written "Praise, servants of the Lord who stand"; and what they read seated on Passover night — since they divide it and do not read it all at once, we do not burden them to stand each time; and further, on Passover night the way is reclining and freedom.',
  },
  "output/siman_422/magen-avraham/part-001.txt": {
    "1:א":
      'See above siman 294 — meaning immediately when he finished the blessing, even if he has not yet begun Modim; siman 126 seif 2 — not like Acharonim on Shema.',
    "1:ב":
      'And if he is accustomed, etc. It implies that if he finished the supplications, even though he did not uproot his feet, he returns to the beginning — contrary to my words that one not accustomed to say supplications; however the wording does not imply so, and also in the Gemara there is one wording that one accustomed to say supplications — even if he uprooted his feet he does not return to the beginning; we learn that he holds there is no fixed status to supplications; and therefore per the latter wording too, even if he finished his prayer and supplications — as long as he did not uproot his feet he does not return to the beginning. However it is implied in Yerushalmi chapter 5 of Berakhot that whoever diverted his mind from prayer is as if he uprooted his feet; and it appears to me this is specifically when he said "Yehi ratzon," for that is the end of prayer, as above.',
    "1:ג":
      'And if it is doubtful, etc. — siman 108 and siman 124 seif 10; and Acharonim — not like Acharonim on Shema.',
    "1:ד":
      'He is in doubt, etc. And some disagree with what he wrote in siman 114: if he was in doubt whether he said Morid HaGeshem — we say presumption he said as he is accustomed without Morid HaGeshem and he must go back; we do not say so except regarding something he became very accustomed to — not so here, where we never find thirty days that he does not mention Yaaleh v\'yavo — it is not called habit — end quote D.M. (not like Acharonim on Shema). It implies he holds that even on Shabbat and Yom Tov, if it is doubtful, he need not go back, for he is more accustomed than on Rosh Chodesh; and Kol Bo wrote it is possible that on Shabbat and Yom Tov doubt does not apply, since it is a separate blessing; and Bach ruled as Rabbeinu Yerucham wrote that even on Rosh Chodesh we make him go back; and so Rokeach in the name of Yerushalmi; and so Lechem Chamudos with clear proof; and so one should rule — for behold our eyes see the habit is to pray without Yaaleh v\'yavo.',
    "2:א":
      'And we recite Hallel. That they do not bless Shehecheyanu on Hallel because sometimes the months are deficient and it falls within thirty days (Radak 25) — and it requires study; for also when the month is full there are two days of Rosh Chodesh and they read it on the thirtieth day. And it is possible he holds that since the second day is primary, on the first day it is like one who reads from the Torah who is not obligated in the matter. Nevertheless, on the essence of the law there is a refutation: they did not enact Shehecheyanu on something that comes regularly — only on something that comes twice a year, as written in Berakhot daf 36–37 that one blesses Shehecheyanu; and see siman 225: women are exempt from all of Hallel because it is a positive time-bound commandment, and therefore they cannot discharge others (Tosafot Berakhot daf 20, beginning of 2a) unless they answer after them word for word — and it would be a curse that he did not learn; and if he learned, he disgraces his Maker to make agents like these — Acharonim on Shema, Mishnah chapter 3 of Sukkah; and see siman 479: Bedek HaBayit wrote R.I.V. 513 — even though he fulfilled, he does not discharge, whether individual or congregation; and specifically when he is not expert and does not know to answer; but if he knows to answer — if he already fulfilled, he does not discharge unless he answers after him Halleluyah — end quote; and it requires study how this is in the Gemara; end quote s.v. and wondrous in my eyes on Rabbeinu Yerucham who is fluent in the pathways of the sugya — the beginning is Talmud Bavli chapter 3 of Rosh Hashanah and the end is Mishnah chapter 3 of Sukkah; and what R.I.V. wrote "if he fulfilled he does not discharge" — some explain likewise if he did not fulfill he requires that they answer after him Halleluyah; only that if he did not fulfill there is no concern for the reader, for he reads for himself; but if he already fulfilled it is forbidden for him to read again for his fellow if they do not answer after him Halleluyah; and it must be said he reads with a blessing, for in reading alone there is no prohibition; and it is possible that nevertheless there is prohibition, as we say in chapter 6 of Shabbat: one who reads Hallel every day — behold he blasphemes and reviles; and if so it is forbidden to read it as a song except at the time the Sages enacted (and it requires study in Shulchan Gavo\'a chapter 3 of Berakhot in the name of Riaz).',
    "2:ב":
      'To read with the congregation. And if he came to the synagogue near Hallel, he should read Hallel first with the congregation and afterward pray (Lechem Chamudos); and it is possible when he is saying Pesukei Dezimra he may interrupt in the middle to read Hallel with the congregation, for it is no worse than psalms they add on Shabbat; however it appears to me then he should not bless on Hallel, neither at the beginning nor at the end, since he says Baruch She\'amar and Yishtabach — if so, how can he bless twice? And similar is written in the Passover Haggadah; therefore specifically on Rosh Chodesh Hallel one does so, since most poskim hold not to bless; but on days when they complete Hallel he should not say it in the middle of Pesukei Dezimra.',
    "2:ג":
      'He says to two, etc. Lechem Chamudos wrote this is specifically on days when they do not complete, and because of doubt in the blessing; and what people practice to do so even on days when they complete is an error in their hands — end quote; and it seems he did not see Agur and Shiltei Gibborim who wrote in the name of Midrash Shocher Tov: one should not say Hodu except to two; and the reason — to whom shall he say Hodu? And so Tur siman 479; and so is widespread custom to repeat after two on Passover night, even though there is no doubt in the blessing; and in Mordechai he wrote the reason: mitzva to answer chapter headings; and see Yalkut Tehillim siman 112; and Agur wrote — and it requires study what he wrote regarding other Hodu that individuals say, such as in the Great Hallel; and it is possible that here, since it is a way of song, it requires that they answer after him as we find at the Song of the Sea.',
    "3:_":
      'And likewise in verses. One must hear "Let Israel say," etc. from the mouth of the prayer leader, for hearing is like answering; and if he did not hear he has not fulfilled; and better that they say it themselves quietly — see Gemara chapter 3 of Sukkah; and Tosafot wrote: that which they interrupt a verse Ana for two — yet we hold it is forbidden to interrupt in the middle of a verse; here it is different, for two people said it, as explained in chapter Ayei; and Kol Bo wrote specifically in Torah and Prophets, but in Writings it is possible it is permitted to divide; and see Rokeach who gave a reason why they divide the verse "Praise the name of the Lord," etc.; and that which they practice to divide verses of Az Yashir on circumcision day — one may say because they too said it piece by piece, as we say in Sotah chapter 7: he says "I will sing to the Lord" and they say "I will sing to the Lord."',
    "5:_":
      'He need not return. Even according to those who say in siman 65 that if he interrupted due to compulsion — such as the place was not clean — and he waited long enough to finish all of it, he must return — here all agree he need not, since they read it skipping (Beit Yosef); and if so, on days when they complete Hallel, if he interrupted due to compulsion and waited long enough to finish all of it, he must return to the beginning; and Bach ruled that even on Rosh Chodesh he must return; and in Darkei Moshe he wrote specifically regarding Shema which is d\'oraisa, as Raosh — but Hallel which is d\'rabbanan, he need not return to the beginning even on days when they complete; therefore he did not emend anything in Shulchan Aruch; and one who is stringent should return to read without a blessing; and see above seif 2.',
    "6:_":
      'He returns to the place he erred. Meaning: if he skipped one verse and remembered afterward, he should not say it at the place he remembered, for then it is reading out of order; rather he begins from that verse and says in order until the end, as written siman 294 seif 6.',
    "7:_":
      'While standing. Except Passover night (Beit Yosef, Shiltei Gibborim): it is forbidden to lean on something to stand or on a wall, for leaning is not like standing, as Tur wrote siman 141 and Tosafot Sotah daf 40; and I was very astonished at Rama in Choshen Mishpat siman 17 who wrote in the name of Rivash regarding testimony and standing by leaning — called properly standing for this matter; for Tosafot and Tur proved from Gemara Zevachim that leaning is not like standing; and it is simple Rama saw in Rivash\'s words in Choshen Mishpat siman 28 in the name of Rivash: if they accepted testimony standing — what was done was done; and if they were leaning on the pillar, even l\'chatchila permitted, for leaning is not like sitting — end quote; and Rama understood "and if they were leaning" refers to the witnesses — but this is not so, for he opened regarding judges; rather plainly there is a printing error and the correct reading is as Rabbeinu Yerucham in Shulchan Aruch: leaning is like sitting, and it refers to judges — if the judges were leaning on the pillar it is permitted, for leaning is like sitting, as above clearly in Shevuot: sitting is like one who spreads his legs; and even though there too it is also like standing, there it is different because only dignity is required; but where standing is required, it is forbidden to lean; and so Tosafot in Zevachim daf 19a; and even though they wrote there 2b: even though there is no sitting in the Courtyard, nevertheless leaning is permitted — one may say there it is different, for only actual sitting is forbidden because of honor; but for judges\' sitting, leaning is called sitting.',
  },
  "output/siman_422/beer-hagolah/part-001.txt": {
    "1:א": "Baraita Shabbat 24",
    "1:ב": "There — baraita",
    "1:ג": "Gemara Berakhot 29",
    "1:ד": "There — the latter wording of Rav Nachman bar Yitzchak; and so Rif, Raosh, and Rambam",
    "2:א": "Taanit 28",
    "2:ב": "So it appears from the words of Rif and from R' Yonah's explanation",
    "2:ג": "Rashi on the laws of Chanukah regarding the matter in seif 2.",
    "2:ד": "In the laws of Chanukah",
    "3:_":
      "Tur — from that which Sukkah 38 brings the custom of reading Hallel; and Ran wrote there: the custom is — wherever practiced, practiced, etc.",
    "4:א": "Statement of Rava, Berakhot 14",
    "4:ב": "Raosh there and most commentators",
    "5:_": "Rosh Hashanah 34, and like R' Yochanan his view",
    "6:_": "In Megillah 17",
    "7:_": "Shibulei Leket in the name of Rambam",
  },
  "output/siman_422/baer-heitev/part-001.txt": {
    "1:א":
      "Yaaleh v'yavo. And the prayer leader begins his prayer before the congregation; and when he reaches Yaaleh v'yavo he raises his voice to make heard to the congregation — see siman 114.",
    "1:ב":
      'Siman 294 — meaning immediately when he finishes the blessing, even if he has not yet begun Modim; see siman 276 seif 2; and see siman 108.',
    "1:ג":
      "We make him go back. And specifically if he has not yet prayed Musaf; but if he prayed Musaf he need not go back — Knesset HaGedolah, Acharonim; and see siman 126 s.k. 4 what is written there.",
    "1:ד":
      'Before he uproots his feet. And if he said "Yehi ratzon" it is as uprooting his feet — Magen Avraham.',
    "1:ה":
      'He need not. And the Acharonim questioned from what is written siman 114 seif 8: if he was in doubt whether he said Morid HaGeshem — we say presumption he said as he is accustomed without Morid HaGeshem and he must go back — Acharonim; and see in Acharonim what they answered on this; and Beit Yosef and Bach ruled we make him go back; and so Rokeach; and so Lechem Chamudos with clear proofs; and so one should rule — for behold our eyes see the habit is to pray without Yaaleh v\'yavo — Magen Avraham. And in Shakh Knesset HaGedolah he wrote: since there is a dispute on this, there is room to say sit and do not act is preferable and he should not go back; however the good and straight path is he should pray as a voluntary prayer — Acharonim; and see Shibulei Leket part 1 siman 78; and see what Taz wrote.',
    "2:א":
      "Hallel. And one does not read in a house of mourning, for it is written there \"the dead do not praise God\" — it is like mocking the poor; and see siman 131 s.k. 10 what I wrote there. Women are exempt from all of Hallel because it is a positive time-bound commandment — Magen Avraham; and see Yad Ephraim.",
    "2:ב":
      "The congregation. And if he came to the synagogue near Hallel, he should read Hallel first with the congregation and afterward pray — Lechem Chamudos; and it is possible when he is saying Pesukei Dezimra he may interrupt in the middle to read Hallel with the congregation, for it is no worse than psalms they add on Shabbat; however it appears to me then he should not bless on Hallel, neither at the beginning nor at the end; therefore specifically on Rosh Chodesh Hallel one does so, since many poskim hold not to bless; but on days when they complete Hallel he should not say it in the middle of Pesukei Dezimra — Magen Avraham, Acharonim.",
    "2:ג":
      "He says. And even if they complete Hallel — not like Lechem Chamudos — Magen Avraham, Acharonim; and if two are not available he need not trouble others — Acharonim; and it appears to me he should say without a blessing, as Shlah wrote Be'er Heitev that is before.",
    "3:_":
      'And the congregation. Magen Avraham wrote one must hear the verses "Let Israel say," etc. from the mouth of the prayer leader, for hearing is like answering; and if he did not hear he has not fulfilled; and better they say it themselves quietly — Magen Avraham, Acharonim.',
    "5:_":
      "Even. Magen Avraham raised this; and one who is stringent should return to read without a blessing — Acharonim.",
    "6:_":
      'The place. Meaning: if he skipped one verse and remembered afterward, he should not say it at the place he remembered, for then it is reading out of order; rather he begins from that verse and says until the end.',
    "7:_":
      'While standing. And it is forbidden to lean on something to stand or on a wall, for leaning is not like standing — Magen Avraham, Acharonim at length what he wondered on Rama in Choshen Mishpat siman 17, and examine. And what they read seated on Passover night — since they divide it, we do not burden them to stand — Taz.',
  },
};

// Mishnah Berurah + Machatzit Hashekel — continued in same object (split for maintainability)
Object.assign(fixes, {
  "output/siman_422/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) And he says Yaaleh v'yavo in Retzeh — explained above siman 276 seif 2 that the prayer leader announces between Kaddish and prayer that it is Rosh Chodesh, and it is not considered an interruption since it is a need of prayer.",
    "1:ב":
      '(2) And at whatever point, etc. — see above siman 294; and there it is explained that once he began "and may our eyes see" and mentioned "Blessed are You, Lord," even if he did not finish, he does not go back, etc.',
    "1:ג":
      "(3) At night — and Rosh Chodesh sanctity was not yet on the day; and even on the second night of Rosh Chodesh this reason applies, for the second day is only because of doubt — if day one were holy, day two would be weekday.",
    "1:ד":
      '(4) We make him go back — Kenesset HaGedolah wrote: specifically when he remembered before he prayed Musaf; but if he did not remember until after he prayed Musaf, he fulfills after the fact with what he mentioned sanctity of the day in Musaf and need not return to pray Shacharit — as we are lenient in this siman 126 seif 3 regarding a prayer leader; l\'chatchila one may be lenient in this at least for an individual after the fact; and Magen Avraham brought it there s.k. 3. But in remaining blessings, in the name of Rashba, he wrote that an individual always goes back even if he already prayed Musaf; and so agreed Mor VeKetzia — only he wrote that nevertheless because of doubt he should pray, for if he is not obligated he prays as a voluntary prayer. However if while praying the first three [blessings] he intended to pray Musaf and remembered he did not say Yaaleh v\'yavo in Shacharit — certainly one should rule he finishes the prayer as Shacharit and afterward prays Musaf.',
    "1:ה":
      '(5) He says at the place he remembered — and afterward says Modim; meaning even if he already said and finished the blessing "and may our eyes see," and if he has not yet finished he returns only if he said "Blessed are You, Lord" — we wrote above siman 114 seif 6 in Biur Halacha that it is more correct to finish "teach me Your statutes" so the mention of the Name not be in vain; and he says Yaaleh v\'yavo and afterward says again "and may our eyes see"; and so in Shaarei Teshuvah.',
    "1:ו": "(6) He returns to Retzeh — for the last three blessings are considered as one.",
    "1:ז":
      '(7) Until he finished his prayer — meaning he finished the blessing "grant peace" and said "Yehi ratzon," etc.; for "Yehi ratzon" is part of prayer, as above siman 122.',
    "1:ח":
      "(8) And if he is accustomed, etc. — and there is no difference whether he says supplications before Yehi ratzon or after Yehi ratzon; for as long as he is still engaged in supplications, or still needs to say supplications, it is not yet called leaving prayer.",
    "1:ט":
      "(9) Before he uprooted his feet — he used this wording because the Mechaber deals with one who has not yet said supplications, only that since he is accustomed, presumably he will begin to say them now; but if he already said supplications and finished them and has no intention to say more, even if he has not yet uprooted his feet, he is as one who uprooted and returns to the beginning of prayer.",
    "1:י":
      '(10) He need not go back — the reason: since thirty days do not pass without mentioning Yaaleh v\'yavo, this is not a complete presumption to say he certainly did not mention; nevertheless for halacha we did not rule thus, for most Acharonim and nearly all disagree and hold that even in doubt he must return and pray, for presumably he prayed as he is accustomed every day without Yaaleh v\'yavo. However we already wrote above siman 114 in Mishna Berurah s.k. 138 in the name of Acharonim: if it is clear to him he intended to remember in line with the occasion within prayer, and after much time doubt fell in his heart whether he remembered in prayer or not — he need not go back; but all this if the doubt came to him after time; but if the doubt arose immediately after prayer, he should go back.',
    "1:כ":
      "(11) And a prayer leader, etc. — in siman 126, for there it is explained he need not go back because of burden on the congregation; and he may rely on Musaf prayer he will pray, where sanctity of the day is mentioned.",
    "2:א":
      '(12) And we recite Hallel skipping — and all of Hallel one does not read [in one pass], because it is written "the song shall be for you as on a night of sanctified festival" — we expound: what is sanctified for festival (meaning forbidden in melacha) requires song; what is not sanctified for festival does not require song (Arakhin 10a); only our fathers practiced reading it, and so there should be recognition it is not from law — therefore they skip in it. The widespread custom skips from "not to us" until "remember us," and from "for He heard" until "what shall I return"; and some skip another skip [Rambam]; and see Avraham Zvi the reason for our custom.',
    "2:ב":
      '(13) He need not go back — after the fact; for the wording "to finish" is not precise regarding one who finishes — for sometimes "finish" in sages\' language is like "read."',
    "2:ג":
      "(14) And some say even the congregation, etc. — for the essence of Hallel on Rosh Chodesh is only custom and not from law, as above; and by custom one does not bless.",
    "2:ד":
      '(15) And some say also an individual, etc. — and even though it is only custom, we find many things that are only custom and nevertheless one blesses on them.',
    "2:ה":
      '(16) And nevertheless a person should be careful, etc. — to fulfill the view of poskim that an individual does not bless on it; therefore Acharonim wrote if he came to synagogue near Hallel he should read Hallel first with the congregation and afterward pray; and they also wrote if he is in the middle of Pesukei Dezimra he may interrupt to read Hallel with the congregation — this interruption is not worse than psalms they add on Shabbat; however he should not bless on Hallel, neither at beginning nor end, and he fulfills with what he already blessed Baruch She\'amar at the beginning and Yishtabach at the end. All this on Rosh Chodesh Hallel, where poskim hold not to bless; but on days when they complete Hallel, when he is obligated in the blessing per all — he should not say it in the middle of Pesukei Dezimra lest he lose the blessings.',
    "2:ו":
      '(17) He says to two, etc. — such as when saying Hodu they also answer after him Hodu; and when saying Ana they answer after him Ana.',
    "2:ז":
      '(18) And they practice thus with Hodu and not with Ana — for with Hodu this applies more, for behold he says Hodu and it implies to others he says; and Acharonim wrote there is no difference between Rosh Chodesh and days when they complete Hallel; and in every case he should say to two [and what Rama wrote "then it is like many" means on Rosh Chodesh it applies even more that one fulfills somewhat the view of poskim that we require a congregation for blessing on Hallel]; only they wrote the essence of this matter is only l\'chatchila, and if two are not available before him he need not seek them.',
    "3:א":
      "(19) Regarding verses that are doubled in it — and in our places the custom is to double from \"from Your greatness\" until the end of Hallel.",
    "3:ב":
      '(20) And likewise in verses, etc., and the congregation answers after him, etc. — see Tur: the prayer leader says "Give thanks to the Lord," etc., and the congregation answers after him "Give thanks," etc.; and he says "Let Israel say," etc., and the congregation answers after him "Give thanks," etc.; and likewise "Let the house of Aaron say" and "Let those who fear the Lord say"; and Acharonim wrote that even though the prayer leader says "Let Israel say," etc., "Let the house of Aaron say," etc., "Let those who fear the Lord say," etc. — the congregation may fulfill with what they hear from the prayer leader, for hearing is like answering; nevertheless it is better they say it themselves quietly, for sometimes he is not precise; and so is practiced today.',
    "4:א":
      "(21) Even in the middle — meaning in the middle of the chapter; and see above siman 66, and the Talmud here explains the matters.",
    "4:ב": "(22) But for another matter, etc. — and even between chapters [Peri Chadash].",
    "4:ג": "(23) And see siman 488 — where interruption laws are explained well.",
    "5:א":
      "(24) And he waited — even if he waited due to compulsion, such as the place was not clean, and the like.",
    "5:ב":
      '(25) He need not return to the beginning — and even when they complete Hallel likewise he need not return, even per Rama\'s ruling in siman 65 regarding Shema that when the wait was due to compulsion he must return to the beginning — Hallel is different, for its entire essence is only d\'rabbanan; and even when they complete it we are not stringent; and some are stringent — and therefore it is good to return and read without a blessing; and see above siman 65 in Mishna Berurah and Biur Halacha where we explained all these details of law.',
    "6:א":
      '(26) Out of order he has not fulfilled — derived in Gemara from "from the rising of the sun until its setting, praised is the name of the Lord" — just as the sun goes in order from east to west, so praise must be in order specifically, not out of order; and this "out of order" apparently is specifically regarding order of verses; but if he advanced one section before its fellow, even though he is not permitted, he fulfills — as above siman 64 regarding Shema. However many Acharonim are stringent regarding Hallel even in sections, since they are adjacent in Tehillim; and therefore certainly correct to be stringent and return to read; but if he returns and blesses, it requires study; and even regarding reading verses out of order likewise the matter is not clear regarding Rosh Chodesh whether he should return and bless, as I wrote in Biur Halacha.',
    "6:ב":
      '(27) To the place he erred — meaning if he skipped one verse and remembered afterward, he should not say it at the place he remembered, for that is reading out of order; rather he begins from that verse and says in order until the end; and if he does not know where he erred, he returns to the beginning of the section where doubt fell.',
    "7:_":
      '(28) While standing — because Hallel is testimony of praise of the Omnipresent and His wonders and miracles He did for us; and mitzvot of testimony are while standing; and so is written in Hallel "Praise, servants of the Lord who stand," etc. However on Passover night, since they divide it and do not read it all at once, we do not burden him to stand each time; and further, the way of Passover nights is reclining and freedom [Shibulei Leket]; and nevertheless after the fact if he read seated, even on days when they complete Hallel he fulfills [Peri Megadim].',
  },
  "output/siman_422/machatzit-hashekel/part-001.txt": {
    "1:_":
      '(s.k. 1) See above siman 126. See siman 276 seif 2 — not like Acharonim on Shema; meaning Acharonim wrote the prayer leader should begin Arvit when Rosh Chodesh enters, before the congregation begins, so he reaches Yaaleh v\'yavo before the congregation; and then when he reaches Yaaleh v\'yavo he announces loudly Yaaleh v\'yavo to remind the congregation; but he may not interrupt between Kaddish and the 18 blessings to announce Yaaleh v\'yavo; and above siman 276 it is explained he may interrupt since it is a need of prayer; and also Arvit is optional — see Magen Avraham.',
    "2:א": '(s.k. 2) And if, etc. — it implies, etc.; meaning from reasoning.',
    "2:ב":
      'My words "one not accustomed," etc. — meaning he must return to the beginning; and behold if he is accustomed to say supplications, in any case he finished the supplications and it is as if he finished prayer.',
    "2:ג":
      'We learn that he holds, etc. — therefore, since he uprooted his feet he finished the supplications — why would he uproot his feet in the middle of supplications? And nevertheless, since he is accustomed to say supplications, he does not return to the beginning, for it is as if he did not finish his prayer; and therefore, because there is no fixed status to supplications, even if he uprooted his feet he can still add supplications.',
    "2:ד":
      'And if so, per the latter wording, etc. — meaning as we hold, both are required: accustomed to say supplications and also he did not uproot his feet.',
    "2:ה":
      'And it appears to me, etc., Yehi ratzon, etc. — wrote in Sefer Avraham Zvi: even per Magen Avraham above siman 122 s.k. 1 in the name of Lechem Chamudos and Bach to say Yehi ratzon before supplications and after them — nevertheless saying the first Yehi ratzon before supplications is not called finishing and diversion of mind; and in my humble opinion the matter is doubtful to me.',
    "3:א":
      '(s.k. 3) And if, etc. — siman 108: he erred and did not pray Mincha on erev Rosh Chodesh — how should he conduct himself; and likewise erred and did not pray Mincha on Rosh Chodesh.',
    "3:ב":
      'And siman 124 seif 10: if he forgot Yaaleh v\'yavo he must return and pray; it suffices if he intends for the prayer leader from beginning of 18 of Arvit to its end; nevertheless Magen Avraham wrote in the name of Rashba and Bach that a person cannot intend — therefore he should return and pray.',
    "4:א":
      '(s.k. 4) He is in doubt, etc. — even on Shabbat and Yom Tov he is more accustomed, etc.; the word "and Yom Tov" is not precise, for Rosh Chodesh is more accustomed — he cited because of Kol Bo\'s words.',
    "4:ב":
      'And Kol Bo wrote, etc. — z"l. Kol Bo in the chapter "three who ate" — we learn in Yerushalmi that in doubt whether he mentioned on Rosh Chodesh and Chol HaMoed we do not make him go back; and it requires study why he did not mention the law of Shabbat and Yom Tov. And one may say on Shabbat and Yom Tov we make him go back because it is a separate blessing (meaning we say: since he was in doubt, certainly he forgot); or one may say likewise we do not make him go back, but he did not explain their law because doubt does not apply to them since it is a separate blessing (meaning their matter is in the present, that there is no way to be in doubt about them; but if it actually occurred that he was in doubt, he does not go back); and so one should rule. And see Taz who distinguished from reasoning: if he remembered at the time of prayer that today is Rosh Chodesh and he must say Yaaleh v\'yavo — in such a case if afterward he was in doubt, he need not go back; and if not, he must go back. And in Sefer Avraham Zvi he brought his words and disagreed and ruled like Magen Avraham.',
    "5:א":
      '(s.k. 5) And we recite, etc. — specifically on something that comes twice a year, etc.; meaning from reasoning one does not bless except on fruit that renews from year to year, or on a festival that comes only once a year; but we find in Tosafot Berakhot that even what comes from half the year one blesses Shehecheyanu, as the baraita teaches: when a kohen offers a meal-offering he blesses Shehecheyanu — dealing with one who offers once in his watch; since there were 24 priestly watches rotating each week, another watch served; therefore since each watch comes only twice a year, when he sacrifices first in his watch he blesses Shehecheyanu; but on something that comes within half a year we do not find one blesses Shehecheyanu. This requires study, for we hold one who sees his fellow after thirty days blesses Shehecheyanu — as above siman 225; and see Sefer Avraham Zvi.',
    "5:ב":
      'And one must distinguish. And it is possible Magen Avraham hinted at this in what he wrote; and see what he wrote siman 225, or he intended what is written there seif 6 in the gloss: on fruit that renews twice a year one blesses Shehecheyanu; and Magen Avraham wrote there proof from the aforementioned Tosafot — and it implies specifically twice, but three times not, for it requires specifically half a year.',
    "5:ג":
      "Women are exempt from all of Hallel, etc. — Tosafot Berakhot 20; and in Sukkah daf 38a Tosafot wrote that Hallel said on Passover night in the Haggadah — women are also obligated, for they too were in that miracle.",
    "5:ד": "Chapter 3 of Sukkah daf 38 — it states so there.",
    "5:ה":
      'Bedek HaBayit wrote, etc. — "he does not know to answer" — meaning Halleluyah.',
    "5:ו":
      'Unless he answers after him Halleluyah on every word and word — but this alone does not suffice; he must also answer with him chapter headings; and how is the dispute there in Sukkah between Rashi and Tosafot — what is answering chapter headings — see Acharonim.',
    "5:ז": "Talmud Bavli is chapter 3 of Rosh Hashanah; and so above siman 124.",
    "5:ח": "Chapter 3 of Sukkah daf 38b — only if he did not fulfill there is no concern for the reader, as must be.",
    "5:ט":
      'For himself. And the concern is only on the listener to fulfill, and he is required to answer Halleluyah; for reading alone there is no prohibition; and if so there is no difference between fulfilled and not fulfilled, for even if he fulfilled there is no concern for the reader since he does not bless — if so, what prohibition is there in saying psalms of Tehillim? Only at the time the Sages enacted.',
    "5:י": "And see Magen Avraham siman 584.",
    "6:_":
      '(s.k. 6) To read, etc. — and similar is written in the Passover Haggadah, as explained in Tur siman 480: we say in Pesachim: the fourth cup — one says on it the blessing of the song; and they explain: what is blessing of the song? R\' Yehuda says Yehalelucha and conclude with "praised in praises"; and R\' Yochanan: Nishmat kol chai and conclude with Yishtabach; and Rashbam wrote: since the halacha was not stated neither like one nor like the other, we do both and conclude Hallel with "Blessed are You, Lord, King, praised in praises"; and say the Great Hallel and Nishmat and conclude again with "Blessed are You, Lord, King, praised in praises"; and R\' Chaim Kohen — he would not conclude in the middle of Yehalelucha with "Blessed are You," etc., rather would conclude after Nishmat — for why sign twice on one matter — end quote; and we hold like R\' Chaim Kohen; and the same here. But on days when they bless per all, he should not say it in the middle, etc., lest he lose the blessings.',
    "7:א":
      '(s.k. 7) He says, etc. — and because of doubt in blessing. Some say an individual does not bless; and since he joins to Hodu two people, it is called many.',
    "7:ב":
      'Mitzva to answer chapter headings. As above in Sukkah daf 38b; as we find at the Song of the Sea that Moses and Israel said so, as in Sotah chapter 7.',
  },
});

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
