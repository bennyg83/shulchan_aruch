#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = 500,
  TO = 697;
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
      const rel = `${slug}/${f}`;
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        items.push({
          siman: s,
          rel,
          key: `${b.seif}:${b.marker || "_"}`,
          en: String(b.en ?? "").trim().slice(0, 100),
          hePlain: plainFromHtml(b.he ?? "").slice(0, 200),
        });
      }
    }
  }
}
const p = path.join(__dirname, "work/bad-500-697-now.json");
fs.writeFileSync(p, JSON.stringify({ count: items.length, items }, null, 2) + "\n");
console.log("wrote", p, items.length);
