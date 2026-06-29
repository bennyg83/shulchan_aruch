#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { t as mech } from "./mech362-en.mjs";
import { tSmall } from "./_small362-translations.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(path.join(dir, name), lines.join("\n") + "\n", "utf8");
}

emit(mech, "mech362-en.mjs");
emit(tSmall, "small362-en.mjs");
console.log("mech362-en.mjs:", Object.keys(mech).length);
console.log("small362-en.mjs:", Object.keys(tSmall).length);
