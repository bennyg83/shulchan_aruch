#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "beer-hagolah:2:א": "There (ibid.).",
  "beer-hagolah:2:ב": "Rambam (cited).",
  "eliyah-rabbah:3:_":
    "(3) And he says, 'Master of all the world,' etc. — it follows after what he wrote in Beit Yosef, that we rule like the Rambam against the Tur; but in the Gemara it is explained like the words of the Tur, that he returns to his place and afterward says 'Master'; and so ruled the Bach, and so is the main view, for I found thus in Semak siman 57, Shibbolei Leket, Sefer Tanya, and Shelah. And that which the Sages did not establish [a blessing] on urine in siman 78 — Rabbeinu Yonah answered that he is negligent from the outset, for urine does not come thus suddenly; if he had checked himself, 'Master' is not an excuse for negligence, only for duress.",
  "levushei-serad:1:_":
    "(Magen Avraham, note 1) To finish — meaning he waited also after the smell ceased; and through combination it was the measure to finish; and it teaches us that one should not say: since the beginning of the pause was due to duress, it is as if the whole thing was due to duress.",
  "machatzit-hashekel:1:א":
    "(Note 1) And he returns, etc. — if he would pray immediately — meaning after the smell ceased; for until the smell ceases the pause is due to duress, but after the smell ceases, what he waited willingly is not duress; if so, what he waited due to duress is not in order to finish entirely.",
  "machatzit-hashekel:1:ב":
    "Therefore one need not return except to the place he paused — and this is per the Rama above in siman 65, who wrote that so is also the custom — there is no distinction between Keriat Shema and prayer, except that there is a distinction: if he waited entirely to finish due to duress, then he must return to the beginning; if not due to duress, he need not return except to the place he paused. But per the view of the Mahari Abuhav there, who holds there is no distinction whether the pause was due to duress or not — rather the distinction is between Keriat Shema and prayer: in Keriat Shema in any case he need not return to the beginning, and in prayer, even if the pause was not due to duress, he must return to the beginning — if so, there is no support for what Magen Avraham wrote here; and per the Mahari Abuhav, if he waited entirely to finish, he must return to the beginning, since here we deal with prayer.",
  "kaf-hachayyim:3:_":
    "(3) There — he waits until the smell ceases and returns and prays. The Bach wrote that if he waited thus in sneezing and in the odor wafting from those winds and sneezes in order to finish it entirely, he returns to the beginning — it is implied that specifically if all the pauses were due to duress of the sneezing and wafting odor and they contain the measure to finish it entirely, he returns to the beginning; but if among these pauses he waited willingly, they are not combined with them and he need not return to the beginning; and so too Magen Avraham, note 1 — if the entire pause was not due to duress, he returns to the place he paused, even if he waited in order to finish it entirely. And this is per the words of the Tur and Rama, may their memory be blessed, in Darkei Moshe siman 65, that they do not distinguish between Keriat Shema and prayer except between duress and willingness — if the pause was due to duress he returns, and if not he does not return, as explained there. But per the words of Maran, may his memory be blessed, one does not distinguish between duress and willingness, but between Keriat Shema and prayer — in Keriat Shema in any case he does not return, and in prayer in any case he returns, as explained in Beit Yosef siman 65 and siman 104 — see there; and so too Peri Chadash, note 2, and Kaf HaChayim, note 1; and see in our words above in siman 65, note 3, and it will be explained further below at length in siman 104, note 28 — see there.",
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

let total = 0;
for (const f of [
  "output/siman_103/beer-hagolah/part-001.txt",
  "output/siman_103/eliyah-rabbah/part-001.txt",
  "output/siman_103/levushei-serad/part-001.txt",
  "output/siman_103/machatzit-hashekel/part-001.txt",
  "output/siman_103/kaf-hachayyim/part-001.txt",
]) {
  const n = apply(f, fixes);
  if (n) console.log(f, n);
  total += n;
}
console.log("total", total);
