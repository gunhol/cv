# Gunnar Hollander CV

A minimal, responsive CV built with Astro. It uses self-hosted fonts, semantic HTML, native disclosures, and a print-friendly layout.

## Develop

Use Node 26.

```sh
npm install
npm run dev
```

To expose the preview on a specific host or port:

```sh
npm run dev -- --host 0.0.0.0 --port 7100
```

Edit CV content in `src/data/cv.ts`. Page structure and visual styles live in `src/` and `src/styles/global.css`.

## Build and preview

```sh
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Verify

Install Chromium once, build the site, then run the browser checks:

```sh
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install chromium
npm run build
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npm run verify
```

The checks cover 375, 731, 768, 1024, and 1440 px layouts, disclosures, keyboard interaction, navigation, printing, contrast, page weight, console errors, and failed requests. Results and screenshots are written to `.impeccable/review/`.

## Deploy

The workflow in `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on pushes to `main` or a manual workflow run.

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. The custom domain is stored in `public/CNAME`; configure its DNS records with the domain provider before enabling HTTPS.
