import path from "path";
import { collectEditorialBlocks } from "./pipeline/lib/editorial-queue.mjs";

const outRoot = path.join(process.cwd(), "output");
const all = collectEditorialBlocks(outRoot, 263, "all", "warn", new Set());
const parts = 9;
const size = Math.ceil(all.length / parts);
const slice = all.slice((9 - 1) * size);
console.log("total", all.length, "size", size, "part9 count", slice.length);
for (const it of slice) {
  console.log(JSON.stringify({ slug: it.slug, seif: it.seif, marker: it.marker, id: it.id }));
}
