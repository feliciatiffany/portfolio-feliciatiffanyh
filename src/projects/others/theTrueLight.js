// src/projects/others/theTrueLight.js
// (or wherever you store "Others" projects)

export default {
  slug: "theTrueLight",
  title: "The True Light",

  meta: {
    category: ["Others", "Short Movie", "World Building / Critical Utopias", "Video Editing"],
    year: "2025",
    tools: ["Premiere Pro", "Photoshop", "After Effects"],
  },

  // Render order (reorder freely)
  sections: [
    { kind: "intro" },

    { kind: "youtube", title: "Short Movie", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

    { kind: "media", title: "Film Stills + Documentation", layout: "gallery", itemsPath: "documentation" },

    { kind: "media", title: "Behind the Scenes + Process", layout: "slider", itemsPath: "process" },
  ],

  intro:
    "Julian Bleecker describes good design fiction as “everyday leftovers” from possible worlds: little hints of big changes that show what could happen, not predictions. " +
    "That idea stuck with me, so this short film is my try at worldbuilding a near future we could actually live in, with a slightly uncanny twist. " +
    "What still feels familiar and comforting, and what feels just a little off?",

  youtube: {
    title: "Project Video",
    videoId: "XBf0mxK4v6c",
    url: "https://www.youtube.com/watch?v=XBf0mxK4v6c",
  },

  // Left column: quick facts
  descLeft: {
    title: "Quick facts",
    bullets: [
      { label: "Title:", text: "The True Light" },
      { label: "Duration:", text: "3 minutes 45 seconds (includes behind-the-scenes)" },
      { label: "Format:", text: "Short movie + process documentation" },
    ],
    

  },

  // Right column: synopsis + meaning
  descRight: {
    title: "The story",
    paragraphs: [
      "The True Light follows Nyi Roro Nirmana, a spy who gets a big mission: sneak into a shady corporation and take down its boss.",
      "Her secret tool is a flashlight called The True Light. It helps her find information, hack data, explain what’s going on, and even works as a weapon.",
      "Just like its name, it brings everything to light, including the truth about this world.",
    ],
  },

  // These match your folder exactly: /media/others/theTrueLight/...
  documentation: [
    { type: "image", src: "/media/others/theTrueLight/documentation1.webp", alt: "Documentation 1" },
    { type: "image", src: "/media/others/theTrueLight/documentation2.webp", alt: "Documentation 2" },
    { type: "image", src: "/media/others/theTrueLight/documentation3.webp", alt: "Documentation 3" },
    { type: "image", src: "/media/others/theTrueLight/documentation4.webp", alt: "Documentation 4" },
  ],

  process: [
    { type: "image", src: "/media/others/theTrueLight/process1.webp", alt: "Process 1" },
    { type: "image", src: "/media/others/theTrueLight/process2.webp", alt: "Process 2" },
    { type: "image", src: "/media/others/theTrueLight/process3.webp", alt: "Process 3" },
    { type: "image", src: "/media/others/theTrueLight/process4.webp", alt: "Process 4" },
    { type: "image", src: "/media/others/theTrueLight/process5.webp", alt: "Process 5" },
    { type: "image", src: "/media/others/theTrueLight/process6.webp", alt: "Process 6" },
    { type: "image", src: "/media/others/theTrueLight/process7.webp", alt: "Process 7" },
    { type: "image", src: "/media/others/theTrueLight/process8.webp", alt: "Process 8" },
    { type: "image", src: "/media/others/theTrueLight/process9.webp", alt: "Process 9" },
    { type: "image", src: "/media/others/theTrueLight/process10.webp", alt: "Process 10" },
    { type: "image", src: "/media/others/theTrueLight/process11.webp", alt: "Process 11" },
    { type: "image", src: "/media/others/theTrueLight/process12.webp", alt: "Process 12" },
  ],
};
