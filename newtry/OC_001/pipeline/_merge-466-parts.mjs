#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parts = [1, 2, 3, 4].map((n) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `translations466-p${n}.json`), "utf8"))
);
const merged = parts.flat();
if (merged.length !== 159) throw new Error(`expected 159 entries, got ${merged.length}`);
const out = path.join(__dirname, "translations466.json");
fs.writeFileSync(out, JSON.stringify(merged, null, 2));
console.log("wrote", out, merged.length);

spawnSync(process.execPath, ["_gen-fixes-from-json.mjs", "466", "translations466.json"], {
  cwd: __dirname,
  stdio: "inherit",
});
spawnSync(process.execPath, ["_apply-fixes-slot11.mjs", "466"], {
  cwd: __dirname,
  stdio: "inherit",
});
spawnSync(process.execPath, ["_complete-siman-slot11.mjs", "466"], {
  cwd: __dirname,
  stdio: "inherit",
});
