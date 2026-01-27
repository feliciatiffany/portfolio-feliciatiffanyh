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
    "Nusa Penida is an island destination in Bali, Indonesia, known for its stunning natural landscapes, including dramatic cliffs, pristine beaches, and vibrant marine life.\n\n" +
    "Not only that, it offers visitors a mix of natural beauty and activities like snorkeling, diving, trekking, and exploring unique geological formations (e.g., Kelingking Beach, Angel’s Billabong).\n\n" +
    "Brand Direction: Adventure audiences want earned experiences and safety clarity. Emphasize friendliness and diverse site with a center on “Tri Hita Karana” (harmony of people–nature–divine).\n\n" +
    "**Keywords:** **cool, sustainable, family, friendly, recreation, bold, escape, adventure, motif, color, premium, safe**",

  // ✅ MP4 in slider
  video: [
    { type: "video", src: asset("media/graphicdesign/nusaPenida/thumbnail.mp4"), alt: "Nusa Penida — Video" },
  ],
finalPages: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final1.png"), alt: "Final 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final2.png"), alt: "Final 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final3.png"), alt: "Final 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final4.png"), alt: "Final 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final5.png"), alt: "Final 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final6.png"), alt: "Final 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final7.png"), alt: "Final 7" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final8.png"), alt: "Final 8" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final9.png"), alt: "Final 9" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final10.png"), alt: "Final 10" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final11.png"), alt: "Final 11" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final12.png"), alt: "Final 12" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final13.png"), alt: "Final 13" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final14.png"), alt: "Final 14" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final15.png"), alt: "Final 15" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final16.png"), alt: "Final 16" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final17.png"), alt: "Final 17" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final18.png"), alt: "Final 18" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final19.png"), alt: "Final 19" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final20.png"), alt: "Final 20" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final21.png"), alt: "Final 21" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final22.png"), alt: "Final 22" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final23.png"), alt: "Final 23" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final24.png"), alt: "Final 24" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final25.png"), alt: "Final 25" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final26.png"), alt: "Final 26" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final27.png"), alt: "Final 27" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final28.png"), alt: "Final 28" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final29.png"), alt: "Final 29" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final30.png"), alt: "Final 30" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final31.png"), alt: "Final 31" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final32.png"), alt: "Final 32" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final33.png"), alt: "Final 33" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final34.png"), alt: "Final 34" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final35.png"), alt: "Final 35" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final36.png"), alt: "Final 36" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final37.png"), alt: "Final 37" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final38.png"), alt: "Final 38" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final39.png"), alt: "Final 39" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final40.png"), alt: "Final 40" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final41.png"), alt: "Final 41" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final42.png"), alt: "Final 42" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final43.png"), alt: "Final 43" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final44.png"), alt: "Final 44" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final45.png"), alt: "Final 45" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final48.png"), alt: "Final 48" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final49.png"), alt: "Final 49" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final50.png"), alt: "Final 50" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final51.png"), alt: "Final 51" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final52.png"), alt: "Final 52" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final53.png"), alt: "Final 53" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final54.png"), alt: "Final 54" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/final55.png"), alt: "Final 55" },
  ],

  // =========================
  // PROCESS TEXT
  // =========================
  processLeft: {
    title: "Design Process",
    paragraphs: [
      "This project is a multi-week rebrand where I researched an existing brand, identified what was not working, then developed a new strategy and visual system that could scale across real-world touchpoints.",
      "The goal was not to redesign a logo in isolation, but to build a brand direction rooted in context, competition, and audience needs, then prove it through implementation.",
    ],
  },

  processRight: {
    title: "Brand Direction",
    bullets: [
      "Adventure audiences want earned experiences + safety clarity",
      "Friendly and family-accessible (not only extreme adventure)",
      "Diverse sites unified by a coherent system",
      "Centered on Tri Hita Karana (people–nature–divine)",
      "Built to scale across real touchpoints",
    ],
  },

  // =========================
  // 1) RESEARCH
  // =========================
  researchLeft: {
    title: "1) Research & Orientation",
    paragraphs: [
      "I started by choosing a brand and building a clear snapshot of its current state. I researched what the brand does, who it serves, and how it communicates today.",
      "I traced its recent history to understand how its identity evolved and what cultural or industry shifts shaped it.",
      "To ground the work, I mapped the competitive landscape and compared visual identities across competitors to see where the brand blends in, where it stands out, and what gaps it could own.",
      "I summarized all findings into a short presentation to clarify the problem space before designing anything.",
    ],
  },

  researchRight: {
    title: "What This Stage Produced",
    bullets: [
      "Current-state audit + pain points",
      "Audience framing (adventure / family / explorers)",
      "Competitive landscape + differentiation opportunities",
      "Clear problem statement before visual design",
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
    title: "2) Strategic & Conceptual Direction",
    paragraphs: [
      "Using the research, I reframed the findings into recommendations and proposed three different rebrand strategies, each with a distinct positioning and tone.",
      "I treated strategy as a design constraint—each direction was justified by today’s cultural and social context, not just personal taste.",
      "This step set the foundation for what the brand should mean, who it should speak to, and what it should feel like. Strategic direction was communicated through moodboards and tone.",
    ],
  },

  strategicRight: {
    title: "How Strategy Guided Design",
    bullets: [
      "Positioning: earned adventure + clear safety cues",
      "Tone: friendly, premium, bold (without feeling exclusive)",
      "System thinking: destinations feel diverse yet unified",
      "Tri Hita Karana used as an organizing principle",
    ],
  },

  strategicMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic1.jpg"), alt: "Strategic 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/strategic2.jpg"), alt: "Strategic 2" },
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
    title: "3) Visual & Conceptual Exploration",
    paragraphs: [
      "After reviewing the strategic directions, I combined key parts into three stronger conceptual foundations. Instead of treating strategy as three separate options, I merged elements that felt most aligned with the brand’s needs and cultural context.",
      "From there, I explored three different visual directions that could express the same strategy in different ways—testing typography, color, layout, imagery, and graphic language.",
      "This phase was about breadth and comparison: generating distinct options, putting them side by side, and using feedback to understand which visual choices best supported the strategy.",
    ],
  },

  conceptualRight: {
    title: "What I Explored",
    bullets: [
      "Typography systems (friendly clarity vs premium authority)",
      "Color logic (bold escapism + safety legibility)",
      "Motif/pattern language (place-based, scalable)",
      "Layout rules (consistent hierarchy across many outputs)",
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
    title: "4) Implementation & Drafting",
    paragraphs: [
      "Based on critique and feedback, I refined the chosen direction and started stress testing the system across touchpoints rather than only in a single hero mockup.",
      "This is where hierarchy, spacing, alignment, and consistency became critical, because the brand needed to feel coherent across formats while still being flexible.",
      "For the final brand guide book, I applied the system across multiple touchpoints and treated implementation as proof—checking where the identity breaks, what elements are too rigid, and what rules need to be clarified.",
      "The result is a brand kit that is not just visually appealing, but operational, consistent, and designed to scale.",
    ],
  },

  draftingRight: {
     paragraphs: [
      "For the final brand guide book, I applied the system across multiple touchpoints and treated implementation as proof—checking where the identity breaks, what elements are too rigid, and what rules need to be clarified.",
      "The result is a brand kit that is not just visually appealing, but operational, consistent, and designed to scale.",
    ],
  },

  draftMedia: [
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft1.png"), alt: "Draft 1" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft2.png"), alt: "Draft 2" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft3.png"), alt: "Draft 3" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft4.png"), alt: "Draft 4" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft5.png"), alt: "Draft 5" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft6.png"), alt: "Draft 6" },
    { type: "image", src: asset("media/graphicdesign/nusaPenida/draft7.png"), alt: "Draft 7" },

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