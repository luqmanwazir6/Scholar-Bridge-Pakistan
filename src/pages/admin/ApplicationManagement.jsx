import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import applicationService from "../../services/applicationService";
import StatusBadge from "../../components/domain/StatusBadge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { formatDate, formatPKR, maskCNIC } from "../../utils/formatters";
import {
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaEdit,
  FaEye,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export const ApplicationManagement = () => {
  const { applications, scholarships, reloadAll } = useData();
  const { showSuccess, showError } = useToast();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("ref") || "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [schFilter, setSchFilter] = useState("All");

  const [selectedApp, setSelectedApp] = useState(null);

  // Review action modals
  const [approveConfirm, setApproveConfirm] = useState({ isOpen: false, remarks: "" });
  const [rejectModal, setRejectModal] = useState({ isOpen: false, reason: "" });
  const [correctionModal, setCorrectionModal] = useState({
    isOpen: false,
    field: "income_cert",
    message: "",
    deadline: "2026-10-31",
  });

  const [loading, setLoading] = useState(false);

  const filtered = applications.filter(app => {
    const matchesSearch =
      app.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.scholarshipTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.studentId?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesSch = schFilter === "All" || app.scholarshipId === schFilter;
    return matchesSearch && matchesStatus && matchesSch;
  });

  const handleOpenApprove = () => {
    setApproveConfirm({ isOpen: true, remarks: "Credentials and eligibility verified against board standards." });
  };

  const handleConfirmApprove = async () => {
    if (!selectedApp) return;
    setLoading(true);
    try {
      await applicationService.updateStatus(
        selectedApp.id,
        "Approved",
        approveConfirm.remarks || "Approved by provincial review committee."
      );
      await reloadAll();
      showSuccess(`Application #${selectedApp.referenceNumber} marked Approved.`);
      setApproveConfirm({ isOpen: false, remarks: "" });
      setSelectedApp(null);
    } catch (err) {
      showError("Approval failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectModal.reason.trim()) {
      showError("A specific rejection reason is mandatory.");
      return;
    }
    setLoading(true);
    try {
      await applicationService.updateStatus(
        selectedApp.id,
        "Rejected",
        rejectModal.reason
      );
      await reloadAll();
      showSuccess(`Application #${selectedApp.referenceNumber} Rejected.`);
      setRejectModal({ isOpen: false, reason: "" });
      setSelectedApp(null);
    } catch (err) {
      showError("Rejection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCorrection = async (e) => {
    e.preventDefault();
    if (!correctionModal.message.trim()) {
      showError("Please enter detailed correction instructions for the candidate.");
      return;
    }
    setLoading(true);
    try {
      await applicationService.requestCorrection(selectedApp.id, {
        field: correctionModal.field,
        message: correctionModal.message,
        deadline: correctionModal.deadline,
      });
      await reloadAll();
      showSuccess(`Correction requested for #${selectedApp.referenceNumber}. Student notified.`);
      setCorrectionModal({ isOpen: false, field: "income_cert", message: "", deadline: "2026-10-31" });
      setSelectedApp(null);
    } catch (err) {
      showError("Failed to request correction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-admin-applications">
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
          Candidate Dossier Audit
        </span>
        <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
          Applications Review & Verification Desk
        </h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Inspect candidate submissions, audit documents, request corrections, and approve awards.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 240px" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by reference (e.g. SBP-2026) or scheme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 180px" }}>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted (New)</option>
            <option value="Under Review">Under Review</option>
            <option value="Correction Required">Correction Required</option>
            <option value="Approved">Approved</option>
            <option value="Awarded">Awarded</option>
            <option value="Rejected">Rejected</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div style={{ flex: "1 1 200px" }}>
          <select
            className="form-select"
            value={schFilter}
            onChange={(e) => setSchFilter(e.target.value)}
          >
            <option value="All">All Scholarship Schemes</option>
            {scholarships.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Tracking Ref</th>
              <th style={{ padding: "12px 16px" }}>Scholarship Scheme</th>
              <th style={{ padding: "12px 16px" }}>Student ID</th>
              <th style={{ padding: "12px 16px" }}>Submitted Date</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Desk Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                  {app.referenceNumber}
                </td>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                  {app.scholarshipTitle}
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                  {app.studentId}
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                  {formatDate(app.submittedAt || app.updatedAt)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge status={app.status} />
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: "#0284C7" }}
                  >
                    <FaEye /> Inspect & Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect & Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application Review: ${selectedApp.referenceNumber}`}
          maxWidth="760px"
          footer={
            <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ color: "var(--color-warning)" }}
                  onClick={() => setCorrectionModal({ ...correctionModal, isOpen: true })}
                >
                  <FaEdit /> Request Correction
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setRejectModal({ ...rejectModal, isOpen: true })}
                >
                  <FaTimes /> Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleOpenApprove}
                >
                  <FaCheck /> Approve Application
                </Button>
              </div>
            </div>
          }
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", margin: "0 0 4px" }}>{selectedApp.scholarshipTitle}</h3>
                <span style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}>Candidate ID: {selectedApp.studentId}</span>
              </div>
              <StatusBadge status={selectedApp.status} />
            </div>

            {/* Candidate Statements / Answers */}
            <h4 style={{ fontSize: "13.5px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: "8px" }}>
              Applicant Responses
            </h4>
            <div style={{ backgroundColor: "var(--color-bg-surface)", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
              {selectedApp.answers && Object.keys(selectedApp.answers).length > 0 ? (
                Object.entries(selectedApp.answers).map(([k, v], idx) => (
                  <div key={idx} style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: 600, fontSize: "13px" }}>Prompt {idx + 1}:</div>
                    <div style={{ fontSize: "13.5px", color: "var(--color-text-muted)" }}>{v}</div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "13px", color: "var(--color-text-subtle)" }}>Standard pre-filled profile application.</div>
              )}
            </div>

            {/* Attached Documents Checklist */}
            <h4 style={{ fontSize: "13.5px", textTransform: "uppercase", color: "var(--color-text-subtle)", marginBottom: "8px" }}>
              Attached Supporting Documents
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {selectedApp.attachedDocuments?.map((doc, idx) => (
                <div key={idx} style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaFileAlt color="#0284C7" />
                    <span style={{ textTransform: "capitalize" }}>{doc.key.replace(/_/g, " ")}</span>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              ))}
            </div>

            {/* Review Notes */}
            {selectedApp.adminRemarks && (
              <div style={{ backgroundColor: "#EFF6FF", padding: "12px", borderRadius: "6px", border: "1px solid #BFDBFE", fontSize: "13px", color: "#1E40AF" }}>
                <strong>Review History Note:</strong> {selectedApp.adminRemarks}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog: Approve */}
      <ConfirmDialog
        isOpen={approveConfirm.isOpen}
        onClose={() => setApproveConfirm({ ...approveConfirm, isOpen: false })}
        onConfirm={handleConfirmApprove}
        title="Approve Candidate Application"
        message={`Are you sure you wish to endorse #${selectedApp?.referenceNumber}? This marks the student eligible and queues them for final award budget release.`}
        confirmText="Approve Candidate"
        loading={loading}
      />

      {/* Modal: Mandatory Rejection Reason */}
      <Modal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ ...rejectModal, isOpen: false })}
        title="Reject Application (Mandatory Reason Required)"
        maxWidth="500px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setRejectModal({ ...rejectModal, isOpen: false })}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject} loading={loading}>
              Confirm Rejection
            </Button>
          </>
        }
      >
        <form onSubmit={handleConfirmReject}>
          <div className="form-group">
            <label className="form-label">
              <span>Specific Regulatory Rejection Justification <span className="required">*</span></span>
            </label>
            <textarea
              rows={4}
              className="form-textarea"
              placeholder="State clear reasons (e.g. CGPA fell below 3.0 threshold, domicile outside listed districts)..."
              value={rejectModal.reason}
              onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
              required
            />
            <span className="form-hint">This justification will be delivered to the student transparently.</span>
          </div>
        </form>
      </Modal>

      {/* Modal: Request Correction */}
      <Modal
        isOpen={correctionModal.isOpen}
        onClose={() => setCorrectionModal({ ...correctionModal, isOpen: false })}
        title="Request Candidate Document Correction"
        maxWidth="520px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setCorrectionModal({ ...correctionModal, isOpen: false })}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmCorrection} loading={loading}>
              Send Correction Request
            </Button>
          </>
        }
      >
        <form onSubmit={handleConfirmCorrection}>
          <div className="form-group">
            <label className="form-label">Field / Document Requiring Attention</label>
            <select
              className="form-select"
              value={correctionModal.field}
              onChange={(e) => setCorrectionModal({ ...correctionModal, field: e.target.value })}
            >
              <option value="income_cert">Salary Slip / Income Certificate</option>
              <option value="inter_marksheet">Intermediate Marks Sheet</option>
              <option value="domicile">Domicile Certificate</option>
              <option value="student_photo">Photograph</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Instruction for Student <span className="required">*</span></label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="e.g. Uploaded salary slip is partially cropped and lacks the official DDO stamp..."
              value={correctionModal.message}
              onChange={(e) => setCorrectionModal({ ...correctionModal, message: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resubmission Deadline Date</label>
            <input
              type="date"
              className="form-input"
              value={correctionModal.deadline}
              onChange={(e) => setCorrectionModal({ ...correctionModal, deadline: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ApplicationManagement;
