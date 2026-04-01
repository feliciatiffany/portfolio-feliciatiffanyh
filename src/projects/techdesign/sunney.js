export default {
  slug: "sunney",
  title: "Sunney: A Journey Through Passions",

  meta: {
    category: ["Tech Designer", "p5.js", "Game Design", "Interactive Storytelling"],
    year: "2026",
    tools: ["p5.js", "JavaScript", "Sprite Design", "Game Prototyping"],
  },

  intro:
    "Sunney is an interactive game developed with p5.js that reflects the journey of discovering and pursuing passions. " +
    "Players take on the role of Sunney, a sunflower character moving through different challenges that represent growth, curiosity, and self-discovery. " +
    "The game unfolds through stages inspired by music, art, and technology, gradually shifting from grayscale uncertainty to a more colorful and self-aware ending.",

  sections: [
    { kind: "intro" },

    // first media section: YouTube video
    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "heroLeft", rightPath: "heroRight" },

    { kind: "media", title: "Gameplay Screens", layout: "slider", itemsPath: "gameScreens" },

    { kind: "twoCol", leftPath: "progressLeft", rightPath: "progressRight" },
    { kind: "twoCol", leftPath: "sketchLeft", rightPath: "sketchRight" },
    { kind: "twoCol", leftPath: "spriteLeft", rightPath: "spriteRight" },
  ],

  youtube: {
    title: "Project Video",
    videoId: "H7zigj0XBvA",
    url: "https://youtu.be/H7zigj0XBvA",
  },

  heroLeft: {
    kind: "media",
    title: "Project Overview",
    layout: "slider",
    itemsPath: "projectFiles",
  },

  heroRight: {
    title: "Overview",
    paragraphs: [
      "The structure of the game follows different stages tied to passions such as music, art, and technology. As the player progresses, the atmosphere shifts from grayscale to color, turning visual change into a metaphor for self-discovery and confidence.",
      "I treated the project as both autobiographical and open-ended. It reflects my own relationship with changing interests, but I also wanted it to feel relatable to anyone who has had to figure out what excites them over time.",
    ],
  },

  progressLeft: {
    kind: "media",
    title: "Development Progress",
    layout: "slider",
    itemsPath: "progressImages",
  },

  progressRight: {
    title: "Development Process",
    paragraphs: [
      "I organized the project through iterative visual and gameplay development, moving between concept planning, interface building, and playable scene testing. The progress images document how the project evolved from early structure into a more complete interactive experience.",
      "Instead of presenting the game as one finished idea from the start, I used each iteration to test pacing, stage transitions, mood, and clarity. That process helped me shape the narrative around growth while also refining how the player would move through each environment.",
    ],
  },

  sketchLeft: {
    kind: "media",
    title: "Sketches & Visual Planning",
    layout: "slider",
    itemsPath: "sketchImages",
  },

  sketchRight: {
    title: "Concept Development",
    paragraphs: [
      "The sketches helped establish Sunney’s world before everything was translated into the final digital game. I used them to think through scene composition, tone, character presence, and how each passion could feel visually distinct while still belonging to one larger story.",
      "Because the game is built around personal growth, the visual planning stage was important for turning abstract emotions into concrete scenes. The sketches became a bridge between the narrative idea and the final playable environments.",
    ],
  },

  spriteLeft: {
    kind: "media",
    title: "Sprites & Asset Design",
    layout: "slider",
    itemsPath: "spriteImages",
  },

  spriteRight: {
    title: "Character & Asset System",
    paragraphs: [
      "The sprite sheets document how I translated the concept into modular game assets. Designing these elements was part of making the world playable, not just illustrative, since each asset had to support movement, interaction, and visual consistency inside the game.",
      "This stage was where the project became more system-based. Instead of only thinking about images as standalone drawings, I started thinking about how character states, environments, and interactions would work together in a p5.js game structure.",
    ],
  },

  projectFiles: [
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile1.png", alt: "Sunney project file 1" },
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile2.png", alt: "Sunney project file 2" },
  ],

  gameScreens: [
    { type: "image", src: "/media/techdesign/sunney/gameSS1.png", alt: "Sunney gameplay screen 1" },
    { type: "image", src: "/media/techdesign/sunney/gameSS2.png", alt: "Sunney gameplay screen 2" },
    { type: "image", src: "/media/techdesign/sunney/gameSS3.png", alt: "Sunney gameplay screen 3" },
    { type: "image", src: "/media/techdesign/sunney/gameSS4.png", alt: "Sunney gameplay screen 4" },
    { type: "image", src: "/media/techdesign/sunney/gameSS5.png", alt: "Sunney gameplay screen 5" },
    { type: "image", src: "/media/techdesign/sunney/gameSS6.png", alt: "Sunney gameplay screen 6" },
    { type: "image", src: "/media/techdesign/sunney/gameSS7.png", alt: "Sunney gameplay screen 7" },
    { type: "image", src: "/media/techdesign/sunney/gameSS8.png", alt: "Sunney gameplay screen 8" },
    { type: "image", src: "/media/techdesign/sunney/gameSS9.png", alt: "Sunney gameplay screen 9" },
    { type: "image", src: "/media/techdesign/sunney/gameSS10.png", alt: "Sunney gameplay screen 10" },
    { type: "image", src: "/media/techdesign/sunney/gameSS11.png", alt: "Sunney gameplay screen 11" },
    { type: "image", src: "/media/techdesign/sunney/gameSS12.png", alt: "Sunney gameplay screen 12" },
    { type: "image", src: "/media/techdesign/sunney/gameSS13.png", alt: "Sunney gameplay screen 13" },
    { type: "image", src: "/media/techdesign/sunney/gameSS14.png", alt: "Sunney gameplay screen 14" },
    { type: "image", src: "/media/techdesign/sunney/gameSS15.png", alt: "Sunney gameplay screen 15" },
    { type: "image", src: "/media/techdesign/sunney/gameSS16.png", alt: "Sunney gameplay screen 16" },
    { type: "image", src: "/media/techdesign/sunney/gameSS17.png", alt: "Sunney gameplay screen 17" },
    { type: "image", src: "/media/techdesign/sunney/gameSS18.png", alt: "Sunney gameplay screen 18" },
    { type: "image", src: "/media/techdesign/sunney/gameSS19.png", alt: "Sunney gameplay screen 19" },
  ],

  progressImages: [
    { type: "image", src: "/media/techdesign/sunney/progress1.png", alt: "Sunney progress image 1" },
    { type: "image", src: "/media/techdesign/sunney/progress2.png", alt: "Sunney progress image 2" },
    { type: "image", src: "/media/techdesign/sunney/progress3.png", alt: "Sunney progress image 3" },
    { type: "image", src: "/media/techdesign/sunney/progress4.png", alt: "Sunney progress image 4" },
    { type: "image", src: "/media/techdesign/sunney/progress5.png", alt: "Sunney progress image 5" },
  ],

  sketchImages: [
    { type: "image", src: "/media/techdesign/sunney/sketch1.jpg", alt: "Sunney sketch 1" },
    { type: "image", src: "/media/techdesign/sunney/sketch2.jpg", alt: "Sunney sketch 2" },
    { type: "image", src: "/media/techdesign/sunney/sketch3.jpg", alt: "Sunney sketch 3" },
    { type: "image", src: "/media/techdesign/sunney/sketch4.png", alt: "Sunney sketch 4" },
    { type: "image", src: "/media/techdesign/sunney/sketch5.png", alt: "Sunney sketch 5" },
    { type: "image", src: "/media/techdesign/sunney/sketch6.png", alt: "Sunney sketch 6" },
    { type: "image", src: "/media/techdesign/sunney/sketch7.png", alt: "Sunney sketch 7" },
    { type: "image", src: "/media/techdesign/sunney/sketch8.png", alt: "Sunney sketch 8" },
    { type: "image", src: "/media/techdesign/sunney/sketch9.png", alt: "Sunney sketch 9" },
    { type: "image", src: "/media/techdesign/sunney/sketch10.png", alt: "Sunney sketch 10" },
  ],

  spriteImages: [
    { type: "image", src: "/media/techdesign/sunney/sprite1.png", alt: "Sunney sprite 1" },
    { type: "image", src: "/media/techdesign/sunney/sprite2.png", alt: "Sunney sprite 2" },
    { type: "image", src: "/media/techdesign/sunney/sprite3.png", alt: "Sunney sprite 3" },
    { type: "image", src: "/media/techdesign/sunney/sprite4.png", alt: "Sunney sprite 4" },
    { type: "image", src: "/media/techdesign/sunney/sprite5.png", alt: "Sunney sprite 5" },
    { type: "image", src: "/media/techdesign/sunney/sprite6.png", alt: "Sunney sprite 6" },
    { type: "image", src: "/media/techdesign/sunney/sprite7.png", alt: "Sunney sprite 7" },
    { type: "image", src: "/media/techdesign/sunney/sprite8.png", alt: "Sunney sprite 8" },
    { type: "image", src: "/media/techdesign/sunney/sprite9.png", alt: "Sunney sprite 9" },
    { type: "image", src: "/media/techdesign/sunney/sprite10.png", alt: "Sunney sprite 10" },
    { type: "image", src: "/media/techdesign/sunney/sprite11.png", alt: "Sunney sprite 11" },
    { type: "image", src: "/media/techdesign/sunney/sprite12.png", alt: "Sunney sprite 12" },
    { type: "image", src: "/media/techdesign/sunney/sprite13.png", alt: "Sunney sprite 13" },
    { type: "image", src: "/media/techdesign/sunney/sprite14.png", alt: "Sunney sprite 14" },
    { type: "image", src: "/media/techdesign/sunney/sprite15.png", alt: "Sunney sprite 15" },
    { type: "image", src: "/media/techdesign/sunney/sprite16.png", alt: "Sunney sprite 16" },
    { type: "image", src: "/media/techdesign/sunney/sprite17.png", alt: "Sunney sprite 17" },
    { type: "image", src: "/media/techdesign/sunney/sprite18.png", alt: "Sunney sprite 18" },
  ],

  media: [
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile1.png", alt: "Sunney preview image" },
  ],

  row6: null,
  references: [],
};