import fs from "fs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
];

const q = JSON.parse(
  fs.readFileSync("pipeline/work/editorial-queue-siman-160-part2of8.json", "utf8")
);
const bad = [];
for (const it of q.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    bad.push({ id: it.id, reason: "empty_english" });
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      bad.push({ id: it.id, reason: `mt_pattern` });
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
  if (sev === "error") bad.push({ id: it.id, reason: issues.map((i) => i.code).join(",") });
}
console.log("bad count:", bad.length);
for (const b of bad) console.log(b.id, b.reason);
