const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SOURCE_DOCX_EXCLUDE = "OC318_NEW_seif1.docx";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function parseLine(line) {
  const idx = line.indexOf("\t");
  if (idx === -1) {
    return "";
  }
  return line.slice(idx + 1).trim();
}

function stripNikkud(text) {
  return text.replace(/[\u0591-\u05C7]/g, "");
}

function isSeifHeaderText(text) {
  const clean = stripNikkud(text);
  if (!/^\([א-ת]{1,3}\)\s/.test(clean)) {
    return false;
  }
  // The primary SA seif header lines in this corpus are fully vocalized.
  const nikkudCount = (text.match(/[\u0591-\u05C7]/g) || []).length;
  return nikkudCount >= 20;
}

function isSkipLine(text) {
  return (
    text.includes("הצג מפרשים נוספים") ||
    text.includes("טורטור+שו״ע") ||
    text.includes("בבלי ") ||
    text.includes("רמב״ם ") ||
    text.includes("(_plain)")
  );
}

function isNumberedHebrewNote(text) {
  const clean = stripNikkud(text).trim();
  return /^\([א-ת]{1,3}\)/.test(clean);
}

function isKpshutoStart(text) {
  const clean = stripNikkud(text);
  return clean.includes("הקדמה לסעיף");
}

function splitNumberedGroups(lines) {
  const groups = [];
  let cur = [];
  for (const line of lines) {
    if (!isNumberedHebrewNote(line)) {
      continue;
    }
    const clean = stripNikkud(line);
    const startsAleph = /^\(א\)/.test(clean);
    if (startsAleph && cur.length > 0) {
      groups.push(cur);
      cur = [line];
    } else {
      cur.push(line);
    }
  }
  if (cur.length > 0) {
    groups.push(cur);
  }
  return groups;
}

async function translateHeToEn(text, cache) {
  if (!text || !text.trim()) {
    return "";
  }
  if (cache[text]) {
    return cache[text];
  }

  const chunks = [];
  if (text.length <= 3000) {
    chunks.push(text);
  } else {
    const parts = text.split(/([.;:!?])\s+/);
    let buf = "";
    for (let i = 0; i < parts.length; i += 1) {
      const p = parts[i];
      if (!p) {
        continue;
      }
      if ((buf + p).length > 2800) {
        if (buf.trim()) {
          chunks.push(buf.trim());
        }
        buf = p;
      } else {
        buf += p;
      }
    }
    if (buf.trim()) {
      chunks.push(buf.trim());
    }
  }

  const translatedParts = [];
  for (const chunk of chunks) {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=he&tl=en&dt=t&q=" +
      encodeURIComponent(chunk);
    const res = await fetch(url);
    if (!res.ok) {
      translatedParts.push(chunk);
      continue;
    }
    const data = await res.json();
    const t = (data[0] || [])
      .map((x) => (Array.isArray(x) ? x[0] : ""))
      .join("")
      .trim();
    translatedParts.push(t || chunk);
  }
  const translated = translatedParts.join(" ").trim();
  cache[text] = translated;
  return translated;
}

async function buildData(paragraphsPath, outJsonPath) {
  const lines = fs.readFileSync(paragraphsPath, "utf8").split(/\r?\n/);
  const rows = lines.map(parseLine).filter(Boolean);

  const seifim = [];
  let current = null;

  for (const row of rows) {
    if (isSeifHeaderText(row)) {
      if (current) {
        seifim.push(current);
      }
      current = {
        number: seifim.length + 1,
        mechaberHebrew: row,
        rawBody: []
      };
      continue;
    }
    if (!current) {
      continue;
    }
    if (isSkipLine(row)) {
      continue;
    }
    current.rawBody.push(row);
  }
  if (current) {
    seifim.push(current);
  }

  // Keep OC318 expected size if source has extras.
  const first19 = seifim.slice(0, 19);
  const cachePath = path.resolve("data/translation-cache.json");
  const cache = fs.existsSync(cachePath)
    ? JSON.parse(fs.readFileSync(cachePath, "utf8"))
    : {};

  const out = { seifim: [] };
  for (const seif of first19) {
    const mechaberEnglish = await translateHeToEn(seif.mechaberHebrew, cache);
    const kpshutoIdx = seif.rawBody.findIndex((x) => isKpshutoStart(x));
    const pre = kpshutoIdx === -1 ? seif.rawBody : seif.rawBody.slice(0, kpshutoIdx);
    const kpshuto = kpshutoIdx === -1 ? [] : seif.rawBody.slice(kpshutoIdx);

    const numberedGroups = splitNumberedGroups(pre);
    const turHeb = numberedGroups[0] || [];
    const magenHeb = numberedGroups[1] || [];
    const tazHeb = numberedGroups[2] || [];

    // Biur Halacha in this corpus appears as non-numbered explanatory lines.
    const biurHeb = pre.filter((x) => !isNumberedHebrewNote(x));

    async function mapNotes(arr) {
      const mapped = [];
      for (const heb of arr) {
        const english = await translateHeToEn(heb, cache);
        mapped.push({ hebrew: heb, english });
      }
      return mapped;
    }

    const turNotes = await mapNotes(turHeb);
    const magenNotes = await mapNotes(magenHeb);
    const tazNotes = await mapNotes(tazHeb);
    const biurNotes = await mapNotes(biurHeb);
    const kpshutoNotes = await mapNotes(kpshuto);

    out.seifim.push({
      number: seif.number,
      sources: {
        "Mechaber and Rama": {
          hebrew: seif.mechaberHebrew,
          english: mechaberEnglish
        },
        ...(turNotes.length ? { Tur: { notes: turNotes } } : {}),
        ...(magenNotes.length ? { "Magen Avraham": { notes: magenNotes } } : {}),
        ...(tazNotes.length ? { Taz: { notes: tazNotes } } : {}),
        ...(biurNotes.length ? { "Biur Halacha": { notes: biurNotes } } : {}),
        "Shulchan Aruch K'pshuto": {
          notes: kpshutoNotes
        }
      }
    });
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(out, null, 2), "utf8");
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf8");
}

async function main() {
  ensureDir("data");
  ensureDir("output");

  // Extract source document.xml from the large corpus docx.
  const ps = `
  $src = Get-ChildItem -File *.docx | Where-Object { $_.Name -ne '${SOURCE_DOCX_EXCLUDE}' } | Select-Object -First 1;
  if (-not $src) { throw 'Source DOCX not found'; }
  Add-Type -AssemblyName System.IO.Compression.FileSystem;
  $zip = [System.IO.Compression.ZipFile]::OpenRead($src.FullName);
  $entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' };
  $reader = New-Object System.IO.StreamReader($entry.Open());
  $xml = $reader.ReadToEnd();
  $reader.Close();
  $zip.Dispose();
  Set-Content -Path 'data/source_document.xml' -Value $xml -Encoding UTF8;
  `;
  run(`powershell -NoProfile -Command "${ps.replace(/\r?\n/g, " ")}"`);

  run(
    "node scripts/extract-docx-paragraphs.js --xml data/source_document.xml --out data/source_paragraphs.txt"
  );

  await buildData(
    path.resolve("data/source_paragraphs.txt"),
    path.resolve("data/oc318.full.json")
  );

  run("node scripts/build-oc318.js --input data/oc318.full.json --output output");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
