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

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// A faint trace left behind the cursor: slow, grainy, and gone a moment later — like time passing
function CursorGlow() {
  if (reduceMotion) return null;
  return (
    <GhostCursor
      theme="light"
      color="#C9A97A"
      mixBlendMode="multiply"
      size={34}
      trailLength={70}
      inertia={0.7}
      turbulence={0.18}
      drift={0.06}
      detail={0.35}
      brightness={0.8}
      bloomStrength={0.2}
      bloomRadius={1.2}
      grainIntensity={0.14}
      clickPuff={false}
      intro={false}
      fadeDelayMs={400}
      fadeDurationMs={2600}
      zIndex={60}
      style={{ position: "fixed", opacity: 0.22 }}
    />
  );
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

  const gridClass = onProject ? "page-grid--project" : centered ? "page-grid--center" : "";

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
      <footer className="foot">
        <a href="mailto:feliciatiffany@gmail.com" className="foot-link">gmail</a>
        <span aria-hidden> · </span>
        <a
          href="https://www.linkedin.com/in/feliciatiffanyh/"
          target="_blank"
          rel="noreferrer"
          className="foot-link"
        >
          linkedin
        </a>
        <span aria-hidden> · </span>
        <a
          href="https://github.com/feliciatiffany"
          target="_blank"
          rel="noreferrer"
          className="foot-link"
        >
          github
        </a>
        <span aria-hidden> · </span>
        <a
          href="https://linktr.ee/feliciatiffanyh"
          target="_blank"
          rel="noreferrer"
          className="foot-link"
        >
          linktree
        </a>
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


