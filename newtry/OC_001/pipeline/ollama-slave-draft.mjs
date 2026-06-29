#!/usr/bin/env node
/**
 * Draft Hebrew→English via LAN Ollama slave (Qwen). For cleanup passes (e.g. simanim 10–20).
 *
 *   node pipeline/ollama-slave-draft.mjs --siman 10 --max-blocks 6
 *   node pipeline/ollama-slave-draft.mjs --from 10 --to 20 --scope quality --max-blocks 8
 *
 * Env: OC001_OLLAMA_URL, OC001_OLLAMA_MODEL
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import {
  runBlockQualityChecks,
  maxSeverity,
  severityLabel,
  plainFromHtml,
} from "./lib/quality-checks.mjs";
import { parseBlocksInFile, serializeBlock, blockKey } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const SLAVE_DONE = path.join(WORK, "slave-cleanup-done-ids.txt");

const DEFAULT_URL = process.env.OC001_OLLAMA_URL || "http://10.100.102.14:11434";
const DEFAULT_MODEL = process.env.OC001_OLLAMA_MODEL || "qwen2.5:14b-instruct";

const SYSTEM = `You are a halachic Hebrew-to-English translator for Shulchan Aruch Orach Chayim.
Rules:
- Translate every word from the Hebrew. No omissions, no summaries, no commentary of your own.
- Use standard transliterations: Shabbat (not Sabbath), mitzvah/mitzvot, Hashem (not God/LORD).
- Rama glosses introduced by הגה: wrap as {Rama: ...}.
- Expand Hebrew abbreviations in English; do not leave Hebrew abbreviations in English.
- Commentator names: Magen Avraham, Mishnah Berurah, Taz, Beit Yosef — not anglicized variants.
- Output ONLY the English translation text. No labels, no markdown fences, no explanation.`;

function parseArgs() {
  let siman = null;
  let from = null;
  let to = null;
  let maxBlocks = 6;
  let scope = "quality";
  let minSeverity = "warn";
  let url = DEFAULT_URL;
  let model = DEFAULT_MODEL;
  let dry = false;
  let skipDict = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = parseInt(a[++i], 10);
    else if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
    else if (a[i] === "--scope" && a[i + 1]) scope = a[++i];
    else if (a[i] === "--min-severity" && a[i + 1]) minSeverity = a[++i];
    else if (a[i] === "--url" && a[i + 1]) url = a[++i];
    else if (a[i] === "--model" && a[i + 1]) model = a[++i];
    else if (a[i] === "--dry-run") dry = true;
    else if (a[i] === "--skip-dictionary") skipDict = true;
  }
  if (siman == null && from == null) throw new Error("Need --siman N or --from/--to");
  if (from != null && to == null) to = from;
  if (siman != null && from == null) {
    from = siman;
    to = siman;
  }
  return { from, to, maxBlocks, scope, minSeverity, url, model, dry, skipDict };
}

function loadSlaveDone() {
  if (!fs.existsSync(SLAVE_DONE)) return new Set();
  return new Set(
    fs
      .readFileSync(SLAVE_DONE, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );
}

function appendSlaveDone(ids) {
  const set = loadSlaveDone();
  for (const id of ids) set.add(id);
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(SLAVE_DONE, [...set].sort().join("\n") + "\n", "utf8");
}

function stripModelNoise(text) {
  let t = String(text ?? "").trim();
  t = t.replace(/^```[\w]*\n?/m, "").replace(/\n?```$/m, "").trim();
  const think = t.match(/[\s\S]*?<\/think>\s*/i);
  if (think) t = t.slice(think.index + think[0].length).trim();
  if (/^(translation|english):\s*/i.test(t)) t = t.replace(/^(translation|english):\s*/i, "");
  return t.trim();
}

async function ollamaChat(url, model, userContent) {
  const res = await fetch(`${url.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userContent },
      ],
      stream: false,
      options: { temperature: 0.15, num_ctx: 16384 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ollama HTTP ${res.status}: ${err.slice(0, 200)}`);
  }
  const j = await res.json();
  return stripModelNoise(j.message?.content ?? j.response ?? "");
}

function buildUserPrompt(item) {
  const hePlain = plainFromHtml(item.he || "");
  const slug = item.slug || "commentary";
  return [
    `Commentary slug: ${slug}`,
    `Seif: ${item.seif}`,
    `Marker: ${item.marker}`,
    "",
    "HEBREW:",
    hePlain.slice(0, 12000),
  ].join("\n");
}

function parseBlockFromRaw(rawBlock) {
  const heM = rawBlock.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const enM = rawBlock.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const slugM = rawBlock.match(/^slug:\s*(.*)$/m);
  const seifM = rawBlock.match(/^seif:\s*(.*)$/m);
  const markerM = rawBlock.match(/^marker:\s*(.*)$/m);
  return {
    slug: slugM?.[1]?.trim() ?? "",
    seif: seifM?.[1]?.trim() ?? "",
    marker: markerM?.[1]?.trim() ?? "_",
    he: heM?.[1] ?? "",
    en: enM?.[1] ?? "",
  };
}

async function main() {
  const opts = parseArgs();
  const editorialDone = loadEditorialDoneIds(WORK);
  const slaveDone = loadSlaveDone();
  const simanim = [];
  for (let s = opts.from; s <= opts.to; s++) simanim.push(s);

  let candidates = [];
  for (const s of simanim) {
    const items = collectEditorialBlocks(
      path.join(OC_ROOT, "output"),
      s,
      opts.scope,
      opts.minSeverity,
      editorialDone
    );
    for (const it of items) {
      if (slaveDone.has(it.id)) continue;
      const b = parseBlockFromRaw(it.rawBlock);
      candidates.push({ ...it, he: b.he, en: b.en });
    }
  }
  candidates = candidates.slice(0, opts.maxBlocks);

  if (!candidates.length) {
    console.log("No slave-cleanup blocks due.");
    return;
  }

  console.log(
    `Slave draft: ${candidates.length} block(s), simanim ${opts.from}–${opts.to}, model ${opts.model} @ ${opts.url}`
  );

  if (opts.dry) {
    for (const c of candidates) console.log("  would draft:", c.id);
    return;
  }

  const byFile = new Map();
  const okIds = [];
  const failIds = [];

  for (const item of candidates) {
    try {
      const en = await ollamaChat(opts.url, opts.model, buildUserPrompt(item));
      if (!en || en.length < 6) throw new Error("empty_or_too_short");
      if (!byFile.has(item.absPath)) byFile.set(item.absPath, []);
      byFile.get(item.absPath).push({ ...item, newEn: en });
      console.log(`  drafted: ${item.id} (${en.length} chars)`);
    } catch (e) {
      console.error(`  FAIL ${item.id}:`, e.message || e);
      failIds.push(item.id);
    }
  }

  for (const [absPath, items] of byFile) {
    const raw = fs.readFileSync(absPath, "utf8");
    const blocks = parseBlocksInFile(raw);
    const map = new Map(blocks.map((b) => [blockKey(b.slug, b.seif, b.marker), b]));
    for (const it of items) {
      const k = blockKey(it.slug, it.seif, it.marker);
      const b = map.get(k);
      if (!b) {
        console.error("  block missing in file:", it.id);
        failIds.push(it.id);
        continue;
      }
      b.en = it.newEn;
    }
    const out = blocks.map((b) => serializeBlock(b)).join("\n");
    fs.writeFileSync(absPath, out.endsWith("\n") ? out : out + "\n", "utf8");
    console.log(`  wrote ${path.relative(OC_ROOT, absPath)} (${items.length} blocks)`);
  }

  const touchedSimanim = new Set();
  for (const [absPath] of byFile) {
    const m = absPath.match(/siman_(\d{3})/i);
    if (m) touchedSimanim.add(parseInt(m[1], 10));
  }

  if (!opts.skipDict && touchedSimanim.size) {
    for (const s of [...touchedSimanim].sort((a, b) => a - b)) {
      const tag = String(s).padStart(3, "0");
      const root = `output/siman_${tag}`;
      console.log(`  apply:dictionary --root ${root}`);
      const r = spawnSync(process.execPath, ["apply_dictionary_oc001.mjs", "--root", root], {
        cwd: OC_ROOT,
        stdio: "inherit",
      });
      if (r.status !== 0) process.exit(r.status ?? 1);
    }
  }

  for (const [absPath, items] of byFile) {
    const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
    const map = new Map(blocks.map((b) => [blockKey(b.slug, b.seif, b.marker), b]));
    for (const it of items) {
      const b = map.get(blockKey(it.slug, it.seif, it.marker));
      if (!b) continue;
      const issues = runBlockQualityChecks(b);
      const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
      if (sev === "error") {
        console.warn(`  quality error (not checkpointed): ${it.id} — ${issues.map((i) => i.code).join(",")}`);
        failIds.push(it.id);
      } else {
        okIds.push(it.id);
      }
    }
  }

  if (okIds.length) appendSlaveDone(okIds);
  console.log(`Done: ${okIds.length} ok, ${failIds.length} failed/skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
