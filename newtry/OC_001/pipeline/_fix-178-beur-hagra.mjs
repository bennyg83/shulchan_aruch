import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
const fp = "output/siman_178/beur-hagra/part-001.txt";
const fix =
  "(1) Seif 4: if he ate, etc. So Rosh in Hagahot Semak and per Rashbam there, and Rashi s.v. but things, etc., on kvi'ut, etc., and s.v. to establish him, etc., unlike Semak s.v. to establish him that one must return to the first place; and Rav Berachah in chapter 8 Berakhot discusses when there was no bread there.";
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const out = blocks
  .map((b) => (b.seif === "4" && b.marker === "א" ? { ...b, en: fix } : b))
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(fp, out);
console.log("fixed");
