#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

function countSiman(siman) {
  const tag = String(siman).padStart(3, "0");
  const root = path.join(OUT, `siman_${tag}`);
  if (!fs.existsSync(root)) return 0;
  let c = 0;
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/^part-.*\.txt$/.test(e.name)) {
        for (const b of parseBlocksInFile(fs.readFileSync(p, "utf8")))
          if (String(b.he ?? "").trim()) c++;
      }
    }
  }
  walk(root);
  return c;
}

for (const s of simanim) console.log(s, countSiman(s));
