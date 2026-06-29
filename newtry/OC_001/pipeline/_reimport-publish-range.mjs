#!/usr/bin/env node
/**
 * Re-import OC001 English and publish simanim in range.
 * Usage: node pipeline/_reimport-publish-range.mjs --from 21 --to 697
 */
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOOLS = path.resolve(ROOT, "..", "..", "Sefaria Pulls", "shulchan-arukh", "Orach_Chayim", "tools");

function parseArgs() {
  let from = 21;
  let to = 697;
  let publish = true;
  let onlyTouched = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--import-only") publish = false;
    else if (a[i] === "--only-touched") onlyTouched = true;
  }
  return { from, to, publish, onlyTouched };
}

function loadTouchedList() {
  const p = path.join(ROOT, "pipeline", "work", "seif-fix-touched-simanim.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")).simanim || [];
}

function run(script, args, label) {
  const r = spawnSync(process.execPath, [script, ...args], {
    cwd: TOOLS,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(`FAILED ${label}\n${(r.stderr || r.stdout || "").slice(-2000)}`);
    return false;
  }
  return true;
}

const { from, to, publish, onlyTouched } = parseArgs();
const importScript = path.join(TOOLS, "import-oc001-english-to-seif-en.mjs");
const publishScript = path.join(TOOLS, "publish-oc-siman.mjs");

let simanim = [];
for (let s = from; s <= to; s++) simanim.push(s);
if (onlyTouched) {
  const list = loadTouchedList();
  if (!list?.length) {
    console.error("Missing pipeline/work/seif-fix-touched-simanim.json — run _list-seif-header-simanim.mjs first");
    process.exit(1);
  }
  simanim = list.filter((s) => s >= from && s <= to);
  console.log(`--only-touched: ${simanim.length} simanim`);
}

let ok = 0;
let fail = 0;
for (const s of simanim) {
  const sub = `siman_${String(s).padStart(3, "0")}`;
  process.stdout.write(`siman ${s} import… `);
  if (
    !run(importScript, ["--siman", String(s), "--oc001-subdir", sub], `import ${s}`)
  ) {
    fail++;
    console.log("FAIL");
    continue;
  }
  if (publish) {
    if (
      !run(
        publishScript,
        ["--siman", String(s), "--skip-rebuild", "--skip-hebrew"],
        `publish ${s}`
      )
    ) {
      fail++;
      console.log("import OK, publish FAIL");
      continue;
    }
  }
  ok++;
  console.log("OK");
}
console.log(`\nDone: ${ok} ok, ${fail} failed (${from}–${to})`);
