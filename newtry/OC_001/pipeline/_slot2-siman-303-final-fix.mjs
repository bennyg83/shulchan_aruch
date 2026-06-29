#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as kaf } from "./kaf303-en.mjs";
import { t as mh } from "./mh303-en.mjs";
import { t as pm } from "./pm303-en.mjs";
import { t as gra } from "./gra303-en.mjs";

const maps = [
  [kaf, "kaf-hachayyim"],
  [mh, "machatzit-hashekel"],
  [pm, "peri-megadim"],
  [gra, "beur-hagra"],
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
  console.log(slug, fixes.size, "keys,", blocks.length, "blocks");
}
console.log("missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
