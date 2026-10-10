/**
 * Audit Logging Service (Admin Trail)
 * Records and retrieves all administrative interactions and status updates.
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_AUDIT_LOGS } from "../data/seedAuditLogs";

const { STORAGE_KEYS } = API_CONFIG;

export const auditService = {
  async getLogs(filter = {}) {
    await delay(100);
    const logs = getStored(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async logAction({ action, targetType, targetId, targetReference, details, actorName = "Admin Officer (DI Khan Desk)", actorId = "ADM-001" }) {
    const logs = getStored(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    const newEntry = {
      id: `AUDIT-${String(logs.length + 1).padStart(3, "0")}`,
      timestamp: new Date().toISOString(),
      actorId,
      actorName,
      action,
      targetType,
      targetId,
      targetReference,
      details,
    };
    logs.unshift(newEntry);
    setStored(STORAGE_KEYS.AUDIT_LOGS, logs);
    return newEntry;
  }
};

export default auditService;
