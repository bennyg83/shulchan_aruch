#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "10:ח": `(ח) That it appears etc.—for since cooked it is not considered bread appearance. And if he did not boil in pot but fried them in liquid in pan—it implies from Magen Avraham siman 166 that this is not like cooking and bread appearance helps as above in second manner; and per other acharonim there his words are not necessary; and correct that in frying he should not eat them when they have bread appearance except within the meal. And all this when they lack olive-size amount; but if he fried slices that have olive-size in each—even if bread appearance departed, plainly blesses hamotzi as with cooking and all the more here.`,
};

const path = "output/siman_168/mishnah-berurah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(path, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (fixes[key]) return { ...b, en: fixes[key] };
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(path, out);
console.log("fixed", Object.keys(fixes).length);
