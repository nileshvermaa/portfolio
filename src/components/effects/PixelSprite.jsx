import React from "react";

/**
 * Walking pixel sprite — a tiny retro mushroom rendered via inline SVG.
 * Walks across the bottom of the screen on a loop (24s cycle).
 * Hidden under prefers-reduced-motion via .pixel-sprite CSS rule.
 *
 * SVG over PNG so it stays crisp and themeable, and we avoid shipping
 * a raster image.
 */
const PixelSprite = () => (
  <svg
    className="pixel-sprite"
    viewBox="0 0 16 16"
    aria-hidden="true"
    shapeRendering="crispEdges"
  >
    {/* cap — red */}
    <rect x="4" y="1" width="8" height="1" fill="#d33" />
    <rect x="3" y="2" width="10" height="1" fill="#d33" />
    <rect x="2" y="3" width="12" height="2" fill="#d33" />
    <rect x="1" y="5" width="14" height="2" fill="#d33" />
    {/* white spots */}
    <rect x="3" y="3" width="2" height="2" fill="#fff" />
    <rect x="11" y="3" width="2" height="2" fill="#fff" />
    <rect x="6" y="5" width="2" height="2" fill="#fff" />
    {/* face */}
    <rect x="3" y="7" width="10" height="3" fill="#f3d2a4" />
    {/* eyes */}
    <rect x="5" y="8" width="1" height="2" fill="#000" />
    <rect x="10" y="8" width="1" height="2" fill="#000" />
    {/* feet */}
    <rect x="3" y="10" width="4" height="3" fill="#f3d2a4" />
    <rect x="9" y="10" width="4" height="3" fill="#f3d2a4" />
    <rect x="3" y="13" width="4" height="1" fill="#000" />
    <rect x="9" y="13" width="4" height="1" fill="#000" />
  </svg>
);

export default PixelSprite;
