// src/components/DescriptionProject1.jsx
import React from "react";
import FlowTree from "./FlowTree.jsx";

// **text** inside a paragraph renders bold.
function Inline({ text }) {
  if (typeof text !== "string" || !text.includes("**")) return text;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

function BulletList({ bullets }) {
  if (!Array.isArray(bullets) || !bullets.length) return null;

  return (
    <ul className="proj-bullets">
      {bullets.map((b, i) => {
        if (typeof b === "string") return <li key={i}>{b}</li>;
        return (
          <li key={i}>
            {b.label ? <strong>{b.label} </strong> : null}
            {b.text || ""}
          </li>
        );
      })}
    </ul>
  );
}

function Links({ links }) {
  if (!Array.isArray(links) || !links.length) return null;

  return (
    <ul className="proj-references">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Table({ table }) {
  if (!table?.headers?.length || !table?.rows?.length) return null;

  return (
    <table className="proj-table">
      <thead>
        <tr>
          {table.headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Columns({ columns }) {
  if (!Array.isArray(columns) || !columns.length) return null;

  return (
    <ul className="proj-intro__questions proj-columns" role="list">
      {columns.map((c, i) => (
        <li key={i}>
          {c.title ? <strong className="proj-columns__title case-column">{c.title}</strong> : null}
          {Array.isArray(c.steps) ? (
            <ol className="proj-columns__steps">
              {c.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          ) : null}
          {c.text ? <p className="proj-columns__text case-body">{c.text}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function RenderSection({ s }) {
  if (!s) return null;

  if (s.collapsible) {
    return (
      <details className="proj-desc-section proj-dropdown">
        <summary className="proj-dropdown__summary">{s.title}</summary>
        <div className="proj-dropdown__body">
          {s.paragraphs?.map((p, i) => (
            <p key={i} className="proj-desc case-body">
              <Inline text={p} />
            </p>
          ))}
          <Table table={s.table} />
          <BulletList bullets={s.bullets} />
        </div>
      </details>
    );
  }

  return (
    <div className={s.label ? "proj-desc-section proj-divider" : "proj-desc-section"}>
      {s.label && <p className="proj-minihead proj-desc-section__label case-h1">{s.label}</p>}
      {s.title && (
        s.label || s.headline
          ? <h2 className="proj-intro__subheading case-h2">{s.title}</h2>
          : <h3 className="proj-minihead case-h3">{s.title}</h3>
      )}

      {typeof s.html === "string" ? <p className="proj-desc" dangerouslySetInnerHTML={{ __html: s.html }} /> : null}

      {Array.isArray(s.paragraphs)
        ? s.paragraphs.map((p, i) => (
            <p key={i} className="proj-desc case-body">
              <Inline text={p} />
            </p>
          ))
        : null}

      <Columns columns={s.columns} />
      {Array.isArray(s.afterParagraphs)
        ? s.afterParagraphs.map((p, i) => (
            <p key={i} className="proj-desc case-body">
              <Inline text={p} />
            </p>
          ))
        : null}
      {s.tree ? <FlowTree tree={s.tree} label={s.title} /> : null}
      <BulletList bullets={s.bullets} />
      <Table table={s.table} />
      <Links links={s.links} />
    </div>
  );
}

export default function DescriptionProject1({ data }) {
  if (!data) return null;

  // If it is a simple string, render as paragraph
  if (typeof data === "string") return <p className="proj-desc">{data}</p>;

  // If it has sections, render them
  if (Array.isArray(data.sections)) {
    return (
      <div>
        {data.title ? <h3 className="proj-minihead">{data.title}</h3> : null}
        {data.paragraphs?.map((p, i) => (
          <p key={i} className="proj-desc">
            {p}
          </p>
        ))}
        {data.sections.map((s, i) => (
          <RenderSection key={i} s={s} />
        ))}
      </div>
    );
  }

  // Otherwise treat it as a single section object
  return <RenderSection s={data} />;
}
