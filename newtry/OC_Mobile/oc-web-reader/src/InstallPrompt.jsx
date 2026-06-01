import { useState, useEffect } from "react";

/**
 * Shows a "Download for offline" banner on mobile when the browser fires
 * the beforeinstallprompt event (Chrome / Edge on Android).
 * On iOS Safari (which doesn't fire the event), shows a manual "Add to
 * Home Screen" tip instead.
 */
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosTip, setShowIosTip] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try { return !!localStorage.getItem("oc_install_dismissed"); } catch { return false; }
  });

  useEffect(() => {
    // Already installed as PWA — hide everything
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const isMobile = isIos || /android/i.test(navigator.userAgent);
    if (!isMobile) return;

    if (isIos) {
      setShowIosTip(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem("oc_install_dismissed", "1"); } catch { /* ignore */ }
  };

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    else setDeferredPrompt(null);
  };

  if (!deferredPrompt && !showIosTip) return null;

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
      border: "1px solid #2e3648",
      borderRadius: 12,
      padding: "14px 16px",
      boxShadow: "0 6px 32px rgba(0,0,0,0.6)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#e8eaf0",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>📖</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Save for offline reading
          </div>
          {showIosTip ? (
            <div style={{ fontSize: 13, color: "#9ba3c4", lineHeight: 1.5 }}>
              Tap <strong style={{ color: "#e8eaf0" }}>Share</strong> then{" "}
              <strong style={{ color: "#e8eaf0" }}>Add to Home Screen</strong> to install the full
              Shulchan Aruch — all 697 simanim available offline.
            </div>
          ) : (
            <div style={{ fontSize: 13, color: "#9ba3c4", lineHeight: 1.5 }}>
              Install to read all 697 simanim of Orach Chayim offline — no internet needed.
            </div>
          )}
          {!showIosTip && (
            <button
              onClick={install}
              style={{
                marginTop: 10,
                padding: "8px 18px",
                borderRadius: 8,
                border: "none",
                background: "#4a80c4",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Download for offline
            </button>
          )}
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            color: "#9ba3c4",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
