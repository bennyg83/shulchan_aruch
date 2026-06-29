#!/usr/bin/env node
/** Shared patch helpers for EH001 editorial passes (EH_001 root). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BLOCK_START, ENGLISH_HDR, BLOCK_END } from "./eh001_block_lib.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
export const OUT = path.join(ROOT, "output");
export const BLOCK = BLOCK_START;
export const ENG = ENGLISH_HDR;
export const END = BLOCK_END;

export function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : "main";
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const afterHdr = block.slice(enStart + ENG.length);
    const nl = afterHdr.match(/^\r?\n/);
    const hdrEnd = enStart + ENG.length + (nl ? nl[0].length : 0);
    const before = block.slice(0, hdrEnd);
    const after = block.slice(enEnd);
    const text = T[key].endsWith("\n") ? T[key] : T[key] + "\n";
    applied.add(key);
    return BLOCK + before + text + after;
  });
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}
