#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech } from "./mech337-en.mjs";
import { t as bh } from "./bh337-en.mjs";
import { t as taz } from "./taz337-en.mjs";
import { t as beer } from "./beer337-en.mjs";
import { t as gra } from "./gra337-en.mjs";
import { t as biur } from "./biur337-en.mjs";
import { t as mb } from "./mb337-en.mjs";
import { t as mh } from "./mh337-en.mjs";
import { t as ma } from "./ma337-en.mjs";
import { t as er } from "./er337-en.mjs";
import { t as kaf } from "./kaf337-en.mjs";
import { t as pm } from "./pm337-en.mjs";

const maps = [
  [mech, "mechaber"],
  [bh, "baer-heitev"],
  [taz, "turei-zahav"],
  [beer, "beer-hagolah"],
  [gra, "beur-hagra"],
  [biur, "biur-halacha"],
  [mb, "mishnah-berurah"],
  [mh, "machatzit-hashekel"],
  [ma, "magen-avraham"],
  [er, "eliyah-rabbah"],
  [kaf, "kaf-hachayyim"],
  [pm, "peri-megadim"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

const slugs = maps.map((m) => m[1]);

let missing = [];
let total = 0;
for (const slug of slugs) {
  const dir = `output/siman_337/${slug}`;
  if (!fs.existsSync(dir)) continue;
  const parts = fs
    .readdirSync(dir)
    .filter((f) => /^part-\d+\.txt$/.test(f))
    .sort();
  let count = 0;
  for (const part of parts) {
    const fp = path.join(dir, part);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.slug}:${b.seif}:${b.marker}`;
        const en = allFixes.get(key);
        if (!en) missing.push(key);
        return en ? { ...b, en } : b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out);
    count += blocks.length;
  }
  console.log(slug, count);
  total += count;
}
console.log("total", total, "missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
