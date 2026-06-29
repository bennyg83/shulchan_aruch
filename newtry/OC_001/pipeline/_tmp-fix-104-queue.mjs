#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`ateret-zekenim:4:_`, `If he saw an ox coming toward him, etc. And if the oxen are in a place where they are kept and are not damaging, he does not pause, etc. And all castrated oxen — he does not pause; and specifically an innocuous ox that has not gored; and even a black ox in the days of Nisan; but a forewarned ox that gored three times — even our oxen one must distance the full width of one's eyes; and similarly when it gored once or twice one must distance; and even if not black; and all other days of the year; and wherever he pauses — if he waited in order to finish entirely, he returns to the beginning. And some say — specifically where there is some negligence, then he returns to the beginning if he waited to finish entirely; but where there is duress, such as one who came under duress, or a wagon, or oxen — then he need not return to the beginning even if he waited to finish entirely (my teacher in Bach).`],
  [`baer-heitev:5:_`, `To the beginning — even though in siman 65 he ruled regarding Keriat Shema that one need not return except to the place he paused — here in prayer it is more stringent; so wrote the Rif. But Tosafos, Rosh, and Tur do not distinguish between Keriat Shema and prayer, but whether the pause was due to duress it is less severe; and so Rama in siman 65; and see Taz; and if he did not return to the beginning but to the place he paused and finished, he must return to the beginning. Peri Chadash — and in Eliyah Rabbah he concludes that ab initio one should be stringent in all duress even where there is no deferred person — see there at length.`],
  [`biur-halacha:5:_`, `And if not he returns, etc. — see in Peri Chadash who wrote that this is specifically if the pause was through speech, unlike through mere waiting, even if the pause was due to duress — see there, where he brought proof from the case of water poured on one's knees, that we rule he returns to the place he paused and it is not mentioned to return to the beginning of the blessing; and in Lechem Chamudos, chapter Mi sheMeto, letter 6, he wrote explicitly that the intent of the Gemara is the beginning of the blessing; he also brought support for his words that that matter speaks in the Gemara regarding speech, even though one examining the explanation of the Gra will find that per the explanation of the Rosh the sugya does not refer specifically to speech, for walking too is called a pause; nevertheless apparently the law is with him, for perhaps specifically there it is because there was also some pause through walking, unlike mere waiting alone. However in Peri Megadim it is implied that even for mere silence one must return to the beginning of the blessing — and this requires study; and from the chiddushim of Rosh Aharon in siman 107 it is implied that doubt remains in this matter as well. It further appears to me that we do not say he returns to the beginning of the blessing for mere waiting, only when the waiting was due to duress where the person or place was not fit — like the case of water poured on one's knees or other duress; then we say that since if he had waited to finish entirely he would return to the beginning, therefore when he waited a little he returns to the beginning of the blessing; unlike when he waited willingly, if he did not wait to finish entirely and without duress — for then it is also only one level down; and do not challenge this from Bach, who wrote that a scorpion is not called duress and nevertheless the author ruled when he did not wait that he returns to the beginning of the blessing — for one may say the author follows his view that for him, one who waits to finish entirely in prayer returns to the beginning even without duress at all; therefore when he waited a little he returns to the beginning of the blessing in all cases, unlike for us.`],
]);

function apply(file) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = fixes.get(key);
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

for (const f of [
  "output/siman_104/ateret-zekenim/part-001.txt",
  "output/siman_104/baer-heitev/part-001.txt",
  "output/siman_104/biur-halacha/part-001.txt",
]) {
  console.log(f, apply(f));
}
