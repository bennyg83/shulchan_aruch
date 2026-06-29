import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2] || "76", 10);
const part = parseInt(process.argv[3] || "1", 10);
const parts = parseInt(process.argv[4] || "4", 10);
const tag = String(siman).padStart(3, "0");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
];

const qPath = `pipeline/work/editorial-queue-siman-${tag}-part${part}of${parts}.json`;
if (!fs.existsSync(qPath)) {
  console.error("missing", qPath);
  process.exit(1);
}
const q = JSON.parse(fs.readFileSync(qPath, "utf8"));
const bad = [];
const seen = new Set();
for (const it of q.items || []) {
  const m = it.id.match(new RegExp(`siman_${tag}/(.+\\.txt)#slug=(.+?)#seif=(\\d+)#marker=(.+)$`));
  if (!m) continue;
  const [, rel, slug, seif, markerEnc] = m;
  const marker = decodeURIComponent(markerEnc);
  const fp = path.join(ROOT, "output", `siman_${tag}`, rel.replace(/^siman_\\d+\\//, ""));
  const fullRel = rel.includes(`siman_${tag}/`) ? rel : `siman_${tag}/${rel}`;
  const fp2 = path.join(ROOT, "output", fullRel);
  const filePath = fs.existsSync(fp2) ? fp2 : path.join(ROOT, "output", rel);
  if (!fs.existsSync(filePath)) continue;
  const b = parseBlocksInFile(fs.readFileSync(filePath, "utf8")).find(
    (x) => x.slug === slug && String(x.seif) === seif && x.marker === marker
  );
  if (!b) continue;
  const he = String(b.he || "").replace(/<[^>]+>/g, " ").trim();
  const en = String(b.en || "").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    bad.push({ id: it.id, reason: "empty_english" });
    continue;
  }
  let hit = null;
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      hit = "mt_pattern";
      break;
    }
  }
  const issues = runBlockQualityChecks({ slug, seif, marker, he, en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error")
    hit = issues.filter((i) => i.severity === "error").map((i) => i.code).join(",");
  if (!hit) continue;
  const k = `${slug}|${seif}|${marker}`;
  if (seen.has(k)) continue;
  seen.add(k);
  bad.push({ id: it.id, reason: hit });
}
console.log(`siman ${siman} part ${part}: bad ${bad.length}`);
for (const b of bad) console.log(" ", b.id.split("#").slice(1).join("#"), b.reason);
