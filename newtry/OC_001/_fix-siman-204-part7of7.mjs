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

const st = "output/siman_204/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_204/turei-zahav/part-001.txt";
const ye = "output/siman_204/yad-ephraim/part-001.txt";

patch(
  st,
  "shaarei-teshuvah",
  5,
  "_",
  `<b>And on kora.</b> Ba'er Heitev wrote that in Pnei Meiros he disagrees with Taz. And see in Eshel Avraham that he too disagrees with Taz, and see what Yad Ephraim wrote that even though one can reconcile Taz's words, nevertheless the common practice is like Peri Megadim and Eshel Avraham that one does not distinguish between legumes and legumes. And in what Taz wrote that even on the shoots one blesses borei peri haAdamah — they also disagree in Peri Megadim and Eshel Avraham, and they wrote it is not fruit and we descend one level to bless shehakol. See Yad Ephraim that the essence is like Taz. And regarding shoots of those called tsuker arbeis, that many chew the shoots together with the legumes — it seems all agree; see there.`,
);
patch(
  st,
  "shaarei-teshuvah",
  6,
  "_",
  `<b>Barley.</b> Ba'er Heitev — and this law is from a responsum of the Rosh, and some wrote that the Rambam disagrees with this law. And see in the responsum of Perach Mateh Aharon part 1 siman 40. And see in Yad Ephraim that greens that one gives to a sick person for the sake of their waters — one blesses on the water as on vegetables, and specifically barley for which there is no way to cook for food except for their waters for the sick person; see there. And see below siman 208 in Magen Avraham and Eshel Avraham there.`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "א",
  `<b>Moldy bread.</b> In the baraita it also counts wine that turned sour, and Tur explains this means its smell is of wine and its taste is vinegar. Beit Yosef explains that if the opposite — that its taste were wine — it would be full wine and one would bless borei peri haGafen, as stated here in seif 3. And it appears simple that this souring does not mean what we call kanik in another language, which is fit even for kiddush as stated in siman 472 regarding wine at the mouth of the barrel even though it has sediment, etc. — meaning that they strain it as Rama wrote siman 472. Rather this souring is worse, as stated in the chapter HaMocher Peirot (Bava Batra daf 95) that R. Chiyya said: sour wine is not needed, and Rashi explained this is the kososet of the mishnah which is itself very bad — and that is certainly unfit for kiddush and one does not even bless borei peri haGafen on it — and this is smell of wine and taste of vinegar. Maharshal wrote that souring is kanik and unfit for kiddush and was not precise in this; see siman 472 seif 2.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ב",
  `<b>That its form changed and spoiled.</b> Beit Yosef explains it spoiled somewhat — for if entirely, since it is not fit for eating, one does not bless on it at all.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ג",
  `And on withered fruit, etc. — he goes to his words that Beit Yosef wrote in siman 202, and thus: R' Yerucham wrote — withered fruit that is a kind of fruit that did not finish its cooking — shehakol; end of his words. And Beit Yosef wrote he was not precise, for behold they said in the Gemara that withered fruit means bushlei kimra, and Rashi explained like sun-cooked dates that the sun completed and the heat wore them and they dried — and they are dates; if so they are not the matter of those that have not yet finished cooking; end of Beit Yosef's words. And one should wonder greatly at him — what did he think to achieve against R' Yerucham more than the Tur, who also wrote here thus: and on withered fruit, which are a kind of dates that do not cook on the tree; end of his words. And so too the Rambam chapter 8 of Berakhot — withered fruit means fallen fruit, and in Kessef Mishneh he wrote nothing there; and so here in this siman in the Tur — perhaps it is an error. And indeed to reconcile: in the Gemara they said per the first version that withered fruit is bushlei kimra per one opinion, and per the other opinion it is tamrei d'zika that fell by wind — meaning they were not cooked on the tree; and we challenge this version from that which R. Yitzchak said: anything that is a cursed species — one does not bless on it; and if tamrei d'zika, what cursed species is it? The remainder — Rashi explained that R. Yitzchak does not argue on withered fruit, only on vinegar and gobai. And afterward there are two more versions in the Gemara, and per the latter version they said: granted per the one who says tamrei d'zika it is so, etc.; but per the one who says bushlei kimra let it teach, etc.; and we conclude it with a difficulty. It is found that per the one who says tamrei d'zika it works with the conclusion in his view. And it appears he did not consider this version relative to what challenges the first version — what cursed species — for this version holds that this species that cannot be cooked on the tree is certainly considered a cursed species, and R. Yitzchak disagrees properly; and we rule like the first Tanna. And therefore they ruled and explained properly that withered fruit is tamrei d'zika — which is like the latter version that appears from the Talmud's conclusion. And further, for the law too, even per the first version it would be tamrei d'zika whose blessing is shehakol according to both, for R. Yitzchak does not argue on this; and there is no place to come reconcile Beit Yosef's words in what he achieved specifically against R' Yerucham. And the essence is indeed so, and what is written here like the one who says bushlei kimra is also not precise. Maharshal too achieved against Beit Yosef for another reason.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ד",
  `<b>And on kora.</b> The reason is that people do not plant with intent to eat it when soft, but leave it until it hardens and becomes dates — it is not fruit. And it appears to me that regarding shoots of legumes called in Arabic shotin there is a distinction: those that are sown in gardens with intent to eat them alive in their shoots — one should bless borei peri haAdamah even on the shoots, for thus they were sown; but those sown in fields to leave until they harden and cook them — on what they uproot while still wet and moist, for they were not planted with this intent — one should bless shehakol on them, even if they harden, for then they are good only when cooked; therefore one should bless only shehakol until after their cooking, as it appears to me.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ה",
  `<b>When they are soft.</b> But they did not plant them with intent for this, rather that they should grow and harden and produce fruit within them — therefore their blessing is shehakol.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ו",
  `<b>And on barley flour.</b> See siman 208.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ז",
  `<b>And on barley beer.</b> And if you ask: behold barley is primary and changes to borei peri haAdamah — one can answer that it has other significance in bread; or alternatively, since the beverage is clear its main element is water; see there. And it appears to this that Rav and Shmuel said regarding anything that has one of the five species — for here there is only taste in general, as Beit Yosef, Tosafot, and Rosh wrote. And this applies to fruits cooked in water above in siman 202 — for per the Rosh one blesses on them like on the fruits since the taste entered them, for there the taste of the fruits themselves enters their water through cooking; which is not so here, where the taste of the barley itself is not in the beer — and this is similar to honey that comes from dates above, which is not through cooking.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ח",
  `<b>And on field herbs.</b> It appears he said this only regarding grasses, for those of the field are not important on their own and not on account of planting, for they grow without planting. But good fruits such as jagodish melonnish — one should bless on them borei peri haAdamah. And proof from what Maharam wrote in his Berakhot, and thus: and on strawberries that grow in a thicket and in grasses called in German brun, and red fruit called erpherit — Tosafot wrote one should bless borei peri haEtz. But R. Yosef wrote one should bless borei peri haAdamah, etc.; end of his words. And these fruits are not seeded, and nevertheless they belong according to one to the tree and according to one to the ground, for the name of fruit is upon them. And see siman 13 seif 1 regarding ornamental tree — it is one matter with this here.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ט",
  `<b>I.e., anis.</b> It appears to me that moist ginger is more comfortable for eating than anis, and as here — which is kimel in another language — and therefore on wet ginger he said above that its blessing is borei peri haAdamah.`,
);
patch(
  tz,
  "turei-zahav",
  10,
  "_",
  `<b>It is like other honey.</b> It was explained above siman 202 seif 8 that there is no distinction whether it comes on its own or through pressing, and the reason is that there is no taste of the dates there; and it differs from cooking dates or other fruits, as also explained there seif 11.`,
);
patch(
  tz,
  "turei-zahav",
  11,
  "א",
  `<b>Preserved fruit or ginger, etc.</b> In order to explain this matter with Heaven's help — and also in seif 12 I will bring the Tur's words, and thus: and on moraba compounded in honey it would appear to me to bless shehakol on it, whether it is made from preserved fruit or from roses or from kinds of herbs, because honey is primary — even though we wrote above on a walnut fried in honey borei peri haEtz, for that case is different since the walnut is whole and its substance endures, and it differs from homlita, etc., until: and I cancel my opinion before theirs. In the Gemara it states, and in Yoma daf 81: Rava said — a box of pepper or ginger in a winepress is exempt; Rashi explained this is not its manner of eating. And R. Nachman said: this homlita that comes from Bei Hendu is permitted; Rashi explained they spice crushed spices in honey (and Beit Yosef wrote this is compounded ginger — siman 204) — permitted on account of bishul akum since it is eaten as it is alive, and one blesses borei peri haAdamah on it. Thus it is eaten when alive — no matter whether moist or dry. We find that this homlita deals with moist ginger; if so we have no proof for dry that one blesses borei peri haAdamah after compounding in honey. Rather it is simple there is no distinction in this for blessing, for since it comes to eating one blesses borei peri haAdamah on it like other things that are better after cooking; and they do not distinguish between moist and dry except for bishul akum, which is permitted only when moist since it is eaten when alive, but when dry it is forbidden on account of bishul akum unless an Israelite cooked it — and then one blesses borei peri haAdamah on it. With this we explain the Tur's words in his dispute with his colleagues: it is simple — if one comes to fix honey and puts crushed spices in it and the main eating is the honey, one does not bless except on the honey and the spices are secondary to it. And if the main eating is the spices — such as when there are many of them and they compound them in honey — it is obvious one blesses as on spices, and this is the homlita in the Gemara that we mentioned. For the Tur and his colleagues disagree whether one makes eating from roses or the like that have no taste except after compounding in honey: the Tur holds this is not similar to a walnut fried in honey whose blessing is borei peri haEtz, for the walnut is whole — meaning it was not crushed and its name remains upon it — unlike those roses that were crushed and their description is not at all as at first. And it also differs from homlita — crushed spices that give taste in honey and are very perceptible; therefore its blessing is as on spices, since the main eating is the spices. Unlike roses, where the taste of the rose is not perceptible in honey and it is made only as food through honey that is primary and causes the food. Therefore honey is primary. And his colleagues say there is no distinction between roses and crushed spices, and both are included in homlita in the Gemara, and honey is secondary — even though it causes the food, nevertheless it is like cooking in water: water causes the food and nevertheless one does not bless on it but on the food itself; so too one blesses on roses borei peri haAdamah, and even though they grow on a tree they are nevertheless not the main fruit, for that tree has other fruits and roses are like our flowers. And he ruled here thus, for the Tur himself canceled his opinion against his colleagues — but we rule as the Tur wrote. And all the more so according to what I saw in some versions homlita shehakol — end of his words; for according to this version it is hard: what does the Gemara prove from that it is eaten as it is alive that it is permitted on account of bishul akum — perhaps it is not eaten alive and nevertheless permitted because honey is primary? And for bishul akum we follow mixtures after the primary, as explained in Yoreh Deah siman 113; and therefore its blessing is shehakol like honey, and we do not follow the crushed spices that are secondary relative to honey — as the Tur holds regarding roses. Granted for the version borei peri haAdamah it is hard — for necessarily the spices that are ginger are primary since they bless borei peri haAdamah on them; you must say it is eaten as it is alive, for otherwise it would be forbidden on account of bishul akum. But for this version shehakol it is certainly hard.`,
);
patch(
  tz,
  "turei-zahav",
  11,
  "ב",
  `<b>Of roses.</b> It appears that the peel of bergamot that they compound in honey — one should bless on it borei peri haAdamah. And proof from that which is stated in Kessef Mishneh daf 35 regarding capers, which is the peel of the fruit — that for orlah it is not fruit, and for berakhot too it is not fruit and one does not bless borei peri haEtz on it but borei peri haAdamah. And even though Tosafot and Rosh do not have this reading and hold that for berakhot too one blesses borei peri haEtz — the Tur wrote to decide the reading that we mentioned, and so too Shulchan Aruch that one should bless borei peri haAdamah. And if so, the same applies to all peels. And one might say: behold they said in the Gemara there that capers were not a guardian of the fruit, since if you take it the fruit does not die — unlike other peels that if you take them the fruit dies; automatically the peel was a guardian of the fruit. And if so, the peel of bergamot too — if you take the peel the bergamot dies and it was a guardian of the fruit. But this is not a matter, for necessarily they did not say there that a guardian is considered fruit except for orlah, where there is an extension of et peryo that we include even the peel, as stated in Yoreh Deah siman 294. But in truth it is not fruit on its own, and therefore borei peri haEtz does not apply even to a peel that is a guardian. And even though in the Gemara that we mentioned they derive the blessing from the law of orlah — that is regarding lo pri, which is all the more so in their blessing; but regarding yes pri one does not learn blessing from orlah. And proof from the words of Tosafot there in that which the baraita taught: peels of nuts and pits are liable. And Tosafot wrote: from here one should bless on the pits borei peri haEtz, and not so on the peels of nuts that precede the pits — rather necessarily the obligation of orlah in them is even though they are not fruit but only a guardian alone, forbidden by force of the extension et peryo; and therefore their blessing is borei peri haAdamah. Unlike the pits, which are in any event fruit even though they are not such superior fruit — nevertheless the name of fruit is upon them; therefore blessing and orlah are equal, for it is fruit. Therefore it requires study on Tosafot and Rosh who hold regarding capers that their blessing is borei peri haEtz — for even peels of nuts that are a guardian nevertheless require specifically the extension et peryo for orlah, implying that on its own it is not fruit but only forbidden by the extension; and for blessing there is no extension and certainly it is not fruit, and it is like a quarter-tree planting mentioned in the laws of orlah siman 294, which is not fruit since there is no extension et, and its blessing is borei peri haAdamah. From all this it appears clear that the blessing on bergamot peel is borei peri haAdamah. And I heard many discuss this blessing, and as it appears to me I wrote clearly.`,
);
patch(
  tz,
  "turei-zahav",
  12,
  "_",
  `<b>Therefore kinds of honey that they cook, etc.</b> These are the words of the Rambam, and this refers to the beginning where he said if it is made only to stick — we do not follow it — and that which he preceded this. But if he mixed in order to give taste out of the proper order, it appears the Rambam intended this arrangement in his ordering so that we understand his words in what he wrote "in order to give taste" — for at first glance I would explain that he speaks of every taste, that even if one gives some spices to a dish and they give taste in it one blesses on the spices; and this is not so, for then the spices are secondary and since the main eating is the dish. Rather he deals with that thing which gives taste being itself the eating — such as putting wheat milk inside honey not to stick but because he wishes to eat the food that will be; and therefore he said "in order to give taste in the mixtures" — meaning through the mixture of the two kinds there will be good taste for eating both, and this is literally homlita in the Gemara that one blesses on it as a kind of spices. And it appears he holds like the Tur's colleagues: in everything one gives to honey and it will be for eating through combining both, we follow the primary that is for eating. And if one gives wheat milk to honey with intent to eat the food of wheat milk after it receives taste from the honey, it is like the roses above — one blesses on the wheat milk. And therefore the Rambam preceded this case — if he mixed to give taste in mixtures — so we know his intent from what he wrote afterward regarding wheat milk: if he does it to stick, we automatically know he intended the second division; and if he gives wheat milk not to stick but as food through the mixtures — this is itself the intent of Rama in what he wrote. And it appears that "if he mixed, etc." without doubt refers to what he wrote. Even though I saw Maharshal who extended on these matters in other ways, as it appears to me I wrote correctly; and see siman 208 seif 3 regarding liqueur.`,
);
patch(
  tz,
  "turei-zahav",
  5,
  "_",
  `<b>Wine lees.</b> He explains that no water was put in them; but when water is poured on them he explains its law afterward.`,
);
patch(
  tz,
  "turei-zahav",
  6,
  "_",
  `<b>And one should not bless borei peri haGafen.</b> It appears it should read [borei peri haEtz], as it is in Beit Yosef in the name of Rashbetz, who wrote regarding this: it would appear to follow the majority, and one should have hesitation about this because figs — all their power is in them; and he wrote he does not rely to bless borei peri haGafen on it; end of his words — implying that in any event one blesses borei peri haEtz, for in any case it is fruit of the tree. And in Levush I saw he wrote one does not bless borei peri haGafen but shehakol; end of his words — and this is not correct to my mind: what does shehakol do here? For if there were no figs one would bless borei peri haGafen; now why should it be reduced on account of the figs whose blessing is borei haEtz? Rather simply one blesses borei peri haEtz.`,
);
patch(
  tz,
  "turei-zahav",
  8,
  "_",
  `<b>If they forced him, etc.</b> Above siman 196 seif 1 we clarified the matters that we rule like the Rambad: one who eats forbidden food unwittingly blesses afterward; and likewise in a place of danger one blesses at the beginning and end, since this eating is regarded by him as permitted. And the Rav Rama ruled that he ruled regarding one forced to eat that he does not bless — and this is the view of Ohel Moed in Beit Yosef. And afterward Shulchan Aruch ruled that one who eats forbidden food on account of danger blesses on it — not as Rama wrote on this at all. And this is very puzzling in my eyes, for they are certainly one matter; and whoever said this for exemption did not say this for obligation, as it appears to me. And see above siman 196.`,
);

patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `In Taz note 3 — withered fruit, etc. And in Pnei Meiros part 1 siman 65 he wrote to reconcile Beit Yosef's words in his difficulty on R' Yerucham; see there. And in my humble opinion, also what R' Yerucham wrote that it did not finish cooking means it will never finish cooking on the tree, and it is inferior to boser that will eventually finish — and therefore other trees from when they produce, as R' Yerucham stated explicitly regarding withered fruit for orlah; see there. And see in Yoreh Deah siman 294 in Shach, in Bach's name, that what the Rambam wrote chapter 13 of Maaser — withered fruit means they did not cast yeast, meaning tamrei d'zika; if so the Rambam should have written he establishes the Talmud when he made them a granary, for otherwise even certainly too he is exempt. And see in Pnei Meiros that his view is small pears and the like that do not cook on the tree, but when placed in straw they cook — they are not considered fruit at all, and it is fit to bless shehakol to satisfy all opinions. And in my pamphlet mentioned above I extended on boser and the words of the Rambam chapter 9 of Hilchot Maaser; see there. And see in responsa Sha'ar Ephraim siman 523.`,
);
patch(
  ye,
  "yad-ephraim",
  2,
  "_",
  `Note 4 — while still moist one blesses shehakol, etc. And in Eshel Avraham he challenged on this; see there. And in my humble opinion the view of Taz is that it is similar to peppers, and what Eshel Avraham wrote there that even when they dry one does not eat them with their blessing, etc. — this is not Taz's view; for whatever one planted with intent for this — what do I care about their blessing or another blessing? Rather he holds the distinction between peppers and boser: there, when it reaches its completion it will be fit without another repair; and likewise if one eats other fruit after its completion as was the original intent in planting, even though the needed repair has not yet finished — such as olives and grapes, or chewing wheat. But where the entire original intent of planting has not yet finished, and also when finished it is not fit without another repair — if so, even if you say it is considered as if finished, nevertheless we do not say it is considered finished and repaired, and its repair is by human hands; we follow the intent that is usual in his mind at the hour he uproots a thing from its growth. Therefore with peppers, whose planting begins to eat them when they dry — and then they are only for spice — therefore we judge it as they are now; and since it has not yet reached the category of the completion of eating that he intended to eat them dry, we descend one level to bless borei peri haAdamah (but Rashba wrote the reason is because he somewhat planted with intent to eat moist; see there). And if so, the same applies to legumes — when they dry they are fit only through repair by cooking, and as we now judge it; and since the fruit has not yet finished, one blesses shehakol. And in my pamphlet mentioned above I wrote on this, and there I also brought Peri Megadim part 1 siman 65, and also what Eshel Avraham and Peri Megadim wrote to disagree with Taz, who wrote regarding a planter with intent to eat moist ones blesses borei peri haAdamah — and they wrote to bless shehakol. And I upheld Taz in this; and there I wrote regarding tsuker arbeis shotin whose way is to eat the legumes and also the shoots are good for food, and sometimes they chew them together — all agree. And I also wrote there regarding a kind called tirakesh, who advises to eat the wheat and the stalk remains; and if he wishes to chew the stalk to suck the sweets in it he must return and bless shehakol; see there.`,
);
patch(
  ye,
  "yad-ephraim",
  3,
  "_",
  `In Magen Avraham note 7 — we descend one level; it requires study, for if so let us say even two levels, since they did not plant with intent for this — even two levels we descend, as Rashba wrote in a responsum regarding peppers. And with boser the reason we descend only one level is since one eats the body of the fruit for which it was planted on its account; see there. And in the pamphlet mentioned above I wrote that it is possible it deals where the kernels are already within the ears but were not brought out; and see in Rashi Kiddushin daf 62. And if so it is similar to boser, where we say descend one level. And I also wrote there to reconcile according to what Lekutei Peri Chadash wrote — why did Shulchan Aruch not write that on rice one blesses shehakol; and see in Ateret Tzvi, and I brought there the words of my cousin the elder Gaon in Ezrat Kohanim and the words of Ritva in Eruvin and Aruch under the entry chazin (and see in Meturgeman who brought the translation on nosei alumotav that he explained chazin and wrote he did not know what it is — and also in Aruch they did not bring it; end of his words — and it was hidden from his eyes that Aruch wrote the Talmud's explanation that distinguishes between badarka and ginonia; see there). And there I wrote regarding the law of rice explained in Eruvin that the codifiers did not mention it; and see in Ohr Chadash on the laws of berakhot. And for the practical ruling I wrote that possibly their rice was somewhat fit for eating, unlike our rice — one blesses only shehakol. And there I wrote per the words of Lekutei Peri Chadash that he wrote to prove from rice regarding capers; see there.`,
);
patch(
  ye,
  "yad-ephraim",
  4,
  "_",
  `Note 13 — but regarding vinegar that is not strong, etc. See in Ginat Veradim who wrote that wine vinegar that spoiled does not help the heart and on the contrary harms him, and it suffices to bless shehakol, etc. And this is puzzling, for behold it is clear at the head of daf 40 that specifically when diluted or with anigrin; but the Ari wrote that a revi'it or less — one blesses on it at first so he not benefit, since we say in Yoma on Yom Kippur: if he drank much he is liable because he enjoyed much drinking, etc. And in the pamphlet mentioned above I wrote on this regarding the words of the Alfasi gloss and I brought the words of Ezrat Kohanim; and here I shortened.`,
);
patch(
  ye,
  "yad-ephraim",
  5,
  "_",
  `In Shulchan Aruch seif 5 — in the Rama gloss "provided," etc. See what Avnei Nezer wrote in Bekhor Shor in Bava Batra: since raisins grow in water they are like that of Menachot in dried figs that if one boils them they return to their quantity; see there. And in my humble opinion it requires study, for here with raisins the growth of the raisins does not grow from the body of the moisture within them but only on account of the water they absorb through soaking or through pickling, and thereby they open. And that of Menachot there — they expand in the body of the moisture of the dried fig; see there. And it is possible his intent is that here too, since in any event they grow much — if we estimate the size of the moisture itself too it would not be in the water that is six against them; and it requires study.`,
);
patch(
  ye,
  "yad-ephraim",
  6,
  "_",
  `In Taz note 15 — on bergamot peel see above in Magen Avraham siman 202 note 17 that his view is to bless borei peri haAdamah, and Pri Chadash challenged him; see there — and these are my words. But what he wrote regarding Magen Avraham's proof from roses, etc. — see there: it appears from his words that Magen Avraham brought proof that just as on roses one blesses borei peri haAdamah, so too here. And he answered that roses are planted, etc. — and this is not so, for with roses the law that one blesses borei peri haAdamah is because it is not the main fruit but only the seed, as Magen Avraham wrote note 23; and here Magen Avraham holds it is considered like the body of the fruit, and his proof from roses that one should not say since it is not fit except through compounding honey it is primary — on this he brought proof from roses that honey is not primary; see there, and you will find his intent is so. And see in Magen Avraham siman 65 that his view is borei peri haEtz. And in the pamphlet mentioned above I also wrote opinions that one blesses shehakol; and see what Elyah Rabbah wrote that they were not planted with intent to eat it through compounding, and it is not required — and so it appears from Pri Chadash. And I shortened here.`,
);
patch(
  ye,
  "yad-ephraim",
  7,
  "_",
  `As Magen Avraham note 26 — tam is a matter, etc. And in the pamphlet mentioned above I wrote that what Magen Avraham wrote from siman 168 requires study, for there it is impossible he be exempt with the blessing shehakol — how would he do with the blessing of netilat yadayim and also with birkat hamazon? And there I brought the words of Ezrat Kohanim, what he wrote in siman 208 in the name of Tosafot that if one was in doubt on the first blessing he blesses shehakol and need not wait to eat within the meal, only in doubt on the final blessing. And in truth it is not in Tosafot but only from the language of the Rosh and Tur regarding chewing wheat; and see in Hagahot Maimoniyot. And below siman 208.`,
);

const PATCH_COUNT = 25;
console.log(`ok siman 204 part 7 of 7 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-204-part7of7.json");
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
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
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
