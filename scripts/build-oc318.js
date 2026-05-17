const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle
} = require("docx");

const SOURCE_ORDER = [
  "Mechaber and Rama",
  "Tur",
  "Magen Avraham",
  "Taz",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto"
];

const EXCLUDED_SOURCE_ALIASES = new Set([
  "Mishna Berurah",
  "Mishbetzot Zahav",
  "Mishbetzos Zahav",
  "משנה ברורה",
  "משבצות זהב"
]);

const PAGE = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
};

function usage() {
  console.log(
    "Usage: node scripts/build-oc318.js --input data/oc318.full.json --output output [--suffix _V3] [--complete-only]"
  );
  console.log(
    "Optional: --suffix _V3  →  OC318_Complete_V3.docx (and per-seif OC318_seifN_V3.docx unless --complete-only)"
  );
  console.log(
    "Optional: --complete-only  →  write only OC318_Complete{sfx}.docx (no per-seif files)"
  );
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (token === "--output") {
      args.output = argv[i + 1];
      i += 1;
    } else if (token === "--suffix") {
      args.suffix = argv[i + 1];
      i += 1;
    } else if (token === "--complete-only") {
      args.completeOnly = true;
    } else if (token === "--help" || token === "-h") {
      args.help = true;
    }
  }
  return args;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readInput(inputPath) {
  const abs = path.resolve(inputPath);
  assert(fs.existsSync(abs), `Input file not found: ${abs}`);
  const raw = fs.readFileSync(abs, "utf8");
  const data = JSON.parse(raw);
  validateProjectData(data);
  return data;
}

function hasValue(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function validateProjectData(data) {
  assert(data && typeof data === "object", "Input JSON must be an object.");
  assert(Array.isArray(data.seifim), "Input JSON must include an array: seifim");

  for (const seif of data.seifim) {
    assert(Number.isInteger(seif.number), "Each seif needs integer field: number");
    assert(
      seif.sources && typeof seif.sources === "object",
      `Seif ${seif.number}: sources object is required`
    );

    for (const name of Object.keys(seif.sources)) {
      assert(
        !EXCLUDED_SOURCE_ALIASES.has(name),
        `Seif ${seif.number}: excluded source provided: ${name}`
      );
    }

    const mr = seif.sources["Mechaber and Rama"];
    assert(mr, `Seif ${seif.number}: source "Mechaber and Rama" is required`);
    assert(
      hasValue(mr.hebrew) && hasValue(mr.english),
      `Seif ${seif.number}: Mechaber and Rama must include full hebrew and english text`
    );

    for (const sourceName of SOURCE_ORDER.slice(1)) {
      const block = seif.sources[sourceName];
      if (!block) {
        continue;
      }
      assert(
        Array.isArray(block.notes),
        `Seif ${seif.number}: ${sourceName} must provide notes array`
      );
      for (let i = 0; i < block.notes.length; i += 1) {
        const note = block.notes[i];
        assert(
          hasValue(note.hebrew) && hasValue(note.english),
          `Seif ${seif.number}: ${sourceName} note #${i + 1} must include full hebrew and english`
        );
      }
    }
  }
}

function S(children, text) {
  children.push(
    new Paragraph({
      spacing: { before: 440, after: 160 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6" },
        bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6" }
      },
      children: [
        new TextRun({
          text,
          bold: true,
          size: 32,
          font: "Arial",
          color: "2E75B6"
        })
      ]
    })
  );
}

function src(children, text) {
  children.push(
    new Paragraph({
      spacing: { before: 300, after: 80 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999" }
      },
      children: [
        new TextRun({
          text,
          bold: true,
          size: 26,
          font: "Arial",
          color: "1A3A5C"
        })
      ]
    })
  );
}

function H(children, text) {
  children.push(
    new Paragraph({
      bidirectional: true,
      spacing: { before: 80, after: 60 },
      children: [new TextRun({ text, size: 24, font: "David", rtl: true })]
    })
  );
}

function E(children, text) {
  children.push(
    new Paragraph({
      spacing: { before: 40, after: 180 },
      children: [new TextRun({ text, size: 22, font: "Arial" })]
    })
  );
}

function N(children, hebrew, english) {
  children.push(
    new Paragraph({
      bidirectional: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({ text: hebrew, size: 22, font: "David", rtl: true })
      ]
    })
  );
  children.push(
    new Paragraph({
      spacing: { before: 20, after: 160 },
      children: [new TextRun({ text: english, size: 21, font: "Arial" })]
    })
  );
}

function titlePageParagraphs() {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120 },
      children: [
        new TextRun({
          text: "Orach Chayyim 318 — Din HaMevashel B'Shabbat",
          bold: true,
          size: 38,
          font: "Arial"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
      children: [
        new TextRun({
          text: "Sources: Mechaber | Rama | Tur | Magen Avraham | Taz | Biur Halacha | Shulchan Aruch K'pshuto",
          size: 20,
          font: "Arial",
          color: "777777"
        })
      ]
    })
  ];
}

function buildSeifChildren(seif) {
  const ch = [];
  S(ch, `Seif ${seif.number}`);

  src(ch, "Mechaber and Rama");
  H(ch, seif.sources["Mechaber and Rama"].hebrew);
  E(ch, seif.sources["Mechaber and Rama"].english);

  for (const sourceName of SOURCE_ORDER.slice(1)) {
    const block = seif.sources[sourceName];
    if (!block) {
      continue;
    }
    src(ch, sourceName);
    for (const note of block.notes) {
      N(ch, note.hebrew, note.english);
    }
  }
  return ch;
}

async function writeDocx(children, outputPath) {
  const doc = new Document({
    sections: [{ properties: { page: PAGE }, children }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buf);
}

async function run() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input || !args.output) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const data = readInput(args.input);
  const outputDir = path.resolve(args.output);
  ensureDir(outputDir);

  const suffix = args.suffix || process.env.OC318_DOC_SUFFIX || "";
  const sfx = suffix ? `${suffix}` : "";

  const sorted = [...data.seifim].sort((a, b) => a.number - b.number);
  const completeOnly =
    Boolean(args.completeOnly) ||
    process.env.OC318_COMPLETE_ONLY === "1" ||
    process.env.OC318_COMPLETE_ONLY === "true";

  const mergedChildren = [...titlePageParagraphs()];
  for (const seif of sorted) {
    const seifChildren = buildSeifChildren(seif);
    if (!completeOnly) {
      const filePath = path.join(outputDir, `OC318_seif${seif.number}${sfx}.docx`);
      await writeDocx([...titlePageParagraphs(), ...seifChildren], filePath);
      console.log(`Wrote ${filePath}`);
    }
    mergedChildren.push(...seifChildren);
  }

  const mergedPath = path.join(outputDir, `OC318_Complete${sfx}.docx`);
  await writeDocx(mergedChildren, mergedPath);
  console.log(`Wrote ${mergedPath}`);
}

run().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
