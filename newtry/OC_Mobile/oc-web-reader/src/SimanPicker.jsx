import { useEffect, useMemo, useState } from "react";
import { formatGematria, numberToGematriaLetters } from "./lib/gematria.js";

/**
 * Full-screen siman picker for mobile / narrow viewports.
 * Searchable list of all simanim — replaces the cramped sidebar list.
 */
export default function SimanPicker({ open, onClose, catalog, activeEntry, onSelectSiman }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog;
    const qBare = q.replace(/\u05F4/g, "").replace(/"/g, "");
    return catalog.filter((e) => {
      const n = String(e.siman);
      const title = (e.title || "").toLowerCase();
      const sub = (e.subtitle || "").toLowerCase();
      const gem = formatGematria(e.siman);
      const gemBare = numberToGematriaLetters(e.siman);
      return (
        n.includes(q) ||
        title.includes(q) ||
        sub.includes(q) ||
        gem.includes(q) ||
        gemBare.includes(qBare)
      );
    });
  }, [catalog, query]);

  if (!open) return null;

  const pick = (entry) => {
    onSelectSiman(entry);
    onClose();
  };

  return (
    <div className="picker-overlay" onClick={onClose} role="presentation">
      <div
        className="picker-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="siman-picker-title"
      >
        <header className="picker-sheet__header">
          <h2 id="siman-picker-title" className="picker-sheet__title">
            Jump to siman
          </h2>
          <button type="button" className="picker-sheet__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <input
          type="search"
          className="picker-sheet__search"
          placeholder="Search siman or גימטריה…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          aria-label="Search simanim"
        />
        <nav className="picker-sheet__list" aria-label="Simanim">
          {filtered.map((e) => (
            <button
              key={e.siman}
              type="button"
              className={`picker-sheet__item ${e.siman === activeEntry?.siman ? "picker-sheet__item--active" : ""}`}
              onClick={() => pick(e)}
            >
              <span className="picker-sheet__num">
                <span className="picker-sheet__num-arabic">{e.siman}</span>
                <span className="picker-sheet__num-gematria" dir="rtl" lang="he">
                  {formatGematria(e.siman)}
                </span>
              </span>
              <span className="picker-sheet__meta">
                <span className="picker-sheet__item-title">{e.title || `Siman ${e.siman}`}</span>
                {e.subtitle ? <span className="picker-sheet__item-sub">{e.subtitle}</span> : null}
              </span>
            </button>
          ))}
          {!filtered.length ? <p className="picker-sheet__empty">No simanim match your search.</p> : null}
        </nav>
      </div>
    </div>
  );
}
