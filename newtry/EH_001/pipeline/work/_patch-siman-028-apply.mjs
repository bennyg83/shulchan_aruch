#!/usr/bin/env node
/** Siman 028 apply all patch parts */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const parts = [
  "_patch-siman-028-mechaber.mjs",
  "_patch-siman-028-part1.mjs",
  "_patch-siman-028-part2-notes.mjs",
  "_patch-siman-028-part3-beit-shmuel.mjs",
  "_patch-siman-028-part3-turei-zahav.mjs",
  "_patch-siman-028-part3-beit-meir.mjs",
];

let total = 0;
for (const f of parts) {
  const r = spawnSync("node", [path.join(dir, f)], { encoding: "utf8" });
  process.stdout.write(r.stdout);
  if (r.status !== 0) {
    process.stderr.write(r.stderr);
    process.exit(r.status);
  }
  const m = r.stdout.match(/(\d+) blocks/);
  if (m) total += Number(m[1]);
}
console.log(`siman 028 applied total: ${total} blocks`);
