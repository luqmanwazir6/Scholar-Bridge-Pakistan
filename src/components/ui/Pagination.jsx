import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav
      className={`pagination-container ${className}`}
      aria-label="Pagination Navigation"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        paddingTop: "16px",
      }}
    >
      <div style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}>
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> results
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          style={{
            padding: "6px 10px",
            border: "1px solid var(--color-border-dark)",
            borderRadius: "6px",
            background: currentPage === 1 ? "var(--color-bg-surface)" : "#FFFFFF",
            color: currentPage === 1 ? "var(--color-text-subtle)" : "var(--color-text-main)",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaChevronLeft size={12} />
        </button>

        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            aria-current={currentPage === pageNum ? "page" : undefined}
            style={{
              padding: "6px 12px",
              border: `1px solid ${currentPage === pageNum ? "var(--color-primary)" : "var(--color-border-dark)"}`,
              borderRadius: "6px",
              background: currentPage === pageNum ? "var(--color-primary)" : "#FFFFFF",
              color: currentPage === pageNum ? "#FFFFFF" : "var(--color-text-main)",
              fontWeight: currentPage === pageNum ? "bold" : "normal",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          style={{
            padding: "6px 10px",
            border: "1px solid var(--color-border-dark)",
            borderRadius: "6px",
            background: currentPage === totalPages ? "var(--color-bg-surface)" : "#FFFFFF",
            color: currentPage === totalPages ? "var(--color-text-subtle)" : "var(--color-text-main)",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
