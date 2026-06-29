#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const exp = {
  529: 96, 530: 24, 531: 135, 532: 30, 533: 103, 534: 72, 535: 37,
  536: 56, 537: 227, 538: 86, 539: 232, 540: 136,
};
const log = fs.readFileSync(path.join(__dirname, "..", "progress.log"), "utf8");
for (const s of Object.keys(exp).map(Number).sort((a, b) => a - b)) {
  const dir = path.join(OUT, `siman_${s}`);
  let n = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(dir, ent.name))) {
      if (!f.endsWith(".txt")) continue;
      n += parseBlocksInFile(
        fs.readFileSync(path.join(dir, ent.name, f), "utf8")
      ).length;
    }
  }
  const done = log.includes(`worker-slot-14 siman_${s} COMPLETE`);
  console.log(`${s}\t${n}\t${exp[s] === n ? "OK" : "MISMATCH"}\t${done ? "COMPLETE" : "—"}`);
}
