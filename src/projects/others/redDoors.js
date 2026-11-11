// src/projects/techdesign/redDoors.js

export default {
    slug: "redDoors",
    title: "Red Doors",

    meta: {
        category: ["Educational Game", "Social Impact", "Unity 3D", "Game Prototype"],
        year: "2023",
        tools: ["Unity", "Adobe Illustrator", "Premiere Pro", "Power Point", "Figma"],
    },

    sections: [
        { kind: "intro" },

        { kind: "youtubes", title: "Project Video", itemsPath: "youtubes" },

        // slides (slider)
        { kind: "media", title: "Slides", layout: "slider", itemsPath: "slides" },
        { kind: "desc", dataPath: "linksBlock" },
        { kind: "desc", dataPath: "coreIssue" },
        { kind: "desc", dataPath: "customers" },
        { kind: "desc", dataPath: "whyGame" },

        { kind: "desc", dataPath: "experienceFlow" },
        { kind: "media", title: null, layout: "gallery", itemsPath: "flowchartMedia" },

        { kind: "desc", dataPath: "visualDesign" },
        { kind: "media", title: "Scenes (Elementary → University)", layout: "slider", itemsPath: "sceneMedia" },

        { kind: "desc", dataPath: "technicalPlan" },

        { kind: "desc", dataPath: "designProcessResearch" },
        { kind: "media", title: "Mind Maps", layout: "gallery", itemsPath: "mindmapMedia" },

        { kind: "desc", dataPath: "earlyIterations" },
        { kind: "media", title: "Sketches", layout: "slider", itemsPath: "sketchMedia" },

        { kind: "desc", dataPath: "workSamples" },
        { kind: "media", title: "Process — Asset Building", layout: "slider", itemsPath: "assetBuildingMedia" },
        { kind: "media", title: "Process — Unity Development", layout: "slider", itemsPath: "unityMedia" },

        { kind: "desc", dataPath: "intendedImpact" },

        // the full project paper, then its references
        { kind: "paper", title: "Paper", dataPath: "paper" },
        { kind: "references", title: "References", itemsPath: "references" },

    ],

    intro:
        "With the goal of showing how the wealth gap shapes access to education, Red Doors is an educational game installation concept designed for public spaces. I chose the medium and the game flow based on secondary research into how well games teach, hoping to turn that awareness into action.",

    youtubes: [
        {
            title: "Gameplay / Project Walkthrough",
            videoId: "xaFkOV0Cfgc",
        },
    ],

    // ✅ put all slide picture (slider) — ordered
    slides: [
        { type: "image", src: "/media/techdesign/redDoors/Slide1.webp", alt: "Slide 1" },
        { type: "image", src: "/media/techdesign/redDoors/Slide2.webp", alt: "Slide 2" },
        { type: "image", src: "/media/techdesign/redDoors/Slide3.webp", alt: "Slide 3" },
        { type: "image", src: "/media/techdesign/redDoors/Slide4.webp", alt: "Slide 4" },
        { type: "image", src: "/media/techdesign/redDoors/Slide5.webp", alt: "Slide 5" },
        { type: "image", src: "/media/techdesign/redDoors/Slide6.jpeg", alt: "Slide 6" },
        { type: "image", src: "/media/techdesign/redDoors/Slide7.webp", alt: "Slide 7" },
        { type: "image", src: "/media/techdesign/redDoors/Slide8.webp", alt: "Slide 8" },
        { type: "image", src: "/media/techdesign/redDoors/Slide9.webp", alt: "Slide 9" },
        { type: "image", src: "/media/techdesign/redDoors/Slide10.webp", alt: "Slide 10" },
        { type: "image", src: "/media/techdesign/redDoors/Slide11.webp", alt: "Slide 11" },
        { type: "image", src: "/media/techdesign/redDoors/Slide12.webp", alt: "Slide 12" },
        { type: "image", src: "/media/techdesign/redDoors/Slide13.webp", alt: "Slide 13" },
        { type: "image", src: "/media/techdesign/redDoors/Slide14.webp", alt: "Slide 14" },
    ],

    coreIssue: {
        title: "Why this matters to me",
        paragraphs: [
            "Growing up, education was always treated as something precious in my family. That made me really aware of how unequal access can be, especially when poverty decides your school, your surroundings, and whether you can keep going.",
            "This project focuses on the U.S., where wealth is tied to how far people get in school and in life, and the cycle repeats over generations. I wanted Red Doors to turn that into something people can step into, not just a statistic they read and forget.",
        ],
    },

    customers: {
        title: "Who it’s for",
        paragraphs: ["There’s more than one audience here, because the problem itself is bigger than one group."],
        sections: [
            {
                title: "Mainly: middle-to-upper class people in everyday public spaces",
                paragraphs: [
                    "They usually need a reason to stop, care, and see the issue from a life they don’t live. They also need an easy way to go from caring to doing something. So Red Doors sits in places they already pass, and tells the “education journey” in first person so it feels personal.",
                ],
            },
            {
                title: "Also: decision-makers and institutions",
                paragraphs: [
                    "They need steady public pressure and clear signs that people notice the injustice. Red Doors is both a critique and a public reminder, pushing for real policy and programs, not just personal empathy.",
                ],
            },
            {
                title: "And: underprivileged communities",
                paragraphs: [
                    "They deserve to hear that the struggle is real, that it’s seen, and that pushing through matters. I wanted the work to say clearly: the barrier is the system, not a personal failure.",
                ],
            },
        ],
    },

    whyGame: {
        title: "Why a game, and why red doors",
        paragraphs: [
            "I wanted people passing by to feel how money decides who keeps learning, and then turn that feeling into action by donating.",
            "I picked a game because it puts you inside the situation instead of asking you to feel for someone from far away. Red Doors is meant to teach and raise awareness, as a site-specific art installation.",
            "My bet was that playing in first person would make it personal. Picking red doors, paying to unlock paths and watching your money run out makes the wealth gap something you feel, not just read about.",
            "The doors do two jobs. As a symbol, a door is a new chapter, and you have to pick a path without knowing where it leads. In the game, doors create suspense and pressure, which is exactly how school feels when money is tight.",
            "And red means risk, fear, and instability, because “choice” isn’t equally safe for everyone.",
        ],
    },

    experienceFlow: {
        title: "How you play",
        paragraphs: [
            "You go through school as a journey, from elementary school all the way to finishing college. Each level has quiz questions that explain the issue in a friendly, hands-on way.",
            "The main mechanic is friction. At some stages you have to pay to unlock a door or get the answer key. If you can’t, you lose. That’s on purpose: money becomes power in the game, so you feel how it can decide whether someone keeps learning. The money collected this way is meant to go to education for people who need it.",
        ],
        sections: [
            {
                title: "The flow, simply",
                bullets: [
                    "Start with a quick intro and instructions.",
                    "Enter Level 1 (elementary), pick a door, answer a question.",
                    "Move up through harder levels with more locked paths.",
                    "Hit moments where you have to pay to continue, just like real-life barriers.",
                    "Make it to university, or lose when your money runs out.",
                ],
            },
        ],
    },

    // flowchart image
    flowchartMedia: [{ type: "image", src: "/media/techdesign/redDoors/flowchart.webp", alt: "Red Doors flowchart" }],

    visualDesign: {
        title: "How it looks",
        paragraphs: [
            "I kept the visuals clear and repetitive on purpose, so people passing by can get it fast.",
            "The main pieces are the doors, a money balance, and four scenes for each school stage (elementary to university). Even the sky changes from sunrise to night as you go, like the “phases of life.” That way the game explains itself without long text.",
        ],
    },

    // ✅ display all process_scene (ordered)
    sceneMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_scene1.webp", alt: "Scene 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene2.webp", alt: "Scene 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene3.webp", alt: "Scene 3" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene4.webp", alt: "Scene 4" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene5.webp", alt: "Scene 5" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene6.webp", alt: "Scene 6" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene7.webp", alt: "Scene 7" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene8.webp", alt: "Scene 8" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene9.webp", alt: "Scene 9" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene10.webp", alt: "Scene 10" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene11.png", alt: "Scene 11" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene12.webp", alt: "Scene 12" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene13.webp", alt: "Scene 13" },
    ],

    technicalPlan: {
        title: "How I built it, and where it lives",
        paragraphs: [
            "Red Doors is a 3D game I built in Unity, with all the logic written in code. The final version is meant to live in public as a “Red Doors Station,” like an interactive ad board that people can easily find and play for fun.",
            "The plan is outdoor touchscreen stations that are easy to recognize, with several of them in busy public and tourist spots so they reach the right people.",
        ],
    },

    designProcessResearch: {
        title: "How I got there",
        sections: [
            {
                title: "Research first",
                paragraphs: [
                    "I started with research showing how wealth inequality shapes education and people’s chances in life. Then I read about educational games and games made for social change. The big takeaway: people learn and care more when they take part, not when they just read.",
                    "That research is what led me to a game, a first-person point of view, and a public installation.",
                    "I put everything into a mind map so I could see the whole system, not just the symptoms. Every source, statistic, observation, and idea became a node. Then I connected them, not by what looked interesting, but by what explained the problem better.",
                    "I organized it around five questions: what, why, who, where, and how.",
                ],
            },
        ],
    },

    // ✅ display all mindmap (gallery) — filenames contain spaces, so we URL-encode them
    mindmapMedia: [
        { type: "image", src: "/media/techdesign/redDoors/mind%20map.webp", alt: "Mind map" },
        { type: "image", src: "/media/techdesign/redDoors/mind%20map%202.webp", alt: "Mind map 2" },
        { type: "image", src: "/media/techdesign/redDoors/mind%20map%203.webp", alt: "Mind map 3" },
    ],

    earlyIterations: {
        title: "Early sketches",
        paragraphs: [
            "The hardest part, early on, was turning a big abstract problem into game rules: doors as choices, money as something you can see, and locked paths as the system getting in your way.",
            "I went back and forth on how many stages it needed (I landed on four), how fast it gets harder, and how to show progress clearly in a public space.",
        ],
    },

    // ✅ display all sketches (slider) — ordered
    sketchMedia: [
        { type: "image", src: "/media/techdesign/redDoors/sketch.jpg", alt: "Sketch" },
        { type: "image", src: "/media/techdesign/redDoors/sketch1.webp", alt: "Sketch 1" },
        { type: "image", src: "/media/techdesign/redDoors/sketch2.webp", alt: "Sketch 2" },
        { type: "image", src: "/media/techdesign/redDoors/sketch3.webp", alt: "Sketch 3" },
        { type: "image", src: "/media/techdesign/redDoors/sketch4.webp", alt: "Sketch 4" },
        { type: "image", src: "/media/techdesign/redDoors/sketch5.webp", alt: "Sketch 5" },
    ],

    workSamples: {
        title: "Building and refining",
        paragraphs: [
            "I made and refined the game assets and scenes, then mapped the story in a flowchart so it makes sense from start to finish.",
            "I also thought about how to test it, to see how people react to the installation and whether the message comes through. I’d know it worked if strangers stop to play, if I can see how far they get before the paywalls end their run, if they can explain the message afterward, and if anyone actually donates.",
        ],
    },

    // ✅ process asset building (slider) — ordered
    assetBuildingMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding1.webp", alt: "Asset building 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding2.webp", alt: "Asset building 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding3.webp", alt: "Asset building 3" },
    ],

    // ✅ process unity (slider) — ordered
    unityMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_unity1.webp", alt: "Unity process 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity2.webp", alt: "Unity process 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity3.webp", alt: "Unity process 3" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity4.webp", alt: "Unity process 4" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity5.webp", alt: "Unity process 5" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity6.webp", alt: "Unity process 6" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity7.webp", alt: "Unity process 7" },
    ],

    intendedImpact: {
        title: "What I hope it does",
        paragraphs: [
            "I hope Red Doors starts a chain reaction: people notice, they feel the urgency, and they act, through donations and through bigger social pressure.",
            "It meets people where they already are, out having fun in public, and quietly turns play into a nudge to care.",
        ],
    },

    // ✅ References (must have href for your template)
    // Project paper (2023). Its sources are the References below.
    paper: {
        title: "Red Doors: An Educational Game Installation Addressing Inequality in Education",
        byline: "Felicia Tiffany Hertada · 2023",
        parts: [
            {
                heading: "Overview",
                blocks: [
                    "Red Doors addresses educational inequality caused by the wealth gap. It teaches the public why the issue matters and spreads awareness to everyone through different approaches, encouraging people to work together toward a solution. By placing the player in one perspective, Red Doors takes them on a short educational adventure to understand the issue, and encourages them to contribute through donations to make a positive impact.",
                ],
            },
            {
                heading: "The problem",
                blocks: [
                    "As the world grows, education becomes more important, because a changing world asks for intelligence, skills and character to get by. Yet access to education, and the chance to finish it, is becoming more unequal in many parts of the world. This project focuses on the U.S. Assets and the wealth gap are a primary cause: family wealth is tied to both higher educational achievement and upward mobility in education. The problem grows like a circle. Having assets leads to educational advantages, which lead to more assets, creating a gap that gets harder to close over time.",
                    "Many groups have tried to give underprivileged people equal access to high-quality education and to narrow the social gap, for example through free education and open courses. But the problem can't be solved without action from the wealthy and the government, and without the less privileged seeing how important education is.",
                ],
            },
            {
                heading: "The idea",
                blocks: [
                    "That is why the issue needs to be shared widely, to start a movement in society. Red Doors is built on the evidence that games are effective at teaching people, and is designed with care for its aesthetic value as conceptual art in a site-specific installation. Players see the world in first person, starting their education in elementary school with the mission of finishing college, with each stage shown as a level in the game. At certain stages, players must pay in-game currency, topped up with real money, to unlock doors or get answer keys; otherwise they lose. Besides teaching how much money shapes education, the money players spend goes to education donations for those in need.",
                    "Red Doors was made in the hope that the upper-middle class becomes more aware of the issue and contributes, that the government is pushed to act, and that the less privileged see how crucial education is. Beyond this issue, the game also hopes to help with other global problems indirectly, since education is the foundation of people's character, morals and behavior.",
                ],
            },
            {
                heading: "Context and influences",
                blocks: [
                    "Red Doors brings art and technology together. Art leads the concept, the meaning and the aesthetics of the game, while the 3D models and the game's logic are built in Unity with code. I made this choice believing that the world keeps evolving and that art and technology together represent the future; the combination has helped society, civilization and culture advance since long ago. Using art and technology in education also improves students' visual and transversal competencies and extends their literacy development. This matches my commitment to education issues and my love of making learning enjoyable. My earlier experience making a COVID awareness game and organizing events with a purpose helped me build engaging content for Red Doors.",
                ],
            },
            {
                heading: "What's new about it",
                blocks: [
                    "Interactive art installations have often borrowed from games to create a personal, intimate experience for the player. Most of them focus on exploring the player's own identity or helping them solve problems within themselves. Red Doors takes a different approach. It shares the goal of encouraging self-reflection, but turns that reflection outward, toward the player's environment, by placing them in someone else's life. The idea comes from social media, which not only connects people but also makes them more aware of other people's lives. Red Doors uses the same idea to raise awareness of social issues through an interactive, site-specific game.",
                ],
            },
            {
                heading: "Intended impact",
                blocks: [
                    "The main purpose of Red Doors is to respond to problems caused by differences in social status, and to encourage people from all walks of life to engage with them: by helping fund education, by speaking up about education issues, or simply by understanding why education matters. Through the quizzes inside the game, players learn more about the problem and gain new insight. While they experience how hard it is to pursue education without financial privilege, they can also choose to donate. At certain levels, players need real money to continue, and each level mirrors a real stage of education, from elementary school to college. It is a way of showing the unfortunate fact that some people have to stop their education because of money.",
                    "The project also aims, indirectly, to improve education as the foundation of human life. Education gives people knowledge, skills, information and norms, helps them tell right from wrong through critical thinking about their own environment, and teaches them their part in building a better world. It plays a key role in the economy, politics, science and more, and builds people's ability to solve and prevent injustice, racism and other global issues. Solving education issues means more educated people, a better society and more problem solvers, and it helps prevent violence, crime and injustice while promoting tolerance.",
                ],
            },
            {
                heading: "Who it's for",
                blocks: [
                    "The main audience is people in the middle to upper class, especially those with more economic means. By showing the perspective of people who face financial barriers and can't get the same education, Red Doors aims to raise awareness of educational inequality and start a movement by collecting donations for education. As more people care, more will lead the movement and act for free, equal education for those who need it.",
                    "Red Doors is also a critique of the government, urging it to address its citizens' educational inequality, and a reminder of how much education matters for solving bigger problems in the long run. It signals that this injustice has been noticed, encourages persistence in pursuing education, and shows people from lower socioeconomic backgrounds why education is important.",
                ],
            },
            {
                heading: "Where it lives",
                blocks: [
                    "Because the issue needs a movement across every social class, Red Doors should stand in public spaces that are iconic and easy to find. It should also be where middle- and upper-class people spend their free time and are happy to spend money, so famous tourist spots in the city are ideal. Each installation works like an advertising board called a “Red Doors Station”, designed to catch attention and pull people into the game.",
                    { list: ["Times Square", "Central Park", "Grand Central", "Statue of Liberty", "The Metropolitan Museum of Art (The Met)", "Museum of Modern Art (MoMA)"] },
                    "One main Red Doors Station anchors the rest. It is bigger and more focused on aesthetics so it stands out to passersby, and could become a new attraction in the city. Together, the stations build a recognizable presence across the city, so people know Red Doors for both play and social awareness.",
                ],
            },
            {
                heading: "Game design",
                blocks: [
                    {
                        list: [
                            "Brownish red doors: educational choices in life are unpredictable, and you can't know which one leads to success. A choice can be dangerous, like the color red.",
                            "Four scenes: elementary school, junior high school, senior high school and university.",
                            "The sky: the background moves from sunrise to noon, sunset and night, showing the phases of life and signaling each new level.",
                            "Buttons: how the player talks to the game.",
                            "Money balance: wealth shown as a number. It unlocks some doors and scenes, and shows how hard, almost impossible, education is without money.",
                        ],
                    },
                ],
            },
            {
                heading: "Game flow",
                blocks: [
                    {
                        ordered: true,
                        list: [
                            "The player starts the game.",
                            "The first level is elementary school.",
                            "The player chooses one of three doors.",
                            "The door opens to a question about educational inequality, told from an easy-to-understand perspective.",
                            "A right answer moves the player to the next level; a wrong answer ends the game.",
                            "Level 2 is junior high school, and the player chooses a door again. If a door or answer is locked, the player must pay with their in-game balance, and may or may not feel the urge to pay.",
                            "The in-game balance is limited; it's there to teach the player how to play. When it runs out, the player has to pay real money by tapping a bank card, and that money goes to education donations.",
                            "A right answer continues the game. A wrong answer, or not being able to pay, means the player loses.",
                            "The game repeats this up to the last level, university. Questions get harder and more doors and answers are locked.",
                            "Finish.",
                        ],
                    },
                ],
            },
            {
                heading: "What it means for my practice",
                blocks: [
                    "This project pushes the integration of art and technology, which I believe can grow both worlds. Having grown up around science and technology, with a strong interest in design, I keep exploring how the two connect and making projects that come out of that exploration. Digital art and game making are one of the bridges between them, and both are part of this project.",
                    "Using these media helps me grow as an artist and professional, and gives me a meaningful way to voice my concerns about education. Building the project also shows how people respond to art that uses technology. Watching how they react to an interactive installation about a global issue is a rare chance to understand public sentiment and engagement. Working for a broader audience also teaches me how a game as an art installation communicates with, and resonates across, different perspectives.",
                ],
            },
        ],
    },

    references: [
        {
            label: "Braga et al. (2017) — Wealth Inequality Is a Barrier to Education and Social Mobility",
            href: "https://www.urban.org/research/publication/wealth-inequality-barrier-education-and-social-mobility",
        },
        {
            label: "Pavlin et al. (2015) — From Illustrations to an Interactive Art Installation",
            href: "https://scholar.google.com/scholar?q=From+Illustrations+to+an+Interactive+Art+Installation+Pavlin+Solina",
        },
        {
            label: "Friedlander (1969) — Art and Technology: A Merger of Disciplines",
            href: "https://scholar.google.com/scholar?q=Art+and+Technology:+A+Merger+of+Disciplines+Friedlander+1969",
        },
        {
            label: "Milton (2009) — Installing the Game: Gameplay in the Installation T_Visionarium",
            href: "https://doi.org/10.5250/symploke.17.1-2.0197",
        },
        {
            label: "Noemí & Sedano (2014) — Educational Games for Learning",
            href: "https://doi.org/10.13189/ujer.2014.020305",
        },
        {
            label: "Pavlou (2020) — Art Technology Integration: Digital Storytelling as a Transformative Pedagogy",
            href: "https://doi.org/10.1111/jade.12254",
        },
        {
            label: "Prasad & Gupta — Educational Impact on the Society",
            href: "https://scholar.google.com/scholar?q=Educational+Impact+on+the+Society+Prasad+Gupta",
        },
        {
            label: "Steckel et al. (2015) — Artistic Technology Integration: Stories from Primary and Elementary Classrooms",
            href: "https://doi.org/10.1002/trtr.1356",
        },
        {
            label: "Xiong et al. (2020) — Huge Balls: Ludo-Narrative Elements of a Game Art Installation",
            href: "https://doi.org/10.4108/eai.13-7-2018.163214",
        },
    ],

    // ✅ Links block (exact structure you requested)
    linksBlock: {
        title: "Links",
        links: [
            { label: "Online build", href: "https://bit.ly/reddoorsonline" },
            { label: "Download", href: "https://bit.ly/reddoorsdownload" },
        ],
    },
};
