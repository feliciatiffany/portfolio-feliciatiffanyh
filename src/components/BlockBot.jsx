// BlockBot — Fany bot on the homepage. The first visit of a session plays the opening:
// the block appears in the middle of an empty page, the lines draw in, it drops onto the
// line and tips itself over to the photo's spot, gets "selected" like a layer, the intro
// text appears, the photo fades in underneath and the bot hops up to sit on top of it.
// After that: arrow keys move it (every line of text is a platform), it can be dragged
// anywhere, a tap opens "Ask Fany", and it follows the page when you scroll.
import { useEffect, useRef } from "react";
import { mountBlockBot } from "../lib/blockbot.js";
import "./BlockBot.css";

const SEEN = "fanybot-intro";
const sleep = (t) => new Promise((r) => setTimeout(r, t));

// whether this visit opens with the bot's entrance (first visit of the session, room, motion allowed)
export function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 700px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SEEN) !== "1";
  } catch {
    return true;
  }
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
      const gap = parseFloat(getComputedStyle(shell).getPropertyValue("--home-gap")) || 20;
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
          return f ? { y: f.top - s.top, x1: 0, x2: h.left - s.left } : null;
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
      return f ? { y: f.top - s.top, x1: 0, x2: h.left - s.left } : null;
    };
    const bot = mountBlockBot(shell, { name: "Fany bot", lines, measure, measureRest, onTap, still: reduce });
    let alive = true;

    const play = async () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN) === "1";
      } catch {
        /* storage blocked: play it */
      }
      if (seen || reduce) {
        step(4);
        bot.settle();
        return;
      }
      const m = measure();
      const S = m.size;
      step(0); // empty page
      bot.place((m.width - S) / 2, window.innerHeight * 0.45 - S / 2);
      bot.el.dataset.appear = "true";
      await sleep(900);
      if (!alive) return;
      step(1); // the lines draw in
      await sleep(700);
      await bot.fall(m.lineY - S); // drops onto the line
      await sleep(250);
      await bot.walkTo(m.slot.x); // tips itself over to the photo's spot
      if (!alive) return;
      bot.select(true); // picked like a layer
      await sleep(450);
      await bot.hop(m.slot.x, m.slot.y, 0.15); // snaps into the frame
      await sleep(250);
      bot.select(false);
      step(2); // the intro text appears
      await sleep(1100);
      if (!alive) return;
      step(3); // the photo fades in under it
      await sleep(500);
      await bot.hop(m.perch.x, m.perch.y, 0.5); // and it hops up to sit on top
      if (!alive) return;
      bot.settle();
      bot.say("Hi! I’m Fany bot.");
      step(4);
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {
        /* fine */
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
