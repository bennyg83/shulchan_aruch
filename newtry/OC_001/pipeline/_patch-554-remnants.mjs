#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", "siman_554");
const fixes = {
  "beur-hagra/part-001.txt": {
    "8:_":
      "Seif 8 — therefore, etc. And even though Tosafos there challenged from the end of Yoma 40 that even per the view that immersion at its time is not a mitzvah, immersion is permitted — as explained, why do the Rabbis hold, etc.; from this the first Tanna of the baraita holds it is not a mitzvah and nevertheless immersion is permitted; Tosafos in Yoma there strained that it means for prayer one need not immerse, but for immersion at its time she may immerse — see there s.v. ksevari; and Ramban answered that a baal keri there who saw before Yom Kippur is not at its time and is permitted only for prayer; and so is the halacha that immersion at its time is a mitzvah like the first Tanna there, and Beit Shammai and Beit Hillel who disagree with R' Yehuda bar Yehuda — and this is what is written regarding immersion, etc., and not like R' Chanina ben Antigonos; and also not like another reading of Tosafos \"because of purities\" — nevertheless it is difficult from baal keri, and it must be as above:",
  },
  "eliyah-rabbah/part-001.txt": {
    "8:_":
      "[8] However, etc., and one who is lenient, etc. It is difficult, for below siman 142 Levush wrote thus regarding the three fasts, but on Tisha B'Av one may not be lenient; and similarly Rashal and Taz wrote: even if she says \"I need to fast\" she fasts unless she is somewhat ill; however Levush on Yom Tov wrote that Rashal's words do not appear correct, and likewise Isur VeHeter ruled that even after seven days she does not fast when she said \"I need to\" — and this is Bach's wording: the custom is to fast all the time they have no weakness and are healed from birth, and even on the other three fasts they were accustomed to be stringent when they are healthy, end quote; and Magen Avraham wrote: how is the custom the custom; however on Tisha B'Av when postponed there is room to be lenient, end quote; and it appears specifically on other fasts one may be lenient entirely when postponed, but on Tisha B'Av one may not be lenient from the custom, for Rashal wrote that this is the law. Taz wrote: a woman who gave birth within three days — even if she says she does not need to fast, it is forbidden for her to fast, and all the more within seven when she said \"I need to\"; and see siman 137 on Yom Kippur; and in my humble opinion she should not be stringent at all within seven on Tisha B'Av, which is rabbinic. Beit Hillel wrote siman 265 that a woman who does not fast must nevertheless fast some hours:",
  },
  "mishnah-berurah/part-001.txt": {
    "8:ב":
      "(18) She should not immerse on it — rather she washes and chafifah on Tisha B'Av, and at Motzei Tisha B'Av she chafifahs a little before immersion, for we require immersion close to chafifah; and regarding wearing whites on Tisha B'Av see above siman 551 seif 3 in the gloss and in Mishna Berurah there:",
  },
  "shaarei-teshuvah/part-001.txt": {
    "7:_":
      "To fast. See Ba'er Heitev; and see in responsum Pei Yud manuscript who disagrees with Rashal in the responsum that Magen Avraham brought and challenged his proofs; his view is to rule like Shulchan Aruch that even if Rabbeinu Tam disagrees with Ramban we follow leniency in rabbinic matters, and all the more since it is a doubt of life to be lenient; and in what Shmuel siman 108 wrote that after seven from her birth they were stringent on themselves as Rama wrote siman 27 that they have no great pain and no danger concern; and Beit Hillel wrote in Yoreh De'ah siman 265 that a woman who gives birth who does not fast must nevertheless fast some hours — see there; and they brought in Or Zarua; and all is per the situation — if it is somewhat difficult for her she need not fast at all. And see Zichron Yosef siman 21 who also expanded on this and concludes: it appears to me for halacha and practice that if she already recovered from weakness of birth she fasts and completes like any person; but if she has not fully recovered, or she is somewhat ill or weak, she does not fast within thirty days; and if a healthy woman giving birth fasts and feels any weakness in the middle of the day — there is room to rule she not fast the rest of the day — see there; and see in Lekutim Peri Chadash Orach Chayim this siman:",
  },
};

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = path.join(root, rel);
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
}
console.log("patched 554 remnants");
