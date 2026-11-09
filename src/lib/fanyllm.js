// FanyLLM: answers questions about Fany using only what's on this site (projects, résumé, awards,
// blog, About notes). It runs in the browser, so nothing is sent anywhere. Each answer links to the
// page it came from. To plug in a real model later, replace `answer()` with a call to your own
// server endpoint and keep the same { text, links } shape.
import { education, experience, skills, awards } from "./resume.js";
import { REFLECTIONS } from "./reflections.js";
import { SECTIONS as ABOUT } from "./about.js";
import { ENTRIES } from "./timeline.js";
import blog from "../data/blog.json";

const EMAIL = "feliciatiffany@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/feliciatiffanyh/";

const projectModules = import.meta.glob("../projects/**/*.js", { eager: true });
const PROJECTS = Object.values(projectModules)
  .map((m) => m.default)
  .filter((p) => p?.slug && p?.title && !p.externalLink);

const STOP = new Set(
  "a an the and or but of to in on at for with about from by is are was were be been do does did you your yours me my i it its this that these those what which who whom how why when where can could would should will tell more any some please fany felicia".split(" ")
);
const asText = (v) => (Array.isArray(v) ? v.join(" ") : typeof v === "string" ? v : "");
const words = (s) => (String(s || "").toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w));
const sentences = (s, n = 2) => (String(s || "").replace(/\s+/g, " ").match(/[^.!?]+[.!?]+/g) || [String(s || "")]).slice(0, n).map((x) => x.trim()).join(" ");

// ---- knowledge: one doc per thing worth answering about ----------------------------------------
const DOCS = [
  ...PROJECTS.map((p) => {
    const r = REFLECTIONS[p.slug] || {};
    const intro = asText(p.intro);
    return {
      title: p.title,
      keys: words(`${p.title} ${p.slug.replace(/[-_]/g, " ")}`),
      body: words(`${intro} ${p.quote || ""} ${Object.values(r).join(" ")} ${[].concat(p.meta?.category || []).join(" ")} ${[].concat(p.meta?.tools || []).join(" ")}`),
      text: [sentences(intro, 2), r.goal, r.learned].filter(Boolean).join(" "),
      links: [{ label: `Open ${p.title}`, to: `/work/${p.slug}` }],
    };
  }),
  ...experience.map((e) => ({
    title: e.title,
    keys: words(e.title),
    body: words(`${e.place} ${asText(e.achievements)}`),
    text: `${e.title} (${e.date}, ${e.place}). ${sentences((e.achievements || []).join(" "), 2)}`,
    links: [{ label: "See it on the timeline", to: "/built" }],
  })),
  ...awards.map((a) => ({
    title: a.title,
    keys: words(a.title),
    body: words(`${a.org} ${a.caption || ""}`),
    text: `${a.title}${a.year ? ` (${a.year})` : ""}. ${a.caption || a.org || ""}`.trim(),
    links: [{ label: "See it on the timeline", to: "/built" }],
  })),
  ...(blog.posts || []).map((p) => ({
    title: p.title,
    keys: words(p.title),
    body: words(`${p.category} ${p.summary}`),
    text: `“${p.title}” is a ${String(p.category || "post").toLowerCase()} I wrote (${p.date?.slice(0, 4)}). ${p.summary || ""}`,
    links: [{ label: "Read it", to: `/blog/${p.slug}` }],
  })),
  ...ABOUT.map((s) => ({
    title: s.title,
    keys: words(s.title),
    body: words(s.lines.join(" ")),
    text: `${s.title}: ${s.lines.join(" ")}`,
    links: [{ label: "More about me", to: "/about" }],
  })),
];

// ---- direct answers for the common questions -----------------------------------------------------
const highlights = ENTRIES.filter((e) => e.type === "projects" && e.to).slice(0, 6);
const INTENTS = [
  {
    test: /\b(email|e-mail|mail|contact|reach|hire|hiring|linkedin|connect|dm|message)\b/,
    reply: () => ({
      text: `Yes, please do! Email me at ${EMAIL}, or find me on LinkedIn. I'm always happy to talk about design, research or a good matcha spot.`,
      links: [
        { label: EMAIL, href: `mailto:${EMAIL}` },
        { label: "LinkedIn", href: LINKEDIN },
      ],
    }),
  },
  {
    test: /\b(who are you|about you|yourself|introduce|who is)\b/,
    reply: () => ({
      text: `I'm Felicia Tiffany Hertada, but everyone calls me Fany. ${education[0]?.title ? `I'm studying ${education[0].title.split(",")[0]} at Parsons in New York.` : ""} I love research, making things with my hands and with code, and seeing people play with what I make.`,
      links: [{ label: "About me", to: "/about" }],
    }),
  },
  {
    test: /\b(study|studying|school|education|parsons|gpa|major|degree|university|college)\b/,
    reply: () => {
      const e = education[0];
      return { text: `${e.title}, ${e.date}. ${e.meta ? `${e.meta}. ` : ""}${sentences(e.achievements?.join(" "), 1)}`, links: [{ label: "About me", to: "/about" }] };
    },
  },
  {
    test: /\b(skill|skills|tool|tools|software|stack|program|languages?|code)\b/,
    reply: () => ({ text: `Day to day I use ${skills.slice(0, -1).join(", ")}, and I speak ${skills[skills.length - 1].replace(/\s*\(.*\)/, "")}.`, links: [{ label: "See my work", to: "/built" }] }),
  },
  {
    test: /\b(awards?|won|win|prize|competitions?|medals?)\b/,
    reply: () => ({
      text: `A few I'm proud of: ${awards.slice(0, 5).map((a) => `${a.title}${a.year ? ` (${a.year})` : ""}`).join("; ")}.`,
      links: [{ label: "All of them on the timeline", to: "/built" }],
    }),
  },
  {
    test: /\b(experience|jobs?|intern|internship|worked|roles?|career)\b/,
    reply: () => ({
      text: `Recently: ${experience.slice(0, 4).map((e) => `${e.title} (${e.date})`).join("; ")}.`,
      links: [{ label: "See the timeline", to: "/built" }],
    }),
  },
];

function bestDoc(query) {
  const q = words(query);
  if (!q.length) return null;
  let best = null;
  for (const d of DOCS) {
    let score = 0;
    for (const w of q) {
      if (d.keys.includes(w)) score += 4;
      else if (d.keys.some((k) => k.startsWith(w) || w.startsWith(k))) score += 2;
      if (d.body.includes(w)) score += 1;
    }
    if (score > (best?.score || 0)) best = { ...d, score };
  }
  return best && best.score >= 2 ? best : null;
}

/** answer("Can I email you?") → { text, links: [{ label, to | href }] } */
export function answer(question) {
  const q = String(question || "").toLowerCase();
  const doc = bestDoc(q);
  // a named project/post beats a generic intent ("tell me about Red Doors' awards")
  if (doc && doc.score >= 4) return { text: doc.text, links: doc.links };
  for (const it of INTENTS) if (it.test.test(q)) return it.reply();
  if (/\b(projects?|portfolio|made|built|work)\b/.test(q)) {
    return {
      text: `Some favourites: ${highlights.map((e) => e.title).join(", ")}. Ask me about any of them!`,
      links: highlights.slice(0, 3).map((e) => ({ label: e.title, to: e.to })),
    };
  }
  if (doc) return { text: doc.text, links: doc.links };
  return {
    text: `Hmm, I don't know that one yet. I only know what's on this site. Try asking about a project, my awards or what I'm studying, or email me at ${EMAIL}.`,
    links: [{ label: EMAIL, href: `mailto:${EMAIL}` }],
  };
}

export const SUGGESTIONS = ["Can I email you?", "What are you studying?", "Tell me about Red Doors"];
