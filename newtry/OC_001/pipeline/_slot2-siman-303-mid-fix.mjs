#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as er } from "./er303-en.mjs";
import { t as ls } from "./ls303-en.mjs";

const maps = [
  [er, "eliyah-rabbah"],
  [ls, "levushei-serad"],
];
let missing = [];
for (const [t, slug] of maps) {
  const fixes = new Map(Object.entries(t).map(([k, v]) => [`${slug}:${k}`, v]));
  const f = `output/siman_303/${slug}/part-001.txt`;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
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
  console.log(slug, fixes.size, "blocks");
}
console.log("missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
