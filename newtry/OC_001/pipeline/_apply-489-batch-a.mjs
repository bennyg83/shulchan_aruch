#!/usr/bin/env node
/** Apply batch A: mechaber first, then all batch-A slugs from trans-siman489-a.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transPath = path.join(__dirname, "work", "trans-siman489-a.json");
const trans = JSON.parse(fs.readFileSync(transPath, "utf8"));

const mechOnly = {};
for (const [rel, keys] of Object.entries(trans)) {
  if (!rel.startsWith("mechaber/")) continue;
  mechOnly[rel] = keys;
}
const mechTmp = path.join(__dirname, "work", "trans-siman489-a-mechaber.json");
fs.writeFileSync(mechTmp, JSON.stringify(mechOnly, null, 2) + "\n", "utf8");

function run(label, file) {
  console.log("===", label, "===");
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, "_apply-cursor-translations.mjs"), "489", file],
    { stdio: "inherit", cwd: path.join(__dirname, "..") }
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("mechaber", mechTmp);
run("batch A all slugs", transPath);
