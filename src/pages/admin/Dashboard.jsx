import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import StatusBadge from "../../components/domain/StatusBadge";
import { formatDate, formatPKR } from "../../utils/formatters";
import {
  FaFileInvoice,
  FaCheckDouble,
  FaMoneyCheckAlt,
  FaAward,
  FaExclamationTriangle,
  FaArrowRight,
  FaHistory,
} from "react-icons/fa";

export const AdminDashboard = () => {
  const { scholarships, applications, documents, payments, auditLogs } = useData();

  // Metrics
  const totalApps = applications.length;
  const underReviewCount = applications.filter(a => a.status === "Under Review" || a.status === "Submitted").length;
  const correctionCount = applications.filter(a => a.status === "Correction Required").length;
  const approvedCount = applications.filter(a => a.status === "Approved" || a.status === "Awarded").length;

  const pendingDocsCount = documents.filter(d => d.status === "Uploaded" || d.status === "Under Verification").length;
  const pendingPaymentsCount = payments.filter(p => p.status === "Manual Verification Pending").length;
  const totalFeeCollected = payments
    .filter(p => p.status.includes("Successful") || p.status === "Verified")
    .reduce((sum, p) => sum + (Number(p.amountPKR) || 0), 0);

  // Status breakdown data for CSS/SVG charts
  const statusCounts = {
    Submitted: applications.filter(a => a.status === "Submitted").length,
    "Under Review": applications.filter(a => a.status === "Under Review").length,
    "Correction Required": applications.filter(a => a.status === "Correction Required").length,
    Approved: applications.filter(a => a.status === "Approved").length,
    Awarded: applications.filter(a => a.status === "Awarded").length,
    Draft: applications.filter(a => a.status === "Draft").length,
  };

  return (
    <div className="page-admin-dashboard">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
            Operational Overview
          </span>
          <h1 style={{ fontSize: "2rem", margin: "4px 0" }}>
            Provincial Verification & Review Desk
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Active regional scholarship monitoring for Dera Ismail Khan and KPK.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/admin/scholarships/new" className="btn btn-primary btn-sm">
            + Create New Scholarship
          </Link>
          <Link to="/admin/reports" className="btn btn-outline btn-sm">
            Export CSV Reports
          </Link>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid-4" style={{ marginBottom: "28px" }}>
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Total Applications</span>
            <FaFileInvoice color="#0284C7" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>{totalApps}</div>
          <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
            {underReviewCount} pending desk decision
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Doc Verification Queue</span>
            <FaCheckDouble color="var(--color-warning)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: pendingDocsCount > 0 ? "var(--color-warning)" : "inherit" }}>
            {pendingDocsCount}
          </div>
          <Link to="/admin/documents" style={{ fontSize: "12px", color: "var(--color-primary)", marginTop: "4px", display: "inline-block" }}>
            Open Verification Desk →
          </Link>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Simulated Fees Reconciled</span>
            <FaMoneyCheckAlt color="var(--color-success)" size={18} />
          </div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-success)" }}>
            PKR {totalFeeCollected.toLocaleString()}
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
            {pendingPaymentsCount} bank slips in queue
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", fontWeight: 600 }}>Active Schemes</span>
            <FaAward color="var(--color-accent)" size={18} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>
            {scholarships.filter(s => s.status === "Published").length}
          </div>
          <Link to="/admin/scholarships" style={{ fontSize: "12px", color: "var(--color-primary)", marginTop: "4px", display: "inline-block" }}>
            Manage Schemes →
          </Link>
        </div>
      </div>

      {/* Two Columns: Visual CSS/SVG Chart Breakdown + Audit Log Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* CSS Bar Chart: Application Pipeline */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "6px" }}>Application Pipeline Distribution</h2>
          <p style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
            Real-time status breakdown across all student submissions:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {Object.entries(statusCounts).map(([st, count]) => {
              const pct = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
              return (
                <div key={st}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600 }}>{st}</span>
                    <span>{count} applications ({pct}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "10px", backgroundColor: "var(--color-bg-surface)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        backgroundColor:
                          st === "Awarded" ? "var(--color-success)" :
                          st === "Approved" ? "var(--color-primary)" :
                          st === "Correction Required" ? "var(--color-danger)" :
                          st === "Under Review" ? "var(--color-warning)" : "#94A3B8",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Trail Quick Preview */}
        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <FaHistory color="#0284C7" /> Recent Audit Actions
            </h2>
            <Link to="/admin/audit-logs" style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 600 }}>
              Full Log →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, overflowY: "auto", maxHeight: "280px" }}>
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                style={{
                  padding: "10px 12px",
                  backgroundColor: "var(--color-bg-surface)",
                  borderRadius: "6px",
                  fontSize: "12.5px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, color: "var(--color-text-main)" }}>
                  <span>{log.action.replace(/_/g, " ")}</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-subtle)", fontWeight: "normal" }}>
                    {formatDate(log.timestamp, true)}
                  </span>
                </div>
                <div style={{ color: "var(--color-text-subtle)", marginTop: "2px" }}>
                  Target: {log.targetReference}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Queue Table */}
      <section className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Review Desk Queue</h2>
            <p style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", margin: 0 }}>
              Applications awaiting document check or committee endorsement
            </p>
          </div>
          <Link to="/admin/applications" className="btn btn-outline btn-sm">
            View All Applications Desk ({applications.length})
          </Link>
        </div>

        <div className="table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left", color: "var(--color-text-subtle)" }}>
                <th style={{ padding: "10px 12px" }}>Reference</th>
                <th style={{ padding: "10px 12px" }}>Scholarship Scheme</th>
                <th style={{ padding: "10px 12px" }}>Submitted</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
                <th style={{ padding: "10px 12px", textAlign: "right" }}>Review Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 6).map((app) => (
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
                    <StatusBadge status={app.status} />
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <Link to={`/admin/applications?ref=${app.referenceNumber}`} className="btn btn-primary btn-sm">
                      Inspect & Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
