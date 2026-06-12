/**
 * Build and persist the quality-worker block queue (worst blocks first).
 */
import fs from "fs";
import path from "path";
import { parseBlocksInFile } from "../../yd001_block_lib.mjs";
import { walkOc001PartFiles, relFromOutRoot, blockStableId, inferDefaultSiman } from "./blocks.mjs";
import {
  runBlockQualityChecks,
  scoreBlock,
  maxSeverity,
  severityLabel,
  SEVERITY,
  plainFromHtml,
} from "./quality-checks.mjs";

const RANK = { error: 3, warn: 2, info: 1 };

export function loadDoneIds(donePath) {
  if (!fs.existsSync(donePath)) return new Set();
  return new Set(
    fs
      .readFileSync(donePath, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !l.startsWith("#"))
  );
}

export function appendDoneId(donePath, id) {
  const set = loadDoneIds(donePath);
  set.add(id);
  fs.mkdirSync(path.dirname(donePath), { recursive: true });
  fs.writeFileSync(donePath, [...set].sort().join("\n") + "\n", "utf8");
}

export function slugFromRel(relPath) {
  const parts = relPath.replace(/\\/g, "/").split("/");
  return parts.length >= 2 ? parts[1] : "";
}

function inScope(sim, slug, scope) {
  if (scope === "slot3") {
    if (sim < 201 || sim > 300) return false;
    if (slug === "mechaber" || slug === "rama") return false;
    return true;
  }
  if (scope === "mechaber") return slug === "mechaber";
  return true;
}

function filterIssues(issues, excludeCodes) {
  if (!excludeCodes?.size) return issues;
  return issues.filter((i) => !excludeCodes.has(i.code));
}

/**
 * Live scan — always accurate, slower on full corpus.
 */
export function scanLiveQueue(outRoot, opts) {
  const {
    siman = null,
    from = null,
    to = null,
    slug = null,
    scope = "all",
    minSeverity = "error",
    excludeCodes = new Set(),
  } = opts;

  const slugFilter = slug
    ? new Set(String(slug).split(",").map((s) => s.trim()).filter(Boolean))
    : null;
  const minLevel = SEVERITY[minSeverity] ?? SEVERITY.error;
  const items = [];

  for (const absPath of walkOc001PartFiles(outRoot)) {
    const rel = relFromOutRoot(absPath, outRoot);
    const sim = inferDefaultSiman(absPath, outRoot);
    if (siman && sim !== siman) continue;
    if (from != null && sim < from) continue;
    if (to != null && sim > to) continue;

    const fileSlug = slugFromRel(rel);
    if (!inScope(sim, fileSlug, scope)) continue;
    if (slugFilter && !slugFilter.has(fileSlug)) continue;

    const raw = fs.readFileSync(absPath, "utf8");
    for (const b of parseBlocksInFile(raw)) {
      const he = String(b.he ?? "").trim();
      if (!he) continue;

      const issues = filterIssues(runBlockQualityChecks(b), excludeCodes).filter(
        (i) => (SEVERITY[i.severity] ?? 0) >= minLevel
      );
      if (!issues.length) continue;

      items.push({
        id: blockStableId(rel, b),
        relPath: rel,
        absPath,
        siman: sim,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
        score: scoreBlock(issues),
        severity: severityLabel(maxSeverity(issues)),
        issues: issues.map((i) => i.code),
        hePlain: plainFromHtml(b.he),
      });
    }
  }

  return sortQueue(items);
}

export function loadFromReport(reportPath, opts) {
  const { minSeverity = "error", excludeCodes = new Set(), scope = "all", from, to, siman, slug } = opts;
  const doc = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const minLevel = SEVERITY[minSeverity] ?? SEVERITY.error;
  const slugFilter = slug
    ? new Set(String(slug).split(",").map((s) => s.trim()).filter(Boolean))
    : null;
  const outRoot = doc.outRoot;
  const items = [];

  for (const row of doc.blocks || []) {
    if ((RANK[row.severity] ?? 0) < minLevel) continue;

    const rel = row.relPath;
    const sim = inferDefaultSiman(path.join(outRoot, rel), outRoot);
    const fileSlug = slugFromRel(rel);
    if (siman && sim !== siman) continue;
    if (from != null && sim < from) continue;
    if (to != null && sim > to) continue;
    if (!inScope(sim, fileSlug, scope)) continue;
    if (slugFilter && !slugFilter.has(fileSlug)) continue;

    const issues = filterIssues(row.issues || [], excludeCodes);
    if (!issues.length) continue;

    items.push({
      id: row.id,
      relPath: rel,
      absPath: path.join(outRoot, rel.replace(/\//g, path.sep)),
      siman: sim,
      slug: row.slug,
      seif: row.seif,
      marker: row.marker,
      score: row.score,
      severity: row.severity,
      issues: issues.map((i) => i.code),
      hePlain: null,
    });
  }

  return sortQueue(items);
}

export function sortQueue(items) {
  return items.sort((a, b) => {
    const sd = (RANK[b.severity] ?? 0) - (RANK[a.severity] ?? 0);
    if (sd !== 0) return sd;
    return a.score - b.score || a.relPath.localeCompare(b.relPath);
  });
}

export function buildQueue(outRoot, reportPath, opts, donePath) {
  const done = loadDoneIds(donePath);
  let items;

  if (opts.rescan || !fs.existsSync(reportPath)) {
    items = scanLiveQueue(outRoot, opts);
  } else {
    items = loadFromReport(reportPath, opts);
    for (const it of items) {
      if (!it.hePlain && fs.existsSync(it.absPath)) {
        const raw = fs.readFileSync(it.absPath, "utf8");
        const b = parseBlocksInFile(raw).find(
          (x) =>
            String(x.slug) === String(it.slug) &&
            String(x.seif) === String(it.seif) &&
            String(x.marker ?? "_") === String(it.marker ?? "_")
        );
        if (b) it.hePlain = plainFromHtml(b.he);
      }
    }
  }

  items = items.filter((it) => !done.has(it.id));
  return { items, doneCount: done.size, source: opts.rescan || !fs.existsSync(reportPath) ? "live" : "report" };
}

export function saveQueue(queuePath, meta, items) {
  fs.mkdirSync(path.dirname(queuePath), { recursive: true });
  fs.writeFileSync(
    queuePath,
    JSON.stringify(
      {
        ...meta,
        generatedAt: new Date().toISOString(),
        remaining: items.length,
        items,
      },
      null,
      2
    ),
    "utf8"
  );
}

export function loadQueue(queuePath) {
  if (!fs.existsSync(queuePath)) return null;
  return JSON.parse(fs.readFileSync(queuePath, "utf8"));
}
