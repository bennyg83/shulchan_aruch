#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const from = parseInt(process.argv[2], 10) || 386;
const to = parseInt(process.argv[3], 10) || 509;
const all = [];

for (let s = from; s <= to; s++) {
  const r = spawnSync(process.execPath, [path.join(__dirname, "_export-bad-hand.mjs"), String(s)], {
    encoding: "utf8",
  });
  const wp = path.join(__dirname, "work", `hand-slot12-siman-${s}.json`);
  if (!fs.existsSync(wp)) continue;
  const j = JSON.parse(fs.readFileSync(wp, "utf8"));
  if (!j.count) continue;
  for (const it of j.items) all.push({ siman: s, ...it });
}

const out = path.join(__dirname, "he386-509-bad-export.json");
fs.writeFileSync(out, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log("wrote", out, all.length, "blocks");
