#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const en =
  "(ב) And specifically, etc. The early authorities erred in Shabbos there — specifically for d'rabbanan but not for d'oraisa — this is not so; Ran wrote the sugya is confused, but per his explanation there to exclude something explicit; as Ran wrote in Shevuos that what is not explicit in Torah is called d'rabbanan; see siman 239 seif 6 and see first chapter of Kiddushin 24b and above siman 265 seif 6.";

const fp = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "output/siman_608/beur-hagra/part-001.txt"
);

spawnSync(process.execPath, [path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-one-block.mjs"), fp, "2", "ב", en], {
  stdio: "inherit",
});
