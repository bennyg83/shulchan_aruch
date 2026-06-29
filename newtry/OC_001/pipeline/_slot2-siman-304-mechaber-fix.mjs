#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t } from "./mech304-en.mjs";

const slug = "mechaber";
const fixes = new Map(Object.entries(t).map(([k, v]) => [`${slug}:${k}`, v]));
const f = `output/siman_304/${slug}/part-001.txt`;
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const missing = [];
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    if (!en) missing.push(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
console.log(fixes.size, "keys,", blocks.length, "blocks, missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
