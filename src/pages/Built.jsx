// src/pages/Built.jsx — "What I've done": center-line timeline with category filters
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TYPES, ENTRIES, groupByYear } from "../lib/timeline";
import LogoUrl from "../assets/logosmall.png";

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

// Cards alternate sides of the center line (masonry rows, see useMasonry).
// Creative Side cards are compact: small thumbnail, title + date only.
function Card({ item, index }) {
  const body = (
    <>
      <CardMedia media={item.media} />
      <span className="tl-card__text">
        <span className="tl-card__title">{item.title}</span>
        <span className="tl-card__date">{item.date}</span>
        {item.subtitle && item.type !== "creative" && <span className="tl-card__sub">{item.subtitle}</span>}
        {item.desc && <span className="tl-card__desc">{item.desc}</span>}
      </span>
    </>
  );

  return (
    <li
      className="tl-card reveal"
      data-type={item.type}
      data-side={index % 2 ? "right" : "left"}
    >
      {item.to ? (
        <Link to={item.to} className="tl-card__link shine">{body}</Link>
      ) : (
        <div className="tl-card__link">{body}</div>
      )}
    </li>
  );
}

// Fade + slide cards in as they scroll into view
function useReveal(deps) {
  const root = useRef(null);
  useEffect(() => {
    const els = root.current?.querySelectorAll(".reveal:not(.is-in)") || [];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
  return root;
}

// Each card spans as many 8px grid rows as it is tall, so the two sides pack tightly in order
const ROW = 8;
function useMasonry(root, deps) {
  useEffect(() => {
    const cards = [...(root.current?.querySelectorAll(".tl-card") || [])];
    const fit = () =>
      cards.forEach((el) => {
        const cs = getComputedStyle(el);
        const h = el.firstElementChild.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        el.style.gridRowEnd = `span ${Math.ceil(h / ROW)}`;
      });
    fit();
    const ro = new ResizeObserver(fit);
    cards.forEach((el) => ro.observe(el.firstElementChild));
    return () => ro.disconnect();
  }, deps);
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

  const root = useReveal([groups]);
  useMasonry(root, [groups]);

  return (
    <section className="built" ref={root}>
      <header className="built-head">
        <Link to="/" className="built-logo" aria-label="Home">
          <img src={LogoUrl} alt="" />
        </Link>
        <h1 className="built-title">What I’ve done - A Timeline</h1>
      </header>

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
            {g.items.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
