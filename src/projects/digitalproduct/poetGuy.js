export default {
  slug: "poet",
  title: "Poet Guy",

  meta: {
    category: ["Tech Designer", "JavaScript", "Poetry Generator", "Interactive Web"],
    year: "2026",
    tools: ["JavaScript", "HTML/CSS", "Typewriter Animation", "Poemist API"],
  },

  intro:
    "Poet Guy is a browser-based poem generator inspired by the magic of street poets and the wandering thoughts we all carry. " +
    "The project grew out of an encounter with @peoplearepoetry in Union Square, where I was drawn not only to the poems themselves, but to the slow, intentional process of someone listening, thinking, and typing something just for you.",

  sections: [
    { kind: "intro" },
     { kind: "references", title: "Project Link", itemsPath: "projectLinks" },

    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },
    { kind: "twoCol", leftPath: "inspirationLeft", rightPath: "inspirationRight" },
    { kind: "twoCol", leftPath: "sketchLeft", rightPath: "sketchRight" },
    { kind: "twoCol", leftPath: "typewriterLeft", rightPath: "typewriterRight" },

    { kind: "references", title: "API & Source", itemsPath: "apiLinks" },
  ],

  youtube: {
    title: "Project Video",
    videoId: "ThtCkLD2nc8",
    url: "https://youtu.be/ThtCkLD2nc8",
  },

  projectLinks: [
    {
      label: "Open Poet Guy",
      href: "https://feliciatiffany.github.io/the-poet-interactive-js/",
    },
  ],

  inspirationLeft: {
    kind: "media",
    title: "Inspiration",
    layout: "slider",
    itemsPath: "inspirationImages",
  },

  inspirationRight: {
    title: "Project Concept",
    paragraphs: [
      "This project is a browser-based poem generator inspired by the magic of street poets and the wandering thoughts we all carry. The idea sparked after I met @peoplearepoetry not too long ago in Union Square. I was instantly drawn to his quiet presence in the corner of the subway, typing away on an old typewriter.",
      "What fascinated me was not just the poems, but the process: how he would ask for a theme or feeling, sometimes offering his own question if you were not sure. People could respond with anything, something specific or something abstract, and he would begin typing slowly and with intention.",
      "What made him unforgettable was the way he explained each poem after finishing. At first, I did not fully understand them, but with each reading I became more captivated by the rhythm, diction, and imagery. From that experience, I wanted to create an online version of this poetic encounter, a space where people might begin to love poetry the way I did.",
    ],
  },

  sketchLeft: {
    kind: "media",
    title: "Visual Development",
    layout: "gallery",
    itemsPath: "sketchImages",
  },

  sketchRight: {
    title: "Visual Direction",
    paragraphs: [
      "Visually, the project centers around the old typewriter to reference history, intimacy, and the feeling of someone writing something just for you. I wanted the interface to carry the texture of vintage paper and the quiet presence of a page waiting for thought.",
      "The sketch stage helped define how the project would feel before it was coded. Rather than treating the page as a neutral website layout, I designed it more like a poetic space, where the typewriter, paper, and pacing all contribute to the emotional tone of the experience.",
    ],
  },

  typewriterLeft: {
    kind: "media",
    title: "Typewriter Interaction",
    layout: "gallery",
    itemsPath: "typewriterImages",
  },

  typewriterRight: {
    title: "Interaction Design",
    paragraphs: [
      "The interaction begins with a single open-ended prompt: “What’s in your mind lately?” The participant enters a word, thought, or feeling, and that input acts like a divination, triggering a poem that relates to it either thematically or abstractly.",
      "As the poem appears, each word is typed slowly on screen through a vintage typewriter animation, with small pauses that mimic a poet stopping to think. If the match feels random, that is part of the point. Like any good divination, it invites reflection rather than perfect relevance.",
      "This project will never be as alive or intimate as sitting across from a real poet like @peoplearepoetry, but I hope it still sparks recognition, wonder, and a growing affection for poems in the people who encounter it.",
    ],
  },

  apiLinks: [
    {
      label: "Poemist API Documentation",
      href: "https://poemist.github.io/poemist-apidoc/",
    },
    {
      label: "Poemist",
      href: "https://www.poemist.com/",
    },
  ],

  inspirationImages: [
    { type: "image", src: "/media/techdesign/poet/inspiration1.jpg", alt: "Poet Guy inspiration image 1" },
    { type: "image", src: "/media/techdesign/poet/inspiration2.jpg", alt: "Poet Guy inspiration image 2" },
    { type: "image", src: "/media/techdesign/poet/inspiration3.jpg", alt: "Poet Guy inspiration image 3" },
    { type: "image", src: "/media/techdesign/poet/inspiration4.JPG", alt: "Poet Guy inspiration image 4" },
  ],

  sketchImages: [
    { type: "image", src: "/media/techdesign/poet/sketch.png", alt: "Poet Guy sketch" },
  ],

  typewriterImages: [
    { type: "image", src: "/media/techdesign/poet/typewriter_animation.gif", alt: "Poet Guy typewriter animation" },
  ],

  media: [
    { type: "image", src: "/media/techdesign/poet/typewriter_animation.gif", alt: "Poet Guy preview" },
  ],

  row6: null,
  references: [],
};