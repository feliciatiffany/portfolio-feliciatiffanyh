# Portfolio — notes for Claude

React 18 + Vite + react-router. Deployed to GitHub Pages with `npm run deploy` (builds first).

## Design system rules

- `tokens/*.json` (W3C Design Tokens format) is the only source of truth for colour, type, spacing, radius, shadow and motion. `npm run tokens` generates `src/style/tokens.css`, `src/lib/tokens.js` and `docs/tokens.md`. Never edit the generated files.
- **Full token reference: `docs/tokens.md`.** Read it before styling anything.
- Never write raw hex, rgb(), named colours, cubic-bezier(), font families, font weights, line heights, px font sizes, px radii or bare px spacing in components. Use `var(--token)` in CSS; use `token("name")` from `src/lib/tokens.js` only where a real value is needed (canvas, WebGL, layout maths).
- Use roles, not base values. Colour base swatches (`--color-coral`, `--color-ink`, …) are off limits outside `tokens/`; use the role that says what it is for (`--accent`, `--foreground`, `--muted-foreground`, `--color-accent-tech`, `--color-glow`, …). Spacing and radius may use scale steps (`--space-4`, `--radius-sm`) when no role fits.
- Text rhythm for any entry (card, post): title → date `--space-title-date`, date → subtitle `--space-date-sub`, subtitle → body `--space-sub-body`; titles use `--leading-title`, body text `--leading-body`.
- Case studies (projects with `coverAboveTitle`) use the case type system: `case-h1` small accent label → `case-h2` big statement → `case-h3` sub-headline, `case-column` for column titles, `case-body` for reading text. Sizes and spacing come from `--text-case-*` and `--space-case-*`. Text blocks set it from data: `label` gives h1 + h2, `headline: true` gives h2, a plain `title` gives h3. A thin line is drawn automatically before every `label` (h1); other major sections get one with `className: "proj-divider"`.
- Type scale (one sans site-wide: `-apple-system`/SF Pro, then Inter Variable; mono is Geist Mono Variable; tokens `--text-scale-*`, `--font-weight-*`, `--leading-*`): H1 32–40px phone / 40–56px desktop, weight 700, leading 1.15 · H2 24–28 / 28–36px, 650, 1.25 · H3 18–20 / 20–24px, 600, 1.35 · body 15–16px, 400, 1.55 · buttons/nav 14–15px, 500, 1.1 · captions 12–13px, 400, 1.4. The older names (`--text-page-title`, `--text-body`, `--text-meta`, …) point at this scale; use the scale's roles for anything new.
- Default gap: `--space-frame` (32px). Use it for the space between the photo/intro and the grid lines, between case study images, and as the default gap between blocks unless something says otherwise.
- Fluid layout is fine: `clamp()`, `em`, `%`, `vw`, `cqw`.
- If nothing fits, add a token to `tokens/*.json` (with a `$description`), run `npm run tokens`, then use it. Don't invent a one-off value.
- `npm run lint:tokens` enforces this (stylelint + `scripts/lint-js-tokens.mjs`); `npm run build` fails on violations. A hook runs it after every edit, so fix what it reports.
- Exceptions: `src/components/GlassSurface.*` is vendored from React Bits and left as published. A genuine one-off needs a `stylelint-disable-next-line` comment that says why (see the iOS 16px input in `CodeSlots.css`).

## Site style

Theme: timeline, lost in history, time passing. Motion should feel like memory resolving (sepia/blur → sharp), never bouncy UI. Images on the homepage never link anywhere and never cover text. No dashed lines. The cursor is a plain, flat near-black square block (like Fany bot): no glow, trail or blur; labelled links show a word beside it (data-cursor). No coloured glows on hover either; use the print shadows.

## Fany bot (Lucu)

The block character. Its name is Lucu ("my creator is Fany"); its tag says "Lucu". Homepage: `src/components/BlockBot.jsx` (with the opening). Every other page: `src/components/PageBot.jsx`. Both run on one engine, `src/lib/blockbot.js`; its lines are in `src/lib/botLines.js`. Keep these rules whenever its movement, face or words change.

**How it moves**

- It tips over its own bottom edge, one body-length per quarter turn. It never slides, glides or floats to a spot.
- Movement feels like a game character: hold an arrow and it rolls on at one steady speed with no pause between tips. The first tip from rest winds up a little; a run ends with a small squash. Timing lives in the constants at the top of `blockbot.js` (`TIP_FIRST`, `TIP_RUN`, `AIR`); never drive it from the keyboard's own key repeat.
- Words and pictures are solid. It stands on top of them and bumps into their sides. It can never walk, fall or be left standing inside them.
- It never crowds a wall. It keeps `--space-bot-wall` from the edge of the page (so its turning head never touches the side of the screen) and half its air gap from the side of any word or picture. The only time it comes that close to a wall is on the stairs that take it onto it, or the last small hop before it shoves a card.
- It only falls where there is empty space: off the end of a line of text, off the side of a picture. Once more than half of it hangs over an edge it tips off and drops. A gap barely wider than itself is stepped across, not fallen into.
- Thin lines (the frame's rules, its own stairs) are ledges: it lands on them, and ↓ drops it through. ↓ does nothing on anything solid (the page scrolls as usual).
- Going up: a short hop when the next surface is within about one body height (`HOP_REACH`). Anything higher, it draws stairs, hops up them, and they fold away. No high or floaty jumps.
- Stairs are always one straight flight, rising to the left or to the right. Never a ladder, never a zigzag or a flight that turns back on itself. If it isn't standing where a flight can start, it tips along its floor first. Onto something solid, the flight comes up beside one end and it steps on from there.
- Stairs look for a clear path first. Only when there is none may a flight cross in front of a card (its picture and caption). It never crosses headings or the intro, and never starts or ends inside anything.
- It keeps a little air above whatever it sits on (`--space-bot-gap`), and more above the profile photo, its home on the homepage (`--space-bot-perch`, the same gap the photo keeps to the line under it).
- If it truly cannot reach somewhere by these rules, it blinks out and back in at the spot. It is the last resort, not a shortcut.
- Arrow keys belong to the page first: ← → always move the bot, but ↑ only does once someone has started playing with it (or the page is at the top), and nothing is taken while a text field, the FanyLLM panel or a lightbox is open.

**Where it lives**

- Homepage: on the photo while the photo is on screen, otherwise on the links. The route between them is fixed: across onto the title, right along it and off the end, through the thin line onto the pictures, left along their tops, off into the side rail and down onto the links. Back up is the same in reverse: one long flight from the links to the thin line, landing right of the intro; a short flight onto the end of the title; left along it; a hop onto the photo.
- Every other page: on the stack of links, bottom left. It drops in from the top of the screen.
- If someone moves it and it is still in sight, it stays where they put it.
- The opening, in order: terminal (it waits for the visitor to press Enter or click the key; it never runs on its own) → the build log floods the screen → the log turns to dots that fly together into the block → it wakes, tests its legs and says "Hi! I'm Lucu and my creator is Fany." → the lines draw in and it lands on the line → the photo appears and it says "Oh, there she is." → Fany's intro types itself in from the left with a block caret, and wherever the words reach the bot they shove it along the line (it can't stand in words) → the typed words after "who also" start → it climbs home by its own rules (stairs onto the end of the title, along it, a hop onto the photo). Clicking the profile photo replays it.

**Its face**

- It is a live character, not an icon: it looks at the cursor, glances about, blinks (sometimes twice) and breathes.
- Looking sideways, both eyes slide toward that wall of the box until the leading one almost touches it; they draw closer together and the leading eye narrows. Eyes never leave the face.
- The mouth moves with every letter it says, rounds when it falls, and it squints when it lands or pushes.

**What it says and does**

- The bubble is styled like the bot: a solid near-black square block with paper-coloured words. Text is typed in, then stays long enough to read (`readTime`).
- The name tag and the bubble never lie over the bot itself, whatever its head is doing (turned, leaning back, mid-tip), and the bubble wraps before it would cover a heading or picture beside it.
- Lines come at uneven, unhurried gaps, never on a fixed beat, and are about the page it is on and the thing it is standing on. No line repeats until the others for that spot are used.
- Now and then it does something of its own: walks into a card so the card reacts as it does under the cursor, stomps on a picture, stretches, nods off. A key press or a drag always cuts these short.
- Reduced motion: it sits still, no opening, no antics. Phones: no bot.
