#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech } from "./mech359-en.mjs";
import { t as beer } from "./beer359-en.mjs";
import { t as biur } from "./biur359-en.mjs";
import { t as mb } from "./mb359-en.mjs";
import { t as ma } from "./ma359-en.mjs";
import { t as mh } from "./mh359-en.mjs";
import { t as er } from "./er359-en.mjs";
import { t as kaf } from "./kaf359-en.mjs";

const ROOT = "c:\\Users\\binya\\Downloads\\Shulchan Aruch\\newtry\\OC_001";

const maps = [
  [mech, "mechaber"],
  [beer, "beer-hagolah"],
  [biur, "biur-halacha"],
  [mb, "mishnah-berurah"],
  [ma, "magen-avraham"],
  [mh, "machatzit-hashekel"],
  [er, "eliyah-rabbah"],
  [kaf, "kaf-hachayyim"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

let missing = [];
let total = 0;
for (const [, slug] of maps) {
  const dir = path.join(ROOT, "output", `siman_359`, slug);
  if (!fs.existsSync(dir)) continue;
  const parts = fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/.test(f)).sort();
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
