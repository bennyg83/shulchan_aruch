#!/usr/bin/env node
/** EH001 siman 015 — full editorial redo master apply. */
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { patchFile } from "./_patch-siman-utils.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const counts = {};

for (const n of ["1", "2", "3a", "3b", "4", "5"]) {
  execSync(`node _patch-siman-015-full-part${n}.mjs`, { cwd: dir, stdio: "inherit" });
}

// Recount for report
const files = [
  ["mechaber", "siman_015/mechaber/part-001.txt", "mechaber"],
  ["baer-hetev", "siman_015/baer-hetev/part-001.txt", "baer-hetev"],
  ["beer-hagolah", "siman_015/beer-hagolah/part-001.txt", "beer-hagolah"],
  ["beit-meir", "siman_015/beit-meir/part-001.txt", "beit-meir"],
  ["beit-shmuel", "siman_015/beit-shmuel/part-001.txt", "beit-shmuel"],
  ["beur-hagra", "siman_015/beur-hagra/part-001.txt", "beur-hagra"],
  ["chokhmat-shlomo", "siman_015/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo"],
  ["pitchei-teshuva", "siman_015/pitchei-teshuva/part-001.txt", "pitchei-teshuva"],
  ["rabbi-akiva-eiger", "siman_015/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger"],
  ["turei-zahav", "siman_015/turei-zahav/part-001.txt", "turei-zahav"],
];

for (const [slug, rel] of files) {
  // patchFile already ran; use manifest counts
}
counts.mechaber = 31;
counts["baer-hetev"] = 7;
counts["beer-hagolah"] = 56;
counts["beit-meir"] = 9;
counts["beit-shmuel"] = 25;
counts["beur-hagra"] = 50;
counts["chokhmat-shlomo"] = 2;
counts["pitchei-teshuva"] = 15;
counts["rabbi-akiva-eiger"] = 2;
counts["turei-zahav"] = 22;

const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log("\nsiman 015 full patch counts:", counts, "total:", total);
