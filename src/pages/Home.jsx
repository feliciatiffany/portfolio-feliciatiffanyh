// src/pages/Home.jsx — profile photo + intro, with project images spiraling around the title
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import Socials from "../components/Socials.jsx";
import GlassSurface from "../components/GlassSurface.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import DomeGallery from "../components/DomeGallery.jsx";
import POSTERS from "../data/videoPosters.json"; // stills from timeline videos (generated from each video)
import THUMBS from "../data/domeThumbs.json"; // 640px copies for the dome tiles (originals stay for the project pages)

// small copy: the dithered photo samples it at ~256px, so it looks the same and loads in a blink
const PROFILE_SRC = "/media/thumbs/profile.webp";

// The dome behind the intro shows one image per project from the Timeline (projects and the
// Creative Side; no awards, jobs or QR codes). Video cards use a still pulled from the video, and every
// tile uses a small 640px copy (src/data/domeThumbs.json). Decoration only, never links.
const isImage = (src) => /\.(png|jpe?g|webp|gif|avif)$/i.test(src || "");
const THUMB_RING = Object.values(THUMBS).map((src) => ({ src, alt: "" }));

function ringFrom(entries) {
  const seen = new Set();
  const out = [];
  for (const e of entries) {
    if (e.type !== "projects" && e.type !== "creative") continue;
    const piece = e.collage?.find((c) => !/qr/i.test(c.src)); // e.g. Red Doors: the installation photo
    const m = e.media;
    const src = piece?.src || (m?.type === "video" ? m.poster || POSTERS[m.src] : m?.src);
    if (!isImage(src) || seen.has(src)) continue;
    seen.add(src);
    out.push({ src: THUMBS[src] || src, alt: "" });
  }
  return out;
}

// Start with the ready-made thumbnails (no project data needed), then pick up any project added since
function useRing() {
  const [ring, setRing] = useState(THUMB_RING);
  useEffect(() => {
    let live = true;
    import("../lib/timeline.js").then(({ ENTRIES }) => {
      const full = ringFrom(ENTRIES);
      const known = new Set(THUMB_RING.map((r) => r.src));
      if (live && full.some((r) => !known.has(r.src))) setRing(full);
    });
    return () => (live = false);
  }, []);
  return ring;
}

const LINKS = [
  { to: "/built", label: "Timeline", arrow: true },
  { to: "/study-case", label: "Study Case" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About me" },
];

// Same glass as the original homepage pills
const GLASS = { borderRadius: 999, backgroundOpacity: 0.28, displace: 0.4, distortionScale: -160, saturation: 1.1 };

// What I explore on the side, typed out one at a time (from the About page's "What I love")
const EXPLORING = ["life’s side quests", "short films", "racquet sports", "new cities", "Ghibli films", "a good cup of matcha", "concerts"];

function Typewriter({ words }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduce ? words[0].length : 0);
  const [erasing, setErasing] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const word = words[i];
    let t;
    if (!erasing && n < word.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!erasing) t = setTimeout(() => setErasing(true), 1800); // hold the full word
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35);
    else {
      setErasing(false);
      setI((i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [i, n, erasing, words, reduce]);
  return (
    // data-typing stops the caret blinking while letters are moving, like a real text cursor
    <span className="home-typed" aria-live="off" data-typing={n > 0 && n < words[i].length ? "true" : undefined}>
      {/* a zero-width space keeps the line its full height when the word is fully erased */}
      <span className="home-typed__word">{words[i].slice(0, n) || "\u200b"}</span>
      <span className="home-typed__caret" aria-hidden="true" />
    </span>
  );
}



// Narrow screens get a tall orbit so the images circle the title instead of squeezing past it
function useNarrow(query = "(max-width: 700px)") {
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return narrow;
}

export default function Home() {
  const narrow = useNarrow();
  const RING = useRing();

  const intro = (
    <div className="home__center">
      <DitherImage
        className="avatar avatar--scramble"
        src={PROFILE_SRC}
        alt="Felicia Hertada"
        contrast={1.2}
        brightness={0.04}
      />

      <h1 className="home-intro">
        <ScrambledText as="span" className="home-intro__lines" {...historyTitle}>
          Hi, I’m{" "}
          <Link to="/about" className="home-intro__name">Fany</Link>.
          <br />
          An <span className="home-intro__role">engineer &amp; product designer</span>
          <br />
          who also explores
        </ScrambledText>
        <span className="scrambled-text-sr"> {EXPLORING.join(", ")}</span>
        <Typewriter words={EXPLORING} />
      </h1>

      <nav className="home-links" aria-label="Explore">
        {/* each button sits in its own glass pill */}
        {LINKS.map((l) => (
          <GlassSurface key={l.to} className="home-glass" {...GLASS} width="fit-content" height="auto">
            <Link to={l.to} className="home-pill">
              {l.label}
              {l.arrow && <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.8} className="home-pill__arrow" />}
            </Link>
          </GlassSurface>
        ))}
      </nav>

      <div className="home-socials">
        <Socials icons wrap={(link, key) => (
          <GlassSurface key={key} className="home-glass home-glass--round" {...GLASS} width={40} height={40}>
            {link}
          </GlassSurface>
        )} />
      </div>
    </div>
  );

  return (
    <section className={`home${narrow ? " home--narrow" : ""}`}>
      {/* A slowly spinning dome of the work behind everything, dithered so it fades into the page */}
      <div className="home-dome">
        {/* Sized like the React Bits example: radius ≈ 0.78 × page width, so the sphere curves away right at the left and right edges */}
        <DomeGallery
          images={RING}
          fit={0.78}
          fitBasis="width"
          heightGuard={Infinity}
          minRadius={600}
          segments={35}
          maxVerticalRotationDeg={4}
          imageBorderRadius="var(--radius-tile)"
          imageFilter="grayscale(.9) sepia(.12) contrast(1.05)"
          autoRotate={narrow ? 5 : 3.5}
          dragDampening={0.8}
        />
      </div>
      {intro}
    </section>
  );
}
