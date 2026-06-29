#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(
  fs.readFileSync(path.join(dir, "_mishnah_berurah363-he.json"), "utf8")
);

const chunks = ["_mb363-t3-chunk1.json", "_mb363-t3-chunk2.json", "_mb363-t3-chunk3.json", "_mb363-t3-chunk4.json"];
const en = {};
for (const f of chunks) {
  Object.assign(en, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
}

const keys = Object.keys(he);
const missing = keys.filter((k) => !(k in en));
const extra = Object.keys(en).filter((k) => !(k in he));
if (missing.length || extra.length) {
  console.error("missing", missing);
  console.error("extra", extra);
  process.exit(1);
}

const lines = ['/** OC siman 363 — Mishna Berurah (157 keys) */', "export const T3 = {"];
for (const k of keys) {
  const full = `mishnah-berurah:${k}`;
  const v = en[k].replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  lines.push(`  "${full}": \`${v}\`,`);
}
lines.push("};");
lines.push("");

const out = path.join(dir, "_363-translations-data-part3.mjs");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
console.log(`Keys: ${keys.length}`);
