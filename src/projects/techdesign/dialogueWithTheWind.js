// src/projects/techdesign/dialogueWithTheWind.js

export default {
  slug: "dialogue-with-the-wind",
  title: "Dialogue with the Wind",

  meta: {
    category: "Tech Designer",
    year: "2024",
    tools: ["p5.js", "Arduino", "NeoPixel LEDs", "PIR Sensor", "WebSockets", "Installation"],
  },

  // Render order (reorder freely)
  sections: [
    { kind: "intro" },

    { kind: "youtube", title: "Project Video", videoIdPath: "youtube.videoId" },

    { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

    { kind: "media", title: "Gallery", layout: "gallery", itemsPath: "media" },

    { kind: "media", title: "Mockups + Process", layout: "slider", itemsPath: "row6.items" },

    { kind: "twoCol", leftPath: "row7.left", rightPath: "row7.right" },

    { kind: "desc", dataPath: "row8.desc" },

    { kind: "links", title: "Links" },

    { kind: "references", title: "References", itemsPath: "references" },
  ],

  intro:
    "“Dialogue with the Wind” is an interactive installation that invites self-reflection through a responsive field of fiber-optic grass. " +
    "Participants speak honestly into the space; the installation responds through shifting color, ambient flow, and sound—turning private emotions into a gentle, sensory dialogue.",

  media: [
    { type: "image", src: "/media/techdesign/dialogue/dialogue_main.jpg", alt: "Main visual" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_2.JPG", alt: "Slide 2" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_3.JPG", alt: "Slide 3" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_4.JPG", alt: "Slide 4" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_5.JPG", alt: "Slide 5" },

    { type: "image", src: "/media/techdesign/dialogue/dialogue_green.jpg", alt: "Green variation" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_blue.jpg", alt: "Blue variation" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_purple.jpg", alt: "Purple variation" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_pink.jpg", alt: "Pink variation" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_white.jpg", alt: "White variation" },

    { type: "image", src: "/media/techdesign/dialogue/dialogue_process.JPG", alt: "Process 1" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_process2.JPG", alt: "Process 2" },
    { type: "image", src: "/media/techdesign/dialogue/dialogue_process3.JPG", alt: "Process 3" },
    { type: "image", src: "/media/techdesign/dialogue/IMG_0617.JPG", alt: "Build photo 1" },
    { type: "image", src: "/media/techdesign/dialogue/IMG_0619.JPG", alt: "Build photo 2" },
  ],

  descLeft: {
    title: "Abstract",
    paragraphs: [
      "“Dialogue with the Wind” opens a gentle conversation between individuals and their inner selves. In a fast-paced, hyperconnected world, the work creates a quiet, judgment-free space for introspection and emotional release.",
      "Participants speak openly while touching a field of fiber-optic grass. Their words are carried by the metaphorical “wind” and translated into responsive shifts in color and ambient flow, mirroring the energy and tone of the voice.",
      "The installation also replays the user’s recorded words—inviting self-confrontation through listening, and encouraging acceptance and understanding of one’s inner narrative.",
      "Rooted in self-reflection and emotional awareness, the work serves as both a mirror and a mentor—asking people to pause, look inward, and reconnect with the most essential voice: their own.",
    ],
  },

  descRight: {
    title: "Concept + System Overview",
    paragraphs: [
      "The installation explores self-reflection through an immersive, sensory-driven interaction. A field of swaying fiber-optic grass reacts to presence and voice energy, shifting colors based on amplitude and movement.",
      "Symbolism:",
    ],
    bullets: [
      "Wind as metaphor — change, emotion, freedom; spoken words are carried away but reflected back.",
      "Grass as responsive medium — tactile + visual feedback for the speaker’s emotional energy.",
      "Self-confrontation through sound — replaying the participant’s words encourages reflection.",
    ],
  },

  row6: {
    title: "Mockups + Process",
    layout: "slider",
    items: [
      { type: "image", src: "/media/techdesign/dialogue/dialogue_mockup%20person@300x-100.jpg", alt: "Mockup 1" },
      { type: "image", src: "/media/techdesign/dialogue/dialogue_mockup2@300x-100.jpg", alt: "Mockup 2" },
      { type: "image", src: "/media/techdesign/dialogue/dialogue_mockup3@300x-100.jpg", alt: "Mockup 3" },
      { type: "image", src: "/media/techdesign/dialogue/process1.jpg", alt: "Process step 1" },
      { type: "image", src: "/media/techdesign/dialogue/process2.jpg", alt: "Process step 2" },
      { type: "image", src: "/media/techdesign/dialogue/process3.jpg", alt: "Process step 3" },
      { type: "image", src: "/media/techdesign/dialogue/process4.jpg", alt: "Process step 4" },
      { type: "image", src: "/media/techdesign/dialogue/process5.jpg", alt: "Process step 5" },
      { type: "image", src: "/media/techdesign/dialogue/process6.jpg", alt: "Process step 6" },
    ],
  },

  row7: {
    left: {
      title: "Development Process",
      sections: [
        {
          title: "Research & Conceptualization",
          bullets: [
            "Studying interactive installations & device art",
            "Exploring mental health therapy techniques",
            "Investigating materials such as fiber-optic strands and motion sensors",
          ],
        },
        {
          title: "Prototyping & Interaction Design",
          bullets: [
            "Neutral Entry – The installation begins in a calm, unresponsive state.",
            "Dialogue & Expression – Users engage with prompts, triggering responses.",
            "Self-Confrontation & Reflection – Replays the user’s words for introspection.",
          ],
        },
      ],
    },

    right: {
      title: "Technical Implementation + Testing",
      sections: [
        {
          title: "Hardware (Interactive Features)",
          table: {
            headers: ["Component", "Functionality"],
            rows: [
              ["Microphone (Laptop/P5.js)", "Captures user speech and converts it into amplitude data."],
              ["PIR Motion Sensor", "Detects user presence and movement within the space."],
              ["Amplitude Analysis Algorithm", "Determines emotional intensity based on speech energy patterns."],
              ["NeoPixel LED Strip & Fiber-Optic Grass (Arduino Controlled)", "Changes colors in response to voice energy and motion."],
              ["Audio Playback System", "Replays user-recorded words for self-reflection."],
              ["Final Reflection Prompt", "Encourages users to listen and process their emotions."],
            ],
          },
        },
        {
          title: "Software & Programming",
          bullets: [
            "p5.js (JavaScript) – Controls UI and animation.",
            "Arduino IDE & C++ – Handles sensor input and LED responsiveness.",
            "WebSockets – Facilitates real-time communication.",
          ],
        },
        {
          title: "Refinement & User Testing",
          bullets: ["Fine-tuning sensor sensitivity", "Calibrating LED transitions", "Enhancing audio feedback clarity"],
        },
      ],
    },
  },

  youtube: {
    title: "Project Video",
    videoId: "HuoycS263FM",
    url: "https://www.youtube.com/watch?v=HuoycS263FM",
  },

  row8: {
    title: "Step-by-Step Interaction Flow",
    desc: {
      title: "Step-by-Step Interaction Flow",
      sections: [
        {
          title: "Introduction & Activation",
          paragraphs: [
            "Users receive an introduction and abstract about the artwork. A neutral soundscape helps set a calming atmosphere.",
          ],
        },
        {
          title: "User Engagement & Reflection",
          bullets: [
            "Users speak aloud, touch, or interact with fiber-optic grass.",
            "Inputs captured include voice recording, motion detection, and amplitude analysis.",
          ],
        },
        {
          title: "Data Processing & System Response",
          bullets: ["Analyzes voice tone, motion activity, and silence.", "Adjusts real-time visual feedback and audio response."],
        },
        {
          title: "Interactive Feedback & Visual Response",
          paragraphs: [
            "Output 1: Dynamic Color Feedback — Colors shift based on the user’s vocal input. Silent moments result in dimming effects.",
            "Output 2: Story Retelling & Self-Reflection — The system replays recorded words, allowing users to hear their reflections.",
          ],
        },
        {
          title: "Reflection & Completion",
          paragraphs: [
            "Guides users toward self-acceptance. Participants can save their recorded story or let the system reset for the next user.",
          ],
        },
      ],
    },
  },

  links: [
    { label: "p5.js Sketch (Interactive Demo)", href: "https://editor.p5js.org/feliciatiffany/sketches/NmifeIo6V" },
    { label: "GitHub Repo", href: "https://github.com/feliciatiffany/dialogue-with-the-wind-arduino" },
  ],

  references: [
    { label: "Thoughtforms (Science Gallery Melbourne)", href: "https://melbourne.sciencegallery.com/mental-exhibits/thoughtforms" },
    { label: "Review: MENTAL – Colours of Wellbeing", href: "https://artandmarket.net/reviews/2022/10/24/review-of-mental-colours-of-wellbeing" },
    { label: "Doing Nothing With AI (Emanuel Gollob)", href: "https://www.emanuelgollob.com/doing-nothing-with-ai/" },
    { label: "MENTAL Exhibition (ArtScience Museum)", href: "https://www.marinabaysands.com/museum/exhibitions/mental.html" },
    { label: "WHITEvoid – Fluidic (My Modern Met)", href: "https://mymodernmet.com/whitevoid-fluidic/" },
    { label: "Arduino Sound Level Meter & Spectrum Analyzer", href: "https://blog.yavilevich.com/2016/08/arduino-sound-level-meter-and-spectrum-analyzer/" },
  ],
};
