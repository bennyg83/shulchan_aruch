#!/usr/bin/env node
/** node _export-hand-from-output.mjs 376 > en376-base.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const queue = JSON.parse(
  fs.readFileSync(path.join(__dirname, `he${siman}-queue.json`), "utf8")
);
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
const hand = {};
for (const [fullKey, meta] of Object.entries(queue)) {
  const fp = path.join(base, meta.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find((x) => `${x.seif}:${x.marker || "_"}` === meta.blockKey);
  hand[fullKey] = b?.en ?? "";
}
const out = path.join(__dirname, `en${siman}-base.json`);
fs.writeFileSync(out, JSON.stringify(hand, null, 2) + "\n");
console.error("wrote", out, Object.keys(hand).length);
