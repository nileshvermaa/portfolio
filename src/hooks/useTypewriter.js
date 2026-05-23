import { useState, useEffect } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Animates text character-by-character.
 * @param {string} text  Full text to type out.
 * @param {object} opts
 * @param {number}  opts.speed      ms per character (default 40)
 * @param {number}  opts.startDelay ms before starting (default 0)
 * @param {boolean} opts.enabled    set false to hold; flip to true to start
 */
export function useTypewriter(
  text,
  { speed = 40, startDelay = 0, enabled = true } = {}
) {
  const reduced = prefersReducedMotion();

  const [displayed, setDisplayed] = useState(() =>
    enabled && reduced ? text : ""
  );
  const [done, setDone] = useState(() => enabled && reduced);

  useEffect(() => {
    if (!enabled) return;

    if (reduced) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    let i = 0;
    let interval;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, enabled, reduced]);

  return { displayed, done };
}
