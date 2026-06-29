/**
 * apply_bh_translations_b2.mjs — Batch 2: remaining he=2 beer-hagolah files
 */
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()).length; }
function en(segs) { return segs.join('<br />\n'); }
function loc(siman, seif) { return path.join(base, siman, seif, 'beer-hagolah', 'en.html'); }

const TRANS = [
  ['siman203','seif-005',[
    'Baraita of Rabbi Natan, Nedarim daf 22b, according to the interpretation of the Rosh and Ran.',
    '(1) (Meaning: he is liable on account of animals slaughtered outside the Temple precincts.)',
  ]],
  ['siman206','seif-005',[
    'The Rosh there; and so wrote the Ran; and this is also the view of Ramban. However, in an unspecified case, these are \'handles\' that are not self-evidencing, which are not effective handles — unlike the view of Rambam in the preceding seif.',
    '(1) Ran explains: \'to you\' (לך) implies \'for you\' — meaning, my property is forbidden to you; and it implies \'from what is yours.\'',
  ]],
  ['siman221','seif-013',[
    'In the Jerusalem Talmud it remains an unresolved query, and we rule stringently; Tur cited this — see seif katan 4.',
    '(1) This refers to the beginning of the seif, where one prohibited his possessions generally, and to the law \'benefit from my food is upon me\' — which comes from the Jerusalem Talmud as an unresolved query, and we rule stringently.',
  ]],
  ['siman222','seif-001',[
    'Mishnah, Nedarim daf 88a.',
    '(1) Ran explains: because if he gives her sustenance he need not say anything to her, as stated in siman 221, seif 2.',
  ]],
  ['siman229','seif-004',[
    'The Ran there — even without the conjunction \'vav\'; and so wrote Beit Yosef.',
    '(1) See siman 232, seif 8 — only when he changed his words; and so wrote Beit Yosef there.',
  ]],
  ['siman230','seif-001',[
    'I cited this above at the beginning of siman 228.',
    '(1) And Rivash wrote in a responsum, part 1, siman 85: \'Be careful in the annulment of oaths and vows — they should not be annulled in this era except for a matter of mitzvah, such as something that has a remedy, or making peace between a husband and wife, or communal welfare — in the name of the Geonim.\'',
  ]],
  ['siman234','seif-051',[
    'Rashba in his responsa.',
    '(1) And he concluded there: since a sage uproots the vow from the root, he has thereby uprooted the confirmation from its root, and the annulment stands in its place.',
  ]],
  ['siman236','seif-002',[
    'Following Rabbi Akiva there.',
    '(1) And Tosafot there explain: the language of an oath (shevuah) only applies to oneself, therefore the oath takes effect regarding sleep since he imposed a prohibition upon himself regarding it — unlike a vow (neder), as written above in siman 213.',
  ]],
  ['siman239','seif-010',[
    'Chapter 3 of Laws of Oaths.',
    '(1) See there, seif 14 in the gloss: where there is a death penalty it is called a coerced oath, and no distinction was made as to whether there is desecration of God\'s Name; while in the case of unlawful monetary coercion he wrote: only where there is no desecration of God\'s Name.',
  ]],
  ['siman244','seif-001',[
    'The Tur\'s language from the baraita, Kiddushin daf 32b, following Rabbi Yose the Galilean, as explained there in the Gemara.',
    '(1) This is not found in Rambam; and Beit Yosef already noted this.',
  ]],
  ['siman245','seif-010',[
    'Tur in the name of Ramah.',
    '(1) It seems to me: [meaning] halachic rulings, so that he knows how to rule between them.',
  ]],
  ['siman246','seif-026',[
    'There in Rambam.',
    '(1) Meaning: if they were engaged in the laws of carrying on Shabbat from domain to domain, one should not ask him about the law of a barrel that broke on Shabbat; and above it stated that one should not ask about another topic — if they were engaged in Shabbat laws, one should not ask him about the laws of Yom Tov.',
  ]],
  ['siman247','seif-004',[
    'The Tur\'s language from the incident of Shmuel and Ablat, Shabbat daf 157b.',
    '(1) Rokach wrote in siman 217 that the custom of pledging charity for the dead on Yom Kippur has a Scriptural support, as it is written in Parashat Tetzaveh \'once a year shall he make atonement\' and adjacent to it \'and each man shall give ransom for his soul\' — and he explains: what benefit is it to the dead that the living gives charity for him? He wrote that if one gave for the sake of a wicked person it is of no benefit; see Orach Chaim at the end of siman 621 in what is written there; Rema also cited this at the end of siman 249.',
  ]],
  ['siman248','seif-001',[
    'Statement of Rav Zutra, Gittin daf 7b.',
    'The Tur\'s language based on the words of Rif and Rosh on the mishnah \'how long must one be in a city, etc.\' — and the baraita \'30 days for the soup kitchen, etc.\' — Bava Batra daf 7 and further; and from the incident where Rava compelled Rav Natan bar Ami and extracted from him, etc. — there and Ketubot daf 49b — following the later resolution in Tosafot there; and so wrote Rambam in chapter 7 of Laws of Gifts to the Poor, halacha 10; and other later authorities.',
  ]],
  ['siman249','seif-005',[
    'There, daf 67b.',
    '(1) Meaning: since he is in any case already obligated to fulfill this mitzvah, and he wishes to exempt himself from it through tithes, he is not permitted; but if he wishes to fulfill with it a mitzvah for which he is not already obligated, he is permitted.',
  ]],
  ['siman251','seif-001',[
    'Tur; and the language of Semag in the name of Ra\'am: since he transgressed intentionally he has left the category of brotherhood, as in the verse \'and your brother shall live with you.\' And what is implied in Gittin daf 47a, that Rav Ami was willing to redeem an apostate who eats carcasses — he acted beyond the letter of the law.',
    '(1) Baraita, Gittin daf 61a.',
  ]],
  ['siman253','seif-006',[
    'Following the resolution of Rav Papa there and the interpretation of Rif there; and Rambam in chapter 9 of Laws of Gifts to the Poor ruled according to both resolutions, as also appears to be the view of Rif and Rosh who wrote both those resolutions.',
    '(1) And he concluded there: even if he had much more than two hundred zuz; see above siman 246, seif 21, which states that a gift applies specifically to a small item.',
  ]],
  ['siman256','seif-002',[
    'From the mishnah at the end of Pe\'ah.',
    '(1) Beit Yosef wrote this above in siman 249, seif 7; I cited it there.',
  ]],
  ['siman258','seif-006',[
    'There in the Tosefta.',
    '(1) Taz wrote: the holy communities have already adopted the practice of appointing guardians for orphans and overseeing the affairs of trustees — and in this matter too they should oversee and ensure that money is not left in the hands of any one of them.',
  ]],
  ['siman259','seif-002',[
    'Rambam\'s language in chapter 8 of Laws of Gifts to the Poor, from the Gemara\'s resolution there regarding Rabbi Yannai\'s case — \'who borrows and repays,\' 72b.',
    '(1) This too is from there, from the Gemara there.',
  ]],
  ['siman263','seif-001',[
    'Statement of Abaye and baraita of Rav Natan, Shabbat daf 134a.',
    'The Tur\'s language; and so wrote Rambam at the end of chapter 1 of Laws of Circumcision.',
  ]],
  ['siman265','seif-011',[
    'Beit Yosef, following the view of the Geonim, Rif, and Rambam; and so wrote in Orach Chaim siman 559.',
    '(1) When she does not need to eat; see Orach Chaim siman 554 and 559.',
  ]],
  ['siman267','seif-034',[
    'This is evident in many places in the Talmud.',
    '(1) Meaning: \'you shall not rule over him ruthlessly\' was said only regarding a Hebrew slave.',
  ]],
  ['siman272','seif-002',[
    'Rambam\'s language at the beginning of chapter 9 of Laws of Torah Scrolls, from Rabbi\'s responsum in the baraita there; and Rashi explained there: medium-sized script.',
    '(1) Meaning: at the end of the book, since the scroll was wound from its end to its beginning.',
  ]],
  ['siman274','seif-007',[
    'Haggahot Maimoniyot, chapter 10, in the name of Masekhet Soferim; and in the responsa attributed to Ramban, who gave the reason that we have only the tradition as it was given at Sinai. Rabbenu Yeruham.',
    'Rivash in his responsa; and so wrote Rashba.',
  ]],
  ['siman282','seif-012',[
    'Rambam\'s language there, from the baraita there and the statement of Rava beginning \'I thought, etc.\' — there.',
    'This is the teivuta mentioned in the Gemara — or alternatively, it is the kamterei d\'sifra, explained as the chest in which the Torah scroll is stored. The migdal is the table on the bimah on which the cantor places the Torah when reading from it — Biblical usage appears in Ezra \'and he stood upon a wooden tower.\' The kise is the armchair mentioned in the Gemara, since in some places they prepare a chair upon which to place the Torah scroll on the day when two Torah scrolls are brought out. There — we require both that it was designated for this purpose and that [the Torah] was placed upon it, following Rav Chisda, Sanhedrin daf 48a [and Rava who settled the halacha accordingly, there 48b].',
  ]],
  ['siman288','seif-015',[
    'A query that was resolved, and the statement of Rabbah bar bar Chanah etc. — there, daf 31b.',
    '(1) Meaning: like a tent wide at the bottom and narrow at the top — that is, one, two, three; and like a tail: three, two, one.',
  ]],
  ['siman289','seif-005',[
    'Statement of Rav Zeira in the name of Rav Mattana, etc. — there, daf 33a, as explained there at the beginning of 33b.',
    '(1) And if the doorway is very high, he should not place it above his shoulders, as it would not be visible there — Mordechai.',
  ]],
  ['siman292','seif-004',[
    'Statement of Rav Yehuda there, daf 141b. Following Rabbi Yehuda there.',
    'There, daf 139b, according to Rashi\'s interpretation of the statement of Rav Yehuda. From the incident that came before Rav Yehuda there — and it is stated there that Rav Yehuda flogged him, explained there as rabbinic disciplinary lashes.',
  ]],
  ['siman292','seif-012',[
    'Baraita there.',
    'So it is implied there in the Gemara; and so wrote the Rosh and Ran.',
  ]],
  ['siman294','seif-024',[
    'Statement of Rabbi Ami in the name of Rabbi Yochanan, Kiddushin daf 39a.',
    '(1) So wrote Tosafot there and other later authorities.',
  ]],
  ['siman295','seif-003',[
    'This too is there; and so wrote the Rosh in the Laws of Kilayim from the Jerusalem Talmud, chapter 1: \'a person may take a coin from the nipple of an apple etc.\' — explained in Kesef Mishneh as meaning seeds — one type of seed and one tree seed; but two types of seed even without a tree are forbidden in the Land of Israel as kilei zera\'im, and so it is in the Tosefta, chapter 1. The Tur\'s language, from the mishnah above.',
    'There in the mishnah; see Shimon of Sens for what he raised from Ravina\'s query in Chullin daf 60a. There, from the Jerusalem Talmud there, following the first textual version that Shimon of Sens cited in his commentary on the mishnah.',
  ]],
  ['siman296','seif-001',[
    '(1) From seif 1 through seif 19 is the language of Rambam in chapter 5 of Laws of Kilayim.',
    'The Gemara\'s conclusion in Berakhot daf 22a and in many places — that we rule like Rabbi Yoshiya, who holds one is not flogged until he sows, etc.',
  ]],
  ['siman296','seif-005',[
    'Menachot daf 15b.',
    '(1) Kesef Mishneh explained there: meaning they do not produce [grapes worth prohibiting] until three years, as the mishnah states in chapter 2 of Kilayim, mishnah 5 — just as the fruit of the vineyard is not forbidden until three years. Ran wrote: because they grow abundantly, there is intermingling and they form clusters like real vines, forbidden as kilei hakerem. And this excludes other seeds that are not edible — but grain, legumes, and vegetables are forbidden by Torah law.',
  ]],
  ['siman296','seif-019',[
    'Mishnah 7, chapter 7 of Kilayim.',
    '(1) Meaning: he shall cut — from the expression \'hew down the tree.\'',
  ]],
  ['siman296','seif-031',[
    'This too is there, from the mishnah.',
    '(1) Meaning: they are not edible — as written above in seif 2, that edible seeds are forbidden by rabbinic decree; Menachot daf 15b.',
  ]],
  ['siman296','seif-039',[
    'Mishnah 6, chapter 5 [of Kilayim].',
    '(1) And Rambam wrote, based on the Jerusalem Talmud, that we estimate: if the shoot would dry such that no moisture remains in it over 100 hours — if it was in the ground from the time it reached it for half an hour, then it has added growth of 1/200 to prohibit. Raavad wrote: in half an hour one can determine this — one uproots as many stalks as he wishes and weighs them at the time of uprooting, then weighs them again after half an hour; if they were two ounces and have now diminished by one ounce, then in half an hour the plantings added one ounce.',
  ]],
  ['siman296','seif-042',[
    '(1) From here through the end of seif 30 is the language of Rambam at the beginning of chapter 6 of Laws of Kilayim.',
    'From mishnah 5, chapter 5 of Kilayim.',
  ]],
  ['siman296','seif-053',[
    'There, mishnah 2, chapter 7 — following Rabbi Elazar ben Tzadok; and explained: he bent down the vines and covered none of the main stem, as the manner of bending, etc.',
    '(1) The reason is that he insists on the three [vines] to constitute a vineyard, but not the two.',
  ]],
  ['siman296','seif-059',[
    'There, mishnah 9 [of chapter 5].',
    '(1) And from here through the end of seif 55 is the language of Rambam in chapter 7.',
  ]],
  ['siman296','seif-069',[
    'Mishnah 7, chapter 4 [of Kilayim].',
    '(1) Meaning: not 16 cubits as with a public road, but rather a public footpath — as Raavad wrote there and as the master himself stated at the end of the seif.',
  ]],
  ['siman297','seif-010',[
    'From the Jerusalem Talmud, beginning of Kilayim, regarding grafted species.',
    '(1) Not specifically — but even if one desires its survival for animal fodder, as explained above in the Laws of Kilei HaKerem, seif 14.',
  ]],
  ['siman299','seif-002',[
    'From the Jerusalem Talmud there.',
    '(1) Meaning: because they are not threads, they are not significant and are nullified; and so wrote Semag in the name of the Tosefta, as below.',
  ]],
  ['siman300','seif-004',[
    'Rambam\'s language there, according to his interpretation of the mishnah cited there from the Tosefta. Tur wrote that Rabbeinu Tam said the Tosefta was taught in error; Rosh explained it speaks of joining two frayed ends and wrapping the thread around and tying them together — which is not a connection since one can remove the two frayed ends without untying the knot. And it seems clear to me that this is also Rambam\'s intention.',
    '(1) Beit Yosef wrote that this is not Rambam\'s view; see the end of seif 5 and the end of this siman.',
  ]],
  ['siman300','seif-007',[
    'Tur, from his father the Rosh\'s commentary on the Tosefta in the Laws of Kilayim.',
    '(1) And Beit Yosef wrote: Rambam omitted this Jerusalem Talmud, apparently because he interpreted it according to the latter interpretation of Rashba and Rabbi Yose there — that kilayim applies only where stitching was done — meaning, two consecutive stitchings — such that there is no novel law in this ruling, etc. Maharshal also wrote regarding this gloss that from Semag it appears to be permitted.',
  ]],
  ['siman301','seif-007',[
    'Beit Yosef explained: a garment made of felted wool; and according to Rambam that felted wool is forbidden by Torah law — which I cited above in seif 1 — even if they are as stiff as the felt of Narsh, it is forbidden to place them on oneself. According to Tosafot and Rosh who permit even placing them on oneself if they have reached the stiffness of the felt of Narsh — who can determine whether they have reached the stiffness of the felt of Narsh or not? Therefore one should be careful, etc.',
    '(1) Provided that his skin does not touch them, as above in seif 1.',
  ]],
  ['siman305','seif-001',[
    'Rambam\'s language in chapter 11 of Laws of First Fruits.',
    '(1) Meaning: to exclude a daughter of a Kohen or a Levite, as below.',
  ]],
  ['siman305','seif-017',[
    'Rivash wrote: even though Rambam holds that for a mitzvah imposed upon oneself one recites with the lamed prefix, as written above in siman 265, seif 2 — one can say that the principal obligation is upon the father himself, but during his son\'s infancy it is impossible, since we rule that the father takes precedence over his son, as explained below in seif 16.',
    '(1) And the redemption is performed after Birkat HaMotzi — Maharil.',
  ]],
  ['siman318','seif-006',[
    'There in the mishnah, daf 18b.',
    '(1) Tosefot Yom Tov wrote: this teaches us that we do not say \'leave money in its owner\'s presumption\' to say that one animal miscarried and one gave birth to two males. Alternatively, he wished to explain all possible cases, even though they are unnecessary — as in what the mishnah teaches regarding \'a male and a female, he gives one to the Kohen\' which is similarly unnecessary. Tosafot.',
  ]],
  ['siman329','seif-002',[
    'Mishnah 4, chapter 1 of Challah.',
    '(1) Rashi explained: their kneading is very soft — Pesachim daf 37a.',
  ]],
  ['siman330','seif-001',[
    'Mishnah 5, chapter 3 of Challah.',
    '(1) Even in the Land of Israel; and this is unlike terumah, of which it was written in seif 44 that \'your doughs\' is written — excluding the dough of a non-Jew.',
  ]],
  ['siman331','seif-029',[
    '(1) From here through seif 19 is the language of Rambam there in chapter 2.',
    'From the mishnah at the beginning of Maasrot.',
  ]],
  ['siman331','seif-040',[
    '(1) From here through seif 21 is the language of Rambam there in chapter 6 of Laws of Gifts to the Poor.',
    'From the mishnah at the beginning of chapter 1 and chapter 2 of Maaser Sheni.',
  ]],
  ['siman331','seif-043',[
    'Mishnah 3, chapter 4 of Yadayim, following Rabbi Elazar ben Azaryah.',
    '(1) And the sabbatical year would be the year 425 [of the current reckoning]; and as Rambam wrote in chapter 10 of Laws of Shemittah and Yovel — a tradition in the hands of the Geonim passed down from person to person, that since the destruction of the Temple we count only sabbatical years, not Jubilee years; and so it emerges from the Gemara in Avodah Zarah daf 9b. May God grant us to count both sabbatical years and Jubilee years.',
  ]],
  ['siman331','seif-045',[
    '(1) From here through seif 29 is the language of Rambam in chapter 7 of Laws of Terumot.',
    'Mishnah 5, chapter 4 of Terumot, following Rabbi Tarfon and Rabbi Akiva.',
  ]],
  ['siman331','seif-061',[
    '(1) From here through seif 52 is the language of Rambam in chapter 4 of Laws of Terumot.',
    'Kiddushin daf 59a.',
  ]],
  ['siman331','seif-066',[
    'Mishnah 6, chapter 1 of Terumot.',
    '(1) Because he cannot hear the blessing and cannot speak; and similarly a naked person cannot recite the blessing; and a drunk person and a blind person cannot direct their attention to separate from the best.',
  ]],
  ['siman331','seif-075',[
    'Explanation of Rabbi Yosef Korkos: it is not known whether they protest; following Rabbi Yose there in the mishnah.',
    '(1) Kesef Mishneh explains: the Torah\'s prescribed measure of one-fiftieth — and needless to say not according to the measure his fellow previously separated.',
  ]],
  ['siman331','seif-115',[
    'There, chapter 2, mishnah 7.',
    '(1) Meaning: they are designated for pickling in vinegar, and they are poor quality.',
  ]],
  ['siman331','seif-122',[
    '(1) From here through seif 71 is the language of Rambam in chapter 1 of Laws of Tithes.',
    'Clear ruling of the Gemara, Yevamot daf 85b, following the Sages there, daf 86a.',
  ]],
  ['siman331','seif-140',[
    '(1) From here through seif 85 is from the words of Rambam there in chapter 2 of Laws of Tithes.',
    'Mishnah at the beginning of Maasrot.',
  ]],
  ['siman331','seif-142',[
    'Mishnah 6, chapter 5 of Maasrot.',
    '(1) Meaning: from actual wine — and it is needless to say from wine itself upon wine; but not from it upon actual wine, since one may only separate terumah from the superior produce.',
  ]],
  ['siman333','seif-005',[
    'Tosefta at the beginning of the chapter of First Fleece.',
    '(1) Rambam there in chapter 10.',
  ]],
  ['siman333','seif-011',[
    'There in the mishnah.',
    '(1) From the implication of Rema\'s gloss it appears that the Tur\'s words are explained as when the buyer took the fleece after the seller had already shorn it; and this too I do not understand — for when he wrote \'and if he specified, etc., both are exempt,\' why should both be exempt? The robbed property of the Kohen is in the possession of the buyer, who is obligated to give it to the Kohen and deduct from the seller — like the law of one who sold intestines by weight, who gives the gifts to the Kohen and deducts from the price; see above siman 61, seif 32 and what I wrote there. I have not merited access here to his great work Darkhei Moshe.',
  ]],
  ['siman334','seif-009',[
    'Rambam\'s language in chapter 7 of Laws of Torah Study; and so ruled the Tur and the Hagahot there in the name of Rokach, who gave the reason that if they were to include him, where is the force of their curse and what did they accomplish with their enactment? He is not fit for inclusion, etc.',
    '(1) See what I wrote at the end of this siman.',
  ]],
  ['siman334','seif-019',[
    'There and there, in the name of the Jerusalem Talmud.',
    '(1) Meaning: he does not regret and return to say he will not do so again; but it does not mean he is still doing so — see above, seif 13.',
  ]],
  ['siman334','seif-026',[
    'There, from Raavad\'s words (belonging to seif 2). Beit Yosef wrote in Bedek HaBayit in the name of Rashba: if many are excommunicated and a decree was issued not to benefit them, the excommunicated persons themselves are included in the prohibition, and they may not benefit from one another.',
    '(1) Meaning: if the excommunication was on account of an act of insolence.',
  ]],
  ['siman339','seif-004',[
    'And he wrote there that it will not be many days before one of them dies.',
    '(1) Meaning: unlike removing the pillow and cushion, where one moves and shakes the dying person — which may hasten his death.',
  ]],
  ['siman340','seif-023',[
    'Baraita, Mo\'ed Katan daf 22.',
    '(1) Maharshal\'s language regarding tearing: the custom is thus — for a father and mother, from the left; for other relatives such as his sons and his brothers, from the right side; and so I found it.',
  ]],
  ['siman341','seif-005',[
    'There in the baraita.',
    '(1) Jerusalem Talmud — cited by the Rosh there and by Ramban in Torat HaAdam.',
  ]],
  ['siman344','seif-008',[
    'Baraita (in Evel Rabbati; Rosh cited it at the end), Mo\'ed Katan [24b], following Rabbi Yehuda in the name of Rabbi Yishmael.',
    '(1) For that is their joy — they have no money with which to rejoice.',
  ]],
  ['siman345','seif-003',[
    'Rambam\'s language there, from the baraita above.',
    '(1) And he concluded there: because his death serves as atonement, following Rava\'s resolution in Sanhedrin daf 47a that those executed by the government are different; and so wrote Rambam in chapter 1 of Laws of Mourning; see what I wrote in siman 375, seif 5.',
  ]],
  ['siman347','seif-001',[
    'I cited this in Orach Chaim siman 547.',
    '(1) As I corrected it — so it is in Tur, Rosh, and other later authorities.',
  ]],
  ['siman347','seif-002',[
    'This too is there.',
    'The law regarding lamenting with flutes that a non-Jew brought on Shabbat, or a grave dug by a non-Jew — there in siman 325; and whether it is permitted to wait out Shabbat for them — there in siman 306.',
  ]],
  ['siman349','seif-001',[
    'Baraitot and statements, Sanhedrin daf 47b and daf 48a.',
    '(1) Responsum of Rashba, siman 365.',
  ]],
  ['siman349','seif-004',[
    'Arakhin daf 7b; and regarding what Kesef Mishneh questioned about Rambam at the end of Laws of Mourning concerning what he wrote about the law of the hair of the dead — and likewise in Beit Yosef — see the responsa of Rashba, siman 330, where he elaborated on this.',
    '(1) There, from Rav Nachman\'s resolution.',
  ]],
  ['siman351','seif-002',[
    'Following the ruling of Ramban in Torat HaAdam.',
    '(1) In the Tur it says \'they tie [the jaw],\' and he wrote there: at the time they bury him.',
  ]],
  ['siman352','seif-004',[
    'Tur in the name of Ramban, in the name of the universal custom of Israel; and Kol Bo wrote: in order to remove their impurity, so that people will not be repelled by handling them.',
    '(1) See in the Arukh, entry amatz.',
  ]],
  ['siman353','seif-004',[
    'Baraita there, daf 24a, following the first opinion.',
    '(1) Rashi explains: when they return from the cemetery, they pass before the mourner in a row and each one says to him \'may you be comforted\'; and the Birkat Avelim is the blessing said in the public square; and Tanchume Avelim is when people go to his house throughout the seven days to comfort him.',
  ]],
  ['siman353','seif-006',[
    'Rambam\'s language in chapter 12 of Laws of Mourning, from the baraita of Rabban Shimon ben Gamliel there.',
    '(1) Meaning: they feel pain and are grieved — Arukh.',
  ]],
  ['siman355','seif-001',[
    'Mishnah, Mo\'ed Katan daf 27a, following Rabbi Elazar there in the Gemara, daf 28a — the consensus of the authorities.',
    '(1) Shach explained: because it is not honorable for a Torah scholar to accompany a woman; Taz explained it as meaning the general public\'s company, and on account of the woman\'s degradation.',
  ]],
  ['siman357','seif-001',[
    'Mishnah, Sanhedrin daf 46a.',
    '[1] Baraita there, daf 47a.',
  ]],
  ['siman357','seif-002',[
    'Baraita in Evel Rabbati.',
    '[2] [Baraita in Sanhedrin there].',
  ]],
  ['siman361','seif-004',[
    'There, in the name of Rav Natronai; and Ramban wrote that the reasonable rationale is: since there is a row of comforters, Kaddish, and the Blessing of the Mourners — all of which require ten.',
    '(1) Tur in the name of his father the Rosh, there in chapter 2 of Ketubot — since she is not commanded but fulfills what is incumbent upon her.',
  ]],
  ['siman364','seif-001',[
    'The Gemara\'s conclusion, Sanhedrin daf 47b, regarding the incident of Rav\'s burial site.',
    '(1) According to this, it is forbidden to tread upon graves — Hagahot Asheiri.',
  ]],
  ['siman367','seif-001',[
    'Baraita, Gittin daf 61a; and Beit Yosef wrote in explanation of Kol Bo\'s words that one is also obligated to escort a non-Jew if it is for the sake of peaceful relations, or in the case of a pious non-Jew, since we rule that pious non-Jews have a share in the World to Come.',
    '[1] [Tosefta there, end of chapter 3; Jerusalem Talmud, end of chapter 5; and other authorities.]',
  ]],
  ['siman368','seif-003',[
    'There; and Mordechai wrote: either as a penalty, or so that people will not suspect him of bringing [the fodder] to his own animal.',
    '(1) (See above, the beginning of siman 364 in the gloss.)',
  ]],
  ['siman371','seif-006',[
    'From the mishnah at the beginning of chapter 10 of Ohalot; and Beit Yosef wrote that the Tur wrote this law and those following it, bringing all other laws from Tractate Ohalot — because it is a novelty that it is permitted to enter a house where the dead body is inside but forbidden to enter the upper story.',
    '(1) Meaning: then it does not return and descend.',
  ]],
  ['siman374','seif-005',[
    'See in the Tur what is considered fully sufficient for his needs.',
    '(1) Because they are not fixed on a route but rather mobile.',
  ]],
  ['siman375','seif-010',[
    'Rambam\'s language in chapter 1 of Laws of Mourning, from the baraita of Evel Rabbati; and Mordechai in Mo\'ed Katan wrote that the Jerusalem Talmud concludes \'provided he is not a thief\' — and therefore one does not mourn for a thief; and I saw that Bach wrote about this, but I have not seen anyone follow this practice, and the matter requires further study.',
    '(1) Meaning: there, because it is an uncommon matter that every thief is as a murderer and an idolater, etc., and a Shabbat violator. Ramban in Torat HaAdam explained: because they flee and come to mortal danger, and sometimes reach the point of violating Shabbat and practicing idolatry.',
  ]],
  ['siman384','seif-004',[
    'Tur in the name of Rabbi Yitzchak ibn Giat.',
    '(1) This is where this gloss should be placed; and so it is explicit in the baraita there in the incident of Rabbi Yose etc.; and so it is clearly implied in Asheiri.',
  ]],
  ['siman396','seif-003',[
    'This too is there, in the name of his father the Rosh in his rulings at the end of Mo\'ed Katan — and for the reason he stated there: one must distinguish between a case where the person is obligated and the day merely postpones mourning, and a minor for whom, at the time he was supposed to mourn, he was exempted due to being a minor — the obligation of mourning is thus entirely removed from him, etc. And he further wrote to distinguish between a case where the person can undo his own postponement, which is not so for a minor who cannot undo his postponement, etc. And based on these reasons, in my opinion, there is no contradiction to what Beit Yosef ruled above in siman 341, that he performs Havdalah after the deceased is buried; and the matter is easy to understand.',
    '(1) And the law of tearing for a minor — see siman 340, seif 27.',
  ]],
  ['siman399','seif-006',[
    'There, in the name of Ramban in Torat HaAdam — from what the Gemara says: \'the query was about the counting of thirty that he observed, etc.\' — there, daf 19b.',
    '(1) See Orach Chaim siman 532 in the gloss, that there are those who are stringent; and so is the practice.',
  ]],
  ['siman399','seif-012',[
    'Baraita there, daf 20a.',
    '(1) Meaning: they visit him throughout all the days of his mourning; and this is from the Jerusalem Talmud.',
  ]],
];

let ok=0, skip=0, fail=0;
for (const [siman, seif, segs] of TRANS) {
  const enPath = loc(siman, seif);
  const hePath = enPath.replace('en.html','he.html');
  if (!fs.existsSync(hePath)) { console.log('NO HE:', siman, seif); fail++; continue; }
  const he = fs.readFileSync(hePath,'utf8').replace(/^﻿/,'').trim();
  const heSegs = brSegs(he);
  if (heSegs !== segs.length) {
    console.log('SEG MISMATCH', siman, seif, 'he='+heSegs, 'trans='+segs.length);
    skip++; continue;
  }
  const newEn = en(segs);
  if (DRY) { console.log('DRY OK', siman, seif, segs.length+'segs'); ok++; continue; }
  try { fs.writeFileSync(enPath, newEn, 'utf8'); ok++; }
  catch(e) { console.log('WRITE FAIL', siman, seif, e.message); fail++; }
}
console.log(`\nDone: ${ok} written, ${skip} skipped (seg mismatch), ${fail} failed.`);
