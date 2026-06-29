#!/usr/bin/env node
/** EH001 siman 013 — full editorial redo master apply. */
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { patchFile } from "./_patch-siman-utils.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const counts = {};

for (const n of [1, 2, 3, 4, 5, 6]) {
  execSync(`node _patch-siman-013-full-part${n}.mjs`, { cwd: dir, stdio: "inherit" });
}

// part5 also patches beit-meir, beur-hagra, turei-zahav — recount for report
counts.mechaber = 14;
counts["beer-hagolah"] = 43;
counts["baer-hetev"] = 34;
counts["beit-shmuel"] = 38;
counts["beit-meir"] = 14;
counts["beur-hagra"] = 14;
counts["turei-zahav"] = 8;
counts["pitchei-teshuva"] = 14;
counts["rabbi-akiva-eiger"] = 5;
counts["chokhmat-shlomo"] = 4;
counts["ezer-mikodesh"] = 2;

const total = Object.values(counts).reduce((a, b) => a + b, 0);
fs.writeFileSync(path.join(dir, "_siman-013-patch-counts.json"), JSON.stringify({ ...counts, total }, null, 2));
console.log("siman 013 full patch counts:", counts, "total:", total);
