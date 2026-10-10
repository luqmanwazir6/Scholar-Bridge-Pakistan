import React from "react";

export const Tabs = ({
  tabs = [], // [{ id, label, icon, count }]
  activeTab,
  onChange,
  className = "",
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter Navigation"
      className={`tabs-nav ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderBottom: "1px solid var(--color-border)",
        overflowX: "auto",
        marginBottom: "20px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            style={{
              padding: "10px 16px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${isActive ? "var(--color-primary)" : "transparent"}`,
              color: isActive ? "var(--color-primary)" : "var(--color-text-subtle)",
              fontWeight: isActive ? 600 : 500,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  backgroundColor: isActive ? "var(--color-primary-50)" : "var(--color-bg-surface)",
                  color: isActive ? "var(--color-primary)" : "var(--color-text-subtle)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "2px 7px",
                  borderRadius: "9999px",
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
