// Fany bot: a block that gets around by tipping over its own edge, never by sliding.
// One mount call, then a small set of moves (tumble, hop, fall, say, select…) that each
// return a promise, so a scene can be written as a plain sequence of awaits.
//
// THE RULES OF ITS WORLD (also written down in CLAUDE.md, "Fany bot"):
//   1. Words and pictures are solid. It stands on top of them, it bumps into their sides,
//      and it can never fall or walk through them.
//   2. It only falls where there is empty space: off the end of a line, off the side of a picture.
//      Once more than half of it hangs over an edge, it tips off and drops.
//   3. Thin lines (the frame's rules, its own stairs) are ledges: it lands on them, and ↓ lets it
//      drop through, like a one-way platform in a game.
//   4. Going up: a short hop if the next surface is within about one body height, otherwise it
//      draws one straight flight of stairs, rising to the left or to the right (never a ladder,
//      never a zigzag), hops up it, and the stairs fold away. It never leaps high.
//   5. It keeps its distance from walls: a clear margin from the edge of the page and from the
//      sides of words and pictures. It only comes close to a wall on the stairs that take it onto it.
//   6. It moves like a game character: hold an arrow and it rolls on at a steady speed, no pauses
//      between tips; it winds up on the first tip and lands with a small thud.
//
// It lives inside `stage` (a positioned element) and is placed by its top-left corner in stage
// pixels. `measure()` reports the world (see BlockBot.jsx and PageBot.jsx):
//   { size, width, bottom, perch?: {x, y}, ledges: [{ y, x1, x2, tag }],
//     boxes: [{ x1, y1, x2, y2, tag, label, el, hit }], lineY?, contentX?, casesX2? }
// `measureRest()` reports the links it rests on, which are fixed to the screen: { y, x1, x2, at }.
import { token } from "./tokens.js";
import { glideTo } from "./smoothScroll.js";

const EASE_OUT = () => token("ease-out");
const EASE_IN_OUT = () => token("ease-in-out");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));
const CANCEL = Symbol("cancel"); // thrown through a sequence when its move is abandoned

// ---- the feel, all in one place (milliseconds unless said otherwise) ----
const TIP_FIRST = 200; // a tip from standing still: it winds up
const TIP_RUN = 135; // every tip after that in a run: steady, like a held key in a game
const AIR = 13; // jumps and falls: time = AIR × √pixels (a quick, weighty gravity)
const HOP_REACH = 1.05; // the highest thing it hops onto, in body heights
const STEP_H = 0.8; // a comfortable stair step, in body heights
const STEP_MAX = 1; // the steepest it will build, when a gentler flight has no room
const TYPE = 30; // one letter of what it says
const PLAY = 8000; // after you move it, ↑ keeps belonging to the bot this long

// long enough to read the line at an easy pace
export const readTime = (text) => clamp(1300 + String(text).length * 62, 2400, 7500);

export function mountBlockBot(stage, opts) {
  const { name = "Fany bot", measure, measureRest, onTap, onHit, lines, still = false } = opts;
  // The bot always keeps a little air between itself and whatever it sits on (token space-bot-gap):
  // every floor is that much higher than the thing itself.
  const GAP = parseFloat(token("space-bot-gap")) || 20;
  // It never crowds a wall: this far from the edge of the page, so its turning head stays clear of
  // the side of the screen, and half its air gap from the side of any word or picture.
  const EDGE = parseFloat(token("space-bot-wall")) || 40;
  const CLEAR = GAP / 2;

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
              <path class="blockbot__mouth" d=""/>
            </g></svg>
          </span>
        </span>
      </span>
    </span>
    <span class="blockbot__frame" aria-hidden="true">
      <i></i><i></i><i></i><i></i>
    </span>
    <span class="blockbot__tag" aria-hidden="true"></span>
    <span class="blockbot__sr" aria-live="polite"></span>`;
  stage.appendChild(el);
  const body = el.querySelector(".blockbot__body");
  const yawEl = el.querySelector(".blockbot__yaw");
  const cubeEl = el.querySelector(".blockbot__cube");
  const feat = el.querySelector(".blockbot__feat");
  const [eyeL, eyeR] = el.querySelectorAll(".blockbot__eye");
  const mouth = el.querySelector(".blockbot__mouth");
  const tag = el.querySelector(".blockbot__tag");
  const sr = el.querySelector(".blockbot__sr");

  let S = 0;
  let x = 0;
  let y = 0;
  let busy = 0; // moves in flight
  let alive = true;
  let epoch = 0; // bumped to abandon every move in flight (reflow, pause, destroy)
  let pace = 1; // < 1 while it hurries to catch up with the page
  let drag = null;
  let following = false;
  let lastMove = 0;

  // ---- the world, measured ----
  // Positions on the page don't change when it scrolls, so this is read rarely: reading where
  // every line of text sits is slow, and doing it between tips is what makes movement stutter.
  let geo = null;
  let geoAt = -1e9;
  let geoScroll = 0;
  const geometry = (fresh = 1000) => {
    const now = performance.now();
    if (!geo || now - geoAt > fresh) {
      geo = measure();
      geoAt = now;
      geoScroll = window.scrollY;
    }
    return geo;
  };
  const invalidate = () => {
    geoAt = -1e9;
  };
  // the links are fixed to the screen, so their spot on the page changes with every scroll: read live
  let restCache = null;
  let restAt = -1;
  const rest = () => {
    if (!measureRest) return null;
    const now = performance.now();
    if (now - restAt > 16) {
      const r = measureRest();
      restCache = r ? { ...r, y: r.y - GAP, at: Math.max(r.at ?? EDGE, EDGE) } : null;
      restAt = now;
    }
    return restCache;
  };
  const viewTop = () => -stage.getBoundingClientRect().top; // the top of the screen, in page coordinates

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
  const draw = (px, py) => {
    el.style.transform = `translate(${px}px, ${py}px)`;
  };
  const pin = (on) => {
    if (pinned === on) return;
    pinned = on;
    el.dataset.pinned = on ? "true" : "false";
    apply();
  };
  const resize = () => {
    S = Math.round(geometry().size);
    apply();
  };
  resize();

  // every floor it can stand on: { y (where its bottom rests), x1, x2, kind, tag }
  //   solid: the top of words, pictures, the photo, the links, the end of the page
  //   ledge: thin lines and its own stairs (↓ drops through them)
  let stair = null; // { treads: [...] } while a flight is out
  const floors = () => {
    const g = geometry();
    const out = [];
    if (g.perch) out.push({ y: g.perch.y + S, x1: g.perch.x, x2: g.perch.x + S, kind: "solid", tag: "photo", home: true });
    for (const l of g.ledges || []) out.push({ y: l.y - GAP, x1: l.x1, x2: l.x2, kind: "ledge", tag: l.tag || "line" });
    for (const b of g.boxes || []) out.push({ y: b.y1 - GAP, x1: b.x1, x2: b.x2, kind: "solid", tag: b.tag, box: b });
    const r = rest();
    if (r) out.push({ y: r.y, x1: r.x1, x2: r.x2, at: r.at, kind: "solid", tag: "links", rest: true });
    if (stair) out.push(...stair.treads);
    out.push({ y: g.bottom - GAP, x1: 0, x2: g.width, kind: "solid", tag: "ground", ground: true });
    return out;
  };
  const span = (f, at) => Math.min(at + S, f.x2) - Math.max(at, f.x1); // how much of it is over this floor
  const level = () => Math.max(8, S * 0.25); // floors this close in height count as one level

  // words and pictures are walls too: would it be inside one, or closer than `clear` to its side,
  // standing at (ax, ay)? (`soft`: a flight of stairs with no other way may cross in front of a card.)
  const blocked = (ax, ay, clear = CLEAR, soft = false) => {
    for (const b of geometry().boxes || []) {
      if (soft && b.soft) continue;
      if (ax + S + clear > b.x1 && ax - clear < b.x2 && ay + S > b.y1 + 2 && ay < b.y2 - 2) return b;
    }
    return null;
  };

  // what holds it up at (ax, foot). Stable when its middle is over a floor, or when it bridges a
  // gap narrower than itself; otherwise `out` is the side it will tip off.
  // (A floor a little way past either side still counts, so a gap barely wider than the bot is
  // stepped across rather than fallen into: nothing drops into a slot it only just fits.)
  const supportAt = (ax, foot) => {
    const here = floors().filter((f) => Math.abs(f.y - foot) <= level() && span(f, ax) > -S * 0.2);
    if (!here.length) return null;
    const cx = ax + S / 2;
    const over = here.find((f) => cx >= f.x1 - 1 && cx <= f.x2 + 1);
    const left = here.some((f) => f.x2 < cx);
    const right = here.some((f) => f.x1 > cx);
    const floor = over || here.sort((a, b) => span(b, ax) - span(a, ax))[0];
    return { floor, all: here, y: floor.y, stable: !!over || (left && right), out: left ? 1 : -1 };
  };
  const standing = () => supportAt(x, y + S);
  // the first floor under (ax, foot) that any part of it would land on
  const floorBelow = (ax, foot, through = false) =>
    floors()
      .filter((f) => f.y > foot + (through ? level() : 1) && span(f, ax) > 2)
      .sort((a, b) => a.y - b.y)[0];
  const inBounds = (ax) => ax >= EDGE - 0.5 && ax <= geometry().width - S - EDGE + 0.5;
  const canStep = (dir) => inBounds(x + dir * S) && !blocked(x + dir * S, y);

  // ---- animation: every move is drawn frame by frame, like a game loop ----
  const hold = () => {
    const ep = epoch;
    busy++;
    return () => {
      if (ep === epoch) busy = Math.max(0, busy - 1);
    };
  };
  const frames = (dur, paint) =>
    new Promise((resolve, reject) => {
      pin(false); // moves are drawn in the page's coordinates
      const release = hold();
      const ep = epoch;
      let t0 = -1;
      const f = (now) => {
        if (ep !== epoch || !alive) return reject(CANCEL);
        if (t0 < 0) t0 = now;
        const p = dur <= 0 ? 1 : clamp((now - t0) / dur, 0, 1);
        paint(p);
        if (p < 1) return requestAnimationFrame(f);
        release();
        resolve();
      };
      requestAnimationFrame(f);
    });
  // a pause inside a scene, cut short when the scene is abandoned or someone takes over
  let interrupt = false;
  const nap = async (t) => {
    const ep = epoch;
    const end = performance.now() + t;
    while (performance.now() < end) {
      await new Promise((r) => setTimeout(r, 50));
      if (ep !== epoch || !alive || interrupt) throw CANCEL;
    }
  };
  // landing: a small squash, never blocking the next move
  const thud = (k = 1) => {
    if (still) return;
    body.style.transformOrigin = "50% 100%";
    body.animate([{ transform: `scale(${1 + 0.045 * k}, ${1 - 0.06 * k})` }, { transform: "scale(1, 1)" }], {
      duration: 140 + 60 * k,
      easing: EASE_OUT(),
    });
  };
  const clearBody = () => body.getAnimations().forEach((a) => a.cancel());

  // ---- moves ----
  // Tip over the leading bottom corner: a quarter turn moves it exactly one body-length.
  // Back-to-back tips share one clock, so a run rolls on at a steady speed without a hitch.
  let lastTipEnd = -1e9;
  let lastTipDir = 0;
  let runLen = 0;
  function tumble(dir) {
    return new Promise((resolve, reject) => {
      clearBody();
      pin(false);
      const release = hold();
      const ep = epoch;
      body.style.transformOrigin = dir > 0 ? "100% 100%" : "0% 100%";
      el.dataset.tipping = "true";
      gazeDir = dir; // eyes look where it's going
      const now0 = performance.now();
      const chained = dir === lastTipDir && now0 - lastTipEnd < 80;
      const d = (chained ? TIP_RUN : TIP_FIRST) * pace;
      const t0 = chained ? lastTipEnd : now0;
      runLen = chained ? runLen + 1 : 1;
      const frame = (now) => {
        if (ep !== epoch || !alive) return reject(CANCEL);
        const p = clamp((now - t0) / d, 0, 1);
        const e = chained ? p : Math.pow(p, 1.7); // from rest it gathers speed; in a run it just turns
        body.style.transform = `rotate(${(dir * 90 * e).toFixed(2)}deg)`;
        // the face hangs upright as the block turns under it, a touch behind, like a pendulum
        feat.style.transform = `rotate(${(-dir * 90 * Math.pow(e, 1.2)).toFixed(2)}deg)`;
        if (p < 1) return requestAnimationFrame(frame);
        // lands on its next face, all in this one frame
        x += dir * S;
        body.style.transform = "";
        feat.style.transform = "";
        delete el.dataset.tipping;
        apply();
        lastMove = Date.now();
        lastTipEnd = now - (t0 + d) > 50 ? now : t0 + d; // a dropped frame never makes the next tip jump
        lastTipDir = dir;
        release();
        resolve();
      };
      requestAnimationFrame(frame);
    });
  }

  // drop straight down under gravity
  async function fall(ty) {
    const from = y;
    const d = ty - from;
    if (d > 1) {
      if (d > S * 0.6) feel("fall", 4000);
      await frames(Math.sqrt(d) * AIR * pace, (p) => draw(x, from + d * p * p));
    }
    y = ty;
    apply();
    if (d > 1) {
      feel("land", 180);
      thud(clamp(d / (S * 3), 0.4, 1.4));
      lastMove = Date.now();
    }
  }

  // a jump from here to (tx, ty): up to the top of its arc and down again, like a thrown thing
  async function hop(tx = x, ty = y, lift = 0.6) {
    clearBody();
    const fx = x;
    const fy = y;
    const apex = Math.min(fy, ty) - S * lift;
    const up = Math.sqrt(Math.max(1, fy - apex));
    const down = Math.sqrt(Math.max(1, ty - apex));
    const split = up / (up + down);
    feel("jump", 300);
    await frames((up + down) * AIR * pace, (p) => {
      const py = p < split ? fy - (fy - apex) * (1 - (1 - p / split) ** 2) : apex + (ty - apex) * ((p - split) / (1 - split)) ** 2;
      draw(lerp(fx, tx, p), py);
    });
    x = tx;
    y = ty;
    apply();
    thud(0.5 + lift * 0.5);
    lastMove = Date.now();
  }

  // leaning into something that won't move: a wall of words, the edge of the page
  async function bonk(dir, hard = false, onPeak) {
    clearBody();
    body.style.transformOrigin = dir > 0 ? "100% 100%" : "0% 100%";
    feel("effort", hard ? 420 : 260);
    gazeDir = dir;
    const A = hard ? 15 : 8;
    let hit = false;
    await frames((hard ? 300 : 170) * pace, (p) => {
      const e = Math.sin(p * Math.PI);
      body.style.transform = `rotate(${(dir * A * e).toFixed(2)}deg)`;
      feat.style.transform = `rotate(${(-dir * A * e * 0.8).toFixed(2)}deg)`;
      if (!hit && p >= 0.5) {
        hit = true;
        onPeak?.();
      }
    });
    body.style.transform = "";
    feat.style.transform = "";
  }

  // whatever it ends up over, it settles: falls if nothing holds it, tips off an edge it hangs over
  async function settleDown() {
    for (let i = 0; i < 8 && alive; i += 1) {
      const sup = standing();
      if (!sup) {
        const f = floorBelow(x, y + S);
        if (!f) return;
        await fall(f.y - S);
        continue;
      }
      // a small difference in height between two floors of one level: it steps down, or up
      if (sup.y - (y + S) > 2) await fall(sup.y - S);
      else if (Math.abs(sup.y - (y + S)) > 0.5) {
        y = sup.y - S;
        apply();
      }
      if (sup.stable || !canStep(sup.out)) return;
      await tumble(sup.out); // more than half of it hangs over the edge: over it goes
    }
  }

  // dragged into the middle of some words: it pops up onto them
  async function unstick() {
    for (let i = 0; i < 5; i += 1) {
      const b = blocked(x, y);
      if (!b) return;
      await hop(x, b.y1 - GAP - S, 0.3);
    }
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

  // ---- stairs: it never leaps higher than a hop. To get up further it draws one straight flight
  // of steps, rising to the left or to the right, each one body wide and at most STEP_H tall
  // (steeper only when there is no room), hops up it, and the steps fold away behind it.
  // Never a ladder, never a flight that turns back on itself.
  const NS = "http://www.w3.org/2000/svg";
  const stairSvg = document.createElementNS(NS, "svg");
  stairSvg.setAttribute("class", "blockbot-stair");
  stairSvg.setAttribute("aria-hidden", "true");
  const stairPath = document.createElementNS(NS, "path");
  stairSvg.appendChild(stairPath);
  stage.appendChild(stairSvg);

  const overFloor = (f, ax) => ax + S / 2 >= f.x1 - 1 && ax + S / 2 <= f.x2 + 1;
  // can it get along the floor it's on to `sx`, where a flight would start?
  const reachable = (sx) => {
    const d = sx - x;
    const foot = y + S;
    const n = Math.ceil(Math.abs(d) / (S / 2));
    for (let j = 1; j <= n; j += 1) {
      const px = x + Math.sign(d) * Math.min(j * (S / 2), Math.abs(d));
      if (!inBounds(px) || blocked(px, y) || !supportAt(px, foot)) return false;
    }
    return true;
  };
  // One straight flight from the floor it stands on up to floor `f`:
  // { start (where on its floor the flight begins), steps: [{ x, y }], h } or null.
  // Onto a thin line it can land anywhere. Onto something solid it comes up beside one end and
  // steps on from there, since it can't rise through the thing itself.
  function planStairsTo(f, toward = 0) {
    const foot = y + S;
    const dy = foot - f.y;
    if (dy < S * 0.2) return null;
    const gentle = Math.max(1, Math.ceil(dy / (S * STEP_H)));
    const steep = Math.max(1, Math.ceil(dy / (S * STEP_MAX)));
    if (steep > 60) return null;
    // the gentlest flights first, then longer ones (they land further along), then steeper ones
    const counts = [];
    for (let n = gentle; n <= gentle + 4; n += 1) counts.push(n);
    for (let n = gentle - 1; n >= steep; n -= 1) counts.push(n);
    const dir0 = toward || ((f.x1 + f.x2) / 2 >= x + S / 2 ? 1 : -1);
    // a clear path first; only if there is none may the flight cross in front of a card
    for (const soft of [false, true]) {
      for (const n of counts) {
        const h = dy / n;
        let best = null;
        for (const dir of [dir0, -dir0]) {
          const start = f.kind === "ledge" ? x : (dir < 0 ? f.x2 - S + CLEAR : f.x1 - CLEAR) - dir * n * S;
          if (!inBounds(start) || !reachable(start)) continue;
          const steps = [];
          let ok = true;
          for (let i = 1; i <= n && ok; i += 1) {
            const px = start + dir * i * S;
            const py = foot - i * h - S;
            // the last step is where it will stand; the ones before it only pass by
            ok = inBounds(px) && !blocked(px, py, i === n ? CLEAR : CLEAR - 1, soft && i < n);
            steps.push({ x: px, y: py });
          }
          if (ok && overFloor(f, steps[n - 1].x) && (!best || Math.abs(start - x) < Math.abs(best.start - x))) best = { start, steps, h };
        }
        if (best) return best;
      }
    }
    return null;
  }

  // the drawn flight, bottom to top: riser, tread, riser, tread… on the real lines, GAP under its feet
  const stairShape = (x0, foot, steps, h) => {
    let px = x0;
    let d = "";
    steps.forEach((st, i) => {
      const dir = Math.sign(st.x - px) || 1;
      const edge = dir > 0 ? px + S : px; // the riser stands where the two treads meet
      const y0 = foot - i * h + GAP;
      const y1 = foot - (i + 1) * h + GAP;
      d += `${i ? " L" : "M"} ${edge} ${y0} L ${edge} ${y1} L ${dir > 0 ? st.x + S : st.x} ${y1}`;
      px = st.x;
    });
    return d;
  };
  async function drawStair(d, n, back = false) {
    stairPath.setAttribute("d", d);
    const len = stairPath.getTotalLength();
    stairPath.style.strokeDasharray = `${len}`;
    const a = stairPath.animate(
      back ? [{ strokeDashoffset: 0 }, { strokeDashoffset: len }] : [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: clamp(n * 60, 280, 900) * pace * (back ? 0.6 : 1), easing: EASE_IN_OUT(), fill: "forwards" }
    );
    try {
      await a.finished;
    } catch {
      /* cancelled */
    }
  }
  async function climb(plan) {
    const release = hold();
    const ep = epoch;
    try {
      // to where the flight starts: whole tips, then a small hop to line up exactly
      for (let j = 0; j < 40 && Math.abs(plan.start - x) >= S - 0.5; j += 1) await tumble(Math.sign(plan.start - x));
      if (Math.abs(plan.start - x) > 1) await hop(plan.start, y, 0.12);
      const x0 = x;
      const foot = y + S;
      const n = plan.steps.length;
      // every step but the last is a tread of the flight; the last one is the floor it climbs to
      stair = {
        treads: plan.steps.slice(0, -1).map((st) => ({ y: st.y + S, x1: st.x, x2: st.x + S, kind: "ledge", tag: "stairs" })),
      };
      look.up = performance.now() + 500; // it looks up at where it's going
      const d = stairShape(x0, foot, plan.steps, plan.h);
      await drawStair(d, n);
      if (ep !== epoch) throw CANCEL;
      for (const st of plan.steps) await hop(st.x, st.y, 0.22);
      await drawStair(d, n, true); // folds away behind it
    } finally {
      stairPath.removeAttribute("d");
      stair = null;
      release();
    }
  }

  // ---- the keys: ← → tip (hold to roll on), ↑ hop or stairs, ↓ drop through a thin line ----
  const held = new Set();
  const queue = [];
  let driving = false;
  let played = 0; // when someone last moved it
  const visible = () => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };
  let selfScrollUntil = 0;
  const keepInView = () => {
    const r = el.getBoundingClientRect();
    const m = S * 0.6;
    if (r.top >= m && r.bottom <= window.innerHeight - m) return;
    if (Date.now() < selfScrollUntil - 900) return; // already on its way
    selfScrollUntil = Date.now() + 1500;
    glideTo(Math.max(0, window.scrollY + r.top + r.height / 2 - window.innerHeight / 2));
  };

  let grumbled = 0;
  const grumble = (event) => {
    if (Date.now() - grumbled < 9000) return;
    grumbled = Date.now();
    speak({ event });
  };

  async function step(dir, key) {
    if (!canStep(dir)) {
      held.delete(key); // one bump per press
      const wall = inBounds(x + dir * S) ? "wall" : "edge";
      await bonk(dir);
      grumble(wall);
      return;
    }
    await tumble(dir);
    if (runLen === 12) feel("dizzy", 900);
    await settleDown();
  }

  async function goUp(dir) {
    const foot = y + S;
    // 1. a short hop: straight up through a thin line, or up one step to the side
    const sides = dir ? [dir] : [0, lastTipDir || 1, -(lastTipDir || 1)];
    for (const d of sides) {
      const ax = x + d * S;
      if (!inBounds(ax)) continue;
      const f = floors()
        .filter((q) => q.y < foot - S * 0.2 && q.y >= foot - S * HOP_REACH && span(q, ax) > 2)
        .filter((q) => (d !== 0 || q.kind === "ledge") && overFloor(q, ax) && !blocked(ax, q.y - S))
        .sort((a, b) => a.y - b.y)[0];
      if (f) {
        await hop(ax, f.y - S, 0.3);
        return settleDown();
      }
    }
    // 2. anything higher: stairs, up to the nearest thing above it
    const maxUp = window.innerHeight * 1.2;
    const cx = x + S / 2;
    const targets = floors()
      .filter((f) => f.tag !== "stairs" && f.y < foot - S * 0.3 && f.y > foot - maxUp)
      .map((f) => ({ f, cost: foot - f.y + (cx < f.x1 ? f.x1 - cx : cx > f.x2 ? cx - f.x2 : 0) * 0.6 }))
      .sort((a, b) => a.cost - b.cost)
      .slice(0, 8);
    for (const t of targets) {
      const plan = planStairsTo(t.f, dir);
      if (plan) {
        await climb(plan);
        return settleDown();
      }
    }
    // 3. nothing to climb: a jump, in place or one step across
    const ax = dir && canStep(dir) ? x + dir * S : x;
    await hop(ax, y, 0.7);
    await settleDown();
  }

  // only a thin line lets it through
  const canDrop = () => {
    const sup = standing();
    return !!sup && sup.all.every((f) => f.kind === "ledge") && !!floorBelow(x, y + S, true);
  };
  async function goDown() {
    if (!canDrop()) return;
    const f = floorBelow(x, y + S, true);
    await fall(f.y - S);
    await settleDown();
  }

  async function act(key) {
    geometry(300);
    if (key === "ArrowLeft" || key === "ArrowRight") await step(key === "ArrowLeft" ? -1 : 1, key);
    else if (key === "ArrowUp") await goUp(held.has("ArrowLeft") ? -1 : held.has("ArrowRight") ? 1 : 0);
    else await goDown();
    checkRiding(); // landed on the links: from here on it moves with them, also while the page follows it
    keepInView();
  }
  async function drive() {
    if (driving) return;
    driving = true;
    try {
      while (alive) {
        if (busy || following) {
          await nextFrame();
          continue;
        }
        interrupt = false;
        let key = queue.shift();
        // nothing new pressed: carry on rolling the way that's still held
        if (!key && held.has("ArrowRight") !== held.has("ArrowLeft")) key = held.has("ArrowRight") ? "ArrowRight" : "ArrowLeft";
        if (!key) break;
        await act(key);
      }
    } catch (e) {
      if (e !== CANCEL) throw e;
    } finally {
      driving = false;
      if (alive && performance.now() - lastTipEnd < 90) thud(0.6); // the run comes to rest
      checkRiding();
    }
  }

  const away = () => {
    const f = standing()?.floor;
    return !(f?.home || f?.rest);
  };
  const onKeyDown = (e) => {
    if (!el.dataset.ready || !e.key.startsWith("Arrow") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target?.closest?.("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
    if (document.documentElement.classList.contains("fanyllm-open")) return;
    if (document.querySelector("[aria-modal='true'], .lightbox")) return; // a picture is open: the arrows are its own
    if (!visible()) return; // off screen: the arrows scroll the page as usual
    if (e.key === "ArrowDown" && !canDrop()) return; // on something solid: the page scrolls as usual
    // ↑ is the page's own key until someone starts playing with the bot
    if (e.key === "ArrowUp" && window.scrollY > 2 && Date.now() - played > PLAY && !away()) return;
    e.preventDefault();
    if (e.repeat) return; // holding is read from `held`, not from the keyboard's own slow repeat
    held.add(e.key);
    if (queue.length < 3) queue.push(e.key);
    played = Date.now();
    interrupt = true; // whatever it was up to on its own, it drops
    touched();
    drive();
  };
  const onKeyUp = (e) => held.delete(e.key);
  const onBlur = () => held.clear();
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);

  // ---- talking ----
  // What it says is typed into the bubble while its mouth moves, stays long enough to read,
  // then the name tag comes back.
  let speech = null; // { text, keys, t0, n }
  let sayTimer;
  let lastSpoke = Date.now();
  const nameTag = () => {
    tag.replaceChildren(document.createTextNode(name));
    delete el.dataset.talking;
  };
  nameTag();
  function say(line, holdFor) {
    if (!line) return 0;
    clearTimeout(sayTimer);
    const text = typeof line === "string" ? line : line.text;
    const keys = (typeof line === "object" && line.keys) || [];
    const textEl = document.createElement("span");
    textEl.className = "blockbot__say";
    tag.replaceChildren(textEl);
    sr.textContent = text;
    el.dataset.talking = "true";
    // the bubble never lies over a heading or a picture beside it: it opens to the side with more
    // room (the right, when it can) and wraps sooner if that room is short
    const cx = x + S / 2;
    const width = geometry().width;
    let right = width - cx - CLEAR;
    let left = cx - CLEAR;
    for (const b of geometry().boxes || []) {
      if (b.y2 <= y - S * 2.2 || b.y1 >= y) continue; // not level with the bubble
      if (b.x1 > cx) right = Math.min(right, b.x1 - cx - CLEAR);
      else if (b.x2 < cx) left = Math.min(left, cx - b.x2 - CLEAR);
      else right = left = 0; // something straight above it
    }
    const wide = S * 5.5; // about the bubble's full width
    const side = right >= wide || right >= left ? "right" : "left";
    const room = side === "right" ? right : left;
    el.dataset.side = side;
    tag.style.maxWidth = room < wide && room >= S * 2 ? `${Math.round(room)}px` : "";
    const addKeys = () => {
      for (const k of keys) {
        const kbd = document.createElement("kbd");
        kbd.textContent = k;
        tag.append(kbd);
      }
    };
    if (still) {
      textEl.textContent = text;
      addKeys();
      speech = null;
    } else speech = { text, textEl, addKeys, t0: performance.now(), n: -1 };
    const total = (still ? 0 : text.length * TYPE) + (holdFor ?? readTime(text));
    sayTimer = setTimeout(() => {
      speech = null;
      nameTag();
      lastSpoke = Date.now();
    }, total);
    return total;
  }
  const hush = () => {
    clearTimeout(sayTimer);
    speech = null;
    nameTag();
  };

  // lines come from the page it is on and the thing it stands on; none repeats until the rest are used
  const bags = new Map();
  const where = () => {
    const f = standing()?.floor;
    return { place: f?.tag || "air", label: f?.box?.label || "" };
  };
  const lineFor = (ctx = {}) => {
    const full = { ...where(), ...ctx };
    const pool = (typeof lines === "function" ? lines(full) : lines) || [];
    if (!pool.length) return null;
    const key = `${full.event || ""}|${full.place}|${full.label}`;
    let bag = bags.get(key);
    if (!bag?.length) {
      bag = pool.slice().sort(() => Math.random() - 0.5);
      bags.set(key, bag);
    }
    return bag.pop();
  };
  const speak = (ctx, holdFor) => say(lineFor(ctx), holdFor);

  // ---- a life of its own: it talks at an easy, uneven pace, and now and then does something silly ----
  let lifeTimer;
  let talkAt = 0;
  let anticAt = 0;
  let acting = false;
  const idle = () =>
    alive && !document.hidden && !busy && !drag && !following && !driving && !acting && el.dataset.ready && visible() &&
    !document.documentElement.classList.contains("fanyllm-open");
  const life = () => {
    const now = Date.now();
    if (!idle() || el.dataset.talking) return;
    if (now > anticAt && now - lastPointerNear > 2500) {
      anticAt = now + rand(26000, 48000);
      talkAt = now + rand(5000, 9000);
      void antic();
    } else if (now > talkAt && now - lastSpoke > 2500) {
      const shown = speak();
      talkAt = now + shown + rand(5500, 13000); // a breath between lines, never on a beat
    }
  };
  const startLife = () => {
    clearInterval(lifeTimer);
    if (still) return;
    const now = Date.now();
    talkAt = now + rand(3500, 6000);
    anticAt = now + rand(16000, 26000);
    lifeTimer = setInterval(life, 500);
  };
  // someone is playing with it: it keeps quiet for a moment
  function touched() {
    const now = Date.now();
    talkAt = Math.max(talkAt, now + 4500);
    anticAt = Math.max(anticAt, now + 14000);
  }

  // the silly things. Each is a short scene; a key press or a drag cuts it short.
  // walk into the side of a picture so it reacts, say something about it, walk back
  async function anticBump() {
    const sup = standing();
    if (!sup?.stable) return false;
    const g = geometry();
    const vt = viewTop();
    const found = [];
    for (const dir of [1, -1]) {
      for (let k = 1; k <= 9; k += 1) {
        const px = x + dir * k * S;
        if (px < 0 || px > g.width - S) break;
        const b = blocked(px, y);
        if (b) {
          if (b.hit && b.y2 > vt + S && b.y1 < vt + window.innerHeight - S) found.push({ dir, steps: k - 1, box: b });
          break;
        }
        if (!supportAt(px, y + S)?.stable) break;
      }
    }
    if (!found.length) return false;
    const { dir, steps, box } = found.sort((a, b) => a.steps - b.steps)[0];
    for (let i = 0; i < steps; i += 1) {
      await tumble(dir);
      if (interrupt) throw CANCEL;
    }
    // a last small hop right up to it (as close as it ever stands to a wall), then the shove
    const back = x;
    const near = dir > 0 ? box.x1 - S - CLEAR : box.x2 + CLEAR;
    if (Math.abs(near - x) > 2) await hop(near, y, 0.15);
    await nap(120);
    await bonk(dir, true, () => onHit?.(box));
    feel("happy", 2600);
    lookAt((box.x1 + box.x2) / 2, (box.y1 + box.y2) / 2, 2600);
    await nap(250);
    await nap(speak({ event: "hit", label: box.label, pending: box.pending }) + 300);
    if (Math.abs(back - x) > 2) await hop(back, y, 0.15);
    for (let i = 0; i < steps; i += 1) {
      await tumble(-dir);
      if (interrupt) throw CANCEL;
    }
    thud(0.6);
    return true;
  }
  // standing on a picture: a jump, and it lands on it with a stomp
  async function anticStomp() {
    const f = standing()?.floor;
    if (!f?.box?.hit) return false;
    await hop(x, y, 0.9);
    onHit?.(f.box);
    feel("happy", 2200);
    await nap(speak({ event: "hit", label: f.box.label, pending: f.box.pending }) + 300);
    return true;
  }
  // stretching its legs: two small hops, or one tip out and back
  async function anticFidget() {
    const sup = standing();
    if (!sup?.stable) return false;
    const dir = Math.random() < 0.5 ? 1 : -1;
    const roomy = canStep(dir) && supportAt(x + dir * S, y + S)?.stable;
    if (roomy && Math.random() < 0.6) {
      await tumble(dir);
      await nap(260);
      await tumble(-dir);
      thud(0.6);
    } else {
      await hop(x, y, 0.3);
      await nap(90);
      await hop(x, y, 0.55);
    }
    await nap(speak({ event: "fidget" }) + 200);
    return true;
  }
  // nodding off: its eyes close, until something moves
  async function anticDoze() {
    look.sleep = true;
    try {
      say("z  z  z", 4200);
      const moved = lastPointer;
      const ep = epoch;
      const end = performance.now() + rand(4200, 6500);
      while (performance.now() < end && lastPointer === moved) {
        await new Promise((r) => setTimeout(r, 80));
        if (ep !== epoch || !alive || interrupt) throw CANCEL;
      }
    } finally {
      look.sleep = false;
    }
    hush();
    feel("curious", 900);
    await nap(350);
    await nap(speak({ event: "wake" }) + 200);
    return true;
  }
  async function antic() {
    if (acting) return;
    acting = true;
    interrupt = false;
    const release = hold();
    try {
      geometry(300);
      // it prefers having a go at a picture when one is in reach
      const order = [anticStomp, anticBump, ...[anticFidget, anticDoze].sort(() => Math.random() - 0.5)];
      if (Math.random() < 0.35) order.push(order.splice(1, 1)[0]); // but not every time
      for (const scene of order) if (await scene()) break;
      await settleDown();
    } catch (e) {
      if (e !== CANCEL) throw e;
    } finally {
      look.sleep = false;
      release();
      acting = false;
      checkRiding();
      touched();
    }
  }

  // ---- hands: drag it anywhere, let go and it drops; a tap opens "Ask Fany" ----
  el.addEventListener("pointerdown", (e) => {
    if (!el.dataset.ready || (busy && !acting)) return;
    e.preventDefault();
    interrupt = true;
    if (acting) return; // let the scene end first
    el.setPointerCapture(e.pointerId);
    touched();
    played = Date.now();
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
    place(clamp(drag.x0 + dx, EDGE, geometry().width - S - EDGE), Math.max(0, drag.y0 + dy));
  });
  const release = async () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    delete el.dataset.dragging;
    touched();
    try {
      if (!moved) {
        onTap?.();
        feel("happy", 900);
        await hop(x, y, 0.3);
      } else {
        invalidate();
        await unstick();
        await settleDown();
      }
    } catch (e) {
      if (e !== CANCEL) throw e;
    }
    select(false);
    checkRiding();
  };
  el.addEventListener("pointerup", release);
  el.addEventListener("pointercancel", release);

  // ---- following the page ----
  // Homepage: it belongs on the photo while the photo is on screen, otherwise on the links,
  // and it gets from one to the other by its own rules (the route in the sketch).
  // Every other page: it lives on the links, and drops back onto them if it's left behind.
  let scrollTimer;
  const inView = () => {
    const top = viewTop();
    const mid = y + S / 2;
    return mid > top + S * 0.25 && mid < top + window.innerHeight - S * 0.25;
  };
  const titleFloor = () =>
    floors()
      .filter((f) => f.tag === "title")
      .sort((a, b) => a.y - b.y || a.x1 - b.x1)[0];
  // it can't get there by its own rules: it blinks out and back in, like a layer switched off and on
  async function blinkTo(tx, ty) {
    const done = hold();
    try {
      await el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: "steps(3)" }).finished;
      place(tx, ty);
      await el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "steps(4)" }).finished;
    } catch {
      /* cancelled */
    } finally {
      done();
    }
  }
  // photo → links: across onto the title, right along it and off the end, through the thin line
  // onto the pictures, left along their tops and off into the side rail, down onto the links
  async function stepDown() {
    const sup = standing();
    if (!sup) return settleDown();
    const f = sup.floor;
    const g = geometry();
    if (f.rest) {
      const at = f.at ?? x; // lined up with the links' text
      if (Math.abs(x - at) >= S * 0.5 && canStep(Math.sign(at - x))) return tumble(Math.sign(at - x));
      return false;
    }
    if (f.ground) return "lost";
    if (f.home) {
      const title = titleFloor();
      if (title) return hop(title.x1, title.y - S, 0.25); // a small step across onto the start of the title
    }
    if (f.kind === "ledge" && sup.all.every((q) => q.kind === "ledge")) {
      // on the line under the intro: over the rail it drops straight to the links, otherwise onto the pictures
      const overRail = x + S <= (g.contentX ?? 0) + 1;
      if (!overRail && g.casesX2 && x + S / 2 > g.casesX2 && canStep(-1)) return tumble(-1);
      const under = floorBelow(x, y + S, true);
      if (!under) return "lost";
      await fall(under.y - S);
      return settleDown();
    }
    // the intro is walked to the right, off its end; the pictures to the left, into the rail
    const dir = f.y <= (g.lineY ?? Infinity) - GAP ? 1 : -1;
    if (!canStep(dir)) return "lost";
    await tumble(dir);
    return settleDown();
  }
  // links → photo, the way down in reverse: one long flight up to the thin line, landing to the
  // right of the intro; a short flight onto the end of the title; left along it; a hop onto the photo
  async function stepHome() {
    const sup = standing();
    if (!sup) return settleDown();
    const g = geometry();
    if (sup.floor.home) {
      if (Math.abs(x - g.perch.x) > 1) await hop(g.perch.x, g.perch.y, 0.15);
      return false;
    }
    const home = floors().find((f) => f.home);
    const title = titleFloor();
    const line = floors().find((f) => f.kind === "ledge" && f.tag === "line");
    const foot = y + S;
    if (Math.abs(home.y - foot) <= S * 0.5) {
      // level with the photo, on the title: along it, then a short hop across the gap
      if (x - S > g.perch.x + S && canStep(-1) && supportAt(x - S, foot)?.stable) return tumble(-1);
      return hop(g.perch.x, g.perch.y, 0.3);
    }
    if (home.y > foot) return "lost"; // somehow above everything
    // below the line: up to it. On it: up onto the title (or straight onto the photo).
    const target = line && foot > line.y + level() ? line : title || home;
    const plan = planStairsTo(target, 1) || (target !== home && foot <= (line?.y ?? foot) + level() ? planStairsTo(home) : null);
    if (!plan) return "lost";
    return climb(plan);
  }
  let followedAt = window.scrollY; // where the page was when it last set off
  async function follow() {
    if (following || acting || !alive || busy || drag || !el.dataset.ready) return;
    // no real scrolling since last time (a stray scroll event): it stays exactly where it is
    if (Math.abs(window.scrollY - followedAt) < 4) return;
    followedAt = window.scrollY;
    const g = geometry();
    const r = rest();
    following = true;
    try {
      if (!g.perch) {
        // an ordinary page: left behind, it drops back in from the top of the screen onto the links
        if (inView() || !r) return;
        place(r.at, viewTop() - S * 1.5);
        await fall(r.y - S);
        return;
      }
      const wantHome = () => g.perch.y + S > viewTop() && g.perch.y < viewTop() + window.innerHeight;
      const here = standing()?.floor;
      // someone put it somewhere and it's still in sight: it stays
      if (inView() && !here?.home && !here?.rest) return;
      for (let i = 0; i < 90 && alive && !drag; i += 1) {
        const home = wantHome();
        const at = standing()?.floor;
        if (home ? at?.home : at?.rest || !rest()) {
          if (home ? Math.abs(x - g.perch.x) < 1 : Math.abs(x - (at?.at ?? x)) < S * 0.5) break;
        }
        const top = viewTop();
        // following the page it hurries: brisk on screen, quicker still while nobody can see it
        pace = y + S < top || y > top + window.innerHeight ? 0.3 : 0.7;
        const moved = home ? await stepHome() : await stepDown();
        if (moved === "lost") {
          const to = rest();
          if (home) await blinkTo(g.perch.x, g.perch.y);
          else if (to) await blinkTo(to.at, to.y - S);
          break;
        }
        if (moved === false) break;
      }
    } catch (e) {
      if (e !== CANCEL) throw e;
    } finally {
      pace = 1;
      following = false;
      checkRiding();
    }
  }
  // sitting on the links: it rides along with them, pinned to the screen so it never lags behind
  let riding = false;
  function checkRiding() {
    if (!alive) return;
    riding = !!standing()?.floor?.rest;
    pin(riding && !busy && !drag);
  }
  const onResize = () => invalidate();
  window.addEventListener("resize", onResize);
  const onScroll = (e) => {
    // only the page itself scrolling counts: a scrolling box inside a card (a demo, a carousel)
    // must never send the bot off on its own
    const t = e?.target;
    if (t && t !== document && t !== document.documentElement && t !== document.body && t !== window) return;
    if (Math.abs(window.scrollY - geoScroll) > 150) invalidate();
    if (riding && !busy && !drag) {
      restAt = -1;
      const r = rest();
      if (r) y = r.y - S; // the links' spot now
      pin(true);
      apply();
    }
    if (Date.now() < selfScrollUntil) {
      followedAt = window.scrollY; // it scrolled the page itself, to stay in view: nothing to follow
      return;
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(follow, 260); // once the page settles
  };
  // capture, so it hears the page scroll whichever element does the scrolling
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });

  // ---- the face: a live character ----
  // The head (the whole box) turns toward what it looks at, and the eyes go further on their own:
  // looking right, both eyes slide over until the leading one is nearly at the wall of its box,
  // they draw closer together and the leading one narrows, the way a face does when it turns.
  // The mouth follows, moves with every letter it says, rounds into an "o" when it falls,
  // and it blinks, glances about, breathes, squints when it lands.
  let gazeDir = 0; // set while tipping: the eyes look the way it's going
  let lastPointer = 0;
  let lastPointerNear = 0;
  const look = {
    hx: 0, hy: 0, thx: 0, thy: 0, // the head: where it is turned, and where it wants to turn
    ex: 0, ey: 0, tex: 0, tey: 0, // the eyes' own glance on top
    gaze: 0,
    open: 0, wide: 0, squint: 0, smile: 0, round: 0, // the expression, each 0 → 1
    blink: 0, lidL: 0, lidR: 0, shutL: 0, shutR: 0, // eyelids (shut: where each wants to be)
    px: 0, py: 0, // the cursor, seen from the bot
    up: 0, // looking up until this time (planning stairs)
    sleep: false,
    focus: null, // { x, y, until } in page coordinates: something it is looking at
    depth: 1, // 0: a flat square (just made); 1: a block that turns its head
    flat: false,
  };
  const MOODS = {
    idle: {},
    fall: { wide: 1, round: 1, open: 0.3 },
    land: { squint: 0.8 },
    jump: { wide: 0.4 },
    effort: { squint: 1, smile: -0.7 },
    happy: { squint: 0.45, smile: 1 },
    curious: { wide: 0.55 },
    dizzy: { wide: 0.6, round: 0.7, open: 0.16 },
  };
  let mood = "idle";
  let moodUntil = 0;
  function feel(m, t = 600) {
    mood = m;
    moodUntil = performance.now() + t;
  }
  function lookAt(px, py, t = 1500) {
    look.focus = { x: px, y: py, until: performance.now() + t };
  }
  let dartAt = 0;
  let wanderAt = 0;
  let nextBlink = Date.now() + 1800;
  let blinkStart = -1;
  let blinksLeft = 0;
  const onPointer = (e) => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    look.px = clamp(dx / (window.innerWidth * 0.35), -1, 1);
    look.py = clamp(dy / (window.innerHeight * 0.35), -1, 1);
    lastPointer = Date.now();
    if (Math.hypot(dx, dy) < S * 2.5) lastPointerNear = lastPointer;
  };
  const setEl = (node, o) => {
    for (const k in o) node.setAttribute(k, o[k].toFixed(2));
  };
  const VOWEL = { a: 0.5, o: 0.46, e: 0.32, i: 0.26, u: 0.3, y: 0.24 };
  const mouthFor = (ch) => {
    const c = (ch || " ").toLowerCase();
    if (VOWEL[c]) return VOWEL[c];
    if ("mbp".includes(c)) return 0.02; // lips together
    if (/[a-z0-9]/.test(c)) return 0.15;
    return 0.04; // a space, a comma: a breath
  };
  function drawFace(now) {
    const gx = clamp(look.hx * 0.55 + look.gaze + look.ex, -1, 1);
    const gy = clamp(look.hy * 0.6 + look.ey, -1, 1);
    const a = Math.abs(gx);
    const o = look.open;
    const pad = 6; // they never leave the face
    const rx0 = lerp(17, 14, o) * (1 + 0.12 * look.wide);
    const ry0 = lerp(28, 22.5, o) * (1 + 0.14 * look.wide) * (1 - 0.5 * look.squint) * (1 - 0.18 * Math.max(0, gy));
    const apart = lerp(52, 42, o);
    const spacing = apart * (1 - 0.3 * a); // they draw closer as it looks aside
    const lead = rx0 * (1 - 0.36 * a); // the eye nearer the wall narrows
    const trail = rx0 * (1 - 0.08 * a);
    const leadC = lerp(70 + apart / 2, 140 - pad - rx0 * 0.64, a); // and slides right up to the wall
    const [cxL, cxR, rxL, rxR] = gx >= 0 ? [leadC - spacing, leadC, trail, lead] : [140 - leadC, 140 - leadC + spacing, lead, trail];
    const cy = clamp(lerp(53, 35, o) + gy * (gy < 0 ? 16 : 13), pad + ry0, 140 - pad - ry0 - 16);
    const ryL = Math.max(ry0 * (1 - 0.95 * Math.max(look.blink, look.lidL)), 1.3);
    const ryR = Math.max(ry0 * (1 - 0.95 * Math.max(look.blink, look.lidR)), 1.3);
    // a closing lid comes down from above, so the eye sinks a little as it shuts
    setEl(eyeL, { cx: cxL, cy: cy + (ry0 - ryL) * 0.3, rx: rxL, ry: ryL });
    setEl(eyeR, { cx: cxR, cy: cy + (ry0 - ryR) * 0.3, rx: rxR, ry: ryR });
    // the mouth: a soft shape that opens, rounds, and curls at the corners
    const mr = lerp(1.7, 33, Math.pow(o, 0.85));
    const flat = (lerp(6, 44, o) + Math.abs(look.smile) * 7) * (1 - 0.22 * a);
    const w = lerp(flat, Math.max(4, mr * 0.95 + 3), look.round);
    const mx = 70 + gx * 20;
    const my = lerp(116, 97, o) + gy * 5;
    const curl = look.smile * 5.5;
    const yc = my - curl;
    const k = 1.33 * mr;
    const f = (v) => v.toFixed(2);
    mouth.setAttribute(
      "d",
      `M${f(mx - w)} ${f(yc)}C${f(mx - w)} ${f(yc - k + 2.2 * curl)} ${f(mx + w)} ${f(yc - k + 2.2 * curl)} ${f(mx + w)} ${f(yc)}` +
        `C${f(mx + w)} ${f(yc + k + 2.2 * curl)} ${f(mx - w)} ${f(yc + k + 2.2 * curl)} ${f(mx - w)} ${f(yc)}Z`
    );
    // flat, it can't turn or lean at all: only its front shows, a plain square
    yawEl.style.transform = `rotateY(${(look.hx * 24 * look.depth).toFixed(2)}deg)`;
    // it only ever leans back (there's floor in the way of leaning forward), and it breathes
    const breath = busy ? 1 : 1 + Math.sin(now / 1300) * (look.sleep ? 0.02 : 0.011);
    cubeEl.style.transform = `rotateX(${(Math.max(0, -look.hy) * 14 * look.depth).toFixed(2)}deg) scaleY(${breath.toFixed(4)})`;
  }
  let raf = 0;
  let prev = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    const t = Date.now();
    const moving = !!el.dataset.tipping || busy > 0;
    if (mood !== "idle" && now > moodUntil) mood = "idle";
    const M = MOODS[mood] || MOODS.idle;

    // where the head turns
    if (look.focus && now < look.focus.until) {
      look.thx = clamp((look.focus.x - (x + S / 2)) / (S * 3), -1, 1);
      look.thy = clamp((look.focus.y - (y + S / 2)) / (S * 3), -1, 1);
    } else if (look.sleep) {
      look.thx = 0;
      look.thy = 0.5; // its head drops
    } else if (now < look.up) {
      look.thy = -0.9;
    } else if (mood === "fall") {
      look.thx = 0;
      look.thy = 0.7; // watching the ground come up
    } else if (mood === "dizzy") {
      look.thx = Math.sin(now / 90) * 0.7;
      look.thy = Math.cos(now / 90) * 0.5;
    } else if (moving) {
      look.thx = 0;
      look.thy = 0;
    } else if (t - lastPointer < 3500) {
      look.thx = look.px; // someone's there: it watches the cursor
      look.thy = look.py;
    } else if (t > wanderAt) {
      // nobody around: it looks about on its own, and often straight back out at you
      const spots = [[0, 0], [0, 0], [-0.9, 0], [0.9, 0], [0, -0.8], [0.6, -0.5], [-0.6, -0.4], [0.5, 0.4]];
      [look.thx, look.thy] = spots[(Math.random() * spots.length) | 0];
      wanderAt = t + rand(1400, 3600);
    }
    // quick glances of the eyes alone: a jump, then a hold, like real eyes
    if (t > dartAt) {
      const calm = moving || look.sleep || (speech && !speech.done);
      look.tex = calm ? 0 : rand(-0.4, 0.4);
      look.tey = calm ? 0 : rand(-0.3, 0.25);
      dartAt = t + rand(600, 2400);
    }
    const quick = 1 - Math.pow(0.00001, dt);
    look.ex += (look.tex - look.ex) * quick;
    look.ey += (look.tey - look.ey) * quick;
    const turn = 1 - Math.pow(0.0015, dt);
    look.hx += (look.thx - look.hx) * turn;
    look.hy += (look.thy - look.hy) * turn;
    if (!el.dataset.tipping && t - lastMove > 450) gazeDir = 0;
    look.gaze += (gazeDir * 0.9 - look.gaze) * (1 - Math.pow(0.002, dt));

    // what it is saying, one letter at a time, and the shape its mouth makes for it
    let mouthWant = drag ? 0.9 : M.open || 0;
    if (speech && !speech.done) {
      const n = Math.floor((now - speech.t0) / TYPE);
      if (n !== speech.n) {
        speech.n = n;
        speech.textEl.textContent = speech.text.slice(0, n + 1);
        if (n >= speech.text.length - 1) {
          speech.done = true;
          speech.addKeys();
        }
      }
      if (!speech.done && !drag) mouthWant = mouthFor(speech.text[n]);
    }
    const ease = 1 - Math.pow(0.0001, dt);
    look.open += (mouthWant - look.open) * (speech && !speech.done ? 1 - Math.pow(1e-7, dt) : ease);
    look.wide += ((M.wide || 0) + (t - lastPointerNear < 600 ? 0.25 : 0) - look.wide) * ease;
    look.squint += ((M.squint || 0) - look.squint) * ease;
    look.smile += ((M.smile ?? 0.12) - look.smile) * ease;
    look.round += ((M.round || 0) - look.round) * ease;

    // eyelids: asleep they stay shut; awake they blink, sometimes twice
    const shutL = look.sleep ? 1 : look.shutL;
    const shutR = look.sleep ? 1 : look.shutR;
    const lid = 1 - Math.pow(look.sleep ? 0.05 : 0.0005, dt);
    look.lidL += (shutL - look.lidL) * lid;
    look.lidR += (shutR - look.lidR) * lid;
    if (t > nextBlink && blinkStart < 0) {
      blinkStart = t;
      if (!blinksLeft) blinksLeft = Math.random() < 0.22 ? 2 : 1;
    }
    if (blinkStart >= 0) {
      const p = (t - blinkStart) / 140;
      look.blink = p < 1 ? Math.sin(p * Math.PI) : 0;
      if (p >= 1) {
        blinkStart = -1;
        blinksLeft -= 1;
        nextBlink = t + (blinksLeft ? 90 : rand(1800, 5200));
      }
    }
    look.depth += ((look.flat ? 0 : 1) - look.depth) * (1 - Math.pow(0.02, dt)); // gains its depth over about a second
    drawFace(now);
    raf = requestAnimationFrame(tick);
  }
  drawFace(performance.now());
  if (!still) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(tick);
  }

  const onVisibility = () => {
    if (!document.hidden) touched();
  };
  document.addEventListener("visibilitychange", onVisibility);

  // a move handed to a scene outside: abandoned moves just end, they never throw
  const safe = (fn) => async (...args) => {
    try {
      await fn(...args);
      return true;
    } catch (e) {
      if (e !== CANCEL) throw e;
      return false;
    }
  };
  const stopAll = () => {
    epoch++;
    busy = 0;
    interrupt = true;
    el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    stairPath.getAnimations().forEach((a) => a.cancel());
    stairPath.removeAttribute("d");
    stair = null;
    body.style.transform = "";
    feat.style.transform = "";
    delete el.dataset.tipping;
    following = false;
    acting = false;
    look.sleep = false;
    held.clear();
    queue.length = 0;
  };

  const api = {
    el,
    get size() {
      return S;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    // from wherever it stands, back to its place above the photo, by its own rules
    // (stairs, tipping along the title, a hop across): the homepage's way up
    async goHome() {
      invalidate();
      try {
        for (let i = 0; i < 90 && alive && geometry().perch; i += 1) {
          const moved = await stepHome();
          if (moved === "lost") await blinkTo(geometry().perch.x, geometry().perch.y);
          if (moved === "lost" || moved === false) break;
        }
      } catch (e) {
        if (e !== CANCEL) throw e;
      }
    },
    tumble: safe(tumble),
    fall: safe(fall),
    hop: safe(hop),
    bonk: safe(bonk),
    place,
    select,
    say,
    feel,
    lookAt,
    // do something silly now, or say a line about where it is (they also happen on their own)
    antic: () => antic(),
    speak: (ctx) => speak(ctx),
    // for looking at it while developing: where it is, what holds it up
    debug: () => ({ x, y, S, busy, pinned, mood, standing: standing(), floors: floors(), boxes: geometry().boxes }),
    planTo: (tag) => planStairsTo(floors().find((f) => (tag === "home" ? f.home : f.tag === tag))),
    // a flat square, no depth (the opening: just made), or a block again; depth eases in
    setFlat(on) {
      look.flat = on;
      if (on) look.depth = 0;
      drawFace(performance.now());
    },
    // eyes shut (the opening: it has a body but isn't awake yet)
    shutEyes() {
      look.shutL = look.shutR = look.lidL = look.lidR = 1;
      drawFace(performance.now());
    },
    // it wakes: one eye, then the other, then a couple of blinks
    async wake() {
      look.shutL = 0;
      await new Promise((r) => setTimeout(r, 380));
      look.shutR = 0;
      await new Promise((r) => setTimeout(r, 420));
      blinksLeft = 2;
      nextBlink = 0;
    },
    // after the opening (or straight away): sit in its place and start living
    settle() {
      invalidate();
      resize();
      const g = geometry();
      const r = rest();
      look.shutL = look.shutR = 0;
      look.flat = false;
      if (g.perch) place(g.perch.x, g.perch.y);
      else if (r) place(r.at, r.y - S);
      el.dataset.ready = "true";
      checkRiding();
      startLife();
    },
    // an ordinary page: it drops in from the top of the screen onto the links
    async arrive() {
      invalidate();
      resize();
      const r = rest();
      if (!r) return api.settle();
      if (still) return api.settle();
      place(r.at, viewTop() - S * 1.5);
      el.dataset.appear = "true";
      await safe(fall)(r.y - S);
      if (alive) api.settle();
    },
    // stop everything and wait (the opening is about to play again)
    pause() {
      stopAll();
      clearInterval(lifeTimer);
      clearTimeout(scrollTimer);
      hush();
      drag = null;
      delete el.dataset.dragging;
      delete el.dataset.ready;
      select(false);
      pin(false);
    },
    // the page changed size: put it back in its place
    reflow() {
      if (drag) return;
      stopAll();
      interrupt = false;
      invalidate();
      if (el.dataset.ready) api.settle();
      else resize();
    },
    destroy() {
      alive = false;
      epoch++;
      clearInterval(lifeTimer);
      clearTimeout(sayTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      el.remove();
      stairSvg.remove();
    },
  };
  return api;
}
