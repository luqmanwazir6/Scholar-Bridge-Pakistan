/**
 * ScholarBridge Pakistan - API Configuration Stub
 * When integrating with a real backend (Node.js/Express, Django, Laravel, etc.),
 * swap the simulated mock service layer with HTTP clients pointing to these endpoints.
 */

export const API_CONFIG = {
  // Base URL (Swapped via environment variable in production)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.scholarbridge.pk.demo/v1",
  TIMEOUT_MS: 8000,
  
  // Storage keys for demo prototype
  STORAGE_KEYS: {
    SCHOLARSHIPS: "sbp_demo_scholarships",
    STUDENTS: "sbp_demo_students",
    APPLICATIONS: "sbp_demo_applications",
    DOCUMENTS: "sbp_demo_documents",
    PAYMENTS: "sbp_demo_payments",
    NOTIFICATIONS: "sbp_demo_notifications",
    AUDIT_LOGS: "sbp_demo_audit_logs",
    CURRENT_USER: "sbp_demo_current_user",
    SAVED_SCHOLARSHIPS: "sbp_demo_saved_scholarships",
    COOKIE_CONSENT: "sbp_demo_cookie_consent",
  },

  // Future Backend REST Endpoints Map
  ENDPOINTS: {
    // Auth & Accounts
    AUTH_LOGIN: "/auth/login",
    AUTH_REGISTER: "/auth/register",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
    AUTH_VERIFY_OTP: "/auth/verify-otp",
    AUTH_ME: "/auth/me",

    // Scholarships
    SCHOLARSHIPS_LIST: "/scholarships",
    SCHOLARSHIPS_DETAIL: "/scholarships/:id",
    SCHOLARSHIPS_CREATE: "/admin/scholarships",
    SCHOLARSHIPS_UPDATE: "/admin/scholarships/:id",
    SCHOLARSHIPS_ARCHIVE: "/admin/scholarships/:id/archive",

    // Applications
    APPLICATIONS_LIST: "/applications",
    APPLICATIONS_CREATE: "/applications",
    APPLICATIONS_DETAIL: "/applications/:id",
    APPLICATIONS_UPDATE_STATUS: "/admin/applications/:id/status",
    APPLICATIONS_REQUEST_CORRECTION: "/admin/applications/:id/request-correction",

    // Documents
    DOCUMENTS_UPLOAD: "/documents/upload",
    DOCUMENTS_VERIFY: "/admin/documents/:id/verify",
    DOCUMENTS_REJECT: "/admin/documents/:id/reject",

    // Payments
    PAYMENTS_INITIATE: "/payments/initiate",
    PAYMENTS_CONFIRM: "/payments/confirm",
    PAYMENTS_VERIFY: "/admin/payments/:id/verify",
    PAYMENTS_WEBHOOK: "/payments/webhook", // IPN webhook

    // Audit & Analytics
    AUDIT_LOGS: "/admin/audit-logs",
    METRICS_SUMMARY: "/admin/metrics",
  }
};

export default API_CONFIG;
