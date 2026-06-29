#!/usr/bin/env node
/** worker-slot-4 — siman 167 part 1 preflight */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_167/beer-hagolah/part-001.txt": {
    "15:א": "See there.",
    "15:ב": "Yerushalmi there; and similarly Tosafot there, daf 47; R' Yona; and Rosh.",
    "17:_": "See there.",
    "19:א": "Rosh Hashanah, daf 29.",
  },
  "output/siman_167/beur-hagra/part-001.txt": {
    "1:ג":
      "And he cuts, etc.—per the second explanation in Rashi there that precedes, in the pot, etc.; and Rashi and Rivba disagree on this in Shabbat 20a; and one fulfills both views.",
    "1:ד":
      "And he cuts, etc.—Tosafot, Berachot 39b, s.v. vehalachta, etc.; and he explains: afterward he breaks—meaning he breaks the bread; but the cutting is before, on account of interruption.",
    "11:ד": "But, etc.—from the mishnah there.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file);
}
