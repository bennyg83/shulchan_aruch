const fs = require("fs");
const p =
  "C:/Users/binya/Documents/shulchan-aruch-clean/newtry/SA_Rebuild/audit/he_en_segment_mismatch/apply_en_trunc_moderate_part01.mjs";
let s = fs.readFileSync(p, "utf8");
if (s.includes("--repaired")) {
  console.log("already patched");
  process.exit(0);
}
s = s.replace(
  ' *   node apply_en_trunc_moderate_part01.mjs --apply --ids oc1/siman51/seif-009/ateret-zekenim,...\n */',
  ` *   node apply_en_trunc_moderate_part01.mjs --apply --ids oc1/siman51/seif-009/ateret-zekenim,...
 *   node apply_en_trunc_moderate_part01.mjs --apply --repaired --ids oc1/siman1/seif-009/yad-ephraim,...
 */`
);
s = s.replace(
  `const GPT = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01.json");`,
  `const GPT = path.join(__dirname, "EN_TRUNC_MODERATE_GPT_RESULT_part01.json");
const REPAIRED = path.join(
  __dirname,
  "EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json"
);`
);
s = s.replace(
  `  const apply = process.argv.includes("--apply");`,
  `  const apply = process.argv.includes("--apply");
  const useRepaired = process.argv.includes("--repaired");`
);
s = s.replace(
  `  const gptById = new Map(gptCases.map((c) => [c.id, c]));`,
  `  const gptById = new Map(gptCases.map((c) => [c.id, c]));

  let repairedById = null;
  if (useRepaired) {
    const repairedCases = JSON.parse(fs.readFileSync(REPAIRED, "utf8"));
    repairedById = new Map(repairedCases.map((c) => [c.id, c]));
  }`
);
s = s.replace(
  `  if (overrideIds?.length) {
    approvedIds = overrideIds.filter((id) => {
      const row = evalDoc.results.find((r) => r.id === id);
      if (!row || row.verdict !== "APPROVE") {
        console.warn(\`SKIP \${id}: not APPROVE in eval\`);
        return false;
      }
      return true;
    });
  }`,
  `  if (overrideIds?.length) {
    if (useRepaired) {
      approvedIds = overrideIds.filter((id) => {
        if (!repairedById?.has(id)) {
          console.warn(\`SKIP \${id}: not in REPAIRED json\`);
          return false;
        }
        return true;
      });
    } else {
      approvedIds = overrideIds.filter((id) => {
        const row = evalDoc.results.find((r) => r.id === id);
        if (!row || row.verdict !== "APPROVE") {
          console.warn(\`SKIP \${id}: not APPROVE in eval\`);
          return false;
        }
        return true;
      });
    }
  }`
);
s = s.replace(
  `[en-trunc-moderate-part01] mode=\${apply ? "APPLY" : "DRY-RUN"} approved=\${approvedIds.length}`,
  `[en-trunc-moderate-part01] mode=\${apply ? "APPLY" : "DRY-RUN"} source=\${useRepaired ? "REPAIRED" : "GPT"} approved=\${approvedIds.length}`
);
s = s.replace(
  `    const gptCase = gptById.get(id);`,
  `    const gptCase = useRepaired ? repairedById.get(id) : gptById.get(id);`
);
s = s.replace(
  `      console.log(\`FAIL \${id}: missing GPT case\`);`,
  `      failed.push({ id, reason: "missing_case" });
      console.log(\`FAIL \${id}: missing \${useRepaired ? "REPAIRED" : "GPT"} case\`);`
);
s = s.replace(
  `      failed.push({ id, reason: "missing_gpt_case" });
      failed.push({ id, reason: "missing_case" });`,
  `      failed.push({ id, reason: "missing_case" });`
);
s = s.replace(
  `\${evalRow?.reason ?? ""}`,
  `useRepaired ? (gptCase.notes ?? "APPROVE_REPAIRED") : (evalRow?.reason ?? "")`
);
s = s.replace(
  `      console.log(\`  WARN: segment count mismatch vs HE (\${heSegs})\`);
    }

    if (apply) {`,
  `      console.log(\`  FAIL: segment count mismatch vs HE (\${heSegs})\`);
      continue;
    }

    if (apply) {`
);
s = s.replace(
  `      applied: apply,
    });`,
  `      applied: apply,
      source: useRepaired ? "REPAIRED" : "GPT",
    });`
);
s = s.replace(
  `  const auditPath = path.join(__dirname, "EN_TRUNC_MODERATE_PART01_APPLY.json");`,
  `  const auditPath = path.join(
    __dirname,
    useRepaired
      ? "EN_TRUNC_MODERATE_PART01_REPAIRED_APPLY.json"
      : "EN_TRUNC_MODERATE_PART01_APPLY.json"
  );`
);
s = s.replace(
  `        mode: apply ? "APPLY" : "DRY-RUN",
        approvedIds,`,
  `        mode: apply ? "APPLY" : "DRY-RUN",
        source: useRepaired ? "REPAIRED" : "GPT",
        approvedIds,`
);
s = s.replace(
  `  console.log(\`Applied: \${applied.length} Failed: \${failed.length}\`);
}

main();`,
  `  console.log(\`Applied: \${applied.length} Failed: \${failed.length}\`);
  if (failed.length) process.exitCode = 1;
}

main();`
);
fs.writeFileSync(p, s, "utf8");
console.log("patched", p);
