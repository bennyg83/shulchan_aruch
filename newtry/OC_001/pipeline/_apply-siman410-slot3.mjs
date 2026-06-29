#!/usr/bin/env node
/** worker slot 3 — siman 410 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_410/mechaber/part-001.txt": {
    "1:main":
      "Laws of one who sets out on the road in order to acquire shevitah. Contains 3 seifim. One who intended to establish his shevitah at a place known to him and set out on the road walking toward that place in order to reach it and acquire shevitah there — even if he did not arrive and did not stand there, but his fellow turned him back to sleep, or he himself turned back to sleep at home, or he was delayed — he may walk the next day to the place he intended, and from that place two thousand cubits in each direction. Since he resolved in his mind to establish his shevitah there and set out on the road, he is considered as if he had stood there or placed his eruv there. This applies to a poor person whom we do not trouble to place an eruv, or to one who was far away such as a traveler on the road. But if he was neither poor nor far away — no.",
    "2:main":
      "What we said about one who acquires shevitah at a distant place by setting out on the road — he need not go out and walk into a field; even if he descended from an upper story to go to that place and before he left the courtyard gate his fellow turned him back — he has set out and acquired shevitah. And anyone who acquires shevitah at a distant place need not say \"my shevitah is in such-and-such place\" — once he resolved in his mind and set out on the road even a little he has acquired shevitah there. Needless to say, one who went on foot and stood at the place where he acquires shevitah need not say anything at all — once he resolved in his mind he has acquired.",
    "3:main":
      "Townspeople who sent one of their number to bring their eruv to a known place, and he set out on the road and his fellow turned him back and he did not bring their eruv — they have not acquired shevitah at that place since their eruv was not placed there, and they may only walk two thousand cubits in each direction within their town. But he has acquired shevitah there, since he was traveling and intended to rest there and set out on the road. Therefore he may walk to that place the next day and walk from it two thousand cubits in each direction.",
  },
  "output/siman_410/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) In a known place — meaning that place is specified, such as a tree or fence, as above in the previous siman.",
    "1:ב":
      "(2) And acquire shevitah there — the Mechaber ruled anonymously like Rambam. However many Poskim hold specifically when his departure was not for the sake of placing an eruv but only to go to another place at the end of four thousand cubits from here — this is considered coming on the road, and we say: even though his fellow turned him back to sleep at home, since we are witnesses that he wants to go there, even though he did not say \"my shevitah is in such-and-such place,\" it is as one who said it and he acquires shevitah there at the place where he is accustomed always to acquire shevitah — for he certainly intended to acquire shevitah there so he could go there the next day. But if he went out in order to place an eruv he is not considered as one coming on the road but only as one sitting in his house — eruv is not acquired by his statement alone.",
    "1:ג":
      "(3) Even though he did not arrive — provided it was possible for him to arrive, as in the previous siman.",
    "1:ד":
      "(4) That he himself turned back to sleep — meaning he initially did not intend this, for he went out intending to stay there and acquire shevitah there on foot, and afterward reconsidered to return and sleep at home and go there tomorrow. If he reconsidered completely he certainly uproots retroactively his intention to acquire shevitah there and he is like the townspeople.",
    "1:ה":
      "(5) And set out on the road — for we consider him thereby as one coming on the road, as in the previous siman.",
    "1:ו":
      "(6) In what cases is this said — a poor person, etc. — meaning a poor person who has no food for two meals to place an eruv; to trouble him to go and acquire shevitah on foot they did not want — therefore permitted to say at home \"my shevitah is in such-and-such place,\" and by setting out on the road even a wealthy person may say \"my shevitah is in such-and-such place.\" And all the more so one far away such as one coming on the road, as explained initially: by setting out on the road they were lenient as if he actually came on the road. See Biur Halacha we brought — several Poskim hold even for a poor person they did not leniently permit saying \"my shevitah is in such-and-such place\" while at home unless he already set out on the road; so Chayei Adam ruled.",
    "2:א":
      "(7) Need not say \"my shevitah is in such-and-such place,\" etc. — some disagree: specifically for one who has two houses in two Shabbat techumin — there we say even though his fellow turned him back, nevertheless his mind was to acquire shevitah so he could afterward go there. But otherwise no, for we say he reconsidered not to go there unless he explicitly said \"my shevitah is in such-and-such place\" (Bach and Beit Meir).",
    "2:ב":
      "(8) Once he resolved in his mind — for shevitah.",
    "3:_": "(9) And he acquired shevitah there, etc. — see what we wrote above in sk 2.",
  },
  "output/siman_410/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 22.",
    "1:ב":
      "Rambam ch. 7 Laws of Eruvin; and he wrote likewise that it is agreed from R' Meir and R' Yehudah per the resolution of R' Nachman there.",
    "2:א": "There — the incident of Rav Natan bar Oshaya per Rif's version.",
    "2:ב": "There — baraita, and per R' Yosi, and per Rav Yosef's resolution.",
    "3:_": "Mishnah there, and per R' Yehudah; Rambam ch. 3 Laws of Eruvin.",
  },
  "output/siman_410/beur-hagra/part-001.txt": {
    "1:א": "Seif 1 — one who intended. Mishnah and Gemara there, and as concluded per Rav Yosef and according to R' Yosi; Beit Yosef.",
    "1:ב": "Seif 1 — but his fellow turned him back. There, and there.",
    "1:ג": "Seif 1 — or. Or. In the Gemara there, in the words of R' Yehuda: once he set out.",
    "1:ד":
      "Seif 1 — in what cases is this said — a poor person. There — two versions; and as concluded there we rule like R' Nachman, and he explained \"poor\" literally, not like Rashi and Rashba above.",
    "1:ה": "Seif 1 — or from afar. Version (1).",
    "3:_":
      "Seif 3 — townspeople. He holds that from what is written, such as when he has two, etc. — see.",
  },
  "output/siman_410/biur-halacha/part-001.txt": {
    "1:א":
      "And acquire shevitah there — see Mishna Berurah: many Poskim hold, since we are witnesses, etc. — all this is Rashi's language and the Poskim. What is written there \"accustomed to acquire,\" etc. — so Rashba wrote in his novellae; Ritva also wrote: R' Yosi son of R' Yehuda did not say \"we are witnesses he wants to acquire shevitah\" without speech except for this case specifically — one who left his city and recognized a specified tree or fence in the middle fit to acquire shevitah; but one who does not recognize any specified place in the middle to acquire shevitah and never had in mind a specified place to acquire shevitah — how can he acquire shevitah there — end of his words; similarly Rashba in his novellae.",
    "1:ב":
      "In what cases is this said — a poor person, etc. — see Mishna Berurah and Chayei Adam wrote that even for a poor person one may not be lenient when sitting at home to say \"my shevitah is in such-and-such place\" unless he set out on the road; and for a wealthy person even when he set out on the road one may not be lenient unless he actually came on the road — seemingly wondrous how he counted all this and said the Shulchan Aruch explained thus, for Shulchan Aruch's words flow from Rambam and Rambam holds even at home a poor person may say, as known among Poskim. It appears he wrote this as a deciding ruling, not wanting to rule like Rambam that a poor person may say even at home \"my shevitah is in such-and-such place,\" though Rif may also be explained thus who wrote anonymously that for a poor person they were lenient per plain Gemara language without requiring being on the road; Razah also explains explicitly — see there. Nevertheless most Poskim disagree — R' Chananel (brought by Ritva in his name; in our R' Chananel this is not found), Rashi, Rabbeinu Yonatan in his mishnah commentary, Or Zarua, and he wrote so in name of Rashbam; so Rashba, Ritva, Rabbeinu Yerucham. Per their view, whoever is at home is never considered poor, for a poor person who lacks food for two meals is not common — therefore the rabbis did not divide except on the road. Regarding requiring being poor specifically when setting out on the road, Chayei Adam's stringency seems against all Poskim — Rambam himself does not hold so, as above; all the rishonim listed hold that by setting out on the road even a wealthy person is considered like a poor person because most travelers lack bread — as R' Chananel wrote and as Gemara implies: \"he, since he went on the road, is considered poor.\" Nevertheless Chayei Adam's words are not rejected from practice because the main setting out on the road per many Poskim is specifically when he left not intending to place eruv, as Mishna Berurah wrote, proved from Gemara language about one who had two houses in two techumin — implying specifically when he set out on the road to reach another house he has elsewhere and afterward reconsidered to return and sleep at home — then he may be considered as coming on the road; but if he left to place eruv he is not considered as coming on the road but as sitting at home who must place eruv with bread since bread is available at home — therefore Chayei Adam's view warrants concern per all these great ones, and one may not be lenient in any event but he is like sitting at home who must place eruv with bread; combined with Rambam and Razah above that for a poor person it is permitted even at home — this is correct (and in Sefer Gaon Yaakov he wrote that even per Rambam and Tosafot and Ramban one must leave intending to stay there and afterward go to the second place, not leave to acquire shevitah and return to sleep at home — Shulchan Aruch's language may also be explained thus). However for one actually coming on the road he certainly acquires shevitah by his statement even if he has bread in hand, as we wrote above end of siman 399.",
    "2:א":
      "His fellow turned him back — he has set out, etc. — here he did not mention \"or he himself turned back\" as in the previous seif. Possibly specifically in the version where he actually set out on the road, even if he returned on his own he acquires shevitah; but here where he only descended from the upper story, possibly specifically when his fellow turned him back and not on his own. Ritva wrote regarding setting out on the road specifically when his fellow turned him back and not on his own — there we say he reconsidered. Nevertheless per Rambam one may say leniency applies only when he actually set out on the road, also when he returned on his own; but if he only left his house doorway Ritva concedes, per plain language of the incident brought in Gemara from Rav Yehuda dealing when his fellow turned him back. Chayei Adam seems to imply we are lenient here even when he returned on his own — requires study for practical law.",
    "2:ב":
      "Once he resolved in his mind and set out on the road, etc. — at end of previous siman beginning seif 11 he wrote \"and say my shevitah is under the tree,\" etc. — such is mishnah language and he did not write that resolve in mind also helps; seemingly all the more so here resolve in mind helps. One may say there it is inferior for this: here since he set out on the road intending to acquire shevitah there (or intending to go to another city per Shulchan Aruch Harav, and even if he finally returned to sleep in his city we are witnesses his intent was to acquire shevitah there, as above) his departure proves his intent to acquire; but there when already walking on the road his intent is not proven from his actions and therefore he must say explicitly — I later found Tosafot Shantz wrote similarly. Truly also there there is no action proving intent, as we say in Eruvin 38b — perhaps he encountered wine — see there; similarly Rashba in his novellae 52b s.v. veRav Yosef amar — see there; plain in Rambam ch. 7 Laws of Eruvin halachah 3 that even for one coming on the road intent helps; see Tosafot 49b s.v. ve'amar shekatvu: \"and say\" — seemingly they hold there speech is required; possibly they disagree with Rambam or thought is like speech for acquiring, unlike \"my shevitah in my place\" where even intent to acquire is unnecessary, as above siman 399.",
    "2:ג":
      "Rather once he resolved in his mind, etc. — this is Rambam's language; so Raosh in chapter Mi sheHotzi'uhu sign 13: a wealthy person standing in his city at twilight on the techum boundary requires intent to acquire shevitah there, and it is not comparable to siman 399 above regarding sleeping — there he came on the road and acquires shevitah automatically at his place where he rests, unlike here where he stands in his city and wants to return and sleep in the city but at twilight was on the techum boundary — we require intent to acquire shevitah there; plain.",
  },
  "output/siman_410/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] In a place known to him — meaning that place is specified, such as a tree or fence and the like, as in the previous siman seif 11; see our words there note 3.",
    "2:_":
      "(2) There — even though he did not arrive, etc. — if it was possible for him to arrive there before Shabbat if he would run, as in the previous siman seif 11 — see there.",
    "3:_":
      "(3) There — even though he did not arrive, etc. — that they told him \"sleep here\" — \"it is time of heat, it is time of cold\" — Gemara.",
  },
  "output/siman_410/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] In what cases is this said — a poor person, etc. But in Avodat HaKodesh 32 it is explained: whoever left his house intending to acquire shevitah is called wealthy — you have none who eat at his house with whom he can make eruv; and he is called poor when he left his house not intending to place eruv and it became dark for him, or he left his place to go to another place four thousand cubits away and his fellow turned him back. But when he left intending to go acquire shevitah within the techum, his fellow turning him back does not help; similarly implied in Shiltai Gibborim in name of Riaz, chapter Mi sheHotzi'uhu.",
  },
};

let total = 0;
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
        return { ...b, en: blockFixes[key] };
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
