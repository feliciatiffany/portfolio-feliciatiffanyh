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

function Block({ b }) {
  switch (b.kind) {
    case "p":
      return <p className="story__p">{b.text}</p>;
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
    case "sketches":
      return (
        <div className={`story__row story__row--${b.kind}`} style={{ "--cols": b.items.length === 4 ? 2 : b.items.length }} /* four screens sit two by two */>
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
