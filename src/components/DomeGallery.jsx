// DomeGallery — from React Bits, trimmed for the homepage.
// Local changes: images are decoration only (no click-to-enlarge), the dome keeps spinning on its own
// (`autoRotate`, degrees per second). Look and blur follow the original component.
import { useEffect, useMemo, useRef, useCallback } from "react";
import { useGesture } from "@use-gesture/react";
import "./DomeGallery.css";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  // two extra rows top and bottom so the dome reaches the edges of tall screens
  const evenYs = [-6, -4, -2, 0, 2, 4, 6];
  const oddYs = [-5, -3, -1, 1, 3, 5, 7];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  if (pool.length === 0) return coords.map((c) => ({ ...c, src: "", alt: "" }));

  const normalized = pool.map((image) =>
    typeof image === "string" ? { src: image, alt: "" } : { src: image.src || "", alt: image.alt || "" }
  );
  const used = Array.from({ length: coords.length }, (_, i) => normalized[i % normalized.length]);

  // avoid the same image twice in a row
  for (let i = 1; i < used.length; i++) {
    if (used[i].src === used[i - 1].src) {
      for (let j = i + 1; j < used.length; j++) {
        if (used[j].src !== used[i].src) {
          [used[i], used[j]] = [used[j], used[i]];
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({ ...c, src: used[i].src, alt: used[i].alt }));
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  heightGuard = 1.35, // radius never exceeds this × container height; Infinity turns it off
  overlayBlurColor = "var(--background)", // any CSS colour; the page background by default
  maxVerticalRotationDeg = 5,
  dragSensitivity = 20,
  segments = 35,
  dragDampening = 2,
  imageBorderRadius = "var(--radius-tile)",
  grayscale = true,
  imageFilter, // overrides grayscale, e.g. "sepia(.35)"
  autoRotate = 4, // degrees per second; 0 stops it
  className = "",
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const inertiaRAF = useRef(null);
  const autoRef = useRef(autoRotate);
  autoRef.current = autoRotate;

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) el.style.transform = `translateZ(calc(var(--dome-radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      let basis;
      switch (fitBasis) {
        case "min": basis = minDim; break;
        case "max": basis = maxDim; break;
        case "width": basis = w; break;
        case "height": basis = h; break;
        default: basis = w / h >= 1.3 ? w : minDim;
      }
      let radius = Math.min(basis * fit, h * heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      root.style.setProperty("--dome-radius", `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, heightGuard]);

  // Constant spin. Pauses while dragging or coasting, then carries on from wherever the dome is.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let last = 0;
    const tick = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (!draggingRef.current && !inertiaRAF.current && autoRef.current) {
        const r = rotationRef.current;
        rotationRef.current = { x: r.x, y: wrapAngleSigned(r.y + autoRef.current * dt) };
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onVis = () => {
      last = 0;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if ((Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) || ++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        draggingRef.current = true;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: event.clientX, y: event.clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (!draggingRef.current || !startPosRef.current) return;
        const dx = event.clientX - startPosRef.current.x;
        const dy = event.clientY - startPosRef.current.y;
        const nextX = clamp(startRotRef.current.x - dy / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(startRotRef.current.y + dx / dragSensitivity);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        if (last) {
          draggingRef.current = false;
          let vx = velocity[0] * direction[0];
          let vy = velocity[1] * direction[1];
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            vx = clamp((movement[0] / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((movement[1] / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  const filter = imageFilter ?? (grayscale ? "grayscale(1)" : "none");

  return (
    <div
      ref={rootRef}
      className={`sphere-root${className ? ` ${className}` : ""}`}
      style={{
        "--segments-x": segments,
        "--segments-y": segments,
        "--overlay-blur-color": overlayBlurColor,
        "--tile-radius": imageBorderRadius,
        "--image-filter": filter,
      }}
      aria-hidden="true"
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                style={{
                  "--offset-x": it.x,
                  "--offset-y": it.y,
                  "--item-size-x": it.sizeX,
                  "--item-size-y": it.sizeY,
                }}
              >
                <div className="item__image">
                  <img src={it.src} draggable={false} alt="" loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay overlay--soft" />
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
      </main>
    </div>
  );
}
