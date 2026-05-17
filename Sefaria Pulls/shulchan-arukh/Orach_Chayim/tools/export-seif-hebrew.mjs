/**
 * Export layers.* from simanim/SSS/seif-TTT.json → seif-TTT/<slug>/he.html
 * Usage: node tools/export-seif-hebrew.mjs --siman 1 --seif 1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugFromLayerKey } from "../../../../newtry/lib/orach_chayim_layer_slug.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");

function layerToHtml(layer) {
  if (!layer) return "";
  if (layer.kind === "html") return String(layer.html ?? "");
  if (layer.kind === "segments" && Array.isArray(layer.segments)) {
    return layer.segments.map((s) => String(s).trim()).join("<br>\n");
  }
  return "";
}

function parseArgs() {
  let siman = 1,
    seif = 1;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    if (a[i] === "--seif" && a[i + 1]) seif = Number(a[++i]);
  }
  return { siman, seif };
}

const { siman, seif } = parseArgs();
const pad = (n) => String(n).padStart(3, "0");
const bundlePath = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}.json`);
const outRoot = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`);

const doc = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
const layers = doc.layers || {};

for (const [key, layer] of Object.entries(layers)) {
  const slug = slugFromLayerKey(key);
  const dir = path.join(outRoot, slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = layerToHtml(layer);
  fs.writeFileSync(path.join(dir, "he.html"), html + (html.endsWith("\n") ? "" : "\n"), "utf8");
  console.log(slug, html.length ? `${html.length} chars` : "(empty)");
}
