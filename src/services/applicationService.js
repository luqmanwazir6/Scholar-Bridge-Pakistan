/**
 * Application Service - Full Application Lifecycle Management
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_APPLICATIONS } from "../data/seedApplications";
import { generateAppReference } from "../utils/referenceGenerator";
import { auditService } from "./auditService";
import { notificationService } from "./notificationService";

const { STORAGE_KEYS } = API_CONFIG;

export const applicationService = {
  async getAll(filter = {}) {
    await delay(120);
    let list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);

    if (filter.status && filter.status !== "All") {
      list = list.filter(a => a.status === filter.status);
    }
    if (filter.scholarshipId) {
      list = list.filter(a => a.scholarshipId === filter.scholarshipId);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(a => 
        a.referenceNumber.toLowerCase().includes(q) ||
        a.scholarshipTitle.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.submittedAt || b.updatedAt || 0) - new Date(a.submittedAt || a.updatedAt || 0));
  },

  async getById(id) {
    await delay(100);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    return list.find(a => a.id === id || a.referenceNumber === id) || null;
  },

  async getByStudentId(studentId) {
    await delay(100);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    return list.filter(a => a.studentId === studentId);
  },

  async checkDuplicate(studentId, scholarshipId) {
    await delay(50);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    return list.find(a => 
      a.studentId === studentId && 
      a.scholarshipId === scholarshipId &&
      a.status !== "Draft"
    );
  },

  async saveDraft(data) {
    await delay(150);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    let appIndex = -1;

    if (data.id) {
      appIndex = list.findIndex(a => a.id === data.id);
    } else {
      appIndex = list.findIndex(a => 
        a.studentId === data.studentId && 
        a.scholarshipId === data.scholarshipId && 
        a.status === "Draft"
      );
    }

    const now = new Date().toISOString();

    if (appIndex >= 0) {
      list[appIndex] = {
        ...list[appIndex],
        ...data,
        updatedAt: now,
      };
      setStored(STORAGE_KEYS.APPLICATIONS, list);
      return list[appIndex];
    } else {
      const newDraft = {
        id: `APP-${Date.now().toString().slice(-4)}`,
        referenceNumber: generateAppReference(),
        ...data,
        status: "Draft",
        submittedAt: null,
        updatedAt: now,
        timeline: [
          { id: `tl_${Date.now()}`, title: "Draft Started", date: now, note: "Draft saved by student" }
        ],
      };
      list.unshift(newDraft);
      setStored(STORAGE_KEYS.APPLICATIONS, list);
      return newDraft;
    }
  },

  async submit(data) {
    await delay(250);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    const now = new Date().toISOString();
    
    // Check duplicate
    const existing = list.find(a => 
      a.studentId === data.studentId && 
      a.scholarshipId === data.scholarshipId &&
      a.status !== "Draft" &&
      a.id !== data.id
    );
    if (existing) {
      throw new Error("You have already submitted an application for this scholarship.");
    }

    let targetApp;
    const existingIndex = list.findIndex(a => a.id === data.id);

    if (existingIndex >= 0) {
      targetApp = {
        ...list[existingIndex],
        ...data,
        status: "Submitted",
        submittedAt: now,
        updatedAt: now,
        timeline: [
          ...(list[existingIndex].timeline || []),
          { id: `tl_${Date.now()}`, title: "Application Submitted", date: now, note: "Submitted for initial eligibility review" }
        ]
      };
      list[existingIndex] = targetApp;
    } else {
      targetApp = {
        id: `APP-${Date.now().toString().slice(-4)}`,
        referenceNumber: generateAppReference(),
        ...data,
        status: "Submitted",
        submittedAt: now,
        updatedAt: now,
        timeline: [
          { id: `tl_${Date.now()}`, title: "Application Submitted", date: now, note: "Submitted for initial eligibility review" }
        ]
      };
      list.unshift(targetApp);
    }

    setStored(STORAGE_KEYS.APPLICATIONS, list);

    // Create confirmation notification for student
    await notificationService.createNotification({
      userId: targetApp.studentId,
      type: "success",
      title: `Application Submitted: ${targetApp.referenceNumber}`,
      message: `Your application for ${targetApp.scholarshipTitle} has been received and queued for review.`,
      link: `/student/applications/${targetApp.id}`,
    });

    return targetApp;
  },

  async updateStatus(id, newStatus, remarks = "", actor = "Admin Officer") {
    await delay(200);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    const idx = list.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Application not found.");

    const now = new Date().toISOString();
    const app = list[idx];
    const prevStatus = app.status;

    app.status = newStatus;
    app.updatedAt = now;
    if (remarks) app.adminRemarks = remarks;

    app.timeline = app.timeline || [];
    app.timeline.push({
      id: `tl_${Date.now()}`,
      title: `Status Changed to ${newStatus}`,
      date: now,
      note: remarks || `Status updated by ${actor}`
    });

    list[idx] = app;
    setStored(STORAGE_KEYS.APPLICATIONS, list);

    // Audit log
    await auditService.logAction({
      action: "APPLICATION_STATUS_UPDATED",
      targetType: "Application",
      targetId: app.id,
      targetReference: `${app.referenceNumber} (${app.scholarshipTitle})`,
      details: `Status transitioned from ${prevStatus} to ${newStatus}. Remarks: ${remarks || "None"}`,
    });

    // Notify student
    await notificationService.createNotification({
      userId: app.studentId,
      type: newStatus === "Approved" || newStatus === "Awarded" ? "success" : newStatus === "Rejected" ? "warning" : "info",
      title: `Application Status Update: ${newStatus}`,
      message: `Your application #${app.referenceNumber} is now '${newStatus}'. ${remarks ? `Note: ${remarks}` : ""}`,
      link: `/student/applications/${app.id}`,
    });

    return app;
  },

  async requestCorrection(id, { field, message, deadline }, actor = "Admin Officer") {
    await delay(200);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    const idx = list.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Application not found.");

    const now = new Date().toISOString();
    const app = list[idx];

    app.status = "Correction Required";
    app.updatedAt = now;
    app.correctionRequest = {
      requestedAt: now,
      field,
      message,
      deadline: deadline || "2026-10-31",
    };

    app.timeline = app.timeline || [];
    app.timeline.push({
      id: `tl_${Date.now()}`,
      title: "Correction Requested by Admin",
      date: now,
      note: `Admin note: ${message} (Deadline: ${deadline})`
    });

    list[idx] = app;
    setStored(STORAGE_KEYS.APPLICATIONS, list);

    await auditService.logAction({
      action: "CORRECTION_REQUESTED",
      targetType: "Application",
      targetId: app.id,
      targetReference: app.referenceNumber,
      details: `Correction requested on ${field}: ${message}`,
    });

    await notificationService.createNotification({
      userId: app.studentId,
      type: "warning",
      title: `Correction Requested on ${app.referenceNumber}`,
      message: `Admin review requires update to your ${field}: "${message}". Please resubmit before ${deadline}.`,
      link: `/student/applications/${app.id}`,
    });

    return app;
  },

  async awardScholarship(id, awardDetails, actor = "Admin Officer") {
    await delay(200);
    const list = getStored(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    const idx = list.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Application not found.");

    const now = new Date().toISOString();
    const app = list[idx];

    app.status = "Awarded";
    app.updatedAt = now;
    app.awardDetails = awardDetails;

    app.timeline = app.timeline || [];
    app.timeline.push({
      id: `tl_${Date.now()}`,
      title: "Scholarship Awarded & Disbursed",
      date: now,
      note: `Awarded PKR ${awardDetails.awardAmountPKR?.toLocaleString()} via ${awardDetails.disbursementMethod}`
    });

    list[idx] = app;
    setStored(STORAGE_KEYS.APPLICATIONS, list);

    await auditService.logAction({
      action: "AWARD_DISBURSED",
      targetType: "Application",
      targetId: app.id,
      targetReference: app.referenceNumber,
      details: `Disbursed award package to student. Method: ${awardDetails.disbursementMethod}`,
    });

    await notificationService.createNotification({
      userId: app.studentId,
      type: "success",
      title: `Congratulations! Scholarship Award Disbursed`,
      message: `Your scholarship #${app.referenceNumber} has been officially awarded and disbursed!`,
      link: `/student/applications/${app.id}`,
    });

    return app;
  }
};

export default applicationService;
