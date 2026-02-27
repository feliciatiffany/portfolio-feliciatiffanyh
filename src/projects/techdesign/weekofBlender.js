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
    "I challenged myself to learn blender and here 4 project starting from first Project : Primitive object, second : Exterior, third : Interior, fourth: A scene",

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
    { type: "image", src: "/media/techdesign/weekofBlender/1_1.png", alt: "Primitive object 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_2.png", alt: "Primitive object 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_3.png", alt: "Primitive object 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_4.png", alt: "Primitive object 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/1_5.png", alt: "Primitive object 5" },
  ],

  p2: [
    { type: "image", src: "/media/techdesign/weekofBlender/2_1.png", alt: "Exterior 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_2.png", alt: "Exterior 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_3.png", alt: "Exterior 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_4.png", alt: "Exterior 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_6.png", alt: "Exterior 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_7.png", alt: "Exterior 7" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_8.png", alt: "Exterior 8" },
    { type: "image", src: "/media/techdesign/weekofBlender/2_10.png", alt: "Exterior 10" },
  ],

  // Your screenshot shows 3_3 .. 3_7 (no 3_1 / 3_2), so I’m matching that.
  p3: [
    { type: "image", src: "/media/techdesign/weekofBlender/3_3.png", alt: "Interior 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_4.png", alt: "Interior 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_5.png", alt: "Interior 5" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_6.png", alt: "Interior 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/3_7.png", alt: "Interior 7" },
  ],

  p4: [
    { type: "image", src: "/media/techdesign/weekofBlender/4_1.png", alt: "Scene 1" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_2.png", alt: "Scene 2" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_3.png", alt: "Scene 3" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_4.png", alt: "Scene 4" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_5.png", alt: "Scene 5" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_6.png", alt: "Scene 6" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_7.png", alt: "Scene 7" },
    { type: "image", src: "/media/techdesign/weekofBlender/4_8.png", alt: "Scene 8" },
  ],

  media: [],
  row6: null,
  references: [],
};