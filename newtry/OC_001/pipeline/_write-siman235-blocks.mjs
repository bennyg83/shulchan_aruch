#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_235");
const all = [];
for (const slug of fs.readdirSync(base).sort()) {
  const dir = path.join(base, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
    const rel = `${slug}/${f}`;
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(base, rel), "utf8"));
    for (const b of blocks) {
      all.push({
        rel,
        key: `${b.seif}:${b.marker || "_"}`,
        he: b.he,
      });
    }
  }
}
fs.writeFileSync(
  path.join(__dirname, "_siman235-blocks.json"),
  JSON.stringify({ total: all.length, blocks: all }, null, 2) + "\n",
  "utf8"
);
console.log("wrote", all.length, "blocks");
