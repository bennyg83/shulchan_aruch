import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = __dirname;
const pack = JSON.parse(
  fs.readFileSync(path.join(DIR, 'EN_HAS_MORE_GLUED_REVIEW_PACK.json'), 'utf8'),
);
const byId = Object.fromEntries(pack.cases.map((c) => [c.id, c]));

const priorNotes = {
  'yd1/siman4/seif-004/yad-avraham':
    'EN2 duplicates EN0+EN1 (full seif replay). Contiguous merge cannot drop the duplicate. Prefer drop_en_indices:[2] then keep [[0],[1]].',
  'yd1/siman37/seif-002/yad-avraham':
    'EN11 has no matching HE (extra EN segment at end: "(Siman 37 seif 2) If an adhesion…"). HE0–10 align with EN0–10. Prefer drop EN11 or needs_human if EN11 is a missing HE note.',
  'yd1/siman48/seif-004/yad-avraham':
    'EN3 duplicates EN0–EN2 (full seif replay). Prefer drop_en_indices:[3] then keep [[0],[1],[2]].',
  'yd1/siman61/seif-006/yad-avraham':
    'EN2 duplicates EN0+EN1 (full seif replay). Prefer drop_en_indices:[2] then keep [[0],[1]].',
  'yd1/siman106/seif-002/baer-heitev':
    'Classic stub-then-body: EN0–2 are short lemma stubs ("To nullify" / "Until it cools" / "Rendered forbidden"); EN3–5 are body expansions of those same three HE notes. Contiguous merge of stubs together is wrong. Prefer pair_map [[0,3],[1,4],[2,5]] or reorder_en_then_merge.',
  'yd1/siman245/seif-006/beur-hagra':
    'Spot REJECT: lemmas E0–E3 then bodies E4–E7 (non-contiguous lemma/body). Contiguous rejoin cannot align. Likely pair_map [[0,4],[1,5],[2,6],[3,7]].',
  'yd1/siman263/seif-005/baer-heitev':
    'Stub/body interleave: EN0 "Previously." and EN1 "Conversion." are stubs; EN2–3 look like bodies (EN3 begins "Conversion ;"). Prefer pair_map [[0,2],[1,3]] after confirming EN2 body belongs with HE0 קודם.',
  'yd1/siman308/seif-003/beur-hagra':
    'Garbled MT on EN2–3 ("Luke"/"Hashem of hosts"/"US"). EN0–1 look like lemma stubs for two HE notes. May need pair_map [[0,2],[1,3]] plus propose_en_rewrite_skip, or needs_human.',
  'yd1/siman331/seif-034/beur-hagra':
    'Spot REJECT: gluing האומר (E0) with וי"א (E1) is wrong; E2–E3 are broken MT. Distinct notes — likely pair_map [[0,2],[1,3]] with rewrite, or needs_human / propose_en_rewrite_skip.',
  'yd1/siman334/seif-042/beur-hagra':
    'Five Gra lemma stubs EN0–4 then five garbled bodies EN5–9. Prefer pair_map [[0,5],[1,6],[2,7],[3,8],[4,9]]; bodies may need rewrite.',
  'yd1/siman334/seif-043/baer-heitev':
    'Non-contiguous stub/body: EN0–2 stubs ("The sage" / "One who calculates" / "Against one who"); EN3–5 bodies. Prefer pair_map [[0,3],[1,4],[2,5]].',
  'cm1/siman275/seif-003/ketzot-hachoshen':
    'Parts 8–10 AI: contiguous rejoin unsafe (13 HE / 17 EN). Do not invent contiguous merge_groups without strong HE lemma alignment. Prefer needs_human or careful pair_map; avoid over-merge.',
  'yd1/siman334/seif-045/beur-hagra':
    'AI proposed contiguous [[0],[1,2,3]]; evaluator: EN2 belongs with HE0 → true fix likely non-contiguous pair_map [[0,2],[1,3]]. Do not space-rejoin as contiguous.',
  'yd1/siman269/seif-003/beur-hagra':
    'AI said needs_editorial; human marked UNCERTAIN. HE is two long notes (incl. ליקוט); EN has 6 short Gra-style heads. Unclear pairing — prefer needs_human unless high-confidence pair_map emerges.',
};

const hints = {
  'yd1/siman4/seif-004/yad-avraham':
    'drop_en_indices:[2]; remaining merge_groups:[[0],[1]]',
  'yd1/siman37/seif-002/yad-avraham':
    'likely drop_en_indices:[11]; remaining 1:1 [[0]…[10]]',
  'yd1/siman48/seif-004/yad-avraham':
    'drop_en_indices:[3]; remaining merge_groups:[[0],[1],[2]]',
  'yd1/siman61/seif-006/yad-avraham':
    'drop_en_indices:[2]; remaining merge_groups:[[0],[1]]',
  'yd1/siman106/seif-002/baer-heitev': 'pair_map:[[0,3],[1,4],[2,5]]',
  'yd1/siman245/seif-006/beur-hagra': 'pair_map:[[0,4],[1,5],[2,6],[3,7]]',
  'yd1/siman263/seif-005/baer-heitev':
    'pair_map:[[0,2],[1,3]] (verify EN2↔HE0)',
  'yd1/siman308/seif-003/beur-hagra':
    'possible pair_map:[[0,2],[1,3]]; EN body garbled',
  'yd1/siman331/seif-034/beur-hagra':
    'possible pair_map:[[0,2],[1,3]]; EN2–3 broken MT',
  'yd1/siman334/seif-042/beur-hagra':
    'pair_map:[[0,5],[1,6],[2,7],[3,8],[4,9]]',
  'yd1/siman334/seif-043/baer-heitev': 'pair_map:[[0,3],[1,4],[2,5]]',
  'cm1/siman275/seif-003/ketzot-hachoshen':
    'contiguous unsafe; needs_human unless clear non-contig map',
  'yd1/siman334/seif-045/beur-hagra': 'pair_map:[[0,2],[1,3]]',
  'yd1/siman269/seif-003/beur-hagra': 'uncertain — default needs_human',
};

const categories = {
  'yd1/siman4/seif-004/yad-avraham': 'duplicate_en',
  'yd1/siman37/seif-002/yad-avraham': 'extra_en',
  'yd1/siman48/seif-004/yad-avraham': 'duplicate_en',
  'yd1/siman61/seif-006/yad-avraham': 'duplicate_en',
  'yd1/siman106/seif-002/baer-heitev': 'stub_body',
  'yd1/siman245/seif-006/beur-hagra': 'stub_body',
  'yd1/siman263/seif-005/baer-heitev': 'stub_body',
  'yd1/siman334/seif-042/beur-hagra': 'stub_body',
  'yd1/siman334/seif-043/baer-heitev': 'stub_body',
  'yd1/siman308/seif-003/beur-hagra': 'garbled',
  'yd1/siman331/seif-034/beur-hagra': 'garbled',
  'yd1/siman269/seif-003/beur-hagra': 'uncertain',
  'cm1/siman275/seif-003/ketzot-hachoshen': 'uncertain',
  'yd1/siman334/seif-045/beur-hagra': 'non_contiguous',
};

const PROMPT_A = `SA_Rebuild GLUED OPEN kit A — Yad Avraham duplicate/extra EN (editorial, not plain contiguous rejoin).

INPUT: GLUED_OPEN_KIT_A_dupes.json only. For each case compare HE vs EN segments.

Allowed actions (pick one primary):
- drop_en_indices: remove exact duplicate or orphan EN indices, then optional merge_groups on the *remaining* EN sequence (indices remapped 0..n-1 after drop).
- pair_then_merge: use pair_map (HE-slot order; each inner array = EN indices joining into that HE slot; non-contiguous OK).
- merge_groups: contiguous partition only if truly safe after drop/reorder; len(groups)===heSegs.
- needs_human: cannot safely decide.
- propose_en_rewrite_skip: structure clear but EN text too broken to trust for apply (still give drop/pair if known).

Rules: Never modify HE. Prefer drop when EN is a verbatim/near-verbatim replay of earlier EN. Do not invent new EN text. Conservative when unsure.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,3],[1,4]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]

Semantics: after drop, merge_groups indexes the resulting EN sequence. pair_map joins listed EN indices into one HE slot (non-contiguous allowed for pair_map only).`;

const PROMPT_B = `SA_Rebuild GLUED OPEN kit B — Baer Heitev / Beur HaGra stub-then-body / interleave.

INPUT: GLUED_OPEN_KIT_B_stub_body.json only. Pattern: short EN lemma stubs listed first, full bodies later (or interleaved), so contiguous merge_groups is usually WRONG.

Prefer pair_then_merge with pair_map pairing each stub to its body (often [[0,k],[1,k+1],…] where k=heSegs). reorder_en_then_merge is OK if you first state the reordered EN index order via pair_map.

Allowed actions: drop_en_indices | pair_then_merge | merge_groups (contiguous only if safe) | needs_human | propose_en_rewrite_skip.

Never modify HE. Do not glue distinct Gra/Baer lemmas. If body EN is garbled MT, still return pair_map if pairing is clear and set action propose_en_rewrite_skip or note rewrite needed.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,3],[1,4],[2,5]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]

Semantics: pair_map = EN indices per HE slot (non-contiguous OK). merge_groups only on contiguous resulting EN order.`;

const PROMPT_C = `SA_Rebuild GLUED OPEN kit C — garbled MT / non-contiguous / uncertain / unsafe contiguous.

INPUT: GLUED_OPEN_KIT_C_garbled_uncertain.json only. These failed plain contiguous rejoin.

For each case: if a clear non-contiguous pairing exists use pair_then_merge (pair_map). If EN is broken MT but pairing is clear, use propose_en_rewrite_skip with pair_map filled. If unsafe or unclear, needs_human. Contiguous merge_groups only when truly safe.

Special hint: yd1/siman334/seif-045/beur-hagra likely pair_map [[0,2],[1,3]] (not contiguous [[0],[1,2,3]]).

Allowed actions: drop_en_indices | pair_then_merge | merge_groups | needs_human | propose_en_rewrite_skip.

Never modify HE. No new cases. Conservative.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,2],[1,3]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]`;

function makeCase(id) {
  const c = byId[id];
  if (!c) throw new Error('missing ' + id);
  return {
    id: c.id,
    category: categories[id],
    volume: c.volume,
    siman: c.siman,
    seif: c.seif,
    slug: c.slug,
    heSegs: c.heSegs,
    enSegs: c.enSegs,
    he_segments: c.he_segments,
    en_segments: c.en_segments,
    prior_notes: priorNotes[id],
    hint: hints[id],
    pack_meta: {
      unsafe_reason: c.unsafe_reason ?? null,
      spot_verdict: c.spot_verdict ?? null,
      spot_reason: c.spot_reason ?? null,
      prior_auto_merge_groups: c.prior_auto_merge_groups ?? null,
      alignHint: c.alignHint ?? null,
      strongEnHeads: c.strongEnHeads ?? null,
    },
  };
}

const allowed = [
  'drop_en_indices',
  'reorder_en_then_merge',
  'merge_groups_contiguous',
  'needs_human',
  'propose_en_rewrite_skip',
];

const kits = [
  {
    file: 'GLUED_OPEN_KIT_A_dupes.json',
    kit: 'A',
    purpose:
      'Yad Avraham duplicate EN replay / extra EN — drop or editorial; not contiguous merge-only.',
    prompt: PROMPT_A,
    ids: [
      'yd1/siman4/seif-004/yad-avraham',
      'yd1/siman37/seif-002/yad-avraham',
      'yd1/siman48/seif-004/yad-avraham',
      'yd1/siman61/seif-006/yad-avraham',
    ],
  },
  {
    file: 'GLUED_OPEN_KIT_B_stub_body.json',
    kit: 'B',
    purpose:
      'Baer Heitev / Beur HaGra stub-then-body or stub/body interleave — prefer non-contiguous pair_map.',
    prompt: PROMPT_B,
    ids: [
      'yd1/siman106/seif-002/baer-heitev',
      'yd1/siman245/seif-006/beur-hagra',
      'yd1/siman263/seif-005/baer-heitev',
      'yd1/siman334/seif-042/beur-hagra',
      'yd1/siman334/seif-043/baer-heitev',
    ],
  },
  {
    file: 'GLUED_OPEN_KIT_C_garbled_uncertain.json',
    kit: 'C',
    purpose:
      'Garbled MT, non-contiguous Gra pairing, uncertain, or unsafe contiguous Ketzot — editorial / needs_human.',
    prompt: PROMPT_C,
    ids: [
      'yd1/siman308/seif-003/beur-hagra',
      'yd1/siman331/seif-034/beur-hagra',
      'yd1/siman334/seif-045/beur-hagra',
      'yd1/siman269/seif-003/beur-hagra',
      'cm1/siman275/seif-003/ketzot-hachoshen',
    ],
  },
];

const sizes = [];
for (const k of kits) {
  const obj = {
    meta: {
      purpose: k.purpose,
      kit: k.kit,
      source:
        'EN_HAS_MORE_GLUED_REVIEW_PACK.json OPEN list (EN_REJOIN_CURATED_APPLY.md)',
      created: '2026-08-27',
      case_count: k.ids.length,
      prompt: k.prompt,
      allowed_actions: allowed,
      output_schema_note:
        'After drop/reorder, merge_groups is on the resulting EN sequence. pair_map joins those EN indices into one HE slot (non-contiguous allowed for pair_map only).',
      hard_cap_utf8_bytes: 85000,
    },
    cases: k.ids.map(makeCase),
  };
  const text = JSON.stringify(obj, null, 2) + '\n';
  const bytes = Buffer.byteLength(text, 'utf8');
  if (bytes > 85000) throw new Error(`${k.file} exceeds 85k: ${bytes}`);
  fs.writeFileSync(path.join(DIR, k.file), text, 'utf8');
  sizes.push({
    file: k.file,
    kit: k.kit,
    cases: k.ids.length,
    bytes,
    ids: k.ids,
  });
  console.log('Wrote', k.file, bytes, 'bytes', k.ids.length, 'cases');
}

const md = `# GLUED OPEN kits — GPT editorial (14 cases)

**Date:** 2026-08-27  
**LIVE audit folder:** \`newtry/SA_Rebuild/audit/he_en_segment_mismatch/\`  
**Source segments:** \`EN_HAS_MORE_GLUED_REVIEW_PACK.json\` (full HE/EN)  
**Corpus apply:** **none** — kits only. Contiguous \`merge_groups\` track for the glued pack is closed except these OPEN cases.

## Kit inventory

| Kit | File | Cases | UTF-8 bytes | Failure mode |
|-----|------|------:|------------:|--------------|
| A | \`GLUED_OPEN_KIT_A_dupes.json\` | ${sizes[0].cases} | ${sizes[0].bytes} | Yad Avraham duplicate / extra EN |
| B | \`GLUED_OPEN_KIT_B_stub_body.json\` | ${sizes[1].cases} | ${sizes[1].bytes} | Stub-then-body / interleave |
| C | \`GLUED_OPEN_KIT_C_garbled_uncertain.json\` | ${sizes[2].cases} | ${sizes[2].bytes} | Garbled / non-contig / uncertain |

Hard cap: **≤85,000 UTF-8 bytes** per kit (plain JSON, no compression). All kits under cap.

## Cases by kit

### Kit A — dupes / extra EN
1. \`yd1/siman4/seif-004/yad-avraham\` — duplicate_en (EN2 ≈ EN0+1)
2. \`yd1/siman37/seif-002/yad-avraham\` — extra_en (EN11 no HE)
3. \`yd1/siman48/seif-004/yad-avraham\` — duplicate_en (EN3 ≈ EN0–2)
4. \`yd1/siman61/seif-006/yad-avraham\` — duplicate_en (EN2 ≈ EN0+1)

### Kit B — stub / body
5. \`yd1/siman106/seif-002/baer-heitev\`
6. \`yd1/siman245/seif-006/beur-hagra\`
7. \`yd1/siman263/seif-005/baer-heitev\`
8. \`yd1/siman334/seif-042/beur-hagra\`
9. \`yd1/siman334/seif-043/baer-heitev\`

### Kit C — garbled / non-contiguous / uncertain
10. \`yd1/siman308/seif-003/beur-hagra\` — garbled
11. \`yd1/siman331/seif-034/beur-hagra\` — garbled + distinct notes
12. \`yd1/siman334/seif-045/beur-hagra\` — non_contiguous (likely [[0,2],[1,3]])
13. \`yd1/siman269/seif-003/beur-hagra\` — uncertain
14. \`cm1/siman275/seif-003/ketzot-hachoshen\` — unsafe contiguous

## How to use

Paste **one kit JSON** + the matching prompt below into GPT. Return JSON array only for that kit’s ids.

### Semantics (read once)

- \`drop_indices\`: remove those EN indices first.
- After drop/reorder, \`merge_groups\` indexes the **resulting** EN sequence (contiguous partitions).
- \`pair_map\`: list of EN-index groups in **HE slot order**; each group joins into one HE segment. **Non-contiguous EN indices allowed only in \`pair_map\`.**
- Do not modify HE. No corpus writes from this review.

### Expected output schema

\`\`\`json
[{
  "id": "...",
  "action": "drop_en_indices" | "pair_then_merge" | "merge_groups" | "needs_human" | "propose_en_rewrite_skip",
  "drop_indices": null | [2],
  "pair_map": null | [[0,3],[1,4],[2,5]],
  "merge_groups": null | [[0],[1,2]],
  "notes": "short",
  "confidence": "high" | "medium" | "low"
}]
\`\`\`

---

## Copy-paste prompt — Kit A

\`\`\`
${PROMPT_A}
\`\`\`

---

## Copy-paste prompt — Kit B

\`\`\`
${PROMPT_B}
\`\`\`

---

## Copy-paste prompt — Kit C

\`\`\`
${PROMPT_C}
\`\`\`

---

## Reusable short template (any future OPEN kit)

\`\`\`
SA_Rebuild GLUED OPEN kit <X>. INPUT: <kit file> only.
For each case pick one action: drop_en_indices | pair_then_merge | merge_groups | needs_human | propose_en_rewrite_skip.
pair_map = EN indices per HE slot (non-contiguous OK). merge_groups only on contiguous resulting EN after drop/reorder; len===heSegs.
Never modify HE. Conservative. OUTPUT JSON array only:
[{"id":"...","action":"...","drop_indices":null|[n],"pair_map":null|[[...]],"merge_groups":null|[[...]],"notes":"short","confidence":"high"|"medium"|"low"}]
\`\`\`
`;

fs.writeFileSync(path.join(DIR, 'GLUED_OPEN_KITS.md'), md, 'utf8');
console.log('Wrote GLUED_OPEN_KITS.md', Buffer.byteLength(md, 'utf8'), 'bytes');
console.log(JSON.stringify(sizes, null, 2));
for (const k of kits) {
  console.log('prompt', k.kit, 'chars', k.prompt.length);
}
