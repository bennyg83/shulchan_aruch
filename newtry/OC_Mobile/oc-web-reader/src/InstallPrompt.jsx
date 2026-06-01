import { useState, useEffect, useRef } from "react";

/**
 * Install / offline-save UI.
 *
 * Renders two things:
 *   1. A floating top banner the first time a mobile user visits
 *      (auto-dismissed after they act or close it).
 *   2. A small persistent "Install" chip in the toolbar (passed via
 *      the `renderChip` render-prop) so users can always find it.
 *
 * Strategy:
 *   - Chrome/Android: capture beforeinstallprompt → native install dialog.
 *   - iOS Safari: no event — show Share → Add to Home Screen instructions.
 *   - If already running in standalone (installed): hide everything.
 */

function isStandalone() {
  try {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  } catch {
    return false;
  }
}

function detectPlatform() {
  const ua = navigator.userAgent || "";
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isMobile = isIos || isAndroid;
  return { isIos, isAndroid, isMobile };
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState(null); // null until mounted
  const [installed, setInstalled] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try {
      // v2: reset any old dismiss so the banner re-appears after the PWA update
      if (localStorage.getItem("oc_install_dismissed_v") !== "2") {
        localStorage.removeItem("oc_install_dismissed");
        localStorage.setItem("oc_install_dismissed_v", "2");
      }
      return !!localStorage.getItem("oc_install_dismissed");
    } catch { return false; }
  });

  useEffect(() => {
    if (isStandalone()) { setInstalled(true); return; }
    setPlatform(detectPlatform());

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const dismissBanner = () => {
    setBannerDismissed(true);
    try { localStorage.setItem("oc_install_dismissed", "1"); } catch { /* ignore */ }
  };

  const triggerInstall = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      dismissBanner();
    }
    setDeferredPrompt(null);
    return outcome === "accepted";
  };

  return {
    platform,
    installed,
    deferredPrompt,
    bannerDismissed,
    dismissBanner,
    triggerInstall,
  };
}

/** Floating banner — shown once until dismissed. */
export function InstallBanner({ platform, installed, deferredPrompt, bannerDismissed, dismissBanner, triggerInstall }) {
  if (!platform?.isMobile) return null;
  if (installed) return null;
  if (bannerDismissed) return null;
  // On Android wait for the prompt event; on iOS show immediately
  if (!platform.isIos && !deferredPrompt) return null;

  return (
    <div style={{
      position: "fixed",
      top: 12,
      left: 12,
      right: 12,
      zIndex: 9100,
      maxWidth: 480,
      margin: "0 auto",
      background: "#0e1120",
      border: "1px solid #3a4a7a",
      borderRadius: 12,
      padding: "14px 16px",
      boxShadow: "0 6px 32px rgba(0,0,0,0.65)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#e8eaf0",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>📖</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Save for offline reading
          </div>
          {platform.isIos ? (
            <div style={{ fontSize: 13, color: "#9ba3c4", lineHeight: 1.55 }}>
              Tap <strong style={{ color: "#e8eaf0" }}>Share ↑</strong> then{" "}
              <strong style={{ color: "#e8eaf0" }}>Add to Home Screen</strong> — all 697 simanim
              available offline, no internet needed.
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, color: "#9ba3c4", lineHeight: 1.55 }}>
                Install the app — all 697 simanim of Orach Chayim available offline.
              </div>
              <button onClick={triggerInstall} style={{
                marginTop: 10, padding: "8px 18px", borderRadius: 8,
                border: "none", background: "#4a80c4", color: "#fff",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>
                Download for offline
              </button>
            </>
          )}
        </div>
        <button onClick={dismissBanner} aria-label="Dismiss" style={{
          background: "none", border: "none", color: "#9ba3c4",
          fontSize: 22, lineHeight: 1, cursor: "pointer", padding: 0, flexShrink: 0,
        }}>×</button>
      </div>
    </div>
  );
}

/** Small chip + inline instruction popover — always visible on mobile until installed. */
export function InstallChip({ platform, installed, deferredPrompt, triggerInstall }) {
  const [showGuide, setShowGuide] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!showGuide) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowGuide(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [showGuide]);

  if (!platform?.isMobile) return null;
  if (installed) return null;

  const handleClick = () => {
    if (deferredPrompt) {
      triggerInstall();
    } else {
      setShowGuide((v) => !v);
    }
  };

  const isIos = platform.isIos;

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={handleClick} className="install-chip" title="Save app for offline use">
        ⬇ {isIos ? "Add to Home Screen" : "Install app"}
      </button>

      {showGuide && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9200,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 80,
          background: "rgba(0,0,0,0.55)",
        }}
          onClick={() => setShowGuide(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0e1120",
              border: "1px solid #3a4a7a",
              borderRadius: 14,
              padding: "20px 22px",
              maxWidth: 340,
              margin: "0 16px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#e8eaf0",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
              📲 Install for offline use
            </div>

            {isIos ? (
              <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14, color: "#c8ccde" }}>
                <li>Tap the <strong style={{ color: "#e8eaf0" }}>Share</strong> button <strong style={{ color: "#e8eaf0" }}>⎋</strong> at the bottom of Safari</li>
                <li>Scroll down and tap <strong style={{ color: "#e8eaf0" }}>Add to Home Screen</strong></li>
                <li>Tap <strong style={{ color: "#e8eaf0" }}>Add</strong> — the app installs with all 697 simanim available offline</li>
              </ol>
            ) : (
              <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14, color: "#c8ccde" }}>
                <li>Tap the <strong style={{ color: "#e8eaf0" }}>⋮ menu</strong> in Chrome (top-right corner)</li>
                <li>Tap <strong style={{ color: "#e8eaf0" }}>Add to Home Screen</strong></li>
                <li>Tap <strong style={{ color: "#e8eaf0" }}>Install</strong> — this installs the full app with all 697 simanim available offline</li>
              </ol>
            )}

            <div style={{ marginTop: 14, fontSize: 12, color: "#7a84a8", lineHeight: 1.5 }}>
              "Add to Home Screen" in Chrome installs the full offline app — not just a bookmark.
            </div>

            <button
              onClick={() => setShowGuide(false)}
              style={{
                marginTop: 16, width: "100%", padding: "10px",
                borderRadius: 8, border: "none",
                background: "#2a3a6a", color: "#e8eaf0",
                fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
