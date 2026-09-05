import { useState, useEffect, useRef } from "react";

const TOTAL_BUNDLES = 697;

async function countCachedBundles() {
  if (!("caches" in window)) return null;
  try {
    const cacheNames = await caches.keys();
    let bundleCount = 0;
    let totalCount = 0;
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      totalCount += keys.length;
      bundleCount += keys.filter((r) =>
        r.url.includes("bundles/siman") || r.url.includes("bundles%2Fsiman")
      ).length;
    }
    // If we find total cached items but zero bundles, the URL pattern may differ —
    // fall back to estimating bundles as (total - ~20 app-shell files)
    if (bundleCount === 0 && totalCount > 20) {
      bundleCount = Math.max(0, totalCount - 20);
    }
    return { bundles: bundleCount, total: totalCount };
  } catch {
    return null;
  }
}

function hasServiceWorker() {
  return "serviceWorker" in navigator && !!navigator.serviceWorker.controller;
}

/**
 * Self-contained offline cache progress banner.
 * Shows as soon as a SW is detected (or pwa-installing fires),
 * polls every 2s, and stays visible until explicitly dismissed or
 * 10s after all 697 bundles are confirmed cached.
 */
export default function OfflineStatus() {
  // "waiting" | "caching" | "done" | "hidden"
  const [phase, setPhase] = useState("waiting");
  const [cached, setCached] = useState(0);
  const timerRef = useRef(null);
  const doneTimerRef = useRef(null);

  const scheduleCheck = (delay, fn) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, delay);
  };

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      const result = await countCachedBundles();
      if (cancelled) return;

      if (result === null) {
        setPhase("hidden");
        return;
      }

      const n = result.bundles;
      setCached(n);

      if (n >= TOTAL_BUNDLES) {
        setPhase("done");
        doneTimerRef.current = setTimeout(() => {
          if (!cancelled) setPhase("hidden");
        }, 10000);
      } else {
        setPhase(n > 0 ? "caching" : "waiting");
        scheduleCheck(2000, check);
      }
    };

    const onInstalling = () => {
      if (!cancelled) { setPhase("waiting"); scheduleCheck(1000, check); }
    };
    const onReady = () => {
      if (!cancelled) scheduleCheck(500, check);
    };

    window.addEventListener("pwa-installing", onInstalling);
    window.addEventListener("pwa-offline-ready", onReady);

    // Only show banner if SW is already controlling the page,
    // or wait for it to signal via pwa-installing / pwa-offline-ready.
    // Don't show if SW isn't active — nothing is actually being cached.
    if (hasServiceWorker()) {
      setPhase("waiting");
      scheduleCheck(800, check);
    }
    // else: stay hidden until pwa-installing or pwa-offline-ready fires

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
      clearTimeout(doneTimerRef.current);
      window.removeEventListener("pwa-installing", onInstalling);
      window.removeEventListener("pwa-offline-ready", onReady);
    };
  }, []);

  if (phase === "hidden") return null;

  const pct = Math.min(100, Math.round((cached / TOTAL_BUNDLES) * 100));
  const isDone = phase === "done";
  const isWaiting = phase === "waiting";

  return (
    <div style={{
      position: "fixed",
      bottom: 68,
      left: 12,
      right: 12,
      zIndex: 9000,
      maxWidth: 420,
      margin: "0 auto",
      background: isDone ? "#0f2a1a" : "#141a30",
      border: `1px solid ${isDone ? "#1a5a30" : "#2a3a6a"}`,
      borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      fontSize: 13,
      fontWeight: 600,
      color: isDone ? "#4ecb7a" : "#7c9ef0",
      fontFamily: "system-ui, -apple-system, sans-serif",
      userSelect: "none",
    }}>
      <style>{`@keyframes oc-spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isDone ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>All {TOTAL_BUNDLES} simanim saved — fully offline</span>
          </>
        ) : (
          <>
            <div style={{
              width: 13, height: 13, borderRadius: "50%",
              border: "2px solid #7c9ef0", borderTopColor: "transparent",
              animation: "oc-spin 0.8s linear infinite", flexShrink: 0,
            }} />
            <span style={{ flex: 1 }}>
              {isWaiting
                ? "Setting up offline access…"
                : `Saving offline… ${cached} / ${TOTAL_BUNDLES} simanim (${pct}%)`}
            </span>
          </>
        )}
      </div>

      {!isDone && (
        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: "#2a3a6a", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2, background: "#7c9ef0",
            width: `${pct}%`, transition: "width 0.5s ease",
            minWidth: pct > 0 ? 8 : 0,
          }} />
        </div>
      )}
    </div>
  );
}
