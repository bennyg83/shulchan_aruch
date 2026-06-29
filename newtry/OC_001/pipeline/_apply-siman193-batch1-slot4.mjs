#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "3:_": `The custom that one does not invite zimun, etc. And there are those who say this custom is not an established custom, and the Mishnah did not lose (Mahari Ram and my teacher in Bach).`,
  },
  "baer-heitev/part-001.txt": {
    "1:א": `Understand. Therefore it is good that women bless for themselves; however the custom in this time is per Rashi that they fulfill even though they do not understand, and I never saw anyone who protests this matter. And so too Bach wrote that even in Kiddush which is d'oraisa, women fulfill through hearing, and nevertheless it is good that they say word for word with the one making Kiddush and the one blessing. Magen Avraham — see in Shulchan Aruch HaGavohar siman 62.`,
    "1:ב": `In zimun. Meaning, even though if one leaves, another three remain and can invite zimun, nevertheless he does not fulfill his obligation, for he too became obligated in zimun. Bach wrote that there are those who say that even for seven species one invites zimun, and therefore it is good not to fix three people upon seven species.`,
    "1:ג": `The zimun. And l'chatchila they should give to bless to one whose voice is strong, so that all those reclining hear, for in a multitude of people is the glory of the king. Magen Avraham.`,
    "1:ד": `Three and three. And all the more so if they need to go for a matter of mitzvah, they are permitted to divide three and three. Magen Avraham.`,
    "3:_": `Akum. All the Acharonim disagreed with the Rav on this, and Maharshal when he would invite zimun in an akum's house would say: May the Merciful One send us abundant blessing in the place of our going and our sitting. And once there was a pidyon haben feast in an akum's house and several great men were there and they agreed to bless and say "May He bless the ba'al habayit" — meaning the master of the feast. See Taz. And it is possible that if they eat in an inn for a day as casual wayfarers, that is not establishment in an akum's house and they do not invite zimun. Magen Avraham.`,
    "4:_": `To divide. Even if one wants to finish his meal before the others finish — and specifically when they began together; but if one preceded and the other two came afterward and also ate, the one is permitted to finish his meal first and bless by himself. Taz — see there.`,
    "5:_": `From when they joined. Meaning, rather each one ate separately from when they joined — see Taz and Magen Avraham.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Berachot 45 per explanation of Tosafot and Rosh and Rashbam and Mordechai and R' Yonah.`,
    "1:ב": `In the Gemara there.`,
    "1:ג": `Tosafot and Rosh and R' Yonah and Mordechai.`,
    "1:ד": `Mordechai in the name of Rambam.`,
    "1:ה": `As in Tur.`,
    "1:ו": `In the Gemara there.`,
    "1:ז": `Rosh there from implication of the Gemara and from the incident in Chullin 106.`,
    "1:ח": `There in Berachot.`,
    "1:ט": `Hagahot Maimoniyot chapter 5 from that in Berachot 50.`,
    "1:י": `Berachot there.`,
    "1:כ": `Rosh there.`,
    "2:_": `Rosh there and R' Yerucham.`,
    "3:_": `R' Yonah.`,
    "4:_": `Berachot there per Rosh's explanation and per Yerushalmi's explanation.`,
    "5:א": `There in Berachot.`,
    "5:ב": `There in Tosafot.`,
    "5:ג": `There in Rashi; in Beit Yosef wrote it refers to when they ate in one house like from corner to corner — if so, meaning once they gathered for zimun they may not divide and must eat together and invite zimun.`,
    "6:א": `So explained R' Yitzchak and they brought it in Rosh there and R' Yonah.`,
    "6:ב": `R' Yonah there.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `Seif 1 — two, etc. Berachot 45b.`,
    "1:ב": `Even though, etc. In Tosafot there amud 1 s.v. im, etc.`,
    "1:ג": `If, etc., but, etc. In Tosafot there end s.v. she'ani, etc.; and one must, etc.; and as written in Megillah, one who hears while dozing does not fulfill; and see siman 490 seif 12.`,
    "1:ד": `And one must, etc. As written at end of chapter 3 of Rosh Hashanah.`,
    "3:א": `But three, etc. Mishnah there and there 51a.`,
    "3:ב": `And two, etc. From what is written there Mishnah 45:1 "Come, hear: the sun," etc., and in Chullin 106a we infer there is no, etc.`,
    "3:ג": `And so, etc., and then, etc. Mishnah there 50a.`,
    "3:ד": `Then they may, etc. Rashi there.`,
    "3:ה": `And it is a mitzvah, etc. There was raised R. Chama, etc., and the same applies for us with ten.`,
    "3:ו": `And this is better, etc. Rosh, and so too Rashi there.`,
    "3:ז": `For behold, etc. See siman 195 seif 3.`,
    "3:ח": `Seif 2 — even, etc. Daf 47 amud 1 — Rav and Shmuel, etc.; and even though one could say as written in the Rama gloss, nevertheless Rosh does not hold thus, as written there.`,
    "3:ט": `Since, etc., nevertheless, etc. As written above Mishnah 2 — they sat to eat, etc., and we challenged ten, etc.; and in Mishnah Berurah it discusses as Tosafot wrote there, and so in Yerushalmi, and Tosafot brought there Mishnah 45:1 and Taz s.k. 6, and further from what is written and the waiter who ate, etc., daf 44 "from another," and meaning unless, etc., and see Rosh there.`,
    "3:י": `Nevertheless, etc. Beit Yosef end of siman in the name of Rivash, and as written above 53a, and see Rosh there who distinguishes between that case there and this case here, and see Bach.`,
    "3:כ": `Seif 3 — if, etc. Above siman 167 seif 12.`,
    "4:א": `Seif 4 — even, etc. 50a amud 1 per our version, and so Ra'ah and Rif and Terumat HaDeshen and Rosh there.`,
    "4:ב": `And even if they had not yet eaten a kezayit of bread. There it teaches us because this, etc.; and Tur Yerushalmi explained in the name of Tosafot that they had not yet eaten a kezayit, and challenged them from what is written in Yerushalmi there at the beginning of the chapter: here it was stated they may not divide, and here it was stated they are obligated to invite zimun. Shmuel said: here at the beginning and here at the end. Which is at the beginning and which at the end? Two amoraim — one said: they gave their minds to eat — this is at the beginning; they ate a kezayit — this is at the end. And one said: they ate a kezayit — this is at the beginning; they finished their eating — this is at the end. And the version of what is written "they ate a kezayit" at the beginning — do not read kezayit, but rather to exclude the first version where the kezayit is at the end; and so explained Rosh. But Rashba explained the reverse — that the first version there holds less than a kezayit is the beginning, and only the last version specifically is a kezayit; and he explains like the first version, and all is one. But R' Yitzchak's view is even if they did not eat at all like the first version, and per the plain sense of the Gemara's language there — see there.`,
    "5:א": `Seif 5 — if they invited zimun upon them in their places, etc. Per Rashi there, and so Tosafot explained s.v. shelosha, etc. — except they explain they are exempt but permitted to invite zimun; but Rashi explained they are not permitted. And this is what Tosafot mean: Rashi and Rashi do not agree, etc.; and Tur ruled like Rashi, and see Bach.`,
  },
};

const base = "output/siman_193";
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
