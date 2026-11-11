// CursorDot — a small coral circle that sits exactly on the pointer (mouse and trackpad only).
// Over anything with data-cursor="…" it shows that label beside it ("View project"); over other
// links and buttons it shrinks to a point; over text it becomes a thin line, like a text cursor. The soft GhostCursor light trails behind it.
import { useEffect, useRef } from "react";
import "./CursorDot.css";

const INTERACTIVE = "a, button, summary, [role='button'], select, label";
// over readable text the dot becomes a thin line, like the normal text cursor
function isText(el) {
  if (!el) return false;
  // scrambling titles react to the pointer themselves; a thin line gets lost in the moving letters
  if (el.closest(".scrambled-text")) return false;
  if (el.closest("input, textarea, [contenteditable='true']")) return true;
  for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) return true;
  return false;
}

export default function CursorDot() {
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;
    let raf = 0;
    let x = -100;
    let y = -100;
    const paint = () => {
      raf = 0;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest("[data-cursor]");
      const text = labelled?.getAttribute("data-cursor") || "";
      if (text && label.textContent !== text) label.textContent = text; // keep the last words while they wipe away
      dot.dataset.state = text ? "label" : target?.closest(INTERACTIVE) ? "link" : isText(target) ? "text" : "";
      dot.dataset.hidden = "";
    };
    const hide = () => (dot.dataset.hidden = "true");
    const press = () => (dot.dataset.down = "true");
    const release = () => (dot.dataset.down = "");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" data-hidden="true" aria-hidden="true">
      <span className="cursor-dot__mark" />
      <span ref={labelRef} className="cursor-dot__label" />
    </div>
  );
}
