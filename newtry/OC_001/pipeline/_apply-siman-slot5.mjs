#!/usr/bin/env node
/** Apply FIXES export for worker-slot-5 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { spawnSync } from "child_process";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const siman = Number(process.argv[2]);
const dataMod = process.argv[3];
if (!siman || !dataMod) {
  console.error("usage: node _apply-siman-slot5.mjs <siman> <data-module-path>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.isAbsolute(dataMod) ? dataMod : path.join(__dirname, dataMod);
const { FIXES } = await import(pathToFileURL(dataPath).href);
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

const sync = spawnSync(
  process.execPath,
  [
    path.join(__dirname, "sync-queue-from-output.mjs"),
    path.join(__dirname, "work", `editorial-queue-siman-${siman}.json`),
  ],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
