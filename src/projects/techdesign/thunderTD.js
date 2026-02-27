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
    "TouchDesigner interactive visuals for DJ. Experimental setup built fully with TOPs and feedback loops. " +
    "The base video sources are Thunder + live video input from OBS, processed in real time to generate responsive visuals.",

  youtube: {
    title: "YouTube",
    videoId: "7Mz7gm41abA",
    url: "https://youtu.be/7Mz7gm41abA",
  },

  instagramEmbeds: [
    { url: "https://www.instagram.com/reel/REPLACE_WITH_SHORTCODE_1/", captioned: false },
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
    { type: "image", src: "/media/techdesign/thunder/documentation1.png", alt: "Thunder documentation 1" },
    { type: "image", src: "/media/techdesign/thunder/documentation2.png", alt: "Thunder documentation 2" },
    { type: "image", src: "/media/techdesign/thunder/documentation3.png", alt: "Thunder documentation 3" },
  ],

  media: [],
  row6: null,
  references: [],
};