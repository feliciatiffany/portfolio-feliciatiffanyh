export default {
  slug: "tracing-dendur",
  title: "Tracing Dendur",

  meta: {
    category: ["Creative Tech", "Interaction Design"],
    year: "2026",
    tools: ["Blender", "TouchDesigner", "AI"],
  },

  intro:
    "This project uses camera-based gesture detection to allow visitors to trace the carvings of the Temple of Dendur through body movement, encouraging slower observation and a deeper awareness of spatial details. Inspired by contour drawing practices, the interaction transforms looking into a physical act of tracing, inviting visitors to notice the work through movement, duration, and attention.",

  sections: [
    { kind: "intro" },
    { kind: "youtube", title: "Project Video", videoId: "V5FhthC6-3o" },
    { kind: "twoCol", leftPath: "conceptBlock", rightPath: "rightBlock" },
    {
      kind: "media",
      layout: "slider",
      items: [
        { type: "image", src: "/media/techdesign/tracingdendur/process1_siteresearch.JPG", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process2_siteresearch.JPG", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process3_siteresearch.JPG", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process4_AIprototyping.png", alt: "AI Prototyping", title: "AI Prototyping" },
        { type: "image", src: "/media/techdesign/tracingdendur/process5_3dmodel.png", alt: "3D Modeling", title: "3D Modeling" },
        { type: "image", src: "/media/techdesign/tracingdendur/process6_texturing.png", alt: "Texturing", title: "Texturing & Carving" },
        { type: "image", src: "/media/techdesign/tracingdendur/process7_texturing.png", alt: "Texturing", title: "Texturing & Carving" },
        { type: "image", src: "/media/techdesign/tracingdendur/process8_touchdesignerexport.png", alt: "TouchDesigner Export", title: "Export to TouchDesigner" },
        { type: "image", src: "/media/techdesign/tracingdendur/process9_interactiondesign.png", alt: "Interaction Design", title: "Experience Design" },
        { type: "image", src: "/media/techdesign/tracingdendur/process10_testing.jpg", alt: "Testing", title: "Testing" },
      ],
    },
    {
      kind: "media",
      title: "Full Demonstration",
      layout: "video",
      items: [
        { type: "video", src: "/media/techdesign/tracingdendur/thumbnail.mp4", alt: "Tracing Dendur Full Demonstration" },
      ],
    },
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

  rightBlock: {
    sections: [
      {
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
      {
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
