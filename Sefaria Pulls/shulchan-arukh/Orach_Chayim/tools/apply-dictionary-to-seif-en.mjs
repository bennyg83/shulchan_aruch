/**
 * Run in-house glossary on every en.html under simanim/NNN/seif-NNN/.
 * Usage: node tools/apply-dictionary-to-seif-en.mjs --siman 1 --seif 1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const dictTool = path.join(__dirname, "apply-inhouse-dictionary-to-html.mjs");

function parseArgs() {
  let siman = 1,
    seif = 1;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    if (a[i] === "--seif" && a[i + 1]) seif = Number(a[++i]);
  }
  return { siman, seif };
}

const pad = (n) => String(n).padStart(3, "0");
const { siman, seif } = parseArgs();
const seifDir = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`);

for (const name of fs.readdirSync(seifDir, { withFileTypes: true })) {
  if (!name.isDirectory()) continue;
  const enPath = path.join(seifDir, name.name, "en.html");
  if (!fs.existsSync(enPath)) continue;
  const r = spawnSync(process.execPath, [dictTool, "--in", enPath], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const out = (r.stdout || "").trim();
  const err = (r.stderr || "").trim();
  console.log(name.name + ":", out || err || (r.status === 0 ? "ok" : `exit ${r.status}`));
}
