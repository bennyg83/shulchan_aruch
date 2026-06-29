#!/usr/bin/env node
/** Ollama retranslate blocks listed in work/need-dump-NNN.json → hand-slot13 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = (process.env.OC001_OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/$/, "");
const model = process.env.OC001_OLLAMA_MODEL || "qwen2.5:14b-instruct";

const SYSTEM = `You are a halachic Hebrew-to-English translator for Shulchan Aruch Orach Chayim.
Rules:
- Translate every word from the Hebrew. No omissions, no summaries, no commentary of your own.
- Use: Shabbat, Yom Tov, muktzeh, melacha, Hashem (not God/LORD/Lord's Prayer).
- Rama glosses (הגה): {Rama: ...} once after opening brace.
- Expand Hebrew abbreviations in English (מ״א = Magen Avraham, שו״ע = Shulchan Aruch, רמ״א = Rama, etc.).
- Commentator names: Magen Avraham, Mishnah Berurah, Taz, Beit Yosef — never anglicized.
- Note markers: if block marker is א output starts with (א), ב with (ב), etc.
- Output ONLY the English translation. No labels or markdown fences.`;

function stripNoise(text) {
  let t = String(text ?? "").trim();
  t = t.replace(/^```[\w]*\n?/m, "").replace(/\n?```$/m, "").trim();
  const think = t.match(/[\s\S]*?<\/think>\s*/i);
  if (think) t = t.slice(think.index + think[0].length).trim();
  if (/^(translation|english):\s*/i.test(t)) t = t.replace(/^(translation|english):\s*/i, "");
  return t.trim();
}

async function chat(he, marker, slug) {
  const user = [
    `Commentary: ${slug}`,
    `Marker: ${marker}`,
    "",
    "HEBREW:",
    he.slice(0, 14000),
  ].join("\n");
  const res = await fetch(`${url}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user },
      ],
      stream: false,
      options: { temperature: 0.12, num_ctx: 16384 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  return stripNoise(j.message?.content ?? j.response ?? "");
}

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) {
  console.error("Usage: _ollama-fix-need-dump.mjs 498 499 ...");
  process.exit(1);
}

for (const siman of simanim) {
  const dumpPath = path.join(__dirname, "work", `need-dump-${siman}.json`);
  const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
  const need = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const byKey = Object.fromEntries(hand.items.map((x) => [`${x.rel}|${x.key}`, x]));
  let ok = 0;
  let fail = 0;
  console.log(`\n=== siman ${siman}: ${need.length} blocks ===`);
  for (const n of need) {
    const it = byKey[`${n.rel}|${n.key}`];
    if (!it) {
      console.error("  missing hand item", n.rel, n.key);
      fail++;
      continue;
    }
    try {
      const en = await chat(n.he, n.marker || "_", it.slug || "");
      if (!en || en.length < 8) throw new Error("too_short");
      it.en = autoFix(en, it.marker, it.he || "");
      console.log(`  ok ${n.rel} ${n.key} (${it.en.length} chars)`);
      ok++;
    } catch (e) {
      console.error(`  FAIL ${n.rel} ${n.key}:`, e.message || e);
      fail++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: wrote hand json, ok=${ok} fail=${fail}`);
}
