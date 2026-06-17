import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import WebReaderLayout from "./WebReaderLayout.jsx";
import {
  useInstallPrompt,
  InstallBanner,
  InstallGuide,
} from "./InstallPrompt.jsx";

/** Count cached siman bundles and total precache entries. */
async function countCached() {
  if (!("caches" in window)) return { bundles: 0, total: 0 };
  try {
    const keys = await caches.keys();
    let bundles = 0, total = 0;
    for (const k of keys) {
      const c = await caches.open(k);
      const reqs = await c.keys();
      for (const r of reqs) {
        total++;
        if (/\/bundles\/siman\d+\.json/.test(r.url)) bundles++;
      }
    }
    return { bundles, total };
  } catch {
    return { bundles: 0, total: 0 };
  }
}

function OfflineBanner({ totalSimanim }) {
  if (import.meta.env.VITE_STANDALONE) return null;
  const [bundles, setBundles] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [swReady, setSwReady] = useState(false);
  const doneTimer = useRef(null);
  const TOTAL = totalSimanim;

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Check SW state
    navigator.serviceWorker.ready.then(() => setSwReady(true));
  }, []);

  useEffect(() => {
    if (!swReady || dismissed) return;
    let alive = true;
    const tick = async () => {
      if (!alive) return;
      const { bundles: b } = await countCached();
      if (!alive) return;
      setBundles(b);
      if (b >= TOTAL) {
        // Auto-dismiss after 4 s
        doneTimer.current = setTimeout(() => setDismissed(true), 4000);
      } else {
        setTimeout(tick, 4000);
      }
    };
    tick();
    return () => {
      alive = false;
      clearTimeout(doneTimer.current);
    };
  }, [swReady, dismissed, TOTAL]);

  if (dismissed || !swReady) return null;
  const pct = Math.min(100, Math.round((bundles / TOTAL) * 100));
  const done = bundles >= TOTAL;

  return (
    <div className={`offline-banner ${done ? "offline-banner--done" : ""}`}>
      {done ? (
        <span>✓ Ready for offline use</span>
      ) : (
        <>
          <span>Saving for offline… {bundles}/{TOTAL}</span>
          <div className="offline-banner__bar">
            <div className="offline-banner__fill" style={{ width: `${pct}%` }} />
          </div>
        </>
      )}
      <button className="offline-banner__close" onClick={() => setDismissed(true)} aria-label="Dismiss">×</button>
    </div>
  );
}
import { loadSeifCorpus, loadSeifCorpusFromBundle } from "./lib/corpus.js";
import { resolveCorpusFetchUrl, fetchWithTimeout } from "./lib/corpusFetch.js";
import {
  loadReaderResume,
  loadReaderPrefs,
  parseReaderUrl,
  replaceReaderUrl,
  saveReaderResume,
  saveReaderPrefs,
  commentaryKeysFromInput,
  commentaryKeysToArray,
} from "./readerStorage.js";
import { VOLUMES, resolveVolumeId, getVolume, bundlePathForVolume } from "./lib/volumes.js";

const pad3 = (n) => String(n).padStart(3, "0");

function pickSeifFromLists(urlSeif, resumeSeif, seifim) {
  if (Number.isFinite(urlSeif) && seifim.includes(urlSeif)) return urlSeif;
  if (Number.isFinite(resumeSeif) && seifim.includes(resumeSeif)) return resumeSeif;
  return seifim[0] ?? 1;
}

function initialCommentarySelection() {
  const url = parseReaderUrl();
  if (url.commentaryKeys !== undefined) return commentaryKeysFromInput(url.commentaryKeys);
  const prefs = loadReaderPrefs();
  if (prefs?.commentaryKeys !== undefined) return commentaryKeysFromInput(prefs.commentaryKeys);
  return null;
}

export default function App() {
  const install = useInstallPrompt();

  const [volumeId, setVolumeId] = useState(() => {
    const url = parseReaderUrl();
    const prefs = loadReaderPrefs();
    return resolveVolumeId(url.volumeId || prefs?.volumeId);
  });
  const volume = useMemo(() => getVolume(volumeId), [volumeId]);
  const catalogUrl = useMemo(() => resolveCorpusFetchUrl(volume.catalogPath), [volume.catalogPath]);

  const [catalog, setCatalog] = useState(null);
  const [catalogErr, setCatalogErr] = useState(null);
  const [activeEntry, setActiveEntry] = useState(null);
  const [seifim, setSeifim] = useState([]);
  const [currentSeif, setCurrentSeif] = useState(null);
  const [seifData, setSeifData] = useState(null);
  const [commentators, setCommentators] = useState([]);
  const [corpusErr, setCorpusErr] = useState(null);
  const [commentaryVisibleKeys, setCommentaryVisibleKeys] = useState(initialCommentarySelection);
  const [simanBundle, setSimanBundle] = useState(null);

const syncUrlAndStorage = useCallback(
    ({ siman, seif, corpusPath, keys, vol }) => {
      const v = vol ?? volumeId;
      replaceReaderUrl({
        volumeId: v,
        siman,
        seif,
        commentaryKeys: commentaryKeysToArray(keys ?? commentaryVisibleKeys),
      });
      saveReaderResume({ corpusPath, siman, seif, volumeId: v });
      const prefs = loadReaderPrefs();
      saveReaderPrefs({
        volumeId: v,
        showHebrew: prefs?.showHebrew !== false,
        showEnglish: prefs?.showEnglish !== false,
        commentaryKeys: commentaryKeysToArray(keys ?? commentaryVisibleKeys),
        theme: prefs?.theme,
      });
    },
    [volumeId, commentaryVisibleKeys]
  );

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    setCatalogErr(null);
    setCatalog(null);
    setActiveEntry(null);
    setSeifim([]);
    setCurrentSeif(null);
    (async () => {
      try {
        const cr = await fetchWithTimeout(catalogUrl, ac.signal, 90000);
        if (!cr.ok) throw new Error(`catalog ${cr.status}`);
        const doc = await cr.json();
        const entries = Array.isArray(doc.simanim) ? doc.simanim : [];
        if (!entries.length) throw new Error("catalog has no simanim");
        if (cancelled) return;
        setCatalog(entries);

        const url = parseReaderUrl();
        const resume = loadReaderResume();
        const entry =
          entries.find((e) => Number(e.siman) === url.siman) ||
          (resume?.corpusPath && resume.volumeId === volumeId
            ? entries.find((e) => e.corpusPath === resume.corpusPath)
            : null) ||
          entries[0];

        // Try siman bundle first — one fetch replaces seif-index + all per-seif files
        let list;
        try {
          const bUrl = resolveCorpusFetchUrl(bundlePathForVolume(volumeId, entry.siman));
          const bRes = await fetchWithTimeout(bUrl, ac.signal, 90000);
          if (bRes.ok) {
            const b = await bRes.json();
            if (Array.isArray(b.seifim) && b.seifim.length) {
              list = b.seifim;
              if (!cancelled) setSimanBundle(b);
            }
          }
        } catch { /* fall back to seif-index below */ }
        if (!list) {
          const idxUrl = resolveCorpusFetchUrl(`${entry.corpusPath}/seif-index.json`);
          const idxRes = await fetchWithTimeout(idxUrl, ac.signal, 90000);
          if (!idxRes.ok) throw new Error(`seif-index ${idxRes.status}`);
          const idxDoc = await idxRes.json();
          list = Array.isArray(idxDoc.seifim) ? idxDoc.seifim : [];
        }
        if (!list.length) throw new Error("seif-index has no seifim");
        if (cancelled) return;

        const initialSeif = pickSeifFromLists(
          url.seif,
          resume?.corpusPath === entry.corpusPath && resume?.volumeId === volumeId ? resume.seif : null,
          list
        );
        setActiveEntry(entry);
        setSeifim(list);
        setCurrentSeif(initialSeif);
        const urlCommentaryKeys = parseReaderUrl().commentaryKeys;
        replaceReaderUrl({
          volumeId,
          siman: entry.siman,
          seif: initialSeif,
          commentaryKeys:
            urlCommentaryKeys !== undefined ? urlCommentaryKeys : commentaryKeysToArray(commentaryVisibleKeys),
        });
        saveReaderResume({ corpusPath: entry.corpusPath, siman: entry.siman, seif: initialSeif, volumeId });
      } catch (e) {
        if (!cancelled && e?.name !== "AbortError") setCatalogErr(String(e.message || e));
      }
    })();
    return () => {
      cancelled = true;
      ac.abort();
    };
    // Commentary filter changes update the URL via onCommentaryVisibleKeysChange — do not reload catalog.
  }, [catalogUrl, volumeId]);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    setCorpusErr(null);
    if (!activeEntry || currentSeif == null) return () => {};

    // Fast path: serve directly from siman bundle (instant, works offline in APK)
    if (simanBundle?.siman === activeEntry.siman) {
      const result = loadSeifCorpusFromBundle(simanBundle, currentSeif);
      if (result) {
        setSeifData(result.seifData);
        setCommentators(result.commentators);
        return () => {};
      }
    }

    setSeifData(null);
    setCommentators([]);
    const simanRoot = resolveCorpusFetchUrl(activeEntry.corpusPath);
    const base = `${simanRoot}/seif-${pad3(currentSeif)}`;
    const manifestUrl = `${base}/translated-sources-manifest.json`;
    fetchWithTimeout(manifestUrl, ac.signal, 90000)
      .then((r) => {
        if (!r.ok) throw new Error("manifest " + r.status);
        return r.json();
      })
      .then(async (doc) => {
        const { seifData: sd, commentators: cm } = await loadSeifCorpus(base, doc, ac.signal);
        if (!cancelled) {
          setSeifData(sd);
          setCommentators(cm);
        }
      })
      .catch((e) => {
        if (!cancelled && e?.name !== "AbortError") setCorpusErr(String(e.message || e));
      });
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [activeEntry, currentSeif, simanBundle]);

  const onCommentaryVisibleKeysChange = useCallback(
    (keys) => {
      setCommentaryVisibleKeys(keys);
      if (!activeEntry || currentSeif == null) return;
      replaceReaderUrl({
        volumeId,
        siman: activeEntry.siman,
        seif: currentSeif,
        commentaryKeys: commentaryKeysToArray(keys),
      });
      const prefs = loadReaderPrefs();
      saveReaderPrefs({
        volumeId,
        showHebrew: prefs?.showHebrew !== false,
        showEnglish: prefs?.showEnglish !== false,
        commentaryKeys: commentaryKeysToArray(keys),
        theme: prefs?.theme,
      });
    },
    [activeEntry, currentSeif, volumeId]
  );

  const goSeif = useCallback(
    (n) => {
      if (!activeEntry || !seifim.includes(n)) return;
      setCurrentSeif(n);
      syncUrlAndStorage({ siman: activeEntry.siman, seif: n, corpusPath: activeEntry.corpusPath });
    },
    [activeEntry, seifim, syncUrlAndStorage]
  );

  const onSelectSiman = useCallback(
    async (entry) => {
      if (!entry?.corpusPath || entry.corpusPath === activeEntry?.corpusPath) return;
      setSeifData(null);
      setCommentators([]);
      setSimanBundle(null);
      try {
        // Try siman bundle first — one fetch instead of seif-index + many seif files
        let list;
        try {
          const bUrl = resolveCorpusFetchUrl(bundlePathForVolume(volumeId, entry.siman));
          const bRes = await fetchWithTimeout(bUrl, undefined, 90000);
          if (bRes.ok) {
            const b = await bRes.json();
            if (Array.isArray(b.seifim) && b.seifim.length) {
              list = b.seifim;
              setSimanBundle(b);
            }
          }
        } catch { /* fall back */ }
        if (!list) {
          const idxUrl = resolveCorpusFetchUrl(`${entry.corpusPath}/seif-index.json`);
          const idxRes = await fetchWithTimeout(idxUrl, undefined, 90000);
          if (!idxRes.ok) throw new Error(`seif-index ${idxRes.status}`);
          const idxDoc = await idxRes.json();
          list = Array.isArray(idxDoc.seifim) ? idxDoc.seifim : [];
        }
        if (!list.length) throw new Error("seif-index has no seifim");
        const resume = loadReaderResume();
        const prefer =
          resume?.corpusPath === entry.corpusPath && resume?.volumeId === volumeId && Number.isFinite(resume.seif) && list.includes(resume.seif)
            ? resume.seif
            : list[0];
        setActiveEntry(entry);
        setSeifim(list);
        setCurrentSeif(prefer);
        syncUrlAndStorage({ siman: entry.siman, seif: prefer, corpusPath: entry.corpusPath });
      } catch (e) {
        setCorpusErr(String(e.message || e));
      }
    },
    [activeEntry, volumeId, syncUrlAndStorage]
  );

  const onSelectVolume = useCallback(
    (nextId) => {
      const next = getVolume(nextId);
      if (!next?.enabled || nextId === volumeId) return;
      setVolumeId(nextId);
      const prefs = loadReaderPrefs();
      saveReaderPrefs({
        volumeId: nextId,
        showHebrew: prefs?.showHebrew !== false,
        showEnglish: prefs?.showEnglish !== false,
        commentaryKeys: prefs?.commentaryKeys ?? commentaryKeysToArray(commentaryVisibleKeys),
        theme: prefs?.theme,
      });
      replaceReaderUrl({
        volumeId: nextId,
        siman: parseReaderUrl().siman || 1,
        seif: parseReaderUrl().seif || 1,
        commentaryKeys: commentaryKeysToArray(commentaryVisibleKeys),
      });
    },
    [volumeId, commentaryVisibleKeys]
  );

  if (catalogErr) {
    return (
      <div className="boot-screen">
        <h1>{volume.label} — Web Reader</h1>
        <p className="boot-error">{catalogErr}</p>
        <p className="boot-hint">
          Corpus: <code>{volume.catalogPath}</code>. Run <code>npm run dev</code> from <code>oc-web-reader</code> and publish
          simanim into <code>oc318-mobile-reader/public{volume.catalogPath}</code>.
        </p>
      </div>
    );
  }

  if (!catalog?.length || !activeEntry || currentSeif == null) {
    return (
      <div className="boot-screen">
        <p style={{ fontSize: 18, margin: 0 }}>Loading {volume.short} catalog…</p>
        <p style={{ fontSize: 14, color: "#5c564e", marginTop: 12 }}>
          Fetching <code>{volume.catalogPath}</code>
        </p>
      </div>
    );
  }

  const idx = seifim.indexOf(currentSeif);
  const prevSeif = idx > 0 ? seifim[idx - 1] : null;
  const nextSeif = idx >= 0 && idx < seifim.length - 1 ? seifim[idx + 1] : null;

  return (
    <>
    <OfflineBanner totalSimanim={VOLUMES.filter((v) => v.enabled).reduce((n, v) => n + (v.simanCount || 0), 0)} />
    <InstallBanner
      platform={install.platform}
      installed={install.installed}
      deferredPrompt={install.deferredPrompt}
      bannerDismissed={install.bannerDismissed}
      dismissBanner={install.dismissBanner}
      triggerInstall={install.triggerInstall}
      openGuide={install.openGuide}
    />
    <InstallGuide
      open={install.guideOpen}
      onClose={install.closeGuide}
      platform={install.platform}
      deferredPrompt={install.deferredPrompt}
      triggerInstall={install.triggerInstall}
    />
    <WebReaderLayout
      volumes={VOLUMES}
      volume={volume}
      onSelectVolume={onSelectVolume}
      catalog={catalog}
      activeEntry={activeEntry}
      onSelectSiman={onSelectSiman}
      seifim={seifim}
      currentSeif={currentSeif}
      onSelectSeif={goSeif}
      onPrevSeif={prevSeif ? () => goSeif(prevSeif) : null}
      onNextSeif={nextSeif ? () => goSeif(nextSeif) : null}
      seifData={seifData}
      commentators={commentators}
      corpusErr={corpusErr}
      commentaryVisibleKeys={commentaryVisibleKeys}
      onCommentaryVisibleKeysChange={onCommentaryVisibleKeysChange}
      install={install}
    />
    </>
  );
}
