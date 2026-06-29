import fs from "fs";
import path from "path";
import { collectEditorialBlocks } from "./pipeline/lib/editorial-queue.mjs";
import { parseBlocksInFile } from "./oc001_block_lib.mjs";

const outRoot = path.join(process.cwd(), "output");
const all = collectEditorialBlocks(outRoot, 263, "all", "warn", new Set());
const parts = 9;
const size = Math.ceil(all.length / parts);
const slice = all.slice((9 - 1) * size);

const lines = [];
for (const it of slice) {
  const abs = path.join(outRoot, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) {
    lines.push(`=== MISSING ${it.id} ===`);
    continue;
  }
  const key = `${it.slug}|${it.seif}|${it.marker}`;
  lines.push(`=== ${key} ===`);
  lines.push("HE:");
  lines.push(b.he);
  lines.push("EN:");
  lines.push(b.en);
  lines.push("");
}
fs.writeFileSync("_tmp-part9-dump.txt", lines.join("\n"), "utf8");
console.log(`Wrote ${slice.length} blocks to _tmp-part9-dump.txt`);
