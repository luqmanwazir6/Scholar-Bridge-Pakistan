/**
 * Seed Documents - Synthetic Document Registry
 * Note: Real documents/images are NEVER stored in localStorage.
 * Previews are synthetic visual placeholders with watermarks.
 */

// Helper to generate a clean synthetic placeholder SVG data URI for demo previews
export const createMockDocPreview = (title, meta, type = "document") => {
  const bg = type === "photo" ? "#e0f2fe" : "#f8fafc";
  const stroke = type === "photo" ? "#0284c7" : "#94a3b8";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
    <rect width="400" height="260" fill="${bg}" rx="8"/>
    <rect x="15" y="15" width="370" height="230" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4,4" rx="4"/>
    <circle cx="200" cy="80" r="28" fill="${stroke}" opacity="0.2"/>
    <path d="M190 75 h20 M200 65 v20" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round"/>
    <text x="200" y="130" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">${title}</text>
    <text x="200" y="152" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">${meta}</text>
    <rect x="60" y="180" width="280" height="28" fill="#fef3c7" rx="4" stroke="#f59e0b" stroke-width="1"/>
    <text x="200" y="198" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#92400e" text-anchor="middle">DEMO PREVIEW ONLY — NOT AN OFFICIAL NADRA/HEC RECORD</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const SEED_DOCUMENTS = [
  {
    id: "DOC-001",
    studentId: "STU-2026-001",
    key: "student_photo",
    title: "Passport Size Photograph",
    category: "Identity",
    fileName: "ahmad_khan_passport_photo.jpg",
    fileSizeKB: 142,
    fileType: "image/jpeg",
    uploadedAt: "2026-09-17T11:30:00Z",
    status: "Verified",
    verifiedBy: "ADM-001",
    verifiedAt: "2026-09-22T09:15:00Z",
    reviewNotes: "Clear, recent passport photograph with blue background compliant with specifications.",
    previewUrl: createMockDocPreview("Ahmad Tariq Khan", "Passport Photograph (Front View)", "photo"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:30:00Z", actor: "Student" },
      { action: "Marked Verified", date: "2026-09-22T09:15:00Z", actor: "Verification Officer (ADM-001)" }
    ]
  },
  {
    id: "DOC-002",
    studentId: "STU-2026-001",
    key: "student_cnic",
    title: "Student CNIC / Smart Card",
    category: "Identity",
    fileName: "cnic_12101_masked.pdf",
    fileSizeKB: 412,
    fileType: "application/pdf",
    uploadedAt: "2026-09-17T11:32:00Z",
    status: "Verified",
    verifiedBy: "ADM-001",
    verifiedAt: "2026-09-22T09:18:00Z",
    reviewNotes: "NADRA format verified. CNIC number matches application data (12101-*****67-1).",
    previewUrl: createMockDocPreview("CNIC: 12101-*****67-1", "NADRA National Identity Card (Smart Card)", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:32:00Z", actor: "Student" },
      { action: "Marked Verified", date: "2026-09-22T09:18:00Z", actor: "Verification Officer (ADM-001)" }
    ]
  },
  {
    id: "DOC-003",
    studentId: "STU-2026-001",
    key: "matric_marksheet",
    title: "Matriculation (SSC) Result Card",
    category: "Academic",
    fileName: "bise_dikhan_matric_2020.pdf",
    fileSizeKB: 680,
    fileType: "application/pdf",
    uploadedAt: "2026-09-17T11:35:00Z",
    status: "Verified",
    verifiedBy: "ADM-001",
    verifiedAt: "2026-09-22T09:20:00Z",
    reviewNotes: "BISE DI Khan Roll # 41829. 910/1100 marks verified against board gazette format.",
    previewUrl: createMockDocPreview("BISE DI Khan - Matric Result Card", "910 / 1100 Marks (82.72% - Grade A1)", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:35:00Z", actor: "Student" },
      { action: "Marked Verified", date: "2026-09-22T09:20:00Z", actor: "Verification Officer (ADM-001)" }
    ]
  },
  {
    id: "DOC-004",
    studentId: "STU-2026-001",
    key: "inter_marksheet",
    title: "Intermediate (HSSC) Result Card",
    category: "Academic",
    fileName: "bise_dikhan_inter_2022.pdf",
    fileSizeKB: 720,
    fileType: "application/pdf",
    uploadedAt: "2026-09-17T11:38:00Z",
    status: "Under Verification",
    verifiedBy: null,
    verifiedAt: null,
    reviewNotes: "Awaiting board verification cross-check queue.",
    previewUrl: createMockDocPreview("BISE DI Khan - Intermediate (HSSC)", "865 / 1100 Marks (78.63% - Grade A)", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:38:00Z", actor: "Student" },
      { action: "Moved to Verification Queue", date: "2026-09-22T09:21:00Z", actor: "System" }
    ]
  },
  {
    id: "DOC-005",
    studentId: "STU-2026-001",
    key: "domicile",
    title: "District Domicile Certificate",
    category: "Residence",
    fileName: "domicile_dikhan_ahmad.pdf",
    fileSizeKB: 390,
    fileType: "application/pdf",
    uploadedAt: "2026-09-17T11:40:00Z",
    status: "Verified",
    verifiedBy: "ADM-001",
    verifiedAt: "2026-09-22T09:22:00Z",
    reviewNotes: "District Administration Dera Ismail Khan seal verified.",
    previewUrl: createMockDocPreview("Domicile Certificate: Dera Ismail Khan", "Signed by Deputy Commissioner Office DI Khan", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:40:00Z", actor: "Student" },
      { action: "Marked Verified", date: "2026-09-22T09:22:00Z", actor: "Verification Officer (ADM-001)" }
    ]
  },
  {
    id: "DOC-006",
    studentId: "STU-2026-001",
    key: "admission_letter",
    title: "University Bona Fide / Student Card",
    category: "Academic",
    fileName: "gomal_univ_student_card.jpg",
    fileSizeKB: 245,
    fileType: "image/jpeg",
    uploadedAt: "2026-09-17T11:42:00Z",
    status: "Under Verification",
    verifiedBy: null,
    verifiedAt: null,
    reviewNotes: "Card valid till 2026. Awaiting semester fee clearance verification.",
    previewUrl: createMockDocPreview("Gomal University DI Khan", "Bona Fide Student Card: Roll # GU-CS-2022-48", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-17T11:42:00Z", actor: "Student" }
    ]
  },
  {
    id: "DOC-010",
    studentId: "STU-2026-001",
    key: "income_cert",
    title: "Father Salary Slip / Income Certificate",
    category: "Financial",
    fileName: "salary_slip_cropped.pdf",
    fileSizeKB: 280,
    fileType: "application/pdf",
    uploadedAt: "2026-09-20T16:02:00Z",
    status: "Correction Required",
    verifiedBy: "ADM-001",
    verifiedAt: "2026-09-25T11:45:00Z",
    reviewNotes: "Salary slip is partially blurred and missing the DDO official stamp. Please re-upload a clear, stamped version.",
    previewUrl: createMockDocPreview("Salary Slip (Needs Re-upload)", "Income Verification: Stamped Slip Required", "document"),
    history: [
      { action: "Uploaded", date: "2026-09-20T16:02:00Z", actor: "Student" },
      { action: "Correction Requested", date: "2026-09-25T11:45:00Z", actor: "Admin Officer ADM-001" }
    ]
  }
];

export default SEED_DOCUMENTS;
