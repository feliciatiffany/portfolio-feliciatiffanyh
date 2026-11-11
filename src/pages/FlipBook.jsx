// src/pages/FlipBook.jsx — a page with only a book in the middle. Pages bend as they turn
// (StPageFlip): drag a corner, click a page, or use ← → and the buttons below.
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PageFlip } from "page-flip";
import { BOOKS } from "../lib/books.js";
import "./FlipBook.css";

const PAGE_W = 800; // the page images' own size (4:5)
const PAGE_H = 1000;

export default function FlipBook() {
  const { slug } = useParams();
  const book = BOOKS[slug];
  const hostRef = useRef(null);
  const flipRef = useRef(null);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState("landscape");

  useEffect(() => {
    const mount = hostRef.current;
    if (!book || !mount) return;
    // StPageFlip moves and finally removes the element it's given, so it gets one React doesn't own
    const host = document.createElement("div");
    host.className = "flipbook__book";
    const last = book.pages.length - 1;
    book.pages.forEach((src, i) => {
      const pg = document.createElement("div");
      pg.className = "flipbook__page";
      pg.dataset.density = i === 0 || i === last ? "hard" : "soft"; // cover and back stay stiff, inside pages bend
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.draggable = false;
      pg.appendChild(img);
      host.appendChild(pg);
    });
    mount.appendChild(host);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flip = new PageFlip(host, {
      width: PAGE_W,
      height: PAGE_H,
      size: "stretch",
      minWidth: 200,
      maxWidth: PAGE_W,
      minHeight: 250,
      maxHeight: PAGE_H,
      showCover: true, // the cover sits alone, then two pages per spread
      usePortrait: true, // one page at a time on narrow screens
      drawShadow: true,
      maxShadowOpacity: 0.35,
      flippingTime: reduce ? 1 : 900,
      mobileScrollSupport: true,
      showPageCorners: true,
    });
    flip.loadFromHTML(host.querySelectorAll(".flipbook__page"));
    flip.on("flip", (e) => setPage(e.data));
    flip.on("init", (e) => setMode(e.data.mode));
    flip.on("changeOrientation", (e) => setMode(e.data));
    flipRef.current = flip;

    const onKey = (e) => {
      if (e.key === "ArrowRight") flip.flipNext();
      if (e.key === "ArrowLeft") flip.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      flipRef.current = null;
      flip.destroy();
    };
  }, [book]);

  if (!book) return <p className="flipbook__missing">That book isn’t here.</p>;

  const total = book.pages.length;
  const last = total - 1;
  // landscape spreads: cover alone, then pages (1,2), (3,4)…; portrait shows one page
  const label =
    page === 0 ? "Cover" : mode === "portrait" || page === last ? `${page + 1} of ${total}` : `${page + 1}–${Math.min(page + 2, total)} of ${total}`;
  const atEnd = mode === "portrait" ? page >= last : page + 2 > last;
  const closed = mode === "landscape" && page === 0;

  return (
    <section className="flipbook" aria-label={book.title}>
      {/* closed, only the right-hand cover shows, so the book slides half a page left to sit centred */}
      <div className={`flipbook__stage${closed ? " is-closed" : ""}`} role="img" aria-label={book.alt}>
        <div className="flipbook__mount" ref={hostRef} data-cursor="Turn" />
      </div>

      <div className="flipbook__nav">
        <button type="button" onClick={() => flipRef.current?.flipPrev()} disabled={page === 0} aria-label="Previous pages">←</button>
        <span aria-live="polite">{label}</span>
        <button type="button" onClick={() => flipRef.current?.flipNext()} disabled={atEnd} aria-label="Next pages">→</button>
      </div>
      {book.link && (
        <a className="flipbook__link" href={book.link.href} target="_blank" rel="noopener noreferrer" data-cursor="Open link">
          {book.link.label} ↗
        </a>
      )}
    </section>
  );
}
