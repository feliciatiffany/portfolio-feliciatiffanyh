// A filter list that starts on "All". Picking items narrows the list to exactly those items
// (each picked one gets a dot); "All" clears them. Picking every item, or none, means All again.
import { useMemo, useState } from "react";

export const ALL = "__all";

export default function useDotFilter(keys) {
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (key) =>
    setPicked((prev) => {
      if (key === ALL) return new Set();
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next.size === keys.length ? new Set() : next; // everything picked is just "All"
    });
  // what the menu shows as selected (with a dot): "All" while nothing is picked
  const pressed = useMemo(() => (picked.size ? picked : new Set([ALL])), [picked]);
  // whether something tagged with these keys is shown
  const shows = (...tags) => picked.size === 0 || tags.flat().some((t) => picked.has(t));
  // the menu items, with "All" first
  const withAll = (items) => [{ key: ALL, label: "All" }, ...items];
  return { pressed, toggle, shows, withAll };
}
