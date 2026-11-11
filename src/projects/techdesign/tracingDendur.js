export default {
  slug: "tracing-dendur",
  title: "Tracing Dendur",

  meta: {
    category: ["Creative Tech", "Interaction Design"],
    year: "2026",
    tools: ["Blender", "TouchDesigner", "AI"],
  },

  intro:
    "In this project, a camera picks up your gestures so you can trace the carvings of the Temple of Dendur with your body. I wanted people to slow down and really notice the details. It's inspired by contour drawing: looking becomes tracing, and you get to know the work through movement, time, and attention.",


  sections: [
    { kind: "intro" },
    { kind: "youtube", title: "Project Video", videoId: "V5FhthC6-3o" },
    { kind: "twoCol", leftPath: "conceptBlock", rightPath: "rightBlock" },
    {
      kind: "media",
      layout: "slider",
      items: [
        { type: "image", src: "/media/techdesign/tracingdendur/process1_siteresearch.webp", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process2_siteresearch.webp", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process3_siteresearch.webp", alt: "Site Research", title: "Research and Visual Brainstorming" },
        { type: "image", src: "/media/techdesign/tracingdendur/process4_AIprototyping.webp", alt: "AI Prototyping", title: "AI Prototyping" },
        { type: "image", src: "/media/techdesign/tracingdendur/process5_3dmodel.webp", alt: "3D Modeling", title: "3D Modeling" },
        { type: "image", src: "/media/techdesign/tracingdendur/process6_texturing.webp", alt: "Texturing", title: "Texturing & Carving" },
        { type: "image", src: "/media/techdesign/tracingdendur/process7_texturing.webp", alt: "Texturing", title: "Texturing & Carving" },
        { type: "image", src: "/media/techdesign/tracingdendur/process8_touchdesignerexport.webp", alt: "TouchDesigner Export", title: "Export to TouchDesigner" },
        { type: "image", src: "/media/techdesign/tracingdendur/process9_interactiondesign.webp", alt: "Interaction Design", title: "Experience Design" },
        { type: "image", src: "/media/techdesign/tracingdendur/process10_testing.webp", alt: "Testing", title: "Testing" },
      ],
    },
    {
      kind: "media",
      title: "Full Demonstration",
      layout: "video",
      items: [
        { type: "video", src: "/media/techdesign/tracingdendur/thumbnail.web.mp4", alt: "Tracing Dendur Full Demonstration" },
      ],
    },
    { kind: "references", title: "References", itemsPath: "references" },
  ],

  conceptBlock: {
    title: "Why I made it",
    paragraphs: [
      "Tracing Dendur is a gesture-based gallery prototype that gives people a new way to play with and learn about the Temple of Dendur.",
      "I often see visitors just walking back and forth, taking in the whole temple at a glance. Very few stop to look at the carvings, and honestly I find every one of them fascinating and full of stories.",
      "I'm also curious how something like this changes the way people take part. Would it change what they think the carvings mean, or how they move through the space?",
    ],
  },

  rightBlock: {
    sections: [
      {
        title: "Prototyping",
        paragraphs: [
          "I used AI to spin up quick website prototypes so I could actually show the interactions in my head, especially hand gestures, which are really hard to explain in words. I kept the whole project as a digital prototype so it's easy to test with other people and share online.",
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
      "I used AI to spin up quick website prototypes so I could actually show the interactions in my head, especially hand gestures, which are really hard to explain in words. I kept the whole project as a digital prototype so it's easy to test with other people and share online.",
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
