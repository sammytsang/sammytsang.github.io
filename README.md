# Sam Tsang — Portfolio

Source for [sammytsang.github.io](https://sammytsang.github.io). React + TypeScript + Vite, Tailwind CSS,
Framer Motion, react-three-fiber/drei for the 3D hero, and Recharts/SVG for the live project demos.

## Stack

- **React 19 + TypeScript + Vite** — component per section, no single giant file (see `src/components/`)
- **Tailwind CSS v4** — dark-mode-first design tokens in `src/index.css`, no `tailwind.config.js` needed
- **Framer Motion** — scroll reveals, layout transitions, the nav's sliding underline, magnetic buttons
- **react-three-fiber + drei** — the hero's real-time inverse-kinematics robot arm
- **Recharts** — the SLAM trajectory viewer
- Three interactive demos embedded directly in their project cards, each lazy-loaded on scroll via
  `IntersectionObserver` (`src/components/common/LazyOnVisible.tsx`) so they never block first paint

## Run it locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Build

```bash
npm run build
```

Type-checks (`tsc -b`) then builds to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run build && npm run deploy
```

`npm run deploy` runs `gh-pages -d dist`, which pushes the contents of `dist/` to a `gh-pages` branch on
the current git remote. One-time setup:

1. Push this repo to GitHub (as `sammytsang.github.io` for a user-page site, or any name for a project page — see **Base path** below).
2. Run `npm run build && npm run deploy` once.
3. In the repo's **Settings → Pages**, set the source to the `gh-pages` branch (GitHub usually detects this automatically after the first `gh-pages` push).
4. The site goes live at the URL GitHub Pages shows you (a few minutes for the first deploy).

Re-run `npm run build && npm run deploy` any time you want to publish changes — no other steps needed.

### Base path

This repo is set up to deploy to **`sammytsang.github.io`** — a GitHub *user* page (repo name ==
`<username>.github.io`), which is served from the domain root. `vite.config.ts` therefore defaults
`base` to `/`.

If you instead deploy this as a *project* page (e.g. `github.com/sammytsang/portfolio`, served at
`sammytsang.github.io/portfolio/`), build with:

```bash
VITE_BASE_PATH=/portfolio/ npm run build
```

or edit the fallback in `vite.config.ts`.

## Project structure

```
src/
  components/
    layout/       Nav, Footer, theme toggle
    hero/          3D hero scene, static SVG fallback, proof-point counters
    projects/      Filterable grid, project card, project detail overlay
    demos/         The three live demos (IK playground, SLAM viewer, pneumatic diagram)
    approach/       "How I work" section
    background/    Education/experience timeline
    skills/         Grouped skills (no invented percentages)
    contact/        Contact links
    common/         Reveal-on-scroll, count-up, scroll progress bar, magnetic hover, lazy-mount wrapper
  data/
    profile.ts     Name, contact info, proof points, approach principles, education, skills
    projects.ts    All 7 real projects — content, figures, images, tags, demo wiring
  hooks/           Theme, reduced-motion, media query, active-section (scrollspy), touch detection
  lib/             IK math (damped least squares + closed-form), SLAM alignment/metrics, shared easing
public/
  cv/              Downloadable CV PDF
  img/             Real project photos (compressed to WebP)
```

## Content policy

Every fact, number, project, employer and date on this site is sourced directly from Sam's CV and
project write-ups — nothing is invented. Where the brief didn't specify something (e.g. an exact
git remote for "view source"), the code says so in a comment rather than guessing silently.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the 3D hero is replaced entirely by a static SVG, scroll reveals
  and count-ups resolve instantly, and demo animations settle to their end state rather than looping.
- The 3D hero only mounts at `≥768px` width and only when motion isn't reduced — on mobile and for
  reduced-motion users it's the same lightweight static SVG, which also means the ~230KB (gzipped)
  three.js/r3f bundle is never fetched on a typical mobile Lighthouse run.
- All images ship as compressed WebP with real alt text and captions; no stock photography.
- Keyboard-navigable throughout: visible focus rings, a skip-to-content link, `Escape`-to-close and
  focus-return on the project detail dialog, `aria-pressed`/`aria-current`/`aria-expanded` where relevant.
