/**
 * Renders newtry/newtryoutput/oc_318_very_full.txt → oc_318_very_full.docx
 * (tight paragraph spacing, Hebrew right-aligned — same styling as OC 253.)
 *
 * Run from repo root or from newtry:
 *   node newtry/OC_253/tools/render-oc318-very-full-docx.mjs
 *   cd newtry && node OC_253/tools/render-oc318-very-full-docx.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  LineRuleType,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWTRY = path.resolve(__dirname, "..", "..");
const IN_TXT = path.join(NEWTRY, "newtryoutput", "oc_318_very_full.txt");
const OUT_DOCX = path.join(NEWTRY, "newtryoutput", "oc_318_very_full.docx");

const HEBREW_RE = /[\u0590-\u05FF]/;

const SPACING_TIGHT = {
  before: 0,
  after: 80,
  line: 240,
  lineRule: LineRuleType.AUTO,
};

function isDivider(line) {
  return /^={10,}$/.test(line) || /^-{20,}$/.test(line);
}

function markerPara(marker) {
  const isHeb = HEBREW_RE.test(marker);
  return new Paragraph({
    spacing: SPACING_TIGHT,
    alignment: isHeb ? AlignmentType.RIGHT : undefined,
    bidirectional: isHeb ? true : undefined,
    children: [new TextRun({ text: marker, italics: true, rightToLeft: isHeb ? true : undefined })],
  });
}

function splitParagraphs(blockText) {
  const t = (blockText || "").replace(/\r\n/g, "\n").trimEnd();
  if (!t) return [];
  return t.split(/\n{2,}/g).map((p) => p.replace(/\n/g, "\n").trim()).filter(Boolean);
}

function makeBodyParagraph(text) {
  const isHeb = HEBREW_RE.test(text);
  return new Paragraph({
    spacing: SPACING_TIGHT,
    alignment: isHeb ? AlignmentType.RIGHT : undefined,
    bidirectional: isHeb ? true : undefined,
    children: [new TextRun({ text, rightToLeft: isHeb ? true : undefined })],
  });
}

function isMarkerLine(line) {
  const t = line.trim();
  if (!/^\(.+\)$/.test(t) || t.length > 48) return false;
  return true;
}

function shouldBreakAccumulation(nxt) {
  if (!nxt || !nxt.trim()) return true;
  if (isDivider(nxt)) return true;
  if (/^SEIF\s+\d+/i.test(nxt)) return true;
  if (/^OC\s+318\s*·\s*.+\s*·\s*Seif\s+/i.test(nxt)) return true;
  if (isMarkerLine(nxt)) return true;
  if (/—\s*markers:/.test(nxt)) return true;
  if (/^END\s*$/i.test(nxt.trim())) return true;
  if (/^Notes\s*$/i.test(nxt.trim())) return true;
  return false;
}

function buildDoc() {
  const raw = fs.readFileSync(IN_TXT, "utf8");
  const lines = raw.split(/\r?\n/);

  const children = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      children: [new TextRun("OC 318 — Very full compilation")],
    })
  );
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: SPACING_TIGHT,
      children: [new TextRun({ text: "Generated from oc_318_very_full.txt", italics: true })],
    })
  );

  let skippingIntroBullets = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isDivider(line)) continue;

    if (/^OC 318 — Very full compilation/i.test(line)) continue;

    if (/^Includes merged standalone translations:/i.test(line)) {
      skippingIntroBullets = true;
      continue;
    }
    if (skippingIntroBullets) {
      if (line.startsWith("•")) continue;
      if (!line.trim()) skippingIntroBullets = false;
      continue;
    }

    const seifMatch = /^SEIF\s+(\d+)/i.exec(line);
    if (seifMatch) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun(line.trim())],
        })
      );
      continue;
    }

    const sourceMatch = /^OC\s+318\s*·\s*(.+?)\s*·\s*Seif\s+.+/i.exec(line);
    if (sourceMatch) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(sourceMatch[1].trim())],
        })
      );
      continue;
    }

    if (/—\s*markers:/.test(line)) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: SPACING_TIGHT,
          children: [new TextRun(line.trim())],
        })
      );
      continue;
    }

    if (/^END\s*$/i.test(line.trim())) continue;

    if (/^Notes\s*$/i.test(line.trim())) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Notes")],
        })
      );
      continue;
    }

    if (isMarkerLine(line)) {
      children.push(markerPara(line.trim()));
      continue;
    }

    if (!line.trim()) continue;

    const buf = [line];
    while (i + 1 < lines.length && !shouldBreakAccumulation(lines[i + 1])) {
      buf.push(lines[i + 1]);
      i++;
    }
    const paragraphText = buf.join("\n").trim();
    for (const p of splitParagraphs(paragraphText)) {
      children.push(makeBodyParagraph(p));
    }
  }

  return new Document({
    sections: [{ children }],
  });
}

async function main() {
  if (!fs.existsSync(IN_TXT)) {
    throw new Error(`Missing input file: ${IN_TXT}`);
  }
  const doc = buildDoc();
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_DOCX, buf);
  console.log(`OK: wrote ${OUT_DOCX}`);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
