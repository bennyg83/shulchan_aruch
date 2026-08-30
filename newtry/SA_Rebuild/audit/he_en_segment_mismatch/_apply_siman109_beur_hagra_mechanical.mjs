/**
 * One-shot verbatim semantic split for yd1/siman109/seif-001/beur-hagra.
 * EN already contains all HE slot material; only insert <br /> at unique heads.
 * No body rewrite. Hebrew untouched.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(__dirname, "../../../..");
const ID = "yd1/siman109/seif-001/beur-hagra";
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const hePath = path.join(CORPUS, ID, "he.html");
const enPath = path.join(CORPUS, ID, "en.html");

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function joinSegments(segs) {
  return segs.join("<br />\n") + (segs.length ? "\n" : "");
}

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const heRaw = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
const enBefore = fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "");
const heSegs = splitHtmlByBrSegments(heRaw);
const enSegs = splitHtmlByBrSegments(enBefore);

if (heSegs.length !== 11) throw new Error(`unexpected HE count ${heSegs.length}`);
if (enSegs.length !== 4) throw new Error(`unexpected EN count ${enSegs.length}`);

const heads = [
  "Piece, etc.",
  "Same kind in its kind.",
  "Meaning, etc.",
  "One in two.",
  "But he may not, etc.",
  "And there is one who, etc.",
  "And some are stringent, etc.",
];

const e0 = enSegs[0];
const idxs = heads.map((h) => {
  const i = e0.indexOf(h);
  if (i < 0) throw new Error(`missing head ${h}`);
  return i;
});
for (let i = 1; i < idxs.length; i++) {
  if (idxs[i] <= idxs[i - 1]) throw new Error("non-increasing heads");
}

const parts0 = [];
for (let i = 0; i < idxs.length; i++) {
  const start = idxs[i];
  const end = i + 1 < idxs.length ? idxs[i + 1] : e0.length;
  parts0.push(e0.slice(start, end).trim());
}

const cut = "And there is no distinction in all this, etc.";
const e1 = enSegs[1];
const cutIdx = e1.indexOf(cut);
if (cutIdx <= 0) throw new Error(`bad cutIdx ${cutIdx}`);
const parts1 = [e1.slice(0, cutIdx).trim(), e1.slice(cutIdx).trim()];
if (!stripTags(parts1[0]).startsWith("(Likkut)")) {
  throw new Error("expected Likkut before semantic cut");
}
if (!parts1[1].startsWith(cut)) throw new Error("cut piece mismatch");

const out = [...parts0, ...parts1, enSegs[2].trim(), enSegs[3].trim()];
if (out.length !== 11) throw new Error(`out len ${out.length}`);

for (const i of [7, 9, 10]) {
  if (!/^\(Likkut\)/i.test(stripTags(out[i]))) {
    throw new Error(`missing Likkut at ${i}: ${stripTags(out[i]).slice(0, 50)}`);
  }
}

const enAfter = joinSegments(out);
const afterCount = splitHtmlByBrSegments(enAfter).length;
if (afterCount !== 11) throw new Error(`after count ${afterCount}`);

const bodyBefore = stripTags(enBefore).replace(/\s+/g, " ").trim();
const bodyAfter = stripTags(enAfter).replace(/\s+/g, " ").trim();
if (bodyBefore !== bodyAfter) {
  throw new Error("body not verbatim after structural split");
}

fs.writeFileSync(enPath, enAfter, "utf8");
console.log(`APPLIED ${ID}: en 4->11 he=11 verbatim=true`);
out.forEach((s, i) => console.log(i, stripTags(s).slice(0, 72)));
