#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
const q = JSON.parse(fs.readFileSync(path.join(__dirname, `he${siman}-queue.json`), "utf8"));
const out = {};
for (const [k, v] of Object.entries(q)) {
  const [slug, sk] = k.split("/");
  const rel = `${slug}/part-001.txt`;
  const [seif, marker] = sk.split(":");
  const key = `${seif}:${marker || "_"}`;
  if (!out[rel]) out[rel] = {};
  out[rel][key] = v.he.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
const p = path.join(__dirname, "work", `_plain-${siman}.json`);
fs.mkdirSync(path.dirname(p), { recursive: true });
fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
console.log(p, Object.keys(out).length, "files");
