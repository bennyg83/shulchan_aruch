#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /PLO|UN in Cologne/i,
  /T-shirt/i, /Dr\. D/i, /Delave|Delolla/i, /Saturday/i, /hand recoils/i,
  /first dish/i, /allocated/i, /Shield of Abraham/i, /her age/i, /the craft/i,
  /Darbanan/i, /Israelite/i, /Chametz/i, /hametz/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

for (const n of [441, 445, 449]) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, `he${n}-export.json`), "utf8"));
  console.log("\n=== SIMAN", n, "BAD ===");
  for (const [k, v] of Object.entries(data)) {
    if (isBad(v.en)) console.log("\n---", k, "---\n", v.he.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  }
}
