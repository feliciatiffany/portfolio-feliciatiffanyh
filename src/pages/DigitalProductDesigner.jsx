import React from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectList.jsx";

export default function DigitalProductDesigner() {
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
            <Link to="/tech" className="grow-band" data-role="tech">
              creative technologist
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <Link to="/digital" className="grow-band is-current" data-role="digital">
              digital product
            </Link>
            <span className="comma">,</span>{" "}
            <Link to="/graphic" className="grow-band" data-role="graphic">
              graphic designer
            </Link>
            <span className="comma">,</span>
          </span>
          <span className="line">
            <span className="mono">and I create</span>{" "}
            <Link to="/others" className="grow-band" data-role="others">
              solutions
            </Link>
          </span>
        </p>
      </section>

      <ProjectList categorySlug="digital" className="digitalproduct-page" />
    </>
  );
}
