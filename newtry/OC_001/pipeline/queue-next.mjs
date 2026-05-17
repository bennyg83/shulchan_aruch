#!/usr/bin/env node
/**
 * queue-next.mjs — Build a machine-readable work queue of pending blocks.
 *
 * Uses checklist.json (when present) to prioritize high-pending siman/slug pairs,
 * then parses only those part files for block-level tasks.
 *
 * Usage:
 *   node pipeline/queue-next.mjs --out output --max-blocks 120
 *   node pipeline/queue-next.mjs --out output --siman 21 --slug magen-avraham
 *   node pipeline/queue-next.mjs --full-scan   (slow; no checklist prioritization)
 *   node pipeline/queue-next.mjs --queue-out pipeline/work/queue-siman-021.json
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  walkOc001PartFiles,
  parsePartFileBlocks,
  inferDefaultSiman,
  blockStableId,
  relFromOutRoot,
} from './lib/blocks.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT   = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot:        path.join(OC_ROOT, 'output'),
    maxBlocks:      200,
    maxFiles:       40,
    siman:          null,
    slug:           null,
    checklistPath:  path.join(OC_ROOT, 'checklist-output', 'checklist.json'),
    workDir:        path.join(__dirname, 'work'),
    fullScan:       false,
    respectCheckpoint: true,
    queueOut:       null,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--queue-out':        opts.queueOut = path.resolve(args[++i]); break;
      case '--out':              opts.outRoot = path.resolve(args[++i]); break;
      case '--max-blocks':       opts.maxBlocks = parseInt(args[++i], 10) || 200; break;
      case '--max-files':        opts.maxFiles = parseInt(args[++i], 10) || 40; break;
      case '--siman':            opts.siman = parseInt(args[++i], 10); break;
      case '--slug':             opts.slug = args[++i]; break;
      case '--checklist':        opts.checklistPath = path.resolve(args[++i]); break;
      case '--work-dir':         opts.workDir = path.resolve(args[++i]); break;
      case '--full-scan':        opts.fullScan = true; break;
      case '--no-checkpoint':    opts.respectCheckpoint = false; break;
    }
  }
  return opts;
}

function listPartFilesInSlugDir(slugDir) {
  if (!fs.existsSync(slugDir)) return [];
  return fs.readdirSync(slugDir)
    .filter(f => /^part-\d+\.txt$/i.test(f))
    .sort()
    .map(f => path.join(slugDir, f));
}

function resolveSlugPartFiles(outRoot, siman, slug) {
  const simanStr = `siman_${String(siman).padStart(3, '0')}`;
  const tryDirs  = [
    path.join(outRoot, simanStr, slug),
    ...['OC', 'YD', 'EH', 'CM'].map(sec => path.join(outRoot, sec, simanStr, slug)),
  ];
  if (siman === 1 && !fs.existsSync(path.join(outRoot, simanStr)))
    tryDirs.push(path.join(outRoot, slug));
  for (const d of tryDirs) {
    const parts = listPartFilesInSlugDir(d);
    if (parts.length) return parts.map(p => path.resolve(p));
  }
  return [];
}

function loadChecklistPriorities(checklistPath) {
  if (!fs.existsSync(checklistPath)) return null;
  const data = JSON.parse(fs.readFileSync(checklistPath, 'utf8'));
  const pairs = [];
  for (const sec of data.sections || []) {
    const siman = sec.siman;
    for (const c of sec.commentaries || []) {
      if (c.pending > 0) pairs.push({ siman, slug: c.slug, pending: c.pending });
    }
  }
  pairs.sort((a, b) => b.pending - a.pending);
  return pairs;
}

function loadCompletedIds(workDir) {
  const p = path.join(workDir, 'state.json');
  if (!fs.existsSync(p)) return new Set();
  try {
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    return new Set(Array.isArray(j.completedIds) ? j.completedIds : []);
  } catch {
    return new Set();
  }
}

function main() {
  const opts = parseArgs();
  if (!fs.existsSync(opts.outRoot)) {
    console.error(`Output root not found: ${opts.outRoot}`);
    process.exit(1);
  }

  fs.mkdirSync(opts.workDir, { recursive: true });

  const completed = opts.respectCheckpoint ? loadCompletedIds(opts.workDir) : new Set();
  const workItems   = [];
  const seenFiles   = new Set();

  const pushPendingFromFile = absPath => {
    if (workItems.length >= opts.maxBlocks) return;
    if (seenFiles.has(absPath)) return;
    seenFiles.add(absPath);
    const defSim = inferDefaultSiman(absPath, opts.outRoot);
    const rel    = relFromOutRoot(absPath, opts.outRoot);
    const blocks = parsePartFileBlocks(absPath, defSim);
    for (const b of blocks) {
      if (workItems.length >= opts.maxBlocks) break;
      if (b.translated) continue;
      const id = blockStableId(rel, b);
      if (completed.has(id)) continue;
      if (opts.slug && b.slug !== opts.slug) continue;
      if (opts.siman != null && b.siman !== opts.siman) continue;
      workItems.push({
        id,
        file:     rel,
        absPath,
        siman:    b.siman,
        slug:     b.slug,
        seif:     b.seif,
        marker:   b.marker,
        hebSnip:  b.hebSnip,
        rawBlock: b.rawBlock,
      });
    }
  };

  if (opts.siman != null && opts.slug) {
    for (const f of resolveSlugPartFiles(opts.outRoot, opts.siman, opts.slug))
      pushPendingFromFile(f);
  } else if (!opts.fullScan) {
    const priorities = loadChecklistPriorities(opts.checklistPath);
    if (priorities) {
      let filesOpened = 0;
      outer:
      for (const { siman, slug } of priorities) {
        if (opts.siman != null && siman !== opts.siman) continue;
        if (opts.slug && slug !== opts.slug) continue;
        const files = resolveSlugPartFiles(opts.outRoot, siman, slug);
        for (const f of files) {
          if (filesOpened >= opts.maxFiles) break outer;
          pushPendingFromFile(f);
          filesOpened++;
          if (workItems.length >= opts.maxBlocks) break outer;
        }
      }
    }
    if (workItems.length === 0) {
      console.log('  (checklist produced no matching pending slice; falling back to --full-scan for this run)');
      opts.fullScan = true;
    }
  }

  if (opts.fullScan && workItems.length < opts.maxBlocks) {
    for (const absPath of walkOc001PartFiles(opts.outRoot)) {
      if (opts.siman != null && inferDefaultSiman(absPath, opts.outRoot) !== opts.siman) continue;
      pushPendingFromFile(absPath);
      if (workItems.length >= opts.maxBlocks) break;
    }
  }

  workItems.sort((a, b) => (a.siman - b.siman) || a.slug.localeCompare(b.slug) || a.seif - b.seif);

  const items = workItems.slice(0, opts.maxBlocks);
  const out = {
    generatedAt: new Date().toISOString(),
    outRoot:     opts.outRoot,
    maxBlocks:   opts.maxBlocks,
    itemCount:   items.length,
    items,
  };

  const outPath = opts.queueOut || path.join(opts.workDir, 'queue.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${out.itemCount} pending block(s) → ${outPath}`);
}

main();
