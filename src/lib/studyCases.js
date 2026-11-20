// Case studies: the projects told as a full story. Listed at /case-study, newest first.
// `project` is the slug of the project page it opens (at /case-study/<slug>); without one the
// item is still being written and can't be opened. `status` is Shipped, Concept or In progress; the box shows it as "Shipped / 2026".
export const STUDY_CASES = [
  {
    slug: "meetup",
    project: "meetup", // told as a story: src/studies/meetup.js
    title: "Meetup, person to person",
    status: "Concept",
    year: 2026,
    summary:
      "Meetup is easy to join the first time, but hard to stay on. I looked at how person-to-person relationships between members and organizers could invite people in and give them a reason to come back.",
    image: {
      type: "video",
      src: "/media/study/meetup/thumbnail.mp4",
      alt: "Meetup notifications: Fany invites you to Mahjong Mixer Community, Owen joins Lucky Cat Mahjong, Jorge invites you to join on Sunday",
    },
  },
  {
    slug: "tell-ai",
    project: "tell-ai",
    title: "TellAI",
    status: "Shipped",
    year: 2026,
    summary:
      "A screen-free AI toy inside a rotary phone. Kids dial a character and an emotion, then talk with AI out loud. I looked at how making AI physical, slower and easier to question could help kids and parents meet it more honestly.",
    image: {
      type: "video",
      src: "/media/techdesign/tellai/thumbnail.web.mp4",
      alt: "TellAI: a rotary phone AI storytelling toy for kids",
    },
  },
  {
    slug: "sidequesting",
    title: "Sidequesting",
    status: "In progress",
    year: 2026,
  },
  {
    slug: "wehearyou",
    project: "wehearyou",
    title: "We Hear You",
    status: "Shipped",
    year: 2026,
    summary:
      "A survey turned into a place you walk through with your hands. I looked at how gesture, pacing and a soft space can make sharing honest feelings with strangers feel safe, and answering questions feel inviting instead of forced.",
    image: { src: "/media/posters/techdesign-wehearyou-wehearyou-thumbnail2.jpg", alt: "We Hear You: a soft, quiet landscape explored by gesture" },
  },
];

export const isStudyCase = (slug) => STUDY_CASES.some((c) => c.project === slug);
