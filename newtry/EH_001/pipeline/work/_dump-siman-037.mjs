#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output", "siman_037");

function stripHtml(h) {
  return String(h ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const dump = {};
const keysBySlug = {};

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".txt") && e.name.startsWith("part-")) {
      const rel = path.relative(path.join(ROOT, "output"), p).replace(/\\/g, "/");
      const blocks = parseBlocksInFile(fs.readFileSync(p, "utf8"));
      for (const b of blocks) {
        const marker = b.marker || "_";
        const key = `${b.seif}#${marker}`;
        if (!dump[b.slug]) dump[b.slug] = {};
        if (!keysBySlug[b.slug]) keysBySlug[b.slug] = [];
        dump[b.slug][key] = { rel, he: stripHtml(b.he), key };
        keysBySlug[b.slug].push(key);
      }
    }
  }
}

walk(OUT);
const work = path.join(ROOT, "pipeline/work");
fs.writeFileSync(path.join(work, "_siman-037-hebrew-dump.json"), JSON.stringify(dump, null, 2));
fs.writeFileSync(path.join(work, "_siman-037-keys.json"), JSON.stringify(keysBySlug, null, 2));
console.log(
  "dumped",
  Object.entries(dump)
    .map(([k, v]) => `${k}:${Object.keys(v).length}`)
    .join(", ")
);
