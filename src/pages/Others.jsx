// src/pages/Others.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectList.jsx";
import { ProximityFrame, ProximityTitle } from "../components/VariableProximity.jsx";

export default function Others() {
  return (
    <>
      <section className="hero">
        <ProximityFrame as="p" className="intro">
          <span className="line">
            <span className="mono"><ProximityTitle label="Hi, I’m" /></span>{" "}
            <Link to="/about" className="grow-band name" data-role="fany">
              <ProximityTitle label="Fany!" />
            </Link>{" "}
            <span className="mono"><ProximityTitle label="a" /></span>{" "}
            <Link to="/tech" className="grow-band" data-role="tech">
              <ProximityTitle label="creative technologist" />
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link to="/digital" className="grow-band" data-role="digital">
              <ProximityTitle label="digital product" />
            </Link>
            <span className="comma">,</span>{" "}
            <Link to="/graphic" className="grow-band" data-role="graphic">
              <ProximityTitle label="graphic designer" />
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <span className="mono"><ProximityTitle label="and I create" /></span>{" "}
            <Link to="/others" className="grow-band is-current" data-role="others">
              <ProximityTitle label="solutions" />
            </Link>
          </span>
        </ProximityFrame>
      </section>

      {/* IMPORTANT: ProjectList must be direct child (no wrapper) */}
      <ProjectList categorySlug="others" className="others-page" />
    </>
  );
}