import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import documentService from "../../services/documentService";
import DocumentCard from "../../components/domain/DocumentCard";
import { FaFolderOpen, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

export const DocumentCenter = () => {
  const { currentUser } = useAuth();
  const { documents, reloadAll } = useData();
  const { showSuccess, showError } = useToast();

  const studentDocs = documents.filter(d => d.studentId === currentUser?.id);

  // Standard document slot configurations
  const documentSlots = [
    { key: "student_photo", name: "Passport Size Photograph", required: true },
    { key: "student_cnic", name: "Student CNIC or B-Form (Front & Back)", required: true },
    { key: "matric_marksheet", name: "Matriculation (SSC) Result Card", required: true },
    { key: "inter_marksheet", name: "Intermediate (HSSC) Result Card", required: true },
    { key: "domicile", name: "Domicile Certificate (DI Khan / KP)", required: true },
    { key: "admission_letter", name: "University Enrollment Slip / Bona Fide Card", required: true },
    { key: "income_cert", name: "Father / Guardian Salary Slip or Income Affidavit", required: false },
    { key: "guardian_cnic", name: "Father / Guardian CNIC", required: false },
    { key: "utility_bill", name: "Last Month Electricity Utility Bill", required: false },
  ];

  const handleUpload = async (docKey, docName, file) => {
    try {
      await documentService.uploadDocument({
        studentId: currentUser.id,
        key: docKey,
        title: docName,
        file,
      });
      showSuccess(`"${docName}" uploaded successfully into demo records!`);
      await reloadAll();
    } catch (err) {
      showError(err.message || "Upload failed");
    }
  };

  const handleRemove = async (docId) => {
    try {
      await documentService.deleteDocument(docId);
      showSuccess("Document removed from profile.");
      await reloadAll();
    } catch (err) {
      showError("Failed to remove document.");
    }
  };

  return (
    <div className="page-document-center" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Candidate Document Center</h1>
        <p style={{ color: "var(--color-text-subtle)", fontSize: "14px", margin: 0 }}>
          Manage your verified certificates, result cards, and identity documents for one-click attachment in applications.
        </p>
      </div>

      {/* Trust & Verification Disclaimer Banner */}
      <div
        style={{
          backgroundColor: "#FEF3C7",
          border: "1px solid #F59E0B",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "28px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          fontSize: "13px",
          lineHeight: "1.5",
          color: "#92400E",
        }}
      >
        <FaInfoCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <strong>Document Attestation & Verification Notice:</strong> Frontend checks validate file size (max 2MB), supported formats (JPG, PNG, PDF), and required fields. Genuine institutional verification requires official board attestation and desk procedures by authorized reviewers.
        </div>
      </div>

      {/* Grid of Documents */}
      <div className="grid-2" style={{ gap: "20px" }}>
        {documentSlots.map((slot) => {
          const existing = studentDocs.find(d => d.key === slot.key);
          return (
            <DocumentCard
              key={slot.key}
              docConfig={slot}
              existingDoc={existing}
              onUpload={(file) => handleUpload(slot.key, slot.name, file)}
              onRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DocumentCenter;
