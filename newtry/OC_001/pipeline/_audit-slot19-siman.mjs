#!/usr/bin/env node
/** Audit pending/quality blocks for worker-slot-19 */
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const all = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const qual = collectEditorialBlocks(OUT, siman, "quality", "warn", done);
console.log(JSON.stringify({ siman, pending: all.length, quality: qual.length, ok: all.length - qual.length }));
