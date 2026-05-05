// src/projects/techdesign/unseenCity.js

export default {
    slug: "unseen-city",
    title: "Seeing the Unseen City (City as a System)",

    meta: {
        category: ["Data Visualization", "Narrative Interactive Website", "UI/UX Design"],
        year: "2025",
        tools: ["Eleventy/ @11ty", "Microsoft Excel", "Procreate", "Figma"],
    },

    // Render order (reorder freely)
    sections: [
        { kind: "intro" },

        // links immediately after intro
        { kind: "desc", dataPath: "linksBlock" },

        // documentation as slider
        { kind: "media", title: "Website Documentation", layout: "slider", itemsPath: "documentation" },

        // sketch + data as gallery
        { kind: "media", title: "Sketch + Data", layout: "gallery", itemsPath: "sketchAndData" },

        { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

        { kind: "references", title: "References", itemsPath: "references" },
    ],

    intro:
        "This project investigates how cities are shaped by overlapping layers—people, biomes, weather systems, infrastructure, and digital traces that are both visible and invisible. Inspired by Mark Graham’s idea of the city as a palimpsest, it treats urban experience as something continually rewritten, yet still marked by older data, images, maps, narratives, and histories.\n\n" +
        "To “unravel” these layers, I selected a Site of Interest and conducted field research by collecting grounded “data points” through observation and documentation. I translated these findings into a set of creative outputs—experience visualization, narrative storytelling, and a site data document—capturing the phenomenological feel of the place while revealing the hidden structures that shape how it is lived and perceived.",

    // This is the block that appears immediately after intro
    linksBlock: {
        title: "Project Links",
        links: [
            {
                label: "Final interactive website (Eleventy/ @11ty)",
                href: "https://feliciatiffany.github.io/unseencity-datavisualization-eleventyjs/",
            },
            {
                label: "Site of Interest (DOCS)",
                href: "https://docs.google.com/document/d/1Ja7cBNjDMRh3P-mxUDgIrOOkdvqiYqhxrirKWH6TD4s/edit?usp=sharing",
            },
            {
                label: "Presentation (Canva)",
                href: "https://www.canva.com/design/DAG1QVsxI30/ItUzTEXgNgDy-AjGfet6_w/edit?utm_content=DAG1QVsxI30&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
            },
            {
                label: "Data spreadsheet (daily observations)",
                href: "https://docs.google.com/spreadsheets/d/1Nf-gYhtv32Ngo7WtyNAsStNs5gG6nhraUrE-64GD_EI/edit?usp=sharing",
            },
        ],
    },

    // Website documentation slider
    documentation: [
        { type: "image", src: "/media/techdesign/unseenCity/documentation1.png", alt: "Website documentation 1" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation2.png", alt: "Website documentation 2" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation3.png", alt: "Website documentation 3" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation4.png", alt: "Website documentation 4" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation5.png", alt: "Website documentation 5" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation6.png", alt: "Website documentation 6" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation7.png", alt: "Website documentation 7" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation8.png", alt: "Website documentation 8" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation9.png", alt: "Website documentation 9" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation10.png", alt: "Website documentation 10" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation11.png", alt: "Website documentation 11" },
        { type: "image", src: "/media/techdesign/unseenCity/documentation12.png", alt: "Website documentation 12" },
    ],

    // Sketch and data as a gallery
    sketchAndData: [
        { type: "image", src: "/media/techdesign/unseenCity/sketch.png", alt: "Sketch" },
        { type: "image", src: "/media/techdesign/unseenCity/data.png", alt: "Data mapping" },
    ],

    // Two-column content (overview + abstract + process)
    descLeft: {
        title: "Abstract",
        paragraphs: [
            "When a city becomes more than a system with hierarchies or the output of data, life can feel more meaningful. A city is not only a stack of buildings, people, ecosystems, and transit links, but a gathering of stories from millions of main characters and points of view. Each day is a good day or a bad day for someone. It reminds us that what appears as data is, at times, someone’s life.",
            "The weave of observed data and lived interaction opens a new way of seeing for anyone, and for me from my bedroom window. The mix and connectedness of things—from the state of the sidewalk, the neighbor across the window, the weather, the air, the intersubjectivity of the surroundings, down to something as simple as a bird alighting—can offer a fresh view of a place I see every day. It teaches the skill of seeing, and seeing what is unseen.",
        ],
    },

    descRight: {
        title: "Process",
        sections: [
            {
                title: "1) Site of Interest",
                paragraphs: [
                    "After considering three possible locations, I chose the window of my apartment as my Site of Interest (SOI). The SOI becomes a daily lens for observing weather, neighbors, birds, sidewalk conditions, sound, and social movement.",
                ],
            },
            {
                title: "2) Proposal",
                paragraphs: [
                    "Interpretation of the prompt: the city as a collection of stories (inspired by Invisible Cities). The city becomes a layered set of POVs—millions of main characters.",
                    "Chosen medium: an interactive website that acts like a book, allowing visitors to explore different dates and story fragments through visuals.",
                ],
            },
            {
                title: "3) Sketch + Data Visualization",
                paragraphs: [
                    "The project translates drawing-derived data—color, line, transparency, shape, stroke—into a single canvas designed to reflect the atmosphere of each observation period.",
                    "Example: on Oct 26, 2025, the observation described a quiet, starless night, yet a happy couple walked together. The canvas captures this contrast through flowing lines for cold wind, and color variation mapped from the recorded data.",
                    "The visuals were curated into a website built with eleventy/ @11ty that works as an interactive digital library: each date reveals both the data visualization and the story behind it.",
                ],
            },
        ],
    },

    references: [
        { label: "The Pudding — Introducing Scrollama", href: "https://pudding.cool/process/introducing-scrollama/" },
        { label: "RAWGraphs", href: "https://rawgraphs.io/" },
        { label: "BBC Sound Effects", href: "https://sound-effects.bbcrewind.co.uk/" },
        { label: "Freesound", href: "https://freesound.org/" },
        { label: "Giorgia Lupi — My 2020 in Data (so far)", href: "https://giorgialupi.com/my-2020-in-data-so-far" },

        {
            label: "Laura Kurgan (via Columbia GSAPP) — Spatial Information Design Lab (SIDL) projects",
            href: "https://www.arch.columbia.edu/labs/sidl"
        },
        {
            label: "Italo Calvino — Invisible Cities (1972)",
            href: "https://en.wikipedia.org/wiki/Invisible_Cities"
        }, {
            label: "Smart City critique — “The Smart City and the City of the Smart” (Greenfield, 2013)",
            href: "https://www.thecityofthesmart.com/"
        },
    ],
};
