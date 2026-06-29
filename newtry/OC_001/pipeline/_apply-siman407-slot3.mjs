#!/usr/bin/env node
/** worker slot 3 — siman 407 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_407/mechaber/part-001.txt": {
    "1:main":
      "Who may walk outside the techum. One who left the techum with permission — e.g., a midwife coming to deliver a child, and the like — has two thousand cubits in every direction from the place he reached; and if he reached a city, he is like the people of the city and has two thousand in every direction outside the city (see end siman 346).",
    "2:main":
      "If he went out with permission and walks on the road, and they told him the mitzvah he went out to perform is already done — he has from his place two thousand cubits in every direction. If part of the techum from which he left with permission is swallowed within the two thousand cubits he has from his place, when he returns to his place it is as if he did not leave.",
    "3:main":
      "All who go out to save Jewish lives from non-Jews, or from a river, or from a collapse — have two thousand cubits in every direction from the place they saved. If the hand of the non-Jews was strong and they feared to remain in the place of rescue, they may return on Shabbat to their place with their weapons.",
  },
  "output/siman_407/beer-hagolah/part-001.txt": {
    "1:_":
      "From Rambam chapter 27 Mishneh Torah; from mishnah Rosh Hashanah 23, brought in Eruvin 45.",
    "2:_": "Mishnah Eruvin 44, and as established by Rav Shimi.",
    "3:_":
      "Gemara there in mishnah; two establishments of Rav; and Rav Nachman there 45; Raosh there; Rambam chapter 27 Mishneh Torah.",
  },
  "output/siman_407/beur-hagra/part-001.txt": {
    "1:_": "Seif 1 — and if he reached. Meaning: he reached with permission.",
    "2:_":
      "Seif 2 — he went out, etc., and if. Like Rav Shimi — Ravah raised the difficulty. Rif and Raosh there.",
  },
  "output/siman_407/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) And the like — a matter permitted to go out for, such as other pikuach nefesh matters, as below seif 3; and one who goes out to testify for sanctifying the month when they sanctified by sight (Gemara).",
    "1:ב":
      "(2) In every direction — if these two thousand are swallowed within the techum from which he left, he may return home and has two thousand around his house.",
    "1:ג":
      "(3) In that place — even after he already performed that mitzvah; Sages fixed this for him, for if he may not move from his place he will refrain from going out again.",
    "1:ד":
      "(4) He is like people of the city — they made him as if he rested there at twilight; whole city for him like four cubits.",
    "1:ה":
      "(5) See end siman 346 — matter of leaving erev Shabbat for mitzvah; see Mishna Berurah 432 what we wrote on this.",
    "2:א": "(6) From his place — that they told him this.",
    "2:ב":
      "(7) As if he did not leave — he has two thousand cubits around his house as at first. From Shulchan Aruch language: if he returned to his techum he again loses the new two thousand Sages gave him; so appears from Poskim.",
    "3:א":
      "(8) Hand of non-Jews was strong — meaning: although they saved Israel this time, hand of idolaters is strong and they fear to remain in the field.",
    "3:ב": "(9) They return on Shabbat to their place — even if more than two thousand.",
    "3:ג":
      "(10) With their weapons — permitted even when hand of Israel is strong; if their place is within two thousand, permitted to return with weapons; if weapons removed, fear enemies may pursue them, as explained in Talmud (Bach and Orach Chayim).",
  },
  "output/siman_407/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] In that place, etc. — it appears: if swallowed in his techum, since preferable to leave with permission than unknowingly (Levushei Yom Tov) — Cutheans returned him within techum as siman 405 seif 5; but if two thousand from place he reached enter his techum even one cubit — plainly as if he did not leave, as explained seif 2.",
    "2:_":
      "[2] And he has two thousand, etc. — since he left with permission, it is like resting there at twilight, for city is not considered anything (Maggid ch. 27 Laws of Shabbat).",
    "3:_":
      "[3] As if he did not leave, etc. — meaning: from place told him he has no permission to walk another direction, only returns home as at first with two thousand from house; so Rabbeinu Yerucham 100; see seif kaf alef; requires study if there too when he reached he may not walk another direction.",
  },
  "output/siman_407/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] And the like — as seif 3; and one who goes out to testify for the month when they sanctified by sight. Gemara.",
    "2:_":
      "(2) There. In every direction in that place, etc. — if these two thousand swallowed within techum from which he left, he may return home and has from his house two thousand in every direction, as below seif 2 — see there.",
    "3:_":
      "(3) There. In every direction in that place, etc. — although he already performed that mitzvah; they fixed thus, for if he may not move from his place he will refrain from leaving again and that mitzvah will be nullified. As Rosh Hashanah 23b; and next seif.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
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
  fs.writeFileSync(file, out);
  console.log(file, n);
}
