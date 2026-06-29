#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
const dir = simanOutputDir(path.join(__dirname, "..", "output"), siman);
for (const slug of fs.readdirSync(dir)) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (!isBadMt447(b.en)) continue;
      console.log(slug, `${b.seif}:${b.marker}`, BAD_MT_447.filter((re) => re.test(b.en)).map((r) => r.source).join("; "));
      console.log(b.en.slice(0, 300));
      console.log("---");
    }
  }
}
