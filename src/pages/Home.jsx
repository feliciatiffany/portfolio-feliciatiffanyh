// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const PROFILE_SRC = "/media/profileimage.JPEG";

/* Image links under the name — swap media freely */
const DOORS = [
  {
    to: "/about",
    label: "about me",
    role: "fany",
    media: { type: "image", src: "/media/graphicdesign/idcard/idcard_mockup1.png" },
  },
  {
    to: "/nutshell",
    label: "in a nutshell",
    role: "graphic",
    media: { type: "video", src: "/media/digital/maximalist.mp4" },
  },
  {
    to: "/built",
    label: "things I built",
    role: "tech",
    media: { type: "video", src: "/media/techdesign/tracingdendur/thumbnail.mp4" },
  },
];

function DoorMedia({ media }) {
  if (media.type === "video") {
    return <video src={media.src} muted loop autoPlay playsInline preload="metadata" />;
  }
  return <img src={media.src} alt="" loading="lazy" />;
}

export default function Home() {
  return (
    <section className="home">
      <img className="avatar" src={PROFILE_SRC} alt="Felicia Hertada" />

      <h1 className="intro home-intro">
        <span className="mono">Hi, I’m</span>{" "}
        <Link to="/about" className="grow-band name" data-role="fany">
          Felicia Hertada
        </Link>
      </h1>

      <nav className="doors" aria-label="Explore">
        {DOORS.map((d) => (
          <Link key={d.to} to={d.to} className="door" data-role={d.role}>
            <span className="door__media">
              <DoorMedia media={d.media} />
            </span>
            <span className="door__label">{d.label}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
