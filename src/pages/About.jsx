// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import Star from "../assets/star.svg"; // add this file (see below)
import { education, experience, skills } from "../lib/resume";


function Bullet({ children }) {
  return (
    <li className="resume-item">
      <img className="star" src={Star} alt="" aria-hidden />
      <div className="resume-item__body">{children}</div>
    </li>
  );
}

export default function About() {
  

  return (
    <>
      {/* INTRO stays in its own grid track (won't push content when hovered) */}
      <section className="hero">
        <p className="intro">
          <span className="line">
            <span className="mono">Hi, I’m</span>{" "}
            <Link to="/about" className="grow-band is-current" data-role="fany">
              Fany!
            </Link>{" "}
            <span className="mono">a</span>{" "}
            <Link to="/tech" className="grow-band" data-role="tech">
              tech designer
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link to="/graphic" className="grow-band" data-role="graphic">
              graphic designer
            </Link>
            <span className="comma">,</span>{" "}
            <span className="mono">and I create </span>{" "}
            <Link to="/others" className="grow-band" data-role="others">
              solutions
            </Link>
          </span>
        </p>
       <p className="reachout">Feel free to reach out if you'd like the full list.</p>
      </section>

      {/* CONTENT track: scrollable resume grid */}
      <section className="resume content-scroll">
        <div className="resume-grid">
          {/* Left column: Education + Experience */}
          <div className="resume-col">
            <h2 className="resume-h">Education</h2>
            <ul className="resume-list">
              {education.map((ed, i) => (
                <Bullet key={i}>
                  <div className="resume-line">
                    <span className="resume-strong">{ed.title}</span>
                  </div>
                  <div className="resume-meta">
                    {ed.date} · {ed.place}
                    {ed.meta ? ` · ${ed.meta}` : ""}
                  </div>
                </Bullet>
              ))}
            </ul>

            <h2 className="resume-h">Experience</h2>
            <ul className="resume-list">
              {experience.map((ex, i) => (
                <Bullet key={i}>
                  <div className="resume-line">
                    <span className="resume-strong">{ex.title}</span>
                  </div>
                  <div className="resume-meta">
                    {ex.date} · {ex.place}
                  </div>
                </Bullet>
              ))}
            </ul>
          </div>

          {/* Right column: Skills */}
          <aside className="resume-col">
            <h2 className="resume-h">Skills</h2>
            <ul className="resume-list">
              {skills.map((s, i) => (
                <Bullet key={i}>
                  <div className="resume-line">{s}</div>
                </Bullet>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
