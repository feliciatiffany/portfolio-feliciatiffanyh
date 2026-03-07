// src/components/ProjectList.jsx
import React from "react";
import ProjectRow from "./ProjectRow.jsx";
import Media from "./Media.jsx";
import { byCategory } from "../lib/projects.js";

export default function ProjectList({ categorySlug, className = "" }) {
  const items = byCategory(categorySlug);

  const [activeProj, setActiveProj] = React.useState(items?.[0] || null);
  const [activeMedia, setActiveMedia] = React.useState(items?.[0]?.media?.[0] || null);

  function handleHover(proj, media) {
    setActiveProj(proj);
    setActiveMedia(media || null);
  }

  return (
    <section className={`projects projects--grid ${className}`}>
      {/* LEFT */}
      <div className="projects-list">
        {items.map((p) => (
          <ProjectRow key={p.slug} p={p} onHover={handleHover} />
        ))}
      </div>

      {/* RIGHT */}
      <aside className="proj-stage">
        <div className="proj-stage__frame">
          <Media item={activeMedia} autoPlay={activeMedia?.type === "video"} controls={false} />
        </div>

        {activeProj && (
          <div className="proj-stage__meta" aria-hidden="true">
            <span className="t">{activeProj.title}</span>
            <span className="m">{activeProj.num} {activeProj.label}</span>
          </div>
        )}
      </aside>
    </section>
  );
}