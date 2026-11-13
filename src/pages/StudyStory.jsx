// src/pages/StudyStory.jsx — one study case told as a story: a title and a question, then sections
// that each open with a short label and a question or statement, answered in a few lines and a large
// image. Stories live in src/studies/<slug>.js; a study case without one opens as a project page.
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Project from "./Project.jsx";
import SectionNav from "../components/SectionNav.jsx";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import "./StudyStory.css";

const modules = import.meta.glob("../studies/*.js", { eager: true, import: "default" });
export const STORIES = Object.fromEntries(Object.values(modules).map((s) => [s.slug, s]));

function Figure({ src, alt, caption }) {
  return (
    <figure className="story__wide">
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Clean line wireframes of the three paper ideas, drawn with the page's own colours
const WIRES = {
  // A · Profile: avatar, numbers, badges, then a list of past events
  profile: (
    <>
      <circle cx="60" cy="42" r="14" />
      <path d="M38 66h44" />
      <rect className="is-fill" x="18" y="80" width="24" height="22" rx="5" />
      <rect className="is-fill" x="48" y="80" width="24" height="22" rx="5" />
      <rect className="is-fill" x="78" y="80" width="24" height="22" rx="5" />
      <rect className="is-accent" x="18" y="114" width="26" height="10" rx="5" />
      <rect x="48" y="114" width="26" height="10" rx="5" />
      <rect x="78" y="114" width="24" height="10" rx="5" />
      <rect className="is-fill" x="18" y="138" width="20" height="20" rx="4" />
      <path d="M46 144h52M46 152h34" />
      <rect className="is-fill" x="18" y="166" width="20" height="20" rx="4" />
      <path d="M46 172h52M46 180h28" />
      <rect className="is-fill" x="18" y="194" width="20" height="20" rx="4" />
      <path d="M46 200h52M46 208h40" />
    </>
  ),
  // B · Event thread: the host's messages, your reply, quick answers, a box to type in
  thread: (
    <>
      <path d="M18 34h50" />
      <circle cx="24" cy="62" r="6" />
      <rect className="is-fill" x="36" y="50" width="62" height="30" rx="8" />
      <rect className="is-accent" x="46" y="90" width="56" height="20" rx="8" />
      <circle cx="24" cy="132" r="6" />
      <rect className="is-fill" x="36" y="120" width="54" height="24" rx="8" />
      <rect x="18" y="160" width="24" height="12" rx="6" />
      <rect x="46" y="160" width="28" height="12" rx="6" />
      <rect x="78" y="160" width="24" height="12" rx="6" />
      <rect x="18" y="196" width="66" height="16" rx="8" />
      <circle className="is-accent" cx="94" cy="204" r="8" />
    </>
  ),
  // C · Phases: a stepper on top, the one thing to do now, and a button to move on
  phases: (
    <>
      <path d="M24 40h72" />
      <circle className="is-accent" cx="24" cy="40" r="5" />
      <circle className="is-accent" cx="48" cy="40" r="5" />
      <circle className="is-paper" cx="72" cy="40" r="5" />
      <circle className="is-paper" cx="96" cy="40" r="5" />
      <rect className="is-fill" x="18" y="62" width="84" height="92" rx="10" />
      <rect className="is-paper" x="42" y="76" width="36" height="36" rx="4" />
      <path d="M50 84h8v8h-8zM64 84h6M64 90h6M50 98h20M50 104h12" />
      <path d="M32 126h56M38 136h44" />
      <path d="M18 172h60M18 182h44" />
      <rect className="is-accent" x="18" y="198" width="84" height="16" rx="8" />
    </>
  ),
};

function Wire({ kind }) {
  return (
    <svg className="story__wire" viewBox="0 0 120 232" role="img" aria-label={`Wireframe of the ${kind} idea`}>
      <rect className="is-phone" x="4" y="4" width="112" height="224" rx="16" />
      {WIRES[kind]}
    </svg>
  );
}

function Block({ b }) {
  switch (b.kind) {
    case "p":
      return <p className="story__p">{b.text}</p>;
    case "h":
      return <h3 className="story__sub">{b.text}</h3>;
    case "quotes":
      return (
        <ul className="story__quotes">
          {b.items.map((q) => (
            <li key={q.text}>
              <q>{q.text}</q>
              <span>{q.source}</span>
            </li>
          ))}
        </ul>
      );
    case "stages":
      return (
        <figure className="story__stages" style={{ "--n": b.stages.length }}>
          <ol className="story__stage-row">
            {b.stages.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          {b.items.map((it) => (
            <p key={it.title} className={`story__span${it.chosen ? " is-chosen" : ""}`} style={{ gridColumn: `${it.from} / ${it.to + 1}` }}>
              {it.title}
            </p>
          ))}
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "wires":
      return (
        <div className="story__wires">
          {b.items.map((w) => (
            <figure key={w.wire}>
              <Wire kind={w.wire} />
              <figcaption>
                <strong>{w.title}</strong>
                {w.text}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "aside":
      return (
        <aside className="story__aside">
          <h3>{b.title}</h3>
          <p>{b.text}</p>
        </aside>
      );
    case "wide":
      return <Figure {...b} />;
    case "phones":
    case "strip":
    case "sketches":
      return (
        <div className={`story__row story__row--${b.kind}`} style={{ "--cols": b.kind === "phones" && b.items.length === 4 ? 2 : b.items.length }} /* four screens sit two by two; a strip keeps them in one row */>
          {b.items.map((it) => (
            <figure key={it.src} className="story__shot" data-tag={/^before/i.test(it.label) ? "before" : undefined}>
              <img src={it.src} alt={it.alt} loading="lazy" />
              <figcaption>{it.label}</figcaption>
            </figure>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className="story__cards">
          {b.items.map((c) => (
            <article key={c.title} className="story__card">
              <p className="story__tag">{c.tag}</p>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      );
    case "list":
      return (
        <dl className="story__list">
          {b.items.map(([term, text]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

export default function StudyStory() {
  const { slug } = useParams();
  const story = STORIES[slug];
  const root = useRef(null);
  if (!story) return <Project />;

  return (
    <article className="story" ref={root}>
      <SectionNav rootRef={root} selector=".story__label" first="Top" deps={[slug]} />

      <header className="story__head">
        <ScrambledText as="h1" className="story__title" {...historyTitle}>
          {story.title}
        </ScrambledText>
        <p className="story__hook">{story.hook}</p>
        <dl className="story__meta">
          {story.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {story.sections.map((s) => (
        <section key={s.label} className="story__section">
          <p className="story__label">{s.label}</p>
          <h2 className="story__h">{s.title}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </section>
      ))}
    </article>
  );
}
