#!/usr/bin/env node
/**
 * Build batch for HTML presentation agent (English cleanup only).
 *
 *   node pipeline/build-html-presentation-batch.mjs --from 1 --to 20
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../cm001_block_lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";
import { relFromOutRoot } from "./lib/blocks.mjs";
import { simanPartFiles } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

const HTML_CODES = new Set([
  "html_entity_leak",
  "broken_html",
  "hebrew_in_english",
]);

function parseArgs() {
  let from = 1;
  let to = 20;
  let maxBlocks = 80;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
  }
  return { from, to, maxBlocks };
}

function main() {
  const { from, to, maxBlocks } = parseArgs();
  const outRoot = path.join(OC_ROOT, "output");
  const items = [];

  for (let s = from; s <= to; s++) {
    for (const absPath of simanPartFiles(outRoot, s)) {
      const rel = relFromOutRoot(absPath, outRoot);
      const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
      for (const b of blocks) {
        const he = String(b.he ?? "").trim();
        const en = String(b.en ?? "").trim();
        if (!he || !en) continue;
        const issues = runBlockQualityChecks({
          slug: b.slug,
          seif: b.seif,
          marker: b.marker,
          he,
          en,
        }).filter((i) => HTML_CODES.has(i.code) || /<[a-z]/i.test(en));
        if (!issues.length && !/<[a-z]/i.test(en) && !/&quot;|&amp;/.test(en)) continue;
        items.push({
          siman: s,
          file: rel,
          absPath,
          slug: b.slug,
          seif: b.seif,
          marker: b.marker,
          issues: issues.map((i) => i.code),
        });
      }
    }
  }

  const picked = items.slice(0, maxBlocks);
  fs.mkdirSync(WORK, { recursive: true });
  const queuePath = path.join(WORK, "html-presentation-queue.json");
  const batchPath = path.join(WORK, "batch-html-presentation.md");
  const guide = path.join(OC_ROOT, "translation", "AGENT_HTML_PRESENTATION.md");

  fs.writeFileSync(
    queuePath,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), from, to, totalFlagged: items.length, items: picked },
      null,
      2
    ),
    "utf8"
  );

  const lines = [
    "# HTML presentation batch",
    "",
    `Range: simanim **${from}–${to}** · ${picked.length} block(s) (${items.length} flagged total)`,
    "",
    "Read and follow: `translation/AGENT_HTML_PRESENTATION.md`",
    "",
    fs.existsSync(guide) ? fs.readFileSync(guide, "utf8") : "",
    "",
    "## Blocks",
    "",
  ];

  for (const it of picked) {
    lines.push(
      `- **${it.file}** · slug \`${it.slug}\` · seif ${it.seif} · marker ${it.marker} · issues: ${it.issues.join(", ") || "html tags"}`
    );
  }

  fs.writeFileSync(batchPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${queuePath} (${picked.length} items)`);
  console.log(`Wrote ${batchPath}`);
}

main();
