#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as bh } from "./bh304-en.mjs";
import { t as beer } from "./beer304-en.mjs";
import { t as taz } from "./taz304-en.mjs";
import { t as ma } from "./ma304-en.mjs";
import { t as mb } from "./mb304-en.mjs";
import { t as biur } from "./biur304-en.mjs";
import { t as gra } from "./gra304-en.mjs";
import { t as small } from "./small304-en.mjs";

const allFixes = new Map();

function add(slug, t) {
  for (const [k, v] of Object.entries(t)) {
    allFixes.set(`${slug}:${k}`, v);
  }
}

add("baer-heitev", bh);
add("beer-hagolah", beer);
add("turei-zahav", taz);
add("magen-avraham", ma);
add("mishnah-berurah", mb);
add("biur-halacha", biur);
add("beur-hagra", gra);

for (const [k, v] of Object.entries(small)) {
  const i = k.indexOf(":");
  const slug = k.slice(0, i);
  const rest = k.slice(i + 1);
  allFixes.set(`${slug}:${rest}`, v);
}

const slugs = [
  "baer-heitev",
  "beer-hagolah",
  "turei-zahav",
  "magen-avraham",
  "mishnah-berurah",
  "biur-halacha",
  "beur-hagra",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "machatzit-hashekel",
  "peri-megadim",
  "rabbi-akiva-eiger",
  "chatam-sofer",
  "yad-ephraim",
];

let missing = [];
for (const slug of slugs) {
  const f = `output/siman_304/${slug}/part-001.txt`;
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
  console.log(slug, blocks.length, "blocks");
}

console.log("missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
