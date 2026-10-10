import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaBell } from "react-icons/fa";

export const NotificationItem = ({ notification, onMarkRead }) => {
  let icon = <FaBell color="var(--color-primary)" />;
  if (notification.type === "success") icon = <FaCheckCircle color="var(--color-success)" />;
  if (notification.type === "warning") icon = <FaExclamationTriangle color="var(--color-warning)" />;
  if (notification.type === "info") icon = <FaInfoCircle color="var(--color-info)" />;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: notification.read ? "#FFFFFF" : "var(--color-primary-50)",
        border: `1px solid ${notification.read ? "var(--color-border)" : "var(--color-primary-100)"}`,
        borderRadius: "var(--radius-md)",
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        transition: "background-color 0.15s ease",
      }}
    >
      <div style={{ fontSize: "18px", marginTop: "2px", flexShrink: 0 }}>
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
          <h4 style={{ fontSize: "14px", margin: 0, fontWeight: notification.read ? 600 : 700 }}>
            {notification.title}
          </h4>
          <span style={{ fontSize: "11px", color: "var(--color-text-subtle)", whiteSpace: "nowrap" }}>
            {formatDate(notification.createdAt, true)}
          </span>
        </div>

        <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "4px", marginBottom: "8px" }}>
          {notification.message}
        </p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {notification.link && (
            <Link
              to={notification.link}
              onClick={() => onMarkRead && onMarkRead(notification.id)}
              style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-primary)" }}
            >
              View Application Details →
            </Link>
          )}

          {!notification.read && onMarkRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-subtle)",
                fontSize: "11.5px",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
