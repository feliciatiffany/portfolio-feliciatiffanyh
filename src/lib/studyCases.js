// Study cases: the projects told as a full story. Listed at /study-case, newest first.
// `project` is the slug of the project page it opens (at /study-case/<slug>); without one the
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
    image: { src: "/media/study/meetup/cover.webp", alt: "Four redesigned Meetup screens: Explore, the event page, Notifications and the after-event check-in" },
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
