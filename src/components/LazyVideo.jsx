// A muted looping video that behaves exactly like autoPlay, except it only downloads and plays while
// it's on screen (and pauses when scrolled away). Until then it shows its poster still.
import { useEffect, useRef } from "react";
import POSTERS from "../data/videoPosters.json";

export default function LazyVideo({ src, poster, className, type, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          v.play().catch(() => {}); // autoplay may be refused (e.g. low-power mode); the poster stays
        } else v.pause();
      },
      { rootMargin: "200px 0px" } // start a little before it scrolls in
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster || POSTERS[src]}
      muted
      loop
      playsInline
      preload="none"
      {...rest}
    />
  );
}
