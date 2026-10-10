import React from "react";

export const Table = ({
  columns = [],
  data = [],
  keyField = "id",
  emptyMessage = "No records found.",
  className = "",
}) => {
  return (
    <div
      className={`table-responsive-wrapper ${className}`}
      style={{
        width: "100%",
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "var(--color-bg-surface)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  padding: "12px 16px",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  whiteSpace: "nowrap",
                  textAlign: col.align || "left",
                  ...col.headerStyle,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  color: "var(--color-text-subtle)",
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr
                key={row[keyField] || rIdx}
                style={{
                  borderBottom: rIdx < data.length - 1 ? "1px solid var(--color-border)" : "none",
                  transition: "background-color 0.15s ease",
                }}
                className="table-row-hover"
              >
                {columns.map((col, cIdx) => {
                  let content = "";
                  if (typeof col.render === "function") {
                    content = col.render(row, rIdx);
                  } else if (col.key && row[col.key] !== undefined) {
                    content = row[col.key];
                  }

                  return (
                    <td
                      key={col.key || cIdx}
                      style={{
                        padding: "12px 16px",
                        color: "var(--color-text-main)",
                        verticalAlign: "middle",
                        textAlign: col.align || "left",
                        ...col.cellStyle,
                      }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
