#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", "siman_552");
const fixes = {
  "chatam-sofer/part-001.txt": {
    "1:_":
      "There in Taz at the beginning of the siman it should say Rambam, not Ravyah:",
  },
  "machatzit-hashekel/part-001.txt": {
    "12:א":
      "(12) From Midrash Eicha it says: one piece of bread, coal (meaning a small inferior piece) — and he gives, etc. But in Yerushalmi the reading is, etc.; if so there are two versions between the Midrash reading and the Yerushalmi reading: in the Midrash the reading \"he ate all foods\" implies many foods, therefore it concludes another change and says this is the Tisha B'Av meal — for what he ate before was not called the Tisha B'Av meal since he ate two dishes. But per the Yerushalmi reading it first wrote \"he ate all he needed\" — implying he was satisfied but ate only one dish; if so this too is called the Tisha B'Av meal, therefore it concludes and says this is the Tisha B'Av meal. Even though the first was also a Tisha B'Av meal, nevertheless through eating bread in ashes the Tisha B'Av meal is more evident — and this is the essence:",
  },
};

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = path.join(root, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
}
console.log("patched 552 remnants");
