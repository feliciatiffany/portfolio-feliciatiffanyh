// src/projects/graphicdesign/past2024.js

const base = import.meta.env.BASE_URL;
const asset = (p) => `${base}${String(p).replace(/^\//, "")}`;

export default {
  slug: "past-2024",
  title: "Past Work (Before 2024)",

  // ✅ tells ProjectTemplate/CSS to use the special layout
  layout: "fullpage-stack",
  // only the description, then all the images (no hero, details row or quote)
  bare: true,

  meta: {
    category: ["Archive", "Communication Design", "Fine Art","Merchandise", "Branding & Marketing", "Illustration", "Game Design", "Photo Editing", "Typography", "Short Movies"],
    year: "Pre-2024",
    tools: ["Adobe Illustrator", "Photoshop", "Premiere Pro", "After Effects", "Paint", "Photography", "Traditional Media","Canva" ],
  },

  intro:
    "My little archive of everything I made before 2024: work for orgs, competition entries, hobby projects, and early school work.\n\n"+
    "I grew up curious about a bit of everything, and somewhere along the way I fell in love with design. That’s what led me to major in Design and Technology. Some of these pieces come from student organizations and competitions, some are just things I made for fun, and some are from my foundation year at Parsons, The New School, where I got to try out all kinds of forms and styles.",

  quote: "Where my curiosity slowly turned into design",

  // Row 4: full-page stack images (public/media/graphicdesign/past2023/)
  media: [
    { type: "image", src: asset("media/graphicdesign/past2024/page1.png"), alt: "Past work page 1" },
    { type: "image", src: asset("media/graphicdesign/past2024/page2.png"), alt: "Past work page 2" },
    { type: "image", src: asset("media/graphicdesign/past2024/page3.png"), alt: "Past work page 3" },
    { type: "image", src: asset("media/graphicdesign/past2024/page4.png"), alt: "Past work page 4" },
    { type: "image", src: asset("media/graphicdesign/past2024/page5.png"), alt: "Past work page 5" },
    { type: "image", src: asset("media/graphicdesign/past2024/page6.png"), alt: "Past work page 6" },
    { type: "image", src: asset("media/graphicdesign/past2024/page7.png"), alt: "Past work page 7" },
    { type: "image", src: asset("media/graphicdesign/past2024/page8.png"), alt: "Past work page 8" },
  ],

  
};
