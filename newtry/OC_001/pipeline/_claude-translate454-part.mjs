#!/usr/bin/env node
/** Translate he454-queue-pN.json via claude --print → merge into siman454-partN.json */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = parseInt(process.argv[2], 10);
if (!part || part < 1 || part > 3) {
  console.error("Usage: node _claude-translate454-part.mjs <1|2|3>");
  process.exit(1);
}

const queuePath = path.join(__dirname, `he454-queue-p${part}.json`);
const handPath = path.join(__dirname, `siman454-part${part}.json`);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const keys = Object.keys(queue);
const BATCH = 12;

const SYSTEM = `You translate Shulchan Aruch OC siman 454 (which matzah does not fulfill the obligation / matzah types) from Hebrew to English.
Rules: translate every word; no additions; use halachic terms (matzah, lechem oni, sovin, mursan, chalita, meshumar l'shem matzah, gezelah, shinui, l'chatchila, b'dieved, d'oraisa, d'rabbanan); commentator names Magen Avraham, Taz, Beit Yosef, Rambam, Mahariv etc.; expand abbreviations (ב"י=Beit Yosef, מ"א=Magen Avraham, ט"ז=Taz); {Rama: ...} for Rama glosses in small tags; Arabic numerals for note markers (1)(2); plain text only.
Forbidden in output: Hametz, Hashem, Lord's Prayer, hand recoils, first dish, allocated, Shield of Abraham, Saturday, leaven, Qur'an, According to the, there in the, Bible, Rema: Rema:.
Return ONLY valid JSON object mapping keys to English strings. No markdown fences.`;

function claudeJson(user) {
  const claude = process.env.CLAUDE_CLI_CMD || "claude";
  const r = spawnSync(
    claude,
    ["--print", "--permission-mode", "acceptEdits", `${SYSTEM}\n\n${user}`],
    { encoding: "utf8", timeout: 600000, cwd: path.resolve(__dirname, "..") }
  );
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 800));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

let done = 0;
for (let i = 0; i < keys.length; i += BATCH) {
  const batchKeys = keys.slice(i, i + BATCH);
  const payload = {};
  for (const k of batchKeys) {
    payload[k] = queue[k].he;
  }
  const user = `Translate these ${batchKeys.length} blocks. Keys are slug/seif:marker format.\n${JSON.stringify(payload, null, 2)}`;
  process.stdout.write(`batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(keys.length / BATCH)} (${batchKeys.length} keys) … `);
  const out = claudeJson(user);
  for (const k of batchKeys) {
    if (!out[k]) throw new Error(`missing key in claude output: ${k}`);
    hand[k] = out[k].trim();
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log("ok");
}
console.log("translated", done, "→", handPath);
