import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parsePartFileBlocks, relFromOutRoot } from '../lib/blocks.mjs';

const SIMAN = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const tag = String(SIMAN).padStart(3, '0');
const simanDir = path.join(ROOT, 'output', `siman_${tag}`);
function ownershipPathForSiman(n) {
  if (n <= 100) return path.join(__dirname, 'slot1-yd-simanim-1-100-OWNERSHIP.json');
  if (n <= 200) return path.join(__dirname, 'slot2-yd-simanim-101-200-OWNERSHIP.json');
  return path.join(__dirname, 'slot3-yd-simanim-201-300-OWNERSHIP.json');
}
const ownershipPath = ownershipPathForSiman(SIMAN);

function markerKey(marker) {
  if (!marker || marker === '_' || marker === 'main') return 'main';
  return encodeURIComponent(marker);
}

function blockId(rel, b) {
  return `YD:${rel}#slug=${b.slug}#seif=${b.seif}#marker=${markerKey(b.marker)}`;
}

const bySlug = {};
const ids = [];
for (const slug of fs.readdirSync(simanDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
  const slugDir = path.join(simanDir, slug);
  const parts = fs
    .readdirSync(slugDir)
    .filter((f) => /^part-\d+\.txt$/.test(f))
    .sort();
  if (!parts.length) continue;
  let slugTotal = 0;
  for (const partName of parts) {
    const part = path.join(slugDir, partName);
    const rel = relFromOutRoot(part, path.join(ROOT, 'output'));
    const blocks = parsePartFileBlocks(part, SIMAN);
    slugTotal += blocks.length;
    for (const b of blocks) ids.push(blockId(rel, b));
  }
  bySlug[slug] = slugTotal;
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
const logLines = Object.entries(bySlug)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, n]) => `${ts} siman_${tag}/${slug} ${n} blocks DONE`);
logLines.push(`${ts} siman_${tag} COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), logLines.join('\n') + '\n');

const own = JSON.parse(fs.readFileSync(ownershipPath, 'utf8'));
const set = new Set(own.completedBlockIds);
for (const id of ids) set.add(id);
own.completedBlockIds = [...set];
own.stats.blocksCompleted = own.completedBlockIds.length;
own.stats.lastUpdated = new Date().toISOString();
const scopeTo = own.scope?.toSiman;
if (scopeTo && SIMAN >= scopeTo) {
  own.nextPointer = null;
  own.scopeComplete = true;
  own.finishLine = `SLOT 2 COMPLETE — YD simanim ${own.scope.fromSiman}–${scopeTo} (${own.stats.blocksCompleted} blocks)`;
} else {
  own.nextPointer = { siman: SIMAN + 1, slug: 'mechaber', file: 'part-001.txt' };
  own.scopeComplete = false;
}
fs.writeFileSync(ownershipPath, JSON.stringify(own, null, 2) + '\n');
console.log(`Logged siman ${SIMAN}: ${ids.length} blocks`);
