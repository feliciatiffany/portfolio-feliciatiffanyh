// src/pages/Home.jsx — profile photo + intro, with project images spiraling around the title
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";
import DitherImage from "../components/DitherImage.jsx";
import GlassSurface from "../components/GlassSurface.jsx";
import LineFilter from "../components/LineFilter.jsx";
import DomeGallery from "../components/DomeGallery.jsx";

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

  const intro = (
    <div className="home__center">
      <DitherImage
        className="avatar avatar--scramble"
        src={PROFILE_SRC}
        alt="Felicia Hertada"
        contrast={1.2}
        brightness={0.04}
      />

      <ScrambledText as="h1" className="home-intro" {...historyTitle}>
        Hi, I’m{" "}
        <Link to="/about" className="home-intro__name">Fany</Link>!
        <br />
        a <span className="home-intro__role">tech &amp; product designer</span>,
        <br />
        but other time, I’m exploring
      </ScrambledText>

      <nav className="home-links" aria-label="Explore">
        {/* each link sits in its own glass pill */}
        <div className="home-glass-row">
          {LINKS.map((l) => (
            <GlassSurface
              key={l.to}
              className="home-glass"
              width="fit-content"
              height="auto"
              borderRadius={999}
              backgroundOpacity={0.28}
              displace={0.4}
              distortionScale={-160}
              saturation={1.1}
            >
              <LineFilter direction="row" items={[{ key: l.to, label: l.label, to: l.to }]} />
            </GlassSurface>
          ))}
        </div>
      </nav>
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
