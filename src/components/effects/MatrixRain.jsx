import React, { useEffect, useRef, useState } from "react";

// Full Katakana block + ASCII printable — classic Matrix charset
const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const FS = 16; // font size px — also column width

const DURATION_MS = 10_000;
const FADE_START_MS = 8_800; // begin CSS fade 1.2s before end

/**
 * Full-viewport Matrix rain canvas overlay.
 * Auto-dismisses after DURATION_MS.
 * Any keypress or click also dismisses early.
 * Skips animation entirely if prefers-reduced-motion is set.
 */
const MatrixRain = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => onComplete?.(), 600);
  };

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const cols = Math.ceil(W / FS);
    // randomise starting y so columns don't all begin at top
    const drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * 30));

    const draw = () => {
      // Semi-transparent black fade — creates the trailing effect
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FS}px "VT323", monospace`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * FS;
        if (y < 0) { drops[i]++; continue; }

        // Leading character — bright white/green
        ctx.fillStyle = "#aaffaa";
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y);

        // Character one step behind — primary green
        if (drops[i] > 1) {
          ctx.fillStyle = "#00ff41";
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * FS,
            (drops[i] - 1) * FS
          );
        }

        if (y > H && Math.random() > 0.975) drops[i] = -Math.floor(Math.random() * 20);
        drops[i]++;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const fadeTimer = setTimeout(() => setFading(true), FADE_START_MS);
    const endTimer = setTimeout(() => onComplete?.(), DURATION_MS);

    const handleKey = () => dismiss();
    const handleClick = () => dismiss();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="dialog"
      aria-label="Matrix rain easter egg — press any key or click to dismiss"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        cursor: "pointer",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* Dismiss hint */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 13,
          color: "#00ff41",
          opacity: 0.7,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        [ KONAMI CODE ACTIVATED — press any key or click to dismiss ]
      </div>
    </div>
  );
};

export default MatrixRain;
