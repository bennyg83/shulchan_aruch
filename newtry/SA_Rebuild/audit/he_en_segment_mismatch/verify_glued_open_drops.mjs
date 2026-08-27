/** Verify glued drop apply + remaining OPEN from original 14. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../../OC_Mobile/oc318-mobile-reader/public/corpus"
);

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}
function split(html) {
  if (!html) return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length ? parts : [String(html).trim()].filter(Boolean);
}
function read(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

const original14 = [
  "yd1/siman4/seif-004/yad-avraham",
  "yd1/siman37/seif-002/yad-avraham",
  "yd1/siman48/seif-004/yad-avraham",
  "yd1/siman61/seif-006/yad-avraham",
  "yd1/siman106/seif-002/baer-heitev",
  "yd1/siman245/seif-006/beur-hagra",
  "yd1/siman263/seif-005/baer-heitev",
  "yd1/siman308/seif-003/beur-hagra",
  "yd1/siman331/seif-034/beur-hagra",
  "yd1/siman334/seif-042/beur-hagra",
  "yd1/siman334/seif-043/baer-heitev",
  "cm1/siman275/seif-003/ketzot-hachoshen",
  "yd1/siman334/seif-045/beur-hagra",
  "yd1/siman269/seif-003/beur-hagra",
];
const applied = new Set([
  "yd1/siman4/seif-004/yad-avraham",
  "yd1/siman37/seif-002/yad-avraham",
  "yd1/siman48/seif-004/yad-avraham",
  "yd1/siman61/seif-006/yad-avraham",
  "yd1/siman334/seif-043/baer-heitev",
]);

const rows = original14.map((id) => {
  const he = read(path.join(CORPUS, id, "he.html"));
  const en = read(path.join(CORPUS, id, "en.html"));
  const heSegs = split(he).length;
  const enSegs = split(en).length;
  return {
    id,
    heSegs,
    enSegs,
    match: heSegs === enSegs,
    applied: applied.has(id),
    stillOpen: !applied.has(id),
  };
});

console.log(
  JSON.stringify(
    {
      appliedVerify: rows.filter((r) => r.applied),
      stillOpen: rows.filter((r) => r.stillOpen),
      appliedAllMatch: rows.filter((r) => r.applied).every((r) => r.match),
      openStillEnHasMore: rows
        .filter((r) => r.stillOpen)
        .filter((r) => r.enSegs > r.heSegs)
        .map((r) => `${r.id} ${r.heSegs}/${r.enSegs}`),
    },
    null,
    2
  )
);
