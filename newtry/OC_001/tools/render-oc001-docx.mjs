/**
 * OC 001 → DOCX: Mechaber & Rama, Magen Avraham, Taz, Biur HaGra, Baer Heitev only.
 * Output is interwoven by seif: for each seif, all five layers appear in order (skipping empty layers).
 *
 * Reads block-format files from output/<slug>/part-001.txt.
 *
 * Usage (from OC_001):
 *   node tools/render-oc001-docx.mjs
 *
 * Output:
 *   ../newtryoutput/OC_001.docx
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
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  BorderStyle,
  VerticalAlignTable,
} from "docx";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC001_ROOT = path.resolve(__dirname, "..");
const NEWTRY_OUTPUT = path.resolve(OC001_ROOT, "..", "newtryoutput");
const OUT_DOCX = path.join(NEWTRY_OUTPUT, "OC_001.docx");

const SPACING_TIGHT = {
  before: 0,
  after: 80,
  line: 240,
  lineRule: LineRuleType.AUTO,
};

/** Order and titles for export (slug must match output/ folder name). */
const SOURCES = [
  { slug: "mechaber", title: "Mechaber & Rama" },
  { slug: "magen-avraham", title: "Magen Avraham" },
  { slug: "taz", title: "Taz" },
  { slug: "beur-hagra", title: "Biur HaGra" },
  { slug: "baer-heitev", title: "Baer Heitev" },
];

function splitParagraphs(blockText) {
  const t = (blockText || "").replace(/\r\n/g, "\n").trimEnd();
  if (!t) return [];
  return t.split(/\n{2,}/g).map((p) => p.replace(/\n/g, "\n").trim()).filter(Boolean);
}

/** Light borders between English | Hebrew columns */
const TABLE_BORDER = {
  style: BorderStyle.SINGLE,
  size: 6,
  color: "CCCCCC",
};

const CELL_MARGIN = {
  marginUnitType: WidthType.DXA,
  top: 80,
  bottom: 80,
  left: 120,
  right: 120,
};

function englishParagraphs(text) {
  const parts = splitParagraphs(text);
  if (!parts.length) {
    return [
      new Paragraph({
        spacing: SPACING_TIGHT,
        alignment: AlignmentType.LEFT,
        children: [new TextRun("")],
      }),
    ];
  }
  return parts.map(
    (t) =>
      new Paragraph({
        spacing: SPACING_TIGHT,
        alignment: AlignmentType.LEFT,
        children: [new TextRun(t)],
      })
  );
}

/** Explicit right alignment + RTL runs so Hebrew sits on the right edge of the column. */
function hebrewParagraphs(text) {
  const parts = splitParagraphs(text);
  if (!parts.length) {
    return [
      new Paragraph({
        spacing: SPACING_TIGHT,
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        children: [new TextRun({ text: "", rightToLeft: true })],
      }),
    ];
  }
  return parts.map(
    (t) =>
      new Paragraph({
        spacing: SPACING_TIGHT,
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        children: [new TextRun({ text: t, rightToLeft: true })],
      })
  );
}

/** One row: English (left column) | Hebrew (right column). */
function parallelBlockTable(block) {
  const leftChildren = englishParagraphs(block.en);
  const rightChildren = hebrewParagraphs(block.he);

  return new Table({
    columnWidths: [4680, 4680],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top: TABLE_BORDER,
      bottom: TABLE_BORDER,
      left: TABLE_BORDER,
      right: TABLE_BORDER,
      insideHorizontal: TABLE_BORDER,
      insideVertical: TABLE_BORDER,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlignTable.TOP,
            margins: CELL_MARGIN,
            children: leftChildren,
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlignTable.TOP,
            margins: CELL_MARGIN,
            children: rightChildren,
          }),
        ],
      }),
    ],
  });
}

function seifHeading(seif, marker) {
  const n = String(seif ?? "").trim();
  const m = String(marker ?? "").trim();
  const trivial = !m || m === "_" || m === "main";
  const label = trivial ? `Seif ${n}` : `Seif ${n} · ${m}`;
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: SPACING_TIGHT,
    children: [new TextRun(label)],
  });
}

function seifKey(block) {
  const n = parseInt(String(block?.seif ?? "").trim(), 10);
  return Number.isFinite(n) ? n : NaN;
}

function sortBlocks(blocks) {
  return [...blocks].sort((a, b) => {
    const na = seifKey(a);
    const nb = seifKey(b);
    if (na !== nb) return na - nb;
    return String(a.marker).localeCompare(String(b.marker), "he");
  });
}

/** Union of numeric seif indices appearing in any loaded commentary. */
function collectSeifNumbers(bySlug) {
  const set = new Set();
  for (const blocks of Object.values(bySlug)) {
    for (const b of blocks) {
      const n = seifKey(b);
      if (!Number.isNaN(n)) set.add(n);
    }
  }
  return [...set].sort((a, b) => a - b);
}

function loadAllSources() {
  /** @type {Record<string, ReturnType<typeof parseBlocksInFile>>} */
  const bySlug = {};
  for (const { slug } of SOURCES) {
    const fp = path.join(OC001_ROOT, "output", slug, "part-001.txt");
    if (!fs.existsSync(fp)) {
      console.warn("Missing file (skipped):", fp);
      bySlug[slug] = [];
      continue;
    }
    const raw = fs.readFileSync(fp, "utf8");
    const blocks = parseBlocksInFile(raw).filter((b) => b.slug === slug);
    bySlug[slug] = sortBlocks(blocks);
    if (!blocks.length) console.warn("No blocks parsed for:", slug);
  }
  return bySlug;
}

function pushBlockParagraphs(children, block) {
  children.push(seifHeading(block.seif, block.marker));
  children.push(parallelBlockTable(block));
}

async function main() {
  const children = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      children: [new TextRun("Orach Chayyim 001")],
    })
  );
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: SPACING_TIGHT,
      children: [
        new TextRun({
          text: "Interwoven by seif · English left · Hebrew right · Mechaber & Rama · Magen Avraham · Taz · Biur HaGra · Baer Heitev",
          italics: true,
        }),
      ],
    })
  );

  const bySlug = loadAllSources();
  const seifNums = collectSeifNumbers(bySlug);

  for (const seifNum of seifNums) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { ...SPACING_TIGHT, before: 280 },
        children: [new TextRun(`Seif ${seifNum}`)],
      })
    );

    for (const { slug, title } of SOURCES) {
      const blocks = (bySlug[slug] ?? []).filter((b) => seifKey(b) === seifNum);
      if (!blocks.length) continue;

      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { ...SPACING_TIGHT, before: 120 },
          children: [new TextRun(title)],
        })
      );

      for (const block of blocks) {
        pushBlockParagraphs(children, block);
      }
    }
  }

  fs.mkdirSync(NEWTRY_OUTPUT, { recursive: true });
  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_DOCX, buf);
  console.log("OK:", OUT_DOCX);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
