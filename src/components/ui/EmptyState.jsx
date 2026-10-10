import React from "react";
import Button from "./Button";

export const EmptyState = ({
  icon = "🔍",
  title = "No Items Found",
  description = "There are no records matching your current filter criteria.",
  actionLabel = null,
  onAction = null,
  className = "",
}) => {
  return (
    <div
      className={`empty-state-card ${className}`}
      style={{
        padding: "48px 24px",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--color-border-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "500px",
        margin: "24px auto",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "16px",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-text-main)" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "var(--color-text-subtle)", maxWidth: "380px", marginBottom: actionLabel ? "20px" : 0 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
