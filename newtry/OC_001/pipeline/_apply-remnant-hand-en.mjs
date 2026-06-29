#!/usr/bin/env node
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES } from "./_siman-remnant-hand-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apply = path.join(__dirname, "_apply-hand-en-siman.mjs");

for (const siman of Object.keys(FIXES)) {
  const mod = path.join(__dirname, `_siman${siman}-remnant-tmp.mjs`);
  fs.writeFileSync(
    mod,
    `export const FIXES = ${JSON.stringify(FIXES[siman], null, 2)};\n`
  );
  const r = spawnSync(process.execPath, [apply, siman, mod], { stdio: "inherit" });
  fs.unlinkSync(mod);
  if (r.status !== 0) process.exit(r.status ?? 1);
}
