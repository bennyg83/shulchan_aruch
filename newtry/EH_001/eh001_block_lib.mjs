/**
 * Per-source YD 001 translation files: blocks keyed by slug / seif / marker.
 * Also accepts OC001 / SA pre-process headers (same body layout).
 */
export const BLOCK_START = "**** EH001 SOURCE BLOCK ****";
export const BLOCK_START_OC = "**** OC001 SOURCE BLOCK ****";
export const BLOCK_START_SA = "**** SA SOURCE BLOCK ****";
export const BLOCK_END = "**** END BLOCK ****";
export const HEBREW_HDR = "**** HEBREW ****";
export const ENGLISH_HDR = "**** ENGLISH ****";

export const EN_PENDING_DEFAULT =
  "English translation pending — replace after editing this block (keep Hebrew above intact).";

export function blockKey(slug, seif, marker) {
  const s = String(slug ?? "").trim();
  const n = String(seif ?? "").trim();
  const m = marker === undefined || marker === null ? "_" : String(marker).trim() || "_";
  return `${s}\u0001${n}\u0001${m}`;
}

export function serializeBlock({ slug, seif, marker, he, en }) {
  const mk = marker === undefined || marker === null ? "_" : String(marker).trim() || "_";
  return [
    BLOCK_START,
    `slug: ${String(slug).trim()}`,
    `seif: ${String(seif).trim()}`,
    `marker: ${mk}`,
    HEBREW_HDR,
    String(he ?? "").trimEnd(),
    ENGLISH_HDR,
    String(en ?? "").trimEnd(),
    BLOCK_END,
    "",
  ].join("\n");
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function parseBlocksInFile(raw) {
  const text = String(raw).replace(/\r\n/g, "\n");
  const anyBlock = new RegExp(
    `^(?:${escapeRegExp(BLOCK_START)}|${escapeRegExp(BLOCK_START_OC)}|${escapeRegExp(BLOCK_START_SA)})\\s*$`,
    "m"
  );
  const segments = text.split(anyBlock);
  const out = [];
  for (const seg of segments) {
    const chunk = seg.trim();
    if (!chunk) continue;
    const endIdx = chunk.search(new RegExp(`^${escapeRegExp(BLOCK_END)}\\s*$`, "m"));
    const body = (endIdx === -1 ? chunk : chunk.slice(0, endIdx)).trimEnd();
    const parsed = parseOneBlockBody(body);
    if (parsed && parsed.slug) out.push(parsed);
  }
  return out;
}

function parseOneBlockBody(body) {
  const lines = body.split("\n");
  let slug = "";
  let seif = "";
  let marker = "_";
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const sl = /^slug:\s*(.*)$/i.exec(line);
    const sf = /^seif:\s*(.*)$/i.exec(line);
    const mk = /^marker:\s*(.*)$/i.exec(line);
    if (sl) slug = sl[1].trim();
    else if (sf) seif = sf[1].trim();
    else if (mk) marker = mk[1].trim() || "_";
    else if (/^(section|siman|paragraph):\s*/i.test(line)) continue;
    else if (line.trim() === HEBREW_HDR) {
      i++;
      break;
    }
  }
  const heLines = [];
  for (; i < lines.length; i++) {
    if (lines[i].trim() === ENGLISH_HDR) {
      i++;
      break;
    }
    heLines.push(lines[i]);
  }
  const enLines = [];
  for (; i < lines.length; i++) enLines.push(lines[i]);
  return {
    slug,
    seif,
    marker,
    he: heLines.join("\n").trimEnd(),
    en: enLines.join("\n").trimEnd(),
  };
}
