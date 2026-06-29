#!/usr/bin/env node
/** worker-slot-4 — siman 194 editorial batch 1 (45 blocks) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "1:_": `But if he forgot, etc. Nevertheless, if there were five and three of them preceded and invited zimun for themselves, one of the three cannot join with the two remaining to invite zimun, since the hands of zimun have already departed (Rosh chapter 3 "They ate" in the name of R' Yitzchak).`,
    "2:_": `They call him and inform him, etc. And some say: this that they call him and bless upon him — this is only such as when the door of the house opens to the market and he sits opposite it and they call him and he hears their voices and they invite zimun (Beit Yosef in the name of Rashba in the name of Rav Hai). And even though they call him and he answers with them, they fulfill zimun but he does not fulfill (Beit Yosef in the name of R' Yonah). And some say that he too fulfills zimun (Rambam chapter 5).`,
  },
  "baer-heitev/part-001.txt": {
    "2:_": `With them — but he stands before the opening. And he too fulfills. Rambam, Beit Yosef, Bach.`,
    "3:_": `Into two. And if there is no one who knows except one berachah, he should not bless anything, for they impede one another — see Magen Avraham. The order of these three berachot impede one another, and if he said them out of order he did not fulfill. The matter of Shmuel siman 247.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Berachot 41.`,
    "1:ב": `Rosh and Rashba.`,
    "1:ג": `In the Gemara there.`,
    "1:ד": `Rosh there.`,
    "2:_": `In the Gemara there.`,
    "3:א": `There 46 per Rif's explanation, and so agreed Rosh and R' Yonah and Tosafot.`,
    "3:ב": `There in Tosafot.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `Seif 1 — three, etc. Mishnah 2b.`,
    "1:ב": `And so, etc. As written in Shulchan Aruch siman 193 seif 1, and each one specifically, and as written in siman 196, but, etc.`,
    "1:ג": `And they, etc. There.`,
    "1:ד": `And if, etc. As written above siman 193.`,
    "2:_": `Seif 2 — three, etc. Mishnah 2b.`,
    "3:א": `Seif 3 — and they inform him so that, etc. So explained Terumat Yisrael and Rosh — what is written that they call him and he answers.`,
    "3:ב": `Three, etc. In Tosafot there s.v. velamad, etc., and per his view that he explained in siman 200 seif 2 like R' Nachman, and per R' Nachman for all the good and the best is not d'oraisa, and so is the conclusion of the Gemara there, and this is what he wrote "and even though," etc.`,
  },
  "biur-halacha/part-001.txt": {
    "1:א": `And each one blessed for himself — and even if they did not finish except the berachah of ha-zan, they also lost zimun; but if they only began "Baruch atah Hashem ha-zan et ha-olam kulo," there is room to be uncertain, etc. [Peri Megadim].`,
    "1:ב": `And likewise if two of them blessed — meaning they cannot return and join with the third to dismiss him from zimun through them, for two are not dragged after one; and with another group of three there is room to examine, and it is reasonable that he can join, for behold they separated from a group of obligation that they are still obligated, only they have no remedy because there is no zimun retroactively; nevertheless requires further study; but if he eats a little with them he certainly joins, even with two.`,
    "1:ג": `Forgot — and the same applies if he acted intentionally; he used "forgot" because of the opening [Acharonim].`,
    "1:ד": `One of them, etc. — and the same applies with ten if three of them forgot and blessed — they can join with the remainder and invite zimun with the Name (R' Akiva Eiger and other Acharonim). Further, Mordechai wrote in his article that the same applies if there were initially four and two of them blessed — the two remaining can attach one of those two who blessed and invite zimun upon him; and he leans further that even if the majority of the group blessed individually, if two remain who have not yet blessed they can still attach one of them for zimun with the Name. R' Akiva Eiger wrote there is room to be uncertain with two who ate bread and the third drank a revi'it of beverage, and afterward one of the bread-eaters forgot and blessed — whether in such a case the three who ate are permitted to invite zimun with those two, or perhaps since here there is only one who is obligated by law in zimun, no; and so it is reasonable, end of his words; and so is the view of Birkei Yosef and Ma'amar Mordechai and Magen Giborim.`,
    "3:_": `But into halves, etc. — and per what is explained below siman 200 in the gloss that the berachah of zimun is only until ha-zan specifically; if so, when no one person knows how to bless until the end of ha-zan, only n'varech alone, and the second knows the berachah of ha-zan — they do not divide it into two, but rather they bless without any zimun at all and begin only from the beginning of birkat hamazon; for although the berachah of ha-zan impedes the berachah of zimun such that without it one does not fulfill zimun, nevertheless zimun does not impede the berachah of ha-zan which is the beginning of birkat hamazon, as above. Afterward I found that Ra'ah wrote thus in his novellae on Berachot in this sugya.`,
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": `Seif 2 — three who ate and one of them went out to the market, they call him, etc. It appears to me from this that if he does not join and answer with them he cannot invite zimun, even though at first they ate together and became obligated in zimun — he cannot invite zimun without them; and this is not similar to prayer, for we hold that if one began with Avot among ten he finishes, and many similar cases there that if one began with ten he finishes; and here what he began to eat with three does not help — there must be three at the berachah of zimun itself. It is difficult for me from the sugya in Sanhedrin chapter 1 daf 8, where the tanna taught: zimun with three — what is zimun? If we say the berachah of zimun — but it was taught: zimun and berachat zimun with three; and if you say he is explaining — what is zimun? The berachah of zimun — but it was taught: zimun with three and berachat zimun with three, etc.; and it is difficult why he challenges, and why should we push more that the intention is regarding zimun for judgment where what he paired with berachat zimun is not relevant; rather he should have explained as we thought regarding zimun in birkat hamazon, and what he doubled is when if he had written only one of them one would have thought he teaches only regarding the essence of the law that zimun requires three — to exclude if at first there were not three, to exclude from what we thought that zimun does not require three at all; therefore he teaches that from the outset of the law zimun requires three. Nevertheless it is possible that even if at first they ate with three it suffices, even though at the time of blessing there are not three they can invite zimun; therefore he teaches in the doubling that zimun requires three and it is not enough that there were three at first, only berachat zimun with three — at the time of blessing itself we require three; and why he challenges requires further study. From this it is further difficult for me on what Magen Avraham wrote in siman 191 explaining Tur's words, that behold the Sages were strict in zimun on a fourth berachah — meaning on the body of birkat hamazon that one discharges his fellow, which applies only in zimun with the Name; if so it is difficult why the Gemara challenges — let us say zimun refers to the body of birkat hamazon to discharge one's fellow, and berachat zimun refers to the berachah n'varech she'achalnu, etc.; and if he had written only one, one could say only n'varech requires three but the body of birkat hamazon to discharge one's fellow does not require three; therefore he teaches both to inform us that zimun means discharging one for his fellow in the body of birkat hamazon, and this came and revealed that; and the intention of zimun would be like there in Tur — what he wrote regarding zimun on a fourth berachah; and why he challenges requires further study — examine well.`,
  },
  "dagul-merevavah/part-001.txt": {
    "1:_": `There is no proof here that three berachot are literally d'oraisa; and it suffices if we say it is like three and is d'oraisa. Therefore it appears to me to emend in Magen Avraham, and so it should read: the matter of three berachot from the Torah; and thereby all the objections of Even HaEzer are removed, who challenged from verbs, and also thereby it is settled that he did not count birkat hamazon in the chapter HaKometz among other things that impede one another.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `[1] Forgot one, etc. — because of the opening he used "forgot," and the same applies if he acted intentionally and blessed, Bach. And there is room to be uncertain with two who ate and the third drank a revi'it, and afterward one forgot and blessed — whether the third who ate is permitted to invite zimun upon those two, or since only one is obligated in zimun, no; and so it is reasonable. It further appears to me that with ten, if three forgot and blessed, he blesses n'varech l'Eloheinu as below siman 197 regarding eating vegetables.`,
    "2:_": `[2] And he answers with them, etc. — Levush Yom Tov wrote: it appears so in the Gemara and Rosh; but it is not so below siman 200, and it is from Rashba's words, until here. Per this, Shulchan Aruch's words also seem to contradict one another. Therefore it appears to me there is no dispute at all between Rosh and Rashba — here we require that he be close so he can answer with them; and so is the law l'chatchila that he should answer; and indeed if he does not wish to answer, even so they invite zimun upon him as below; and one may interpret Levush's words thus, and it is strained to say that here it is worse because since he does not stand there he must specifically answer.`,
    "3:_": `[3] That he does not come, etc. — rather the door of the house opens to the market and he sits opposite and they call him and he hears their voices and they invite zimun; Beit Yosef in the name of Rashba. Bach wrote that he too fulfills zimun. Kolbo wrote: when he finishes his work he should come to the house where he ate and bless birkat hamazon; however, if he tarried there until the end of the berachah and intended in his heart, he fulfills everything and need not bless.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] Three who ate as one and forgot, etc. — and all the more so if they did not forget but acted intentionally they do not invite zimun, for it is obvious there is no zimun retroactively. Bach.`,
    "2:_": `(2) There. But if one of them forgot, etc. — and the same applies if he acted intentionally and blessed — the two still invite zimun upon him. Bach. R' Akiva Eiger ot 1. Ma'amar Mordechai ot 1. Birkei Yosef ot 1.`,
    "3:_": `(3) There. The two can invite zimun with the third, etc. — for it is no worse than eating with them a leaf of vegetable. Tur. And per one who holds in siman 197 seif 3 that vegetables do not help — one must say that here it is preferable that he ate bread. Magen Avraham s.k. 1.`,
  },
  "levushei-serad/part-001.txt": {
    "1:_": `Magen Avraham s.k. 193 — and the same applies if they are two, for where one does not know, then even with two one fulfills through the berachah of the one who knows, siman 193, and one says two berachot and one says the third.`,
    "2:_": `There — for Rav Yosef Karo ruled siman 200 as he wrote.`,
    "3:_": `There — that he says thus n'varech. Meaning: even though the others do not know how to answer Baruch she'achalnu, etc., he himself will be the one who says and answers.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:_": `(s.k. 1) They can, etc. — for a leaf of food, etc.; even though for a vegetable leaf he does not join except before he blessed the final berachah on the vegetable — and here, behold, he already blessed birkat hamazon — nevertheless here eating bread is preferable, even after he blessed birkat hamazon, than a vegetable leaf before he blessed the final berachah; so too Magen Avraham below siman 197 s.k. 4.`,
    "2:_": `(s.k. 2) Even though, etc. — and see siman 25 seif 20 as explained there, that if there is filth or idolatry it interrupts for one regarding answering Kedushah; and the same applies here.`,
    "3:א": `(s.k. 3) One, etc. — the third; and see siman 193 — meaning that in any case one who does not know nevertheless understands the Holy Tongue; and see there in Magen Avraham; and requires further study, etc. — we find that four can, etc.; and so in the Gemara daf 46, where R' Nachman and R' Shimon disagree until where is the berachah of zimun: R' Nachman said until n'varech and R' Shimon said until ha-zan; and we say: let us establish it like the tannaim, for one taught in birkat hamazon: two and three (and Rif and Tosafot explained: sometimes it works with two people and sometimes with three, such as when one knows only one berachah as written here in Shulchan Aruch), and another taught: three and four. They thought that for all the good and the best is not d'oraisa (and he did not count it). What — do they not disagree here: one who taught three holds until ha-zan (and one should read: only three berachot), and one who taught four holds until n'varech (if so, with berachat zimun there are four)?`,
    "3:ב": `And it is possible that he need not inform us, etc. — meaning that it is common that one knows the berachah of zimun and does not know any berachah from birkat hamazon; and if there were a novelty that one can say the berachah of zimun even though it is not common, nevertheless he should have informed us; but in truth there is no novelty, since he already informed us that the three berachot of birkat hamazon — each one can bless one berachah — likewise a fourth person can bless the berachah of zimun alone, for what he wrote that berachat zimun is a separate berachah; only on the braita he properly challenges: one who holds berachat zimun is until n'varech should have taught four, and the novelty would be that we learn from this that berachat zimun is until n'varech like R' Nachman and not like R' Shimon; but Rav Yosef Karo, since he already wrote for himself in siman 200 that berachat zimun is until n'varech — there is no longer a novelty here and he need not inform us.`,
    "3:ג": `And it is implied in the Gemara and Rif, etc. — the proof, see what I wrote in this s.k.`,
    "3:ד": `That it impedes, etc. — and the reason is possible: since all the berachot are derived from one verse, the Gemara derives it on daf 48b.`,
    "3:ה": `And see siman 193 as explained there in Magen Avraham — the implication of the Gemara that all year in the eighteen-berachah Amidah one berachah does not impede its fellow except the berachot of Rosh Hashanah and Yom Kippur that impede one another; if so in birkat hamazon one could say the law is like the berachot of Rosh Hashanah and Yom Kippur of Yovel.`,
    "3:ו": `And it is proven, etc. — from the Torah, etc., unlike what Rav Yosef Karo wrote in siman 151; Magen Avraham brought it there, see there.`,
    "3:ז": `Regarding shofar blasts — that from the Torah nine sounds suffice, but due to doubt one must blow three sets tashrat, tashat, tarat; and if one knows one set he blows that set lest he fulfill thereby. All the more so here where he certainly fulfills the berachah d'oraisa.`,
    "3:ח": `Regarding to where he returns, etc. — on daf 46b it is taught: to where does he return? R' Zevid in the name of Abbaye said: he returns to the beginning; and the Rabbis said: to the place where he stopped; and the halachah is: to the place where he stopped. On this Ramban wrote that he came to explain one who went to the market in the middle of birkat hamazon — when he returns, to which place does he return? Since he tarried and interrupted in between, there is no reason for this dispute here, for the Gemara there does not deal with one who went to the market; see there in Ramban.`,
    "3:ט": `That even if we say the berachot impede one another, etc. — for certainly one must hold the berachot do not impede one another; why should it deal with one who went out in the middle of birkat hamazon? If so it would be difficult for R' Zevid in the name of Abbaye who holds he returns to the beginning — if so, even if he went out in the middle of the second berachah or between the first and second, nevertheless he must return to the beginning of birkat hamazon and loses even the first berachah since he interrupted — what of it that he interrupted? For even if he did not bless the second berachah at all he fulfilled through the first berachah, for they do not impede one another. If so, why should it be worse when he blessed the second berachah but interrupted between second and first (for it appears strained that it deals specifically with one who went out in the middle of the first berachah, for the stam deals with that, and it would also be difficult why the Rabbis)? Rather, even if we say the berachot impede one another and he tarried, etc., and do not hold like one who returns to the beginning.`,
  },
};

const base = "output/siman_194";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
