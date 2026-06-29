import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const part = parseInt(process.argv[2] || "3", 10);
const MT_PATTERNS = [
  { name: "there in the", re: /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i },
  { name: "hebrew", re: /[א-ת]{2,}/ },
  { name: "quot", re: /&quot;/ },
  { name: "rape", re: /\b(rape|tsal nav|kovad)\b/i },
];

const q = JSON.parse(
  fs.readFileSync(`pipeline/work/editorial-queue-siman-160-part${part}of8.json`, "utf8")
);
const seen = new Set();
for (const it of q.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he || !en || en.length < 8) continue;
  let reason = null;
  for (const p of MT_PATTERNS) {
    if (p.re.test(en)) {
      reason = p.name;
      break;
    }
  }
  const issues = runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he, en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") reason = issues.filter((i) => i.severity === "error").map((i) => i.code).join(",");
  if (!reason) continue;
  const key = `${it.slug}|${it.seif}|${it.marker}`;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log("\n===", key, reason, "===");
  console.log("EN:", en.slice(0, 200));
}
