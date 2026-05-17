const fs = require("fs/promises");
const path = require("path");

const FILES = [
  "newtry/OC_001/output/kaf-hachayyim/part-001.txt",
  "newtry/OC_001/output/shulchan-arukh-kifshuto/part-001.txt",
];

const PLACEHOLDER =
  "English translation pending — replace after editing this block (keep Hebrew above intact).";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function splitForTranslation(input, maxLen = 120) {
  const lines = input.split(/\r?\n/);
  const out = [];
  let curr = "";
  for (const line of lines) {
    if (line.length > maxLen) {
      if (curr) {
        out.push(curr);
        curr = "";
      }
      for (let i = 0; i < line.length; i += maxLen) {
        out.push(line.slice(i, i + maxLen));
      }
      continue;
    }
    if (!line.trim()) {
      if (curr) {
        out.push(curr);
        curr = "";
      }
      out.push("");
      continue;
    }
    if (!curr) curr = line;
    else if ((curr + "\n" + line).length <= maxLen) curr += "\n" + line;
    else {
      out.push(curr);
      curr = line;
    }
  }
  if (curr) out.push(curr);
  return out;
}

function halakhicCleanup(text) {
  return text
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bthe LORD\b/g, "Hashem")
    .replace(/\bLORD\b/g, "Hashem")
    .replace(/\bSabbath\b/g, "Shabbat")
    .replace(/\bcommandments\b/gi, "mitzvot")
    .replace(/\bcommandment\b/gi, "mitzvah")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function translateChunk(chunk, attempt = 1) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
  try {
    const body = new URLSearchParams({ q: chunk });
    const res = await fetch(url, { method: "POST", body });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data[0].map((seg) => seg[0]).join("");
  } catch (err) {
    if (attempt >= 100) throw err;
    const waitMs = String(err).includes("429")
      ? 15000 + attempt * 1000
      : 1200 + attempt * 300;
    await sleep(waitMs);
    return translateChunk(chunk, attempt + 1);
  }
}

async function translateHebrewBlock(hebrew) {
  const parts = splitForTranslation(hebrew, 120);
  const translatedParts = [];
  for (const part of parts) {
    if (part === "") {
      translatedParts.push("");
      continue;
    }
    translatedParts.push((await translateChunk(part)).trim());
    await sleep(2500);
  }
  return halakhicCleanup(translatedParts.join("\n"));
}

async function processFile(filePath) {
  const abs = path.resolve(filePath);
  let blockNum = 0;

  while (true) {
    const raw = await fs.readFile(abs, "utf8");
    const nl = raw.includes("\r\n") ? "\r\n" : "\n";
    const regex =
      /(\*\*\*\* HEBREW \*\*\*\*\r?\n)([\s\S]*?)(\r?\n\*\*\*\* ENGLISH \*\*\*\*\r?\n)(English translation pending[^\r\n]*)(\r?\n\*\*\*\* END BLOCK \*\*\*\*)/;

    const m = raw.match(regex);
    if (!m) break;

    blockNum += 1;
    console.log(`${filePath}: translating block ${blockNum}...`);
    const translated = await translateHebrewBlock(m[2].trim());
    const replacement = m[1] + m[2] + m[3] + translated + m[5];
    const updated = raw.replace(regex, replacement).replace(/\r?\n/g, nl);
    await fs.writeFile(abs, updated, "utf8");
    console.log(`${filePath}: saved block ${blockNum}`);
  }

  const finalRaw = await fs.readFile(abs, "utf8");
  const remaining = (finalRaw.match(/English translation pending/g) || []).length;
  console.log(`${filePath}: remaining placeholders ${remaining}`);
}

async function main() {
  for (const file of FILES) {
    await processFile(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
