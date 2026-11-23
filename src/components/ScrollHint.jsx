// ScrollHint — "Scroll ↓" in the corner of the homepage's first screen. It speaks the same
// language as the page titles: the word scrambles into dots under the cursor, scrambles away
// as soon as the page scrolls, and scrambles back when you return to the top.
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { historyTitle } from "./ScrambledText.jsx";

gsap.registerPlugin(ScrambleTextPlugin);

const WORD = "Scroll";
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ScrollHint({ href = "#case-study" }) {
  const root = useRef(null);
  const word = useRef(null);
  const [gone, setGone] = useState(false);

  // gone once the page has moved a little; back at the very top
  useEffect(() => {
    const on = () => setGone(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const scramble = (to, opts = {}) =>
    gsap.to(word.current, {
      duration: historyTitle.duration * 0.6,
      ease: "none",
      overwrite: true,
      scrambleText: { text: to, chars: historyTitle.scrambleChars, speed: historyTitle.speed },
      ...opts,
    });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reduce()) {
      el.style.opacity = gone ? "0" : "1";
      return;
    }
    if (gone) {
      // letters turn to dots, then the dots fade
      scramble("·".repeat(WORD.length));
      gsap.to(el, { opacity: 0, duration: 0.35, delay: 0.45, overwrite: true });
    } else {
      gsap.to(el, { opacity: 1, duration: 0.2, overwrite: true });
      scramble(WORD); // and come back as the word
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gone]);

  // under the cursor it scrambles and settles back, like a title
  const onEnter = () => !gone && !reduce() && scramble(WORD, { duration: historyTitle.duration * 0.5 });

  return (
    <a ref={root} href={href} className="home-scroll" onMouseEnter={onEnter} aria-label="Scroll to the case studies">
      <span ref={word} className="home-scroll__word">{WORD}</span> <span aria-hidden="true">↓</span>
    </a>
  );
}
