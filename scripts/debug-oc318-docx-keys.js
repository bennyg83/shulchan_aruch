/**
 * Print (docxKey, seif, source, preview) for each English paragraph.
 * Usage: node scripts/debug-oc318-docx-keys.js --input data/oc318.full.json [--offset 2] [--limit 30]
 */
const fs = require("fs");
const path = require("path");
const { walkEnglishParagraphs } = require("./oc318-docx-key-map");

function parseArgs(argv) {
  const args = { offset: 2, limit: 80, input: null };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      args.input = argv[++i];
    } else if (t === "--offset") {
      args.offset = Number(argv[++i]);
    } else if (t === "--limit") {
      args.limit = Number(argv[++i]);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.input) {
    console.error("Usage: node scripts/debug-oc318-docx-keys.js --input data/oc318.full.json [--offset 2] [--limit 30]");
    process.exit(1);
  }
  const inputPath = path.resolve(args.input);
  const obj = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const offset = Number.isFinite(args.offset) ? args.offset : 2;
  let n = 0;
  walkEnglishParagraphs(obj, offset, (ctx) => {
    console.log(`${ctx.docxKey}\tseif ${ctx.seif}\t${ctx.source}\t${ctx.preview}`);
    n += 1;
    if (n >= args.limit) {
      process.exit(0);
    }
  });
}

main();
