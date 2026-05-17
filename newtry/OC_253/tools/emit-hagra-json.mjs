import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = [];
const shards = ["shard-hagra-01", "shard-hagra-02", "shard-hagra-03"];
for (const s of shards) {
  const url = pathToFileURL(path.join(__dirname, `${s}.mjs`)).href;
  const mod = await import(url);
  out.push(...mod.default);
}
if (out.length !== 72) {
  console.error(`Expected 72 HaGra strings, got ${out.length}`);
  process.exit(1);
}
const outPath = path.join(__dirname, "hagra-en.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 0), "utf8");
console.log(`Wrote ${outPath} (${out.length} entries)`);
