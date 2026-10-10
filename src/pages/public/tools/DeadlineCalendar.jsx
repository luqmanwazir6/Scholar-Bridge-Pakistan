import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import { getDeadlineStatus, formatPKR } from "../../../utils/formatters";
import {
  LuCalendar,
  LuClock,
  LuFilter,
  LuArrowRight,
  LuMapPin,
  LuGraduationCap,
} from "react-icons/lu";

export const DeadlineCalendar = () => {
  const { scholarships, loading } = useData();
  const [filterLevel, setFilterLevel] = useState("all");

  const sortedScholarships = [...(scholarships || [])].sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const filtered = sortedScholarships.filter((item) => {
    if (filterLevel === "all") return true;
    return item.educationLevel?.includes(filterLevel);
  });

  return (
    <div className="container" style={{ padding: "48px 16px", maxWidth: "1000px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link> / <span>Tools</span> / <span style={{ color: "var(--color-text-main)" }}>Deadline Calendar</span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "12px", color: "var(--color-primary-dark)" }}>
          Scholarship Deadline Calendar
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "16px", maxWidth: "650px", margin: "0 auto" }}>
          Never miss an application cut-off date. Track ongoing grant cycles sorted by submission urgency.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All Levels" },
            { key: "Intermediate", label: "Intermediate" },
            { key: "Undergraduate", label: "Bachelor / Undergraduate" },
            { key: "Master", label: "Master / MS" },
            { key: "PhD", label: "PhD / Doctoral" },
          ].map((lvl) => (
            <button
              key={lvl.key}
              onClick={() => setFilterLevel(lvl.key)}
              className={`btn btn-sm ${filterLevel === lvl.key ? "btn-primary" : "btn-outline"}`}
              style={{ borderRadius: "var(--radius-full)" }}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
          Showing <strong>{filtered.length}</strong> active schedules
        </div>
      </div>

      {/* Timeline Card Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filtered.map((item) => {
          const deadlineInfo = getDeadlineStatus(item.deadline);
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "20px 24px",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow var(--transition-fast)",
              }}
              className="calendar-card"
            >
              {/* Date Column */}
              <div
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: deadlineInfo.isUrgent ? "rgba(239, 68, 68, 0.08)" : "rgba(13, 71, 161, 0.06)",
                  border: deadlineInfo.isUrgent ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(13, 71, 161, 0.15)",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: deadlineInfo.isUrgent ? "var(--color-danger)" : "var(--color-primary)" }}>
                  {deadlineInfo.label}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-text-main)", margin: "4px 0" }}>
                  {item.deadline}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--color-text-subtle)" }}>
                  Closing Date
                </div>
              </div>

              {/* Scholarship Details */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-primary)", background: "rgba(13, 71, 161, 0.08)", padding: "2px 8px", borderRadius: "4px" }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>
                    Sponsor: <strong>{item.sponsor}</strong>
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
                  <Link to={`/scholarships/${item.id}`} style={{ color: "var(--color-text-main)", textDecoration: "none" }}>
                    {item.title}
                  </Link>
                </h3>

                <div style={{ display: "flex", gap: "16px", fontSize: "12.5px", color: "var(--color-text-muted)", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <LuGraduationCap color="var(--color-primary)" /> {item.educationLevel?.join(", ")}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <LuMapPin color="var(--color-secondary)" /> {item.eligibility?.eligibleDistricts?.[0] || "Pakistan"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div>
                <Link
                  to={`/scholarships/${item.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: "var(--radius-full)", padding: "10px 18px", whiteSpace: "nowrap" }}
                >
                  Apply <LuArrowRight />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadlineCalendar;
