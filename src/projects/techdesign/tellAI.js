const FILES = [
  { type: "image", src: "/media/techdesign/tellai/File 1.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 2.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 3.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 4.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 5.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 6.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 7.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 8.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 9.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 10.jpg", alt: "TellAI" },
  { type: "image", src: "/media/techdesign/tellai/File 11.jpg", alt: "TellAI" },
];

export default {
  slug: "tell-ai",
  title: "TellAI",

  meta: {
    category: ["Creative Tech", "AI", "Tangible Interaction"],
    year: "2026",
    tools: ["Deepgram", "Claude AI", "ElevenLabs", "Rotary Phone"],
  },

  intro:
    "A Rotary AI Storytelling Toy for Children, Parents, and AI Literacy\n\nTellAI is a research-driven, tangible, screen-free AI toy built into a retro rotary telephone. It lets children ages 6–10 dial different character and emotion combinations to have playful voice conversations with AI.\n\nThe project started from a question around AI, children, and parenting. Parents were already concerned about children's relationship with screens, but AI adds another layer: children are now growing up with systems that can talk, answer, recommend, imitate, and emotionally respond.\n\nInstead of introducing AI as a hidden algorithm inside a screen, TellAI asks: what if AI could become something children can question, customize, and play with more critically?",

  sections: [
    { kind: "intro" },
    { kind: "youtube", title: "Project Video", videoId: "V5OOpycZYlE" },
    { kind: "diagram", src: "/media/techdesign/tellai/diagram.jpeg", alt: "Interaction Flow Diagram" },
    { kind: "desc", dataPath: "interactionFlowBlock" },
    { kind: "media", layout: "slider", items: FILES },
    { kind: "twoCol", leftPath: "designBlock", rightPath: "researchBlock" },
    { kind: "twoCol", leftPath: "playtestingBlock", rightPath: "findingsBlock" },
    { kind: "references", title: "Bibliography", itemsPath: "references" },
  ],

  interactionFlowBlock: {
    title: "Interaction Flow",
    paragraphs: [
      "Children interact with TellAI by picking up the phone, dialing one character and one emotion, and then speaking through the handset. The rotary dial becomes the physical input, turning AI interaction into something slower, more intentional, and more hands-on than typing into a chatbot.",
      "After the child speaks, their voice is converted into text using Deepgram, Claude generates a playful response, and ElevenLabs turns the answer back into a character voice played through the phone speaker.",
    ],
    bullets: [
      "Rotary Dial → Character / Emotion Selection → Child Voice → Deepgram STT → Claude AI → ElevenLabs TTS → Phone Speaker",
    ],
  },

  designBlock: {
    title: "Design",
    paragraphs: [
      "The design was inspired by Inclusive AI Literacy for Kids Around the World by Druga, Vu, Likhith, and Qiu. Their work argues that AI learning for children should avoid deception, make machine behavior more understandable, and give children ways to teach, customize, or \"program\" the system.",
      "That became the core design guideline for TellAI. We did not want to make an AI toy that hides behind magic or pretends to be human. Instead, kids can see that the AI changes based on the choices they dial.",
      "We chose a rotary phone because it creates the opposite experience of a fast 2D screen. Kids have to dial, wait, listen, and respond. It also lets us repurpose old technology and connect it with new technology in a playful way.",
      "The goal is not to replace the child's creativity, but to support curiosity, storytelling, and two-way interaction while still letting the child lead.",
    ],
  },

  researchBlock: {
    title: "Research Questions",
    paragraphs: ["Through TellAI, we explored these questions:"],
    bullets: [
      "How do parents feel seeing their children interact with AI?",
      "What do parents think about introducing AI through toys?",
      "At what age do parents think children should start using or learning about AI?",
      "What boundaries would parents want in an AI toy for children?",
    ],
  },

  playtestingBlock: {
    title: "Playtesting",
    paragraphs: [
      "Because TellAI involves children, privacy and consent were central to the testing plan. We created a parent consent form explaining how photos and videos would be documented, made sure children's faces were not shown, deleted collected data after testing, and did not use any data for AI training.",
      "During playtesting, we asked parents what they liked or disliked, whether they would allow something like this at home, what boundaries they would want in an AI toy, and at what age they think children should start learning about AI.",
      "We also asked children simple questions, such as who they thought was talking through the phone and whether they would want to talk to it again.",
    ],
  },

  findingsBlock: {
    title: "Findings",
    paragraphs: [
      "Playtesting changed the prototype. At first, the delay between speech-to-text, AI response, and text-to-speech felt too long, so we added a ringtone and filler audio to make the waiting moment feel intentional.",
      "When people did not know what to say at the beginning, we changed the flow so TellAI introduces itself first. When the AI responses were too long, we added a rule to keep replies short, usually one to two sentences, with a simple follow-up question.",
      "The testing also showed how sensitive this topic is. Children were curious but impatient; they often started rotating or pressing parts of the phone before waiting for the AI response.",
      "Parents were more hesitant. Out of nine parent-child groups we asked, seven declined to playtest. One parent said they were against AI, and two said they did not want their children using AI at a young age.",
      "TellAI became both a prototype and a research object. It explores how AI can be introduced to children through play, but with more transparency, boundaries, and parent awareness. Rather than making AI feel invisible or magical, TellAI makes the interaction physical, visible, and easier to question.",
    ],
  },

  references: [
    {
      href: "https://www.barna.com/research/parents-ai/",
      label: "Barna Group. \"Parents Worry About AI But Know Little About It.\" Barna Group, April 22, 2024.",
    },
    {
      href: "https://dl.acm.org/doi/10.1145/3311890.3311924",
      label: "Druga, Stefania, Sarah T. Vu, Eesh Likhith, and Tammy Qiu. \"Inclusive AI Literacy for Kids Around the World.\" FabLearn 2019, 104–111.",
    },
    {
      href: "https://www.luriechildrens.org/en/blog/screen-time-statistics/",
      label: "Lurie Children's Hospital. \"Screen Time Statistics Shaping Parenting in 2025.\" 2025.",
    },
    {
      href: "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
      label: "McClain, Colleen, Monica Anderson, Olivia Sidoti, and William Bishop. \"How Teens Use and View AI.\" Pew Research Center, February 24, 2026.",
    },
    {
      href: "https://www.unicef-irc.org/publications/1183-childrens-perspectives-on-their-best-interests-and-ai.html",
      label: "UNICEF Innocenti. \"Children's Perspectives on Their Best Interests and AI.\" 2025.",
    },
    {
      href: "https://jamanetwork.com/journals/jama/fullarticle/2829769",
      label: "Xiao, Yunyu, et al. \"Addictive Screen Use Trajectories and Suicidal Behaviors, Suicidal Ideation, and Mental Health in US Youths.\" JAMA, 2025.",
    },
  ],

  media: [],
  row6: null,
};
