import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { formatDate } from "../../utils/formatters";
import { FaHistory, FaSearch, FaFilter } from "react-icons/fa";

export const AuditLogs = () => {
  const { auditLogs } = useData();

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  const filtered = auditLogs.filter(log => {
    const matchesSearch =
      log.targetReference?.toLowerCase().includes(search.toLowerCase()) ||
      log.details?.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "All" || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="page-admin-audit" style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
          Compliance & Accountability Trail
        </span>
        <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
          Administrative Audit Trail Logs
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Every status update, document verification check, correction request, and award decision is cryptographically logged.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 260px" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search audit trail by actor, candidate, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ width: "220px" }}>
          <select
            className="form-select"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="All">All Audit Actions</option>
            <option value="DOCUMENT_VERIFIED">Document Verified</option>
            <option value="DOCUMENT_REJECTED">Document Rejected</option>
            <option value="CORRECTION_REQUESTED">Correction Requested</option>
            <option value="APPLICATION_STATUS_UPDATED">Status Transition</option>
            <option value="AWARD_DISBURSED">Award Disbursed</option>
            <option value="SCHOLARSHIP_CREATED">Scholarship Created</option>
            <option value="PAYMENT_SIMULATED">Payment Simulated</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 14px", width: "110px" }}>Log ID</th>
              <th style={{ padding: "12px 14px", width: "160px" }}>Timestamp</th>
              <th style={{ padding: "12px 14px" }}>Action</th>
              <th style={{ padding: "12px 14px" }}>Target Entity</th>
              <th style={{ padding: "12px 14px" }}>Officer (Actor)</th>
              <th style={{ padding: "12px 14px" }}>Audit Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                  {log.id}
                </td>
                <td style={{ padding: "12px 14px", color: "var(--color-text-subtle)", whiteSpace: "nowrap" }}>
                  {formatDate(log.timestamp, true)}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span
                    className={`badge ${
                      log.action.includes("VERIFIED") || log.action.includes("AWARD")
                        ? "badge-success"
                        : log.action.includes("CORRECTION")
                        ? "badge-warning"
                        : "badge-primary"
                    }`}
                  >
                    {log.action.replace(/_/g, " ")}
                  </span>
                </td>
                <td style={{ padding: "12px 14px", fontWeight: 600 }}>
                  {log.targetReference || log.targetId}
                </td>
                <td style={{ padding: "12px 14px", color: "var(--color-text-subtle)" }}>
                  {log.actorName}
                </td>
                <td style={{ padding: "12px 14px", color: "var(--color-text-muted)" }}>
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
