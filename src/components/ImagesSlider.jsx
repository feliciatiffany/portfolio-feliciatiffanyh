import React, { useEffect, useMemo, useState } from "react";

function isVideo(item) {
  if (!item) return false;
  if (item.type === "video") return true;
  const src = String(item.src || "").toLowerCase();
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov") || src.endsWith(".m4v");
}

/**
 * Horizontal slider (one item per view) + optional click-to-zoom.
 * - Keeps your CSS hooks: proj-slider, slider-container, slider, slide, proj-slide-media, navigation-buttons
 * - showTitle=false lets you embed the slider under your own heading (no duplicate header).
 */
export default function ImagesSlider({ title = "Slider", items = [], onOpen, showTitle = true }) {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const total = safeItems.length;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (total === 0) return;
    setIndex((i) => Math.min(i, total - 1));
  }, [total]);

  if (total === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="proj-slider">
      {showTitle ? <h3 className="proj-minihead">{title}</h3> : null}

      <div className="slider-container" aria-roledescription="carousel">
        <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>
          {safeItems.map((item, i) => {
            const key = item?.src ? `${item.src}-${i}` : i;
            const video = isVideo(item);

            return (
              <div className="slide" key={key} style={{ flexDirection: "column", gap: 10 }}>
                {video ? (
                  <video className="proj-slide-media" src={item.src} controls />
                ) : (
                  <button
                    type="button"
                    className="proj-slide-btn"
                    onClick={onOpen ? () => onOpen(item) : undefined}
                    aria-label={item?.alt ? `Open ${item.alt}` : "Open image"}
                  >
                    <img className="proj-slide-media" src={item.src} alt={item.alt || ""} />
                  </button>
                )}
                {item?.title ? (
                  <p className="proj-slide-caption">{item.title}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <div className="navigation-buttons" aria-hidden="false">
            <button type="button" className="prev" onClick={prev} aria-label="Previous slide">
              ❮
            </button>
            <button type="button" className="next" onClick={next} aria-label="Next slide">
              ❯
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
