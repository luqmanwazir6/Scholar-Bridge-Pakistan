import React from "react";
import { useData } from "../../context/DataContext";
import { exportToCSV } from "../../utils/csvExport";
import { SEED_STUDENTS } from "../../data/seedStudents";
import { getStored } from "../../services/storageHelper";
import { API_CONFIG } from "../../config/apiConfig";
import Button from "../../components/ui/Button";
import { formatPKR, formatDate } from "../../utils/formatters";
import { FaFileCsv, FaDownload, FaChartBar, FaTable } from "react-icons/fa";

export const ReportsAnalytics = () => {
  const { applications, scholarships, payments } = useData();
  const students = getStored(API_CONFIG.STORAGE_KEYS.STUDENTS, SEED_STUDENTS);

  // 1. Export Applications CSV
  const handleExportApplications = () => {
    const columns = [
      { label: "Reference Number", key: "referenceNumber" },
      { label: "Scholarship Title", key: "scholarshipTitle" },
      { label: "Student ID", key: "studentId" },
      { label: "Status", key: "status" },
      { label: "Fee Status", key: "feeStatus" },
      { label: "Submitted Date", accessor: (row) => formatDate(row.submittedAt || row.updatedAt) },
      { label: "Admin Remarks", key: "adminRemarks" },
    ];
    exportToCSV("ScholarBridge_Applications_Report", applications, columns);
  };

  // 2. Export Payments CSV
  const handleExportPayments = () => {
    const columns = [
      { label: "Receipt Number", key: "receiptNumber" },
      { label: "Application Ref", key: "applicationReference" },
      { label: "Candidate Name", key: "studentName" },
      { label: "Amount PKR", key: "amountPKR" },
      { label: "Payment Method", key: "paymentMethodName" },
      { label: "Transaction TID", key: "transactionReference" },
      { label: "Status", key: "status" },
      { label: "Paid At", accessor: (row) => formatDate(row.paidAt, true) },
    ];
    exportToCSV("ScholarBridge_Payments_Report", payments, columns);
  };

  // 3. Export Students CSV
  const handleExportStudents = () => {
    const columns = [
      { label: "Candidate ID", key: "id" },
      { label: "Full Name", key: "fullName" },
      { label: "Father Name", key: "fatherName" },
      { label: "CNIC", key: "cnic" },
      { label: "Mobile Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "District", key: "district" },
      { label: "Degree Level", accessor: (row) => row.currentEducation?.level || "Undergraduate" },
      { label: "Institution", accessor: (row) => row.currentEducation?.institution || "Gomal University" },
      { label: "Profile %", key: "profileCompletedPercent" },
    ];
    exportToCSV("ScholarBridge_Candidate_Roster", students, columns);
  };

  return (
    <div className="page-admin-reports" style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
          Business Intelligence & Data Export
        </span>
        <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
          Reports & Export Center
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Generate auditable CSV extracts and view cross-scheme metric breakdowns.
        </p>
      </div>

      {/* CSV Export Action Cards */}
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "8px", backgroundColor: "#E0F2FE", color: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
            <FaFileCsv />
          </div>
          <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Applications Report</h3>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, flex: 1 }}>
            Extract full applicant tracking records, statuses, submission dates, and committee remarks.
          </p>
          <Button variant="primary" size="sm" onClick={handleExportApplications} icon={<FaDownload />}>
            Export Applications CSV
          </Button>
        </div>

        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "8px", backgroundColor: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
            <FaFileCsv />
          </div>
          <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Payment Transactions</h3>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, flex: 1 }}>
            Extract transaction receipts, simulated TIDs, fee sums, and reconciliation statuses.
          </p>
          <Button variant="secondary" size="sm" onClick={handleExportPayments} icon={<FaDownload />}>
            Export Payments CSV
          </Button>
        </div>

        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "8px", backgroundColor: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
            <FaFileCsv />
          </div>
          <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Candidate Registry</h3>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, flex: 1 }}>
            Extract student roster records, contact emails, district domiciles, and degree programs.
          </p>
          <Button variant="outline" size="sm" onClick={handleExportStudents} icon={<FaDownload />}>
            Export Candidates CSV
          </Button>
        </div>
      </div>

      {/* Scheme Performance Table */}
      <div className="card" style={{ padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaTable color="#0284C7" /> Scheme Submission Volumes & Quotas
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                <th style={{ padding: "10px 14px" }}>Scholarship Scheme</th>
                <th style={{ padding: "10px 14px" }}>Category</th>
                <th style={{ padding: "10px 14px" }}>Allocated Seats</th>
                <th style={{ padding: "10px 14px" }}>Received Submissions</th>
                <th style={{ padding: "10px 14px" }}>Approved / Awarded</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.slice(0, 8).map((sch) => {
                const schemeApps = applications.filter(a => a.scholarshipId === sch.id);
                const approvedApps = schemeApps.filter(a => a.status === "Approved" || a.status === "Awarded");

                return (
                  <tr key={sch.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600 }}>{sch.title}</td>
                    <td style={{ padding: "10px 14px" }}><span className="badge badge-primary">{sch.category}</span></td>
                    <td style={{ padding: "10px 14px" }}>{sch.seats || 30}</td>
                    <td style={{ padding: "10px 14px", fontWeight: "bold" }}>{schemeApps.length}</td>
                    <td style={{ padding: "10px 14px", color: "var(--color-success)", fontWeight: "bold" }}>
                      {approvedApps.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
