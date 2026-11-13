// src/lib/timeline.js
// Builds the Timeline page from a curated project list + the resume.
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
  2018: "Middle school era…",
};

/*
  Projects on the timeline. `highlight: true` = big card under "Projects";
  everything else = small card under "Creative Side".
  `date` is what's shown; the first month + year in it sets the order.
  `media` overrides the thumbnail when the project JSON has none.
*/
const PROJECTS = [
  // highlights
  {
    slug: "redDoors",
    date: "2023",
    highlight: true,
    desc: "With the goal of showing how the wealth gap shapes access to education, Red Doors is an educational game installation concept designed for public spaces. I chose the medium and the game flow based on secondary research into how well games teach, hoping to turn that awareness into action.",
    // the installation in front of the library, its two kiosks, and the QR code to play online
    collageBox: { aspect: 1.45 },
    collage: [
      { src: "/media/techdesign/redDoors/thumb/library-installation.jpg", alt: "Red Doors installation on the steps of the New York Public Library", x: 12, y: 8, w: 76, r: 0, hy: -2, hs: 1.02, z: 1, card: true },
      { src: "/media/techdesign/redDoors/thumb/kiosk-left.webp", alt: "Red Doors kiosk, start screen", x: 0.5, y: 53, w: 34, r: 0, hx: -1, hy: -2, hr: -1.5, hs: 1.02, z: 2 },
      { src: "/media/techdesign/redDoors/thumb/kiosk-right.webp", alt: "Red Doors kiosk, second screen", x: 66.5, y: 51, w: 33, r: 0, hx: 1, hy: -2, hr: 1.5, hs: 1.02, z: 2 },
      { src: "/media/techdesign/redDoors/thumb/qr-online.png", alt: "QR code: play Red Doors online", x: 81, y: 0, w: 18, r: 4, hy: -1, hr: -2, hs: 1.04, z: 3, card: true },
    ],
  },
  { slug: "book-indo", date: "Sept 2024", highlight: true },
  { slug: "caress", date: "Sept – Dec 2024", highlight: true },
  { slug: "sunney", date: "Oct – Dec 2024", highlight: true },
  { slug: "tell-ai", date: "Feb – May 2025", highlight: true },
  { slug: "rube-goldberg", date: "Feb – May 2025", highlight: true },
  { slug: "dialogue-with-the-wind", date: "Sept – Dec 2025", highlight: true },
  { slug: "protocol-nation", date: "Sept – Dec 2025", highlight: true },
  { slug: "nusa-penida", date: "Nov – Dec 2025", highlight: true },
  { slug: "wehearyou", date: "Jan – May 2026", highlight: true },
  { slug: "tdvj", date: "Mar 2026", highlight: true, media: { type: "video", src: "/media/techdesign/tdvj/thumbnail_tdvj.web.mp4" } },
  { slug: "blossom", date: "Nov 2026", highlight: true },

  // creative side
  // Big card that also holds the Khayyam medal (hidden from the award list below)
  {
    slug: "ppeCoolerBox",
    date: "2021",
    highlight: true,
    title: "PPE Cooler Box",
    desc: "Yes, I kept going with research papers, and this product won three competitions:",
    bullets: [
      "Gold Medal, Indonesia International Applied Science Project Olympiad (I2ASPO)",
      "Gold Medal, Khayyam International Invention & Innovation Festival",
      "Gold Medal, National Applied Science Project Olympiad (NASPO)",
    ],
    href: "https://youtu.be/7Mz7gm41abA?si=45BGPqz6n1ZilLbB",
    // transparent cut-out; `fill` = exactly as wide as the text column
    media: { type: "image", src: "/media/awards/ppe-cooler-box-cutout.webp", alt: "PPE Cooler Box suit design with its cooling parts", fill: true, cutout: true },
  },
  { slug: "past-2024", date: "Before 2024", year: 2023 },
  { slug: "personal-logo-design", date: "Aug 2024" },
  { slug: "p5js-portfolio", date: "Aug 2024 – May 2025" },
  { slug: "ThunderTD", date: "2024", media: { type: "image", src: "/media/techdesign/thunder/documentation1.webp" } },
  { slug: "greatest-dreamer", date: "Nov – Dec 2024" },
  { slug: "poet", date: "2025" },
  { slug: "memory", date: "2025" },
  { slug: "collages", date: "2025" },
  { slug: "collection", date: "2025" },
  { slug: "travel-tool", date: "2025" },
  { slug: "short-story", date: "2025" },
  { slug: "theTrueLight", date: "2025" },
  { slug: "cilok", date: "Sept 2025" },
  { slug: "a-week-of-blender", date: "Sept – Oct 2025", media: { type: "image", src: "/media/techdesign/weekofBlender/4_1.webp" } },
  { slug: "tracing-dendur", date: "Nov – Dec 2025" },
  { slug: "touchdesigner-av", date: "2026" },
  { slug: "nycresistor", date: "June 2026", desc: "Yes, I impulsively taught myself how to DJ after I got the gig.", media: { type: "image", src: "/media/techdesign/nycresistor/thumbnail.webp", alt: "DJ/VJ set at NYC Resistor, visuals on the LED wall" } },
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
  {
    title: "National Research and Innovation Agency Research Paper Competition",
    subtitle: "Silver Medal at OPSI · Special Award at NYIA",
    date: "2019",
    href: "https://www.linkedin.com/posts/feliciatiffanyh_how-research-world-shaped-my-educational-ugcPost-7136925558730301440-qUYr/",
    desc: "Looking back, it all started with research paper competitions. Now I approach everything with background research and a mind map that connects the dots.",
    // `gallery` = several photos side by side, all the same height, never cropped (`ratio` = width / height)
    gallery: [
      { src: "/media/awards/opsi-2019.jpg", ratio: 1.5, alt: "Receiving the OPSI 2019 silver medal on stage in Jakarta" },
      { src: "/media/awards/science-expo-2019.jpg", ratio: 1.776, alt: "Group photo of finalists at Indonesia Science Expo 2019" },
    ],
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
  {
    title: "Graduated Middle School",
    subtitle: "Online, in the COVID era",
    date: "2020",
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
      title: (p.title || base.title || detail.title || p.slug).trim(),
      subtitle: base.label || "",
      date: p.date,
      year: p.year || year,
      month,
      present: false,
      desc: p.desc || (p.highlight ? clip(detail.intro) : ""),
      bullets: p.bullets,
      media: p.media || base.media?.[0] || detail.media?.[0],
      collage: p.collage,
      collageBox: p.collageBox,
      to: p.href ? undefined : `/work/${p.slug}`,
      href: p.href,
    };
  });
}

function resumeEntries() {
  const exp = experience.map((ex, i) => {
    const { year, month } = parseStart(ex.timelineDate || ex.date);
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
      href: ex.to ? undefined : ex.href,
      to: ex.to,
      media: ex.media,
    };
  });

  const aw = [
    ...awards.filter((a) => !a.hideOnTimeline).map((a) => {
      const [place, name] = a.title.split(" — ");
      return {
        title: name || place,
        subtitle: name ? place : "",
        date: a.year,
        desc: a.caption || a.org,
        media: a.media,
        collage: a.collage,
        collageBox: a.collageBox,
        href: a.href,
        year: a.timelineYear,
      };
    }),
    ...EXTRA_AWARDS,
  ].map((a, i) => {
    const start = parseStart(a.date);
    return { id: `a-${i}`, type: "awards", present: false, ...start, ...a, year: a.year || start.year };
  });

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
  // Years that only have a tagline (no entries yet) still get a heading
  for (const y of Object.keys(YEAR_NOTES).map(Number)) {
    if (!groups.has(y)) groups.set(y, []);
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
