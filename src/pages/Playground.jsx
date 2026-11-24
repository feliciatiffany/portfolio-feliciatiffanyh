// Playground — all the work, side projects and creative side (moved here from the About timeline).
// Filters on the left (start on "All"; pick any to narrow, each picked one gets a dot), and the
// work in three staggered columns of rounded cards with a title under each, read row by row.
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PLAYGROUND, PLAYGROUND_TAGS } from "../lib/timeline";
import LineFilter from "../components/LineFilter.jsx";
import LazyVideo from "../components/LazyVideo.jsx";
import useDotFilter from "../lib/useDotFilter.js";
import "./Playground.css";

const TAGS = PLAYGROUND_TAGS.filter((t) => PLAYGROUND.some((e) => e.playground.includes(t)));
// a few card shapes in turn, so the three columns stagger like the sketch
const SHAPES = ["tall", "wide", "tall", "wide", "square", "wide"];

// how many columns fit: three on a laptop, two on a tablet, one on a phone
function useColumns() {
  const pick = () => (window.innerWidth <= 640 ? 1 : window.innerWidth <= 1000 ? 2 : 3);
  const [n, setN] = useState(pick);
  useEffect(() => {
    const on = () => setN(pick());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return n;
}

function Media({ item }) {
  const m = item.media || (item.gallery?.[0] && { type: "image", src: item.gallery[0].src, alt: item.gallery[0].alt });
  if (!m?.src) return <span className="pg-card__empty">{item.subtitle || item.title}</span>;
  return m.type === "video" ? <LazyVideo src={m.src} poster={m.poster} /> : <img src={m.src} alt={m.alt || ""} loading="lazy" />;
}

function Card({ item, shape }) {
  const body = (
    <>
      <span className="pg-card__media" data-shape={shape}>
        <Media item={item} />
      </span>
      <span className="pg-card__caption">
        <span className="pg-card__title">{item.title}</span>
        <span className="pg-card__meta">{item.date}</span>
      </span>
    </>
  );
  return (
    <li className="pg-card">
      {item.to ? (
        <Link to={item.to} className="pg-card__link" data-cursor="View">{body}</Link>
      ) : item.href ? (
        <a href={item.href} className="pg-card__link" target="_blank" rel="noopener noreferrer" data-cursor="Open">{body}</a>
      ) : (
        <div className="pg-card__link">{body}</div>
      )}
    </li>
  );
}

export default function Playground() {
  const filter = useDotFilter(TAGS);
  const cols = useColumns();
  const shown = useMemo(
    () => PLAYGROUND.filter((e) => filter.shows(e.playground)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter.pressed]
  );
  // dealt out row by row into the columns, so the order still reads left to right
  const columns = useMemo(() => {
    const out = Array.from({ length: cols }, () => []);
    shown.forEach((item, i) => out[i % cols].push({ item, shape: SHAPES[i % SHAPES.length] }));
    return out;
  }, [shown, cols]);

  return (
    <section className="playground">
      <aside className="playground__nav" aria-label="Filter work">
        <LineFilter
          items={filter.withAll(TAGS.map((t) => ({ key: t, label: t })))}
          pressed={filter.pressed}
          onToggle={filter.toggle}
          ariaLabel="Filter work"
        />
      </aside>
      <h1 className="playground__title">Playground</h1>
      <div className="playground__grid" style={{ "--cols": cols }}>
        {columns.map((col, ci) => (
          <ul key={ci} className="playground__col" role="list">
            {col.map(({ item, shape }) => (
              <Card key={item.id} item={item} shape={shape} />
            ))}
          </ul>
        ))}
      </div>
      {shown.length === 0 && <p className="playground__empty">Nothing here yet.</p>}
    </section>
  );
}
