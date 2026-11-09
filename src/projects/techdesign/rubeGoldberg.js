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
    "I built a physics-driven Rube Goldberg machine in Unity, where one little chain reaction after another tells a personal story. " +
    "I put together 3D models, materials, sound, motion, camera angles, and lighting so it all flows from one moment to the next.",

  quote: "Missing home, one chain reaction at a time",

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
    title: "Why a café",
    paragraphs: [
      "I built an Indonesian café because I miss home, and because coffee is something we share in Indonesia. Cafés are everywhere in daily life there, from young people hanging out to coworkers to street coffee carts. They're where people gather and friendships happen.",
      "So this became a dreamy little “world of wonder,” built from how I picture Indonesia in my head: familiar, colorful, and warm.",
    ],
  },

  descRight: {
    title: "What I focused on",
    bullets: [
      "Physics chain reactions (cause → effect → the story moves on)",
      "Building the 3D scene (models, props, telling a story with space)",
      "Lighting and camera angles to lead your eye through each step",
      "Sound and motion to make each hit land and keep the pace",
      "Materials and mood to make it feel like a nostalgic café",
    ],
    paragraphs: [
      "I wanted every step to feel playful but on purpose, so each trigger walks you further into the café like turning a page.",
    ],
  },

  // docs slider (png files in your folder)
  documentation: [
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation1.webp", alt: "Documentation 1" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation2.webp", alt: "Documentation 2" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation3.webp", alt: "Documentation 3" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation4.webp", alt: "Documentation 4" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation5.webp", alt: "Documentation 5" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/documentation6.webp", alt: "Documentation 6" },
     { type: "image", src: "/media/techdesign/rubeGoldberg/Scene%20thumbnail%20pic.jpg", alt: "Scene thumbnail" },
  
  ],

  // brainstorming slider (png files in your folder)
  brainstorming: [
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming1.webp", alt: "Brainstorming 1" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming2.webp", alt: "Brainstorming 2" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming3.webp", alt: "Brainstorming 3" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming4.webp", alt: "Brainstorming 4" },
    { type: "image", src: "/media/techdesign/rubeGoldberg/brainstorming5.webp", alt: "Brainstorming 5" },
  ],

 
};
