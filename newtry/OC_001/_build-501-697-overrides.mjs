#!/usr/bin/env node
/**
 * Build overrides via Google Translate for failed preflight blocks.
 * Run: node _build-501-697-overrides.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "./oc001_block_lib.mjs";
import { autoFix } from "./pipeline/_slot18-lib.mjs";
import { plainFromHtml } from "./pipeline/lib/quality-checks.mjs";

const OC_ROOT = path.dirname(fileURLToPath(import.meta.url));
const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateHe(text) {
  const q = encodeURIComponent(text.slice(0, 4500));
  const res = await fetch(`${GOOGLE}&q=${q}`);
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("");
}

const failKeys = `501|rabbi-akiva-eiger|7|_
502|rabbi-akiva-eiger|4|_
514|rabbi-akiva-eiger|5|_
518|rabbi-akiva-eiger|2|_
531|rabbi-akiva-eiger|4|_
531|rabbi-akiva-eiger|8|_
533|rabbi-akiva-eiger|3|_
538|rabbi-akiva-eiger|6|_
545|chokhmat-shlomo|3|_
547|chokhmat-shlomo|3|_
551|chokhmat-shlomo|10|_
551|chokhmat-shlomo|3|_
551|rabbi-akiva-eiger|9|_
552|rabbi-akiva-eiger|7|_
561|chokhmat-shlomo|2|_
561|rabbi-akiva-eiger|3|_
561|rabbi-akiva-eiger|4|_
565|chokhmat-shlomo|5|_
566|rabbi-akiva-eiger|6|_
570|rabbi-akiva-eiger|3|_
574|chokhmat-shlomo|4|_
582|chokhmat-shlomo|8|_
582|rabbi-akiva-eiger|5|_
585|chokhmat-shlomo|2|_
586|rabbi-akiva-eiger|12|_
586|rabbi-akiva-eiger|21|_
590|chokhmat-shlomo|4|_
591|chokhmat-shlomo|6|_
591|rabbi-akiva-eiger|4|_
607|rabbi-akiva-eiger|3|_
608|chokhmat-shlomo|2|_
610|rabbi-akiva-eiger|4|_
612|rabbi-akiva-eiger|6|_
612|rabbi-akiva-eiger|9|_
613|chokhmat-shlomo|2|_
616|rabbi-akiva-eiger|2|_
617|chokhmat-shlomo|2|_
619|chokhmat-shlomo|2|_
622|chokhmat-shlomo|2|_
624|chokhmat-shlomo|5|_
629|chokhmat-shlomo|6|_
629|rabbi-akiva-eiger|12|_
629|rabbi-akiva-eiger|6|_
629|shaarei-teshuvah|16|_
630|rabbi-akiva-eiger|3|_
630|shaarei-teshuvah|10|_
631|rabbi-akiva-eiger|5|_
631|rabbi-akiva-eiger|9|_
634|rabbi-akiva-eiger|3|_
638|chokhmat-shlomo|2|_
639|rabbi-akiva-eiger|7|_
640|rabbi-akiva-eiger|4|_
643|chokhmat-shlomo|3|_
646|rabbi-akiva-eiger|8|_
647|chokhmat-shlomo|2|_
651|rabbi-akiva-eiger|5|_
653|rabbi-akiva-eiger|2|_
658|rabbi-akiva-eiger|6|_
663|chokhmat-shlomo|3|_
671|rabbi-akiva-eiger|8|_
675|rabbi-akiva-eiger|3|_
676|chokhmat-shlomo|5|_
685|chokhmat-shlomo|7|_
688|rabbi-akiva-eiger|6|_
689|chokhmat-shlomo|5|_
690|rabbi-akiva-eiger|10|_
690|rabbi-akiva-eiger|9|_
693|chokhmat-shlomo|2|_
694|chokhmat-shlomo|2|_
696|chokhmat-shlomo|4|_
696|rabbi-akiva-eiger|4|_
696|rabbi-akiva-eiger|8|_
`.trim().split("\n");

const overrides = {};

for (const k of failKeys) {
  const [siman, slug, seif, marker] = k.split("|");
  const fp = path.join(OC_ROOT, "output", `siman_${siman}`, slug, "part-001.txt");
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === slug &&
      String(x.seif) === seif &&
      String(x.marker) === marker,
  );
  if (!b) throw new Error(`Block not found: ${k}`);
  const he = plainFromHtml(b.he || "");
  process.stdout.write(`MT ${k} (${he.length}) … `);
  let en = await translateHe(he);
  en = autoFix(en, marker, he);
  overrides[k] = en;
  await new Promise((r) => setTimeout(r, 400));
}
const out = `export const OVERRIDES = ${JSON.stringify(overrides, null, 2)};\n`;
fs.writeFileSync(path.join(OC_ROOT, "_siman501-697-stragglers-overrides.mjs"), out);
console.log("Wrote", Object.keys(overrides).length, "overrides");