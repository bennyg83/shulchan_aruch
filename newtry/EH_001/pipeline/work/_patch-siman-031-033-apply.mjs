#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const parts = [
  "_patch-siman-031-full-part1.mjs",
  "_patch-siman-031-full-part2.mjs",
  "_patch-siman-031-full-part3.mjs",
  "_patch-siman-032-full.mjs",
  "_patch-siman-033-full.mjs",
];

let total = 0;
for (const f of parts) {
  const out = execSync(`node "${path.join(__dirname, f)}"`, { cwd: ROOT, encoding: "utf8" });
  process.stdout.write(out);
  for (const m of out.matchAll(/\((\d+) blocks\)/g)) total += Number(m[1]);
}

console.log(`\n=== TOTAL PATCHED: ${total} blocks ===\n`);

for (const sim of ["031", "032", "033"]) {
  console.log(`--- validate siman_${sim} ---`);
  try {
    execSync(`node pipeline/validate-eh001.mjs --root "${path.join(ROOT, "output")}"`, {
      cwd: ROOT,
      stdio: "inherit",
    });
    execSync(
      `node pipeline/validate-quality-eh001.mjs --root "${path.join(ROOT, "output")}" --siman ${Number(sim)} --fail-on error`,
      { cwd: ROOT, stdio: "inherit" }
    );
  } catch (e) {
    process.exitCode = 1;
  }
}

for (const pat of ["Lord's Prayer", "Hashem's Word"]) {
  const r = execSync(
    `rg -c "${pat}" "${path.join(ROOT, "output/siman_031")}" "${path.join(ROOT, "output/siman_032")}" "${path.join(ROOT, "output/siman_033")}" 2>/dev/null || true`,
    { encoding: "utf8", shell: true }
  );
  const sum = r.trim()
    ? r.trim().split("\n").reduce((a, line) => a + Number(line.split(":")[1] || 0), 0)
    : 0;
  console.log(`grep ${pat}: ${sum}`);
}
