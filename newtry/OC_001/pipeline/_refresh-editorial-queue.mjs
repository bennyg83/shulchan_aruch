#!/usr/bin/env node
/** Refresh full editorial queue for a siman (all warn+ blocks, no max-blocks cap) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _refresh-editorial-queue.mjs <siman>");

const done = loadEditorialDoneIds(WORK);
const items = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const queue = {
  generatedAt: new Date().toISOString(),
  siman,
  part: 1,
  parts: 1,
  scope: "all",
  outRoot: OUT,
  totalInSiman: items.length,
  itemCount: items.length,
  items,
};
const queuePath = path.join(WORK, `editorial-queue-siman-${siman}.json`);
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log("wrote", queuePath, items.length, "blocks");
