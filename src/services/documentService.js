/**
 * Document Service - Synthetic Document Management
 * IMPORTANT: Real files are NEVER stored in localStorage.
 * Files are processed into in-memory object previews, and only metadata is persisted.
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_DOCUMENTS, createMockDocPreview } from "../data/seedDocuments";
import { auditService } from "./auditService";

const { STORAGE_KEYS } = API_CONFIG;

export const documentService = {
  async getAll(filter = {}) {
    await delay(100);
    let list = getStored(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    if (filter.status && filter.status !== "All") {
      list = list.filter(d => d.status === filter.status);
    }
    if (filter.studentId) {
      list = list.filter(d => d.studentId === filter.studentId);
    }
    return list;
  },

  async getByStudentId(studentId) {
    await delay(80);
    const list = getStored(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    return list.filter(d => d.studentId === studentId);
  },

  async uploadDocument({ studentId, key, title, file }) {
    await delay(300);

    // Validation 1: Size limit (2MB)
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file && file.size > MAX_SIZE) {
      throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 2.0 MB.`);
    }

    // Validation 2: Format (JPG, PNG, PDF)
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (file && !allowed.includes(file.type)) {
      throw new Error("Invalid file format. Please upload JPG, PNG, or PDF files only.");
    }

    const list = getStored(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    const existingIndex = list.findIndex(d => d.studentId === studentId && d.key === key);

    const now = new Date().toISOString();
    const fileName = file ? file.name : `${key}_demo.pdf`;
    const fileSizeKB = file ? Math.round(file.size / 1024) : 180;
    const fileType = file ? file.type : "application/pdf";

    // Synthetic preview placeholder
    const previewUrl = createMockDocPreview(title || key, `${fileName} (${fileSizeKB} KB)`, key.includes("photo") ? "photo" : "document");

    let docRecord;
    if (existingIndex >= 0) {
      docRecord = {
        ...list[existingIndex],
        fileName,
        fileSizeKB,
        fileType,
        uploadedAt: now,
        status: "Uploaded", // Reset status on re-upload
        previewUrl,
        history: [
          ...(list[existingIndex].history || []),
          { action: "Re-uploaded by Student", date: now, actor: "Student" }
        ]
      };
      list[existingIndex] = docRecord;
    } else {
      docRecord = {
        id: `DOC-${Date.now().toString().slice(-4)}`,
        studentId,
        key,
        title: title || key,
        category: key.includes("photo") || key.includes("cnic") ? "Identity" : key.includes("income") ? "Financial" : "Academic",
        fileName,
        fileSizeKB,
        fileType,
        uploadedAt: now,
        status: "Uploaded",
        verifiedBy: null,
        verifiedAt: null,
        reviewNotes: "Uploaded by student; awaiting verification desk check.",
        previewUrl,
        history: [
          { action: "Uploaded", date: now, actor: "Student" }
        ]
      };
      list.push(docRecord);
    }

    setStored(STORAGE_KEYS.DOCUMENTS, list);
    return docRecord;
  },

  async updateVerification(id, { status, reviewNotes }, actor = "Admin Officer (DI Khan Desk)") {
    await delay(180);
    const list = getStored(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    const idx = list.findIndex(d => d.id === id);
    if (idx === -1) throw new Error("Document not found.");

    const now = new Date().toISOString();
    const doc = list[idx];
    const prevStatus = doc.status;

    doc.status = status;
    doc.reviewNotes = reviewNotes || doc.reviewNotes;
    doc.verifiedAt = status === "Verified" ? now : null;
    doc.verifiedBy = status === "Verified" ? "ADM-001" : null;

    doc.history = doc.history || [];
    doc.history.push({
      action: `Status changed to ${status}`,
      date: now,
      actor: actor
    });

    list[idx] = doc;
    setStored(STORAGE_KEYS.DOCUMENTS, list);

    await auditService.logAction({
      action: status === "Verified" ? "DOCUMENT_VERIFIED" : "DOCUMENT_REJECTED",
      targetType: "Document",
      targetId: doc.id,
      targetReference: `${doc.title} (${doc.fileName})`,
      details: `Status set to ${status}. Notes: ${reviewNotes || "None"}`,
    });

    return doc;
  },

  async deleteDocument(id) {
    await delay(100);
    let list = getStored(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    list = list.filter(d => d.id !== id);
    setStored(STORAGE_KEYS.DOCUMENTS, list);
    return true;
  }
};

export default documentService;
