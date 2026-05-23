import React from "react";

const BlinkingCursor = ({ char = "█", className = "" }) => (
  <span
    aria-hidden="true"
    className={`retro-blink inline-block text-retro-accent ${className}`}
  >
    {char}
  </span>
);

export default BlinkingCursor;
