// Claude Code PostToolUse hook (.claude/settings.json): after Claude edits a stylesheet, component or
// token file, rebuild tokens if needed and run the token lint. Failures exit 2, which hands the
// report back to Claude so it fixes the value itself.
import { execSync } from "node:child_process";

let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let file = "";
  try {
    file = JSON.parse(input).tool_input?.file_path || "";
  } catch {
    process.exit(0);
  }
  const isToken = /\/tokens\/[^/]+\.json$/.test(file);
  const isSource = /\/src\/.+\.(css|jsx?|mjs)$/.test(file);
  if (!isToken && !isSource) process.exit(0);

  try {
    if (isToken) execSync("node scripts/build-tokens.mjs", { stdio: "pipe" });
    execSync("npx stylelint \"src/**/*.css\" && node scripts/lint-js-tokens.mjs", { stdio: "pipe" });
  } catch (e) {
    const out = `${e.stdout || ""}${e.stderr || ""}`.replace(/npm notice.*\n/g, "").trim();
    console.error(`Design-token check failed after editing ${file}. Use tokens from docs/tokens.md (rules in CLAUDE.md):\n\n${out}`);
    process.exit(2);
  }
});
