// src/pages/StudyCase.jsx — study cases, in the blog's frame: a status filter on the left, cases along
// a line on the right. Each box is a full-width image with title, status and summary under it.
// Nothing plays by itself: everything follows the scroll, both ways. The vertical line grows down the
// page with a small coral light at its tip; each box's rule draws across as the box comes up, and its
// picture goes from sepia and soft to sharp.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { STUDY_CASES } from "../lib/studyCases.js";
import LineFilter from "../components/LineFilter.jsx";

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
      items.forEach((it) => {
        const top = it.getBoundingClientRect().top;
        it.style.setProperty("--p", clamp01((vh - top) / (vh * 0.65)).toFixed(4));
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
      <span className={`blog-item__media study-item__media${c.image ? " shine" : ""}`}>
        {c.image ? <img src={c.image.src} alt={c.image.alt} loading="lazy" /> : <span className="study-item__soon">In progress</span>}
      </span>
      <span className="blog-item__text study-item__text">
        <span className="blog-item__title">{c.title}</span>
        <span className="blog-item__meta">{c.year ? `${c.status} / ${c.year}` : c.status}</span>
        {c.summary && <span className="blog-item__sum">{c.summary}</span>}
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
      <aside className="blog-nav" aria-label="Filter study cases">
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
              <span className="study-item__rule" aria-hidden="true" />
              {c.project ? (
                <Link to={`/study-case/${c.project}`} className="blog-item__link" data-cursor="Read">
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
      {shown.length === 0 && <p className="blog__empty">Pick a status to see study cases.</p>}
    </section>
  );
}
