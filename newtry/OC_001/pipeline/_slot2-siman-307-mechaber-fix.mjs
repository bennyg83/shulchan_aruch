#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t } from "./mech307-en.mjs";

const slug = "mechaber";
const f = `output/siman_307/${slug}/part-001.txt`;
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const missing = [];
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker}`;
    const en = t[key];
    if (!en) missing.push(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
console.log(slug, blocks.length, "missing:", missing.length);
if (missing.length) {
  console.log(missing);
  process.exit(1);
}
