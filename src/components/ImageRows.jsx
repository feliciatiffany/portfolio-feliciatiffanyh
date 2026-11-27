// Continuous vertical columns of project stills behind the homepage intro.
// Each column loops forever (alternating direction). Columns sit on the
// inside of a mild cylinder (concave toward you, globe-like depth) without
// becoming a full sphere of discrete tiles.
import { useMemo } from "react";
import "./ImageRows.css";

const COLS = 9;
const PER_COL = 6;
// half-span of the visible arc (degrees). Larger = more wrap; keep mild.
const ARC_DEG = 58;

function splitCols(images, cols, perCol) {
  const pool = images.length ? images : [{ src: "", alt: "" }];
  const out = [];
  let i = 0;
  for (let c = 0; c < cols; c++) {
    const col = [];
    for (let k = 0; k < perCol; k++) {
      col.push(pool[i % pool.length]);
      i += 1;
    }
    // start each column further along the pool so neighbours don't match
    i += Math.floor(pool.length / cols) || 1;
    out.push(col);
  }
  return out;
}

export default function ImageRows({
  images = [],
  imageFilter = "grayscale(.9) sepia(.12) contrast(1.05)",
  imageBorderRadius = "var(--radius-tile)",
  className = "",
}) {
  const cols = useMemo(() => splitCols(images, COLS, PER_COL), [images]);

  return (
    <div
      className={`image-rows${className ? ` ${className}` : ""}`}
      style={{ "--image-filter": imageFilter, "--tile-radius": imageBorderRadius }}
      aria-hidden="true"
    >
      <div className="image-rows__stage">
        <div className="image-rows__cylinder">
          {cols.map((col, ci) => {
            const t = COLS === 1 ? 0 : ci / (COLS - 1);
            const angle = -ARC_DEG + t * ARC_DEG * 2;
            return (
              <div
                key={ci}
                className={`image-rows__col${ci % 2 ? " is-reverse" : ""}`}
                style={{
                  "--col-i": ci,
                  "--col-angle": `${angle}deg`,
                }}
              >
                <div className="image-rows__track">
                  {/* two copies so the vertical loop is seamless */}
                  {[0, 1].map((loop) => (
                    <div key={loop} className="image-rows__strip">
                      {col.map((img, ii) => (
                        <div key={`${loop}-${ii}-${img.src}`} className="image-rows__tile">
                          <img src={img.src} alt="" draggable={false} loading="lazy" decoding="async" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="image-rows__fade image-rows__fade--left" />
      <div className="image-rows__fade image-rows__fade--right" />
      <div className="image-rows__fade image-rows__fade--top" />
      <div className="image-rows__fade image-rows__fade--bottom" />
      <div className="image-rows__veil" />
    </div>
  );
}
