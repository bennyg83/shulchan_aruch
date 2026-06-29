#!/usr/bin/env node
/**
 * Build a Cursor/agent batch for one siman — full Claude-quality retranslation rules.
 *
 *   node pipeline/build-editorial-siman-batch.mjs --siman 113
 *   node pipeline/build-editorial-siman-batch.mjs --siman 21 --part 1 --parts 3
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const EDITORIAL = path.join(OC_ROOT, "translation", "EDITORIAL_RETRANSLATE.md");
const DICT = path.join(OC_ROOT, "..", "..", "full_dictionary (1).md");

function parseArgs() {
  let siman = null;
  let part = 1;
  let parts = 1;
  let maxBlocks = 45;
  let scope = "all";
  let minSeverity = "warn";
  let outRoot = path.join(OC_ROOT, "output");
  let workDir = WORK;
  let ignoreDone = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = parseInt(a[++i], 10);
    else if (a[i] === "--part" && a[i + 1]) part = Math.max(1, parseInt(a[++i], 10));
    else if (a[i] === "--parts" && a[i + 1]) parts = Math.max(1, parseInt(a[++i], 10));
    else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
    else if (a[i] === "--scope" && a[i + 1]) scope = a[++i];
    else if (a[i] === "--min-severity" && a[i + 1]) minSeverity = a[++i];
    else if (a[i] === "--out" && a[i + 1]) outRoot = path.resolve(a[++i]);
    else if (a[i] === "--work-dir" && a[i + 1]) workDir = path.resolve(a[++i]);
    else if (a[i] === "--ignore-done") ignoreDone = true;
  }
  if (!siman) throw new Error("Required: --siman N");
  return { siman, part, parts, maxBlocks, scope, minSeverity, outRoot, workDir, ignoreDone };
}

function slicePart(items, part, parts) {
  if (parts <= 1) return items;
  const size = Math.ceil(items.length / parts);
  const start = (part - 1) * size;
  return items.slice(start, start + size);
}

export function buildBatch(opts) {
  const doneIds = opts.ignoreDone ? new Set() : loadEditorialDoneIds(opts.workDir);
  const all = collectEditorialBlocks(
    opts.outRoot,
    opts.siman,
    opts.scope,
    opts.minSeverity,
    doneIds
  );
  const slice = slicePart(all, opts.part, opts.parts).slice(0, opts.maxBlocks);

  const tag = String(opts.siman).padStart(3, "0");
  const partSuffix = opts.parts > 1 ? `-part${opts.part}of${opts.parts}` : "";
  const queuePath = path.join(opts.workDir, `editorial-queue-siman-${tag}${partSuffix}.json`);
  const batchPath = path.join(opts.workDir, `batch-editorial-siman-${tag}${partSuffix}.md`);

  const editorial = fs.existsSync(EDITORIAL)
    ? fs.readFileSync(EDITORIAL, "utf8")
    : "See translation/EDITORIAL_RETRANSLATE.md";

  const lines = [
    `# Editorial retranslation — Siman ${opts.siman}${opts.parts > 1 ? ` (part ${opts.part}/${opts.parts})` : ""}`,
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "**Mandatory dictionary:** `" + DICT.replace(/\\/g, "/") + "` — consult for every term.",
    "",
    "**Disregard existing English.** Translate fresh from Hebrew only. Edit **only** `**** ENGLISH ****`.",
    "",
    "---",
    "",
    editorial,
    "",
    "---",
    "",
    `## Blocks in this batch (${slice.length} of ${all.length} remaining in scope)`,
    "",
  ];

  let n = 1;
  for (const it of slice) {
    lines.push(
      `### ${n++}. \`${it.file}\` — ${it.slug} — seif ${it.seif} — marker \`${it.marker}\``,
      "",
      `- Quality: **${it.quality}**${it.issues.length ? ` — ${it.issues.join(", ")}` : ""}`,
      `- Checkpoint id: \`${it.id}\``,
      "",
      "```text",
      it.rawBlock.trimEnd(),
      "```",
      ""
    );
  }

  lines.push("---", "", "## After completing this batch", "", "```bash");
  lines.push(`cd newtry/OC_001`);
  lines.push(`npm run apply:dictionary -- --root output/siman_${tag}`);
  lines.push(`npm run pipeline:editorial:advance -- --siman ${opts.siman}`);
  lines.push("```", "", "## Checkpoint ids", "");
  for (const it of slice) lines.push(it.id);

  fs.mkdirSync(opts.workDir, { recursive: true });
  fs.writeFileSync(
    queuePath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        siman: opts.siman,
        part: opts.part,
        parts: opts.parts,
        scope: opts.scope,
        outRoot: opts.outRoot,
        totalInSiman: all.length,
        itemCount: slice.length,
        items: slice,
      },
      null,
      2
    ),
    "utf8"
  );
  fs.writeFileSync(batchPath, lines.join("\n"), "utf8");

  return { queuePath, batchPath, allCount: all.length, sliceCount: slice.length, items: slice };
}

function main() {
  const opts = parseArgs();
  const r = buildBatch(opts);
  console.log(`Siman ${opts.siman}: ${r.sliceCount} block(s) in batch (${r.allCount} in scope)`);
  console.log(`Queue → ${r.queuePath}`);
  console.log(`Batch → ${r.batchPath}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
