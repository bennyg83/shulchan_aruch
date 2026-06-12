/**
 * Build editorial work items for one siman (retranslate from Hebrew).
 */
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock, EN_PENDING_DEFAULT } from "../../cm001_block_lib.mjs";
import {
  walkOc001PartFiles,
  inferDefaultSiman,
  relFromOutRoot,
  blockStableId,
} from "./blocks.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel, SEVERITY } from "./quality-checks.mjs";

const PLACEHOLDER = "English translation pending";

export function simanPartFiles(outRoot, siman) {
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  return [...walkOc001PartFiles(outRoot)].filter((f) => f.includes(needle));
}

/**
 * @param {'all'|'quality'} scope — `all` = every block with Hebrew (full siman pass); `quality` = flagged blocks only
 */
export function collectEditorialBlocks(outRoot, siman, scope, minQualitySeverity, editorialDoneIds) {
  const files = simanPartFiles(outRoot, siman);
  const items = [];
  const minLevel = SEVERITY[minQualitySeverity] ?? SEVERITY.warn;

  for (const absPath of files) {
    const rel = relFromOutRoot(absPath, outRoot);
    const defSim = inferDefaultSiman(absPath, outRoot);
    const raw = fs.readFileSync(absPath, "utf8");
    const blocks = parseBlocksInFile(raw);

    for (const b of blocks) {
      const he = String(b.he ?? "").trim();
      if (!he) continue;

      const id = blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker });
      if (editorialDoneIds.has(id)) continue;

      const issues = runBlockQualityChecks(b);
      const sevLabel = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
      const sevLevel = SEVERITY[sevLabel] ?? 0;

      if (scope === "quality" && sevLevel < minLevel) continue;

      items.push({
        id,
        file: rel,
        absPath,
        siman: defSim || siman,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
        quality: sevLabel,
        issues: issues.map((i) => i.code),
        rawBlock: serializeBlock(b),
      });
    }
  }

  items.sort(
    (a, b) =>
      a.file.localeCompare(b.file) ||
      String(a.seif).localeCompare(String(b.seif)) ||
      String(a.marker).localeCompare(String(b.marker))
  );
  return items;
}

export function loadEditorialDoneIds(workDir) {
  const p = path.join(workDir, "editorial-done-ids.txt");
  if (!fs.existsSync(p)) return new Set();
  return new Set(
    fs
      .readFileSync(p, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );
}

export function appendEditorialDoneIds(workDir, ids) {
  const p = path.join(workDir, "editorial-done-ids.txt");
  const set = loadEditorialDoneIds(workDir);
  for (const id of ids) set.add(id);
  fs.mkdirSync(workDir, { recursive: true });
  fs.writeFileSync(p, [...set].sort().join("\n") + "\n", "utf8");
  return set.size;
}
