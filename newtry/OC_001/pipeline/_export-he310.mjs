#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const SIMAN = process.argv[2] || "310";
const slugs = process.argv.slice(3).length ? process.argv.slice(3) : null;

const manifest = JSON.parse(
  fs.readFileSync(`output/siman_${SIMAN}/manifest.json`, "utf8")
);
const slugList =
  slugs ||
  manifest.sources.filter((s) => s.totalBlocks > 0).map((s) => s.slug);

for (const slug of slugList) {
  const dir = `output/siman_${SIMAN}/${slug}`;
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
  const out = `pipeline/_${slug.replace(/-/g, "_")}${SIMAN}-he.json`;
  fs.writeFileSync(out, JSON.stringify(o, null, 2));
  console.log(slug, n, "->", out);
}
