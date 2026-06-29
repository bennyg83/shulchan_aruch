#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";

const workDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(workDir, "../..");
const dump = JSON.parse(fs.readFileSync(path.join(workDir, "_siman-038-hebrew-dump.json"), "utf8"));

function fileKey(seif, marker) {
  return `${seif}#${!marker || marker === "_" ? "_" : marker}`;
}
function dumpLookup(slug, seif, marker) {
  const m = marker === "_" || !marker ? "main" : marker;
  return dump[slug]?.find((x) => x.key === `${seif}#${m}` || x.key === `${seif}#${marker}`)?.he ?? "";
}

for (const slug of process.argv.slice(2)) {
  const fp = path.join(ROOT, "output", "siman_038", slug, "part-001.txt");
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  for (const b of blocks) {
    const key = fileKey(b.seif, b.marker);
    const he = dumpLookup(slug, b.seif, b.marker);
    console.log(`--- ${slug} ${key} ---\n${he}\n`);
  }
}
