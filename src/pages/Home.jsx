// Homepage only — white grid with crosshair rules; no fill on the side rail.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import BlockBot, { introWillPlay } from "../components/BlockBot.jsx";
import ScrollHint from "../components/ScrollHint.jsx";
import Socials from "../components/Socials.jsx";
import LazyVideo from "../components/LazyVideo.jsx";
import { STUDY_CASES } from "../lib/studyCases.js";

const PROFILE_SRC = "/media/thumbs/profile.webp";

// Typed after "who also": edit freely
const ANYTHING = [
  "tells stories",
  "designs graphics",
  "builds side projects",
  "goes on side quests",
  "builds communities",
  "travels",
];

const RAIL = [
  { href: "#case-study", label: "Case Study", active: true },
  { to: "/playground", label: "Playground" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

function Typewriter({ words }) {
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduce ? words[0].length : 0);
  const [erasing, setErasing] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const word = words[i];
    let t;
    if (!erasing && n < word.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!erasing) t = setTimeout(() => setErasing(true), 1800);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35);
    else {
      setErasing(false);
      setI((i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [i, n, erasing, words, reduce]);
  return (
    <span
      className="home-typed"
      aria-live="off"
      data-typing={n > 0 && n < words[i].length ? "true" : undefined}
    >
      <span className="home-typed__word">{words[i].slice(0, n) || "\u200b"}</span>
      <span className="home-typed__caret" aria-hidden="true" />
    </span>
  );
}

function CaseCard({ c }) {
  const meta = c.year ? `${c.status} ${c.year}` : c.status;
  const body = (
    <>
      <span className={`home-case__media${c.image ? " shine" : ""}`}>
        {c.image?.type === "video" ? (
          <LazyVideo src={c.image.src} aria-label={c.image.alt} autoPlay />
        ) : c.image ? (
          <img src={c.image.src} alt={c.image.alt || ""} loading="lazy" />
        ) : (
          <span className="home-case__soon">In progress</span>
        )}
      </span>
      <span className="home-case__caption">
        <span className="home-case__title">{c.title}</span>
        <span className="home-case__meta">{meta}</span>
      </span>
    </>
  );
  return (
    <li className={`home-case${c.project ? "" : " is-pending"}`}>
      {c.project ? (
        <Link to={`/case-study/${c.project}`} className="home-case__link" data-cursor="Read">
          {body}
        </Link>
      ) : (
        <div className="home-case__link" data-cursor="In progress" title="In progress">
          {body}
        </div>
      )}
    </li>
  );
}

export default function Home() {
  const cases = [...STUDY_CASES].sort((a, b) => Number(!a.project) - Number(!b.project));

  useEffect(() => {
    if (window.location.hash !== "#case-study") return;
    const t = window.setTimeout(() => {
      document.getElementById("case-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  // the opening plays in steps (BlockBot): 0 empty, 1 lines, 2 photo, 3 words, 4 done
  const [intro, setIntro] = useState(() => (introWillPlay() ? 0 : 4));
  // once an opening has played, the intro is typed in by it (BlockBot), letter by letter;
  // without one, the letters scramble in on their own like every other title
  const [typedIn, setTypedIn] = useState(() => introWillPlay());
  const onStep = (n) => {
    if (n === 0) setTypedIn(true);
    setIntro(n);
  };
  // the links only show once the page has scrolled past the first screen's intro
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const shellRef = useRef(null);
  const avatarRef = useRef(null);
  const heroRef = useRef(null);

  return (
    <div className="home-shell" ref={shellRef} data-intro={intro < 4 ? intro : undefined} data-scrolled={scrolled || undefined}>
      <BlockBot shellRef={shellRef} avatarRef={avatarRef} heroRef={heroRef} onStep={onStep} />
      {/* Top-left cell: avatar centered on the hero band */}
      <div className="home-mark-cell">
        <Link
          to="/"
          className="home-rail__logo"
          aria-label="Play the opening again"
          data-cursor="Replay"
          ref={avatarRef}
          onClick={(e) => {
            // the photo plays the opening again (BlockBot.jsx takes this); where there is no
            // opening (phones, reduced motion) it just goes back to the top
            e.preventDefault();
            const taken = !window.dispatchEvent(new CustomEvent("fanybot:replay", { cancelable: true }));
            if (!taken) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <DitherImage
            className="avatar avatar--scramble home-rail__avatar"
            src={PROFILE_SRC}
            alt="Felicia Hertada"
            contrast={1.2}
            brightness={0.04}
          />
        </Link>
      </div>

      <header className="home-hero" aria-label="Intro" ref={heroRef}>
        <h1 className="home-intro">
          {/* letters near the cursor scramble into dots, like every page title */}
          {/* re-mounted when the opening reveals it, so it starts fresh for the typing */}
          <ScrambledText key={intro >= 3 ? "shown" : "waiting"} as="span" className="home-intro__lines" {...historyTitle} intro={!typedIn}>
            Hi, I’m{" "}
            <Link to="/about" className="home-mark" data-role="fany">
              Fany
            </Link>
            ! An{" "}
            <span className="home-mark" data-role="tech">
              Engineer &amp;
            </span>{" "}
            <span className="home-mark" data-role="graphic">
              Product Designer
            </span>
            ,
            <br />
            who also{" "}
          </ScrambledText>
          <span className="scrambled-text-sr">{ANYTHING.join(", ")}</span>
          {/* while the opening types the line above, these wait; then they start from the first word */}
          <Typewriter key={intro === 3 ? "waiting" : "going"} words={ANYTHING} />
        </h1>
      </header>

      {/* Lower-left: nav + socials, white like the page */}
      <aside className="home-rail" aria-label="Site">
        {/* nav and links come in level with the cards, then stay put while the cases scroll on */}
        <div className="home-rail__stick">
          <nav className="home-rail__nav" aria-label="Sections">
            {RAIL.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`home-rail__a${item.active ? " is-active" : ""}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className="home-rail__a">
                  {item.label}
                </Link>
              )
            )}
          </nav>
          {/* the links ride in the same block, at the bottom of the screen: scrolling up, they move
              down and away together with the nav instead of hanging on screen */}
          <div className="home-rail__foot">
            <Socials />
          </div>
        </div>
      </aside>

      {/* bottom-right of the first screen */}
      <ScrollHint />

      {/* the right margin: two empty cells, so the frame's lines run down both sides */}
      <div className="home-edge home-edge--top" aria-hidden="true" />
      <div className="home-edge home-edge--bottom" aria-hidden="true" />

      <section id="case-study" className="home-cases" aria-label="Case Study">
        <ul className="home-cases__grid">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </ul>
      </section>
    </div>
  );
}
