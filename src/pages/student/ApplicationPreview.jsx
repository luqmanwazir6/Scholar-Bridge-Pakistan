import React from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/domain/StatusBadge";
import { formatDate, formatPKR, maskCNIC } from "../../utils/formatters";
import { BRAND } from "../../config/brand";
import { FaPrint, FaArrowLeft } from "react-icons/fa";

export const ApplicationPreview = () => {
  const { id } = useParams();
  const { applications } = useData();
  const { currentUser } = useAuth();

  const application = applications.find(a => a.id === id || a.referenceNumber === id);

  if (!application) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Application Not Found</h2>
        <Link to="/student/applications" className="btn btn-primary">Back to Applications</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const data = application.wizardData || {};

  return (
    <div className="page-app-preview" style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Top action bar (hidden during print) */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Link to={`/student/applications/${application.id}`} style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaArrowLeft size={12} /> Back to Application Details
        </Link>
        <Button variant="primary" size="sm" onClick={handlePrint} icon={<FaPrint />}>
          Print Application Dossier
        </Button>
      </div>

      {/* Printable Sheet */}
      <div
        className="card printable-card"
        style={{
          padding: "40px",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0F172A",
          borderRadius: "8px",
        }}
      >
        {/* Watermark Banner */}
        <div style={{ backgroundColor: "#FEF3C7", padding: "8px", textAlign: "center", fontSize: "11px", fontWeight: "bold", color: "#92400E", marginBottom: "24px", borderRadius: "4px" }}>
          DEMO APPLICATION SUMMARY — SYNTHETIC APPLICANT RECORD
        </div>

        {/* Header Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0F172A", paddingBottom: "16px", marginBottom: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "28px" }}>🎓</span>
              <h2 style={{ fontSize: "1.4rem", margin: 0, color: "var(--color-primary-dark)" }}>{BRAND.name}</h2>
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "2px" }}>
              Scholarship Verification Desk • {BRAND.initialRegion}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Tracking Reference</div>
            <div style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>{application.referenceNumber}</div>
            <div style={{ marginTop: "4px" }}><StatusBadge status={application.status} /></div>
          </div>
        </div>

        {/* Scholarship Details */}
        <div style={{ backgroundColor: "var(--color-bg-surface)", padding: "14px 18px", borderRadius: "6px", marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Scholarship Scheme</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-text-main)", marginTop: "2px" }}>
            {application.scholarshipTitle}
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "4px" }}>
            Submission Timestamp: {formatDate(application.submittedAt || application.updatedAt, true)}
          </div>
        </div>

        {/* Section 1: Candidate Particulars */}
        <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid var(--color-border)", paddingBottom: "6px", marginBottom: "12px" }}>
          1. Applicant Particulars
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "24px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "6px 0", width: "25%", color: "var(--color-text-subtle)" }}>Full Name:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.fullName || currentUser?.fullName}</td>
              <td style={{ padding: "6px 0", width: "25%", color: "var(--color-text-subtle)" }}>Father Name:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.fatherName || currentUser?.fatherName}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>CNIC (Masked):</td>
              <td style={{ padding: "6px 0", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{maskCNIC(data.cnic || currentUser?.cnic)}</td>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>Mobile:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.phone || currentUser?.phone}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>Domicile:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.district || currentUser?.district}</td>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>Email:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.email || currentUser?.email}</td>
            </tr>
          </tbody>
        </table>

        {/* Section 2: Academic Record */}
        <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid var(--color-border)", paddingBottom: "6px", marginBottom: "12px" }}>
          2. Academic Record
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "24px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "6px 0", width: "25%", color: "var(--color-text-subtle)" }}>Enrolled Institution:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.institution || currentUser?.currentEducation?.institution}</td>
              <td style={{ padding: "6px 0", width: "25%", color: "var(--color-text-subtle)" }}>Program:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.currentProgram || currentUser?.currentEducation?.program}</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>Current CGPA:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.currentCGPA || currentUser?.currentEducation?.cgpa}</td>
              <td style={{ padding: "6px 0", color: "var(--color-text-subtle)" }}>Passing Year:</td>
              <td style={{ padding: "6px 0", fontWeight: 600 }}>{data.passingYear || currentUser?.currentEducation?.passingYear}</td>
            </tr>
          </tbody>
        </table>

        {/* Section 3: Scheme Responses */}
        {application.answers && Object.keys(application.answers).length > 0 && (
          <>
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid var(--color-border)", paddingBottom: "6px", marginBottom: "12px" }}>
              3. Applicant Statements & Question Responses
            </h3>
            <div style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "24px" }}>
              {Object.entries(application.answers).map(([k, v], i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{ color: "var(--color-text-subtle)", fontWeight: "bold" }}>Response {i + 1}:</div>
                  <div style={{ color: "var(--color-text-main)" }}>{v}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Signatures Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "40px", paddingTop: "20px", borderTop: "1px dashed var(--color-border-dark)", fontSize: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "160px", borderBottom: "1px solid #000", marginBottom: "6px" }} />
            <div>Applicant Signature</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ width: "160px", borderBottom: "1px solid #000", marginBottom: "6px" }} />
            <div>Desk Verification Officer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPreview;
