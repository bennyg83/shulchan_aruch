#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const siman of simans) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        const p = BAD_MT_447.filter((re) => re.test(b.en)).map((re) => re.source);
        console.log(`siman_${siman}`, `${slug}/${f}`, `${b.seif}:${b.marker || "_"}`, p.join("|"));
        console.log(" ", b.en.slice(0, 120));
      }
    }
  }
}
