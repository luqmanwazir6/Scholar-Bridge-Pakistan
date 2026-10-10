/**
 * Scholarship Service - CRUD, Filtering, Search, and Saved Scholarships
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_SCHOLARSHIPS } from "../data/seedScholarships";
import { auditService } from "./auditService";

const { STORAGE_KEYS } = API_CONFIG;

export const scholarshipService = {
  async getAll(params = {}) {
    await delay(120);
    // TODO: In production, call GET /api/v1/scholarships?category=...&level=...
    let list = getStored(STORAGE_KEYS.SCHOLARSHIPS, SEED_SCHOLARSHIPS);

    const {
      search = "",
      category = "All",
      level = "All",
      district = "All",
      feeFilter = "All", // "All", "Free", "With Fee"
      status = "All",
      sortBy = "deadline", // "deadline", "newest", "title"
    } = params;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.sponsor.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      list = list.filter(item => item.category === category);
    }

    // Education Level filter
    if (level !== "All") {
      list = list.filter(item => 
        item.educationLevel && item.educationLevel.some(l => l.toLowerCase().includes(level.toLowerCase()))
      );
    }

    // District filter
    if (district !== "All") {
      list = list.filter(item => {
        const districts = item.eligibility?.eligibleDistricts || [];
        return districts.some(d => d.toLowerCase().includes("all") || d.toLowerCase().includes(district.toLowerCase()));
      });
    }

    // Fee filter
    if (feeFilter === "Free") {
      list = list.filter(item => Number(item.applicationFee) === 0);
    } else if (feeFilter === "With Fee") {
      list = list.filter(item => Number(item.applicationFee) > 0);
    }

    // Status filter
    if (status !== "All") {
      list = list.filter(item => item.status === status);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === "newest") {
        return new Date(b.openingDate) - new Date(a.openingDate);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  },

  async getById(id) {
    await delay(100);
    const list = getStored(STORAGE_KEYS.SCHOLARSHIPS, SEED_SCHOLARSHIPS);
    return list.find(s => s.id === id) || null;
  },

  async create(data, actor = "Admin Officer") {
    await delay(200);
    // TODO: In production, call POST /api/v1/admin/scholarships
    const list = getStored(STORAGE_KEYS.SCHOLARSHIPS, SEED_SCHOLARSHIPS);
    const newId = `SBP-SCH-${String(list.length + 1).padStart(3, "0")}`;
    const newScholarship = {
      ...data,
      id: newId,
      isSample: true, // Always sample in demo
      status: data.status || "Draft",
    };
    list.unshift(newScholarship);
    setStored(STORAGE_KEYS.SCHOLARSHIPS, list);

    await auditService.logAction({
      action: "SCHOLARSHIP_CREATED",
      targetType: "Scholarship",
      targetId: newId,
      targetReference: newScholarship.title,
      details: `Created new scholarship listing in ${newScholarship.status} status.`,
    });

    return newScholarship;
  },

  async update(id, updates, actor = "Admin Officer") {
    await delay(200);
    // TODO: In production, call PUT /api/v1/admin/scholarships/:id
    const list = getStored(STORAGE_KEYS.SCHOLARSHIPS, SEED_SCHOLARSHIPS);
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) throw new Error("Scholarship not found.");

    const updated = { ...list[idx], ...updates };
    list[idx] = updated;
    setStored(STORAGE_KEYS.SCHOLARSHIPS, list);

    await auditService.logAction({
      action: "SCHOLARSHIP_UPDATED",
      targetType: "Scholarship",
      targetId: id,
      targetReference: updated.title,
      details: `Updated parameters for ${updated.title}. Status: ${updated.status}`,
    });

    return updated;
  },

  async setStatus(id, newStatus, reason = "") {
    return this.update(id, { status: newStatus }, reason);
  },

  async toggleSave(studentId, scholarshipId) {
    await delay(100);
    const savedMap = getStored(STORAGE_KEYS.SAVED_SCHOLARSHIPS, {});
    const studentSaves = savedMap[studentId] || [];
    let updated;
    if (studentSaves.includes(scholarshipId)) {
      updated = studentSaves.filter(id => id !== scholarshipId);
    } else {
      updated = [...studentSaves, scholarshipId];
    }
    savedMap[studentId] = updated;
    setStored(STORAGE_KEYS.SAVED_SCHOLARSHIPS, savedMap);
    return updated;
  },

  async getSavedIds(studentId) {
    await delay(50);
    const savedMap = getStored(STORAGE_KEYS.SAVED_SCHOLARSHIPS, {});
    return savedMap[studentId] || ["SBP-SCH-001", "SBP-SCH-003"];
  }
};

export default scholarshipService;
