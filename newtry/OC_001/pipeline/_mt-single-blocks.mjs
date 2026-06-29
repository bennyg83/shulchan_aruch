#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mt = await import(pathToFileURL(path.join(__dirname, "_mt-retranslate-bad-siman.mjs")).href).catch(() => null);

// Re-use translate from bad-siman by spawning per block
import { spawnSync } from "child_process";

for (const { siman, rel, key, he } of jobs) {
  const expPath = path.join(__dirname, `_one-${siman}-${key.replace(/:/g, "-")}.json`);
  const [seif, marker] = key.split(":");
  fs.writeFileSync(
    expPath,
    JSON.stringify({
      [rel + ":" + key]: { he, en: "", file: rel, seif, marker: marker || "_" },
    }),
    "utf8"
  );
  const tmp = path.join(__dirname, `he${siman}-bad-export.json`);
  const bak = fs.existsSync(tmp) ? fs.readFileSync(tmp, "utf8") : null;
  fs.copyFileSync(expPath, tmp);
  spawnSync(process.execPath, [path.join(__dirname, "_mt-retranslate-bad-siman.mjs"), String(siman)], {
    stdio: "inherit",
  });
  if (bak) fs.writeFileSync(tmp, bak);
  else fs.unlinkSync(tmp);
  fs.unlinkSync(expPath);
  const fp = path.join(__dirname, "..", "output", `siman_${siman}`, rel);
  const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
    (x) => `${x.seif}:${x.marker || "_"}` === key
  );
  console.log(key, isBadMt447(b?.en) ? "STILL_BAD" : "ok", (b?.en || "").slice(0, 80));
}
