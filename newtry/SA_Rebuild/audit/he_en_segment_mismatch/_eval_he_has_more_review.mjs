import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEW =
  process.env.REVIEW ||
  "c:/Users/binya/Downloads/HE_HAS_MORE_PACK_ALL_REVIEW.json";
const PACK = path.join(__dirname, "HE_HAS_MORE_PACK.json");
const OUT = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json");

const review = JSON.parse(fs.readFileSync(REVIEW, "utf8"));
const pack = JSON.parse(fs.readFileSync(PACK, "utf8"));
const byId = new Map(pack.cases.map((c) => [c.id, c]));
const packIds = pack.cases.map((c) => c.id);

function validateMergeGroups(mg, heSegs, enSegs) {
  const errs = [];
  if (!Array.isArray(mg)) return ["merge_groups_not_array"];
  if (mg.length !== enSegs) errs.push(`mg_len=${mg.length}!=enSegs=${enSegs}`);
  const flat = [];
  for (let g = 0; g < mg.length; g++) {
    const group = mg[g];
    if (!Array.isArray(group) || group.length === 0) {
      errs.push(`empty_group@${g}`);
      continue;
    }
    for (let i = 0; i < group.length; i++) {
      const v = group[i];
      if (!Number.isInteger(v)) errs.push(`non_int@g${g}i${i}`);
      flat.push(v);
    }
    for (let i = 1; i < group.length; i++) {
      if (group[i] !== group[i - 1] + 1)
        errs.push(`noncontig_within@g${g}:${JSON.stringify(group)}`);
    }
  }
  if (flat.length !== heSegs)
    errs.push(`flat_len=${flat.length}!=heSegs=${heSegs}`);
  for (let i = 0; i < flat.length; i++) {
    if (flat[i] !== i) {
      errs.push(
        `partition_not_0..n-1 got=[${flat.slice(0, 24).join(",")}${
          flat.length > 24 ? "..." : ""
        }]`
      );
      break;
    }
  }
  const heAfter = mg.length;
  if (heAfter !== enSegs)
    errs.push(`after_mismatch heAfter=${heAfter} enAfter=${enSegs}`);
  return errs;
}

function validateSplitEn(hints, heSegs, enSegs) {
  const errs = [];
  if (!Array.isArray(hints) || hints.length === 0)
    return { errs: ["split_hints_missing"], deficit: heSegs - enSegs, hints: 0, enAfterMin: enSegs };
  const seen = new Set();
  const deficit = heSegs - enSegs;
  for (const h of hints) {
    if (h == null || typeof h !== "object") {
      errs.push("hint_not_object");
      continue;
    }
    const idx = h.en_index;
    if (!Number.isInteger(idx)) errs.push(`en_index_not_int:${idx}`);
    else if (idx < 0 || idx >= enSegs)
      errs.push(`en_index_oob:${idx} enSegs=${enSegs}`);
    if (seen.has(idx)) errs.push(`dup_en_index:${idx}`);
    seen.add(idx);
    if (!h.note || typeof h.note !== "string" || !h.note.trim())
      errs.push(`empty_note@${idx}`);
  }
  if (hints.length > deficit)
    errs.push(`too_many_hints hints=${hints.length} deficit=${deficit}`);
  const enAfterMin = enSegs + hints.length;
  if (enAfterMin > heSegs)
    errs.push(`enAfterMin=${enAfterMin}>heSegs=${heSegs}`);
  return { errs, deficit, hints: hints.length, enAfterMin };
}

const ALLOWED = new Set([
  "merge_groups",
  "split_en",
  "needs_editorial",
  "needs_human",
  "skip",
]);

const results = [];
const summary = {
  n: review.length,
  pack_n: pack.cases.length,
  id_order_match: true,
  missing_from_review: [],
  extra_ids: [],
  duplicate_ids: [],
  actions: {},
  by_volume: {},
  by_slug: {},
  classify: { apply_ready: 0, hold: 0, reject: 0 },
  structural: {
    merge_checked: 0,
    merge_pass: 0,
    merge_fail: 0,
    split_checked: 0,
    split_pass: 0,
    split_fail: 0,
  },
  soft_flags: {},
};

const seenIds = new Set();
for (let i = 0; i < review.length; i++) {
  const r = review[i];
  const flags = [];
  const soft = [];
  if (seenIds.has(r.id)) summary.duplicate_ids.push(r.id);
  seenIds.add(r.id);
  if (packIds[i] !== r.id) summary.id_order_match = false;
  const c = byId.get(r.id);
  if (!c) {
    flags.push("ID_NOT_IN_PACK");
  }
  const action = r.action;
  summary.actions[action] = (summary.actions[action] || 0) + 1;
  if (!ALLOWED.has(action)) flags.push(`BAD_ACTION:${action}`);

  const vol = r.id.split("/")[0];
  const slug = c?.slug || r.id.split("/").pop();
  summary.by_volume[vol] = (summary.by_volume[vol] || 0) + 1;
  const vs = `${vol}/${slug}`;
  summary.by_slug[vs] = (summary.by_slug[vs] || 0) + 1;

  const heSegs = c?.heSegs;
  const enSegs = c?.enSegs;

  if (action === "merge_groups") {
    summary.structural.merge_checked++;
    if (r.split_hints != null) flags.push("unexpected_split_hints");
    const errs = validateMergeGroups(r.merge_groups, heSegs, enSegs);
    if (errs.length) {
      flags.push(...errs.map((e) => `MG:${e}`));
      summary.structural.merge_fail++;
    } else {
      summary.structural.merge_pass++;
      const realMerges = (r.merge_groups || []).filter((g) => g.length > 1).length;
      if (realMerges === 0) soft.push("NO_REAL_MERGE");
    }
  } else if (action === "split_en") {
    summary.structural.split_checked++;
    if (r.merge_groups != null) flags.push("unexpected_merge_groups");
    const { errs, deficit, hints, enAfterMin } = validateSplitEn(
      r.split_hints,
      heSegs,
      enSegs
    );
    if (errs.length) {
      flags.push(...errs.map((e) => `SE:${e}`));
      summary.structural.split_fail++;
    } else {
      summary.structural.split_pass++;
      if (enAfterMin < heSegs)
        soft.push(
          `SPLIT_MAY_NEED_MULTI_PIECE deficit=${deficit} hints=${hints} enAfterMin=${enAfterMin}`
        );
    }
  } else if (
    action === "needs_editorial" ||
    action === "needs_human" ||
    action === "skip"
  ) {
    if (r.merge_groups != null) soft.push("hold_has_merge_groups");
    if (r.split_hints != null) soft.push("hold_has_split_hints");
  }

  let cls;
  if (action === "needs_editorial" || action === "needs_human") {
    cls = "hold";
    if (flags.some((f) => f.startsWith("BAD_ACTION") || f === "ID_NOT_IN_PACK"))
      cls = "reject";
  } else if (action === "skip") {
    cls = "hold";
  } else if (action === "merge_groups" || action === "split_en") {
    cls = flags.length ? "reject" : "apply_ready";
  } else {
    cls = "reject";
  }
  summary.classify[cls]++;
  for (const s of soft) {
    const key = s.split(" ")[0];
    summary.soft_flags[key] = (summary.soft_flags[key] || 0) + 1;
  }

  results.push({
    id: r.id,
    action,
    volume: vol,
    slug,
    heSegs,
    enSegs,
    deficit: heSegs != null ? heSegs - enSegs : null,
    classify: cls,
    flags,
    soft,
    notes: r.notes,
    merge_groups: r.merge_groups,
    split_hints: r.split_hints,
  });
}

for (const id of packIds) {
  if (!seenIds.has(id)) summary.missing_from_review.push(id);
}
summary.extra_ids = [...seenIds].filter((id) => !byId.has(id));

const fails = results.filter((r) => r.classify === "reject");
const applyReady = results.filter((r) => r.classify === "apply_ready");
const hold = results.filter((r) => r.classify === "hold");

const av = {};
for (const r of results) {
  av[r.volume] ||= {};
  av[r.volume][r.action] = (av[r.volume][r.action] || 0) + 1;
}

const classifyByAction = {};
for (const r of results) {
  classifyByAction[r.action] ||= { apply_ready: 0, hold: 0, reject: 0 };
  classifyByAction[r.action][r.classify]++;
}

console.log("=== SUMMARY ===");
console.log(
  JSON.stringify(
    {
      n: summary.n,
      pack_n: summary.pack_n,
      id_order_match: summary.id_order_match,
      missing_from_review: summary.missing_from_review.length,
      extra_ids: summary.extra_ids.length,
      duplicates: summary.duplicate_ids.length,
      actions: summary.actions,
      actions_by_volume: av,
      classify: summary.classify,
      classify_by_action: classifyByAction,
      structural: summary.structural,
      soft_flags: summary.soft_flags,
    },
    null,
    2
  )
);

console.log(`\n=== REJECT / STRUCTURAL FAILS (${fails.length}) ===`);
for (const f of fails) {
  console.log(
    JSON.stringify({
      id: f.id,
      action: f.action,
      heSegs: f.heSegs,
      enSegs: f.enSegs,
      flags: f.flags,
      notes: (f.notes || "").slice(0, 120),
    })
  );
}

const softApply = applyReady.filter((r) => r.soft.length);
console.log(`\nsoft on apply_ready: ${softApply.length}`);
console.log({
  splitSoft: softApply.filter((r) => r.action === "split_en").length,
  mergeSoft: softApply.filter((r) => r.action === "merge_groups").length,
});

fs.writeFileSync(
  OUT,
  JSON.stringify(
    {
      meta: {
        created: new Date().toISOString(),
        review: REVIEW,
        pack: PACK,
        purpose: "structural + classify eval — NOT applied",
        schema_keys: ["id", "action", "merge_groups", "split_hints", "notes"],
        note: "No verdict/confidence fields in ChatGPT output",
        classify_rules:
          "structural fail on merge_groups|split_en => reject; needs_editorial|needs_human => hold; skip => hold; clean merge/split => apply_ready",
      },
      summary: { ...summary, actions_by_volume: av, classify_by_action: classifyByAction },
      rejects: fails,
      apply_ready_ids: applyReady.map((r) => r.id),
      hold_ids: hold.map((r) => r.id),
      results,
    },
    null,
    2
  )
);
console.log("\nWrote", OUT);
