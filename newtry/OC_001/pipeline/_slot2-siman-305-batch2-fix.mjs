#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as beer } from "./beer305-en.mjs";
import { t as gra } from "./gra305-en.mjs";
import { t as mb } from "./mb305-en.mjs";
import { t as mh } from "./mh305-en.mjs";
import { t as pm } from "./pm305-en.mjs";

const maps = [
  [beer, "beer-hagolah"],
  [gra, "beur-hagra"],
  [mb, "mishnah-berurah"],
  [mh, "machatzit-hashekel"],
  [pm, "peri-megadim"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

let missing = [];
for (const [, slug] of maps) {
  const f = `output/siman_305/${slug}/part-001.txt`;
  if (!fs.existsSync(f)) {
    console.log("SKIP missing file", slug);
    continue;
  }
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = allFixes.get(key);
      if (!en) missing.push(key);
      return en ? { ...b, en } : b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(f, out);
  console.log(slug, blocks.length);
}
console.log("missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
