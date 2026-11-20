// src/pages/StudyCase.jsx — case studies as a checkerboard of rounded tiles, the same shape as the
// homepage dome: each case is a picture tile beside a text tile, and the next case swaps sides. The
// status filter sits on the left. Nothing plays by itself: everything follows the scroll, both ways.
// The vertical line grows down the page with a small coral light at its tip, and each picture comes
// back like a memory, from sepia and soft to sharp, as its row comes up.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { STUDY_CASES } from "../lib/studyCases.js";
import LineFilter from "../components/LineFilter.jsx";
import LazyVideo from "../components/LazyVideo.jsx";

const STATUS_ORDER = ["Shipped", "Concept", "In progress"];
const STATUSES = STATUS_ORDER.filter((s) => STUDY_CASES.some((c) => c.status === s));

const clamp01 = (n) => Math.min(1, Math.max(0, n));

// Sets --lp on the list (how far the vertical line has grown) and --p on each box (0 = just entering
// at the bottom of the screen, 1 = settled) from the scroll position.
function useScrollProgress(deps) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const list = el.querySelector(".study__list");
    const items = [...el.querySelectorAll(".study-item")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list?.style.setProperty("--lp", 1);
      items.forEach((it) => it.style.setProperty("--p", 1));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (list) {
        const r = list.getBoundingClientRect();
        list.style.setProperty("--lp", clamp01((vh * 0.6 - r.top) / r.height).toFixed(4)); // the tip sits 60% down the screen
      }
      // rows near the end of the page can't scroll up as far, so they settle over the scroll that's left
      const left = document.documentElement.scrollHeight - vh - window.scrollY;
      items.forEach((it) => {
        const top = it.getBoundingClientRect().top;
        const room = Math.max(1, Math.min(vh * 0.65, vh - (top - left)));
        it.style.setProperty("--p", clamp01((vh - top) / room).toFixed(4));
      });
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return root;
}

function Box({ c }) {
  return (
    <>
      <span className={`study-item__media${c.image ? " shine" : ""}`}>
        {c.image?.type === "video" ? (
          <LazyVideo src={c.image.src} aria-label={c.image.alt} autoPlay />
        ) : c.image ? (
          <img src={c.image.src} alt={c.image.alt} loading="lazy" />
        ) : (
          <span className="study-item__soon">In progress</span>
        )}
      </span>
      <span className="study-item__text">
        <span className="study-item__body">
          <span className="study-item__title">{c.title}</span>
          {c.summary && <span className="study-item__sum">{c.summary}</span>}
        </span>
        <span className="study-item__meta">{c.year ? `${c.status} / ${c.year}` : c.status}</span>
      </span>
    </>
  );
}

export default function StudyCase() {
  const [statuses, setStatuses] = useState(() => new Set(STATUSES));
  const toggleStatus = (v) =>
    setStatuses((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });

  // finished cases first
  const shown = useMemo(
    () => STUDY_CASES.filter((c) => statuses.has(c.status)).sort((a, b) => Number(!a.project) - Number(!b.project)),
    [statuses]
  );
  const root = useScrollProgress([shown]);

  return (
    <section className="blog study" ref={root}>
      <aside className="blog-nav" aria-label="Filter case studies">
        <LineFilter
          title="Status"
          items={STATUSES.map((s) => ({ key: s, label: s }))}
          pressed={statuses}
          onToggle={toggleStatus}
        />
      </aside>

      {shown.length > 0 && (
        <ol className="blog__list study__list">
          {shown.map((c) => (
            <li key={c.slug} className={`blog-item study-item${c.project ? "" : " is-pending"}`}>
              {c.project ? (
                <Link to={`/case-study/${c.project}`} className="blog-item__link" data-cursor="Read">
                  <Box c={c} />
                </Link>
              ) : (
                /* still being written: nothing to open yet, the cursor says so */
                <div className="blog-item__link" data-cursor="In progress" title="In progress">
                  <Box c={c} />
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
      {shown.length === 0 && <p className="blog__empty">Pick a status to see case studies.</p>}
    </section>
  );
}
