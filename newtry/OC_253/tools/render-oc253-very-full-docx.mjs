import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  LineRuleType,
} from "docx";

const ROOT = path.resolve(process.cwd(), ".."); // .../newtry
const IN_TXT = path.join(ROOT, "newtryoutput", "OC_253_very_full.txt");
const OUT_DOCX = path.join(ROOT, "newtryoutput", "OC_253_very_full.docx");

const HEBREW_RE = /[\u0590-\u05FF]/;

const SPACING_TIGHT = {
  before: 0,
  after: 80, // ~4pt
  line: 240, // 12pt
  lineRule: LineRuleType.AUTO,
};

function para(text = "", opts = {}) {
  return new Paragraph({
    ...opts,
    children: opts.children ?? [new TextRun(text)],
  });
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
  // Preserve intentional blank lines: treat double-newline as paragraph break.
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

function buildDoc() {
  const raw = fs.readFileSync(IN_TXT, "utf8");
  const lines = raw.split(/\r?\n/);

  const children = [];

  // Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      children: [new TextRun("OC 253 — Very full compilation")],
    })
  );
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: SPACING_TIGHT,
      children: [new TextRun({ text: "Generated from OC_253/output/*", italics: true })],
    })
  );
  // no blank paragraph; rely on spacing

  // Walk the merged text and restyle key lines.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the top banner separators (we already add a title).
    if (i < 30 && /^=+$/.test(line)) continue;
    if (i < 30 && line.startsWith("OC 253 — Very full compilation")) continue;
    if (i < 30 && line.startsWith("Per-seif order:")) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Per-seif order")] }));
      continue;
    }
    if (i < 60 && /^\d+\)/.test(line)) {
      children.push(makeBodyParagraph(line));
      continue;
    }

    // Section header
    const seifMatch = /^SEIF\s+(\d+)\s*$/.exec(line);
    if (seifMatch) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`SEIF ${seifMatch[1]}`)] }));
      continue;
    }

    // Source title
    const sourceMatch = /^OC 253 · (.+) · Seif (\d+)\s*$/.exec(line);
    if (sourceMatch) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(sourceMatch[1])] }));
      continue;
    }

    // Marker line (e.g. "(א)")
    if (/^\(.+\)$/.test(line.trim()) && line.trim().length <= 20) {
      children.push(markerPara(line.trim()));
      continue;
    }

    // Divider lines in the TXT
    if (/^-{20,}$/.test(line)) {
      // ignore; spacing already handled
      continue;
    }

    // Blank line -> spacing
    if (!line.trim()) {
      // ignore blank lines to avoid “spread out” look
      continue;
    }

    // For normal lines, collapse consecutive lines into a paragraph until a blank line.
    const buf = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() && !/^-{20,}$/.test(lines[i + 1])) {
      // stop before next headers/marker
      const nxt = lines[i + 1];
      if (/^SEIF\s+\d+\s*$/.test(nxt)) break;
      if (/^OC 253 · .+ · Seif \d+\s*$/.test(nxt)) break;
      if (/^\(.+\)$/.test(nxt.trim()) && nxt.trim().length <= 20) break;
      buf.push(nxt);
      i++;
    }
    const paragraphText = buf.join("\n").trim();
    // Preserve multi-paragraph text blocks if present in the merged TXT
    for (const p of splitParagraphs(paragraphText)) {
      children.push(makeBodyParagraph(p));
    }
  }

  const doc = new Document({
    sections: [{ children }],
  });

  return doc;
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

