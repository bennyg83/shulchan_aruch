#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as bh } from "./bh306-en.mjs";
import { t as taz } from "./taz306-en.mjs";
import { t as beer } from "./beer306-en.mjs";
import { t as gra } from "./gra306-en.mjs";
import { t as small } from "./small306-en.mjs";

const maps = [
  [bh, "baer-heitev"],
  [taz, "turei-zahav"],
  [beer, "beer-hagolah"],
  [gra, "beur-hagra"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}
for (const [k, v] of Object.entries(small)) {
  const i = k.indexOf(":");
  allFixes.set(`${k.slice(0, i)}:${k.slice(i + 1)}`, v);
}

let missing = [];
const slugs = [
  ...maps.map((m) => m[1]),
  ...new Set(Object.keys(small).map((k) => k.slice(0, k.indexOf(":")))),
];
for (const slug of slugs) {
  const f = `output/siman_306/${slug}/part-001.txt`;
  if (!fs.existsSync(f)) continue;
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
