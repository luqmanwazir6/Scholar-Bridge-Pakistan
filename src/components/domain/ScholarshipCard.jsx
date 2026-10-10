import React from "react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatPKR, getDeadlineStatus } from "../../utils/formatters";
import { checkEligibility } from "../../utils/eligibility";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import {
  LuHeart,
  LuClock,
  LuCalendar,
  LuMapPin,
  LuGraduationCap,
  LuSparkles,
  LuCircleCheck,
  LuInfo,
  LuArrowRight,
} from "react-icons/lu";

// Curated collection of academic banner gradients/fallbacks
const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0A2540 0%, #153E75 100%)",
  "linear-gradient(135deg, #0F3E3B 0%, #175F5B 100%)",
  "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
  "linear-gradient(135deg, #1C1917 0%, #292524 100%)",
  "linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)",
];

export const ScholarshipCard = ({ scholarship, viewMode = "grid" }) => {
  const { currentUser, isStudent } = useAuth();
  const { savedIds, toggleSaveScholarship } = useData();

  const isSaved = savedIds?.includes(scholarship.id);
  const deadlineInfo = getDeadlineStatus(scholarship.deadline);
  const eligibility = isStudent ? checkEligibility(currentUser, scholarship) : null;
  const isFree = Number(scholarship.applicationFee) === 0;

  // Stable gradient based on ID
  const charSum = (scholarship.id || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = CARD_GRADIENTS[charSum % CARD_GRADIENTS.length];

  return (
    <article
      className={`scholarship-card ${viewMode === "list" ? "scholarship-card--list" : ""}`}
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        display: "flex",
        flexDirection: viewMode === "list" ? "row" : "column",
        transition: "transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-fast)",
        position: "relative",
      }}
    >
      {/* Top Banner / Image Header */}
      <div
        className="scholarship-card__header"
        style={{
          height: viewMode === "list" ? "auto" : "130px",
          width: viewMode === "list" ? "240px" : "100%",
          minWidth: viewMode === "list" ? "240px" : "auto",
          background: gradient,
          position: "relative",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Top Badges & Heart Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "3px 8px",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.3px",
              }}
            >
              {scholarship.category}
            </span>
            {isFree ? (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#10B981",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  backdropFilter: "blur(8px)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                100% Free
              </span>
            ) : (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#FCD34D",
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  backdropFilter: "blur(8px)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Fee: {formatPKR(scholarship.applicationFee)}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            aria-label={isSaved ? "Remove from saved scholarships" : "Save scholarship"}
            className="save-btn"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "var(--radius-full)",
              background: isSaved ? "var(--color-accent)" : "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "none",
              color: isSaved ? "#FFFFFF" : "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              transition: "transform var(--transition-fast), background var(--transition-fast)",
            }}
            title={isSaved ? "Saved to your list" : "Save for later"}
          >
            <LuHeart fill={isSaved ? "#FFFFFF" : "none"} />
          </button>
        </div>

        {/* Sponsor Name / Watermark */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "var(--color-primary-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            {scholarship.sponsor?.charAt(0) || "S"}
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {scholarship.sponsor}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div
        className="scholarship-card__body"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Sample tag */}
        <div style={{ marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--color-text-subtle)",
              backgroundColor: "var(--color-bg-subtle)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            Sample Data – Not Official
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            lineHeight: "1.35",
            marginBottom: "10px",
          }}
        >
          <Link
            to={`/scholarships/${scholarship.id}`}
            style={{
              color: "var(--color-text-main)",
              textDecoration: "none",
              transition: "color var(--transition-fast)",
            }}
            className="scholarship-title-link"
          >
            {scholarship.title}
          </Link>
        </h3>

        {/* Financial Coverage Callout */}
        <div
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            padding: "9px 12px",
            borderRadius: "var(--radius-md)",
            borderLeft: "3px solid var(--color-accent)",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "var(--color-text-main)",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LuSparkles color="var(--color-accent)" style={{ flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {scholarship.financialCoverage}
          </span>
        </div>

        {/* Metadata Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            fontSize: "12.5px",
            color: "var(--color-text-muted)",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <LuGraduationCap color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {scholarship.educationLevel?.slice(0, 2).join(", ") || "All Levels"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <LuMapPin color="var(--color-secondary)" style={{ flexShrink: 0 }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {scholarship.eligibility?.eligibleDistricts?.[0] || "Pakistan"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              gridColumn: "span 2",
              color: deadlineInfo.isUrgent ? "var(--color-danger)" : "var(--color-text-muted)",
              fontWeight: deadlineInfo.isUrgent ? 600 : 500,
            }}
          >
            <LuClock style={{ flexShrink: 0 }} />
            <span>
              Deadline: {scholarship.deadline} ({deadlineInfo.label})
            </span>
          </div>
        </div>

        {/* Profile Eligibility Indicator (for logged in students) */}
        {eligibility && (
          <div
            style={{
              marginTop: "auto",
              marginBottom: "14px",
              padding: "7px 10px",
              borderRadius: "var(--radius-md)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor:
                eligibility.status === "eligible"
                  ? "var(--color-success-bg)"
                  : eligibility.status === "ineligible"
                  ? "var(--color-danger-bg)"
                  : "var(--color-bg-subtle)",
              color:
                eligibility.status === "eligible"
                  ? "var(--color-success)"
                  : eligibility.status === "ineligible"
                  ? "var(--color-danger)"
                  : "var(--color-text-subtle)",
              fontWeight: 600,
            }}
          >
            {eligibility.status === "eligible" ? (
              <LuCircleCheck style={{ flexShrink: 0 }} />
            ) : (
              <LuInfo style={{ flexShrink: 0 }} />
            )}
            <span>{eligibility.label}</span>
          </div>
        )}

        {/* Card Footer Actions */}
        <div
          style={{
            marginTop: eligibility ? "0" : "auto",
            paddingTop: "14px",
            borderTop: "1px solid var(--color-border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            to={`/scholarships/${scholarship.id}`}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--color-primary)",
              textDecoration: "none",
            }}
          >
            View Details
          </Link>

          {deadlineInfo.isClosed ? (
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>
              Closed
            </span>
          ) : (
            <Link
              to={
                isStudent
                  ? `/student/apply/${scholarship.id}`
                  : `/student/login?redirect=/student/apply/${scholarship.id}`
              }
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: "var(--radius-full)",
                padding: "8px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Apply</span>
              <LuArrowRight style={{ fontSize: "14px" }} />
            </Link>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .scholarship-card--list {
            flex-direction: column !important;
          }
          .scholarship-card--list .scholarship-card__header {
            width: 100% !important;
            min-width: 100% !important;
            height: 120px !important;
          }
        }
      `}</style>
    </article>
  );
};

export default ScholarshipCard;
