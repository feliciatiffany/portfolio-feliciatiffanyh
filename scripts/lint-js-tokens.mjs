// Fails when JS/JSX hard-codes a colour or easing, or reaches for a colour base swatch.
// Use var(--role) in styles, or token("name") from src/lib/tokens.js where real values are needed.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { baseColors } from "../src/lib/tokens.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IGNORE = new Set([
  "src/lib/tokens.js", // generated
  "src/components/GlassSurface.jsx", // vendored from React Bits, kept as published
]);

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|mjs)$/.test(name)) files.push(p);
  }
})(resolve(root, "src"));

const checks = [
  [/["'`]#[0-9a-f]{3,8}["'`]/gi, "hex colour"],
  [/\brgba?\(/g, "rgb()/rgba() colour"],
  [/cubic-bezier\(/g, "easing curve"],
  [new RegExp(`var\\(--(${baseColors.join("|")})\\)`, "g"), "colour base swatch (use a role)"],
];

let problems = 0;
for (const file of files) {
  const rel = relative(root, file);
  if (IGNORE.has(rel)) continue;
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (/^\s*(\/\/|\*)/.test(line)) return; // comments may mention values
    for (const [re, what] of checks) {
      for (const m of line.matchAll(re)) {
        problems++;
        console.error(`${rel}:${i + 1}  ${what}: ${m[0]}  → use a token (docs/tokens.md)`);
      }
    }
  });
}
if (problems) {
  console.error(`\n${problems} off-system value(s). See docs/tokens.md and CLAUDE.md.`);
  process.exit(1);
}
console.log(`Token check passed (${files.length - IGNORE.size} JS files).`);
