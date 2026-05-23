import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { executeCommand, COMMAND_NAMES } from "./commands.jsx";

const PROMPT_USER = "nilesh@nilesh.sys";
const PROMPT_DIR = ":~$";

const Prompt = () => (
  <span className="shrink-0 select-none whitespace-nowrap">
    <span className="text-retro-accent">{PROMPT_USER}</span>
    <span className="text-retro-fg-dim">{PROMPT_DIR} </span>
  </span>
);

const WELCOME = (
  <div className="space-y-1 mb-2 text-retro-fg-dim font-mono text-sm">
    <div>
      <span className="text-retro-accent font-bold">NILESH.SYS Terminal</span>
      {" "}v1.0 — connected via SSH
    </div>
    <div>
      Type{" "}
      <span className="text-retro-fg">help</span> for commands ·{" "}
      <span className="text-retro-fg">↑/↓</span> for history ·{" "}
      <span className="text-retro-fg">Tab</span> to autocomplete ·{" "}
      <span className="text-retro-fg">Ctrl+L</span> to clear
    </div>
    <div className="text-retro-fg-dim text-xs">
      ──────────────────────────────────────────────────────
    </div>
  </div>
);

const Terminal = ({ className = "", height = 440 }) => {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll on new output — skip on initial mount (entries=[])
  useEffect(() => {
    if (entries.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries]);

  const focusInput = () => inputRef.current?.focus();

  const runCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim();

      // blank line — just echoes prompt
      if (!trimmed) {
        setEntries((prev) => [...prev, { id: Date.now(), cmd: "", output: null }]);
        return;
      }

      // push to history (newest first)
      setCmdHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistIdx(-1);

      const result = executeCommand(trimmed, navigate);

      if (result.clear) {
        setEntries([]);
        return;
      }

      setEntries((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), cmd: trimmed, output: result.output },
      ]);

      // deferred navigation — let user read the output first
      if (result.navigate) {
        setTimeout(() => navigate(result.navigate), 1200);
      }

      // trigger download via invisible anchor
      if (result.download) {
        const a = document.createElement("a");
        a.href = result.download;
        a.download = result.download.split("/").pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    [navigate]
  );

  const handleKey = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          runCommand(input);
          setInput("");
          break;

        case "ArrowUp":
          e.preventDefault();
          if (cmdHistory.length === 0) break;
          {
            const next = Math.min(histIdx + 1, cmdHistory.length - 1);
            setHistIdx(next);
            setInput(cmdHistory[next]);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (histIdx <= 0) {
            setHistIdx(-1);
            setInput("");
          } else {
            const next = histIdx - 1;
            setHistIdx(next);
            setInput(cmdHistory[next]);
          }
          break;

        case "Tab":
          e.preventDefault();
          if (!input.trim()) break;
          {
            const matches = COMMAND_NAMES.filter((c) =>
              c.startsWith(input.toLowerCase())
            );
            if (matches.length === 1) {
              setInput(matches[0]);
            } else if (matches.length > 1) {
              setEntries((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  cmd: input,
                  output: (
                    <div className="text-retro-fg-dim font-mono text-sm">
                      {matches.join("    ")}
                    </div>
                  ),
                },
              ]);
            }
          }
          break;

        case "l":
          if (e.ctrlKey) {
            e.preventDefault();
            setEntries([]);
          }
          break;

        case "c":
          if (e.ctrlKey) {
            e.preventDefault();
            setEntries((prev) => [
              ...prev,
              { id: Date.now(), cmd: input ? input + " ^C" : "^C", output: null },
            ]);
            setInput("");
            setHistIdx(-1);
          }
          break;

        case "u":
          if (e.ctrlKey) {
            e.preventDefault();
            setInput("");
          }
          break;

        default:
          break;
      }
    },
    [input, cmdHistory, histIdx, runCommand]
  );

  return (
    <div
      className={`bevel-in bg-retro-bg font-mono text-sm flex flex-col cursor-text ${className}`}
      style={{ height }}
      onClick={focusInput}
      role="region"
      aria-label="Interactive terminal — type help for commands"
    >
      {/* ── Scrollable output area ── */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-1"
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="false"
      >
        {WELCOME}

        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {/* Only show prompt line if there was an actual command */}
            {entry.cmd !== "" && (
              <div className="flex items-start gap-0">
                <Prompt />
                <span className="text-retro-fg break-all">{entry.cmd}</span>
              </div>
            )}
            {entry.output && (
              <div className="pl-0 text-retro-fg leading-relaxed">
                {entry.output}
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* ── Input line ── */}
      <div
        className="flex items-center gap-0 px-3 py-2 border-t-2 border-retro-border-dark shrink-0"
      >
        <Prompt />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHistIdx(-1);
          }}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-retro-fg font-mono text-sm min-w-0"
          style={{ caretColor: "var(--retro-accent)" }}
          aria-label="Terminal command input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {/* Blinking block cursor when input is empty and focused */}
        {input === "" && focused && (
          <span className="retro-blink text-retro-accent" aria-hidden="true">
            █
          </span>
        )}
      </div>
    </div>
  );
};

export default Terminal;
