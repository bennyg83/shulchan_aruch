import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const fp = process.argv[2];
const key = process.argv[3];
const [seif, marker] = key.split(":");
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const b = blocks.find(
  (x) => String(x.seif) === seif && String(x.marker || "_") === (marker || "_")
);
console.log("bad?", isBadMt447(b?.en));
for (const re of BAD_MT_447) {
  if (re.test(b?.en || "")) console.log("match:", re);
}
