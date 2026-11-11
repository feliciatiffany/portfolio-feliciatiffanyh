export default {
  slug: "p5js-portfolio",
  title: "Visual + Interactive (p5.js & JavaScript)",

  meta: {
    category: ["Personal project", "p5.js", "JavaScript", "Interactive Visuals"],
    year: "2026",
    tools: ["p5.js", "JavaScript"],
  },

  intro:
    "I built this site as a home for my p5.js and JavaScript projects. " +
    "The look is borrowed from p5.js and its editor (https://p5js.org/ and https://editor.p5js.org/), an open-source library with a really kind, welcoming community. " +
    "There's a bit of everything: simple sketches, data visualizations, interactive interfaces, and API-based work. " +
    "Here are a few of my favorite fully built p5.js projects.",

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
      { src: "/media/techdesign/p5js/faceGenerator.web.mp4", alt: "Face Generator (p5.js)" },
    ],
  },
  faceRight: {
    title: "Face Generator",
    paragraphs: [
      "This was my playground for parameterized design. Instead of drawing one “perfect” character, I wrote a system that makes endless versions of the same face. Every mouse move or key press gives you a new one.",
      "I’ve always loved Totoro, so that was my starting point. My first sketch was way more ambitious than my coding skills at the time, so I let the design change based on what I could actually make in p5.js. In the end it feels less like one drawing and more like me conducting a bunch of possibilities.",
    ],
  },

  clockLeft: {
    kind: "media",
    title: "Experimental Clock: Climate Clock",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/experimentalClock.web.mp4", alt: "Experimental Clock: Climate Clock" },
    ],
  },
  clockRight: {
    title: "Experimental Clock: Climate Clock",
    paragraphs: [
      "I wanted to rethink how we show time when the stakes feel bigger than hours and minutes. So I made a clock that treats time as urgent and emotional, jumping between the past, the present, and a possible future.",
      "I called it the Climate Clock because I keep wondering when people will really wake up to climate change and stop passing the responsibility around. Later I found out there’s a climate clock in Union Square too, which made me feel less alone. Mine focuses on images: what Earth used to look like, what it looks like now, and what it might become if we don’t act. I use timers every day to keep myself going, so I wanted this to feel like a timer for all of us.",
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
      "This one is inspired by an old Windows screensaver, the kind where color and motion hypnotize you into staring. I think of it as the chaotic cousin of my face generator: grids, rotation, and little rule-based surprises.",
      "I let myself experiment freely here. I looked up how to rotate shapes, scale them, and make gradients, then built a grid with loops and parameters. I used conditions to switch between rotating rectangles and circles, and kept tweaking values until the illusion clicked. Lots of trial and error, but that was the fun part.",
    ],
  },

  dataLeft: {
    kind: "media",
    title: "Data Portrait",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/dataPortrait.web.mp4", alt: "Data Portrait (p5.js)" },
    ],
  },
  dataRight: {
    title: "Data Portrait",
    paragraphs: [
      "This is a self portrait made of data, from a habit I tracked for a week. I collected daily data points, turned them into arrays in p5.js, and animated them to show patterns in how I live.",
      "That year, my goal was to read, listen to podcasts, or journal every day. Those habits always leave me with quotes that stick, so I made the portrait out of them. It became a timeline of my “quote of the day” from Friday, Oct 11, 2024 to Thursday, Oct 17, 2024, a tiny archive of what was on my mind that week.",
    ],
  },

  oopsLeft: {
    kind: "media",
    title: "Interactive Typography 1: Oops",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/oops.web.mp4", alt: "Interactive Typography 1: Oops" },
    ],
  },
  oopsRight: {
    title: "Interactive Typography 1: Oops",
    paragraphs: [
      "You know the “Oops, no internet” message in your browser? I wanted to turn that feeling into motion: the tiny panic when the connection drops and everything suddenly feels scattered.",
      "The burst of “Oops” is that mental spike, and the dots are digital debris, like the page and your thoughts both exploding at once. It’s simple, but it’s a very real modern feeling.",
    ],
  },

  designLeft: {
    kind: "media",
    title: "Interactive Typography 2: Design",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/design.web.mp4", alt: "Interactive Typography 2: Design (version 1)" },
    ],
  },
  designRight: {
    title: "Interactive Typography 2: Design",
    paragraphs: [
      "This one starts with a word I live with every day: “Design.” It’s a big universal idea, but it’s also personal, because as a design student, design is literally how I move through the world.",
      "I tied it to motion graphics and communication design, since type can change meaning just through placement, color, and timing. It was my way of studying how intros, commercials, and websites move, and bringing that energy into interactive type.",
    ],
  },

  urupLeft: {
    kind: "media",
    title: "Interactive Typography 3: Urup",
    layout: "video",
    items: [
      { src: "/media/techdesign/p5js/urup.web.mp4", alt: "Interactive Typography 3: Urup" },
    ],
  },
  urupRight: {
    title: "Interactive Typography 3: Urup",
    paragraphs: [
      "Urup comes from Javanese, my home language. “Urup” (ꦲꦸꦫꦸꦥ꧀) means “to light” or “to shine,” and it’s part of the saying “urip iku urup,” roughly: life is meant to shine and bring light to others.",
      "Javanese, and especially the Aksara Jawa script, is rarely used now, even though it shaped me growing up in Yogyakarta. This sketch is my small way of keeping it around, and a reminder of a motto I carry with me: live like a candle, bright enough to help others see.",
    ],
  },

  media: [
    {
      type: "video",
      src: "/media/techdesign/p5js/faceGenerator.web.mp4",
      alt: "Visual + Interactive (p5.js & JavaScript) preview",
    },
  ],

  row6: null,
  references: [],
};