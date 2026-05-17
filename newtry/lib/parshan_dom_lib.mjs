/**
 * Cheerio DOM helpers for legacy HTML snapshots (`.verse`, `.parshan`, `.parshan-p`).
 * Used only by optional HTML-based extract scripts — canonical OC Orach Chayim text is Sefaria `merged.json` → `seif-NNN.json`.
 */
import fs from "fs";

export const SKIP_SLUGS = new Set(["minimized"]);

export function readIfExists(p) {
  if (!fs.existsSync(p)) throw new Error(`Missing file: ${p}`);
  return fs.readFileSync(p, "utf8");
}

export function normalizeMarkerText($, $numSpan) {
  let t = $numSpan.text().trim();
  if (t === "(_plain)") {
    const ptext = $numSpan.closest(".parshan-p").text();
    const matches = [...ptext.matchAll(/\(([^)]+)\)/g)].map((x) => x[1]);
    const real = matches.find((x) => x !== "_plain");
    return real ? real.trim() : "";
  }
  const m = t.match(/\(([^)]+)\)/);
  if (m) return m[1].trim();
  return t.replace(/^\(|\)$/g, "").trim();
}

export function extractSectionsFromColumn($, $parshan) {
  const sections = [];
  let curMarker = null;
  let parts = [];

  const flush = () => {
    const txt = normalizeWs(parts.join("\n")).trim();
    if (curMarker === null && !txt) return;
    sections.push({ marker: curMarker ?? "_", he: txt });
    parts = [];
  };

  $parshan.find(".content .parshan-p").each((_, el) => {
    const $p = $(el);
    const $n = $p.find(".num").first();
    if ($n.length) {
      flush();
      curMarker = normalizeMarkerText($, $n);
    }
    const clone = $p.clone();
    clone.find(".num").remove();
    const t = clone.text().replace(/\s+/g, " ").trim();
    if (t) parts.push(t);
  });
  flush();
  return sections;
}

function normalizeWs(s) {
  return s.replace(/\s+/g, " ").trim();
}

export function slugFromParshanEl($el) {
  const cls = ($el.attr("class") || "").split(/\s+/).filter(Boolean);
  for (const s of cls) {
    if (s === "parshan") continue;
    if (SKIP_SLUGS.has(s)) continue;
    return s;
  }
  return null;
}
