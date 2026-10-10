import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import applicationService from "../../services/applicationService";
import documentService from "../../services/documentService";
import StatusBadge from "../../components/domain/StatusBadge";
import Timeline from "../../components/domain/Timeline";
import Button from "../../components/ui/Button";
import { formatDate, formatPKR } from "../../utils/formatters";
import {
  FaArrowLeft,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaAward,
  FaPrint,
  FaUpload,
  FaReceipt,
} from "react-icons/fa";

export const ApplicationDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { applications, documents, payments, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const application = applications.find(a => a.id === id || a.referenceNumber === id);
  const payment = payments.find(p => p.applicationId === application?.id);

  const [correctionFile, setCorrectionFile] = useState(null);
  const [submittingCorrection, setSubmittingCorrection] = useState(false);

  if (!application) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Application Not Found</h2>
        <Link to="/student/applications" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to My Applications
        </Link>
      </div>
    );
  }

  const isCorrection = application.status === "Correction Required";
  const isAwarded = application.status === "Awarded";
  const isApproved = application.status === "Approved";

  const handleResubmitCorrection = async (e) => {
    e.preventDefault();
    if (!correctionFile) {
      showError("Please select a corrected document file to upload.");
      return;
    }

    setSubmittingCorrection(true);
    try {
      // 1. Upload new document
      await documentService.uploadDocument({
        studentId: currentUser.id,
        key: application.correctionRequest?.field || "corrected_document",
        title: "Corrected Document (Resubmitted)",
        file: correctionFile,
      });

      // 2. Transition status back to Under Review
      await applicationService.updateStatus(
        application.id,
        "Under Review",
        "Student resubmitted updated document in response to correction request.",
        currentUser.fullName
      );

      await reloadAll();
      showSuccess("Corrected document uploaded! Status updated to Under Review.");
      setCorrectionFile(null);
    } catch (err) {
      showError(err.message || "Failed to submit correction.");
    } finally {
      setSubmittingCorrection(false);
    }
  };

  return (
    <div className="page-app-details" style={{ maxWidth: "960px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Top back nav */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/student/applications" style={{ color: "var(--color-text-muted)", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <FaArrowLeft size={12} /> Back to My Applications
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="card" style={{ padding: "32px", marginBottom: "28px", backgroundColor: "#FFFFFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>Tracking Reference</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: "bold", fontSize: "16px", color: "var(--color-primary-dark)" }}>
                {application.referenceNumber}
              </span>
              <StatusBadge status={application.status} />
            </div>

            <h1 style={{ fontSize: "1.75rem", margin: "4px 0 8px" }}>
              {application.scholarshipTitle}
            </h1>
            <div style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}>
              Submitted on: {formatDate(application.submittedAt || application.updatedAt, true)}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/student/applications/${application.id}/preview`} className="btn btn-outline btn-sm">
              <FaPrint /> Print Summary
            </Link>
            {payment && (
              <Link to={`/student/payments/receipt/${payment.id}`} className="btn btn-secondary btn-sm">
                <FaReceipt /> View E-Receipt
              </Link>
            )}
          </div>
        </div>

        {/* Approved vs Awarded Explanatory Banner */}
        {isApproved && (
          <div style={{ backgroundColor: "var(--color-primary-50)", border: "1px solid var(--color-primary-100)", padding: "14px 18px", borderRadius: "8px", fontSize: "13px", color: "var(--color-primary-dark)", marginTop: "12px" }}>
            <strong>Status Notice: 'Approved'</strong> — Your academic and domicile credentials have successfully passed desk review. Your application is now queued for final budgetary quota allocation and check disbursement.
          </div>
        )}

        {/* Award Details Banner if Awarded */}
        {isAwarded && application.awardDetails && (
          <div style={{ backgroundColor: "var(--color-success-bg)", border: "1px solid var(--color-success-border)", padding: "20px", borderRadius: "8px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-success)", fontWeight: "bold", fontSize: "16px", marginBottom: "8px" }}>
              <FaAward size={22} />
              <span>Scholarship Officially Awarded & Disbursed</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13.5px", marginTop: "10px" }}>
              <div><strong>Grant Amount:</strong> {formatPKR(application.awardDetails.awardAmountPKR)}</div>
              <div><strong>Disbursement Date:</strong> {formatDate(application.awardDetails.disbursementDate)}</div>
              <div><strong>Method:</strong> {application.awardDetails.disbursementMethod}</div>
              {application.awardDetails.equipmentGranted && (
                <div><strong>Equipment Grant:</strong> {application.awardDetails.equipmentGranted}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Correction Submission Section */}
      {isCorrection && application.correctionRequest && (
        <div className="card" style={{ padding: "28px", marginBottom: "28px", border: "1px solid var(--color-danger-border)", backgroundColor: "var(--color-danger-bg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-danger)", fontWeight: "bold", fontSize: "16px", marginBottom: "12px" }}>
            <FaExclamationTriangle size={20} />
            <span>Action Required: Document Correction Requested</span>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "16px", borderRadius: "8px", border: "1px solid var(--color-danger-border)", marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", color: "var(--color-text-main)", lineHeight: "1.5" }}>
              <strong>Admin Review Note:</strong> {application.correctionRequest.message}
            </div>
            <div style={{ fontSize: "12.5px", color: "var(--color-danger)", marginTop: "6px", fontWeight: "bold" }}>
              Resubmission Deadline: {formatDate(application.correctionRequest.deadline)}
            </div>
          </div>

          <form onSubmit={handleResubmitCorrection} style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "12px" }}>Upload Corrected Document</h4>
            <div style={{ marginBottom: "16px" }}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setCorrectionFile(e.target.files?.[0] || null)}
                required
              />
              <span className="form-hint" style={{ display: "block", marginTop: "4px" }}>
                Accepted: JPG, PNG, PDF (Max 2MB). Make sure official stamps are legible.
              </span>
            </div>

            <Button type="submit" variant="primary" loading={submittingCorrection} icon={<FaUpload />}>
              Resubmit Corrected Document for Review
            </Button>
          </form>
        </div>
      )}

      {/* Two Column: Application Journey Timeline + Attached Documents */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "28px" }}>
        {/* Timeline */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Application Status Journey
          </h2>
          <Timeline events={application.timeline || []} />
        </div>

        {/* Attached Documents Checklist */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Attached Documents
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {application.attachedDocuments?.map((doc, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--color-bg-surface)",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaFileAlt color="var(--color-primary)" />
                  <span style={{ textTransform: "capitalize" }}>{doc.key.replace(/_/g, " ")}</span>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", borderTop: "1px solid var(--color-border)", paddingTop: "14px", fontSize: "12px", color: "var(--color-text-subtle)" }}>
            Need to update base profile documents? Visit the <Link to="/student/documents" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Document Center</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
