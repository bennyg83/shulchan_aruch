import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd(), ".."); // .../newtry
const OUTPUT_DIR = path.join(ROOT, "OC_253", "output");
const OUT_FILE = path.join(ROOT, "newtryoutput", "OC_253_very_full.txt");

const ORDER_FIXED = [
  "mechaber",
  "tur", // may not exist
  "magen-avraham",
  "taz",
  "beer-hagolah",
  "beur-hagra",
  "baer-heitev",
  "hagahot-r-akiva-eiger",
  "mishna-berurah",
];

function listPartFiles(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listPartFiles(p));
    else if (/part-\d+\.txt$/i.test(ent.name)) out.push(p);
  }
  return out.sort((a, b) => a.localeCompare(b, "en"));
}

function extractBetween(lines, startIdx, startMarker, endMarker) {
  const start = lines.indexOf(startMarker, startIdx);
  if (start === -1) return { text: "", next: lines.length };
  const end = lines.indexOf(endMarker, start + 1);
  if (end === -1) return { text: lines.slice(start + 1).join("\n").trim(), next: lines.length };
  return { text: lines.slice(start + 1, end).join("\n").trim(), next: end + 1 };
}

function parseBlocks(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] !== "**** OC253 SOURCE BLOCK ****") continue;
    const slug = (lines[i + 1] || "").replace(/^slug:\s*/, "").trim();
    const seifStr = (lines[i + 2] || "").replace(/^seif:\s*/, "").trim();
    const marker = (lines[i + 3] || "").replace(/^marker:\s*/, "").trim();
    const seif = Number.parseInt(seifStr, 10);

    const heb = extractBetween(lines, i, "**** HEBREW ****", "**** ENGLISH ****");
    const eng = extractBetween(lines, i, "**** ENGLISH ****", "**** END BLOCK ****");

    blocks.push({
      slug,
      seif: Number.isFinite(seif) ? seif : null,
      marker,
      hebrew: heb.text,
      english: eng.text,
      sourceFile: filePath,
      _order: blocks.length,
    });
    i = eng.next - 1;
  }
  return blocks;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function build() {
  const partFiles = listPartFiles(OUTPUT_DIR);
  const all = partFiles.flatMap(parseBlocks).filter((b) => b.seif !== null);

  const bySeif = new Map();
  for (const b of all) {
    if (!bySeif.has(b.seif)) bySeif.set(b.seif, []);
    bySeif.get(b.seif).push(b);
  }

  const seifNums = [...bySeif.keys()].sort((a, b) => a - b);

  const out = [];
  out.push("================================================================================");
  out.push("OC 253 — Very full compilation (merged from OC_253/output/*)");
  out.push("================================================================================");
  out.push("");
  out.push("Per-seif order:");
  out.push("1) Mechaber and Rama");
  out.push("2) Tur");
  out.push("3) Magen Avraham");
  out.push("4) Taz");
  out.push("5) Be'er haGolah");
  out.push("6) Biur haGra");
  out.push("7) Be'er Heitev");
  out.push("8) Hagahot R. Akiva Eiger");
  out.push("9) Mishna Berurah");
  out.push("10) All remaining commentaries (alphabetical by slug)");
  out.push("");

  for (const seif of seifNums) {
    const blocks = bySeif.get(seif);
    // group by slug, preserve file order within slug
    const bySlug = new Map();
    for (const b of blocks) {
      if (!bySlug.has(b.slug)) bySlug.set(b.slug, []);
      bySlug.get(b.slug).push(b);
    }
    for (const arr of bySlug.values()) arr.sort((x, y) => x._order - y._order);

    const slugsPresent = [...bySlug.keys()];
    const fixed = ORDER_FIXED.filter((s) => slugsPresent.includes(s));
    const remaining = slugsPresent
      .filter((s) => !fixed.includes(s))
      .sort((a, b) => a.localeCompare(b, "en"));
    const emitOrder = [...fixed, ...remaining];

    out.push("================================================================================");
    out.push(`SEIF ${seif}`);
    out.push("================================================================================");
    out.push("");

    for (const slug of emitOrder) {
      const title = titleFromSlug(slug);
      out.push(`OC 253 · ${title} · Seif ${seif}`);
      out.push("");
      for (const b of bySlug.get(slug) || []) {
        out.push(`(${b.marker || "_"})`);
        out.push("");
        if (b.hebrew) out.push(b.hebrew);
        out.push("");
        if (b.english) out.push(b.english);
        out.push("");
        out.push("--------------------------------------------------------------------------------");
        out.push("");
      }
      out.push("");
    }
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, out.join("\n"), "utf8");
  console.log(`OK: wrote ${OUT_FILE}`);
}

build();

