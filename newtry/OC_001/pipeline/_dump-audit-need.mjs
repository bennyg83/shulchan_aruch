#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot12.mjs"), String(siman), "--list"], {
  encoding: "utf8",
});
const idx = r.stdout.indexOf("[");
const list = JSON.parse(r.stdout.slice(idx));
for (const x of list) {
  console.log(JSON.stringify({ rel: x.rel, key: x.key, issues: x.issues, he: x.hePlain?.slice(0, 200) }));
}
