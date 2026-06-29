#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", `siman_${siman}`);
const out = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (!isBadMt447(b.en)) continue;
      const id = `${slug}/${b.seif}:${b.marker || "_"}`;
      out[id] = { he: plainFromHtml(b.he), file: `${slug}/${f}`, seif: b.seif, marker: b.marker || "_" };
    }
  }
}
console.log(JSON.stringify(out, null, 2));
