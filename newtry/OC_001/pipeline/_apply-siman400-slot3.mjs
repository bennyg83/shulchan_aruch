#!/usr/bin/env node
/** worker slot 3 — siman 400 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_400/mechaber/part-001.txt": {
    "1:main":
      "One who was traveling on the road to enter a city and sat on the road to rest, and it became dark for him and he did not know that he was within the techum of the city, and afterward found himself within its techum — acquires residence in the city and enters it on Shabbat and walks all of it and beyond it two thousand cubits in every direction. But if he did not intend to enter this city, he acquires residence in his place, and from there he has two thousand cubits in every direction. And if his two thousand cubits from his residence end in the middle of the city, he does not walk in the city more than half. {Rama: And the same law applies if he intended to enter the city and said, \"My residence is in my place\" — the law is likewise [Maggid, chapter 27].}",
  },
  "output/siman_400/baer-heitev/part-001.txt": {
    "1:א":
      "More. And if his measure ends at the end of the city, the whole city is considered as four cubits, as Rashi wrote, siman 408.",
    "1:ב": "And he said. At twilight. Magen Avraham.",
  },
  "output/siman_400/magen-avraham/part-001.txt": {
    "1:א":
      "In the middle of the city. And if his measure ends at the end of the city, the whole city is considered as four cubits, as Rashi wrote, siman 408.",
    "1:ב":
      "He intended to enter, etc. — when he was on the road he intended to enter the city, and at twilight he said, \"My residence is in my place.\"",
  },
  "output/siman_400/mishnah-berurah/part-001.txt": {
    "1:א": "(1) And he did not know, etc. — even if he intended to acquire residence in this place.",
    "1:ב":
      "(2) He acquires residence in the city — since from the outset he intended to enter the city; and if he had known the city was within his techum, he would not have wanted to acquire residence except with the people of the city; therefore even now he is like one of the people of the city to walk all of it and to have two thousand cubits in every direction. Nevertheless, there is also a stringency here: he loses on this account — in the place where he sits he has no measure of two thousand from there, since he is considered like one of the people of the city. And it appears plain that all this is when he now wishes to go to the city and for his benefit they were lenient toward him; but if he wishes to remain in his place where he acquired residence, the choice is his.",
    "1:ג": "(3) To the country — meaning: the city.",
    "1:ד":
      "(4) He acquires residence in his place — even if he did not intend to acquire residence here, such as if he slept at twilight and on Shabbat when he awoke found himself within the techum of the city; nevertheless he is not considered like the people of the city, since from the outset he did not intend to enter; and he acquires residence here, as below in the next seif.",
    "1:ה":
      "(5) In the middle of the city — but if his two thousand cubits end at the end of the city, the whole city is not considered for him except as four cubits, and he walks also outside the city until completion of the measure of two thousand from his place of residence, as explained in siman 408.",
    "1:ו":
      "(6) If he had intent, etc. — meaning: even in the opening case where he intended to enter, nevertheless it does not help to be like one of the people of the city, except specifically when he did not express explicitly from his mouth that he acquires residence in his place, but only in thought; but if he said so explicitly with his mouth at twilight, \"My residence is in my place\" — even though at first when he was coming on the road he intended to enter the city, and his statement now was also only because he did not know the city was near him — nevertheless he already uprooted his residence from the people of the city, and he has only two thousand cubits from his place of residence.",
  },
  "output/siman_400/beur-hagra/part-001.txt": {
    "1:א": "Seif 1 — and he walks all of it. Rashi, and so in the Gemara there — from there, etc.",
    "1:ב":
      "But if. And the same. So it is proven there, seif 2, and Rashi explained \"it suffices\"; and for us, who hold the halachah is like Rabbi Yehudah, as written in chapter 1, seif 2 — one must distinguish in such a case.",
    "1:ג": "And if they end. There.",
  },
  "output/siman_400/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 45, and like Rabbi Yehudah.",
    "1:ב": "Beit Yosef from the words of Rambam, and the same in chapter 27 of Mishneh Torah.",
  },
  "output/siman_400/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] In the middle of the city, etc. — but at the end of the city, the whole city is considered as four cubits, as explained at the beginning of siman 408 (Magen Avraham); and so is implied in Rashi's explanation, 60b.",
  },
  "output/siman_400/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] And he did not know that he was within the techum of the city, etc. — meaning that although he did not know the city was within his techum and he intended to reside in his place — since if he had known the city was within his techum he would not have acquired residence except with the people of the city — behold he is like one who acquired residence with them, and he enters the city and walks all of it and beyond it two thousand cubits. Beit Yosef — see there; letter 1, Maamer Mordechai, letter 1. And what Perishah wrote — that Rambam does not hold thus, and Beit Yosef did not see Rashi's language — see what Maamer Mordechai challenged there. And so Bach wrote per the explanation of Rashi that he did not intend to acquire residence, etc. — requires study, for Rashi at the end of the mishnah explains explicitly as Beit Yosef wrote; and so Perishah and Maamer Mordechai there; and so Rabbi Zalman, as Beit Yosef's words; and so the Acharonim.",
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
