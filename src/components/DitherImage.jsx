// DitherImage — a photo printed like an old dithered page, adapted from React Bits' <Dither />.
// The image is ordered-dithered (8x8 Bayer) into a few shades of grey. On load it resolves from chunky
// pixels to full detail. The cursor uncovers the real photo with a fading trail, and a click sends a
// ring through it — the present showing through for a moment before it fades back into the past.
import { useEffect, useRef } from "react";
import { token } from "../lib/tokens.js";

// dark → light, black-and-white like the original Dither (tokens: --color-dither-1…4)
const DITHER = ["color-dither-1", "color-dither-2", "color-dither-3", "color-dither-4"].map(token);

const BAYER8 = [
  0, 48, 12, 60, 3, 51, 15, 63, 32, 16, 44, 28, 35, 19, 47, 31, 8, 56, 4, 52, 11, 59, 7, 55, 40, 24, 36, 20, 43, 27,
  39, 23, 2, 50, 14, 62, 1, 49, 13, 61, 34, 18, 46, 30, 33, 17, 45, 29, 10, 58, 6, 54, 9, 57, 5, 53, 42, 26, 38, 22,
  41, 25, 37, 21,
].map((v) => v / 64);

const MAX_TRAIL = 64;
const INTRO_SECONDS = 1.8;
const RIPPLE_SECONDS = 1.4;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

const toRgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

export default function DitherImage({
  src,
  alt = "",
  className = "",
  palette = DITHER,
  pixelSize = 2, // css px per dither pixel
  contrast = 1.15,
  brightness = 0.02,
  mouseRadius = 34, // css px
  trail = 1, // 0..1, how long the uncovered trail lingers
  shimmer = 0, // slow drift in the dither, like film grain; 0 = still until hovered
  clickRipple = true,
  intro = true,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = palette.map(toRgb);
    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const buf = document.createElement("canvas"); // one texel per dither pixel
    const bctx = buf.getContext("2d", { willReadFrequently: true });
    let cols = 1;
    let size = 1;
    let photo = null; // Uint8ClampedArray, original colours at dither resolution
    let luma = null;
    let out = null;
    const trailPts = [];
    const ripples = [];
    let reveal = intro && !reduce ? 0 : 1;
    let time = 0;
    let raf = 0;
    let last = 0;
    let lastIdle = 0;
    let ready = false;
    let visible = true;
    let alive = true;

    const layout = () => {
      size = Math.max(1, wrap.clientWidth);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.height = Math.round(size * dpr);
      cols = Math.max(8, Math.round(size / pixelSize));
      buf.width = buf.height = cols;
      const r = img.naturalWidth / img.naturalHeight;
      const w = r > 1 ? cols * r : cols;
      const h = r > 1 ? cols : cols / r;
      bctx.clearRect(0, 0, cols, cols);
      bctx.drawImage(img, (cols - w) / 2, (cols - h) / 2, w, h);
      photo = bctx.getImageData(0, 0, cols, cols).data.slice();
      luma = new Float32Array(cols * cols);
      for (let i = 0; i < luma.length; i++) {
        const l = (0.2126 * photo[i * 4] + 0.7152 * photo[i * 4 + 1] + 0.0722 * photo[i * 4 + 2]) / 255;
        luma[i] = clamp((l - 0.5) * contrast + 0.5 + brightness, 0, 1);
      }
      out = bctx.createImageData(cols, cols);
    };

    const render = () => {
      const n = colors.length - 1;
      // intro: big blocks that shrink to single pixels
      const block = Math.max(1, Math.round(1 + (1 - smooth(reveal)) * 9));
      const px = cols / size; // dither pixels per css px
      const rad = mouseRadius * px;
      const drift = shimmer ? Math.floor(time * 6) : 0;
      const d = out.data;
      for (let y = 0; y < cols; y++) {
        for (let x = 0; x < cols; x++) {
          const bx = x - (x % block);
          const by = y - (y % block);
          const si = by * cols + bx;
          const i = y * cols + x;

          let touch = 0;
          for (let k = 0; k < trailPts.length; k++) {
            const p = trailPts[k];
            const dist = Math.hypot(x - p.x * px, y - p.y * px);
            const reach = rad * (0.25 + 0.75 * p.w);
            if (dist < reach) touch = Math.max(touch, p.w * (1 - smooth(dist / reach)));
          }
          for (let k = 0; k < ripples.length; k++) {
            const r = ripples[k];
            const life = r.age / RIPPLE_SECONDS;
            const dist = Math.hypot(x - r.x * px, y - r.y * px);
            const front = life * cols * 0.9;
            touch = Math.max(touch, Math.exp(-(((dist - front) / (cols * 0.06)) ** 2)) * (1 - life) ** 2);
          }

          const t = BAYER8[((y + drift) & 7) * 8 + ((x + (drift >> 1)) & 7)] - 0.5;
          const v = clamp(luma[si] + t / n, 0, 1);
          const c = colors[Math.round(v * n)];
          const o = i * 4;
          const a = photo[si * 4 + 3];
          d[o] = c[0] + (photo[si * 4] - c[0]) * touch;
          d[o + 1] = c[1] + (photo[si * 4 + 1] - c[1]) * touch;
          d[o + 2] = c[2] + (photo[si * 4 + 2] - c[2]) * touch;
          d[o + 3] = a;
        }
      }
      bctx.putImageData(out, 0, 0);
      const w = canvas.width;
      ctx.clearRect(0, 0, w, w);
      ctx.save();
      ctx.beginPath();
      ctx.arc(w / 2, w / 2, w / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(buf, 0, 0, w, w);
      ctx.restore();
    };

    const frame = (now) => {
      raf = 0;
      if (!alive || !visible || document.hidden || !ready) return;
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      if (!reduce) time += dt;
      if (reveal < 1) reveal = Math.min(1, reveal + dt / INTRO_SECONDS);
      const decay = Math.exp(-dt / (0.15 + trail * 1.6)); // long, slow-fading tail
      for (let k = trailPts.length - 1; k >= 0; k--) {
        trailPts[k].w *= decay;
        if (trailPts[k].w < 0.01) trailPts.splice(k, 1);
      }
      for (let k = ripples.length - 1; k >= 0; k--) {
        ripples[k].age += dt;
        if (ripples[k].age >= RIPPLE_SECONDS) ripples.splice(k, 1);
      }
      const active = reveal < 1 || trailPts.length > 0 || ripples.length > 0;
      // when nothing is happening, redraw ~8 times a second so the grain drifts like old film
      if (active || now - lastIdle > 125) {
        render();
        lastIdle = now;
      }
      if (active || (shimmer && !reduce)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf && alive) raf = requestAnimationFrame(frame);
    };

    const local = (e) => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top, rect.width];
    };

    const onMove = (e) => {
      if (!ready || reduce) return;
      const [x, y, w] = local(e);
      // only react while the cursor is on the photo itself (inside the circle), like the title
      if (Math.hypot(x - w / 2, y - w / 2) > w / 2) return;
      const head = trailPts[0];
      if (head && Math.hypot(head.x - x, head.y - y) < 1.5) {
        head.x = x;
        head.y = y;
        head.w = 1;
      } else {
        trailPts.unshift({ x, y, w: 1 });
        if (trailPts.length > MAX_TRAIL) trailPts.pop();
      }
      wake();
    };

    const onDown = (e) => {
      if (!ready || reduce || !clickRipple) return;
      const [x, y, w] = local(e);
      if (x < 0 || y < 0 || x > w || y > w) return;
      ripples.push({ x, y, age: 0 });
      if (ripples.length > 3) ripples.shift();
      wake();
    };

    const start = () => {
      if (!alive) return;
      layout();
      ready = true;
      render();
      wake();
    };
    img.onload = start;
    if (img.complete && img.naturalWidth) start();

    const ro = new ResizeObserver(() => {
      if (!ready) return;
      layout();
      render();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    io.observe(wrap);
    const onVisibility = () => {
      last = 0;
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // palette is compared by value so an inline array doesn't restart the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, palette.join(), pixelSize, contrast, brightness, mouseRadius, trail, shimmer, clickRipple, intro]);

  return (
    <span ref={wrapRef} className={`dither-image ${className}`.trim()}>
      <canvas ref={canvasRef} role="img" aria-label={alt} />
    </span>
  );
}
