/**
 * Package oc_318_very_full.txt → data/corpus/orach_chaim/318/seif_XXX.json + manifest.
 * Spec: docs/torah_corpus_reader_cursor_spec.md (structured JSON first).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const DEFAULT_INPUT = path.resolve(ROOT, "../../newtryoutput/oc_318_very_full.txt");
const OUT_CORPUS = path.join(ROOT, "data/corpus/orach_chaim/318");
const OUT_MANIFEST = path.join(ROOT, "data/manifests/orach_chaim_318_manifest.json");
const OUT_HTML_DIR = path.join(ROOT, "exports/listening-html/oc318");

const SEP_LINE = /^={40,}\s*$/;

function parseArgs(argv) {
  let input = DEFAULT_INPUT;
  let dryRun = false;
  let writeHtml = false;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) {
      input = path.resolve(argv[++i]);
    } else if (a === "--dry-run") dryRun = true;
    else if (a === "--html") writeHtml = true;
  }
  return { input, dryRun, writeHtml };
}

function hasHebrew(s) {
  return /[\u0590-\u05FF]/.test(s);
}

/** Split a block that starts after an OC 318 banner or marker subsection into Hebrew vs English paragraphs. */
function splitHeEn(blockText) {
  const lines = blockText.split(/\r?\n/);
  const he = [];
  const en = [];
  let mode = "he";

  function looksEnglishLine(s) {
    const t = s.trim();
    if (!t) return false;
    if (hasHebrew(t)) return false;
    return /[a-zA-Z]/.test(t);
  }

  for (const line of lines) {
    if (mode === "he") {
      if (looksEnglishLine(line) && he.some((l) => l.trim())) {
        mode = "en";
        en.push(line);
      } else if (looksEnglishLine(line) && !he.some((l) => l.trim())) {
        en.push(line);
        mode = "en";
      } else {
        he.push(line);
      }
    } else {
      en.push(line);
    }
  }

  return {
    hebrew: he.join("\n").trim(),
    english: en.join("\n").trim(),
  };
}

/** Split very-full file into seif bodies (text after the SEIF banner through next SEIF). */
function splitSeifs(raw) {
  const re =
    /^={40,}\s*\r?\nSEIF\s+(\d+)\s*(?:\(([^)]*)\))?\s*\r?\n={40,}/gm;
  const matches = [...raw.matchAll(re)];
  const result = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const num = Number(m[1]);
    const markerLabel = String(m[2] ?? "").trim();
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
    result.push({ num, markerLabel, body: raw.slice(start, end) });
  }
  return result;
}

/**
 * Turn one seif body into segments: explicit `OC 318 · … · Seif` blocks vs surrounding bands
 * (metadata, tur-sources, commentary banners, etc.). Bands end at the next long === fence or OC row.
 */
function parseSeifBody(body) {
  const lines = body.split(/\r?\n/);
  const segments = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (SEP_LINE.test(line.trim())) {
      i++;
      continue;
    }
    if (line.startsWith("OC 318 ·")) {
      const banner = line.replace(/^OC 318 ·\s*/, "").trim();
      i++;
      const textLines = [];
      while (i < lines.length) {
        const L = lines[i];
        if (L.startsWith("OC 318 ·")) break;
        if (SEP_LINE.test(L.trim())) break;
        textLines.push(L);
        i++;
      }
      const blockText = textLines.join("\n").trim();
      const { hebrew, english } = splitHeEn(blockText);
      segments.push({
        type: "oc318",
        banner,
        hebrew,
        english,
      });
      continue;
    }

    const header = line.trim();
    i++;
    const bodyLines = [];
    while (i < lines.length) {
      const L = lines[i];
      if (L.startsWith("OC 318 ·")) break;
      if (SEP_LINE.test(L.trim())) break;
      bodyLines.push(L);
      i++;
    }
    const bandBody = bodyLines.join("\n").trim();
    if (header || bandBody) {
      segments.push({
        type: "band",
        header,
        body: bandBody,
      });
    }
  }

  return segments;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(outPath, obj, dryRun) {
  const text = JSON.stringify(obj, null, 2) + "\n";
  if (!dryRun) {
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, text, "utf8");
  }
  return text.length;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderListeningHtml(seifDoc) {
  const { siman, seif, segments } = seifDoc;
  const parts = [];
  parts.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OC ${siman} · Seif ${seif}</title>
</head>
<body>
  <article>
    <header><h1>Orach Chayyim ${siman} · Seif ${seif}</h1></header>
`);

  for (const seg of segments) {
    if (seg.type === "oc318") {
      parts.push(`    <section data-kind="oc318" dir="rtl" lang="he">`);
      parts.push(`      <p><em>${escapeHtml(seg.banner)}</em></p>`);
      parts.push(`      <div class="he">${escapeHtml(seg.hebrew).replace(/\n/g, "<br />\n")}</div>`);
      parts.push(`    </section>`);
      parts.push(`    <section data-kind="oc318-en" lang="en">`);
      parts.push(`      <div class="en">${escapeHtml(seg.english).replace(/\n/g, "<br />\n")}</div>`);
      parts.push(`    </section>`);
    } else if (seg.type === "band") {
      parts.push(`    <section data-kind="band" lang="he">`);
      parts.push(`      <h2>${escapeHtml(seg.header)}</h2>`);
      parts.push(`      <pre style="white-space:pre-wrap;font:inherit;">${escapeHtml(seg.body)}</pre>`);
      parts.push(`    </section>`);
    }
  }

  parts.push(`  </article>
</body>
</html>
`);
  return parts.join("\n");
}

function main() {
  const { input, dryRun, writeHtml } = parseArgs(process.argv);

  if (!fs.existsSync(input)) {
    console.error("Input not found:", input);
    process.exit(1);
  }

  const raw = fs.readFileSync(input, "utf8");
  const seifs = splitSeifs(raw);

  if (!seifs.length) {
    console.error("No SEIF blocks found. Expected banners like:\n====\nSEIF 1 (א)\n====");
    process.exit(1);
  }

  const manifest = {
    schemaVersion: 1,
    siman: 318,
    title_he: "אורח חיים שי״ח",
    title_en: "Orach Chayyim 318",
    source_file: path.relative(ROOT, input).replace(/\\/g, "/"),
    generated_at: new Date().toISOString(),
    seifim: [],
  };

  let totalBytes = 0;

  for (const { num, markerLabel, body } of seifs) {
    const pad = String(num).padStart(3, "0");
    const segments = parseSeifBody(body);
    const doc = {
      schemaVersion: 1,
      siman: 318,
      seif: num,
      marker_label: markerLabel || null,
      segments,
    };

    const outFile = path.join(OUT_CORPUS, `seif_${pad}.json`);
    totalBytes += writeJson(outFile, doc, dryRun);

    manifest.seifim.push({
      n: num,
      marker_label: markerLabel || null,
      corpus_rel: `data/corpus/orach_chaim/318/seif_${pad}.json`,
      segment_count: segments.length,
    });

    if (writeHtml && !dryRun) {
      ensureDir(OUT_HTML_DIR);
      const html = renderListeningHtml(doc);
      fs.writeFileSync(path.join(OUT_HTML_DIR, `seif_${pad}.html`), html, "utf8");
    }
  }

  totalBytes += writeJson(OUT_MANIFEST, manifest, dryRun);

  console.log(
    dryRun ? "[dry-run] Would write" : "Wrote",
    manifest.seifim.length,
    "seif JSON files + manifest."
  );
  console.log("Corpus dir:", OUT_CORPUS);
  console.log("Manifest:", OUT_MANIFEST);
  if (writeHtml) console.log("Listening HTML:", OUT_HTML_DIR);
  console.log("Approx bytes:", totalBytes);
}

main();
