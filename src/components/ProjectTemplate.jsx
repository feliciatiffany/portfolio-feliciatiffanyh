// src/components/ProjectTemplate.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ImagesRow from "./ImagesRow.jsx";
import ImagesSlider from "./ImagesSlider.jsx";
import DescriptionProject1 from "./DescriptionProject1.jsx";
import Lightbox from "./Lightbox.jsx";
import { projectDate } from "../lib/timeline.js";
import ScrambledText, { historyTitle } from "./ScrambledText.jsx";
import { REFLECTIONS } from "../lib/reflections.js";

// Closing section on every big project: the outcome I wanted, the bet I made, how I'd know, what I learned
const REFLECTION_ROWS = [
  ["goal", "The goal"],
  ["hypothesis", "My hypothesis"],
  ["measure", "How I’d know it worked"],
  ["learned", "What I learned, or what surprised me"],
];
function Reflection({ data }) {
  const rows = REFLECTION_ROWS.filter(([key]) => data?.[key]);
  if (!rows.length) return null;
  return (
    <section className="proj-section proj-reflection">
      <h3 className="proj-minihead">Looking back</h3>
      <dl className="proj-reflection__list">
        {rows.map(([key, label]) => (
          <div key={key} className="proj-reflection__item">
            <dt>{label}</dt>
            <dd>{data[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const ytEmbed = (id) => `https://www.youtube.com/embed/${id}`;

function AutoVideo({ src, alt, poster }) {
  const type =
    src?.endsWith(".mp4")
      ? "video/mp4"
      : src?.endsWith(".mov")
        ? "video/quicktime"
        : undefined;

  return (
    <video
      className="proj-videoWide__video"
      aria-label={alt || "Project video"}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
    >
      <source src={src} type={type} />
    </video>
  );
}

const IG_SCRIPT_ID = "instagram-embed-script";

function ensureInstagramScript() {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.instgrm?.Embeds?.process) return Promise.resolve();

  const existing = document.getElementById(IG_SCRIPT_ID);
  if (existing) return new Promise((resolve) => setTimeout(resolve, 80));

  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.id = IG_SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

function InstagramEmbed({ url, captioned = false }) {
  useEffect(() => {
    let cancelled = false;

    ensureInstagramScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds?.process?.();
    });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!url) return null;

  return (
    <div className="proj-captioned">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned={captioned ? "true" : undefined}
        style={{
          background: "var(--color-bg)",
          border: 0,
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: 540,
        }}
      />
      <a href={url} target="_blank" rel="noreferrer" className="proj-row6__link">
        Open on Instagram
      </a>
    </div>
  );
}

function getByPath(obj, path) {
  if (!path) return undefined;
  return String(path)
    .split(".")
    .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

function joinClasses(...parts) {
  return parts.filter(Boolean).join(" ");
}

const asList = (v) => (Array.isArray(v) ? v : v ? [v] : []);

// Big media under the title: first item of project.media
function Hero({ item }) {
  if (!item?.src) return null;
  return (
    <figure className="proj-hero">
      {item.type === "video" ? (
        <AutoVideo src={item.src} alt={item.alt} poster={item.poster} />
      ) : (
        <img src={item.src} alt={item.alt || ""} />
      )}
    </figure>
  );
}

// Date | Stacks | Category row under the hero
function MetaRow({ project }) {
  const meta = project.meta || {};
  const cols = [
    { label: "Date", items: asList(projectDate(project.slug) || meta.year) },
    { label: "Stacks", items: asList(meta.tools) },
    { label: "Category", items: asList(meta.category) },
  ].filter((c) => c.items.length);
  if (!cols.length) return null;
  return (
    <dl className="proj-metarow">
      {cols.map((c) => (
        <div key={c.label} className="proj-metarow__col">
          <dt>{c.label}</dt>
          {c.items.map((it) => (
            <dd key={it}>{it}</dd>
          ))}
        </div>
      ))}
    </dl>
  );
}

export default function ProjectTemplate({ project }) {
  const [lbItem, setLbItem] = useState(null);
  const layoutAttr = project?.layout ? project.layout : undefined;

  const openLightbox = (item) => {
    if (!item?.src) return;
    setLbItem({
      type: item.type || "image",
      src: item.src,
      alt: item.alt || "",
      caption: item.alt || "",
    });
  };

  const closeLightbox = () => setLbItem(null);

  const legacySections = useMemo(() => {
    if (!project) return [];
    const out = [];

    out.push({ kind: "intro" });

    if (Array.isArray(project.media) && project.media.length) {
      out.push({ kind: "media", title: null, layout: "gallery", itemsPath: "media" });
    }

    if (project.slider?.items?.length) {
      out.push({
        kind: "media",
        title: project.slider.title || "Slider",
        layout: "slider",
        itemsPath: "slider.items",
      });
    }

    if (project.descLeft || project.descRight) {
      out.push({ kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" });
    }

    const r6 = project.row6;
    if (r6) {
      if (r6.websiteScreens?.media?.length) {
        out.push({
          kind: "media",
          title: r6.websiteScreens.title || "Documentation",
          layout: r6.websiteScreens.layout || r6.layout || "gallery",
          itemsPath: "row6.websiteScreens.media",
        });
      }
      if (Array.isArray(r6.items) && r6.items.length) {
        out.push({
          kind: "media",
          title: r6.title || "Row 6",
          layout: r6.layout || "gallery",
          itemsPath: "row6.items",
        });
      }
      if (Array.isArray(r6.youtubes) && r6.youtubes.length) {
        out.push({ kind: "youtubes", title: r6.title || "Videos", itemsPath: "row6.youtubes" });
      }
      if (r6.youtube?.videoId) {
        out.push({
          kind: "youtube",
          title: r6.youtube.title || "Video",
          videoIdPath: "row6.youtube.videoId",
        });
      }
    }

    if (project.row7?.left || project.row7?.right) {
      out.push({ kind: "twoCol", leftPath: "row7.left", rightPath: "row7.right" });
    }

    if (project.row8?.media?.length) {
      out.push({
        kind: "media",
        title: project.row8.mediaTitle || project.row8.title || "Row 8",
        layout: project.row8.layout || "gallery",
        itemsPath: "row8.media",
      });
    }

    if (project.row8?.desc) {
      out.push({ kind: "desc", dataPath: "row8.desc" });
    }

    if (project.youtube?.videoId) {
      out.push({
        kind: "youtube",
        title: project.youtube.title || "Project Video",
        videoIdPath: "youtube.videoId",
      });
    }

    if (Array.isArray(project.references) && project.references.length) {
      out.push({ kind: "references", title: "References", itemsPath: "references" });
    }

    return out;
  }, [project]);

  const sections = useMemo(() => {
    if (!project) return [];
    return Array.isArray(project.sections) && project.sections.length ? project.sections : legacySections;
  }, [project, legacySections]);

  if (!project) {
    return (
      <div className="project-template">
        <div className="proj-body">
          <p>Project not found.</p>
          <Link to="/">Go back</Link>
        </div>
      </div>
    );
  }

  const renderSection = (s, i) => {
    const kind = s?.kind;

    if (kind === "intro") {
      if (!project.intro && !project.quote) return null;
      return (
        <section key={i} className={joinClasses("proj-section proj-intro", s.className)}>
          {project.intro
            ? String(project.intro)
                .split(/\n\s*\n/)
                .map((para, j) => (
                  <p key={j} className="proj-text">{para}</p>
                ))
            : null}
          {project.quote && !project.bare ? <h2 className="proj-quote">“{project.quote}” - me</h2> : null}
        </section>
      );
    }

    if (kind === "media") {
      const items = s.items || getByPath(project, s.itemsPath);
      const title = s.title ?? null;
      const layout = s.layout || "gallery";
      if (!Array.isArray(items) || !items.length) return null;

      if (layout === "video") {
        return (
          <section key={i} className={joinClasses("proj-section", s.className)}>
            {title ? <h3 className="proj-minihead">{title}</h3> : null}
            <div className={joinClasses("proj-videoGrid", s.videoGridClassName)}>
              {items.map((v, idx) => (
                <div key={idx} className="proj-videoGrid__item">
                  <AutoVideo src={v.src} alt={v.alt} poster={v.poster} />
                </div>
              ))}
            </div>
          </section>
        );
      }

      const isSlider = layout === "slider";
      return (
        <section key={i} className={joinClasses(isSlider ? "proj-slider" : "proj-section", s.className)}>
          {title ? <h3 className="proj-minihead">{title}</h3> : null}
          {isSlider ? (
            <ImagesSlider items={items} onOpen={openLightbox} showTitle={false} />
          ) : (
            <ImagesRow media={items} onOpen={openLightbox} />
          )}
        </section>
      );
    }

    if (kind === "desc") {
      const data = s.data || getByPath(project, s.dataPath);
      if (!data) return null;
      return (
        <section key={i} className={joinClasses("proj-section", s.className)}>
          <DescriptionProject1 data={data} />
        </section>
      );
    }

    if (kind === "twoCol") {
      const left = s.left || getByPath(project, s.leftPath);
      const right = s.right || getByPath(project, s.rightPath);
      if (!left && !right) return null;

      const renderCol = (data, layout = "gallery") => {
        if (!data) return null;

        if (data?.kind === "instagram") {
          const title = data.title ?? null;
          const raw =
            data.items || getByPath(project, data.itemsPath) || (data.url ? [{ url: data.url }] : null);
          const items = Array.isArray(raw) ? raw : null;
          if (!items?.length) return null;

          return (
            <div className="proj-block">
              {title ? <h3 className="proj-minihead">{title}</h3> : null}
              <div className="proj-stack">
                {items.map((it, idx) => {
                  const url = typeof it === "string" ? it : it?.url;
                  const captioned = typeof it === "object" ? !!it.captioned : !!data.captioned;
                  return <InstagramEmbed key={url || idx} url={url} captioned={captioned} />;
                })}
              </div>
            </div>
          );
        }

        if (data?.kind === "media") {
          const items = data.items || getByPath(project, data.itemsPath);
          if (!Array.isArray(items) || !items.length) return null;

          const title = data.title ?? null;
          const lay = data.layout || layout || "gallery";

          if (lay === "video") {
            return (
              <div className="proj-block">
                {title ? <h3 className="proj-minihead">{title}</h3> : null}
                <div className="proj-videoGrid">
                  {items.map((v, idx) => (
                    <div key={idx} className="proj-videoGrid__item">
                      <AutoVideo src={v.src} alt={v.alt} poster={v.poster} />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          const isSlider = lay === "slider";
          return (
            <div className="proj-block">
              {title ? <h3 className="proj-minihead">{title}</h3> : null}
              {isSlider ? (
                <ImagesSlider items={items} onOpen={openLightbox} showTitle={false} />
              ) : (
                <ImagesRow media={items} onOpen={openLightbox} />
              )}
            </div>
          );
        }

        if (Array.isArray(data)) {
          const isSlider = layout === "slider";
          return isSlider ? (
            <ImagesSlider items={data} onOpen={openLightbox} showTitle={false} />
          ) : (
            <ImagesRow media={data} onOpen={openLightbox} />
          );
        }

        return <DescriptionProject1 data={data} />;
      };

      return (
        <section key={i} className={joinClasses("proj-row5", s.className)}>
          <div className="proj-col">{renderCol(left, s.leftLayout)}</div>
          <div className="proj-col">{renderCol(right, s.rightLayout)}</div>
        </section>
      );
    }

    if (kind === "diagram") {
      if (!s.src) return null;
      return (
        <section key={i} className={joinClasses("proj-section", s.className)}>
          {s.title ? <h3 className="proj-minihead">{s.title}</h3> : null}
          <div className="proj-diagram-wrap">
            <img src={s.src} alt={s.alt || ""} className="proj-diagram-img" />
          </div>
        </section>
      );
    }

    if (kind === "youtube") {
      const videoId = s.videoId || getByPath(project, s.videoIdPath);
      if (!videoId) return null;

      return (
        <section key={i} className={joinClasses("proj-row6", s.className)}>
          <h3 className="proj-minihead">{s.title || "Video"}</h3>
          <div className="yt-wrap">
            <iframe
              className="yt-embed"
              src={ytEmbed(videoId)}
              title={s.title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      );
    }

    if (kind === "youtubes") {
      const ys = s.items || getByPath(project, s.itemsPath);
      if (!Array.isArray(ys) || !ys.length) return null;

      return (
        <section key={i} className={joinClasses("proj-row6", s.className)}>
          <h3 className="proj-minihead">{s.title || "Videos"}</h3>
          {ys.map((y) => (
            <div key={y.videoId} className="proj-captioned">
              <div className="proj-row6__link">{y.title}</div>
              <div className="yt-wrap">
                <iframe
                  className="yt-embed"
                  src={ytEmbed(y.videoId)}
                  title={y.title || "YouTube video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </section>
      );
    }

    if (kind === "instagram") {
      const title = s.title ?? null;
      const raw = s.items || getByPath(project, s.itemsPath) || (s.url ? [{ url: s.url }] : null);
      const items = Array.isArray(raw) ? raw : null;
      if (!items?.length) return null;

      return (
        <section key={i} className={joinClasses("proj-row6", s.className)}>
          {title ? <h3 className="proj-minihead">{title}</h3> : null}
          <div className="proj-stack">
            {items.map((it, idx) => {
              const url = typeof it === "string" ? it : it?.url;
              const captioned = typeof it === "object" ? !!it.captioned : !!s.captioned;
              return <InstagramEmbed key={url || idx} url={url} captioned={captioned} />;
            })}
          </div>
        </section>
      );
    }

    if (kind === "paper") {
      const paper = s.data || getByPath(project, s.dataPath);
      if (!paper?.parts?.length) return null;
      const block = (b, k) =>
        typeof b === "string" ? (
          <p key={k}>{b}</p>
        ) : b.ordered ? (
          <ol key={k}>{b.list.map((li) => <li key={li}>{li}</li>)}</ol>
        ) : (
          <ul key={k}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
        );
      const part = (pt) => (
        <div key={pt.heading} className="proj-paper__part">
          <h4 className="proj-paper__h">{pt.heading}</h4>
          {pt.blocks.map(block)}
        </div>
      );
      const [first, ...rest] = paper.parts;
      return (
        <section key={i} className={joinClasses("proj-section proj-paper", s.className)}>
          {s.title ? <h3 className="proj-minihead">{s.title}</h3> : null}
          <article className="proj-paper__doc">
            <header className="proj-paper__head">
              <p className="proj-paper__title">{paper.title}</p>
              {paper.byline ? <p className="proj-paper__by">{paper.byline}</p> : null}
            </header>
            {part(first)}
            {rest.length > 0 && (
              <details className="proj-paper__more">
                <summary>Read the full paper</summary>
                {rest.map(part)}
              </details>
            )}
          </article>
        </section>
      );
    }

    if (kind === "references") {
      const refs = s.items || getByPath(project, s.itemsPath);
      if (!Array.isArray(refs) || !refs.length) return null;

      return (
        <section key={i} className={joinClasses("proj-row6", s.className)}>
          <h3 className="proj-minihead">{s.title || "References"}</h3>
          <ul className="proj-references">
            {refs.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="project-template" data-layout={layoutAttr}>
      <main className="proj-body">
        <ScrambledText as="h1" className="proj-page-title" {...historyTitle}>
          {project.title}
        </ScrambledText>
        {/* `bare` pages (e.g. Past Work) are just the description followed by every image */}
        {!project.bare && <Hero item={project.media?.[0]} />}
        {!project.bare && <MetaRow project={project} />}
        {sections.map(renderSection)}
        <Reflection data={REFLECTIONS[project.slug]} />
      </main>

      <Lightbox open={!!lbItem} item={lbItem} onClose={closeLightbox} />
    </div>
  );
}
