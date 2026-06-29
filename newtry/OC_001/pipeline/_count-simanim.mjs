import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const simanim = process.argv.slice(2).map(Number).filter(Boolean);
for (const s of simanim) {
  const dir = path.join(OUT, `siman_${s}`);
  let files = 0,
    blocks = 0;
  for (const slug of fs.readdirSync(dir)) {
    if (slug === "manifest.json") continue;
    for (const f of fs.readdirSync(path.join(dir, slug))) {
      if (!f.endsWith(".txt")) continue;
      files++;
      blocks += parseBlocksInFile(
        fs.readFileSync(path.join(dir, slug, f), "utf8")
      ).length;
    }
  }
  console.log(`siman_${s}: ${files} files, ${blocks} blocks`);
}
