#!/usr/bin/env node
/** Count YD001 blocks still on EN placeholder (for automation). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const P = "English translation pending";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || path.join(__dirname, "..", "..", "output"));

let pending = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".txt")) {
      const s = fs.readFileSync(f, "utf8");
      pending += s.split("**** ENGLISH ****").slice(1).filter((z) => z.includes(P)).length;
    }
  }
}

for (const d of fs.readdirSync(root).filter((n) => /^siman_/.test(n))) {
  walk(path.join(root, d));
}
console.log(pending);
