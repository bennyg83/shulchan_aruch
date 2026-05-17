const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { limit: 150 };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--xml") {
      args.xml = argv[i + 1];
      i += 1;
    } else if (t === "--out") {
      args.out = argv[i + 1];
      i += 1;
    } else if (t === "--limit") {
      args.limit = Number(argv[i + 1] || "150");
      i += 1;
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

const args = parseArgs(process.argv);
if (!args.xml || !args.out) {
  console.error("Usage: node scripts/inspect-docx-structure.js --xml <path> --out <path> [--limit 150]");
  process.exit(1);
}

const xml = fs.readFileSync(path.resolve(args.xml), "utf8");
const pMatches = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
const out = [];

for (let i = 0; i < pMatches.length && out.length < args.limit; i += 1) {
  const p = pMatches[i];
  const styleMatch = p.match(/<w:pStyle[^>]*w:val="([^"]+)"/);
  const style = styleMatch ? styleMatch[1] : "";
  const ts = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
  const text = decodeXml(ts.join("")).replace(/\s+/g, " ").trim();
  if (!text) {
    continue;
  }
  out.push(`${i + 1}\t${style}\t${text}`);
}

fs.writeFileSync(path.resolve(args.out), out.join("\n"), "utf8");
console.log(`Wrote ${args.out} with ${out.length} rows`);
