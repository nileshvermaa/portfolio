import React from "react";

const BeveledPanel = ({
  as: Tag = "div",
  inset = false,
  title,
  className = "",
  bodyClassName = "",
  children,
  ...rest
}) => {
  return (
    <Tag
      className={`${inset ? "bevel-in" : "bevel-out"} ${className}`}
      {...rest}
    >
      {title && (
        <div className="bg-retro-chrome text-retro-chrome-fg font-sys text-xs px-2 py-1 flex items-center justify-between border-b-2 border-retro-border-dark">
          <span className="font-bold tracking-wide">{title}</span>
          <span className="font-mono" aria-hidden="true">
            [_] [□] [×]
          </span>
        </div>
      )}
      <div className={`p-3 ${bodyClassName}`}>{children}</div>
    </Tag>
  );
};

export default BeveledPanel;
