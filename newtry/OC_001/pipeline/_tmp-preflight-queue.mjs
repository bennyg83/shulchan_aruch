#!/usr/bin/env node
import fs from "fs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const queuePath = process.argv[2];
const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const bad = [];
for (const it of q.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  const issues = runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he, en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error")
    bad.push({
      id: it.id,
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      codes: issues.filter((i) => i.severity === "error").map((i) => i.code),
      en: en.slice(0, 100),
    });
}
console.log("queue items", (q.items || []).length, "errors", bad.length);
bad.forEach((b) => console.log(b.id, b.codes.join(","), "|", b.en));
