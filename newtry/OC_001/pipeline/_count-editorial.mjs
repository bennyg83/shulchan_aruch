#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const exp = {
  564: 35, 565: 104, 566: 131, 567: 62, 568: 242, 569: 38, 570: 60,
  571: 37, 572: 33, 573: 28, 574: 66, 575: 175, 576: 180,
};
for (const s of Object.keys(exp).map(Number).sort((a, b) => a - b)) {
  const n = collectEditorialBlocks(OUT, s, "all", "warn", done).length;
  console.log(`${s}\t${n}\t${exp[s] === n ? "OK" : "MISMATCH exp " + exp[s]}`);
}
