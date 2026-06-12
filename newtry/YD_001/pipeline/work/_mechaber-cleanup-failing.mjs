#!/usr/bin/env node
/** Apply fresh mechaber translations for failing quality-pass simanim */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { MECHABER } from "./_mechaber-cleanup-failing-translations.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const BLOCK = "**** YD001 SOURCE BLOCK ****";
const ENG = "**** ENGLISH ****";
const END = "**** END BLOCK ****";

function patchFile(rel, translations) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
  const parts = s.split(BLOCK);
  let n = 0;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const seif = seifM?.[1]?.trim() ?? "";
    const marker = markerM?.[1]?.trim() || "main";
    const key = `${seif}#${marker}`;
    if (!(key in translations)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`Bad block ${rel} ${key}`);
    const text = translations[key].endsWith("\n") ? translations[key] : translations[key] + "\n";
    n++;
    return BLOCK + block.slice(0, enStart + ENG.length + 1) + text + block.slice(enEnd);
  });
  const missing = Object.keys(translations).filter(
    (k) => !out.join("").includes(translations[k].slice(0, 40))
  );
  if (n !== Object.keys(translations).length) {
    throw new Error(`Applied ${n}/${Object.keys(translations).length} in ${rel}; missing keys?`);
  }
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} (${n} blocks)`);
  return n;
}

let total = 0;
const simanim = new Set();
for (const [rel, T] of Object.entries(MECHABER)) {
  total += patchFile(rel, T);
  const m = rel.match(/siman_(\d+)/);
  if (m) simanim.add(m[1]);
}

for (const sim of [...simanim].sort()) {
  const tag = sim.padStart(3, "0");
  console.log(`\n── siman ${tag} ──`);
  spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", `output/siman_${tag}`], {
    cwd: ROOT,
    stdio: "inherit",
  });
  spawnSync(process.execPath, [path.join(ROOT, "pipeline/validate-yd001.mjs"), "--root", `output/siman_${tag}`], {
    cwd: ROOT,
    stdio: "inherit",
  });
  spawnSync(
    process.execPath,
    [
      path.join(ROOT, "pipeline/validate-quality-yd001.mjs"),
      "--root",
      `output/siman_${tag}`,
      "--min-severity",
      "error",
      "--fail-on",
      "error",
    ],
    { cwd: ROOT, stdio: "inherit" }
  );
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "");
for (const sim of [...simanim].sort()) {
  fs.appendFileSync(
    path.join(ROOT, "progress.log"),
    `${ts} siman_${sim.padStart(3, "0")}/mechaber mechaber quality-pass ${Object.keys(MECHABER[`siman_${sim.padStart(3, "0")}/mechaber/part-001.txt`] || {}).length || "?"} blocks DONE\n`
  );
}

console.log(`\n[COMPLETE] mechaber cleanup — ${total} blocks across simanim ${[...simanim].join(", ")}`);
