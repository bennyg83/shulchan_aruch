#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const sim = process.argv[2];
if (!sim) {
  console.error("usage: node _dump-blocks.mjs siman_357");
  process.exit(1);
}
const base = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", sim);
function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".txt")) out.push(p);
  }
  return out.sort();
}
for (const fp of walk(base)) {
  const rel = path.relative(base, fp).replace(/\\/g, "/");
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    console.log(`--- ${rel} | ${key} | ${b.slug} ---`);
    console.log(plainFromHtml(b.he).slice(0, 500));
    console.log();
  }
}
