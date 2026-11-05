// src/projects/techdesign/redDoors.js

export default {
    slug: "redDoors",
    title: "Red Doors",

    meta: {
        category: ["Educational Game", "Social Impact", "Unity 3D", "Game Prototype"],
        year: "2025",
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

        // References then Links (as you wrote)
        { kind: "references", title: "References", itemsPath: "references" },

    ],

    intro:
        "Red Doors is an educational game installation about how the wealth gap shapes who gets an education. I designed it for public spaces: you learn about the issue by playing, and then you can turn that awareness into action by donating. The idea is simple. If education is treated like something you can buy, the game should make you feel that.",
    quote: "If education can be bought, the game should make you feel it",

    youtubes: [
        {
            title: "Gameplay / Project Walkthrough",
            videoId: "xaFkOV0Cfgc",
        },
    ],

    // ✅ put all slide picture (slider) — ordered
    slides: [
        { type: "image", src: "/media/techdesign/redDoors/Slide1.jpeg", alt: "Slide 1" },
        { type: "image", src: "/media/techdesign/redDoors/Slide2.jpeg", alt: "Slide 2" },
        { type: "image", src: "/media/techdesign/redDoors/Slide3.jpeg", alt: "Slide 3" },
        { type: "image", src: "/media/techdesign/redDoors/Slide4.jpeg", alt: "Slide 4" },
        { type: "image", src: "/media/techdesign/redDoors/Slide5.jpeg", alt: "Slide 5" },
        { type: "image", src: "/media/techdesign/redDoors/Slide6.jpeg", alt: "Slide 6" },
        { type: "image", src: "/media/techdesign/redDoors/Slide7.jpeg", alt: "Slide 7" },
        { type: "image", src: "/media/techdesign/redDoors/Slide8.jpeg", alt: "Slide 8" },
        { type: "image", src: "/media/techdesign/redDoors/Slide9.jpeg", alt: "Slide 9" },
        { type: "image", src: "/media/techdesign/redDoors/Slide10.jpeg", alt: "Slide 10" },
        { type: "image", src: "/media/techdesign/redDoors/Slide11.jpeg", alt: "Slide 11" },
        { type: "image", src: "/media/techdesign/redDoors/Slide12.jpeg", alt: "Slide 12" },
        { type: "image", src: "/media/techdesign/redDoors/Slide13.jpeg", alt: "Slide 13" },
        { type: "image", src: "/media/techdesign/redDoors/Slide14.jpeg", alt: "Slide 14" },
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
            "I picked a game because it puts you inside the situation instead of asking you to feel for someone from far away. Red Doors is meant to teach and raise awareness, as a site-specific art installation.",
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
    flowchartMedia: [{ type: "image", src: "/media/techdesign/redDoors/flowchart.png", alt: "Red Doors flowchart" }],

    visualDesign: {
        title: "How it looks",
        paragraphs: [
            "I kept the visuals clear and repetitive on purpose, so people passing by can get it fast.",
            "The main pieces are the doors, a money balance, and four scenes for each school stage (elementary to university). Even the sky changes from sunrise to night as you go, like the “phases of life.” That way the game explains itself without long text.",
        ],
    },

    // ✅ display all process_scene (ordered)
    sceneMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_scene1.png", alt: "Scene 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene2.png", alt: "Scene 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene3.png", alt: "Scene 3" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene4.png", alt: "Scene 4" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene5.png", alt: "Scene 5" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene6.png", alt: "Scene 6" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene7.png", alt: "Scene 7" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene8.png", alt: "Scene 8" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene9.png", alt: "Scene 9" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene10.png", alt: "Scene 10" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene11.png", alt: "Scene 11" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene12.png", alt: "Scene 12" },
        { type: "image", src: "/media/techdesign/redDoors/process_scene13.png", alt: "Scene 13" },
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
        { type: "image", src: "/media/techdesign/redDoors/mind%20map.png", alt: "Mind map" },
        { type: "image", src: "/media/techdesign/redDoors/mind%20map%202.png", alt: "Mind map 2" },
        { type: "image", src: "/media/techdesign/redDoors/mind%20map%203.jpg", alt: "Mind map 3" },
    ],

    earlyIterations: {
        title: "Early sketches",
        paragraphs: [
            "Early on, I was figuring out how to turn a big abstract problem into game rules: doors as choices, money as something you can see, and locked paths as the system getting in your way.",
            "I went back and forth on how many stages it needed (I landed on four), how fast it gets harder, and how to show progress clearly in a public space.",
        ],
    },

    // ✅ display all sketches (slider) — ordered
    sketchMedia: [
        { type: "image", src: "/media/techdesign/redDoors/sketch.jpg", alt: "Sketch" },
        { type: "image", src: "/media/techdesign/redDoors/sketch1.png", alt: "Sketch 1" },
        { type: "image", src: "/media/techdesign/redDoors/sketch2.png", alt: "Sketch 2" },
        { type: "image", src: "/media/techdesign/redDoors/sketch3.png", alt: "Sketch 3" },
        { type: "image", src: "/media/techdesign/redDoors/sketch4.png", alt: "Sketch 4" },
        { type: "image", src: "/media/techdesign/redDoors/sketch5.png", alt: "Sketch 5" },
    ],

    workSamples: {
        title: "Building and refining",
        paragraphs: [
            "I made and refined the game assets and scenes, then mapped the story in a flowchart so it makes sense from start to finish.",
            "I also thought about how to test it, to see how people react to the installation and whether the message comes through.",
        ],
    },

    // ✅ process asset building (slider) — ordered
    assetBuildingMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding1.png", alt: "Asset building 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding2.png", alt: "Asset building 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_assetBuilding3.png", alt: "Asset building 3" },
    ],

    // ✅ process unity (slider) — ordered
    unityMedia: [
        { type: "image", src: "/media/techdesign/redDoors/process_unity1.png", alt: "Unity process 1" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity2.png", alt: "Unity process 2" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity3.png", alt: "Unity process 3" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity4.png", alt: "Unity process 4" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity5.png", alt: "Unity process 5" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity6.png", alt: "Unity process 6" },
        { type: "image", src: "/media/techdesign/redDoors/process_unity7.png", alt: "Unity process 7" },
    ],

    intendedImpact: {
        title: "What I hope it does",
        paragraphs: [
            "I hope Red Doors starts a chain reaction: people notice, they feel the urgency, and they act, through donations and through bigger social pressure.",
            "It meets people where they already are, out having fun in public, and quietly turns play into a nudge to care.",
        ],
    },

    // ✅ References (must have href for your template)
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
