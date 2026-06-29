#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const maps = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
// maps: [{ slug, module }]
const missing = [];

for (const { slug, module: modPath } of maps) {
  const t = (await import(path.resolve(modPath))).t;
  const dir = `output/siman_308/${slug}`;
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
        const key = `${b.seif}:${b.marker}`;
        const en = t[key];
        if (!en) missing.push(`${slug}:${key}`);
        return en ? { ...b, en } : b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out);
    count += blocks.length;
  }
  console.log(slug, count);
}
console.log("missing:", missing.length);
if (missing.length) {
  console.log(missing.slice(0, 50).join("\n"));
  if (missing.length > 50) console.log(`... +${missing.length - 50} more`);
  process.exit(1);
}
