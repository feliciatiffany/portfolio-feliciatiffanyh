// src/pages/TechDesigner.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectList.jsx";

export default function TechDesigner() {
  return (
    <>
      <section className="hero">
        <p className="intro">
          <span className="line">
            <span className="mono">Hi, I’m</span>{" "}
            <Link to="/about" className="grow-band name" data-role="fany">
              Fany!
            </Link>{" "}
            <span className="mono">a</span>{" "}
            <Link to="/tech" className="grow-band is-current" data-role="tech">
              tech designer
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link to="/graphic" className="grow-band" data-role="graphic">
              graphic designer
            </Link>
            <span className="comma">,</span>{" "}
            <span className="mono">and I create</span>{" "}
            <Link to="/others" className="grow-band" data-role="others">
              solutions
            </Link>
          </span>
        </p>
      </section>

      {/* IMPORTANT: ProjectList must be direct child (no wrapper) */}
      <ProjectList categorySlug="others" className="others-page" />
    </>
  );
}