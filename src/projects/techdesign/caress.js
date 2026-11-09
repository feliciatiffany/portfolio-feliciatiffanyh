export default {
  slug: "caress",
  title: "Caress A Bear",

  meta: {
    category: ["Interactive Installation", "Physical Computing"],
    year: "2025",
    tools: [
      "Arduino Uno",
      "Servo Motor",
      "Ultrasonic Sensor",
      "Processing",
      "Laser Cutting",
    ],
  },

  intro:
     "Caress A Bear is my playful twist on the arcade game Whack-A-Mole. Except here you don't whack anything, you just try to pet Vano, a cheeky little bear. He pops out to say hi, then dodges your hand. The longer you play, the more excited he gets, speeding up until he's almost playing back with you.",

  quote: "You don't whack the bear, you just try to pet him",


  sections: [
    { kind: "intro" },
    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "heroLeft", rightPath: "heroRight" },

    { kind: "desc", dataPath: "toolsBlock" },

    { kind: "twoCol", leftPath: "processLeft", rightPath: "processRight" },
  ],

  youtube: {
    title: "Project Video",
    videoId: "sz4fVGZE_0c",
    url: "https://www.youtube.com/watch?v=sz4fVGZE_0c&list=PLBcNAOEVEDhWHzd73p5tdaQGO-Wq4Cfl3&index=13",
  },

  heroLeft: {
    kind: "media",
    title: "Project Overview",
    layout: "slider",
    itemsPath: "overviewImages",
  },

  heroRight: {
    title: "The idea",
    paragraphs: [
      "The game is simple: try to “caress” the bear. Press the button and Vano comes out of hiding. Reach for him and he ducks away. There are only two inputs, a button that calls him and a distance sensor that notices your hand. Inside the box, a servo moves a little seesaw that pops Vano in and out.",
      "I loved mixing electronics, a moving mechanism, and on-screen animation in one piece. Arduino runs the bear, the sensor reads you, and the screen talks back, so the whole thing feels alive and a bit mischievous.",
    ],
  },

  toolsBlock: {
    title: "What I used",
    bullets: [
      "Arduino Uno — the brain, handles input and movement.",
      "Servo Motor — drives the seesaw so Vano pops in and out.",
      "Ultrasonic Distance Sensor (HC-SR04) — notices your hand coming close.",
      "Push Button — calls Vano out.",
      "Wood & Acrylic — the box and the setup.",
      "Processing — the on-screen text and animation.",
      "Laser Cutter & Hand Tools — cutting and putting it all together.",
      "Adhesives, Screws, and Hinges — keeping everything in one piece.",
    ],
  },

  processLeft: {
    kind: "media",
    title: "Development Process",
    layout: "slider",
    itemsPath: "processImages",
  },

  processRight: {
    title: "How I built it",
    paragraphs: [
      "I started with the Arduino code. The servo moves Vano, the ultrasonic sensor watches for hands, and I tuned the timing so he reacts in a teasing, playful way.",
      "Then I built the wooden box around a seesaw mechanism. I placed the servo carefully so the movement stayed quick and repeatable. I also wanted the box to be sturdy, easy to reach, and clear to look at.",
      "Finally, I added a Processing screen that shows text reacting to the game. Arduino and Processing talk over serial in real time, so the physical bear and the screen move together.",
    ],
  },

  overviewImages: [
    { type: "image", src: "/media/techdesign/caress/Caress_main 2.webp", alt: "Caress A Bear main image" },
    { type: "image", src: "/media/techdesign/caress/background bear.webp", alt: "Caress A Bear background image" },
  ],

  processImages: [
    { type: "image", src: "/media/techdesign/caress/caress_process.webp", alt: "Caress A Bear process image 1" },
    { type: "image", src: "/media/techdesign/caress/caress_process2.webp", alt: "Caress A Bear process image 2" },
    { type: "image", src: "/media/techdesign/caress/caress_process3.webp", alt: "Caress A Bear process image 3" },
    { type: "image", src: "/media/techdesign/caress/caress_process4.webp", alt: "Caress A Bear process image 4" },
  ],

  media: [
    { type: "image", src: "/media/techdesign/caress/Caress_main 2.webp", alt: "Caress A Bear preview image" },
  ],

  row6: null,
  references: [],
};