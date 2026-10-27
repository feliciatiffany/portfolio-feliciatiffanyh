// src/lib/timeline.js
// Builds the "Things I Built" timeline from the project JSON + resume data.
// Each entry: { id, type, title, subtitle, date, year, month, present, desc, media, to }

import tech from "../data/tech.json";
import digital from "../data/digital.json";
import graphic from "../data/graphic.json";
import others from "../data/others.json";
import { education, experience, awards } from "./resume";

/* ── Categories (order = filter order). `role` maps to a palette color in style.css ── */
export const TYPES = [
  { key: "work", label: "Work" },
  { key: "projects", label: "Projects" },
  { key: "organization", label: "Organization" },
  { key: "art", label: "Art Piece" },
  { key: "awards", label: "Awards" },
  { key: "milestones", label: "Milestones" },
];

/* Tagline under the "Today" heading */
export const TODAY_NOTE = "designing, building & exploring life's side quests";

/* Optional one-line tagline under each year heading — edit freely */
export const YEAR_NOTES = {
  // 2026: "",
};

/* Project slugs that count as "Art Piece" (everything else in the project JSON = "Projects") */
const ART_SLUGS = new Set([
  "blossom",
  "dialogue-with-the-wind",
  "nycresistor",
  "touchdesigner-av",
  "greatest-dreamer",
  "collages",
  "theTrueLight",
  "past-2024",
]);

/* Resume entries that are organizations rather than jobs (matched on title prefix) */
const ORG_PREFIXES = ["Vice President", "Founder", "Volunteer"];

/* Extra milestones not covered elsewhere — add more here */
const MILESTONES = [
  {
    title: "Started at Parsons",
    subtitle: education[0]?.title,
    date: "Aug 2023",
    desc: "Moved to New York to study Design & Technology.",
  },
];

/* ── helpers ── */
const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

function parseStart(dateStr = "") {
  const start = dateStr.split(/[–-]/)[0].trim().toLowerCase();
  const m = MONTHS.findIndex((mm) => start.startsWith(mm));
  const y = start.match(/\d{4}/);
  return { year: y ? Number(y[0]) : 0, month: m >= 0 ? m + 1 : 0 };
}

function clip(text = "", max = 170) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max)) + "…";
}

// Project detail files (intro text) keyed by slug
const modules = import.meta.glob("../projects/**/*.js", { eager: true });
const DETAIL = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .reduce((acc, p) => (p?.slug ? { ...acc, [p.slug]: p } : acc), {});

/* ── build ── */
function projectEntries() {
  const seen = new Set();
  return [...tech.projects, ...digital.projects, ...graphic.projects, ...others.projects]
    .filter((p) => (seen.has(p.slug) ? false : seen.add(p.slug)))
    .map((p) => {
      const year = p.num || 2023;
      return {
        id: `p-${p.slug}`,
        type: ART_SLUGS.has(p.slug) ? "art" : "projects",
        title: p.title.trim(),
        subtitle: p.label,
        date: p.num ? String(p.num) : "Before 2024",
        year,
        month: 0,
        present: false,
        desc: clip(DETAIL[p.slug]?.intro),
        media: p.media?.[0],
        to: `/work/${p.slug}`,
      };
    });
}

function resumeEntries() {
  const exp = experience.map((ex, i) => {
    const { year, month } = parseStart(ex.date);
    const isOrg = ORG_PREFIXES.some((pre) => ex.title.startsWith(pre));
    // "Role — Org" → jobs lead with the role, organizations lead with the org
    const [role, ...rest] = ex.title.split(" — ");
    const org = rest.join(" — ");
    return {
      id: `x-${i}`,
      type: isOrg ? "organization" : "work",
      title: isOrg && org ? org : role,
      subtitle: isOrg ? role : org || ex.place,
      date: ex.date,
      year,
      month,
      present: /present/i.test(ex.date),
      desc: clip(ex.achievements?.[0]),
    };
  });

  const aw = awards.map((a, i) => {
    const [place, name] = a.title.split(" — ");
    return {
      id: `a-${i}`,
      type: "awards",
      title: name || place,
      subtitle: name ? place : "",
      date: a.year,
      year: parseStart(a.year).year,
      month: 0,
      present: false,
      desc: a.org,
    };
  });

  const ms = MILESTONES.map((m, i) => ({
    id: `m-${i}`,
    type: "milestones",
    ...parseStart(m.date),
    present: false,
    ...m,
  }));

  return [...exp, ...aw, ...ms];
}

export const ENTRIES = [...projectEntries(), ...resumeEntries()];

/** Group entries into [{ key, heading, note, items }] — "Today" first, then years descending. */
export function groupByYear(entries) {
  const groups = new Map();
  for (const e of entries) {
    const key = e.present ? "today" : e.year;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "today" ? -1 : b === "today" ? 1 : b - a))
    .map(([key, items]) => ({
      key,
      heading: key === "today" ? "Today" : String(key),
      note: key === "today" ? TODAY_NOTE : YEAR_NOTES[key] || "",
      items: items.sort((a, b) => b.month - a.month),
    }));
}
