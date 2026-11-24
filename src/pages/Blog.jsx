// src/pages/Blog.jsx — writing list: category + year filters on the left, posts along a line on the right
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import data from "../data/blog.json";
import LineFilter from "../components/LineFilter.jsx";
import useReveal from "../lib/useReveal.js";
import useDotFilter from "../lib/useDotFilter.js";

export const POSTS = data.posts.map((p) => ({ ...p, year: Number(p.date.slice(0, 4)) }));
export const CATEGORIES = [...new Set(POSTS.map((p) => p.category))].sort();
const YEARS = [...new Set(POSTS.map((p) => p.year))].sort((a, b) => b - a);

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Blog() {
  // each list starts on "All"; picking items narrows to just those (marked with a dot)
  const cats = useDotFilter(CATEGORIES);
  const years = useDotFilter(YEARS);

  const shown = useMemo(
    () => POSTS.filter((p) => cats.shows(p.category) && years.shows(p.year)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cats.pressed, years.pressed]
  );
  const byYear = useMemo(() => {
    const groups = new Map();
    [...shown].sort((a, b) => b.date.localeCompare(a.date)).forEach((p) => {
      if (!groups.has(p.year)) groups.set(p.year, []);
      groups.get(p.year).push(p);
    });
    return [...groups.entries()];
  }, [shown]);
  const root = useReveal([shown]);

  return (
    <section className="blog" ref={root}>
      <aside className="blog-nav" aria-label="Filter posts">
        <LineFilter
          title="Categories"
          items={cats.withAll(CATEGORIES.map((c) => ({ key: c, label: c })))}
          pressed={cats.pressed}
          onToggle={cats.toggle}
        />
        <LineFilter
          title="Year"
          items={years.withAll(YEARS.map((y) => ({ key: y, label: String(y) })))}
          pressed={years.pressed}
          onToggle={years.toggle}
        />
      </aside>

      {/* One section per year, newest first, each with its own line — like the timeline */}
      {byYear.map(([y, posts], yi) => (
        <div
          key={y}
          className="blog-year"
          style={{ "--age": byYear.length > 1 ? (yi / (byYear.length - 1)).toFixed(3) : 0 }} /* 0 = newest, 1 = oldest */
        >
          <h2 className="tl-year__h blog-year__h">{y}</h2>
          <ol className="blog__list line-reveal">
            {posts.map((p) => (
              <li key={p.slug} className={`blog-item reveal${p.cover ? " has-cover" : ""}`}>
                <Link to={`/blog/${p.slug}`} className="blog-item__link" data-cursor="Read">
                  {p.cover && (
                    <span className="blog-item__media shine">
                      <img src={p.cover} alt="" loading="lazy" />
                    </span>
                  )}
                  <span className="blog-item__text">
                    <span className="blog-item__title">{p.en?.title || p.title}</span>
                    <span className="blog-item__meta">{p.category} · {formatDate(p.date)}</span>
                    {(p.en?.summary || p.summary) && <span className="blog-item__sum">{p.en?.summary || p.summary}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {shown.length === 0 && <p className="blog__empty">Pick a category and a year to see posts.</p>}
    </section>
  );
}
