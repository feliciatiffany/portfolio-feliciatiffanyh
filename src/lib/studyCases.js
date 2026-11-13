// Study cases: the projects told as a full story. Listed at /study-case, newest first.
// `project` is the slug of the project page it opens (at /study-case/<slug>); without one the
// item is still being written and can't be opened. `status` is Shipped, Concept or In progress; the box shows it as "Shipped / 2026".
export const STUDY_CASES = [
  {
    slug: "meetup",
    title: "Meetup",
    status: "In progress",
    year: 2026,
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
