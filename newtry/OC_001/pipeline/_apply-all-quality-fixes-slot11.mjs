#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) simanim.push(446, 447, 448, 451, 452);

for (const siman of simanim) {
  console.log("\n=== apply quality fixes", siman, "===");
  const r = spawnSync(process.execPath, [path.join(__dirname, "_apply-quality-fixes-slot11.mjs")], {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    env: { ...process.env, SLOT11_SIMAN: String(siman) },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
