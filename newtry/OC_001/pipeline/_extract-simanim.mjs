#!/usr/bin/env node
/** Extract Hebrew blocks: node _extract-simanim.mjs 374 375 376 377 378 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = process.argv.slice(2).map((n) => parseInt(n, 10)).filter(Boolean);
if (!simanim.length) {
  console.error("Usage: node _extract-simanim.mjs <siman> ...");
  process.exit(1);
}

for (const siman of simanim) {
  const dir = path.join(__dirname, "..", "output", `siman_${siman}`);
  const queue = {};
  for (const slug of fs.readdirSync(dir).sort()) {
    const fp = path.join(dir, slug, "part-001.txt");
    if (!fs.existsSync(fp)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
      const key = `${slug}/${b.seif}:${b.marker || "_"}`;
      queue[key] = { he: plainFromHtml(b.he), file: `${slug}/part-001.txt`, blockKey: `${b.seif}:${b.marker || "_"}` };
    }
  }
  const outPath = path.join(__dirname, `he${siman}-queue.json`);
  fs.writeFileSync(outPath, JSON.stringify(queue, null, 2) + "\n");
  console.log(`siman_${siman}`, Object.keys(queue).length, "→", outPath);
}
