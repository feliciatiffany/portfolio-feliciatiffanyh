export default {
  slug: "p5js-portfolio",
  title: "Visual + Interactive (p5.js & JavaScript)",

  meta: {
    category: ["Personal project", "p5.js", "JavaScript", "Interactive Visuals"],
    year: "2026",
    tools: ["p5.js", "JavaScript"],
  },

  intro:
    "This website was built as a portfolio to showcase my p5.js and JavaScript projects. " +
    "The site’s visual design is inspired by p5.js and its editor (https://p5js.org/ and https://editor.p5js.org/), " +
    "an open-source JavaScript library supported by an inclusive, nurturing community. " +
    "The projects range from simple p5.js sketches to data visualizations, interactive interfaces, and JavaScript API-based work. " +
    "A few highlights from my fully built p5.js projects are below.",

  sections: [
    { kind: "intro" },
    { kind: "desc", dataPath: "linksBlock" },
    { kind: "youtube", title: "Showreel", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "faceLeft", rightPath: "faceRight" },
    { kind: "twoCol", leftPath: "clockLeft", rightPath: "clockRight" },
    { kind: "twoCol", leftPath: "opticalLeft", rightPath: "opticalRight" },
    { kind: "twoCol", leftPath: "dataLeft", rightPath: "dataRight" },
    { kind: "twoCol", leftPath: "oopsLeft", rightPath: "oopsRight" },
    { kind: "twoCol", leftPath: "designLeft", rightPath: "designRight" },
    { kind: "twoCol", leftPath: "urupLeft", rightPath: "urupRight" },
  ],

  linksBlock: {
    title: "Links",
    links: [
      {
        label: "Portfolio website (p5.js + JavaScript)",
        href: "https://feliciatiffany.github.io/advance-critical-computation-js-portfolio/",
      },
    ],
  },

  youtube: {
    title: "Showreel",
    videoId: "e528IqqUoOQ",
    url: "https://youtu.be/e528IqqUoOQ?si=iTQGllAlOO_57CaO",
  },

  faceLeft: {
    kind: "media",
    title: "Face Generator",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/faceGenerator.mp4", alt: "Face Generator (p5.js)" },
    ],
  },
  faceRight: {
    title: "Face Generator",
    paragraphs: [
      "I built this generator as a personal playground for parameterized design. Instead of drawing one “perfect” character, I wrote a system that produces endless variations of the same face through mouse and keyboard controls, so each interaction creates a new version of the original idea.",
      "I’ve always loved Totoro, so I started with that as my anchor. While coding, I stayed open to changing the design based on what p5.js could realistically do, since my first sketch was way more imaginative than my actual skill level at the time. The final result feels like me conducting a set of possibilities rather than making one static illustration.",
    ],
  },

  clockLeft: {
    kind: "media",
    title: "Experimental Clock: Climate Clock",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/experimentalClock.mp4", alt: "Experimental Clock: Climate Clock" },
    ],
  },
  clockRight: {
    title: "Experimental Clock: Climate Clock",
    paragraphs: [
      "This project is my attempt to rethink how time can be represented when the stakes feel bigger than hours and minutes. I designed a clock that treats time as something urgent and emotional, not neutral, by visualizing a leap between past, present, and a potential future.",
      "I called it the Climate Clock because I keep wondering when people will truly wake up to climate change and stop passing responsibility around. I later found out there’s a climate clock in Union Square too, which made me feel less alone, but I still wanted mine to focus on imagery: what Earth used to look like, what it looks like now, and what it might become if we don’t act. I rely on timers daily to keep myself moving, so I wanted this countdown to feel like a timer for all of us.",
    ],
  },

  opticalLeft: {
    kind: "media",
    title: "Optical Illusion",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/optical.mp4", alt: "Optical Illusion (p5.js)" },
    ],
  },
  opticalRight: {
    title: "Optical Illusion",
    paragraphs: [
      "This sketch is inspired by a Windows screensaver, especially the way color, motion, and background can hypnotize you into staring. I treated it as a more chaotic, pattern-driven cousin of my face generator, but with grids, rotation, and rule-based surprises.",
      "I gave myself full permission to experiment here. I researched how to rotate shapes, scale forms, and create gradients, then built a grid system with loops and parameters. From there, I used conditions to switch forms between rotating rectangles and circles, and I kept tuning values until the illusion clicked. A lot of it was trial, but the trial was the point.",
    ],
  },

  dataLeft: {
    kind: "media",
    title: "Data Portrait",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/dataPortrait.mp4", alt: "Data Portrait (p5.js)" },
    ],
  },
  dataRight: {
    title: "Data Portrait",
    paragraphs: [
      "This project is a data-driven self portrait, built from a habit I tracked over a week. I collected daily data points, turned them into arrays in p5.js, and visualized them as an animated piece that shows patterns in how I live.",
      "This year, I set a goal to read, listen to podcasts, or journal every day. Those habits usually lead me to quotes that stick with me, so I turned that into the portrait. The sketch becomes a timeline of my “quote of the day” from Friday, Oct 11, 2024 to Thursday, Oct 17, 2024, like a tiny archive of what shaped my thinking that week.",
    ],
  },

  oopsLeft: {
    kind: "media",
    title: "Interactive Typography 1: Oops",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/oops.mp4", alt: "Interactive Typography 1: Oops" },
    ],
  },
  oopsRight: {
    title: "Interactive Typography 1: Oops",
    paragraphs: [
      "This piece is inspired by the “Oops, no internet” message you see in a browser. I wanted to turn that feeling into motion, the small panic and frustration when the connection drops and everything suddenly feels scattered.",
      "The burst of “Oops” represents the mental spike, and the dots act like digital debris, as if the page and your thoughts both explode outward. It’s simple, but it captures a very real modern emotion.",
    ],
  },

  designLeft: {
    kind: "media",
    title: "Interactive Typography 2: Design",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/design.mp4", alt: "Interactive Typography 2: Design (version 1)" },
    ],
  },
  designRight: {
    title: "Interactive Typography 2: Design",
    paragraphs: [
      "This piece starts with a word I live with every day: “Design.” I wanted to treat it like a universal concept, but also as something personal, because as a design student, design is literally how I move through the world.",
      "I connected it to motion graphics and communication design, since typography can change meaning just through placement, color, and timing. This sketch is my way of studying the visual language of intros, commercials, and websites, and translating that energy into interactive type.",
    ],
  },

  urupLeft: {
    kind: "media",
    title: "Interactive Typography 3: Urup",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/urup.mp4", alt: "Interactive Typography 3: Urup" },
    ],
  },
  urupRight: {
    title: "Interactive Typography 3: Urup",
    paragraphs: [
      "Urup comes from Javanese, my home language. The word “Urup” (ꦲꦸꦫꦸꦥ꧀) means “to light” or “to shine,” and it’s part of the phrase “urip iku urup,” which roughly means life is meant to shine and bring light to others.",
      "I made this piece because Javanese, and especially Aksara Jawa, is rarely used now, even though it shaped me growing up in Yogyakarta. This sketch is my small way of keeping that script present, and also a reminder of a motto I carry with me: live like a candle, bright enough to help others see.",
    ],
  },

  media: [
    {
      type: "video",
      src: "/media/techdesign/p5js/faceGenerator.mp4",
      alt: "Visual + Interactive (p5.js & JavaScript) preview",
    },
  ],

  row6: null,
  references: [],
};