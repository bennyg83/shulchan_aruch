#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as t1 } from "./gra301-en-part1.mjs";
import { t as t2 } from "./gra301-en-part2.mjs";
import { t as t3 } from "./gra301-en-part3.mjs";

const fixes = new Map(
  Object.entries({ ...t1, ...t2, ...t3 }).map(([k, v]) => [`beur-hagra:${k}`, v])
);

const root = path.resolve("output/siman_301/beur-hagra");
const files = ["part-001.txt", "part-002.txt"];
let applied = 0;
let missing = [];

for (const file of files) {
  const fp = path.join(root, file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  for (const block of blocks) {
    const key = `${block.slug}:${block.seif}:${block.marker}`;
    const en = fixes.get(key);
    if (!en) {
      missing.push(key);
      continue;
    }
    block.en = en;
    applied++;
  }
  const out = blocks.map(serializeBlock).join("\n\n");
  fs.writeFileSync(fp, out, "utf8");
}

console.log(`applied ${applied} blocks`);
if (missing.length) {
  console.error("missing keys:", missing);
  process.exit(1);
}
