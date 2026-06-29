#!/usr/bin/env node
/** Merge T files + finish simanim for worker-slot-14 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const simanim = (process.argv[2] || "529-540")
  .split(",")
  .flatMap((x) => {
    if (x.includes("-")) {
      const [a, b] = x.split("-").map(Number);
      const out = [];
      for (let s = a; s <= b; s++) out.push(s);
      return out;
    }
    return [Number(x)];
  });

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

async function loadT(siman) {
  const p = path.join(__dirname, "work", `slot14-T-${siman}.mjs`);
  if (!fs.existsSync(p)) return {};
  const { T } = await import(pathToFileURL(p).href + "?v=" + Date.now());
  return T || {};
}

for (const siman of simanim) {
  if (siman === 535) {
    console.log(`skip ${siman} (already COMPLETE)`);
    continue;
  }
  const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    run("_export-he-slot14.mjs", [String(siman)]);
    run("_seed-hand-slot14-partial.mjs", [String(siman)]);
    run("_force-seed-hand-slot14.mjs", [String(siman)]);
  }
  const T = await loadT(siman);
  const keys = Object.keys(T);
  if (keys.length) {
    const tmp = path.join(__dirname, "work", `_slot14-T-tmp-${siman}.mjs`);
    fs.writeFileSync(tmp, `export const T = ${JSON.stringify(T, null, 2)};\n`, "utf8");
    const m = spawnSync(process.execPath, [path.join(__dirname, "_merge-hand-slot14.mjs"), String(siman), tmp], {
      cwd: OC_ROOT,
      encoding: "utf8",
    });
    fs.unlinkSync(tmp);
    if (m.status !== 0) {
      console.error(m.stdout || m.stderr);
      process.exit(1);
    }
  }
  run("_finish-siman-slot14.mjs", [String(siman)]);
  console.log(`[OK] siman ${siman}`);
}
