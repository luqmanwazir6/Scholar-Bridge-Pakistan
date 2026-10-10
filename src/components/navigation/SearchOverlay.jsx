import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { formatPKR } from "../../utils/formatters";
import {
  LuSearch,
  LuX,
  LuArrowRight,
  LuGraduationCap,
  LuMapPin,
  LuSparkles,
} from "react-icons/lu";

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const { scholarships } = useData();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = (scholarships || []).filter((item) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.sponsor?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.educationLevel?.some((l) => l.toLowerCase().includes(q)) ||
      item.eligibility?.eligibleDistricts?.some((d) => d.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const handleSelect = (id) => {
    onClose();
    navigate(`/scholarships/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/scholarships?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search scholarships"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(10, 25, 47, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 20px 40px",
        overflowY: "auto",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div style={{ width: "100%", maxWidth: "720px", position: "relative" }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close search overlay"
          style={{
            position: "absolute",
            top: "-50px",
            right: 0,
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "#FFFFFF",
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <LuX />
        </button>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <LuSearch
              style={{
                position: "absolute",
                left: "20px",
                fontSize: "22px",
                color: "var(--color-primary)",
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, university, district, or field (e.g. D.I. Khan, Need-based)..."
              style={{
                width: "100%",
                padding: "20px 60px 20px 58px",
                fontSize: "17px",
                border: "none",
                outline: "none",
                color: "var(--color-text-main)",
                fontFamily: "inherit",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{
                  position: "absolute",
                  right: "16px",
                  background: "none",
                  border: "none",
                  color: "var(--color-text-subtle)",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                <LuX />
              </button>
            )}
          </div>
        </form>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "10px" }}>
              Popular searches:
            </div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
              {["Dera Ismail Khan", "Need-based", "Undergraduate", "Fully Funded", "Engineering"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "12.5px",
                    cursor: "pointer",
                    transition: "background var(--transition-fast)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            {results.length > 0 ? (
              <div>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--color-border)", fontSize: "12px", fontWeight: 700, color: "var(--color-text-subtle)", textTransform: "uppercase" }}>
                  Found {results.length} matching scholarships
                </div>
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid var(--color-border-subtle)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "14px",
                      transition: "background var(--transition-fast)",
                    }}
                    className="search-item-row"
                  >
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-main)", marginBottom: "4px" }}>
                        {item.title}
                      </div>
                      <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--color-text-muted)" }}>
                        <span>Sponsor: {item.sponsor}</span>
                        <span>•</span>
                        <span>Coverage: {item.financialCoverage}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", color: "var(--color-primary)", fontSize: "18px" }}>
                      <LuArrowRight />
                    </div>
                  </div>
                ))}
                <div style={{ padding: "12px 20px", textAlign: "center", backgroundColor: "var(--color-bg-subtle)" }}>
                  <button
                    onClick={handleSearchSubmit}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-primary)",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    View all matching results in directory →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--color-text-muted)" }}>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>No scholarships found for "{query}"</p>
                <p style={{ margin: "6px 0 0", fontSize: "13px", color: "var(--color-text-subtle)" }}>
                  Try searching by broader terms like "Matric", "KP", "Need-based", or "Gomal".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
