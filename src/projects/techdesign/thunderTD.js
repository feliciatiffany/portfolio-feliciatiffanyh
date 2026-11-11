// src/projects/techdesign/thunderTD.js

export default {
  slug: "ThunderTD",
  title: '"Thunder" TouchDesigner Interactive Visuals',

  meta: {
    category: ["Tech Designer", "Real-time Visuals", "Interactive Media"],
    year: "2024",
    tools: ["TouchDesigner", "TOPs", "Feedback", "OBS (video + lighting input)"],
  },

  sections: [
    { kind: "intro" },
    { kind: "youtube", title: "Video (YouTube)", videoIdPath: "youtube.videoId" },

    // ✅ Instagram + Documentation slider side-by-side
    { kind: "twoCol", leftPath: "igSection", rightPath: "docsSection" },
  ],

  intro:
    "Interactive TouchDesigner visuals for DJ sets. This was an experiment: I built the whole thing only with TOPs and feedback loops. " +
    "I fed in Thunder footage plus a live video feed from OBS, and processed it all in real time so the visuals react as they go.",


  youtube: {
    title: "YouTube",
    videoId: "KHj4C1o3eOw",
    url: "https://youtu.be/KHj4C1o3eOw",
  },

  instagramEmbeds: [
    { url: "https://www.instagram.com/p/DVSoafCjmPs/?igsh=MXdkdDVwMTkwNDNkbw==", captioned: false },
  ],

  // ✅ left column: instagram embed (inline)
  igSection: {
    kind: "instagram",
    title: "Video (Instagram)",
    itemsPath: "instagramEmbeds",
  },

  docsSection: {
    kind: "media",
    title: "Documentation",
    layout: "slider",
    itemsPath: "docs",
  },

  docs: [
    { type: "image", src: "/media/techdesign/thunder/documentation1.webp", alt: "Thunder documentation 1" },
    { type: "image", src: "/media/techdesign/thunder/documentation2.webp", alt: "Thunder documentation 2" },
    { type: "image", src: "/media/techdesign/thunder/documentation3.webp", alt: "Thunder documentation 3" },
  ],

  media: [],
  row6: null,
  references: [],
};