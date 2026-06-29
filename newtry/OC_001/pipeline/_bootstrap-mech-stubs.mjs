#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (const s of [686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697]) {
  const p = path.join(__dirname, `mech${s}-en.mjs`);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, `/** OC siman ${s} — mechaber */\nexport const t = {};\n`);
    console.log("created", p);
  }
}
