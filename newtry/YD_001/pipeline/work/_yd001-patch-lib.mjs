import fs from 'fs';
import path from 'path';

export const BLOCK = '**** YD001 SOURCE BLOCK ****';
export const HEB = '**** HEBREW ****';
export const ENG = '**** ENGLISH ****';
export const END = '**** END BLOCK ****';

export function readUtf8(fp) {
  return fs.readFileSync(fp, 'utf8');
}

export function writeUtf8(fp, s) {
  fs.writeFileSync(fp, s, 'utf8');
}

export function listPartFiles(simOutDir) {
  const out = [];
  for (const slug of fs.readdirSync(simOutDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const slugDir = path.join(simOutDir, slug.name);
    for (const ent of fs.readdirSync(slugDir, { withFileTypes: true })) {
      if (!ent.isFile()) continue;
      if (!/^part-\d+\.txt$/i.test(ent.name)) continue;
      out.push({ slug: slug.name, rel: path.join(path.basename(simOutDir), slug.name, ent.name), abs: path.join(slugDir, ent.name) });
    }
  }
  out.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  return out;
}

export function parseBlocks(fileText) {
  const parts = fileText.split(BLOCK);
  const head = parts[0];
  const blocks = [];
  for (let i = 1; i < parts.length; i++) {
    const raw = parts[i];
    const slugM = raw.match(/^\s*slug:\s*(.+)$/m);
    const seifM = raw.match(/^\s*seif:\s*(.+)$/m);
    const markerM = raw.match(/^\s*marker:\s*(.+)$/m);
    const hebStart = raw.indexOf(HEB);
    const enStart = raw.indexOf(ENG);
    const endIdx = raw.indexOf(END);
    if (hebStart < 0 || enStart < 0 || endIdx < 0 || endIdx < enStart) {
      throw new Error(`Malformed block: missing HEB/ENG/END near split index ${i}`);
    }
    const slug = slugM?.[1]?.trim() || '';
    const seif = seifM?.[1]?.trim() || '';
    const marker = markerM?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    const hebText = raw.slice(hebStart + HEB.length, enStart).replace(/^\s*\r?\n/, '').replace(/\s*$/, '');
    const enText = raw.slice(enStart + ENG.length, endIdx).replace(/^\s*\r?\n/, '').replace(/\s*$/, '');
    blocks.push({
      slug,
      seif,
      marker,
      key,
      rawAfterSplit: raw,
      hebText,
      enText,
      enStart,
      endIdx,
    });
  }
  return { head, blocks };
}

export function replaceEnglishInFileText(fileText, translateBlock) {
  const parts = fileText.split(BLOCK);
  const outParts = [parts[0]];
  let replaced = 0;
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];
    const slugM = block.match(/^\s*slug:\s*(.+)$/m);
    const seifM = block.match(/^\s*seif:\s*(.+)$/m);
    const markerM = block.match(/^\s*marker:\s*(.+)$/m);
    const slug = slugM?.[1]?.trim() || '';
    const seif = seifM?.[1]?.trim() || '';
    const marker = markerM?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    const hebStart = block.indexOf(HEB);
    const enStart = block.indexOf(ENG);
    const endIdx = block.indexOf(END);
    if (hebStart < 0 || enStart < 0 || endIdx < 0 || endIdx < enStart) {
      throw new Error(`Malformed block in replaceEnglish: split index ${i}`);
    }
    const hebText = block.slice(hebStart + HEB.length, enStart).replace(/^\s*\r?\n/, '').replace(/\s*$/, '');
    const translated = translateBlock({ slug, seif, marker, key, heb: hebText });
    if (typeof translated !== 'string' || !translated.trim()) {
      throw new Error(`Empty translation returned for ${slug} ${key}`);
    }
    const before = block.slice(0, enStart + ENG.length) + '\n';
    const after = block.slice(endIdx);
    const text = translated.endsWith('\n') ? translated : translated + '\n';
    outParts.push(before + text + after);
    replaced++;
  }
  return { text: outParts.map((p, i) => (i === 0 ? p : BLOCK + p)).join(''), replaced };
}

export function appendProgress(rootDir, simNum, perSlugCounts, totalBlocks) {
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  const lines = [];
  for (const [slug, n] of Object.entries(perSlugCounts).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`${ts} siman_${String(simNum).padStart(3, '0')}/${slug} ${n} blocks DONE`);
  }
  lines.push(`${ts} siman_${String(simNum).padStart(3, '0')} COMPLETE`);
  fs.appendFileSync(path.join(rootDir, 'progress.log'), lines.join('\n') + '\n');
  return `[COMPLETE] siman_${String(simNum).padStart(3, '0')} — ${totalBlocks} blocks`;
}

