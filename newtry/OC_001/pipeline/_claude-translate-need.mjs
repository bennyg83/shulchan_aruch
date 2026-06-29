#!/usr/bin/env node
/** Translate need blocks via claude CLI into hand-en SIMAN file */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const max = Number(process.argv[3] || 999);
if (!siman) {
  console.error("usage: node _claude-translate-need.mjs <siman> [max]");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(fs.readFileSync(path.join(__dirname, "work", "slot13-need-all.json"), "utf8"));
const items = need.filter((x) => x.siman === siman).slice(0, max);

const SYSTEM = `Halachic Hebrew-to-English for Shulchan Aruch OC. Rules:
- Translate every word; no omissions.
- Hashem not God/LORD; Shabbat not Sabbath; Magen Avraham, Mishna Berurah, Taz, Beit Yosef.
- Expand Hebrew abbreviations; Arabic numerals for siman/seif.
- Rama glosses: {Rama: ...}
- Note markers: prefix (א) etc.
- Never use: "there in the", "Capernaum", "Lord's Prayer", "according to the"
- Output ONLY English translation, no labels or fences.`;

const T = {};
for (const it of items) {
  const key = `${it.rel}|${it.key}`;
  const prompt = `${SYSTEM}\n\nHebrew:\n${it.hePlain}\n\nEnglish:`;
  const claude =
    process.env.CLAUDE_CLI_CMD ||
    (process.platform === "win32"
      ? "C:\\Users\\binya\\AppData\\Roaming\\npm\\claude.cmd"
      : "claude");
  const r = spawnSync(claude, ["-p", prompt, "--output-format", "text"], {
    encoding: "utf8",
    timeout: 120000,
    maxBuffer: 10 * 1024 * 1024,
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    console.error("fail", key, r.stderr || r.error);
    process.exit(1);
  }
  let en = (r.stdout || "").trim();
  en = en.replace(/^Translation:\s*/i, "").replace(/^English:\s*/i, "");
  T[key] = en;
  console.log("ok", key, en.length);
}

const out = path.join(__dirname, `_hand-en-${siman}-slot13.mjs`);
const body = `/** worker-slot-13 — siman ${siman} claude EN (${Object.keys(T).length} blocks) */\nexport const T = ${JSON.stringify(T, null, 2)};\n`;
fs.writeFileSync(out, body, "utf8");
console.log("wrote", out);
