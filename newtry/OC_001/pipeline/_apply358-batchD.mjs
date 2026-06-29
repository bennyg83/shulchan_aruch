#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as biur } from "./biur358-en.mjs";
import { t as mb } from "./mb358-en.mjs";
import { t as er } from "./er358-en.mjs";
import { t as kaf } from "./kaf358-en.mjs";
import { t as pm } from "./pm358-en.mjs";

const maps = [
  [biur, "biur-halacha"],
  [mb, "mishnah-berurah"],
  [er, "eliyah-rabbah"],
  [kaf, "kaf-hachayyim"],
  [pm, "peri-megadim"],
];

const allFixes = new Map();
for (const [t, slug] of maps) {
  for (const [k, v] of Object.entries(t)) allFixes.set(`${slug}:${k}`, v);
}

let missing = [];
let total = 0;
for (const [, slug] of maps) {
  const dir = `output/siman_358/${slug}`;
  if (!fs.existsSync(dir)) continue;
  for (const part of fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/.test(f)).sort()) {
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
    total += blocks.length;
  }
  console.log(slug);
}
console.log("total", total, "missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
