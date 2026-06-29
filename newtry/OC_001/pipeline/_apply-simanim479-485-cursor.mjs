#!/usr/bin/env node
/** Cursor editorial fixes — simanim 479-485 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot12-lib.mjs";

const FIXES = {
  479: {
    "mechaber/part-001.txt": {
      "1:main":
        "Birkas Hamazon on the Third Cup. And in it one section: Afterwards they pour the third cup and bless upon it Birkas Hamazon and Borei peri hagafen and one drinks it while reclining, and one does not bless a berachah achronah upon it, and one does not drink wine between it and the fourth cup: {Rama: However, from the third cup one may drink many times and all of it counts as one drinking, even though he interrupted in between (Maharil, Mahari, and Tashbetz).} It is a mitzvah to respond after zimmun: {Rama: And the greatest among them says Hodu and Ana and the others answer after him (Kol Bo). And the greatest may give permission to a minor (Maharil). And one may join for zimmun for the purpose of Hallel even though he did not eat with them. And the custom is that the baal habayis recites Birkas Hamazon on Passover night, as it is said good-eyed is he who shall be blessed — and he is called good-eyed because he said All who are hungry, let them come and eat, etc.}",
    },
    "baer-heitev/part-001.txt": {
      "1:א":
        "(א) They pour [the cup]. And one must rinse and wash if the cup is not clean — see Chok Yaakov.",
      "1:ב":
        "(ב) Wine — the same applies to other intoxicating beverages; but a beverage that does not intoxicate, one is permitted to drink [between cups]. Taz.",
      "1:ג":
        "(ג) He may [drink many times]. Nevertheless he should not drink so much that he becomes intoxicated. Chok Yaakov.",
      "1:ד":
        "(ד) And the greatest [among them] — Maharil wrote a minor does not say Hodu but does say Ana, and that is l'chatchila; but there is not so much stringency since women may join for this — see Magen Avraham; and women are also obligated in this Hallel — see Chok Yaakov.",
      "1:ה":
        "(ה) The baal habayis — even if he has a guest — see siman 491. Chok Yaakov.",
    },
    "eliyah-rabbah/part-001.txt": {
      "1:_":
        "[1] Third cup, etc. — and one requires rinsing and washing, even for one who is not careful all year (Acharonim).",
    },
    "biur-halacha/part-001.txt": {
      "1:_":
        "And he does not drink wine, etc. — see Mishna Berurah what he wrote regarding strong wine from the country; and know that from the language of the Mishna and all the poskim it implies that even a small amount he may not drink. However, all this is per the reason of the Yerushalmi, because of intoxication — therefore the Sages did not permit even a drop aside from the four cups. However, for the other reason, lest it appear he is adding to the cups — if so, perhaps this applies only when he drinks the measure of a cup; and what the Rama wrote and all of it counts as one drinking means even if what remains has the measure of a revi'it — and this requires further study.",
    },
    "beur-hagra/part-001.txt": {
      "1:א": "(א) Seif 1 and in Biur Halacha — as written in siman 474.",
      "1:ב": "(ב) And he drinks it — as written in siman 472.",
      "1:ג": "(ג) And not — see siman 474.",
      "1:ד":
        "(ד) However — the Yerushalmi explains the reason is lest he become intoxicated, unlike that cup.",
      "1:ה":
        "(ה) Mitzvah, etc. — because of Hallel in Midrash Tehillim: those who recite it need three so that one says to two Hodu.",
      "1:ו":
        "(ו) And the greatest, etc. — as in Sotah, like the greatest who recites Hallel — even though the simple meaning of the Gemara is to exclude a minor — see there.",
      "1:ז":
        "(ז) And the greatest may, etc. — see Tosafot chapter 7 of Berachos 7a s.v. vehilkheta.",
      "1:ח": "(ח) And one may join, etc. — see end of siman 480; and one may, etc.",
      "1:ט":
        "(ט) And they practice, etc., as it is said — Sotah 38b; and as written siman 483 seif 4.",
    },
    "chok-yaakov/part-001.txt": {
      "1:ב":
        "(ב) And he drinks it while reclining — and if he drank without reclining, see siman 472 seif 6.",
      "1:ג":
        "(ג) And he does not drink wine — the same applies to other intoxicating beverages, so wrote the Taz; and see above siman 473 and below siman 481.",
      "1:ד":
        "(ד) He may drink many times — and Magen Avraham wrote, and this is specifically when his mind was on this at the time of the blessing — end; and the default is that when he blesses on the cup his mind is on all of it; and if the cup is large and holds much, he should not drink much from it so he does not become intoxicated.",
      "1:ה":
        "(ה) After zimmun — that is, for Hallel in order to say Hodu with three, that one says to two and they answer after him; but nevertheless he need not trouble himself after this if he does not have men of obligation with him, for it suffices to join his wife and sons who reached education — and so agreed the Acharonim; and if there are only two here, both say Hodu — so too in Agudah; and see in siman 422 Magen Avraham s.k. 7, explained that specifically Hodu in Hallel requires three, unlike Hodu in the Great Hallel — see there. And regarding joining for Birkas Hamazon, its law is as all year — Acharonim agreed; and if he wishes to join one from another house for Birkas Hamazon, see siman 484.",
      "1:ו":
        "(ו) To give a minor permission — and it is stated in the Gemara chapter 3 of Sukkah that if there was a slave, woman, or minor reciting, they answer after them what they say, and a curse comes to one who makes such agents; and Maharil wrote we put minors to say so they do not sleep and also to educate them — end; and regarding women, Tosafot wrote there that specifically on other days they are exempt from Hallel, unlike Hallel and Hagadah of Pesach where women are obligated like the four cups; therefore it appears women say Hodu and answer after them — so too Maharil; but per what we practice to say Hodu with pleasant melody, one should be concerned for what we say women sing and men answer like fire in flax, as in Sotah chapter Egla Arufa — and see above siman 422.",
      "1:ז":
        "(ז) The baal habayis blesses — even if he has a guest — see siman 491; and Agudah wrote however there is no concern if another blessed.",
    },
    "mishnah-berurah/part-001.txt": {
      "1:א":
        "(א) They pour for him the third cup — and it requires rinsing and washing if it is not clean; and even one who is not careful all year to see if it is clean, nevertheless on this night he should be careful because of hidur mitzvah.",
      "1:ב":
        "(ב) And he blesses upon it Birkas Hamazon — even if he blesses alone, and even per the general view that Birkas Hamazon does not require a cup, nevertheless since the Sages enacted to drink four cups on this night, one should make a mitzvah with each and every cup; therefore they adjoin the third cup to Birkas Hamazon [Gemara].",
      "1:ג":
        "(ג) And he drinks it while reclining — and if he drank without reclining, if he returns and drinks, see above in siman 472 seif 7 and in Hagahah.",
      "1:ד":
        "(ד) And he does not bless a berachah achronah upon it — even if he drank the entire revi'it, since he relies on the final blessing he will bless on the fourth cup.",
      "1:ה":
        "(ה) And he does not drink wine — lest he become intoxicated and sleep and not complete the Hallel; and some wrote the reason is lest it appear he is adding to the cups; and the Acharonim wrote it is not specifically wine — the same applies to other intoxicating beverages; nevertheless if it does not intoxicate it is permitted, when it was not strong wine from the country; if it was strong wine from the country one should be strict and be concerned for the second reason, that it appears like adding to the cups.",
      "1:ו":
        "(ו) However, from the third cup, etc. — for the first reason, because of intoxication, it certainly does not apply, for he does not drink more than four cups; and for the reason that it appears like adding, also there is none, for it is only one cup; nevertheless if after drinking most of a revi'it he did not intend to drink more and afterward changed his mind to drink more, the view of Magen Avraham and Chok Yaakov is that since he must bless upon it anew, it appears like adding to the cups; see above in siman 472 in Biur Halacha what we wrote on this.",
      "1:ז":
        "(ז) How many times — nevertheless if the cup is very much larger than usual, he should not drink all of it so he does not become intoxicated [Acharonim].",
      "1:ח":
        "(ח) That he interrupted in between — meaning after he drank most of a revi'it at first, he interrupted much more than the time of eating a peras.",
      "1:ט":
        "(ט) After zimmun — the Acharonim agreed that this zimmun is not regarding Birkas Hamazon, for because of this he is not obligated to return more than other days of the year; here it deals with Hallel, that it is a mitzvah to beautify saying Hallel with three so one says to two Hodu and they answer the verse after it; and the one they call to this zimmun should not eat, drink, or assist in blessing the zimmun blessing, only hear Hodu and answer with them and return home; and in this too they agreed that even though it is a mitzvah from the best to say Hallel with three adult men, therefore if he has in his house at one table a man of obligation, certainly it is proper to join him for saying Hodu; nevertheless there is not so much stringency, for he may do this with his wife and sons (and if his sons are minors, see below) — meaning he says and they answer [and so too his wife may say Hodu, for women are also obligated in this Hallel as they are obligated in the four cups; and Chok Yaakov wrote that per what we practice to say Hodu with pleasant melody, one should be concerned for what we say in the Gemara 'women sing and men answer' like fire in flax]. And if he wishes to return after zimmun for Birkas Hamazon and go to his neighbor to bless there, he should not eat the afikoman at home, for he will need to eat something there to join for Birkas Hamazon, and it is forbidden to eat after the afikoman anything; and the afikoman itself is forbidden to divide and eat in two places, as above in siman 478; rather he eats the afikoman where he makes zimmun and blesses there, and also drinks the cup there and remains there until completing the seder; and if he wishes he may return home after Birkas Hamazon and complete the Hallel and drink the fourth cup; but nevertheless they do not now practice to go eat the afikoman in another house; and it is better to bless alone at home than go in the middle of his meal to another house and seek zimmun. Indeed if he wishes to beautify and fulfill everything from the best and does not have in his house a complete zimmun of three people, he should see to invite from the start to the meal some guest so he has a complete zimmun for Birkas Hamazon and also for saying Hodu.",
      "1:י":
        "(י) He says Hodu and Ana, etc. — it is only a mitzvah l'chatchila and not for voiding [Peri Chadash].",
      "1:כ":
        "(כ) And the others answer after him — and if there are not twenty-one years, both say Hodu [Acharonim].",
      "1:ל":
        "(ל) To give a minor permission — that he says so they do not sleep and also to educate them in mitzvos; and this is specifically for saying Ana, because they answer after him that very verse, but not for Hodu.",
      "1:מ":
        "(מ) That the baal habayis blesses — even if he has a guest; nevertheless there is no stringency if another blessed [Chok Yaakov].",
    },
  },
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
let total = 0;
const fails = [];

for (const [siman, relMap] of Object.entries(FIXES)) {
  const base = path.join(OUT, `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(relMap)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    total += Object.keys(blockFixes).length;
    for (const [key, en] of Object.entries(blockFixes)) {
      const pf = preflightFail(en);
      if (pf) fails.push(`siman_${siman} ${rel} ${key}: ${pf}`);
    }
  }
}

console.log("applied", total);
if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
