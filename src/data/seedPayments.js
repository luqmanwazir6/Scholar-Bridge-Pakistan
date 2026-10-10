/**
 * Seed Payments - Simulated Demo Payment Transactions
 * All payments carry explicit simulation markers and notices.
 */

export const SEED_PAYMENTS = [
  {
    id: "PAY-2026-4401",
    receiptNumber: "REC-2026-78192",
    applicationId: "APP-002",
    applicationReference: "SBP-2026-319504",
    studentId: "STU-2026-001",
    studentName: "Ahmad Tariq Khan",
    scholarshipTitle: "Indus Valley Need-Based Higher Education Assistance",
    amountPKR: 250,
    feePurpose: "Document verification and verification field-check token charge",
    paymentMethod: "easypaisa",
    paymentMethodName: "Easypaisa Mobile Account",
    accountNumberUsed: "0345-9876543",
    transactionReference: "EP-8923471-MOCK",
    status: "Successful (Simulated)",
    isSimulated: true,
    paidAt: "2026-09-20T16:05:00Z",
    verifiedAt: "2026-09-21T10:00:00Z",
    verifiedBy: "ADM-001",
    remarks: "Mock transaction ID EP-8923471-MOCK marked successful in demo simulation.",
  },
  {
    id: "PAY-2026-9102",
    receiptNumber: "REC-2026-90412",
    applicationId: "APP-005-SAMPLE",
    applicationReference: "SBP-2026-119283",
    studentId: "STU-2026-002",
    studentName: "Fatima Noor Bibi",
    scholarshipTitle: "Crescent Corporate CSR Excellence in Business & Commerce",
    amountPKR: 300,
    feePurpose: "Aptitude evaluation platform fee",
    paymentMethod: "bank_transfer",
    paymentMethodName: "Direct 1Link / IBFT Bank Transfer",
    accountNumberUsed: "PK36NBPA0001234567890123",
    transactionReference: "NBP-FT-202609-8812",
    status: "Manual Verification Pending",
    isSimulated: true,
    paidAt: "2026-09-28T14:20:00Z",
    verifiedAt: null,
    verifiedBy: null,
    remarks: "Bank transfer slip uploaded. In manual verification queue for bank reconciliation.",
  }
];

export default SEED_PAYMENTS;
