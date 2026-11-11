// SectionNav — a quiet list of a page's sections, fixed on the left on wide screens.
// It reads the headings already on the page (no extra data to keep in sync), lights up the one
// you're reading, and scrolls to a section when clicked. Hidden when a page has too few sections.
import { useEffect, useState } from "react";
import "./SectionNav.css";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function SectionNav({ rootRef, selector, accept, first = "Overview", min = 3, deps = [] }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  // Collect headings once the page (and anything it loads late) has rendered
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const collect = () => {
      const seen = new Set();
      const found = [{ label: first, el: root }];
      root.querySelectorAll(selector).forEach((el) => {
        const label = el.textContent.trim();
        if (!label || seen.has(label) || (accept && !accept(el, root))) return;
        seen.add(label);
        if (!el.id) el.id = `s-${slug(label)}`;
        found.push({ label, el });
      });
      setItems(found.length >= min ? found : []);
    };
    collect();
    const t = setTimeout(collect, 600); // titles that scramble in settle after a moment
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, selector, accept, first, min, ...deps]);

  // The section you're reading = the last heading above the upper third of the screen
  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.33;
      let idx = 0;
      items.forEach((it, i) => {
        if (i > 0 && it.el.getBoundingClientRect().top <= line) idx = i;
      });
      // at the very bottom, the last section counts even if its heading never reached the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) idx = items.length - 1;
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  if (!items.length) return null;

  const go = (i) => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (i === 0) window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    else items[i].el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };

  return (
    <nav className="section-nav" aria-label="Sections on this page">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            <button
              type="button"
              className={i === active ? "is-active" : undefined}
              aria-current={i === active ? "location" : undefined}
              onClick={() => go(i)}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
