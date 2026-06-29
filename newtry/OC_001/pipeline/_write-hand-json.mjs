#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const s of [527, 548, 551]) {
  const mod = await import(`./hand${s}-en.mjs`);
  const p = path.join(__dirname, `_hand-en-${s}.json`);
  fs.writeFileSync(p, JSON.stringify(mod.HAND, null, 2) + "\n");
  console.log(p, Object.keys(mod.HAND).length);
}
