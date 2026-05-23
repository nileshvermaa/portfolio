import React from "react";

/**
 * Win95-style dialog window shell.
 * title    — title bar text
 * icon     — optional emoji/char before the title
 * onClose  — if provided, the [×] button calls it; otherwise decorative
 * className — applied to the outer wrapper
 */
const DialogWindow = ({
  title,
  icon,
  onClose,
  className = "",
  children,
}) => {
  return (
    <div className={`bevel-out ${className}`}>
      {/* ── Title bar ── */}
      <div className="bg-retro-chrome text-retro-chrome-fg flex items-center justify-between px-2 py-[3px] font-sys text-xs select-none">
        <div className="flex items-center gap-1 font-bold">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </div>
        <div className="flex gap-[2px]" aria-hidden>
          {["_", "□"].map((c) => (
            <span
              key={c}
              className="bevel-out inline-flex items-center justify-center font-sys text-[10px] cursor-not-allowed"
              style={{ width: 16, height: 14 }}
            >
              {c}
            </span>
          ))}
          <span
            role={onClose ? "button" : undefined}
            tabIndex={onClose ? 0 : undefined}
            aria-label={onClose ? "Close dialog" : undefined}
            onClick={onClose}
            onKeyDown={
              onClose
                ? (e) => (e.key === "Enter" || e.key === " ") && onClose()
                : undefined
            }
            className={`bevel-out inline-flex items-center justify-center font-sys text-[10px] ${
              onClose ? "cursor-pointer hover:bg-red-700 hover:text-white" : "cursor-not-allowed"
            }`}
            style={{ width: 16, height: 14 }}
          >
            ×
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      {children}
    </div>
  );
};

export default DialogWindow;
