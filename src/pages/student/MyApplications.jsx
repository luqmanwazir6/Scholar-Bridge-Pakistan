import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import StatusBadge from "../../components/domain/StatusBadge";
import Tabs from "../../components/ui/Tabs";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../utils/formatters";
import { FaFileAlt, FaEdit, FaEye, FaPrint, FaArrowRight } from "react-icons/fa";

export const MyApplications = () => {
  const { currentUser } = useAuth();
  const { applications } = useData();

  const [activeTab, setActiveTab] = useState("All");

  const studentApps = applications.filter(a => a.studentId === currentUser?.id);

  const tabs = [
    { id: "All", label: "All Submissions", count: studentApps.length },
    { id: "Under Review", label: "Under Review", count: studentApps.filter(a => a.status === "Under Review" || a.status === "Submitted").length },
    { id: "Correction Required", label: "Correction Required", count: studentApps.filter(a => a.status === "Correction Required").length },
    { id: "Approved", label: "Approved / Awarded", count: studentApps.filter(a => a.status === "Approved" || a.status === "Awarded").length },
    { id: "Draft", label: "Drafts", count: studentApps.filter(a => a.status === "Draft").length },
  ];

  const filteredApps = studentApps.filter(app => {
    if (activeTab === "All") return true;
    if (activeTab === "Under Review") return app.status === "Under Review" || app.status === "Submitted";
    if (activeTab === "Approved") return app.status === "Approved" || app.status === "Awarded";
    return app.status === activeTab;
  });

  return (
    <div className="page-my-applications" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>My Scholarship Applications</h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Track the verification progress, response to corrections, and grant award statuses.
          </p>
        </div>

        <Link to="/scholarships" className="btn btn-primary btn-sm">
          Apply for New Scholarship →
        </Link>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          title="No Applications in this Category"
          description="You don't have any applications matching the selected status filter."
          actionLabel="Explore Scholarships"
          onAction={() => window.location.href = "/scholarships"}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="card"
              style={{
                padding: "24px",
                border: `1px solid ${app.status === "Correction Required" ? "var(--color-danger-border)" : "var(--color-border)"}`,
                backgroundColor: app.status === "Correction Required" ? "var(--color-danger-bg)" : "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "bold", fontSize: "15px", color: "var(--color-primary-dark)" }}>
                      {app.referenceNumber}
                    </span>
                    <StatusBadge status={app.status} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", margin: "4px 0 2px" }}>
                    {app.scholarshipTitle}
                  </h3>
                  <div style={{ fontSize: "12.5px", color: "var(--color-text-subtle)" }}>
                    {app.submittedAt ? `Submitted on: ${formatDate(app.submittedAt, true)}` : `Draft updated on: ${formatDate(app.updatedAt)}`}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {app.status === "Draft" ? (
                    <Link to={`/student/apply/${app.scholarshipId}`} className="btn btn-primary btn-sm">
                      <FaEdit /> Resume Draft
                    </Link>
                  ) : (
                    <>
                      <Link to={`/student/applications/${app.id}/preview`} className="btn btn-outline btn-sm">
                        <FaPrint /> Print Summary
                      </Link>
                      <Link to={`/student/applications/${app.id}`} className="btn btn-primary btn-sm">
                        <FaEye /> View Progress
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Correction Callout Banner */}
              {app.status === "Correction Required" && app.correctionRequest && (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--color-danger-border)",
                    borderRadius: "6px",
                    padding: "12px 16px",
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "var(--color-danger)",
                  }}
                >
                  <strong>Correction Notice:</strong> {app.correctionRequest.message} (Deadline: {app.correctionRequest.deadline})
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
