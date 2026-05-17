# Shulchan Aruch — Orach Chayim (workspace)

Bilingual Orach Chayim translation pipeline (OC001 editorial, Sefaria corpus, mobile + web readers).

## Web reader (GitHub Pages)

After deploy, the site is live at:

**https://bennyg83.github.io/shulchan_aruch/**

Built from `newtry/OC_Mobile/oc-web-reader/` (corpus under `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/`).

### Local dev

```bash
cd newtry/OC_Mobile/oc-web-reader
npm install
npm run dev
```

Open http://localhost:5174/

### Push to GitHub (first time)

From this folder (repository root):

```bash
git init
git add .
git commit -m "Initial commit: OC pipeline and web reader"
git branch -M main
git remote add origin https://github.com/bennyg83/shulchan_aruch.git
git push -u origin main
```

Then in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow `.github/workflows/deploy-gh-pages.yml` runs on each push to `main`.
