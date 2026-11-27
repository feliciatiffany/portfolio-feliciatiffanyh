// BlockBot — Lucu, Fany's bot, on the homepage. The first visit of a session, and every click
// on the profile photo, plays the opening:
//   1. a terminal: "npm run dev" and an Enter key. It waits for the visitor: press Enter or click it
//   2. the build pours down the page, faster and faster, until the screen is full of it
//   3. the log scrambles into dots (the way the titles do under the cursor) and the dots fly
//      together into a block: the bot's body, cell by cell
//   4. it wakes up one eye at a time, tests its legs and introduces itself; the frame's lines
//      draw in under it and it lands on the line
//   5. the photo appears ("Oh, there she is."), then Fany's intro types itself in from the left
//      and shoves the bot along the line out of its way
//   6. once the words are done it climbs home by its own rules: stairs onto the end of the
//      title, along it, and a hop onto its place above the photo
// After that it lives by the rules in src/lib/blockbot.js: arrow keys move it, words and pictures
// are solid, a tap opens "Ask Fany", and it follows the page when you scroll.
import { useEffect, useRef } from "react";
import { mountBlockBot } from "../lib/blockbot.js";
import { botLines } from "../lib/botLines.js";
import { lineBoxes, rectBox, hitCard } from "../lib/botWorld.js";
import { scrollToTopNow } from "../lib/smoothScroll.js";
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
const rand = (a, b) => a + Math.random() * (b - a);

// whether this visit opens with the bot's entrance (first visit of the session, room, motion allowed)
export function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 700px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (playedThisLoad) return false;
  return !seenBefore();
}

// ---- what the terminal prints: a dev server starting, every file reloading, then the bot's own build ----
const FILES = [
  "src/main.jsx", "src/App.jsx", "src/pages/Home.jsx", "src/pages/About.jsx", "src/pages/Playground.jsx",
  "src/pages/Blog.jsx", "src/pages/StudyStory.jsx", "src/components/BlockBot.jsx", "src/components/ScrambledText.jsx",
  "src/components/DitherImage.jsx", "src/components/FanyLLM.jsx", "src/components/CodeSlots.jsx", "src/lib/blockbot.js",
  "src/lib/timeline.js", "src/lib/resume.js", "src/lib/studyCases.js", "src/studies/meetup.js", "src/style/tokens.css",
  "src/style/style.css", "src/projects/techdesign/tellAI.js", "src/projects/techdesign/wehearyou.js",
];
function buildLog() {
  const t = new Date().toLocaleTimeString("en-US");
  const out = [
    ["> fany-portfolio@2026 dev", "dim"],
    ["> vite --host", "dim"],
    [""],
    ["  VITE v5.4.8  ready in 284 ms", "strong"],
    [""],
    ["  ➜  Local:   http://localhost:5173/"],
    ["  ➜  Network: use --host to expose", "dim"],
    [""],
  ];
  const files = FILES.slice().sort(() => Math.random() - 0.5);
  for (let i = 0; i < 64; i += 1) {
    out.push([`${t} [vite] hmr update /${files[i % files.length]}`, i % 5 === 2 ? "" : "dim"]);
    if (i % 11 === 6)
      out.push([
        `${t} [vite] hmr invalidate /src/components/BlockBot.jsx Could not Fast Refresh ("introWillPlay" export is incompatible)`,
        "dim",
      ]);
    if (i % 16 === 9) out.push([`${t} [vite] page reload src/lib/blockbot.js`]);
  }
  out.push(
    [""],
    [`${t} [fany] loading timeline, résumé, case studies`],
    [`${t} [fany] resolving memory  ·  ·  ·  ok`],
    [""],
    ["  building fany-bot", "strong"],
    ["  ├─ body       49 cells"],
    ["  ├─ eyes       2"],
    ["  ├─ mouth      1"],
    ["  ├─ legs       0   (it tips instead)"],
    ["  ├─ stairs     on demand"],
    ["  └─ opinions   several"],
    [""],
    ["  ✓ fany-bot is alive", "strong"]
  );
  return out;
}
const DOTS = "·.:"; // the characters the titles scramble into

export default function BlockBot({ shellRef, avatarRef, heroRef, onStep }) {
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

    const gapPx = () => parseFloat(token("space-bot-gap")) || 20; // the bot's air gap above anything it sits on
    // where the links are: fixed to the screen once the page has scrolled, so read on every scroll frame
    const measureRest = () => {
      const s = shell.getBoundingClientRect();
      const f = shell.querySelector(".home-rail__foot")?.getBoundingClientRect();
      const h = heroRef.current.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(heroRef.current).paddingLeft) || 0;
      // its floor spans the rail and the gap before the pictures, so tipping off the first picture lands on it;
      // `at` lines it up with the links' text
      return f ? { y: f.top - s.top, x1: 0, x2: h.left - s.left + pad, at: f.left - s.left } : null;
    };
    // The world: words and pictures are solid boxes, the photo is where it sits, and the thin line
    // under the intro is a ledge. (Not the rail's nav: it stays put on screen and the bot passes it.)
    const measure = () => {
      const s = shell.getBoundingClientRect();
      const a = avatarRef.current.getBoundingClientRect();
      const h = heroRef.current.getBoundingClientRect();
      const size = a.height;
      const slot = { x: a.left - s.left, y: a.top - s.top };
      // the photo is solid like any picture: it sits on top of it and can't walk through it
      // (it is round, so its sides are a little narrower than its box)
      const round = a.width * 0.15;
      const boxes = [{ ...rectBox(a, s.left, s.top), x1: a.left - s.left + round, x2: a.right - s.left - round, tag: "photo" }];
      for (const node of shell.querySelectorAll(".home-intro")) {
        if (getComputedStyle(node).opacity === "0") continue;
        for (const b of lineBoxes(node, s.left, s.top)) boxes.push({ ...b, tag: "title" });
      }
      for (const li of shell.querySelectorAll(".home-case")) {
        const media = li.querySelector(".home-case__media");
        if (media) {
          boxes.push({
            ...rectBox(media.getBoundingClientRect(), s.left, s.top),
            tag: "picture",
            label: li.querySelector(".home-case__title")?.textContent || "",
            el: li,
            hit: true,
            soft: true, // a card: stairs may cross in front of it when there is no clear way
            pending: li.classList.contains("is-pending"),
          });
        }
        const cap = li.querySelector(".home-case__caption");
        if (cap) for (const b of lineBoxes(cap, s.left, s.top)) boxes.push({ ...b, tag: "caption", soft: true });
      }
      const lineY = h.bottom - s.top;
      return {
        size,
        slot,
        // its home above the photo, with more air under it than it keeps over text
        perch: { x: slot.x, y: slot.y - size - (parseFloat(token("space-bot-perch")) || 48) },
        lineY,
        ledges: [{ y: lineY, x1: 0, x2: s.width, tag: "line" }],
        boxes,
        bottom: s.height, // the end of the page is the floor of last resort
        width: s.width,
        contentX: h.left - s.left, // where the main column starts, right of the side rail
        casesX2: (shell.querySelector(".home-cases__grid")?.getBoundingClientRect().right ?? s.right) - s.left,
      };
    };

    const bot = mountBlockBot(shell, {
      name: "Lucu",
      lines: botLines("home"),
      measure,
      measureRest,
      still: reduce,
      onTap: () => window.dispatchEvent(new CustomEvent("fanyllm:open")), // FanyLLM.jsx listens for this
      onHit: (box) => hitCard(box.el),
    });
    let alive = true;
    if (import.meta.env.DEV) window.__fanybot = bot; // a handle for the console while developing

    // ---- the opening ----
    let cut = false; // "Skip intro"
    let playing = false;
    const STOP = Symbol("stop");
    const check = () => {
      if (cut || !alive) throw STOP;
    };
    const wait = async (t) => {
      await sleep(t);
      check();
    };
    let made = []; // elements the opening adds, removed when it ends
    const add = (html, cls, parent = shell) => {
      const el = document.createElement("div");
      el.className = cls;
      el.innerHTML = html;
      parent.appendChild(el);
      made.push(el);
      return el;
    };
    let pushRaf = 0;
    const finish = () => {
      cancelAnimationFrame(pushRaf);
      delete shell.dataset.typing;
      shell.querySelectorAll(".home-intro [data-unseen]").forEach((c) => c.removeAttribute("data-unseen"));
      made.forEach((el) => el.remove());
      made = [];
      bot.el.style.opacity = "";
      delete bot.el.dataset.asleep;
      playing = false;
    };

    // 1 + 2. the command, the Enter key, then the build pouring down the page
    async function terminal() {
      const log = add(
        `<div class="bot-log__roll">
           <div class="bot-term__line"><span class="bot-term__cmd"></span><button type="button" class="bot-term__key" aria-label="Run">Enter
             <svg viewBox="0 0 20 16" aria-hidden="true"><path d="M17 2v7H4M8 5L4 9l4 4"/></svg></button></div>
         </div>`,
        "bot-log"
      );
      const roll = log.querySelector(".bot-log__roll");
      const cmd = log.querySelector(".bot-term__cmd");
      const key = log.querySelector(".bot-term__key");
      await wait(500);
      for (const ch of "npm run dev") {
        cmd.textContent += ch;
        await wait(55 + Math.random() * 60);
      }
      key.dataset.show = "true";
      // runs only when the visitor presses Enter or clicks the key: it never runs on its own
      await new Promise((resolve) => {
        const go = (e) => {
          if (e.type === "keydown" && e.key !== "Enter") return;
          done();
        };
        const done = () => {
          window.removeEventListener("keydown", go);
          key.removeEventListener("click", done);
          clearInterval(gone);
          resolve();
        };
        // skipped, or the page left: stop waiting (check() below then ends the opening)
        const gone = setInterval(() => (cut || !alive) && done(), 200);
        window.addEventListener("keydown", go);
        key.addEventListener("click", done);
      });
      check();
      key.dataset.pressed = "true";
      await wait(160);
      key.dataset.show = "false";
      // The roll starts at the command and grows down; once it reaches the bottom of the screen it
      // pushes up and out of the top, so by the end the whole screen is log.
      const room = () => log.clientHeight - roll.offsetTop - parseFloat(getComputedStyle(log).paddingBottom || 0);
      const rows = [];
      const lines = buildLog();
      for (let i = 0; i < lines.length; i += 1) {
        const [text, kind] = lines[i];
        const row = document.createElement("div");
        row.className = `bot-log__row${kind ? ` bot-log__row--${kind}` : ""}`;
        row.textContent = text || " ";
        roll.appendChild(row);
        rows.push(row);
        const over = roll.offsetHeight - room();
        if (over > 0) roll.style.transform = `translateY(${-over}px)`;
        // slow enough to read at first, then faster than anyone can; a beat before the bot's own build
        const last = lines.length - i;
        await wait(last < 13 ? rand(70, 150) : text ? Math.max(9, 110 * Math.pow(0.9, i)) + Math.random() * 14 : 40);
      }
      await wait(520);
      return { log, rows };
    }

    // 3. the log scrambles into dots and the dots fly together into the bot's body
    async function materialize({ log, rows }, x, y, S) {
      // only the rows still on screen are worth scrambling
      const top = log.getBoundingClientRect().top;
      const live = rows.filter((r) => r.getBoundingClientRect().bottom > top);
      const texts = live.map((r) => r.textContent);
      log.dataset.melting = "true";
      const N = 7;
      const box = add("", "bot-build");
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.style.width = box.style.height = `${S}px`;
      box.style.setProperty("--n", N);
      const s = shell.getBoundingClientRect();
      const area = log.getBoundingClientRect();
      const cell = S / N;
      const cells = [];
      const flights = [];
      for (let i = 0; i < N * N; i += 1) {
        const c = document.createElement("span");
        c.textContent = DOTS[(Math.random() * DOTS.length) | 0];
        box.appendChild(c);
        cells.push(c);
        // each cell starts somewhere in the log and flies home
        const cx = x + ((i % N) + 0.5) * cell;
        const cy = y + (Math.floor(i / N) + 0.5) * cell;
        const fromX = rand(area.left, area.right) - s.left;
        const fromY = rand(area.top, area.bottom) - s.top;
        const a = c.animate(
          [
            { transform: `translate(${fromX - cx}px, ${fromY - cy}px)`, opacity: 0 },
            { opacity: 1, offset: 0.2 },
            { transform: "translate(0, 0)", opacity: 1 },
          ],
          { duration: rand(700, 1250), delay: rand(120, 720), easing: token("ease-in-out"), fill: "both" }
        );
        flights.push(
          a.finished
            .then(() => {
              c.textContent = "";
              c.dataset.solid = "true";
            })
            .catch(() => {})
        );
      }
      // while they fly: the log's letters turn to dots, more of them every beat, and the dots in flight keep changing
      let done = false;
      Promise.all(flights).then(() => (done = true));
      for (let k = 0; !done; k += 1) {
        const share = Math.min(1, k / 9);
        live.forEach((row, i) => {
          let out = "";
          for (const ch of texts[i]) out += ch !== " " && Math.random() < share ? DOTS[(Math.random() * DOTS.length) | 0] : ch;
          row.textContent = out;
        });
        for (const c of cells) if (!c.dataset.solid) c.textContent = DOTS[(Math.random() * DOTS.length) | 0];
        await wait(60);
      }
      await wait(320); // a solid block, nothing more, for a beat
      bot.el.style.opacity = ""; // the real block takes over, still without a face
      await wait(40);
      box.remove();
      log.remove();
    }

    // 5. Fany's intro types itself in, letter by letter, with a block caret. Wherever the words
    // reach the bot, they shove it along the line (it can't stand in words), and it watches them come.
    async function typeIntro(S) {
      shell.dataset.typing = "wait"; // nothing of the intro shows until its letters are ready
      step(3);
      let chars = [];
      for (let i = 0; i < 40 && !chars.length; i += 1) {
        await wait(50); // the intro re-renders for the typing; its letters appear in a moment
        chars = [...shell.querySelectorAll(".home-intro__lines .scrambled-text__char")];
      }
      if (!chars.length) {
        delete shell.dataset.typing;
        return;
      }
      chars.forEach((c) => c.setAttribute("data-unseen", ""));
      shell.dataset.typing = "on";
      const caret = add("", "bot-caret");
      const clear = parseFloat(token("space-frame")) || 32; // the room it keeps from the words shoving it (the default gap)
      let pushTo = bot.x;
      // the shove: it slides along smoothly, a little behind the words, never jumping
      const push = () => {
        if (bot.x < pushTo - 0.3) bot.place(bot.x + (pushTo - bot.x) * 0.3, bot.y);
        pushRaf = requestAnimationFrame(push);
      };
      pushRaf = requestAnimationFrame(push);
      let shoved = false;
      for (const c of chars) {
        c.removeAttribute("data-unseen");
        const s = shell.getBoundingClientRect();
        const r = c.getBoundingClientRect();
        const left = r.left - s.left;
        const right = r.right - s.left;
        const top = r.top - s.top;
        // the caret sits just after the newest letter, the height of the letters
        caret.style.left = `${right + r.height * 0.06}px`;
        caret.style.top = `${top + r.height * 0.12}px`;
        caret.style.width = `${r.height * 0.36}px`;
        caret.style.height = `${r.height * 0.78}px`;
        // level with the bot and reaching it: a shove
        if (r.bottom - s.top > bot.y && top < bot.y + S && right + clear > pushTo && left < bot.x + S) {
          pushTo = right + clear;
          if (!shoved) {
            shoved = true;
            bot.feel("effort", 2400);
          }
        }
        bot.lookAt(right, top + r.height / 2, 500);
        const ch = c.textContent;
        await wait(ch.trim() ? 38 + Math.random() * 46 : 20); // a person typing: uneven, spaces quick
      }
      await wait(380);
      caret.remove();
      delete shell.dataset.typing;
      // let the shove finish before it moves on its own
      for (let i = 0; i < 30 && bot.x < pushTo - 0.5; i += 1) await wait(16);
      cancelAnimationFrame(pushRaf);
    }

    const play = async (force = false) => {
      if (playing) return;
      if (reduce || (!force && !introWillPlay())) {
        step(4);
        bot.settle();
        return;
      }
      playing = true;
      cut = false;
      const m = measure();
      const S = m.size;
      const G = gapPx();
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
      bot.shutEyes();
      bot.setFlat(true); // it forms and wakes as a plain flat square
      try {
        const term = await terminal();
        await materialize(term, x0, y0, S);
        await wait(450);
        delete bot.el.dataset.asleep; // a face appears, eyes shut
        await wait(650);
        await bot.wake(); // one eye, then the other
        check();
        await wait(350);
        // tests its legs: a little hop, then a bigger one
        bot.setFlat(false); // testing its legs, it becomes a block: its depth eases in
        await bot.hop(x0, y0, 0.25);
        check();
        await wait(160);
        await bot.hop(x0, y0, 0.6);
        check();
        await wait(300);
        await wait(bot.say("Hi! I’m Lucu and my creator is Fany.") - 900); // it introduces itself
        step(1); // the lines draw in, and the floor arrives under it
        await wait(600);
        await bot.fall(m.lineY - S - G);
        check();
        await wait(500);

        // the photo appears, and it turns to look
        step(2);
        const a = avatarRef.current.getBoundingClientRect();
        const s0 = shell.getBoundingClientRect();
        bot.lookAt(a.left + a.width / 2 - s0.left, a.top + a.height / 2 - s0.top, 2600);
        bot.feel("curious", 1400);
        await wait(700);
        await wait(bot.say("Oh, there she is.") - 600);

        await typeIntro(S);
        check();
        // the words that follow "who also" start typing too; it lets them begin, then heads home
        // (nothing left worth skipping: the button goes, and "Scroll ↓" takes its corner)
        skip.remove();
        step(4);
        await wait(1100);
        await bot.goHome();
        check();
        finish();
        bot.settle();
      } catch (e) {
        if (e !== STOP) throw e;
      }
    };
    // wait for the photo to have its size
    const start = requestAnimationFrame(() => void play());

    // a click on the profile photo plays the opening again (Home.jsx sends this)
    const onReplay = (e) => {
      if (reduce || playing) return;
      e.preventDefault(); // taken: Home doesn't need to scroll to the top itself
      document.activeElement?.blur?.(); // so Enter runs the terminal, not the photo's link again
      scrollToTopNow();
      bot.pause();
      void play(true);
    };
    window.addEventListener("fanybot:replay", onReplay);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => !playing && bot.reflow(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      made.forEach((el) => el.remove());
      cancelAnimationFrame(start);
      cancelAnimationFrame(pushRaf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("fanybot:replay", onReplay);
      bot.destroy();
      step(4); // never leave the page half revealed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
