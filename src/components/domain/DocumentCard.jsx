import React, { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import StatusBadge from "./StatusBadge";
import { FaUpload, FaEye, FaTrashAlt, FaRedo, FaFilePdf, FaFileImage, FaExclamationTriangle } from "react-icons/fa";

export const DocumentCard = ({
  docConfig, // { key, name, required }
  existingDoc = null,
  onUpload, // async (file) => void
  onRemove = null,
  readOnly = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Format check
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      setError("Unsupported file format. Please upload JPG, PNG, or PDF.");
      return;
    }

    // Size check (2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError(`File is ${(file.size / (1024 * 1024)).toFixed(1)} MB. Max limit is 2.0 MB.`);
      return;
    }

    // Simulate progress
    setUploading(true);
    setUploadProgress(20);

    const timer1 = setTimeout(() => setUploadProgress(65), 150);
    const timer2 = setTimeout(() => setUploadProgress(100), 300);

    try {
      setTimeout(async () => {
        try {
          await onUpload(file);
          setUploading(false);
          setUploadProgress(0);
        } catch (err) {
          setError(err.message || "Upload failed");
          setUploading(false);
        }
      }, 350);
    } catch (err) {
      setError(err.message || "Failed to process file");
      setUploading(false);
    }
  };

  const status = existingDoc ? existingDoc.status : "Not Uploaded";

  return (
    <div
      className="document-card"
      style={{
        border: `1px solid ${status === "Correction Required" ? "var(--color-danger-border)" : "var(--color-border)"}`,
        backgroundColor: status === "Correction Required" ? "var(--color-danger-bg)" : "#FFFFFF",
        borderRadius: "var(--radius-lg)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div>
          <h4 style={{ fontSize: "14px", margin: 0, color: "var(--color-text-main)" }}>
            {docConfig.name || existingDoc?.title}
            {docConfig.required && <span style={{ color: "var(--color-danger)" }}> *</span>}
          </h4>
          <span style={{ fontSize: "11px", color: "var(--color-text-subtle)" }}>
            {docConfig.required ? "Required Document" : "Optional Supporting Document"} (Max 2MB: JPG, PNG, PDF)
          </span>
        </div>

        <StatusBadge status={status} />
      </div>

      {/* Reviewer Note if Correction or Rejection */}
      {existingDoc?.reviewNotes && (status === "Correction Required" || status === "Rejected") && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--color-danger-border)",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            color: "var(--color-danger)",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <FaExclamationTriangle style={{ marginTop: "2px", flexShrink: 0 }} />
          <div>
            <strong>Reviewer Note:</strong> {existingDoc.reviewNotes}
          </div>
        </div>
      )}

      {/* Uploading progress bar */}
      {uploading && (
        <div style={{ margin: "8px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
            <span>Simulating secure upload...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div style={{ width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "9999px", overflow: "hidden" }}>
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "100%",
                backgroundColor: "var(--color-primary)",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{ fontSize: "12px", color: "var(--color-danger)", fontWeight: 500 }}>
          {error}
        </div>
      )}

      {/* Document info if uploaded */}
      {existingDoc && !uploading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            backgroundColor: "var(--color-bg-surface)",
            borderRadius: "6px",
            fontSize: "12.5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
            {existingDoc.fileType?.includes("pdf") ? <FaFilePdf color="#dc2626" /> : <FaFileImage color="#0284c7" />}
            <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {existingDoc.fileName}
            </span>
            <span style={{ fontSize: "11px", color: "var(--color-text-subtle)", flexShrink: 0 }}>
              ({existingDoc.fileSizeKB} KB)
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="btn btn-outline btn-sm"
              style={{ padding: "4px 8px", fontSize: "11px" }}
              title="Preview document placeholder"
            >
              <FaEye /> Preview
            </button>
            {!readOnly && onRemove && (
              <button
                onClick={() => onRemove(existingDoc.id)}
                className="btn btn-outline btn-sm"
                style={{ padding: "4px 8px", fontSize: "11px", color: "var(--color-danger)" }}
                title="Remove uploaded document"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload button control */}
      {!readOnly && (
        <div style={{ marginTop: "auto" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: uploading ? "wait" : "pointer",
              fontSize: "12px",
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px dashed var(--color-primary)",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-50)",
              transition: "background-color 0.15s ease",
            }}
          >
            {existingDoc ? <FaRedo size={12} /> : <FaUpload size={12} />}
            <span>{existingDoc ? "Replace Document" : "Choose File to Upload"}</span>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Synthetic Preview Modal */}
      {showPreviewModal && existingDoc && (
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={`Document Preview: ${existingDoc.title}`}
          maxWidth="560px"
          footer={
            <Button variant="outline" size="sm" onClick={() => setShowPreviewModal(false)}>
              Close Preview
            </Button>
          }
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "#fef3c7",
                border: "1px solid #f59e0b",
                color: "#92400e",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "11.5px",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              ⚠ CONFIDENTIAL DEMO PREVIEW ONLY: Synthetic in-memory rendering. Real CNIC/sensitive records are never stored in browser memory.
            </div>

            <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", padding: "12px", backgroundColor: "#f8fafc" }}>
              <img
                src={existingDoc.previewUrl}
                alt={existingDoc.title}
                style={{ width: "100%", maxHeight: "300px", objectFit: "contain", margin: "0 auto" }}
              />
            </div>

            <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--color-text-subtle)" }}>
              Filename: <strong>{existingDoc.fileName}</strong> | Size: {existingDoc.fileSizeKB} KB | Uploaded: {new Date(existingDoc.uploadedAt).toLocaleDateString()}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DocumentCard;
