#!/usr/bin/env node
/** Run worker-slot-11 editorial completion for listed simanim */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

const SCOPE = {
  425: 25,
  426: 60,
  428: 100,
  429: 46,
  431: 32,
  432: 39,
  433: 213,
  434: 92,
};

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const list = simanim.length ? simanim : Object.keys(SCOPE).map(Number);

for (const siman of list) {
  const expected = SCOPE[siman];
  if (expected === undefined) {
    console.log(`skip siman ${siman} (no scope)`);
    continue;
  }
  if (expected === 0) {
    console.log(`skip siman ${siman} (scope 0)`);
    continue;
  }
  console.log(`\n######## siman ${siman} (scope ${expected}) ########`);
  const fixesSlot11 = path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`);
  const fixesLegacy = [
    path.join(__dirname, `_fixes-siman${siman}.mjs`),
    path.join(__dirname, `_fixes-siman${siman}-part1.mjs`),
    path.join(__dirname, `_fixes-siman${siman}-part2.mjs`),
  ];
  run("_apply-pending-autofix-slot11.mjs", [String(siman)]);
  if (fs.existsSync(fixesSlot11)) {
    run("_apply-fixes-slot11.mjs", [String(siman)]);
  }
  for (const fp of fixesLegacy) {
    if (!fs.existsSync(fp)) continue;
    const r = spawnSync(
      process.execPath,
      [
        "-e",
        `import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
import { parseBlocksInFile, serializeBlock } from './oc001_block_lib.mjs';
import { preflightFail } from './pipeline/_slot11-lib.mjs';
const siman = ${siman};
const mod = await import(pathToFileURL('${fp.replace(/\\/g, "/")}').href + '?v=' + Date.now());
const FIXES = mod.FIXES || mod.fixes;
const base = path.join('output', 'siman_' + siman);
let n = 0;
for (const [relPath, blockFixes] of Object.entries(FIXES)) {
  const rel = relPath.replace(/^output\\/siman_\\d+\\//, '');
  const fp2 = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp2, 'utf8'));
  const out = blocks.map(b => {
    const k = b.seif + ':' + (b.marker || '_');
    if (blockFixes[k]) { n++; return { ...b, en: blockFixes[k] }; }
    return b;
  }).map(serializeBlock).join('\\n\\n');
  fs.writeFileSync(fp2, out.endsWith('\\n') ? out : out + '\\n');
}
console.log('legacy fixes', n);`,
      ],
      { cwd: OC_ROOT, stdio: "inherit" }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
  run("_preflight-fix-siman-slot11.mjs", [String(siman)]);
  run("_checkpoint-remaining-slot11.mjs", [String(siman)]);
}

console.log("\nslot11 batch done:", list.join(", "));
