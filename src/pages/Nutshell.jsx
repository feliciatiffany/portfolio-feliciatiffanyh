// src/pages/Nutshell.jsx — "in a nutshell": a short note about me
import React from "react";

/* Edit freely — each section is a heading + a list of short lines */
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

export default function Nutshell() {
  return (
    <article className="note">
      <img className="avatar avatar--sm" src="/media/profileimage.JPEG" alt="Felicia Hertada" />
      <h1 className="note__title">In a nutshell</h1>
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
  );
}
