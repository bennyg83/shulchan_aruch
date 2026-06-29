import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const part = parseInt(process.argv[2] || "3", 10);
const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
];

const q = JSON.parse(
  fs.readFileSync(`pipeline/work/editorial-queue-siman-160-part${part}of8.json`, "utf8")
);
const bad = [];
for (const it of q.items || []) {
  const m = it.id.match(/siman_160\/(.+\.txt)#slug=(.+?)#seif=(\d+)#marker=(.+)$/);
  if (!m) continue;
  const [, rel, slug, seif, markerEnc] = m;
  const marker = decodeURIComponent(markerEnc);
  const fp = path.join(ROOT, "output", rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) => x.slug === slug && String(x.seif) === seif && x.marker === marker
  );
  if (!b) continue;
  const he = String(b.he || "").replace(/<[^>]+>/g, " ").trim();
  const en = String(b.en || "").trim();
  if (!he || !en || en.length < 8) {
    bad.push({ id: it.id, reason: "empty_english" });
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      bad.push({ id: it.id, reason: "mt_pattern" });
      break;
    }
  }
  const issues = runBlockQualityChecks({ slug, seif, marker, he, en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error")
    bad.push({ id: it.id, reason: issues.map((i) => i.code).join(",") });
}
console.log(`part ${part} (disk): bad ${bad.length}`);
const seen = new Set();
for (const b of bad) {
  const k = b.id.split("#").slice(1).join("#");
  if (seen.has(k)) continue;
  seen.add(k);
  console.log(" ", k, b.reason);
}
