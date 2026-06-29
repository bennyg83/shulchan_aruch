import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const mh = "output/siman_209/machatzit-hashekel/part-001.txt";
const ma = "output/siman_209/magen-avraham/part-001.txt";
const mech = "output/siman_209/mechaber/part-001.txt";
const mb = "output/siman_209/mishnah-berurah/part-001.txt";
const pm = "output/siman_209/peri-megadim/part-001.txt";
const rae = "output/siman_209/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_209/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_209/turei-zahav/part-001.txt";
const ye = "output/siman_209/yad-ephraim/part-001.txt";

patch(
  mh,
  "machatzit-hashekel",
  3,
  "ג",
  `He did not fulfill according to many poskim, as he wrote — not as the new edition emended "he did not fulfill," and so too Tosafot and the Mordechai, etc. And what Magen Avraham wrote in seif kaf alef, "but if he thought it was wine and said borei pri hagafen, he did not fulfill according to many poskim" — his intent is not that we rule thus, for on the contrary, below in siman 487 he wrote, and these are his words: "Most poskim hold that even though he did not know it was Yom Tov he fulfilled, since he remembered and concluded properly," end of his words — which implies that his view is to rule not like the Mechaber but that even if he did not know, he fulfilled. And so ruled the Peri Chadash below. If so, Magen Avraham's intent is that many poskim hold that without knowing he did not fulfill, and that is the Mechaber's view; but Magen Avraham for himself does not hold thus.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ד",
  `Tosafot and the Mordechai, etc. — meaning, Tosafot ruled the doubt stringently, and they also wrote in explanation that if he did not know, he did not fulfill. And so the Mordechai and Rashi; for according to Rashi it is not mentioned at all in the Talmud whether if he began to conclude improperly we are lenient, and the doubt for Rashi was if he said properly but his intention was improper. If so, if the beginning of the conclusion was improper and he also did not know that the intention was improper, and also the utterance — certainly he did not fulfill. And for the Rambam he already wrote above that even if the utterance was proper, only the intention was improper, he did not fulfill — all the more so when the utterance too was improper.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ה",
  `And similarly in siman 487 seif 8, "after," etc. — meaning, if he concluded on Yom Tov with the fourth blessing, namely "Who has brought us to sanctify the Sabbath," and retracted within toch kedei dibbur and concluded "Who sanctifies Israel and the seasons," he fulfilled, since he knows it is Yom Tov.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ו",
  `Nevertheless it is difficult why Tosafot ruled as he wrote.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ז",
  `And one should not say that he holds mitzvot require intention, as Tosafot wrote there, and these are his words: "R' Yitzchak of Corbeil asked, what is he asking? But certainly mitzvot do not require intention." And R' Yitzchak would say that this refers to Shemoneh Esreh, etc., and he did not intend to fulfill — but where he intended to bless on wine and it turned out to be shechar, etc., end of his words — behold he wrote that this is worse if he intended for another species, for then he did not intend at all, as Magen Avraham wrote. However, it requires study regarding Magen Avraham's intent where he wrote "and one should not say that he holds mitzvot require intention" — whether it is literally, and in any case even if he did not intend for another species, nevertheless Tosafot hold like the one who says mitzvot require intention. If so, what is difficult to R' Yitzchak of Corbeil? But certainly mitzvot do not require intention. On the contrary, according to Tosafot mitzvot require intention, and it is strained to say that R' Yitzchak of Corbeil, who asked at the end of the discussion, disagrees with what Tosafot wrote there at the beginning of that passage, that R' Yitzchak rules the doubt stringently, that R' Yitzchak holds mitzvot require intention, and R' Yitzchak of Corbeil holds they do not require intention — and especially since it appears from Tosafot's wording that R' Yitzchak the author of Tosafot left his words unresolved on R' Yitzchak of Corbeil's question, namely in Shemoneh Esreh, etc., and R' Yitzchak holds they require intention, and there is no need to resolve R' Yitzchak of Corbeil's question at all. And if Magen Avraham's intent in what he wrote "and one should not say" is that he holds mitzvot require intention only in such a case where he intended for another species — if so, Magen Avraham's difficulties return to their place: why did he rule stringently? For according to Tosafot's words, in this the Talmud was in doubt in such a manner where he intended for another species; for us, mitzvot do not require intention — if in such a manner we follow the inferior intention, and if so why is it obvious to R' Yitzchak to go stringently in a doubt of blessings? If so, one must say Magen Avraham's intent is literally, that R' Yitzchak rules like the one who says they require intention; even if he did not intend for another species, nevertheless he did not fulfill except one who intends to fulfill literally. And the one who asked the doubt holds like the one who says mitzvot do not require intention; therefore he was in doubt whether in such a case where he intended for another species, which is inferior, whether he fulfilled. And for the one who says they require intention, in truth there is nothing to ask at all. And what R' Yitzchak of Corbeil asked, "what is he asking? But certainly mitzvot do not require intention" — R' Yitzchak's intent is not that we rule thus, but rather he means: but certainly the one who asked the doubt holds they do not require intention, for otherwise what was he in doubt about? Certainly he did not fulfill; and since the one who asked the doubt holds thus, if so what was he in doubt about? Certainly he fulfilled. And R' Yitzchak of Corbeil cited the side that holds they do not require intention. And similarly the Gemara from either way: whether if he holds they require intention, what is he asking? Certainly he did not fulfill; and if he holds they do not require intention, certainly he fulfilled — except for this reason they cited only the side that holds they do not require intention, since Tosafot's conclusion in their answer is that Tosafot's words are not the words of a questioner and answerer. And the copyist of Tosafot's words, when he wrote the question, already knew the answer.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ח",
  `And in Birkat HaMazon, according to everyone, etc. — meaning, even for the Rif who ruled the doubt leniently, this is because of a doubt in blessings to be lenient; not so in Birkat HaMazon, which is d'oraisa, and we go in its doubt to be stringent, as written in this seif at the end.`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "א",
  `Or of water. This is not mentioned in the Rambam — only a cup of shechar is written. In Kesef Mishnah chapter 1 of Hilchot Berachot, many great ones wondered at the Rambam in this: what do we care that his intention was to speak properly? Is it not that one who had fruit in his hand and intended to say borei pri ha'etz and said ha'motzi — who fulfilled? But things of the heart are not things. Also the sages of Lunel asked the Rambam about this, and he answered that it deals with shechar that comes from the vine; therefore he fulfilled with the blessing of borei pri hagafen. And so the Ramach. And in my humble opinion this answer requires further study, etc.; only the essence is that the Rambam holds we follow his intention, end of Kesef Mishnah's words; therefore he added here "or of water." But the Bach wrote that the essence is like the sages of Lunel; and even if you say the Rambam's view is as Kesef Mishnah wrote, nevertheless we follow the majority of poskim, and nearly all agreed we do not follow his intention. And even for Rashi we do not ask except where he said properly but intended to speak improperly; but if he said improperly, it is obvious he did not fulfill even if he intended to speak properly. And so one should rule.`,
);
patch(
  ma,
  "magen-avraham",
  1,
  "ב",
  `And some say that if, etc. He wrote in the language "some say" because for the Rambam he did not fulfill, since he intended to say improperly, and so too in Kesef Mishnah; but the essence is that he fulfilled as stated above.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "א",
  `He took, etc. Here it deals with one who knew it was water, only that he erred in his speech; for otherwise it would deal with one who thinks it was wine — difficult, for above he wrote "some say," etc., even though he said properly, all the more so here where he said improperly — he should have written "some say," etc.; and why did he write anonymously? And furthermore, why did he not write here also "and thinks it is of wine" as stated above? Rather, necessarily here it deals with one who knew it was water, only that he erred in his speech. But if he thinks it is wine and said borei pri hagafen and concluded shehakol nihye bidvaro, he did not fulfill, and so Tosafot, the Mordechai, Rashi, and the Rambam; and similarly siman 487 seif 8 / seif 1 / after he knows it is Yom Tov — which implies that if he did not know, he did not fulfill, even within toch kedei dibbur; see Rama seif 3. Nevertheless it is difficult why Tosafot ruled stringently, for we rule a doubt in blessings to be lenient; and so asked Magen Tzvi chapter 2 seif 2. And it is possible to say that he holds mitzvot require intention, and here he intended for another species, as Tosafot wrote there. And in Birkat HaMazon, according to everyone, one must repeat if he did not open properly, since it was d'oraisa; and so in Sha'agas Aryeh siman 87 and 88.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ב",
  `And within kedei dibbur. It implies that after kedei dibbur one must bless; and some say the other poskim disagree on this. And R' Yehudah HaLevi siman 47 proved that everyone agrees to this, and so in Magen Tzvi chapter 2 seif 2. However, from Tosafot's words it implies this follows R' Yitzchak's view — see there (so it is).`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ג",
  `Others are drinking, etc. At first glance it implies here that we require both: others drinking and his intention also, etc. But in Darkei Moshe it implies that if he intended to drink other wine too, even if there are no others with him, he need not bless, for it is no worse than when the cup is poured out, as written siman 206 seif 6; see siman 271 seif 15. And it implies specifically that he did not interrupt until he drank wine. And in Maharil it says that he tasted the cup of water — see there; and it is difficult, for tasting water would be an interruption between the blessing and drinking the wine, as written siman 167. And it is possible that he holds tasting, since there was also eating, is not an interruption — requires further study. And if he did not intend to drink other wine, he must bless as written there. But the others, that there was wine before them — requires further study. And it appears to me that they fulfilled per the view of the one who says regarding kiddush that one may bless for them borei pri hagafen even though he does not taste; here too they fulfilled b'dieved. Nevertheless it is possible to say that since he blessed a blessing in vain, they too did not fulfill; see siman 213 seif 2 — requires further study. And Rama's view in Darkei Moshe implies they fulfilled, and so here he wrote "also discharged the others who drink there," therefore his blessing is a blessing — it implies because he discharged the others, he too fulfilled. And where one must say "Baruch Atah Hashem Elokeinu Melech ha'olam, Who opens the eyes of the blind," and erred in his speech and said "Who clothes the naked," and returned and said within toch kedei dibbur "Who opens the eyes of the blind" — requires further study whether he fulfilled regarding opening the eyes of the blind; but if he intended for clothing the naked, he fulfilled regarding malbish arumim. One who said after the wine blessing "Who creates the lights of fire" and remembered and concluded with borei minei besamim — he fulfilled; nevertheless he must return and bless "Who creates the lights of fire" (Magen Tzvi chapter 2 seif 2, so it is). And it appears to me specifically when at the time of the blessing he intended for the spices; but when he intended for fire, he fulfilled and blesses afterward on the spices.`,
);

patch(
  mech,
  "mechaber",
  1,
  "main",
  `The laws of error and doubt in the blessing over wine. It contains 3 seifim: One who took a cup of shechar or of water and opened and said, "Blessed are You, Hashem our God, King of the universe," intending to say shehakol nihye bidvaro, and erred and said borei pri hagafen — we do not make him repeat, because at the time he mentioned the Name and kingship, which are the essence of the blessing, he intended only for the blessing fit for that species. And some say that if one took a cup of shechar or water and thought it was wine, and opened, "Blessed are You, Hashem our God, King of the universe," intending to say borei pri hagafen, and remembered it is shechar or water and concluded shehakol nihye bidvaro — he fulfilled. {Rama: And all the more so if wine was in his hand and he thought it was water, and opened intending to say shehakol nihye bidvaro, and remembered and blessed borei pri hagafen — he fulfilled, for even if he had concluded shehakol nihye bidvaro he would have fulfilled [Tur].}`,
);
patch(
  mech,
  "mechaber",
  2,
  "main",
  `One who took a cup of shechar or water and blessed, "Blessed are You, Hashem our God, King of the universe, borei pri hagafen," and within kedei dibbur remembered that he erred and said shehakol nihye bidvaro — and similarly if his utterance was, "Blessed are You, Hashem our God, King of the universe, borei pri hagafen, shehakol nihye bidvaro" — he fulfilled. {Rama: And if others were also drinking and wine was before them, and his intention was also on wine, thinking there was wine in his cup, and he blessed borei pri hagafen, and afterward it turned out that in his cup was water or shechar — when he returns and drinks wine afterward, he need not return and bless; he fulfills with the blessing he blessed on his cup, even though it was in error, for his intention was to drink other wine too; he also discharged the others who drink there; therefore his blessing is a blessing (responsum of Maharil siman 92; Beit Yosef siman 206).}`,
);
patch(
  mech,
  "mechaber",
  3,
  "main",
  `All blessings: if one is uncertain whether he recited them or not, he does not recite them again, neither at the beginning nor at the end, except for Birkat HaMazon, because it is of Torah.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(1) We do not make him repeat — this is the Rambam's view; but most poskim and nearly all disagree with him and agreed we do not follow his intention, since with his mouth he uttered a blessing not fit for that species — he did not fulfill, and we make him repeat. The Acharonim wrote that thus one should rule.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) And some say that if he took, etc. — and so is the halachah [Acharonim].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) Intending to say, etc. — meaning, even though at the time he mentioned the Name and kingship, which are the essence of the blessing, his intention was on a blessing not fit for that species at all, nevertheless since at the conclusion of the blessing he mentioned properly with his mouth, he fulfilled b'dieved.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(4) For even if he had concluded — and it turns out that even according to his thought it would have been the blessing fit for that species.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(5) And he blessed "Baruch Atah," etc. — meaning, even at the time of the beginning of the blessing he thought it was wine, and it turned out the beginning and end of the blessing were improper; nevertheless, since he uprooted within kedei dibbur and concluded properly, he fulfilled.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(6) And within kedei dibbur — but after kedei dibbur his uprooting does not help, and he returns and blesses. And know that what we are lenient b'dieved within kedei dibbur is specifically in rabbinic blessings; but in Birkat HaMazon, which is d'oraisa, if such a thing occurred — for example, he ate bread and erred and thought he ate fruits, and began to bless "Baruch Atah Hashem Elokeinu Melech ha'olam" on the tree and on the fruit of the tree, and remembered it is bread and concluded "Who feeds the entire world," etc., properly — he must return and bless; and specifically in the manner we depicted. But if he erred and thought regarding the bread he ate that it is one of the five species, and began to bless "Baruch Atah Hashem Elokeinu Melech ha'olam" on mezonot, and remembered — he may conclude "Who feeds the entire world," etc., and fulfill, for mezonot is also food. The Acharonim wrote: one who says after the wine blessing "Who creates the lights of fire" and remembers he must precede with spices and concludes "Who creates various species of spices" — he fulfilled regarding spices, and returns and blesses "Baruch Atah Hashem Elokeinu Melech ha'olam, Who creates the lights of fire." And specifically when at the mention of the Name and kingship he intended for the spices he held in his hand and stumbled in his tongue and said "Who creates the lights of fire"; but when he intended for fire, he fulfilled the blessing of "Who creates the lights of fire," and afterward blesses another blessing on the spices, for on fire too one must bless, and the order does not prevent. And regarding the morning blessings, if he erred in pokeach ivrim and malbish arumim and the like — it was clarified above in siman 46 in Mishna Berurah seif kaf, see there.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(7) And he blessed borei pri hagafen — and his intention was to discharge the others too with his blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(8) For his intention was, etc. — he stated two reasons for one exemption: since his intention was to drink other wine, and even if that wine was not then before him and they brought it to him afterward, the blessing applied to them [and even though this cup was water and he began to drink it, nevertheless it is not called an interruption since he did not interrupt in speech in between]; and even if his intention was not explicit to drink more but only implicitly — since he discharged others with his blessing that they could drink the wine before them, it turns out his blessing was not in vain; therefore he too is permitted to drink other wine. And behold, Rama follows his view in siman 206 seif 3 in the gloss, that he holds there that where his intention was not explicit but only implicit, he must return and bless; therefore in our matter too he wrote "for his intention was," etc. But according to what is explained there in Mishna Berurah and Be'er Heitev on Levush, there are several poskim who hold that even implicitly, whatever was before him on the table at the time of the blessing, automatically the blessing applies to all of them, and he need not return and bless when the cup he blessed upon is poured out. If so, the same in our matter: when it turns out to be water and he drinks another cup of wine that was before him — in every manner he need not return and bless.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "א",
  `(9) All blessings, etc. — because they are from the Torah doubtfully and a rabbinic doubt to be lenient; and see above siman 167 seif 9 in Mishna Berurah.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(10) Except for Birkat HaMazon — and that is when he ate a measure of satiation, for then he is obligated from the Torah; and see above siman 184 seif 4 in Mishna Berurah. And behold, from the Mechaber it implies anonymously like the Rambam and Semag, who hold that the blessing of the three-form blessing recited over the seven species is rabbinic; but in truth many Rishonim hold it is d'oraisa; therefore the Acharonim wrote that one who ate a measure of satiation from fruits or a dish of the seven species, and was uncertain whether he blessed afterward — he should eat more of that species, an olive-bulk's measure, and bless afterward, and thereby discharge his doubt too. And see in Peri Megadim, who leans that if he has none of that species, he should take another species from the seven — for example, if he ate tree fruit, he should take mezonot and include it in the blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ג",
  `(11) Of Torah — and see in siman 47 in Mishna Berurah seif kaf alef what he wrote regarding the blessing on the Torah if one was uncertain.`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `He took — Eshel Tzvi: R' Meir chapter 8 of Hilchot Berachot seif 11 wrote shechar, or borei pri ha'adamah, and concluded borei pri ha'etz, or a grain dish and concluded ha'motzi — we do not make him repeat. And in Lechem Mishneh there he explained that in the responsa he answered the sages of Lunel, Kesef Mishnah brought in chapter 1 of Hilchot Berachot seif 8, on shechar that comes from the vine (in my humble opinion his work and its law is shehakol; see Rambam siman 11) that it is not a lie that it comes from the vine; and similarly borei pri ha'adamah deals possibly with those fruits that grow on a tree, and in winter the tree does not exist; and similarly grain — bread is also called thus, even though he did not fulfill, since at the beginning of the blessing until "King of the universe" his intention was to speak properly, and at the end he did not say so much — a lie, he fulfilled. And one should not pray Maariv after he spoke a lie, see there. But Kesef Mishnah there and Beit Yosef here explained that these are not so — in a case of literally the reverse: whatever his thought was proper, he fulfilled. And for R' Meir the essence is the beginning, since he did not write a Talmudic law, see there in Kesef Mishnah chapter 1 of Hilchot Berachot, not like Lechem Mishneh chapter 8 of Hilchot Berachot, for R' Meir was uncertain, but the essence is the beginning, whether leniently or stringently; therefore he added water here, etc., even though he concluded falsely and did not remember within toch kedei dibbur — we do not make him repeat. This beginning in error, even though he concluded properly, he did not fulfill according to R' Meir. And "some say" from reverse to reverse, which was not resolved leniently — and they explain that he concluded properly, only the beginning he erred, and leniently this is law 1 stringently, since he speaks falsely, as R' Eliezer of Metz wrote in hasagot. And in seif 2 it deals with knowing but not knowing — for R' Meir he did not fulfill. And the Mechaber teaches us that in such a case even according to "some say" he fulfilled; and according to everyone he fulfilled with intention on water and erred and concluded borei pri hagafen — with shehakol nihye bidvaro he fulfilled, and all the more so if he preceded shehakol nihye bidvaro and afterward borei pri hagafen, for he already fulfilled with the second, etc. And Malbush implies that in seif 2 it refers to "some say" in seif 1. And what he wrote "reverse" and wrote after everything the Rambam's view, see there. And for halachah he ruled like "some say," and so Magen Avraham siman 1; and it implies even vine shechar and the three distinctions R' Meir brought — nevertheless, whoever uttered improperly did not fulfill. And in Magen Avraham I will explain further.`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "_",
  `And if — Eshel Tzvi: Rambam here states two things: if his intention was to drink more, it suffices; or if he discharged others with his blessing and wine was before them, he too drinks afterward (provided he did not actually reconsider). See siman 206 in Taz seif 8. And what Maharai disagrees — Eshel Avraham siman 3 — for Maharai deals where his intention was not explicit on the rest but only implicit; see siman 271 siman 19; and there I will explain further.`,
);
patch(
  pm,
  "peri-megadim",
  3,
  "_",
  `Except — Eshel Tzvi; and Eshel Avraham kuf ayin bet siman 3, see there. And what he wrote "he should eat from that species," etc. — at first glance even another species, and include this from doubt; for thus said Maharai that one may not include any addition, as in siman 208 seif 18 — how can he speak falsely, perhaps this is not one of the seven species, and the like; not so here, where he ate borei pri ha'etz of the seven species and is obligated in the three-form blessing. R' Yitzchak of Corbeil: if he blessed, and it is a Torah doubt according to "some say" — it is possible his remedy is to eat a wheat dish and include it on the tree, for one does not speak falsely; and a doubt in blessings to be lenient, because of "you shall not bear" gravely; and here he does not add Name and kingship. Nevertheless, l'chatchila it is better from that species; and if he has none, even in doubt Maharai holds like Taz there siman 19 that he may include.`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Magen Avraham seif 2 — because of the Rambam. See siman 268 in Magen Avraham seif 63.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `Behold we rule a doubt in blessings to be lenient. In my humble opinion, according to what Maharsha brought Pesachim 102a from Rashba's words there, that he holds a doubt in blessings to be lenient — and that is in the blessing over matzah; but in blessings of enjoyment, if one is uncertain whether the food was discharged with a blessing or not, it is forbidden to eat it as if one transgressed. If so, generally, when uncertain whether he blessed on food, he cannot return and bless, lest he already blessed; and also forbidden to eat it, lest he did not bless. And here, if we rule he should not bless again, it would be forbidden to eat, and the blessing he blessed would certainly be a blessing in vain. And if we rule he blesses again, too, it is only one blessing in vain. And there is no difference between returning to bless and not returning to bless, for either way it is one blessing in vain; therefore the law is well that he blesses again and eats. And the Rif and those poskim who ruled in that law a doubt in blessings to be lenient — he drinks without a blessing. One must say that blessings of enjoyment too are a doubt in blessings to be lenient — meaning, permitted to eat without a second blessing, and not like Rashba; and in any case there is no wonder on R' Yitzchak who said, etc. Later I saw in Even Ha'ozer below siman 214, who wrote in short words that R' Yitzchak according to his method ruled on shechar that we go stringently in a doubt of blessings of enjoyment; and it is possible his intent is to what we wrote.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  3,
  "_",
  `It implies after kedei dibbur. See responsum of Perach Shoshan general 1 siman 1.`,
);

patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `He fulfilled — see Ba'er Heitev; and see in Dagul Merevavah and Yad Ephraim what they wrote on this.`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `One who took a cup of shechar or water, etc. This is the Rambam's wording — only this "or water" is not in the Rambam; and it is very astonishing this ruling that he brought in Shulchan Aruch. For in chapter 1 of Hilchot Berachot, Kesef Mishnah wrote that the sages of Lunel asked the Rambam about this: why did he fulfill on shechar if he blessed borei pri hagafen? Is this not comparable to opening in Maariv Aravim and concluding with Yotzer Or, that he did not fulfill? And he answered that shechar means shechar that comes from the vine; but barley shechar — it is obvious he did not fulfill. If so, why did he copy in Shulchan Aruch the Rambam's words and add water to him, for in this it is obvious he did not fulfill, like barley shechar? Also Ra'avad in hasagah disagreed with the Rambam and said: everything follows what he uttered with his mouth, end of his words — and that is the "some say" he brings afterward, that he must at least say the blessing properly; so we rule, for so hold most poskim.`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `And if there were others, etc. This is the responsum of Maharil siman 96, which Beit Yosef brought siman 206 in the name of an Ashkenazic responsum; and Maharil holds the matter depends on his intention. And in Hagahot Maimoniot in the name of Rabbeinu Tam, which Beit Yosef siman 206 brought there. And I saw Maharai in his rulings siman 116, and these are his words: he made kiddush on water and thought it was wine — if he makes kiddush on wine again, then the borei pri hagafen suffices for him after kiddush on wine, which is specifically rabbinic. And I said simply that he should return and make kiddush again on wine — for what of it if it is rabbinic? Many mitzvot are rabbinic, and we bless on them and are obligated in them by "you shall not turn aside." And is it not that if one blows on Rosh HaShanah with a complete error in the standing blasts, that he need not return and blow, since he already fulfilled the Torah obligation in the sitting blasts — this is only rabbinic? Certainly there is none who says thus, end of his words. And behold, what is relevant to ask on this from the matter of kiddush a second time will be explained b'siyata di'shmaya in siman 271 at its end. But what implies from this that he must return and bless borei pri hagafen after kiddush a second time — is the Rosh's view siman 207: if fruits were before him and his intention to eat them, and he took one and blessed on it and it was lost from his hand — he must bless again on the fruits he will eat. And Rama already ruled there like Rabbeinu Tam that intention helps; and therefore he also ruled like Maharil — and that is not like Maharai's ruling that we mentioned. And it is astonishing that Beit Yosef and Rama did not mention this dispute at all.`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "_",
  `Except Birkat HaMazon. And in Tur he wrote that the three-form blessing was d'oraisa on the seven species; and so Beit Yosef in the name of Rashba and the Rosh; therefore it is fitting for every God-fearing person to eat more of that species and bless afterward, and thereby discharge his doubt too.`,
);

patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `Magen Avraham seif 5 — requires further study whether he fulfilled, etc. And this that he took a cup of shechar, etc., that he fulfilled — one may say it is different there, for the cup in his hand proves that he erred in his speech, as Dagul Merevavah wrote at length. And accordingly, what he wrote "but if he intended for malbish arumim," etc., is literally: even though he remembered afterward that he must begin with pokeach ivrim, and returned within toch kedei dibbur and said pokeach ivrim — nevertheless he fulfilled regarding malbish arumim, etc., as Magen Avraham wrote below that if he intended for fire he fulfilled, etc. And it is possible to say further that Magen Avraham's doubt is: granted, taking a cup of shechar — he properly fulfilled, for what he said borei pri hagafen has no relevance here at all, and we judge it as if he did not say it at all; and since within toch kedei dibbur he said shehakol nihye bidvaro, which is the fit blessing, he fulfilled — not so here, where even though pokeach ivrim is arranged before the blessing of malbish arumim, nevertheless malbish arumim too must be blessed; and since the obligation rests upon him, we do not judge it as non-existent and as if he did not say it at all, since in any case he has the obligation to say malbish arumim; therefore Magen Avraham is uncertain and asks whether he fulfilled regarding pokeach ivrim. And accordingly one may say what he wrote afterward, "but if he intended for malbish arumim, he fulfilled regarding malbish arumim" — meaning, where he intended for malbish arumim and erred and said pokeach ivrim and remembered within toch kedei dibbur and concluded malbish arumim — he properly fulfilled regarding malbish arumim, since he already blessed pokeach ivrim; if so, what he said pokeach ivrim is as non-existent, since the obligation of pokeach ivrim was already removed from upon him — comparable to taking a cup of shechar, etc. And even if we explain Magen Avraham's "if he intended," etc., literally as he wrote, nevertheless one may say that what Magen Avraham was uncertain about at the beginning of the matter is for the reason I wrote; if so, also regarding malbish arumim the law is correct as he wrote, and he fulfilled. Not so per the reason that his cup proves — even regarding malbish arumim in such a case where he already blessed pokeach ivrim and afterward intended to bless malbish arumim and erred and said pokeach ivrim and within toch kedei dibbur concluded malbish arumim — this doubt too falls away, since there is no proof here that he erred. And it is possible that even accordingly he fulfilled, for it is also proof from within, since he already said pokeach ivrim — it is proven that now he erred; not so when he erred in the blessing pokeach ivrim and erred to say malbish arumim, where it is not proven — and if so, it is one matter with the reason I wrote. And I saw in Penei Me'irot volume 1 siman 58, who wrote to emend and requires further study whether he fulfilled regarding malbish arumim since he concluded pokeach ivrim, etc., see there; and in my humble opinion, as I wrote.`,
);

const PATCH_COUNT = 36;
console.log(`ok siman 209 part 2/2 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-209-part2of2.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
