/**
 * Map Sefaria commentary folder/title → filesystem slug.
 */
import fs from "fs";
import path from "path";

export function slugFromLayerKey(key) {
  if (!key || key === "mechaber") return "mechaber";
  return String(key)
    .replace(/ on Shulchan Arukh,? (Even HaEzer|Even Ha'Ezer|Choshen Mishpat|Yoreh De'?ah)/gi, "")
    .replace(/ on (Even HaEzer|Choshen Mishpat|Yoreh De'?ah)/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/, Beurim|, Hidushim|, Tumim|, Urim/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function buildLayerMapFromCommentaryDirSync(commentariesDir) {
  const map = { mechaber: "mechaber" };
  if (!commentariesDir || !fs.existsSync(commentariesDir)) return map;
  for (const name of fs.readdirSync(commentariesDir)) {
    map[name] = slugFromLayerKey(name);
  }
  return map;
}

export function writeLayerSlugModule(outPath, volumeLabel, layerMap) {
  const entries = Object.entries(layerMap)
    .sort(([a], [b]) => (a === "mechaber" ? -1 : b === "mechaber" ? 1 : a.localeCompare(b)))
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join("\n");
  const esc = volumeLabel.replace(/'/g, "['']?");
  const body = `/**
 * ${volumeLabel} — Sefaria layer key → output slug
 */
export const LAYER_KEY_TO_SLUG = {
${entries}
};

export function slugFromLayerKey(key) {
  if (LAYER_KEY_TO_SLUG[key]) return LAYER_KEY_TO_SLUG[key];
  return key
    .replace(/ on Shulchan Arukh,? ${esc}/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function outputSlugFromLayerKey(layerKey) {
  return slugFromLayerKey(layerKey);
}
`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, body, "utf8");
}
