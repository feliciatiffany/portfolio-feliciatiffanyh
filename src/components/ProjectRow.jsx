import React from "react";
import { Link } from "react-router-dom";
import Media from "./Media.jsx";

export default function ProjectRow({ p, onHover }) {
  const firstMedia = (p.media || [])[0] || null;

  const linkProps = p.externalUrl
    ? { href: p.externalUrl, target: "_blank", rel: "noreferrer" }
    : { to: `/work/${p.slug}` };

  const LinkComponent = p.externalUrl ? "a" : Link;

  return (
    <LinkComponent
      {...linkProps}
      className="proj-card-link"
      onMouseEnter={() => onHover?.(p, firstMedia)}
      onFocus={() => onHover?.(p, firstMedia)}
    >
      <article className="proj-card">
        <div className="proj-row">
          <div className="row-top">
            <span className="title">{p.title}</span>

            <span className="meta-block">
              <span className="num">{p.num}</span>
              <span className="label">{p.label}</span>
            </span>

            <span className="thumb-wrap">
              <span className="thumb">
                <Media item={firstMedia} autoPlay={firstMedia?.type === "video"} controls={false} />
              </span>
            </span>

            <span className="punct">;</span>
          </div>
        </div>
      </article>
    </LinkComponent>
  );
}