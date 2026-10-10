import React from "react";
import { formatDate } from "../../utils/formatters";
import { FaCircle, FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";

export const Timeline = ({ events = [], className = "" }) => {
  if (!events || events.length === 0) {
    return (
      <div style={{ color: "var(--color-text-subtle)", fontSize: "13px", padding: "12px 0" }}>
        No timeline events recorded yet.
      </div>
    );
  }

  return (
    <div className={`timeline-container ${className}`} style={{ position: "relative", padding: "8px 0" }}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {events.map((event, idx) => {
          const isLast = idx === events.length - 1;
          const isError = event.title?.toLowerCase().includes("correction") || event.title?.toLowerCase().includes("rejected");
          const isSuccess = event.title?.toLowerCase().includes("approved") || event.title?.toLowerCase().includes("awarded") || event.title?.toLowerCase().includes("verified");

          return (
            <li
              key={event.id || idx}
              style={{
                display: "flex",
                gap: "16px",
                position: "relative",
                paddingBottom: isLast ? "0" : "24px",
              }}
            >
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "22px",
                    bottom: "0",
                    width: "2px",
                    backgroundColor: "var(--color-border)",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Status node */}
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: isError
                    ? "var(--color-danger-bg)"
                    : isSuccess
                    ? "var(--color-success-bg)"
                    : "var(--color-primary-50)",
                  color: isError
                    ? "var(--color-danger)"
                    : isSuccess
                    ? "var(--color-success)"
                    : "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  zIndex: 2,
                  border: `2px solid ${
                    isError
                      ? "var(--color-danger)"
                      : isSuccess
                      ? "var(--color-success)"
                      : "var(--color-primary)"
                  }`,
                }}
              >
                {isSuccess ? (
                  <FaCheckCircle size={12} />
                ) : isError ? (
                  <FaExclamationCircle size={12} />
                ) : (
                  <FaClock size={11} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                  <h4 style={{ fontSize: "14px", margin: 0, color: "var(--color-text-main)" }}>
                    {event.title}
                  </h4>
                  <time style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>
                    {formatDate(event.date, true)}
                  </time>
                </div>
                {event.note && (
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "4px", lineHeight: "1.4" }}>
                    {event.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Timeline;
