#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T688_LONG_P1 } from "./_t688-long-p1.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "_hand-en-688.json");
const prev = JSON.parse(fs.readFileSync(p, "utf8"));
Object.assign(prev, T688_LONG_P1);
fs.writeFileSync(p, JSON.stringify(prev, null, 2) + "\n");
console.log("merged", Object.keys(T688_LONG_P1).length);
