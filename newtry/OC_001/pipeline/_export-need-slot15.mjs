#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = [577, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588];
const all = [];
for (const s of simanim) {
  spawnSync("node", ["pipeline/_export-he-slot15.mjs", String(s)], { cwd: path.join(__dirname, ".."), stdio: "pipe" });
  spawnSync("node", ["pipeline/_seed-hand-slot15-partial.mjs", String(s)], { cwd: path.join(__dirname, ".."), stdio: "pipe" });
  const r = spawnSync("node", ["pipeline/_audit-hand-slot15.mjs", String(s), "--list"], {
    cwd: path.join(__dirname, ".."),
    encoding: "utf8",
  });
  const lines = r.stdout.split("\n");
  const start = lines.findIndex((l) => l.trim().startsWith("["));
  if (start >= 0) {
    const arr = JSON.parse(lines.slice(start).join("\n"));
    const hand = JSON.parse(fs.readFileSync(path.join(__dirname, "work", `hand-slot15-siman-${s}.json`), "utf8"));
    for (const n of arr) {
      const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
      all.push({ siman: s, ...n, he: it?.he, hePlain: it?.hePlain });
    }
  }
}
fs.writeFileSync(path.join(__dirname, "work", "need-slot15-577-588.json"), JSON.stringify(all, null, 2) + "\n");
console.log("wrote", all.length, "need blocks");
