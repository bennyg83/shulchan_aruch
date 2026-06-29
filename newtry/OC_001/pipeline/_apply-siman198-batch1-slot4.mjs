#!/usr/bin/env node
/** worker-slot-4 — siman 198 editorial batch 1 (24 blocks) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "1:_": `And if they are ten — it appears that in the berachah of marriage one also answers "Blessed is our God and Blessed is His Name forever and ever, that the joy is in His abode," etc. (so wrote in the name of Maharal z"l in the name of Maharashal z"l).`,
  },
  "baer-heitev/part-001.txt": {
    "1:א": `Ate. — And if he drank, he says "Blessed is He through whose bounty we have eaten" of his own — for drinking is included in eating. Ma'amar Mordechai, Magen Avraham.`,
    "1:ב": `Amen. — If he came when the one blessing repeats and says "Blessed is He through whose bounty we have eaten," etc. — Taz ruled he need not answer amen then, see there for the reason; and Shelah and Levush ruled he must answer amen; see siman 192 s.k. 2 as explained there.`,
    "1:ג": `Elokeinu. — And it appears that in the berachah of marriage one also answers "Blessed is our God and Blessed is His Name forever and ever, that the joy is in His abode." Ateret Zekenim, from a great one.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Berachot 45.`,
    "1:ב": `Tosafot and R' Yonah and the Rosh in the name of BeHaG.`,
    "1:ג": `There and in Semag.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `Seif 1 — and so, etc. Mishnah end of chapter 8: they answer amen, etc.; and in the Gemara 53b: when he did not eat, etc.; and there after all they answer, etc.; and see siman 215 seif 2.`,
    "1:ב": `And if, etc. Tosafot cited above.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `[1] [Levush] "Blessed is He," etc. — so it is in Tosafot in the name of Ba'al Halakhot Gedolot; but the wording of Shulchan Aruch is "Blessed and Blessed is His Name," etc.; and so in Ba'al Halakhot Gedolot itself, and the Rosh, Tur, Rambam, Semak [siman 109], and Tashbetz [siman 322 end of s.v. sheloshah].`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] Blessed and Blessed is His Name, etc. — In Levush the text reads "Blessed is He and Blessed is His Name," etc.; and so Tosafot in the name of BeHaG; but in BeHaG itself it states as Shulchan Aruch's wording; and so the Rosh, Tur, Rama'im, and Sefer Mitzvot Katan and Tashbetz. Rabbi Akiva Eiger note (1).`,
  },
  "levushei-serad/part-001.txt": {
    "1:_": `Taz s.k. 1 — that he was there at the time they finished, as should be.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:_": `(s.k. 1) Who did not eat — and if he drank, etc.; and see siman 197 seif 2. Meaning: he wrote that if two ate bread and the third drank a cup of wine (and regarding water they disagree) — they may invite zimun, for we can say "we have eaten" — from the reason that drinking is included in eating; all the more so here. And know: if another entered after the responders already answered "Blessed is He through whose bounty we have eaten" — it is implied from Magen Avraham end of siman 192 that the reclining ones answer amen — all the more so one who enters then should answer amen. And Levush's view: even though he holds the reclining ones do not answer amen, he admits that one who enters when the one blessing answers "Blessed is He through whose bounty we have eaten," etc. — should answer amen. But Taz here wrote that even one who enters then does not answer amen.`,
  },
  "magen-avraham/part-001.txt": {
    "1:_": `Who did not eat. — And if he drank, he says "Blessed is He through whose bounty we have eaten" of his own — for drinking is included in eating (Ma'amar Mordechai siman 112); and see siman 197 seif 2.`,
  },
  "mechaber/part-001.txt": {
    "1:main": `One who enters among three who ate. It contains one seif: Three who ate and are blessing, and one enters who did not eat — if he enters when the one blessing says "Let us bless Him through whose bounty we have eaten," he answers after him "Blessed and Blessed is His Name forever and ever." If he enters when others answer "Blessed is He through whose bounty we have eaten," he answers after them amen. {Rama: And so in all berachot that a person hears, he is obligated to answer amen (Tur, Beit Yosef in the name of BeHaG and Semag).} And if they are ten, he says "Blessed is our God and Blessed is His Name forever and ever." The same applies if he was there when they finished eating and did not eat with them — thus he answers after the one blessing and after the responders.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) Who did not eat — and if he drank, even though he did not join them at all, he may say "Blessed is He through whose bounty we have eaten," etc., for drinking is included in eating. However with ten, regarding mentioning the Name that he say "Blessed is our God through whose bounty we have eaten," etc. — Peri Megadim left it in doubt, see there.`,
    "1:ב": `(2) He answers after him Blessed, etc. — for it is not proper that a person be among a group inviting themselves to give praise and thanks to Him blessed be He while he refrains from this.`,
    "1:ג": `(3) When others answer — meaning: then he cannot answer "Blessed," etc., since he did not hear from the mouth of the one inviting zimun who requested to bless.`,
    "1:ד": `(4) He answers after them amen — as with all berachot that a person hears from an Israelite, that he must answer amen after him; and if he heard afterward from the one inviting zimun when he repeated "Blessed is He through whose bounty we have eaten," etc. — he must answer again amen, as with all berachot that a person hears from one and again heard that berachah from a second. Taz wrote: if he entered after the one blessing already began to say "Blessed is He through whose bounty we have eaten," he need not answer amen; but many Acharonim disagree on this.`,
    "1:ה": `(5) In all berachot — whether berachot over mitzvot or berachot over enjoyment.`,
    "1:ו": `(6) He says Blessed is our God — meaning: when he heard the one blessing say "Let us bless our God"; and if he heard only the responders, he says only amen alone, as above. And in the berachah of marriage one answers "Blessed is our God and Blessed is His Name forever and ever, that the joy is in His abode" [Acharonim].`,
    "1:ז": `(7) And after the responders — meaning: even if he said at first with the reclining ones "Blessed and Blessed is His Name," etc., he must answer at the end amen also after the responders.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `And the same, Taz. He resolved Bach's difficulty — for it is obvious — and Einayim LaMishpat teaches that even though he was there from beginning to end he answers two responses on n'varech: he says "Blessed is He and Blessed is His Name forever and ever," and on the responders amen — for it is not specifically when he comes in one of them, see there. And what he wrote "Blessed is He" in Shulchan Aruch does not exist; in Levush he copied "Blessed is He," Eliyah Rabbah (1). And see Perishah the reason for doubling "Blessed and Blessed" — so he not say to an idolater "Blessed." And regarding amen: behold it is explained from Levush's words that the one blessing says n'varech and they answer "Blessed," and the one blessing does not answer amen after them — for since he will say afterward "Blessed," why should he say amen now, since he believes in it and will immediately include himself in this berachah; and after the one blessing says "Blessed," they do not answer amen after him, in order to give heart and combine berachat ha-Zan, see there; and one who comes there when the one blessing says "Blessed" should also answer amen. And therefore in Barchu in Yishtabach and berachat ha-Torah, where the one blessing says Barchu and they answer "Blessed" and he returns and says, etc. — if so the one blessing should not say amen after the responders; but the responders answer amen after the one blessing when he returns. And I am uncertain — perhaps one should say: since they answered "Blessed, Hashem the blessed forever," he should not answer amen again, for he already believed and blessed thus. And Taz's view: even when he comes after the one blessing said "Blessed," he does not answer amen — and all the more the congregation does not answer amen after the chazzan who blesses; and see what is written in siman 57. And Rabbi Akiva Eiger wrote: the custom is like Levush; and see Einayim LaMishpat, see there.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `And the same if he was there when they finished, etc. It appears that this is to include extra — for since the meal's end was mentioned, one entered, etc. — one might have thought: this one was there at the hour they finished eating and did not desire to eat with them and bless with them — if so the eating is not dear in his eyes and he removed himself from the berachah of ha-Zan and is not obligated to hold gratitude to Hashem blessed be He for that eating that the others ate — he teaches us we do not say so. And it appears to me the reason they required this one who is there to answer either "Blessed is He" or amen: for it is not proper that any person be among a group giving praise and thanks to Him blessed be He while he is silent; therefore when he comes at the hour the one blessing says n'varech, he goes up with the responders "Blessed is He"; and when he comes at the hour they respond, he answers amen — for it is not applicable then to say "Blessed is He and Blessed is His Name," for that is for the hearer when the inviter says n'varech; and therefore it appears simple: if he came after the responders finished and the one blessing already began to say "Blessed is He through whose bounty we have eaten," this one answers nothing — for there is no relevance to say anything, since others who ate are silent — there is no obligation upon him at all. And Levush wrote that also in this he answers amen — and it is not correct in my humble opinion.`,
  },
};

const base = "output/siman_198";
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
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
