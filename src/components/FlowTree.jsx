// src/components/FlowTree.jsx
// A top-down flowchart: each node can branch into several children,
// drawn with CSS connectors and an arrowhead into every step.
import React from "react";
import "../style/flowTree.css";

// Leaves under a node, so each branch gets width in proportion to what it holds.
function countLeaves(node) {
  const kids = Array.isArray(node?.children) ? node.children : [];
  return kids.length ? kids.reduce((n, k) => n + countLeaves(k), 0) : 1;
}

function Branch({ node }) {
  const kids = Array.isArray(node.children) ? node.children : [];

  return (
    <li className="flow-tree__item" style={{ flexGrow: countLeaves(node) }}>
      <div className="flow-tree__node" data-tone={node.tone || undefined}>
        {node.when ? <span className="flow-tree__when">{node.when}</span> : null}
        <span className="flow-tree__label">{node.label}</span>
        {node.note ? <span className="flow-tree__note">{node.note}</span> : null}
      </div>
      {kids.length > 0 && (
        <ul className="flow-tree__list" role="list">
          {kids.map((child, i) => (
            <Branch key={i} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function FlowTree({ tree, label }) {
  if (!tree) return null;

  return (
    <figure className="flow-tree" aria-label={label || "Flow diagram"}>
      <ul className="flow-tree__list flow-tree__root" role="list">
        <Branch node={tree} />
      </ul>
    </figure>
  );
}
