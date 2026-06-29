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

const er = "output/siman_208/eliyah-rabbah/part-001.txt";
const kh = "output/siman_208/kaf-hachayyim/part-001.txt";

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>[Levush] Spelt first, etc.</b> Below seif 13, and see siman 211 seif 5.`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) <b>[Levush] Rather like ashes, etc.</b> This is the wording of Shulchan Aruch: boiled or like ashes — and it is correct, since he omitted "boiled," for in seif 4 it will be explained that parched grain one blesses borei peri haAdamah; however when they are mashed and stick through cooking, the law is like ashes — and all this when he puts it for food. But "for binding" implies that even the grain is nullified in the majority, and so wrote Bach; and for this reason Taz wrote that the law for lekach is likewise, and it is good to eat it within the meal — yet I have not seen people practice thus; rather they bless borei minei mezonot without hesitation, for the reason is that in the majority of lekach it is flour for eating. In Shelah he wrote that panuchikin is called "binding," and I saw in Tashbetz siman 322 that one blesses on panuchikin borei minei mezonot and afterward me'ein shalosh, from several places in his rulings.`,
);
patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(3) <b>Much honey, etc.</b> This is the wording of Taz: it implies regarding the five species that even when they do not impart taste — for whatever has honey in it, one perceives only the taste of honey. And Taz likewise wrote at the beginning of siman 204 that the five species are important such that one blesses on them even when they are the minority and do not impart taste; in Rashba's chiddushim 28 I found thus. But in Magen Avraham at the end of siman 204 it is explained that there specifically we require taste — for whatever does not have a kezayit within k'dei achilat peras of the five species, one does not bless afterward except borei nefashot, as Beit Yosef wrote below in the name of Abudraham — end of his words. I wonder at Sheirei Kenesset HaGedolah, who wrote in the name of Lechem Chamudot that he wrote thus in the name of Abudraham, and wrote on it: "I searched for this in Abudraham and did not find it" — end. And one may wonder greatly that the words of Beit Yosef and Shulchan Aruch below were omitted; also one may wonder on him that I saw this explicitly in Abudraham at the beginning of Hilchot Berachot. Also on Magen Avraham I have a wonder in this matter, that he wrote in s.k. 15 plainly that Abudraham speaks specifically when mixed with flour, but in other species one blesses borei minei mezonot and on haMichya even if there is not within k'dei achilat peras, as written in seif 2 — end of his words. The words of Lechem Chamudot daf 45 were omitted — that he speaks even in other species — and Sheirei Kenesset HaGedolah brought Abudraham who spoke in the regular case; and so wrote Olat Tamid; and if he disagrees with them he should have mentioned them and disputed.`,
);
patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(4) <b>[Levush] Types of honey, etc.</b> Repeated above siman 204 seif 12, and in Shulchan Aruch they did not repeat it here. Also it appears specifically regarding almonds where there is a majority of the five species that it is good to be stringent, which is not so if there is a minority of grain; and further one may say that since it is customary to make it also for a meal, it is good to be stringent.`,
);
patch(
  er,
  "eliyah-rabbah",
  5,
  "_",
  `(5) <b>[Levush] That it is correct, etc.</b> Therefore one should be careful per the custom that on Shabbat they eat whole cooked wheat kernels. And likewise all year they eat whole barley that they call gersten whole, and likewise whole groats cooked that should be eaten only within the meal — Bach. And likewise grapes: Shelah wrote that they are in the category of barley. And I already wrote that all this speaks when they were not mashed well. B'dieved, if one ate one of these not within the meal, Kenesset HaGedolah wrote that one blesses borei nefashot rabot; and even though at the end of this siman I will write that his words do not appear correct — nevertheless here it appears to establish the halachah like him, since for many poskim there is no doubt at all that one blesses borei nefashot rabot, and it is not a doubt except according to Tosafot. Yet I wonder on Bach and Shelah: behold grapes and groats are crushed and their shells removed and there is a dispute — if so, one should bless on haMichya per all poskim; why should one eat them specifically within the meal? And it is possible that it seems to him that in any case we require that they be mashed and stick; and study is required in Kessef Mishneh chapter 3 of Hilchot Berachot and Lechem Chamudot.`,
);
patch(
  er,
  "eliyah-rabbah",
  6,
  "_",
  `(6) <b>Even roasted, etc.</b> It appears to me that if they were cooked, the law is like wheat, since he did not write "even if cooked"; and further, this is essentially the doubt of Beit Yosef. What he deduced in Darkei Moshe from what Rashba wrote — that barley is equivalent to wheat for the after-blessing — I wonder; for I studied Rashba's chiddushim daf 26 and saw that he wrote thus regarding flour; and further I found in Semak siman 103: one who chews wheat and barley blesses borei peri haAdamah — therefore in any case in cooking it is fit to rule that one blesses borei peri haAdamah, for we do not find in Kolbo, and even one who disagrees regarding cooking; and according to this Rambam does not disagree with Kolbo — think well; and not like Lechem Mishneh.`,
);
patch(
  er,
  "eliyah-rabbah",
  7,
  "_",
  `(7) <b>[Levush] And to chew it, etc.</b> The wording of Shulchan Aruch: "and to chew it" — in Semak, and so in Rambam chapter 3 of Hilchot Berachot; except Magen Avraham challenged the beginning against the end, that it implies specifically when it is fit for drinking, but if it is thick even though it is not fit to chew, one blesses shehakol — see there. And perhaps because of Beit Yosef, Levush changed and wrote "to chew it," which is from the language of chewing; and so all other poskim wrote only: whatever is fit for eating, one blesses borei minei mezonot. Again I found in Abudraham daf 130 in the wording of Levush: "to chew it."`,
);
patch(
  er,
  "eliyah-rabbah",
  8,
  "_",
  `(8) <b>[Levush] It is soft, etc.</b> Even though they made it for healing — nevertheless since he has benefit from it, he must bless — Gemara.`,
);
patch(
  er,
  "eliyah-rabbah",
  9,
  "_",
  `(9) <b>[Levush] In Ashkenaz language reis and dochan, etc.</b> Amek Berachah and Shelah daf 92 wrote: since some explain the opposite — orez is yerez and dochan is reis — every person should intend not to eat them except within the meal; and if a person needs to eat without a meal, he should bless from doubt on both of them shehakol nihyeh bidvaro — end. And Bach was stringent for this reason as well. In my humble opinion, give another reason for this stringency: I found in Shibolei Leket and Sefer Tania that they wrote in the name of R' Shimon Gaon and Rav Yehudai Gaon that one does not bless borei minei mezonot except on the five species specifically, and not on orez and dochan — see there. Further Shelah wrote: this stringency applies only when they were mashed well in a dish; but if they were not mashed and the kernels are whole, whether of orez or dochan, a person may eat them l'chatchila without being within a meal and bless borei peri haAdamah — end. But Bach was stringent also when whole, because Beit Yosef is in doubt in the explanation of Rabbenu Yona — see there. And I found in Kolbo daf 19 in the name of Rabbenu Yona, this wording: "and even if he ate it whole as it is," etc. — end; behold explicitly that there is no distinction in orez between truly whole or mashed; and this is wondrous against Beit Yosef and all acharonim; therefore it is fit to be stringent in the matter like Bach; and it is possible that for this Shulchan Aruch ruled stam and did not distinguish between mashed or not, except that Rama and Levush distinguished and did not aim well. Acharonim wrote: tatarkeh is yiddish for everyone — shehakol and borei nefashot rabot forever. Magen Avraham wrote: a dish of oat groats that they call gentsi groats, and they put much water in them that they are fit only for soup — one must bless on the kernel borei peri haAdamah and on the water by itself shehakol, for their essence is on account of the water — end; and see above siman 200 seif 2.`,
);
patch(
  er,
  "eliyah-rabbah",
  10,
  "_",
  `(10) <b>[Levush] The majority is rice, etc.</b> Even though Bach disagrees on this, and Olat Tamid — nevertheless Sheirei Kenesset HaGedolah agreed to Shulchan Aruch and Levush, and so ruled Magen Avraham; and what Taz wondered is not a wonder at all, and there is no need to elaborate. It appears to me that even when it is half and half, one blesses borei minei mezonot — for in Rosh and Tur they mentioned only when the majority is another species one does not bless borei minei mezonot, for it is not considered like the five species; but in half and half it implies that one blesses borei minei mezonot.`,
);
patch(
  er,
  "eliyah-rabbah",
  11,
  "_",
  `(11) <b>[Levush] Those who eat it whole, etc.</b> Malbushei Yom Tov wrote inside: this writing is on the law of bread of dochan and other kinds of legumes; and also those [texts] — some say he wrote "I do not know who they are" — end; and so wrote Lechem Chamudot daf 46, and this is his wording: the Rav R' Mordechai Yafe did not mention the law of bread of dochan, and wrote in its place: one who eats dochan whole — study is required why and from where — end of his words. In my humble opinion, that he did not mention bread of dochan is because he relied on what he wrote at the end of the seif "and even if he made from them bread," etc. — which refers also to dochan, namely that he wrote it is not considered like bread of rice, etc. — think well. But this is very wondrous: from where does he have the law of dochan whole? In my humble opinion he deduced thus from the words of Rabbenu Yona that Beit Yosef brought, who wrote this wording: on orez one blesses borei minei mezonot even when whole, but on dochan one does not bless even when whole, etc. — behold it speaks of dochan whole; and since he wrote "he does not bless" and did not write borei minei mezonot, it implies to him that he does not bless at all; and cooked — it is not reasonable not to bless at all, but because it is alive he wrote it thus. Also one may explain that he relied on the beginning that one does not bless borei minei mezonot, but borei peri haAdamah one blesses; however I found in Kolbo in the name of Rabbenu Yona that on whole dochan one blesses shehakol; and in Tashbetz siman 322 I saw that he ruled that on dochan whole, alive, one blesses borei peri haAdamah; and so I found in R' David Abudraham daf 132; and so appears the main law, and Kolbo speaks of cooked dochan.`,
);
patch(
  er,
  "eliyah-rabbah",
  12,
  "_",
  `(12) <b>They were completely mashed, etc.</b> Specifically when they were mashed through a perforated utensil that they are very thin, or that he made a dish from flour of legumes, as Lechem Chamudot and Shelah wrote; but when he mashed it in a spoon, one blesses borei peri haAdamah — end of Magen Avraham's words. I wonder at Shelah daf 92, who wrote that on dik'i arbizan one blesses shehakol; and for practical halachah the words of Magen Avraham appear correct, and so it implies in Olat Tamid — study is required.`,
);
patch(
  er,
  "eliyah-rabbah",
  13,
  "_",
  `(13) <b>And afterward borei nefashot rabot, etc.</b> In Magen Avraham he wondered why one does not bless me'ein shalosh like on bread. In my humble opinion the reason is that we descend one level: on bread, where one is fit to bless Birkat HaMazon, one blesses me'ein shalosh; and here, where one is fit to bless borei minei mezonot, one blesses borei nefashot rabot, since there is no kezayit within k'dei achilat peras; and further, bread is important — and see above s.k. 3 what I wrote there. And now I found in Derishah that he wrote: above speaks even in any case, because they placed the flour of the five species with intent for taste; and since there was intent it is important — unlike here, where it was mixed without intent. And it appears more that here, where the mixture was initially flour in flour and has no taste, therefore we require a kezayit within k'dei achilat peras — unlike there, where from the outset it is in food and a dish in which they put taste — end of his words.`,
);
patch(
  er,
  "eliyah-rabbah",
  14,
  "_",
  `(14) <b>[Levush] Ki Atah Hashem tov u'metiv, etc.</b> Lechem Chamudot and Sheirei Kenesset HaGedolah wrote that Levush did not have the text "u'metiv lakol"; and I say: since Levush afterward wrote "and some say: after he said Ki Atah Hashem tov u'metiv lakol" — evidently he had this text, except that here the word lakol fell from the printing; and so it implies in seif 12.`,
);
patch(
  er,
  "eliyah-rabbah",
  15,
  "_",
  `(15) <b>[Levush] In our nusach, etc.</b> And so it is in Rif and Rambam and Raavan siman 190, and Shibolei Leket, and Tania, and Tashbetz, and Kaptor VaFerach chapter 10, and Sefer HaManhig — therefore one should not change.`,
);
patch(
  er,
  "eliyah-rabbah",
  16,
  "_",
  `(16) <b>[Levush] And one should not say, etc.</b> Bach wrote: behold the holiness of the land that is influenced by the holiness of the upper land is also influenced in its fruits that draw from the holiness of the Shechinah; therefore it is appropriate that we say "and we shall eat of its fruit and be satisfied of its goodness," for in eating its fruits we are sustained from the holiness of the Shechinah — end. And one may wonder at his wonder: if so, what does it challenge at the end of the first chapter of Sotah — why did Moshe desire to enter Eretz Yisrael? Does he need to eat of its fruit and be satisfied of its goodness? Behold one may say he speaks of holiness. And it is possible that Moshe is different, for the Shechinah was constantly with him — even though he did not eat from the fruits of Eretz Yisrael, as Rashi explained at the end of parashat Beha'alotekha; and therefore the Gemara was precise: "and does he need to eat of its fruit," etc. — he wanted to say that Moshe does not need this. For practical halachah study is required: Shibolei Leket, Tania, Kaptor VaFerach, and Shelah have this text and do not have at the beginning of the blessing "to eat of its fruit and be satisfied of its goodness"; and from Abudraham it implies that even Baal HaHalachot Gedolot did not have the text except "to eat of its fruit" and not "and we shall eat"; but I saw in Baal HaHalachot Gedolot that he has both texts, and so Kolbo.`,
);
patch(
  er,
  "eliyah-rabbah",
  17,
  "_",
  `(17) <b>[Levush] It is correct, etc.</b> And so wrote Abudraham and Rekanati and Shelah, and so ruled the acharonim.`,
);
patch(
  er,
  "eliyah-rabbah",
  18,
  "_",
  `(18) <b>[Levush] This is the wording of Beit Yosef: Rabbenu Yona wrote: when they bring fruits from outside the land to Eretz Yisrael.</b> In doubt one need not change the formula of outside the land; but Rashba wrote that even outside the land, if one eats fruits that come from the land, one blesses on the land and on its fruits — end of his words. And one must say that what he wrote "fruits of outside the land from Eretz Yisrael" means that they brought fruits to outside the land from Eretz Yisrael; and so is explained in Derishah, and this is his wording: "And that Rabbenu Yona, may his memory be blessed, wrote: when they bring fruits from Eretz Yisrael to outside the land — in doubt one need not change the formula of outside the land" — it appears to me that this is his explanation: when they bring, and I do not know if this fruit I want to eat is from that fruit they brought from Eretz Yisrael or not — one does not change the formula from doubt; and Beit Yosef understood the doubt that Rabbenu Yona said as doubting in the law how we bless on fruits brought from Eretz Yisrael to outside the land — and I do not see his words in this — end of his words; and so it implies from Bach and Magen Avraham. And according to this, in doubt whether they are fruits of Eretz Yisrael outside the land, one blesses on the fruits; and the same law if he is in Eretz Yisrael and in doubt whether they came from outside the land — one blesses on its fruits; and so ruled Olat Tamid. But the wording of Rabbenu Yona before Maharam Tikotin wrote, and this is his wording: "And when they bring fruits from outside the land to Eretz Yisrael — in doubt one need not change the formula of outside the land, but from doubt one should tithe them" — end of his words; it is clear that when he is in Eretz Yisrael and in doubt whether they came from outside the land is what is discussed; and even so one does not change the formula of outside the land; and it appears to emend thus in the words of Beit Yosef: "fruits of outside the land to Eretz Yisrael" in place of "from Eretz Yisrael"; and it seems to him that all the more so regarding fruits of Eretz Yisrael to outside the land one does not change the formula of outside the land even when certainly from Eretz Yisrael; therefore he wrote on it the words of Rashba who disagrees with Rabbenu Yona; and thereby the challenges of Derishah and Bach from Rabbenu Beit Yosef are removed. Yet one may wonder: according to this, how did Rabbenu Yona write "but from doubt one should tithe them"? Behold a complete mishnah at the beginning of chapter 2 of Challah: fruits of outside the land that entered Eretz Yisrael are obligated in challah; and Rambam ruled chapter 1 of Hilchot Terumot and Tur Yoreh De'ah end of siman 331 and Shulchan Aruch there — behold even certainly fruits of outside the land in Eretz Yisrael are obligated in ma'aser. And one may say the doubt is whether they were also crushed outside the land — for then if we know certainly they are exempt from ma'aser, as explained in Tur and Shulchan Aruch there, that in doubt one should tithe them. Again I found in Kolbo daf 19 that he wrote in the name of Rabbenu Yona, and this is his wording: if fruit from Eretz Yisrael to outside the land, one need not change the formula of outside the land, but [one should] separate ma'aser from them — end of his words; behold it speaks explicitly of fruits of Eretz Yisrael that came to outside the land; and nevertheless we learn from him that even when certainly they came from Eretz Yisrael, Rabbenu Yona says one does not change from the formula of outside the land — and automatically the challenges of Derishah and Bach mentioned above are rejected. Yet one may wonder: behold regarding fruits of Eretz Yisrael that came to outside the land it is clear in the mishnah and Rambam and Tur that I brought that they are exempt from ma'aser even when certainly they came from Eretz Yisrael — and until the wonder increased I studied Rambam, upon whom Raavad challenged: if fruits of Eretz Yisrael were crushed in Eretz Yisrael they are obligated d'oraisa, and if crushed outside the land they are obligated d'rabbanan; and it is possible that this is how Rabbenu Yona and Kolbo hold; but the matter is wondrous — for if so, Beit Yosef and Shulchan Aruch there should not have ruled stam like the words of Rambam and not mentioned at all the words of Rabbenu Yona and Kolbo who agree with Raavad's challenge. For practical halachah it appears to me: when certainly they came from outside the land to Eretz Yisrael, one blesses on the fruits; and when certainly they came from Eretz Yisrael to outside the land, one blesses on its fruits; but in doubt, whether in Eretz Yisrael or outside the land, one blesses on the fruits — for we do not find Rashba disagreeing on this.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] On the five species, etc. — because of their importance, since Eretz Yisrael was praised with them, they established for them a separate blessing. Tur. Taz s.k. 1.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — olive and date. For the honey mentioned in the verse is date honey; if so, the explanation of the verse is: a land that has dates from which they make honey. However see Rashi Sukkah daf 6a, who wrote: all types of sweetening are called honey, and dates are a type of sweetening — end; and according to this, the fire mentioned in the verse is the dates themselves, and they are called honey on account of the sweetening.`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(3) There — one blesses after them, etc. One who ate fruits in the measure for an after-blessing, and immediately when he ate them they descended the chambers of the belly and he vomited them all — he does not bless an after-blessing, for this is not worse than food that was not digested, on which one does not bless. Birkei Yosef letter 1 on Tur letter 1; and so Devar Moshe in Hagahat Tashbetz letter 1; and he challenged the words of Kol Eliyahu ch. 1 siman 9 — see there. Kitzur Shulchan Aruch siman 51 letter 15; and see further below siman 210 letter 11.`,
);
patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(4) [Seif 2] Five species of grain, etc. — they are wheat, barley, spelt, oats, and rye, which are also important, since Eretz Yisrael was praised with them: spelt is a type of wheat, and oats and rye are types of barley. And they have further virtue, for on them a person lives; and if he made from them bread, one blesses HaMotzi; therefore even if he did not make bread from them but a dish such as a pot-cooked dish, etc., one blesses on them borei minei mezonot and afterward one blessing me'ein shalosh. Tur. Taz s.k. 2. But what we call tatarkeh is not in the five species of grain. Magen Avraham s.k. 1.`,
);
patch(
  kh,
  "kaf-hachayyim",
  5,
  "_",
  `(5) There — five species of grain, etc. Sufganiyot made on Pesach from crushed matzah — one blesses borei minei mezonot. Responsum Maharash Cohen vol. 1 siman 163. Atzei Etz ch. 1 letter 1; and so above siman 168 letter 85.`,
);
patch(
  kh,
  "kaf-hachayyim",
  6,
  "_",
  `(6) There — whether boiled or like ashes. It implies that at the beginning it speaks when they boiled without crushing; and that which in seif 4 he wrote "when they boiled the kernels whole" one blesses borei peri haAdamah — possibly here it speaks when they boiled until mashed. And so is implied in Levush seif 4; and below seif 7 — see there. Magen Avraham s.k. 2. But Pri Megadim wrote that what Shulchan Aruch wrote "boiled" is a textual corruption and it should read "split" — for it is a common error and also an error that is frequent; and also it is proven, for behold the entire seif is the language of Rambam chapter 3, who wrote "split them or like ashes," etc. — see there. And so Beit David siman 432. However for the law there is no difference: whether split or boiled until mashed, one blesses borei minei mezonot as Beit Yosef wrote; but if they are whole, one blesses borei peri haAdamah as written in seif 4.`,
);
patch(
  kh,
  "kaf-hachayyim",
  7,
  "_",
  `(7) There — or like ashes. Crushing — for here they were not ground in a mortar or through milling, but only that their shell was removed; and even though they are whole like groats, so it is. However when the shell was removed and they did not stick at all — there is room for doubt. Eshel Avraham letter 2.`,
);
patch(
  kh,
  "kaf-hachayyim",
  8,
  "_",
  `(8) There — even if he mixed with them much honey, etc. Here with the five species, which are most important, we do not follow the majority; only whatever they put for food — unlike other things, where we follow the majority, as written below seif 7. Taz s.k. 3. And so Magen Avraham above siman 204 s.k. 25; and see above siman 204 letter 60 and siman 204 letter 100.`,
);
patch(
  kh,
  "kaf-hachayyim",
  9,
  "_",
  `(9) There — or other species much more than them, etc. — such as when there is a kezayit of grain within k'dei achilat peras, and also he ate a peras such that in what he ate there is a kezayit of grain; and if not, he blesses only borei nefashot rabot, as written above siman 168 letters 122 and 127 — see there; and so Chasdei David in this siman letter 3, Agurah BeAhalekha daf 4 — see there. And it will be explained further below from this in seif 9 — see there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  10,
  "_",
  `(10) There — and afterward on haMichya. And if he removed the bran from them and returned it to them — Magen Avraham wrote siman 491 s.k. 2: there is room to doubt whether it combines for a kezayit for matzah; and Eshel Avraham wrote in this siman letter 1 that the same applies to borei minei mezonot here and to me'ein shalosh blessing likewise — see there. But in Chayei Adam there s.k. 2 he wrote plainly that it does not combine — see there; therefore if such a case occurred, one should eat a kezayit aside from the bran in order to emerge from doubt.`,
);
patch(
  kh,
  "kaf-hachayyim",
  11,
  "_",
  `(11) There — and afterward on haMichya. Whether he established his meal on them or not; whether he cooked them in water and oil or cooked them in water and milk and other liquids. Birkei Yosef letter 2; and so above siman 168 letter 49 — see there. And if he does not eat the dish but wants to drink only the water in which it was cooked by itself — see in our words above siman 200 end of letter 11, where we wrote that there is a dispute on this, and from doubt one blesses shehakol; but if he eats the dish and also drinks the water, he is exempted by the blessing on the dish — see there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  12,
  "_",
  `(12) There — except for binding, etc. Bach wrote: whatever is for binding, even if the majority is flour and the minority is other things, one blesses borei peri haAdamah or borei peri haEtz or shehakol per the blessing of those species — see there. And so Olat Tamid end of letter 2. However Taz s.k. 4 wrote that one should not be lenient in this, since he has significant benefit at least from the abundance — see there. And so Matteh Yehudah letter 1: binding is not nullified except the importance, and not the majority of grain. And he wrote that the same applies to the law written in seif 3: it speaks only regarding almonds where it is the majority; therefore if they put flour for binding, one blesses only the blessing of the almonds; and the doubt there is lest it was made for a meal — unlike Taz s.k. 5 — see there; therefore if such occurred that they put a majority of grain for binding, one should eat it specifically within the meal, or bless on something whose blessing is borei minei mezonot and on something whose blessing is like that species, to exempt this one way or another in order to emerge from doubt.`,
);
patch(
  kh,
  "kaf-hachayyim",
  13,
  "_",
  `(13) And for lekach — the flour is primary. Rabbi Akiva Eiger letter 2. Eshel Avraham letter 4. And panuchikin — Shelah wrote it is called binding; but in Tashbetz siman 322 he wrote that one blesses on it borei minei mezonot and afterward me'ein shalosh — Rabbi Akiva Eiger there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  14,
  "_",
  `(14) [Seif 3] When they put flour, etc. — one blesses borei minei mezonot; and afterward, if there is a kezayit of flour within k'dei achilat peras and he ate the measure of eating a peras, he blesses me'ein shalosh; and if not, he blesses borei nefashot rabot, as written above letter 9 — see there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  15,
  "_",
  `(15) There — and if for binding in general, etc. — according to Bach, even if the majority is flour it is also called binding; according to Matteh Yehudah, specifically when it is a minority, as written above letter 12 — see there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  16,
  "_",
  `(16) There — and it is good to be stringent and swallow it, etc. — namely specifically if it is thick such that one must chew it in the mouth; but if it is so soft that it is fit for drinking, in any case one blesses on it only shehakol and afterward borei nefashot rabot, as written below seif 6.`,
);
patch(
  kh,
  "kaf-hachayyim",
  17,
  "_",
  `(17) There — and it is good to be stringent, etc. Taz s.k. 5 wrote that the doubt is on account of the after-blessing; and according to this, if he wants to eat less than a kezayit he should say shehakol — see there. But Nahar Shalom letter 3 wrote that according to Tosafot and poskim, even on account of the first blessing it is good to emerge from doubt and eat it within the meal rather than bless from doubt shehakol nihyeh bidvaro; and so is implied from the words of Matteh Yehudah that we wrote above letter 12 — see there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  18,
  "_",
  `(18) There — and swallow it within the meal, etc. — or bless first on bread like snifin, and on something whose blessing is borei peri haEtz, to exempt this from borei minei mezonot, as written above letter 12 — see there.`,
);

const PATCH_COUNT = 36;
console.log(`ok siman 208 remainder-b — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-208.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const SLUGS = new Set(["eliyah-rabbah", "kaf-hachayyim"]);
const items = (queue.items || []).filter((it) => SLUGS.has(it.slug));
for (const it of items) {
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
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
);

let fail = 0;
for (const it of items) {
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
  console.error(`Preflight: ${fail} failure(s) of ${items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${items.length - fail}/${items.length} blocks`);
