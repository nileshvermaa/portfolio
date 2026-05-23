import { useEffect, useState, useCallback } from "react";

export const THEMES = ["terminal", "amber", "mono", "win95"];
const STORAGE_KEY = "nilesh.sys.theme";
const SCANLINE_KEY = "nilesh.sys.scanlines";

function readStored(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const stored = readStored(STORAGE_KEY, "mono");
    return THEMES.includes(stored) ? stored : "mono";
  });
  const [scanlines, setScanlinesState] = useState(
    () => readStored(SCANLINE_KEY, "off") !== "off"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* swallow — private mode etc. */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-scanlines",
      scanlines ? "on" : "off"
    );
    try {
      window.localStorage.setItem(SCANLINE_KEY, scanlines ? "on" : "off");
    } catch {
      /* swallow */
    }
  }, [scanlines]);

  const setTheme = useCallback((next) => {
    if (THEMES.includes(next)) setThemeState(next);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length]);
  }, []);

  const toggleScanlines = useCallback(
    () => setScanlinesState((s) => !s),
    []
  );

  return { theme, setTheme, cycleTheme, scanlines, toggleScanlines };
}
