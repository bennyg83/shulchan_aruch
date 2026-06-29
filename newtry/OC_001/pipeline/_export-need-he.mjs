#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot12.mjs"), String(siman), "--list"], {
  encoding: "utf8",
});
const idx = r.stdout.indexOf("[");
const need = JSON.parse(r.stdout.slice(idx));
const byKey = new Map(hand.items.map((it) => [`${it.rel}|${it.key}`, it]));
for (const n of need) {
  const it = byKey.get(`${n.rel}|${n.key}`);
  console.log("---", n.rel, n.key, n.issues);
  console.log(it?.hePlain || it?.he || "");
}
