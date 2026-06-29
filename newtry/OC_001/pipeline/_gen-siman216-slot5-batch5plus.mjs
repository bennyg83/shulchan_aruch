#!/usr/bin/env node
/** Generate slot5 batch 5+ data from editorial parts 5-8 (blocks not in batches 1-4). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES as b1 } from "./_siman216-slot5-batch1-data.mjs";
import { FIXES as b2 } from "./_siman216-slot5-batch2-data.mjs";
import { FIXES as b3 } from "./_siman216-slot5-batch3-data.mjs";
import { FIXES as b4 } from "./_siman216-slot5-batch4-data.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function keys(F) {
  const s = new Set();
  for (const [rel, blocks] of Object.entries(F))
    for (const k of Object.keys(blocks)) s.add(`${rel}|${k}`);
  return s;
}

const done = new Set([...keys(b1), ...keys(b2), ...keys(b3), ...keys(b4)]);
const items = [];
for (const part of [5, 6, 7, 8]) {
  const q = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "work", `editorial-queue-siman-216-part${part}of8.json`),
      "utf8"
    )
  );
  for (const it of q.items) {
    const rel = it.file.replace(/^siman_216\//, "");
    const k = `${rel}|${it.seif}:${it.marker || "_"}`;
    if (!done.has(k)) {
      items.push({
        rel,
        seif: it.seif,
        marker: it.marker || "_",
        slug: it.slug,
      });
    }
  }
}

console.log(`Remaining blocks (parts 5-8, not in batches 1-4): ${items.length}`);

const base = path.join(__dirname, "..", "output", "siman_216");
const flat = [];
for (const it of items) {
  const fp = path.join(base, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker)
  );
  if (!b) throw new Error(`Block missing: ${it.rel} ${it.seif}:${it.marker}`);
  flat.push({ rel: it.rel, key: `${it.seif}:${it.marker}`, en: b.en });
}

function formatModule(batchNum, chunk) {
  const F = {};
  for (const { rel, key, en } of chunk) {
    if (!F[rel]) F[rel] = {};
    F[rel][key] = en;
  }
  let s = `/** worker-slot-5 — siman 216 editorial batch ${batchNum} fixes (${chunk.length} blocks) */\nexport const FIXES = {\n`;
  for (const [rel, blocks] of Object.entries(F)) {
    s += `  ${JSON.stringify(rel)}: {\n`;
    for (const [k, en] of Object.entries(blocks)) {
      s += `    ${JSON.stringify(k)}:\n      ${JSON.stringify(en)},\n`;
    }
    s += "  },\n";
  }
  s += "};\n";
  return s;
}

function writeApply(batchNum) {
  const applyPath = path.join(__dirname, `_apply-siman216-batch${batchNum}-slot5.mjs`);
  const content = `#!/usr/bin/env node
/** worker-slot-5 — siman 216 editorial batch ${batchNum} */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman216-slot5-batch${batchNum}-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_216");
let total = 0;
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = \`\${b.seif}:\${b.marker || "_"}\`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\\n\\n");
  fs.writeFileSync(fp, out.endsWith("\\n") ? out : out + "\\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);

import { spawnSync } from "child_process";
const sync = spawnSync(
  process.execPath,
  [path.join(__dirname, "sync-queue-from-output.mjs"), path.join(__dirname, "work", "editorial-queue-siman-216.json")],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
`;
  fs.writeFileSync(applyPath, content, "utf8");
}

let batchNum = 5;
for (let i = 0; i < flat.length; i += 45) {
  const chunk = flat.slice(i, i + 45);
  const dataPath = path.join(__dirname, `_siman216-slot5-batch${batchNum}-data.mjs`);
  fs.writeFileSync(dataPath, formatModule(batchNum, chunk), "utf8");
  writeApply(batchNum);
  console.log(`Wrote batch ${batchNum}: ${chunk.length} blocks`);
  batchNum++;
}
