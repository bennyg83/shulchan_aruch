#!/usr/bin/env node
/** List every bad_mt block in range. Usage: node pipeline/_list-bad-mt-range.mjs 510 600 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const FROM = parseInt(process.argv[2], 10) || 510;
const TO = parseInt(process.argv[3], 10) || 600;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

const items = [];
for (let s = FROM; s <= TO; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        items.push({
          siman: s,
          slug,
          seif: b.seif,
          marker: b.marker || "_",
          file: `${slug}/${f}`,
          en: String(b.en ?? "").slice(0, 120),
          he: plainFromHtml(b.he ?? "").slice(0, 200),
        });
      }
    }
  }
}
console.log(JSON.stringify(items, null, 2));
