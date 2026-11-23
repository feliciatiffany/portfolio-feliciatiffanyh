// About me + Timeline (combined). Timeline used to live at /built.
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SECTIONS } from "../lib/about.js";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import useReveal from "../lib/useReveal.js";
import Built from "./Built.jsx";

const ELSEWHERE = [
  { to: "/#case-study", label: "Case Study" },
  { to: "/blog", label: "Playground" },
];

export default function About() {
  const root = useReveal([]);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#timeline") return;
    const t = window.setTimeout(() => {
      document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <section className="about" ref={root}>
      <header className="built-head about-head">
        <DitherImage
          className="avatar avatar--scramble about-avatar"
          src="/media/thumbs/profile.webp"
          alt="Felicia Hertada"
          contrast={1.2}
          brightness={0.04}
        />
        <ScrambledText as="h1" className="built-title" {...historyTitle}>
          About me
        </ScrambledText>
        <p className="built-sub">An engineer &amp; product designer, in a few honest notes.</p>
      </header>

      <div className="about__body">
        {SECTIONS.map((s) => (
          <section key={s.title} className="about__section reveal">
            <h2 className="about__h" data-role={s.role}>
              {s.title}
            </h2>
            <ul className="about__list">
              {s.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}

        <nav className="about__section about__more reveal" aria-label="More">
          <h2 className="about__h">Elsewhere here</h2>
          <p className="about__links">
            {ELSEWHERE.map((l) => (
              <Link key={l.to} to={l.to} className="about__link">
                ↳ {l.label}
              </Link>
            ))}
          </p>
        </nav>
      </div>

      {/* Timeline, folded into About */}
      <div id="timeline" className="about-timeline">
        <Built embedded />
      </div>
    </section>
  );
}
