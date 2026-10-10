import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import StatusBadge from "../../components/domain/StatusBadge";
import ScholarshipCard from "../../components/domain/ScholarshipCard";
import Button from "../../components/ui/Button";
import { checkEligibility } from "../../utils/eligibility";
import { formatDate } from "../../utils/formatters";
import {
  FaGraduationCap,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBookmark,
  FaArrowRight,
  FaFolderOpen,
  FaUserEdit,
} from "react-icons/fa";

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { scholarships, applications, documents, savedIds } = useData();

  const studentApps = applications.filter(a => a.studentId === currentUser?.id);
  const studentDocs = documents.filter(d => d.studentId === currentUser?.id);
  const verifiedDocsCount = studentDocs.filter(d => d.status === "Verified").length;

  const correctionApps = studentApps.filter(a => a.status === "Correction Required");
  const profilePercent = currentUser?.profileCompletedPercent || 85;

  // Compute eligible recommendations
  const eligibleRecommendations = scholarships
    .filter(s => s.status === "Published")
    .map(s => ({
      scholarship: s,
      eligibility: checkEligibility(currentUser, s),
    }))
    .filter(item => item.eligibility.eligible)
    .slice(0, 2);

  return (
    <div className="page-student-dashboard">
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          padding: "28px 32px",
          marginBottom: "28px",
          background: "linear-gradient(135deg, #FFFFFF 0%, var(--color-primary-50) 100%)",
          border: "1px solid var(--color-primary-100)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-primary)", textTransform: "uppercase" }}>
            Candidate Portal
          </div>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0 8px", color: "var(--color-text-main)" }}>
            Welcome, {currentUser?.fullName || "Ahmad Tariq Khan"}
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            {currentUser?.currentEducation?.program || "BS Computer Science"} • {currentUser?.currentEducation?.institution || "Gomal University DI Khan"}
          </p>
        </div>

        {/* Profile Completion Widget */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "16px 20px",
            borderRadius: "10px",
            border: "1px solid var(--color-border)",
            minWidth: "240px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
            <span style={{ fontWeight: 600 }}>Profile Completeness</span>
            <strong style={{ color: "var(--color-primary)" }}>{profilePercent}%</strong>
          </div>
          <div style={{ width: "100%", height: "8px", backgroundColor: "#E2E8F0", borderRadius: "9999px", overflow: "hidden", marginBottom: "8px" }}>
            <div
              style={{
                width: `${profilePercent}%`,
                height: "100%",
                backgroundColor: profilePercent >= 90 ? "var(--color-success)" : "var(--color-primary)",
              }}
            />
          </div>
          <Link to="/student/profile" style={{ fontSize: "11.5px", color: "var(--color-primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <FaUserEdit size={11} /> Update Profile Information →
          </Link>
        </div>
      </div>

      {/* Urgent Action Banner if Correction Required */}
      {correctionApps.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--color-danger-bg)",
            border: "1px solid var(--color-danger-border)",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FaExclamationTriangle color="var(--color-danger)" size={24} />
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px", color: "var(--color-danger)" }}>
                Action Required: Correction Requested by Admin Desk
              </div>
              <div style={{ fontSize: "13px", color: "var(--color-text-main)", marginTop: "2px" }}>
                Admin requested an updated document on application <strong>#{correctionApps[0].referenceNumber}</strong> ({correctionApps[0].scholarshipTitle}).
              </div>
            </div>
          </div>
          <Link to={`/student/applications/${correctionApps[0].id}`} className="btn btn-danger btn-sm">
            View & Re-upload Document →
          </Link>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid-4" style={{ marginBottom: "32px" }}>
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Total Applications</span>
            <FaFileAlt color="var(--color-primary)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-text-main)" }}>
            {studentApps.length}
          </div>
          <Link to="/student/applications" style={{ fontSize: "12px", color: "var(--color-primary)", marginTop: "8px", display: "inline-block" }}>
            View submissions →
          </Link>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Verified Documents</span>
            <FaCheckCircle color="var(--color-success)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-success)" }}>
            {verifiedDocsCount} <span style={{ fontSize: "16px", fontWeight: "normal", color: "var(--color-text-subtle)" }}>/ {studentDocs.length}</span>
          </div>
          <Link to="/student/documents" style={{ fontSize: "12px", color: "var(--color-primary)", marginTop: "8px", display: "inline-block" }}>
            Document repository →
          </Link>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Needs Attention</span>
            <FaExclamationTriangle color="var(--color-warning)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: correctionApps.length > 0 ? "var(--color-danger)" : "var(--color-text-main)" }}>
            {correctionApps.length}
          </div>
          <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "8px", display: "inline-block" }}>
            {correctionApps.length > 0 ? "Corrections pending" : "All clean"}
          </span>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Bookmarked</span>
            <FaBookmark color="var(--color-accent)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-text-main)" }}>
            {savedIds.length}
          </div>
          <Link to="/scholarships" style={{ fontSize: "12px", color: "var(--color-primary)", marginTop: "8px", display: "inline-block" }}>
            Explore schemes →
          </Link>
        </div>
      </div>

      {/* Recommended Eligible Opportunities */}
      {eligibleRecommendations.length > 0 && (
        <section style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "1.35rem", margin: 0 }}>Recommended for Your Profile</h2>
              <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", margin: 0 }}>
                Automatically evaluated against your academic percentage, domicile district ({currentUser?.district}), and degree.
              </p>
            </div>
            <Link to="/scholarships" className="btn btn-outline btn-sm">
              View All Opportunities →
            </Link>
          </div>

          <div className="grid-2">
            {eligibleRecommendations.map(({ scholarship }) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Applications Summary */}
      <section className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.35rem", margin: 0 }}>My Active Applications</h2>
          <Link to="/student/applications" className="btn btn-outline btn-sm">
            View All ({studentApps.length})
          </Link>
        </div>

        {studentApps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0", color: "var(--color-text-subtle)" }}>
            <p>You have not submitted any applications yet.</p>
            <Link to="/scholarships" className="btn btn-primary btn-sm">
              Browse Open Scholarships
            </Link>
          </div>
        ) : (
          <div className="table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", minWidth: "580px", borderCollapse: "collapse", fontSize: "13.5px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left", color: "var(--color-text-subtle)" }}>
                  <th style={{ padding: "10px 12px" }}>Reference</th>
                  <th style={{ padding: "10px 12px" }}>Scholarship Scheme</th>
                  <th style={{ padding: "10px 12px" }}>Date</th>
                  <th style={{ padding: "10px 12px" }}>Fee Status</th>
                  <th style={{ padding: "10px 12px" }}>Application Status</th>
                  <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentApps.slice(0, 5).map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "12px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                      {app.referenceNumber}
                    </td>
                    <td style={{ padding: "12px", fontWeight: 600 }}>
                      {app.scholarshipTitle}
                    </td>
                    <td style={{ padding: "12px", color: "var(--color-text-subtle)" }}>
                      {formatDate(app.submittedAt || app.updatedAt)}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "bold", color: app.feeStatus === "Paid" || app.feeStatus === "Waived" ? "var(--color-success)" : "var(--color-warning)" }}>
                        {app.feeStatus}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <StatusBadge status={app.status} />
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <Link to={`/student/applications/${app.id}`} className="btn btn-outline btn-sm">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
