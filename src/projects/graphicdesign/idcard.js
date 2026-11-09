// src/projects/graphicdesign/personalLogoDesign.js

const base = import.meta.env.BASE_URL; // works for GitHub Pages + custom domain
const asset = (p) => `${base}${String(p).replace(/^\//, "")}`;

export default {
  slug: "personal-logo-design",
  title: "Personal Logo Design",

  meta: {
    category: ["Communication Design", "Typography", "Branding"],
    year: "2024",
    tools: ["Adobe Illustrator", "Sketch" ],
  },

  intro:
    "I designed my own personal identity: first a monogram/logo, then an ID card to go with it. The logo came first, built around my design style and what I care about. Then I made the ID card so the logo could really shine, in a layout that’s both useful and nice to look at.",

  quote: "Figuring out what “me” looks like as a logo",

  // Row 4 (gallery)
  media: [
    { type: "image", src: asset("media/graphicdesign/idcard/idcard_1.webp"), alt: "Personal monogram/logo" },
    { type: "image", src: asset("media/graphicdesign/idcard/idcard_1_1.webp"), alt: "Personal monogram/logo variation" },
    { type: "image", src: asset("media/graphicdesign/idcard/idcard_mockup1.webp"), alt: "ID card mockup 1" },
    { type: "image", src: asset("media/graphicdesign/idcard/idcard_mockup2.webp"), alt: "ID card mockup 2" },
  ],

  // Row 5 (2 columns)
  descLeft: {
    sections: [
      {
        title: "How I made it",
        bullets: [
          { label: "Step 1: Monogram/Logo Design", text: "I made a bold monogram/logo that actually means something to me and shows my style." },
          { label: "Step 2: Personal ID Card Design", text: "I built the ID card around typography and layout, so the logo stands out even more." },
          { label: "Outcome", text: "A small identity system that works both as a mark and on a real card." },
        ],
      },
    ],
  },

  
};
