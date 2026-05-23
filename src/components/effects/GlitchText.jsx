import React from "react";

/**
 * Wraps children in an element that applies the retro RGB-shift glitch
 * animation on hover (defined in styles/animations.css).
 * Automatically disabled by prefers-reduced-motion via the CSS rule.
 */
const GlitchText = ({ children, as: Tag = "span", className = "", ...rest }) => (
  <Tag className={`retro-glitch ${className}`} {...rest}>
    {children}
  </Tag>
);

export default GlitchText;
