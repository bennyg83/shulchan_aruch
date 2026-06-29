#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const a = JSON.parse(fs.readFileSync(path.join(__dirname, "siman433-machatzit.json"), "utf8"));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, "siman433-part2.json"), "utf8"));
const all = { ...a, ...b };
console.log("PART1", Object.keys(a).length);
console.log("PART2", Object.keys(b).length);
console.log("TOTAL", Object.keys(all).length);
const issues = [];
for (const [k, v] of Object.entries(all)) {
  if (/there in the/i.test(v)) issues.push(`${k}: there in the`);
  if (v.length < 8 && !/^[\(\)\d\s\-–—.:,'"]+$/.test(v)) issues.push(`${k}: short ${v.length}`);
  if (/<[^>]+>/.test(v)) issues.push(`${k}: html`);
}
console.log("ISSUES", issues.length ? issues.join("\n") : "none");
