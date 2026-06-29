#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = +process.argv[2] || 510;
const TO = +process.argv[3] || 600;
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output");

for (let s = FROM; s <= TO; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        console.log("---");
        console.log(`siman_${s}/${slug}/${f} ${b.seif}:${b.marker || "_"}`);
        console.log("HE:", plainFromHtml(b.he).slice(0, 500));
        console.log("EN:", String(b.en).slice(0, 200));
      }
    }
  }
}
