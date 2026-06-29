#!/usr/bin/env node
/** Build mech363-en.mjs + small363-en.mjs from batchA MECH, part3 T3, and _en363-slugs JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const k of Object.keys(obj).sort()) lines.push(`  ${JSON.stringify(k)}: \`${esc(obj[k])}\`,`);
  lines.push("};", "");
  fs.writeFileSync(path.join(dir, name), lines.join("\n"), "utf8");
  return Object.keys(obj).length;
}

const { MECH } = await import(pathToFileURL(path.join(dir, "_siman363-batchA-data.mjs")).href + `?t=${Date.now()}`);
const { T3 } = await import(pathToFileURL(path.join(dir, "_363-translations-data-part3.mjs")).href + `?t=${Date.now()}`);

const SMALL = { ...T3 };
const slugDir = path.join(dir, "_en363-slugs");
for (const file of fs.readdirSync(slugDir).filter((f) => f.endsWith(".json"))) {
  const slug = file.replace(/\.json$/, "");
  const tr = JSON.parse(fs.readFileSync(path.join(slugDir, file), "utf8"));
  for (const [k, v] of Object.entries(tr)) SMALL[`${slug}:${k}`] = v;
}

const missing = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith("363-he.json") && !x.includes("mechaber"))) {
  const slug = f.replace(/^_/, "").replace(/363-he\.json$/, "").replace(/_/g, "-");
  const he = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(full in SMALL)) missing.push(full);
  }
}

emit(MECH, "mech363-en.mjs");
const n = emit(SMALL, "small363-en.mjs");
console.log(`mech363-en.mjs: ${Object.keys(MECH).length}`);
console.log(`small363-en.mjs: ${n}`);
console.log(`missing: ${missing.length}`);
if (missing.length) {
  console.error(missing.slice(0, 30).join("\n"));
  process.exit(1);
}
