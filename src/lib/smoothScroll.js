// Smooth scrolling for the whole site (Lenis): the wheel eases the page instead of jumping
// by notches. Off for reduced motion and for touch screens, which already glide on their own.
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis = null;

export function startSmoothScroll() {
  if (lenis || typeof window === "undefined") return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (t) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

// jump straight to a spot (a new page starts at the top), keeping Lenis in step
export function scrollToTopNow() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

// ease to a spot on the page (smoothly when Lenis runs, natively otherwise)
export function glideTo(top) {
  if (lenis) lenis.scrollTo(top, { duration: 0.9 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
