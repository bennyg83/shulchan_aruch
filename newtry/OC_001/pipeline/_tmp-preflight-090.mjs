#!/usr/bin/env node
import fs from "fs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const q = JSON.parse(
  fs.readFileSync("pipeline/work/editorial-queue-siman-090.json", "utf8")
);
const bad = [];
for (const it of q.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  const issues = runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he, en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") bad.push({ id: it.id, codes: issues.filter((i) => i.severity === "error").map((i) => i.code) });
}
console.log("error blocks in queue:", bad.length);
bad.forEach((b) => console.log(b.id, b.codes.join(",")));
