#!/usr/bin/env node
/** Apply keyed English replacements: relPath -> { "seif#marker": "text" } */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_201/beer-hagolah/part-001.txt': {
    '9#_':
      "Rambam's wording in chapter 9, halacha 14 of Hilchot Mikvaot — from that which Avuhu diShmuel made mikvaot for his daughters, etc. (Shabbat there 71a); and that which we learned in Mishnah 5, chapter 5 of Mikvaot — R' Tzadok testified regarding zochalin that overcame notfin, etc. — is to validate them for zavim and metzoraim, for they require mayim chayim; but for ashboran it helps even half against half, as Mahari Kuravas wrote, and Beit Yosef in the name of Raavad in Sefer Baalei Nefesh.",
    '30#_': 'Rashba in Terumat HaDeshen (Shaar HaMayim):',
  },
  'siman_201/beur-hagra/part-002.txt': {
    '70#_':
      "\"For behold there is,\" etc. — Rambam's wording; and not like the words of the poskim, because it is entirely sheuv d'oraisa — end of his words there.",
  },
  'siman_201/yad-avraham/part-001.txt': {
    '1#_':
      '(Siman 401 in Shulchan Aruch, seif 24.) "All other liquids," etc., do not invalidate. See Shach in the name of Rambam that beer invalidates — and he did not show his source; also Kesef Mishneh in Hilchot Mikvaot was silent on this, and it is clear in Eruvin (daf 29 side b); and see there Ritva, who proved that it deals with when it soured. And even though we learned that temed that soured does not invalidate the mikveh — that is because the wine and water in it do not join together to invalidate with three log, like temed that did not sour; but if there are three log of water in it, even when soured, the three log of water in it invalidate.',
  },
  'siman_228/beer-hagolah/part-001.txt': {
    '14#א':
      "As Rav Huna and Rav Papa — Gittin 35b; Tosafot there; Rashba and Shach from Yerushalmi in that case that came before R' Bon, etc.: he said, 'I meant to play dice.'",
    '14#ב': "From Rashi's explanation there in Gittin, and so it appears from Yerushalmi.",
    '14#ג': 'Rashba in a responsum, and so Rosh there, and Rivash in a responsum.',
    '14#ד': 'Rashba in a responsum.',
    '17#א':
      'As Rav Papa said in the question, s.v. ein chacham, etc. — Nedarim 90a — agreement of the poskim.',
    '17#ב': "Rambam's wording there, in chapter 7 of Hilchot Shevuot, halacha 14:",
    '17#ג': 'Ran in a responsum, siman 50:',
    '28#_':
      'Rivash, part 3, siman 178, from Yerushalmi — and I cited this above, seif 14.',
  },
  'siman_228/beur-hagra/part-001.txt': {
    '22#א':
      '"A vow," etc. — as written in Gittin 46a, and many rishonim, etc.; and we hold like RAN, as written in Rosh at the beginning of chapter 8 of Nazir, 57a.',
    '22#ג':
      "\"For the purpose of one.\" — And proof from a woman who vowed according to her husband's will, and nevertheless the sage releases — Rosh in Gittin.",
  },
  'siman_228/beur-hagra/part-002.txt': {
    '50#א':
      '"Doubtful wording," etc. — as above, 231, and so here; and as written (Yevamot 2b): unspecified vows — to be stringent, and their explanation — to be lenient.',
    '50#ג':
      '"Congregation," etc. — as written in Avodah Zarah 36a, and our rabbis relied, etc.; and Rashi in Chullin 6a, s.v. vekiblu, etc.; and likewise in the first chapter of Shabbat (14b): Shemayah and Hillel decreed, etc.',
  },
  'siman_242/beer-hagolah/part-001.txt': {
    '2#_': 'Statement of amoraim, Sanhedrin 110a:',
    '22#_':
      "Tur in the name of Rambam, chapter 5 of Hilchot Talmud Torah, from the statement of R' Abba — Avodah Zarah 19b:",
    '32#_': 'Tur in the name of Rambam, chapter 5 of Hilchot Talmud Torah:',
  },
  'siman_234/beer-hagolah/part-001.txt': {
    '38#_': 'Braita there, daf 69 side a, and Bach.',
    '73#_':
      "Rambam's wording there, halacha 10 (Semag end of negative commandments 242), and so Tur in his name, and like the Sages in the braita there, daf 87 side b — even though it is unspecified in the Mishnah and disputed in the braita, the halacha follows the unspecified Mishnah; but here is different, because R' Yochanan said: this is the words of R' Yishmael, etc. — it implies we hold like the Sages.",
  },
  'siman_267/beer-hagolah/part-001.txt': {
    '13#_': 'Tur in the name of Rif there, and so from the words of Rambam there, chapter 1.',
    '36#_':
      "Rambam's wording in chapter 9 of Hilchot Eirusin, halacha 6 — from that which R' Papa said to Rava: see, master, the house of Papa bar Abba, etc. — Yevamot 46a.",
    '57#_': "Braita there, 24b, like R' Shimon, R' Eliezer, and R' Akiva.",
  },
  'siman_242/beur-hagra/part-001.txt': {
    '25#א': '"When he dies," etc. — as written regarding his father, 22b, and Abudraham.',
    '25#ב': '"And some say," etc. — like the law of other dead there, and as written, they were not equated, etc., and Rashi there.',
    '25#ג': '"And not so." — Braita there, 26a.',
    '25#ד':
      '"And he mourns," etc. — there 25b, even his teacher, etc.; and we say there 20b, and learn partial, etc.',
  },
  'siman_217/pitchei-teshuva/part-001.txt': {
    '1#_':
      '"After the language." — See Shevut Yaakov, part 1, siman 73, regarding one who vowed from a fetus in an animal\'s womb — whether it is permitted to benefit from its body while still pregnant, or not, because a fetus is its mother\'s thigh. He ruled: even though we establish that a fetus is its mother\'s thigh — this is if he vowed from its mother, he is forbidden to benefit even from what is born; but not the reverse. And he brings proofs on this from the Gemara in Temurah — see there. And see in Noda Biyehudah, second series, part 4, siman 5, who wrote regarding a community that decreed in cherem that a certain slaughterer\'s slaughter would be forbidden — it is permitted to eat from his slaughter if another Jew checked the knife and gave it to him, for in common speech "his slaughter is forbidden" means like the slaughter of an apostate; and the same applies to an apostate — see there, siman 2.',
    '2#_':
      '"For he did not intend." — See Chavot Yair, siman 16: even if they did not show at the time of the vow, but afterward he said his intention was only animal meat, for they call it "meat" without specification — he is permitted in poultry — see there. And the reverse requires study. Abudraham and Demei above, siman 210, regarding wheat bread and barley bread.',
    '8#_': 'See Abudraham and see in responsum Bigdei Kehunah, part 4, siman 7.',
    '11#_': 'See there in the Gemara.',
  },
  'siman_217/baer-heitev/part-001.txt': {
    '1#א':
      '"And boiled." — Meaning: shaluk (lightly boiled), and not shalut (over-boiled); but in any case shalut is included in "cooked" everywhere — so Tosafot, Ran, Bach, and this is the main point.',
    '1#ב':
      'The language. Rabbeinu Yerucham wrote: and if there is no common human language — such as one who vowed in the holy tongue and in that place they do not speak it — we follow the language of the Torah — end of his words. (One who swore not to rent out or pledge his house except to so-and-so — inheritance is not included — Rashdam Chelek Choshen Mishpat siman 256; and see above siman 296 note 7: from what Shach wrote in the name of Raanach — one who swore to do a thing when he is married, or the reverse "I will not do this thing when I am married" — he did not violate his oath as long as he has not married a woman with ketubah and kiddushin and seven blessings; and likewise he was not obligated to do it except when married with ketubah and seven blessings; since both in Talmudic language and common language marriage language is distinct from engagement language — Kenesset Hagedolah and Radbaz and Rashdam; but Maharival part 3 siman 117 wrote that engagement is included in marriage — see there; see in Kahag: one who swore not to marry another woman besides his wife — engagement is not included, and likewise in a place where they practice cherem of Ragmah that kiddushin are not included — Rashdam Choshen Mishpat siman 98; and according to Maharival above, even engagement is included — see Kenesset Hagedolah. One who vows from Reuven and his sons and sons of his sons is permitted in the fourth generation — Kenesset Hagedolah; and likewise in Shiyurei Torah Chelek Choshen Mishpat siman 173; and Maharam of Trani part 2 siman 28 wrote it is a doubt.)',
    '4#א': '"Raw." — Meaning those vegetables that are also eaten raw — Shach.',
    '4#ב':
      'In pickled [vegetables]. Shach explained: even those that are eaten only pickled; nevertheless those vegetables are forbidden to eat even cooked; but raw vegetable is certainly permitted to eat — so Maharshal; but Taz ruled that if he says "pot vegetables" it is forbidden raw and pickled but not cooked; and if he said "vegetables that are cooked" then pickled and raw are permitted — see there, he elaborates on this.',
    '8#_':
      'showing. In Tur he wrote according to the Gemara that if one vowed on bloodletting days, fish are not included in the vow, for otherwise he does not eat them and need not vow; and this is on day one of bloodletting, for they said "two for blood, fish"; however it is astonishing, for we say there in the Gemara that one who let blood should not eat eggs, yet the world is accustomed to eat eggs immediately after bloodletting; possibly their bloodletting was more severe, for they let much blood — end of his words, Taz. (And in Nechmat Chaim he distinguishes between soft roasted and cooked hard, as in chapter Keitzad Mevarchin, and so known to physician scholars — end of his words.) And he wrote in responsum of Maharit: one who vowed not to buy for Shabbat except half a piece of meat — it appears he did not intend except meat of domestic animal sold by the piece, but poultry is permitted (Maharam of Trani part 1 siman 258).',
    '9#_':
      'In both of them. Maharshal wrote: it appears to me that nowadays both are forbidden, for we follow common language; nevertheless we permit unspecified regarding fish — end of his words; it is clear from his words that nowadays one who vows from meat unspecified is permitted in fish, for it is not the custom now to consult an agent on his behalf — Taz; and he wrote further that this basar alai is a corruption and should read basar zeh.',
    '10#א':
      'Tasting. And likewise "I eat" — so Maharshal; and a thing that comes to impart taste in a pot, such as garlic and onions and the like — all are included in the name spices, and in those it is relevant to distinguish between raw and cooked; but in peppers and the like one cannot so divide — Beit Yosef and the Acharonim.',
    '10#ב':
      'In asparagus. Taz wrote: and according to Rambam\'s explanation that it is a type of boiled vegetable — why is one who vows from cabbage forbidden in asparagus, unlike one who vows from meat who is permitted in gravy? One can say that in their time they also called asparagus cabbage and not the reverse; unlike meat and gravy, for gravy was never called meat in those days.',
    '10#ג':
      'In gardens. And it appears that nowadays field vegetables are also forbidden, for they are also called vegetables in common language — Shach.',
    '11#_':
      'In qum [whey]. Rashi explained this is nessiovei dechalba [whey of milk], and see above siman 81 note 5 and siman 87 note 8.',
    '12#_':
      'In brine [pickled fish]. Taz and Shach wrote that this means only what already came out of them before the vow; but what came out of them after the vow is forbidden, if he said konam fish that I taste, or that I eat, or konam these fish — as above siman 296 seif 9. (And likewise regarding qum and date honey that comes from them after the vow is forbidden — Maharshal.) And Rosh wrote: if he said "fish" or dag dagah, he is forbidden in large and small; but in dagah alone he is forbidden only in small — according to all.',
    '14#_':
      'Permitted. For unspecified honey is from bees. (One who vowed not to eat for a known time something from a living creature — permitted to eat bee honey and to drink honey-water called mead — Avodat Hashem siman 29 see there.)',
    '16#_':
      'For us. For we interpret in a foreign language, and therefore if one vowed from tirosh in the holy tongue, wine is forbidden to him and all kinds of sweetening are permitted, for we do not read tirosh except as wine in the language of the Torah — end of his words, the Ran.',
    '17#_':
      'Most. And we do not follow the majority in a case of doubt regarding vows to be stringent, and see above siman 208 seif 1.',
    '18#_':
      'Regarding the five [species]. They are wheat, barley, spelt, oats, and rye.',
    '19#א':
      'From food. Meaning, even in a place where they make bread from wheat and barley, and one vowed from food — his intent is the five species of grain food.',
    '19#ב':
      'That sustains. And it deals with when he forbade only for a time he can stand on it; otherwise it is like one who vowed from all fruits of the world, which is not a vow at all — as below siman 232 seif 5 — so Bach and Prisha.',
    '22#_':
      'In all of them. And as Beit Yosef in the name of Ran: this is specifically when he did not forbid them except for a time he can stand on them; but forever is not a vow at all, for it cannot be fulfilled. And since they wrote so at the end regarding annual produce and did not write so at the beginning regarding annual fruits, it implies there it is a vow even forever, since he is permitted in kids and lambs he can fulfill his vow — so Shach, and likewise below siman 232 seif 5 — end of his words.',
    '23#_':
      'Forbidden. Taz wrote: and it appears that nevertheless he is permitted in kids and lambs and other animals, and not like Bach — see there.',
    '26#_': 'The sun. For there is bodily benefit.',
    '28#_':
      'His upper story. Rosh wrote: but a room and side-chamber are not included in "house" (for one who sells one part of the house did not sell the side-chamber nor the room). And see Choshen Mishpat siman 214.',
    '29#_':
      'To carry her [pregnancy]. And even though for other matters within the boundary the law is as a city upon her — as written in Orach Chaim siman 396 and siman 574; and below siman 221 seif 33 in Hagah — this case is different in vows, for we follow common language, which is only within seventy cubits and remnants — end of his words, Shach.',
    '32#_':
      'Language. He wrote in responsum of Maharit: and in these places in our time it appears it is not called a dwelling in common language in one place for less than six months.',
    '35#א':
      'Upon me. Meaning: after thirty days those going down to the sea are forbidden to me.',
    '35#ב':
      'At the time. For after the time of expression we follow in vows, not after the vow takes effect — and see above siman 234 note 34; and it appears the law is so in all other matters too, such as one who said after a time the inhabitants of such city will be forbidden to me, and meanwhile one uprooted his dwelling from that city — he is forbidden to him, since at the time of the vow\'s expression he was from that city; and likewise if at the time of expression he was not there, even though at the time the vow takes effect he is there — permitted; and likewise all similar cases — end of his words, Shach.',
    '36#_':
      'Seeing. And Taz disagrees on this and wrote: it appears in practice one should not rely to permit the language "those who see the sun" regarding blind people, since the other poskim did not distinguish — Tur is alone against them; and so Bach, one may not permit — see there at length.',
    '37#_':
      'The sun. Meaning forbidden to benefit from sunlight — Tur wrote: one who vows from the born or those to be born is forbidden both those already born and those to be born afterward; and he is permitted only in birds and fish that lay eggs and are not accustomed to bear live young; and even though a person does not dedicate what has not come to the world (and as written above regarding one who vowed to give tithe from profit — possibly this is more called "come to the world"; and further, even though a person does not dedicate for the sake of Heaven, nevertheless a person can forbid upon himself for the sake of Heaven — end of his words, Shach.',
    '39#_':
      'Jerusalem. Taz wrote: in the hagahah of Prisha he wrote that if one vowed from festival pilgrims he is forbidden even in Samaritans, for they ascend Mount Gerizim; and let this ruling be silenced, etc.; and certainly these words did not emerge from that righteous one\'s mouth himself — end of his words.',
    '42#_':
      'Regarding arelim [uncircumcised]. For the term arelim is applied only to the Jewish nation — Taz.',
    '47#_':
      'I swear. Rambam wrote in chapter 9, after writing all the laws written in this siman and in all these matters and the like, that the law of one who vows and one who swears is one, and Beit Yosef brings this and it is straightforward, and see above siman 239 — end of his words, Shach.',
    '48#א':
      '"to turn aside" — they call it in foreign language weten, and Beit Yosef wrote in the name of Rabbeinu Yerucham here that the essence of his intent in his oath was to refrain from any amusement that leads to monetary loss; from this it is implied that one who swears without specification not to amuse himself means a matter in which there is monetary loss, but without loss it is permitted to amuse oneself; nevertheless it appears to me that we follow the intent of the one who swore in this — if it was on account of monetary loss that he was concerned, or because he was losing time in kinds of amusement, then even to amuse oneself for free is forbidden — end of his words, Taz.',
    '48#ב':
      'His intent. It is written in responsum of Maharim: scribe of Reuven who gave him 220 [zuz] when Reuven\'s work is finished not to write for any person except Shimon; and afterward the city burned and one notebook of Reuven that the scribe had written burned; and now the scribe asks whether he can write that notebook when he finishes his work before having written for Shimon; and when the notebook burned Reuven had not yet finished the book — certainly he can write, for Reuven\'s work is not yet finished; and certainly if the notebook burned after he finished the entire book, then his work was finished and he could not write — end of his words; and the same law applies in all crafts. So Shach. (One who vowed not to eat at any optional meal may eat at a house-commissioning meal in Eretz Yisrael but not abroad — Be\'er Sheva daf 113. The community agreed not to wear silk garments, even tabi\'a that is mostly silk and minority wool — included in the agreement. One who vows from garments and clothing — gold bracelets are not included — Kenesset Hagedolah see there.)',
  },
  'siman_217/beer-hagolah/part-001.txt': {
    '7#_': 'See there in the Gemara.',
    '39#_': 'See there in the Gemara.',
  },
  'siman_217/beur-hagra/part-001.txt': {
    '8#ג': 'See there in the Gemara.',
    '13#א': 'See there in the Gemara.',
  },
  'siman_217/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_': 'See there in the Gemara.',
    '11#_': 'See there in the Gemara.',
  },
  'siman_294/beur-hagra/part-001.txt': {
    '1#א':
      'From the time of its planting. Tosefta: from when do we count for him — from the time of its planting, and so in the Gemara in the first chapter of Rosh Hashanah (9 side 10) and Shevuot.',
    '1#ב': 'With benefit. Mishnah and Gemara at the end of chapter 8 of Kedushin 66 side b.',
    '1#ג':
      'Forever. Tosefta: three years — could one think within three years it is forbidden and after three years it will be permitted? Scripture teaches "it shall be"; and Tosafot in Kedushin 38 side a, s.v. vehakhah — and likewise for orlah, etc.',
    '13#א': "Rambam's wording.",
    '13#ב': 'If not so. Ruled the doubt stringently, as written in Orach Chaim siman 245.',
    '18#_':
      "Yerushalmi at the end of the first chapter of Sheviit, and Rosh brought it there — Yerushalmi: R' Yudan bar Tarfon said, etc.; and Rambam ruled like the Sages, for halacha follows the Sages and moreover we establish them in one line of reasoning; but Rosh ruled like Rabbi Yehuda, because R' Shimon holds like him, and in our opinion as above. However it appears that that which is in Sotah 43 side b is decisive, as written in siman 221, and they have one reason.",
  },
  'siman_294/turei-zahav/part-001.txt': {
    '4#ו':
      'And after the fifteenth [of Shevat]. The explanation is trees that finished ripening afterward; and Rosh wrote in Hilchot Orlah: it appears that nowadays there is no ripening on any tree before the fifteenth of Shevat, and therefore we are not careful about orlah except three years.',
    '6#_':
      'The law of maaser sheini. For we derive "holy" as written regarding revai from "holy" of maaser sheini.',
  },
  'siman_294/pitchei-teshuva/part-001.txt': {
    '12#_': 'But not abroad. See She\'elat Yaavetz part 2 siman 19 and siman 500, who elaborated on this.',
  },
  'siman_294/rabbi-akiva-eiger-yd/part-001.txt': {
    '9#_': '(Shach note 31) And therefore it is one opinion. See Be\'er Yaakov Choshen Mishpat (siman 414 seif 2).',
  },
  'siman_294/beer-hagolah/part-001.txt': {
    '15#_':
      "Ran's wording in the name of Yeish Omrim, and so is Rambam's opinion in chapter 9 of Hilchot Maaser Sheni, and a revai planted — like R' Abba bar Mamal in Yerushalmi chapter 2 of Sheviit halacha 6, and so is Raavad's opinion; and Rosh wrote that so is implied in Rashi's language somewhat.",
  },
  'siman_246/beer-hagolah/part-001.txt': {
    '1#_': "Rambam's wording in chapter 1 of Hilchot Talmud Torah.",
    '2#_': "From that which R' Eliezer ben R' Shimon — Bava Metzia daf 84 side b.",
    '8#_':
      "Rambam's wording there (and Tur brings it) from the statement of Rav Safra, etc. — Kiddushin daf 30 side a, per Tosafot there.",
    '21#_': 'Mishnah 5, chapter 2 of tractate Avot.',
  },
  'siman_246/beur-hagra/part-001.txt': {
    '6#ו': 'And a woman is not, etc. — chapter 1 of Kedushin (29).',
    '9#ג':
      'And Yeish Omrim specifically, etc. — from what is written in chapter 7 of Bava Metzia (84 side b), and R\' and Raavad sat, etc., and Rashi in Sanhedrin 17 side b s.v. Shimon haTimni, etc., and s.v. Rav Nachman adds, etc.',
    '26#ד': 'And nevertheless, etc. — Rashi in Kedushin 33 side a s.v. leonseha, etc.',
  },
  'siman_246/rabbi-akiva-eiger-yd/part-001.txt': {
    '2#_':
      'And return to his Torah. See responsum Kol Ben Levi in a comment on Rambam\'s language (chapter 1, halacha 2, Hilchot Talmud Torah).',
  },
  'siman_246/baer-heitev/part-001.txt': {
    '17#א':
      'Medicine. Prisha wrote: possibly this applies only in their days, when they did not see their books outside, and all the more so they did not engage in idle talk; but now that in any case people are not careful, they say refuah; and Taz disagrees — on the contrary, from this will follow a disgraceful matter, that they will also engage in idle speech; and we are already warned about this with punishment of glowing coals, Heaven forbid — therefore one may not be lenient; one who increases honor of the Torah — behold he is honored and praised — end of his words.',
  },
  'siman_246/yad-avraham/part-001.txt': {
    '1#_':
      '(Siman 246 seif 13 in Hagahah) And Yeish Omrim: when they ask a halachic matter one must stand. See Shach, who left in doubt how he learned this from the incident of R\' Tzadok and Rabban Gamliel who stood and asked — Rabban Gamliel was before the destruction of the Temple, and in his days they learned Torah standing, as we say in Megillah: from the days of Moses until R\' Gamliel they learned only standing; when R\' Gamliel died, honor of the Torah ceased — therefore nowadays there is no one who says one must stand. In Kanfei Nesharim he resolves Shach\'s difficulty on the Hagahah: what we learned in Sotah, when R\' Gamliel died honor of the Torah ceased — that is the elder R\' Gamliel; and likewise what Megillah says, until the death of R\' Gamliel they learned only standing — the elder R\' Gamliel; and the incident of R\' Tzadok and Rabban Gamliel who stood — the asker was after the time of R\' Gamliel, and he was the grandson of the elder R\' Gamliel, and they already learned seated — nevertheless he stood when asking; properly there is proof that when asking a halachic matter one must stand even nowadays. And again I found: so writes Baal Yad Aharon in Merkavat HaMishnah, and in Birkhei Yosef. But this is not correct, for in Ran and Tosafot of Rashba at the end of chapter 4 of Megillah it is proven explicitly that learning standing until the death of R\' Gamliel is R\' Gamliel of Yavneh; therefore we do not read in the mishnah of Sotah "when the elder R\' Gamliel died," but simply R\' Gamliel, as Shach wrote; and that was not the elder R\' Gamliel, for we are not accustomed to mention him simply as R\' Gamliel, as Tosafot Niddah (4 side 6), and as is evident from mentioning him at the end of the mishnah of Sotah. Further, reading "elder R\' Gamliel" is difficult per Maharsha there. Therefore Shach\'s difficulty on the Hagahah stands in place — there is no proof that the asker must stand nowadays from the incident of R\' Tzadok and Rabban Gamliel, for they still learned standing. However one can say the Hagahah\'s words according to what is proven from Ran and Rashba there: even though they learned only standing from Moses until R\' Gamliel — that was easy matter, but difficult matters they learned seated. Therefore the Hagahah properly inferred from that the asker stood in the days of R\' Gamliel — presumably he asked a difficult matter; if so we learn: even in the days of R\' Gamliel, when they learned standing, one need not stand for difficult matters — we learn the asker is different and must stand even for difficult matters; and thus one must stand even nowadays, for regarding difficult matters there is no distinction between this time and the days of R\' Gamliel. Further one can say per Tzelach in chapter 4 of Berakhot: R\' Tzadok was not a student, and we do not say that learning standing until R\' Gamliel refers only to students; since R\' Tzadok stood and asked, it is properly proven that the asker must stand even nowadays, for regarding the asker there is no distinction, since even when they stood, one who is not a student did not stand. With this one can resolve Tur\'s difficulty from Eruvin 54 — they sat: Aharon and his sons were not in the category of students. Likewise what is said in Moed Katan 16 regarding David: "and he sat on the ground."',
  },
  'siman_240/beer-hagolah/part-001.txt': {
    '1#_': 'In braita, Kedushin daf 30 side b.',
    '3#_':
      'Question there from above and resolved, and from when Rav Dimi came from that incident in Ashkelon, etc., there daf 31.',
    '11#ב': "Rambam's wording there in chapter 6, from the braita cited.",
  },
  'siman_240/beur-hagra/part-001.txt': {
    '18#ב':
      'And Yeish Omrim, etc. — from what is written in Bava Kama 94 side b — likewise when he repented; and that in Sanhedrin — for his sorrow is different. Hagahot Maimoniyot and Tur (see above siman 241 note 6).',
    '19#_': 'Forbidden, etc. — Kedushin 32 side a, and Avodat Hashem.',
  },
  'siman_240/pitchei-teshuva/part-001.txt': {
    '12#_':
      'If he wishes he may precede — Maharshal in Yesh Sefatayim, chapter 1 of Kedushin siman 62, ruled like R\' Yosi that one may not precede one over the other — see there. He also wrote there that specifically for honor it is so, but regarding redeeming from seizure whether his precedence counts — see there; and it appears to me likewise if they came to ask food and clothing he precedes his mother, as written below siman 251 seif 8, that in this a woman precedes a man — see there.',
    '15#_':
      'For he is not obligated — nevertheless one is not called "not doing something with him" for being exempt from honoring him except if he changed in his madness and not at first — so Piskei Ri in Bava Kama 94, see there. And with this the difficulty of Sefer HaMikneh in Kedushin 32 s.v. meniach is resolved — see what Shach wrote above siman 228 note 35 in the name of responsum Noda Biyehudah.',
  },
  'siman_296/beer-hagolah/part-001.txt': {
    '6#_': 'Conclusion of the gemara, Kedushin daf 39 side a.',
    '15#_': 'From mishnah 5, chapter 5 of Kilayim, and in many places.',
    '41#_':
      "Statement of R' Yehonatan, etc., Nedarim daf 57 side b, and Yerushalmi chapter 5 of Kilayim.",
  },
  'siman_296/beur-hagra/part-001.txt': {
    '27#א':
      'All, etc. — mishnah chapter 7: but under the vine, etc., and in many places; and what is written "under the shoots and leaves" — Yerushalmi chapter 6: R\' Chama bar Ukva in the name of R\' Yosi bar Chanina: under the clusters is forbidden and unholy; under the leaves — no; R\' Yosi: even under the leaves is forbidden and unholy.',
    '50#ב':
      'Even though, etc. — there, and R\' Eliezer holds one need not distance at all, like guarding, and as written in Yerushalmi there; and Rosh brought: R\' Eliezer said to him, etc.',
    '52#ב':
      'In another case, etc. — Yerushalmi there: R\' Chiya in the name of R\' Yochanan — there must be a hollow space of four; R\' Shimon bar Rav Yitzchak: this you say in a circle, but in a square one need not have a hollow of four; R\' Chelbo ben Shaul said: there must be three handbreadths of earth from above; R\' Yosi: this you say in a circle, but in a square one need not have three handbreadths of earth from above. From three to four — that is the mishnah; less than three is as sealed; from three to four completes four — sow immediately; R\' Avin in the name of Shmuel; and in houses of kilayim they hide — a house in which they hide kilayim. Rosh explains what he wrote "from three," etc. — it refers to a ditch; but Rambam explains it as a house, as written in Semag; and so he wrote afterward R\' Avin, etc.; and I do not know why he did not write that it completes.',
  },
  'siman_232/beer-hagolah/part-001.txt': {
    '4#_': "Tur's wording from words of Rosh in his rulings there, in the name of Yerushalmi.",
  },
  'siman_232/beur-hagra/part-001.txt': {
    '7#_': 'Even though not, etc. — Ran s.v. uvBeit Hillel, etc.',
  },
  'siman_218/beer-hagolah/part-001.txt': {
    '1#א':
      "Rambam's wording in chapter 8 of Hilchot Nedarim, law 8, from mishnah Nedarim daf 55 side b, like R' Yehuda; and so Rosh wrote in the name of Ramban in the name of one Gaon, and so is reasonable.",
    '4#ב':
      'Rambam chapter 8, law 10, from Tosefta chapter 4, and so Ran (and Semag daf 72 side 3).',
    '6#_': 'Rivash, part 1, siman 83.',
  },
  'siman_218/beur-hagra/part-001.txt': {
    '1#א': "All, etc. — Rambam's wording.",
  },
  'siman_218/rabbi-akiva-eiger-yd/part-001.txt': {
    '6#_': '(Shach note 3 there) And in my humble opinion. See responsum Rashdam (Choshen Mishpat 253).',
  },
  'siman_221/beur-hagra/part-001.txt': {
    '1#א': 'Reuven, etc., or, etc. — see there 46 side a — a question was raised, etc.',
    '2#ג':
      'Forbidden to teach him, etc. — like R\' Yochanan there, even to apprentice him — see Ran s.v. vR\' Yochanan, etc.',
    '5#ב': 'And if the way, etc. — per Rosh\'s explanation s.v. hatamchui.',
    '7#ד':
      'One who lends, etc., and one who borrows, etc. — meaning: also like lessor and lessee — see there.',
    '8#ב': 'But he does not, etc. — Avodat Hashem, and as written 33 side a "who taught," etc.',
  },
};

function patchFile(rel, T) {
  const fp = path.join(ROOT, 'output', rel);
  let s = fs.readFileSync(fp, 'utf8');
  const applied = [];
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
    const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.push(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.includes(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.length} blocks)`);
  return applied.length;
}

let total = 0;
for (const [rel, T] of Object.entries(PATCHES)) {
  total += patchFile(rel, T);
}
console.log(`[PATCHED] ${total} blocks total`);
