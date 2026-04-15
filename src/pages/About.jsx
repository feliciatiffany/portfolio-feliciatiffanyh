// src/pages/About.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Star from "../assets/star.svg";
import { education, experience, skills, awards } from "../lib/resume";

/* ── Expandable bullet (education + experience) ── */
function ExpandBullet({ children, achievements }) {
  const [open, setOpen] = useState(false);
  const hasAchievements = achievements && achievements.length > 0;

  return (
    <li className="resume-item">
      <button
        className={`star-btn${open ? " star-btn--open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Collapse achievements" : "Expand achievements"}
        onClick={() => hasAchievements && setOpen((v) => !v)}
        disabled={!hasAchievements}
      >
        <img className="star star--blink" src={Star} alt="" aria-hidden />
      </button>

      <div className="resume-item__body">
        {children}

        {hasAchievements && (
          <ul className={`achieve-list${open ? " achieve-list--open" : ""}`}>
            {achievements.map((a, i) => (
              <li key={i} className="achieve-item">
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/* ── Static bullet (skills, awards) ── */
function StaticBullet({ children }) {
  return (
    <li className="resume-item">
      <img className="star star--shine" src={Star} alt="" aria-hidden />
      <div className="resume-item__body">{children}</div>
    </li>
  );
}

export default function About() {
  return (
    <>
      <section className="hero">
        <p className="intro">
          <span className="line">
            <span className="mono">Hi, I'm</span>{" "}
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
        <p className="reachout">Press star to expand on achievements.</p>
      </section>

      {/* Scrollable resume */}
      <section className="resume content-scroll">
        <div className="resume-grid">

          {/* ── Left column ── */}
          <div className="resume-col">

            <h2 className="resume-h">Education</h2>
            <ul className="resume-list">
              {education.map((ed, i) => (
                <ExpandBullet key={i} achievements={ed.achievements}>
                  <div className="resume-line">
                    <span className="resume-strong">{ed.title}</span>
                  </div>
                  <div className="resume-meta">
                    {ed.date} · {ed.place}
                    {ed.meta ? ` · ${ed.meta}` : ""}
                  </div>
                </ExpandBullet>
              ))}
            </ul>

            <h2 className="resume-h">Experience</h2>
            <ul className="resume-list">
              {experience.map((ex, i) => (
                <ExpandBullet key={i} achievements={ex.achievements}>
                  <div className="resume-line">
                    <span className="resume-strong">{ex.title}</span>
                  </div>
                  <div className="resume-meta">
                    {ex.date} · {ex.place}
                  </div>
                </ExpandBullet>
              ))}
            </ul>

            {/* ── Awards & Honors ── */}
            <h2 className="resume-h">Awards &amp; Honors</h2>
            <ul className="resume-list">
              {awards.map((aw, i) => (
                <StaticBullet key={i}>
                  <div className="resume-line">
                    <span className="resume-strong">{aw.title}</span>
                  </div>
                  <div className="resume-meta">
                    {aw.org ? `${aw.org} · ` : ""}{aw.year}
                  </div>
                </StaticBullet>
              ))}
            </ul>
          </div>

          {/* ── Right column: Skills ── */}
          <aside className="resume-col">
            <h2 className="resume-h">Skills</h2>
            <ul className="resume-list">
              {skills.map((s, i) => (
                <StaticBullet key={i}>
                  <div className="resume-line">{s}</div>
                </StaticBullet>
              ))}
            </ul>
          </aside>

        </div>
      </section>
    </>
  );
}