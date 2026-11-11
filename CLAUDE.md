# Portfolio — notes for Claude

React 18 + Vite + react-router. Deployed to GitHub Pages with `npm run deploy` (builds first).

## Design system rules

- `tokens/*.json` (W3C Design Tokens format) is the only source of truth for colour, type, spacing, radius, shadow and motion. `npm run tokens` generates `src/style/tokens.css`, `src/lib/tokens.js` and `docs/tokens.md`. Never edit the generated files.
- **Full token reference: `docs/tokens.md`.** Read it before styling anything.
- Never write raw hex, rgb(), named colours, cubic-bezier(), font families, font weights, line heights, px font sizes, px radii or bare px spacing in components. Use `var(--token)` in CSS; use `token("name")` from `src/lib/tokens.js` only where a real value is needed (canvas, WebGL, layout maths).
- Use roles, not base values. Colour base swatches (`--color-coral`, `--color-ink`, …) are off limits outside `tokens/`; use the role that says what it is for (`--accent`, `--foreground`, `--muted-foreground`, `--color-accent-tech`, `--color-glow`, …). Spacing and radius may use scale steps (`--space-4`, `--radius-sm`) when no role fits.
- Text rhythm for any entry (card, post): title → date `--space-title-date`, date → subtitle `--space-date-sub`, subtitle → body `--space-sub-body`; titles use `--leading-title`, body text `--leading-body`.
- Fluid layout is fine: `clamp()`, `em`, `%`, `vw`, `cqw`.
- If nothing fits, add a token to `tokens/*.json` (with a `$description`), run `npm run tokens`, then use it. Don't invent a one-off value.
- `npm run lint:tokens` enforces this (stylelint + `scripts/lint-js-tokens.mjs`); `npm run build` fails on violations. A hook runs it after every edit, so fix what it reports.
- Exceptions: `src/components/GlassSurface.*` is vendored from React Bits and left as published. A genuine one-off needs a `stylelint-disable-next-line` comment that says why (see the iOS 16px input in `CodeSlots.css`).

## Site style

Theme: timeline, lost in history, time passing. Motion should feel like memory resolving (sepia/blur → sharp), never bouncy UI. Images on the homepage never link anywhere and never cover text. No dashed lines. The cursor is a small coral dot with a faint light trail; labelled links show a word beside it (data-cursor).
