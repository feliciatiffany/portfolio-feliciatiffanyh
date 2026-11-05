// src/lib/timeline.js
// Builds the "What I've done" timeline from a curated project list + the resume.
// Each entry: { id, type, title, subtitle, date, year, month, present, desc, media, to }

import tech from "../data/tech.json";
import digital from "../data/digital.json";
import graphic from "../data/graphic.json";
import others from "../data/others.json";
import { experience, awards } from "./resume";

/* ── Categories (order = filter order). Colors live in style.css ── */
export const TYPES = [
  { key: "projects", label: "Projects" },
  { key: "creative", label: "Creative Side" },
  { key: "organization", label: "Organization" },
  { key: "work", label: "Work" },
  { key: "milestones", label: "Milestone" },
  { key: "awards", label: "Awards" },
];

/* Tagline under the "Today" heading */
export const TODAY_NOTE = "Still believing in building fascinating stuff for the world";

/* Optional tagline under each year heading — edit freely */
export const YEAR_NOTES = {
  2026: "Too many orgs and events, while building interactive tech stuff",
};

/*
  Projects on the timeline. `highlight: true` = big card under "Projects";
  everything else = small card under "Creative Side".
  `date` is what's shown; the first month + year in it sets the order.
  `media` overrides the thumbnail when the project JSON has none.
*/
const PROJECTS = [
  // highlights
  { slug: "redDoors", date: "2023", highlight: true },
  { slug: "book-indo", date: "Sept 2024", highlight: true },
  { slug: "caress", date: "Sept – Dec 2024", highlight: true },
  { slug: "sunney", date: "Oct – Dec 2024", highlight: true },
  { slug: "tell-ai", date: "Feb – May 2025", highlight: true },
  { slug: "rube-goldberg", date: "Feb – May 2025", highlight: true },
  { slug: "dialogue-with-the-wind", date: "Sept – Dec 2025", highlight: true },
  { slug: "protocol-nation", date: "Sept – Dec 2025", highlight: true },
  { slug: "nusa-penida", date: "Nov – Dec 2025", highlight: true },
  { slug: "wehearyou", date: "Jan – May 2026", highlight: true },
  { slug: "tdvj", date: "Mar 2026", highlight: true, media: { type: "video", src: "/media/techdesign/tdvj/thumbnail_tdvj.mp4" } },
  { slug: "blossom", date: "Nov 2026", highlight: true },

  // creative side
  { slug: "ppeCoolerBox", date: "2021" },
  { slug: "past-2024", date: "Before 2024", year: 2023 },
  { slug: "personal-logo-design", date: "Aug 2024" },
  { slug: "p5js-portfolio", date: "Aug 2024 – May 2025" },
  { slug: "ThunderTD", date: "2024", media: { type: "image", src: "/media/techdesign/thunder/documentation1.png" } },
  { slug: "greatest-dreamer", date: "Nov – Dec 2024" },
  { slug: "poet", date: "2025" },
  { slug: "memory", date: "2025" },
  { slug: "collages", date: "2025" },
  { slug: "collection", date: "2025" },
  { slug: "travel-tool", date: "2025" },
  { slug: "short-story", date: "2025" },
  { slug: "theTrueLight", date: "2025" },
  { slug: "cilok", date: "Sept 2025" },
  { slug: "a-week-of-blender", date: "Sept – Oct 2025", media: { type: "image", src: "/media/techdesign/weekofBlender/4_1.png" } },
  { slug: "tracing-dendur", date: "Nov – Dec 2025" },
  { slug: "touchdesigner-av", date: "2026" },
  { slug: "nycresistor", date: "June 2026" },
  { slug: "unseen-city", date: "Aug – Sept 2026" },
];

/* Resume entries that are organizations rather than jobs (matched on title prefix) */
const ORG_PREFIXES = ["Vice President", "Founder", "Volunteer"];

/* Awards not in the resume */
const EXTRA_AWARDS = [
  {
    title: "Drop Zone",
    subtitle: "Hackathon",
    date: "Dec 2025",
    desc: "Didn’t win, but learned a lot about team handling.",
  },
];

/* Milestones — add more here */
const MILESTONES = [
  {
    title: "Started at Parsons",
    subtitle: "BFA Design & Technology",
    date: "Aug 2023",
    desc: "Moved to New York to study Design & Technology.",
  },
];

/* ── helpers ── */
const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

function parseStart(dateStr = "") {
  const start = dateStr.split(/[–-]/)[0].trim().toLowerCase();
  const m = MONTHS.findIndex((mm) => start.startsWith(mm));
  const y = String(dateStr).match(/\d{4}/);
  return { year: y ? Number(y[0]) : 0, month: m >= 0 ? m + 1 : 0 };
}

function clip(text = "", max = 220) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max)) + "…";
}

// Project list data (title, thumbnail) and detail files (intro), keyed by slug
const BASE = [...tech.projects, ...digital.projects, ...graphic.projects, ...others.projects]
  .reduce((acc, p) => (acc[p.slug] ? acc : { ...acc, [p.slug]: p }), {});

const modules = import.meta.glob("../projects/**/*.js", { eager: true });
const DETAIL = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .reduce((acc, p) => (p?.slug ? { ...acc, [p.slug]: p } : acc), {});

/* ── build ── */
function projectEntries() {
  return PROJECTS.map((p) => {
    const base = BASE[p.slug] || {};
    const detail = DETAIL[p.slug] || {};
    const { year, month } = parseStart(p.date);
    return {
      id: `p-${p.slug}`,
      type: p.highlight ? "projects" : "creative",
      title: (base.title || detail.title || p.slug).trim(),
      subtitle: base.label || "",
      date: p.date,
      year: p.year || year,
      month,
      present: false,
      desc: p.highlight ? clip(detail.intro) : "",
      media: p.media || base.media?.[0] || detail.media?.[0],
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
      desc: clip(ex.achievements?.[0], 170),
    };
  });

  const aw = [
    ...awards.map((a) => {
      const [place, name] = a.title.split(" — ");
      return { title: name || place, subtitle: name ? place : "", date: a.year, desc: a.org };
    }),
    ...EXTRA_AWARDS,
  ].map((a, i) => ({ id: `a-${i}`, type: "awards", present: false, ...parseStart(a.date), ...a }));

  const ms = MILESTONES.map((m, i) => ({
    id: `m-${i}`,
    type: "milestones",
    present: false,
    ...parseStart(m.date),
    ...m,
  }));

  return [...exp, ...aw, ...ms];
}

export const ENTRIES = [...projectEntries(), ...resumeEntries()];

/** Shown date for a project page ("Sept – Dec 2024"), or undefined. */
export function projectDate(slug) {
  return PROJECTS.find((p) => p.slug === slug)?.date;
}

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
