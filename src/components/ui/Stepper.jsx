import React from "react";
import { FaCheck } from "react-icons/fa";

export const Stepper = ({
  steps = [], // [{ id, title, subtitle }]
  currentStepIndex = 0,
  onStepClick = null,
  className = "",
}) => {
  return (
    <nav
      aria-label="Application Progress Stepper"
      className={`stepper-nav ${className}`}
      style={{
        margin: "24px 0",
        padding: "16px 20px",
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "relative",
          overflowX: "auto",
          gap: "12px",
        }}
      >
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <li
              key={step.id || idx}
              aria-current={isActive ? "step" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: "1 0 auto",
                opacity: isPending ? 0.6 : 1,
                cursor: onStepClick && isCompleted ? "pointer" : "default",
              }}
              onClick={() => onStepClick && isCompleted && onStepClick(idx)}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "13px",
                  backgroundColor: isCompleted
                    ? "var(--color-success)"
                    : isActive
                    ? "var(--color-primary)"
                    : "var(--color-bg-surface)",
                  color: isCompleted || isActive ? "#FFFFFF" : "var(--color-text-subtle)",
                  border: `2px solid ${
                    isCompleted
                      ? "var(--color-success)"
                      : isActive
                      ? "var(--color-primary)"
                      : "var(--color-border-dark)"
                  }`,
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                {isCompleted ? <FaCheck size={12} /> : idx + 1}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--color-primary)" : "var(--color-text-main)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-subtle)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.subtitle}
                  </span>
                )}
              </div>

              {idx < steps.length - 1 && (
                <div
                  style={{
                    height: "2px",
                    flex: "1 1 20px",
                    minWidth: "15px",
                    backgroundColor: isCompleted ? "var(--color-success)" : "var(--color-border)",
                    marginInline: "6px",
                  }}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
