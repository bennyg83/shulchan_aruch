/**
 * OC001 block parsing and file walking.
 * Keep parsing rules aligned with sa-checklist.mjs (pending / siman / markers).
 */
import fs from 'fs';
import path from 'path';

export const PLACEHOLDER = 'English translation pending';
export const END_MARKER  = '**** END BLOCK ****';
export const HEB_MARKER  = '**** HEBREW ****';
export const ENG_MARKER  = '**** ENGLISH ****';

const FLAT_SIMAN1_SKIP = new Set(
  ['intro', 'oc', 'yd', 'eh', 'cm', 'tools', '_checklist', 'checklist-output', '_reports'].map(s => s.toLowerCase()),
);

export function inferDefaultSiman(filePath, outRoot) {
  const absOut = path.resolve(outRoot);
  const rel    = path.relative(absOut, path.resolve(filePath)).split(path.sep);
  const seg    = rel.find(s => /^siman_\d{3}$/i.test(s));
  if (seg) return parseInt(seg.replace(/^siman_/i, ''), 10) || 0;
  if (rel[0] && rel[0] !== 'intro' && !FLAT_SIMAN1_SKIP.has(rel[0].toLowerCase()) && !/^siman_\d{3}$/i.test(rel[0]))
    return 1;
  return 0;
}

/**
 * @param {string} filePath
 * @param {number} defaultSiman
 * @returns {Array<{ slug: string, siman: number, seif: number, marker: string, para: string, translated: boolean, hebSnip: string, english: string, rawBlock: string, blockIndex: number }>}
 */
export function parsePartFileBlocks(filePath, defaultSiman = 0) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const results   = [];
  const chunks    = content.split(END_MARKER);

  for (const raw of chunks) {
    if (!raw.includes(HEB_MARKER)) continue;
    const trimmed = raw.trimEnd();
    const lines     = trimmed.split('\n');
    const get       = prefix => (lines.find(l => l.startsWith(prefix)) || '').replace(prefix, '').trim();

    const slug    = get('slug:');
    const fromHdr = parseInt(get('siman:'), 10);
    const siman   = Number.isFinite(fromHdr) && fromHdr > 0 ? fromHdr : (defaultSiman || 0);
    const seif    = parseInt(get('seif:'), 10) || 0;
    const marker  = get('marker:');
    const para    = get('paragraph:');

    const ei           = lines.findIndex(l => l.trim() === ENG_MARKER);
    const english      = ei >= 0 ? lines.slice(ei + 1).join('\n').trim() : '';
    const firstEngLine = english.split(/\r?\n/).map(l => l.trim()).find(Boolean) || '';
    const translated   = firstEngLine.length > 0 && !firstEngLine.startsWith(PLACEHOLDER);

    const hi = lines.findIndex(l => l.trim() === HEB_MARKER);
    const hebSnip = hi >= 0
      ? lines.slice(hi + 1).find(l => l.trim())?.replace(/<[^>]+>/g, '').slice(0, 80) || ''
      : '';

    const rawBlock = trimmed + (trimmed.endsWith('\n') ? '' : '\n') + END_MARKER + '\n';

    results.push({
      slug,
      siman,
      seif,
      marker,
      para,
      translated,
      hebSnip,
      english,
      rawBlock,
      blockIndex: results.length,
    });
  }
  return results;
}

/** @returns {Generator<string>} absolute paths to part-*.txt */
export function* walkOc001PartFiles(outRoot) {
  if (!fs.existsSync(outRoot)) return;

  const intro = path.join(outRoot, 'intro', 'introduction.txt');
  if (fs.existsSync(intro)) yield path.resolve(intro);

  for (const sec of ['OC', 'YD', 'EH', 'CM']) {
    const secDir = path.join(outRoot, sec);
    if (!fs.existsSync(secDir)) continue;
    for (const simanEntry of fs.readdirSync(secDir, { withFileTypes: true })) {
      if (!simanEntry.isDirectory() || !/^siman_\d{3}$/i.test(simanEntry.name)) continue;
      const simanDir = path.join(secDir, simanEntry.name);
      for (const slugEntry of fs.readdirSync(simanDir, { withFileTypes: true })) {
        if (!slugEntry.isDirectory()) continue;
        const slugDir = path.join(simanDir, slugEntry.name);
        for (const f of fs.readdirSync(slugDir).filter(x => /^part-\d+\.txt$/i.test(x)).sort())
          yield path.resolve(path.join(slugDir, f));
      }
    }
  }

  for (const e of fs.readdirSync(outRoot, { withFileTypes: true })) {
    if (!e.isDirectory() || !/^siman_\d{3}$/i.test(e.name)) continue;
    const simanDir = path.join(outRoot, e.name);
    for (const slugEntry of fs.readdirSync(simanDir, { withFileTypes: true })) {
      if (!slugEntry.isDirectory()) continue;
      const slugDir = path.join(simanDir, slugEntry.name);
      for (const f of fs.readdirSync(slugDir).filter(x => /^part-\d+\.txt$/i.test(x)).sort())
        yield path.resolve(path.join(slugDir, f));
    }
  }

  if (!fs.existsSync(path.join(outRoot, 'siman_001'))) {
    for (const entry of fs.readdirSync(outRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      if (/^siman_\d{3}$/i.test(name)) continue;
      if (FLAT_SIMAN1_SKIP.has(name.toLowerCase())) continue;
      const slugDir = path.join(outRoot, name);
      const hasParts = fs.readdirSync(slugDir).some(f => /^part-\d+\.txt$/i.test(f));
      if (!hasParts) continue;
      for (const f of fs.readdirSync(slugDir).filter(x => /^part-\d+\.txt$/i.test(x)).sort())
        yield path.resolve(path.join(slugDir, f));
    }
  }
}

export function blockStableId(relPath, b) {
  const m = encodeURIComponent(b.marker || '_');
  return `${relPath.replace(/\\/g, '/')}#slug=${b.slug}#seif=${b.seif}#marker=${m}`;
}

export function relFromOutRoot(filePath, outRoot) {
  return path.relative(path.resolve(outRoot), path.resolve(filePath)).split(path.sep).join('/');
}
