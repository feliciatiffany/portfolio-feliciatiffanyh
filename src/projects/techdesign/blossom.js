export default {
  slug: "blossom",
  title: "Out-of-Place Blooms",

  meta: {
    category: ["3D Modeling", "Worldbuilding"],
    year: "2026",
    tools: ["Blender", "Substance", "Premiere Pro"],
  },

  layout: "blossom-grid",

  sections: [
    { kind: "intro" },
    { kind: "desc", dataPath: "conceptBlock" },

    {
      kind: "media",
      title: "Side Views",
      layout: "video",
      itemsPath: "sideVideos",
      className: "blossom-side",
    },

    {
      kind: "media",
      title: "Wide Views",
      layout: "video",
      itemsPath: "wideVideos",
      className: "blossom-wide",
    },

    {
      kind: "media",
      title: "Close-Ups",
      layout: "video",
      itemsPath: "closeupVideos",
      className: "blossom-closeups",
    },
  ],

  intro:
    "Out-of-Place Blooms is a 3D collection about flowers surviving in unique and extraordinary environments, challenging what we consider their “natural” habitat.\\n\\n" +
    "I created a cohesive set of four stylized flower dioramas, each placing a flower in an unexpected biome. Each model explores the tension between beauty and discomfort, showing visual adaptation through form, texture, and materials, while staying unified as one collectible series.",

  
  sideVideos: [
    { src: "/media/techdesign/blossom/Final_cactus_side.mp4", alt: "Cactus diorama side view" },
    { src: "/media/techdesign/blossom/Final_lotus_side.mp4", alt: "Lotus diorama side view" },
    { src: "/media/techdesign/blossom/final_rose_side.mp4", alt: "Rose diorama side view" },
    { src: "/media/techdesign/blossom/Final_sunflower_side.mp4", alt: "Sunflower diorama side view" },
  ],

  wideVideos: [
    { src: "/media/techdesign/blossom/Final_cactus_wide2.mp4", alt: "Cactus diorama wide view" },
    { src: "/media/techdesign/blossom/Final_lotus_wide.mp4", alt: "Lotus diorama wide view" },
    { src: "/media/techdesign/blossom/Final_rose_wide.mp4", alt: "Rose diorama wide view" },
    { src: "/media/techdesign/blossom/Final_sunflower_wide.mp4", alt: "Sunflower diorama wide view" },
  ],

  closeupVideos: [
    { src: "/media/techdesign/blossom/Final_cactus_closeup0001-0300.mp4", alt: "Cactus diorama close-up" },
    { src: "/media/techdesign/blossom/final_lotus_closeup0001-0300.mp4", alt: "Lotus diorama close-up" },
    { src: "/media/techdesign/blossom/Final_rose_closeup0001-0300.mp4", alt: "Rose diorama close-up" },
    { src: "/media/techdesign/blossom/Final_sunflower_closeup.mp4", alt: "Sunflower diorama close-up" },
  ],

  /* used by the project list preview */
  media: [
    {
      type: "video",
      src: "/media/techdesign/blossom/Final_cactus_side.mp4",
      alt: "Out-of-Place Blooms preview",
    },
  ],

  row6: null,
  references: [],
};