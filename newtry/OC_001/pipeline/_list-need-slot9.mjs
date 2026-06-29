#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

for (const siman of process.argv.slice(2).map(Number)) {
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot9.mjs"), String(siman), "--list"],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  const lines = audit.stdout.split("\n");
  const jsonLine = lines.find((l) => l.trim().startsWith("["));
  if (!jsonLine) continue;
  const list = JSON.parse(jsonLine);
  if (list.length) {
    console.log(`\n# siman ${siman} need ${list.length}`);
    console.log(JSON.stringify(list, null, 2));
  }
}
