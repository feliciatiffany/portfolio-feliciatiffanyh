// src/projects/graphicdesign/cilok.js

const base = import.meta.env.BASE_URL;
const asset = (p) => `${base}${String(p).replace(/^\//, "")}`;

export default {
  slug: "cilok",
  title: "Cilok — Modern Street-Food Cart Brand Sprint",

  meta: {
    category: ["Branding", "Merchandise", "Communication Design", "Brand Strategy"],
    year: "2025",
    tools: ["Adobe Illustrator", "Photoshop"],
  },

  // ✅ Page flow exactly like you described
  sections: [
    { kind: "intro" },

    // full-page final image right after overview
    { kind: "media", title: "Brand Sprint — Final", layout: "stack", itemsPath: "finalHero" },

    // Creative brief (single column, ordered)
    { kind: "text", title: "Creative Brief", textPath: "creativeBrief" },

    // then the rest of the images
    { kind: "media", title: "Process", layout: "stack", itemsPath: "processMedia" },
  ],

  // 1) Overview
  intro:
    "A brand sprint for a street-food cart selling cilok, the chewy tapioca balls so many Indonesians grew up with. " +
    "You get them on skewers or in cups, with bold sauces. " +
    "I wanted to give this classic West Java snack a modern upgrade: better quality, cleaner prep, and eco-friendly packaging.",

  quote: "Giving a childhood street snack a modern glow-up",

  // 2) Full page final image (hero)
  finalHero: [
    { type: "image", src: asset("media/graphicdesign/cilok/final.webp"), alt: "Cilok Brand Sprint — Final Full Page" },
  ],

  // 3) Creative brief (kept in YOUR order 1–8)
  creativeBrief: [
    {
      type: "section",
      title: "1) What we sell",
      bullets: [
        "The star: Cilok Original (steamed or boiled). Bouncy tapioca balls with a light savory seasoning.",
        "Signature sauce: Kacang Smoky.",
        "Kecap Pedas: sweet soy and chili flakes. Tastes like nostalgia.",
        "Sold from a gerobak, kiosk, food cart, or food truck near schools, campuses, and transit stops.",
        "Event pop-ups and catering (packages for 50–200 pax).",
        "Honestly, cilok is everywhere.",
      ],
    },
    {
      type: "section",
      title: "2) Who it’s for",
      bullets: [
        "Kids and students: cheap, fast, and easy to snack on while hanging out around town.",
        "Commuters and office workers: a quick bite at lunch or after work, in under 10 minutes.",
        "Families: that “elementary school” memory, but with cleaner, safer prep.",
        "Tourists and food explorers: real local street food, with clear English cues.",
      ],
    },
    {
      type: "section",
      title: "3) Why people would love it",
      bullets: [
        "It just feels good to eat: perfectly kenyal (bouncy, not rubbery), warm, and saucy.",
        "You pick your sauce level and add-ons.",
        "Fast and cheap: in your hand in under 3 minutes, priced for a daily snack budget.",
        "You can see it’s clean: open prep, gloves, sealed and sustainable containers.",
        "Same taste every visit, thanks to measured dough ratios.",
        "You still get to chat with the seller, which is half the fun of street food.",
      ],
    },
    {
      type: "section",
      title: "4) How people see cilok carts now",
      bullets: [
        "Tasty, cheap, nostalgic. The “old street food / childhood snack.”",
        "The problems: every seller’s cilok and sauce taste different, and hygiene and packaging can be questionable (people worry it’s unhealthy or too many calories).",
      ],
    },
    {
      type: "section",
      title: "5) How I want people to see it",
      bullets: [
        "“Modern, upgraded cilok”: a new generation of aesthetic cilok.",
        "A modern street classic: the same authentic flavor, with real standards (SOP, gloves, labeling).",
        "Trustworthy and Instagrammable: a neat cart, clear menu icons (halal, spice level, eco), and friendly service.",
        "Eco-friendly, and a way to level up local businesses.",
      ],
    },
    {
      type: "section",
      title: "6) The competition",
      bullets: [
        "Direct: other cilok carts (cilok isi, cilok kuah), plus cilor, cireng, batagor, siomay, bakso tusuk, and seblak. Basically the same kind of street vendor.",
        "Indirect: takoyaki, corndogs, mini martabak, mini kebab, toast, gorengan, boba and tea. Modern snacks, but not Indo street vendors.",
      ],
    },
    {
      type: "section",
      title: "7) What makes this one different",
      bullets: [
        "Texture done right: standardized dough, a batch timer, and sauces that taste the same every time.",
        "Hygiene you can see: gloves, apron, tongs, covered sauce bins.",
        "Simple SOPs: measured scoops, pre-portioned balls, 2-minute reheat or fry windows.",
        "Less waste: banana leaf, paper, or other sustainable packaging; a bring-your-own discount sign; pump bottles instead of sauce sachets; sorted trash bins at the cart.",
        "Modern and convenient: QR menu, cashless payment, your name called at pickup, loyalty rewards, social media.",
        "A clean cart look: a symbol system for spice levels and eco options. Simple, bold, easy to spot.",
      ],
    },
    {
      type: "section",
      title: "8) A bit of cilok history",
      bullets: [
        "It comes from Bandung, West Java. The name probably comes from “aci dicolok” (tapioca that’s poked or skewered).",
        "It got famous with elementary and junior high kids in the 1990s–2000s. Now there are tons of versions: filled, fried, in soup, with all kinds of sauces.",
        "Cilok is on every street, everyone eats it, and it brings back so many memories. Such a fun one to rebrand.",
      ],
    },
  ],

  // 4) Other images after the brief (what you told)
  processMedia: [
    { type: "image", src: asset("media/graphicdesign/cilok/inspiration.webp"), alt: "Inspiration" },
    { type: "image", src: asset("media/graphicdesign/cilok/moodboard.webp"), alt: "Moodboard" },
    { type: "image", src: asset("media/graphicdesign/cilok/sketch.webp"), alt: "Sketch" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress1.webp"), alt: "Progress 1" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress2.webp"), alt: "Progress 2" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress3.webp"), alt: "Progress 3" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress4.webp"), alt: "Progress 4" },
  ],
};
