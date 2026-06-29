#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "6:ב": `(35) And he shall not speak—until he finishes chewing a little of the slice and swallows it, since Shulchan Aruch ruled below at end of siman 210 that for taste alone, if he did not swallow, he need not bless—if so, the essence of the berachah is on swallowing [and similarly if many are reclining and each has his own loaf and blesses for himself, he should not answer amen to his fellow's berachah before he tastes on his own berachah]; nevertheless, if he transgressed and spoke while still chewing before swallowing the slice, in matters not needed for the meal, it requires study whether he must return and bless [and Chayei Adam generally sides that even if he did not swallow, only the taste he sucks from his mouth from the chewing, he need not return and bless]. However, he need not eat specifically an olive's bulk before speaking—for even if he ate only less than an olive's bulk after the berachah, it is considered eating for this matter, and it is permitted to speak afterward if needed; and when not in a pressing situation, it is good that he eat an olive's bulk from the start.`,
  "6:ה": `(38) That he blessed on bread, etc.—and even our bread, which is clean and seasoned with spices, for Shulchan Aruch ruled above he need not wait until they bring salt and relish; nevertheless, since he wishes to eat the bread through dipping in salt and relish, this is a matter of the meal.`,
  "6:ז": `(40) Animal food—this too is a matter of the meal, for it is forbidden to taste before giving to one's animal. Magen Avraham wrote in the name of Shulchan Aruch HaRav that a person drinks before his animal, as written regarding Rivkah, who said to the servant: drink, and I will also give drink to your camels.`,
  "7:ג": `(46) And he blessed on bread, etc.—and although we hold one who hears answers as if he answered, and Magen Avraham already ruled above in siman 158 seif 11 that if before he blessed on bread he blessed hamotzi, he cannot bless again on bread—for here he did not dry his hands before hamotzi and the mitzvah is not yet finished; but if he already dried, he also cannot bless again on bread, since he already fulfilled through hamotzi.`,
};

const path = "output/siman_167/mishnah-berurah/part-001.txt";
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
