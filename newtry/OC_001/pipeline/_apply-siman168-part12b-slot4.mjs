#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "3:_": `In Taz note 6—through little honey mixture all recognizable etc.—be lenient as all say; and pockets whether honey or spices whether called bishkonish—they have law etc. as should read.`,
  "4:_": `In Taz note 9—and Tosafot rejected this is full bread etc.—in this category only truknin mentioned etc.; with this one can say even if established etc. as should read—meaning in this type baked between layers which is very thin—there is place to say even if established does not help.`,
};

const path = "output/siman_168/yad-ephraim/part-001.txt";
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
