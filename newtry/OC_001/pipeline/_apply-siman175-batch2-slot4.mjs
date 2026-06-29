#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(1) Magen Avraham wrote Maharil some hold no haTov veHaMeitiv etc. on Passover not to add cups—meaning certainly during meal may drink as much as he wants and this is not like adding to four cups Chazal enacted on Passover night, since he does not bless on wine during meal it is clear he does not intend to add but for thirst etc.; unlike cup he blesses on like four cups—then appears like adding and must bless; meaning if wants to drink from other kind now brought must say haTov veHaMeitiv lest appear like adding yet he desires to drink—better to permit drinking without haTov veHaMeitiv; teaches not because haTov veHaMeitiv is d'oraisa from Shas therefore must bless even if appears like adding we are not concerned; but better not drink wine just brought; Magen Avraham speaks when needs much, was very thirsty, no other wine (see Magen Avraham siman 174 s.k. 2); see siman 472 seif 7 and Tur: Tur wrote since we rule four cups require drinking reclining, if drank without reclining must return and drink reclining—even if appears adding to cups (unlike Mordekhai there), since reclining law from Shas, do not waive for appearance; Rama below hagahah ruled on last two cups where appears adding need not return and drink, b'dieved rely on Raavyah that nowadays no way to recline therefore no reclining nowadays—were it not Raavyah Rama would agree must recline since reclining from Shas; Tur siman 473 in name Maharam Meroshburg permitted bless haTov on Passover night—not seen as adding only if bless borei peri hagafen as blessed on cups, end quote.`,
  },
  "magen-avraham/part-001.txt": {
    "1:א": `Maharil some hold no haTov veHaMeitiv on Passover night not to add cups; appears should not drink two kinds but if brought another kind must bless since explicit in gemara; siman 472 seif 7 and Tur there; Agudah wrote this extra stringency; so Avudraham in name Maharam; Tur siman 473 that he bless; appears when blessed birkat hamazon on other wine need not haTov veHaMeitiv for already said in birkat hamazon. He has no more: so wrote Raavad and R' Yitzchak of Vienna hold do not bless; Baal Netivot uncertain; Radbaz siman 125 ruled if have from first and did not want and brought other—bless; if none from first—not because of change brought, do not bless, end quote.`,
  },
  "mishnah-berurah/part-001.txt": {
    "2:ה": `(11) Within thirty days—to exclude those who hold if drank within thirty days this wine not so beloved and does not bless haTov—teaches us.`,
    "2:ז": `(13) More than red—nevertheless if drank white first then brought red blesses haTov if knows red is better; stam not, because white healthier for body and red considered worse relative to it.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `And specifically per Taz—he was asked: since Mechaber brought second while first remains, if first finished and second brought obviously bless haTov; Rama wrote opposite is majority view if remains etc.; if not seif 1 would say Mechaber majority even if both at time of borei peri hagafen; Rama wrote majority even if not remain; per Rashba's resolution seif 1 and 3 therefore Taz wrote majority of Rashba for borei peri hagafen; examiner in Beit Yosef clear likewise to exclude R' Yitzchak on haTov veHaMeitiv; Acharonim sign 1 wrote Mechaber majority when two wines in house not ready on table; Magen Avraham 1; Levush seif 1 and 3 not understood—seif 1 when both on table at borei peri hagafen, borei peri hagafen also on haTov and need not bless haTov, implies forbidden to bless haTov for they enacted only when not on table at borei peri hagafen since important they enacted haTov blessing etc., unlike here; seif 3 blessed on chaviv and not to multiply blessings—if wants intend borei peri hagafen not on second would need borei peri hagafen and haTov on second, requires study; sign 4 Taz and Magen Avraham 2 explained if passed and blessed on inferior borei peri hagafen then haTov after, see there; see Magen Avraham further below.`,
    "2:_": `That is per Taz—Rashi Tur holds slightly inferior still since other kind blesses haTov; very inferior even Rashi no haTov; Taz ruled slightly inferior no haTov unless doubt bless; Rashi white even very inferior white elevates over red considered slightly inferior—difficult on Rama; explain Taz ruled like Rashi because bodily creation more important than all; Magen Avraham 3 explains more inferior than first and little is not much; so Acharonim sign 5; will be explained Magen Avraham.`,
    "4:_": `And on chaviv first per Taz; so Magen Avraham sign 2; already wrote sign 1 Rama reconciles seif 1 and 3; Bach explained passed etc.; Taz explained seif 1 in doubt and here known inferior; from his clear words wise spoke as his good way—Beit Yosef brought on Tur words but Mordekhai wrote they differ—why Shulchan Aruch repeated seif 1 and 3—forced therefore Tur wrote even both before him and Rashba specifically when known one more important; Tosafot even in doubt; Rashba certainly disputes Mordekhai; Tur holds Mordekhai's difficulty not difficulty—for we do not diminish blessings such as seif 3; nevertheless there l'chatchila proper to bless blessing fitting each (siman 46 explained); Mechaber ruled like Tosafot doubt also blesses—not contradiction from seif 1 doubt on chaviv which is which preferable—with many wines proper give many praises like seif 3 not test who inferior; seif 3 clear important one blesses borei peri hagafen on important unlike seif 3—this his intent; doubt which preferable certainly when both before him; Rashba certainly preferable as we say; if known both equal do not bless haTov etc., only stam.`,
  },
};

const base = "output/siman_175";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
