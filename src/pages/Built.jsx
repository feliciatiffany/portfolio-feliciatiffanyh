// src/pages/Built.jsx — "What I've done": center-line timeline with category filters
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TYPES, ENTRIES, groupByYear } from "../lib/timeline";
import LineFilter from "../components/LineFilter.jsx";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import CodeSlots from "../components/CodeSlots.jsx";
import useReveal from "../lib/useReveal.js";

// Outer span carries the hover glow (only around the image); inner frame crops to one ratio
function CardMedia({ media, glow }) {
  if (!media?.src) return null;
  return (
    <span className={`tl-card__media${glow ? " shine" : ""}${media.wide ? " is-wide" : ""}${media.blend ? " is-blend" : ""}${media.fill ? " is-fill" : ""}`}>
      <span className="tl-card__frame">
        {media.type === "video" ? (
          <video src={media.src} poster={media.poster} muted loop autoPlay playsInline preload="metadata" />
        ) : (
          <img src={media.src} alt={media.alt || ""} loading="lazy" />
        )}
      </span>
    </span>
  );
}

// Several photos in one row: each grows by its width/height ratio, so all share one height and fill the row
function CardGallery({ images, glow }) {
  return (
    <span className={`tl-card__gallery${glow ? " shine" : ""}`}>
      {images.map((im) => (
        <img key={im.src} src={im.src} alt={im.alt || ""} loading="lazy" style={{ flex: `${im.ratio || 1} 1 0%` }} />
      ))}
    </span>
  );
}

// Cut-out pieces laid over each other; each piece's place, tilt and hover motion come from data
function CardCollage({ pieces }) {
  return (
    <span className="tl-collage">
      {pieces.map((p) => (
        <img
          key={p.src}
          src={p.src}
          alt={p.alt || ""}
          loading="lazy"
          className={`tl-collage__piece${p.card ? " is-card" : ""}`}
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, zIndex: p.z,
            "--r": `${p.r || 0}deg`,
            "--hx": `${p.hx || 0}%`, "--hy": `${p.hy || 0}%`, "--hr": `${p.hr ?? p.r ?? 0}deg`, "--hs": p.hs || 1.06,
          }}
        />
      ))}
    </span>
  );
}

// Cards alternate sides of the center line (masonry rows, see useMasonry).
// Creative Side cards are compact: small thumbnail, title + date only.
function Card({ item, index }) {
  const body = (
    <>
      {item.collage?.length ? (
        <CardCollage pieces={item.collage} />
      ) : item.gallery?.length ? (
        <CardGallery images={item.gallery} glow={!!(item.to || item.href)} />
      ) : (
        <CardMedia media={item.media} glow={!!(item.to || item.href)} />
      )}
      <span className="tl-card__text">
        <span className="tl-card__title">{item.title}</span>
        <span className="tl-card__date">{item.date}</span>
        {item.subtitle && item.type !== "creative" && <span className="tl-card__sub">{item.subtitle}</span>}
        {item.desc && <span className="tl-card__desc">{item.desc}</span>}
        {item.bullets?.length > 0 && (
          <span className="tl-card__bullets" role="list">
            {item.bullets.map((b) => (
              <span key={b} role="listitem">{b}</span>
            ))}
          </span>
        )}
      </span>
    </>
  );

  return (
    <li
      className="tl-card reveal"
      data-type={item.type}
      data-side={index % 2 ? "right" : "left"}
    >
      {item.to ? (
        <Link to={item.to} className="tl-card__link">{body}</Link>
      ) : item.href ? (
        <a href={item.href} className="tl-card__link" target="_blank" rel="noopener noreferrer">{body}</a>
      ) : (
        <div className="tl-card__link">{body}</div>
      )}
    </li>
  );
}

// Each card spans as many 8px grid rows as it is tall, so the two sides pack tightly in order
const ROW = 8;
function useMasonry(root, deps) {
  useEffect(() => {
    const cards = [...(root.current?.querySelectorAll(".tl-card") || [])];
    const fit = () =>
      cards.forEach((el) => {
        const cs = getComputedStyle(el);
        const h = el.firstElementChild.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        el.style.gridRowEnd = `span ${Math.ceil(h / ROW)}`;
      });
    fit();
    const ro = new ResizeObserver(fit);
    cards.forEach((el) => ro.observe(el.firstElementChild));
    return () => ro.disconnect();
  }, deps);
}

const PASSWORD = "matcha";
const UNLOCK_KEY = "built-unlocked";

function readUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Built() {
  const [active, setActive] = useState(() => new Set(TYPES.map((t) => t.key)));
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [status, setStatus] = useState("idle");

  const groups = useMemo(
    () => groupByYear(ENTRIES.filter((e) => active.has(e.type))),
    [active]
  );

  const root = useReveal([groups, unlocked]);
  useMasonry(root, [groups, unlocked]);

  const toggle = (key) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const onPassword = (code) => {
    if (code !== PASSWORD) {
      setStatus("error");
      return;
    }
    setStatus("success");
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* private mode can block storage; the page still opens */
    }
    window.setTimeout(() => setUnlocked(true), 900);
  };

  return (
    <section className="built" ref={root}>
      <header className="built-head">
        <ScrambledText as="h1" className="built-title" {...historyTitle}>
          What I’ve done - A Timeline
        </ScrambledText>
        <p className="built-sub">
          Putting things on a timeline shows the bigger picture, and how each moment shapes the next.
        </p>
      </header>

      {unlocked ? (
      <>
      <LineFilter
        direction="row"
        className="tl-filters"
        ariaLabel="Filter categories"
        items={TYPES.map((t) => ({ key: t.key, label: t.label, type: t.key }))}
        pressed={active}
        onToggle={toggle}
      />

      {groups.length > 0 && (
        <nav className="tl-jump" aria-label="Jump to year">
          {groups.map((g) => (
            <a key={g.key} href={`#y-${g.key}`}>{g.heading}</a>
          ))}
        </nav>
      )}

      {groups.length === 0 && (
        <p className="tl-empty">Pick a category above to light up the timeline.</p>
      )}

      {groups.map((g) => (
        <div key={g.key} id={`y-${g.key}`} className="tl-year">
          <h2 className="tl-year__h">
            {g.heading}
            {g.note && <span className="tl-year__note">{g.note}</span>}
          </h2>
          <ol className="tl-list">
            {g.items.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      ))}

      {/* Closing note at the very end of the timeline */}
      <footer className="tl-outro reveal">
        <h2 className="tl-outro__h">Since you scrolled this far…</h2>
        <p>
          I grew up in a very science- and computer-science-minded family… crying a little when I
          didn’t get a good score on a math exam, spending summers nitpicking code with my family, and
          being a total nerd about grades…
        </p>
        <p>
          People always ask me, “Why go into creative and art direction when you’re good at science?”
          But I’ve always seen those logical endeavors as what shaped how I see the creative world. I
          approach design differently: methodically and critically, and of course as an engineer and
          coder in most of my work.
        </p>
        <p>
          This educational background, combined with always traveling, meeting new people, and moving
          cities for different schools, made me endlessly curious and taught me to approach the world
          with my eyes and mind wide open.
        </p>
      </footer>
      </>
      ) : (
        <div className="built-lock">
          <p className="built-lock__note">Password</p>
          <CodeSlots
            letters
            length={PASSWORD.length}
            status={status}
            autoFocus
            ariaLabel="Password"
            onChange={() => setStatus("idle")}
            onComplete={onPassword}
            accentColor="var(--accent)"
            inkColor="var(--foreground)"
            slotColor="var(--muted)"
            digitColor="var(--accent-foreground)"
            dangerColor="var(--destructive)"
            slotSize={44}
            gap={8}
            radius={12}
            bounce={0.2}
            settle={0.3}
            rise={8}
            cascade={20}
          />
        </div>
      )}
    </section>
  );
}
