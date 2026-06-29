#!/usr/bin/env node
/** worker slot 3 — siman 412 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_412/mechaber/part-001.txt": {
    "1:main":
      "Laws of one who divides his eruv. Contains 1 seif. One who made an eruv for the first half of the day toward the north and the second half toward the south — thinking mistakenly that this is possible — or one who said to two people \"make an eruv for me\" and one made it for him toward the north and one toward the south: if each placed his eruv at the end of two thousand cubits, he may not move from his place since it is unknown which eruv took effect for him. If the eruvs were not placed at the end of two thousand cubits, he may walk as far as possible by virtue of both of them. How so? If each placed his eruv at the end of one thousand cubits from his home, he has one thousand cubits from his home toward each of the eruvs. If one placed his eruv to the east at the end of one thousand cubits and the other placed his to the west at the end of five hundred cubits, he may walk one thousand cubits to the west by virtue of what the eastern eruv left him, and one thousand five hundred cubits to the east by virtue of what the western eruv left him.",
  },
  "output/siman_412/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) And he thought it was possible, etc. — meaning to walk in the morning here and in the evening there; but in truth one cannot make eruv for half a Shabbat. Since he placed in two places and intended both, and one of them acquired for him but he does not know which — we impose the stringencies of both upon him.",
    "1:ב":
      "(2) He may not move from his place — from his house, and not even like city residents, for he did not intend to acquire shevitah except at the eruv places and does not know which acquired for him; necessarily the southern eruv causes him to lose the northern two thousand and the northern eruv causes him to lose the southern two thousand.",
    "1:ג":
      "(3) He has one thousand cubits, etc. — for in any case from whichever eruv acquired for him he has two thousand cubits; here there is no overlap from one eruv to the other except two thousand total, and beyond the eruvs he cannot walk even one step, for regarding each we say perhaps the opposite eruv acquired for him and his two thousand ended here.",
  },
  "output/siman_412/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 38 and baraita 50a; and Rambam ch. 8 Laws of Eruvin.",
    "1:ב": "There — baraita.",
  },
  "output/siman_412/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] He erred and thought it was possible, etc. — but in truth one cannot do so, for one does not make eruv for one day half toward north and half toward south, as in Gemara Eruvin 38a.",
  },
};

let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
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
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}
console.log("TOTAL", total);
