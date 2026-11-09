// LineFilter — toggle words that lean toward the cursor, borrowed from LineSidebar's proximity effect.
// Works as a horizontal grid (timeline page) or a vertical list (blog). Each item eases a --effect
// value (0..1) from cursor distance; pressed items sit at a quiet resting level, unpressed ones
// look crossed out of the record.
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LineFilter.css";

const smooth = (p) => p * p * (3 - 2 * p);

export default function LineFilter({
  items, // [{ key, label, type?, to? }] — items with `to` render as links instead of toggles
  pressed = new Set(), // Set of keys
  onToggle,
  direction = "column", // "row" | "column"
  title,
  radius = 90,
  smoothing = 70,
  className = "",
  ariaLabel,
}) {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targets = useRef([]);
  const current = useRef([]);
  const raf = useRef(null);
  const last = useRef(0);

  const frame = useCallback(
    (now) => {
      const dt = Math.min((now - last.current) / 1000, 0.05);
      last.current = now;
      const k = 1 - Math.exp(-dt / (smoothing / 1000));
      let moving = false;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = targets.current[i] || 0;
        const c = current.current[i] || 0;
        let n = c + (t - c) * k;
        if (Math.abs(t - n) < 0.0015) n = t;
        else moving = true;
        current.current[i] = n;
        el.style.setProperty("--effect", n.toFixed(4));
      });
      raf.current = moving ? requestAnimationFrame(frame) : null;
    },
    [smoothing]
  );

  const start = useCallback(() => {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    last.current = performance.now();
    raf.current = requestAnimationFrame(frame);
  }, [frame]);

  const onMove = useCallback(
    (e) => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
        targets.current[i] = smooth(Math.max(0, 1 - Math.hypot(dx, dy) / radius));
      });
      start();
    },
    [radius, start]
  );

  const onLeave = useCallback(() => {
    targets.current = targets.current.map(() => 0);
    start();
  }, [start]);

  useEffect(() => () => raf.current != null && cancelAnimationFrame(raf.current), []);

  return (
    <div
      className={`line-filter line-filter--${direction}${className ? ` ${className}` : ""}`}
      role={items.some((it) => it.to) ? undefined : "group"}
      aria-label={ariaLabel || title}
    >
      {title && <h2 className="line-filter__h">{title}</h2>}
      <div ref={listRef} className="line-filter__list" onPointerMove={onMove} onPointerLeave={onLeave}>
        {items.map((it, i) =>
          it.to ? (
            <Link
              key={it.key}
              ref={(el) => (itemRefs.current[i] = el)}
              to={it.to}
              className="line-filter__item"
              data-type={it.type}
            >
              <span className="line-filter__label">{it.label}</span>
            </Link>
          ) : (
            <button
              key={it.key}
              ref={(el) => (itemRefs.current[i] = el)}
              type="button"
              className="line-filter__item"
              data-type={it.type}
              aria-pressed={pressed.has(it.key)}
              onClick={() => onToggle(it.key)}
            >
              <span className="line-filter__label">{it.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
