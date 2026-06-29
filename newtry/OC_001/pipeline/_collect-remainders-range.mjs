#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 244;
const to = parseInt(process.argv[3], 10) || 299;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");
const remainders = [];

for (let siman = from; siman <= to; siman++) {
  const dir = simanOutputDir(OUT, siman);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        remainders.push({
          siman,
          rel: `${slug}/${f}`,
          key: `${b.seif}:${b.marker || "_"}`,
          en: (b.en || "").slice(0, 120),
        });
      }
    }
  }
}

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), `remainders-${from}-${to}.json`);
fs.writeFileSync(outPath, JSON.stringify(remainders, null, 2) + "\n", "utf8");
console.log(`wrote ${outPath} count=${remainders.length}`);
