# agent.md — Felicia Hertada Portfolio

Guide for AI coding agents (and humans) working in this repo.

## Stack
- **Vite 5 + React 18 + react-router-dom 6**, plain CSS (no Tailwind, no CSS-in-JS).
- Deployed to **GitHub Pages** via `npm run deploy` (`gh-pages -d dist`), custom domain in `public/CNAME`.
- SPA deep links on GitHub Pages work through `public/404.html` → `index.html?redirect=…` (script in `index.html`). Don't remove either.

## Commands
```bash
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build into dist/
npm run deploy    # build + publish dist/ to gh-pages
```

## Site map
| Route | File | What it is |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Centered home: round profile photo, "Hi, I'm Felicia Hertada", three image links |
| `/about` | `src/pages/About.jsx` | Resume (data from `src/lib/resume.js`) |
| `/nutshell` | `src/pages/Nutshell.jsx` | Notion-style note: what I love / think / fear (edit `SECTIONS`) |
| `/built` | `src/pages/Built.jsx` | Compact "Things I Built" timeline with sticky category filters and year jump links |
| `/tech`, `/digital`, `/graphic`, `/others` | `src/pages/*Designer.jsx`, `Others.jsx` | Project lists per discipline |
| `/work/:slug` | `src/pages/Project.jsx` → `src/components/ProjectTemplate.jsx` | Project detail page; the body is a centered ~720px Notion-style column |

`src/App.jsx` holds the layout. `/`, `/built` and `/nutshell` use the centered layout (`page-grid--center`); `/work/*` uses the full-width project layout; everything else uses the logo-left grid.

## Visual style — keep it
- **White background**, black ink, monospace **Source Code Pro**.
- Palette lives in `:root` in `src/style/style.css`: `--salmon`, `--cream`, `--peach`, `--mauve`, `--maroon`, `--teal` plus translucent `--band-*` versions for hover highlights. Use these variables. Don't add new hex colors.
- Interactions are playful but subtle: words grow on hover (`.grow-band`), a soft blink hint (`softHint`), letter-spacing stretch on titles. Always add a `prefers-reduced-motion` fallback for new animation.
- Timeline category colors (`style.css`, "THINGS I BUILT" section): Work = teal, Projects = salmon, Organization = maroon, Art Piece = mauve, Awards = peach, Milestones = ink.

## Content: where to edit
- **Projects** (list data): `src/data/{tech,digital,graphic,others}.json`, with fields `slug`, `title`, `category`, `num` (year), `label`, `media[]`.
- **Project detail pages**: `src/projects/<category>/<slug>.js` (default export with `slug`, `meta`, `intro`, `sections`). Picked up automatically by `import.meta.glob`.
- **Resume** (education, experience, skills, awards): `src/lib/resume.js`.
- **Timeline**: `src/lib/timeline.js` builds entries automatically from the project JSON and the resume:
  - Projects become **Projects**, except slugs listed in `ART_SLUGS`, which become **Art Piece**.
  - Experience becomes **Work**, except titles starting with one of `ORG_PREFIXES`, which become **Organization**.
  - `awards` become **Awards**. Add more **Milestones** in the `MILESTONES` array.
  - Entries whose date contains "Present" go under **Today**. Set `TODAY_NOTE` and the per-year `YEAR_NOTES` taglines there.
  - Card descriptions come from each project's `intro` (trimmed), or from the first achievement for resume items.
- **Home image links**: the `DOORS` array in `src/pages/Home.jsx`.
- **Media**: `public/media/...`, referenced as `/media/...`. Paths are **case-sensitive** on GitHub Pages. For example, the profile photo is `/media/profileimage.JPEG`.

## Conventions
- Function components, small local helpers, no state libraries.
- Comment density is light. Use a short header comment per file (`// src/pages/X.jsx`) and section banners in CSS (`/* ===== … ===== */`).
- Append new CSS to the matching file (`style.css` for layout/home/timeline, `resumeStyle.css` for About, `projectStyle.css` for project pages). Use `clamp()` for responsive sizing like the rest of the file.
- Check new pages at desktop (≥1280px) and mobile (375px). Reading pages (timeline, nutshell, project bodies) stay in a ~680–720px centered column, and two-column rows stack inside it.
- Videos used as thumbnails must be `muted loop autoPlay playsInline`.
