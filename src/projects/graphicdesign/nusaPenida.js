// src/projects/graphicdesign/nusaPenida.js

const base = import.meta.env.BASE_URL;
const asset = (p) => `${base}${String(p).replace(/^\//, "")}`;

export default {
  slug: "nusa-penida",
  title: "Nusa Penida — Brand Design",

  meta: {
    category: ["Branding", "Identity System", "Brand Strategy", "Graphic Design"],
    year: "2025",
    tools: ["Adobe Illustrator", "Photoshop"],
  },

  sections: [
    { kind: "intro" },

    // ✅ video BEFORE first media section
    { kind: "media", title: "Project Video", layout: "video", itemsPath: "video" },

    { kind: "media", title: "Final Brand Guide Book", layout: "slider", itemsPath: "finalPages" },

    { kind: "twoCol", leftPath: "processLeft", rightPath: "processRight" },

    { kind: "twoCol", leftPath: "researchLeft", rightPath: "researchRight" },
    { kind: "media", title: "Research & Orientation", layout: "slider", itemsPath: "researchMedia" },

    { kind: "twoCol", leftPath: "strategicLeft", rightPath: "strategicRight" },
    { kind: "media", title: "Strategic & Conceptual Direction", layout: "slider", itemsPath: "strategicMedia" },

    { kind: "twoCol", leftPath: "conceptualLeft", rightPath: "conceptualRight" },
    { kind: "media", title: "Visual & Conceptual Exploration", layout: "slider", itemsPath: "conceptualMedia" },

    { kind: "twoCol", leftPath: "draftingLeft", rightPath: "draftingRight" },
    { kind: "media", title: "Implementation & Drafting", layout: "slider", itemsPath: "draftMedia" },

  ],

  intro:
    "Nusa Penida is an island in Bali, Indonesia, with huge cliffs, beautiful beaches, and so much sea life.\n\n" +
    "You can snorkel, dive, trek, or go see wild rock formations like Kelingking Beach and Angel’s Billabong.\n\n" +
    "My brand direction: adventurers want experiences they earn, and they want to know they’re safe. So I leaned into friendliness and how many different places the island has, all centered on “Tri Hita Karana” (harmony between people, nature, and the divine).\n\n" +
    "**Keywords:** **cool, sustainable, family, friendly, recreation, bold, escape, adventure, motif, color, premium, safe**",

  quote: "Adventure that feels earned, but always safe",

  // ✅ MP4 in slider
  video: [
    { type: "video", src: asset("media/graphicdesign/nusaPenida/thumbnail.web.mp4"), alt: "Nusa Penida — Video" },
  ],
finalPages: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final1.webp"), alt: "Final 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final2.webp"), alt: "Final 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final3.webp"), alt: "Final 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final4.webp"), alt: "Final 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final5.webp"), alt: "Final 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final6.webp"), alt: "Final 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final7.webp"), alt: "Final 7" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final8.webp"), alt: "Final 8" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final9.webp"), alt: "Final 9" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final10.webp"), alt: "Final 10" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final11.webp"), alt: "Final 11" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final12.webp"), alt: "Final 12" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final13.webp"), alt: "Final 13" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final14.webp"), alt: "Final 14" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final15.webp"), alt: "Final 15" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final16.webp"), alt: "Final 16" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final17.webp"), alt: "Final 17" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final18.webp"), alt: "Final 18" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final19.webp"), alt: "Final 19" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final20.webp"), alt: "Final 20" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final21.webp"), alt: "Final 21" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final22.webp"), alt: "Final 22" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final23.webp"), alt: "Final 23" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final24.webp"), alt: "Final 24" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final25.webp"), alt: "Final 25" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final26.webp"), alt: "Final 26" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final27.webp"), alt: "Final 27" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final28.webp"), alt: "Final 28" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final29.webp"), alt: "Final 29" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final30.webp"), alt: "Final 30" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final31.webp"), alt: "Final 31" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final32.webp"), alt: "Final 32" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final33.webp"), alt: "Final 33" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final34.webp"), alt: "Final 34" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final35.webp"), alt: "Final 35" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final36.webp"), alt: "Final 36" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final37.webp"), alt: "Final 37" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final38.webp"), alt: "Final 38" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final39.webp"), alt: "Final 39" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final40.webp"), alt: "Final 40" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final41.webp"), alt: "Final 41" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final42.webp"), alt: "Final 42" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final43.webp"), alt: "Final 43" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final44.webp"), alt: "Final 44" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final45.webp"), alt: "Final 45" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final48.webp"), alt: "Final 48" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final49.webp"), alt: "Final 49" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final50.webp"), alt: "Final 50" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final51.webp"), alt: "Final 51" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final52.webp"), alt: "Final 52" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final53.webp"), alt: "Final 53" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final54.webp"), alt: "Final 54" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final55.webp"), alt: "Final 55" },
  ],

  // =========================
  // PROCESS TEXT
  // =========================
  processLeft: {
    title: "How I approached it",
    paragraphs: [
      "This was a multi-week rebrand. I researched an existing brand, figured out what wasn’t working, then built a new strategy and visual system that could work in the real world.",
      "I didn’t want to just redraw a logo. I wanted a direction that came from the place, the competition, and the people visiting, and then I wanted to prove it actually works.",
    ],
  },

  processRight: {
    title: "Where I wanted the brand to go",
    bullets: [
      "Adventurers want experiences they earn, and clear safety info",
      "Friendly for families too, not only extreme adventure",
      "Lots of different spots, held together by one system",
      "Centered on Tri Hita Karana (people, nature, divine)",
      "Made to work on real things people see and use",
    ],
  },

  // =========================
  // 1) RESEARCH
  // =========================
  researchLeft: {
    title: "1) Getting to know the brand",
    paragraphs: [
      "First I picked a brand and looked hard at where it stands today: what it does, who it’s for, and how it talks to people.",
      "I dug into its recent history to see how the identity changed and what shaped it.",
      "Then I looked at the competitors side by side. Where does this brand blend in? Where does it stand out? What space is still open?",
      "I put it all into a short presentation, so I knew the actual problem before designing anything.",
    ],
  },

  researchRight: {
    title: "What I came out with",
    bullets: [
      "A check-up of where the brand is now, and its pain points",
      "Who it’s for (adventurers, families, explorers)",
      "The competition, and where the brand could stand apart",
      "A clear problem to solve before any visuals",
    ],
  },

  researchMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research1.jpg"), alt: "Research 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research2.jpg"), alt: "Research 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research3.jpg"), alt: "Research 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research4.jpg"), alt: "Research 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research5.jpg"), alt: "Research 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research6.jpg"), alt: "Research 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research7.jpg"), alt: "Research 7" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research8.jpg"), alt: "Research 8" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/research9.jpg"), alt: "Research 9" },
  ],

  // =========================
  // 2) STRATEGY
  // =========================
  strategicLeft: {
    title: "2) Picking a direction",
    paragraphs: [
      "From the research, I came up with three different rebrand strategies, each with its own positioning and tone.",
      "I used strategy as a rule for myself: every direction had to make sense for today’s culture, not just my personal taste.",
      "This step decided what the brand should mean, who it talks to, and how it should feel. I showed each one through moodboards and tone.",
    ],
  },

  strategicRight: {
    title: "How strategy shaped the design",
    bullets: [
      "Positioning: adventure you earn, with clear safety cues",
      "Tone: friendly, premium, and bold, without feeling exclusive",
      "Lots of different places that still feel like one family",
      "Tri Hita Karana as the thing that ties it all together",
    ],
  },

  strategicMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic1.jpg"), alt: "Strategic 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic2.webp"), alt: "Strategic 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic3.jpg"), alt: "Strategic 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic4.jpg"), alt: "Strategic 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic5.jpg"), alt: "Strategic 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic6.jpg"), alt: "Strategic 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic7.jpg"), alt: "Strategic 7" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic8.jpg"), alt: "Strategic 8" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic9.jpg"), alt: "Strategic 9" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic10.jpg"), alt: "Strategic 10" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic11.jpg"), alt: "Strategic 11" },
  ],

  // =========================
  // 3) CONCEPTUAL EXPLORATION
  // =========================
  conceptualLeft: {
    title: "3) Trying out the look",
    paragraphs: [
      "Instead of keeping the three strategies separate, I mixed the parts that fit the brand and its culture best into three stronger concepts.",
      "Then I explored three visual directions for the same idea, playing with typography, color, layout, imagery, and graphics.",
      "This part was about making lots of options, putting them side by side, and using feedback to see which choices really worked.",
    ],
  },

  conceptualRight: {
    title: "What I played with",
    bullets: [
      "Typography (friendly and clear vs premium and confident)",
      "Color (bold escape vibes, but still easy to read for safety)",
      "Motifs and patterns inspired by the place, that can grow with the brand",
      "Layout rules, so every piece has the same clear hierarchy",
    ],
  },

  conceptualMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual1.jpg"), alt: "Conceptual 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual2.jpg"), alt: "Conceptual 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual3.jpg"), alt: "Conceptual 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual4.jpg"), alt: "Conceptual 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual5.jpg"), alt: "Conceptual 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual6.jpg"), alt: "Conceptual 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/conceptual7.jpg"), alt: "Conceptual 7" },
  ],

  // =========================
  // 4) IMPLEMENTATION / DRAFTS
  // =========================
  draftingLeft: {
    title: "4) Making it real",
    paragraphs: [
      "After critique and feedback, I refined the direction I picked. Then I tried it on lots of real pieces, not just one pretty hero mockup.",
      "This is where the small stuff mattered most: hierarchy, spacing, alignment. The brand had to feel the same everywhere, but still be flexible.",
    ],
  },

  draftingRight: {
     paragraphs: [
      "For the final brand guide book, I used every touchpoint as a test. Where does the identity break? What feels too stiff? Which rules need to be clearer?",
      "What I ended up with is a brand kit that looks good, but also actually works, stays consistent, and can grow.",
    ],
  },

  draftMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft1.png"), alt: "Draft 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft2.webp"), alt: "Draft 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft3.webp"), alt: "Draft 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft4.webp"), alt: "Draft 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft5.webp"), alt: "Draft 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft6.webp"), alt: "Draft 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft7.webp"), alt: "Draft 7" },

    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft10.jpg"), alt: "Draft 10" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft11.jpg"), alt: "Draft 11" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft12.jpg"), alt: "Draft 12" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft13.jpg"), alt: "Draft 13" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft14.jpg"), alt: "Draft 14" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft15.jpg"), alt: "Draft 15" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft16.jpg"), alt: "Draft 16" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft17.jpg"), alt: "Draft 17" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft18.jpg"), alt: "Draft 18" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft19.jpg"), alt: "Draft 19" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft20.jpg"), alt: "Draft 20" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft21.jpg"), alt: "Draft 21" },
  ],
};