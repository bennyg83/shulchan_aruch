#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const slugs = process.argv.slice(2);
for (const slug of slugs) {
  const dir = `output/siman_308/${slug}`;
  if (!fs.existsSync(dir)) continue;
  const parts = fs
    .readdirSync(dir)
    .filter((f) => /^part-\d+\.txt$/.test(f))
    .sort();
  const o = {};
  let n = 0;
  for (const part of parts) {
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(dir, part), "utf8"));
    for (const b of blocks) {
      o[`${b.seif}:${b.marker}`] = b.he
        .replace(/<[^>]+>/g, "")
        .replace(/&quot;/g, '"')
        .trim();
      n++;
    }
  }
  const out = `pipeline/_${slug.replace(/-/g, "_")}308-he.json`;
  fs.writeFileSync(out, JSON.stringify(o, null, 2));
  console.log(slug, n, "->", out);
}
