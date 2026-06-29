#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const simanim = [599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

for (const s of simanim) {
  spawnSync(process.execPath, [path.join(__dirname, "_export-he-slot16.mjs"), String(s)], {
    cwd: OC,
    stdio: "pipe",
  });
  spawnSync(process.execPath, [path.join(__dirname, "_gen-fixes-siman-slot16-from-en.mjs"), String(s)], {
    cwd: OC,
    stdio: "pipe",
  });
  const fixes = path.join(__dirname, `_fixes-siman${s}-slot16.mjs`);
  if (fs.existsSync(fixes)) {
    spawnSync(process.execPath, [path.join(__dirname, "_inject-hand-en-slot16.mjs"), String(s), fixes], {
      cwd: OC,
      stdio: "pipe",
    });
  }
  spawnSync(process.execPath, [path.join(__dirname, "_seed-hand-slot16-partial.mjs"), String(s)], {
    cwd: OC,
    stdio: "pipe",
  });
  spawnSync(process.execPath, [path.join(__dirname, "_force-seed-hand-slot16.mjs"), String(s)], {
    cwd: OC,
    stdio: "pipe",
  });
  const r = spawnSync(process.execPath, [path.join(__dirname, "_audit-hand-slot16.mjs"), String(s)], {
    cwd: OC,
    encoding: "utf8",
  });
  const j = JSON.parse(r.stdout);
  console.log(`${s}\t${j.total}\t${j.ok}\t${j.need}`);
}
