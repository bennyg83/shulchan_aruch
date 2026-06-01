import { useState, useEffect, useRef } from "react";

const TOTAL_BUNDLES = 697;

/** Count how many siman bundle JSONs are in any active cache. */
async function countCachedBundles() {
  if (!("caches" in window)) return 0;
  try {
    const cacheNames = await caches.keys();
    let count = 0;
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      count += keys.filter((r) => r.url.includes("/corpus/oc1/bundles/siman")).length;
    }
    return count;
  } catch {
    return 0;
  }
}

/**
 * Persistent offline-cache progress banner.
 *
 * - Polls the Cache Storage API every 2 s while caching is in progress.
 * - Shows a real progress bar (N / 697 simanim cached).
 * - Stays visible until all 697 bundles are cached, then shows a brief
 *   "Ready for offline use" confirmation before fading out.
 * - If already fully cached on mount, shows nothing.
 */
export default function OfflineStatus() {
  const [cached, setCached] = useState(null);   // null = not yet checked
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const n = await countCachedBundles();
      if (cancelled) return;
      setCached(n);
      if (n >= TOTAL_BUNDLES) {
        setDone(true);
        setVisible(true);
        // Show "ready" banner for 5 s then hide
        timerRef.current = setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, 5000);
      } else if (n > 0) {
        // Actively caching — show progress bar
        setVisible(true);
        timerRef.current = setTimeout(check, 2000);
      } else {
        // Nothing cached yet — wait a bit then check again (SW may just be starting)
        timerRef.current = setTimeout(check, 3000);
      }
    };

    // Also trigger an immediate re-check when the SW signals ready
    const onReady = () => check();
    const onInstalling = () => { setVisible(true); check(); };
    window.addEventListener("pwa-offline-ready", onReady);
    window.addEventListener("pwa-installing", onInstalling);

    // Start polling after a short delay so the SW has time to begin
    timerRef.current = setTimeout(check, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
      window.removeEventListener("pwa-offline-ready", onReady);
      window.removeEventListener("pwa-installing", onInstalling);
    };
  }, []);

  if (!visible || cached === null) return null;

  const pct = Math.min(100, Math.round((cached / TOTAL_BUNDLES) * 100));

  if (done) {
    return (
      <div style={bannerStyle("#0f2a1a", "#1a5a30", "#4ecb7a")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>All {TOTAL_BUNDLES} simanim ready for offline use</span>
      </div>
    );
  }

  return (
    <div style={{ ...bannerStyle("#141a30", "#2a3a6a", "#7c9ef0"), flexDirection: "column", alignItems: "stretch", gap: 8 }}>
      <style>{`@keyframes oc-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%",
          border: "2px solid #7c9ef0", borderTopColor: "transparent",
          animation: "oc-spin 0.8s linear infinite", flexShrink: 0,
        }} />
        <span style={{ flex: 1 }}>
          Saving for offline… {cached}/{TOTAL_BUNDLES} simanim ({pct}%)
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 2, background: "#2a3a6a", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: "#7c9ef0",
          width: `${pct}%`,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

function bannerStyle(bg, border, color) {
  return {
    position: "fixed",
    bottom: 68,   // clear the playback bar
    left: 12,
    right: 12,
    zIndex: 9000,
    maxWidth: 420,
    margin: "0 auto",
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 10,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
    fontSize: 13,
    fontWeight: 600,
    color,
    fontFamily: "system-ui, -apple-system, sans-serif",
    userSelect: "none",
  };
}
