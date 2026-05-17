import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Order matches placeholders top-to-bottom in output/shulchan-arukh-kifshuto/part-001.txt */
const KHC = [];

// --- shard loaders (edit shards/*.mjs) ---
const shards = ["shard-khc-01", "shard-khc-02", "shard-khc-03", "shard-khc-04"];
for (const s of shards) {
  const url = pathToFileURL(path.join(__dirname, `${s}.mjs`)).href;
  const mod = await import(url);
  KHC.push(...mod.default);
}

if (KHC.length !== 100) {
  console.error(`Expected 100 KHC strings, got ${KHC.length}`);
  process.exit(1);
}

const outPath = path.join(__dirname, "khc-en.json");
fs.writeFileSync(outPath, JSON.stringify(KHC, null, 0), "utf8");
console.log(`Wrote ${outPath} (${KHC.length} entries)`);
