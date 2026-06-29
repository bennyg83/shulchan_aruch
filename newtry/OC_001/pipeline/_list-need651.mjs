import fs from "fs";
import { preflightFail } from "./_slot17-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const h = JSON.parse(fs.readFileSync("pipeline/work/hand-slot17-siman-651.json", "utf8"));
for (const it of h.items) {
  const pf = preflightFail(it.en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en: it.en,
  });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    console.log(it.rel, it.key, pf, issues.map((i) => i.code).join(","));
    console.log(it.en?.slice(0, 120));
  }
}
