// Flip books: one page each at /book/:slug, nothing on it but the book.
// Pages are cut from one long carousel image, in reading order. The first page is the cover.
export const BOOKS = {
  aiesec: {
    title: "AIESEC · Summer 2024",
    alt: "Summer 2024 with AIESEC: teaching kids in Yogyakarta and the people who made it",
    pages: [1, 2, 3, 4, 5].map((n) => `/media/organization/aiesec/page-${n}.webp`),
    link: { label: "aiesec.org", href: "https://aiesec.org/" },
  },
};
