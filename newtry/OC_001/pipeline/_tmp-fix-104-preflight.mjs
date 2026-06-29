#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "beur-hagra:3:_":
    "(63) But he may, etc. — for we do not find that walking is called a pause — Rabbeinu Yonah, who explained that he should not pause in speech; and he goes according to his view that he wrote; and in the Yerushalmi it says: even a snake — if it came toward him he moves aside to another side and it is not a pause; and Hagahot there: it was frightening and came toward him from the front — provided he does not pause his prayer. And the language 'from the front' is like 'from the front of the mortgage' — meaning specifically in an alley where walking does not help him since he is already enclosed; but if it comes toward him and he can go to the side, he goes — for walking is not a pause, and not because of danger, for a snake has no danger in it; and this is what he meant by 'provided,' etc. And there regarding bowing, R' Akiva holds like the explanation of Tosafos; and even though he agreed to the explanation of the Rosh that it is after prayer, because the prohibition of bowing is difficult for him like the difficulty of Tosafos — nevertheless per the explanation of the Rosh stated above in the previous siman, it is a pause. And in the Yerushalmi stated above, Tosafos explained 33a and the Rosh that he is angry and dangerous, as they wrote in Shulchan Aruch; and a snake too, etc.; and what he wrote 'provided,' etc., because walking is possible, as he wrote regarding a donkey and wagon, and similarly regarding kings of the house of the exile.",
  "beur-hagra:5:ב":
    "He returns to the beginning, etc. — Tosafos s.v. but, etc.; and the Rashba already wondered at what is written regarding water poured on one's knees, that we rule he returns to the place he paused; and likewise one who needs to sneeze and says 'Master,' etc., returns to the place he paused, even in the middle of a blessing, as in Keriat Shema — for one pauses in the middle of a blessing to ask out of honor and reverence and returns to the place he paused. And Beit Yosef answered to resolve that prayer is more stringent — there is no such thing; for in the Yerushalmi, which Tosafos brought 34a s.v. from where, etc., it challenges from prayer to Keriat Shema; and we also say in the first chapter of Keriat Shema to review, and even though he pauses much between paragraph and paragraph in other matters; and there is no distinction between optional and mitzvah — and Magen Avraham siman 25, note 17; and likewise we say regarding a Torah scroll, he returns and finishes it, even though he pauses much between the first paragraph and the rest of the portion — Rashba. And likewise one who hears nine tekios, etc., even though the entire order of blessings is considered one — end quote.",
  "beur-hagra:6:א":
    "(66) That which we say, etc. — Yerushalmi, and as we wrote above in siman 65.",
  "biur-halacha:3:ב":
    "He should not pause — see in Mishna Berurah that we explained it refers to speech; and all this I explained per what the commentators of Shulchan Aruch explained, according to what is implied from the plain meaning of the Hagahah, who wrote that he may go, etc.; but through this explanation the masters of the shields [Taz and several commentators] challenged, that the author contradicts himself, for he wrote in seif 2 that for another matter he may not leave his place — which implies that walking too is called a pause; and Magen Avraham resolves this difficulty, that there it is called 'not for need,' even though it was somewhat also for a mitzvah need — namely for bowing and prostrations in the middle of prayer. And the Gra went another way in this — that Shulchan Aruch do not hold like the Hagahah, but rather walking itself is also called a pause, as is written in seif 2 that for another matter he may not leave his place; and where it is forbidden, even walking alone is forbidden; and what he wrote here that even a snake, etc., he should not pause — this means even in order to go from this place to another place, since there is no danger in the matter. And in practice the Gra did not decide like either method; and it appears one should practice as I copied in Mishna Berurah, note 10 — that where there is great need one may rely on the lenient view that walking is not considered a pause, for so agreed several Acharonim.",
};

function apply(file, map) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      if (map[key]) {
        n++;
        return { ...b, en: map[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  return n;
}

console.log("beur-hagra", apply("output/siman_104/beur-hagra/part-001.txt", fixes));
console.log("biur-halacha", apply("output/siman_104/biur-halacha/part-001.txt", fixes));
