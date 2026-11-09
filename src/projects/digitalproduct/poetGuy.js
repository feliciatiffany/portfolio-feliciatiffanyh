export default {
  slug: "poet",
  title: "Poet Guy",

  meta: {
    category: ["Tech Designer", "JavaScript", "Poetry Generator", "Interactive Web"],
    year: "2026",
    tools: ["JavaScript", "HTML/CSS", "Typewriter Animation", "Poemist API"],
  },

  intro:
    "Poet Guy is a poem generator in the browser, inspired by street poets and the random thoughts we all carry around. " +
    "It started when I met @peoplearepoetry in Union Square. I loved the poems, but what really got me was the process: someone listening, thinking, and slowly typing something just for you.",
  quote: "Someone listening, thinking, and typing a poem just for you",

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
    title: "Where it started",
    paragraphs: [
      "The idea came after I met @peoplearepoetry in Union Square. He was sitting quietly in a corner of the subway, typing away on an old typewriter, and I was hooked right away.",
      "He would ask you for a theme or a feeling, or give you his own question if you weren't sure. You could answer with anything, specific or abstract, and he would start typing, slowly and on purpose.",
      "Then he explained each poem. Honestly, I didn't get them at first, but every time I reread them I liked the rhythm, the word choices, and the images more. So I wanted to make an online version of that moment, a place where people might start loving poetry the way I did.",
    ],
  },

  sketchLeft: {
    kind: "media",
    title: "Visual Development",
    layout: "gallery",
    itemsPath: "sketchImages",
  },

  sketchRight: {
    title: "How I wanted it to look",
    paragraphs: [
      "Everything revolves around the old typewriter, because it feels personal and a bit nostalgic, like someone is writing just for you. I wanted the screen to feel like vintage paper, a quiet page waiting for a thought.",
      "Sketching first helped me figure out the mood before I wrote any code. I didn't want a normal website layout. I wanted a little poetic space where the typewriter, the paper, and the pacing all set the tone.",
    ],
  },

  typewriterLeft: {
    kind: "media",
    title: "Typewriter Interaction",
    layout: "gallery",
    itemsPath: "typewriterImages",
  },

  typewriterRight: {
    title: "How it works",
    paragraphs: [
      "It starts with one open question: “What’s in your mind lately?” You type a word, a thought, or a feeling, and it works kind of like a fortune: it pulls up a poem that connects to it, sometimes clearly, sometimes loosely.",
      "The poem then types itself out word by word with a typewriter animation, with little pauses like a poet stopping to think. If the match feels random, that's kind of the point. Like any good fortune, it's there to make you think, not to be perfectly right.",
      "It will never be as alive as sitting across from a real poet like @peoplearepoetry. But I hope it still makes people a little curious, and maybe a little fond of poems.",
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
    { type: "image", src: "/media/techdesign/poet/inspiration1.webp", alt: "Poet Guy inspiration image 1" },
    { type: "image", src: "/media/techdesign/poet/inspiration2.webp", alt: "Poet Guy inspiration image 2" },
    { type: "image", src: "/media/techdesign/poet/inspiration3.webp", alt: "Poet Guy inspiration image 3" },
    { type: "image", src: "/media/techdesign/poet/inspiration4.webp", alt: "Poet Guy inspiration image 4" },
  ],

  sketchImages: [
    { type: "image", src: "/media/techdesign/poet/sketch.webp", alt: "Poet Guy sketch" },
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