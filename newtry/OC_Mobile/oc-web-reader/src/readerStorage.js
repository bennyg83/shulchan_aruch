/** Web reader resume (separate key from mobile so positions do not overwrite each other). */
export const READER_RESUME_KEY = "oc_web_reader_resume_v1";

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

export function saveReaderResume({ corpusPath, siman, seif }) {
  try {
    localStorage.setItem(
      READER_RESUME_KEY,
      JSON.stringify({ v: 1, corpusPath, siman, seif, at: Date.now() })
    );
  } catch {
    /* quota */
  }
}

export function parseReaderUrl() {
  const qp = new URLSearchParams(window.location.search);
  const siman = qp.get("siman");
  const seif = qp.get("seif");
  return {
    siman: siman != null && siman !== "" ? Number(siman) : null,
    seif: seif != null && seif !== "" ? Number(seif) : null,
  };
}

export function replaceReaderUrl({ siman, seif }) {
  const qp = new URLSearchParams(window.location.search);
  qp.set("siman", String(siman));
  qp.set("seif", String(seif));
  const q = qp.toString();
  window.history.replaceState({}, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}
