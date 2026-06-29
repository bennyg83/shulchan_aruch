#!/usr/bin/env node
/** EH001 siman 011 — full editorial redo master apply. */
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const counts = {};

for (const n of [1, 2, 3, 4, 5]) {
  const out = execSync(`node _patch-siman-011-full-part${n}.mjs`, { cwd: dir, encoding: "utf8" });
  const m = out.match(/OK siman_011\/([^/]+)\/part-\d+\.txt \((\d+) blocks\)/g);
  if (m) {
    for (const line of m) {
      const [, slug, nBlocks] = line.match(/OK siman_011\/([^/]+)\/.*\((\d+) blocks\)/);
      counts[slug] = (counts[slug] || 0) + Number(nBlocks);
    }
  }
}

console.log("siman 011 full patch counts:", counts);
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log("total blocks patched:", total);
