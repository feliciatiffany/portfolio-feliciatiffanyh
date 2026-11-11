// Design-system rules for every stylesheet. Values come from tokens (docs/tokens.md), never typed in.
// Run: npm run lint:tokens. A hook in .claude/settings.json runs it after Claude edits a file.
import { baseColors } from "./src/lib/tokens.js";

// "anything that isn't a var(), a relative unit, or a keyword" — written once, reused per property
const notToken = (extra = "") => `/^(?!var\\(|inherit$|initial$|unset$|currentColor$${extra}).+/`;
// a bare px length standing on its own (not inside clamp()/calc()/min()), e.g. "12px" or "0 8px"
const loosePx = "/(^|\\s)-?\\d*\\.?\\d+px(?=\\s|$)/";

export default {
  ignoreFiles: [
    "src/style/tokens.css", // generated
    "src/components/GlassSurface.css", // vendored from React Bits, kept as published
    "dist/**",
  ],
  rules: {
    // colour: only tokens
    "color-no-hex": [true, { message: "Use a colour token (docs/tokens.md), not a hex value." }],
    "color-named": ["never", { message: "Use a colour token (docs/tokens.md), not a named colour." }],
    "function-disallowed-list": [
      ["rgb", "rgba", "hsl", "hsla", "cubic-bezier"],
      { message: "Use a token: colours via var(--…) or color-mix(in srgb, var(--…) N%, transparent); easing via var(--ease-…)." },
    ],
    "declaration-property-value-disallowed-list": [
      {
        // colour base swatches are for the token files only; components use roles
        "/.*/": [`/var\\(--(${baseColors.join("|")})\\)/`],
        "font-family": [notToken()],
        "font-weight": [notToken()],
        "line-height": [notToken("|0$|normal$")],
        "font-size": [notToken("|calc\\(var|-?\\d*\\.?\\d+(em|%)$")],
        "/^border(-[a-z]+)*-radius$/": [notToken("|0$|min\\(|calc\\(var|-?\\d*\\.?\\d+(em|%)$")],
        "/^(gap|row-gap|column-gap|padding|margin)(-[a-z-]+)?$/": [loosePx],
      },
      { message: (prop, value) => `"${prop}: ${value}" is off-system. Use a token from docs/tokens.md (roles first; scale steps like --space-4 / --radius-sm if no role fits).` },
    ],
  },
};
