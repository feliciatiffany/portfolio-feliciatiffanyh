// src/pages/About.jsx — About me, laid out like the other pages: centered heading, one reading column
import React from "react";
import { Link } from "react-router-dom";
import { SECTIONS } from "../lib/about.js";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import useReveal from "../lib/useReveal.js";

const ELSEWHERE = [
  { to: "/built", label: "Timeline" },
  { to: "/study-case", label: "Study Case" },
  { to: "/blog", label: "Blog" },
];

export default function About() {
  const root = useReveal([]);
  return (
    <section className="about" ref={root}>
      <header className="built-head about-head">
        <DitherImage className="avatar avatar--scramble about-avatar" src="/media/thumbs/profile.webp" alt="Felicia Hertada" contrast={1.2} brightness={0.04} />
        <ScrambledText as="h1" className="built-title" {...historyTitle}>
          About me
        </ScrambledText>
        <p className="built-sub">An engineer &amp; product designer, in a few honest notes.</p>
      </header>

      <div className="about__body">
        {SECTIONS.map((s) => (
          <section key={s.title} className="about__section reveal">
            <h2 className="about__h" data-role={s.role}>{s.title}</h2>
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
              <Link key={l.to} to={l.to} className="about__link">↳ {l.label}</Link>
            ))}
          </p>
        </nav>
      </div>
    </section>
  );
}
