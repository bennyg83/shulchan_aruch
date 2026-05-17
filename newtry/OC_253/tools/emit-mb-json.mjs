import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = [];
const shards = ["shard-mb-01", "shard-mb-02", "shard-mb-03", "shard-mb-04", "shard-mb-05"];
for (const s of shards) {
  const url = pathToFileURL(path.join(__dirname, `${s}.mjs`)).href;
  const mod = await import(url);
  out.push(...mod.default);
}
if (out.length !== 105) {
  console.error(`Expected 105 MB strings, got ${out.length}`);
  process.exit(1);
}
const outPath = path.join(__dirname, "mb-en.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 0), "utf8");
console.log(`Wrote ${outPath} (${out.length} entries)`);
