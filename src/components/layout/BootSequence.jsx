import React, { useState, useEffect } from "react";

export const BOOT_KEY = "nilesh.sys.booted";

const LINES = [
  { t: "NILESH.SYS BIOS v4.0.1  —  Cloud Architecture Edition", c: "title" },
  { t: "Copyright (C) 1998-2026 Nilesh Verma. All Rights Reserved.", c: "dim" },
  { t: "", c: "gap" },
  { t: "Processor : Cloud Specialist / Solutions Architect @ Niveus Solutions" },
  { t: "Memory    : 9001 MB Extended  OK", c: "ok" },
  { t: "Drives    : /dev/aws  /dev/gcp  /dev/azure  OK", c: "ok" },
  { t: "", c: "gap" },
  { t: "Detecting cloud providers...", c: "info" },
  { t: "  AWS us-east-1          [  OK  ]", c: "ok" },
  { t: "  GCP us-central1        [  OK  ]", c: "ok" },
  { t: "  Azure East US          [  OK  ]", c: "ok" },
  { t: "", c: "gap" },
  { t: "Initializing cloud subsystems...", c: "info" },
  { t: "  Loading kubernetes.ko              [  OK  ]", c: "ok" },
  { t: "  Mounting /dev/portfolio            [  OK  ]", c: "ok" },
  { t: "  Establishing connection to AWS     [  OK  ]", c: "ok" },
  { t: "  Loading terraform modules          [  OK  ]", c: "ok" },
  { t: "  Starting portfolio.service         [  OK  ]", c: "ok" },
  { t: "", c: "gap" },
  { t: "READY.", c: "ready" },
];

const LINE_DELAY = 175; // ms between lines
const POST_READY_HOLD = 1100; // ms after READY before fade

function lineStyle(c) {
  switch (c) {
    case "title":
      return { color: "#ffffff", fontWeight: "bold" };
    case "ok":
      return { color: "#00ff00" };
    case "ready":
      return { color: "#00ff00", fontWeight: "bold", fontSize: "1.3em" };
    case "info":
      return { color: "#aaffaa" };
    case "dim":
      return { color: "#888" };
    default:
      return { color: "#00dd00" };
  }
}

const BootSequence = ({ onComplete }) => {
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(BOOT_KEY) === "1") {
        onComplete?.();
        return;
      }
    } catch {}

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try { localStorage.setItem(BOOT_KEY, "1"); } catch {}
      onComplete?.();
      return;
    }

    setActive(true);
    const timers = [];

    LINES.forEach((line, i) => {
      timers.push(
        setTimeout(
          () => setShown((prev) => [...prev, line]),
          300 + i * LINE_DELAY
        )
      );
    });

    const totalMs = 300 + LINES.length * LINE_DELAY + POST_READY_HOLD;
    timers.push(
      setTimeout(() => {
        setFading(true);
        timers.push(
          setTimeout(() => {
            setActive(false);
            try { localStorage.setItem(BOOT_KEY, "1"); } catch {}
            onComplete?.();
          }, 600)
        );
      }, totalMs)
    );

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null;

  return (
    <div
      role="status"
      aria-label="Site boot sequence"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#000",
        overflow: "auto",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontFamily: '"IBM Plex Mono", "Courier Prime", monospace',
          fontSize: "clamp(11px, 1.3vw, 14px)",
          lineHeight: 1.7,
          maxWidth: 700,
        }}
      >
        {shown.map((line, i) =>
          line.c === "gap" ? (
            <div key={i} style={{ height: "0.6em" }} />
          ) : (
            <div key={i} style={lineStyle(line.c)}>
              {line.t}
            </div>
          )
        )}
        {shown.length < LINES.length && (
          <span
            style={{ color: "#00ff00" }}
            className="retro-blink inline-block"
          >
            █
          </span>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
