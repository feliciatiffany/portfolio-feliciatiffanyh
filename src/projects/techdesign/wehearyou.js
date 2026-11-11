// src/projects/techdesign/wehearyou.js

export default {
  slug: "wehearyou",
  title: "We Hear You",

  meta: {
    category: ["Interactive Installations", "Gesture Interaction", "3D Environment Building"],
    year: "2025",
    tools: ["Unity", "MediaPipe", "Python", "C#", "Projection + Live Testing"],
  },

  // ✅ Order matches your required narrative + your ProjectTemplate sections renderer
  sections: [
    { kind: "intro" },

    // then: Full Project Demonstration
    { kind: "youtubes", title: "Full Project Demonstration", itemsPath: "youtubes" },

    // then: poster + guide
    { kind: "media", title: "Posters + Gesture Guide", layout: "gallery", itemsPath: "media" },

    // then: Row 5 two columns (left issues, right experience)
    { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

    // then: live documentation slider (screenshots)
    { kind: "media", title: "Live Documentation", layout: "slider", itemsPath: "row6.websiteScreens.media" },

    // then: design process intro text
    { kind: "desc", dataPath: "processIntro" },

    // ✅ Brainstorming side-by-side with process1 image (requires ProjectTemplate twoCol media-array support)
    { kind: "twoCol", leftPath: "processBrainstorming", rightPath: "processMedia.brainstorming", rightLayout: "gallery" },

    // Empathize + images
    { kind: "desc", dataPath: "processEmpathize" },
    { kind: "media", title: null, layout: "gallery", itemsPath: "processMedia.empathize" },

    // Prototype + images (process4 + process5 + flowchart)
    { kind: "desc", dataPath: "processPrototype" },
    { kind: "media", title: null, layout: "gallery", itemsPath: "processMedia.prototype" },

    // Final + images
    { kind: "desc", dataPath: "processFinal" },

    // then: Project Live Testing
    { kind: "youtubes", title: "Project Live Testing", itemsPath: "row6.youtubes" },

    // references last
    { kind: "references", title: "References", itemsPath: "references" },
  ],

  // ✅ Overview first
  intro:
    "We Hear You is a gesture-based experience where you wander a soft, quiet landscape and find the memories, thoughts, and small truths of people from different generations, jobs, and backgrounds. It's also my first try at turning a survey into something interactive.\n\n" +
    "“How might we help strangers share honest feelings in a way that feels safe, and make answering questions feel inviting instead of forced?”",


  // ✅ Full Project Demonstration
  youtubes: [
    {
      title: "Full Project Demonstration",
      videoId: "1wj80nTQ0a4",
    },
  ],

  // ✅ Posters + Guide (order preserved)
  media: [
    { type: "image", src: "/media/techdesign/wehearyou/poster_1@300x.webp", alt: "Poster 1" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_2@300x.webp", alt: "Poster 2" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_3@300x.webp", alt: "Poster 3" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_4@300x.webp", alt: "Poster 4" },
    { type: "image", src: "/media/techdesign/wehearyou/guide@300x.webp", alt: "Gesture Guide" },
  ],

  // ✅ Row 5 LEFT — Issues Addressed & Concept
  descLeft: {
    title: "Why I made it",
    paragraphs: [
      "This picks up where my piece Dialogue with the Wind left off. There, you spoke into an Arduino-based object and heard your own words reflected back. We Hear You turns that reflection outward. It's about understanding ourselves through other people's thoughts and feelings. Self-reflection matters, but I think we forget that life is also about living with others, in community.",
      "The problem I kept thinking about is how disconnected we get across generations and life experiences. Life moves fast, and we drift apart not just by age, but by work, routine, and silence. I wanted a gentle space to meet voices unlike your own and sit with them: a child wondering if anyone understands them, an elder remembering love, a worker whose name no one remembers. Not big statements, just small honest truths that rarely make it into any archive.",
      "It's grounded in the psychology of listening. Being heard without interruption or judgment can be healing. You listen with care, respond, and maybe feel seen in return. For me, understanding myself often happens through others. Meeting someone else's truth can make your own feelings clearer.",
    ],
    sections: [
      {
        title: "A survey that doesn't feel like a survey",
        paragraphs: [
          "This is also an early experiment in making surveys more fun and more honest. Normal surveys feel repetitive and transactional, so people give rushed, shallow, or “safe” answers. My guess was that people share more thoughtfully when it feels like an experience, not a form. So I hid the survey inside a calm 3D world, with anonymous messages, a gentle start, and quiet hand gestures instead of voice or buttons.",
          "In informal testing, people took more time and wrote richer messages when the prompt was “leave a thought for someone you’ll never meet,” and when the experience greeted them gently instead of firing questions right away.",
          "I also saw people hesitate at the start when they didn't know what to expect. That's why the final version has guidance, and why next time I'd add a clearer consent moment and a short tutorial.",
        ],
      },
      {
        title: "Who it's for",
        paragraphs: [
          "It's for installation visitors and anyone being asked to share something personal: research participants, community members, museum visitors, people giving feedback. They need to feel safe, have a reason to care, and know their answer matters.",
          "It's also for the researcher or organizer who wants honest answers without pushing people to overshare. So I tucked the prompts inside a calm story world, made the start gentle, and made answering feel like a human, voluntary choice.",
        ],
      },
    ],
  },

  // ✅ Row 5 RIGHT — Experience Description + Gestures + Links (links format exactly like you asked)
  descRight: {
    title: "The experience",
    paragraphs: [
      "You're in a wide pastel field with a glowing, blossoming tree in the middle, moving through a living archive of messages other people left behind. Light orbs drift down like falling thoughts, and old objects sit around like quiet relics, each holding a voice, a trace, a hope. You don't know what message you'll get or who wrote it, but you follow the pull anyway, hoping it's the one you need.",
      "There are no buttons. The world responds to your hands. With simple gestures, you decide what to do with what you found: relate to it, protect it, carry it forward, or let it go. Each choice shifts the mood, and the world changes a little with you, like it's listening back.",
      "The tree is where the archive grows. Inspired by the Tree of Life, it lets every player leave a message of their own. Each one becomes something future players can find, so the world slowly grows, shaped by everyone who passed through.",
      "Under the hood, MediaPipe and Python read your hand movement in real time and send it into Unity. I picked gestures on purpose. They ask you to be present and make listening and replying feel physical, like reaching out and touching a memory.",
      "With gentle narration and guidance, I wanted it to feel quiet, human, and open-ended. A place to meet someone else's truth, leave a bit of your own, and remember how powerful it is to just listen.",
    ],
    sections: [
      {
        title: "The gestures",
        bullets: [
          "Open palm: “I relate to this.”",
          "Fist: “I will protect this truth.”",
          "Peace sign: “I will carry this for someone else.”",
          "Hands forming a circle: “I release this memory” (letting go).",
        ],
      },
      {
        title: "Links",
        links: [
          { label: "Previous Project: Dialogue with the Wind", href: "/projects/dialogue-with-the-wind" },
          {
            label: "Figma (process, sketches, moodboard)",
            href: "https://www.figma.com/board/s5T2WRuFKI2i1tYO5ayXpU/Core-Studio_Fall-2025-final?node-id=109-474&t=9WUZlGGd4hUHvqRT-0",
          },
          { label: "GitHub repo", href: "https://github.com/feliciatiffany/ProtocolNation_FutureAsSystem" },
          { label: "Final website", href: "https://feliciatiffany.github.io/ProtocolNation_FutureAsSystem/" },
        ],
      },
    ],
  },

  // ✅ Design Process
  processIntro: {
    title: "How I worked",
    paragraphs: [
      "If I had to draw my thinking process, it'd be a mind map. I start from one seed idea and let new branches pop up as I test what's possible and what feels meaningful. I like when the concept and the tech grow side by side, so the work stays grounded but still imaginative.",
    ],
  },

  processBrainstorming: {
    title: "1. Brainstorming",
    paragraphs: [
      "This started from two places. One was Dialogue with the Wind and wanting to take reflection beyond the self. The other was my curiosity about building 3D worlds in Unity and trying hand gesture interaction with machine learning, especially MediaPipe.",
      "At first it was just a lot of questions, technical and human. What interaction feels natural? What makes people willing to share honestly? How can reflection be shared, not just personal? I worked it out in a Figma mind map. Connecting sticky notes, references, ideas, and images is the clearest way for me to spot patterns and pick a direction.",
      "My early sketches focused on two things: which tools could realistically work together, and what form the experience should take. I leaned toward a game at first, because fun is always part of how I design. It lowers the pressure, makes people curious, and keeps them around longer.",
    ],
  },

  processEmpathize: {
    title: "2. Empathize and ideate",
    paragraphs: [
      "This part was mostly research and playing around. I played and studied gentle story games like Journey to see what makes them so emotional. I was especially curious how a world can guide feelings without forcing one story, and how symbols can carry meaning without dialogue.",
      "Then I went back to the questions from Dialogue with the Wind and pushed them outward. What mental health struggles exist beyond self-reflection? What kind of care is missing? Why should people care about each other? That led me to disconnection across generations and life experiences, and to the idea of reflecting together as a community.",
      "I built the experience around something I keep coming back to: talking is one of the best forms of therapy. I wanted it to feel a bit like a psychologist's room, where you can say something and feel heard without being interrupted or judged. That's why messages can be anonymous or as personal as you want. Anonymity takes away the pressure of being seen, and makes honesty feel safer.",
      "The responses are also a way to practice listening without judging. There's no one right reaction, because holding someone else's truth isn't just one thing. Sometimes you relate. Sometimes you protect it. Sometimes you carry it forward. Sometimes you let it go. It's not about grading the player, it's about keeping them open and present.",
      "Slowly the direction got clearer. I wanted an installation about empathy and connection that also works as a live survey experiment for more honest answers. That's where the experience and the data became the same design question.",
    ],
  },

  processPrototype: {
    title: "3. Prototype",
    paragraphs: [
      "I started with rough sketches of the world, imagining a human archive. I kept coming back to the brain as a forest of memory. Some memories fade or crumble, but they always leave traces.",
      "Installation visitors are all kinds of people, different ages, cultures, and comfort with interactive art. So it had to be guided and easy to step into. I wrote clear instructions for the whole flow, in a poetic tone, so people feel safe and pulled in.",
      "On the tech side, I built the 3D world in Unity first, going for something soft and calming. I chose 3D because I wanted the “data” to feel alive. Instead of reading text on a flat screen, you walk through it like a world, which keeps you engaged.",
      "Here I made a big choice: gestures instead of voice or a normal UI. Talking out loud can feel exposing in a public space, especially about personal stuff. Gestures feel quieter and more private. They also make responding physical, which slows you down. I wanted it to feel like holding someone's message in your hands, not just clicking a button.",
      "At the same time, I connected MediaPipe with Python, C#, and WebSocket for real-time hand tracking. Honestly, one of the hardest parts was picking four gestures the model could tell apart without misreading, while still feeling human. The logic looks at distances between fingers and gesture states, with Unity and WebSocket talking constantly. The flowchart below shows how it works, and the GitHub link is in the links section.",
    ],
  },

  processFinal: {
    title: "4. Final setup, testing, and what I learned",
    paragraphs: [
      "The final setup uses a projector and camera tracking, with MediaPipe and Python running live. It's one person at a time in a private space, so nobody is influenced by others and it feels safer to share something honest.",
      "Instructions live inside the experience, plus a booklet and project description. Testing went smoothly, and I collected real messages for the live archive. I also learned where people hesitate. A clearer note at the start about what they'll see and what gets recorded would help. So would a short tutorial, so people feel confident with the gestures before the reflective part.",
      "If this grows to more data or connects several installations, the next step would be an online database and API. That's outside what I could do this time, but it's a clear next direction.",
    ],
  },

  // ✅ Process media placed between stages (order preserved)
  processMedia: {
    brainstorming: [
      { type: "image", src: "/media/techdesign/wehearyou/process1.webp", alt: "Process 1" },
    ],
    empathize: [
      { type: "image", src: "/media/techdesign/wehearyou/process2.webp", alt: "Process 2" },
      { type: "image", src: "/media/techdesign/wehearyou/process3.webp", alt: "Process 3" },
    ],
    prototype: [
      { type: "image", src: "/media/techdesign/wehearyou/process4.webp", alt: "Process 4" },
      { type: "image", src: "/media/techdesign/wehearyou/process5.webp", alt: "Process 5" },
      { type: "image", src: "/media/techdesign/wehearyou/flowchart.webp", alt: "System Flowchart" },
    ],
    final: [
      { type: "image", src: "/media/techdesign/wehearyou/poster_1@300x.webp", alt: "Poster 1" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_2@300x.webp", alt: "Poster 2" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_3@300x.webp", alt: "Poster 3" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_4@300x.webp", alt: "Poster 4" },
      { type: "image", src: "/media/techdesign/wehearyou/guide@300x.webp", alt: "Gesture Guide" },
    ],
  },

  // ✅ Live documentation + testing video
  row6: {
    websiteScreens: {
      title: "Live Documentation",
      layout: "slider",
      media: [
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation1.webp", alt: "Live Documentation 1" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation2.webp", alt: "Live Documentation 2" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation3.webp", alt: "Live Documentation 3" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation4.webp", alt: "Live Documentation 4" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation5.webp", alt: "Live Documentation 5" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation6.webp", alt: "Live Documentation 6" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation7.webp", alt: "Live Documentation 7" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation8.webp", alt: "Live Documentation 8" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation9.webp", alt: "Live Documentation 9" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation10.webp", alt: "Live Documentation 10" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation11.webp", alt: "Live Documentation 11" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation12.webp", alt: "Live Documentation 12" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation13.webp", alt: "Live Documentation 13" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation14.webp", alt: "Live Documentation 14" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation15.webp", alt: "Live Documentation 15" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation16.webp", alt: "Live Documentation 16" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation17.webp", alt: "Live Documentation 17" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation18.webp", alt: "Live Documentation 18" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation19.webp", alt: "Live Documentation 19" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation20.webp", alt: "Live Documentation 20" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation21.webp", alt: "Live Documentation 21" },
      ],
    },
    youtubes: [
      {
        title: "Project Live Testing",
        videoId: "nVtlClpfk0Y",
      },
    ],
  },

  // ✅ References at the end
  references: [
    {
      label: "Reddit thread: MediaPipe handtracking driving game (Unity3D)",
      href: "https://www.reddit.com/r/Unity3D/comments/16a726x/mediapipe_handtracking_driving_game/",
    },
    { label: "homuler/MediaPipeUnityPlugin", href: "https://github.com/homuler/MediaPipeUnityPlugin" },
    {
      label: "Arham-Aalam/MediaPipeUnityPlugin (macOS notes)",
      href: "https://github.com/Arham-Aalam/MediaPipeUnityPlugin?tab=readme-ov-file#macOS",
    },
    { label: "Handspew (Hugging Face Space) — tinazone", href: "https://huggingface.co/spaces/tinazone/handspew" },
    {
      label: "MediaPipe Hand Landmarker (official docs)",
      href: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker",
    },
    { label: "tina.zone — work page", href: "https://www.tina.zone/work.html" },
  ],
};
