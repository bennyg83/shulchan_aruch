#!/usr/bin/env node
/**
 * Run corpus retranslate waves with progress logging.
 *   node pipeline/work/_corpus-cleanup-wave.mjs mt_garbage
 *   node pipeline/work/_corpus-cleanup-wave.mjs hebrew_in_english,untranslated_copy
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PROGRESS = path.join(ROOT, "progress.log");
const codes = process.argv[2] || "mt_garbage";
const workers = process.argv[3] || "6";
const ms = process.argv[4] || "800";

function doneSiman(n) {
  const tag = `siman_${String(n).padStart(3, "0")}`;
  return fs.existsSync(PROGRESS) && fs.readFileSync(PROGRESS, "utf8").includes(`${tag} ${codes} retranslate DONE`);
}

function log(msg) {
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "");
  fs.appendFileSync(PROGRESS, `${ts} ${msg}\n`);
  console.log(msg);
}

for (let n = 1; n <= 403; n++) {
  if (doneSiman(n)) {
    console.log(`[SKIP] siman ${n}`);
    continue;
  }
  const tag = String(n).padStart(3, "0");
  const r = spawnSync(
    process.execPath,
    [
      path.join(ROOT, "pipeline/work/_corpus-retranslate-errors.mjs"),
      "--from",
      String(n),
      "--to",
      String(n),
      "--codes",
      codes,
      "--workers",
      workers,
      "--ms",
      ms,
    ],
    { cwd: ROOT, encoding: "utf8", stdio: "pipe" }
  );
  const out = (r.stdout || "") + (r.stderr || "");
  const m = out.match(/retranslated (\d+) blocks/);
  const count = m ? +m[1] : 0;
  if (count > 0 || out.includes("retranslated 0 blocks")) {
    log(`siman_${tag} ${codes} retranslate DONE (${count} blocks)`);
  } else if (r.status !== 0) {
    console.error(`[FAIL] siman ${n}`, out.slice(-500));
    break;
  }
}

console.log("[WAVE DONE]", codes);
