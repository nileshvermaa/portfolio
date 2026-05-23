import React, { useEffect } from "react";

/**
 * Mounts the scanline + CRT vignette classes on <body>.
 * Honors the data-scanlines flag set by useTheme.
 */
const ScanlineOverlay = () => {
  useEffect(() => {
    document.body.classList.add("retro-scanlines", "retro-crt");
    return () => {
      document.body.classList.remove("retro-scanlines", "retro-crt");
    };
  }, []);
  return null;
};

export default ScanlineOverlay;
