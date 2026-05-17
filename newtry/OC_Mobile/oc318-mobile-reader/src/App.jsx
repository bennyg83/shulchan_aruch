import { useCallback, useEffect, useState } from "react";
import "./index.css";
import ReaderFlow from "./ReaderFlow.jsx";
import { loadSeifCorpus } from "./corpus.js";
import { resolveCorpusFetchUrl, fetchWithTimeout } from "./corpusFetch.js";
import { loadReaderResume, parseReaderUrl, replaceReaderUrl, saveReaderResume } from "./readerStorage.js";

const CATALOG_URL = resolveCorpusFetchUrl("/corpus/oc1/catalog.json");

const pad3 = (n) => String(n).padStart(3, "0");

function pickSeifFromLists(urlSeif, resumeSeif, seifim) {
  if (Number.isFinite(urlSeif) && seifim.includes(urlSeif)) return urlSeif;
  if (Number.isFinite(resumeSeif) && seifim.includes(resumeSeif)) return resumeSeif;
  return seifim[0] ?? 1;
}

export default function App() {
  const [catalog, setCatalog] = useState(null);
  const [catalogErr, setCatalogErr] = useState(null);
  const [activeEntry, setActiveEntry] = useState(null);
  const [seifim, setSeifim] = useState([]);
  const [currentSeif, setCurrentSeif] = useState(null);
  const [seifData, setSeifData] = useState(null);
  const [commentators, setCommentators] = useState([]);
  const [corpusErr, setCorpusErr] = useState(null);

  /** Load catalog + initial siman/seif (URL overrides resume when valid). */
  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    setCatalogErr(null);
    (async () => {
      try {
        const cr = await fetchWithTimeout(CATALOG_URL, ac.signal, 90000);
        if (!cr.ok) throw new Error(`catalog ${cr.status}`);
        const doc = await cr.json();
        const entries = Array.isArray(doc.simanim) ? doc.simanim : [];
        if (!entries.length) throw new Error("catalog has no simanim");
        if (cancelled) return;
        setCatalog(entries);

        const url = parseReaderUrl();
        const resume = loadReaderResume();
        let entry =
          entries.find((e) => Number(e.siman) === url.siman) ||
          (resume?.corpusPath ? entries.find((e) => e.corpusPath === resume.corpusPath) : null) ||
          entries[0];

        const idxUrl = resolveCorpusFetchUrl(`${entry.corpusPath}/seif-index.json`);
        const idxRes = await fetchWithTimeout(idxUrl, ac.signal, 90000);
        if (!idxRes.ok) throw new Error(`seif-index ${idxRes.status}`);
        const idxDoc = await idxRes.json();
        const list = Array.isArray(idxDoc.seifim) ? idxDoc.seifim : [];
        if (!list.length) throw new Error("seif-index has no seifim");
        if (cancelled) return;

        const initialSeif = pickSeifFromLists(url.seif, resume?.corpusPath === entry.corpusPath ? resume.seif : null, list);
        setActiveEntry(entry);
        setSeifim(list);
        setCurrentSeif(initialSeif);
        replaceReaderUrl({ siman: entry.siman, seif: initialSeif });
        saveReaderResume({ corpusPath: entry.corpusPath, siman: entry.siman, seif: initialSeif });
      } catch (e) {
        if (!cancelled && e?.name !== "AbortError") {
          const msg = String(e.message || e);
          setCatalogErr(msg);
        }
      }
    })();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    setCorpusErr(null);
    if (!activeEntry || !currentSeif) return () => {};
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
        if (!cancelled && e?.name !== "AbortError") {
          setCorpusErr(String(e.message || e));
        }
      });
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [activeEntry, currentSeif]);

  const goSeif = useCallback(
    (n) => {
      if (!activeEntry || !seifim.includes(n)) return;
      setCurrentSeif(n);
      replaceReaderUrl({ siman: activeEntry.siman, seif: n });
      saveReaderResume({ corpusPath: activeEntry.corpusPath, siman: activeEntry.siman, seif: n });
    },
    [activeEntry, seifim]
  );

  const onSelectSiman = useCallback(
    async (entry) => {
      if (!entry?.corpusPath || entry.corpusPath === activeEntry?.corpusPath) return;
      setSeifData(null);
      setCommentators([]);
      try {
        const idxUrl = resolveCorpusFetchUrl(`${entry.corpusPath}/seif-index.json`);
        const idxRes = await fetchWithTimeout(idxUrl, undefined, 90000);
        if (!idxRes.ok) throw new Error(`seif-index ${idxRes.status}`);
        const idxDoc = await idxRes.json();
        const list = Array.isArray(idxDoc.seifim) ? idxDoc.seifim : [];
        if (!list.length) throw new Error("seif-index has no seifim");
        const resume = loadReaderResume();
        const prefer =
          resume?.corpusPath === entry.corpusPath && Number.isFinite(resume.seif) && list.includes(resume.seif)
            ? resume.seif
            : list[0];
        setActiveEntry(entry);
        setSeifim(list);
        setCurrentSeif(prefer);
        replaceReaderUrl({ siman: entry.siman, seif: prefer });
        saveReaderResume({ corpusPath: entry.corpusPath, siman: entry.siman, seif: prefer });
      } catch (e) {
        setCorpusErr(String(e.message || e));
      }
    },
    [activeEntry]
  );

  const idx = currentSeif ? seifim.indexOf(currentSeif) : -1;
  const prevSeif = idx > 0 ? seifim[idx - 1] : null;
  const nextSeif = idx >= 0 && idx < seifim.length - 1 ? seifim[idx + 1] : null;

  if (catalogErr) {
    return (
      <div className="boot-screen" style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ color: "#f0a4a4" }}>{catalogErr}</p>
        <p style={{ fontSize: 14, color: "#9ba3c4" }}>
          Add <code>public/corpus/oc1/catalog.json</code> and siman folders under <code>public/corpus/oc1/</code>, then reload.
        </p>
        <p style={{ fontSize: 13, color: "#6b7494", marginTop: 16 }}>
          Use <code>npm run dev</code> from the <code>oc318-mobile-reader</code> folder (not opening <code>dist/index.html</code> as a file).
        </p>
      </div>
    );
  }

  if (!catalog?.length || !activeEntry || currentSeif == null) {
    return (
      <div className="boot-screen">
        <p style={{ fontSize: 16, margin: 0 }}>Loading catalog…</p>
        <p style={{ fontSize: 13, color: "#9ba3c4", marginTop: 12, maxWidth: 420 }}>
          Fetching <code>/corpus/oc1/catalog.json</code> from the dev server. If this never finishes, confirm Vite is running and the file exists under <code>public/corpus/oc1/</code>.
        </p>
      </div>
    );
  }

  return (
    <ReaderFlow
      seifData={seifData}
      commentators={commentators}
      bootErr={corpusErr}
      catalog={catalog}
      activeSimanEntry={activeEntry}
      onSelectSiman={onSelectSiman}
      seifim={seifim}
      onPrev={prevSeif ? () => goSeif(prevSeif) : null}
      onNext={nextSeif ? () => goSeif(nextSeif) : null}
    />
  );
}
