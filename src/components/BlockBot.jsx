// BlockBot — Fany bot on the homepage. The first visit of a session plays the opening:
// a terminal runs "npm run dev", the bot assembles out of scrambling characters, wakes up,
// the lines draw in under it, it tips itself over to the photo's spot, gets "selected" like
// a layer, the intro text appears, the photo fades in and the bot hops up to sit on top of it.
// After that: arrow keys move it (every line of text is a platform), it can be dragged
// anywhere, a tap opens "Ask Fany", and it follows the page when you scroll.
import { useEffect, useRef } from "react";
import { mountBlockBot } from "../lib/blockbot.js";
import { token } from "../lib/tokens.js";
import "./BlockBot.css";

const SEEN = "fanybot-intro";
// also remembered in memory, so moving around the site (or storage being blocked) never replays it
let playedThisLoad = false;
const AGAIN_AFTER = 12 * 60 * 60 * 1000; // a returning visitor sees it again after half a day
const markSeen = () => {
  playedThisLoad = true;
  try {
    sessionStorage.setItem(SEEN, "1");
  } catch {
    /* blocked: the memory flag covers it */
  }
  try {
    localStorage.setItem(SEEN, String(Date.now())); // survives reloads and browsers that reset the session
  } catch {
    /* fine */
  }
};
const seenBefore = () => {
  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN) === "1";
  } catch {
    return true; // storage blocked: we can't remember it, so never risk replaying it
  }
  try {
    const at = Number(localStorage.getItem(SEEN));
    if (at && Date.now() - at < AGAIN_AFTER) seen = true;
  } catch {
    /* fine */
  }
  return seen;
};
const sleep = (t) => new Promise((r) => setTimeout(r, t));

// whether this visit opens with the bot's entrance (first visit of the session, room, motion allowed)
export function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 700px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (playedThisLoad) return false;
  return !seenBefore();
}

export default function BlockBot({ shellRef, avatarRef, heroRef, lines, onStep }) {
  const stepRef = useRef(onStep);
  stepRef.current = onStep;

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !avatarRef.current || !heroRef.current) return;
    const step = (n) => stepRef.current?.(n);

    const narrow = window.matchMedia("(max-width: 700px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (narrow) {
      step(4);
      return; // no room for a character on a phone
    }

    // every line of text on the page is a platform: one per rendered line, at the top of its letters
    // (not the rail's nav: it stays put on screen, and the bot drops past it onto the links)
    const TEXT = ".home-intro, .home-case__caption";
    const TOPS = ".home-case__media"; // the case pictures: it walks along their tops
    const range = document.createRange();
    const platforms = (sTop, sLeft) => {
      const out = [];
      for (const node of shell.querySelectorAll(TEXT)) {
        if (node.closest(".scrambled-text-sr") || getComputedStyle(node).opacity === "0") continue;
        range.selectNodeContents(node);
        // the rects of one line share a top: merge them into one stretch
        const lines = [];
        for (const r of range.getClientRects()) {
          if (r.width < 2 || r.height < 2) continue;
          const l = lines.find((q) => Math.abs(q.top - r.top) < r.height * 0.5);
          if (l) {
            l.left = Math.min(l.left, r.left);
            l.right = Math.max(l.right, r.right);
            l.top = Math.min(l.top, r.top);
          } else lines.push({ top: r.top, left: r.left, right: r.right });
        }
        for (const l of lines) out.push({ y: l.top - sTop, x1: l.left - sLeft, x2: l.right - sLeft });
      }
      for (const node of shell.querySelectorAll(TOPS)) {
        const r = node.getBoundingClientRect();
        out.push({ y: r.top - sTop, x1: r.left - sLeft, x2: r.right - sLeft });
      }
      return out;
    };

    const measure = () => {
      const s = shell.getBoundingClientRect();
      const a = avatarRef.current.getBoundingClientRect();
      const h = heroRef.current.getBoundingClientRect();
      const gap = parseFloat(token("space-bot-gap")) || 20; // the bot's air gap above anything it sits on
      const size = a.height;
      const slot = { x: a.left - s.left, y: a.top - s.top };
      return {
        size,
        slot,
        perch: { x: slot.x, y: slot.y - size - gap },
        lineY: h.bottom - s.top,
        bottom: s.height, // the end of the page is the floor of last resort
        viewTop: -s.top, // the top of the screen, in the page's own coordinates
        platforms: platforms(s.top, s.left),
        width: s.width,
        contentX: h.left - s.left, // where the main column starts, right of the side rail
        casesX2: (shell.querySelector(".home-cases__grid")?.getBoundingClientRect().right ?? s.right) - s.left,
        rest: (() => {
          // where it waits once you've scrolled down: on top of the stack of links, across the rail
          const f = shell.querySelector(".home-rail__foot")?.getBoundingClientRect();
          // its floor spans the rail and the gap before the pictures, so tipping off the first picture lands on it
          const pad = parseFloat(getComputedStyle(heroRef.current).paddingLeft) || 0;
          return f ? { y: f.top - s.top, x1: 0, x2: h.left - s.left + pad, at: f.left - s.left } : null;
        })(),
      };
    };

    // a tap opens "Ask Fany" (FanyLLM.jsx listens for this)
    const onTap = () => window.dispatchEvent(new CustomEvent("fanyllm:open"));
    // just the links' spot, cheap enough to read on every scroll frame
    const measureRest = () => {
      const s = shell.getBoundingClientRect();
      const f = shell.querySelector(".home-rail__foot")?.getBoundingClientRect();
      const h = heroRef.current.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(heroRef.current).paddingLeft) || 0;
      return f ? { y: f.top - s.top, x1: 0, x2: h.left - s.left + pad, at: f.left - s.left } : null; // at: lined up with the links' text
    };
    const bot = mountBlockBot(shell, { name: "Fany bot", lines, measure, measureRest, onTap, still: reduce });
    let alive = true;

    // ---- the opening ----
    // 1. a terminal: "npm run dev" and an Enter key (press it, click it, or wait)
    // 2. a few lines of build output, then the terminal clears
    // 3. the bot assembles out of scrambling characters, like the titles do
    // 4. it wakes up (eyes open), tests its legs, the lines draw in under it and it lands,
    //    tips over to the photo's spot, gets selected like a layer, and settles on the photo
    let cut = false; // "Skip intro"
    const STOP = Symbol("stop");
    const check = () => {
      if (cut || !alive) throw STOP;
    };
    const wait = async (t) => {
      await sleep(t);
      check();
    };
    const made = []; // elements the opening adds, removed when it ends
    const add = (html, cls) => {
      const el = document.createElement("div");
      el.className = cls;
      el.innerHTML = html;
      shell.appendChild(el);
      made.push(el);
      return el;
    };
    const finish = () => {
      made.forEach((el) => el.remove());
      bot.el.style.opacity = "";
      delete bot.el.dataset.asleep;
    };

    async function terminal() {
      const term = add(
        `<div class="bot-term__line"><span class="bot-term__cmd"></span><button type="button" class="bot-term__key" aria-label="Run">Enter
           <svg viewBox="0 0 20 16" aria-hidden="true"><path d="M17 2v7H4M8 5L4 9l4 4"/></svg></button></div>
         <div class="bot-term__log" aria-live="polite"></div>`,
        "bot-term"
      );
      const cmd = term.querySelector(".bot-term__cmd");
      const key = term.querySelector(".bot-term__key");
      const log = term.querySelector(".bot-term__log");
      await wait(500);
      for (const ch of "npm run dev") {
        cmd.textContent += ch;
        await wait(55 + Math.random() * 60);
      }
      key.dataset.show = "true";
      // run on Enter, a click, or after a couple of seconds on its own
      await new Promise((resolve) => {
        const go = (e) => {
          if (e.type === "keydown" && e.key !== "Enter") return;
          done();
        };
        const done = () => {
          window.removeEventListener("keydown", go);
          key.removeEventListener("click", done);
          clearTimeout(t);
          resolve();
        };
        const t = setTimeout(done, 2500);
        window.addEventListener("keydown", go);
        key.addEventListener("click", done);
      });
      check();
      key.dataset.pressed = "true";
      await wait(160);
      key.dataset.show = "false";
      const out = [
        ["> fany@2026 dev", ""],
        ["> vite --host", ""],
        ["  ready in 284 ms", ""],
        ["  ➜  loading fany-bot", ""],
        ["  ➜  teaching it to tip, not roll", ""],
        ["  ✓  fany-bot is alive", "ok"],
      ];
      for (const [text, kind] of out) {
        const row = document.createElement("div");
        row.className = `bot-term__row${kind ? ` bot-term__row--${kind}` : ""}`;
        log.appendChild(row);
        for (let i = 0; i < text.length; i += 3) {
          row.textContent = text.slice(0, i + 3);
          await wait(14);
        }
        await wait(170 + Math.random() * 160);
      }
      await wait(500);
      term.dataset.gone = "true"; // fades away
      await wait(450);
      term.remove();
    }

    // the bot assembles out of scrambling characters, cell by cell, into a solid block
    async function materialize(x, y, S) {
      const N = 7;
      const box = add("", "bot-build");
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.style.width = box.style.height = `${S}px`;
      box.style.setProperty("--n", N);
      const cells = [];
      for (let i = 0; i < N * N; i += 1) {
        const c = document.createElement("span");
        box.appendChild(c);
        cells.push(c);
      }
      const GLYPHS = "01#%&*+=-:.<>/\\|";
      const order = cells.map((_, i) => i).sort(() => Math.random() - 0.5);
      const STEPS = 26;
      for (let k = 0; k <= STEPS; k += 1) {
        const solid = Math.floor((order.length * k) / STEPS);
        order.forEach((ci, idx) => {
          const c = cells[ci];
          if (idx < solid) {
            c.textContent = "";
            c.dataset.solid = "true";
          } else if (Math.random() < 0.7) c.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        });
        await wait(k < 6 ? 70 : 42); // starts as noise, then resolves quicker
      }
      bot.el.style.opacity = ""; // the real block takes over, face still asleep
      await wait(40);
      box.remove();
    }

    const play = async () => {
      const seen = !introWillPlay();
      if (seen || reduce) {
        step(4);
        bot.settle();
        return;
      }
      const m = measure();
      const S = m.size;
      const G = parseFloat(token("space-bot-gap")) || 20;
      markSeen(); // counted as seen the moment it starts: leaving or coming back never restarts it
      step(0); // empty page
      const skip = add(`<button type="button">Skip intro</button>`, "bot-skip");
      skip.querySelector("button").addEventListener("click", () => {
        if (cut) return;
        cut = true;
        finish();
        bot.reflow(); // stop whatever it was doing
        step(4);
        bot.settle();
      });
      const x0 = (m.width - S) / 2;
      const y0 = window.innerHeight * 0.45 - S / 2;
      bot.place(x0, y0);
      bot.el.style.opacity = "0";
      bot.el.dataset.asleep = "true";
      try {
        await terminal();
        await materialize(x0, y0, S);
        await wait(500);
        delete bot.el.dataset.asleep; // it opens its eyes
        await wait(450);
        bot.say("Hello, world.", 1800);
        await wait(500);
        // tests its legs: a little hop, then a bigger one
        await bot.hop(x0, y0, 0.25);
        check();
        await wait(180);
        await bot.hop(x0, y0, 0.7);
        check();
        await wait(250);
        step(1); // the lines draw in, and the floor arrives under it
        await wait(600);
        await bot.fall(m.lineY - S - G);
        check();
        await wait(250);
        // tips itself over to the photo's spot, one face at a time
        const n = Math.round(Math.abs(m.slot.x - x0) / S);
        const dir = Math.sign(m.slot.x - x0) || -1;
        for (let i = 0; i < n; i += 1) {
          await bot.tumble(dir);
          check();
        }
        bot.select(true); // picked like a layer
        await wait(450);
        await bot.hop(m.slot.x, m.slot.y, 0.15); // snaps into the frame
        check();
        await wait(250);
        bot.select(false);
        step(2); // the intro text appears
        await wait(1100);
        step(3); // the photo fades in under it
        await wait(500);
        await bot.hop(m.perch.x, m.perch.y, 0.5); // and it hops up to sit on top
        check();
        finish();
        bot.settle();
        bot.say("Hi! I’m Fany bot.");
        step(4);
      } catch (e) {
        if (e !== STOP) throw e;
      }
    };
    // wait for the photo to have its size
    const start = requestAnimationFrame(() => void play());

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bot.reflow(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      made.forEach((el) => el.remove());
      cancelAnimationFrame(start);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      bot.destroy();
      step(4); // never leave the page half revealed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
