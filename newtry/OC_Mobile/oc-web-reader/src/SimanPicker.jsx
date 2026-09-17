import { useEffect, useMemo, useState } from "react";
import { formatGematria } from "./lib/gematria.js";
import {
  catalogEntryMatchesQuery,
  simanIndexLines,
  SIMAN_SEARCH_PLACEHOLDER,
} from "./lib/catalogSearch.js";

function SimanPickerRowMeta({ entry }) {
  const lines = simanIndexLines(entry);
  return (
    <span className="picker-sheet__meta">
      <span
        className={`picker-sheet__item-title${lines.he ? " picker-sheet__item-title--he" : ""}`}
        dir={lines.he ? "rtl" : undefined}
        lang={lines.he ? "he" : undefined}
      >
        {lines.primary}
      </span>
      {lines.secondary ? <span className="picker-sheet__item-sub">{lines.secondary}</span> : null}
      {entry.comment ? <span className="picker-sheet__item-sub">{entry.comment}</span> : null}
    </span>
  );
}

/**
 * Full-screen siman picker for mobile / narrow viewports.
 * Searchable list of all simanim — replaces the cramped sidebar list.
 */
export default function SimanPicker({
  open,
  onClose,
  catalog,
  activeEntry,
  onSelectSiman,
  onPrevSiman,
  onNextSiman,
}) {
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
    if (!query.trim()) return catalog;
    return catalog.filter((e) => catalogEntryMatchesQuery(e, query));
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
        <div className="picker-sheet__step-nav">
          <button type="button" className="btn btn--ghost" disabled={!onPrevSiman} onClick={onPrevSiman}>
            ← Prev
          </button>
          <button type="button" className="btn btn--ghost" disabled={!onNextSiman} onClick={onNextSiman}>
            Next →
          </button>
        </div>
        <input
          type="search"
          className="picker-sheet__search"
          placeholder={SIMAN_SEARCH_PLACEHOLDER}
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
              <SimanPickerRowMeta entry={e} />
            </button>
          ))}
          {!filtered.length ? <p className="picker-sheet__empty">No simanim match your search.</p> : null}
        </nav>
      </div>
    </div>
  );
}
