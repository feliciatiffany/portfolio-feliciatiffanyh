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

export function mountBlockBot(stage, { name = "Fany bot", lines = [], measure: measureRaw, measureRest: measureRestRaw, onTap, still = false }) {
  // The bot always keeps a little air between itself and whatever it sits on (token space-bot-gap):
  // every floor is reported that much higher, so it rests just above the text, the line, the links.
  // (The perch over the photo already includes it: BlockBot.jsx uses the same token.)
  const GAP = parseFloat(token("space-bot-gap")) || 20;
  const lift = (q) => (q ? { ...q, y: q.y - GAP } : q);
  // read once per frame at most: reading text positions is slow, and doing it on every check
  // between tips is what made the movement stutter
  let cached = null;
  let cachedAt = -1;
  const measure = () => {
    const now = performance.now();
    if (cached && now - cachedAt < 250) return cached; // the page only moves when it scrolls or resizes
    const m = measureRaw();
    cached = { ...m, lineY: m.lineY - GAP, bottom: m.bottom - GAP, rest: lift(m.rest), platforms: m.platforms.map(lift) };
    cachedAt = now;
    return cached;
  };
  const measureRest = measureRestRaw && (() => lift(measureRestRaw()));
  // ---- the body ----
  const el = document.createElement("div");
  el.className = "blockbot";
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `${name}: move it with the arrow keys or drag it; tap it to ask about Fany`);
  el.dataset.cursor = "Tap or drag";
  el.innerHTML = `
    <span class="blockbot__body">
      <span class="blockbot__yaw">
        <span class="blockbot__cube">
          <span class="blockbot__face blockbot__face--back"></span>
          <span class="blockbot__face blockbot__face--right"></span>
          <span class="blockbot__face blockbot__face--left"></span>
          <span class="blockbot__face blockbot__face--top"></span>
          <span class="blockbot__face blockbot__face--bottom"></span>
          <span class="blockbot__face blockbot__face--front">
            <svg viewBox="0 0 140 140" aria-hidden="true"><g class="blockbot__feat">
              <ellipse class="blockbot__eye" cx="44" cy="53" rx="17" ry="28"/>
              <ellipse class="blockbot__eye" cx="96" cy="53" rx="17" ry="28"/>
              <ellipse class="blockbot__mouth" cx="70" cy="116" rx="6" ry="1.7"/>
            </g></svg>
          </span>
        </span>
      </span>
    </span>
    <span class="blockbot__frame" aria-hidden="true">
      <i></i><i></i><i></i><i></i>
    </span>
    <span class="blockbot__tag" aria-live="polite"></span>`;
  stage.appendChild(el);
  const body = el.querySelector(".blockbot__body");
  const yawEl = el.querySelector(".blockbot__yaw");
  const cubeEl = el.querySelector(".blockbot__cube");
  const feat = el.querySelector(".blockbot__feat");
  const [eyeL, eyeR] = el.querySelectorAll(".blockbot__eye");
  const mouth = el.querySelector(".blockbot__mouth");
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

  // While it sits on the links (fixed to the screen) it is pinned too, so it can't lag a frame
  // behind them as the page scrolls; x, y stay in the page's coordinates either way.
  let pinned = false;
  const apply = () => {
    el.style.width = el.style.height = `${S}px`;
    el.style.setProperty("--bb-s", `${S}px`);
    if (pinned) {
      const r = stage.getBoundingClientRect();
      el.style.transform = `translate(${x + r.left}px, ${y + r.top}px)`;
    } else el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const pin = (on) => {
    if (pinned === on) return;
    pinned = on;
    el.dataset.pinned = on ? "true" : "false";
    apply();
  };
  const resize = () => {
    S = Math.round(measure().size);
    apply();
  };
  resize();

  // runs a Web Animation and waits for it; `busy` keeps other moves out meanwhile
  const run = async (target, frames, opts) => {
    pin(false); // moves are drawn in the page's coordinates
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
      ...(stair ? stair.treads : []),
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
  // Driven frame by frame, like a game loop: a tip lands and the next one starts in the same
  // frame, and back-to-back tips share one clock, so a run of them rolls on without a hitch.
  let tipToken = 0; // bumped to abandon a tip in flight (reflow, destroy)
  let lastTipEnd = -1e9;
  let lastTipDir = 0;
  function tumble(dir) {
    return new Promise((resolve) => {
      pin(false);
      busy++;
      const token = ++tipToken;
      body.style.transformOrigin = dir > 0 ? "100% 100%" : "0% 100%";
      el.dataset.tipping = "true";
      gazeDir = dir; // eyes look where it's going
      const d = ms("duration-slow") * 0.5 * pace;
      const now0 = performance.now();
      // carrying on from a tip that just ended in the same direction: keep the same clock
      const chained = dir === lastTipDir && now0 - lastTipEnd < 60;
      const t0 = chained ? lastTipEnd : now0;
      // in a run it turns at a steady speed (one smooth roll); a single tip eases in and out
      const steady = chained || following;
      const done = () => {
        busy = Math.max(0, busy - 1);
        resolve();
      };
      const frame = (now) => {
        if (token !== tipToken || !alive) return done();
        const p = Math.min(1, (now - t0) / d);
        const e = steady ? p : p * p * (3 - 2 * p);
        body.style.transform = `rotate(${(dir * 90 * e).toFixed(2)}deg)`;
        // the face hangs upright as the block turns under it, a touch behind, like a pendulum
        feat.style.transform = `rotate(${(-dir * 90 * Math.pow(e, 1.25)).toFixed(2)}deg)`;
        if (p < 1) {
          requestAnimationFrame(frame);
          return;
        }
        // lands on its next face, all in this one frame
        x += dir * S;
        body.style.transform = "";
        feat.style.transform = "";
        delete el.dataset.tipping;
        apply();
        lastMove = Date.now();
        lastTipEnd = t0 + d;
        lastTipDir = dir;
        done();
      };
      requestAnimationFrame(frame);
    });
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
    pin(false);
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

  // ---- stairs: it never leaps higher than a jump. When it has to get up further, the line
  // folds down into a flight of steps for it, it hops up them, and the steps fold back into the line.
  const NS = "http://www.w3.org/2000/svg";
  const stairSvg = document.createElementNS(NS, "svg");
  stairSvg.setAttribute("class", "blockbot-stair");
  stairSvg.setAttribute("aria-hidden", "true");
  const stairPath = document.createElementNS(NS, "path");
  stairSvg.appendChild(stairPath);
  stage.appendChild(stairSvg);
  let stair = null; // { treads: [{ y, x1, x2 }] } while a flight is out
  const stairMs = () => ms("duration-slow") * 1.4 * pace;
  async function drawStair(d, back = false) {
    stairPath.setAttribute("d", d);
    const len = stairPath.getTotalLength();
    stairPath.style.strokeDasharray = `${len}`;
    const a = stairPath.animate(
      back ? [{ strokeDashoffset: 0 }, { strokeDashoffset: len }] : [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: stairMs(), easing: EASE_IN_OUT(), fill: "forwards" }
    );
    try {
      await a.finished;
    } catch {
      /* cancelled */
    }
  }
  // up from the floor it stands on to a line at height `toY`, in steps it can hop
  async function climb(toY) {
    const foot = y + S;
    const dy = foot - toY;
    if (dy < S * 0.25) return false;
    const w = measure().width;
    const roomR = Math.floor((w - x - S) / S);
    const roomL = Math.floor(x / S);
    const want = Math.max(1, Math.ceil(dy / (S * 0.8)));
    const dir = roomR >= want || roomR >= roomL ? 1 : -1; // toward the open side, never off the page
    const n = Math.max(1, Math.min(want, dir > 0 ? roomR : roomL));
    const h = dy / n;
    const x0 = x;
    const treads = [];
    for (let i = 1; i < n; i += 1) treads.push({ y: foot - i * h, x1: x0 + dir * i * S, x2: x0 + dir * i * S + S });
    // drawn from the line down, so it reads as the line folding into steps
    const edge = (i) => x0 + (dir > 0 ? S : 0) + dir * (i - 1) * S; // where riser i stands
    // drawn on the real lines, GAP under where the bot stands
    const Y = (v) => v + GAP;
    let d = `M ${edge(n + 1)} ${Y(toY)} L ${edge(n)} ${Y(toY)}`;
    for (let i = n; i >= 1; i -= 1) {
      d += ` L ${edge(i)} ${Y(foot - (i - 1) * h)}`;
      if (i > 1) d += ` L ${edge(i - 1)} ${Y(foot - (i - 1) * h)}`;
    }
    stair = { treads };
    busy++;
    try {
      await drawStair(d);
      for (let i = 1; i <= n && alive; i += 1) await hop(x0 + dir * i * S, foot - i * h - S, 0.3);
      await drawStair(d, true); // back to a plain line
    } finally {
      busy--;
      stair = null;
    }
  }

  // The route (from the sketch): off the photo onto the intro, tip right along it and off the
  // end, hop down through the line onto the case pictures, tip left along their tops and drop
  // onto the links. Back up: the line folds into stairs, up onto the line under the intro,
  // a jump onto the top of the title, along it to the photo.
  async function stepDown() {
    // The route from the sketch, by tipping and falling: across from the photo onto the title,
    // tip right along it and fall off the end onto the line, drop through the line onto the
    // pictures, tip left along their tops, and fall off into the side rail onto the links.
    const s = standingOn();
    if (!s) return land();
    const m = measure();
    const at = m.rest ? (m.rest.at ?? Math.max(0, m.rest.x2 - S)) : x;
    if (s.rest) {
      // arrived; one more tip only if that sits it closer to the links' left edge
      if (Math.abs(x - at) >= S * 0.5 && canTip(Math.sign(at - x))) return tumble(Math.sign(at - x));
      return false;
    }
    if (s.bottom) return climb(m.lineY); // somehow below everything: stairs up, then down the usual way
    if (s.home) {
      // a small step across, level, onto the start of the title
      const title = titleLine();
      return title ? hop(title.x1, title.y - S, 0.2) : tumble(1);
    }
    if (s.full) {
      if (x + S <= m.contentX + 1) return dropThrough(); // in the rail already: straight down to the links
      if (m.casesX2 && x + S > m.casesX2 && canTip(-1)) return tumble(-1); // back over the pictures
      return dropThrough(); // through the line, onto the pictures
    }
    // along the intro: right, off the end. Below the line (pictures, captions): left, into the rail
    const dir = s.y <= m.lineY ? 1 : -1;
    if (!overlaps(s, x + dir * S)) {
      // the next tip leaves this surface: if another one sits level just across a small gap
      // (the next picture), it steps over onto it instead of dropping down between them
      const across = surfaces().find(
        (q) => q !== s && !q.full && Math.abs(q.y - s.y) < 2 && (dir < 0 ? q.x2 <= s.x1 + 1 && s.x1 - q.x2 < S : q.x1 >= s.x2 - 1 && q.x1 - s.x2 < S)
      );
      if (across && !overlaps(across, x + dir * S)) return hop(dir < 0 ? across.x2 - S : across.x1, y, 0.2);
    }
    if (!canTip(dir)) return dropThrough();
    await tumble(dir);
    await land(); // tipped off an edge: it falls
  }
  // falls straight through the floor it's on, onto whatever is below
  async function dropThrough() {
    const s = below(x, y + S, true);
    if (s) await fall(s.y - S);
    else return false;
  }

  // the top of the title: the intro's first line
  const titleLine = () => {
    const m = measure();
    return surfaces()
      .filter((q) => !q.full && !q.home && !q.rest && q.y < m.lineY && q.x1 >= m.contentX - 1)
      .sort((a, b) => a.y - b.y)[0];
  };
  async function stepHome() {
    const s = standingOn();
    if (!s) return land();
    if (s.home) return false; // arrived
    const m = measure();
    const title = titleLine();
    if (title && !s.full && Math.abs(s.y - title.y) < 2) {
      // along the top of the title toward the photo, then a short hop across the gap onto it
      if (x - S >= title.x1 - S * 0.25 && canTip(-1)) return tumble(-1);
      return hop(m.perch.x, m.perch.y, 0.3);
    }
    if (s.y < m.lineY - 1) {
      // on a lower line of the intro: up onto the title, or down to the line and round
      const up = reachableAbove(x);
      return up ? hop(x, up.y - S, 0.35) : jumpDown();
    }
    if (!s.bottom && Math.abs(s.y - m.lineY) < 2) {
      // the line under the intro: get under the title, then jump up onto it
      // the line under the intro: tip along under the title, then a small hop straight up onto it
      if (!title) return hop(m.perch.x, m.perch.y, 0.3);
      const under = Math.max(title.x1, Math.min(x, title.x2 - S));
      if (Math.abs(under - x) >= S * 0.5 && canTip(Math.sign(under - x))) return tumble(Math.sign(under - x));
      if (title.y >= y + S - S * REACH) return hop(x, title.y - S, 0.3);
      return climb(title.y);
    }
    // further down: the line folds into stairs and it climbs up to the line
    return climb(m.lineY);
  }

  // where it should be: home on the photo while the photo is on screen, otherwise on the links
  let followedAt = window.scrollY; // where the page was when it last set off
  async function follow() {
    if (following || !alive || busy || drag || !el.dataset.ready || Date.now() - selfScroll < 900) return;
    // no real scrolling since last time (a stray scroll event): it stays exactly where it is
    if (Math.abs(window.scrollY - followedAt) < 4) return;
    followedAt = window.scrollY;
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
        pace = y + S < w.top || y > w.bottom ? 0.2 : 0.5; // the page is already ahead of it: hurry
        const moved = home ? await stepHome() : await stepDown();
        if (moved === false) break;
      }
    } finally {
      pace = 1;
      following = false;
      checkRiding();
    }
  }
  // sitting on the links: it rides along with them, pinned to the screen so it never lags behind
  let riding = false;
  const checkRiding = () => {
    riding = !!standingOn()?.rest;
    pin(riding && !busy && !drag);
  };
  const invalidate = () => {
    cached = null;
  };
  window.addEventListener("resize", invalidate);
  const onScroll = (e) => {
    invalidate();
    // only the page itself scrolling counts: a scrolling box inside a card (a demo, a carousel)
    // must never send the bot off on its own
    const t = e?.target;
    if (t && t !== document && t !== document.documentElement && t !== document.body && t !== window) return;
    if (riding && !busy && !drag && measureRest) {
      const r = measureRest();
      if (r) y = r.y - S; // the links' spot now (they scroll in with the cards, then stay put)
      pin(true);
      apply();
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(follow, 260); // once the page settles
  };
  // capture, so it hears the page scroll whichever element does the scrolling (here: body)
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });

  const onVisibility = () => (document.hidden ? clearTimeout(talkTimer) : scheduleTalk());
  document.addEventListener("visibilitychange", onVisibility);

  // ---- the face: it looks at the cursor, blinks, and talks with its mouth ----
  // It sits on the ground, so it can turn left and right and lean back to look up, but never
  // tip forward to look down: there's floor in the way. Looking down is done with the eyes only.
  let gazeDir = 0; // set while tipping: the eyes look the way it's going
  let lastMove = 0;
  const look = { tx: 0, ty: 0, nx: 0, ny: 0, gaze: 0, open: 0, blink: 0, dx: 0, dy: 0, ddx: 0, ddy: 0 };
  let dartAt = 0; // little glances of the eyes alone, every second or two
  let wanderAt = 0;
  let nextBlink = Date.now() + 1800;
  let blinkStart = -1;
  const onPointer = (e) => {
    const r = el.getBoundingClientRect();
    look.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.4)));
    look.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.4)));
    lastMove = Date.now();
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const setEl = (node, o) => {
    for (const k in o) node.setAttribute(k, o[k].toFixed(2));
  };
  function drawFace() {
    const { nx, ny, open, blink } = look;
    const gx = Math.max(-1, Math.min(1, nx + look.gaze + look.dx));
    const gy = Math.max(-1, Math.min(1, ny + look.dy));
    // the eyes roam inside the face on their own, as well as the whole box turning
    const erx = lerp(17, 14, open);
    const ery = Math.max(lerp(28, 22.5, open) * (1 - blink * 0.93), 1.2);
    const lx = lerp(44, 49, open);
    const rxx = lerp(96, 91, open);
    const pad = 7; // they never leave the face
    const ex = Math.max(pad + erx - lx, Math.min(140 - pad - erx - rxx, gx * 26));
    const baseY = lerp(53, 35, open);
    const ecy = Math.max(pad + ery, Math.min(140 - pad - ery - 18, baseY + gy * 20));
    setEl(eyeL, { cx: lx + ex, cy: ecy, rx: erx, ry: ery });
    setEl(eyeR, { cx: rxx + ex, cy: ecy, rx: erx, ry: ery });
    setEl(mouth, { cx: 70 + gx * 9, cy: lerp(116, 97, open) + ny * 6, rx: lerp(6, 46, open), ry: lerp(1.7, 33, Math.pow(open, 0.85)) });
    yawEl.style.transform = `rotateY(${(nx * 38).toFixed(2)}deg)`;
    cubeEl.style.transform = `rotateX(${(Math.max(0, -ny) * 30).toFixed(2)}deg)`; // only ever leans back
  }
  let raf = 0;
  let prev = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    const t = Date.now();
    const moving = !!el.dataset.tipping || busy > 0;
    if (moving) {
      look.tx = 0;
      look.ty = 0;
    } else if (t - lastMove > 3500 && t > wanderAt) {
      // nobody around: it glances about on its own (but never down at the floor)
      const dirs = [[0, 0], [-0.9, 0], [0.9, 0], [0, -0.8], [0.6, -0.6], [-0.6, -0.4]];
      [look.tx, look.ty] = dirs[(Math.random() * dirs.length) | 0];
      wanderAt = t + 1200 + Math.random() * 1600;
    }
    if (t > dartAt) {
      look.ddx = moving ? 0 : (Math.random() - 0.5) * 0.9;
      look.ddy = moving ? 0 : (Math.random() - 0.5) * 0.7;
      dartAt = t + 900 + Math.random() * 1600;
    }
    const dk = 1 - Math.pow(0.00001, dt); // eyes snap quickly, like real glances
    look.dx += (look.ddx - look.dx) * dk;
    look.dy += (look.ddy - look.dy) * dk;
    const k = 1 - Math.pow(0.0015, dt);
    look.nx += (look.tx - look.nx) * k;
    look.ny += (look.ty - look.ny) * k;
    if (!el.dataset.tipping && t - lastMove > 500) gazeDir = 0;
    look.gaze += (gazeDir - look.gaze) * (1 - Math.pow(0.002, dt));
    // mouth: wide open while held, chattering while it talks, a dot otherwise
    const want = drag ? 0.9 : el.dataset.talking ? 0.18 + 0.14 * Math.abs(Math.sin(now / 110)) : 0;
    look.open += (want - look.open) * (1 - Math.pow(0.0005, dt));
    if (t > nextBlink && blinkStart < 0) blinkStart = t;
    if (blinkStart >= 0) {
      const p = (t - blinkStart) / 150;
      look.blink = p < 1 ? Math.sin(p * Math.PI) : 0;
      if (p >= 1) {
        blinkStart = -1;
        nextBlink = t + 2000 + Math.random() * 3000;
      }
    }
    drawFace();
    raf = requestAnimationFrame(tick);
  }
  drawFace();
  if (!still) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(tick);
  }

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
      stairPath.getAnimations().forEach((a) => a.cancel());
      tipToken++;
      feat.style.transform = "";
      delete el.dataset.tipping;
      stairPath.removeAttribute("d");
      stair = null;
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
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(raf);
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      el.remove();
      stairSvg.remove();
    },
  };
}
