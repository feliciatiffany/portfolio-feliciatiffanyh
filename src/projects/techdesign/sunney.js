export default {
  slug: "sunney",
  title: "Sunney: A Journey Through Passions",

  meta: {
    category: ["Tech Designer", "p5.js", "Game Design", "Interactive Storytelling"],
    year: "2026",
    tools: ["p5.js", "JavaScript", "Sprite Design", "Game Prototyping"],
  },

  intro:
    "Sunney is a p5.js game about finding the things you love and going after them. " +
    "You play as Sunney, a little sunflower, through challenges about growing up, being curious, and figuring yourself out. " +
    "The stages are inspired by music, art, and tech, and the world slowly goes from gray and unsure to full of color.",

  quote: "Finding your passions, one color at a time",

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
    title: "What it's about",
    paragraphs: [
      "Each stage is tied to a passion: music, art, or tech. As you play, the world fills in from grayscale to color, which is my way of showing someone finding themselves and getting more confident.",
      "It's partly about me and my ever-changing interests. But I also wanted it to feel relatable to anyone who has had to slowly figure out what excites them.",
    ],
  },

  progressLeft: {
    kind: "media",
    title: "Development Progress",
    layout: "slider",
    itemsPath: "progressImages",
  },

  progressRight: {
    title: "How it grew",
    paragraphs: [
      "I worked in rounds, jumping between planning the concept, building the interface, and testing playable scenes. These progress shots show it going from a rough structure to a real game.",
      "I didn't start with a finished idea. Each round was a chance to test pacing, transitions between stages, mood, and whether things made sense. That's how the growth story took shape, and how I figured out the way you move through each world.",
    ],
  },

  sketchLeft: {
    kind: "media",
    title: "Sketches & Visual Planning",
    layout: "slider",
    itemsPath: "sketchImages",
  },

  sketchRight: {
    title: "Sketching it out",
    paragraphs: [
      "I sketched Sunney's world before anything went digital. It helped me figure out each scene's layout and mood, where Sunney sits in it, and how every passion could look different but still feel like one story.",
      "Since the game is about growing up, I needed a way to turn fuzzy feelings into real scenes. The sketches were that bridge between the story in my head and the levels you actually play.",
    ],
  },

  spriteLeft: {
    kind: "media",
    title: "Sprites & Asset Design",
    layout: "slider",
    itemsPath: "spriteImages",
  },

  spriteRight: {
    title: "Making the pieces",
    paragraphs: [
      "These sprite sheets are where the idea turned into actual game pieces. They had to be playable, not just pretty, so every asset needed to move, react, and match the rest of the game.",
      "This is where I started thinking in systems. Instead of single drawings, I was thinking about how character states, backgrounds, and interactions all fit together in p5.js.",
    ],
  },

  projectFiles: [
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile1.webp", alt: "Sunney project file 1" },
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile2.webp", alt: "Sunney project file 2" },
  ],

  gameScreens: [
    { type: "image", src: "/media/techdesign/sunney/gameSS1.png", alt: "Sunney gameplay screen 1" },
    { type: "image", src: "/media/techdesign/sunney/gameSS2.png", alt: "Sunney gameplay screen 2" },
    { type: "image", src: "/media/techdesign/sunney/gameSS3.webp", alt: "Sunney gameplay screen 3" },
    { type: "image", src: "/media/techdesign/sunney/gameSS4.webp", alt: "Sunney gameplay screen 4" },
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
    { type: "image", src: "/media/techdesign/sunney/progress1.webp", alt: "Sunney progress image 1" },
    { type: "image", src: "/media/techdesign/sunney/progress2.webp", alt: "Sunney progress image 2" },
    { type: "image", src: "/media/techdesign/sunney/progress3.webp", alt: "Sunney progress image 3" },
    { type: "image", src: "/media/techdesign/sunney/progress4.webp", alt: "Sunney progress image 4" },
    { type: "image", src: "/media/techdesign/sunney/progress5.webp", alt: "Sunney progress image 5" },
  ],

  sketchImages: [
    { type: "image", src: "/media/techdesign/sunney/sketch1.webp", alt: "Sunney sketch 1" },
    { type: "image", src: "/media/techdesign/sunney/sketch2.webp", alt: "Sunney sketch 2" },
    { type: "image", src: "/media/techdesign/sunney/sketch3.webp", alt: "Sunney sketch 3" },
    { type: "image", src: "/media/techdesign/sunney/sketch4.png", alt: "Sunney sketch 4" },
    { type: "image", src: "/media/techdesign/sunney/sketch5.png", alt: "Sunney sketch 5" },
    { type: "image", src: "/media/techdesign/sunney/sketch6.png", alt: "Sunney sketch 6" },
    { type: "image", src: "/media/techdesign/sunney/sketch7.png", alt: "Sunney sketch 7" },
    { type: "image", src: "/media/techdesign/sunney/sketch8.png", alt: "Sunney sketch 8" },
    { type: "image", src: "/media/techdesign/sunney/sketch9.webp", alt: "Sunney sketch 9" },
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
    { type: "image", src: "/media/techdesign/sunney/ssProjectFile1.webp", alt: "Sunney preview image" },
  ],

  row6: null,
  references: [],
};