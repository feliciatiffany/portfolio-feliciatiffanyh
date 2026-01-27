// src/components/ProjectTemplate.jsx
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import ImagesRow from "./ImagesRow.jsx";
import ImagesSlider from "./ImagesSlider.jsx";
import DescriptionProject1 from "./DescriptionProject1.jsx";
import Introduction from "./Introduction.jsx";
import Lightbox from "./Lightbox.jsx";
import LogoUrl from "../assets/logosmall.png";

const ytEmbed = (id) => `https://www.youtube.com/embed/${id}`;
function AutoVideo({ src, alt, poster }) {
  return (
    <video
      className="proj-videoWide__video"
      src={src}
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
    />
  );
}


// dot-path helper: "row6.items" -> project.row6.items
function getByPath(obj, path) {
  if (!path) return undefined;
  return String(path)
    .split(".")
    .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => "proj-nav__link" + (isActive ? " is-active" : "")}
    >
      {children}
    </NavLink>
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

  // --------- legacy blocks builder (your current behavior) ----------
  const legacySections = useMemo(() => {
    if (!project) return [];

    const out = [];

    // intro/meta
    out.push({ kind: "intro" });

    // gallery media
    if (Array.isArray(project.media) && project.media.length) {
      out.push({ kind: "media", title: null, layout: "gallery", itemsPath: "media" });
    }

    // optional top slider
    if (project.slider?.items?.length) {
      out.push({
        kind: "media",
        title: project.slider.title || "Slider",
        layout: "slider",
        itemsPath: "slider.items",
      });
    }

    // 2-col descriptions
    if (project.descLeft || project.descRight) {
      out.push({ kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" });
    }

    // row6 flexible: (supports items, websiteScreens, row6.youtube, row6.youtubes)
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
        out.push({ kind: "youtube", title: r6.youtube.title || "Video", videoIdPath: "row6.youtube.videoId" });
      }
    }

    // row7 (2-col text)
    if (project.row7?.left || project.row7?.right) {
      out.push({ kind: "twoCol", leftPath: "row7.left", rightPath: "row7.right" });
    }

    // row8 (media + desc)
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

    // top-level youtube
    if (project.youtube?.videoId) {
      out.push({ kind: "youtube", title: project.youtube.title || "Project Video", videoIdPath: "youtube.videoId" });
    }

    // references
    if (Array.isArray(project.references) && project.references.length) {
      out.push({ kind: "references", title: "References", itemsPath: "references" });
    }

    return out;
  }, [project]);

  // --------- main “sections” source ----------
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

  // --------- renderer ----------
  const renderSection = (s, i) => {
    const kind = s?.kind;

    if (kind === "intro") {
      return (
        <section key={i} className="proj-section">
          <Introduction intro={project.intro} meta={project.meta} />
        </section>
      );
    }

    if (kind === "media") {
  const items = s.items || getByPath(project, s.itemsPath);
  const title = s.title ?? null;
  const layout = s.layout || "gallery";
  if (!Array.isArray(items) || !items.length) return null;

  // ✅ NEW: full-width autoplay mp4 (no controls)
  if (layout === "video") {
    return (
      <section key={i} className="proj-section proj-videoWide">
        {title ? <h3 className="proj-minihead">{title}</h3> : null}

        <div className="proj-videoWide__wrap">
          {items.map((v, idx) => (
            <AutoVideo
              key={idx}
              src={v.src}
              alt={v.alt}
              poster={v.poster}
            />
          ))}
        </div>
      </section>
    );
  }

  const isSlider = layout === "slider";
  return (
    <section key={i} className={isSlider ? "proj-slider" : "proj-section"}>
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
        <section key={i} className="proj-section">
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

    // ✅ if the data is a media array, render images directly
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
    <section key={i} className="proj-row5">
      <div className="proj-col">{renderCol(left, s.leftLayout)}</div>
      <div className="proj-col">{renderCol(right, s.rightLayout)}</div>
    </section>
  );
}


    if (kind === "youtube") {
      const videoId = s.videoId || getByPath(project, s.videoIdPath);
      if (!videoId) return null;

      return (
        <section key={i} className="proj-row6" style={{ marginTop: 18 }}>
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
        <section key={i} className="proj-row6" style={{ marginTop: 18 }}>
          <h3 className="proj-minihead">{s.title || "Videos"}</h3>
          {ys.map((y) => (
            <div key={y.videoId} style={{ display: "grid", gap: 10, marginBottom: 18 }}>
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

    if (kind === "references") {
      const refs = s.items || getByPath(project, s.itemsPath);
      if (!Array.isArray(refs) || !refs.length) return null;

      return (
        <section key={i} className="proj-row6" style={{ marginTop: 18 }}>
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
      {/* ROW 1 */}
      <header className="proj-head">
        <Link to="/" className="proj-logo" aria-label="Home">
          <img src={LogoUrl} alt="Logo" />
        </Link>
        <div className="proj-head__text">Hi, I’m Fany and now you are seeing</div>
        <h1 className="proj-head__title">{project.title}</h1>
      </header>

      {/* ROW 2 */}
      <nav className="proj-nav" aria-label="Main navigation">
        <NavItem to="/about">About</NavItem>
        <NavItem to="/tech">Tech Designer</NavItem>
        <NavItem to="/graphic">Graphic Designer</NavItem>
        <NavItem to="/others">Others</NavItem>
      </nav>

      {/* REORDERABLE BODY */}
      <main className="proj-body">{sections.map(renderSection)}</main>

      <Lightbox open={!!lbItem} item={lbItem} onClose={closeLightbox} />
    </div>
  );
}
