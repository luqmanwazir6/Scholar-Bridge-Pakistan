/**
 * Seed Audit Logs - Tracks all administrative and critical changes
 * Every admin action in the app appends an entry to this audit trail.
 */

export const SEED_AUDIT_LOGS = [
  {
    id: "AUDIT-001",
    timestamp: "2026-09-22T09:15:00Z",
    actorId: "ADM-001",
    actorName: "Admin Officer (DI Khan Desk)",
    action: "DOCUMENT_VERIFIED",
    targetType: "Document",
    targetId: "DOC-001",
    targetReference: "Ahmad Tariq Khan - Passport Photo",
    details: "Marked verified after facial clarity and background check.",
  },
  {
    id: "AUDIT-002",
    timestamp: "2026-09-22T09:18:00Z",
    actorId: "ADM-001",
    actorName: "Admin Officer (DI Khan Desk)",
    action: "DOCUMENT_VERIFIED",
    targetType: "Document",
    targetId: "DOC-002",
    targetReference: "Ahmad Tariq Khan - CNIC",
    details: "NADRA format verified. CNIC mask matches profile.",
  },
  {
    id: "AUDIT-003",
    timestamp: "2026-09-22T09:20:00Z",
    actorId: "ADM-001",
    actorName: "Admin Officer (DI Khan Desk)",
    action: "DOCUMENT_VERIFIED",
    targetType: "Document",
    targetId: "DOC-003",
    targetReference: "Ahmad Tariq Khan - Matric Result Card",
    details: "BISE DI Khan result verified (82.72%).",
  },
  {
    id: "AUDIT-004",
    timestamp: "2026-09-25T11:45:00Z",
    actorId: "ADM-001",
    actorName: "Admin Officer (DI Khan Desk)",
    action: "CORRECTION_REQUESTED",
    targetType: "Application",
    targetId: "APP-002",
    targetReference: "SBP-2026-319504 (Indus Valley Need-Based)",
    details: "Requested re-upload of official stamped salary slip by 2026-10-15.",
  },
  {
    id: "AUDIT-005",
    timestamp: "2026-10-01T15:30:00Z",
    actorId: "ADM-001",
    actorName: "Admin Officer (DI Khan Desk)",
    action: "AWARD_DISBURSED",
    targetType: "Application",
    targetId: "APP-003",
    targetReference: "SBP-2026-582910 (KP Women in STEM)",
    details: "Full scholarship award PK 85,000 + Laptop Grant Voucher #STEM-KP-042 recorded.",
  }
];

export default SEED_AUDIT_LOGS;
