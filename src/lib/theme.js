// Light / dark mode follows the time of day: light from 7:00 to 19:00 (the visitor's local time),
// dark in the evening and at night. Picking a mode with the toggle holds for the rest of the visit.
// The <html data-theme> attribute is what the generated tokens.css switches on.
import { useEffect, useState } from "react";

const DAY_START = 7;
const DAY_END = 19;
const KEY = "theme";

export function themeForNow(date = new Date()) {
  const h = date.getHours();
  return h >= DAY_START && h < DAY_END ? "light" : "dark";
}

function chosen() {
  try {
    const t = sessionStorage.getItem(KEY);
    return t === "dark" || t === "light" ? t : null;
  } catch {
    return null;
  }
}

export function resolvedTheme() {
  if (typeof window === "undefined") return "light";
  const shown = document.documentElement.dataset.theme;
  return shown === "dark" || shown === "light" ? shown : themeForNow();
}

/** Pick a mode by hand (from the toggle); it holds until the tab is closed. */
export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    sessionStorage.setItem(KEY, theme);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}

/** The theme showing right now; also flips it at 7:00 and 19:00 if the visitor hasn't chosen. */
export function useTheme() {
  const [theme, set] = useState(resolvedTheme);
  useEffect(() => {
    const update = () => set(resolvedTheme());
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const tick = setInterval(() => {
      if (!chosen()) document.documentElement.dataset.theme = themeForNow();
    }, 60 * 1000);
    return () => {
      mo.disconnect();
      clearInterval(tick);
    };
  }, []);
  return theme;
}
