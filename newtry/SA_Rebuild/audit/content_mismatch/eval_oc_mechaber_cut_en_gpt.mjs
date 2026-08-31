/**
 * Evaluate OC kit 01 Mechaber cut-EN GPT completions (new_en whole-cell).
 *
 *   node eval_oc_mechaber_cut_en_gpt.mjs
 *   node eval_oc_mechaber_cut_en_gpt.mjs --parts 1-8
 *   node eval_oc_mechaber_cut_en_gpt.mjs --incoming <dir>
 *
 * Writes:
 *   01_OC_MECHABER_CUT_EN_GPT_KIT_GPT_RESULT.json   (merged completions)
 *   01_OC_MECHABER_CUT_EN_GPT_KIT_GPT_RESULT_EVAL.json
 *   01_OC_MECHABER_CUT_EN_GPT_KIT_GPT_RESULT_EVAL.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const LIVE = path.resolve(__dirname, "../../../..");
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const KIT_NAME = "01_OC_MECHABER_CUT_EN_GPT_KIT";
const DEFAULT_INCOMING = path.join(
  AUDIT,
  "_gpt_incoming_oc_kit01_parts01_08"
);

const FAILURE_PATTERNS = [
  { id: "danny", re: /\bDanny'?s?\b/i },
  { id: "dinliness", re: /\bdinliness\b/i },
  { id: "circumcised_wrong", re: /\bcircumcised\b/i },
  { id: "lords_prayer", re: /Lord'?s\s+Prayer/i },
  { id: "saturday", re: /\bSaturday\b/i },
  { id: "hand_recoils", re: /hand\s+recoils/i },
  { id: "disgusted_hand", re: /disgusted\s+hand/i },
  { id: "hand_scared", re: /hand\s+scared/i },
  { id: "the_craft", re: /\bthe\s+craft\b/i },
  { id: "her_age", re: /\bher\s+age\b/i },
  { id: "first_dish", re: /\bfirst\s+dish\b/i },
  { id: "second_dish", re: /\bsecond\s+dish\b/i },
  { id: "third_dish", re: /\bthird\s+dish\b/i },
  { id: "allocated_muktzeh", re: /\ballocated\b/i },
  { id: "hashems_word", re: /Hashem'?s\s+Word/i },
  { id: "glory_barbarism", re: /glory\s+of\s+the\s+barbarism/i },
  { id: "holy_person", re: /\bholy\s+person\b/i },
  { id: "the_beast", re: /\bthe\s+beast\b/i },
  { id: "darbanan", re: /\bDarbanan\b/ },
  { id: "ovary", re: /\bovary\b/i },
  { id: "murder_and_murder", re: /murder\s+and\s+murder/i },
  { id: "grows_and_goes", re: /grows\s+and\s+goes/i },
  { id: "to_the_world", re: /\bto\s+the\s+world\b/i },
  { id: "cold_spot", re: /cold\s+spot/i },
  { id: "eastern_crack", re: /eastern\s+crack/i },
  { id: "the_cauldron", re: /\bthe\s+cauldron\b/i },
  { id: "brewer", re: /\bbrewer\b/i },
  { id: "shabbat_nights", re: /Shabbat\s+nights/i },
  { id: "shield_of_abraham", re: /Shield\s+of\s+Abraham/i },
  { id: "golden_rows", re: /Golden\s+Rows/i },
  { id: "house_of_joseph", re: /House\s+of\s+Joseph/i },
  { id: "maimonides", re: /\bMaimonides\b/ },
  { id: "nachmanides", re: /\bNachmanides\b/ },
  { id: "nichom_lia", re: /Nichom\s+Lia/i },
  { id: "history_of_light", re: /history\s+of\s+(the\s+)?light/i },
  { id: "history_of_the_sun", re: /history\s+of\s+the\s+sun/i },
  { id: "i_shoot_at_a_fire", re: /I\s+shoot\s+at\s+a\s+fire/i },
  { id: "shrinking_and_good", re: /shrinking\s+and\s+good/i },
  { id: "english_pending", re: /English\s+translation\s+pending/i },
  { id: "capernaum", re: /\bCapernaum\b/i },
  { id: "passover_junk", re: /\bPassover\b/i },
  { id: "yahweh", re: /\bYahweh\b/i },
  { id: "the_bible", re: /\bthe\s+Bible\b/i },
  { id: "new_testament", re: /New\s+Testament/i },
  { id: "abu_dhabi", re: /Abu\s+Dhabi/i },
  { id: "honeylma", re: /\bHoneylma\b/i },
  { id: "czechs", re: /\bCzechs\b/i },
  { id: "captain_hire", re: /takes as a captain/i },
  { id: "name_lemma_artifact", re: /\(\s*name\s*\)/i },
  { id: "un_hire_garbage", re: /rented to the UN/i },
  { id: "massacre", re: /\bmassacre\b/i },
];

const MID_CLAUSE_END =
  /\b(and|or|the|a|an|of|to|for|with|that|which|who|when|if|but|as|in|on|by|from|into|than|then|also|even|whether|because|since|while|until|without|about|between|among|under|over|before|after|such|so|not|nor|yet)\s*[,:;]?\s*$/i;

const RAW_HE_ABBREV = /[א-ת][״"'][א-ת]/;
const EDITORIAL_NOTE = /\b(Note:|Meaning:|TBD|translation pending)\b/i;
const HTML_TAG = /<\/?[a-zA-Z][^>]*>/;
const CUT_RATIO_STRICT = 0.55;
const POST_RAMA_HE_MIN = 40;
const POST_RAMA_EN_MIN = 20;

function parseArgs(argv) {
  const out = {
    partsFrom: 1,
    partsTo: 8,
    incoming: DEFAULT_INCOMING,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--parts") {
      const v = argv[++i] || "";
      const m = /^(\d+)\s*-\s*(\d+)$/.exec(v);
      if (!m) throw new Error(`Bad --parts ${v}; expected N-M`);
      out.partsFrom = Number(m[1]);
      out.partsTo = Number(m[2]);
    } else if (a === "--incoming") {
      out.incoming = path.resolve(argv[++i]);
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node eval_oc_mechaber_cut_en_gpt.mjs [--parts 1-8] [--incoming DIR]`);
      process.exit(0);
    }
  }
  return out;
}

function walk(d, out = []) {
  if (!fs.existsSync(d)) return out;
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const fp = path.join(d, f.name);
    if (f.isDirectory()) walk(fp, out);
    else out.push(fp);
  }
  return out;
}

function stripHtml(html) {
  return String(html ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function hebrewCharCount(s) {
  return (String(s).match(/[\u0590-\u05FF]/g) || []).length;
}

function hebrewRatio(s) {
  const t = String(s ?? "").replace(/\s+/g, "");
  if (!t.length) return 0;
  return hebrewCharCount(t) / t.length;
}

function hasHagah(heHtml) {
  if (/<small[^>]*>\s*הגה/i.test(heHtml)) return true;
  if (/(?:^|[>\s:;\.])הגה(?:\s|<)/.test(heHtml)) return true;
  const plain = stripHtml(heHtml);
  return /(?:^|[\s:;\.])הגה(?:\s|$)/.test(plain);
}

function countHagahBlocks(heHtml) {
  const small = (heHtml.match(/<small[^>]*>\s*הגה/gi) || []).length;
  if (small > 0) return small;
  const plain = stripHtml(heHtml);
  return (plain.match(/(?:^|[\s:;\.])הגה(?:\s|$)/g) || []).length;
}

function countRamaBraces(enPlain) {
  return (enPlain.match(/\{Rama\s*:/gi) || []).length;
}

function hePostRamaPlain(heHtml) {
  const re = /<small[^>]*>\s*הגה[\s\S]*?<\/small>/gi;
  let lastEnd = -1;
  let m;
  while ((m = re.exec(heHtml)) !== null) lastEnd = m.index + m[0].length;
  if (lastEnd < 0) return "";
  return stripHtml(heHtml.slice(lastEnd));
}

function enPostRamaPlain(enPlain) {
  const re = /\{Rama\s*:[\s\S]*?\}/gi;
  let lastEnd = -1;
  let m;
  while ((m = re.exec(enPlain)) !== null) lastEnd = m.index + m[0].length;
  if (lastEnd < 0) return enPlain;
  return enPlain.slice(lastEnd).trim();
}

function endsMidClause(enPlain) {
  if (!enPlain || enPlain.length < 40) return false;
  if (/[.!?]["']?\s*$/.test(enPlain)) return false;
  if (/\}]\s*$/.test(enPlain)) return false;
  if (/[.!]}\s*$/.test(enPlain)) return false;
  if (/\{Rama:\s*$/i.test(enPlain)) return true;
  if (/\{\s*$/.test(enPlain)) return true;
  if (MID_CLAUSE_END.test(enPlain)) return true;
  return false;
}

function loadKitCasesForParts(from, to) {
  const byId = new Map();
  const partMeta = [];
  for (let n = from; n <= to; n++) {
    const p = String(n).padStart(2, "0");
    const kitPath = path.join(AUDIT, `${KIT_NAME}_part${p}.json`);
    if (!fs.existsSync(kitPath)) {
      throw new Error(`Missing kit part: ${kitPath}`);
    }
    const kit = JSON.parse(fs.readFileSync(kitPath, "utf8").replace(/^\uFEFF/, ""));
    const cases = kit.cases || [];
    partMeta.push({ part: n, file: path.basename(kitPath), cases: cases.length });
    for (const c of cases) {
      if (byId.has(c.id)) throw new Error(`Duplicate kit id across parts: ${c.id}`);
      byId.set(c.id, { ...c, _part: n });
    }
  }
  return { byId, partMeta };
}

function loadCompletions(incomingDir, from, to) {
  const files = walk(incomingDir);
  const byId = new Map();
  const loadedParts = [];
  for (let n = from; n <= to; n++) {
    const p = String(n).padStart(2, "0");
    const hits = files.filter((f) =>
      new RegExp(`part${p}_completed\\.json$`, "i").test(path.basename(f))
    );
    if (!hits.length) {
      loadedParts.push({ part: n, file: null, cases: 0, error: "missing" });
      continue;
    }
    const fp = hits[0];
    const raw = fs.readFileSync(fp, "utf8").replace(/^\uFEFF/, "");
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      loadedParts.push({ part: n, file: path.basename(fp), cases: 0, error: e.message });
      continue;
    }
    const arr = Array.isArray(data)
      ? data
      : data.cases || data.results || data.items || [];
    loadedParts.push({ part: n, file: path.basename(fp), cases: arr.length });
    for (const c of arr) {
      if (!c || !c.id) continue;
      byId.set(c.id, { ...c, _source_file: path.basename(fp), _part: n });
    }
  }
  return { byId, loadedParts };
}

function readCorpus(id) {
  const hePath = path.join(CORPUS, id, "he.html");
  const enPath = path.join(CORPUS, id, "en.html");
  const heHtml = fs.existsSync(hePath)
    ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "")
    : null;
  const enHtml = fs.existsSync(enPath)
    ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "")
    : null;
  return { heHtml, enHtml, hePath, enPath };
}

function preview(s, n = 140) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function evalCase(kitCase, gptCase) {
  const id = kitCase.id;
  const flags = [];

  if (!gptCase) {
    return {
      id,
      part: kitCase._part,
      verdict: "REJECT",
      reason: "missing_from_gpt",
      flags: ["MISSING"],
    };
  }

  if (!/^oc\d+\//i.test(id) || !/\/mechaber$/i.test(id)) {
    flags.push("NOT_OC_MECHABER_ID");
  }
  if (/^yd/i.test(id) || /yoreh/i.test(id)) {
    flags.push("YD_LEFTOVER_ID");
  }

  const newEn = typeof gptCase.new_en === "string" ? gptCase.new_en.trim() : "";
  if (!newEn) {
    return {
      id,
      part: kitCase._part,
      verdict: "REJECT",
      reason: "empty_new_en",
      flags: ["EMPTY_NEW_EN"],
      confidence: gptCase.confidence || null,
    };
  }

  const { heHtml } = readCorpus(id);
  if (heHtml == null) {
    return {
      id,
      part: kitCase._part,
      verdict: "REJECT",
      reason: "missing_he_html",
      flags: ["MISSING_HE"],
      new_en_preview: preview(newEn),
    };
  }

  const hePlain = stripHtml(heHtml);
  const heChars = hebrewCharCount(hePlain) || hePlain.replace(/\s+/g, "").length;
  const enChars = newEn.replace(/\s+/g, "").length;
  const ratio = heChars > 0 ? enChars / heChars : 0;

  if (/\{Rama\s*:\s*RAMA\s*:/i.test(newEn)) flags.push("RAMA_DUPLICATE_PREFIX");
  if (HTML_TAG.test(newEn)) flags.push("HTML_IN_NEW_EN");
  if (hebrewRatio(newEn) > 0.05 && hebrewCharCount(newEn) >= 8) {
    flags.push("HEBREW_IN_NEW_EN");
  }
  if (RAW_HE_ABBREV.test(newEn)) flags.push("RAW_HE_ABBREV");
  if (EDITORIAL_NOTE.test(newEn)) flags.push("EDITORIAL_NOTE");
  if (/\b(TBD|TODO|FIXME|translation pending)\b/i.test(newEn)) {
    flags.push("PLACEHOLDER");
  }
  if (/\[\s*"/.test(newEn) || /\["/.test(newEn)) flags.push("JSON_ARRAY_LEAK");

  for (const p of FAILURE_PATTERNS) {
    if (p.re.test(newEn)) flags.push(`FAILURE:${p.id}`);
  }

  const hagah = hasHagah(heHtml);
  const hagahCount = countHagahBlocks(heHtml);
  const ramaCount = countRamaBraces(newEn);
  const postHe = hePostRamaPlain(heHtml);
  const postEn = enPostRamaPlain(newEn);

  if (hagah && ramaCount === 0) flags.push("RAMA_MISSING_VS_HE_HAGAH");
  if (!hagah && ramaCount > 0) flags.push("RAMA_PRESENT_WITHOUT_HE_HAGAH");
  if (hagahCount > 0 && ramaCount > 0 && ramaCount < hagahCount) {
    flags.push(`RAMA_COUNT_${ramaCount}_vs_HAGAH_${hagahCount}`);
  }
  if (postHe.replace(/\s+/g, "").length >= POST_RAMA_HE_MIN) {
    if (postEn.replace(/\s+/g, "").length < POST_RAMA_EN_MIN) {
      flags.push("POST_RAMA_EN_MISSING_OR_SHORT");
    }
  }
  if (endsMidClause(newEn)) flags.push("ENDS_MID_CLAUSE");
  if (ratio < CUT_RATIO_STRICT) flags.push(`CUT_RATIO_${ratio.toFixed(3)}`);

  // High-level dictionary-ish: prefer melacha / muktzeh spelling when HE has those domains
  // (soft HOLD only when confidence is low and term looks anglicized badly)
  if (String(gptCase.confidence || "").toLowerCase() === "low") {
    flags.push("CONFIDENCE_LOW");
  }

  const hardReject = flags.some(
    (f) =>
      f === "YD_LEFTOVER_ID" ||
      f === "EMPTY_NEW_EN" ||
      f === "HEBREW_IN_NEW_EN" ||
      f === "RAMA_DUPLICATE_PREFIX" ||
      f === "JSON_ARRAY_LEAK" ||
      f === "PLACEHOLDER" ||
      f.startsWith("FAILURE:")
  );
  const holdish = flags.some(
    (f) =>
      f === "RAMA_MISSING_VS_HE_HAGAH" ||
      f === "POST_RAMA_EN_MISSING_OR_SHORT" ||
      f === "ENDS_MID_CLAUSE" ||
      f === "HTML_IN_NEW_EN" ||
      f === "RAW_HE_ABBREV" ||
      f === "EDITORIAL_NOTE" ||
      f === "CONFIDENCE_LOW" ||
      f.startsWith("CUT_RATIO_") ||
      f.startsWith("RAMA_COUNT_")
  );

  let verdict = "APPROVE";
  let reason = "ok";
  if (hardReject) {
    verdict = "REJECT";
    reason = flags
      .filter(
        (f) =>
          f === "YD_LEFTOVER_ID" ||
          f === "HEBREW_IN_NEW_EN" ||
          f === "RAMA_DUPLICATE_PREFIX" ||
          f === "JSON_ARRAY_LEAK" ||
          f === "PLACEHOLDER" ||
          f.startsWith("FAILURE:")
      )
      .join("; ");
  } else if (holdish) {
    verdict = "HOLD";
    reason = flags.join("; ");
  } else if (flags.length) {
    reason = `ok_with_notes: ${flags.join("; ")}`;
  }

  return {
    id,
    part: kitCase._part,
    verdict,
    reason,
    flags,
    confidence: gptCase.confidence || null,
    scores: {
      he_chars: heChars,
      en_chars: enChars,
      en_he_ratio: Math.round(ratio * 1000) / 1000,
      hagah,
      hagah_count: hagahCount,
      rama_count: ramaCount,
      post_rama_he_chars: postHe.replace(/\s+/g, "").length,
      post_rama_en_chars: postEn.replace(/\s+/g, "").length,
    },
    new_en_preview: preview(newEn),
    source_file: gptCase._source_file || null,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { byId: kitById, partMeta } = loadKitCasesForParts(
    args.partsFrom,
    args.partsTo
  );
  const { byId: gptById, loadedParts } = loadCompletions(
    args.incoming,
    args.partsFrom,
    args.partsTo
  );

  const merged = [];
  for (const [id, kitCase] of kitById) {
    const gpt = gptById.get(id);
    if (gpt) {
      merged.push({
        id: gpt.id,
        new_en: gpt.new_en,
        notes: gpt.notes ?? "",
        confidence: gpt.confidence ?? "",
        _part: kitCase._part,
        _source_file: gpt._source_file,
      });
    }
  }
  // extras not in kit → tracked as REJECT later via leftover scan
  const extraIds = [...gptById.keys()].filter((id) => !kitById.has(id));

  const results = [];
  for (const [id, kitCase] of kitById) {
    results.push(evalCase(kitCase, gptById.get(id)));
  }
  for (const id of extraIds) {
    results.push({
      id,
      part: gptById.get(id)?._part ?? null,
      verdict: "REJECT",
      reason: "extra_id_not_in_kit_parts",
      flags: ["EXTRA_ID"],
      new_en_preview: preview(gptById.get(id)?.new_en),
    });
  }

  const counts = { APPROVE: 0, HOLD: 0, REJECT: 0 };
  for (const r of results) counts[r.verdict] = (counts[r.verdict] || 0) + 1;

  const seed = results.find((r) => r.id === "oc1/siman244/seif-001/mechaber");

  const mergedPath = path.join(AUDIT, `${KIT_NAME}_GPT_RESULT.json`);
  fs.writeFileSync(
    mergedPath,
    JSON.stringify(
      merged.map(({ id, new_en, notes, confidence }) => ({
        id,
        new_en,
        notes,
        confidence,
      })),
      null,
      2
    ) + "\n",
    "utf8"
  );

  const meta = {
    created: new Date().toISOString(),
    kit: KIT_NAME,
    mode: "fresh_translate_complete_from_he",
    parts: `${args.partsFrom}-${args.partsTo}`,
    incoming: args.incoming,
    kit_case_count: kitById.size,
    gpt_case_count: gptById.size,
    merged_path: path.basename(mergedPath),
    partMeta,
    loadedParts,
    extra_ids: extraIds,
    seed_244_1: seed
      ? { verdict: seed.verdict, reason: seed.reason, flags: seed.flags }
      : null,
    summary: `parts ${args.partsFrom}-${args.partsTo}: APPROVE=${counts.APPROVE} HOLD=${counts.HOLD} REJECT=${counts.REJECT}; seed=${seed?.verdict ?? "absent"}`,
  };

  const evalJson = path.join(AUDIT, `${KIT_NAME}_GPT_RESULT_EVAL.json`);
  const evalMd = path.join(AUDIT, `${KIT_NAME}_GPT_RESULT_EVAL.md`);
  fs.writeFileSync(
    evalJson,
    JSON.stringify({ meta, counts, results }, null, 2) + "\n",
    "utf8"
  );

  const holdReject = results
    .filter((r) => r.verdict !== "APPROVE")
    .slice(0, 40)
    .map((r) => `- \`${r.id}\` — **${r.verdict}**: ${r.reason}`)
    .join("\n");

  const md = `# ${KIT_NAME} — GPT evaluation (parts ${args.partsFrom}–${args.partsTo})

**Created:** ${meta.created}  
**Incoming:** \`${args.incoming}\`  
**Kit cases:** ${meta.kit_case_count}  
**GPT cases:** ${meta.gpt_case_count}  
**Merged:** [\`${path.basename(mergedPath)}\`](./${path.basename(mergedPath)})

## Verdict counts

| Verdict | Count |
|---------|------:|
| APPROVE | ${counts.APPROVE} |
| HOLD | ${counts.HOLD} |
| REJECT | ${counts.REJECT} |

## Seed \`oc1/siman244/seif-001/mechaber\`

${
  seed
    ? `**${seed.verdict}** — ${seed.reason}`
    : "_not in these parts / missing_"
}

## HOLD / REJECT (first 40)

${holdReject || "_none_"}

Machine eval: \`${path.basename(evalJson)}\`
`;
  fs.writeFileSync(evalMd, md, "utf8");

  console.log(meta.summary);
  console.log(`wrote ${path.basename(mergedPath)}`);
  console.log(`wrote ${path.basename(evalJson)}`);
  console.log(`wrote ${path.basename(evalMd)}`);
  if (seed) console.log(`seed 244:1 → ${seed.verdict} (${seed.reason})`);
  if (extraIds.length) console.log(`extra ids: ${extraIds.length}`);
}

main();
