// Reading the page for Fany bot: where the words are, and making a card react when it bumps one.
// Shared by the homepage bot (BlockBot.jsx) and the one on every other page (PageBot.jsx).

const range = typeof document !== "undefined" ? document.createRange() : null;

// One box per rendered line of text inside `node`, in the stage's coordinates: the bot stands on
// the top of each and can't pass through it. Pieces of one line (words, split letters) are merged.
export function lineBoxes(node, originX, originY) {
  const lines = [];
  // text node by text node, so words hidden for screen readers only (clipped to a pixel) don't count
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (!t.nodeValue.trim() || t.parentElement?.closest(".scrambled-text-sr, .sr-only, [hidden]")) continue;
    range.selectNodeContents(t);
    for (const r of range.getClientRects()) {
      if (r.width < 2 || r.height < 2) continue;
      const mid = (r.top + r.bottom) / 2;
      const l = lines.find((q) => mid > q.top && mid < q.bottom);
      if (l) {
        l.left = Math.min(l.left, r.left);
        l.right = Math.max(l.right, r.right);
        l.top = Math.min(l.top, r.top);
        l.bottom = Math.max(l.bottom, r.bottom);
      } else lines.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
    }
  }
  return lines.map((l) => ({ x1: l.left - originX, x2: l.right - originX, y1: l.top - originY, y2: l.bottom - originY }));
}

export const rectBox = (r, originX, originY) => ({
  x1: r.left - originX,
  x2: r.right - originX,
  y1: r.top - originY,
  y2: r.bottom - originY,
});

// the bot walked into (or stomped on) a card: it reacts the way it does under the cursor, for a moment
const timers = new WeakMap();
export function hitCard(el, hold = 1700) {
  if (!el) return;
  clearTimeout(timers.get(el));
  el.removeAttribute("data-bot-hit");
  void el.offsetWidth; // so the nudge plays again if it's hit twice in a row
  el.setAttribute("data-bot-hit", "");
  timers.set(el, setTimeout(() => el.removeAttribute("data-bot-hit"), hold));
}
