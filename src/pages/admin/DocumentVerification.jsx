import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import documentService from "../../services/documentService";
import StatusBadge from "../../components/domain/StatusBadge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { formatDate } from "../../utils/formatters";
import { FaCheckDouble, FaEye, FaCheck, FaTimes, FaEdit, FaFilePdf, FaFileImage } from "react-icons/fa";

export const DocumentVerification = () => {
  const { documents, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [reviewNote, setReviewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = documents.filter(d => filterStatus === "All" || d.status === filterStatus);

  const handleUpdateStatus = async (status) => {
    if (!selectedDoc) return;
    setLoading(true);
    try {
      await documentService.updateVerification(selectedDoc.id, {
        status,
        reviewNotes: reviewNote || `Status changed to ${status} by desk verification officer.`
      });
      await reloadAll();
      showSuccess(`Document marked as '${status}'.`);
      setSelectedDoc(null);
      setReviewNote("");
    } catch (err) {
      showError("Failed to update document status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-admin-documents">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0284C7", textTransform: "uppercase" }}>
            Attestation & Physical Registry
          </span>
          <h1 style={{ fontSize: "1.85rem", margin: "4px 0" }}>
            Document Verification Desk
          </h1>
          <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
            Inspect candidate result cards, domiciles, and CNIC credentials.
          </p>
        </div>

        <div style={{ width: "220px" }}>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Document Statuses</option>
            <option value="Uploaded">Newly Uploaded</option>
            <option value="Under Verification">Under Verification</option>
            <option value="Verified">Verified</option>
            <option value="Correction Required">Correction Required</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Doc ID</th>
              <th style={{ padding: "12px 16px" }}>Candidate & Title</th>
              <th style={{ padding: "12px 16px" }}>Category</th>
              <th style={{ padding: "12px 16px" }}>File Details</th>
              <th style={{ padding: "12px 16px" }}>Uploaded</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => (
              <tr key={doc.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                  {doc.id}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600 }}>{doc.title}</div>
                  <div style={{ fontSize: "11.5px", color: "var(--color-text-subtle)" }}>Candidate: {doc.studentId}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span className="badge badge-neutral">{doc.category}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {doc.fileType?.includes("pdf") ? <FaFilePdf color="#dc2626" /> : <FaFileImage color="#0284c7" />}
                    <span>{doc.fileName} ({doc.fileSizeKB} KB)</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-subtle)" }}>
                  {formatDate(doc.uploadedAt)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge status={doc.status} />
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button
                    onClick={() => { setSelectedDoc(doc); setReviewNote(doc.reviewNotes || ""); }}
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: "#0284C7" }}
                  >
                    <FaEye /> Inspect & Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Document Modal */}
      {selectedDoc && (
        <Modal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={`Document Inspection: ${selectedDoc.title}`}
          maxWidth="640px"
          footer={
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "10px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
                Cancel
              </Button>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ color: "var(--color-warning)" }}
                  onClick={() => handleUpdateStatus("Correction Required")}
                  loading={loading}
                >
                  <FaEdit /> Request Correction
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleUpdateStatus("Rejected")}
                  loading={loading}
                >
                  <FaTimes /> Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus("Verified")}
                  loading={loading}
                >
                  <FaCheck /> Mark Verified
                </Button>
              </div>
            </div>
          }
        >
          <div>
            <div style={{ backgroundColor: "#FEF3C7", padding: "8px 12px", borderRadius: "6px", fontSize: "11.5px", color: "#92400E", marginBottom: "16px", textAlign: "center", fontWeight: "bold" }}>
              CONFIDENTIAL DEMO PREVIEW — SYNTHETIC RECORD IN MEMORY
            </div>

            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", padding: "16px", backgroundColor: "#F8FAFC", textAlign: "center", marginBottom: "16px" }}>
              <img
                src={selectedDoc.previewUrl}
                alt={selectedDoc.title}
                style={{ width: "100%", maxHeight: "280px", objectFit: "contain", margin: "0 auto" }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Review Officer Note / Remarks</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Enter verification notes (e.g. Board seal verified, or explain reason if requesting correction)..."
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DocumentVerification;
