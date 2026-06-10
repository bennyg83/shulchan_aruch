import { useEffect } from "react";
import { formatGematria } from "./lib/gematria.js";

/** Bottom sheet to pick a seif within the current siman. */
export default function SeifPicker({
  open,
  onClose,
  seifim,
  currentSeif,
  onSelectSeif,
  onPrevSeif,
  onNextSeif,
  simanGem,
  simanNum,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pick = (n) => {
    onSelectSeif(n);
    onClose();
  };

  return (
    <div className="picker-overlay" onClick={onClose} role="presentation">
      <div
        className="picker-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="seif-picker-title"
      >
        <header className="picker-sheet__header">
          <h2 id="seif-picker-title" className="picker-sheet__title">
            Jump to seif
            {simanGem ? (
              <span className="picker-sheet__subtitle" dir="rtl" lang="he">
                סימן {simanGem}
              </span>
            ) : (
              <span className="picker-sheet__subtitle">Siman {simanNum}</span>
            )}
          </h2>
          <button type="button" className="picker-sheet__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="picker-sheet__step-nav">
          <button type="button" className="btn btn--ghost" disabled={!onPrevSeif} onClick={onPrevSeif}>
            ← Prev
          </button>
          <button type="button" className="btn btn--ghost" disabled={!onNextSeif} onClick={onNextSeif}>
            Next →
          </button>
        </div>

        <nav className="picker-sheet__grid picker-sheet__grid--seif" aria-label="Seifim">
          {seifim.map((n) => (
            <button
              key={n}
              type="button"
              className={`picker-chip ${n === currentSeif ? "picker-chip--active" : ""}`}
              onClick={() => pick(n)}
            >
              <span className="picker-chip__primary">Seif {n}</span>
              <span className="picker-chip__gem" dir="rtl" lang="he">
                {formatGematria(n)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
