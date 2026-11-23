// Fany bot: a block that gets around by tipping over its own edge, never by rolling.
// Built like Buddy's head (mountBuddy): one mount call, then a small set of moves
// (tumble, walkTo, fall, hop, say, select) that each return a promise, so a scene can
// be written as a plain sequence of awaits.
//
// The world is the page: every line of text is a platform it can stand on, plus the
// photo, the line under the intro and the bottom of the page. Arrow keys move it
// (← → tip, ↑ jump, ↓ drop through), the mouse can drag it, a tap opens "Ask Fany",
// and when the page scrolls away it follows on its own.
//
// It lives inside `stage` (a positioned element) and is placed by its top-left corner in
// stage pixels. `measure()` reports where everything is right now (see BlockBot.jsx).
import { token } from "./tokens.js";

const ms = (name) => parseFloat(token(name)) || 300;
const EASE_IN_OUT = () => token("ease-in-out");
const EASE_OUT = () => token("ease-out");
const sleep = (t) => new Promise((r) => setTimeout(r, t));
const IDLE_TALK = 5000; // says something after this long without anyone touching it

export function mountBlockBot(stage, { name = "Fany bot", lines = [], measure, measureRest, onTap, still = false }) {
  // ---- the body ----
  const el = document.createElement("div");
  el.className = "blockbot";
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `${name}: move it with the arrow keys or drag it; tap it to ask about Fany`);
  el.dataset.cursor = "Tap or drag";
  el.innerHTML = `
    <span class="blockbot__body"></span>
    <span class="blockbot__frame" aria-hidden="true">
      <i></i><i></i><i></i><i></i>
    </span>
    <span class="blockbot__tag" aria-live="polite"></span>`;
  stage.appendChild(el);
  const body = el.querySelector(".blockbot__body");
  const tag = el.querySelector(".blockbot__tag");

  // a line is a string, or { text, keys: ["←", "↑", "→"] } to show little keycaps after it
  const write = (line) => {
    tag.replaceChildren();
    const text = typeof line === "string" ? line : line.text;
    tag.append(document.createTextNode(text));
    for (const k of (typeof line === "object" && line.keys) || []) {
      const kbd = document.createElement("kbd");
      kbd.textContent = k;
      tag.append(kbd);
    }
  };
  write(name);

  let S = 0;
  let x = 0;
  let y = 0;
  let busy = 0; // moves in flight
  let alive = true;

  const apply = () => {
    el.style.width = el.style.height = `${S}px`;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const resize = () => {
    S = Math.round(measure().size);
    apply();
  };
  resize();

  // runs a Web Animation and waits for it; `busy` keeps other moves out meanwhile
  const run = async (target, frames, opts) => {
    busy++;
    try {
      const a = target.animate(frames, { fill: "forwards", ...opts });
      await a.finished;
      a.commitStyles?.();
      a.cancel();
    } catch {
      /* cancelled: the page moved on */
    } finally {
      busy--;
    }
  };

  // ---- the world ----
  // every surface: { y, x1, x2 }, y being where the bot's bottom rests
  const surfaces = () => {
    const m = measure();
    return [
      { y: m.perch.y + S, x1: m.perch.x, x2: m.perch.x + S, home: true },
      { y: m.lineY, x1: 0, x2: m.width, full: true },
      ...m.platforms,
      ...(m.rest ? [{ ...m.rest, rest: true }] : []),
      { y: m.bottom, x1: 0, x2: m.width, full: true, bottom: true },
    ];
  };
  const overlaps = (s, at) => Math.min(at + S, s.x2) - Math.max(at, s.x1) >= S * 0.3;
  const standingOn = (at = x, foot = y + S) => surfaces().find((s) => Math.abs(s.y - foot) < 2 && overlaps(s, at));
  // the first surface under a point; `through` skips the one it stands on
  const below = (at = x, foot = y + S, through = false) =>
    surfaces()
      .filter((s) => (through ? s.y > foot + 2 : s.y >= foot - 1) && overlaps(s, at))
      .sort((a, b) => a.y - b.y)[0];
  const clampX = (v) => Math.max(0, Math.min(measure().width - S, v));
  let pace = 1; // < 1 while it hurries to catch up with the page, off screen

  // ---- moves ----
  // tip over the leading bottom corner: a quarter turn moves it exactly one body-length
  async function tumble(dir) {
    body.style.transformOrigin = dir > 0 ? "100% 100%" : "0% 100%";
    el.dataset.tipping = "true";
    await run(body, [{ transform: "rotate(0deg)" }, { transform: `rotate(${dir * 90}deg)` }], {
      duration: ms("duration-slow") * 0.7 * pace,
      easing: EASE_IN_OUT(),
    });
    body.style.transform = "";
    delete el.dataset.tipping;
    x += dir * S;
    apply();
    await sleep(50 * pace); // a beat on each face, so it reads as tipping, not rolling
  }

  // tip along until as close as a whole step gets it (it never slides)
  async function walkTo(tx) {
    tx = clampX(tx);
    while (alive && Math.abs(tx - x) >= S * 0.5 && canTip(Math.sign(tx - x))) await tumble(Math.sign(tx - x));
  }
  const canTip = (dir) => Math.abs(clampX(x + dir * S) - x) >= S - 0.5;

  // drop straight down like something set down, then settle
  async function fall(ty) {
    body.style.transformOrigin = "50% 100%";
    const from = y;
    y = ty;
    const d = Math.abs(ty - from);
    if (d > 1) {
      await run(el, [{ transform: `translate(${x}px, ${from}px)` }, { transform: `translate(${x}px, ${y}px)` }], {
        duration: Math.min(900, 160 + Math.sqrt(d) * 16) * pace,
        easing: "ease-in", // gravity
      });
    }
    apply();
    await run(body, [{ transform: "scale(1.04, 0.95)" }, { transform: "scale(1, 1)" }], {
      duration: ms("duration-fast") * pace,
      easing: EASE_OUT(),
    });
  }

  // an arc from here to (tx, ty)
  async function hop(tx = x, ty = y, lift = 0.6) {
    const fx = x;
    const fy = y;
    const top = Math.min(fy, ty) - S * lift;
    x = tx;
    y = ty;
    await run(
      el,
      [
        { transform: `translate(${fx}px, ${fy}px)` },
        { transform: `translate(${(fx + tx) / 2}px, ${top}px)`, offset: 0.5 },
        { transform: `translate(${tx}px, ${ty}px)` },
      ],
      { duration: ms("duration-slow") * 1.1 * pace, easing: EASE_IN_OUT() }
    );
    apply();
  }

  // a small hop down through the floor it stands on, onto the next one
  async function jumpDown() {
    const s = below(x, y + S, true);
    if (s) await hop(x, s.y - S, 0.3);
  }

  // the jump: up onto the highest line within reach (one step sideways if asked), else in place
  const REACH = 1.9; // how high it can jump, in body-lengths
  const reachableAbove = (at) =>
    surfaces()
      .filter((s) => s.y < y + S - S * 0.25 && s.y >= y + S - S * REACH && overlaps(s, at))
      .sort((a, b) => a.y - b.y)[0];
  async function jump(dir = 0) {
    const nx = clampX(x + dir * S);
    const up = reachableAbove(nx);
    if (up) await hop(nx, up.y - S, 0.35);
    else {
      await hop(nx, y, 0.9);
      await land();
    }
  }

  // whatever it ends up standing over, it drops onto
  async function land() {
    if (standingOn()) return;
    const s = below();
    if (s) await fall(s.y - S);
  }

  function place(tx, ty) {
    x = tx;
    y = ty;
    apply();
  }

  // a selected-layer frame, like a design tool
  function select(on) {
    el.dataset.selected = on ? "true" : "false";
  }

  let sayTimer;
  function say(line, hold = 3200) {
    clearTimeout(sayTimer);
    write(line);
    el.dataset.talking = "true";
    sayTimer = setTimeout(() => {
      write(name);
      delete el.dataset.talking;
    }, hold);
  }

  // ---- the keys: ← → tip, ↑ jumps onto the next line up, ↓ drops through ----
  const held = new Set();
  let queued = null;
  const visible = () => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };
  const keepInView = () => {
    const r = el.getBoundingClientRect();
    if (r.top >= 0 && r.bottom <= window.innerHeight) return;
    selfScroll = Date.now();
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  async function act(key) {
    if (key === "ArrowLeft" || key === "ArrowRight") {
      const dir = key === "ArrowLeft" ? -1 : 1;
      if (!canTip(dir)) return; // against the edge of the page
      await tumble(dir);
      await land(); // tipped off the end of a line: down it goes
    } else if (key === "ArrowUp") {
      await jump(held.has("ArrowLeft") ? -1 : held.has("ArrowRight") ? 1 : 0);
    } else if (key === "ArrowDown") {
      await jumpDown();
    }
    keepInView();
  }

  const onKeyDown = (e) => {
    if (!el.dataset.ready || !e.key.startsWith("Arrow")) return;
    const t = e.target;
    if (t?.closest?.("input, textarea, select, [contenteditable='true']")) return;
    if (document.documentElement.classList.contains("fanyllm-open")) return;
    if (!visible()) return; // off screen: the arrows scroll the page as usual
    if (e.key === "ArrowDown" && !below(x, y + S, true)) return; // at the very bottom: let the page scroll
    e.preventDefault();
    held.add(e.key);
    touched();
    if (busy) {
      queued = e.key; // one press waits its turn, so quick taps aren't lost
      return;
    }
    (async () => {
      let k = e.key;
      while (k && alive) {
        queued = null;
        await act(k);
        checkRiding();
        k = queued;
      }
    })();
  };
  const onKeyUp = (e) => held.delete(e.key);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  // ---- talking to itself: every 5 seconds nobody plays with it ----
  let line = 0;
  let talkTimer;
  const scheduleTalk = () => {
    clearTimeout(talkTimer);
    if (!lines.length) return;
    talkTimer = setTimeout(() => {
      if (alive && !document.hidden && visible() && !busy) say(lines[line++ % lines.length]);
      scheduleTalk();
    }, IDLE_TALK);
  };
  function touched() {
    scheduleTalk();
  }

  // ---- hands: drag it anywhere, let go and it drops; a tap opens "Ask Fany" ----
  let drag = null;
  el.addEventListener("pointerdown", (e) => {
    if (busy || !el.dataset.ready) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    touched();
    drag = { px: e.clientX, py: e.clientY, x0: x, y0: y, moved: false };
    select(true);
  });
  el.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.px;
    const dy = e.clientY - drag.py;
    if (!drag.moved && Math.hypot(dx, dy) < 4) return;
    drag.moved = true;
    el.dataset.dragging = "true";
    place(clampX(drag.x0 + dx), Math.max(0, drag.y0 + dy));
  });
  const release = async () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    delete el.dataset.dragging;
    touched();
    if (!moved) {
      onTap?.();
      await hop(x, y, 0.3);
      select(false);
      return;
    }
    const s = below();
    if (s) await fall(s.y - S);
    select(false);
    checkRiding();
  };
  el.addEventListener("pointerup", release);
  el.addEventListener("pointercancel", release);

  // ---- following the page: scroll it out of sight and it comes along, the same way it
  // always moves: tipping along a line, dropping off the end, hopping down through a floor,
  // or jumping up line by line. It hurries while it's off screen.
  let selfScroll = 0;
  let scrollTimer;
  let following = false;
  const view = () => {
    const top = measure().viewTop;
    return { top, bottom: top + window.innerHeight };
  };
  const inView = () => {
    const v = view();
    const mid = y + S / 2;
    return mid > v.top + S * 0.25 && mid < v.bottom - S * 0.25;
  };

  // The route (from the sketch): off the photo onto the intro, tip right along it and off the
  // end, hop down through the line onto the case pictures, tip left along their tops and off
  // into the side rail, and drop onto the links. Back up: leap line by line and home to the photo.
  async function stepDown() {
    const s = standingOn();
    if (!s) return land();
    if (s.rest) {
      // arrived on the links; one more tip if it still hangs over the rail's line
      if (x + S > s.x2 + 1 && canTip(-1)) {
        await tumble(-1);
        return land();
      }
      return false;
    }
    const m = measure();
    if (s.home) {
      // off the photo, onto the start of the intro's first line
      const intro = surfaces()
        .filter((q) => !q.full && !q.home && q.y < m.lineY && q.x1 >= m.contentX - 1)
        .sort((a, b) => a.y - b.y)[0];
      return intro ? hop(intro.x1, intro.y - S, 0.4) : jump(1);
    }
    if (s.bottom) {
      // below the links: tip into the rail, then up onto them
      if (x > m.rest.x2 - S * 0.5 && canTip(-1)) return tumble(-1);
      return reachableAbove(x) ? jump(0) : hop(x, m.rest.y - S, 0.4);
    }
    if (s.full) {
      // the line under the intro: out of the rail first, then hop down through it onto the cases
      if (x < m.contentX && canTip(1)) return tumble(1);
      if (m.casesX2 && x + S > m.casesX2 && canTip(-1)) return tumble(-1); // back over the cards
      return jumpDown();
    }
    const dir = s.y <= m.lineY ? 1 : -1; // along the intro: right; below the line: left, toward the rail
    if (!canTip(dir)) return jumpDown();
    await tumble(dir);
    await land();
  }
  async function stepHome() {
    const s = standingOn();
    if (!s) return land();
    if (s.home) return false; // arrived
    const m = measure();
    if (s.y <= m.lineY + 1) {
      // on the line or the intro: tip toward the photo, then jump up onto it
      if (Math.abs(x - m.perch.x) >= S * 0.5 && canTip(Math.sign(m.perch.x - x))) {
        await tumble(Math.sign(m.perch.x - x));
        return land();
      }
      return hop(m.perch.x, m.perch.y, 0.4);
    }
    return stepUp(); // further down: climb
  }
  async function stepUp() {
    if (reachableAbove(x)) return jump(0);
    // look along the line it's on for a spot under something it can reach
    const s = standingOn();
    for (let k = 1; k <= 10; k += 1) {
      for (const dir of [-1, 1]) {
        const nx = x + dir * k * S;
        if (clampX(nx) !== nx || (s && !overlaps(s, nx))) continue; // only where whole tips get it
        if (reachableAbove(nx)) {
          await walkTo(nx);
          return jump(0);
        }
      }
    }
    // nothing within a normal jump: a big leap up to the nearest line above that it can get under
    const foot = y + S;
    let best = null;
    for (let k = 0; k <= 10; k += 1) {
      for (const dir of k ? [-1, 1] : [0]) {
        const nx = x + dir * k * S;
        if (clampX(nx) !== nx || (k && s && !overlaps(s, nx))) continue;
        const p = surfaces()
          .filter((q) => q.y < foot - S * 0.25 && overlaps(q, nx))
          .sort((a, b) => b.y - a.y)[0]; // the nearest one above
        if (p && (!best || p.y > best.p.y)) best = { nx, p };
      }
    }
    if (!best) return false; // nothing above at all
    await walkTo(best.nx);
    await hop(x, best.p.y - S, 0.5);
  }

  // where it should be: home on the photo while the photo is on screen, otherwise on the links
  async function follow() {
    if (following || !alive || busy || drag || !el.dataset.ready || Date.now() - selfScroll < 900) return;
    const m = measure();
    const v = view();
    const home = m.perch.y + S > v.top && m.perch.y < v.bottom;
    const there = standingOn();
    if (home ? there?.home : there?.rest || !m.rest) return;
    following = true;
    touched();
    try {
      for (let i = 0; i < 80 && alive && !drag; i += 1) {
        const w = view();
        // following the page it hurries: brisk on screen, quicker still while nobody can see it
        pace = y + S < w.top || y > w.bottom ? 0.3 : 0.55;
        const moved = home ? await stepHome() : await stepDown();
        if (moved === false) break;
      }
    } finally {
      pace = 1;
      following = false;
      checkRiding();
    }
  }
  // sitting on the links, which stay put on screen while the page scrolls: it rides along
  let riding = false;
  const checkRiding = () => {
    riding = !!standingOn()?.rest;
  };
  const onScroll = () => {
    if (riding && !busy && !drag && measureRest) {
      const r = measureRest();
      if (r) place(x, r.y - S);
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(follow, 260); // once the page settles
  };
  // capture, so it hears the page scroll whichever element does the scrolling (here: body)
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });

  const onVisibility = () => (document.hidden ? clearTimeout(talkTimer) : scheduleTalk());
  document.addEventListener("visibilitychange", onVisibility);

  return {
    el,
    get size() {
      return S;
    },
    tumble,
    walkTo,
    fall,
    hop,
    place,
    select,
    say,
    // after the intro (or straight away): sit on the photo and start living
    settle() {
      const m = measure();
      resize();
      place(m.perch.x, m.perch.y);
      el.dataset.ready = "true";
      if (!still) scheduleTalk();
    },
    // the page changed size: put it back on the photo
    reflow() {
      if (drag) return;
      el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      body.style.transform = "";
      busy = 0;
      if (el.dataset.ready) this.settle();
      else resize();
    },
    destroy() {
      alive = false;
      clearTimeout(talkTimer);
      clearTimeout(sayTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      el.remove();
    },
  };
}
