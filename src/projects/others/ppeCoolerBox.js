// src/projects/techdesign/ppeCoolerBox.js

export default {
  slug: "ppeCoolerBox",
  title: "PPE Cooler Box (PC-Box)",

  meta: {
    category: ["Hardware Prototype", "Health & Safety", "Wearable Cooling", "Social Impact"],
    year: "2021",
    tools: [
      "Arduino UNO",
      "Thermoelectric Cooler (TEC1-12706)",
      "Temperature Sensor",
      "Blower Fan + Cooling Fan",
      "Flexible Air Pipes",
      "PPE Suit",
    ],
  },

  sections: [
    { kind: "intro" },

    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },

    // Optional: add your photos later (leave empty for now, it won't render)
    { kind: "media", title: "Documentation", layout: "slider", itemsPath: "media" },

    { kind: "desc", dataPath: "linksBlock" },
    { kind: "desc", dataPath: "problemContext" },
    { kind: "desc", dataPath: "motivationRelatedWork" },
    { kind: "desc", dataPath: "objectives" },
    { kind: "desc", dataPath: "systemOverview" },
    { kind: "desc", dataPath: "howItWorks" },
    { kind: "desc", dataPath: "designConstraints" },
    { kind: "desc", dataPath: "results" },
    { kind: "desc", dataPath: "keywordsBlock" },

    // Keep references if you later add paper links
    { kind: "references", title: "References", itemsPath: "references" },
  ],

  intro:
    "The PPE (Personal Protective Equipment) Cooler Box, or PC-Box, is a light, wearable cooling add-on I designed for healthcare workers in full PPE. In hot, humid places those suits get really hot, so I wanted to make them more comfortable and lower the risk of heat-related illness.",
  quote: "Keeping healthcare workers cool inside their PPE",

  youtube: {
    title: "PC-Box Demo",
    videoId: "7Mz7gm41abA",
    url: "https://www.youtube.com/watch?v=7Mz7gm41abA",
  },

  // OPTIONAL: add your images here later (put files in /public/media/techdesign/ppeCooler/)
  // Example:
  // media: [
  //   { type: "image", src: "/media/techdesign/ppeCooler/overview.jpg", alt: "PC-Box overview" },
  //   { type: "image", src: "/media/techdesign/ppeCooler/wearing.jpg", alt: "Wearing PC-Box with PPE" },
  // ],
  media: [],

  linksBlock: {
    title: "Links",
    links: [{ label: "YouTube video", href: "https://www.youtube.com/watch?v=7Mz7gm41abA" }],
  },

  problemContext: {
    title: "The problem",
    paragraphs: [
      "Many news outlets reported that wearing PPE for a long time can lead to heat stroke, overheating, heavy sweating, faster dehydration, skin rashes, and extra stress on the heart, especially in hot and humid places.",
      "The usual fixes, like more breaks or changing PPE more often, don’t always work in real life. That’s especially true in developing countries, where there aren’t enough healthcare workers, PPE, or facilities.",
    ],
  },

  motivationRelatedWork: {
    title: "What already existed",
    paragraphs: [
      "Some existing ideas monitor the body and warn you when your temperature is too high, which can mean heat stress, fatigue, or fever.",
      "Another one circulates temperature-controlled water inside the PPE, but that gets heavy and hard to wear.",
      "That pushed me toward the PC-Box: a light (< 1 kg), wearable system that moves cool air through the PPE, to help people stay clear-headed and healthy while they work.",
    ],
  },

  objectives: {
    title: "What I wanted it to do",
    bullets: [
      "Help healthcare workers keep a normal body temperature in PPE.",
      "Get more air moving inside the suit to cut down heat and discomfort.",
      "Stay light (under 1 kg), easy to use, and out of the way when moving.",
      "Be safe and practical, even in places with limited resources.",
    ],
  },

  systemOverview: {
    title: "What’s inside",
    paragraphs: [
      "The PC-Box is a small cooling module you wear on your back like a backpack, connected to the PPE. Inside there’s an Arduino UNO, a cooling engine, blower and cooling fans, flexible air pipes, and sensors.",
      "The cooling engine is a Thermoelectric Cooler (TEC1-12706) with heatsinks and fans to move the heat around.",
    ],
    sections: [
      {
        title: "Where the cool air goes",
        bullets: [
          "Back",
          "Hands (right + left)",
          "Legs (right + left)",
        ],
      },
    ],
  },

  howItWorks: {
    title: "How it works",
    sections: [
      {
        title: "Control logic",
        bullets: [
          "It turns on when the sensor detects air inside the PPE above 26°C.",
          "Hot air gets pulled out and pushed through the heatsink grille and cooling engine.",
          "The Arduino controls the blower fan (air in) and the cooling fan (getting heat off the hot-side heatsink).",
          "Once the air is cooled to ~22–26°C, it flows back into the PPE through flexible pipes to different parts of the body.",
          "A cooling fan blows the engine’s heat out into the air.",
        ],
      },
      {
        title: "Comfort and safety",
        bullets: [
          "Flexible pipes so you can still move freely.",
          "Pipes are built into a simple vest, so you can put it on yourself.",
          "Wearing it like a backpack keeps you balanced and out of your own way.",
          "No explosive parts, and the pipes screw into the PPE so the suit stays sealed.",
        ],
      },
    ],
  },

  designConstraints: {
    title: "Rules I gave myself",
    bullets: [
      "Light: under 1 kg.",
      "Simple: quick to set up and easy to use in a real clinic.",
      "Doesn’t get in the way while working.",
      "Safe with PPE: secure pipe connections and little risk of leaks.",
    ],
  },

  results: {
    title: "What happened in testing",
    paragraphs: [
      "In testing, the PC-Box turned on once the temperature inside the suit went above 26°C.",
      "It took around 10 minutes to get cool air to the body. Then the cooling engine paused until it got warm again.",
      "People who tried it said it made wearing PPE less hot and more comfortable, which made it easier to keep working.",
    ],
  },

  keywordsBlock: {
    title: "Keywords",
    paragraphs: ["PPE, heat-related illness, COVID-19, occupational health and safety, wearable cooling, thermoelectric cooling"],
  },

  references: [],
  row6: null,
};