#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = [292, 293, 294, 295, 296, 297, 298, 299];
const handDir = path.join(__dirname, "work");
const all = [];

for (const s of simanim) {
  const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot7.mjs"), String(s), "--list"], {
    encoding: "utf8",
  });
  const raw = r.stdout.trim();
  const idx = raw.indexOf("\n[");
  const list = JSON.parse(idx >= 0 ? raw.slice(idx) : "[]");
  const hand = JSON.parse(fs.readFileSync(path.join(handDir, `hand-slot7-siman-${s}.json`), "utf8"));
  for (const n of list) {
    const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
    all.push({
      siman: s,
      rel: n.rel,
      key: n.key,
      issues: n.issues,
      pf: n.pf,
      hePlain: it?.hePlain ?? n.hePlain,
      enBad: it?.enBad ?? n.en,
    });
  }
}

const out = path.join(handDir, "need-blocks-292-299.json");
fs.writeFileSync(out, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log("wrote", out, all.length, "blocks");
