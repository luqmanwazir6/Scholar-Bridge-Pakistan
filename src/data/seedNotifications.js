/**
 * Seed Notifications - Student & Admin in-app notifications
 */

export const SEED_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    userId: "STU-2026-001",
    type: "warning",
    title: "Correction Requested on Application #SBP-2026-319504",
    message: "Admin has requested an updated, stamped salary slip for your Indus Valley Need-Based application before October 15, 2026.",
    link: "/student/applications/APP-002",
    createdAt: "2026-09-25T11:45:00Z",
    read: false,
  },
  {
    id: "NOTIF-002",
    userId: "STU-2026-001",
    type: "info",
    title: "Upcoming Deadline Alert: Gomal Talent Grant",
    message: "The deadline for Gomal Talent & Merit Undergraduate Grant is closing on October 25, 2026. Keep your profile updated.",
    link: "/scholarships/SBP-SCH-001",
    createdAt: "2026-10-01T08:00:00Z",
    read: false,
  },
  {
    id: "NOTIF-003",
    userId: "STU-2026-001",
    type: "success",
    title: "Documents Verified",
    message: "Your CNIC, Passport Photo, Matric Result Card, and Domicile Certificate have been successfully verified.",
    link: "/student/documents",
    createdAt: "2026-09-22T09:25:00Z",
    read: true,
  },
  {
    id: "NOTIF-004",
    userId: "STU-2026-002",
    type: "success",
    title: "Congratulations! Scholarship Awarded",
    message: "Your application #SBP-2026-582910 for KP Women in STEM & Tech Leadership Scholarship has been approved and disbursed.",
    link: "/student/applications/APP-003",
    createdAt: "2026-10-01T15:35:00Z",
    read: false,
  }
];

export default SEED_NOTIFICATIONS;
