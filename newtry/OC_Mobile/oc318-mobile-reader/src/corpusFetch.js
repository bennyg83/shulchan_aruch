/**
 * Corpus URLs in catalog are absolute-from-root (e.g. `/corpus/oc1/siman1`).
 * When the app is deployed under a subpath (`vite.config base: '/foo/'`), prefix that base.
 */
export function resolveCorpusFetchUrl(path) {
  const raw = import.meta.env?.BASE_URL ?? "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (raw === "/" || raw === "./") return normalized;
  const prefix = raw.endsWith("/") ? raw.slice(0, -1) : raw;
  return `${prefix}${normalized}`;
}

export async function fetchWithTimeout(url, externalSignal, ms = 60000) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), ms);
  const onExt = () => ctrl.abort();
  if (externalSignal) {
    if (externalSignal.aborted) ctrl.abort();
    else externalSignal.addEventListener("abort", onExt, { once: true });
  }
  try {
    return await fetch(url, { cache: "no-store", signal: ctrl.signal });
  } finally {
    clearTimeout(tid);
    if (externalSignal) externalSignal.removeEventListener("abort", onExt);
  }
}

/** Run async tasks with limited concurrency (stable order). */
export async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    for (;;) {
      const i = next;
      next += 1;
      if (i >= items.length) break;
      results[i] = await fn(items[i], i);
    }
  }
  const n = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}
