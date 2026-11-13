// src/pages/StudyCase.jsx — study cases, in the blog's frame: a status filter on the left, cases along
// a line on the right. Each box is a full-width image with title, status and summary under it.
// On scroll a rule draws across the top of each box, led by a small coral light (like the vertical
// line), and the image opens behind it.
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { STUDY_CASES } from "../lib/studyCases.js";
import LineFilter from "../components/LineFilter.jsx";
import useReveal from "../lib/useReveal.js";

const STATUS_ORDER = ["Shipped", "Concept", "In progress"];
const STATUSES = STATUS_ORDER.filter((s) => STUDY_CASES.some((c) => c.status === s));

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
  const root = useReveal([shown]);

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
        <ol className="blog__list study__list line-reveal">
          {shown.map((c) => (
            <li key={c.slug} className={`blog-item study-item reveal${c.project ? "" : " is-pending"}`}>
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
