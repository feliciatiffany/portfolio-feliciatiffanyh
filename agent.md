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
| `/` | `src/pages/Home.jsx` | Round profile photo + "Hi, I'm Fany!" intro + 3 text links (What I've done, Digital garden, About me), circled by a rotating 3D "Saturn ring" of project images |
| `/about` | `src/pages/About.jsx` | Resume (data from `src/lib/resume.js`) |
| `/nutshell` | `src/pages/Nutshell.jsx` | "Digital garden": Notion-style note — what I love / think / fear (edit `SECTIONS`) |
| `/built` | `src/pages/Built.jsx` | "What I've done - A Timeline": center line, cards alternate sides (masonry rows), category toggles, sticky year jumps, cards slide in on scroll |
| `/tech`, `/digital`, `/graphic`, `/others` | `src/pages/*Designer.jsx`, `Others.jsx` | Project lists per discipline |
| `/work/:slug` | `src/pages/Project.jsx` → `src/components/ProjectTemplate.jsx` | Project page: centered title, hero (first `media` item), Date / Stacks / Category row, intro + pull quote, then `sections`, in a ~640px column |

`src/App.jsx` holds the layout. `/`, `/built` and `/nutshell` use the centered layout (`page-grid--center`); `/work/*` uses the full-width project layout; everything else uses the logo-left grid. The corner logo is hidden on `/`, `/built` and `/work/*` (those pages place the logo themselves).

## Visual style — keep it
- **White background**, black ink. Titles, names, links and labels use monospace **Source Code Pro**; small text, captions, dates, descriptions, footer and project body copy use **Montserrat** via `var(--font-caption)`. Both load from Google Fonts in `index.html`.
- Palette lives in `:root` in `src/style/style.css`: `--salmon`, `--cream`, `--peach`, `--mauve`, `--maroon`, `--teal` plus translucent `--band-*` versions for hover highlights. Use these variables. Don't add new hex colors.
- Interactions are playful but subtle: words grow on hover (`.grow-band`), a soft blink hint (`softHint`), letter-spacing stretch on titles. Always add a `prefers-reduced-motion` fallback for new animation.
- Timeline category colors (`style.css`, "WHAT I'VE DONE" section): Projects = salmon, Creative Side = mauve, Organization = maroon, Work = teal, Milestone = ink, Awards = peach.
- **Anything that opens a page gets the `shine` class** (`style.css`): a soft cream/peach glow behind it, a light sweep, and its `img`/`video` scales up on hover. Use it on new clickable cards/images.

## Content: where to edit
- **Projects** (list data): `src/data/{tech,digital,graphic,others}.json`, with fields `slug`, `title`, `category`, `num` (year), `label`, `media[]`.
- **Project detail pages**: `src/projects/<category>/<slug>.js` (default export with `slug`, `meta`, `intro`, `sections`). Picked up automatically by `import.meta.glob`.
- **Resume** (education, experience, skills, awards): `src/lib/resume.js`.
- **Timeline**: `src/lib/timeline.js`.
  - Projects are a curated `PROJECTS` list: `{ slug, date, highlight, media? }`. `highlight: true` → **Projects** (big card with image + description); otherwise → **Creative Side** (small round thumbnail, title + date). A project not in this list is not on the timeline. `date` is the shown text ("Sept – Dec 2024") and also sets the order and the Date on the project page (`projectDate(slug)`).
  - Experience becomes **Work**, except titles starting with one of `ORG_PREFIXES`, which become **Organization**.
  - `awards` (resume) + `EXTRA_AWARDS` become **Awards**. Add **Milestones** in `MILESTONES`.
  - Entries whose date contains "Present" go under **Today**. Set `TODAY_NOTE` and per-year `YEAR_NOTES` taglines there.
- **Project writing**: first person, casual and honest, in Fany's voice ("didn't win but learned a lot about team handling"). Each project file has a `quote` (short line, no quote marks) shown as the big pull quote “…” - me under the intro. Split intro paragraphs with a blank line (`\n\n`).
- **Home ring images**: the `RING` array in `src/pages/Home.jsx` (`src`, `to` project link, `cutout` for transparent PNGs, `small` for the logo). Ring copies live in `public/media/home/` (≤600px). Back of the ring = bigger, front = smaller; it pauses while an image is hovered. Cutouts were made with macOS Vision subject lifting (`VNGenerateForegroundInstanceMaskRequest`); Preview/Photos "Copy Subject" gives the same result.
- **Media**: `public/media/...`, referenced as `/media/...`. Paths are **case-sensitive** on GitHub Pages. For example, the profile photo is `/media/profileimage.JPEG`.

## Conventions
- Function components, small local helpers, no state libraries.
- Comment density is light. Use a short header comment per file (`// src/pages/X.jsx`) and section banners in CSS (`/* ===== … ===== */`).
- Append new CSS to the matching file (`style.css` for layout/home/timeline, `resumeStyle.css` for About, `projectStyle.css` for project pages). Use `clamp()` for responsive sizing like the rest of the file.
- Check new pages at desktop (≥1280px) and mobile (375px). Reading pages (timeline, nutshell, project bodies) stay in a ~680–720px centered column, and two-column rows stack inside it.
- Videos used as thumbnails must be `muted loop autoPlay playsInline`.
