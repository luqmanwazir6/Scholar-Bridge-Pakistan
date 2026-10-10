/**
 * Seed Scholarships - 100% Synthetic Demo Data
 * All listings are marked with isSample: true and explicitly labeled:
 * "Sample Data – Not an Official Scholarship"
 */

export const SEED_SCHOLARSHIPS = [
  {
    id: "SBP-SCH-001",
    title: "Gomal Talent & Merit Undergraduate Grant 2026",
    sponsor: "Dera Education Advancement Trust (Sample NGO)",
    category: "Merit-based",
    educationLevel: ["Undergraduate", "BS / Bachelor's"],
    eligibility: {
      minMarksPercent: 75,
      minCGPA: 3.2,
      ageMin: 17,
      ageMax: 24,
      eligibleDistricts: ["Dera Ismail Khan", "Tank", "South Waziristan", "Bhakkar"],
      eligibleInstitutions: ["Gomal University DI Khan", "Qurtuba University DI Khan", "All Recognized HEC HEIs in KP"],
      incomeCeilingPKR: null, // No ceiling for pure merit
    },
    financialCoverage: "100% Tuition Fee + PKR 15,000/semester Book Allowance",
    seats: 40,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph (Passport size)", required: true },
      { key: "student_cnic", name: "Student CNIC or B-Form", required: true },
      { key: "matric_marksheet", name: "Matric / SSC Marks Sheet", required: true },
      { key: "inter_marksheet", name: "Intermediate / HSSC Marks Sheet", required: true },
      { key: "domicile", name: "Domicile Certificate (KP / Tribal District)", required: true },
      { key: "admission_letter", name: "Current University Admission Slip / Card", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Provide a brief personal statement outlining your academic goals and career vision (max 200 words)", type: "textarea", required: true },
      { id: "q2", label: "Have you represented your institution in academic, STEM, or debate competitions?", type: "select", options: ["Yes - District/Provincial level", "Yes - Institutional level", "No"], required: true }
    ],
    openingDate: "2026-09-01",
    deadline: "2026-10-25", // Closing soon!
    applicationFee: 0,
    feePurpose: "Free of charge - Supported by community endowment.",
    refundPolicy: "N/A (Free application)",
    instructions: "Please ensure your intermediate marks sheet is attested by the issuing board. Upload clear scanned copies.",
    termsAndConditions: "Recipients must maintain at least a 3.0 CGPA each semester to retain renewal eligibility.",
    faqs: [
      { q: "Can 1st semester students apply?", a: "Yes, newly admitted undergraduate students with recent Intermediate certificates are eligible." },
      { q: "Is Dera Ismail Khan domicile mandatory?", a: "Priority is given to DI Khan, Tank, and adjacent districts as listed in eligibility." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-002",
    title: "Indus Valley Need-Based Higher Education Assistance",
    sponsor: "Khyber Student Welfare Foundation (Sample Non-Profit)",
    category: "Need-based",
    educationLevel: ["Undergraduate", "Associate Degree", "Master's"],
    eligibility: {
      minMarksPercent: 60,
      minCGPA: 2.5,
      ageMin: 17,
      ageMax: 26,
      eligibleDistricts: ["Dera Ismail Khan", "Bannu", "Lakki Marwat", "Peshawar", "Mardan"],
      eligibleInstitutions: ["All Public Sector Universities in Pakistan"],
      incomeCeilingPKR: 65000, // Monthly family income ceiling
    },
    financialCoverage: "75% Semester Tuition Subsidy + Monthly PKR 6,000 Stipend",
    seats: 75,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "Student CNIC or B-Form", required: true },
      { key: "guardian_cnic", name: "Father / Guardian CNIC", required: true },
      { key: "income_cert", name: "Father/Guardian Salary Slip or Income Affidavit", required: true },
      { key: "utility_bill", name: "Last Month Electricity Utility Bill", required: true },
      { key: "domicile", name: "Domicile Certificate", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Explain your family's current financial hardship and how this grant will support your studies", type: "textarea", required: true },
      { id: "q2", label: "Number of financially dependent siblings currently studying", type: "number", required: true }
    ],
    openingDate: "2026-08-15",
    deadline: "2026-11-15",
    applicationFee: 250,
    feePurpose: "Document verification and verification field-check token charge (Sample demo fee).",
    refundPolicy: "Non-refundable processing charge once verification has begun.",
    instructions: "Attach a genuine utility bill clearly showing the meter address. Do not upload forged salary slips.",
    termsAndConditions: "Providing fabricated income or guardian information leads to immediate permanent blacklisting.",
    faqs: [
      { q: "What if my father is a daily-wage laborer?", a: "Attach a signed stamp-paper affidavit attested by the Union Council secretary." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-003",
    title: "KP Women in STEM & Tech Leadership Scholarship",
    sponsor: "Women in Tech Pakistan Alliance (Sample Initiative)",
    category: "Special Assistance",
    educationLevel: ["Undergraduate", "MS / MPhil"],
    eligibility: {
      minMarksPercent: 70,
      minCGPA: 3.0,
      ageMin: 18,
      ageMax: 28,
      eligibleDistricts: ["All Districts of Khyber Pakhtunkhwa"],
      eligibleInstitutions: ["Recognized Computer Science, Engineering & IT Departments"],
      incomeCeilingPKR: 120000,
    },
    financialCoverage: "Full Tuition + Dedicated Laptop Grant + Mentorship Pairing",
    seats: 25,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "Student CNIC", required: true },
      { key: "transcript", name: "Latest University Transcript / Degree Certificate", required: true },
      { key: "domicile", name: "KP Domicile Certificate", required: true },
      { key: "tech_project_doc", name: "Optional GitHub link or project portfolio brief", required: false },
    ],
    customQuestions: [
      { id: "q1", label: "Describe a software or hardware technology project you built or aspire to build (150 words)", type: "textarea", required: true },
      { id: "q2", label: "What field of STEM do you plan to pursue after graduation?", type: "text", required: true }
    ],
    openingDate: "2026-09-10",
    deadline: "2026-10-30",
    applicationFee: 0,
    feePurpose: "Free of charge - Fully funded by CSR tech partners.",
    refundPolicy: "N/A",
    instructions: "Open strictly to female candidates enrolled in BS/MS Software Engineering, CS, Electrical Engineering or Data Science.",
    termsAndConditions: "Must attend monthly virtual mentorship cohorts with industry leads.",
    faqs: [
      { q: "Is this scholarship only for girls?", a: "Yes, this specific affirmative action initiative is dedicated to female STEM students in KP." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-004",
    title: "Frontier Agricultural & Veterinary Research Grant",
    sponsor: "Agri-Future Endowment Trust (Sample Consortium)",
    category: "Postgraduate",
    educationLevel: ["Master's", "MS / MPhil", "PhD / Doctoral"],
    eligibility: {
      minMarksPercent: 65,
      minCGPA: 3.0,
      ageMin: 22,
      ageMax: 35,
      eligibleDistricts: ["Dera Ismail Khan", "Bhakkar", "Mianwali", "Tank", "Layyah"],
      eligibleInstitutions: ["Faculty of Agriculture (Gomal University), UAF, PMAS Arid Agri"],
      incomeCeilingPKR: null,
    },
    financialCoverage: "PKR 400,000 Annual Research Grant + Laboratory Consumables Allowance",
    seats: 15,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "Student CNIC", required: true },
      { key: "research_proposal", name: "Approved Research Synopsis / Proposal", required: true },
      { key: "degree_cert", name: "BS / MPhil Degree & Attested Transcripts", required: true },
      { key: "supervisor_noc", name: "Research Supervisor Recommendation / NOC", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Research thesis topic and practical relevance to arid agriculture in South KP/Punjab", type: "textarea", required: true }
    ],
    openingDate: "2026-07-01",
    deadline: "2026-10-12", // Closing in 3 days!
    applicationFee: 500,
    feePurpose: "Peer-review dossier assessment honorarium (Sample demo fee).",
    refundPolicy: "Non-refundable processing fee.",
    instructions: "Submit an executive summary of your synopsis with supervisor endorsement signature.",
    termsAndConditions: "Selected candidates must acknowledge the grant in published peer-reviewed journals.",
    faqs: [
      { q: "Are PhD scholars eligible?", a: "Yes, both MS and PhD scholars working on arid crop and livestock resilience are eligible." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-005",
    title: "Southern Districts Intermediate Board Top-Scorers Award",
    sponsor: "Southern KP Youth Foundation (Sample)",
    category: "Merit-based",
    educationLevel: ["Intermediate / FA / FSc / ICS"],
    eligibility: {
      minMarksPercent: 82,
      minCGPA: null,
      ageMin: 15,
      ageMax: 19,
      eligibleDistricts: ["Dera Ismail Khan", "Tank", "Lakki Marwat", "Bannu"],
      eligibleInstitutions: ["BISE DI Khan, BISE Bannu registered colleges"],
      incomeCeilingPKR: null,
    },
    financialCoverage: "One-Time Cash Prize of PKR 50,000 + Certificate of Academic Honor",
    seats: 50,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "B-Form or Student CNIC", required: true },
      { key: "matric_marksheet", name: "Matric Board Result Card", required: true },
      { key: "college_id", name: "College Student ID / Bona Fide Certificate", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Which college or higher secondary school are you currently attending?", type: "text", required: true }
    ],
    openingDate: "2026-08-01",
    deadline: "2026-11-30",
    applicationFee: 0,
    feePurpose: "Zero fee - Public interest youth scholarship.",
    refundPolicy: "N/A",
    instructions: "Candidates who passed Matric with grade A1 (82%+) in 2025/2026 can apply.",
    termsAndConditions: "Must present original board certificate during in-person felicitation ceremony.",
    faqs: [
      { q: "Can private students apply?", a: "Yes, if they appeared through BISE DI Khan or BISE Bannu." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-006",
    title: "Shaheed Benazir Regional Welfare Stipend (Sample Government)",
    sponsor: "Provincial Social Protection Cell (Synthetic Demo Partner)",
    category: "Government",
    educationLevel: ["Matric / SSC", "Intermediate / FA / FSc / ICS", "Undergraduate"],
    eligibility: {
      minMarksPercent: 55,
      minCGPA: 2.2,
      ageMin: 14,
      ageMax: 25,
      eligibleDistricts: ["Dera Ismail Khan", "Tank", "Karak", "Kohat", "Waziristan"],
      eligibleInstitutions: ["All Government Schools & Public Colleges"],
      incomeCeilingPKR: 45000,
    },
    financialCoverage: "Quarterly PKR 9,000 Educational Subsidy + Uniform/Stationery grant",
    seats: 200,
    requiredDocuments: [
      { key: "student_cnic", name: "B-Form / Student CNIC", required: true },
      { key: "guardian_cnic", name: "Father / Mother CNIC", required: true },
      { key: "school_cert", name: "Headmaster / Principal Enrollment Verification", required: true },
      { key: "income_cert", name: "BISP Card or Union Council Low-Income Verification", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Is any member of your household an active BISP / Ehsaas beneficiary?", type: "select", options: ["Yes", "No", "Under verification"], required: true }
    ],
    openingDate: "2026-06-01",
    deadline: "2026-09-30", // Already CLOSED to demonstrate closed state!
    applicationFee: 0,
    feePurpose: "Free public assistance scheme.",
    refundPolicy: "N/A",
    instructions: "Applications for the current cycle are closed. Please wait for Cycle 2 announcement.",
    termsAndConditions: "Verification conducted in collaboration with school headmasters.",
    faqs: [
      { q: "Can I still apply?", a: "This cycle closed on September 30, 2026. Watch for the next cycle announcement." }
    ],
    status: "Closed",
    isSample: true,
  },
  {
    id: "SBP-SCH-007",
    title: "Al-Khidmat Special Needs & Disability Inclusion Fellowship",
    sponsor: "Al-Khidmat Foundation DI Khan Chapter (Sample)",
    category: "Special Assistance",
    educationLevel: ["Intermediate", "Undergraduate", "Associate Degree", "Master's"],
    eligibility: {
      minMarksPercent: 50,
      minCGPA: 2.0,
      ageMin: 16,
      ageMax: 32,
      eligibleDistricts: ["All Districts of Pakistan"],
      eligibleInstitutions: ["Any HEC or Board affiliated institution"],
      incomeCeilingPKR: 80000,
    },
    financialCoverage: "Full Tuition + Wheelchair/Assistive Device + PKR 10,000/mo Living Support",
    seats: 30,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "Special CNIC (with Wheelchair logo) or Disability Certificate", required: true },
      { key: "enrollment_cert", name: "Institutional Enrollment Proof", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Please specify nature of mobility, visual, hearing, or physical accommodation needed", type: "text", required: true }
    ],
    openingDate: "2026-09-01",
    deadline: "2026-12-31",
    applicationFee: 0,
    feePurpose: "Free assistance without any barrier fees.",
    refundPolicy: "N/A",
    instructions: "Upload valid Medical Board Disability Certificate or special CNIC issued by NADRA.",
    termsAndConditions: "Immediate priority review given upon submission.",
    faqs: [
      { q: "Is there an interview required?", a: "A short, supportive verification call is held to tailor assistive equipment." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-008",
    title: "Crescent Corporate CSR Excellence in Business & Commerce",
    sponsor: "Crescent Industrial Group (Sample CSR)",
    category: "Private/Institutional",
    educationLevel: ["Undergraduate", "Master's", "Associate Degree"],
    eligibility: {
      minMarksPercent: 70,
      minCGPA: 3.2,
      ageMin: 18,
      ageMax: 26,
      eligibleDistricts: ["Dera Ismail Khan", "Multan", "Lahore", "Islamabad", "Peshawar"],
      eligibleInstitutions: ["BBA / BS Commerce / MBA / CA / ACCA faculties"],
      incomeCeilingPKR: 150000,
    },
    financialCoverage: "80% Semester Tuition + Guaranteed Summer Internship Placement",
    seats: 20,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "CNIC", required: true },
      { key: "transcript", name: "Latest Semester Transcript", required: true },
      { key: "cv_resume", name: "Updated Resume / CV", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Why did you choose Business & Commerce as your field of study? (100 words)", type: "textarea", required: true }
    ],
    openingDate: "2026-09-15",
    deadline: "2026-11-20",
    applicationFee: 300,
    feePurpose: "Aptitude evaluation platform fee (Sample demo fee).",
    refundPolicy: "Refundable if corporate test is cancelled.",
    instructions: "Students must have completed at least 2 semesters of their business degree program.",
    termsAndConditions: "Recipients agree to spend an 8-week summer internship at a Crescent corporate office.",
    faqs: [
      { q: "Is the internship paid?", a: "Yes, standard corporate intern stipends apply in addition to tuition coverage." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-009",
    title: "Chashma Barrage Community Children Educational Grant",
    sponsor: "Irrigation Staff & Local Community Welfare Council (Sample)",
    category: "Need-based",
    educationLevel: ["Matric / SSC", "Intermediate / FA / FSc / ICS"],
    eligibility: {
      minMarksPercent: 55,
      minCGPA: null,
      ageMin: 13,
      ageMax: 19,
      eligibleDistricts: ["Dera Ismail Khan", "Mianwali", "Bhakkar"],
      eligibleInstitutions: ["Registered Schools/Colleges within 50km of Chashma Basin"],
      incomeCeilingPKR: 50000,
    },
    financialCoverage: "Annual Books, Stationary & Examination Fees (Up to PKR 30,000)",
    seats: 60,
    requiredDocuments: [
      { key: "student_cnic", name: "B-Form / CNIC", required: true },
      { key: "guardian_cnic", name: "Father / Guardian CNIC", required: true },
      { key: "domicile", name: "Local Residence Certificate / Domicile", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Name of village / union council of residence", type: "text", required: true }
    ],
    openingDate: "2026-08-20",
    deadline: "2026-10-18", // Closing soon!
    applicationFee: 0,
    feePurpose: "Free community grant.",
    refundPolicy: "N/A",
    instructions: "Attach electricity bill or UC residence certificate confirming local residency.",
    termsAndConditions: "Must pass annual board examinations with at least second division.",
    faqs: [
      { q: "Are girls eligible?", a: "Yes, equal allocation for male and female applicants." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-010",
    title: "Quaid-e-Azam Memorial Postgraduate Doctoral Fellowship",
    sponsor: "National Scholastic Trust (Sample)",
    category: "Postgraduate",
    educationLevel: ["PhD / Doctoral"],
    eligibility: {
      minMarksPercent: 75,
      minCGPA: 3.5,
      ageMin: 25,
      ageMax: 38,
      eligibleDistricts: ["All Districts of Pakistan"],
      eligibleInstitutions: ["HEC Ranked Tier-1 Research Universities"],
      incomeCeilingPKR: null,
    },
    financialCoverage: "Full PhD Tuition + PKR 60,000 Monthly Research Fellow Stipend for 3 Years",
    seats: 10,
    requiredDocuments: [
      { key: "student_photo", name: "Student Photograph", required: true },
      { key: "student_cnic", name: "CNIC", required: true },
      { key: "ms_degree", name: "MS / MPhil Degree (Attested)", required: true },
      { key: "research_dossier", name: "Doctoral Research Proposal & Publication List", required: true },
      { key: "rec_letters", name: "Two Academic Recommendation Letters", required: true },
    ],
    customQuestions: [
      { id: "q1", label: "Provide DOI links or citations of your published HEC-recognized research papers", type: "textarea", required: true }
    ],
    openingDate: "2026-07-15",
    deadline: "2026-12-15",
    applicationFee: 750,
    feePurpose: "Doctoral review committee peer appraisal (Sample demo fee).",
    refundPolicy: "Non-refundable once proposal enters peer panel.",
    instructions: "Proposal must address national socioeconomic challenges in energy, water, AI, or medicine.",
    termsAndConditions: "Recipients must commit to serving in Pakistani academia/research for at least 3 years post-PhD.",
    faqs: [
      { q: "Can employed university lecturers apply?", a: "Yes, subject to study leave approval from the employer institution." }
    ],
    status: "Published",
    isSample: true,
  },
  {
    id: "SBP-SCH-011",
    title: "Bolan to Khyber Inter-Provincial Harmony Scholarship (Draft)",
    sponsor: "Inter-Provincial Youth Exchange (Sample)",
    category: "Government",
    educationLevel: ["Undergraduate"],
    eligibility: {
      minMarksPercent: 65,
      minCGPA: 2.8,
      ageMin: 18,
      ageMax: 24,
      eligibleDistricts: ["All Districts of Pakistan"],
      eligibleInstitutions: ["Designated Host Public Universities"],
      incomeCeilingPKR: 85000,
    },
    financialCoverage: "Full Hostel Living Expenses + Semester Tuition",
    seats: 35,
    requiredDocuments: [
      { key: "student_cnic", name: "CNIC", required: true },
      { key: "domicile", name: "Domicile", required: true },
    ],
    customQuestions: [],
    openingDate: "2026-11-01",
    deadline: "2026-12-30",
    applicationFee: 0,
    feePurpose: "Free government youth integration scheme.",
    refundPolicy: "N/A",
    instructions: "Draft listing currently being reviewed by scholarship committee.",
    termsAndConditions: "Subject to final ministerial gazette notification.",
    faqs: [],
    status: "Draft",
    isSample: true,
  }
];

export default SEED_SCHOLARSHIPS;
