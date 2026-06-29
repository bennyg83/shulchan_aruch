import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const BAD =
  /impeached|High Court|Hmm:|USSR|Hashem's Word|Holy One to say|kites|Reporter, India|fed up|my knees|post-consumption|pre-consumption|epicoman|ovary|IDF |charcoal|Attorney|drunken household|\bTJ:|She drinks for the reason|Changes to the KJ|A\.D\. is another/i;

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

for (const s of simanim) {
  const dir = path.join(OUT, `siman_${s}`);
  for (const slug of fs.readdirSync(dir)) {
    if (slug === "manifest.json") continue;
    for (const f of fs.readdirSync(path.join(dir, slug))) {
      if (!f.endsWith(".txt")) continue;
      const rel = `${slug}/${f}`;
      const blocks = parseBlocksInFile(
        fs.readFileSync(path.join(dir, slug, f), "utf8")
      );
      for (const b of blocks) {
        const en = String(b.en || "");
        const enP = plainFromHtml(en);
        const heP = plainFromHtml(b.he);
        if (
          BAD.test(en) ||
          (enP.length < heP.length * 0.35 && heP.length > 60)
        ) {
          const key = `${b.seif}:${b.marker || "_"}`;
          console.log(`--- siman_${s} ${rel} ${key} ---`);
          console.log(heP.slice(0, 500));
        }
      }
    }
  }
}
