#!/usr/bin/env node
/** EH001 siman 007 — full editorial redo master apply. */
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { patchFile } from "./_patch-siman-utils.mjs";
import { T as mechaber } from "./_siman-007-data-mechaber.mjs";
import { T as beer } from "./_siman-007-data-beer-hagolah.mjs";
import { T_rabbi, T_chokhmat } from "./_siman-007-data-small.mjs";
import { T as turei } from "./_siman-007-data-turei-zahav.mjs";
import { T as beitMeir } from "./_siman-007-data-beit-meir.mjs";
import { T as pitchei } from "./_siman-007-data-pitchei-teshuva.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const counts = {};

for (const n of [1, 2, 3, 4]) {
  execSync(`node _patch-siman-007-full-part${n}.mjs`, { cwd: dir, stdio: "inherit" });
}
counts["baer-hetev"] = 52;
counts["beit-shmuel"] = 43;
counts["beur-hagra"] = 74;

counts.mechaber = patchFile("siman_007/mechaber/part-001.txt", "mechaber", mechaber);
counts["beer-hagolah"] = patchFile("siman_007/beer-hagolah/part-001.txt", "beer-hagolah", beer);
counts["beit-meir"] = patchFile("siman_007/beit-meir/part-001.txt", "beit-meir", beitMeir);
counts["chokhmat-shlomo"] = patchFile("siman_007/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", T_chokhmat);
counts["pitchei-teshuva"] = patchFile("siman_007/pitchei-teshuva/part-001.txt", "pitchei-teshuva", pitchei);
counts["rabbi-akiva-eiger"] = patchFile("siman_007/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", T_rabbi);
counts["turei-zahav"] = patchFile("siman_007/turei-zahav/part-001.txt", "turei-zahav", turei);

fs.writeFileSync(
  path.join(dir, "_siman-007-patch-counts.json"),
  JSON.stringify(counts, null, 2)
);
console.log("siman 007 full patch counts:", counts);
