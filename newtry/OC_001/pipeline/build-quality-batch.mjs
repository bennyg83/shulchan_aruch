#!/usr/bin/env node
/**
 * Build an editorial batch from quality-report.json (run validate-quality with --write-reports first).
 *
 *   node pipeline/build-quality-batch.mjs
 *   node pipeline/build-quality-batch.mjs --max-blocks 60 --min-severity error
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const REPORT = path.join(OC_ROOT, "checklist-output", "quality-report.json");
const WORK = path.join(__dirname, "work");

function parseArgs() {
  let maxBlocks = 50;
  let minSeverity = "error";
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--max-blocks" && process.argv[i + 1]) maxBlocks = parseInt(process.argv[++i], 10);
    else if (process.argv[i] === "--min-severity" && process.argv[i + 1]) minSeverity = process.argv[++i];
  }
  return { maxBlocks, minSeverity };
}

const RANK = { error: 3, warn: 2, info: 1 };

function main() {
  const { maxBlocks, minSeverity } = parseArgs();
  if (!fs.existsSync(REPORT)) {
    console.error(`Missing ${REPORT}. Run: npm run pipeline:validate:quality`);
    process.exit(1);
  }
  const doc = JSON.parse(fs.readFileSync(REPORT, "utf8"));
  const minRank = RANK[minSeverity] ?? 2;
  const picked = (doc.blocks || [])
    .filter((b) => (RANK[b.severity] ?? 0) >= minRank)
    .sort((a, b) => a.score - b.score || (RANK[b.severity] ?? 0) - (RANK[a.severity] ?? 0))
    .slice(0, maxBlocks);

  fs.mkdirSync(WORK, { recursive: true });
  const queuePath = path.join(WORK, "quality-queue.json");
  const batchPath = path.join(WORK, "batch-quality.md");
  const outRoot = doc.outRoot || path.join(OC_ROOT, "output");

  const items = picked.map((b) => ({
    id: b.id,
    file: b.relPath,
    absPath: path.join(outRoot, b.relPath.replace(/\//g, path.sep)),
    slug: b.slug,
    seif: b.seif,
    marker: b.marker,
    score: b.score,
    severity: b.severity,
    issues: b.issues,
  }));

  fs.writeFileSync(
    queuePath,
    JSON.stringify({ generatedAt: new Date().toISOString(), minSeverity, items }, null, 2),
    "utf8"
  );

  const editorialPath = path.join(OC_ROOT, "translation", "EDITORIAL_RETRANSLATE.md");
  const dictPath = path.join(OC_ROOT, "..", "..", "full_dictionary (1).md");
  const editorial = fs.existsSync(editorialPath)
    ? fs.readFileSync(editorialPath, "utf8")
    : "See translation/STYLE.md and repo root full_dictionary (1).md";

  const lines = [
    "# Editorial batch — quality fixes",
    "",
    `Source: \`checklist-output/quality-report.json\` · ${items.length} block(s) · min severity: **${minSeverity}**`,
    "",
    "**Dictionary (mandatory):** `" + dictPath.replace(/\\/g, "/") + "`",
    "",
    "Retranslate from Hebrew only. Disregard existing English. Full rules:",
    "",
    editorial,
    "",
    "---",
    "",
    "## Blocks to fix",
    "",
  ];
  for (const it of items) {
    lines.push(`## ${it.id}`, "", `- **Score:** ${it.score} · **Severity:** ${it.severity}`);
    lines.push(`- **Issues:** ${it.issues.map((i) => i.code).join(", ")}`);
    lines.push(`- **File:** \`${it.file}\``, "");
    if (fs.existsSync(it.absPath)) {
      const raw = fs.readFileSync(it.absPath, "utf8");
      const marker = `marker: ${it.marker}`;
      const idx = raw.indexOf(marker);
      if (idx !== -1) {
        const chunk = raw.slice(Math.max(0, idx - 200), idx + 2500);
        lines.push("```", chunk.trimEnd(), "```", "");
      }
    }
  }
  fs.writeFileSync(batchPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${path.relative(OC_ROOT, queuePath)} (${items.length} items)`);
  console.log(`Wrote ${path.relative(OC_ROOT, batchPath)}`);
}

main();
