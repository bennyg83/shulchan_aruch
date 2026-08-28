/**
 * Robust parse of GPT moderate resegment blob — handles unescaped quotes in he/en.
 */
import fs from "fs";

function readJsonString(s, i) {
  if (s[i] !== '"') return null;
  let out = "";
  i++;
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\\") {
      out += ch;
      i++;
      if (i < s.length) {
        out += s[i];
        i++;
      }
      continue;
    }
    if (ch === '"') {
      return { value: out, next: i + 1 };
    }
    out += ch;
    i++;
  }
  return null;
}

function skipWs(s, i) {
  while (i < s.length && /\s/.test(s[i])) i++;
  return i;
}

function parseSegmentObjects(chunk) {
  const segs = [];
  const arrStart = chunk.indexOf('"segments"');
  if (arrStart < 0) return segs;
  let i = chunk.indexOf("[", arrStart);
  if (i < 0) return segs;
  i++;
  while (i < chunk.length) {
    i = skipWs(chunk, i);
    if (chunk[i] === "]") break;
    if (chunk[i] !== "{") {
      i++;
      continue;
    }
    let depth = 0;
    let j = i;
    for (; j < chunk.length; j++) {
      if (chunk[j] === "{") depth++;
      else if (chunk[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    const objStr = chunk.slice(i, j);
    const indexM = objStr.match(/"index":\s*(\d+)/);
    const idx = indexM ? Number(indexM[1]) : segs.length;
    const enKey = objStr.indexOf('"en"');
    let en = "";
    if (enKey >= 0) {
      let k = objStr.indexOf(":", enKey) + 1;
      k = skipWs(objStr, k);
      const parsed = readJsonString(objStr, k);
      if (parsed) en = parsed.value;
      else {
        const q1 = objStr.indexOf('"', enKey + 5);
        const srcPos = objStr.indexOf('"source"');
        const endPos = srcPos > 0 ? objStr.lastIndexOf('"', srcPos - 1) : objStr.lastIndexOf('"');
        if (q1 >= 0 && endPos > q1) en = objStr.slice(q1 + 1, endPos);
      }
    }
    const srcM = objStr.match(/"source":\s*"([^"]+)"/);
    segs[idx] = { index: idx, en, source: srcM ? srcM[1] : null };
    i = j;
    i = skipWs(chunk, i);
    if (chunk[i] === ",") i++;
  }
  return segs.filter(Boolean);
}

export function extractGptBlob(transcriptPath) {
  const lines = fs.readFileSync(transcriptPath, "utf8").split(/\n/).filter(Boolean);
  for (const line of lines) {
    if (!line.includes("oc1/siman1/seif-009/yad-ephraim")) continue;
    if (!line.includes("gpt response")) continue;
    const obj = JSON.parse(line);
    const text = obj.message?.content?.[0]?.text || "";
    const marker = text.indexOf("gpt response");
    const start = text.indexOf("[", marker);
    const end = text.lastIndexOf("]");
    return text.slice(start, end + 1);
  }
  throw new Error("GPT blob not found");
}

export function parseGptCases(blob) {
  const cases = [];
  const idRe = /"id":\s*"((?:oc1|yd1|cm1)\/siman\d+\/seif-\d+\/[^"]+)"/g;
  const hits = [...blob.matchAll(idRe)];
  for (let hi = 0; hi < hits.length; hi++) {
    const id = hits[hi][1];
    const chunkStart = hits[hi].index;
    const chunkEnd = hi + 1 < hits.length ? hits[hi + 1].index : blob.length;
    const chunk = blob.slice(chunkStart, chunkEnd);
    const actionM = chunk.match(/"action":\s*"([^"]+)"/);
    const confM = chunk.match(/"confidence":\s*"([^"]+)"/);
    const notesM = chunk.match(/"notes":\s*"((?:\\.|[^"\\])*)"/);
    const segObjs = parseSegmentObjects(chunk);
    const segments_en = segObjs.map((s) => s.en);
    const sources = segObjs.map((s) => s.source);

    let en_segments = [];
    const legacyStart = chunk.indexOf('"en_segments"');
    if (legacyStart >= 0) {
      let i = chunk.indexOf("[", legacyStart);
      i++;
      while (i < chunk.length) {
        i = skipWs(chunk, i);
        if (chunk[i] === "]") break;
        const parsed = readJsonString(chunk, i);
        if (parsed) {
          en_segments.push(parsed.value);
          i = parsed.next;
        } else break;
        i = skipWs(chunk, i);
        if (chunk[i] === ",") i++;
      }
    }
    if (!en_segments.length) en_segments = [...segments_en];

    cases.push({
      id,
      action: actionM ? actionM[1] : null,
      confidence: confM ? confM[1] : null,
      notes: notesM ? notesM[1].replace(/\\"/g, '"') : "",
      segments_en,
      en_segments,
      sources,
    });
  }
  return cases;
}
