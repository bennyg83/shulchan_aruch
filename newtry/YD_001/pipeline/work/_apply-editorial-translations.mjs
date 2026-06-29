#!/usr/bin/env node
/** Apply TRANSLATIONS export to output files. Usage: node _apply-editorial-translations.mjs path/to/translations.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const modPath = process.argv[2];
if (!modPath) {
  console.error('Usage: node _apply-editorial-translations.mjs <translations.mjs>');
  process.exit(1);
}

const { TRANSLATIONS, FILES } = await import(pathToFileURL(path.resolve(modPath)).href);

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  if (!fs.existsSync(fp)) throw new Error(`Missing ${rel}`);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    keysInFile.add(key);
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size}/${keysInFile.size} blocks patched)`);
  return applied.size;
}

let total = 0;
if (FILES?.length) {
  for (const [rel, slug] of FILES) {
    const T = TRANSLATIONS[slug];
    if (!T) throw new Error(`No translations for ${slug}`);
    total += patchFile(rel, slug, T);
  }
} else {
  for (const [slug, T] of Object.entries(TRANSLATIONS)) {
    const dir = Object.values(
      Object.fromEntries(
        fs
          .readdirSync(OUT)
          .filter((d) => d.startsWith('siman_'))
          .flatMap((sim) => {
            const sd = path.join(OUT, sim, slug);
            if (!fs.existsSync(sd)) return [];
            return fs.readdirSync(sd).map((f) => [`${sim}/${slug}/${f}`, slug]);
          })
      )
    );
    // find files containing this slug
    for (const simDir of fs.readdirSync(OUT).filter((d) => /^siman_\d+$/.test(d))) {
      const rel = `${simDir}/${slug}/part-001.txt`;
      const fp = path.join(OUT, rel);
      if (fs.existsSync(fp)) total += patchFile(rel, slug, T);
    }
  }
}
console.log(`[DONE] ${total} blocks`);
