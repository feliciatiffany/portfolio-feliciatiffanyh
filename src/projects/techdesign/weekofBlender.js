// src/projects/techdesign/aWeekOfBlender.js

export default {
  slug: "a-week-of-blender",
  title: "A Week of Blender",

  meta: {
    category: ["Personal Project"],
    year: "2026",
    tools: ["Blender"],
  },

  intro:
    "I challenged myself to learn Blender in a week. Here are the four projects I made along the way: first a primitive object, then an exterior, then an interior, and finally a whole scene.",


  sections: [
    { kind: "intro" },

    { kind: "media", title: "Project 1 — Primitive Object", layout: "gallery", itemsPath: "p1" },
    { kind: "media", title: "Project 2 — Exterior", layout: "gallery", itemsPath: "p2" },
    { kind: "media", title: "Project 3 — Interior", layout: "gallery", itemsPath: "p3" },
    { kind: "media", title: "Project 4 — A Scene", layout: "gallery", itemsPath: "p4" },
  ],

  // Folder: public/media/techdesign/weekofBlender/
  // URL path: /media/techdesign/weekofBlender/<filename>

  p1: [
    { type: "image", src: "/media/techdesign/weekofBlender/1_1.webp", alt: "Primitive object 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_2.webp", alt: "Primitive object 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_3.webp", alt: "Primitive object 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_4.webp", alt: "Primitive object 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_5.webp", alt: "Primitive object 5" },
  ],

  p2: [
    { type: "image", src: "/media/techdesign/weekofBlender/2_1.webp", alt: "Exterior 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_2.webp", alt: "Exterior 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_3.webp", alt: "Exterior 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_4.webp", alt: "Exterior 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_6.webp", alt: "Exterior 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_7.webp", alt: "Exterior 7" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_8.webp", alt: "Exterior 8" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_10.webp", alt: "Exterior 10" },
  ],

  // Your screenshot shows 3_3 .. 3_7 (no 3_1 / 3_2), so I’m matching that.
  p3: [
    { type: "image", src: "/media/techdesign/weekofBlender/3_3.webp", alt: "Interior 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_4.webp", alt: "Interior 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_5.webp", alt: "Interior 5" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_6.webp", alt: "Interior 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_7.webp", alt: "Interior 7" },
  ],

  p4: [
    { type: "image", src: "/media/techdesign/weekofBlender/4_1.webp", alt: "Scene 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_2.webp", alt: "Scene 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_3.webp", alt: "Scene 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_4.webp", alt: "Scene 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_5.webp", alt: "Scene 5" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_6.webp", alt: "Scene 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_7.webp", alt: "Scene 7" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_8.webp", alt: "Scene 8" },
  ],

  media: [],
  row6: null,
  references: [],
};