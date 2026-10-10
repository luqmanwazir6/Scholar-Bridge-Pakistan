import React from "react";

export const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "var(--color-bg-hover)",
        backgroundImage: "linear-gradient(90deg, var(--color-bg-hover) 0%, #cbd5e1 50%, var(--color-bg-hover) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
