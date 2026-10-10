import React from "react";

export const Badge = ({
  children,
  variant = "primary", // primary, success, warning, danger, neutral, sample
  icon = null,
  className = "",
  style = {},
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {icon && <span style={{ display: "inline-flex", marginRight: "3px" }}>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
