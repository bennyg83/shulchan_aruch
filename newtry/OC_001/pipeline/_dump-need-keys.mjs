#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`), "utf8")
);
const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot12.mjs"), String(siman), "--list"], {
  encoding: "utf8",
});
const list = JSON.parse(r.stdout.slice(r.stdout.indexOf("[")));
const byKey = new Map(hand.items.map((it) => [`${it.rel}|${it.key}`, it]));
const out = [];
for (const n of list) {
  const it = byKey.get(`${n.rel}|${n.key}`);
  out.push({ k: `${n.rel}|${n.key}`, issues: n.issues, he: it?.hePlain || "" });
}
fs.writeFileSync(path.join(__dirname, "work", `need-keys-${siman}.json`), JSON.stringify(out, null, 2), "utf8");
console.log("wrote", out.length, "keys for siman", siman);
