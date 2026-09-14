import { useEffect } from "react";

/** Bottom sheet to pick a Shulchan Aruch sefer (volume). */
export default function VolumePicker({ open, onClose, volumes, volume, onSelectVolume }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pick = (id) => {
    if (id !== volume?.id) onSelectVolume(id);
    onClose();
  };

  return (
    <div className="picker-overlay" onClick={onClose} role="presentation">
      <div
        className="picker-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="volume-picker-title"
      >
        <header className="picker-sheet__header">
          <h2 id="volume-picker-title" className="picker-sheet__title">
            Choose sefer
          </h2>
          <button type="button" className="picker-sheet__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <nav className="picker-sheet__list" aria-label="Sefarim">
          {volumes.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`picker-sheet__item ${v.id === volume?.id ? "picker-sheet__item--active" : ""}`}
              disabled={!v.enabled}
              onClick={() => pick(v.id)}
            >
              <span className="picker-sheet__num">
                <span className="picker-sheet__num-arabic">{v.short}</span>
              </span>
              <span className="picker-sheet__meta">
                <span className="picker-sheet__item-title">{v.label}</span>
                <span className="picker-sheet__item-sub">
                  {v.hebrew ? <span dir="rtl" lang="he">{v.hebrew}</span> : null}
                  {v.hebrew ? " · " : ""}
                  {v.enabled ? `${v.simanCount} simanim` : "Coming soon"}
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
