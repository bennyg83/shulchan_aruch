#!/usr/bin/env node
/** Pack pipeline/work/trans/sNNN/*.txt into _simanNNN-slot6-manual.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS = path.join(__dirname, "work", "trans");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _pack-slot6-manual.mjs <siman>");

const dir = path.join(TRANS, `s${siman}`);
if (!fs.existsSync(dir)) throw new Error("Missing " + dir);

const FIXES = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
  const [relPart, keyPart] = f.replace(/\.txt$/, "").split("__");
  const rel = relPart.replace(/_/g, "/") + "/part-001.txt";
  const key = keyPart.replace(/_/g, ":");
  if (!FIXES[rel]) FIXES[rel] = {};
  FIXES[rel][key] = fs.readFileSync(path.join(dir, f), "utf8").trim();
}

const out = path.join(__dirname, `_siman${siman}-slot6-manual.mjs`);
const n = Object.values(FIXES).reduce((a, o) => a + Object.keys(o).length, 0);
fs.writeFileSync(
  out,
  `/** worker-slot-6 — siman ${siman} manual fixes (${n} blocks) */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`,
  "utf8"
);
console.log("wrote", out, n, "blocks");
