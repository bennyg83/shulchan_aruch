#!/usr/bin/env node
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES_BY_SIMAN } from "./_manual-fixes-slot9-370-377.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

const only = process.argv[2] ? [Number(process.argv[2])] : null;
for (const siman of (only ?? Object.keys(FIXES_BY_SIMAN).map(Number))) {
  if (!FIXES_BY_SIMAN[siman]) continue;
  const fixes = FIXES_BY_SIMAN[siman];
  const tmp = path.join(__dirname, `_tmp-manual-${siman}-slot9.mjs`);
  const body = `export const FIXES = ${JSON.stringify(fixes, null, 2)};\n`;
  fs.writeFileSync(tmp, body, "utf8");
  console.log("inject siman", siman, Object.values(fixes).reduce((n, o) => n + Object.keys(o).length, 0), "keys");
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, "_inject-hand-en-slot9.mjs"), String(siman), tmp],
    { cwd: OC_ROOT, stdio: "inherit" }
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
}
