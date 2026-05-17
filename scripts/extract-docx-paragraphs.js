const fs = require("fs");
const path = require("path");

function usage() {
  console.log(
    "Usage: node scripts/extract-docx-paragraphs.js --xml data/source_document.xml --out data/source_paragraphs.txt"
  );
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--xml") {
      args.xml = argv[i + 1];
      i += 1;
    } else if (t === "--out") {
      args.out = argv[i + 1];
      i += 1;
    } else if (t === "--help" || t === "-h") {
      args.help = true;
    }
  }
  return args;
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.xml || !args.out) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const xmlPath = path.resolve(args.xml);
  const outPath = path.resolve(args.out);
  const xml = fs.readFileSync(xmlPath, "utf8");
  const pMatches = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];

  const lines = [];
  for (let i = 0; i < pMatches.length; i += 1) {
    const p = pMatches[i];
    const ts = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
    const t = decodeXml(ts.join("")).replace(/\s+/g, " ").trim();
    if (t.length) {
      lines.push(`${i + 1}\t${t}`);
    }
  }
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${outPath} with ${lines.length} non-empty paragraphs`);
}

main();
