#!/usr/bin/env node
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { T } = await import(pathToFileURL(path.join(__dirname, "_siman392-slot10-all-data.mjs")).href);
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, "work/hand-slot10-siman-392.json"), "utf8"));
const trans = {};
const miss = [];
for (const it of hand.items) {
  const id = `${it.rel}|${it.key}`;
  if (T[id]) trans[id] = T[id];
  else miss.push(id);
}
fs.writeFileSync(path.join(__dirname, "work/trans392-slot10.json"), JSON.stringify(trans, null, 2) + "\n");
console.log("T", Object.keys(T).length, "hand", hand.items.length, "matched", Object.keys(trans).length, "miss", miss.length);
if (miss.length) {
  console.error(miss.join("\n"));
  process.exit(1);
}
