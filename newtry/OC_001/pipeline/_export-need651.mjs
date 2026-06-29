import fs from "fs";
import { preflightFail } from "./_slot17-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const h = JSON.parse(fs.readFileSync("pipeline/work/hand-slot17-siman-651.json", "utf8"));
const need = [];
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
  if (pf || sev >= SEVERITY.warn) need.push({ rel: it.rel, key: it.key, he: it.he });
}
fs.writeFileSync("pipeline/work/need651.json", JSON.stringify(need, null, 2));
console.log("need", need.length);
