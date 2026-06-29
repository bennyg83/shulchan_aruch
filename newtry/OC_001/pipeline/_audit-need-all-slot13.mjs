#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const out = [];

for (const siman of simanim) {
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot13.mjs"), String(siman), "--list"],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  const text = (r.stdout || "").trim();
  const blobs = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{" || ch === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0 && start >= 0) {
        blobs.push(text.slice(start, i + 1));
        start = -1;
      }
    }
  }
  const sum = blobs[0] ? JSON.parse(blobs[0]) : { need: 0 };
  if (!sum.need) continue;
  if (blobs[1]) {
    const list = JSON.parse(blobs[1]);
    const hand = JSON.parse(
      fs.readFileSync(path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`), "utf8")
    );
    for (const n of list) {
      const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
      out.push({
        siman,
        rel: n.rel,
        key: n.key,
        issues: n.issues,
        hePlain: it?.hePlain || "",
        he: it?.he || "",
        enBad: it?.enBad?.slice(0, 200) || n.en,
      });
    }
  }
}

const outPath = path.join(__dirname, "work", "slot13-need-all.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("wrote", outPath, out.length, "blocks");
