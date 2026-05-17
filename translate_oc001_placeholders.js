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
    if (!curr) {
      curr = line;
    } else if ((curr + "\n" + line).length <= maxLen) {
      curr += "\n" + line;
    } else {
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
    .replace(/\bHoly One, blessed be He\b/gi, "the Holy One, blessed be He")
    .replace(/\bcommandments\b/gi, "mitzvot")
    .replace(/\bcommandment\b/gi, "mitzvah")
    .replace(/\bhouse of prayer\b/gi, "synagogue")
    .replace(/\bHouse of prayer\b/g, "Synagogue")
    .replace(/\bSabbath\b/g, "Shabbat")
    .replace(/\bholiday\b/gi, "Yom Tov")
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
    const errText = String(err);
    if (errText.includes("429")) {
      if (attempt >= 100) throw err;
      await sleep(15000 + 1000 * attempt);
      return translateChunk(chunk, attempt + 1);
    }
    if (attempt >= 20) throw err;
    await sleep(600 * attempt);
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
    const translated = await translateChunk(part);
    translatedParts.push(translated.trim());
    await sleep(2500);
  }
  return halakhicCleanup(translatedParts.join("\n"));
}

async function processFile(filePath) {
  const abs = path.resolve(filePath);
  const raw = await fs.readFile(abs, "utf8");
  const nl = raw.includes("\r\n") ? "\r\n" : "\n";

  const blockRegex =
    /(\*\*\*\* HEBREW \*\*\*\*\r?\n)([\s\S]*?)(\r?\n\*\*\*\* ENGLISH \*\*\*\*\r?\n)(English translation pending[^\r\n]*)(\r?\n\*\*\*\* END BLOCK \*\*\*\*)/g;

  const matches = [...raw.matchAll(blockRegex)];
  if (matches.length === 0) {
    return { filePath, replaced: 0 };
  }

  let out = "";
  let last = 0;
  for (const m of matches) {
    const idx = m.index;
    out += raw.slice(last, idx);
    const hebrewBody = m[2].trim();
    const translated = await translateHebrewBlock(hebrewBody);
    out += m[1] + m[2] + m[3] + translated + m[5];
    last = idx + m[0].length;
  }
  out += raw.slice(last);

  await fs.writeFile(abs, out.replace(/\r?\n/g, nl), "utf8");
  return { filePath, replaced: matches.length };
}

async function main() {
  const summary = [];
  for (const file of FILES) {
    const result = await processFile(file);
    summary.push(result);
    console.log(`${result.filePath}: replaced ${result.replaced}`);
  }
  const total = summary.reduce((acc, s) => acc + s.replaced, 0);
  console.log(`TOTAL_REPLACED=${total}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
