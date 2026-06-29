#!/usr/bin/env node
/** Refresh editorial queue item rawBlocks from current output files. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const queuePath = process.argv[2];
if (!queuePath) throw new Error("Usage: node _refresh-queue-from-disk.mjs <queue.json>");

const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
let n = 0;
for (const it of q.items || []) {
  const raw = fs.readFileSync(it.absPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  const b = blocks.find(
    (x) =>
      String(x.slug) === String(it.slug) &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker)
  );
  if (!b) throw new Error(`Block missing on disk: ${it.id}`);
  it.rawBlock = serializeBlock(b);
  n++;
}
q.refreshedAt = new Date().toISOString();
fs.writeFileSync(queuePath, JSON.stringify(q, null, 2), "utf8");
console.log(`Refreshed ${n} items in ${queuePath}`);
