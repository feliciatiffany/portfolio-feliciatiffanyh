// src/projects/techdesign/rubeGoldberg.js

export default {
  slug: "rube-goldberg",
  title: "Rube Goldberg : Indonesian Café (Unity)",

  meta: {
    category: ["Rube Goldberg Machine", "Physics Simulation", "3D Modeling", "Lighting & Sound Design", "Narrative Experience"],
    year: "2025",
    tools: ["Unity", "Premiere Pro", "C#"],
  },

  // Render order (reorder freely)
  sections: [
    { kind: "intro" },

    { kind: "desc", dataPath: "linksBlock" },

    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

    { kind: "media", title: "Scene Documentation", layout: "slider", itemsPath: "documentation" },

    { kind: "media", title: "Brainstorming + Planning", layout: "slider", itemsPath: "brainstorming" },

  ],

  intro:
    "This project designs and builds a physics-driven Rube Goldberg Machine in Unity, using chained interactions to unfold a personal narrative. " +
    "It integrates 3D models, materials, sound, motion, camera framing, and lighting to create a cohesive, story-led experience.",

  linksBlock: {
    title: "Links",
    links: [
      {
        label: "GitHub repo",
        href: "https://github.com/feliciatiffany/indonesiancafe-corelab-unity",
      },
      {
        label: "WebGL",
        href: "https://feliciatiffany.github.io/indonesiancafe-corelab-unity/",
      },
    ],
  },

  youtube: {
    title: "Rube Goldberg Machine — Unity Demo",
    videoId: "jb7P1sDZG8U",
    url: "https://www.youtube.com/watch?v=jb7P1sDZG8U",
  },

  descLeft: {
    title: "Abstract",
    paragraphs: [
      "I built an Indonesian café as a tribute to my longing for home and to coffee as a shared tradition in Indonesia. Cafés are a growing part of everyday life—across youth culture, working communities, and even street coffee trucks—serving as places where people gather and relationships form.",
      "This project becomes a dreamlike “world of wonder,” shaped by how I imagine Indonesia in my mind: familiar, vibrant, and warmly communal.",
    ],
  },

  descRight: {
    title: "Build Focus",
    bullets: [
      "Physics-driven chain reactions (cause → effect → narrative progression)",
      "3D scene composition (models, props, spatial storytelling)",
      "Lighting + camera framing to guide attention through each step",
      "Sound + motion cues to reinforce impact and pacing",
      "Materials + environmental mood to evoke a nostalgic café atmosphere",
    ],
    paragraphs: [
      "The machine is designed as a sequence of interactions that feels playful and intentional, where each trigger carries the viewer forward through the space like a story.",
    ],
  },

  // docs slider (png files in your folder)
  documentation: [
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation1.png", alt: "Documentation 1" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation2.png", alt: "Documentation 2" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation3.png", alt: "Documentation 3" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation4.png", alt: "Documentation 4" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation5.png", alt: "Documentation 5" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation6.png", alt: "Documentation 6" },
     { type: "image", src: "/media/techdesign/rubeGoldberg/Scene%20thumbnail%20pic.jpg", alt: "Scene thumbnail" },
  
  ],

  // brainstorming slider (png files in your folder)
  brainstorming: [
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming1.png", alt: "Brainstorming 1" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming2.png", alt: "Brainstorming 2" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming3.png", alt: "Brainstorming 3" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming4.png", alt: "Brainstorming 4" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming5.png", alt: "Brainstorming 5" },
  ],

 
};
