const fs = require("fs");
const p =
  "C:/Users/binya/Documents/shulchan-aruch-clean/newtry/SA_Rebuild/audit/he_en_segment_mismatch/apply_en_trunc_moderate_part01.mjs";
let s = fs.readFileSync(p, "utf8");
const bad = /    console\.log\([\s\S]*?\n    \);[\s\S]*?if \(enSegsAfter !== heSegs\)/;
const good = `    const note = useRepaired
      ? (gptCase.notes ?? "APPROVE_REPAIRED")
      : (evalRow?.reason ?? "");

    console.log(
      \`\${apply ? "APPLY" : "PLAN"} \${id}: en \${enSegsBefore}->\${enSegsAfter} (he=\${heSegs}) — \${note}\`
    );

    if (enSegsAfter !== heSegs)`;
if (!bad.test(s)) {
  console.error("pattern not found");
  process.exit(1);
}
s = s.replace(bad, good);
fs.writeFileSync(p, s, "utf8");
console.log("fixed console.log");
