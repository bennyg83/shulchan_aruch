#!/usr/bin/env node
/** worker slot 3 — siman 413 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_413/mechaber/part-001.txt": {
    "1:main":
      "Laws of one who makes an eruv for many. Contains 1 seif. One who makes an eruv for many from his own food says: \"This eruv is for all the townspeople\" — provided it contains food for two meals for each person, and whoever wishes may rely on it. He must transfer ownership to them through another suitable person, as with eruv of courtyards (and see above siman 366 seif 10). He must inform them. Whoever he informed before Shabbat — even if that person did not resolve in his mind to rely on it while it was still day but only after nightfall — it is a valid eruv. But if he did not inform him before Shabbat, he cannot rely on it after nightfall. Similarly, one who placed an eruv for all the Shabbatot of the year and said \"whichever one I choose I will go and rely on it\" — even if he did not resolve in his mind until the next day, he may rely on it. Similarly, one who heard that a scholar was coming and did not know from which direction, and placed two eruvs and said \"whichever direction the scholar comes from, that eruv shall take effect for me\" — the eruv in the direction the scholar came from takes effect for him. Or if he said \"if he does not come at all I will be like the townspeople,\" or \"if two scholars come I will go wherever I wish\" — everything follows his condition. Similarly, if he said to two or three people \"I hereby make an eruv for whichever of you I choose\" — even if he did not specify whom he chose until nightfall, it is a valid eruv.",
  },
  "output/siman_413/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) For many from his own — says, etc. — and also when each gives separately: when one places on behalf of all, he must say at the time of placement that he is placing it for the sake of eruv for all the townspeople, as above in siman 399 seif 8 in Mishna Berurah — except that when one gives eruv from his own for everyone, he must transfer ownership initially through another on their behalf before he places it.",
    "1:ב":
      "(2) Food for two meals — and even with turnips for food of two meals suffices, as above in siman 399 seif 7.",
    "1:ג":
      "(3) For each one — and this is not comparable to eruv of courtyards where food for two meals for all suffices, for there the eruv is because one forbids to his fellow and thereby they are as joined — not so in eruv techumin where one person is not relevant to another and each person when he wants to walk outside his two thousand must acquire shevitah for himself — therefore food for two meals for each person is required.",
    "1:ד":
      "(4) And see above siman 366 — where it is explained who is suitable to transfer ownership through him. And regarding who is suitable to be made an agent for placing the eruv, it is explained in siman 399 seif 8.",
    "1:ה":
      "(5) And he must inform them — because thereby the other side does not lose his techum and perhaps it is not acceptable to him.",
    "1:ו":
      "(6) Before Shabbat — and even bein hashemashot suffices b'dieved — so too Peri Megadim, and see Biur Halacha.",
    "1:ז":
      "(7) Even if he did not resolve in his heart, etc. — for we say the matter was clarified that before the time of eruv acquisition his mind was to this since he knew initially — not so when he was not informed before Shabbat where we cannot say it was clarified since he did not know at all while it was still day.",
    "1:ח":
      "(8) He may rely on it — and this too is because we say the matter was clarified that before bein hashemashot his mind was to this. And all this is according to what we hold that regarding a d'rabbanan matter there is berirah (retroactive clarification). And it is obvious that all this is if at night he did not go from his home toward the other side.",
    "1:ט":
      "(9) The direction the scholar came from — he acquired — and needless to say if the scholar had already come before bein hashemashot from that direction, but he did not know where he came until tomorrow when he heard for certain — he acquired for that direction, for it is a revelation of a matter in the world — the matter is now revealed that that eruv acquired. But even if the scholar was far from there at bein hashemashot within the techum [of the end of his four thousand cubits], and therefore it is possible the scholar had not yet resolved in his mind at all to come within his four thousand cubits [for perhaps then he intended not to move at all from his place and thereby this one's eruv would not acquire] — nevertheless we say his condition is effective because of berirah, for we say it was clarified retroactively that from yesterday he was standing for this toward that side the scholar came from [Gemara].",
    "1:י":
      "(10) It is a valid eruv — for we say since he wants now, presumably at bein hashemashot which is the time of eruv acquisition his mind was also to this.",
  },
  "output/siman_413/beur-hagra/part-001.txt": {
    "1:א":
      "Seif 1: \"And similarly one who... and similarly... even though...\" — as written in chapter 5 of Eruvin 38a: Mar Zutra expounded, etc.; and so ruled Rif, Rambam, and Raosh there; and as written above in siman 397 seif 10 and in Yoreh Deah siman 331 seif 1. See Tosafot Yoma 56a s.v. divrei, etc., who agreed with the second view there; and answer that that case is not like what is written in Gittin 25b s.v. divrei, etc.; and so too in Yesh Shu\"sh, whose words in summary are: the general rule is that there is no berirah in d'oraisa matters, whether leniently or stringently, even b'dieved, even when he clarifies his words and conditions explicitly, whether relying on his own mind or on others' minds — and even from d'rabbanan matters if a Torah verse is principal upon it, like the vegetable act in chapter 3 of Eruvin, as Tosafot wrote. (2) Where one conditions on a matter standing to be clarified with certainty, there is berirah even in a matter not in his hand, like \"if I die.\" (3) In d'rabbanan matters there is always berirah in all matters. (4) Regarding vows and bor (pit), there is berirah per Rashba's explanation for Rif — because per Rif it is because concession is permitted in bor, the halakha follows those who say since he placed it, he uses. But all poskim wrote that this is like those who say when he delivers — and it is Rashba's explanation; and there is a difference also regarding etrog in partnership, as written. (5) Tosafot in the name of R' Yitzchak wrote that even in d'oraisa there is berirah, as written in Nedarim 46b, \"R' Elazar said,\" etc.; and in Bava Kamma 51 we say they disagree regarding berirah; and so in Temurah 30a it challenges: the unattributed Gemara should resolve one, etc. — meaning according to those who say there is berirah, as written in Bekhorot 57, \"let us establish,\" etc.; \"and similarly partners,\" etc.; and in Bava Batra 107a, \"and the halakha,\" etc.; see Rashbam there s.v. yorshin, etc., and s.v. vehalakhta, etc., and Tosafot s.v. vehalakhta, etc., and as written in Bekhorot 57; and R' Yitzchak followed his reasoning, for R' Elazar, etc.; and what is decided in Yoma there like R' Oshaya — that is where he disagrees with R' Yochanan who holds in d'rabbanan there is no berirah. But R' Tam disagrees with him and rules like Rif's words above, and he refuted his proofs and brought proof from Rava and R' Nachman who said in Kiddushin 43b: \"brothers who divided,\" etc. — apparently they hold like R' Yochanan; and in Bava Batra 65a they followed their reasoning, etc.; and so too R' Nachman and R' Yitzchak hold in Bekhorot 56b, as written in chapter 5 of Eruvin 39b; and that which is decided in Nedarim like Rabbeinu Avraham ben David is not for his reason but because the mishnah follows R' Elazar who said concession is forbidden, as written 46b, and we hold not like R' Elazar; and so too R' Chananel — but all poskim disagree with him and rule like R' Elazar, the mishnah there and there follows him; see Ran there s.v. ule'inyan halakhah, etc. And Rashba in the name of R' Yitzchak Meili explained that what R' Elazar said \"concession is forbidden\" is from d'rabbanan; but in the name of Rashba the Frenchman another explanation is written, and so too Ran and Raosh in his name — that this berirah of Nedarim and that of Bava Kamma 51 in bor is not general berirah, etc.; see there in Raosh; and if so we hold like Rif's ruling, and so too most poskim; see Tosafot in Nedarim there s.v. amar R' Huna, and in Gittin 48a s.v. im, etc., and Raosh in Nedarim there and in Bava Batra end of chapter 7; see Tosafot Gittin 26b s.v. divrei, etc., that if one conditions explicitly there is berirah even in d'oraisa; and with this is resolved what we hold in gift \"from today if I die,\" etc., even though it is berirah, as written in Gittin 26b: we learned \"what,\" etc., and as written in Even HaEzer siman 145 seif 2, \"and when he dies,\" etc.; and so there \"behold I am your betrother,\" etc., and as written there in Shulchan Aruch siman 38 seif 8; and further Tosafot wrote there s.v. R' Yehuda, etc., that in a matter standing to be clarified with certainty there is berirah likewise even in d'oraisa; and so Tosafot wrote in several places in Eruvin 37a s.v. bor hamaschil divrei, etc., and s.v. R' Yitzchak, etc., and in Yoma there s.v. divrei, etc. — except that it is difficult from what is written in Gittin 24 in the mishnah \"more than this,\" etc., and in the Gemara there 25a \"he asked him,\" etc. — \"you taught it\" — and Tosafot answered there that there is different because it is written \"for her name,\" as written in the Gemara there, \"and it requires,\" etc. \"for if,\" etc. And we who hold that there is berirah in explicit gift need to distinguish thus; see Tosafot there 24b s.v. le'eizo, etc., and Bava Kamma 69b s.v. ela, etc.; and Rashal in chapter 5 of Bava Kamma there challenged Tosafot on this — for if so, what does the Gemara challenge there 25a, \"establish for him one who says,\" etc. — perhaps a get is different. And answer: the sugya there is like the conclusion that the distinctions are required and there is no difference; and further he challenged: why is \"and it requires,\" etc. needed there — but there he sold, etc., and explanation: this is what it means — \"and it requires,\" etc., \"for her name,\" and R' Yitzchak holds there is no berirah, but there \"he sold,\" etc., specifically with money, but without money even in gift he does not retract like R' Meir — it teaches us like the Sages; but in Rif's words it must be like Tosafot who explained there like Ze'eiri, and so Raosh, Rambam, and Perishah — see there the reason. And perforce it must be said that there is berirah, as R' Yitzchak Eiger wrote, etc., and they followed, etc.; and it is strained in this in Yesh Shu\"sh there — specifically to disqualify from kehunah, but a get is not at all, and if another betrothed her, a get is not needed at all. And it is not resolved — nevertheless we say there explicitly that they disagree regarding berirah; and it must be said like Rashi and s.v. chutz, etc., stringently, etc.; and so Ran, Rambam, and Shulchan Aruch siman 131 seif 4 — and this is as written, \"and if we teach field,\" etc. — except that it is difficult: behold we hold in several places that even leniently there is no berirah, as written in Bekhorot 56b and R' Yitzchak Eiger even, etc.; and so Rambam there like R' Yochanan; and so in chapter 7 of Bava Batra we hold the dispute is void per R' Tam's explanation because of berirah as above; and so \"brothers who divided,\" etc.; and so we hold as written in Choshen Mishpat there and there — but per Tosafot's explanation above it is resolved: specifically here we say stringently there is berirah because here one conditions explicitly there is berirah, except because it is written \"for her name\" — and this is what it means \"and if we teach field,\" etc. — behold R' Yitzchak also says leniently in Bekhorot as above. And per Rashba's explanation, berirah of Nedarim, etc. — what does it challenge in chapter 5 of Eruvin 39b, \"and R' Nachman holds,\" etc. — answer: specifically Rabbeinu Avraham ben David distinguishes thus, but for the Sages there is no distinction and the mishnah there perforce follows the Sages, as Tosafot wrote in Nedarim 46a in the name of Rashi and Ran there 46:5, \"and not,\" etc.; see in Shulchan Aruch there siman 224. The general rule emerging: in d'rabbanan there is berirah; in d'oraisa there is no berirah — and in all this there is no distinction between lenient and stringent; and in what one conditions explicitly or what stands to be clarified with certainty, there is berirah even in d'oraisa even leniently — except: two women, no berirah stringently; and in vows and bor there is berirah. And Rambam's words there siman 224 require study — Ran already challenged there and Perishah. And it is possible he holds like Tosafot's first answer there — but per Rashba's explanation above it requires study; and further in several places Rambam's words are wondrous regarding this matter — and Yesh Shu\"sh already challenged there.",
    "1:ב":
      "\"And similarly one who heard,\" etc., \"and similarly,\" etc., \"even though,\" etc. — there; and as above.",
  },
  "output/siman_413/biur-halacha/part-001.txt": {
    "1:א":
      "One who makes an eruv for many, etc. — see Peri Megadim who wrote that when collecting for eruv techumin one need not place them in one vessel. And it is wondrous, for from Rambam chapter 6 of Laws of Eruvin the opposite is clear.",
    "1:ב":
      "For each one — and it is obvious that even if there is not food for two meals for all the townspeople but only for some of them, he may also make eruv — provided he says that he is placing it for eruv on behalf of all who wish from the townspeople to rely on it; for then certainly it suffices that the measure be only per the count of people who will walk by virtue of the eruv. And see below.",
    "1:ג":
      "And he must inform them — and if he informed all the townspeople and all agreed to rely on this, but there was not a measure of food for two meals for each one — there is room to study whether even some of them may walk, since he transferred ownership through another for all of them, they all have a share in the eruv less than the required measure and it is ineffective; or shall we say that what he informed all the townspeople was not his intent except that whoever wishes to rely on his eruv may rely, and so too the transfer was also with this intent — and it turns out that when some people walk with him tomorrow by virtue of the eruv we say it was clarified retroactively that for these people was the intent — requires further study.",
    "1:ד":
      "And whoever he informed before Shabbat, etc. — behold, according to what is explained in this siman it appears straightforward that when a guest comes on erev Shabbat before nightfall to one who dwells in a settlement, and that homeowner placed an eruv so that tomorrow he may walk to pray in a place where there is a minyan at the end of his four thousand amot — the guest may not walk tomorrow with him by virtue of the eruv even if there is a measure of food for two meals also for him, unless he transferred ownership to him before Shabbat through a suitable person so that he have a share in the eruv the homeowner placed before his arrival; and the guest must say regarding this eruv placed there: \"it shall be permitted for me tomorrow to walk two thousand in every direction from it and beyond\" [and this is effective even though he was not present at the place of eruv placement, and it is proved from what Peri Megadim wrote in siman 399 that if the agent placed the eruv and said nothing at all, and the homeowner said in his house regarding this eruv placed there: \"I shall be permitted tomorrow to walk\" — it is effective on erev Shabbat]; and unfortunately many stumble in this — namely, if one of the settlement residents places an eruv, several people walk by virtue of it even though he did not transfer ownership on their behalf and did not make eruv for them; for according to law one must specify the people for whom he makes eruv, as is found in Rambam chapter 6 at its end, whose words are: if one makes eruv through many, he says: \"with this eruv it shall be permitted for so-and-so and so-and-so, or for the people of such-and-such place, or for the people of this city, to walk from such-and-such place two thousand amot in every direction\" — end of his words; and Shulchan Aruch copied this at the end of siman 399. However, if he knew at the time he placed the eruv that today a certain guest would come to him for Shabbat, he may transfer ownership through another also on his behalf and specify at the time of placement that with this eruv it shall be permitted for him and also for guest so-and-so to walk from it and beyond two thousand amot, and inform him when he arrives that he placed eruv also on his behalf. And if he places the eruv on behalf of all the settlement residents around him, he transfers ownership to all of them through another, and at the time of eruv placement he also says: \"with this eruv it shall be permitted for me and also for all the settlement residents around me to walk,\" etc. — provided there be food for two meals for each one, and he informs them before Shabbat that he placed eruv on their behalf.",
    "1:ה":
      "Before Shabbat — see Mishna Berurah in the name of Peri Megadim. And it is obvious that this is only the first view in siman 399 seif 3; but according to what is written there in section 4 that there are disputants who hold that even b'dieved it is not a valid eruv — automatically in our matter before Shabbat is for rejection; so is proved in Ritva — see there; and so is proved from the mishnah that states the reason is because one does not make eruv after nightfall — and if so, if we were to hold that at bein hashemashot too one does not make eruv, automatically regarding this too bein hashemashot would not help.",
    "1:ו":
      "For all the Shabbatot of the year and he said whichever of them, etc. — and it is obvious that if he did not condition on whichever of them he wishes, he may walk only toward his eruv unless he annulled the eruv before Shabbat.",
    "1:ז":
      "That I wish I will go, etc. — meaning that on a Shabbat when he does not wish, he shall be like the people of his city and the eruv shall not acquire for him to cause him to lose the two thousand amot in the west [Rashi].",
  },
  "output/siman_413/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin daf 82.",
    "1:ב": "In the Gemara, ibid.",
    "1:ג": "In the Gemara, chapter \"keRav ukeRav Nachman,\" ibid.",
    "1:ד":
      "Mishnah there chapter 1, as Rav Ashi explains there: \"he informed\" and \"he did not inform\" is the mishnah teaches.",
    "1:ה": "Baraita 37, and like one who is lenient regarding eruv.",
    "1:ו": "Mishnah there 37.",
    "1:ז": "Baraita there 37.",
  },
  "output/siman_413/turei-zahav/part-001.txt": {
    "1:א":
      "For each one. Above in siman 365 he wrote the laws of eruv of courtyards and wrote there that eighteen dried figs suffice even for many; but here we require for each and every one. It appears that in courtyards the prohibition is because one forbids to his fellow — therefore it suffices that there be among all of them eighteen dried figs, for thereby they are joined and become as one — not so in eruv techumin where the prohibition is not because one forbids to his fellow but that each has a boundary of two thousand amot and no more, and through eruv he becomes as one who dwells there — therefore each one must permit for himself more than his boundary, and there is no benefit from one to his fellow to join domains as above. Obvious; and in Levush he troubled himself to divide in a strained matter without need.",
    "1:ב":
      "And whoever wishes may rely. The reason in the Gemara is that in d'rabbanan matters we hold there is berirah.",
  },
  "output/siman_413/magen-avraham/part-001.txt": {
    "1:א":
      "For each one. Explanation: even though in eruv of courtyards food for two meals for all of them suffices, but in eruv techumin each one requires food for two meals per the number of walkers — and so is straightforward in the Gemara and poskim in Tosafot chapter 82, and so too Raavad.",
    "1:ב": "It is a valid eruv. For in d'rabbanan matters there is berirah.",
  },
  "output/siman_413/baer-heitev/part-001.txt": {
    "1:_":
      "For each. Above in siman 368 seif 3 he wrote the laws of eruv of courtyards and wrote there that eighteen dried figs suffice even for many; but here he requires for each one. It appears that in courtyards the prohibition is because one forbids to his fellow — therefore it suffices that there be among all of them eighteen dried figs, for thereby they are joined and become as one — not so in eruv techumin where the prohibition is not because one forbids to his fellow but that each has a boundary of two thousand amot and no more, and through eruv he becomes as one who dwells there — therefore each one must permit for himself more than his boundary. Taz — see there.",
  },
  "output/siman_413/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) For each one — explanation: even though in eruv of courtyards, etc.; and the reason for the distinction — see Magen Avraham in Taz.",
  },
  "output/siman_413/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] It appears to me that this is the reason, etc. — difficult from Tosafot Shabbat daf 34 who wrote the reason they were lenient in eruv techumin is that it does not require bread because one makes eruv only for a mitzvah matter — behold the reasoning is the opposite and requires study. And behold Taz wrote another reason: eruv of courtyards is different because the prohibition is because one forbids to his fellow — therefore eighteen dried figs suffice, for thereby they are joined and become as one — not so in eruv techumin where there is no benefit from one to his fellow, for there is no prohibition because one forbids to his fellow — until here. And it is not so, for Mordechai wrote in chapter \"BeKhol Ma'arivin\": and that a doubtful eruv is valid even where there is no way to establish presumption — that is in eruv of courtyards where they are more lenient than eruv techumin, for in courtyards food for two meals for all suffices, but eruv techumin requires for each and every one — until here. And per Taz's explanation it does not depend at all on leniency and stringency that eruv techumin requires food for two meals for each one; and in my humble opinion the reason eruv techumin is different is that they relied on a verse, as he wrote in siman 261 seif 1 and siman 399 seif 2 — therefore they did not lenient so much that two meals for all would suffice.",
  },
  "output/siman_413/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who makes an eruv for many from his own — says, etc. — and the same is true when he makes eruv from theirs: he must say \"behold this eruv,\" etc., and bless, and afterward say as written below in siman 399 seif 4 — see there.",
  },
  "output/siman_413/peri-megadim/part-001.txt": {
    "1:_":
      "For each one — Taz and Levush: for a mitzvah matter they were lenient; and siman 399 — meaning eruv techumin they did not wish to lenient regarding domain where there is no prohibition so much — therefore they did not lenient also until there be two meals for each one. And in Beer HaGolah he wrote that eruv techumin they relied on a verse — they were stringent more — see there.",
  },
  "output/siman_413/chokhmat-shlomo/part-001.txt": {
    "1:_":
      "Seif 1: One who makes an eruv for many from his own, etc. N.B. Behold the view of Tosafot in chapter 5 of Pesachim in the mishnah of one who says to his slave: that which in d'oraisa there is no berirah exists only from d'rabbanan; and behold according to his words Rambam's approach comes out well — that which everyone wondered about him, that he ruled acquisition of produce is not like acquisition of the body itself, and ruled that brothers who divided are purchasers — if so you do not find that he brings bikkurim, etc. And behold Sha'agat Aryeh in Laws of Chametz answered that it is from the power that we hold we are not concerned for \"it appears as if he retracted\" on erev Shabbat; and Machatzit HaShekel wondered about him at the beginning of Laws of Pesach: what relevance does \"itual as if he retracted\" between man and fellow and between man and God have on erev Shabbat — and apparently he spoke well, until it was wondrous to me that the Gaon author of Sha'agat Aryeh would say so; but according to Tosafot's words it comes out well, for before Him, blessed be He, certainly it does not appear as if he retracted since from the Torah there is berirah and brothers who divided need not return — and he may properly say on the land that You gave me; but before people it appears as if he retracted since according to us from d'rabbanan they are obligated to return — and if so, again before people Sha'agat Aryeh properly wrote that for \"appears as if he retracted\" we are not concerned — see there and requires study. And there is proof from the above Rambam for Tosafot's view — it requires study. And see what I wrote on the above Tosafot in my composition Orach Chayim, edition 5599, on the sugya Yoma daf 10: \"all the chambers did not have mezuzot\" on erev Shabbat. And behold I was asked by another man from the holy community of Krakow about what Ran wrote in the name of Ramban in chapter 3 of Gittin that - that berirah is not considered except if one conditions on two matters, like \"if a scholar comes,\" etc., \"and if not, my eruv to the west\" — but in gift on one matter, like \"if not, there shall be nothing,\" it is not considered berirah; and on this he challenged: behold also in gift on two matters, behold an eruv alone is not enough — every matter requires eruv by itself — and if so, in the end on every side it is gift only on another matter — therefore his question. And behold this is for one reason: we follow after the time, and behold whether the beginning of the day acquires eruv or the end of the day acquires eruv — in the end one time must be given to him for here and here — and therefore berirah laws apply, since it is possible to say this time will be given to him for here and another time for here — only depending on this one time or that — therefore it falls under berirah law; and this is straightforward and correct — it requires study. And behold this is a great general rule in our hands: in d'oraisa there is no berirah and in d'rabbanan there is berirah; and what is difficult on this from Tosafot's words in Temurah daf 30 s.v. venivrur, and Yoma daf 55 — see in my responsum to the holy community of Wenariv, Kneh Mekomah in Sheyurei Taharah edition 4 in my composition to Hagahot, daf 28 side 2, what I settled there with God's help as a general rule — correct — see there — it requires study. And behold in that which is in Shulchan Aruch \"one who makes an eruv for many from his own,\" etc. N.B. We learn in the Talmud at the beginning of chapter \"Keitzad Mishtatfin\": Rav Yosef said: one makes eruv only for a mitzvah matter — what does it teach us? We learned: for all who will go to a house of mourning or to a house of feasting — one view: a traveler's matter the mishnah teaches — what does it teach us — end of Talmud. And it is hard for me: what does it challenge? Behold one may say that one always makes eruv even not for a mitzvah matter, and what the mishnah teaches \"to a house of mourning,\" etc. — that is because in the mishnah it teaches that he makes eruv for all the townspeople, and R' Elazar concludes afterward \"he informed him\" and \"he did not inform him\" the mishnah teaches, etc. — if so, even one who did not accept upon himself before Shabbat, if in any event he knew, his acceptance helps for eruv by virtue of berirah, for we say revelation of a matter retroactively, as Rashi and poskim wrote; and behold we hold there is no berirah — and perforce it is proved there is berirah; and it is hard for me: behold we hold one does not make a d'rabbanan doubt l'chatchila, and here what we hold that in d'oraisa there is no berirah and in d'rabbanan there is berirah is by virtue of doubt — and in d'oraisa we follow stringently and in d'rabbanan leniently — if so, one may say that therefore we require specifically a mitzvah matter, for thus it is permitted to make a d'rabbanan doubt l'chatchila; but for a discretionary matter one is not permitted to make a d'rabbanan doubt l'chatchila to make eruv for all the townspeople for whoever will be clarified from erev Shabbat; but always, if one makes eruv for one person with certainty in a matter that does not require berirah, it is permitted to make eruv even for a discretionary matter. And what does it challenge \"we learned\" — and Rav Yosef teaches much — and perforce it will be proved from this that what we hold in d'rabbanan there is berirah is not from the law of doubt but from certainty, as Maharshal's view in laws of berirah — and therefore if from certainty one need not distinguish between mitzvah matter and discretionary matter — and therefore it challenges properly \"we learned\"; and for those who hold it is only from doubt — requires further study in this — it requires thorough study.",
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
          if (re.test(en)) {
            risks.push({ file, key, pattern: re.source });
          }
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}

console.log("TOTAL", total);
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
