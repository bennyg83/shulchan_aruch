/** Web reader resume + UI prefs (separate key from mobile). */
export const READER_RESUME_KEY = "oc_web_reader_resume_v1";
export const READER_PREFS_KEY = "oc_web_reader_prefs_v2";

export function loadReaderResume() {
  try {
    const raw = localStorage.getItem(READER_RESUME_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || o.v !== 1 || typeof o.corpusPath !== "string" || !Number.isFinite(o.siman) || !Number.isFinite(o.seif))
      return null;
    return o;
  } catch {
    return null;
  }
}

export function saveReaderResume({ corpusPath, siman, seif, volumeId }) {
  try {
    localStorage.setItem(
      READER_RESUME_KEY,
      JSON.stringify({
        v: 1,
        volumeId: volumeId || "oc1",
        corpusPath,
        siman,
        seif,
        at: Date.now(),
      })
    );
  } catch {
    /* quota */
  }
}

/** @typedef {{ volumeId?: string, showHebrew?: boolean, showEnglish?: boolean, commentaryKeys?: string[] | null, theme?: string }} ReaderPrefs */

/** @returns {ReaderPrefs | null} */
export function loadReaderPrefs() {
  try {
    const raw = localStorage.getItem(READER_PREFS_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || o.v !== 2) return null;
    const out = {};
    if (typeof o.volumeId === "string") out.volumeId = o.volumeId;
    if (typeof o.showHebrew === "boolean") out.showHebrew = o.showHebrew;
    if (typeof o.showEnglish === "boolean") out.showEnglish = o.showEnglish;
    if (typeof o.theme === "string") out.theme = o.theme;
    if (o.commentaryKeys === null) out.commentaryKeys = null;
    else if (Array.isArray(o.commentaryKeys)) {
      out.commentaryKeys = o.commentaryKeys.filter((k) => typeof k === "string");
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

/** @param {ReaderPrefs} prefs */
export function saveReaderPrefs(prefs) {
  try {
    localStorage.setItem(
      READER_PREFS_KEY,
      JSON.stringify({
        v: 2,
        volumeId: prefs.volumeId ?? "oc1",
        showHebrew: prefs.showHebrew !== false,
        showEnglish: prefs.showEnglish !== false,
        commentaryKeys: prefs.commentaryKeys ?? null,
        theme: prefs.theme === "dark" ? "dark" : "light",
        at: Date.now(),
      })
    );
  } catch {
    /* quota */
  }
}

export function parseReaderUrl() {
  const qp = new URLSearchParams(window.location.search);
  const siman = qp.get("siman");
  const seif = qp.get("seif");
  const vol = qp.get("vol");
  const commentaries = qp.get("commentaries");
  let commentaryKeys = undefined;
  if (commentaries === "all" || commentaries === "") commentaryKeys = null;
  else if (commentaries === "none") commentaryKeys = [];
  else if (commentaries != null && commentaries !== "") {
    commentaryKeys = commentaries
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return {
    volumeId: vol && vol !== "" ? vol : null,
    siman: siman != null && siman !== "" ? Number(siman) : null,
    seif: seif != null && seif !== "" ? Number(seif) : null,
    commentaryKeys,
  };
}

export function replaceReaderUrl({ volumeId, siman, seif, commentaryKeys }) {
  const qp = new URLSearchParams(window.location.search);
  if (volumeId) qp.set("vol", volumeId);
  else qp.delete("vol");
  qp.set("siman", String(siman));
  qp.set("seif", String(seif));
  if (commentaryKeys === null || commentaryKeys === undefined) {
    qp.delete("commentaries");
  } else if (Array.isArray(commentaryKeys) && commentaryKeys.length > 0) {
    qp.set("commentaries", commentaryKeys.join(","));
  } else {
    qp.set("commentaries", "none");
  }
  const q = qp.toString();
  window.history.replaceState({}, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}

/** Parse commentary selection from URL / storage: null = all, [] = none, string[] = subset */
export function commentaryKeysFromInput(keys) {
  if (keys === null || keys === undefined) return null;
  if (Array.isArray(keys)) return keys.length ? new Set(keys) : new Set();
  return null;
}

export function commentaryKeysToArray(visibleKeys) {
  if (visibleKeys === null) return null;
  return [...visibleKeys];
}

/** @typedef {{ voiceEn?: string | null, voiceHe?: string | null }} TtsPrefs */

export const TTS_PREFS_KEY = "oc_tts_prefs_v1";

/** @returns {TtsPrefs} */
export function loadTtsPrefs() {
  try {
    const raw = localStorage.getItem(TTS_PREFS_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    if (!o || o.v !== 1) return {};
    const out = {};
    if (typeof o.voiceEn === "string") out.voiceEn = o.voiceEn;
    else if (o.voiceEn === null) out.voiceEn = null;
    if (typeof o.voiceHe === "string") out.voiceHe = o.voiceHe;
    else if (o.voiceHe === null) out.voiceHe = null;
    return out;
  } catch {
    return {};
  }
}

/** @param {TtsPrefs} prefs */
export function saveTtsPrefs(prefs) {
  try {
    localStorage.setItem(
      TTS_PREFS_KEY,
      JSON.stringify({
        v: 1,
        voiceEn: prefs.voiceEn ?? null,
        voiceHe: prefs.voiceHe ?? null,
        at: Date.now(),
      })
    );
  } catch {
    /* quota */
  }
}
