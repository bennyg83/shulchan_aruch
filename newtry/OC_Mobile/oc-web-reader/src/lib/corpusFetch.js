/** Shared with oc318-mobile-reader — keep in sync when corpus loading changes. */
export function resolveCorpusFetchUrl(path) {
  const raw = import.meta.env?.BASE_URL ?? "/";
  const stripped = path.startsWith("/") ? path.slice(1) : path;
  if (raw === "./") return `./${stripped}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (raw === "/") return normalized;
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
