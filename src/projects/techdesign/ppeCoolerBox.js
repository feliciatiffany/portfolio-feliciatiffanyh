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
        "Red Doors is an educational game-installation that addresses inequality in education driven by the wealth gap. I designed it as a public-facing interactive experience that teaches the issue through play, then turns that awareness into action through donations. The core idea is simple: if education is treated like something you can buy, the game should make you feel that tension firsthand.",

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
        title: "Core Issue",
        paragraphs: [
            "Growing up, education was always treated as something precious in my family. That made me hyper-aware of how unequal access can be, especially when poverty shapes facilities, environment, and the ability to keep going.",
            "In the U.S. context this project focuses on, wealth is tied to educational achievement and upward mobility, and the cycle reinforces itself over generations. Red Doors responds to that reality by framing education inequality as an experience people can step into, not just a statistic they read and forget.",
        ],
    },

    customers: {
        title: "Customer and Unmet Needs",
        paragraphs: ["This project has more than one “customer,” because the issue itself is systemic."],
        sections: [
            {
                title: "Primary customer: middle-to-upper class public audiences in everyday public spaces",
                paragraphs: [
                    "They often need a reason to stop, care, and understand the issue from a perspective they do not live. They also need a clear path from awareness to action. Red Doors is designed to reach them through recognizable public placement and a first-person narrative that makes the “education journey” feel urgent and personal.",
                ],
            },
            {
                title: "Secondary customer: civic decision-makers and institutions",
                paragraphs: [
                    "They need sustained public pressure and visible signals that the community notices the injustice. Red Doors functions as both critique and public reminder, encouraging policy/program movement, not just individual empathy.",
                ],
            },
            {
                title: "Third audience: underprivileged communities",
                paragraphs: [
                    "They need encouragement and acknowledgment that the struggle is real and seen, and that perseverance is meaningful. The work aims to validate that the barrier is structural, not personal failure.",
                ],
            },
        ],
    },

    whyGame: {
        title: "Why a Game, and Why “Red Doors”",
        paragraphs: [
            "I chose a game because it places people inside a situation instead of asking them to empathize from a distance. The project statement frames Red Doors as both education and awareness-building, designed as a site-specific conceptual art installation.",
            "The doors do two jobs at once. Symbolically, doors represent entering a new chapter and being forced to choose a path without knowing the outcome. Mechanically, doors create suspense and decision pressure, which fits the emotional truth of educational uncertainty when money is scarce.",
            "The red color signals risk, fear, and instability, reinforcing the idea that “choice” is not equally safe for everyone.",
        ],
    },

    experienceFlow: {
        title: "Experience and Game Flow",
        paragraphs: [
            "Red Doors guides the player through education as a staged journey, starting from elementary school and aiming to complete college. Each level includes quiz-based learning moments designed to communicate the issue in an approachable, interactive way.",
            "A key mechanic is friction. In certain stages, players must pay to unlock doors or access answer keys. If they cannot, they lose. This is intentional: it translates financial privilege into gameplay power so players feel how money can decide whether education continues. Donations collected through this mechanic are intended to support education for those in need.",
        ],
        sections: [
            {
                title: "Simplified Flow",
                bullets: [
                    "Start with onboarding and instructions.",
                    "Enter Level 1 (elementary), choose a door, answer a question.",
                    "Progress through higher levels, with increasing difficulty and locked pathways.",
                    "Encounter moments where payment is required to continue, mirroring real-world barriers.",
                    "Reach the final stage (university) or lose when resources run out.",
                ],
            },
        ],
    },

    // flowchart image
    flowchartMedia: [{ type: "image", src: "/media/techdesign/redDoors/flowchart.png", alt: "Red Doors flowchart" }],

    visualDesign: {
        title: "Visual and Interaction Design",
        paragraphs: [
            "I built the world around a clear, repeatable visual language so people can understand it quickly in public.",
            "The core design elements include door objects, money balance indicators, and four scenes that map to education stages (elementary through university). Even the sky shifts across stages (sunrise to night) to signal progression and the “phases of life” metaphor. These choices help the installation communicate without needing long explanations.",
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
        title: "Technical Plan and Final Form",
        paragraphs: [
            "Red Doors is built as a Unity-based 3D game, with algorithms and structure implemented through coding. The final manifestation is intended to live in public as “Red Doors Station,” functioning like an interactive advertisement board that people can find easily and engage with as leisure.",
            "The installation plan emphasizes outdoor interactive touchscreen signage and a physically recognizable station presence, including multiple stations in highly visible public/tourist locations to reach the intended audience.",
        ],
    },

    designProcessResearch: {
        title: "Design Process and Iteration",
        sections: [
            {
                title: "Research and framing",
                paragraphs: [
                    "I began by grounding the project in evidence that wealth inequality shapes education outcomes and mobility, then paired that with research on educational games and games designed for social change. This helped me frame the project around active learning: people learn and care more when they participate, not when they passively read.",
                    "I anchored the approach in research on wealth-driven education inequality and on how educational and social-impact games can teach effectively through active participation. The references and annotated bibliography guided the decision to use a game format, a first-person perspective, and a public installation context.",
                    "In this phase, I mapped all of my research into a mind map so I could see the system, not just the symptoms. I treated it like a living map where every source, statistic, observation, and idea became a node. Then I started bridging connections between them, not based on what looked interesting, but based on what explained the problem more clearly.",
                    "I structured the mind map around five guiding questions: what, why, who, where, and how.",
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
        title: "Early Iterations and System Thinking",
        paragraphs: [
            "Early design work focused on translating the abstract problem into game systems: doors as decision points, money as a visible resource, and locked progress as structural friction.",
            "I iterated on how many stages were needed (four), how difficulty escalates, and how the visual system signals progress clearly in a public setting.",
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
        title: "Work Samples and Refinement",
        paragraphs: [
            "I developed and refined game design assets and scene concepts, then mapped the story logic through a flowchart so the experience reads consistently from beginning to end.",
            "I also considered testing and visualization as part of evaluating how audiences respond to the installation format and message clarity.",
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
        title: "Intended Impact",
        paragraphs: [
            "Red Doors aims to create a chain reaction: raise awareness, build urgency, and encourage action through both individual donations and broader social pressure.",
            "It is designed to meet people where they already are, in public leisure spaces, and quietly turn entertainment into a civic prompt.",
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
