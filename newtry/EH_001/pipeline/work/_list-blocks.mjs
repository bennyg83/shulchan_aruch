#!/usr/bin/env node
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import fs from "fs";
import path from "path";

function stripHtml(h) {
  return h
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/<br>/g, " ")
    .trim();
}

const sim = Number(process.argv[2] || 29);
const dir = path.join("../../output", `siman_${String(sim).padStart(3, "0")}`);
const rows = [];

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".txt") && e.name.startsWith("part-")) {
      const rel = path.relative("../../output", p).replace(/\\/g, "/");
      const blocks = parseBlocksInFile(fs.readFileSync(p, "utf8"));
      for (const b of blocks) {
        const marker = b.marker || "main";
        rows.push({
          rel,
          slug: b.slug,
          key: `${b.seif}#${marker}`,
          he: stripHtml(b.hebrew).slice(0, 150),
        });
      }
    }
  }
}

walk(path.resolve(import.meta.dirname, dir));
console.log(`siman ${sim} total ${rows.length}`);
for (const r of rows) console.log(`${r.rel}\t${r.slug}\t${r.key}\t| ${r.he}`);
