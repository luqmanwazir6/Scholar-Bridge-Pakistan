import React from "react";
import { LuArrowRight, LuLoader } from "react-icons/lu";

export const Button = ({
  children,
  variant = "primary", // primary, secondary, outline, ghost, danger, accent
  size = "md", // sm, md, lg
  loading = false,
  disabled = false,
  withArrow = false,
  icon = null,
  onClick,
  type = "button",
  className = "",
  style = {},
  ...props
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn ${variantClass} ${sizeClass} ${withArrow ? "btn-with-arrow" : ""} ${className}`}
      style={style}
      {...props}
    >
      {loading ? (
        <LuLoader
          className="btn-spinner"
          style={{
            animation: "spin 0.7s linear infinite",
            fontSize: size === "sm" ? "14px" : "18px",
          }}
        />
      ) : icon ? (
        <span className="btn-icon-prefix" style={{ display: "inline-flex", alignItems: "center" }}>
          {icon}
        </span>
      ) : null}

      <span className="btn-label">{children}</span>

      {withArrow && !loading && (
        <span className="btn-arrow-icon" aria-hidden="true">
          <LuArrowRight />
        </span>
      )}
    </button>
  );
};

export default Button;
