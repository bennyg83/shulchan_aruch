/** localStorage key for resume position (corpus + siman + seif). */
export const READER_RESUME_KEY = "oc318_reader_resume_v1";

/**
 * @returns {{ v: number, corpusPath: string, siman: number, seif: number, at?: number } | null}
 */
export function loadReaderResume() {
  try {
    const raw = localStorage.getItem(READER_RESUME_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || o.v !== 1 || typeof o.corpusPath !== "string" || !Number.isFinite(o.siman) || !Number.isFinite(o.seif)) return null;
    return o;
  } catch {
    return null;
  }
}

/**
 * @param {{ corpusPath: string, siman: number, seif: number }} p
 */
export function saveReaderResume({ corpusPath, siman, seif }) {
  try {
    localStorage.setItem(
      READER_RESUME_KEY,
      JSON.stringify({
        v: 1,
        corpusPath,
        siman,
        seif,
        at: Date.now(),
      })
    );
  } catch {
    /* quota / private mode */
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
