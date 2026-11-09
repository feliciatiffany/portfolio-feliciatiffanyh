// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ProximityFrame, ProximityTitle } from "../components/VariableProximity.jsx";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";

const SECTIONS = [
  {
    title: "What I love",
    role: "fany",
    lines: [
      "Research, and science especially. I can never get away from it.",
      "Traveling, going to concerts, and following life's side quests.",
      "Ghibli films and a good cup of matcha.",
      "Making things with my hands and with code, and seeing people play with them.",
    ],
  },
  {
    title: "What I think",
    role: "tech",
    lines: [
      "Conversation is the most basic way we share intelligence, so it makes sense that so many interfaces start there.",
      "Interfaces should be built around the people who use them, not the other way around.",
      "Everything builds off what came before, so it's worth knowing the history behind why things look the way they do.",
    ],
  },
  {
    title: "What I fear",
    role: "digital",
    lines: [
      "Building something polished that nobody actually needs.",
      "Losing curiosity once things start to feel routine.",
    ],
  },
];

export default function About() {
  return (
    <>
      <section className="hero">
        <ProximityFrame as="p" className="intro">
          <span className="line">
            <span className="mono"><ProximityTitle label="Hi, I'm" /></span>{" "}
            <Link to="/about" className="grow-band is-current" data-role="fany">
              <ProximityTitle label="Fany!" />
            </Link>{" "}
            <span className="mono"><ProximityTitle label="a" /></span>{" "}
            <Link to="/tech" className="grow-band" data-role="tech">
              <ProximityTitle label="creative technologist" />
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link to="/digital" className="grow-band" data-role="digital">
              <ProximityTitle label="digital product" />
            </Link>
            <span className="comma">,</span>{" "}
            <Link to="/graphic" className="grow-band" data-role="graphic">
              <ProximityTitle label="graphic designer" />
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <span className="mono"><ProximityTitle label="and I create" /></span>{" "}
            <Link to="/others" className="grow-band" data-role="others">
              <ProximityTitle label="solutions" />
            </Link>
          </span>
        </ProximityFrame>
      </section>

      <article className="note about-note">
        <img className="avatar avatar--sm" src="/media/profileimage.JPEG" alt="Felicia Hertada" />
        <ScrambledText as="h1" className="note__title" {...historyTitle}>
          In a nutshell
        </ScrambledText>
        <p className="note__lede">A few honest notes about me.</p>

        {SECTIONS.map((s) => (
          <section key={s.title} className="note__section">
            <h2 className="note__h" data-role={s.role}>{s.title}</h2>
            <ul className="note__list">
              {s.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </>
  );
}
