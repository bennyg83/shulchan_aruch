#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "7:_": `Slice like an egg. Beit Yosef deduced from this wording that even if he eats little, only that he holds a slice like an egg in his hand—and so the language of the beraita.`,
  "12:_": `The great one extends. Maharshal was asked why he said behold this one is greedy—the law is so above that the one who cuts extends his hand first, and if he comes to honor etc.; and he establishes this when they do not eat in one bowl but each has his bowl before him or fruits. And difficult for it says in siman 167 seif 96 that if each has his loaf before him he need not wait even for the one who cuts. And it appears certainly it speaks of one bowl, and this teaches us that even with permission from the great one he may not extend his hand first—for permission above does not help unless the one taking permission also has merit.`,
};

const fp = "output/siman_170/turei-zahav/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (fixes[key]) return { ...b, en: fixes[key] };
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(fp, out);
console.log("fixed", Object.keys(fixes).length);
