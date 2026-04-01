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
     "Caress A Bear is an interactive art piece inspired by the classic arcade game Whack-A-Mole. Designed to be playful and mischievous, it invites participants into a friendly competition with Vano, a lively bear who eagerly engages with the audience. As the game progresses, Vano becomes increasingly enthusiastic, speeding up and almost interacting directly with the player.",


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
    title: "Abstract",
    paragraphs: [
      "The game is simple: the audience’s goal is to “caress” or touch the bear. Pressing a button calls Vano out of hiding, but as soon as someone tries to reach him, he playfully retreats. The installation works through two main inputs: a button that summons Vano and a distance sensor that detects hand movements. Inside the box, a servo motor powers a seesaw mechanism, allowing Vano to pop in and out.",
      "The final project combined electronic interaction, mechanical movement, and digital animation to create an engaging and responsive installation. The integration of Arduino-based control, sensor-driven interaction, and dynamic visual feedback resulted in a playful and immersive user experience.",
    ],
  },

  toolsBlock: {
    title: "Tools & Materials",
    bullets: [
      "Arduino Uno — microcontroller responsible for handling user interactions and controlling movement.",
      "Servo Motor — powers the seesaw mechanism, enabling the bear to pop in and out dynamically.",
      "Ultrasonic Distance Sensor (HC-SR04) — detects proximity and triggers the bear’s reaction.",
      "Push Button — activates the bear’s movement upon user interaction.",
      "Wood & Acrylic — used for the physical enclosure and interaction setup.",
      "Processing — supports the visual interface and animated text interaction.",
      "Laser Cutter & Hand Tools — used for precise cutting and assembly.",
      "Adhesives, Screws, and Hinges — essential for securing components and ensuring durability.",
    ],
  },

  processLeft: {
    kind: "media",
    title: "Development Process",
    layout: "slider",
    itemsPath: "processImages",
  },

  processRight: {
    title: "Development Process",
    paragraphs: [
      "The foundation of the project was established through Arduino programming, which controlled the bear’s movements and responses to user input. A servo motor managed the bear’s positioning, while an ultrasonic distance sensor detected hand proximity. The interaction sequence was designed to create a playful engagement where the bear dynamically reacted to the audience.",
      "The enclosure was constructed in wood and integrated with a precisely designed seesaw mechanism. The servo motor was positioned to achieve responsive and repeatable movement, while the overall assembly balanced accessibility, durability, and visual clarity.",
      "To extend the physical interaction, a Processing-based digital interface was developed to display responsive text and visual feedback. Serial communication between Arduino and Processing enabled real-time reactions, allowing the physical and digital parts of the installation to work together as one cohesive experience.",
    ],
  },

  overviewImages: [
    { type: "image", src: "/media/techdesign/caress/Caress_main 2.jpeg", alt: "Caress A Bear main image" },
    { type: "image", src: "/media/techdesign/caress/background bear.png", alt: "Caress A Bear background image" },
  ],

  processImages: [
    { type: "image", src: "/media/techdesign/caress/caress_process.JPG", alt: "Caress A Bear process image 1" },
    { type: "image", src: "/media/techdesign/caress/caress_process2.JPG", alt: "Caress A Bear process image 2" },
    { type: "image", src: "/media/techdesign/caress/caress_process3.JPG", alt: "Caress A Bear process image 3" },
    { type: "image", src: "/media/techdesign/caress/caress_process4.JPG", alt: "Caress A Bear process image 4" },
  ],

  media: [
    { type: "image", src: "/media/techdesign/caress/Caress_main 2.jpeg", alt: "Caress A Bear preview image" },
  ],

  row6: null,
  references: [],
};