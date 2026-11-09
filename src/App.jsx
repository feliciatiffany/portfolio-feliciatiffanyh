// src/App.jsx
import React, { useLayoutEffect } from "react";
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
import CursorDot from "./components/CursorDot.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { useTheme } from "./lib/theme.js";
import { token } from "./lib/tokens.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import Socials from "./components/Socials.jsx";
import FanyLLM from "./components/FanyLLM.jsx";
import { getProject } from "./lib/projects.js";
import blogData from "./data/blog.json";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// The cursor is just a light: a coral glow with a long smoky trail. It stays lit while the mouse rests.
const finePointer =
  typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

function CursorGlow() {
  const theme = useTheme();
  if (reduceMotion || !finePointer) return null;
  const dark = theme === "dark";
  return (
    <>
      <CursorDot />
      <GhostCursor
        key={theme} /* rebuild the light for the new mode */
        theme={dark ? "dark" : "light"}
        color={token("color-cursor", theme)} /* WebGL needs the real value: coral by day, grey at night */
        mixBlendMode={dark ? "screen" : "multiply"} /* a glow adds light on dark paper, tints on white */
        size={18}
        trailLength={30} /* a soft trace behind the dot; the glow itself stays locked on */
        inertia={0} /* locked to the dot */
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
        style={{ position: "fixed", opacity: 0.32 }} /* a faint trace behind the dot */
      />
    </>
  );
}

// Top-left breadcrumb: "← Parent / This page", on one line with the FanyLLM button
const projectDetails = Object.values(import.meta.glob("./projects/**/*.js", { eager: true }))
  .map((m) => m.default)
  .filter((p) => p?.slug);
const PAGE_NAMES = { built: "What I've done", blog: "Blog", about: "About me", tech: "Tech", digital: "Digital", graphic: "Graphic", others: "Others" };
const HOME = { label: "Home", to: "/" };

function crumbsFor(pathname) {
  const [, first = "", second] = pathname.split("/");
  const key = first.toLowerCase();
  if (key === "work" && second) {
    const title = projectDetails.find((p) => p.slug === second)?.title || getProject(second)?.title || second;
    return { parent: { label: PAGE_NAMES.built, to: "/built" }, here: title };
  }
  if (key === "blog" && second) {
    const post = (blogData.posts || []).find((p) => p.slug === second);
    return { parent: { label: PAGE_NAMES.blog, to: "/blog" }, here: post?.title || second };
  }
  return { parent: HOME, here: PAGE_NAMES[key] || first };
}

function Breadcrumb({ pathname }) {
  const { parent, here } = crumbsFor(pathname);
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to={parent.to} className="crumbs__back">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.5} className="crumbs__icon" />
        {parent.label}
      </Link>
      <span className="crumbs__sep" aria-hidden="true">/</span>
      <span className="crumbs__here" aria-current="page">{here}</span>
    </nav>
  );
}

// Every page opens at the top, never wherever the previous page was scrolled to
if (typeof window !== "undefined" && "scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
function useScrollToTop(pathname) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
}

function Layout({ children }) {
  const { pathname } = useLocation();
  useScrollToTop(pathname);
  const onProject = pathname.startsWith("/work/");
  const onHome = pathname === "/";
  const centered = onHome || /^\/(built|blog|about)/i.test(pathname);

  const gridClass = `${onProject ? "page-grid--project" : centered ? "page-grid--center" : ""}${onHome ? " page-grid--home" : ""}`;

  return (
    <div className={`page-grid ${gridClass}`}>
      <CursorGlow />
      {!onHome && (
        <header className="header">
          <Breadcrumb pathname={pathname} />
        </header>
      )}
      <FanyLLM />
      <ThemeToggle />

      <main className={`main ${onProject ? "main--project" : ""}`}>{children}</main>

      {/* the homepage carries its social icons in the intro, under the buttons */}
      {!onProject && !onHome && (
        <footer className="foot">
          <Socials />
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


