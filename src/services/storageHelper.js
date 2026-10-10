/**
 * Storage Helper - Initializes and resets mock data in localStorage
 * Uses namespace sbp_demo_*
 */

import { API_CONFIG } from "../config/apiConfig";
import { SEED_SCHOLARSHIPS } from "../data/seedScholarships";
import { SEED_STUDENTS, SEED_ADMIN } from "../data/seedStudents";
import { SEED_APPLICATIONS } from "../data/seedApplications";
import { SEED_DOCUMENTS } from "../data/seedDocuments";
import { SEED_PAYMENTS } from "../data/seedPayments";
import { SEED_NOTIFICATIONS } from "../data/seedNotifications";
import { SEED_AUDIT_LOGS } from "../data/seedAuditLogs";

const { STORAGE_KEYS } = API_CONFIG;

// Simulated small delay helper to mimic network latency
export const delay = (ms = 180) => new Promise(res => setTimeout(res, ms));

export const initDemoData = (forceReset = false) => {
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.SCHOLARSHIPS)) {
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(SEED_SCHOLARSHIPS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(SEED_STUDENTS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(SEED_DOCUMENTS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(SEED_AUDIT_LOGS));
  }
  if (forceReset) {
    // Keep admin or current user logged in if they were, or reset to demo student
    const existing = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!existing) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(SEED_STUDENTS[0]));
    }
  }
};

export const getStored = (key, defaultVal = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultVal;
  }
};

export const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

export const resetAllDemoData = () => {
  initDemoData(true);
  window.dispatchEvent(new Event("sbp_data_reset"));
};
