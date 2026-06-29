#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T690_LONG } from "./_t690-long.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "_hand-en-690.json");
const prev = JSON.parse(fs.readFileSync(p, "utf8"));
Object.assign(prev, T690_LONG);
fs.writeFileSync(p, JSON.stringify(prev, null, 2) + "\n");
console.log("merged", Object.keys(T690_LONG).length, "total", Object.keys(prev).length);
