#!/usr/bin/env node
/** Run slot5 loop for simanim range: node _run-slot5-range.mjs 221 226 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const from = parseInt(process.argv[2], 10);
const to = parseInt(process.argv[3], 10);
if (!from || !to) throw new Error("Usage: _run-slot5-range.mjs <from> <to>");

for (let s = from; s <= to; s++) {
  console.log(`\n######## siman ${s} ########`);
  const r = spawnSync(process.execPath, [path.join(__dirname, "_run-slot5-siman-loop.mjs"), String(s)], {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
  });
  if (r.status !== 0) {
    console.error(`FAILED siman ${s}`);
    process.exit(r.status ?? 1);
  }
}
console.log(`\nRange ${from}-${to} done`);
