import React, { useEffect, useState } from "react";
import BeveledPanel from "../ui/BeveledPanel";

const COUNTER_KEY = "nilesh.sys.visitor";
const QUOTES = [
  "The cloud is just someone else's computer.",
  "There are only two hard things in CS: cache invalidation and naming things.",
  "It works on my machine. — ship the machine.",
  "rm -rf / # do not run this",
  "Premature optimization is the root of all evil. — D. Knuth",
  "$ sudo make me a sandwich",
  "Real architects ship Terraform.",
];

function useVisitorCount() {
  const [n, setN] = useState(null);
  useEffect(() => {
    try {
      const seed = 41327;
      const prev = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
      const next = prev > 0 ? prev + 1 : seed + Math.floor(Math.random() * 13);
      localStorage.setItem(COUNTER_KEY, String(next));
      setN(next);
    } catch {
      setN(42);
    }
  }, []);
  return n;
}

const LAST_UPDATED = new Date().toISOString().slice(0, 10);

const Sidebar = () => {
  const count = useVisitorCount();
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <aside className="hidden lg:flex flex-col gap-3 w-64 shrink-0" aria-label="Site sidebar">
      <BeveledPanel title="visitors.log">
        <div className="font-mono text-center">
          <div className="text-retro-fg-dim text-xs">You are visitor #</div>
          <div className="bevel-in inline-block px-3 py-1 mt-1 font-pixel text-base text-retro-accent">
            {count == null ? "......" : String(count).padStart(7, "0")}
          </div>
        </div>
      </BeveledPanel>

      <BeveledPanel title="last_modified.txt">
        <p className="font-mono text-xs">
          <span className="text-retro-fg-dim">Last updated:</span>
          <br />
          {LAST_UPDATED}
          <br />
          <span className="text-retro-fg-dim">Build:</span> 4.0.1-stable
        </p>
      </BeveledPanel>

      <BeveledPanel title="best_viewed_in.gif">
        <div className="font-sys text-xs leading-snug text-center">
          <div className="text-retro-accent-alt font-bold retro-blink">
            ★ BEST VIEWED ★
          </div>
          <div>in Netscape Navigator 4.0</div>
          <div className="text-retro-fg-dim">@ 800x600 / 256 colors</div>
        </div>
      </BeveledPanel>

      <BeveledPanel title="webring.html">
        <ul className="text-sm space-y-1 font-mono">
          <li>
            ◀ <a href="https://github.com/nileshvermaa" target="_blank" rel="noreferrer">GitHub</a>
          </li>
          <li>
            ● <a href="https://www.linkedin.com/in/nileshvermaa/" target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
          <li>
            ▶ <a href="mailto:nileshvermaq@gmail.com">/usr/mail</a>
          </li>
          <li>
            ✦ <a href="/contact">contact.cgi</a>
          </li>
        </ul>
      </BeveledPanel>

      <BeveledPanel title="fortune">
        <pre className="font-mono text-xs whitespace-pre-wrap text-retro-fg-dim m-0">
{`$ fortune
${quote}`}
        </pre>
      </BeveledPanel>
    </aside>
  );
};

export default Sidebar;
