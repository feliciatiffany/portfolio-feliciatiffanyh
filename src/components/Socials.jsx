// Social links: icons in small filled circles, or words with a small black-and-white mark before each
import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Linkedin01Icon, GithubIcon, Asterisk02Icon } from "@hugeicons/core-free-icons";

export const SOCIALS = [
  { href: "mailto:feliciatiffany@gmail.com", label: "gmail", icon: Mail01Icon },
  { href: "https://www.linkedin.com/in/feliciatiffanyh/", label: "linkedin", icon: Linkedin01Icon },
  { href: "https://github.com/feliciatiffany", label: "github", icon: GithubIcon },
  { href: "https://linktr.ee/feliciatiffanyh", label: "linktree", icon: Asterisk02Icon }, // closest match to the Linktree mark
];

export default function Socials({ icons = false, wrap }) {
  if (icons) {
    // homepage: each link is a visible symbol inside a small filled circle
    return SOCIALS.map((l) => {
      const link = (
      <a
        key={l.label}
        href={l.href}
        className="social-badge"
        aria-label={l.label}
        title={l.label}
        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <HugeiconsIcon icon={l.icon} size={16} strokeWidth={1.6} />
      </a>
      );
      return wrap ? wrap(link, l.label) : link; // e.g. wrap each icon in glass
    });
  }
  return SOCIALS.map((l, i) => (
    <React.Fragment key={l.label}>
      {i > 0 && <span className="foot-sep" aria-hidden> · </span>}
      <a
        href={l.href}
        className="foot-link"
        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {/* a small black-and-white mark before the word; it takes the text colour */}
        <HugeiconsIcon icon={l.icon} size={14} strokeWidth={1.6} className="foot-link__icon" aria-hidden="true" />
        {l.label}
      </a>
    </React.Fragment>
  ));
}

