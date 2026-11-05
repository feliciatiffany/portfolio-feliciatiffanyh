// src/pages/Home.jsx — profile photo + intro, circled by a tilted 3D "Saturn ring" of project images
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PROFILE_SRC = "/media/profileimage.JPEG";

/* Ring images. `cutout` = transparent PNG (no frame). `to` = project page (hover shine + pauses the ring). */
const RING = [
  { src: "/media/home/caress-cutout.png", to: "/work/caress", alt: "Caress A Bear", cutout: true },
  { src: "/media/home/posterDreamer.jpg", to: "/work/greatest-dreamer", alt: "I Am the Greatest Dreamer poster" },
  { src: "/media/home/tellai-cutout.png", to: "/work/tell-ai", alt: "TellAI telephone", cutout: true },
  { src: "/media/home/unseenCity.jpg", to: "/work/unseen-city", alt: "Seeing the Unseen City" },
  { src: "/media/logosmall.png", alt: "Fany logo", cutout: true, small: true },
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
  { to: "/nutshell", label: "Digital garden" },
  { to: "/about", label: "About me" },
];

const TILT = (-9 * Math.PI) / 180; // ring tilt, like Saturn
const SPEED = 0.00012; // radians per ms (~52s per turn)

function OrbitRing() {
  const stageRef = useRef(null);
  const itemRefs = useRef([]);
  const paused = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = RING.length;
    let angle = 0;
    let last = performance.now();
    let raf;

    const place = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const narrow = w < 700; // phones: tall ring that loops above and below the text
      const rx = narrow ? w * 0.4 : Math.min(w * 0.44, 620);
      const ry = narrow ? h * 0.4 : Math.min(h * 0.4, rx * 0.42);
      const cos = Math.cos(TILT);
      const sin = Math.sin(TILT);

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = angle + (i / n) * Math.PI * 2;
        const ex = rx * Math.cos(t);
        const ey = ry * Math.sin(t);
        const x = ex * cos - ey * sin;
        const y = ex * sin + ey * cos;
        const depth = Math.sin(t); // +1 = front of the ring, -1 = back
        const scale = 0.9 - 0.32 * depth; // front smaller, back bigger
        const turn = -Math.cos(t) * 28; // images swivel as they travel round
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${depth * 120}px) rotateY(${turn}deg) scale(${scale})`;
        el.style.zIndex = depth < 0 ? 1 : 3; // back half passes behind the photo
        el.style.opacity = String(0.8 + 0.2 * (1 - Math.abs(depth)));
      });
    };

    const tick = (now) => {
      if (!paused.current) angle += (now - last) * SPEED;
      last = now;
      place();
      raf = requestAnimationFrame(tick);
    };

    if (still) {
      place();
      window.addEventListener("resize", place);
      return () => window.removeEventListener("resize", place);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hold = (on) => () => (paused.current = on);

  return (
    <div className="orbit" ref={stageRef} aria-hidden="false">
      {RING.map((it, i) => {
        const cls = `orbit__item${it.cutout ? " is-cutout" : ""}${it.small ? " is-small" : ""}`;
        const img = <img src={it.src} alt={it.alt} draggable="false" />;
        return it.to ? (
          <Link
            key={it.src}
            to={it.to}
            ref={(el) => (itemRefs.current[i] = el)}
            className={`${cls} shine`}
            onMouseEnter={hold(true)}
            onMouseLeave={hold(false)}
            onFocus={hold(true)}
            onBlur={hold(false)}
          >
            {img}
          </Link>
        ) : (
          <span key={it.src} ref={(el) => (itemRefs.current[i] = el)} className={cls}>
            {img}
          </span>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <section className="home">
      <OrbitRing />

      <div className="home__center">
        <img className="avatar" src={PROFILE_SRC} alt="Felicia Hertada" />

        <h1 className="home-intro">
          Hi, I’m{" "}
          <Link to="/about" className="home-intro__name">Fany</Link>!
          <br />a <span className="home-intro__role">tech &amp; product designer</span>,
          <br />but other time, I’m exploring
        </h1>

        <nav className="home-links" aria-label="Explore">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="home-links__a">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
