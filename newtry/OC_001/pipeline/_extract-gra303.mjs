#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const blocks = parseBlocksInFile(
  fs.readFileSync("output/siman_303/beur-hagra/part-001.txt", "utf8")
);
const o = {};
for (const b of blocks) {
  o[`${b.seif}:${b.marker}`] = b.he
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .trim();
}
fs.writeFileSync("pipeline/_beur_hagra303-he.json", JSON.stringify(o, null, 2));
console.log(blocks.length);
