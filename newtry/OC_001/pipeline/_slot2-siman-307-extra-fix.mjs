#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as eshel } from "./eshel307-en.mjs";
import { t as yad } from "./yad307-en.mjs";

const maps = [
  [eshel, "eshel-avraham"],
  [yad, "yad-ephraim"],
];

let missing = [];
for (const [t, slug] of maps) {
  const f = `output/siman_307/${slug}/part-001.txt`;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker}`;
      const en = t[key];
      if (!en) missing.push(`${slug}:${key}`);
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
