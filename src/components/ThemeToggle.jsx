// Sun / moon switch, top right beside the FanyLLM sparkle
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { setTheme, useTheme } from "../lib/theme.js";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button type="button" className="theme-toggle" onClick={() => setTheme(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
      <span className="theme-toggle__icon" data-show={theme === "dark" ? "" : "true"}>
        <HugeiconsIcon icon={Moon02Icon} size={18} strokeWidth={1.5} />
      </span>
      <span className="theme-toggle__icon" data-show={theme === "dark" ? "true" : ""}>
        <HugeiconsIcon icon={Sun03Icon} size={18} strokeWidth={1.5} />
      </span>
    </button>
  );
}
