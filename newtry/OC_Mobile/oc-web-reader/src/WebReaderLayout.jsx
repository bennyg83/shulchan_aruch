import { useMemo, useState } from "react";
import { noteVisibleForLanguages } from "./lib/corpus.js";

function Toggle({ on, onClick, children }) {
  return (
    <button type="button" className={`toggle ${on ? "toggle--on" : ""}`} onClick={onClick} aria-pressed={on}>
      {children}
    </button>
  );
}

function HtmlCol({ html, dir, className }) {
  if (!html?.trim()) return null;
  return (
    <div
      className={className}
      dir={dir}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function BilingualRow({ note, showHebrew, showEnglish }) {
  if (!noteVisibleForLanguages(showHebrew, showEnglish, note)) return null;
  const both = showHebrew && showEnglish;
  return (
    <div className={`bilingual-row ${both ? "bilingual-row--split" : ""}`}>
      {note.label ? <div className="segment-label">{note.label}</div> : null}
      {showHebrew && <HtmlCol html={note.hebrew} dir="rtl" className="col-hebrew" />}
      {showEnglish && <HtmlCol html={note.english} dir="ltr" className="col-english" />}
    </div>
  );
}

function CommentaryPanel({ seifNum, c, notes, showHebrew, showEnglish, open, onToggle }) {
  const visible = (notes || []).filter((n) => noteVisibleForLanguages(showHebrew, showEnglish, n));
  if (!visible.length) return null;
  return (
    <article className="commentary-panel" style={{ "--accent": c.color }}>
      <header className="commentary-panel__head">
        <button type="button" className="commentary-panel__title" onClick={onToggle}>
          <span className="commentary-panel__dot" />
          {c.label}
          <span className="commentary-panel__count">{visible.length}</span>
        </button>
      </header>
      {open && (
        <div className="commentary-panel__body">
          {visible.map((note, i) => (
            <BilingualRow key={i} note={note} showHebrew={showHebrew} showEnglish={showEnglish} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function WebReaderLayout({
  catalog,
  activeEntry,
  onSelectSiman,
  seifim,
  currentSeif,
  onSelectSeif,
  onPrevSeif,
  onNextSeif,
  seifData,
  commentators,
  corpusErr,
}) {
  const [simanQuery, setSimanQuery] = useState("");
  const [showHebrew, setShowHebrew] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("oc_web_theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [hiddenKeys, setHiddenKeys] = useState(() => new Set());
  const [openPanels, setOpenPanels] = useState(() => new Set());

  const filteredCatalog = useMemo(() => {
    const q = simanQuery.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter((e) => {
      const n = String(e.siman);
      const title = (e.title || "").toLowerCase();
      const sub = (e.subtitle || "").toLowerCase();
      return n.includes(q) || title.includes(q) || sub.includes(q);
    });
  }, [catalog, simanQuery]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("oc_web_theme", next);
    } catch {
      /* ignore */
    }
  };

  const toggleCommentary = (key) => {
    setHiddenKeys((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  const togglePanelOpen = (key) => {
    setOpenPanels((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  const visibleCommentators = commentators.filter((c) => !hiddenKeys.has(c.key));
  const mr = seifData?.mechaber_rama;

  return (
    <div className={`web-reader theme-${theme}`} data-theme={theme}>
      <aside className="sidebar sidebar--simanim">
        <div className="sidebar__brand">
          <h1>Orach Chayim</h1>
          <p className="sidebar__sub">Web reader</p>
        </div>
        <input
          type="search"
          className="sidebar__search"
          placeholder="Search siman…"
          value={simanQuery}
          onChange={(e) => setSimanQuery(e.target.value)}
          aria-label="Search simanim"
        />
        <nav className="siman-list" aria-label="Simanim">
          {filteredCatalog.map((e) => (
            <button
              key={e.siman}
              type="button"
              className={`siman-list__item ${e.siman === activeEntry.siman ? "siman-list__item--active" : ""}`}
              onClick={() => onSelectSiman(e)}
            >
              <span className="siman-list__num">{e.siman}</span>
              <span className="siman-list__meta">
                <span className="siman-list__title">{e.title || `Siman ${e.siman}`}</span>
                {e.subtitle ? <span className="siman-list__subtitle">{e.subtitle}</span> : null}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <aside className="sidebar sidebar--seifim">
        <h2 className="sidebar__heading">
          Seifim
          <span className="sidebar__badge">Siman {activeEntry.siman}</span>
        </h2>
        <nav className="seif-list" aria-label="Seifim">
          {seifim.map((n) => (
            <button
              key={n}
              type="button"
              className={`seif-list__item ${n === currentSeif ? "seif-list__item--active" : ""}`}
              onClick={() => onSelectSeif(n)}
            >
              Seif {n}
            </button>
          ))}
        </nav>
      </aside>

      <main className="reader-main">
        <header className="reader-toolbar">
          <div className="reader-toolbar__title">
            <h2>{activeEntry.title || `Siman ${activeEntry.siman}`}</h2>
            {activeEntry.subtitle ? <p>{activeEntry.subtitle}</p> : null}
          </div>
          <div className="reader-toolbar__seif-nav">
            <button type="button" className="btn btn--ghost" disabled={!onPrevSeif} onClick={onPrevSeif}>
              ← Prev seif
            </button>
            <span className="reader-toolbar__seif-label">Seif {currentSeif}</span>
            <button type="button" className="btn btn--ghost" disabled={!onNextSeif} onClick={onNextSeif}>
              Next seif →
            </button>
          </div>
          <div className="reader-toolbar__controls">
            <Toggle on={showHebrew} onClick={() => setShowHebrew((v) => !v)}>
              א Hebrew
            </Toggle>
            <Toggle on={showEnglish} onClick={() => setShowEnglish((v) => !v)}>
              A English
            </Toggle>
            <button type="button" className="btn btn--ghost" onClick={toggleTheme} title="Toggle theme">
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </header>

        {commentators.length > 0 && (
          <div className="filter-bar">
            <span className="filter-bar__label">Commentaries</span>
            {commentators.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`filter-chip ${hiddenKeys.has(c.key) ? "" : "filter-chip--on"}`}
                style={{ "--chip-color": c.color }}
                onClick={() => toggleCommentary(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="reader-scroll">
          {corpusErr && <p className="reader-error">Could not load seif: {corpusErr}</p>}
          {!seifData && !corpusErr && <p className="reader-loading">Loading seif {currentSeif}…</p>}

          {seifData && mr && (
            <section className="mechaber-section">
              <h3 className="section-heading">Mechaber &amp; Rama</h3>
              <div className={`mechaber-grid ${showHebrew && showEnglish ? "mechaber-grid--split" : ""}`}>
                {showHebrew && <HtmlCol html={mr.hebrew} dir="rtl" className="col-hebrew mechaber-he" />}
                {showEnglish && <HtmlCol html={mr.english} dir="ltr" className="col-english mechaber-en" />}
              </div>
            </section>
          )}

          {seifData && visibleCommentators.length > 0 && (
            <section className="commentaries-section">
              <h3 className="section-heading">Commentaries</h3>
              <div className="commentaries-grid">
                {visibleCommentators.map((c) => {
                  const notes = seifData[c.key];
                  const isOpen = !openPanels.has(c.key);
                  return (
                    <CommentaryPanel
                      key={c.key}
                      seifNum={seifData.seif}
                      c={c}
                      notes={notes}
                      showHebrew={showHebrew}
                      showEnglish={showEnglish}
                      open={isOpen}
                      onToggle={() => togglePanelOpen(c.key)}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {seifData && visibleCommentators.length === 0 && commentators.length > 0 && (
            <p className="reader-hint">All commentaries hidden — use the chips above to show them.</p>
          )}
        </div>
      </main>
    </div>
  );
}
