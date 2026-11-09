// src/pages/Home.jsx — profile photo + intro, with project images spiraling around the title
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import LineFilter from "../components/LineFilter.jsx";
import OrbitImages from "../components/OrbitImages.jsx";

const PROFILE_SRC = "/media/profileimage.JPEG";

/* Ring images, all shown in the same 4:3 box. `cutout` = transparent PNG (fit inside, no frame).
   `to` = project page (hover shine + pauses the ring). */
const RING = [
  { src: "/media/home/caress-cutout.png", to: "/work/caress", alt: "Caress A Bear", cutout: true },
  { src: "/media/home/posterDreamer.jpg", to: "/work/greatest-dreamer", alt: "I Am the Greatest Dreamer poster" },
  { src: "/media/home/tellai-cutout.png", to: "/work/tell-ai", alt: "TellAI telephone", cutout: true },
  { src: "/media/home/unseenCity.jpg", to: "/work/unseen-city", alt: "Seeing the Unseen City" },
  { src: "/media/logosmall.png", alt: "Fany logo", cutout: true },
  { src: "/media/home/book.png", to: "/work/book-indo", alt: "Wonder of Indonesia book", cutout: true },
  { src: "/media/home/sunney.jpg", to: "/work/sunney", alt: "Sunney game" },
  { src: "/media/home/blender-cutout.png", to: "/work/a-week-of-blender", alt: "Blender picnic island", cutout: true },
  { src: "/media/home/nusaPenida.jpg", to: "/work/nusa-penida", alt: "Nusa Penida brand guide" },
  { src: "/media/home/cilok-cutout.png", to: "/work/cilok", alt: "Cilok cup", cutout: true },
  { src: "/media/home/redDoors.jpg", to: "/work/redDoors", alt: "Red Doors" },
  { src: "/media/home/idcard.png", to: "/work/personal-logo-design", alt: "Personal ID card", cutout: true },
  { src: "/media/home/dialogue.jpg", to: "/work/dialogue-with-the-wind", alt: "Dialogue with the Wind" },
];

const LINKS = [
  { to: "/built", label: "What I’ve done" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About me" },
];

// Two passes through the work (the second shuffled) so the ring is packed without neighbours repeating
const ORBIT = [...RING, ...[6, 2, 9, 0, 11, 4, 7, 1, 10, 3, 12, 8, 5].map((i) => RING[i])].map((it) => ({
  src: it.src,
  alt: "",
}));

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

  return (
    <section className="home">
      {/* One dense ring that circles around the intro, never across it. Images are decoration only. */}
      <OrbitImages
        className="home-orbit"
        images={ORBIT}
        shape="ellipse"
        radiusX={narrow ? 360 : 720}
        radiusY={narrow ? 640 : 340}
        rotation={0}
        duration={ORBIT.length * 2.8}
        steps={ORBIT.length}
        hold={0.55}
        itemSize={narrow ? 120 : 108}
        depth={1}
        farBlur={4}
        farSepia={0.6}
        itemRadius={8}
        shadow={0.08}
        hoverScale={1}
        hoverSpeed={0}
        clickToFront={false}
        draggable={false}
        width={narrow ? "100%" : "min(1440px, 96%)"}
        height="calc(100% - var(--orbit-pad) * 2)"
        centerContent={
          <div className="home__center">
            <DitherImage className="avatar avatar--scramble" src={PROFILE_SRC} alt="Felicia Hertada" />

            <ScrambledText as="h1" className="home-intro" {...historyTitle}>
              Hi, I’m{" "}
              <Link to="/about" className="home-intro__name">Fany</Link>!
              <br />
              a <span className="home-intro__role">tech &amp; product designer</span>,
              <br />
              but other time, I’m exploring
            </ScrambledText>

            <nav className="home-links" aria-label="Explore">
              <LineFilter direction="row" items={LINKS.map((l) => ({ key: l.to, label: l.label, to: l.to }))} />
            </nav>
          </div>
        }
      />
    </section>
  );
}
