#!/usr/bin/env node
/** worker-slot-5 — apply FIXES to one siman */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { spawnSync } from "child_process";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const dataMod = process.argv[3];
if (!siman || !dataMod) {
  console.error("Usage: node _apply-slot5-siman.mjs N ./path-to-data.mjs");
  process.exit(1);
}

const { FIXES } = await import(pathToFileURL(path.resolve(dataMod)).href);
const base = path.join(__dirname, "..", "output", `siman_${String(siman).padStart(3, "0")}`);
let total = 0;
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);

const queue = path.join(__dirname, "work", `editorial-queue-siman-${siman}.json`);
if (fs.existsSync(queue)) {
  const sync = spawnSync(
    process.execPath,
    [path.join(__dirname, "sync-queue-from-output.mjs"), queue],
    { cwd: path.join(__dirname, ".."), stdio: "inherit" }
  );
  if (sync.status !== 0) process.exit(sync.status ?? 1);
}
