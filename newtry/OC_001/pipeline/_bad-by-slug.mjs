#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const siman = Number(process.argv[2]);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(ROOT, `output/siman_${siman}`);
const bySlug = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  let bad = 0,
    total = 0;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      total++;
      if (isBadMt447(b.en)) bad++;
    }
  }
  if (bad) bySlug[slug] = { bad, total };
}
console.log(JSON.stringify(bySlug, null, 2));
