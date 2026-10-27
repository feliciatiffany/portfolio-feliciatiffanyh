// src/pages/Built.jsx — "Things I Built" timeline with category filters
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TYPES, ENTRIES, groupByYear } from "../lib/timeline";

function CardMedia({ media }) {
  if (!media?.src) return null;
  return (
    <span className="tl-card__media">
      {media.type === "video" ? (
        <video src={media.src} poster={media.poster} muted loop autoPlay playsInline preload="metadata" />
      ) : (
        <img src={media.src} alt={media.alt || ""} loading="lazy" />
      )}
    </span>
  );
}

function Card({ item }) {
  const body = (
    <>
      <CardMedia media={item.media} />
      <span className="tl-card__text">
        <span className="tl-card__top">
          <span className="tl-card__title">{item.title}</span>
          <span className="tl-card__date">{item.date}</span>
        </span>
        {item.subtitle && <span className="tl-card__sub">{item.subtitle}</span>}
        {item.desc && <span className="tl-card__desc">{item.desc}</span>}
      </span>
    </>
  );

  return (
    <li className="tl-card" data-type={item.type}>
      {item.to ? (
        <Link to={item.to} className="tl-card__link">{body}</Link>
      ) : (
        <div className="tl-card__link">{body}</div>
      )}
    </li>
  );
}

export default function Built() {
  const [active, setActive] = useState(() => new Set(TYPES.map((t) => t.key)));

  const toggle = (key) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const groups = useMemo(
    () => groupByYear(ENTRIES.filter((e) => active.has(e.type))),
    [active]
  );

  return (
    <section className="built">
      <header className="built-head">
        <img className="avatar avatar--sm" src="/media/profileimage.JPEG" alt="Felicia Hertada" />
        <h1 className="built-title">Things I Built</h1>
        <p className="built-sub">Everything builds off what came before.</p>
      </header>

      <div className="tl-bar">
        <div className="tl-filters" role="group" aria-label="Filter categories">
          {TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              className="tl-filter"
              data-type={t.key}
              aria-pressed={active.has(t.key)}
              onClick={() => toggle(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {groups.length > 0 && (
          <nav className="tl-jump" aria-label="Jump to year">
            {groups.map((g) => (
              <a key={g.key} href={`#y-${g.key}`}>{g.heading}</a>
            ))}
          </nav>
        )}
      </div>

      {groups.length === 0 && (
        <p className="tl-empty">Pick a category above to light up the timeline.</p>
      )}

      {groups.map((g) => (
        <div key={g.key} id={`y-${g.key}`} className="tl-year">
          <h2 className="tl-year__h">
            {g.heading}
            {g.note && <span className="tl-year__note">{g.note}</span>}
          </h2>
          <ol className="tl-list">
            {g.items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
