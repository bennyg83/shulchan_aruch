import fs from "fs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const q = JSON.parse(
  fs.readFileSync("pipeline/work/editorial-queue-siman-160-part2of8.json", "utf8")
);
for (const it of q.items) {
  const heM = it.rawBlock.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const enM = it.rawBlock.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ");
  const en = (enM ? enM[1] : "").trim();
  const issues = runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he, en });
  const sev = severityLabel(maxSeverity(issues));
  if (sev === "error") {
    console.log(
      it.id,
      issues.filter((i) => i.severity === "error").map((i) => i.code).join(",")
    );
  }
}
