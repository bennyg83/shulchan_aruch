const fs = require("fs");
const p =
  "C:/Users/binya/Documents/shulchan-aruch-clean/newtry/SA_Rebuild/audit/he_en_segment_mismatch/apply_en_trunc_moderate_part01.mjs";
let lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const idx = lines.findIndex((l) => l.includes("useRepaired ? (gptCase.notes"));
if (idx === -1) {
  console.error("not found");
  process.exit(1);
}
const replacement = [
  "    const note = useRepaired",
  '      ? (gptCase.notes ?? "APPROVE_REPAIRED")',
  '      : (evalRow?.reason ?? "");',
  "",
  "    console.log(",
  '      `${apply ? "APPLY" : "PLAN"} ${id}: en ${enSegsBefore}->${enSegsAfter} (he=${heSegs}) — ${note}`',
  "    );",
];
lines.splice(idx - 1, 3, ...replacement);
fs.writeFileSync(p, lines.join("\n"), "utf8");
console.log("ok at line", idx);
