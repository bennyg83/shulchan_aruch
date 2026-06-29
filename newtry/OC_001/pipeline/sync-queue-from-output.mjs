#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, blockKey, serializeBlock } from "../oc001_block_lib.mjs";

const queuePath = process.argv[2];
if (!queuePath) throw new Error("Usage: sync-queue-from-output.mjs <queue.json>");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of q.items || []) {
  const m = it.id.match(/^siman_\d+\/([^/]+)\/([^#]+)#/);
  if (!m) continue;
  const fp = path.join(OUT, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) => blockKey(x.slug, x.seif, x.marker) === blockKey(it.slug, it.seif, it.marker)
  );
  if (b) it.rawBlock = serializeBlock(b).trimEnd() + "\n";
}
fs.writeFileSync(queuePath, JSON.stringify(q, null, 2), "utf8");
console.log("Synced", (q.items || []).length, "items");
