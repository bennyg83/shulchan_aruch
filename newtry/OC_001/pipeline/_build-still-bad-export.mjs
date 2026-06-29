#!/usr/bin/env node
/** Build heNNN-bad-export.json from STILL_BAD lines in mt log */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const logPath = process.argv[2];
const siman = Number(process.argv[3]);
if (!logPath || !siman) {
  console.error("usage: _build-still-bad-export.mjs log.txt 128");
  process.exit(1);
}

const log = fs.readFileSync(logPath, "utf8");
const keys = new Set();
for (const line of log.split("\n")) {
  const m = line.match(/STILL_BAD ([^/]+)\/([^:]+):(.)/);
  if (!m) continue;
  keys.add(`${m[1]}:${m[2]}:${m[3]}`);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const dir = path.join(ROOT, "output", `siman_${siman}`);
const exp = {};

for (const key of keys) {
  const parts = key.split(":");
  const marker = parts.pop();
  const seif = parts.pop();
  const slug = parts.join(":");
  const slugDir = path.join(dir, slug);
  if (!fs.existsSync(slugDir)) continue;
  for (const f of fs.readdirSync(slugDir).filter((x) => x.endsWith(".txt"))) {
    const rel = `${slug}/${f}`;
    const fp = path.join(slugDir, f);
    for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
      const k = `${b.seif}:${b.marker || "_"}`;
      if (String(b.seif) !== String(seif) || String(b.marker || "_") !== String(marker || "_"))
        continue;
      const id = `${rel}:${k}`;
      exp[id] = {
        he: plainFromHtml(b.he ?? ""),
        en: String(b.en ?? "").trim(),
        file: rel,
        seif: b.seif,
        marker: b.marker || "_",
      };
    }
  }
}

const outPath = path.join(__dirname, `he${siman}-bad-export.json`);
fs.writeFileSync(outPath, JSON.stringify(exp, null, 2) + "\n", "utf8");
console.log("wrote", outPath, Object.keys(exp).length);
