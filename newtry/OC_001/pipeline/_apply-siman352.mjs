#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech } from "./mech352-en.mjs";
import { t as bh } from "./bh352-en.mjs";
import { t as beer } from "./beer352-en.mjs";
import { t as gra } from "./gra352-en.mjs";
import { t as biur } from "./biur352-en.mjs";
import { t as mb } from "./mb352-en.mjs";
import { t as ma } from "./ma352-en.mjs";
import { t as mh } from "./mh352-en.mjs";
import { t as er } from "./er352-en.mjs";
import { t as kaf } from "./kaf352-en.mjs";
import { t as pm } from "./pm352-en.mjs";
import { t as taz } from "./taz352-en.mjs";
import { t as dag } from "./dag352-en.mjs";
import { t as netiv } from "./netiv352-en.mjs";
import { t as yad } from "./yad352-en.mjs";
import { t as rae } from "./rae352-en.mjs";

const maps = [
  [mech, "mechaber"],
  [bh, "baer-heitev"],
  [beer, "beer-hagolah"],
  [gra, "beur-hagra"],
  [biur, "biur-halacha"],
  [mb, "mishnah-berurah"],
  [ma, "magen-avraham"],
  [mh, "machatzit-hashekel"],
  [er, "eliyah-rabbah"],
  [kaf, "kaf-hachayyim"],
  [pm, "peri-megadim"],
  [taz, "turei-zahav"],
  [dag, "dagul-merevavah"],
  [netiv, "netiv-chayim"],
  [yad, "yad-ephraim"],
  [rae, "rabbi-akiva-eiger"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

const slugs = maps.map((m) => m[1]);
let missing = [];
let total = 0;
for (const slug of slugs) {
  const dir = `output/siman_352/${slug}`;
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
