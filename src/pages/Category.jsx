// ─────────────────────────────────────────────────────────────────────────────
// File: src/pages/Category.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link, useParams } from "react-router-dom";
import { byCategory } from "../lib/projects.js";
import { ProximityFrame, ProximityTitle } from "../components/VariableProximity.jsx";

const VALID = new Set(["tech", "digital", "graphic", "others"]);

/* Reusable media node (img/video) */
function Media({ item, autoPlay = false }) {
  if (item?.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        {...(autoPlay ? { autoPlay: true } : {})}
      />
    );
  }
  return <img src={item?.src} alt={item?.alt || ""} loading="lazy" />;
}

/* Thumb (same node enlarges via CSS on hover) */
function ThumbWrap({ item }) {
  return (
    <span className="thumb-wrap">
      <span className="thumb">
        <Media item={item} autoPlay={item?.type === "video"} />
      </span>
    </span>
  );
}

/* Card (box) — hover anywhere triggers title stretch + media growth */
function ProjectCard({ row }) {
  return (
    <article className="proj-card">
      <div className="proj-row">
        <div className="row-top">
          <span className="title">{row.title}</span>
          <span className="meta-block">
            <span className="num">{row.num}</span>
            <span className="label">{row.label}</span>
          </span>
          {(row.media || []).map((m, j) => <ThumbWrap key={j} item={m} />)}
          <span className="punct">;</span>
        </div>
      </div>
    </article>
  );
}

export default function Category({ kind }) {
  const { categorySlug } = useParams();
  const slug = (kind || categorySlug || "").toLowerCase();

  if (!VALID.has(slug)) {
    return (
      <section className="hero">
        <p className="intro">Not found.</p>
      </section>
    );
  }

  const projects = byCategory(slug);

  return (
    <>
      {/* INTRO pinned in its own grid area */}
      <section className="hero">
        <ProximityFrame as="p" className="intro">
          <span className="line">
            <span className="mono"><ProximityTitle label="Hi, I’m" /></span>{" "}
            <Link to="/about" className="grow-band name" data-role="fany">
              <ProximityTitle label="Fany!" />
            </Link>{" "}
            <span className="mono"><ProximityTitle label="a" /></span>{" "}
            <Link
              to="/tech"
              className={`grow-band ${slug === "tech" ? "is-current" : ""}`}
              data-role="tech"
            >
              <ProximityTitle label="creative technologist" />
            </Link>
            <span className="comma">,</span>{" "}
            <Link
              to="/digital"
              className={`grow-band ${slug === "digital" ? "is-current" : ""}`}
              data-role="digital"
            >
              <ProximityTitle label="digital product" />
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link
              to="/graphic"
              className={`grow-band ${slug === "graphic" ? "is-current" : ""}`}
              data-role="graphic"
            >
              <ProximityTitle label="graphic designer" />
            </Link>
            <span className="comma">,</span>{" "}
            <span className="mono"><ProximityTitle label="and I create" /></span>{" "}
            <Link
              to="/others"
              className={`grow-band ${slug === "others" ? "is-current" : ""}`}
              data-role="others"
            >
              <ProximityTitle label="solutions" />
            </Link>
          </span>
        </ProximityFrame>
      </section>

      {/* PROJECT LIST pinned to content grid area */}
      <section className="projects projects--tiny projects--block projects--side projects--grid">
        {projects.map((row) => (
          <ProjectCard key={row.slug || row.title} row={row} />
        ))}
      </section>
    </>
  );
}
