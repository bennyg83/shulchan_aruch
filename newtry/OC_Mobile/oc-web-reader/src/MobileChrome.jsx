import { useEffect, useRef, useState } from "react";

function Toggle({ on, onClick, children }) {
  return (
    <button type="button" className={`toggle ${on ? "toggle--on" : ""}`} onClick={onClick} aria-pressed={on}>
      {children}
    </button>
  );
}

function CommentaryFilter({
  commentators,
  commentaryVisibleKeys,
  commentarySummary,
  commentaryFilterExpanded,
  setCommentaryFilterExpanded,
  selectionIsSubset,
  onChipClick,
  onShowAll,
  isChipActive,
}) {
  if (!commentators.length) return null;

  return (
    <div className={`filter-bar filter-bar--collapsible ${commentaryFilterExpanded ? "filter-bar--expanded" : ""}`}>
      <button
        type="button"
        className="filter-bar__toggle"
        onClick={() => setCommentaryFilterExpanded((v) => !v)}
        aria-expanded={commentaryFilterExpanded}
      >
        <span className="filter-bar__label">Commentaries</span>
        <span className="filter-bar__summary">{commentarySummary}</span>
        <span className="filter-bar__chevron" aria-hidden="true">
          {commentaryFilterExpanded ? "▲" : "▼"}
        </span>
      </button>
      {commentaryFilterExpanded && (
        <div className="filter-bar__chips">
          {selectionIsSubset && (
            <button
              type="button"
              className="filter-chip filter-chip--all"
              onClick={(e) => {
                e.stopPropagation();
                onShowAll();
              }}
            >
              Show all
            </button>
          )}
          {commentators.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`filter-chip ${isChipActive(commentaryVisibleKeys, c.key) ? "filter-chip--on" : ""}`}
              style={{ "--chip-color": c.color }}
              onClick={(e) => {
                e.stopPropagation();
                onChipClick(c.key);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Collapsible sticky header for mobile: mini-bar + expandable nav chrome.
 */
export default function MobileChrome({
  expanded,
  onExpandedChange,
  activeEntry,
  simanGem,
  seifGem,
  currentSeif,
  onOpenSimanPicker,
  onOpenSeifPicker,
  onOpenSettings,
  showHebrew,
  showEnglish,
  onToggleHebrew,
  onToggleEnglish,
  theme,
  onToggleTheme,
  commentators,
  commentaryVisibleKeys,
  commentarySummary,
  commentaryFilterExpanded,
  setCommentaryFilterExpanded,
  selectionIsSubset,
  onCommentaryChipClick,
  onShowAllCommentaries,
  isChipActive,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [menuOpen]);

  const title = activeEntry?.title || `Siman ${activeEntry?.siman}`;
  const locationLine = `Siman ${activeEntry?.siman}${simanGem ? ` ${simanGem}` : ""} · Seif ${currentSeif}${seifGem ? ` ${seifGem}` : ""}`;

  return (
    <header className={`mobile-chrome ${expanded ? "mobile-chrome--expanded" : ""}`}>
      <div className="mobile-chrome__mini">
        <button
          type="button"
          className="mobile-chrome__location"
          onClick={() => onExpandedChange(true)}
          title={title}
        >
          <span className="mobile-chrome__location-text">{locationLine}</span>
          <span className="mobile-chrome__location-sub" dir="auto">
            {title}
          </span>
        </button>

        <div className="mobile-chrome__mini-actions" ref={menuRef}>
          <button
            type="button"
            className="mobile-chrome__icon-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="More options"
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="mobile-chrome__menu">
              <Toggle on={showHebrew} onClick={onToggleHebrew}>
                א Hebrew
              </Toggle>
              <Toggle on={showEnglish} onClick={onToggleEnglish}>
                A English
              </Toggle>
              <button type="button" className="mobile-chrome__menu-item" onClick={onToggleTheme}>
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>
              <button
                type="button"
                className="mobile-chrome__menu-item"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSettings();
                }}
              >
                ⚙ Settings (TTS voices)
              </button>
              {!expanded && (
                <button
                  type="button"
                  className="mobile-chrome__menu-item"
                  onClick={() => {
                    setMenuOpen(false);
                    onExpandedChange(true);
                  }}
                >
                  Show navigation
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            className="mobile-chrome__icon-btn"
            onClick={() => onExpandedChange(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mobile-chrome__expanded">
          <div className="mobile-chrome__pickers">
            <button type="button" className="nav-picker-btn" onClick={onOpenSimanPicker}>
              <span className="nav-picker-btn__label">Siman</span>
              <span className="nav-picker-btn__value">
                {activeEntry.siman}
                {simanGem ? (
                  <span dir="rtl" lang="he">
                    {" "}
                    {simanGem}
                  </span>
                ) : null}
              </span>
              <span className="nav-picker-btn__chevron" aria-hidden="true">
                ▼
              </span>
            </button>
            <button type="button" className="nav-picker-btn" onClick={onOpenSeifPicker}>
              <span className="nav-picker-btn__label">Seif</span>
              <span className="nav-picker-btn__value">
                {currentSeif}
                {seifGem ? (
                  <span dir="rtl" lang="he">
                    {" "}
                    {seifGem}
                  </span>
                ) : null}
              </span>
              <span className="nav-picker-btn__chevron" aria-hidden="true">
                ▼
              </span>
            </button>
          </div>

          <CommentaryFilter
            commentators={commentators}
            commentaryVisibleKeys={commentaryVisibleKeys}
            commentarySummary={commentarySummary}
            commentaryFilterExpanded={commentaryFilterExpanded}
            setCommentaryFilterExpanded={setCommentaryFilterExpanded}
            selectionIsSubset={selectionIsSubset}
            onChipClick={onCommentaryChipClick}
            onShowAll={onShowAllCommentaries}
            isChipActive={isChipActive}
          />

          <button type="button" className="mobile-chrome__collapse-btn" onClick={() => onExpandedChange(false)}>
            ▲ Hide navigation — focus on text
          </button>
        </div>
      )}
    </header>
  );
}
