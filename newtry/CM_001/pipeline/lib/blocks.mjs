/**
 * CM001 block parsing and file walking (same layout as OC001: output/siman_NNN/<slug>/part-*.txt).
 */
import fs from "fs";
import path from "path";

export const PLACEHOLDER = "English translation pending";
export const END_MARKER = "**** END BLOCK ****";
export const HEB_MARKER = "**** HEBREW ****";
export const ENG_MARKER = "**** ENGLISH ****";

const FLAT_SIMAN1_SKIP = new Set(
  ["intro", "oc", "yd", "eh", "cm", "tools", "_checklist", "checklist-output", "_reports"].map(
    (s) => s.toLowerCase()
  )
);

export function inferDefaultSiman(filePath, outRoot) {
  const absOut = path.resolve(outRoot);
  const rel = path.relative(absOut, path.resolve(filePath)).split(path.sep);
  const seg = rel.find((s) => /^siman_\d{3}$/i.test(s));
  if (seg) return parseInt(seg.replace(/^siman_/i, ""), 10) || 0;
  if (
    rel[0] &&
    rel[0] !== "intro" &&
    !FLAT_SIMAN1_SKIP.has(rel[0].toLowerCase()) &&
    !/^siman_\d{3}$/i.test(rel[0])
  )
    return 1;
  return 0;
}

export function parsePartFileBlocks(filePath, defaultSiman = 0) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf8");
  const results = [];
  const chunks = content.split(END_MARKER);

  for (const raw of chunks) {
    if (!raw.includes(HEB_MARKER)) continue;
    const trimmed = raw.trimEnd();
    const lines = trimmed.split("\n");
    const get = (prefix) => (lines.find((l) => l.startsWith(prefix)) || "").replace(prefix, "").trim();

    const slug = get("slug:");
    const fromHdr = parseInt(get("siman:"), 10);
    const siman = Number.isFinite(fromHdr) && fromHdr > 0 ? fromHdr : defaultSiman || 0;
    const seif = parseInt(get("seif:"), 10) || 0;
    const marker = get("marker:");
    const para = get("paragraph:");

    const ei = lines.findIndex((l) => l.trim() === ENG_MARKER);
    const english = ei >= 0 ? lines.slice(ei + 1).join("\n").trim() : "";
    const firstEngLine = english.split(/\r?\n/).map((l) => l.trim()).find(Boolean) || "";
    const translated = firstEngLine.length > 0 && !firstEngLine.startsWith(PLACEHOLDER);

    const hi = lines.findIndex((l) => l.trim() === HEB_MARKER);
    const hebSnip =
      hi >= 0
        ? lines
            .slice(hi + 1)
            .find((l) => l.trim())
            ?.replace(/<[^>]+>/g, "")
            .slice(0, 80) || ""
        : "";

    const rawBlock = trimmed + (trimmed.endsWith("\n") ? "" : "\n") + END_MARKER + "\n";

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

function* walkSlugPartFiles(simanDir) {
  for (const slugEntry of fs.readdirSync(simanDir, { withFileTypes: true })) {
    if (!slugEntry.isDirectory()) continue;
    const slugDir = path.join(simanDir, slugEntry.name);
    for (const f of fs
      .readdirSync(slugDir)
      .filter((x) => /^part-\d+\.txt$/i.test(x))
      .sort())
      yield path.resolve(path.join(slugDir, f));
  }
}

export function* walkYd001PartFiles(outRoot) {
  if (!fs.existsSync(outRoot)) return;

  const base = path.basename(outRoot);
  if (/^siman_\d{3}$/i.test(base)) {
    yield* walkSlugPartFiles(outRoot);
    return;
  }

  for (const e of fs.readdirSync(outRoot, { withFileTypes: true })) {
    if (!e.isDirectory() || !/^siman_\d{3}$/i.test(e.name)) continue;
    yield* walkSlugPartFiles(path.join(outRoot, e.name));
  }
}

export const walkOc001PartFiles = walkYd001PartFiles;

export function blockStableId(relPath, b) {
  const m = encodeURIComponent(b.marker || "_");
  return `${relPath.replace(/\\/g, "/")}#slug=${b.slug}#seif=${b.seif}#marker=${m}`;
}

export function relFromOutRoot(filePath, outRoot) {
  return path.relative(path.resolve(outRoot), path.resolve(filePath)).split(path.sep).join("/");
}
