/**
 * Seed Applications - Demonstrates full lifecycle of student applications
 * Statuses: Draft, Submitted, Under Review, Correction Required, Approved, Awarded, Rejected
 */

export const SEED_APPLICATIONS = [
  {
    id: "APP-001",
    referenceNumber: "SBP-2026-894102",
    studentId: "STU-2026-001",
    scholarshipId: "SBP-SCH-001",
    scholarshipTitle: "Gomal Talent & Merit Undergraduate Grant 2026",
    status: "Under Review", // Currently in verification queue
    submittedAt: "2026-09-18T14:32:00Z",
    updatedAt: "2026-09-22T09:15:00Z",
    feeAmount: 0,
    feeStatus: "Waived",
    answers: {
      q1: "I am studying BS Computer Science at Gomal University DI Khan and aspire to build digital literacy systems for regional schools. This merit grant will help me cover semester tuition and buy modern textbooks.",
      q2: "Yes - District/Provincial level"
    },
    attachedDocuments: [
      { docId: "DOC-001", key: "student_photo", status: "Verified" },
      { docId: "DOC-002", key: "student_cnic", status: "Verified" },
      { docId: "DOC-003", key: "matric_marksheet", status: "Verified" },
      { docId: "DOC-004", key: "inter_marksheet", status: "Under Review" },
      { docId: "DOC-005", key: "domicile", status: "Verified" },
      { docId: "DOC-006", key: "admission_letter", status: "Under Review" },
    ],
    timeline: [
      { id: "tl_1", title: "Application Drafted", date: "2026-09-17T11:20:00Z", note: "Draft created by student Ahmad Khan" },
      { id: "tl_2", title: "Application Submitted", date: "2026-09-18T14:32:00Z", note: "Submitted with 6 supporting documents. Fee waived." },
      { id: "tl_3", title: "Document Verification Commenced", date: "2026-09-22T09:15:00Z", note: "Assigned to Provincial Verification Desk Officer" },
    ],
    adminRemarks: "Academic credentials match BISE DI Khan records. Awaiting confirmation of 5th semester enrollment slip from university registrar.",
    correctionRequest: null,
  },
  {
    id: "APP-002",
    referenceNumber: "SBP-2026-319504",
    studentId: "STU-2026-001",
    scholarshipId: "SBP-SCH-002",
    scholarshipTitle: "Indus Valley Need-Based Higher Education Assistance",
    status: "Correction Required", // Correction flow demonstrated!
    submittedAt: "2026-09-20T16:00:00Z",
    updatedAt: "2026-09-25T11:45:00Z",
    feeAmount: 250,
    feeStatus: "Paid",
    paymentReference: "PAY-2026-4401",
    answers: {
      q1: "My father is a government school primary teacher supporting 4 children in school. Our household monthly income is under PKR 55,000.",
      q2: "3"
    },
    attachedDocuments: [
      { docId: "DOC-007", key: "student_photo", status: "Verified" },
      { docId: "DOC-008", key: "student_cnic", status: "Verified" },
      { docId: "DOC-009", key: "guardian_cnic", status: "Verified" },
      { docId: "DOC-010", key: "income_cert", status: "Correction Required" },
      { docId: "DOC-011", key: "utility_bill", status: "Verified" },
      { docId: "DOC-012", key: "domicile", status: "Verified" },
    ],
    timeline: [
      { id: "tl_21", title: "Application Submitted", date: "2026-09-20T16:00:00Z", note: "Submitted with simulated Easypaisa payment" },
      { id: "tl_22", title: "Payment Verified (Demo)", date: "2026-09-21T10:00:00Z", note: "Mock TID EP-8923471 verified" },
      { id: "tl_23", title: "Correction Requested by Admin", date: "2026-09-25T11:45:00Z", note: "Salary slip is partially blurred and missing the employer stamp. Please re-upload clear scanned copy." },
    ],
    adminRemarks: "The uploaded salary slip is partially cropped and lacks the drawing & disbursing officer (DDO) stamp. Please upload a clear, stamped slip.",
    correctionRequest: {
      requestedAt: "2026-09-25T11:45:00Z",
      field: "income_cert",
      message: "Uploaded salary slip is blurry and missing the official school stamp. Please scan and re-upload the latest pay slip showing DDO stamp clearly.",
      deadline: "2026-10-15",
    },
  },
  {
    id: "APP-003",
    referenceNumber: "SBP-2026-582910",
    studentId: "STU-2026-002",
    scholarshipId: "SBP-SCH-003",
    scholarshipTitle: "KP Women in STEM & Tech Leadership Scholarship",
    status: "Awarded", // Full success & disbursement demonstrated!
    submittedAt: "2026-09-12T10:00:00Z",
    updatedAt: "2026-10-01T15:30:00Z",
    feeAmount: 0,
    feeStatus: "Waived",
    answers: {
      q1: "Developed an offline-first regional attendance tracking system for village schools using Flutter and SQLite. Intend to specialize in AI-driven healthcare diagnostics for rural clinics.",
      q2: "Artificial Intelligence and Software Engineering"
    },
    attachedDocuments: [
      { docId: "DOC-013", key: "student_photo", status: "Verified" },
      { docId: "DOC-014", key: "student_cnic", status: "Verified" },
      { docId: "DOC-015", key: "transcript", status: "Verified" },
      { docId: "DOC-016", key: "domicile", status: "Verified" },
    ],
    timeline: [
      { id: "tl_31", title: "Application Submitted", date: "2026-09-12T10:00:00Z", note: "Submitted successfully" },
      { id: "tl_32", title: "Documents Verified", date: "2026-09-16T14:00:00Z", note: "All academic credentials verified" },
      { id: "tl_33", title: "Interview / Portfolio Approved", date: "2026-09-25T16:00:00Z", note: "Selected in top 10 cohort of KP STEM Women" },
      { id: "tl_34", title: "Grant Approved", date: "2026-09-28T09:00:00Z", note: "Approved by Steering Committee" },
      { id: "tl_35", title: "Award Disbursed", date: "2026-10-01T15:30:00Z", note: "Tuition check dispatched to Gomal University Treasurer + Laptop voucher issued." },
    ],
    adminRemarks: "Outstanding academic record (3.65 CGPA) and exemplary community tech portfolio. Full scholarship package granted.",
    awardDetails: {
      awardAmountPKR: 85000,
      equipmentGranted: "Dell Latitude Core i5 Laptop Grant Voucher #STEM-KP-042",
      disbursementDate: "2026-10-01",
      disbursementMethod: "Direct Institutional Bank Voucher to Gomal University",
      academicYear: "2026-2027",
    },
  },
  {
    id: "APP-004",
    referenceNumber: "SBP-2026-724189",
    studentId: "STU-2026-001",
    scholarshipId: "SBP-SCH-005",
    scholarshipTitle: "Southern Districts Intermediate Board Top-Scorers Award",
    status: "Draft", // Unsubmitted draft saved in progress
    submittedAt: null,
    updatedAt: "2026-10-05T18:20:00Z",
    feeAmount: 0,
    feeStatus: "Unpaid",
    answers: {
      q1: "Govt Post Graduate College No 1 DI Khan"
    },
    attachedDocuments: [],
    timeline: [
      { id: "tl_41", title: "Draft Started", date: "2026-10-05T18:20:00Z", note: "Saved in wizard step 3" }
    ],
    adminRemarks: null,
    correctionRequest: null,
  }
];

export default SEED_APPLICATIONS;
