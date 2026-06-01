/** Bottom banner shown while the PWA service worker is caching the corpus. */
export default function OfflineStatus({ status }) {
  if (status === "idle") return null;
  const isInstalling = status === "installing";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 12,
        right: 12,
        zIndex: 9000,
        maxWidth: 420,
        margin: "0 auto",
        background: isInstalling ? "#141a30" : "#0f2a1a",
        border: `1px solid ${isInstalling ? "#2a3a6a" : "#1a5a30"}`,
        borderRadius: 10,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        fontSize: 13,
        fontWeight: 600,
        color: isInstalling ? "#7c9ef0" : "#4ecb7a",
        fontFamily: "system-ui, -apple-system, sans-serif",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <style>{`@keyframes oc-spin { to { transform: rotate(360deg); } }`}</style>
      {isInstalling ? (
        <>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid #7c9ef0",
              borderTopColor: "transparent",
              animation: "oc-spin 0.8s linear infinite",
              flexShrink: 0,
            }}
          />
          <span>Setting up offline access — downloading corpus…</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Ready for offline use</span>
        </>
      )}
    </div>
  );
}
