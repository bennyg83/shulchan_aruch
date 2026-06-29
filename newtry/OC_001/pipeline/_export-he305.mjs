#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const slugs = process.argv.slice(2);
for (const slug of slugs) {
  const f = `output/siman_305/${slug}/part-001.txt`;
  if (!fs.existsSync(f)) continue;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const o = {};
  for (const b of blocks) {
    o[`${b.seif}:${b.marker}`] = b.he
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .trim();
  }
  const out = `pipeline/_${slug.replace(/-/g, "_")}305-he.json`;
  fs.writeFileSync(out, JSON.stringify(o, null, 2));
  console.log(slug, blocks.length, "->", out);
}
