#!/usr/bin/env node
/** Run MT preflight patches on all txt files in a siman output folder */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchFilePreflight } from "./_slot7-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _preflight-fix-siman-slot7.mjs <siman>");

const dir = path.join(__dirname, "..", "output", `siman_${siman}`);
let total = 0;
for (const slug of fs.readdirSync(dir)) {
  const p = path.join(dir, slug, "part-001.txt");
  if (!fs.existsSync(p)) continue;
  const n = patchFilePreflight(p);
  if (n) {
    console.log(slug, n);
    total += n;
  }
}
console.log("preflight-fixed", total, "blocks in siman", siman);
