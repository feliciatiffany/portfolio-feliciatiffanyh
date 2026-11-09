// Adds .is-in to every .reveal / .line-reveal element inside the returned ref once it scrolls onto the screen,
// so its CSS transition plays by itself (not tied to scroll position).
import { useEffect, useRef } from "react";

export default function useReveal(deps) {
  const root = useRef(null);
  useEffect(() => {
    const els = root.current?.querySelectorAll(".reveal:not(.is-in), .line-reveal:not(.is-in)") || [];
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
      { rootMargin: "0px 0px -12% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return root;
}
