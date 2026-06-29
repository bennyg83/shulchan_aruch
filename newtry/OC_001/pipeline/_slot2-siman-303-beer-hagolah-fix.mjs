#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t } from "./beer303-en.mjs";

const fixes = new Map(Object.entries(t).map(([k, v]) => [`beer-hagolah:${k}`, v]));
const f = "output/siman_303/beer-hagolah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Beer HaGolah 303:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
