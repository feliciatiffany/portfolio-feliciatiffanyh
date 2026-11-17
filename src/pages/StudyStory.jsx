// src/pages/StudyStory.jsx — one case study told as a story: a title and a question, then sections
// that each open with a short label and a question or statement, answered in a few lines and a large
// image. Stories live in src/studies/<slug>.js; a case study without one opens as a project page.
import React, { useEffect, useRef, useState } from "react";
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

// Sketches that turn by themselves, one at a time: the paper sketch with its clean redraw right beside it; resting the
// pointer (or focus) on it holds the current one
function Carousel({ items }) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), 2000);
    return () => clearTimeout(t);
  }, [i, held, items.length]);
  return (
    <figure
      className={held ? "story__carousel is-held" : "story__carousel"}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      aria-roledescription="carousel"
    >
      <div className="story__carousel-stage">
        {items.map((s, j) => (
          // the screens as drawn on paper, and beside them the same screens redrawn cleanly
          <div key={s.src} className={j === i ? "story__carousel-slide is-on" : "story__carousel-slide"} aria-hidden={j !== i}>
            <img src={s.src} alt={s.alt} loading="lazy" />
            <img src={s.clean} alt={`${s.title}, redrawn as clean wireframes`} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="story__carousel-dots" role="tablist" aria-label="Sketches">
        {items.map((s, j) => (
          <button key={s.src} type="button" role="tab" aria-selected={j === i} aria-label={s.title} className={j === i ? "is-on" : undefined} onClick={() => setI(j)} />
        ))}
      </div>
      {/* every set of notes sits in the same spot, so the space keeps the tallest one's height and nothing below moves */}
      <figcaption className="story__notes">
        {items.map((it, j) => (
          <div key={it.src} className={j === i ? "story__notes-set is-on" : "story__notes-set"} aria-hidden={j !== i}>
            <p className="story__tag">{it.title}</p>
            <div className="story__notes-cols">
              {it.notes.map(([head, lines]) => (
                <div key={head}>
                  <h4>{head}</h4>
                  <ul>{lines.map((l) => <li key={l}>{l}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </figcaption>
    </figure>
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
        <ul className="story__quotes" style={{ "--cols": b.items.length === 3 ? 3 : 2 }} /* three short statements sit in one row */>
          {b.items.map((q) => (
            <li key={q.text}>
              {q.href ? (
                // a review found online opens where it was posted
                <a href={q.href} target="_blank" rel="noopener noreferrer" data-cursor="Read">
                  <q>{q.text}</q>
                  <span>{q.source} ↗</span>
                </a>
              ) : (
                <>
                  <q>{q.text}</q>
                  <span>{q.source}</span>
                </>
              )}
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
    case "opps":
      // each opportunity: a phone recording of that moment in the flow, with the struggle behind it and what could change beside it
      return (
        <ol className="story__opps">
          {b.items.map((o, i) => (
            <li key={o.title} className={o.chosen ? "is-chosen" : undefined}>
              <div className="story__opp-media">
                <video src={o.video} aria-label={`Phone recording: ${o.title.toLowerCase()}, ${b.stages.slice(o.from - 1, o.to).join(" and ")}`} autoPlay muted loop playsInline preload="metadata" />
              </div>
              <div className="story__opp-text">
                <p className="story__tag">{i + 1} · {o.title}{o.chosen && " · chosen"}</p>
                <dl>
                  <dt>Problem</dt>
                  <dd><q>{o.problem}</q> {o.note}</dd>
                  <dt>Opportunity</dt>
                  <dd>{o.text}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      );
    case "merge":
      // where each part of the final direction came from: the source, what I took, and the screen it became
      return (
        <figure className="story__merge">
          <ol>
            {b.items.map((m) => (
              <li key={m.from}>
                <span className="story__merge-from">{m.from}</span>
                <span className="story__merge-took">{m.took}</span>
                <span className="story__merge-to"><b>{m.to}</b>{m.screen}</span>
              </li>
            ))}
          </ol>
          <figcaption className="story__merge-into">{b.into}</figcaption>
        </figure>
      );
    case "pair":
      // the paper sketch with the same screens redrawn cleanly beside it
      return (
        <figure className="story__pair">
          <div className="story__carousel-stage">
            <div className="story__carousel-slide is-on">
              <img src={b.src} alt={b.alt} loading="lazy" />
              <img src={b.clean} alt={b.cleanAlt} loading="lazy" />
            </div>
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "iterate":
      // an arrow down from the direction before, then the screens as they ended up
      return (
        <figure className="story__iterate">
          <p className="story__merge-into story__iterate-label">{b.label}</p>
          <img src={b.src} alt={b.alt} loading="lazy" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "carousel":
      return <Carousel items={b.items} />;
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
    case "video":
      // plays by itself, silent and looping, like a moving picture; it has no sound to offer
      return (
        <figure className="story__wide">
          <video src={b.src} aria-label={b.alt} autoPlay muted loop playsInline preload="metadata" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
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
    case "features":
      // two by two: each picture with a short note under it
      return (
        <div className="story__features">
          {b.items.map((it) => (
            <figure key={it.src}>
              <img src={it.src} alt={it.alt} loading="lazy" />
              <figcaption><strong>{it.title}.</strong> {it.text}</figcaption>
            </figure>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className={b.items.some((c) => c.icon) ? "story__cards story__cards--apps" : "story__cards"}>
          {b.items.map((c) => (
            <article key={c.title} className={c.icon ? "story__card story__card--app" : "story__card"}>
              {c.icon && (
                // the app's own icon and two of its App Store screens, for what it does well
                <div className="story__app">
                  <img className="story__app-icon" src={c.icon} alt={`${c.title} app icon`} loading="lazy" />
                  <div className="story__app-shots">
                    {c.shots.map((src, j) => <img key={src} src={src} alt={c.alt[j]} loading="lazy" />)}
                  </div>
                </div>
              )}
              <p className="story__tag">{c.tag}</p>
              <h3>{c.title}</h3>
              {c.points ? <ul>{c.points.map((t) => <li key={t}>{t}</li>)}</ul> : <p>{c.text}</p>}
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
        {story.hook && <p className="story__hook">{story.hook}</p>}
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
        <section key={s.label || s.title} className="story__section">
          {/* a section without a label reads on from the one before it, and stays out of the side list */}
          {s.label && <p className="story__label">{s.label}</p>}
          <h2 className="story__h">{s.title}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </section>
      ))}
    </article>
  );
}
