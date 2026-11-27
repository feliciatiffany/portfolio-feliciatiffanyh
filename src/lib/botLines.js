// What Fany bot says. Edit freely.
// A line is a string, or { text, keys: ["←", "→"] } to show little keycaps after it.
// It picks from the lines for the page it is on and the thing it is standing on, never repeating
// one until the rest have been said. Keep them short: each stays up long enough to read once.

const ARROWS = { text: "Move me with the arrow keys.", keys: ["←", "↑", "→", "↓"] };

// ---- homepage, by where it stands ----
const HOME = {
  photo: [
    "Tap me to ask anything about Fany.",
    ARROWS,
    "I sit on her head. She said it’s fine.",
    "Click the photo and I get built all over again.",
    "I don’t roll. I tip. It’s a lifestyle.",
    "I used to be a placeholder. Then I got promoted.",
    "Scroll down. The case studies are the good part.",
  ],
  title: [
    "Standing on her name. Feels official.",
    "This sentence is holding me up. Literally.",
    "Words are solid here. I checked.",
    "Walk me off the end and I fall. That’s physics.",
    "She keeps retyping that last bit. I’ve stopped asking.",
  ],
  line: [
    { text: "Thin lines are ledges. I can drop through.", keys: ["↓"] },
    { text: "Too high to hop? I build stairs.", keys: ["↑"] },
    "A line this thin and it still holds me. Good line.",
  ],
  picture: [
    (l) => (l ? `I’m standing on ${l}. Carefully.` : "I’m standing on weeks of work. Carefully."),
    (l) => (l ? `${l} is under my feet. Open it.` : "There’s a whole story under my feet. Open it."),
    "The view is good from up here.",
  ],
  links: [
    "Scroll on. I’ll keep up.",
    "Email is the fastest way to reach her.",
    "Not sure where to start? The first case study.",
    ARROWS,
    "These links go to the real Fany. I’m the understudy.",
    "Hold an arrow and watch me go.",
  ],
  ground: [
    { text: "Bottom of the page. Stairs, please.", keys: ["↑"] },
    "It’s quiet down here.",
  ],
  stairs: ["I made these myself.", "They fold away when I’m done."],
};

// ---- every other page: a few lines about the page, and a few about where it stands ----
const PAGE = {
  playground: [
    "This is where the side quests live.",
    "Not client work. Just curiosity.",
    "The dots on the left filter all of this.",
    "Some of these started as a joke. Then she finished them.",
  ],
  blog: [
    "She wrote these long before I existed.",
    "Short stories and thoughts. Mostly late at night, I think.",
    "Pick a year on the left.",
    "The 2022 ones are my favourite. Don’t tell 2023.",
  ],
  about: [
    "This page is about her. I’m only in the margin.",
    "The timeline is further down. Scroll, it’s a long one.",
    "Matcha and Ghibli. It checks out.",
    "She means the part about curiosity.",
  ],
  "case-study": [
    "This is the long version. Worth it.",
    "The list on the left follows you down the page.",
    "Scroll slowly. The research is the good part.",
    "She redrew those screens more times than she’ll admit.",
  ],
  work: [
    "One project, start to finish.",
    "Made with her own hands. And a lot of cables.",
    "The pictures get bigger if you tap them.",
  ],
  other: ["I follow her around the whole site.", ARROWS, "Tap me to ask anything about Fany."],
};
const PLACE = {
  links: ["I live down here on the links.", ARROWS, { text: "Something above? I’ll build stairs.", keys: ["↑"] }],
  heading: [(l) => (l ? `“${l}”. I’m standing on it.` : "A heading makes a good floor."), "Words are solid here. I checked."],
  picture: ["I’m standing on a picture. Carefully.", "The view is good from up here."],
  caption: ["Small print. Still holds my weight."],
  ground: ["Bottom of the page.", { text: "Stairs, please.", keys: ["↑"] }],
  stairs: ["I made these myself."],
};

// ---- things that happen to it ----
const EVENT = {
  // it walked into a picture, or stomped on one
  hit: [
    "You know Fany worked hard for this?",
    "You should take a look. This is where everything started.",
    (l) => (l ? `${l}. Open it, I’ll wait.` : "Open it. I’ll wait."),
    (l) => (l ? `Don’t tell the others, but ${l} is my favourite.` : "Don’t tell the others, but this one is my favourite."),
    "I knocked. Someone should go in.",
  ],
  hitPending: ["This one isn’t finished yet. Neither am I.", "Still in progress. I checked by walking into it."],
  wall: ["Words are solid. I can’t walk through them.", "That’s a wall of text. Literally.", "Ow. Solid."],
  edge: ["That’s the edge of the page.", "Nothing past here. I looked."],
  fidget: ["Just stretching.", "Legs still work.", "Had to move. You know how it is."],
  wake: ["I wasn’t sleeping. I was caching.", "Sorry. Where were we?", "Resting my eyes. Both of them."],
};

const resolve = (pool, label) => pool.map((l) => (typeof l === "function" ? l(label) : l));

// `page` is "home", "playground", "blog", "about", "case-study", "work" or "other"
export function botLines(page) {
  return ({ place, label, event, pending }) => {
    if (event === "hit") return resolve(pending ? EVENT.hitPending : EVENT.hit, label);
    if (event) return resolve(EVENT[event] || [], label);
    if (page === "home") return resolve(HOME[place] || HOME.photo, label);
    // mostly about the page; when it's somewhere unusual, about where it stands
    const here = PLACE[place] || [];
    const about = PAGE[page] || PAGE.other;
    return resolve(place === "links" ? [...about, ...here] : [...here, ...about.slice(0, 2)], label);
  };
}
