// FanyLLM — the "ask me anything" panel. A sparkle button sits at the top right of every page;
// selecting text anywhere shows an "Ask FanyLLM" chip that asks about it. Answers come from
// src/lib/fanyllm.js (site content only) and appear as if typed, like a note being written.
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon, RefreshIcon, Cancel01Icon, ArrowUp02Icon } from "@hugeicons/core-free-icons";
// the answer engine pulls in every project, post and résumé entry, so it loads on first use
const loadEngine = () => import("../lib/fanyllm.js");
const SUGGESTIONS = ["Can I email you?", "What are you studying?", "Tell me about Red Doors"];
import "./FanyLLM.css";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Typed({ text, onDone }) {
  const [n, setN] = useState(reduceMotion() ? text.length : 0);
  useEffect(() => {
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const id = setTimeout(() => setN((v) => Math.min(text.length, v + 3)), 14);
    return () => clearTimeout(id);
  }, [n, text, onDone]);
  return <>{text.slice(0, n)}</>;
}

function Answer({ msg, onTyped }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => {
    setDone(true);
    onTyped?.();
  }, [onTyped]);
  return (
    <div className="fany-llm__answer">
      <p>
        <Typed text={msg.text} onDone={finish} />
      </p>
      {done && msg.links?.length > 0 && (
        <div className="fany-llm__links">
          {msg.links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="fany-llm__link">↳ {l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} className="fany-llm__link" target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                ↳ {l.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function FanyLLM() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [chip, setChip] = useState(null); // { x, y, text } for a text selection
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const panelRef = useRef(null);

  const ask = useCallback((question) => {
    const q = question.trim();
    if (!q) return;
    setOpen(true);
    setDraft("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    loadEngine().then(({ answer }) => setMessages((m) => [...m, { role: "fany", ...answer(q) }]));
  }, []);

  const scrollDown = useCallback(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);
  useEffect(scrollDown, [messages, scrollDown]);

  useEffect(() => {
    if (open) loadEngine(); // warm it up as the panel slides in
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    // the page makes room for the panel (see FanyLLM.css) instead of sitting under it
    document.documentElement.classList.toggle("fanyllm-open", open);
    return () => document.documentElement.classList.remove("fanyllm-open");
  }, [open]);

  // Esc closes; the page behind can still be read and scrolled
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Selecting text shows a small "Ask FanyLLM" chip above it
  useEffect(() => {
    const update = () => {
      const sel = window.getSelection();
      const text = sel?.toString().replace(/\s+/g, " ").trim() || "";
      const node = sel?.anchorNode?.parentElement;
      if (!text || text.length < 3 || text.length > 400 || sel.rangeCount === 0 || node?.closest("input, textarea, .fany-llm")) {
        setChip(null);
        return;
      }
      const r = sel.getRangeAt(0).getBoundingClientRect();
      if (!r.width && !r.height) return setChip(null);
      setChip({ x: r.left + r.width / 2, y: r.top, text });
    };
    const onUp = () => setTimeout(update, 0);
    const hide = () => setChip(null);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("keyup", onUp);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("keyup", onUp);
      window.removeEventListener("scroll", hide);
    };
  }, []);

  const askAboutSelection = () => {
    const text = chip.text.length > 160 ? `${chip.text.slice(0, 160)}…` : chip.text;
    window.getSelection()?.removeAllRanges();
    setChip(null);
    ask(`Tell me more about “${text}”`);
  };

  return (
    <>
      <button
        type="button"
        className={`fany-llm__trigger${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close FanyLLM" : "Ask FanyLLM"}
        aria-expanded={open}
        title="Ask FanyLLM"
      >
        <HugeiconsIcon icon={SparklesIcon} size={18} strokeWidth={1.5} />
      </button>

      {chip && (
        <button
          type="button"
          className="fany-llm__chip"
          style={{ left: chip.x, top: chip.y }}
          onMouseDown={(e) => e.preventDefault() /* keep the selection until the click lands */}
          onClick={askAboutSelection}
        >
          <HugeiconsIcon icon={SparklesIcon} size={14} strokeWidth={1.6} />
          Ask FanyLLM
        </button>
      )}

      <aside ref={panelRef} className={`fany-llm${open ? " is-open" : ""}`} aria-label="FanyLLM" aria-hidden={!open} inert={open ? undefined : ""}>
        <header className="fany-llm__head">
          <span className="fany-llm__name">FanyLLM</span>
          <span className="fany-llm__tools">
            <button type="button" onClick={() => setMessages([])} aria-label="Start over" title="Start over">
              <HugeiconsIcon icon={RefreshIcon} size={18} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" title="Close">
              <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.5} />
            </button>
          </span>
        </header>

        <div ref={logRef} className="fany-llm__log" aria-live="polite">
          {messages.length === 0 ? (
            <div className="fany-llm__empty">
              <p className="fany-llm__hello">Ask me anything.</p>
              <ul className="fany-llm__suggest">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => ask(s)}>↳ {s}</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            messages.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="fany-llm__question">{m.text}</p>
              ) : (
                <Answer key={i} msg={m} onTyped={scrollDown} />
              )
            )
          )}
        </div>

        <form
          className="fany-llm__form"
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about Fany…"
            aria-label="Ask about Fany"
          />
          <button type="submit" aria-label="Send" disabled={!draft.trim()}>
            <HugeiconsIcon icon={ArrowUp02Icon} size={16} strokeWidth={1.6} />
          </button>
        </form>
        <p className="fany-llm__note">Answers come from this site.</p>
      </aside>
    </>
  );
}
