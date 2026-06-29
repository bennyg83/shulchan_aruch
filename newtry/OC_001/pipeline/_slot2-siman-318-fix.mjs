#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech } from "./mech318-en.mjs";
import { t as bh } from "./bh318-en.mjs";
import { t as taz } from "./taz318-en.mjs";
import { t as beer } from "./beer318-en.mjs";
import { t as gra } from "./gra318-en.mjs";
import { t as biur } from "./biur318-en.mjs";
import { t as mb } from "./mb318-en.mjs";
import { t as mh } from "./mh318-en.mjs";
import { t as ma } from "./ma318-en.mjs";
import { t as er } from "./er318-en.mjs";
import { t as kaf } from "./kaf318-en.mjs";
import { t as ls } from "./ls318-en.mjs";
import { t as pm } from "./pm318-en.mjs";
import { t as small } from "./small318-en.mjs";

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
  [ls, "levushei-serad"],
  [pm, "peri-megadim"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}
for (const [k, v] of Object.entries(small)) {
  const i = k.indexOf(":");
  allFixes.set(`${k.slice(0, i)}:${k.slice(i + 1)}`, v);
}

const slugs = [
  ...maps.map((m) => m[1]),
  ...new Set(Object.keys(small).map((k) => k.slice(0, k.indexOf(":")))),
];

let missing = [];
let total = 0;
for (const slug of slugs) {
  const dir = `output/siman_318/${slug}`;
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
  console.log(missing.slice(0, 30).join("\n"));
  if (missing.length > 30) console.log(`... +${missing.length - 30} more`);
  process.exit(1);
}
