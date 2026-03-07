import React from "react";
import { Link } from "react-router-dom";

function ThumbMedia({ item }) {
  if (!item) return null;
  if (item.type === "video") {
    return <video src={item.src} muted loop playsInline autoPlay />;
  }
  return <img src={item.src} alt={item.alt || ""} loading="lazy" />;
}

export default function ProjectCard({ project, onPreview }) {
  const thumbRef = React.useRef(null);
  const firstMedia = project?.media?.[0] || null;

  return (
    <Link
      to={`/work/${project.slug}`}
      className="proj-card-link"
      onMouseEnter={() => onPreview?.(firstMedia, thumbRef.current)}
      onFocus={() => onPreview?.(firstMedia, thumbRef.current)}
    >
      <article className="proj-card">
        <div className="proj-row">
          <div className="row-top">
            <span className="title">{project.title}</span>

            <span className="meta-block">
              <span className="num">{project.num}</span>
              <span className="label">{project.label}</span>
            </span>

            <span className="thumb-wrap">
              <span className="thumb" ref={thumbRef}>
                <ThumbMedia item={firstMedia} />
              </span>
            </span>

            <span className="punct">;</span>
          </div>
        </div>
      </article>
    </Link>
  );
}