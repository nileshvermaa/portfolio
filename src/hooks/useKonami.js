import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Fires `onActivate` when the Konami code is entered.
 * Works with keyboard only — does nothing when prefers-reduced-motion
 * is set (so the downstream effect can decide).
 */
export function useKonami(onActivate) {
  const buf = useRef([]);
  const cbRef = useRef(onActivate);
  cbRef.current = onActivate;

  useEffect(() => {
    const handler = (e) => {
      buf.current = [...buf.current, e.key].slice(-SEQUENCE.length);
      if (buf.current.join(",") === SEQUENCE.join(",")) {
        buf.current = [];
        cbRef.current?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
