#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mb } from "./mb306-en.mjs";
import { t as mh } from "./mh306-en.mjs";
import { t as ma } from "./ma306-en.mjs";
import { t as er } from "./er306-en.mjs";
import { t as kaf } from "./kaf306-en.mjs";
import { t as ls } from "./ls306-en.mjs";
import { t as pm } from "./pm306-en.mjs";
import { t as biur } from "./biur306-en.mjs";

const maps = [
  [mb, "mishnah-berurah"],
  [mh, "machatzit-hashekel"],
  [ma, "magen-avraham"],
  [er, "eliyah-rabbah"],
  [kaf, "kaf-hachayyim"],
  [ls, "levushei-serad"],
  [pm, "peri-megadim"],
  [biur, "biur-halacha"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

let missing = [];
for (const [, slug] of maps) {
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
