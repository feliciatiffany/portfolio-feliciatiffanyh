// The design system's single source of truth is tokens/*.json (W3C Design Tokens format).
// This script turns it into everything else, so nothing is typed by hand twice:
//   src/style/tokens.css  CSS custom properties, used by every stylesheet
//   src/lib/tokens.js     resolved values for code that can't read CSS (canvas, WebGL)
//   docs/tokens.md        the reference table people and AI tools read
// Two layers: a token with a raw value is the base layer (a swatch, a scale step); a token that
// points at another ({color.coral}) is a semantic role. Components use roles; colour base swatches
// are off limits outside the token files (enforced by npm run lint:tokens).
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(root, "tokens");
const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();

// ---- read ------------------------------------------------------------------------------------
function walk(node, path, file, inheritedType) {
  const out = [];
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith("$") || !val || typeof val !== "object") continue;
    const type = val.$type || inheritedType;
    if ("$value" in val) {
      // dark mode: "$extensions": { "mode": { "dark": <value> } }
      const dark = val.$extensions?.mode?.dark;
      out.push({ name: [...path, key].join("-"), type, value: val.$value, dark, description: val.$description || "", file });
    } else {
      out.push(...walk(val, [...path, key], file, type));
    }
  }
  return out;
}

const tokens = files.flatMap((f) => walk(JSON.parse(readFileSync(resolve(dir, f), "utf8")), [], f));
const byName = new Map();
for (const t of tokens) {
  if (byName.has(t.name)) throw new Error(`Duplicate token --${t.name} (${byName.get(t.name).file} and ${t.file})`);
  byName.set(t.name, t);
}

const REF = /\{([a-z0-9.-]+)\}/gi;
const refName = (ref) => ref.replaceAll(".", "-");
// base = a raw value (a swatch, a scale step); semantic = anything built from another token
const hasRef = (v) => JSON.stringify(v).includes("{");
for (const t of tokens) t.layer = hasRef(t.value) ? "semantic" : "base";

// ---- serialise -------------------------------------------------------------------------------
// mode "css" keeps references as var(--x); mode "raw" resolves them to final values
function str(value, type, mode, stack = []) {
  if (typeof value === "string") {
    return value.replace(REF, (_, ref) => {
      const name = refName(ref);
      const target = byName.get(name);
      if (!target) throw new Error(`Missing token {${ref}}`);
      if (stack.includes(name)) throw new Error(`Token cycle at ${name}`);
      if (mode === "css") return `var(--${name})`;
      const v = mode === "raw-dark" && target.dark !== undefined ? target.dark : target.value;
      return str(v, target.type, mode, [...stack, name]);
    });
  }
  if (type === "fontFamily" && Array.isArray(value)) {
    return value.map((f) => (/^[a-z-]+$/i.test(f) && !/\s/.test(f) && f === f.toLowerCase() ? f : `"${f}"`)).join(", ");
  }
  if (type === "cubicBezier" && Array.isArray(value)) return `cubic-bezier(${value.join(", ")})`;
  if (type === "shadow") {
    const one = (s) => [s.offsetX, s.offsetY, s.blur, s.spread, s.color].filter((p) => p != null).map((p) => str(p, "", mode, stack)).join(" ");
    return Array.isArray(value) ? value.map(one).join(", ") : one(value);
  }
  return String(value);
}

for (const t of tokens) {
  t.css = str(t.value, t.type, "css");
  t.raw = str(t.value, t.type, "raw");
  if (t.dark !== undefined) {
    t.darkCss = str(t.dark, t.type, "css");
    t.darkRaw = str(t.dark, t.type, "raw-dark");
  }
}

// Soft washes for accents and surfaces (13% tint), used for hover backgrounds
const washes = tokens
  .filter((t) => t.name.startsWith("color-accent-") || t.name.startsWith("color-surface-"))
  .map((t) => ({
    name: t.name.replace("color-accent-", "color-wash-").replace("color-surface-", "color-wash-"),
    type: "color",
    layer: "semantic",
    css: `color-mix(in srgb, var(--${t.name}) 13%, transparent)`,
    raw: `13% of ${t.raw}`,
    description: `Soft wash of --${t.name}`,
    file: t.file,
  }));
const all = [...tokens, ...washes];

// ---- write CSS -------------------------------------------------------------------------------
const header = "Generated from tokens/*.json by scripts/build-tokens.mjs. Do not edit. Run: npm run tokens";
const css = [`/* ${header} */`, ":root {"];
let lastFile = "";
for (const t of all) {
  if (t.file !== lastFile) css.push(`  /* ${t.file} */`), (lastFile = t.file);
  css.push(`  --${t.name}: ${t.css};`);
}
css.push("}", "");

// Dark mode: system preference by default; data-theme on <html> forces either mode
const darkTokens = tokens.filter((t) => t.darkCss !== undefined);
const darkBody = ["  color-scheme: dark;", ...darkTokens.map((t) => `  --${t.name}: ${t.darkCss};`)];
css.splice(1, 0, ":root { color-scheme: light; }");
css.push(
  "/* dark mode, chosen by the visitor */",
  ':root[data-theme="dark"] {', ...darkBody, "}",
  "/* dark mode, following the system (unless the visitor chose light) */",
  "@media (prefers-color-scheme: dark) {",
  '  :root:not([data-theme="light"]) {', ...darkBody.map((l) => "  " + l), "  }",
  "}",
  ""
);
writeFileSync(resolve(root, "src/style/tokens.css"), css.join("\n"));

// ---- write JS --------------------------------------------------------------------------------
const js = [
  `// ${header}`,
  "// Resolved values for code that can't use CSS variables (canvas, WebGL). Everywhere else, use var(--name).",
  "/** Dark-mode values for the tokens that change (same keys as `tokens`). */",
  "export const darkTokens = Object.freeze({",
  ...tokens.filter((t) => t.darkRaw !== undefined && t.type !== "shadow").map((t) => `  ${JSON.stringify(t.name)}: ${JSON.stringify(t.darkRaw)},`),
  "});",
  "",
  "export const tokens = Object.freeze({",
  ...all.filter((t) => t.type !== "shadow").map((t) => `  ${JSON.stringify(t.name)}: ${JSON.stringify(t.raw)},`),
  "});",
  "",
  "/** Colour base swatches: only roles may point at these (checked by npm run lint:tokens). */",
  `export const baseColors = Object.freeze(${JSON.stringify(tokens.filter((t) => t.type === "color" && t.layer === "base").map((t) => t.name))});`,
  "",
  "/** token('color-cursor') → '#DE826D'. Throws on a typo so a wrong name can't fall back silently. */",
  "export function token(name, mode = \"light\") {",
  "  if (!(name in tokens)) throw new Error(`Unknown design token: ${name}`);",
  "  return mode === \"dark\" && name in darkTokens ? darkTokens[name] : tokens[name];",
  "}",
  "",
];
mkdirSync(resolve(root, "src/lib"), { recursive: true });
writeFileSync(resolve(root, "src/lib/tokens.js"), js.join("\n"));

// ---- write docs ------------------------------------------------------------------------------
const groups = [
  ["Colour", (t) => t.type === "color"],
  ["Type: families, weights, sizes", (t) => t.name.startsWith("font-") || t.name.startsWith("text-")],
  ["Line height", (t) => t.name.startsWith("leading-")],
  ["Space", (t) => t.name.startsWith("space-")],
  ["Radius", (t) => t.name.startsWith("radius-")],
  ["Shadow", (t) => t.type === "shadow"],
  ["Motion", (t) => t.type === "duration" || t.type === "cubicBezier"],
  ["Effects", (t) => t.name.startsWith("blend-")],
];
const esc = (s) => String(s).replaceAll("|", "\\|");
const sections = groups.map(([title, test]) => {
  const rows = all.filter(test);
  const semantic = rows.filter((t) => t.layer === "semantic");
  const base = rows.filter((t) => t.layer === "base");
  const table = (list) =>
    ["| Token | Use | Value | Dark |", "| --- | --- | --- | --- |", ...list.map((t) => `| \`--${t.name}\` | ${esc(t.description)} | \`${esc(t.raw)}\` | ${t.darkRaw !== undefined ? `\`${esc(t.darkRaw)}\`` : "same"} |`)].join("\n");
  return [
    `## ${title}`,
    semantic.length ? `### Roles (use these)\n\n${table(semantic)}` : "",
    base.length ? `### Base ${title === "Colour" ? "swatches (never in components)" : "scale"}\n\n${table(base)}` : "",
  ].filter(Boolean).join("\n\n");
});

const doc = `# Design tokens

Generated from \`tokens/*.json\` by \`npm run tokens\`. Do not edit this file; edit the JSON and rebuild.

**Rules** (checked by \`npm run lint:tokens\`):

- Every colour, font, font size, weight, line height, radius, easing and spacing step comes from a token: \`var(--name)\` in CSS, \`token("name")\` from \`src/lib/tokens.js\` in canvas or WebGL code.
- Use roles, not base values. A colour base swatch (\`--color-coral\`) is never used in a component; use the role that says what it is for (\`--accent\`, \`--color-accent-tech\`, \`--color-glow\`).
- Spacing and radius may use their scale steps (\`--space-4\`, \`--radius-sm\`) when no role fits. Relative units (\`em\`, \`%\`, \`cqw\`, \`vw\`) and \`clamp()\` built from them are fine for layout.
- No new value goes straight into a component. If nothing fits, add a token (see .github/pull_request_template.md).

${sections.join("\n\n")}
`;
mkdirSync(resolve(root, "docs"), { recursive: true });
writeFileSync(resolve(root, "docs/tokens.md"), doc);

console.log(`Wrote ${tokens.length} tokens (+${washes.length} washes) from ${files.join(", ")}.`);
