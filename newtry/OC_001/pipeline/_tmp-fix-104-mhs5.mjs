#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `mishnah-berurah:5:ג`,
    `(15) He returns, etc. — and if he did not return to the beginning but to the place he paused and finished, he must return to the beginning and pray the entire prayer [Peri Chadash]. And this is when there was complete duress; but duress of bandits and the like mentioned above — b'dieved he fulfilled, for perhaps the halachah follows the lenient views mentioned, that this is not called duress [Magen Giborim].`,
  ],
  [
    `mishnah-berurah:5:ד`,
    `(16) To the beginning — here is what we practice per the ruling of Rama above in siman 65 regarding Keriat Shema, as the view of the poskim that one does not return to the beginning except when the waiting was due to duress — the same law applies in prayer; but some say our case regarding a scorpion or an ox that came against him, or he stopped due to bandits and the like, is also called interruption due to duress, for at that time he could not pray and it is called interruption and he returns to the beginning for this; and some say this is not called duress except when the interruption was because he himself was unfit for prayer or the place was unfit; unlike other duress — and Magen Avraham and many later authorities ruled that in prayer other duress is also called duress, since there are early authorities who hold that in prayer, if he waited long enough to finish it all, even without any duress at all, he returns to the beginning; but in Keriat Shema and all other matters it is not called duress except when the person or place is unfit.`,
  ],
  [
    `mishnah-berurah:5:ה`,
    `(17) And if not — meaning he did not wait in silence long enough to finish it all; but nevertheless he waited a long time — for if he waited only long enough to finish that blessing alone, all agree he returns only to that place [Peri Megadim]. And see in Biur Halacha what we wrote in the name of Peri Chadash.`,
  ],
  [
    `mishnah-berurah:5:ו`,
    `(18) He returns to the beginning — for he holds prayer is stricter in this regard than Keriat Shema; therefore in Keriat Shema or its blessings it suffices that if he interrupted he return to the place he paused; but here we require the beginning of the blessing, because through much waiting the blessing was corrupted; and specifically if the waiting was in the middle of a blessing; but between blessing and blessing, b'dieved we have no concern, as long as he did not wait long enough to finish it all — and see in Biur Halacha.`,
  ],
  [
    `mishnah-berurah:5:ז`,
    `(19) The blessing — see in Chayei Adam what he wrote: b'dieved, if he did not return to the beginning of the blessing, since he completed the blessing he is not permitted to return; and Magen Giborim disagrees entirely with the law of Shulchan Aruch and wrote that according to the essential law, if he did not wait long enough to finish it all, it is not considered interruption and he returns only to the place he paused; and that which Tosafos wrote he returns to the beginning of the blessing refers when he waited long enough to finish it all, and Tosafos hold this duress is not considered duress even in prayer. And in Biur HaGra he agrees with the view of the Rashba brought in Beit Yosef — see there; and it is implied from him that in all cases he returns only to that place he paused, unless he waited long enough to finish it all due to duress — then he returns to the beginning of the prayer.`,
  ],
]);

function apply(file, map) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = map.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  return n;
}

console.log(apply("output/siman_104/mishnah-berurah/part-001.txt", fixes));
