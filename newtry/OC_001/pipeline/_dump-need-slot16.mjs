#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = [];
for (const s of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot16-siman-${s}.json`), "utf8")
  );
  const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot16.mjs"), String(s), "--list"], {
    encoding: "utf8",
  });
  const idx = r.stdout.indexOf("\n[");
  const needList = JSON.parse(r.stdout.slice(idx + 1));
  for (const n of needList) {
    const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
    out.push({ siman: s, ...n, he: it?.he, hePlain: it?.hePlain, enBad: it?.enBad });
  }
}
fs.writeFileSync(path.join(__dirname, "work", "need-slot16-all.json"), JSON.stringify(out, null, 2));
console.log("wrote", out.length, "items");
