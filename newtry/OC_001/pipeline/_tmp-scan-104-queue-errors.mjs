#!/usr/bin/env node
import fs from "fs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
];

const queuePath =
  process.argv[2] || "pipeline/work/editorial-queue-siman-104.json";
const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of q.items) {
  const enM = (it.rawBlock || "").match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = (it.rawBlock || "").match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  let bad = false;
  const reasons = [];
  if (!en || en.length < 8) {
    bad = true;
    reasons.push("empty_english");
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      bad = true;
      reasons.push(`mt:${p}`);
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    bad = true;
    reasons.push(...issues.filter((i) => i.severity === "error").map((i) => i.code));
  }
  if (bad) console.log(`${it.slug}:${it.seif}:${it.marker}`, reasons.join(","), "|", en.slice(0, 70));
}
