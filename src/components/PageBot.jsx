// PageBot — Fany bot on every page but the homepage (which has its own, BlockBot.jsx, with the
// opening). It drops in from the top of the screen and lives on the stack of links in the
// bottom-left corner, riding along as the page scrolls. Arrow keys roll it along the bottom of the
// screen; ↑ builds stairs up to a heading or a picture, and from then on the page's words and
// pictures are its floors and walls, by the same rules as on the homepage (src/lib/blockbot.js).
// What it says is about the page it is on (src/lib/botLines.js).
import { useEffect } from "react";
import { mountBlockBot } from "../lib/blockbot.js";
import { botLines } from "../lib/botLines.js";
import { lineBoxes, rectBox, hitCard } from "../lib/botWorld.js";
import { token } from "../lib/tokens.js";
import "./BlockBot.css";

// the words it can stand on: headings and the titles of cards (body text would leave it no room to move)
const WORDS = "h1, h2, h3, .pg-card__caption, .blog-item__title, .story__tag";
// the pictures: solid too, and the ones inside a card react when it walks into them
const PICTURES = "img, video, .pg-card__media";
const CARD = ".pg-card, .blog-item, .home-case";

const px = (name, fallback) => parseFloat(token(name)) || fallback;

export default function PageBot({ page }) {
  useEffect(() => {
    // it needs the left margin the links sit in, and no character on a phone
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const main = document.querySelector(".main");
    if (!main) return;

    const stage = document.createElement("div");
    stage.className = "bot-stage";
    document.body.appendChild(stage);
    const size = px("space-bot-size", 48);

    // where it rests: on top of the links when the page has them, otherwise the same corner of the
    // screen. The floor runs the whole width of the screen at that height, so it has room to roll.
    const measureRest = () => {
      const s = stage.getBoundingClientRect();
      const width = document.querySelector(".page-grid")?.getBoundingClientRect().right ?? window.innerWidth;
      const foot = document.querySelector(".page-grid > .foot");
      const f = foot && getComputedStyle(foot).position === "fixed" ? foot.getBoundingClientRect() : null;
      const top = f ? f.top : window.innerHeight - px("space-6", 24);
      const left = f ? f.left : px("space-5", 20);
      return { y: top - s.top, x1: 0, x2: width - s.left, at: left - s.left };
    };

    // The world: only what is near the screen is read, since a long page has hundreds of headings
    // and pictures (the bot asks again as the page scrolls).
    const measure = () => {
      const s = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const near = (r) => r.bottom > -vh && r.top < vh * 2 && r.width > 2 && r.height > 2;
      const boxes = [];
      for (const node of main.querySelectorAll(WORDS)) {
        if (!near(node.getBoundingClientRect())) continue;
        const tag = /^H\d$/.test(node.tagName) ? "heading" : "caption";
        // a card's caption is its title and its date: the title is what the bot calls it
        const label = (node.querySelector(".pg-card__title") || node).textContent.trim().slice(0, 40);
        // a card's caption belongs to its picture: stairs may cross in front of a card when there
        // is no clear way; headings never
        const soft = node.matches(".pg-card__caption");
        for (const b of lineBoxes(node, s.left, s.top)) boxes.push({ ...b, tag, label, soft });
      }
      for (const node of main.querySelectorAll(PICTURES)) {
        const frame = node.closest(".pg-card__media");
        if (frame && frame !== node) continue; // the card's frame already stands for the picture inside it
        const r = node.getBoundingClientRect();
        if (!near(r) || r.width < size * 1.5 || r.height < size) continue;
        const card = node.closest(CARD);
        boxes.push({
          ...rectBox(r, s.left, s.top),
          tag: "picture",
          label: card?.querySelector(".pg-card__title, .blog-item__title")?.textContent.trim() || "",
          el: card,
          hit: !!card,
          soft: true,
        });
      }
      return {
        size,
        width: (document.querySelector(".page-grid")?.getBoundingClientRect().right ?? window.innerWidth) - s.left,
        bottom: document.documentElement.scrollHeight,
        ledges: [],
        boxes,
      };
    };

    const bot = mountBlockBot(stage, {
      name: "Lucu",
      lines: botLines(page),
      measure,
      measureRest,
      still: reduce,
      onTap: () => window.dispatchEvent(new CustomEvent("fanyllm:open")), // FanyLLM.jsx listens for this
      onHit: (box) => hitCard(box.el),
    });
    if (import.meta.env.DEV) window.__fanybot = bot; // a handle for the console while developing

    // a moment for the page itself to arrive first, then it drops in
    const start = setTimeout(() => void bot.arrive(), 500);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bot.reflow(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(start);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      bot.destroy();
      stage.remove();
    };
  }, [page]);

  return null;
}
