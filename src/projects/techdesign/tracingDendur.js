export default {
  slug: "tracing-dendur",
  title: "Tracing Dendur",

  meta: {
    category: ["Creative Tech", "Interaction Design"],
    year: "2026",
    tools: ["Blender", "TouchDesigner", "AI"],
  },

  intro:
    "This project began as a 3D course assignment, and I wanted to take it further — demonstrating how 3D skills can contribute to real industry applications. I was especially inspired by the Met Museum's Temple of Dendur digital initiatives, which expand access to the collection digitally from anywhere.",

  sections: [
    { kind: "intro" },
    { kind: "desc", dataPath: "conceptBlock" },
    { kind: "desc", dataPath: "prototypingBlock" },
    { kind: "desc", dataPath: "processBlock" },
    { kind: "references", title: "References", itemsPath: "references" },
  ],

  conceptBlock: {
    title: "Concept",
    paragraphs: [
      "Tracing Dendur is a gesture-based in-gallery prototype where audiences can interact with and learn about the Temple of Dendur in new ways.",
      "Often, I notice visitors simply walking back and forth, taking in the whole temple at a glance — while very few actually stop to notice the intricate carving details, each of which I find fascinating and full of stories.",
      "I'm also interested in exploring how this interactive concept would affect participation and what kind of engagement it would generate. Would it change how people interpret meaning, or how they navigate the space as a whole?",
    ],
  },

  prototypingBlock: {
    title: "Prototyping",
    paragraphs: [
      "I used AI to build fast prototypes on a website, visualizing the interactions I envisioned — especially hand gestures, which are often difficult to describe in words. The project itself remains a digital prototype to make it easier to test with colleagues and share online.",
    ],
    links: [
      {
        href: "https://feliciatiffany.github.io/prototype_dendur_mediapipe/",
        label: "View Prototype →",
      },
    ],
  },

  processBlock: {
    title: "Process",
    bullets: [
      "Research and Visual Brainstorming",
      "AI Prototyping",
      "3D Modeling",
      "Texturing & Carving",
      "Export to TouchDesigner",
      "Experience Design",
      "Testing",
    ],
  },

  references: [
    {
      href: "https://www.metmuseum.org/atopia/dendur",
      label: "The Met — Atopia: Temple of Dendur",
    },
    {
      href: "https://www.metmuseum.org/press-releases/3-d-models-announcement-2026",
      label: "The Met — 3D Models Announcement 2026",
    },
  ],

  media: [],
  row6: null,
};
