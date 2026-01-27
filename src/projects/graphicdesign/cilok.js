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
    "A street-food cart brand specializing in chewy tapioca balls called Cilok. " +
    "Usually served on skewers or in cups, paired with bold sauces. " +
    "A classic West Java street snack modernized with quality, hygiene, and eco-minded packaging.",

  // 2) Full page final image (hero)
  finalHero: [
    { type: "image", src: asset("media/graphicdesign/cilok/final.jpg"), alt: "Cilok Brand Sprint — Final Full Page" },
  ],

  // 3) Creative brief (kept in YOUR order 1–8)
  creativeBrief: [
    {
      type: "section",
      title: "1) Product(s) / Service(s)",
      bullets: [
        "Focusing on core product: Cilok Original (steamed/boiled) — bouncy tapioca balls with light savory seasoning.",
        "Signature sauce: Kacang Smoky.",
        "Kecap Pedas: sweet soy, chili flakes, nostalgic.",
        "Gerobak/kiosk/food cart/food truck near schools, campuses, transits.",
        "Event pop-ups & catering (package per 50–200 pax).",
        "Honestly they are everywhere.",
      ],
    },
    {
      type: "section",
      title: "2) Target Audience(s)",
      bullets: [
        "Children and students: snackable, cheap, fast; hangout food while strolling town.",
        "Commuters & office staff: mid-day or after-work bite under 10 minutes.",
        "Families & nostalgia: “elementary school” memory with cleaner, safer prep.",
        "Tourists/food explorers: authentic local street food with clear English cues.",
      ],
    },
    {
      type: "section",
      title: "3) Unique Benefit to Audience",
      bullets: [
        "Sensory satisfaction: perfectly kenyal (bounce without rubbery), warm, saucy.",
        "Custom control: sauce level, add-ons.",
        "Speed + affordability: order-to-hand < 3 minutes; price within daily snack budget.",
        "Assured hygiene & eco wraps: visible prep, gloves, sealed & sustainable containers.",
        "Consistency: measured dough ratios, same taste every visit.",
        "Interaction: social interaction between seller and customer.",
      ],
    },
    {
      type: "section",
      title: "4) Current Audience Perception (typical for cilok street brands)",
      bullets: [
        "Tasty, cheap, nostalgic, “old street food / childhood snack.”",
        "Pain points: different sellers have different tastes for cilok or sauce; hygiene and packaging questionable (unhealthy/too many calories).",
      ],
    },
    {
      type: "section",
      title: "5) Desired Perception (positioning)",
      bullets: [
        "“Modern and upgraded Cilok” — a new generation of aesthetic cilok.",
        "A modern street classic: still authentic flavor + professional standards (SOP, gloves, labeling).",
        "Trusted & Instagrammable: neat cart, clear menu icons (halal, spicy level, eco), friendly service.",
        "Eco-friendly and upgrading local businesses.",
      ],
    },
    {
      type: "section",
      title: "6) Main Competition",
      bullets: [
        "Direct: other cilok carts (cilok isi, cilok kuah), cilor, cireng, batagor, siomay, bakso tusuk, seblak (similar streetfood vendors).",
        "Indirect snacks: takoyaki, corndog, martabak mini, kebab mini, toast, gorengan, boba/tea (modern snacks, not Indo street vendors).",
      ],
    },
    {
      type: "section",
      title: "7) What Distinguishes This Brand",
      bullets: [
        "Product excellence: texture control (standardized dough, batch timer, sauce mastery consistency).",
        "Operational quality: hygiene transparency (gloves, apron, tong use, covered sauce bins).",
        "Consistency SOP: measured scoops, pre-portioned balls, 2-minute reheat/fry windows.",
        "Sustainability: banana leaf/paper/other sustainable packaging; BYO discount sign; pump bottles for sauces (no sachets); segregated waste bins at cart.",
        "Modern convenience & design: QR menu & cashless, order name called on pickup, loyalty rewards, social media.",
        "Clean cart visuals: symbol system for spice levels and eco options—simple, bold, visible.",
      ],
    },
    {
      type: "section",
      title: "8) History / Lore",
      bullets: [
        "Origin from Bandung/West Java, name likely from “aci dicolok” (tapioca poked/skewered).",
        "Became famous for elementary–junior high schoolers (1990s–2000s); now widely adapted (filled, fried, soup, different sauces).",
        "They are everywhere in the street, have a huge target audience, and bring nostalgia.",
      ],
    },
  ],

  // 4) Other images after the brief (what you told)
  processMedia: [
    { type: "image", src: asset("media/graphicdesign/cilok/inspiration.jpg"), alt: "Inspiration" },
    { type: "image", src: asset("media/graphicdesign/cilok/moodboard.jpg"), alt: "Moodboard" },
    { type: "image", src: asset("media/graphicdesign/cilok/sketch.png"), alt: "Sketch" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress1.png"), alt: "Progress 1" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress2.png"), alt: "Progress 2" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress3.png"), alt: "Progress 3" },
    { type: "image", src: asset("media/graphicdesign/cilok/progress4.png"), alt: "Progress 4" },
  ],
};
