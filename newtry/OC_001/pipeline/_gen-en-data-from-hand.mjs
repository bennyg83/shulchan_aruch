#!/usr/bin/env node
/** Emit _simanNNN-en-data.mjs skeleton from hand JSON for manual/AI fill */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`), "utf8")
);
const lines = [`/** OC siman ${siman} — ${hand.count} blocks — FILL translations */`, "export const T = {"];
for (const it of hand.items) {
  const rk = `${it.rel}:${it.key}`;
  const esc = JSON.stringify("TODO");
  lines.push(`  ${JSON.stringify(rk)}: ${esc},`);
}
lines.push("};", "");
const out = path.join(__dirname, `_siman${siman}-en-data.mjs`);
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log("wrote", out, hand.count, "TODO entries");
