// src/projects/techdesign/protocolNation.js

export default {
  slug: "protocol-nation",
  title: "Protocol Nation - Emerging Futures",

  meta: {
    category: ["Projection Mapping", "Website Design", "UI/UX", "Art Installation"],
    year: "2025",
    tools: ["React", "Kantan: Touch Designer", "Figma", "Adobe Premiere Pro"],
  },

  // Render order (reorder freely)
  sections: [
    { kind: "intro" },

    { kind: "youtube", title: "Projection Mapping Demo", videoIdPath: "row6.youtube.videoId" },


    { kind: "media", title: "Documentation", layout: "gallery", itemsPath: "media" },

    { kind: "twoCol", leftPath: "descLeft", rightPath: "descRight" },

    { kind: "media", title: "Website Screens", layout: "slider", itemsPath: "row6.websiteScreens.media" },


    { kind: "references", title: "References", itemsPath: "references" },
  ],

  intro:
    "This project explores how current social phenomena and emerging technologies might evolve, using design to extrapolate a plausible future scenario. The timeframe is intentionally open-ended, allowing the work to extend as far into the future as needed to support the concept.\n\n" +
    "The goal of Protocol Nation is to portray a fully formed world where a human physical self can be transferred into a digital world on a screen (The full world description is in the project abstract). The projection mapping installation illustrates a day in the life of a “Surver” (a human who lives on a screen), showing how they can manipulate the digital world and coexist within it. The website acts as a prologue to the installation, setting the mood, introducing the world, and standing on its own as an interactive React experience. It also includes live documentation at the end."+"\n\n" +
    "Rather than focusing only on individual tools, interfaces, or prototypes, the project emphasizes the broader networks those artifacts belong to: the relationships, infrastructures, behaviors, and rules that make the world function as a living ecosystem.",

  media: [
    { type: "image", src: "/media/techdesign/protocolNation/documentation1.JPG", alt: "Documentation 1" },
    { type: "image", src: "/media/techdesign/protocolNation/documentation2.JPG", alt: "Documentation 2" },
    { type: "image", src: "/media/techdesign/protocolNation/documentation3.JPG", alt: "Documentation 3" },
    { type: "image", src: "/media/techdesign/protocolNation/documentation4.JPG", alt: "Documentation 4" },
    { type: "image", src: "/media/techdesign/protocolNation/documentation5.JPG", alt: "Documentation 5" },
    { type: "image", src: "/media/techdesign/protocolNation/documentation6.JPG", alt: "Documentation 6" },
  ],

  descLeft: {
    title: "Project Abstract",
    paragraphs: [
      "In this future, servers have become a new kind of world: an inhabited digital universe. Humans are able to enter this digital realm and live inside it as interface-based beings. Movement no longer happens primarily through streets, vehicles, or physical routes, but through screens and network connections. Transportation has been redefined as routing, switching, and streaming across layers of infrastructure rather than moving bodies through space.",
      "This transformation began with a simple pressure: there was no more room. As the human population grew beyond the planet’s physical capacity, the demand for habitable space became impossible to satisfy with architecture, urban planning, or planetary colonization alone. In response, scientists developed a way to convert physical matter into digital matter, allowing consciousness, objects, and environments to be encoded and reconstituted inside vast server ecologies.",
      "What was once unimaginable, stepping out of a physical body and into a fully interactive interface form, has become an everyday reality. People design the “shape” of their digital selves the way previous generations chose clothes or built houses. Neighborhoods become clusters of servers; cities become networks of layered interfaces; borders are replaced by firewalls and protocols. Energy, bandwidth, and computation are the new land, water, and air.",
      "This shift radically changes what it means to govern and organize life. Because digital matter is copyable, editable, and programmable, humanity now has far more to control: identities, environments, memories, and even local laws can be adjusted through code. Some communities treat this as a chance to build fairer, more sustainable social systems, while others use it to centralize power and tighten control. The everyday question is no longer just where you live, but on which server, under which rules, and with which version of yourself.",
      "In this world, the boundary between “online” and “offline” has disappeared. The server is not just a tool that stores data; it has become the primary territory in which human experience unfolds.",
    ],
  },

  descRight: {
    sections: [
      {
        title: "Final Website + Documentation Video",
        paragraphs: [
          "This website is a scroll-based narrative interface that introduces the world of Protocol Nation, where servers function as inhabited territory.",
          "Built with React and CSS, it uses full-screen snap-scrolling “lines” to pace the story like digital poetry, revealing one sentence or animation per viewport.",
          "Subtle animation, timed video, and ambient sound are integrated to evoke routing, loading, and bodies becoming interfaces. Technically, the site experiments with viewport-height sections, scroll snapping, and media synchronization.",
          "It functions as a conceptual “prologue” to the projection mapping, framing the visitor as already inside the server world.",
        ],
      },
      {
        title: "Links",
        links: [
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

  row6: {
    websiteScreens: {
      title: "Website Screens",
      layout: "slider",
      media: [
        { type: "image", src: "/media/techdesign/protocolNation/website1.png", alt: "Website 1" },
        { type: "image", src: "/media/techdesign/protocolNation/website2.png", alt: "Website 2" },
        { type: "image", src: "/media/techdesign/protocolNation/website3.png", alt: "Website 3" },
        { type: "image", src: "/media/techdesign/protocolNation/website4.png", alt: "Website 4" },
        { type: "image", src: "/media/techdesign/protocolNation/website5.png", alt: "Website 5" },
        { type: "image", src: "/media/techdesign/protocolNation/website6.png", alt: "Website 6" },
        { type: "image", src: "/media/techdesign/protocolNation/website7.png", alt: "Website 7" },
      ],
    },

    youtube: {
      title: "Projection Mapping Demo",
      videoId: "gt0YIVi72z4",
      url: "https://www.youtube.com/watch?v=gt0YIVi72z4",
    },
  },

  references: [
    { label: "Introducing Scrollama — The Pudding", href: "https://pudding.cool/process/introducing-scrollama/" },
    { label: "My 2020 in Data (so far) — Giorgia Lupi", href: "https://giorgialupi.com/my-2020-in-data-so-far" },
    { label: "Data Viz Project", href: "https://datavizproject.com/" },
    { label: "Scrollytelling on Steroids with Scroll State Queries — CSS-Tricks", href: "https://css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries/" },
    { label: "scrollyvideo.js", href: "https://scrollyvideo.js.org/" },
    { label: "ScrollyTeller — IHME UW", href: "https://ihmeuw.github.io/ScrollyTeller/" },
    { label: "Speculative Biologies (2008) — Pinar Yoldas", href: "https://www.pinaryoldas.info/WORK/Speculative-Biologies-2008" },
    { label: "Ecosystem of Excess (2014) — Pinar Yoldas", href: "https://www.pinaryoldas.info/WORK/Ecosystem-of-Excess-2014" },
    { label: "99¢ Futures (2013) — Extrapolation Factory", href: "https://extrapolationfactory.com/99-Futures" },
    { label: "Not The Only One (2018) — Stephanie Dinkins", href: "https://www.stephaniedinkins.com/ntoo.html" },
    { label: "The Anthropocene Cookbook (2022) — Zane Cerpina & Stahl Stenslie", href: "https://anthropocenecookbook.com/chapters/" },
  ],
};
