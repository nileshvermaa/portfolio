import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme, THEMES } from "../../hooks/useTheme";

/* ── Web Audio — dial-up style beep sequence ────────────────────── */

function playBootBeep() {
  try {
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    // Short 3-tone boot confirmation: 880→660→440 Hz
    [
      [880, 0],
      [660, 0.14],
      [440, 0.28],
    ].forEach(([freq, start]) => {
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, actx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        actx.currentTime + start + 0.12
      );
      osc.start(actx.currentTime + start);
      osc.stop(actx.currentTime + start + 0.13);
    });
  } catch {
    /* AudioContext blocked or unavailable */
  }
}

const SOUND_KEY = "nilesh.sys.sound";

/* ── Menu definitions ───────────────────────────────────────────── */

const MENUS = [
  {
    label: "File",
    items: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Resume.pdf", href: "/NileshResume.pdf", download: true },
      { label: "Exit", action: "close" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Copy email", action: "copy-email" },
      { label: "Copy page URL", action: "copy-url" },
      { label: "Find on page... (Ctrl+F)", action: "find" },
      { label: "View source", href: "https://github.com/nileshvermaa/portfolio" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Theme: Terminal (green)", theme: "terminal" },
      { label: "Theme: Amber CRT", theme: "amber" },
      { label: "Theme: Monochrome", theme: "mono" },
      { label: "Theme: Win95", theme: "win95" },
      { label: "Toggle scanlines", action: "scanlines" },
      { label: "Toggle synthwave grid", action: "synthwave" },
    ],
  },
  {
    label: "Projects",
    items: [{ label: "Browse all", to: "/projects" }],
  },
  {
    label: "Timeline",
    items: [{ label: "Open log", to: "/timeline" }],
  },
  {
    label: "Contact",
    items: [
      { label: "Send message", to: "/contact" },
      { label: "GitHub", href: "https://github.com/nileshvermaa" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nileshvermaa/" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Type `help` in terminal", action: "noop" },
      { label: "Konami code: ↑↑↓↓←→←→BA", action: "noop" },
      { label: "About NILESH.SYS", to: "/about" },
    ],
  },
];

/* ── Component ──────────────────────────────────────────────────── */

const Header = () => {
  const [open, setOpen] = useState(null);
  const [sound, setSound] = useState(
    () => {
      try { return localStorage.getItem(SOUND_KEY) === "on"; }
      catch { return false; }
    }
  );
  const ref = useRef(null);
  const location = useLocation();
  const { theme, setTheme, toggleScanlines } = useTheme();

  useEffect(() => setOpen(null), [location.pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSound((prev) => {
      const next = !prev;
      try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch {}
      if (next) playBootBeep();
      return next;
    });
  }, []);

  const handleItem = useCallback(
    (item) => {
      if (item.theme) setTheme(item.theme);
      else if (item.action === "scanlines") toggleScanlines();
      else if (item.action === "synthwave") {
        document.documentElement.classList.toggle("synthwave-grid");
        try {
          const on = document.documentElement.classList.contains("synthwave-grid");
          localStorage.setItem("nilesh.sys.synthwave", on ? "on" : "off");
        } catch {}
      } else if (item.action === "copy-email") {
        navigator.clipboard?.writeText("nileshvermaq@gmail.com").catch(() => {});
      } else if (item.action === "copy-url") {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
      } else if (item.action === "find") {
        /* Can't programmatically open native Find — hint via status bar instead */
      }
      setOpen(null);
    },
    [setTheme, toggleScanlines]
  );

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 bevel-out"
      style={{
        borderTopWidth: 0,
        boxShadow: "0 4px 0 rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Title bar */}
      <div className="bg-retro-chrome text-retro-chrome-fg font-sys text-xs flex items-center justify-between px-2 py-1 border-b-2 border-retro-border-dark">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">▣</span>
          <Link to="/" className="font-bold no-underline text-retro-chrome-fg">
            NILESH.SYS — Cloud Specialist // Solutions Architect
          </Link>
        </div>
        <div className="font-mono" aria-hidden="true">[_] [□] [×]</div>
      </div>

      {/* Menu bar */}
      <nav
        className="bg-retro-panel text-retro-fg font-sys text-sm flex items-center gap-0 px-1"
        aria-label="Main navigation"
      >
        {MENUS.map((menu) => {
          const isOpen = open === menu.label;
          return (
            <div key={menu.label} className="relative">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : menu.label)}
                onMouseEnter={() => open && setOpen(menu.label)}
                className={`px-3 py-1 hover:bg-retro-chrome hover:text-retro-chrome-fg ${
                  isOpen ? "bg-retro-chrome text-retro-chrome-fg" : ""
                }`}
                aria-haspopup="menu"
                aria-expanded={isOpen}
              >
                <span className="underline decoration-dotted underline-offset-2">
                  {menu.label[0]}
                </span>
                {menu.label.slice(1)}
              </button>

              {isOpen && (
                <ul
                  role="menu"
                  className="absolute left-0 top-full bevel-out min-w-[220px] py-1 z-50"
                >
                  {menu.items.map((item, i) => {
                    const active =
                      (item.theme && theme === item.theme) ||
                      (item.to && location.pathname === item.to);
                    const cls = `block w-full text-left px-3 py-1 font-sys text-sm no-underline text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg ${
                      active ? "font-bold" : ""
                    }`;
                    if (item.to)
                      return (
                        <li key={i} role="none">
                          <Link role="menuitem" to={item.to} className={cls} onClick={() => setOpen(null)}>
                            {active ? "● " : "  "}{item.label}
                          </Link>
                        </li>
                      );
                    if (item.href)
                      return (
                        <li key={i} role="none">
                          <a
                            role="menuitem"
                            href={item.href}
                            download={item.download}
                            target={item.download ? undefined : "_blank"}
                            rel="noreferrer"
                            className={cls}
                            onClick={() => setOpen(null)}
                          >
                            {item.label}
                          </a>
                        </li>
                      );
                    return (
                      <li key={i} role="none">
                        <button
                          role="menuitem"
                          type="button"
                          onClick={() => handleItem(item)}
                          className={cls}
                        >
                          {active ? "● " : "  "}{item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* Right side — sound toggle + theme hint */}
        <div className="ml-auto flex items-center gap-2 pr-2">
          <button
            type="button"
            onClick={toggleSound}
            title={sound ? "Sound ON — click to mute" : "Sound OFF — click to enable"}
            aria-label={sound ? "Sound enabled, click to mute" : "Sound disabled, click to enable"}
            className={`px-2 py-1 font-sys text-xs hover:bg-retro-chrome hover:text-retro-chrome-fg ${
              sound ? "text-retro-accent" : "text-retro-fg-dim"
            }`}
          >
            {sound ? "🔊" : "🔇"}
          </button>
          <span className="font-mono text-xs text-retro-fg-dim hidden sm:inline">
            [{theme}]
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
