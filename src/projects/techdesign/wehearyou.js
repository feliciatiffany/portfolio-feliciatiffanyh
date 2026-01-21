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
    "We Hear You is a gesture-based interactive experience that invites players into a soft, reflective landscape, where they can encounter the memories, thoughts, and quiet truths of people from different generations, occupations, and backgrounds. It also function as a beginning idea of interactive collection survey.\n\n" +
    "“How might we help strangers share honest emotional reflections in a way that feels safe, and make qualitative data collection feel inviting instead of forced?”",

  // ✅ Full Project Demonstration
  youtubes: [
    {
      title: "Full Project Demonstration",
      videoId: "1wj80nTQ0a4",
    },
  ],

  // ✅ Posters + Guide (order preserved)
  media: [
    { type: "image", src: "/media/techdesign/wehearyou/poster_1@300x.png", alt: "Poster 1" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_2@300x.png", alt: "Poster 2" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_3@300x.png", alt: "Poster 3" },
    { type: "image", src: "/media/techdesign/wehearyou/poster_4@300x.png", alt: "Poster 4" },
    { type: "image", src: "/media/techdesign/wehearyou/guide@300x.png", alt: "Gesture Guide" },
  ],

  // ✅ Row 5 LEFT — Issues Addressed & Concept
  descLeft: {
    title: "Issues Addressed & Concept",
    paragraphs: [
      "This project continues a piece I created, Dialogue to the Wind (link), an interactive work where users spoke into an Arduino-based object and heard their words reflected back as a form of personal reflection. We Hear You carries that thread forward, but it turns reflection outward. It is about understanding ourselves through other people’s thoughts and feelings, and seeing the world as whole because of the people in it. Self reflection matters, but I think we often forget that life is also about living in relation to others and existing within community.",
      "The core issue I’m responding to is emotional disconnection across generations and lived experiences. In a world that moves fast, we grow apart not only by age, but by work, routine, and silence. We Hear You creates a gentle space to encounter voices unlike your own and to sit with them. It brings forward the quiet voices we often overlook, like a child wondering if anyone understands them, an elder remembering love, or a worker whose name no one remembers. I wanted to honor emotional traces that rarely make it into any archive, not grand declarations, but small honest truths that quietly shape what it means to be human.",
      "This concept is grounded in the psychology of listening. Being heard without interruption or judgment can be healing. The experience invites players to listen with care and respond, and in that exchange, maybe feel seen in return. For me, self understanding often happens through others. Meeting someone else’s truth can make your own feelings clearer, even when nothing is explicitly explained.",
    ],
    sections: [
      {
        title: "Beginning of the Interactive Survey Collection Platform",
        paragraphs: [
          "Alongside the emotional archive, this project is also an early experiment in making survey collection more engaging and emotionally honest. Traditional surveys can feel repetitive and transactional, which often leads to rushed, shallow, or “safe” answers. My assumption was that people share more thoughtfully when prompts feel like an experience instead of a form.",
          "In informal testing, I noticed users took more time and wrote more nuanced messages when the prompt was framed as “leave a thought for someone you’ll never meet” and when the experience acknowledged them gently, rather than asking direct questions upfront.",
          "I also saw hesitation at the beginning when expectations were unclear, which is why the final design includes guidance and why a future iteration would add an even clearer consent moment and a short tutorial phase.",
        ],
      },
      {
        title: "Target Audience",
        paragraphs: [
          "This experience is designed for art installation visitors and anyone being asked to share personal thoughts, like research participants, community members, museum visitors, or users giving feedback. They often need psychological safety, a reason to care, and acknowledgment that their input matters.",
          "It also serves a secondary customer, the researcher or organizer who needs truthful qualitative responses without forcing people to overshare. We Hear You addresses these needs by embedding prompts inside a calm narrative world, offering a gentle entry into reflection, and turning response into a choice that feels human and voluntary.",
        ],
      },
    ],
  },

  // ✅ Row 5 RIGHT — Experience Description + Gestures + Links (links format exactly like you asked)
  descRight: {
    title: "Experience Description",
    paragraphs: [
      "Set in a wide pastel field with a glowing, blossoming tree at its center, the player moves through a living archive of messages left behind by others. Light orbs drift down like falling thoughts, and antique objects sit scattered like quiet relics—each one holding a voice, a trace, a hope. You don’t know what message you’ll receive or who wrote it, but you follow the pull anyway, trusting that maybe it’s the one you need.",
      "Instead of buttons, the world responds to your hands. With simple gestures, you choose what to do with what you found: relate to it, protect it, carry it forward, or let it go. Each choice shifts the emotional direction of the experience, and the environment subtly changes with you—like the world is listening back.",
      "The tree is where the archive grows. Inspired by the Tree of Life, it offers every player a chance to leave a message of their own. Each contribution becomes part of what future players can discover, so over time the world slowly expands. It’s shaped by everyone who has passed through it.",
      "Technically, the interaction is built with MediaPipe and Python, connected into Unity so the experience can read hand movement in real time. I chose gesture-based interaction on purpose: it asks the player to be present, to respond with attention, and to feel the act of listening and replying as something physical—like reaching out and touching memory.",
      "Supported by gentle narration and guidance, We Hear You is meant to feel quiet, human, and open-ended. It’s a space to meet someone else’s truth, leave a trace of your own, and remember the power of simply listening to understand.",
    ],
    sections: [
      {
        title: "Gesture Responses",
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
    title: "Design Process and Iteration",
    paragraphs: [
      "If I had to portray my thinking process, I’d say it looks like a mind map. When I design, I keep moving forward from one seed idea and let new branches appear as I test what’s possible and what feels meaningful. I like when concept and technical exploration grow side by side, so the work stays both grounded and imaginative.",
    ],
  },

  processBrainstorming: {
    title: "1. Brainstorming",
    paragraphs: [
      "This project started from two directions. One came from my previous piece, Dialogue to the Wind (link), and the desire to extend reflection beyond the self. The other came from my interest in building 3D environments in Unity and experimenting with hand gesture interaction using machine learning, especially MediaPipe.",
      "At the beginning, it was a lot of questions, both technical and human. What kind of interaction feels natural. What makes people willing to share honestly. How can reflection become communal instead of only personal. I worked through this in Figma using a mind map. Connecting sticky notes, references, written ideas, and images is the clearest way for me to see patterns and choose a direction that actually holds together.",
      "My early sketches focused on two things. First, tool research and which technologies could realistically work together. Second, concept exploration and what medium the experience should take. I initially leaned toward a game format because fun is always part of how I design experiences. It lowers pressure, invites curiosity, and makes people stay longer.",
    ],
  },

  processEmpathize: {
    title: "2. Empathize and Ideate",
    paragraphs: [
      "This phase was mostly research and experimentation. I played and studied soft storytelling games like Journey and analyzed what makes them emotionally powerful. I was especially interested in how a world can guide feeling without forcing a single narrative, and how symbolism can carry meaning without direct dialogue.",
      "From there, I returned to the questions that originally came from Dialogue to the Wind, but expanded them outward. I kept asking what mental health challenges exist beyond individual self reflection, what kinds of care are missing, and why people should care about others. That led me to disconnection across generations and lived experiences, and the idea of community reflection as a practice.",
      "In ideation, I shaped the experience around a belief I keep coming back to, that talking is one of the best forms of therapy. I wanted the interaction to feel closer to a psychologist’s space where you can express something and feel heard without being interrupted or judged. That’s why the messages can be anonymous or as personal as the player wants. Anonymity lowers the pressure of being perceived, and it makes honesty feel safer.",
      "I also designed the response system as a way to practice listening without judgment. Instead of one correct reaction, players can respond differently because holding someone else’s truth isn’t one action. Sometimes you relate. Sometimes you protect what was shared. Sometimes you carry it forward. Sometimes you let it go. The goal is not to evaluate the player, but to keep them open minded and present while they encounter experiences that are not their own.",
      "As the concept developed, the direction became clearer. I wanted an interactive installation that supports empathy and connection, and I also wanted it to function as a live survey collection experiment that could gather more honest qualitative responses. This is where experience and data became part of the same design question.",
    ],
  },

  processPrototype: {
    title: "3. Prototype",
    paragraphs: [
      "I began with rough sketches of the world, imagining a human archive. I kept coming back to the idea of the brain as a forest of memory. Some memories fade or crumble, but they always leave traces.",
      "The audience for this work is art installation visitors, which means it’s naturally diverse in age, culture, and familiarity with interactive art. Because of that, the experience needed to be guided and easy to enter. I designed the full flow with clear instructions from start to finish, written in a poetic tone to help people feel emotionally safe and immersed.",
      "On the technical side, I built the 3D environment in Unity first. I aimed for a soft, calming atmosphere that supports reflection. I also chose 3D because I wanted the “data” to feel alive. Instead of reading text in a flat interface, the player moves through it like a world, which helps them stay engaged.",
      "At this stage, I made a key interaction choice: gestures instead of voice or a normal UI. Voice can feel exposing in a public or semi public setting, especially when the content is personal. Gestures feel quieter and more private. They also make the response physical, which slows the player down and asks for presence. I wanted the act of responding to feel intentional, like you’re holding someone else’s message with your hands rather than just clicking a button.",
      "In parallel, I integrated MediaPipe with Python, C#, and WebSocket to create real time hand gesture interaction. One of the biggest challenges was choosing four gestures that are distinguishable for the model and less likely to be misread, while still feeling human and intentional. The interaction logic relies on distances between fingers and gesture states, and Unity and WebSocket continuously communicate to interpret the user’s input. The flowchart below shows how the system works, and the GitHub link is included in the links section.",
    ],
  },

  processFinal: {
    title: "4. Final Implementation, User Testing, and Reflection",
    paragraphs: [
      "The final setup uses projection and a camera based tracking system, with MediaPipe and Python running live. The experience is designed for one person at a time in a private space so users are not influenced by others and feel safer sharing something honest.",
      "Instructions are integrated inside the experience and supported by a booklet and project description. Testing went smoothly, and I was able to collect real messages as part of the live archive. I also learned where users hesitate. A clearer acknowledgment at the beginning helps set expectations about what the user will encounter and what gets recorded. A short tutorial phase before the main experience would also help users feel confident with gestures before entering the more reflective part.",
      "If this project scales to larger data or connects across multiple installations, the next step would be adding an online database and API pipeline. That is outside my current scope, but it is a clear direction for future iterations.",
    ],
  },

  // ✅ Process media placed between stages (order preserved)
  processMedia: {
    brainstorming: [
      { type: "image", src: "/media/techdesign/wehearyou/process1.jpg", alt: "Process 1" },
    ],
    empathize: [
      { type: "image", src: "/media/techdesign/wehearyou/process2.jpg", alt: "Process 2" },
      { type: "image", src: "/media/techdesign/wehearyou/process3.jpg", alt: "Process 3" },
    ],
    prototype: [
      { type: "image", src: "/media/techdesign/wehearyou/process4.jpg", alt: "Process 4" },
      { type: "image", src: "/media/techdesign/wehearyou/process5.jpg", alt: "Process 5" },
      { type: "image", src: "/media/techdesign/wehearyou/flowchart.jpg", alt: "System Flowchart" },
    ],
    final: [
      { type: "image", src: "/media/techdesign/wehearyou/poster_1@300x.png", alt: "Poster 1" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_2@300x.png", alt: "Poster 2" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_3@300x.png", alt: "Poster 3" },
      { type: "image", src: "/media/techdesign/wehearyou/poster_4@300x.png", alt: "Poster 4" },
      { type: "image", src: "/media/techdesign/wehearyou/guide@300x.png", alt: "Gesture Guide" },
    ],
  },

  // ✅ Live documentation + testing video
  row6: {
    websiteScreens: {
      title: "Live Documentation",
      layout: "slider",
      media: [
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation1.jpeg", alt: "Live Documentation 1" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation2.jpeg", alt: "Live Documentation 2" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation3.jpeg", alt: "Live Documentation 3" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation4.jpeg", alt: "Live Documentation 4" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation5.jpeg", alt: "Live Documentation 5" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation6.jpeg", alt: "Live Documentation 6" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation7.jpeg", alt: "Live Documentation 7" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation8.jpeg", alt: "Live Documentation 8" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation9.jpeg", alt: "Live Documentation 9" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation10.jpeg", alt: "Live Documentation 10" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation11.jpeg", alt: "Live Documentation 11" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation12.jpeg", alt: "Live Documentation 12" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation13.jpeg", alt: "Live Documentation 13" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation14.JPG", alt: "Live Documentation 14" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation15.jpeg", alt: "Live Documentation 15" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation16.JPG", alt: "Live Documentation 16" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation17.jpeg", alt: "Live Documentation 17" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation18.jpeg", alt: "Live Documentation 18" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation19.jpeg", alt: "Live Documentation 19" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation20.jpeg", alt: "Live Documentation 20" },
        { type: "image", src: "/media/techdesign/wehearyou/livedocumentation21.jpeg", alt: "Live Documentation 21" },
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
