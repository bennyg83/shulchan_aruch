#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "turei-zahav/part-001.txt": {
    "2:_": `One should not say titbarach—for he already said Baruch Atah. In the formula of this berachah it is printed El shebekhol yom, etc., and it has no explanation; and some say El bekhol yom—and this too is not comfortable: why was it necessary to mention here the name El, for he already began to say HaMelech haTov vehaMetiv, and on this it refers shebekhol yom, etc.; and if he wished to attribute the hativah to the name El, he should have said HaMelech haEl haTov vehaMetiv lekhol; and also in Rambam this word is not found before shebekhol yom; and even per those who say at the beginning haEl Avinu, etc.—Beit Yosef wrote in name Abudraham one should not say it since he already said Elokeinu; and so R' Amram wrote in the berachah after the Megillah, until here. However in Rambam's nusach it is written haEl in the fourth berachah, until here Beit Yosef; and in siman 492 Tur wrote in name Raavan we do not say haEl haRav et riveinu since we already said Elokeinu—if so, here too; if so this El before shebekhol yom which is not even in Rambam—certainly there is no place to say so; rather it is all one matter, and he explained it: the King Who was good and benefits regarding the slain of Betar—He was good to us also in all our needs, and He benefits and will benefit us—past, present, and future, blessed be He.`,
  },
};

const base = "output/siman_189";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
