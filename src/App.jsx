// src/App.jsx
import React from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx";
import TechDesigner from "./pages/TechDesigner.jsx";
import DigitalProductDesigner from "./pages/DigitalProductDesigner.jsx";
import GraphicDesigner from "./pages/GraphicDesigner.jsx";
import Others from "./pages/Others.jsx";
import About from "./pages/About.jsx";
import Category from "./pages/Category.jsx";
import Project from "./pages/Project.jsx"; 
import Built from "./pages/Built.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import GhostCursor from "./components/GhostCursor.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Linkedin01Icon, GithubIcon, Asterisk02Icon } from "@hugeicons/core-free-icons";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// The cursor is just a light: a coral glow with a long smoky trail. It stays lit while the mouse rests.
const finePointer =
  typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

function CursorGlow() {
  if (reduceMotion || !finePointer) return null;
  return (
    <>
      <GhostCursor
        theme="light"
        color="#DE826D" /* coral, from the site palette */
        mixBlendMode="multiply"
        size={22}
        trailLength={110}
        inertia={0.06} /* light stays right under the pointer */
        turbulence={0.35}
        drift={0.12}
        detail={0.45}
        bloomStrength={0.35}
        bloomRadius={0.8}
        grainIntensity={0.1}
        clickPuff
        intro={false}
        fadeDelayMs={600000}
        fadeDurationMs={2600}
        zIndex={2147483000}
        style={{ position: "fixed", opacity: 0.7 }}
      />
    </>
  );
}

const SOCIALS = [
  { href: "mailto:feliciatiffany@gmail.com", label: "gmail", icon: Mail01Icon },
  { href: "https://www.linkedin.com/in/feliciatiffanyh/", label: "linkedin", icon: Linkedin01Icon },
  { href: "https://github.com/feliciatiffany", label: "github", icon: GithubIcon },
  { href: "https://linktr.ee/feliciatiffanyh", label: "linktree", icon: Asterisk02Icon }, // closest match to the Linktree mark
];

// Wavy "seal" outline for the homepage social badges: a circle with 14 soft bumps
const SEAL_PATH = (() => {
  const pts = [];
  for (let i = 0; i <= 112; i++) {
    const t = (i / 112) * Math.PI * 2;
    const r = 21 + 1.6 * Math.cos(14 * t);
    pts.push(`${(24 + r * Math.cos(t)).toFixed(2)} ${(24 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function Socials({ icons = false }) {
  if (icons) {
    // homepage: each link is a visible symbol inside a wavy seal
    return SOCIALS.map((l) => (
      <a
        key={l.label}
        href={l.href}
        className="social-badge"
        aria-label={l.label}
        title={l.label}
        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <svg className="social-badge__seal" viewBox="0 0 48 48" aria-hidden="true">
          <path d={SEAL_PATH} />
        </svg>
        <HugeiconsIcon icon={l.icon} size={22} strokeWidth={1.6} className="social-badge__icon" />
      </a>
    ));
  }
  return SOCIALS.map((l, i) => (
    <React.Fragment key={l.label}>
      {i > 0 && <span aria-hidden> · </span>}
      <a
        href={l.href}
        className="foot-link"
        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {l.label}
      </a>
    </React.Fragment>
  ));
}

function backHref(pathname) {
  if (pathname.startsWith("/work/")) return "/built";
  if (/^\/blog\/.+/i.test(pathname)) return "/blog";
  return "/";
}

function Layout({ children }) {
  const { pathname } = useLocation();
  const onProject = pathname.startsWith("/work/");
  const onHome = pathname === "/";
  const centered = onHome || /^\/(built|blog)/i.test(pathname);

  const gridClass = `${onProject ? "page-grid--project" : centered ? "page-grid--center" : ""}`;

  return (
    <div className={`page-grid ${gridClass}`}>
      <CursorGlow />
      {!onHome && (
        <header className="header">
          <Link to={backHref(pathname)} className="site-back">
            ← Back
          </Link>
        </header>
      )}

      <main className={`main ${onProject ? "main--project" : ""}`}>{children}</main>

      {!onProject && (
        <footer className={`foot${onHome ? " foot--icons" : ""}`}>
          {onHome ? <Socials icons /> : <Socials />}
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />

        {/* pages (support both lowercase + your existing uppercase links) */}
        <Route path="/tech" element={<TechDesigner />} />
        <Route path="/Tech" element={<TechDesigner />} />

        <Route path="/digital" element={<DigitalProductDesigner />} />
        <Route path="/Digital" element={<DigitalProductDesigner />} />

        <Route path="/graphic" element={<GraphicDesigner />} />
        <Route path="/Graphic" element={<GraphicDesigner />} />

        <Route path="/others" element={<Others />} />
        <Route path="/Others" element={<Others />} />

        <Route path="/nutshell" element={<Navigate to="/blog" replace />} />
        <Route path="/built" element={<Built />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/about" element={<About />} />
        <Route path="/About" element={<About />} />

        {/* project detail */}
        <Route path="/work/:slug" element={<Project />} />

        {/* optional category route */}
        <Route path="/:categorySlug" element={<Category />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}


