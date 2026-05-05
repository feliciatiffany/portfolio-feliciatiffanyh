// src/lib/projects.js (or wherever this file lives)

import tech from "../data/tech.json";
import digital from "../data/digital.json";
import graphic from "../data/graphic.json";
import others from "../data/others.json";

// Merge all projects into one list
const ALL = [
  ...(tech.projects || []),
  ...(digital.projects || []),
  ...(graphic.projects || []),
  ...(others.projects || []),
];

// Optional: merged categories (if you ever need it)
export const categories = [
  ...(tech.categories || []),
  ...(digital.categories || []),
  ...(graphic.categories || []),
  ...(others.categories || []),
];

/** Return all projects */
export function all() {
  return ALL;
}

/** Return projects for a category: 'tech' | 'graphic' | 'others' */
export function byCategory(category) {
  return ALL.filter((p) => p.category === category);
}

/** Find one by slug */
export function getProject(slug) {
  return ALL.find((p) => p.slug === slug);
}
