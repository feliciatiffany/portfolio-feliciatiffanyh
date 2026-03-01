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
    "PPE (Personal Protective Equipment) Cooler Box—also referred to as the PC-Box—is a lightweight wearable cooling add-on designed to improve comfort and reduce heat-related illness risk for Healthcare Personnel (HCP) working in full PPE in hot and humid conditions.",

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
    title: "Problem Context",
    paragraphs: [
      "Multiple news outlets reported that prolonged PPE use can cause heat-related illness such as heat stroke, thermal discomfort, excessive sweating, faster dehydration, skin rash, and increased cardiovascular stress—especially in hot and humid environments.",
      "Common mitigation strategies like adjusting rest schedules or periodically changing PPE can be impractical and inefficient in many real conditions, particularly in developing countries where healthcare personnel, PPE supply, and infrastructure are limited.",
    ],
  },

  motivationRelatedWork: {
    title: "Motivation and Related Work",
    paragraphs: [
      "Some related approaches focus on physiological monitoring to warn when body temperature is too high, indicating heat stress, fatigue, or fever.",
      "Another approach explored a temperature-controlled water circulating system worn in PPE for thermal management, but wearability and weight become major practical considerations.",
      "These considerations inspired the PC-Box: a lightweight (< 1 kg), wearable cooling system that supports air circulation in PPE to help maintain stable cognitive and immune performance.",
    ],
  },

  objectives: {
    title: "Project Objectives",
    bullets: [
      "Help healthcare personnel maintain a normal body temperature while wearing PPE.",
      "Improve air circulation inside PPE to reduce heat stress and discomfort.",
      "Keep the system lightweight (target < 1 kg), simple to use, and non-intrusive to movement.",
      "Ensure the solution is safe, practical, and suitable for resource-limited contexts.",
    ],
  },

  systemOverview: {
    title: "System Overview (PC-Box)",
    paragraphs: [
      "The PC-Box integrates PPE with a compact cooling module carried on the back like a backpack. The system includes an Arduino UNO microcontroller, a cooling engine, blower/cooling fans, flexible air pipes, and sensors.",
      "The cooling engine is built around a Thermoelectric Cooler (TEC1-12706) paired with heatsinks and fans to manage heat transfer.",
    ],
    sections: [
      {
        title: "Air delivery targets",
        bullets: [
          "Back",
          "Hands (right + left)",
          "Legs (right + left)",
        ],
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    sections: [
      {
        title: "Control logic",
        bullets: [
          "The system starts when the temperature sensor detects air inside PPE above 26°C.",
          "Hot air is sucked out and flowed through the heatsink grille and cooling engine.",
          "The microcontroller regulates blower fan speed (air intake) and cooling fan speed (dissipating heat from the hot-side heatsink).",
          "After cooling the air to ~22–26°C, the air is circulated back into the PPE through flexible pipes to the body zones.",
          "The engine heat is released to the environment using a cooling fan.",
        ],
      },
      {
        title: "Wearability and safety",
        bullets: [
          "Flexible pipes reduce movement restriction.",
          "Pipes are integrated into a simple vest to allow independent use (no assistance needed).",
          "Backpack placement improves balance and minimizes interference during work.",
          "Designed without explosive components; PPE pipe connection uses screwed fittings to keep the suit secure.",
        ],
      },
    ],
  },

  designConstraints: {
    title: "Design Constraints",
    bullets: [
      "Lightweight: target system weight < 1 kg.",
      "Simple steps: fast setup and easy operation in real clinical conditions.",
      "Does not interfere with movement during tasks.",
      "Safe integration with PPE (secure pipe connections, minimal leakage risk).",
    ],
  },

  results: {
    title: "Test Results and User Feedback",
    paragraphs: [
      "From testing, the PC-Box activates after detecting temperature above 26°C inside the PPE suit.",
      "It takes around 10 minutes to circulate cooled air to the body. The cooling engine then pauses temporarily until temperature rises again.",
      "Based on user reviews, the PC-Box helps reduce heat discomfort while wearing PPE, improving comfort and supporting productivity.",
    ],
  },

  keywordsBlock: {
    title: "Keywords",
    paragraphs: ["PPE, heat-related illness, COVID-19, occupational health and safety, wearable cooling, thermoelectric cooling"],
  },

  references: [],
  row6: null,
};